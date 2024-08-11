function changePassword(event) {
    event.preventDefault(); // Prevent the default form submission

    const oldPassword = document.getElementById('old_password').value;
    const newPassword = document.getElementById('new_password').value;
    const messageElement = document.getElementById('message');

    // Simple validation
    if (!oldPassword || !newPassword) {
        messageElement.textContent = "Both fields are required.";
        messageElement.classList.add('text-danger');
        return;
    }

    // Create a form data object
    
    const formData = {
        old_password: oldPassword,
        new_password: newPassword,
    };
    const token = localStorage.getItem("token");
    console.log(formData)
    console.log(token)


    // Send the POST request to the API
    fetch('http://127.0.0.1:8000/accounts/change-password/', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Authorization': `Bearer ${token}`,
            // 'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            messageElement.textContent = data.error;
            messageElement.classList.add('text-danger');
        } else {
            messageElement.textContent = "Password changed successfully.";
            messageElement.classList.add('text-success');
            document.getElementById('change_password').reset(); // Clear the form
        }
    })
    .catch(error => {
        messageElement.textContent = "An error occurred.";
        messageElement.classList.add('text-danger');
    });
}

// Function to get CSRF token from cookies
// function getCookie(name) {
//     let cookieValue = null;
//     if (document.cookie && document.cookie !== '') {
//         const cookies = document.cookie.split(';');
//         for (let i = 0; i < cookies.length; i++) {
//             const cookie = cookies[i].trim();
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;

