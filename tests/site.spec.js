const { test, expect } = require("@playwright/test");
const { AxeBuilder } = require("@axe-core/playwright");

const pages = [
  { path: "/", name: "Root redirect" },
  { path: "/home.html", name: "Home" },
  { path: "/about.html", name: "About" },
  { path: "/method.html", name: "Strategy" },
  { path: "/domains.html", name: "Markets" },
  { path: "/disclosures.html", name: "Governance" },
  { path: "/contact.html", name: "Contact" },
  { path: "/terms.html", name: "Terms" },
  { path: "/privacy.html", name: "Privacy" }
];

for (const pageInfo of pages) {
  test(`${pageInfo.name} loads cleanly`, async ({ page, baseURL }) => {
    const consoleErrors = [];
    const failedRequests = [];
    const failedResponses = [];
    const baseOrigin = new URL(baseURL).origin;

    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });

    page.on("requestfailed", (request) => {
      if (request.url().startsWith(baseOrigin)) {
        failedRequests.push(`${request.method()} ${request.url()} ${request.failure()?.errorText ?? ""}`.trim());
      }
    });

    page.on("response", (response) => {
      if (response.url().startsWith(baseOrigin) && response.status() >= 400) {
        failedResponses.push(`${response.status()} ${response.url()}`);
      }
    });

    const response = await page.goto(pageInfo.path, { waitUntil: "networkidle" });
    expect(response?.ok(), `${pageInfo.path} should return a successful response`).toBeTruthy();

    await expect(page.locator("header.site-header")).toBeVisible();
    await expect(page.locator("main#mainContent")).toBeVisible();
    await expect(page.locator("footer.site-footer")).toBeVisible();

    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth
    }));
    expect(
      overflow.scrollWidth,
      `${pageInfo.path} should not have horizontal overflow`
    ).toBeLessThanOrEqual(overflow.clientWidth + 1);

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
    expect(consoleErrors, `${pageInfo.path} should not log console errors`).toEqual([]);
    expect(failedRequests, `${pageInfo.path} should not have failed local requests`).toEqual([]);
    expect(failedResponses, `${pageInfo.path} should not have failed local responses`).toEqual([]);
  });
}
