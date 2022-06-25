import scrapy
import json


class EbooksApiSpider(scrapy.Spider):
    name = 'ebooks_api'
    start_urls = ['https://www.ebooks.com/api/search/subject/?ResultOrder=Popularity&pageNumber=1&CountryCode=DE&subjectId=13']


    def parse(self, response):

        dt = json.loads(response.body)

        # print(dt)
        books = dt['books']

        for book in books:
            yield {
                'title': book['title'],
                'subtitle': book['subtitle'],
                'author': book['authors'][0]['author_name'],
                'publisher': book['publisher'],
                'publication_year': book['publication_year'],
                'price': book['price']
            }
        
        pages = dt['pages']

        if dt['next_page']:
            for page in pages:
                if page['is_selected']:
                    yield scrapy.Request(
                        url=f"https://www.ebooks.com/api/search/subject/?ResultOrder=Popularity&pageNumber={int(page['number']) + 1}&CountryCode=DE&subjectId=13"
                    )
