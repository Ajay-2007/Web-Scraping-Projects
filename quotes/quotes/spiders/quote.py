import scrapy


class QuoteSpider(scrapy.Spider):
    name = 'quote'
    
    def start_requests(self):
        
        yield scrapy.Request(
            "https://quotes.toscrape.com/js/",
            meta={
                "playwright": True,
            }
        )

    def parse(self, response):
        
        for quote in response.css("div.quote span.text::text").getall():
            yield {
                "quote": quote
            }
