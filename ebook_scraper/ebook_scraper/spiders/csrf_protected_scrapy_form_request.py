import scrapy


class ScrapyFormRequest(scrapy.Spider):
    name = "csrf_protected_scrapy_form_request"

    start_urls = [ "https://www.scrapethissite.com/pages/advanced/?gotcha=csrf" ]


    def parse(self, response):

        csrf_token = response.css("input[name='csrf']").attrib["value"]

        print("[ CSRF ]:", csrf_token)

        yield scrapy.FormRequest(
            self.start_urls[0],
            formdata={
                "user": "username",
                "pass": "password",
                "csrf": csrf_token
            },
            callback=self.parse_login
        )

    def parse_login(self, response):
        print(
            "[ RESULT ]:",
            response.css("div.row div::text").get().strip()
        )