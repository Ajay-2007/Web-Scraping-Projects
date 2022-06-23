from selenium import webdriver
import time

driver = webdriver.Firefox()



driver.get("https://www.koinknight.com/en/")

time.sleep(60)

driver.get("https://www.koinknight.com/en/arbitrage/direct")

div_element = driver.find_element_by_css_selector('div.row ng-star-inserted')
