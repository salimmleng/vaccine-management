// fetch("doc_navbar.html")
//   .then((res) => res.text())
//   .then((data1) => {
//     document.getElementById("navbar1").innerHTML = data1;
//     const navElement1 = document.getElementById("nav-element1");

//     const token = localStorage.getItem("token");

//     // console.log(token);
//     if (token) {
//       navElement1.innerHTML += `
//                    <div class="d-flex gap-2">
//                    <a href="doc_profile.html" class="btn btn-success" type="submit">Profile</a>
//                   <a onclick="handleLogout()" class="btn btn-danger" type="submit">Logout</a>
//                  </div>
                 
//                 `;
//     } else {
//       navElement1.innerHTML += `
//                  <div class="d-flex gap-2">
//                    <a href="login.html" class="btn btn-success" type="submit">Login</a>
//                   <a href="registration.html" class="btn btn-danger" type="submit">Register</a>
//                  </div>
//                 `;
//     }
//   });