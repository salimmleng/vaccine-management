
const handleRegistration = (event) => {
  event.preventDefault();

  const getValue = (id) => document.getElementById(id).value;

  const username = getValue("username");
  const first_name = getValue("first_name");
  const last_name = getValue("last_name");
  const email = getValue("email");
  const address = getValue("address");
  const nid = getValue("nid");
  const user_role = getValue("user_role");
  const password = getValue("password1");
  const confirm_password = getValue("password2");
 

  if (password !== confirm_password) {
    console.error("Passwords do not match");
    alert("Passwords do not match");
    return;
  }

  const info = {
    username,
    first_name,
    last_name,
    email,
    address,
    nid,
    user_role,
    password,
    confirm_password,
    
  };
 
  console.log(info)

  fetch("http://127.0.0.1:8000/accounts/register/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info),
  })
    .then((res) => {
      alert("Registration successful. Check your mail for confirmation.")

      localStorage.setItem('userRole',user_role);
      window.location.href = "login.html";
  })

};

const handleLogin =(event) =>{
  event.preventDefault()
  const getValue = (id) => document.getElementById(id).value;
  const username = getValue("id_username")
  const password = getValue("id_password")

  fetch("http://127.0.0.1:8000/accounts/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem('token', data.token)
        localStorage.setItem('user_id', data.user_id)
        window.location.href = 'index.html'   
      })

}

const handleLogout = () => {
  const token = localStorage.getItem("token");
  console.log(token)

  fetch("http://127.0.0.1:8000/accounts/logout/", {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      window.location.href = "index.html";
    });
};


