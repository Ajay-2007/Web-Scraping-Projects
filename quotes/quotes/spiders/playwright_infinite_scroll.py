import scrapy
from scrapy_playwright.page import PageCoroutine


class InfiniteScrollSpider(scrapy.Spider):
    name = 'infinite_scroll'
    
    def start_requests(self):
        
        yield scrapy.Request(
            "https://quotes.toscrape.com/scroll",
            meta={
                "playwright": True,
                "playwright_include_page": True,
                "playwright_page_coroutines": [
                    PageCoroutine("evaluate", "window.scrollBy(0, document.body.scrollHeight)"),
                    PageCoroutine("wait_for_selector", "div.quote:nth-child(11)")
                ]
            }
        )

    async def parse(self, response):
        lst = []

        for quote in response.css("span.text::text").getall():
            lst.append(quote)
        
        print("[ Quotes Count ]:", len(lst))
        print("[ Quotes ]:", lst)
