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
    fetch('https://vaccination-management-wbw3.onrender.com/accounts/change-password/', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Authorization': `Token ${token}`,
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
