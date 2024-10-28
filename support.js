function getCSRFToken() {
    const name = 'csrftoken';
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const c = cookie.trim();
        if (c.startsWith(name + '=')) {
            return c.substring(name.length + 1);
        }
    }
    return null;
}

document.getElementById('donation-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    // Collect the form data
    const fullName = document.getElementById('full_name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const totalPrice = parseFloat(document.getElementById('total_price').value.toString());

    // prepared data send to the backend
    const data = {
        full_name: fullName,
        email: email,
        address: address,
        city: city,
        total_price: totalPrice,
    };

    // Send data to the backend
    fetch('http://127.0.0.1:8000/vaccine/payment/', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken(),
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data) {
            // Redirect to the payment gateway
            window.location.href = data.GatewayPageURL;
        } else {
            alert('Payment session creation failed: ' + (data.error || 'Unknown error'));
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while processing your donation.');
    });
});