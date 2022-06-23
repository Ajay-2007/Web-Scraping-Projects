import scrapy


class QuoteSpider(scrapy.Spider):
    name = 'quote_playwright'
    
    def start_requests(self):
        
        yield scrapy.Request(
            "https://quotes.toscrape.com/js/",
            meta={
                "playwright": True,
                "playwright_include_page": True
            }
        )

    async def parse(self, response):
        page = response.meta["playwright_page"]

        title = await page.title()

        for quote in response.css("div.quote span.text::text").getall():
            yield {
                "quote": quote
            }

        await page.close()
