const {test, expect} = require('@playwright/test');
const fs = require('fs');
const path = require('path');


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

    let data = [];

    const count = await page_cards.count();
    let href_links = [];

    for (let j = 0; j < count; j++) {

        try {
            const newPage = await context.newPage();

        
            let data_dict = {};
    
            data_dict['index'] = j
    
            href = await page_cards.nth(j).getAttribute('href');
            href_links.push(href);
            
            await newPage.goto(href);
            await newPage.waitForLoadState('networkidle');
    
            await newPage.waitForSelector('//div[@class="appx-extended-detail-subsection-description slds-truncate"]');
    
            const _companyName = newPage.locator(".slds-section__title.appx-section__title");
            const companyName = await _companyName.last().textContent();
            const company = companyName.split(' ')[1].trim();
    
    
            // const companyName = await newPage.locator('//*[@id="consulting-header-bar-title-id"]').textContent();
            // const companyName = await newPage.locator('(//p[@class="slds-section__title appx-section__title"])[6]').textContent();
            const company_info = newPage.locator('//div[@class="appx-extended-detail-subsection-description slds-truncate"]');
            const company_info_2 = newPage.locator('//span[@class="appx-summary-bar_facts-value"]');
    
    
            const phone_num = await newPage.locator('//div[@class="appx-extended-detail-subsection-description"]').textContent();
    
            const reviewsLocator = newPage.locator('#tab-default-2__item');
    
    
            reviews = await reviewsLocator.textContent();
    
            const textContents = await company_info.allTextContents();
            const textContents_2 = await company_info_2.allTextContents();
    
            textContents.forEach(_trim);
            textContents_2.forEach(_trim);
    
            headquarter = textContents[0].trim();
    
            domain_name = textContents[1].trim();
            var r = /:\/\/(.[^/]+)/;
            
            data_dict['Company Name'] = company;
            data_dict['AppExchange Listing URL'] = href;
            data_dict['Certified Experts'] = textContents_2[2].trim();
            data_dict['Projects Completed'] = textContents_2[1].trim();
            data_dict['Founded Year'] = textContents_2[3].trim();
            data_dict['Number of Reviews'] = reviews.split(" ").slice(-1)[0].split("(").slice(-1)[0].split(")")[0];
            data_dict['Headquarters (City, State, Country)'] = headquarter
            data_dict["Website"] = textContents[1].trim();
            data_dict['Domain'] = domain_name.match(r)[1];
            data_dict['Phone'] = phone_num.trim();
            data_dict['Email'] = textContents[2].trim();
    
            await newPage.locator('#tab-default-2__item').click();
            await newPage.waitForLoadState('networkidle');
            
            await newPage.waitForSelector('.appx-average-rating-numeral');
            await newPage.waitForSelector('.appx-extended-detail-review-count');
    
            const rating = await newPage.locator('.appx-average-rating-numeral').textContent();
    
            data_dict['Rating'] = rating;
    
    
            fs.appendFileSync(path.resolve(__dirname, 'appexchange.json'), JSON.stringify(data_dict));
    
            data.push(data_dict)
            console.log(data_dict)
            await newPage.close();

        } catch (err) {
            console.log(err);
            continue;
        }
    }

    fs.writeFileSync(path.resolve(__dirname, 'appexchange_2.json'), JSON.stringify(data));
    await context.close();
    await browser.close();
});


function _trim(item) {
    item.trim();
}

