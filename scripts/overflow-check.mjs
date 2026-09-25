import { chromium } from "playwright";
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await b.newPage({ viewport: { width: 390, height: 844 } });
await p.goto("http://127.0.0.1:5173/admissions/fees");
await p.locator(".fee-total").waitFor();
console.log(
  await p.evaluate(() =>
    [...document.querySelectorAll("main *")]
      .map((e) => ({
        tag: e.tagName,
        cls: e.className,
        r: e.getBoundingClientRect().right,
        w: e.getBoundingClientRect().width,
      }))
      .filter((e) => e.r > innerWidth + 1)
      .slice(0, 20),
  ),
);
await b.close();
