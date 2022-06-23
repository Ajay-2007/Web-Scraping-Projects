import scrapy
from scrapy_playwright.page import PageCoroutine


class InfiniteScrollSpider(scrapy.Spider):
    name = 'pdf'
    
    def start_requests(self):
        
        yield scrapy.Request(
            "https://docs.scrapy.org/en/latest/topics/asyncio.html",
            meta={
                "playwright": True,
                "playwright_include_page": True
            }
        )

    async def parse(self, response):

        page = response.meta["playwright_page"]

        pdf_bytes = await page.pdf(path="asyncio.pdf")

        await page.close()

    #     self.save_pdf(pdf_bytes)

    # def save_pdf(self, bytes):
    #     with open("new_pdf.pdf", "wb") as file:
    #         file.write(bytes)
