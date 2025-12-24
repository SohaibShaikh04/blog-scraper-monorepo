const axios = require('axios');
const { config } = require('./config');

async function publishArticles(articles) {
  try {
    console.log(`\n📤 Publishing ${articles.length} articles to backend...\n`);

    const url = `${config.backend.url}${config.backend.endpoints.batchImport}`;
    
    const formattedArticles = articles.map(article => ({
      title: article.updated_title || article.title,
      content: article.updated_content || article.content,
      original_source_url: article.original_source_url,
      references: JSON.stringify({
        original_title: article.title,
        scraped_at: article.scraped_at,
        rewritten_at: article.rewritten_at
      })
    }));

    const response = await axios.post(url, {
      articles: formattedArticles
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });

    console.log(`✅ Successfully published ${response.data.imported_count} articles`);
    
    if (response.data.error_count > 0) {
      console.log(`⚠️  Failed to import ${response.data.error_count} articles`);
      console.log('Errors:', response.data.errors);
    }

    return response.data;

  } catch (error) {
    console.error('❌ Error publishing articles:', error.message);
    
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.code === 'ECONNREFUSED') {
      console.error('💡 Cannot connect to backend. Make sure Laravel server is running!');
    }
    
    throw error;
  }
}

async function updateArticle(articleId, updates) {
  try {
    console.log(`📝 Updating article ${articleId}...`);

    const url = `${config.backend.url}${config.backend.endpoints.articles}/${articleId}`;
    
    const response = await axios.put(url, updates, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log(`✅ Article ${articleId} updated successfully`);
    return response.data;

  } catch (error) {
    console.error(`❌ Error updating article ${articleId}:`, error.message);
    throw error;
  }
}

async function fetchArticles() {
  try {
    console.log(`📥 Fetching articles from backend...`);

    const url = `${config.backend.url}${config.backend.endpoints.articles}`;
    const response = await axios.get(url);

    console.log(`✅ Fetched ${response.data.length} articles`);
    return response.data;

  } catch (error) {
    console.error('❌ Error fetching articles:', error.message);
    throw error;
  }
}

async function rewriteExistingArticles(rewriteFunction) {
  try {
    const articles = await fetchArticles();
    
    if (articles.length === 0) {
      console.log('⚠️  No articles found in database');
      return [];
    }

    console.log(`\n🔄 Rewriting ${articles.length} existing articles...\n`);

    const updatedArticles = [];
    for (const article of articles) {
      const rewritten = await rewriteFunction({
        title: article.title,
        content: article.content,
        original_source_url: article.original_source_url
      });

      const updated = await updateArticle(article.id, {
        content: rewritten.updated_content,
        references: JSON.stringify({
          original_content: article.content,
          rewritten_at: new Date().toISOString()
        })
      });

      updatedArticles.push(updated);
    }

    console.log(`\n✅ Rewritten and updated ${updatedArticles.length} articles\n`);
    return updatedArticles;

  } catch (error) {
    console.error('❌ Error in rewriting workflow:', error.message);
    throw error;
  }
}

module.exports = {
  publishArticles,
  updateArticle,
  fetchArticles,
  rewriteExistingArticles
};