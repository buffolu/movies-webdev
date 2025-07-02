

//checks if user logged in, if yes let him continue to his page,otherwise return to login page
function checkifLogged()
{
    let userInfo = sessionStorage.getItem("userInfo");
    if (!userInfo){
        window.location.href = "/login";
    }
}

function logout()
{
    sessionStorage.removeItem("userInfo");
    window.location.href = "/login";
}


//sweet alert wrap
function alertSweet(message) {
    Swal.fire({
        position: "center",
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 1200
    });
}



//this function attache event listerns to buttons, used for remove,add and update link buttons but can be extended to more
async function attachLinkEventListeners(movie, userID) {
    // Handle UPDATE button click (show form)
    document.querySelectorAll(`.update-link-btn[data-movieid="${movie.movieID}"]`).forEach(button => {
        button.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            const form = document.querySelector(`.update-link-form[data-movieid="${movie.movieID}"][data-index="${index}"]`);
            if (form) form.style.display = "block";
        });
    });

    // Handle CANCEL update button (hide form)
    document.querySelectorAll(`.cancel-update[data-movieid="${movie.movieID}"]`).forEach(button => {
        button.addEventListener("click", function () {
            const form = this.closest(".update-link-form");
            if (form) form.style.display = "none";
        });
    });

    // Handle UPDATE form submission
    document.querySelectorAll(`.update-link-form[data-movieid="${movie.movieID}"]`).forEach(form => {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();
            const index = this.getAttribute("data-index");

            const updatedTitle = this.querySelector(".update-title").value;
            const updatedURL = this.querySelector(".update-url").value;
            const updatedDescription = this.querySelector(".update-description").value;
            let newLink = new Link(updatedTitle, updatedURL, updatedDescription);

            await movie.updateLink(userID, index, newLink);
            this.style.display = "none"; // Hide form after submission

            reRenderPage();
        });
    });

    // Handle REMOVE button click
    document.querySelectorAll(`.remove-link-btn[data-movieid="${movie.movieID}"]`).forEach(button => {
        button.addEventListener("click", async function () {
            const index = this.getAttribute("data-index");

            await movie.removeLink(userID, index);

            reRenderPage();
        });
    });

    // Handle "Add Link" button click
    document.querySelectorAll(`.add-link-btn[data-movieid="${movie.movieID}"]`).forEach(button => {
        button.addEventListener("click", async function () {
            const movieID = this.getAttribute("data-movieid");
            const movie = data.movies.find(m => m.movieID === movieID);
            if (!movie) return;

            // Remove existing form if already displayed
            let curr = document.getElementById('linkForm');
            if (curr != null) {
                curr.remove();
                return;
            }

            // Build new form for link info
            const form = `
            <form id="linkForm">
                <div class="form-group">
                    <label for="linkName" style="color: black;">Name:</label>
                    <input type="text" class="form-control" id="linkName" required style="color: black;">
                </div>
                <div class="form-group">
                    <label for="linkURL" style="color: black;">Link:</label>
                    <input type="url" class="form-control" id="linkURL" required style="color: black;">
                </div>
                <div class="form-group">
                    <label for="linkDescription" style="color: black;">Description:</label>
                    <textarea class="form-control" id="linkDescription" rows="3" style="color: black;"></textarea>
                </div>
                <div class="form-group">
                    <label for="linkVisibility" style="color: black;">Visibility:</label>
                    <select class="form-control" id="linkVisibility" style="color: black;">
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary mt-2">Add Link</button>
            </form>
        `;


            document.getElementById(`container-link-${movieID}`).innerHTML = form;

            // Add link when user presses submit
            document.getElementById('linkForm').onsubmit = async (event) => {
                event.preventDefault();
                const title = document.getElementById('linkName').value;
                const url = document.getElementById('linkURL').value;
                const description = document.getElementById('linkDescription').value;
                const visibility = document.getElementById('linkVisibility').value;

                let public_ = (visibility === "public");
                let link = new Link(title, url, description, public_);

                // Add the link to the movie
                await movie.addLink(userID, link);

                // Re-render page after link is added
                reRenderPage();
            };
        });
    });
}
