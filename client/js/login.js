// LOGIN TABS


document.addEventListener("DOMContentLoaded", function () { 

        const signupForm = document.querySelector(".signup-form");
        const loginForm = document.querySelector(".login-form");


        //handle registration
        if (signupForm) {
            signupForm.addEventListener("submit", handleRegister);
        }   
        

        //handle sign in
        if (loginForm) {
            loginForm.addEventListener("submit", handleLogin);
        }


        //handling tabs switching beetwen login and register
        const tabs = document.querySelectorAll(".tabs h3 a");
        const tabContents = document.querySelectorAll('div[id$="tab-content"]');
      
        tabs.forEach(tab => {
            tab.addEventListener("click", function (event) {
              event.preventDefault();
            
              // Remove 'active' class from all tabs
              tabs.forEach(t => t.classList.remove("active"));
              this.classList.add("active");
            
              // Hide all tab contents
              tabContents.forEach(content => content.classList.remove("active"));
            
              // Show the clicked tab's content
              const tabContentId = this.getAttribute("href");
              document.querySelector(tabContentId).classList.add("active");
          
              // Update the URL based on the clicked tab
              if (tabContentId === "#login-tab-content") {
                history.pushState(null, '', '/login');
              } else if (tabContentId === "#signup-tab-content") {
                history.pushState(null, '', '/register');
              }
            });
          });
          
        // If the pathname is "/register", switch to the signup tab.
        if (window.location.pathname === "/register") {
            switchTab("signup");
        }
});

// Function to handle user login
async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById("user_login").value.trim();
    const password = document.getElementById("user_pass_login").value.trim();

    if (!email || !password) {
        alert("Both email and password are required.");
        return;
    }

    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Store user data in sessionStorage
            sessionStorage.setItem("userInfo", JSON.stringify(data));

            // Redirect to the index page
            window.location.href = "/index";
        } else {
            alertSweet(data.error); // Show error message
        }
    } catch (error) {
        switchTab("login"); // Stay on signup tab

       
    }
}

// Function to handle user registration
async function handleRegister(event) {
    event.preventDefault();

    const email = document.getElementById("user_email").value.trim();
    const username = document.getElementById("user_name").value.trim();
    const password = document.getElementById("user_pass").value.trim();
    const confirmPassword = document.getElementById("confirm_pass").value.trim();

    if (!email || !username || !password || !confirmPassword) {
        alertSweet("All fields are required.",false);
        return;
    }

    if (password !== confirmPassword) {
        alertSweet("Passwords do not match.",false);
        return;
    }
    try {
        const response = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password, confirmPassword }),
        });

        const data = await response.json();

        if (response.ok) {
            alertSweet("Registration successful! You can now log in.");
            switchTab("login"); // Switch to login tab
        } else {
            alertSweet(data.error,false);
            switchTab("signup"); // Stay on signup tab
        }
    } catch (error) {
        alertSweet("An error occurred. Please try again.",false);
        switchTab("signup"); // Stay on signup tab
    }
}

// Function to switch between login and signup tabs and update URL
function switchTab(tabName) {
    if (tabName === "login") {
        document.querySelector(".log-in").click();
        // Update the URL to /login without reloading the page
        history.pushState(null, '', '/login');
    } else if (tabName === "signup") {
        document.querySelector(".sign-up").click();
        // Update the URL to /register without reloading the page
        history.pushState(null, '', '/register');
    }
}

//sweet alert wrap
function alertSweet(message,success = true) {
    let icon = "success"
    if (success === false) {
        icon = "error"
    }
    Swal.fire({
        position: "center",
        icon: icon,
        title: message,
        showConfirmButton: false,
        timer: 1200
    });
}
function alertSweetFailure(message) {
    Swal.fire({
        position: "center",
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 1200
    });
}