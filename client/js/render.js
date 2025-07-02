async function renderDetailsPage(movie, userID, searchKey, container) {
    /**
     * @param { MovieDetails } movie 
     * @param {string} userID 
     * @param {HTMLElement} container - HTML container to render content in
     * @returns {void}
     */
    
    // Clear existing content
    container.innerHTML = '';
  
    // Button generation functions
    function addFavoriteButton(movie, userID) {
      return `
        <button class="btn btn-outline-light cool-btn mb-2" onclick="handleAddToFavorites('${movie.movieID}', '${userID}')">
          <i class="bi bi-heart"></i> Add to Favorites
        </button>
      `;
    }
    
    function addRemoveButton(movie, userID) {
      return `
        <button class="btn btn-danger cool-btn mb-2" onclick="handleRemoveFromFavorites('${movie.movieID}', '${userID}')">
          <i class="bi bi-heart-fill"></i> Remove from Favorites
        </button>
      `;
    }
  
    // Determine which favorite button to display
    const favButton = movie.isFavorite 
      ? addRemoveButton(movie, userID) 
      : addFavoriteButton(movie, userID);
  
    // Main card template with a dark gradient background and overlay for details
    const card = `
      <div class="card cool-card mb-3 border-0">
        <div class="row">
          <!-- Left column: Poster with overlay details -->
          <div class="col-md-4 position-relative">
            <img src="${movie.poster}" class="img-fluid cool-img" alt="${movie.title}">
            <div class="card-body details-overlay text-light">
              <h5 class="card-title"><strong>Title: </strong>${movie.title}</h5>
              <p class="card-text"><strong>Release Date:</strong> ${movie.year}</p>
              <p class="card-text"><strong>Genre:</strong> ${movie.genre}</p>
              <p class="card-text"><strong>Director:</strong> ${movie.director}</p>
              <p class="card-text"><strong>Actors:</strong> ${movie.actors}</p>
              <p class="card-text"><strong>Plot:</strong> ${movie.plot}</p>
              <p class="card-text"><strong>Ratings:</strong> ${movie.ratings}</p>
            </div>
          </div>
          <!-- Middle column: Buttons -->
          <div class="col-md-2">
            <div id="buttons" class="d-flex flex-column mt-2">
              <a href="https://www.imdb.com/title/${movie.movieID}" target="_blank" class="btn btn-primary mb-2 cool-btn">
                <i class="bi bi-film"></i> View on IMDb
              </a>
              <button class="btn btn-secondary mb-2 cool-btn" onclick="window.location.href='/index?search=${searchKey}'">
                <i class="bi bi-arrow-left"></i> Go Back
              </button>
            </div>
            <div class="d-flex flex-column mt-2" id="container-link-${movie.movieID}"></div>              
          </div>
          <!-- Right column: listLinks (untouched) -->
          <div class="col-md-6" id="listLinks"></div>
        </div>
      </div>
    `;
  
    // Render the card into the container
    container.innerHTML = card;
  
    // Append the favorite button to the buttons div
    const buttonsDiv = container.querySelector('#buttons');
    if (buttonsDiv) {
      buttonsDiv.innerHTML += favButton;
    }
  
    // Clear and render additional links (listLinks remains untouched)
    let linksContainer = document.getElementById('listLinks');
    linksContainer.innerHTML = '';
    await renderLinks(movie, userID, movie.links, linksContainer);
  }
  
async function renderFavoritesCard(movies, container) {
    /**
     * 
     * RENDERS FAVORITES CARDS IN favortie.html
     * @param {list} movies
     * @param {container} html container
     *
     */

    container.innerHTML = '';
    let index = 0;
    const userinfo = sessionStorage.getItem('userInfo');
    const userID = userinfo ? JSON.parse(userinfo).userId : null;

    //MAIN CARD
    movies.forEach(async (movie) => {
        // Find the movie's links from list_links using movieID
        let movieLinks = movie.links;
        index++;
        // Create card element
        const card = document.createElement('div');
        card.className = 'col-md-3 mb-4';
        card.innerHTML = `
            <div class="card h-100" style="width: 18rem; background: linear-gradient(to right, #92FE9D, #00C9FF); box-shadow: 0 0 40px rgba(0,0,0,0.3);">
                <img src="${movie.poster}" class="card-img-top" alt="${movie.title}" style="height: 400px; object-fit: cover;">
                <div class="card-body d-flex flex-column text-white">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text">${movie.year}</p>
                    <p class="card-text">${movie.ratings.slice(0, 3)}</p>
                    <div class="mt-auto" id="links-${movie.movieID}"></div> <!-- Placeholder for links -->
                </div>
                <div class="d-flex flex-column mt-2" id="container-link-${movie.movieID}" style="display: none;"> 
            </div>
        `;

        // Append the card to the container
        container.appendChild(card);

        // Render links and insert them into the correct place
        const linksContainer = card.querySelector(`#links-${movie.movieID}`);
        await renderLinks(movie, userID, movieLinks,linksContainer);
    });
}


