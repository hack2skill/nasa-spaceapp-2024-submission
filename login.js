
document.addEventListener('DOMContentLoaded', function() {
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission
 
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
 
  // Update the fetch request with the full URL (including port 3000)
  fetch(`http://localhost:3000/user/login?username=${username}&password=${password}`, {         ////   //only delete till .com  http://localhost:3000/user/login

      method: 'GET',
  })
  .then(response => response.json())
  .then(response=> {
   
      if (response.success) {
        alert("Log in success")
          // Redirect to the welcome page if login is successful
          window.location.href = `/welcome.html?username=${encodeURIComponent(username)}`;
      } else {
          alert('Invalid login. Please try again.');
      }
  })
  .catch(error => {
     alert('fetch Error:');
  });
});

document.getElementById("SignUp").addEventListener('click',function()
{
    window.location.href = '/signUp.html';
})
})
