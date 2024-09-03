import os
import re
import requests
from bs4 import BeautifulSoup
import pandas as pd

# Sample URL (replace with the actual URL)
url = "https://www.metacritic.com/browse/game/"

response = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})

if response.status_code == 200:
    
    soup = BeautifulSoup(response.content, 'html.parser')
    
    game_cards = soup.find_all('div', class_='c-finderProductCard')

    titles = []
    years = []
    descriptions = []
    image_urls = []

    image_dir = 'images'
    if not os.path.exists(image_dir):
        os.makedirs(image_dir)

    for idx, card in enumerate(game_cards):
        # Get game title
        title_element = card.find('div', class_='c-finderProductCard_title')
        if title_element:
            title_text = title_element.text.strip()
            match = re.search(r'\d+\.\s*(.*)', title_text)
            game_title = match.group(1) if match else title_text
        else:
            game_title = 'N/A'
        titles.append(game_title)
        
        # Get game year
        meta_element = card.find('div', class_='c-finderProductCard_meta')
        year_element = meta_element.find('span', class_='u-text-uppercase') if meta_element else None
        game_year = year_element.text.strip()[-4:] if year_element else 'N/A'
        years.append(game_year)
                
        # Get game description
        description_element = card.find('div', class_='c-finderProductCard_description')
        game_description = description_element.text.strip() if description_element else 'N/A'
        descriptions.append(game_description)
        
        # Get and download image URL
        img_element = card.find('picture').find('img')
        if img_element:
            image_url = img_element.get('src') or img_element.get('data-src') or img_element.get('data-original') or 'N/A'
        else:
            image_url = 'N/A'
        
        image_urls.append(image_url)
        
        # Download and save the image
        if image_url != 'N/A':
            image_response = requests.get(image_url, stream=True)
            if image_response.status_code == 200:
                image_path = os.path.join(image_dir, f"{game_title}.jpg")
                with open(image_path, 'wb') as f:
                    for chunk in image_response:
                        f.write(chunk)

    # Create a DataFrame with the extracted data
    data = {
        'Title': titles,
        'Year': years,
        'Description': descriptions,
        'Image URL': image_urls
    }
    df = pd.DataFrame(data)

    # Save the DataFrame to a CSV file
    df.to_csv('games_data.csv', index=False)
    print("Data has been saved to games_data.csv")
else:
    print(f"Failed to retrieve the page. Status code: {response.status_code}")
