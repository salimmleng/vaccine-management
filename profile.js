async function fetchUserProfile() {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user_id');
  console.log(token)
  console.log(userId)

  if (!token || !userId) {
      console.error('Token or User ID is missing');
      return;
  }

  try {
      const response = await fetch(`http://127.0.0.1:8000/accounts/profile/${userId}/`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
          }
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
  } catch (error) {
      console.error('Error fetching user profile:', error);
  }
}


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

// Call fetchUserProfile when the page loads
document.addEventListener('DOMContentLoaded', () => {
  fetchUserProfile();
});
