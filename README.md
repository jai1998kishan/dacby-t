# Hacker News Scraper App

A full-stack MERN application that scrapes top stories from Hacker News, stores them in MongoDB, and provides authentication + bookmarking functionality.

---

# 🚀 Features

## ✅ Backend (Node.js + Express)

- JWT Authentication
- User Registration & Login
- Hacker News Scraper
- MongoDB Integration
- Bookmark Stories
- Pagination Support
- Protected Routes
- REST APIs

## ✅ Frontend (React + Tailwind CSS)

- Responsive Professional UI
- Authentication Pages
- Stories Listing
- Bookmark Toggle
- Persistent Bookmark State
- React Context API
- Pagination UI

---

# 🛠️ Tech Stack

## Frontend

- React.js
- React Router DOM
- Tailwind CSS
- Axios
- Context API

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- cheerio
- axios
- dotenv
- cors
- helmet

---

# 📂 Project Structure

```bash
project-root/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── App.jsx
│
└── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone <your-repo-url>
```

---

# 🔧 Backend Setup

## Navigate to backend

```bash
cd backend
```

## Install dependencies

```bash
npm install
```

## Create `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key
```

## Start Backend

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

# 💻 Frontend Setup

## Navigate to frontend

```bash
cd frontend
```

## Install dependencies

```bash
npm install
```

## Start Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 🔐 Authentication APIs

## Register User

```http
POST /api/auth/register
```

### Body

```json
{
  "name": "Rocky",
  "email": "rocky@example.com",
  "password": "123456"
}
```

---

## Login User

```http
POST /api/auth/login
```

### Body

```json
{
  "email": "rocky@example.com",
  "password": "123456"
}
```

---

# 📰 Story APIs

## Get Stories

```http
GET /api/stories?page=1&limit=10
```

---

## Get Single Story

```http
GET /api/stories/:id
```

---

## Toggle Bookmark

```http
POST /api/stories/:id/bookmark
```

### Headers

```http
Authorization: Bearer <token>
```

---

# 🤖 Scraper

The scraper:

- Scrapes top Hacker News stories
- Extracts:
  - Title
  - URL
  - Points
  - Author
  - Posted Time
- Saves data to MongoDB

## Scraper runs:

- Automatically on server start
- Manually using API

---

## Trigger Scraper API

```http
POST /api/scrape
```

---

# 📄 Pagination

Implemented server-side pagination using:

```js
skip();
limit();
```

Example:

```http
GET /api/stories?page=2&limit=10
```

---

# 📌 Bookmark Functionality

Users can:

- Bookmark stories
- Remove bookmarks
- Persist bookmarks in MongoDB
- Restore bookmark state after refresh

---

# 🎨 UI Features

- Fully Responsive
- Modern Design
- Tailwind CSS
- Interactive Bookmark Buttons
- Loading States
- Pagination Controls

---

# 🔒 Security

- Password Hashing using bcryptjs
- JWT Authentication
- Protected Routes
- Helmet Security Middleware
- CORS Enabled

---

# 📷 Screenshots

Add screenshots here.

---

# 🚀 Future Improvements

- Infinite Scrolling
- Search & Filters
- Bookmark Page
- Dark Mode
- Docker Support
- Deployment

---

# 👨‍💻 Author

Rocky

---

# 📜 License

This project is licensed under the MIT License.
