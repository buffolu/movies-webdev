// favoriteSchema.js
const mongoose = require('mongoose');
const Favorite = require('./favorite');  // Import the individual favorite item schema

// Define the main Favorite schema
const FavoritesSchema = new mongoose.Schema({
    userID: { type: String, required: true, unique: true },  // Unique user identifier
    favoritesList: [ Favorite.schema]  // List of favorite movies
}, { collection: 'favorites' });

module.exports = mongoose.model('Favorites', FavoritesSchema);