//render links function
async function renderLinks(movie, userID, movieLinks, container) {
    container.innerHTML = ''; // Clear previous content

    // Add "Add Link" button if the movie is a favorite
    if (movie.isFavorite) {
        container.innerHTML += addLinkButton(movie, userID);
    }
    if (movieLinks.length === 0 && !movie.isFavorite) {
        container.innerHTML = `<p class="text-muted">No links available</p>`;
        return;
    }

    movieLinks.forEach((link, index) => {
        const linkElement = document.createElement("div");
        linkElement.classList.add("d-flex", "flex-column", "mb-4");

        linkElement.innerHTML = `
            ${link.isMine ? `
                <div class="d-flex mb-3">
                    <button class="btn btn-danger mr-2 remove-link-btn"
                            data-userid="${userID}" data-movieid="${movie.movieID}" data-index="${index}">
                        <i class="bi bi-x-circle"></i> Remove
                    </button>
                    <button class="btn btn-warning update-link-btn"
                            data-userid="${userID}" data-movieid="${movie.movieID}" data-index="${index}">
                        <i class="bi bi-pencil"></i> Update
                    </button>
                </div>
                <form class="update-link-form mt-2 p-3 border rounded bg-light"
                      data-movieid="${movie.movieID}" data-index="${index}" style="display: none;">
                    <label>Title:</label>
                    <input type="text" class="form-control update-title" value="${link.title}">
                    <label class="mt-2">URL:</label>
                    <input type="url" class="form-control update-url" value="${link.url}">
                    <label class="mt-2">Description:</label>
                    <textarea class="form-control update-description">${link.description}</textarea>
                    <button type="submit" class="btn btn-success btn-sm mt-2">Save</button>
                    <button type="button" class="btn btn-secondary btn-sm cancel-update">Cancel</button>
                </form>
            ` : ''}

            <div class="link-container">
                <a href="${link.url}" target="_blank" class="btn btn-info btn-lg d-block mt-2 link-card">
                    <i class="bi bi-link-45deg"></i> ${link.title}
                </a>
                ${link.description ? `
                <span class="link-description ${link.description.length > 50 ? 'hover-only' : 'visible'}">
                    ${link.description}
                </span>` : ''}
            </div>
        `;

        container.appendChild(linkElement);
    });

    // Attach event listeners after rendering
    await attachLinkEventListeners(movie, userID);
}
  

function addLinkButton(movie, userID) {
    return `
       <button class="btn btn-info mb-2 add-link-btn"
        data-userid="${userID}" data-movieid="${movie.movieID}">
        <i class="bi bi-link-45deg"></i> Add Link
       </button>
    `;
}


//renders movies(currently used in index)
class MoviesRender {
    static currentSectorIndex = 0;
    static allMovies = [];
    static totalSectors = 0;
    static searchBar = null;
    
    // Function to render paginated movies
    static renderMovies(movies, container,query) {
        this.searchBar = query;
        this.allMovies = movies;  // Save all movies globally
        this.totalSectors = Math.ceil(this.allMovies.length / 4);  // Update total sectors for 4 movies per sector

        // Render the first sector of movies
        this.renderPaginatedMovies(container);
    }

    // Function to handle pagination and render movies
    static renderPaginatedMovies(container) {
        const sectorSize = 4;  // Change to 10 movies per sector
        const startIndex = this.currentSectorIndex * sectorSize;
        const endIndex = startIndex + sectorSize;
        const currentSector = this.allMovies.slice(startIndex, endIndex);

        // Render movies for the current sector
        this.renderMoviesCard(currentSector, container);

        // Render pagination controls (Next/Previous)
        this.renderPaginationControls(container);
    }

    // Function to render movies in cards
    static renderMoviesCard(movies, container) {
        container.innerHTML = "";  // Clear previous content
        movies.forEach(movie => {
            const card = `
                <div class="col-md-3 mb-4">
                    <div class="card h-100" style="width: 18rem;">
                        <img src="${movie.poster}" class="card-img-top" alt="${movie.title}" style="height: 400px; object-fit: cover;">
                        <div class="card-body d-flex flex-column" id="card-body">
                            <h5 class="card-title">${movie.title}</h5>
                            <p class="card-text">${movie.year}</p>
                            <a href="/details?imdbID=${movie.imdbid}&search=${this.searchBar}" class="btn btn-primary mt-auto" id="favorites-button">Details</a>
                        </div>
                    </div>
                </div>`;

            container.insertAdjacentHTML('beforeend', card);
        });
    }

    // Function to render pagination controls (Next/Previous)
    static renderPaginationControls(container) {
        const paginationContainer = document.getElementById('pagination-controls');
        paginationContainer.innerHTML = '';  // Clear existing pagination controls

        // Previous Button
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.disabled = this.currentSectorIndex === 0;
        prevButton.addEventListener('click', () => {
            if (this.currentSectorIndex > 0) {
                this.currentSectorIndex--;
                this.renderPaginatedMovies(container);
            }
        });
        paginationContainer.appendChild(prevButton);

        // Next Button
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.disabled = this.currentSectorIndex >= this.totalSectors - 1;
        nextButton.addEventListener('click', () => {
            if (this.currentSectorIndex < this.totalSectors - 1) {
                this.currentSectorIndex++;
                this.renderPaginatedMovies(container);
            }
        });
        paginationContainer.appendChild(nextButton);
    }
}
