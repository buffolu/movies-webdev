# 🎜 Movie Manager App

A **web application** for managing movies built with **Node.js, Express, and MongoDB**.

✨ Features:

* 🔍 **Search** for movies
* 🔗 **Add links** for a movie (public or private)
* ⭐ **Add to favorites** and view them in a favorites page
* 🛠️ **Manage movies** (CRUD operations)
* 🔐 **Authentication** for registered users only

---

### 📸 Screenshots

Here are some screenshots of the application:

**App Home Page**  
<img width="400" alt="App Home Page" src="https://github.com/user-attachments/assets/29c3859e-c22f-4fcd-9e66-0ae1a290e240" />

**Search for Movies**  
<img width="600" alt="Search for Movies" src="https://github.com/user-attachments/assets/effa4738-9a83-43b9-bf90-c119ba8e8dee" />

**Details for Movie Page**  
<img width="600" alt="Movie Details Page" src="https://github.com/user-attachments/assets/1ed3cccd-9021-4c97-80bb-19b9872b1a4b" />

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
* 🍃 **(optional)MongoDB Atlas account (Free)** → [Sign up](https://www.mongodb.com/atlas)

---

# HW Movies NodeJS - Setup Guide

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/hw-movies-nodejs.git
cd hw-movies-nodejs
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Set Up Environment Variables

1. In the project root, create a file named `.env`.  
2. Add your MongoDB connection string and port:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.abcd.mongodb.net/myDatabase?retryWrites=true&w=majority
PORT=3000
```

- Replace `<username>` and `<password>` with your **MongoDB Atlas credentials**.  
- **Optional:** You can use the provided test MongoDB connection instead:

```env
MONGO_URI=mongodb+srv://igorhmelik123:movies123123@movies.eistqro.mongodb.net/?retryWrites=true&w=majority&appName=Movies

```

> Using this allows you to run the app immediately without creating your own cluster.

### 4️⃣ Start the Application

```bash
npm start
```

- You should see:  
```
MongoDB connected
Server running on port 3000
```

### 5️⃣ Log In

- Use your **own registered account** or the **test credentials**:  

```
Email: test@gmail.com
Password: Test123123
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
