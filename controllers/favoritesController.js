const exp = require('constants');
const Favorites = require('../model/favorites.js');
const Favorite = require('../model/favorite.js');
const Links = require('../model/links.js');
const path = require('path');




/**
 * controller for handling favorites API calls from client
 */
const favoritesController = {
    getFavorites: async (req, res) => {
        const { userID } = req.query;  // Extract userID from the request body

        try {
            // Check if the user already has a favorites list
            let favoritesItem =  await Favorites.findOne({ userID });

            if (!favoritesItem) {
                // If no favorites list found, create one with an empty array
                favoritesItem = new Favorites({
                    
                    userID,
                    favoritesList: []  // Initialize with an empty favorites array
                });
                await favoritesItem.save();  // Save the new favorites list to the database
            }

            
            const sanitizedFavorites = favoritesItem.favoritesList.map(favorite => {
                const obj = favorite.toObject ? favorite.toObject() : { ...favorite };
                delete obj._id; // Remove _id field
                return obj;
            });

            res.json(sanitizedFavorites);

        } catch (err) {
            // Handle errors, e.g., database connection issues
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        }

    },
    //add a favorite to mongoDB based on movie(movieDetails class ) and userID
    addFavorite: async (req, res) => {
        const { userID,movie } =  req.body; 
        try{
            let favoritesList = await Favorites.findOne({ userID }); // find user's list

            //if not found create new one
            if (!favoritesList) {
                favoritesList = new Favorites({
                    userID,
                    favoritesList: []
                });
            }
            //add new Favorite based on Favorite Schema
            let favorite = new Favorite({
                movieID: movie.movieID,
                title: movie.title,
                year: movie.year,
                genre: movie.genre,
                director: movie.director,
                actors: movie.actors,
                plot: movie.plot,
                ratings: movie.ratings,
                poster: movie.poster
            });

            favoritesList.favoritesList.push(favorite);
            await favoritesList.save();
            res.status(200).json({ message: "Movie added to favorites successfully!" });

            
            
        }
        catch(err)
        {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    //delete Favorite based on userID and movieID
    deleteFavorite: async (req, res) => {
        const { userID } = req.body; 
        const movieID = req.params.movieID;
        try{
            const favoritesList = await Favorites.findOne({ userID });
            
            //this should never happen
            if (!favoritesList) {
                res.status(404).json({ message: "Favorites not found for this user" });
            }
            else{
                //delete it
                favoritesList.favoritesList = favoritesList.favoritesList.filter(movie => movie.movieID !== movieID);
                await favoritesList.save(); //save it

                //delete assosiated links
                const movieLinks = await Links.findOne({ movieID });
                const links = movieLinks.linksList;
                for(let i = links.length - 1; i >= 0; i--){
                    if(links[i].userID === userID){
                        links.splice(i, 1);
                    }
                }
                await movieLinks.save();
            }
            res.status(200).json({ message: "Movie removed from favorites successfully!" });
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        }

    }
};
exports.favoritesController = favoritesController;