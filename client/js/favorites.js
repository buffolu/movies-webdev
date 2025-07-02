
// Initialize the favorites list and container
const moviesContainer = document.getElementById('movies-container');  //container for favorites list
let data = new Data();
let lowToHigh = true; //default would be to store the movies from low to high in some definig order
let sortValue = 'sort-by'; //default value to sort movies- as sorted in the local storage


document.addEventListener('DOMContentLoaded', async () => {
    //user info
    let userinfo = sessionStorage.getItem('userInfo');
    data.userID = userinfo ? JSON.parse(userinfo).userId : null;
    
    //create list of movieDetails
    const list = await favoriteAPI.fetchFavorites(data.userID);
    list.forEach(movie => {
        movie.isFavorite = true;
        data.movies.push(Object.assign(new MovieDetails(), movie));
        
    }); 
    
    //get list of links for each movie
    let list_links  = await getLinks();
    for(let i = 0;i<list_links.length;i++)
        {
         
            data.movies[i].links = list_links[i].list;
        }
    
    //render page
    renderFavoritesCard(data.movies, moviesContainer);    


    // Listener for sorting by category (e.g., title, rating, etc.)
    document.getElementById('select-sort').addEventListener('change', function() {
        sortValue = this.value;
        sortAndRenderMovies();
    });

    // Listener for sorting order (low-to-high or high-to-low)
    document.getElementById('sort-order').addEventListener('change', function() {
        if (sortValue === 'sort-by') return; // Prevent sorting if no valid category is selected
        lowToHigh = this.value === 'low-high';
        sortAndRenderMovies();
    });

});

//sort and render
function sortAndRenderMovies() {
    moviesContainer.innerHTML = '';
    let sortedList = data.movies.sort((a, b) => 
        lowToHigh ? (a[sortValue] > b[sortValue] ? 1 : -1) 
                  : (a[sortValue] < b[sortValue] ? 1 : -1)
    );
    renderFavoritesCard(sortedList, moviesContainer);
}

//retrieve links using linkAPI
async function  getLinks(){
    let list_links = [];
    for(let i = 0;i<data.movies.length;i++){
        let movieID = data.movies[i].movieID;
        let links = await linkAPI.fetchLinks(movieID,data.userID);
        list_links.push({movieID:movieID,list:links});
    }
    return list_links;
}

//re render page
function reRenderPage(){
    if((sortValue === 'sort-by')){       
     renderFavoritesCard(data.movies, moviesContainer);    

    }
    else{
    sortAndRenderMovies();
    }
}