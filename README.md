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
* 🍃 **MongoDB** + 📘 **Mongoose**– Database for managing users and users data
* 🎨 **EJS/Handlebars** – Template engine (if applicable)

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
<img width="1637" height="747" alt="Screenshot 2025-09-07 184415" src="https://github.com/user-attachments/assets/690b3f38-7793-400b-ad36-5c270efede59" />
<img width="1883" height="819" alt="Screenshot 2025-09-07 184355" src="https://github.com/user-attachments/assets/86899c15-b0b2-4a68-adc9-2fc17cf20b24" />
<img width="1895" height="842" alt="Screenshot 2025-09-07 184343" src="https://github.com/user-attachments/assets/3a7ad1f2-7bee-4ea6-b73b-cb414313208c" />
<img width="890" height="826" alt="Screenshot 2025-09-07 184130" src="https://github.com/user-attachments/assets/e8d0dad6-ff58-45fb-9f6a-437176f008b5" />

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
