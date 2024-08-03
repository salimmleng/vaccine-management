function fetchUserProfile() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');
    console.log(token);
    console.log(userId);
  
    if (!token || !userId) {
      console.error('Token or User ID is missing');
      return;
    }
  
    fetch(`http://127.0.0.1:8000/accounts/profile/${userId}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data.email)
      const profileInfo =  document.getElementById("doc_profile")
      profileInfo.innerHTML = `
            <h3>Personal information</h3>
            <img class="docc-img mx-4 my-3" src="static/images/doc-img.png" class="img-fluid rounded-start card-img" alt="...">
            <h5>User ID</h5>
            <h6 class="prof">${data.id}</h6>
            <h5>Full name</h5>
            <h6 class="prof">${data.first_name} ${data.last_name}</h6>
            <h5>Email address</h5>
            <h6 class="prof">${data.email}</h6>
            <a href="./update_profile.html?id=${data.id}" class="btn btn-warning mt-4 mb-3" type="submit">Edit profile</a>
              
      `
    })
    .catch(error => {
      console.error('Error fetching user profile:', error);
    });
  }

// update profile start

const getQueryParams = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};


const getProfileDetail = () => {
  const profileId = getQueryParams("id");
  fetch(`http://127.0.0.1:8000/accounts/profile/${profileId}/`)
    .then((res) => res.json())
    .then((data) => {
      
      document.getElementById("name").value = data.first_name;
      document.getElementById("email").value = data.email;
      document.getElementById("address").value = data.address;
      document.getElementById("nid").value = data.nid;
     
    });
};
getProfileDetail()



const UpdateProfile = (event) => {
  event.preventDefault();
  const profileId = getQueryParams("id");
  const form = document.getElementById("update-profile");
  const formData = new FormData(form);
  const token = localStorage.getItem("token");
  

  const updateProfileData = {
      name: formData.get("name"),
      email: formData.get("email"),
      address: formData.get("address"),
      nid: formData.get("nid"),
  };

  fetch(`http://127.0.0.1:8000/accounts/profile/${profileId}/`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
      },
      body: JSON.stringify(updateProfileData),
  })
      
      .then((data) => {
       
        alert("Profile updated successfully")
        window.location.href = "profile.html";
             
      });
      
};

// update profile end




  


// function updateUserProfileDOM(profile) {
//   const profileElement = document.getElementById('profile');
//   if (!profileElement) {
//       console.error('Profile element not found');
//       return;
//   }

//   // Assuming profile object has properties: username, email, etc.
//   profileElement.innerHTML = `
//       <th scope="row">${profile.username}</th>
//       <td>${profile.email}</td>
//       <td>${profile.role}</td>
//       <td>${profile.nid}</td>
//       <td>❌</td>
//   `;
// }


document.addEventListener('DOMContentLoaded', () => {
  fetchUserProfile();
});
