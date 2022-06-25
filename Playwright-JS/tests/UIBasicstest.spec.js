const {test, expect} = require('@playwright/test');


test('Browser Context Playwright text', async ({browser})=>
{

    // chrome - plugins/ cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    // css, xpath
    await page.locator("#username").type("rahulshetty");
    await page.locator("#password").type("learning");
    await page.locator("#signInBtn").click();
    //wait until this locator shown up page
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
});