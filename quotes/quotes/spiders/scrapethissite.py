from scrapy.selector import Selector
from scrapy_playwright.page import PageCoroutine
import scrapy


class ScrapeThisSpider(scrapy.Spider):
    name = 'scrapethissite'
    
    def start_requests(self):
        
        yield scrapy.Request(
            "https://www.scrapethissite.com/pages/ajax-javascript/",
            meta={
                "playwright": True,
                "playwright_include_page": True,
                "playwright_page_coroutines": [
                    PageCoroutine("click", "a#2015"),
                    PageCoroutine("wait_for_selector", "tr.film"),
                ]
            }
        )

    async def parse(self, response):
        
        # table = response.css("table")

        for row in response.css("tr.film"):
            yield {
                "title": row.css("td.film-title::text").get(),
                "awards": row.css("td.film-awards::text").get()
            }