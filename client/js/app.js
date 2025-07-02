

//KEY FOR OMBAPI API
const API_KEY = "a8d0a56a";
const BASE_URL = "http://www.omdbapi.com/";

//more convinent in some files to use this
class Data{
     searchBar = null;
     userID = null;    
     movies = [];
}



//movie  class(might delete this)
class Movie {
    constructor(id, title, year, plot, imdbid, poster) {
        this.id = id;
        this.title = title;
        this.year = year;
        this.plot = plot;
        this.imdbid = imdbid;
        this.poster = poster;
    }        
}
//link class(might delete this)
class Link{
    constructor(title,url,description,isPublic,_id = null, isMine = null){
        this.title = title;
        this.url = url;
        this.description = description;
        this.isPublic = isPublic;
        this._id = _id;  //id link provided by mongoDB
        this.isMine = isMine; //if link is mine or someone's else
        
    }
    updateLink(title,url,description){
        this.title = title;
        this.url = url;
        this.description = description;
    }
    
}


class MovieDetails {
    /*
    * Class to represent the details of a movie
    addLink(name, url, description) - method to add a link to the movie
    removeLink(index) - method to remove a link from the movie
    updateLink(index, name, url, description) - method to update a link of the movie
    */
    constructor(movieID, title, year, genre, director, actors, plot, ratings, poster, links = [],isFavorite=false) {
        this.movieID = movieID;
        this.title = title;
        this.year = year;
        this.genre = genre;
        this.director = director;
        this.actors = actors;
        this.plot = plot;
        this.ratings = ratings;
        this.poster = poster;
        this.links = links;
        this.isFavorite = isFavorite
    }

    // Add a new link and update the local list
    async  addLink(userID,link) {
            try {
                const savedLink = await linkAPI.addLink(userID,this.movieID,link);
                if (!savedLink) throw new Error("Failed to add link");
                this.links.push(savedLink);
            } catch (error) {
                console.error("Error adding link:", error);
            }
            
            alertSweet("Link added successfully");
        }
    




    //update link
    async  updateLink(userID,index,newLink) {
            let oldLink = this.links[index];
            newLink._id = oldLink._id;
            
            try {
                const response = await linkAPI.updateLink(userID,this.movieID, newLink);
                if (!response) throw new Error("Failed to update link");
    
                // Find the link in the local list and update it
                newLink.isMine = true;
                const index = this.links.findIndex(l => l._id === newLink._id);
                if (index !== -1) {
                    this.links[index] = newLink;
                }
                
            } catch (error) {
            console.error("Error updating link:", error);
            }

            
         alertSweet
         ("Link updated successfully");
        
    }

    
  
    //add movie to favorties
    async addToFavorites(userID) {
        const status = await favoriteAPI.addToFavorties(userID,this); //request from server
        if (status === true){
          alertSweet("Movie added to favorites successfully");
          this.isFavorite = true;
          this.links =  await linkAPI.fetchLinks(this.movieID,userID);
        }
        else{
           alertSweet("Failed to add to favorites,try again.");
        }
    }

    //remove movie from favorties
    async  removeFromFavorites(userID) {

        const status = await favoriteAPI.removeFromFavorites(userID,this.movieID);   //REQUEST TO SERVER
        if(status === true){
            alertSweet("Movie removed from favorites successfully");
            this.isFavorite = false;
            this.links = [];
        }
        else{
          alertSweet("Failed to remove movie from favorites");
        }

    }
    
    //Activates when user removes link.
    //can only remove my links.
    async  removeLink(userID,index) {
        const link = this.links[index];
        const linkID = link._id;
        try {
            const response = await linkAPI.deleteLink(userID,this.movieID, link);
            if (!response) throw new Error("Failed to delete link");

            // Remove the link from local storage
            this.links = this.links.filter(link => link._id !== linkID);
        } catch (error) {
            console.error("Error deleting link:", error);
        }

        alertSweet("Link removed successfully");
    }
    
}