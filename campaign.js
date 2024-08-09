
// for doctor

const addVaccine = (event) => {
  event.preventDefault();
  const form = document.getElementById("add-vaccine");
  const formData = new FormData(form);
  const token = localStorage.getItem("token");
  console.log(formData)
  fetch("http://127.0.0.1:8000/api/vaccines/", {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
    },
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      alert("Vaccine Added Successfully");
      console.log(data);
      window.location.href = "campaign.html";
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error adding vaccine");
    });
};


const getAllVaccines = () => {
  const token = localStorage.getItem("token");
  console.log(token)
  fetch("http://127.0.0.1:8000/api/vaccines/",{
    headers: {
      Authorization: `Token ${token}`,
    },

  })
    .then((res) => res.json())
    .then((vaccines) => {
      console.log(vaccines);
      const allVaccines = document.getElementById("campaign-container");
      // allVaccines.innerHTML = ""; 

      vaccines.forEach((vaccine) => {
        const tr = document.createElement("tr");
        
        tr.innerHTML = `
              <td class="table-success">${vaccine.id}</td>
              <td class="table-success">${vaccine.name}</td>
              <td class="table-success">${vaccine.manufacturer}</td>
              <td class="table-success">${vaccine.age_limit}</td>
              <td class="table-success">${vaccine.batch_number}</td>
              <td class="table-success">${vaccine.expiry_date}</td>
              <td class="table-success"> <a href="./edit_vaccine.html?id=${vaccine.id}" class="btn btn-info ">Edit</a>
             <a onclick="deleteVaccine(${vaccine.id})" class="btn btn-danger ">Delete</a></td>

        `;
        allVaccines.appendChild(tr);

      });

     
    })
    .catch((error) => {
      console.error("Error fetching vaccines:", error);
    });
};

getAllVaccines();

const getQueryParams = (param) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};


const getVaccineDetail = () => {
  const vaccineId = getQueryParams("id");
  const token = localStorage.getItem("token");
  fetch(`http://127.0.0.1:8000/api/vaccines/${vaccineId}/`,{
    headers: {
      Authorization: `Token ${token}`,
    },

  })
    .then((res) => res.json())
    .then((vaccine) => {
      console.log(vaccine);
      document.getElementById("name").value = vaccine.name;
      document.getElementById("manufacturer").value = vaccine.manufacturer;
      document.getElementById("batch_number").value = vaccine.batch_number;
      document.getElementById("expiry_date").value = vaccine.expiry_date;
      document.getElementById("age_limit").value = vaccine.age_limit;
     
    });
};
getVaccineDetail()

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
      age_limit: formData.get("age_limit"),
  };

  fetch(`http://127.0.0.1:8000/api/vaccines/${vaccineId}/`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
      },
      body: JSON.stringify(updateVaccineData),
  })
      
      .then((vaccine) => {
       
        alert("Vaccine updated successfully")
        window.location.href = "./campaign.html";
             
      });
      
};

const deleteVaccine = (vaccineId) => {
  const token = localStorage.getItem("token");
  fetch(`http://127.0.0.1:8000/api/vaccines/${vaccineId}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => (window.location.href = "./campaign.html"))
    .catch((error) => console.log(error));
};


