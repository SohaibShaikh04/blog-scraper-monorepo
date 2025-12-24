const axios = require('axios');
const { config } = require('./config');

/**
 * Search Google using Custom Search API
 * @param {string} query - Search query
 * @param {number} maxResults - Maximum number of results to return
 * @returns {Promise<Array>} Array of search results
 */
async function searchGoogle(query = config.google.searchQuery, maxResults = config.google.maxResults) {
  try {
    console.log(`🔍 Searching Google for: "${query}"`);
    
    const url = 'https://www.googleapis.com/customsearch/v1';
    const params = {
      key: config.google.apiKey,
      cx: config.google.cx,
      q: query,
      num: Math.min(maxResults, 10) // Google API max is 10 per request
    };

    const response = await axios.get(url, { params });

    if (!response.data.items || response.data.items.length === 0) {
      console.log('⚠️  No search results found');
      return [];
    }

    const results = response.data.items.map(item => ({
      title: item.title,
      url: item.link,
      snippet: item.snippet,
      displayLink: item.displayLink
    }));

    console.log(`✅ Found ${results.length} results`);
    return results;

  } catch (error) {
    console.error('❌ Google Search error:', error.response?.data?.error?.message || error.message);
    
    if (error.response?.status === 429) {
      console.error('💡 Rate limit exceeded. Wait and try again later.');
    } else if (error.response?.status === 403) {
      console.error('💡 Check your Google API key and Custom Search Engine ID.');
    }
    
    throw error;
  }
}

/**
 * Filter search results by domain
 * @param {Array} results - Search results
 * @param {Array} allowedDomains - List of allowed domains
 * @returns {Array} Filtered results
 */
function filterByDomain(results, allowedDomains) {
  if (!allowedDomains || allowedDomains.length === 0) {
    return results;
  }

  return results.filter(result => {
    return allowedDomains.some(domain => result.url.includes(domain));
  });
}

module.exports = {
  searchGoogle,
  filterByDomain
};
