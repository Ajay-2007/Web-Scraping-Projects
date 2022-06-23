from openpyxl import Workbook
from itemadapter import ItemAdapter
from pymongo import MongoClient


class EbookScraperPipeline:

    def open_spider(self, spider):
        self.workbook = Workbook()
        self.sheet = self.workbook.active
        self.sheet.title = "ebooks"
        self.sheet.append(spider.cols)

    def process_item(self, item, spider):
        self.sheet.append([
            item['title'],
            item['price']
        ])

        return item

    def close_spider(self, spider):
        self.workbook.save("ebooks.xlsx")


class EbookScraperMongoDBPipeline:

    def open_spider(self, spider):
        self.client = MongoClient(
            host="mongodb+srv://mongodb_username:mongodb_password@cluster0.ag8mohs.mongodb.net/?retryWrites=true&w=majority",
            connect=False
        )

        self.collection = self.client.get_database("ebook").get_collection("mystery")

    def process_item(self, item, spider):
        self.collection.insert_one(
            ItemAdapter(item).asdict()
        )
        return item

    def close_spider(self, spider):
        self.client.close()
