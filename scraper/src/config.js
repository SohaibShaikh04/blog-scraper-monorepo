// ===== src/config.js =====
require('dotenv').config();

const config = {
  google: {
    apiKey: process.env.GOOGLE_API_KEY,
    cx: process.env.GOOGLE_CX,
    searchQuery: process.env.SEARCH_QUERY || 'AI chatbot',
    maxResults: parseInt(process.env.MAX_RESULTS) || 5
  },

  llm: {
    apiKey: process.env.GEMINI_API_KEY || process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY,
    model: process.env.LLM_MODEL || 'gemini-pro',
    provider: process.env.LLM_PROVIDER || 'gemini',
    maxTokens: parseInt(process.env.MAX_TOKENS) || 2000,
    temperature: parseFloat(process.env.TEMPERATURE) || 0.7
  },

  backend: {
    url: process.env.BACKEND_URL || 'http://127.0.0.1:8080',
    endpoints: {
      articles: 'api/articles',
      batchImport: 'api/articles/import/batch'
    }
  },

  scraping: {
    userAgent: process.env.USER_AGENT || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    timeout: parseInt(process.env.REQUEST_TIMEOUT) || 10000,
    delay: parseInt(process.env.DELAY_BETWEEN_REQUESTS) || 2000,
    maxRetries: parseInt(process.env.MAX_RETRIES) || 3
  }
};

const validateConfig = () => {
  const errors = [];

  if (!config.google.apiKey) errors.push('GOOGLE_API_KEY is missing');
  if (!config.google.cx) errors.push('GOOGLE_CX is missing');
  if (!config.llm.apiKey) errors.push('GEMINI_API_KEY (or other LLM API key) is missing');
  if (!config.backend.url) errors.push('BACKEND_URL is missing');

  if (errors.length > 0) {
    console.error('❌ Configuration errors:');
    errors.forEach(err => console.error(`   - ${err}`));
    console.error('\n💡 Please check your .env file');
    process.exit(1);
  }
};

module.exports = { config, validateConfig };

