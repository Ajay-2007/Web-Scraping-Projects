import json
import scrapy

# proxy: 12.151.56.30
class BookSpider(scrapy.Spider):
    name = 'book_spider'
    

    def __init__(self, category='travel_2', *args, **kwargs):
        super().__init__(*args, **kwargs)

        print(" [ Category ]:", category)
        self.start_urls = [
            f"https://books.toscrape.com/catalogue/category/books/{category}"
        ]


    def parse(self, response):
        title = response.css("h3 a").attrib["title"]
        price = response.css("p.price_color::text").get()

        print("[ Title ]:", title)
        print("[ Price ]:", price)