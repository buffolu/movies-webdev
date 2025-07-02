// favoriteItemSchema.js
const mongoose = require('mongoose');

// Define the schema for each item in the favorites list
const favoriteSchema = new mongoose.Schema({
    movieID: { type: String, required: true },  // Unique movie identifier
    title: { type: String, required: true },    // Movie title
    year: { type: String, required: true },     // Release year
    genre: { type: String,required: true },     // Genre              
    director: { type: String,required: true },  // Director             
    actors: { type: String,required: true },    // Actors            
    plot: { type: String ,required: true },     // Plot             
    ratings: { type: String ,required: true },   // Rating              
    poster: { type: String ,required: true}                   // Picture of the movie
});

module.exports = mongoose.model('Favorite', favoriteSchema);
