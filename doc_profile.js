
function fetchUserProfile() {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user_id');
  console.log(token);
  console.log(userId);

  if (!token || !userId) {
      console.error('Token or User ID is missing');
      return;
  }

  fetch(`https://vaccination-management-wbw3.onrender.com/accounts/profile/${userId}/`, {
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
      const docprofileContainer = document.querySelector(".col-md-9 .card");
      docprofileContainer.innerHTML = `
          <div class="mb-3 row">
              <label class="col-sm-4 col-form-label text-muted"><strong>Full Name</strong>:</label>
              <div class="col-sm-8">
                  <p class="mb-0">${data.first_name} ${data.last_name}</p>
              </div>
              <hr>
          </div>
          <div class="mb-3 row">
              <label class="col-sm-4 col-form-label text-muted"><strong>Email</strong>:</label>
              <div class="col-sm-8">
                  <p class="mb-0">${data.email}</p>
              </div>
              <hr>
          </div>
          <div class="mb-3 row">
              <label class="col-sm-4 col-form-label text-muted"><strong>Address</strong>:</label>
              <div class="col-sm-8">
                  <p class="mb-0">${data.address}</p>
              </div>
              <hr>
          </div>
          <div class="mb-3 row">
              <label class="col-sm-4 col-form-label text-muted"><strong>NID number</strong>:</label>
              <div class="col-sm-8">
                  <p class="mb-0">${data.nid}</p>
              </div>
              <hr>
          </div>
          <div>
              <a href="./doctor_update_profile.html?id=${data.id}" class="btn btn-deep-orange mt-4 mb-3" type="submit">Edit profile</a>
              <a href="./change_password.html?id=${data.id}" class="btn btn-primary mt-4 mb-3 mx-3" type="submit">Change password</a>
          </div>
      `;
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
  const token = localStorage.getItem('token');
  fetch(`https://vaccination-management-wbw3.onrender.com/accounts/profile/${profileId}/`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  })
    .then((res) => res.json())
    .then((data) => {
      
      document.getElementById("full_name").value = `${data.first_name} ${data.last_name}`;
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
  
  const fullName = formData.get("full_name").trim().split(" ");
  const first_name = fullName.slice(0, -1).join(" "); 
  const last_name = fullName.slice(-1).join(" ");     

  const updateProfileData = {
      first_name: first_name,
      last_name: last_name,
      email: formData.get("email"),
      address: formData.get("address"),
      nid: formData.get("nid"),
  };

  fetch(`https://vaccination-management-wbw3.onrender.com/accounts/profile/${profileId}/`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
      },
      body: JSON.stringify(updateProfileData),
  })
      
      .then((data) => {
       
        const alertModal = new bootstrap.Modal(document.getElementById("docProfileAlertModal"));
        alertModal.show();

             
      });
      
};

// update profile end

document.addEventListener('DOMContentLoaded', () => {
  fetchUserProfile();
});
