
function loadDoctorNavbar() {
  fetch("navber.html")
      .then((res) => res.text())
      .then((data) => {
          document.getElementById("navbar").innerHTML = data;
          const dynamicContent = document.querySelector(".navbar-collapse .d-flex");

          const token = localStorage.getItem("token");

          if (token) {
              dynamicContent.innerHTML = `
                  <a href="./campaign.html" class="btn btn-deep-orange mx-2">Campaign</a>
                  <a href="./doc_dashboard.html" class="btn btn-deep-orange mx-2">Profile</a>
                  <a onclick="handleLogout()" class="btn btn-info">Logout</a>
              `;
          } else {
              dynamicContent.innerHTML = `
                  <a href="./login.html" class="btn btn-success mx-2">Login</a>
                  <a href="./registration.html" class="btn btn-danger mx-2">Register</a>
              `;
          }
      });
}

function loadPatientNavbar() {
  fetch("navber.html")
      .then((res) => res.text())
      .then((data) => {
          document.getElementById("navbar").innerHTML = data;
          const dynamicContent = document.querySelector(".navbar-collapse .d-flex");

          const token = localStorage.getItem("token");

          if (token) {
              dynamicContent.innerHTML = `
                  <a href="./patient_profile.html" class="btn btn-deep-orange mx-2">Profile</a>
                  <a onclick="handleLogout()" class="btn btn-info">Logout</a>
              `;
          } else {
              dynamicContent.innerHTML = `
                  <a href="./login.html" class="btn btn-success mx-2">Login</a>
                  <a href="./registration.html" class="btn btn-danger mx-2">Register</a>
              `;
          }
      });
}

const userRole = localStorage.getItem('userRole');

if (userRole === 'doctor') {
  loadDoctorNavbar();
} else if (userRole === 'patient') {
  loadPatientNavbar();
} else {
  fetch("navber.html")
  .then((res) => res.text())
  .then((data) => {
      document.getElementById("navbar").innerHTML = data;
      const dynamicContent = document.querySelector(".navbar-collapse .d-flex");

      dynamicContent.innerHTML = `
          <a href="./login.html" class="btn btn-success mx-2">Login</a>
          <a href="./registration.html" class="btn btn-danger">Register</a>
      `;
  });
}





