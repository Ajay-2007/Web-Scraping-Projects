const {test, expect} = require('@playwright/test');


test('register and login with playwright codegen', async ({page}) => 
{

    
    await page.goto("https://rahulshettyacademy.com/client");

    await page.locator("#userEmail").fill("username@gmail.com");
    await page.locator("#userPassword").fill("Password@@@@@123");
    await page.locator("[value='Login']").click();

    // wait until network is idle
    await page.waitForLoadState('networkidle');

    //Zara Coat 3
    const products = page.locator(".card-body");
    const productName = "zara coat 3"
    
    await page.pause();
    const count = await products.count();
    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            // add to cart
            
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    // await page.pause();

    // await page.waitForLoadState('networkidle');

    await page.locator("[routerlink*='cart']").click();

    await page.locator('div li').first().waitFor();

    const bool = page.locator("h3:has-text('zara coat 3')").isVisible();

    expect(bool).toBeTruthy();

    // checkout button from css selector of button tag
    // await page.locator("button[type='button']").click()
    await page.locator('text=Checkout').click();
    // delay will help us to slow the typing process with which the website will load the suggested country
    await page.locator("[placeholder*='Country']").type("ind", {delay : 100});

    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();

    const optionsCount = await dropdown.locator("button").count();

    for(let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();

        if (text.trim() === "India") {
            // click 
            await dropdown.locator("button").nth(i).click();
            break
        }
    }

    const email = "username@gmail.com";

    await expect(page.locator(".user__name input[type='text']")).toHaveText(email);

    await page.locator(".action__submit").click();

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    const orderIds = await page.locator(".em-spacer-1 .ng-star-inserted").allTextContents();
    console.log(orderIds);

    // await page.locator('button[routerlink="/dashboard/myorders"]').click();
    await page.locator('button[routerlink*="myorders"]').click();

    // wait until the table body show up
    await page.locator("tbody").waitFor();
    
    // const tableRows = page.locator('table .ng-star-inserted');
    const tableRows = page.locator('tbody tr');

    const tableRowsCount = await tableRows.count();

    console.log(orderIds[0]);
    for (i = 0; i < tableRowsCount; ++i) {
        // const orderId = await tableRows.nth(i).locator("table .ng-star-inserted th[scope='row']").textContent();
        // const orderId = await tableRows.nth(i).locator("th[scope='row']").textContent();
        const orderId = await tableRows.nth(i).locator("th").textContent();
        if (orderId.includes(orderIds[i])) {
            // console.log('order id found');
            await tableRows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderIds[0].includes(orderIdDetails)).toBeTruthy();
    
})