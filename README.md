# 🚀 AI-Powered Blog Scraper & Rewriter System

A full-stack monolithic application that automatically scrapes blog articles, rewrites them using AI (Google Gemini), and displays both original and enhanced versions through a modern React interface.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://your-frontend-url.vercel.app)
[![Laravel](https://img.shields.io/badge/Laravel-12-red)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Architecture](#architecture)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Local Setup](#local-setup)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Usage Guide](#usage-guide)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

This project consists of three integrated components working together to create a complete content management and enhancement pipeline:

1. **Backend (Laravel)**: RESTful API for article storage and management
2. **Scraper (Node.js)**: Automated pipeline for searching, scraping, and AI-powered rewriting
3. **Frontend (React)**: Modern UI to view and compare original vs enhanced articles

The system leverages Google Custom Search API for article discovery and Google Gemini AI for intelligent content rewriting with SEO optimization.

---

## 🌐 Live Demo

**🔗 Frontend Application:** [https://your-frontend-url.vercel.app](https://your-frontend-url.vercel.app)

### Try It Out:
- ✅ Browse AI-enhanced articles
- ✅ Compare original vs rewritten versions side-by-side
- ✅ Search and filter articles by title
- ✅ View detailed article comparisons

**Note:** Backend runs locally for this demo. Follow the setup instructions below to run the complete system.

---

## 🏗️ Architecture

![System Architecture](./docs/architecture-diagram.png)

### Data Flow:

```
┌─────────────────────────────────────────────────────────────┐
│                   SCRAPING PIPELINE                         │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
            ┌───────────────────────────┐
            │   Google Custom Search    │
            │         API               │
            └───────────┬───────────────┘
                        │ URLs
                        ▼
            ┌───────────────────────────┐
            │    Web Scraper (Node.js)  │
            │    Extract Content        │
            └───────────┬───────────────┘
                        │ Raw Articles
                        ▼
            ┌───────────────────────────┐
            │   Google Gemini AI        │
            │   Content Rewriting       │
            └───────────┬───────────────┘
                        │ Enhanced Content
                        ▼
            ┌───────────────────────────┐
            │   Laravel Backend API     │
            │   POST /articles/batch    │
            └───────────┬───────────────┘
                        │
                        ▼
            ┌───────────────────────────┐
            │   MySQL Database          │
            │   Store Articles          │
            └───────────┬───────────────┘
                        │
                        ▼
            ┌───────────────────────────┐
            │   React Frontend          │
            │   GET /articles           │
            │   Display & Compare       │
            └───────────────────────────┘
```

### Component Communication:

- **Scraper → Backend**: POST requests with batch article data
- **Frontend → Backend**: GET requests for article retrieval
- **Backend → Database**: CRUD operations via Eloquent ORM
- **Scraper → External APIs**: Google Search + Gemini AI

---

## ✨ Features

### Backend (Laravel 12)
- ✅ Full RESTful API with CRUD operations
- ✅ Batch import endpoint for multiple articles
- ✅ MySQL database with migrations
- ✅ Article slug generation
- ✅ Validation and error handling
- ✅ CORS enabled for frontend integration

### Scraper (Node.js)
- ✅ Google Custom Search integration
- ✅ Intelligent web scraping with retry logic
- ✅ AI-powered content rewriting using Google Gemini
- ✅ SEO-focused rewrite prompts
- ✅ Rate limiting and error handling
- ✅ Automatic publishing to backend
- ✅ Multiple operation modes (search, rewrite, full)

### Frontend (React)
- ✅ Modern, responsive UI with Tailwind CSS
- ✅ Article listing with search functionality
- ✅ Side-by-side comparison view
- ✅ Original vs enhanced content display
- ✅ Loading states and error handling
- ✅ Mobile-friendly design

---

## 🛠️ Tech Stack

| Component | Technologies |
|-----------|-------------|
| **Backend** | Laravel 12, PHP 8.2+, MySQL 8.0 |
| **Scraper** | Node.js 18+, Axios, Cheerio, Google Gemini AI |
| **Frontend** | React 18, TypeScript, Tailwind CSS, Axios |
| **APIs** | Google Custom Search API, Google Gemini API |
| **Tools** | Composer, npm, Git, XAMPP |

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **PHP 8.2+** ([Download](https://www.php.net/downloads))
- **Composer** ([Download](https://getcomposer.org/download/))
- **Node.js 18+** and npm ([Download](https://nodejs.org/))
- **MySQL 8.0+** (via XAMPP or standalone)
- **XAMPP** ([Download](https://www.apachefriends.org/)) - Recommended for Windows
- **Git** ([Download](https://git-scm.com/downloads))

### Required API Keys (All FREE):
- **Google Custom Search API Key** ([Get it here](https://console.cloud.google.com/))
- **Google Custom Search Engine ID** ([Create here](https://programmablesearchengine.google.com/))
- **Google Gemini API Key** ([Get it here](https://makersuite.google.com/app/apikey))

---

## 🚀 Local Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/blog-scraper-monorepo.git
cd blog-scraper-monorepo
```

---

### 2️⃣ Backend Setup (Laravel)

#### Step 1: Install Dependencies
```bash
cd backend
composer install
```

#### Step 2: Configure Environment
```bash
cp .env.example .env
```

Edit `.env` file:
```env
APP_NAME="Blog Scraper"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=blog_articles
DB_USERNAME=root
DB_PASSWORD=

CACHE_DRIVER=file
SESSION_DRIVER=file
```

#### Step 3: Generate Application Key
```bash
php artisan key:generate
```

#### Step 4: Create Database
1. Open XAMPP Control Panel
2. Start **Apache** and **MySQL**
3. Open `http://localhost/phpmyadmin`
4. Create database: `blog_articles`

#### Step 5: Run Migrations
```bash
php artisan migrate
```

#### Step 6: Start Laravel Server
```bash
php artisan serve
```

✅ Backend running at: `http://127.0.0.1:8000`

---

### 3️⃣ Scraper Setup (Node.js)

#### Step 1: Install Dependencies
```bash
cd scraper
npm install
```

#### Step 2: Configure Environment
```bash
cp .env.example .env
```

Edit `.env` file:
```env
# Google Custom Search API
GOOGLE_API_KEY=your_google_api_key_here
GOOGLE_CX=your_custom_search_engine_id_here

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here
LLM_MODEL=gemini-1.5-flash
LLM_PROVIDER=gemini

# Backend API
BACKEND_URL=http://127.0.0.1:8000/api

# Search Configuration
SEARCH_QUERY=AI chatbot healthcare
MAX_RESULTS=5
```

#### Step 3: Run Scraper

**Full workflow** (Search → Scrape → Rewrite → Publish):
```bash
npm start
```

**Other modes:**
```bash
npm run search    # Search and scrape only (no AI rewriting)
npm run rewrite   # Rewrite existing articles in database
npm run full      # Complete workflow
```

✅ Scraper will process articles and save to database

---

### 4️⃣ Frontend Setup (React)

#### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

#### Step 2: Configure Environment
```bash
cp .env.example .env
```

Edit `.env` file:
```env
REACT_APP_API_URL=http://127.0.0.1:8000/api
REACT_APP_NAME=Blog Article Manager
```

#### Step 3: Start Development Server
```bash
npm start
```

✅ Frontend running at: `http://localhost:3000`

---

## 📁 Project Structure

```
blog-scraper-monorepo/
│
├── backend/                      # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/
│   │   │   ├── ArticleController.php
│   │   │   └── ArticleImportController.php
│   │   └── Models/
│   │       └── Article.php
│   ├── database/
│   │   └── migrations/
│   │       └── create_articles_table.php
│   ├── routes/
│   │   └── api.php
│   ├── .env.example
│   └── README.md
│
├── scraper/                      # Node.js Scraper
│   ├── src/
│   │   ├── config.js            # Configuration management
│   │   ├── google-search.js     # Google Search API
│   │   ├── web-scraper.js       # Web scraping logic
│   │   ├── llm-rewriter.js      # AI rewriting with Gemini
│   │   ├── publisher.js         # Backend API integration
│   │   └── utils.js             # Helper functions
│   ├── index.js                 # Main orchestrator
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── frontend/                     # React UI
│   ├── src/
│   │   ├── components/
│   │   │   ├── ArticleCard.tsx
│   │   │   ├── ComparisonView.tsx
│   │   │   ├── Header.tsx
│   │   │   └── SearchBar.tsx
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   └── ArticleDetailPage.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── hooks/
│   │   │   └── useArticles.ts
│   │   └── App.tsx
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── docs/
│   ├── architecture-diagram.png
│   ├── screenshots/
│   └── postman-collection.json
│
└── README.md                     # This file
```

---

## 📡 API Endpoints

### Base URL
```
http://127.0.0.1:8000/api
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/articles` | Fetch all articles |
| GET | `/articles/{id}` | Get single article by ID |
| POST | `/articles` | Create a new article |
| PUT | `/articles/{id}` | Update an article |
| DELETE | `/articles/{id}` | Delete an article |
| POST | `/articles/import/batch` | Batch import multiple articles |

### Example Requests

#### Get All Articles
```bash
curl http://127.0.0.1:8000/api/articles
```

#### Create Article
```bash
curl -X POST http://127.0.0.1:8000/api/articles \
  -H "Content-Type: application/json" \
  -d '{
    "title": "AI in Healthcare",
    "content": "Article content here...",
    "original_source_url": "https://example.com"
  }'
```

#### Batch Import
```bash
curl -X POST http://127.0.0.1:8000/api/articles/import/batch \
  -H "Content-Type: application/json" \
  -d '{
    "articles": [
      {
        "title": "Article 1",
        "content": "Content 1...",
        "original_source_url": "https://example1.com"
      },
      {
        "title": "Article 2",
        "content": "Content 2...",
        "original_source_url": "https://example2.com"
      }
    ]
  }'
```

---

## 🔑 Environment Variables

### Backend (.env)
```env
APP_NAME=Blog Scraper
APP_KEY=base64:...generated...
DB_DATABASE=blog_articles
DB_USERNAME=root
DB_PASSWORD=
```

### Scraper (.env)
```env
GOOGLE_API_KEY=AIza...
GOOGLE_CX=0123456789:xxx...
GEMINI_API_KEY=AIza...
LLM_MODEL=gemini-1.5-flash
BACKEND_URL=http://127.0.0.1:8000/api
SEARCH_QUERY=AI chatbot healthcare
MAX_RESULTS=5
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://127.0.0.1:8000/api
```

---

## 📖 Usage Guide

### Running the Complete Workflow

#### 1. Start Backend
```bash
cd backend
php artisan serve
```

#### 2. Run Scraper
```bash
cd scraper
npm start
```

**What happens:**
- Searches Google for articles
- Scrapes content from top results
- Rewrites using AI
- Publishes to Laravel backend
- Saves output files in `scraper/output/`

#### 3. View in Frontend
```bash
cd frontend
npm start
```

Open `http://localhost:3000` to see articles

---

### Scraper Output Files

All scraper results are saved in `scraper/output/`:

```
output/
├── search-results.json       # Google search results
├── scraped-articles.json     # Raw scraped content
└── rewritten-articles.json   # AI-enhanced content
```

---

## 🌐 Deployment

### Frontend Deployment (Vercel)

#### Using Vercel Dashboard:
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import repository
4. Set root directory: `frontend`
5. Add environment variable:
   ```
   REACT_APP_API_URL=http://127.0.0.1:8000/api
   ```
6. Deploy

#### Using Vercel CLI:
```bash
cd frontend
npm install -g vercel
vercel login
vercel --prod
```

### Backend Deployment (Optional)

For production deployment, consider:
- **Railway.app** (Free tier available)
- **Heroku** ($7/month)
- **DigitalOcean App Platform** ($5/month)

---

## 🐛 Troubleshooting

### Backend Issues

**Error: "No application encryption key"**
```bash
php artisan key:generate
```

**Error: "Database connection refused"**
- Check XAMPP MySQL is running
- Verify `.env` database credentials
- Run: `php artisan config:clear`

**Error: "Route not found"**
```bash
php artisan route:clear
php artisan optimize:clear
```

### Scraper Issues

**Error: "Invalid API Key"**
- Verify keys in `.env` file
- Check no extra spaces in `.env`
- Ensure APIs are enabled in Google Cloud Console

**Error: "Rate limit exceeded"**
- Google Search: 100 requests/day (free tier)
- Gemini: 60 requests/minute
- Wait and try again, or reduce `MAX_RESULTS`

**Error: "Cannot connect to backend"**
- Ensure Laravel is running: `php artisan serve`
- Check `BACKEND_URL` in scraper `.env`

### Frontend Issues

**Error: "Network Error" or "CORS"**
- Verify Laravel backend is running
- Check `REACT_APP_API_URL` in `.env`
- Clear browser cache

**Error: "Module not found"**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
php artisan test
```

### API Testing with Postman

Import the Postman collection: `docs/postman-collection.json`

**Test endpoints:**
1. GET all articles
2. GET single article
3. POST create article
4. POST batch import
5. PUT update article
6. DELETE article

---

## 📊 Performance

- **Backend Response Time**: ~50-200ms
- **Scraper Processing**: ~2-3 minutes for 5 articles
- **AI Rewriting**: ~5-10 seconds per article
- **Frontend Load Time**: ~1-2 seconds

---

## 🤝 Contributing

This is a personal project for assignment submission. Contributions are not currently being accepted.

---

## 📄 License

This project is for educational purposes only.

---

## 👤 Author

**Your Name**
- GitHub: [@SohaibShaikh04](https://github.com/SohaibShaikh04)
- Email: sohaibsk2004@gmail.com
- LinkedIn: [sohaiblinkedIn](https://linkedin.com/in/yourprofile)

---

## 🙏 Acknowledgments

- **Laravel Community** - For the excellent framework
- **React Team** - For the powerful UI library
- **Google** - For Gemini AI and Custom Search API
- **OpenAI** - For inspiration in AI-powered content enhancement

---

---

## 🎯 Future Enhancements

- [ ] User authentication and authorization
- [ ] Article categories and tags
- [ ] Advanced search with filters
- [ ] Export articles as PDF/Markdown
- [ ] Scheduled automatic scraping
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Article versioning history

---

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review the component-specific READMEs:
   - [Backend README](./backend/README.md)
   - [Scraper README](./scraper/README.md)
   - [Frontend README](./frontend/README.md)
3. Open an issue on GitHub

---

**⭐ If this project helped you, please give it a star!**

---

**Last Updated:** December 2025
