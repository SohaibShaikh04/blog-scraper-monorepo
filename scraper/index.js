const { config, validateConfig } = require('./src/config');
const { searchGoogle } = require('./src/google-search');
const { scrapeMultipleArticles } = require('./src/web-scraper');
const { rewriteMultipleArticles } = require('./src/llm-rewriter');
const { publishArticles, rewriteExistingArticles } = require('./src/publisher');
const { logSection, saveToFile, printStats } = require('./src/utils');

validateConfig();

async function fullWorkflow() {
  try {
    logSection('🚀 FULL WORKFLOW: Search → Scrape → Rewrite → Publish');

    const startTime = Date.now();
    let stats = {
      'Search results': 0,
      'Successfully scraped': 0,
      'Successfully rewritten': 0,
      'Published to backend': 0,
      'Total time (seconds)': 0
    };

    logSection('Step 1: Google Search');
    const searchResults = await searchGoogle();
    stats['Search results'] = searchResults.length;

    if (searchResults.length === 0) {
      console.log('❌ No search results. Exiting.');
      return;
    }

    saveToFile('search-results.json', searchResults);

    logSection('Step 2: Web Scraping');
    const urls = searchResults.map(r => r.url);
    const scrapedArticles = await scrapeMultipleArticles(urls);
    stats['Successfully scraped'] = scrapedArticles.length;

    if (scrapedArticles.length === 0) {
      console.log('❌ No articles scraped. Exiting.');
      return;
    }

    saveToFile('scraped-articles.json', scrapedArticles);

    logSection('Step 3: AI Rewriting');
    const rewrittenArticles = await rewriteMultipleArticles(scrapedArticles);
    stats['Successfully rewritten'] = rewrittenArticles.length;

    saveToFile('rewritten-articles.json', rewrittenArticles);

    logSection('Step 4: Publishing to Backend');
    const result = await publishArticles(rewrittenArticles);
    stats['Published to backend'] = result.imported_count;

    const endTime = Date.now();
    stats['Total time (seconds)'] = Math.round((endTime - startTime) / 1000);

    logSection('✅ WORKFLOW COMPLETED');
    printStats(stats);

    console.log('📁 Output files saved in: ./output/');
    console.log('   - search-results.json');
    console.log('   - scraped-articles.json');
    console.log('   - rewritten-articles.json\n');

  } catch (error) {
    console.error('\n❌ Workflow failed:', error.message);
    process.exit(1);
  }
}

async function searchAndScrapeOnly() {
  try {
    logSection('🔍 SEARCH & SCRAPE MODE');

    const searchResults = await searchGoogle();
    console.log(`Found ${searchResults.length} results`);

    if (searchResults.length === 0) return;

    const urls = searchResults.map(r => r.url);
    const articles = await scrapeMultipleArticles(urls);

    await publishArticles(articles);

    console.log('\n✅ Articles published without rewriting');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

async function rewriteExistingMode() {
  try {
    logSection('🔄 REWRITE EXISTING ARTICLES MODE');

    const { rewriteArticle } = require('./src/llm-rewriter');
    await rewriteExistingArticles(rewriteArticle);

    console.log('✅ Existing articles rewritten and updated');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

const args = process.argv.slice(2);
const mode = args.find(arg => arg.startsWith('--mode='))?.split('=')[1] || 'full';

(async () => {
  console.log(`\n🤖 Blog Scraper & Rewriter v1.0`);
  console.log(`Mode: ${mode}\n`);

  switch (mode) {
    case 'search':
      await searchAndScrapeOnly();
      break;
    case 'rewrite':
      await rewriteExistingMode();
      break;
    case 'full':
    default:
      await fullWorkflow();
      break;
  }

  console.log('🎉 Done!\n');
})();