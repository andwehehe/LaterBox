# LaterBox

LaterBox is a personal internet vault: a place to save YouTube videos, GitHub repositories, articles, documentation, and more, all in one organized workspace.

A full-stack bookmark manager where users can save, categorize, and revisit links from a single dashboard. Each link supports tags and a description, so users can note *why* they saved it.

(This is my first fullstack project so expect a bunch of mess)
---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Lucide React
- HTML / CSS / JavaScript

### Backend

- Node.js
- Express

### Database

- Supabase (PostgreSQL)
- Prisma ORM

### Other Tools

- Git / GitHub
- bcrypt (password hashing)
- Cheerio (HTML parsing / web scraping)

---

## 📚 Concepts Covered

### Backend

- Layered architecture (route → controller → service → repository → database)
- Separation of concerns / single responsibility principle
- REST API design
- Middleware
- Validation
- Error handling
- Status codes, query parameters, and request bodies

### Authentication

- Sessions and cookies
- Password hashing with bcrypt
- Authentication vs. authorization
- Protected routes with auth middleware

### Database

- CRUD operations
- Schema design and relationships (one-to-many, many-to-many)
- Junction tables
- Joins
- Transactions
- ORM usage with Prisma (`findUnique`, `findMany`, `create`, `update`, `delete`, `upsert`, `orderBy`, relations)

### Frontend

- React components, props, state, and effects
- Client-side routing
- Reusable component architecture
- Responsive design
- API requests and frontend-to-backend communication
- Context API

### Development

- Git and GitHub
- Environment variables
- Debugging across layers
- Project structure

---

## 🔌 API Endpoints

| Method | Endpoint         | Purpose          |
| ------ | ---------------- | ---------------- |
| POST   | `/auth/register` | Create account   |
| POST   | `/auth/login`    | Log in           |
| GET    | `/auth/me`       | Get current user |
| GET    | `/bookmarks`     | Get bookmarks    |
| POST   | `/bookmarks`     | Create bookmark  |
| PUT    | `/bookmarks/:id` | Update bookmark  |
| DELETE | `/bookmarks/:id` | Delete bookmark  |

---

## 🗂️ Backend Structure

```text
src/
├── routes/
├── controllers/
├── services/
├── repositories/
├── middlewares/
└── utils/
```

### Request flow

```text
React Component
      ↓
Service Function
      ↓
HTTP Request
      ↓
Express Route
      ↓
Controller ---- handles the request and returns the response
      ↓
Service ------ business logic and data shaping
      ↓
Repository --- database communication
      ↓
Database
```
