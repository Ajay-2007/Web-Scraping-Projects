const {test, expect} = require('@playwright/test');



test('4.upwork_job_1', async ({browser})=>
{

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://appexchange.salesforce.com/consulting");

    var i = 0;

    while (i < 1) {
            await page.locator('button:has-text("Show More")').click();
            await page.waitForLoadState('networkidle');

            i = i + 1;
        }

    const page_cards = page.locator('//a[@class="appx-tile appx-tile-consultant   tile-link-click "]');
    
    await page.waitForLoadState('networkidle');

    var data_dict = {
        'Company Name': null,
        'AppExchange Listing URL': null,
        'Rating': null,
        'Certified Experts': null,
        'Projects Completed': null,
        'Founded Year': null,
        'Number of Reviews': null,
        'Headquarters City': null,
        'Headquarters State': null,
        'Headquarters Country': null,
        'Website': null,
        'Domain': null,
        'Email': null,
        'Phone': null
    }

    let data = [ ]

    const count = await page_cards.count();

    let href_links = [];

    const newPage = await context.newPage();

    for (let j = 0; j < count; j++) {
        href = await page_cards.nth(i).getAttribute('href');
        href_links.push(href);
        
        await newPage.goto(href);
        await newPage.waitForLoadState('networkidle');

        await newPage.waitForSelector('//div[@class="appx-extended-detail-subsection-description slds-truncate"]');

        const company_info = newPage.locator('//div[@class="appx-extended-detail-subsection-description slds-truncate"]');

        const companyName = newPage.locator('//*[@id="consulting-header-bar-title-id"]').textContent();

        const phone_num = await newPage.locator('//div[@class="appx-extended-detail-subsection-description"]').textContent();
        const company_info_2 = newPage.locator('//span[@class="appx-summary-bar_facts-value"]');

        const reviewsLocator = newPage.locator('//*[@id="tab-default-2__item"]');


        const textContents = await company_info.allTextContents();
        const textContents_2 = await company_info_2.allTextContents();

        textContents.forEach(_trim);
        textContents_2.forEach(_trim);

        data_dict['Company Name'] = companyName;

        data_dict['Company Name'] = textContents[0].trim();

        headquarter = textContents[0].trim();
        if (headquarter.length >= 3){
            data_dict['Headquarters City'] = textContents[0].split()[0]
            data_dict['Headquarters State'] = textContents[0].split()[1]
            data_dict['Headquarters Country'] = textContents[0].split()[2]
        }
        else if (headquarter.length == 2) {
            data_dict['Headquarters City'] = textContents[0].split()[0]
            data_dict['Headquarters State'] = textContents[0].split()[1]
            data_dict['Headquarters Country'] = null
        }
        else {

        }


        data_dict['AppExchange Listing URL'] = textContents[1].trim();
        data_dict['Email'] = textContents[2].trim();

        data_dict['Phone'] = phone_num.trim();

        data_dict['Projects Completed'] = textContents_2[1].trim();
        data_dict['Certified Experts'] = textContents_2[2].trim();
        data_dict['Founded Year'] = textContents_2[3].trim();

        await reviewsLocator.click();
        // await newPage.waitForLoadState('networkidle');
        await newPage.waitForSelector('//div[@class="appx-average-rating-numeral"]');

        // await Promise.all(
        //     [
        //       newPage.waitForNavigation(),
        //       reviewsLocator.click(),
        //     ]  
        // );

        const rating = await newPage.locator('//div[@class="appx-average-rating-numeral"]').textContent();

        const noOfReviews = newPage.locator('//div[@class="appx-extended-detail-review-count"]').textContent();

        data_dict['Rating'] = rating;

        data_dict['Number of Reviews'] = noOfReviews;

        data.push(data_dict)


        console.log(data)
    }


    await page.pause();

    await context.close();
    await browser.close();
});


function _trim(item) {
    item.trim();
}
