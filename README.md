# BeyondChats – Full Stack Web Developer Intern Assignment


This project is built as part of the BeyondChats Full Stack Web Developer Intern assignment.
It demonstrates web scraping, backend APIs, database integration, GenAI usage, and a simple frontend UI.

This project is built mostly by me with limited and practical use of AI.
The main goal is to show clear end-to-end data flow rather than complex UI or over-engineering.

## Tech used

# Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Axios and Cheerio (scraping)

# GenAI
- Groq API
- LLaMA 3.3 model (used for rewriting blog content)

# Frontend
- React.js (Create React App)
- Simple inline styling


# Next i implemented phase wise

# Phase 1 – Blog Scraping & APIs

- scraped the last 5 blogs from 
https://beyondchats.com/blogs/
- extracted blog content
- stored in mongoDB 
- Created REST APIs to create, fetch, and update blogs

# Phase 2 – GenAI Content Rewriting
- Fetched blogs using backend APIs
- Used Groq LLaMA 3.3 to rewrite and enrich original blog content
- Stored AI-generated content back into the databa
- Google search and competitor article scraping implemented using Serper.dev
- References cited at bottom of AI-generated article


# Phase 3 – Frontend
- Built a React frontend to fetch blogs from backend apis
- Displayed original blog content and ai-updated content
- Kept UI minimal and readable as required


# Project Structure

beyondchats-assignment/
│
├── backend/
│   ├── ai-script/
│   │   ├── helpers/
│   │   │   ├── googleSearch.js
│   │   │   └── rewriteWithLLM.js
│   │   ├── phase2GoogleTest.js
│   │   └── scrapeArticle.js
│   │
│   ├── models/
│   │   └── Blog.js
│   ├── routes/
│   │   └── blogRoutes.js
│   ├── scraper/
│   │   └── scrapeOldBlogs.js
│   ├── config/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   └── App.js
│   └── package.json
│
└── README.md

# local Setup 

# BackEnd Set up

cd backend 
npm install

# Created .env file inside backend for calling MongoDB and groq api

PORT=5000
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key

# Run the backend : 

node server.js


# Scrap From project root:

node backend/scraper/scrapeOldBlogs.js


# run for Gen Ai 
check backend is running then :

node backend/ai-script/rewriteBlogs.js


# FrontEnd set up

cd frontend
npm install
npm start

# Frontend Run On : 
http://localhost:3000


# Data Flow / Architecture

BeyondChats Website  
- Scraper  
- MongoDB  
- Backend APIs  
- React Frontend

GenAI script runs separately and updates blog content in the database.

# Note 

- Some blogs title Show "Untitled Blog" if the main website does not expose title tag HTML
- UI is kept simple Phase 3 is marked as easy in the assignment.


## Frontend (live) :
https://beyondchats-fullstack-assignment-tan.vercel.app/


## Backend API (Live):
https://beyondchats-fullstack-assignment-m48j.onrender.com


The live frontend is connected to the deployed backend APIs and displays real blog data
stored in MongoDB along with AI-updated articles generated using Groq LLaMA 3.3