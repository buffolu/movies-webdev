const express = require('express');
const {favoritesController} = require('../controllers/favoritesController');
const router = express.Router();

router.get('/api/favorites/', favoritesController.getFavorites); //get all favorties
router.post('/api/favorites', favoritesController.addFavorite); //add a favorite
router.delete('/api/favorites/:movieID', favoritesController.deleteFavorite);  //delete a favorite




module.exports = router;
