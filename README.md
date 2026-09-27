# LaterBox

LaterBox is your personal internet vault—a place to save YouTube videos, GitHub repositories, articles, documentation, and more, all in one organized workspace.

## 📌 About the Project

* A full-stack bookmark manager web app — save, organize, and revisit links from one dashboard.
* It's my primary self-directed learning project. A way to practice full-stack development hands-on alongside coursework, rather than learning from tutorials alone.
* LaterBox lets users save, categorize, and manage their links in one place — with tags and a description for each one, so they can note *why* they saved it in case they forget later.

---

## 🛠️ Tech Stack

### Frontend

* HTML
* CSS
* JavaScript
* React
* Tailwind CSS

### Backend

* Node.js
* Express

### Database

* MySQL
* Prisma

### Other Tools

* Git / GitHub
* bcrypt
* Cheerio

---

# 🧠 What I Learned

This section documents the concepts I learned while building the project.

## 1. Backend Architecture

### What I learned

I learned the importance of system architecture in a project — it makes it easier to maintain the code, add new features, and track down bugs. It really helped when I was debugging, since I could narrow down the problem to a specific layer (route, controller, service, or database) instead of digging through everything at once.

### Why I used it

In this project I used the Layered Architecture (route -> controller -> service -> database) because it is the most beginner friendly to use according to Clause AI.

### What I struggled with

At first, one file was fine. But as I kept adding functionality, it got chunky, so I looked for a solution — AI recommended splitting things into their own files. I hesitated, thinking multiple files would make functions harder to track, so I stuck with one file. Then I modified one function, and two others broke. Trying to fix those caused even more bugs — that's when it clicked that the real problem was my architecture.

### What I understand now

A proper system architecture allows me to save time when debugging, adding functions, and more. This also taught me about the single responsibility principle, or separation of concerns.

---

## 2. Authentication

### What I learned

* Sessions / cookies
* Password hashing using bcrypt
* Authentication vs authorization
* Protected routes using auth middleware

### How it works in my project

```text
User
 ↓
Login Request
 ↓
Route
 ↓
Controller
 ↓
Service
 ↓
Database
 ↓
Session Created
 ↓
Authenticated User
```

### Important lesson

I learned just how essential authentication is — it's not just a login form, but the foundation for keeping user information secure. Getting it wrong doesn't just break a feature, it puts real user data at risk.

---

## 3. Database

### What I learned

* SQL queries
* Relationships
* Junction Table
* Transactions
* ORM

### Before

I struggled to write complex SQL queries, especially ones involving multiple joins.

### After

I learned to use Prisma as an ORM, which saved me the trouble of writing complex joins manually — I could just use Prisma's built-in functions instead. I also learned that Prisma's transactions handle rollbacks implicitly, so I don't even have to manage that manually.

### Important lesson

At first, I just created simple tables, and they were fine early in development. But as I inserted more data and added more functions, I realized something was wrong with my schema — almost every function touched the same table. That's when I realized those columns could live in their own tables. This taught me that carefully planning your schema is important, as it decides how scalable and maintainable your entire application becomes down the line.

---

## 4. Prisma / ORM

### What I learned

Document the Prisma concepts I actually used.

* `findUnique`
* `findMany`
* `create`
* `update`
* `delete`
* `orderBy`
* upsert (my fave)
* Relations

### Example

```js
const user = await prisma.users.findUnique({
    where: {
        email
    }
});
```

### What this replaces

```sql
SELECT *
FROM users
WHERE email = ?;
```

### Important lesson

I learned to use Prisma as an ORM, which saved me the trouble of writing complex joins manually — I could just use Prisma's built-in functions instead. I also learned that Prisma's transactions handle rollbacks implicitly, so I don't even have to manage that manually

---

## 5. API Design

### What I learned

API concepts used in the project.

Example:

| Method | Endpoint         | Purpose          |
| ------ | ---------------- | ---------------- |
| POST   | `/auth/register` | Create account   |
| POST   | `/auth/login`    | Log in           |
| GET    | `/auth/me`       | Get current user |
| GET    | `/bookmarks`     | Get bookmarks    |
| POST   | `/bookmarks`     | Create bookmark  |
| PUT    | `/bookmarks/:id` | Update bookmark  |
| DELETE | `/bookmarks/:id` | Delete bookmark  |

### Important lesson

I learned the basics of creating APIs — from creating endpoints, to integrating them with the frontend, to sending and handling requests and responses. This included working with status codes, query parameters, request bodies, and more

---

## 6. Frontend ↔ Backend Communication

### What I learned

How the React frontend communicates with the Express backend.

```text
React Component
      ↓
Service Function
      ↓
HTTP Request
      ↓
Express Route
      ↓
Controller --- handles that request and return the response
      ↓
Service ------ handles business logic and shaping shaping the data from the db
      ↓
Repository --- handles database communication
      ↓
Database
```

### Problems I encountered

* Keeping frontend state synchronized with the database.
* Figuring out where API calls should live.
* Handling authentication requests between the frontend and backend.
* Debugging situations where the frontend and backend were not behaving as expected.
* Figuring out whether a problem was coming from React, the service function, the API, or the database.

### What I learned from fixing them

* Debugging becomes easier when each layer has a clear responsibility.
* Following a request through each layer helps me understand where a problem is actually happening.

---

# 🐛 Problems I Encountered

Document important problems instead of hiding them.

## Problem 1: Backend Became Difficult to Maintain

### What happened

At first, having most of my backend code in fewer files was fine because the project was still small. As LaterBox grew, the files became larger and the functions started doing too many things.

### What I initially thought

