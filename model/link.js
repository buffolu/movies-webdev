// linkSchema.js
const mongoose = require('mongoose');


// Define the schema for the individual link details
const LinkSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    isPublic: { type: Boolean, required: true },
    userID: { type: String, required: true },
});

module.exports = mongoose.model('Link', LinkSchema);
