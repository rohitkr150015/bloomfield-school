import { chromium } from "playwright";
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
p.on("pageerror", (e) => console.log("ERROR:", e.message));
await p.goto("http://127.0.0.1:5173/portal/parent");
await p.locator(".recharts-wrapper").waitFor();
await p.waitForTimeout(1200);
console.log(
  await p
    .locator(".recharts-bar-rectangle")
    .evaluateAll((es) => es.map((e) => e.innerHTML.slice(0, 230))),
);
await p.locator(".chart").screenshot({ path: "docs/qa/chart-check.png" });
await b.close();
