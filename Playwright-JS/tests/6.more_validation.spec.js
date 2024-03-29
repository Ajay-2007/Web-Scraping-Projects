const {test, expect} = require('@playwright/test');


test("Popup validations", async ({page}) => 
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("htt://google.com");
    // await page.goBack();
    // await page.goForward();

    await expect(page.locator("#displayed-text")).toBeVisible();

    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

})