I thought keeping everything together would make the code easier to follow because I wouldn't have to jump between multiple files.

### What was actually happening

As I added more features, different responsibilities became mixed together. Changing one function could also affect other parts of the application, making bugs harder to track down.

### Solution

I separated the backend into routes, controllers, services, repositories, middleware, and utilities.

### Lesson

> I learned that keeping everything in one place is not always simpler. As a project grows, separating responsibilities can make the code easier to understand and maintain.

---

## Problem 2: Setting Up New Technologies

### What happened

Throughout the project, I had to introduce new technologies and libraries such as Prisma, OAuth, Cheerio, and other tools. Setting them up usually involved installing packages, configuring environment variables, creating boilerplate, and connecting them to my existing application.

### What I initially thought

I thought that once I successfully set up a technology, I would remember the setup for the next time I needed it.

### What was actually happening

I realized that setup and configuration steps are difficult for me to memorize because I usually only do them once in a project. When I need to use the same technology again later, I often have to look at the documentation or an old project to remember the installation, configuration, and boilerplate.

### Solution

Instead of trying to memorize every setup step, I started focusing on understanding what each part of the setup does, why it is needed, and how the technology fits into my application. I can then refer to documentation for the exact installation or boilerplate when I need it again.

### Lesson

> I learned that I don't need to memorize every piece of boilerplate code. What matters more is understanding the purpose and flow of the technology so I can set it up again when I need it.

---

## Problem 3: Database Schema Became Harder to Manage

### What happened

As I added more features, I noticed that many functions were interacting with the same table. The schema worked at first, but became harder to manage as the project grew.

### What I initially thought

I was mostly focused on getting the features working, so I didn't think too much about how the database structure might need to change later.

### What was actually happening

I realized that some data and responsibilities could be separated into their own tables instead of putting everything into one place.

### Solution

I separated related data into different tables and used relationships and junction tables where needed.

### Lesson

> I learned that database design should be considered early because the structure of the database affects how easy the rest of the application is to build and maintain.

---

# 🔄 How the Project Evolved

Document how your code changed as you learned.

## Version 1

Describe the original architecture.

```text
src/
├── bookmarks/
├── users/
└── config/
```

### Problems

* Functions get thick.
* Files become hard to maintain.
* Modifying a single function affects the other.

## Version 2

Describe what you changed.

```text
src/
├── routes/
├── controllers/
├── services/
├── repositories/
├── middlewares/
└── utils/
```

### Why I changed it

I changed the structure because the original approach started causing problems as LaterBox grew. I needed a clearer separation of responsibilities so I could understand where problems were coming from and avoid unrelated parts of the application being affected by changes.

---

# 📚 Concepts I Learned

A quick checklist of concepts encountered during the project.

### Backend

* REST APIs
* Middleware
* Sessions
* Password hashing
* Validation
* Error handling

### Database

* CRUD
* Relationships
* Joins
* Transactions
* ORM
* Prisma

### Frontend

* React components
* Props
* State
* Effects
* API requests
* Routing

### Development

* Git
* GitHub
* Debugging
* Environment variables
* Project structure

---

# 💡 Things I Would Do Differently

1. I would carefully plan the schema.
2. I would introduce a better project structure earlier once the code started becoming difficult to maintain.
3. I would understand the responsibility of each layer before moving code between files.
4. I would test smaller parts of functionality earlier instead of building several things and debugging them all at once.
5. I would document important architectural decisions while building instead of trying to remember why I made them later.

---

# 🎯 Current Understanding

Write honestly about what you can currently explain or implement.

### Comfortable With

* Creating API endpoints
* Using Prisma
* Creating database tables
* Connecting frontend to backend

### Still Learning

* Authentication and Authorization
* Proper system architecture
* Setting up a fullstack project

### I Understand the Concept But Need More Practice Implementing It

* Sessions and Cookies
* Debouncing
* Web scraping using cheerio
* Using Axios instead of fetch

---

# 🚀 Future Improvements

Things I may add or improve later.

* OAuth
* Caching
* Rate Limiting
* Proper state management
* Proper form handling and input validation
* More accurate use of status code
* Creating tests

---

# 📖 Useful Resources

Resources that helped me understand the project.

* ChatGPT
* Claude AI

---

# 📝 Final Reflection

Before I started LaterBox, I already knew some programming and web development, but most of what I knew was learned separately. I could build things, but I didn't really understand how everything came together when working on a larger project.

As I continued building LaterBox, I started experiencing problems that I didn't expect. Things that seemed simple at first became harder as the project grew. I had to rethink how I organized my code, how different parts of the application communicated, and how I approached problems when something didn't work.

A lot of my learning came from getting stuck. There were many times when I didn't immediately know what was wrong, and I had to spend time reading errors, looking at my code, searching for answers, and trying different approaches. It was frustrating sometimes, but those moments helped me become better at figuring things out on my own.

I also learned that I don't need to memorize everything I use. There are many things I will probably need to look up again when I use them in another project. What matters more to me now is understanding what something does, why I need it, and how it fits into the bigger picture.

The project also showed me that my first solution doesn't always have to be my final solution. As I learned more, I changed parts of LaterBox that I had already built. Instead of seeing that as wasted work, I started seeing it as part of the learning process.
Looking back, I can see a clear difference between how I approached the project when I started and how I approach it now. I still have a lot to learn, and there are many things I can only explain but still need more practice implementing. But LaterBox gave me something that tutorials alone couldn't: experience dealing with a project that actually grew and became difficult to manage.

> This project was not just about building a simple bookmark manager. It was about learning how to build software, learning from my mistakes, and becoming more comfortable with figuring things out as I go.
