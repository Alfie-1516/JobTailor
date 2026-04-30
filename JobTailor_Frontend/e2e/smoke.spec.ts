import { expect, test } from "@playwright/test";

const loginEmail = process.env.E2E_EMAIL;
const loginPassword = process.env.E2E_PASSWORD;

test.describe("public smoke", () => {
  test("home and dashboard are reachable", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("button", { name: "Get Started" })).toBeVisible();

    await page.goto("/pages/dashboard");
    await expect(page.getByText("Job Information")).toBeVisible();
  });

  test("login page renders core controls", async ({ page }) => {
    await page.goto("/auth/login");
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
    await expect(page.getByPlaceholder("Enter your email")).toBeVisible();
    await expect(page.getByPlaceholder("Enter password")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Sign up with Google" }),
    ).toBeVisible();
  });
});

test.describe("auth smoke", () => {
  test.skip(
    !loginEmail || !loginPassword,
    "Set E2E_EMAIL and E2E_PASSWORD to run auth smoke tests.",
  );

  test("login updates header and logout returns to signed-out state", async ({
    page,
  }) => {
    await page.goto("/auth/login");

    await page.getByPlaceholder("Enter your email").fill(loginEmail!);
    await page.getByPlaceholder("Enter password").fill(loginPassword!);
    await page.getByRole("button", { name: "Login" }).click();

    await page.waitForURL("**/pages/details");
    await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();

    await page.getByRole("button", { name: "Logout" }).click();

    await page.waitForURL("**/");
    await expect(page.getByRole("button", { name: "Get Started" })).toBeVisible();
  });
});
