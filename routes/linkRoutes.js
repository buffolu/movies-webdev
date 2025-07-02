const express = require('express');
const {movieLinkController} = require('../controllers/linksController');
const linkRouter = express.Router();

linkRouter.post('/api/:movieID/links', movieLinkController.addLink);
linkRouter.put('/api/:movieID/links/:linkID', movieLinkController.updateLink);
linkRouter.delete('/api/:movieID/links/:linkID/:userID', movieLinkController.deleteLink);
linkRouter.get('/api/:movieID/:userID/links', movieLinkController.allLinks); //return all links for a movie

module.exports = linkRouter;