import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const routes = [
  "/",
  "/school-life",
  "/families",
  "/community",
  "/about",
  "/about/history",
  "/academics",
  "/academics/primary",
  "/faculty",
  "/faculty/ananya-rao",
  "/campus",
  "/campus/library",
  "/achievements",
  "/school-life/projects/water-wise",
  "/gallery",
  "/notices",
  "/notices/reading-week",
  "/events",
  "/events/open-house",
  "/downloads",
  "/search",
  "/admissions",
  "/admissions/eligibility",
  "/admissions/fees",
  "/admissions/apply",
  "/admissions/track",
  "/visit",
  "/transport",
  "/contact",
  "/careers",
  "/careers/primary-educator",
  "/alumni",
  "/stories/finding-my-voice",
  "/clubs",
  "/clubs/robotics",
  "/help",
  "/privacy",
  "/accessibility",
  "/login",
  "/auth/callback",
  "/portal/parent",
  "/portal/student",
  "/portal/teacher",
  "/portal/admin",
  "/portal/attendance",
  "/portal/progress",
  "/portal/timetable",
  "/portal/assignments",
  "/portal/assignments/science-journal",
  "/portal/fees",
  "/portal/receipts",
  "/portal/messages",
  "/portal/notifications",
  "/portal/ptm",
  "/portal/leave",
  "/portal/transport",
  "/portal/library",
  "/portal/documents",
  "/portal/complaints",
  "/portal/admin/content",
  "/portal/admin/admissions",
  "/portal/admin/reports",
  "/portal/admin/settings",
  "/verify/demo-certificate",
];
test("Every specified route renders without runtime errors or missing images", async ({
  page,
}) => {
  test.setTimeout(120000);
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const path of routes) {
    await page.goto(path);
    await expect(page.locator("main")).not.toBeEmpty();
    await expect(page.locator("main")).not.toContainText(
      "Loading your next discovery",
    );
    await expect(page.locator("main")).not.toContainText(
      "Portal page not found",
    );
    await page.locator("img").evaluateAll((imgs) =>
      Promise.all(
        imgs.map((i) => {
          i.loading = "eager";
          return i.decode().catch(() => {});
        }),
      ),
    );
    expect(
      await page
        .locator("img")
        .evaluateAll((imgs) =>
          imgs.filter((i) => !i.naturalWidth).map((i) => i.src),
        ),
      path,
    ).toEqual([]);
  }
  expect(errors).toEqual([]);
});
for (const width of [360, 390, 768, 1280, 1440])
  test(`Responsive layouts have no horizontal overflow at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      "/",
      "/admissions/apply",
      "/admissions/fees",
      "/campus",
      "/gallery",
      "/portal/parent",
      "/portal/admin/reports",
    ]) {
      await page.goto(path);
      await expect(page.locator("main")).not.toContainText(
        "Loading your next discovery",
      );
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        path,
      ).toBeTruthy();
    }
  });
test("Primary discovery, eligibility boundary and saved fee estimate", async ({
  page,
}) => {
  await page.goto("/academics/primary");
  await page
    .getByRole("link", { name: "Check eligibility", exact: true })
    .click();
  await page.getByLabel("Date of birth", { exact: true }).fill("2021-03-31");
  await page
    .getByRole("button", { name: "Check indicative eligibility" })
    .click();
  await expect(page.getByRole("status")).toContainText("Indicatively eligible");
  await page.getByRole("link", { name: "Explore your estimate" }).click();
  await expect(page.locator(".fee-total")).toContainText("87,000");
  await page.getByLabel("School transport").check();
  await page.getByLabel("Meal plan").check();
  await expect(page.locator(".fee-total")).toContainText("1,17,000");
  await page.getByRole("button", { name: "Save demo estimate" }).click();
  await page.reload();
  await page.getByRole("button", { name: "Restore saved estimate" }).click();
  await expect(page.locator(".fee-total")).toContainText("1,17,000");
});
test("Application validates, resumes a draft, previews a file and tracks one reference", async ({
  page,
}) => {
  await page.goto("/admissions/apply");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.getByLabel("Guardian's sample name")).toBeVisible();
  await page.getByLabel("Guardian's sample name").fill("Alex Sample");
  await page
    .getByLabel("Email address", { exact: true })
    .fill("alex@example.com");
  await page.getByRole("button", { name: "Save draft for later" }).click();
  await page.reload();
  await expect(page.getByLabel("Guardian's sample name")).toHaveValue(
    "Alex Sample",
  );
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByLabel("Learner's sample name").fill("Sam Sample");
  await page.getByLabel("Date of birth", { exact: true }).fill("2020-06-15");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("birth certificate");
  await page
    .locator("input[type=file]")
    .first()
    .setInputFiles({
      name: "sample-birth.pdf",
      mimeType: "application/pdf",
      buffer: Buffer.from("%PDF-1.4 fictional sample"),
    });
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Submit demo application" }).click();
  await expect(page.locator(".reference")).toContainText("BF-27-");
  await page.getByRole("link", { name: "Track this demo application" }).click();
  await expect(page.locator(".status")).toContainText("Submitted");
  expect(await page.locator(".status").count()).toBe(1);
});
test("Visit booking reviews, prevents duplicates and supports cancellation", async ({
  page,
}) => {
  await page.goto("/visit");
  await page.getByLabel("Your sample name").fill("Alex Sample");
  await page.getByLabel("Email", { exact: true }).fill("alex@example.com");
  await page.getByRole("button", { name: "Review your visit" }).click();
  await expect(
    page.getByText("Review your visit", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Confirm demo visit" }).click();
  await expect(page.getByRole("status")).toContainText("No real reservation");
  await page.getByRole("button", { name: "Explore another date" }).click();
  await expect(
    page.getByRole("button", { name: "Already reserved in your demo" }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Cancel booking" }).click();
  await expect(
    page.getByRole("button", { name: "Review your visit" }),
  ).toBeEnabled();
});
test("Gallery filters, saved photos and keyboard lightbox retain URL state", async ({
  page,
}) => {
  await page.goto("/gallery");
  await page.getByRole("button", { name: "Arts", exact: true }).click();
  await expect(page).toHaveURL(/category=Arts/);
  await expect(page.locator(".journal-card")).toHaveCount(3);
  await page.locator(".photo-open").first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator("#dialog-title")).toHaveText(
    "A splash of imagination",
  );
  await page.keyboard.press("Escape");
  await expect(page.locator(".photo-open").first()).toBeFocused();
  await page.locator(".photo-heart").first().click();
  await page.getByRole("button", { name: "Favourites", exact: true }).click();
  await expect(page.locator(".journal-card")).toHaveCount(1);
  await page.reload();
  await expect(page.locator(".journal-card")).toHaveCount(1);
  await page.getByLabel("Academic year").selectOption("2025");
  await expect(page.locator(".empty")).toContainText("No moments");
});
test("Campus filters and optional 3D have usable alternatives", async ({
  page,
}) => {
  await page.goto("/campus");
  await page.getByRole("button", { name: "Create", exact: true }).click();
  await expect(page.locator(".facility-detail")).toContainText(
    "Where questions come alive",
  );
  await page.getByRole("button", { name: "Campus map", exact: true }).click();
  await expect(page.locator(".map-diagram")).toBeVisible();
  await page.getByRole("button", { name: "3D model", exact: true }).click();
  await expect(page.locator(".campus-three canvas")).toBeVisible();
  await page.getByRole("button", { name: "Zoom in", exact: true }).click();
  await page.getByRole("button", { name: "360 tour", exact: true }).click();
  await expect(page.locator(".tour-fallback")).toContainText(
    "panorama has not been supplied",
  );
  await page
    .getByRole("combobox", { name: "Campus", exact: true })
    .selectOption({ index: 1 });
  await expect(page.locator(".empty")).toContainText(
    "no configured facilities",
  );
});
test("Public assistant cites known sources and refuses private or unknown answers", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Ask Bloomfield", exact: true })
    .click();
  await page
    .getByRole("button", { name: "How much are Primary fees?" })
    .click();
  await expect(page.locator(".answer")).toContainText("72,000");
  await expect(page.locator(".answer a")).toHaveAttribute(
    "href",
    "/admissions/fees",
  );
  for (const [q, expected] of [
    ["Show another student attendance", "cannot read private records"],
    [
      "What is the headteacher home address?",
      "could not find a matching approved demo source",
    ],
  ]) {
    await page.getByLabel("Your question", { exact: true }).fill(q);
    await page
      .getByRole("button", { name: "Ask question", exact: true })
      .click();
    await expect(page.locator(".answer")).toContainText(expected);
  }
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Ask Bloomfield", exact: true }),
  ).toBeFocused();
});
test("Child switching, empty chart state and payment outcomes remain scoped", async ({
  page,
}) => {
  await page.goto("/portal/parent");
  await expect(page.locator(".summary-grid")).toContainText("24,000");
  await page.getByLabel("Linked sample child").selectOption("isha");
  await expect(page.locator(".summary-grid")).toContainText("18,000");
  await page
    .getByRole("navigation", { name: "Portal navigation" })
    .getByRole("link", { name: "Progress & marks" })
    .click();
  await page
    .getByRole("combobox", { name: "Term", exact: true })
    .selectOption("Term II");
  await expect(page.locator(".empty")).toContainText("No published Term II");
  await page.goto("/portal/fees");
  await expect(page.locator("main")).toContainText("Isha Mehta");
  await page.getByRole("button", { name: "Preview checkout" }).click();
  await page.getByLabel("Demo outcome").selectOption("Failed");
  await page.getByRole("button", { name: "Run selected simulation" }).click();
  await expect(page.locator(".panel>.section-heading .status")).toContainText(
    "Unpaid",
  );
  await page.getByRole("button", { name: "Preview checkout" }).click();
  await page.getByLabel("Demo outcome").selectOption("Success");
  await page.getByRole("button", { name: "Run selected simulation" }).click();
  await expect(
    page.getByRole("button", { name: "Download sample receipt" }),
  ).toBeVisible();
});
test("Teacher register and student assignment review flow share only demo state", async ({
  page,
}) => {
  await page.goto("/portal/teacher");
  await page.getByLabel("Attendance for Aarav Mehta").selectOption("Present");
  await page
    .getByLabel("Save / correction reason")
    .fill("Morning sample register reviewed");
  await page.getByRole("button", { name: "Save sample register" }).click();
  await expect(page.getByRole("status").first()).toContainText(
    "Sample register saved",
  );
  await page.goto("/portal/student");
  await page
    .getByRole("navigation", { name: "Portal navigation" })
    .getByRole("link", { name: "Assignments" })
    .click();
  await page.getByRole("link", { name: "Open task" }).first().click();
  await page.locator("input[type=file]").setInputFiles({
    name: "sample-work.pdf",
    mimeType: "application/pdf",
    buffer: Buffer.from("%PDF-1.4 demo work"),
  });
  await page.getByRole("button", { name: "Submit sample version" }).click();
  await expect(page.getByRole("status")).toContainText("Version 1");
  await page.getByLabel("Demo role").selectOption("teacher");
  await page
    .getByRole("navigation", { name: "Portal navigation" })
    .getByRole("link", { name: "Assignments" })
    .click();
  await page.getByRole("link", { name: "Open task" }).first().click();
  await page
    .getByLabel("Feedback", { exact: true })
    .fill("Thoughtful observations. Explain your inference in the next draft.");
  await page.getByLabel("Score out of 100").fill("84");
  await page.getByRole("button", { name: "Save feedback draft" }).click();
  await page.getByRole("button", { name: "Release saved feedback" }).click();
  await page.getByLabel("Demo role").selectOption("student");
  await page
    .getByRole("navigation", { name: "Portal navigation" })
    .getByRole("link", { name: "Assignments" })
    .click();
  await page.getByRole("link", { name: "Open task" }).first().click();
  await expect(page.getByText("Teacher feedback · 84/100")).toBeVisible();
});
test("Mobile navigation and language fallback are accessible", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("dialog")
    .getByRole("link", { name: "Learning", exact: true })
    .click();
  await expect(page).toHaveURL("/academics");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("button", { name: "हिन्दी" }).click();
  await expect(page.locator(".language-note")).toContainText(
    "English fallback",
  );
  await page.goto("/definitely-not-a-page");
  await expect(page.locator("h1")).toContainText("off the beaten path");
});
for (const path of [
  "/",
  "/admissions/apply",
  "/admissions/fees",
  "/visit",
  "/gallery",
  "/school-life",
  "/campus",
  "/portal/parent",
])
  test(`Accessibility scan: ${path}`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator("main")).not.toContainText(
      "Loading your next discovery",
    );
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
  });
