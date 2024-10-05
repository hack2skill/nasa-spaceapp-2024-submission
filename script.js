var username;
var pword;
var country;
document.getElementById("nav").style.display = "none";
document.getElementById("courses").style.display = "none";

var navlogo = document.getElementById("navlogo");
navlogo.addEventListener("mouseover", function () {
  this.classList.add("fa-bounce");
});
navlogo.addEventListener("mouseout", function () {
  this.classList.remove("fa-bounce");
});

function profile() {
  document.getElementById("login").style.display = "none";
  document.getElementById("welcome-header").style.display = "none";
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("courses").style.display = "none";
  document.getElementById("forum").style.display = "none";
  document.getElementById("about").style.display = "none";
  document.getElementById("profile").style.display = "block";
  document.getElementById("profile-uname").innerHTML = username;
  document.getElementById("profile-pword").innerHTML = password;
  document.getElementById("profile-country").innerHTML = country;
}

function login() {
  username = document.getElementById("uname").value.trim();
  if (username === "") {
    alert("Please enter a username");
    return;
  }
  password = document.getElementById("pword").value;
  country = document.getElementById("country").value;
  console.log("Logged In Successfully as " + username);

  document.getElementById("login").style.display = "none";
  document.getElementById("welcome-header").style.display = "none";
  document.getElementById("dashboard").style.display = "flex";
  document.getElementById("dash-name").textContent = username.split(" ")[0];
  document.getElementById("nav").style.display = "block";
  document.getElementById("profile").style.display = "none";
}
function logout() {
  document.getElementById("login").style.display = "block";
  document.getElementById("welcome-header").style.display = "none";
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("courses").style.display = "none";
  document.getElementById("forum").style.display = "none";
  document.getElementById("about").style.display = "none";
  document.getElementById("profile").style.display = "none";
  document.getElementById("nav").style.display = "none";
  document.getElementById("uname").value = "";
  document.getElementById("pword").value = "";
  document.getElementById("country").value = "";
}

function home() {
  document.getElementById("login").style.display = "none";
  document.getElementById("welcome-header").style.display = "none";
  document.getElementById("dashboard").style.display = "flex";
  document.getElementById("dash-name").textContent = username.split(" ")[0]; 
  document.getElementById("courses").style.display = "none";
  document.getElementById("forum").style.display = "none";
  document.getElementById("about").style.display = "none";
  document.getElementById("profile").style.display = "none";
}

function forum() {
  document.getElementById("login").style.display = "none";
  document.getElementById("welcome-header").style.display = "none";
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("courses").style.display = "none";
  document.getElementById("forum").style.display = "block";
  document.getElementById("about").style.display = "none";
  document.getElementById("profile").style.display = "none";
}

function courses() {
  document.getElementById("login").style.display = "none";
  document.getElementById("welcome-header").style.display = "none";
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("courses").style.display = "block";
  document.getElementById("forum").style.display = "none";
  document.getElementById("about").style.display = "none";
  document.getElementById("profile").style.display = "none";
}

function about() {
  document.getElementById("login").style.display = "none";
  document.getElementById("welcome-header").style.display = "none";
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("courses").style.display = "none";
  document.getElementById("forum").style.display = "none";
  document.getElementById("profile").style.display = "none";
  document.getElementById("about").style.display = "block";
}

function filterCourses() {
  const searchInput = document
    .getElementById("course-search")
    .value.toLowerCase();
  const courses = document.querySelectorAll("#courses .course");
  const noCourseMessage = document.getElementById("no-course-message");
  let courseFound = false;

  courses.forEach((course) => {
    const courseName = course.querySelector("h3").textContent.toLowerCase();
    if (courseName.includes(searchInput)) {
      course.style.display = "block";
      courseFound = true;
    } else {
      course.style.display = "none";
    }
  });

  noCourseMessage.style.display = courseFound ? "none" : "block";
}

function postMessage() {
  const messageInput = document.getElementById("user-message");
  const messageText = messageInput.value.trim();

  if (messageText !== "") {
    const forumMessages = document.getElementById("forum-messages");

    const messageDiv = document.createElement("div");
    messageDiv.className = "message";

    const userNameSpan = document.createElement("span");
    userNameSpan.className = "user-name";
    userNameSpan.textContent = username + " (" + country + ") ";

    const userMessageDiv = document.createElement("div");
    userMessageDiv.className = "user-message";
    userMessageDiv.textContent = messageText;
    userMessageDiv.style.color = "white"; // Correct way to set style

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button bg-danger";
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
      forumMessages.removeChild(messageDiv);
    };

    messageDiv.appendChild(userNameSpan);
    messageDiv.appendChild(userMessageDiv);
    messageDiv.appendChild(deleteButton);

    forumMessages.appendChild(messageDiv);

    messageInput.value = "";
  }
}
// Function to add a course
function addCourse(courseId) {
  // Find the course element in the courses div
  var courseElement = document.getElementById(courseId);

  // Check if the course element exists
  if (courseElement) {
    // Clone the course element
    var clonedCourse = courseElement.cloneNode(true);

    // Remove the add button from the cloned course
    var addButton = clonedCourse.querySelector(".add-button");
    if (addButton) {
      addButton.parentNode.removeChild(addButton);
    }

    // Add the delete button to the cloned course
    var deleteButton = document.createElement("button");
    deleteButton.className = "delete-button bg-danger";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("onclick", "deleteCourse('" + courseId + "')");
    clonedCourse.appendChild(deleteButton);

    // Append the cloned course to the enrolled courses list
    var enrolledCourses = document.getElementById("regcourses");
    if (enrolledCourses) {
      enrolledCourses.appendChild(clonedCourse);
    }

    // Hide the original course element in the courses div
    courseElement.style.display = "none";

    // Update UI or perform any other actions as needed

    // Example: Update dashboard name
    var dashNameElement = document.getElementById("dash-name");
    if (dashNameElement) {
      dashNameElement.textContent = "John Doe"; // Example name
    }
  }
}

// Function to delete a course
function deleteCourse(courseId) {
  // Find the course element in the enrolled courses list
  var courseElement = document.getElementById(courseId);

  // Check if the course element exists
  if (courseElement) {
    // Remove the course element from the enrolled courses list
    courseElement.parentNode.removeChild(courseElement);

    // Show the original course element in the courses div
    var originalCourse = document
      .getElementById("courses")
      .querySelector("#" + courseId);
    if (originalCourse) {
      originalCourse.style.display = "block";
    }

    // Update UI or perform any other actions as needed
  }
}
