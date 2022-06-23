import scrapy
from scrapy_playwright.page import PageCoroutine


class InfiniteScrollSpider(scrapy.Spider):
    name = 'screenshot'
    
    def start_requests(self):
        
        yield scrapy.Request(
            "https://unsplash.com/photos/2icz9jl5g1k",
            meta={
                "playwright": True,
                "playwright_include_page": True
            }
        )

    async def parse(self, response):

        page = response.meta["playwright_page"]

        await page.screenshot(path="snip.png", full_page=True)

        await page.close()
