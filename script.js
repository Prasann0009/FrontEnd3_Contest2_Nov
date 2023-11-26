document.addEventListener("DOMContentLoaded", function () {
  const app = document.getElementById("app");

  const isLogin = localStorage.getItem("accessToken") !== null;

  const isSignUp = window.location.pathname.includes("signup.html");
  const isProfilePage = window.location.pathname.includes("profile.html");

  if (!isLogin && isProfilePage) {
    goToSignup("You need to log in to access the Profile page.", "error");
  } else if (isLogin && isSignUp) {
    redirectToProfile(
      "You are already logged in. Redirecting to Profile page...",
      "info"
    );
  } else if (isLogin) {
    displayprofile();
  } else {
    goToSignup();
  }

  function goToSignup(message = "", messageType = "") {
    app.innerHTML = `
           
            <div class="form-container">
            <p>Welcome back!</p>
                <h4>Sign up to your account</h4>
                <form id="signupForm">
                    <label for="username" class="inputclass">Your name</label><br>

                    <input type="text" id="username" class="inputclass" required><br>

                    <label for="useremail" class="inputclass">Your email</label><br>

                    <input type="email" id="useremail" class="inputclass" required><br>

                    <label for="password" class="inputclass">Password</label><br>

                    <input type="password" id="password" class="inputclass" required><br>

                    <label for="password" class="inputclass">Confirm Password</label><br>

                    <input type="password" id="confirmpassword" class="inputclass" required><br>

                    <button type="submit" class="inputclass" id="signupbutton">Signup</button>
                </form>
                <p id="signupMessage" class="${messageType}">${message}</p>

            </div>
        `;

    const signupForm = document.getElementById("signupForm");
    const signupMessage = document.getElementById("signupMessage");

    signupForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const username = document.getElementById("username").value;
      const useremail = document.getElementById("useremail").value;
      const password = document.getElementById("password").value;
      const confirmpassword = document.getElementById("confirmpassword").value;

      const accessToken = generateAccessToken();

      localStorage.setItem("username", username);
      localStorage.setItem("useremail", useremail);
      localStorage.setItem("password", password);
      localStorage.setItem("accessToken", accessToken);

      signupMessage.textContent = "Signup successful!";
      signupMessage.className = "success";
      setTimeout(() => {
        redirectToProfile(
          "Signup successful! Redirecting to Profile page...",
          "success"
        );

        displayprofile();
      }, 1000);
    });
  }

  function displayprofile() {
    const username = localStorage.getItem("username");
    const useremail = localStorage.getItem("useremail");
    const password = localStorage.getItem("password");
    app.innerHTML = `
    
    <div class="container">
    <h2 id="text">Signup Successfull</h2>

                <h2 class="center">Profile</h2>
                <div class="image-container">
                </div>
                <p class="center">Full Name: ${username}</p>
                <p class="center">Email:${useremail}</p>
                <p class="center">Password: ${password}</p> 
                <button id="logoutBtn">Logout</button>
                
            </div>
        `;

    const logoutBtn = document.getElementById("logoutBtn");

    logoutBtn.addEventListener("click", function () {
      localStorage.clear();
      goToSignup();
    });
  }

  function redirectToProfile(message = "", messageType = "") {
    app.innerHTML = `
            <div class="container">
                <h2 id="text">${message}</h2>
                <h2 class="center">Profile</h2>
                <div class="image-container">
                </div>
                <p class="center">Full Name: ${username}</p>
                <p class="center">Email:${useremail}</p>
                <p class="center">Password: ${password}</p> 
                <button id="logoutBtn">Logout</button>
            </div>
        `;

    const logoutBtn = document.getElementById("logoutBtn");

    logoutBtn.addEventListener("click", function () {
      localStorage.clear();
      goToSignup();
    });
  }

  function generateAccessToken() {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let accessToken = "";
    for (let i = 0; i < 16; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      accessToken += charset[randomIndex];
    }
    return accessToken;
  }
});

// document.addEventListener('DOMContentLoaded', function () {
//      // Use a flag to check if authentication has been already checked
//   const authenticationChecked = localStorage.getItem('authenticationChecked');

//   if (!authenticationChecked) {
//     checkAuthentication();
//     localStorage.setItem('authenticationChecked', 'true'); // Set the flag to true
//   }
//   });

//   function checkAuthentication() {
//     const accessToken = localStorage.getItem('accessToken');
//     if (accessToken) {
//       redirectToProfile();
//     } else {
//       // Only redirect to signup page if the current page is not the signup page
//     if (!window.location.href.includes('index.html')) {
//         redirectToSignup();
//       }
//     }
//   }

//   function redirectToSignup() {
//     window.location.href = 'index.html';
//   }

//   function redirectToProfile() {
//     window.location.href = 'profile.html';
//     displayProfile();
//   }

//   function displayProfile() {
//     const profileDetails = document.getElementById('profileDetails');
//     const username = localStorage.getItem('username');
//     const email = localStorage.getItem('email');
//     profileDetails.innerHTML = `<p>Username: ${username}</p><p>Email: ${email}</p>`;
//   }

//   function signup() {
//     const username = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     const confirmpassword = document.getElementById('confirmpassword').value;
//     // Generate a random access token (not secure for production)
//     const accessToken = Array.from({ length: 16 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('');

//     // Store user details in local storage
//     localStorage.setItem('accessToken', accessToken);
//     localStorage.setItem('username', username);
//     localStorage.setItem('email', email);
//     localStorage.setItem('password', password);
//     localStorage.setItem('confirmpassword', confirmpassword);
//     // Display success message
//     // const signupMessage = document.getElementById('signupMessage');
//     // signupMessage.textContent = 'Signup successful! Redirecting to profile...';

//     // Redirect to profile page after a delay
//     setTimeout(redirectToProfile, 1000);
//   }

//   function logout() {
//     // Clear local storage
//     localStorage.clear();

//     // Redirect to signup page
//     redirectToSignup();
//   }
