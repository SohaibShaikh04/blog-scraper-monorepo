const axios = require('axios');
const { config } = require('./config');
const { delay } = require('./utils');

async function rewriteArticle(article) {
  try {
    console.log(`🤖 Rewriting: ${article.title.substring(0, 50)}...`);

    const prompt = `You are an expert content writer. Rewrite the following article to make it unique while maintaining:
- The original meaning and key points
- SEO keywords and structure
- Professional tone
- Readability and engagement

Original Title: ${article.title}

Original Content:
${article.content.substring(0, 3000)} ${article.content.length > 3000 ? '...' : ''}

Please provide:
1. A new, catchy title
2. Completely rewritten content that is unique but covers the same topics

Format your response as:
TITLE: [new title here]
CONTENT: [rewritten content here]`;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${config.llm.model}:generateContent?key=${config.llm.apiKey}`;
    
    const response = await axios.post(
      apiUrl,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: config.llm.temperature || 0.7,
          maxOutputTokens: config.llm.maxTokens || 2000,
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );

    const rewrittenText = response.data.candidates[0].content.parts[0].text;

    const titleMatch = rewrittenText.match(/TITLE:\s*(.+?)(?:\n|CONTENT:)/s);
    const contentMatch = rewrittenText.match(/CONTENT:\s*(.+)/s);

    const updatedTitle = titleMatch ? titleMatch[1].trim() : article.title;
    const updatedContent = contentMatch ? contentMatch[1].trim() : rewrittenText;

    console.log(`✅ Rewritten successfully`);

    return {
      ...article,
      updated_title: updatedTitle,
      updated_content: updatedContent,
      rewritten_at: new Date().toISOString()
    };

  } catch (error) {
    console.error(`❌ Error rewriting article:`, error.response?.data || error.message);
    
    if (error.response?.status === 429) {
      console.error('💡 Rate limit exceeded. Wait and try again.');
    } else if (error.response?.status === 400) {
      console.error('💡 Invalid request. Check your API key and model name.');
    } else if (error.response?.status === 403) {
      console.error('💡 Invalid API key. Check your GEMINI_API_KEY.');
    }
    
    return {
      ...article,
      updated_content: article.content,
      rewrite_error: error.message
    };
  }
}

async function rewriteMultipleArticles(articles) {
  console.log(`\n🤖 Rewriting ${articles.length} articles using Google Gemini...\n`);
  
  const rewrittenArticles = [];
  
  for (let i = 0; i < articles.length; i++) {
    const rewritten = await rewriteArticle(articles[i]);
    rewrittenArticles.push(rewritten);
    
    if (i < articles.length - 1) {
      await delay(1000);
    }
  }

  console.log(`\n✅ Completed rewriting ${rewrittenArticles.length} articles\n`);
  return rewrittenArticles;
}

async function quickRewrite(content) {
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${config.llm.model}:generateContent?key=${config.llm.apiKey}`;
  
  const response = await axios.post(
    apiUrl,
    {
      contents: [
        {
          parts: [
            {
              text: `Rewrite this in 2-3 sentences:\n\n${content.substring(0, 500)}`
            }
          ]
        }
      ],
      generationConfig: {
        maxOutputTokens: 200
      }
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data.candidates[0].content.parts[0].text;
}

module.exports = {
  rewriteArticle,
  rewriteMultipleArticles,
  quickRewrite
};
