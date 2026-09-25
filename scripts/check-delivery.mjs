import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import assert from "node:assert/strict";

// Run after `npm run build` + `npm run preview`. This is a local lab sample,
// not Lighthouse, field data, or a substitute for school production tests.
const origin = "http://127.0.0.1:5173";
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    serviceWorkers: "block",
  });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
  await cdp.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 100,
    downloadThroughput: 500000,
    uploadThroughput: 125000,
    connectionType: "cellular4g",
  });
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await page.addInitScript(() => {
    window.bloomfieldLab = { lcp: 0, cls: 0 };
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) window.bloomfieldLab.lcp = e.startTime;
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((list) => {
      for (const e of list.getEntries())
        if (!e.hadRecentInput) window.bloomfieldLab.cls += e.value;
    }).observe({ type: "layout-shift", buffered: true });
  });
  await page.goto(origin, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const performanceResult = await page.evaluate(() => ({
    ...window.bloomfieldLab,
    requests: performance.getEntriesByType("resource").length,
    userAgent: navigator.userAgent,
  }));
  await context.close();

  const offlineContext = await browser.newContext();
  const offlinePage = await offlineContext.newPage();
  await offlinePage.goto(origin);
  await offlinePage.evaluate(() => navigator.serviceWorker.ready);
  await offlinePage.reload();
  await offlinePage.goto(origin + "/gallery");
  await offlinePage.locator(".journal-grid").waitFor();
  await offlinePage.goto(origin + "/portal/fees");
  await offlinePage.locator(".portal-main").waitFor();
  const cacheUrls = await offlinePage.evaluate(async () => {
    const c = await caches.open("bloomfield-public-v1");
    return (await c.keys()).map((r) => new URL(r.url).pathname);
  });
  assert(
    !cacheUrls.some((path) =>
      /^\/(portal|login|auth|api|verify|visit|admissions\/(apply|track))/.test(
        path,
      ),
    ),
    "Private routes must not be cached",
  );
  await offlineContext.setOffline(true);
  await offlinePage.goto(origin + "/gallery", {
    waitUntil: "domcontentloaded",
  });
  await offlinePage.locator(".journal-grid").waitFor();
  assert(
    (await offlinePage.locator(".offline").textContent()).includes("offline"),
  );
  await offlineContext.close();

  const reducedContext = await browser.newContext({ reducedMotion: "reduce" });
  const reducedPage = await reducedContext.newPage();
  await reducedPage.goto(origin + "/admissions/fees");
  await reducedPage.getByRole("button", { name: "Save demo estimate" }).click();
  await reducedPage.getByRole("status").waitFor();
  assert.equal(await reducedPage.locator(".success-animation").count(), 0);
  await reducedContext.close();

  const report = {
    date: "2026-09-23",
    performance: {
      conditions:
        "Local Vite production preview; cold cache; 390x844; 4x CPU; 100 ms latency; 4 Mbps downstream; service worker blocked",
      ...performanceResult,
    },
    publicOfflineGallery: "passed",
    privateRouteCacheExclusion: "passed",
    reducedMotionConfirmation: "passed",
  };
  mkdirSync("docs/qa", { recursive: true });
  writeFileSync("docs/qa/delivery-check.json", JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
