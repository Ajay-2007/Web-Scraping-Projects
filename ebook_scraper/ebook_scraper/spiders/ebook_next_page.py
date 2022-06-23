import scrapy

from scrapy.loader import ItemLoader
from ebook_scraper.items import EbookItemNextPage


class EbookSpiderNextPage(scrapy.Spider):
    name = "ebook_next_page"
    cols = ["Title", "Price"]
    start_urls = [ "https://books.toscrape.com/catalogue/category/books/travel_2/" ]

    def parse(self, response):
        ebooks = response.css("article.product_pod")


        for ebook in ebooks:
            url = ebook.css("h3 a").attrib["href"]

            yield scrapy.Request(
                url = f"{self.start_urls[0]}/{url}",
                callback = self.parse_details
            )

    def parse_details(self, response):
        main = response.css("div.product_main")

        loader = ItemLoader(
            item=EbookItemNextPage(),
            selector=main
        )

        loader.add_css("title", "h1::text")
        loader.add_css("price", "p.price_color::text")

        quantity_p = main.css("p.availability")

        loader.add_value(
            "quantity",
            quantity_p.re(r'\(.+ available\)')[0]
        )

        yield loader.load_item()
