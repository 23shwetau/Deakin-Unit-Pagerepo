// When the user clicks on the icon, toggle between hiding and showing the dropdown content
document.addEventListener('DOMContentLoaded', function () {
  const loginIcon = document.querySelector('.login-container');
  const dropdown = document.getElementById("loginDropdown");

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
