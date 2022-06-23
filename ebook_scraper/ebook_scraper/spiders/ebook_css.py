import scrapy


class EbookSpider(scrapy.Spider):
    name = "ebook_css"
    start_urls = [ "https://books.toscrape.com/" ]

    def parse(self, response):
        print("[ parse] ]")

        print("[CSS]:", response.css("h3 a::text")[0])

        print("[XPATH]:", response.xpath("//h3/a/text()")[0])

        print(response.css(".price_color::text").get())
        print(response.css("#messages").get())

        print(response.css("a[title = 'Soumission']").get())

        