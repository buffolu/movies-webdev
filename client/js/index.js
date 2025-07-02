let searchInputElement = document.getElementById("search-txt"); 

document.addEventListener("DOMContentLoaded", function () {
    checkifLogged();

    //user info
    const userinfo = sessionStorage.getItem("userInfo");
    const username = userinfo ? JSON.parse(userinfo).username : null;  // Display user email

    //greetings based on username
    document.getElementById('greeting').textContent = `Hello, ${username}`;

    // Event listener for search input
    searchInputElement.addEventListener('input', inputSearch);

    // Handle when user navigates back from the details page
    const searchKey = new URLSearchParams(window.location.search).get('search');
    if (searchKey) {
        searchInputElement.value = searchKey;
        const url = new URL(window.location);
        url.searchParams.set('search', '');
        window.history.pushState({}, '', url);
        inputSearch();
    }

    function inputSearch() {
        let containerMoviesDiv = document.getElementById("movies-container");
        let query = searchInputElement.value;
        containerMoviesDiv.innerHTML = "";  // Clear previous results

        if (query.length >= 3) {
            MovieAPI.fetchMovies(query)  // Fetch movies from MovieAPI
                .then(movies => {
                    // Call render function from app.js
                    MoviesRender.renderMovies(movies, containerMoviesDiv,query);
                });
        }
    }
});
