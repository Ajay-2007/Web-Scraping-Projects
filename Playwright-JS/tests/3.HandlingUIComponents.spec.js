const {test, expect} = require("@playwright/test");


test('handling static select dropdown options', async ({page}) => 
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName =  page.locator("#username");
    const userPassword = page.locator("#password");
    const signIn = page.locator("#signInBtn");

    const documentLink = page.locator("[href*='documents-request']");

    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");

    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();

    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();

    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();

    await expect(documentLink).toHaveAttribute('class', 'blinkingText');

    // assertion
    await page.pause();

});

test('Handling Child windows & Tabs by switching browser context', async ({browser}) => 
{
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click()
    ]);

    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain = arrayText[1].split(" ")[0]
    // console.log(domain);

    await page.locator("#username").type(domain);
    
    console.log(await page.locator("#username").textContent());
    await page.pause();
    
});

