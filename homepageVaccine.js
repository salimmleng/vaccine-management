
const getAllvaccines = () => {
    fetch("https://vaccine-pi.vercel.app/api/vaccines/",{
       
    })
        .then((res) => res.json())
        .then((vaccines) => {
            console.log(vaccines)
            
            const allvaccines = document.getElementById("vaccine-container")
            vaccines.slice(0, 3).forEach((vaccine) => {
                const div = document.createElement("div")
                div.classList.add("col-md-4","mb-4","col-lg-4","col-sm-6")
                
                div.innerHTML = `
                    <div class="card vaccine-card">
                      <img src="${vaccine.image}" class="card-img-top2" class="img-fluid" alt="...">
                <div class="card-body vaccine-body">
                <h5 class="card-title mb-3 v-title font-weight-bold">${vaccine.name}</h5>
                <ul class="list-unstyled mb-4">
                  <li class="mb-2"><strong>Manufacturer:</strong> ${vaccine.manufacturer}</li>
                  <li class="mb-2"><strong>Batch Number:</strong> ${vaccine.batch_number}</li>
                  <li class="mb-2"><strong>Age Limit:</strong> ${vaccine.age_limit}</li>
                  <li class="mb-2"><strong>Expiry Date:</strong> ${vaccine.expiry_date}</li>
                  
                </ul>
              </div>
               <a href="vaccine_detail.html?id=${vaccine.id}" class="btn btn-outline-list" type="submit">Show details</a>
              </div>
       
                               
            `
            allvaccines.appendChild(div)
  
            })
  
        })
  
  }
 
getAllvaccines()
