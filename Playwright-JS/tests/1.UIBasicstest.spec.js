const {test, expect} = require('@playwright/test');


test('Browser Context Playwright text', async ({browser})=>
{

    // chrome - plugins/ cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator(".card-body a");

    // css, xpath
    await userName.type("rahulshetty");
    await page.locator("#password").type("learning");
    await signIn.click();
    //wait until this locator shown up page
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');


    // type - fill
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();


    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());

    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles)
});


test('register and login with playwright codegen', async ({page}) => 
{
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("text=Register here").click();

    const firstName = page.locator("[placeholder='First Name']");
    const lastName = page.locator("[placeholder='Last Name']");
    const email = page.locator("[placeholder='email@example.com']");
    const number = page.locator("[placeholder='enter your number']");

    const optionSelect = page.locator("select");

    await firstName.fill("username");
    await lastName.fill("password");
    await email.fill("username@gmail.com");
    await number.fill("1234567890");
    await page.locator('input[type="radio"]').first().check();
    await optionSelect.selectOption("4: Scientist");

    await page.locator('[placeholder="Passsword"]').fill('Password@@@@@123');
    await page.locator('[placeholder="Confirm Passsword"]').fill('Password@@@@@123');

    await page.locator("text=I am 18 year or Older").click();

    await page.locator("input:has-text('Register')").click();

    await page.locator("text=Already have an account? Login here").click()

    await page.locator("[placeholder='email@example.com']").fill("username@gmail.com");
    await page.locator('[placeholder="enter your passsword"]').fill("Password@23");

    await page.locator('text=Login').click();

    
})

test('Browser Context Playwright waitForNavigation', async ({browser})=>
{

    // chrome - plugins/ cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator(".card-body a");

    // css, xpath
    await userName.type("rahulshetty");
    await page.locator("#password").type("learning");
    await signIn.click();
    //wait until this locator shown up page
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    // type - fill
    await userName.fill("");
    await userName.fill("rahulshettyacademy");

    // for non service apps
    // race condition
    await Promise.all(
      [
        page.waitForNavigation(),
        signIn.click(),
      ]  
    );
    // console.log(await cardTitles.first().textContent());
    // console.log(await cardTitles.nth(1).textContent());

    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles)
});