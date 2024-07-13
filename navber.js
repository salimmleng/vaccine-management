fetch("navber.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("navbar").innerHTML = data;

    // Assign Auth Element

    const navElement = document.getElementById("nav-element");

    const token = localStorage.getItem("token");

    console.log(token);
    if (token) {
      navElement.innerHTML += `
                  <li class="menu">Add Campaign</li>
                   <div class="d-flex gap-2">
                   <a href="login.html" class="btn btn-success" type="submit">Profile</a>
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