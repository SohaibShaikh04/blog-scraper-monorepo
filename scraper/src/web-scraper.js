const axios = require('axios');
const cheerio = require('cheerio');
const { config } = require('./config');
const { delay } = require('./utils');

async function scrapeArticle(url) {
  try {
    console.log(`📄 Scraping: ${url}`);

    const response = await axios.get(url, {
      headers: {
        'User-Agent': config.scraping.userAgent
      },
      timeout: config.scraping.timeout
    });

    const $ = cheerio.load(response.data);

    let title = $('h1').first().text().trim() ||
                $('title').first().text().trim() ||
                $('meta[property="og:title"]').attr('content') ||
                'Untitled Article';

    title = title.split('|')[0].split('-')[0].trim();

    let content = '';
    
    const contentSelectors = [
      'article',
      '.article-content',
      '.post-content',
      '.entry-content',
      'main article',
      '[role="main"]'
    ];

    for (const selector of contentSelectors) {
      const elem = $(selector);
      if (elem.length > 0) {
        const textParts = [];
        elem.find('p, h2, h3, h4, li').each((i, el) => {
          const text = $(el).text().trim();
          if (text.length > 20) {
            textParts.push(text);
          }
        });
        content = textParts.join('\n\n');
        if (content.length > 200) break;
      }
    }

    if (content.length < 200) {
      const paragraphs = [];
      $('p').each((i, el) => {
        const text = $(el).text().trim();
        if (text.length > 50) {
          paragraphs.push(text);
        }
      });
      content = paragraphs.join('\n\n');
    }

    content = content
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n\n')
      .trim();

    if (!content || content.length < 100) {
      console.log(`⚠️  Insufficient content found for: ${url}`);
      return null;
    }

    console.log(`✅ Scraped: ${title.substring(0, 50)}...`);

    return {
      title,
      content,
      original_source_url: url,
      scraped_at: new Date().toISOString()
    };

  } catch (error) {
    console.error(`❌ Error scraping ${url}:`, error.message);
    return null;
  }
}

async function scrapeMultipleArticles(urls) {
  console.log(`\n📚 Scraping ${urls.length} articles...\n`);
  
  const articles = [];
  
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    
    let retries = 0;
    let article = null;
    
    while (retries < config.scraping.maxRetries && !article) {
      article = await scrapeArticle(url);
      if (!article && retries < config.scraping.maxRetries - 1) {
        retries++;
        console.log(`   Retry ${retries}/${config.scraping.maxRetries - 1}...`);
        await delay(config.scraping.delay);
      } else {
        break;
      }
    }
    
    if (article) {
      articles.push(article);
    }
    
    if (i < urls.length - 1) {
      await delay(config.scraping.delay);
    }
  }

  console.log(`\n✅ Successfully scraped ${articles.length}/${urls.length} articles\n`);
  return articles;
}

module.exports = {
  scrapeArticle,
  scrapeMultipleArticles
};
