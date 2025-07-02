
let data = new Data();
const searchKey = new URLSearchParams(window.location.search).get('search'); //search key for when user press back
const movieID = new URLSearchParams(window.location.search).get('imdbID'); //movieID of the movie
let container = document.getElementById("movies-details"); //container from HTML file

    
window.onload = async function() {
    checkifLogged(); // check if user logged in, implemented in utils.js
  
    //get user info
    let userinfo = sessionStorage.getItem('userInfo');
    data.userID = userinfo ? JSON.parse(userinfo).userId : null;

    //fetch and check if current movie is favorite
    const favoritesList = await favoriteAPI.fetchFavorites(data.userID);
    let favoriteMovie = favoritesList.find(movie => movie.movieID === movieID); 
    let isFavorite = Boolean(favoriteMovie); 
    let movie = null;

    //intialize movie as current movie
    // if movie in favorite list, not need to get data from api, get from mondodb storage
    if (isFavorite){  
        let links = await linkAPI.fetchLinks(movieID,data.userID);
        movie = new MovieDetails(
            favoriteMovie.movieID,
            favoriteMovie.title,
            favoriteMovie.year,
            favoriteMovie.genre,
            favoriteMovie.director,
            favoriteMovie.actors,
            favoriteMovie.plot,
            favoriteMovie.ratings,
            favoriteMovie.poster,
            links,
            true
        );
    }
    if(!isFavorite){ //if not get from API
        movie = await MovieAPI.fetchMoviesDetails(movieID);}
    data.movies.push(movie); 
    //render page
    await renderDetailsPage(movie,data.userID,searchKey,container);
   
};
    


// this function is implemented diffrently in difrrent js files and save dupilcate code
async function reRenderPage(){

    await renderDetailsPage(data.movies[0],data.userID,searchKey,container);

}

//add to fav (might delete)
async function handleAddToFavorites(movieID, userID) {
    const movie = data.movies.find(m => m.movieID === movieID); // Find the correct movie object
    if (!movie) return;
    
    await movie.addToFavorites(userID);  // Wait for it to complete
    reRenderPage();  // THEN re-render the page
}

//remove from fav (might simplify or delete)
handleRemoveFromFavorites = async function (movieID, userID) {
    const movie = data.movies.find(m => m.movieID === movieID);
    if (!movie) return;

    await movie.removeFromFavorites(userID);
    reRenderPage();
};
