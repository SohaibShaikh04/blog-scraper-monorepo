# 🕷️ Blog Scraper & Rewriter (Node.js)

Automated system for searching, scraping, and rewriting blog articles using AI.

## 📋 Features

- ✅ **Google Custom Search** - Find articles using Google's API
- ✅ **Web Scraping** - Extract content from any URL
- ✅ **AI Rewriting** - Rewrite content using OpenAI GPT
- ✅ **Backend Integration** - Publish to Laravel API
- ✅ **Error Handling** - Robust retry logic and error recovery
- ✅ **Multiple Modes** - Search only, rewrite only, or full workflow

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and add your API keys:
- `GOOGLE_API_KEY` - From Google Cloud Console
- `GOOGLE_CX` - Custom Search Engine ID
- `OPENAI_API_KEY` - From OpenAI Platform

### 3. Run

**Full workflow** (Search → Scrape → Rewrite → Publish):
```bash
npm start
```

**Or use specific modes:**
```bash
npm run search      # Search and scrape only
npm run rewrite     # Rewrite existing articles
npm run full        # Full workflow
```

---

## 🔑 Getting API Keys

### Google Custom Search API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project
3. Enable **Custom Search API**
4. Create credentials → API Key
5. Create search engine at [Programmable Search](https://programmablesearchengine.google.com/)

### OpenAI API

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up / Log in
3. Navigate to API Keys
4. Create new secret key

---

## 📊 Workflow

```
1. Google Search
   ↓
2. Web Scraping (Extract title + content)
   ↓
3. AI Rewriting (OpenAI GPT)
   ↓
4. Publishing (Laravel API)
   ↓
5. Database Storage
```

---

## 🎯 Usage Examples

### Search for Specific Topic

Edit `.env`:
```env
SEARCH_QUERY=artificial intelligence healthcare
MAX_RESULTS=10
```

### Rewrite Existing Articles

```bash
npm run rewrite
```

This will:
1. Fetch all articles from backend
2. Rewrite each using AI
3. Update in database

---

## 📁 Output Files

All results are saved in `./output/` folder:
- `search-results.json` - Google search results
- `scraped-articles.json` - Scraped content
- `rewritten-articles.json` - AI-rewritten articles

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `GOOGLE_API_KEY` | Google API key | Required |
| `GOOGLE_CX` | Search engine ID | Required |
| `OPENAI_API_KEY` | OpenAI API key | Required |
| `OPENAI_MODEL` | GPT model to use | gpt-3.5-turbo |
| `BACKEND_URL` | Laravel API URL | http://127.0.0.1:8000/api |
| `SEARCH_QUERY` | Search keywords | AI chatbot healthcare |
| `MAX_RESULTS` | Results to scrape | 5 |

---

## 🐛 Troubleshooting

### "ECONNREFUSED" Error

**Problem:** Can't connect to backend

**Solution:** Make sure Laravel server is running:
```bash
cd ../backend
php artisan serve
```

### "Rate limit exceeded"

**Problem:** Too many API requests

**Solution:** 
- Wait a few minutes
- Reduce `MAX_RESULTS`
- Check your API quotas

### "Invalid API Key"

**Problem:** API key not working

**Solution:**
- Check `.env` file has correct keys
- Verify keys are active in respective dashboards
- No extra spaces in .env values

---

## 📝 Notes

- Google Custom Search API: 100 requests/day on free tier
- OpenAI API: Pay-per-use (GPT-3.5-turbo ~$0.002/1K tokens)
- Scraping respects delays between requests (2 seconds default)
- Output files are gitignored for privacy

---

## 🤝 Integration with Backend

This scraper works with the Laravel backend in `../backend/`

**Required endpoints:**
- `POST /api/articles/import/batch` - Batch import
- `GET /api/articles` - Fetch articles
- `PUT /api/articles/{id}` - Update article

---

## 📄 License

MIT License - See main repository LICENSE file