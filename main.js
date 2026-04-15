import { signOut } from './backend.js';

// When the user clicks on the icon, toggle between hiding and showing the dropdown content
document.addEventListener('DOMContentLoaded', function () {
  const loginIcon = document.querySelector('.login-container');
  const dropdown = document.getElementById("loginDropdown");

  const loggedInUser = localStorage.getItem('loggedInUser');

  if (loggedInUser) {
      // User is logged in, update dropdown
      dropdown.innerHTML = `
          <p>Welcome, ${loggedInUser}</p>
          <a href="#" id="logout-btn">Sign Out</a>
      `;
      document.getElementById('logout-btn').addEventListener('click', (e) => {
          e.preventDefault();
          signOut();
      });
  } else {
      // User is not logged in, show default links
      dropdown.innerHTML = `
          <a href="signin.html">Sign In</a>
          <a href="signup.html">Sign Up</a>
      `;
  }

  loginIcon.addEventListener('click', function (event) {
    event.stopPropagation();
    dropdown.classList.toggle("show");
  });

  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.closest('.login-container')) {
      if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
      }
    }
  }
});
