from datetime import date
import json
import scrapy


class AmazonTrackerSpider(scrapy.Spider):
    name = 'amazon_tracker'

    def __init__(self, query=None, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.base_url = "https://www.amazon.com"
        self.search_url = "https://www.amazon.com/s?k={query}"

        self.rank = None
        self.page_num = 1
        self.query = query if query is not None else self.query

        print("[ query ]:", self.query)
        self.start_urls = [ self.search_url.format(
            query = self.query.replace(" ", "+")
        ) ]

    def parse(self, response):
        title = "Python 3.10: A Complete Guide Book To Python Programming For Beginners"
        # title = "Python Coding for Kids Ages 10+: A Descriptive and Fun Guide to introduce Python Programming"
        # title += " [Color Edition]"
        search_results = response.css("div.s-result-item "
                                      "h2 > a > span::text").getall()

        if title in search_results:
            print(f"============================= result found ===============================")
            page_pos = search_results.index(title) + 1
            self.rank = (self.page_num - 1) * 48 + page_pos
        
        else:
            next_btn = response.css("a.s-pagination-next")

            if next_btn:
                self.page_num += 1

                yield scrapy.Request(
                    url=self.base_url + next_btn.attrib['href']
                )

            else:
                self.rank = "Not found!"
            
        # print("================")
        # print(self.rank)
        self.export()

    def export(self):
        today = date.today().strftime("%d-%m-%Y")

        # with open("amazon_tracker.json", encoding='utf-8', errors='ignore') as file:
        #     dt = json.load(file, strict=False)

        with open("amazon_tracker.json") as file:
            dt = json.loads(file)
            print("=================")
            print(dt)


        if self.query in dt:
            dt[self.query][today] = self.rank

        else:
            dt[self.query] = {
                today: self.rank
            }

        print(f"================= {dt} ======================")
        with open("amazon_tracker.json", "w") as file:
            json.dump(dt, file)

        yield dt