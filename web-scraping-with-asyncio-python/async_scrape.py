
import os
import asyncio
from arsenic import get_session, keys, browsers, services
import pandas as pd
from requests_html import HTML
import itertools
import re
import time
import pathlib

import logging
import structlog # pip install structlog

def set_arsenic_log_level(level = logging.WARNING):
    # Create logger
    logger = logging.getLogger('arsenic')
    
    # We need factory, to return application-wide logger
    def logger_factory():
        return logger
    
    structlog.configure(logger_factory=logger_factory)
    logger.setLevel(level)



# /en/fabric/71433-genevieve-floral-by-crystal_walen
async def extract_id_slug(url_path):
    regex = r"^[^\s]+/(?P<id>\d+)-(?P<slug>[\w_-]+$"
    group = re.match(regex, url_path)
    if not group:
        return None, None
    return group['id'], group['slug']
    
    
async def get_links(body_content):
    html_r = HTML(html=body_content)
    fabric_links = [x for x in list(html_r.links) if x.startswith("/en/fabric")]
    datas = []
    for path in fabric_links:
        id_, slug_ = await extract_id_slug(path)
        data = {
            'id': id_,
            'slub': slug_,
            'path': path,
            'scraped': 0 # True / False -> 1 / 0
        }
        datas.append(data)
        
    return datas

async def scraper(url):
    service = services.Chromedriver()
    browser = browsers.Chrome(chromeOptions={
        'args': ['--headless', '--disable-gpu']
    })
    
    async with get_session(service, browser) as session:
        await session.get(url)
        body = await session.get_page_source()
        # print(body)
        return body
    
async def store_links_as_df_pickle(datas=[], name='links.pkl'):
    df = pd.DataFrame(datas)
    df.set_index('id', drop=True, inplace=True)
    df.to_pickle(name)
    return df

    
async def run(url):
    body_content = await scraper(url)
    links = await get_links(body_content)
    df = await store_links_as_df_pickle(links)
    return df
    
    
if __name__ == "__main__":
    url = 'https://www.spoonflower.com/en/shop?on=fabric'
    set_arsenic_log_level()
    # loop = asyncio.get_event_loop()
    # results = loop.run_until_complete(scraper(url))
    
    df = asyncio.run(run(url))
    print(df.head())
