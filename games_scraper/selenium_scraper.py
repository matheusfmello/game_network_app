from bs4 import BeautifulSoup
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
import re
import base64
import os

# Set up Selenium WebDriver (using Chrome in this example)
driver = webdriver.Chrome()  # or `webdriver.Firefox()` for Firefox

# URL of the page to scrape
url = "https://www.metacritic.com/browse/game/"

# Open the URL with Selenium
driver.get(url)

# Scroll down to load more games
SCROLL_PAUSE_TIME = 2
last_height = driver.execute_script("return document.body.scrollHeight")

while True:
    # Scroll down to the bottom
    driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.END)

    # Wait to load the page
    time.sleep(SCROLL_PAUSE_TIME)

    # Calculate new scroll height and compare with the last scroll height
    new_height = driver.execute_script("return document.body.scrollHeight")
    if new_height == last_height:
        break
    last_height = new_height

# Get the page source and parse it with BeautifulSoup
soup = BeautifulSoup(driver.page_source, 'html.parser')

# Close the WebDriver
driver.quit()

# Find all game cards
game_cards = soup.find_all('div', class_='c-finderProductCard')

# Initialize lists to store the data
titles = []
years = []
descriptions = []
image_files = []

# Ensure the images directory exists
os.makedirs('images', exist_ok=True)

# Loop through each game card and extract the required information
for card in game_cards:
    # Get game title
    title_element = card.find('div', class_='c-finderProductCard_title')
    game_title = title_element.text.strip() if title_element else 'N/A'
    # Remove any number followed by a period and space
    game_title = re.sub(r'^\d+\.\s', '', game_title)
    titles.append(game_title)
    
    # Extract year correctly
    meta_element = card.find('div', class_='c-finderProductCard_meta')
    year_element = meta_element.find('span', class_='u-text-uppercase') if meta_element else None
    game_year = year_element.text.strip()[-4:] if year_element else 'N/A'
    years.append(game_year)
    
    # Get game description
    description_element = card.find('div', class_='c-finderProductCard_description')
    game_description = description_element.text.strip() if description_element else 'N/A'
    descriptions.append(game_description)
    
    # Extract image URL and download the image using Selenium
    img_element = card.find('img')
    if img_element:
        img_data = driver.get_screenshot_as_base64()
        img_data = base64.b64decode(img_data)
        img_filename = os.path.join('server', 'data', 'images', f"{game_title.replace(' ', '_')}.jpg")
        with open(img_filename, 'wb') as handler:
            handler.write(img_data)
        image_files.append(img_filename)
    else:
        image_files.append('N/A')

# Create a DataFrame with the extracted data
data = {
    'Title': titles,
    'Year': years,
    'Description': descriptions,
    'Image': image_files
}
df = pd.DataFrame(data)

# Save the DataFrame to a CSV file
df.to_csv('./server/data/games_data.csv', index=False)
print("Data has been saved to games_data.csv")
