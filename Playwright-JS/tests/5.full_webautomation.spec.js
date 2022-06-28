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
    
    const count = await products.count();
    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            // add to cart
            
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await page.pause();
    
})