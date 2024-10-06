document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("signupForm").addEventListener("submit", function(event) {
      event.preventDefault(); // Prevent default form submission
  
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const age = Number(document.getElementById("age").value);
  
      const data = {
        username: username,
        password: password,
        age: age
      };
  
      fetch(`http://localhost:3000/user/signup`, {           //   //only delete till .com     http://localhost:3000/user/signup
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())  // Parse the response as JSON
      .then(response => {
        if (response.response === true) {
          // If signup is successful, show success alert
          alert("Signup success, please login");
          window.location.href = '/login.html';  // Redirect to login page
        } else if (response.response === "not success") {
          // If validation fails, show validation error
          alert(`Signup failed: ${response.msg}`);
        } else {
          alert('Invalid signup. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during signup.');
      });
    });
  });
  