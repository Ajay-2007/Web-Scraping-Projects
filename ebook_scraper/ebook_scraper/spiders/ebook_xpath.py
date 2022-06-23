import scrapy


class EbookSpider(scrapy.Spider):
    name = "ebook_xpath"
    start_urls = [ "https://books.toscrape.com/" ]

    def parse(self, response):
        print("[ parse] ]")

        # print(response.xpath("//h3/a").get())

        # print(response.xpath("//a[@title]").get())

        # print(response.xpath("//p[@class = 'price_color']").get())

        print(response.xpath("//h3/a/@title").get())