
fetch("navber.html")
    .then((res) => res.text())
    .then((data1) => {
      document.getElementById("navbar").innerHTML = data1;
      const navElement = document.getElementById("nav-element");

      const token = localStorage.getItem("token");

      if (token) {
        navElement.innerHTML += `
                 <div class="d-flex gap-1">
                 <a href="doc_profile.html" class="btn btn-success" type="submit">Profile</a>
                <a onclick="handleLogout()" class="btn btn-danger" type="submit">Logout</a>
               </div>
              `;
      } else {
        navElement.innerHTML += `
               <div class="d-flex gap-1">
                <a href="patient_profile.html" class="btn btn-success" type="submit">Profile</a>
                 <a href="login.html" class="btn btn-success" type="submit">Login</a>
                <a href="registration.html" class="btn btn-danger" type="submit">Register</a>
               </div>
              `;
      }
    });


function loadDoctorNavbar() {
  fetch("navber.html")
    .then((res) => res.text())
    .then((data1) => {
      document.getElementById("navbar").innerHTML = data1;
      const navElement = document.getElementById("nav-element");

      const token = localStorage.getItem("token");

      if (token) {
        navElement.innerHTML += `
                 <div class="d-flex gap-2">
                 <a href="doc_profile.html" class="btn btn-success" type="submit">Profile</a>
                <a onclick="handleLogout()" class="btn btn-danger" type="submit">Logout</a>
               </div>
              `;
      } else {
        navElement.innerHTML += `
               <div class="d-flex gap-2">
                 <a href="login.html" class="btn btn-success" type="submit">Login</a>
                <a href="registration.html" class="btn btn-danger" type="submit">Register</a>
               </div>
              `;
      }
    });
}

// Function to load the patient navbar
function loadPatientNavbar() {
  fetch("navber.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("navbar").innerHTML = data;
      const navElement = document.getElementById("nav-element");

      const token = localStorage.getItem("token");

      if (token) {
        navElement.innerHTML += `
                 <div class="d-flex gap-2">
                 <a href="patient_profile.html" class="btn btn-success" type="submit">Profile</a>
                <a onclick="handleLogout()" class="btn btn-danger" type="submit">Logout</a>
               </div>
              `;
      } else {
        navElement.innerHTML += `
               <div class="d-flex gap-2">
                 <a href="login.html" class="btn btn-success" type="submit">Login</a>
                <a href="registration.html" class="btn btn-danger" type="submit">Register</a>
               </div>
              `;
      }
    });
}

// Determine the user's role and load the appropriate navbar
const userRole = localStorage.getItem('userRole');

if (userRole === 'doctor') {
  loadDoctorNavbar();
} else if (userRole === 'patient') {
  loadPatientNavbar();
}







