

class favoriteAPI{
    /**
     * API CLAS FOR FETCHING/ADDING/REMOVING FAVORTIE MOVIE FROM DATA BASE
     */
    

    // Fetch all favorties based on userID
    static async fetchFavorites(userID) {
        try {
            const response = await fetch(`api/favorites?userID=${userID}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                }
              });
            
         
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        
            const favoritesList = await response.json();
            return favoritesList;
        
        } 
        catch (error) {
            console.error('Error fetching favorites:', error);
        }
    }

    //add movie to userID entry 
    static async addToFavorties(userID,movie){
        try {
            const response = await fetch('/api/favorites', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userID, movie })
            });
            if (!response.ok) throw new Error('Failed to add to favorites');
            return true;
            

        }
        catch (error) {
            return false;
        }

    }

    //remove from movieID from userID favorties
    static async removeFromFavorites(userID,movieID){
        try {
            const response = await fetch(`/api/favorites/${movieID}`, {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userID }),
            });
            if (!response.ok) throw new Error('Failed to remove from favorites');
            return true;
           
      
          } 
          catch (error) {
            return false;
          }
        }
}

class linkAPI {
    /*
    set of functions to handle link API calls
    */

    // Fetch all links for a specific movie
    static async fetchLinks(movieID,userID) {
        try {
            const response = await fetch(`/api/${movieID}/${userID}/links`);
            if (!response.ok) throw new Error(`Failed to fetch links: ${response.status}`);
            
            let data =  await response.json();
            let links = [];
            data.links.forEach(link => {
                links.push(new Link(link.title,link.url,link.description,link.isPublic,link._id,link.isMine));
            });
            return links;
        } catch (error) {
            console.error("Error fetching links:", error);
            return null; // Or handle the error appropriately
        }
    }

    // Add a new link for a movie
    static async addLink(userID,movieID,link) {
        try {
            const response = await fetch(`/api/${movieID}/links`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userID,link })
            });
            if (!response.ok) throw new Error(`Failed to add link: ${response.status}`);
        
            const data = await response.json();
            let newLink = new Link(link.title,link.url,link.description,link.isPublic,data.link._id,true);
            return newLink;

        } catch (error) {
            console.error("Error adding link:", error);
            return null;
        }
    }

    // Update an existing link
    static async updateLink(userID,movieID,link) {
        try {
            const response = await fetch(`/api/${movieID}/links/${link._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({link,userID})
            });
            if (!response.ok) throw new Error(`Failed to update link: ${response.status}`);

            return await response.json();
        } catch (error) {
            console.error("Error updating link:", error);
            return null;
        }
    }

    // Delete a link by ID
    static async deleteLink(userID,movieID, link) {
        try {
            const response = await fetch(`/api/${movieID}/links/${link._id}/${userID}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error(`Failed to delete link: ${response.status}`);

            return await response.json();
        } catch (error) {
            console.error("Error deleting link:", error);
            return null;
        }
    }  
}



class MovieAPI{
    /**
    set of function to handle API calls to movie API
     */
    
    //return moviess based on name(query)
    static async fetchMovies(query){
        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
        
        const data = await response.json();
        if (data.Response === "True"){
            let moviesListFound = data.Search;
            return moviesListFound.map(m => new Movie(m.imdbID, m.Title, m.Year, m.Plot, m.imdbID, m.Poster));
            
        }
        return [];
    }
    
    //return a more detailed version based on imdbid
    static async fetchMoviesDetails(imdbID){
        let response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${imdbID}`)
        const data = await response.json();
        
        if (data.Response === "True"){
            return new MovieDetails(imdbID,data.Title, data.Year, data.Genre, data.Director, data.Actors, data.Plot, data.Ratings[0].Value, data.Poster);

        }
        return null;

    }
} 

