import { expect, test } from "@playwright/test";

test("Index page has Play Button", async ({ page }) => {
  await page.goto("/");
  expect(await page.textContent("main > button")).toBe("Play");
});

test("Clicking About moves you to About Page", async ({ page }) => {
  await page.goto("/");
  await page.click("text=About");
  await page.waitForNavigation();

  expect(page.url()).toMatch(/\/about$/);
});

test("Clicking App Text brings you back to home page", async ({ page }) => {
  await page.goto("/about");
  await page.click("text=MIND");
  await page.waitForNavigation();
  expect(page.url()).toMatch(/:3000\/?$/);
});
