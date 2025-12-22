import requests
from bs4 import BeautifulSoup
import json
import time

def scrape_beyondchats_blogs():
    base_url = "https://beyondchats.com/blogs"
    
    print("Fetching blog page...")
    response = requests.get(base_url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Find pagination links
    pagination_links = soup.find_all('a', href=lambda x: x and '/blogs/page/' in x if x else False)
    
    last_page = 1
    for link in pagination_links:
        href = link.get('href', '')
        if '/page/' in href:
            try:
                page_num = int(href.split('/page/')[-1].strip('/'))
                if page_num > last_page:
                    last_page = page_num
            except:
                continue
    
    print(f"Found last page: {last_page}")
    
    # Get the last page
    last_page_url = f"{base_url}/page/{last_page}/"
    print(f"Fetching last page: {last_page_url}")
    response = requests.get(last_page_url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Find all article links
    article_containers = soup.find_all('a', href=lambda x: x and '/blogs/' in x and x != '/blogs/' if x else False)
    
    article_links = []
    seen_urls = set()
    
    for link in article_containers:
        href = link.get('href', '')
        if '/blogs/' in href and '/page/' not in href and href != '/blogs/':
            if not href.startswith('http'):
                href = f"https://beyondchats.com{href}"
            if href not in seen_urls:
                article_links.append(href)
                seen_urls.add(href)
    
    print(f"Found {len(article_links)} articles on last page")
    
    # Get the oldest 5 articles
    oldest_articles = article_links[:5]
    
    articles_data = []
    
    for idx, url in enumerate(oldest_articles, 1):
        print(f"\nScraping article {idx}/5: {url}")
        try:
            article_response = requests.get(url)
            article_soup = BeautifulSoup(article_response.content, 'html.parser')
            
            # Extract title
            title_tag = article_soup.find('h1')
            if title_tag:
                title = title_tag.get_text(strip=True)
            else:
                title_tag = article_soup.find('title')
                title = title_tag.get_text(strip=True) if title_tag else "Untitled Article"
            
            # Extract content
            content_parts = []
            
            article_body = (
                article_soup.find('article') or
                article_soup.find('div', class_=lambda x: x and any(word in str(x).lower() for word in ['content', 'entry', 'post-content', 'article-body']) if x else False) or
                article_soup.find('main')
            )
            
            if article_body:
                for elem in article_body.find_all(['p', 'h2', 'h3', 'h4', 'li']):
                    text = elem.get_text(strip=True)
                    if text and len(text) > 20:
                        content_parts.append(text)
            
            content = '\n\n'.join(content_parts) if content_parts else "Content not available"
            
            articles_data.append({
                'title': title,
                'content': content,
                'original_source_url': url
            })
            
            print(f"✓ Successfully scraped: {title[:50]}...")
            time.sleep(1)
            
        except Exception as e:
            print(f"✗ Error scraping {url}: {e}")
    
    return articles_data

if __name__ == "__main__":
    print("="*60)
    print("BeyondChats Blog Scraper")
    print("="*60)
    
    articles = scrape_beyondchats_blogs()
    
    output = json.dumps(articles, indent=2, ensure_ascii=False)
    
    print("\n" + "="*60)
    print(f"Successfully scraped {len(articles)} articles!")
    print("="*60)
    
    # Save to file
    with open('scraped_articles.json', 'w', encoding='utf-8') as f:
        f.write(output)
    
    print("\n✓ Saved to scraped_articles.json")