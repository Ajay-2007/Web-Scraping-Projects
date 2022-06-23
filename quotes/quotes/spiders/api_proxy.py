import json
import scrapy

# proxy: 12.151.56.30
class ApiSpider(scrapy.Spider):
    name = 'api_proxy'
    

    start_urls = [ "https://quotes.toscrape.com/api/quotes?page=1" ]

    # proxy set in middlewares
    # def start_requests(self):
    #     yield scrapy.Request(
    #         "https://quotes.toscrape.com/api/quotes?page=1",
    #         meta={
    #             'proxy': '12.151.56.30'
    #         }
    #     )


    def parse(self, response):
        dt = json.loads(response.body)

        yield dt

        if dt['has_next']:
            yield scrapy.Request(
                f"https://quotes.toscrape.com/api/quotes?page={dt['page'] + 1}"
            )
    