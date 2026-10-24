import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  outputDir: "artifacts/browser/results",
  reporter: [
    ["list"],
    ["json", { outputFile: "artifacts/browser/results.json" }],
  ],
  timeout: 45_000,
  workers: 2,
  use: {
    baseURL: "http://127.0.0.1:3005",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    launchOptions: process.env.CHROMIUM_PATH
      ? { executablePath: process.env.CHROMIUM_PATH }
      : {},
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    {
      name: "mobile",
      use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" },
    },
  ],
  webServer: {
    command: "pnpm start --port 3005",
    url: "http://127.0.0.1:3005/api/health",
    reuseExistingServer: false,
    env: {
      SITE_ENV: "production",
      SITE_URL: "https://botix.ca",
      INQUIRY_DELIVERY_ENABLED: "false",
      NEXT_PUBLIC_PHONE_VERIFIED: "false",
      NEXT_TELEMETRY_DISABLED: "1",
    },
  },
});
