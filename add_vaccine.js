// const addVaccine = (event) => {
//     event.preventDefault();

//     const form = document.getElementById("add-vaccine");
//     const formData = new FormData(form);
//     const token = localStorage.getItem("token");
//     console.log(token);

//     const vaccineData = {
//         name: formData.get("name"),
//         manufacturer: formData.get("manufacturer"),
//         batch_number: formData.get("batch_number"),
//         expiry_date: formData.get("expiry_date"),
//         vaccine_image: formData.get("vaccine_image"),
//     };

//     console.log(vaccineData);

//     fetch("http://127.0.0.1:8000/doctor/api/vaccines/", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Token ${token}`,
//         },
//         body: JSON.stringify(vaccineData),
//     })
//         .then((res) => res.json())
//         .then((data) => {
//             alert("Vaccine Added Successfully");
//             console.log(data)
//             window.location.href = "vaccine.html";

//         });
// };



// const getAllvaccines = () => {
//     fetch("http://127.0.0.1:8000/doctor/api/vaccines/")
//         .then((res) => res.json())
//         .then((vaccines) => {
//             console.log(vaccines)
            
//             const allvaccines = document.getElementById("vaccine-container")
//             vaccines.forEach((vaccine) => {
//                 console.log(vaccine)
//                 const div = document.createElement("div")
//                 div.classList.add("card", "m-2")
//                 div.style.maxWidth = "570px"
//                 div.innerHTML = `
//              <div class="row g-0">
//                      <div class="col-md-6">
//                         <img src="${vaccine.image}" class="img-fluid rounded-start card-img" alt="...">
//                      </div>
//                    <div  class="col-md-6">
//                         <div class="card-body">
//                          <h6>Vaccine: ${vaccine.name}</h6>
//                          <h6>Vaccine: ${vaccine.id}</h6>
//                          <h6>Manufacturer: ${vaccine.manufacturer}</h6>
//                          <h6>Batch Number: ${vaccine.batch_number}</h6>
//                          <h6>Expiry date: ${vaccine.expiry_date}</h6>

//                          <a href="vaccine_detail.html?id=${vaccine.id}" class="btn btn-outline-primary" type="submit">Show details</a>

//                         </div>
                
//                    </div>
//               </div>
       
                               
//             `
//             allvaccines.appendChild(div)

//             })

//         })

// }
// getAllvaccines()



const addVaccine = (event) => {
    event.preventDefault();
  
    const form = document.getElementById("add-vaccine");
    const formData = new FormData(form);
    const token = localStorage.getItem("token");
  
    fetch("http://127.0.0.1:8000/doctor/api/vaccines/", {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Vaccine Added Successfully");
        console.log(data);
        window.location.href = "vaccine.html";
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error adding vaccine");
      });
  };
  
  const getAllVaccines = () => {
    fetch("http://127.0.0.1:8000/doctor/api/vaccines/")
      .then((res) => res.json())
      .then((vaccines) => {
        console.log(vaccines);
        const allVaccines = document.getElementById("vaccine-container");
        allVaccines.innerHTML = ""; 
  
        vaccines.forEach((vaccine) => {
          const div = document.createElement("div");
          div.classList.add("card", "m-2");
          div.style.maxWidth = "570px";
          div.innerHTML = `
            <div class="row g-0">
              <div class="col-md-6">
                <img src="static/images/BCG.jpg" class="img-fluid rounded-start card-img" alt="...">
              </div>
              <div class="col-md-6">
                <div class="card-body">
                  <h6>Vaccine: ${vaccine.name}</h6>
                  <h6>Vaccine ID: ${vaccine.id}</h6>
                  <h6>Manufacturer: ${vaccine.manufacturer}</h6>
                  <h6>Batch Number: ${vaccine.batch_number}</h6>
                  <h6>Expiry Date: ${vaccine.expiry_date}</h6>

                  <a href="vaccine_detail.html?id=${vaccine.id}" class="btn btn-outline-primary" type="submit">Show details</a>
                  
                </div>
              </div>
            </div>
          `;
          allVaccines.appendChild(div);
        });
      })
      .catch((error) => {
        console.error("Error fetching vaccines:", error);
      });
  };
  
  getAllVaccines();
  

