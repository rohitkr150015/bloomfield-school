import { test, expect } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
test("Capture final desktop and mobile layouts for visual review", async ({
  page,
}) => {
  mkdirSync("docs/qa", { recursive: true });
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
    for (const [route, name] of [
      ["/", "home"],
      ["/admissions/fees", "fees"],
      ["/portal/parent", "parent"],
      ["/campus", "campus"],
      ["/gallery", "gallery"],
      ["/school-life", "life"],
    ]) {
      await page.goto(route);
      await expect(page.locator("main")).not.toContainText(
        "Loading your next discovery",
      );
      await page.locator("img").evaluateAll((imgs) =>
        Promise.all(
          imgs.map((i) => {
            i.loading = "eager";
            return i.decode().catch(() => {});
          }),
        ),
      );
      for (const item of await page.locator("main section").all()) {
        await item.scrollIntoViewIfNeeded();
      }
      await page.evaluate(() => scrollTo(0, 0));
      await page.waitForTimeout(350);
      await page.screenshot({
        path: `docs/qa/${name}-${width}.jpg`,
        type: "jpeg",
        quality: 80,
        fullPage: true,
      });
    }
  }
});
