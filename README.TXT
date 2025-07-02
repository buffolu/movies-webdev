







#disclaimer:
    some things were used by chatGPT, mainly but not exclusivly UI.
    duo to time shortage, not everything was implemented(admin page for example)
    the project was long and hard, escpicially becuase the initial structure was not good,
    and i had to write and restructure a lot of code, but this allowed me to learn how to approach
    and prepare for projects in this scales.






using mongoDB as data base(using mongoose);
using MVC:
    views: js files.
    Controllers: handle logic of API calls.
    Models: defines  mongoDB Schemes.

------------------------------------------------------------------------------------------
# Movies Project - Node.js & MongoDB

A web application for managing movies built with Node.js, Express, and MongoDB.

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB Atlas account** (free) - [Sign up here](https://www.mongodb.com/atlas)

## Installation

### 1. Clone the Repository
```bash
	git clone https://github.com/yourusername/hw-movies-nodejs.git
	cd hw-movies-nodejs
```

### 2. Install Dependencies
```bash
	npm install
```

how to start:
npm start
The application will be available at: **http://localhost:3000**


## API Endpoints

### Movies
- `GET /` - Home page
- `GET /movies` - Get all movies
- `POST /movies` - Add new movie
- `PUT /movies/:id` - Update movie
- `DELETE /movies/:id` - Delete movie

### API Routes
- `GET /api/movies` - Get movies as JSON
- `POST /api/movies` - Create movie via API

## Environment Variables

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **EJS/Handlebars** - Template engine (if applicable)
- **Nodemon** - Development server


---

**Happy coding! 🎬**
------------------------------------------------------------------------------------------
Folders:

ROUTES FILE:
    contains all logic of routes of requests from client
    authRoutes - login,register etc
    favorites - adding or removing or updtating a favorite/link in userFavortiesJson
    linkRoutes - adding,update,delete or fetch all

CLIENT:
    all the logic and view of movies, details, favorites, login page, register page

-------------------------------------------------------------------------------------------

Main components:

Favorites: user can add a movie as Favorite, storing the data(as is) in mongoDb collection.
           can see all Favorites in favorites Page.
           TO DO : remove/add favortie from favorties page.


Links: can add,remove,update links. can make links private/public
       other users can see other users public links.
       only the creator of the link whether it is public or private can modify it.
       links can be viewed in details page for specific movie or favorties - all links to all movies;
       Only avaiable for a movie toggled as Favorite.
       TO-DO: ratings for links, clicks for links.

users: only registrated users can enter the main pages, must log in.
       users can either log out in two ways:  manually(log out button) or exit the page.
       


TO-DO: 
    admin page.
    better UI.
    
