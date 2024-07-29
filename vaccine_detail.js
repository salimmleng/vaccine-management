const getQueryParams = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  };

  const getVaccineDetail = () => {
    const vaccineId = getQueryParams("id");
    console.log(vaccineId)
    fetch(`http://127.0.0.1:8000/doctor/api/vaccines/${vaccineId}/`)
        .then((res) => res.json())
        .then((vaccine) => {
            console.log(vaccine)
            
            const allvaccines = document.getElementById("vaccine-container")
                const div = document.createElement("div")
                div.classList.add("card", "m-2")
                div.style.maxWidth = "570px"
                div.innerHTML = `
            <div class="row g-0">
                     <div class="col-md-6">
                        <img src="static/images/BCG.jpg" class="img-fluid rounded-start card-img" alt="...">
                     </div>
                   <div  class="col-md-6">
                        <div class="card-body">
                         <h6>Vaccine: ${vaccine.name}</h6>
                         <h6>Vaccine: ${vaccine.id}</h6>
                         <h6>Manufacturer: ${vaccine.manufacturer}</h6>
                         <h6>Batch Number: ${vaccine.batch_number}</h6>
                         <h6>Expiry date: ${vaccine.expiry_date}</h6>

                         <button
                            type="button"
                            class="btn btn-info"
                            data-bs-toggle="modal"
                            data-bs-target="#addModal"
                            >
                            Book dose
                         </button>

                         
                        </div>
                
                   </div>
              </div>
       
                               
            `
            allvaccines.appendChild(div)
            
            document.getElementById("name").value = vaccine.name;
            document.getElementById("manufacturer").value = vaccine.manufacturer;
            document.getElementById("batch_number").value = vaccine.batch_number;
            document.getElementById("expiry_date").value = vaccine.expiry_date;
        })

}

/* <button
type="button"
class="btn btn-info"
data-bs-toggle="modal"
data-bs-target="#editModal"
>
Update vaccine
</button>
<a onclick="deleteVaccine(${vaccine.id})" class="btn btn-danger">Delete</a> */



const updateVaccine = (event) => {
    event.preventDefault();
    const vaccineId = getQueryParams("id");
    const form = document.getElementById("update-vaccine");
    const formData = new FormData(form);
    const token = localStorage.getItem("token");
    

    const updateVaccineData = {
        name: formData.get("name"),
        manufacturer: formData.get("manufacturer"),
        batch_number: formData.get("batch_number"),
        expiry_date: formData.get("expiry_date"),
    };

    fetch(`http://127.0.0.1:8000/doctor/api/vaccines/${vaccineId}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
        body: JSON.stringify(updateVaccineData),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            $("#editModal").modal("hide");

        });
};


const deleteVaccine = (vaccineId) => {
    const token = localStorage.getItem("token");
    fetch(`http://127.0.0.1:8000/doctor/api/vaccines/${vaccineId}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => (window.location.href = "./vaccine.html"))
      .catch((error) => console.log(error));
  };
  
 
  getVaccineDetail()


  // add dose 


  document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem("token");
    const apiUrl = 'http://127.0.0.1:8000/patient/';
    const apiurl2 = 'http://127.0.0.1:8000/doctor/';
    const vaccineId = getQueryParams("id");
    
    const vaccineSelect = document.getElementById('vaccine');
    const dateSelect = document.getElementById('scheduled_date');
    const form = document.getElementById('bookingForm');
    const messageDiv = document.getElementById('message');

    // Function to fetch and populate available dates
    function fetchAvailableDates() {
        fetch(`${apiUrl}available-dates/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item;
                option.textContent = item;
                dateSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching available dates:', error));
    }

    // Function to fetch and populate vaccines
    function fetchVaccines() {
        fetch(`http://127.0.0.1:8000/doctor/api/vaccines/${vaccineId}/`, {  // Assuming you have an endpoint for vaccines
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            // data.forEach(vaccine => {
            //     const option = document.createElement('option');
            //     option.value = vaccine.id;
            //     option.textContent = vaccine.name;
            //     vaccineSelect.appendChild(option);
            // });
            
          // const vaccine = document.getElementById("vaccine")
          // vaccine.value = data.name

          const option = document.createElement('option');
          // option.value = data.id;
          option.textContent = data.name;
          vaccineSelect.appendChild(option);
  
        })
        .catch(error => console.error('Error fetching vaccines:', error));
    }

    // Function to handle form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const vaccineId2 = vaccineSelect.value;
        const scheduledDate = dateSelect.value;

        fetch(`${apiUrl}book-dose/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                vaccine: vaccineId2,
                scheduled_date: scheduledDate,
            })
        })
        .then(response => {
            if (response.ok) {
                messageDiv.textContent = 'First dose booked successfully!';
                $("#addModal").modal("hide");
                form.reset();
            } else {
                messageDiv.textContent = 'Error booking dose. Please try again.';
                $("#addModal").modal("hide");
            }
        })
        .catch(error => console.error('Error booking dose:', error));
    });

    // Initialize the form with available dates and vaccines
    fetchAvailableDates();
    fetchVaccines();
});




