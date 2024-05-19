import { test } from "@playwright/test";

const iterationCount = 300;

const setup = (test: any) => test.setTimeout(90000);
setup(test);

for (let iteration = 0; iteration < iterationCount; iteration++) {
  test(`iteration: ${iteration}`, async ({ page }) => {

    // await page.goto("http://localhost:3000/api/airports")
  
//    await page.goto("http://localhost:3000/");

    await page.goto("https://toggle-words.up.railway.app/");

    await page.click('button.signin')

    console.log("signin clicked")

    // Wait for products to load
    await page.waitForSelector('button.score', { timeout: 60000 });

    await page.waitForTimeout(1000);
    // Logging to see the actions taken
    console.log(`Iteration: ${iteration}`);
  })
}
