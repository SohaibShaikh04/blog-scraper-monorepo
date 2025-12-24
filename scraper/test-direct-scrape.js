const { scrapeMultipleArticles } = require('./src/web-scraper');
const { rewriteMultipleArticles } = require('./src/llm-rewriter');
const { publishArticles } = require('./src/publisher');

async function testDirectScrape() {
  // Test with these URLs
  const testUrls = [
    'https://beyondchats.com/blogs/choosing-the-right-ai-chatbot-a-guide/',
    'https://beyondchats.com/blogs/introduction-to-chatbots/'
  ];

  console.log('📚 Scraping articles...');
  const articles = await scrapeMultipleArticles(testUrls);

  console.log('\n🤖 Rewriting with Gemini...');
  const rewritten = await rewriteMultipleArticles(articles);

  console.log('\n📤 Publishing to backend...');
  await publishArticles(rewritten);

  console.log('\n✅ Done!');
}

testDirectScrape();