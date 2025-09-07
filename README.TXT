# 🎜 Movie Manager App

A **web application** for managing movies built with **Node.js, Express, and MongoDB**.

✨ Features:

* 🔍 **Search** for movies
* 🔗 **Add links** for a movie (public or private)
* ⭐ **Add to favorites** and view them in a favorites page
* 🛠️ **Manage movies** (CRUD operations)
* 🔐 **Authentication** for registered users only

---

## 🏧 Architecture (MVC Pattern)

* 🔾 **Views** → JS files (UI rendering)
* 🧠 **Controllers** → Handle API logic
* 🟔️ **Models** → Define MongoDB schemas (via Mongoose)

---

## ⚙️ Prerequisites

Make sure you have:

* 🟢 **Node.js v14+** → [Download](https://nodejs.org/)
* 📦 **npm** (comes with Node.js)
* 🍃 **MongoDB Atlas account (Free)** → [Sign up](https://www.mongodb.com/atlas)

---

## 🚀 Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/hw-movies-nodejs.git
cd hw-movies-nodejs
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Start the Application

```bash
npm start
```

🌍 The app will be running at: **[http://localhost:3000](http://localhost:3000)**

---

## 📡 API Endpoints

### 🎟 Movies

* `GET /` → Home page
* `GET /movies` → Get all movies
* `POST /movies` → Add new movie
* `PUT /movies/:id` → Update a movie
* `DELETE /movies/:id` → Delete a movie

### 🌐 API Routes

* `GET /api/movies` → Get movies (JSON)
* `POST /api/movies` → Add a movie via API

---

## 🛠️ Technologies Used

* ⚡ **Node.js** – JavaScript runtime
* 🚏 **Express.js** – Web framework
* 🍃 **MongoDB** – Database
* 📘 **Mongoose** – ODM for MongoDB
* 🎨 **EJS/Handlebars** – Template engine (if applicable)
* 🔄 **Nodemon** – Dev server with auto-reload

---

## 📂 Project Structure

📁 **Routes**

* `authRoutes` → login/register
* `favorites` → add/remove/update favorites
* `linkRoutes` → CRUD for movie links

📁 **Client**

* UI for movies, details, favorites, login, register

---

## 🔑 Main Components

⭐ **Favorites**

* Add/remove movies as favorites (stored in MongoDB)
* View favorites page
* ➡️ *TO DO*: Remove/add directly from favorites page

🔗 **Links**

* Add/remove/update links for movies
* Links can be **public** or **private**
* Only creator can edit/delete
* Public links visible to all users
* ➡️ *TO DO*: Add ratings + click tracking

👤 **Users**

* Only registered users can access main pages
* Logout options:

  * 🚪 Manual (Logout button)
  * ❌ Auto (closing the page)

---
