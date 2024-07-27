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
                            data-bs-target="#editModal"
                         >
                          Update vaccine
                        </button>
                        <a onclick="deleteVaccine(${vaccine.id})" class="btn btn-danger">Delete</a>

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