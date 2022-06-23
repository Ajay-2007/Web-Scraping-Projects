import scrapy


class ScrapyFormRequest(scrapy.Spider):
    name = "scrapy_form_request"

    def start_requests(self):
        
        
        yield scrapy.FormRequest(
            url="https://www.scrapethissite.com/pages/advanced/?gotcha=login",
            formdata={
                "user": "username",
                "pass": "password"
            },
            callback=self.parse
        )

    def parse(self, response):
        print(
            "[ RESULT ]:",
            response.css("div.container div div::text").get()
        )