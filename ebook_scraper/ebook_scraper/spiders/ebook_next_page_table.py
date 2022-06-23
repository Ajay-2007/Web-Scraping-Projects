import scrapy


class EbookSpiderNextPage(scrapy.Spider):
    name = "ebook_next_page_table"
    start_urls = [ "https://books.toscrape.com/catalogue/its-only-the-himalayas_981/index.html" ]

    def parse(self, response):
        table = response.css("table")

        product_details = {}

        for row in table.css('tr'):

            heading = row.css("th::text").get()
            data = row.css("td::text").get()

            product_details[heading] = data

        yield product_details