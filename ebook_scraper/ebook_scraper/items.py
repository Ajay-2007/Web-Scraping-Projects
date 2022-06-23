from scrapy import Item, Field
from itemloaders.processors import MapCompose, TakeFirst


def get_price(txt):
    return float(txt.replace('£', ''))


def convert_to_dollar(pounds):
    return pounds * 0.89


def get_quantity(txt):
    return int(
        txt.replace('(', '').split()[0]
    )

class EbookItem(Item):
    title = Field(
        output_processor=TakeFirst()
    )
    price = Field(
        input_processor=MapCompose(get_price, convert_to_dollar),
        output_processor=TakeFirst()
    )


class EbookItemNextPage(Item):
    title = Field(
        output_processor=TakeFirst()
    )
    price = Field(
        input_processor=MapCompose(get_price, convert_to_dollar),
        output_processor=TakeFirst()
    )

    quantity = Field(
        input_processor=MapCompose(get_quantity),
        output_processor=TakeFirst()
    )
