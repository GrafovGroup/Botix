import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const guides = [
  "commercial-robots",
  "solutions",
  "robot-rentals",
  "humanoid-robots",
  "commercial-robots/logistics",
  "commercial-robots/industrial",
];

for (const locale of ["en", "fr"]) {
  test(`${locale}: homepage, navigation and accessible layout`, async ({
    page,
  }, info) => {
    await page.goto(`/${locale}`);
    await expect(page.locator("html")).toHaveAttribute("lang", `${locale}-CA`);
    await expect(page.locator("h1")).toHaveCount(1);
    await page.keyboard.press("Tab");
    await expect(page.locator("a.skip")).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main$/);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    const menu = page.locator(".menu-toggle");
    if (await menu.isVisible()) {
      await menu.click();
      await expect(menu).toHaveAttribute("aria-expanded", "true");
      await expect(page.locator("#mobile-nav")).toBeVisible();
      await page.locator("#mobile-nav a").first().click();
      await expect(page).toHaveURL(new RegExp(`/${locale}/robots$`));
      await expect(page.locator("#mobile-nav")).toHaveCount(0);
      await page.goto(`/${locale}`);
    }
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
    await page.locator("main img").evaluateAll(async (images) => {
      await Promise.all(
        images.map(async (element) => {
          const image = element as HTMLImageElement;
          image.loading = "eager";
          await image.decode();
        }),
      );
    });
    await page.screenshot({
      path: `artifacts/browser/${locale}-${info.project.name}-home.png`,
      fullPage: true,
    });
  });

  for (const route of guides) {
    test(`${locale}: ${route} prepares the matching inquiry`, async ({
      page,
    }) => {
      await page.goto(`/${locale}/${route}`);
      const guide = page.locator(".buyer-guide");
      await expect(guide).toBeVisible();
      await expect(guide.locator("article")).toHaveCount(3);
      await guide.locator("a.button").click();
      await expect(page).toHaveURL(new RegExp(`/${locale}/request-quote\\?`));
      await expect(page.locator('[name="useCase"]')).not.toHaveValue("");
      await expect(page.locator('[name="consent"]')).not.toBeChecked();
    });
  }

  for (const route of [
    "robots",
    "products/unitree-g1",
    "manufacturers/unitree",
    "locations/cities/toronto-gta",
    "privacy",
  ]) {
    test(`${locale}: ${route} remains accessible at this viewport`, async ({
      page,
    }) => {
      await page.goto(`/${locale}/${route}`);
      await expect(page.locator("h1")).toHaveCount(1);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  }

  test(`${locale}: edits survive language switching without contact details in URLs`, async ({
    page,
  }) => {
    await page.goto(`/${locale}/request-quote?intent=rental&category=service`);
    await page
      .locator('[name="useCase"]')
      .fill("Supervised event demonstration");
    await page.locator('[name="startDate"]').fill("2027-05-10");
    await page.locator('[name="endDate"]').fill("2027-05-12");
    await page.locator('[name="name"]').fill("Synthetic Buyer");
    await page.locator('[name="email"]').fill("buyer@example.invalid");
    await expect(page.locator('[type="submit"]')).toBeDisabled();
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
    await page.locator("a.language").click();
    const other = locale === "en" ? "fr" : "en";
    await expect(page).toHaveURL(new RegExp(`/${other}/request-quote\\?`));
    await expect(page.locator('[name="useCase"]')).toHaveValue(
      "Supervised event demonstration",
    );
    await expect(page.locator('[name="startDate"]')).toHaveValue("2027-05-10");
    expect(page.url()).not.toContain("Synthetic");
    expect(page.url()).not.toContain("example.invalid");
  });
}
