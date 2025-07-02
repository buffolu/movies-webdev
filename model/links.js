// movieLinkSchema.js
const mongoose = require('mongoose'); 
const Link = require('./link');

// Define the schema for the Movie and its associated links
const linksSchema = new mongoose.Schema({
    movieID: { type: String, required: true, unique: true },
    linksList: [Link.schema]  // An array of links
}, { collection: 'links'});

module.exports = mongoose.model('Links', linksSchema);
