
const getAllvaccines = () => {
  fetch("https://vaccine-pi.vercel.app/api/vaccines/")
      .then((res) => res.json())
      .then((vaccines) => {
          console.log(vaccines);
          const allvaccines = document.getElementById("vaccine-container");
          vaccines.slice(0, 3).forEach((vaccine) => {
              const div = document.createElement("div");
              div.classList.add("col-md-4", "mb-4", "col-lg-4", "col-sm-6");

              div.innerHTML = `
                  <div class="card vaccine-card h-100 shadow-sm border-0">
                      <div class="card-img-container">
                          <img src="${vaccine.image}" class="card-img-top img-fluid" alt="Vaccine Image">
                      </div>
                      <div class="card-body">
                          <h5 class="card-title v-title">${vaccine.name}</h5>
                          <ul class="list-unstyled text-muted mb-4" >
                              <li style="font-size: 17px;"><strong>Manufacturer:</strong> ${vaccine.manufacturer}</li>
                              <li style="font-size: 17px;"><strong>Batch Number:</strong> ${vaccine.batch_number}</li>
                              <li style="font-size: 17px;"><strong>Age Limit:</strong> ${vaccine.age_limit}</li>
                              <li style="font-size: 17px;"><strong>Expiry Date:</strong> ${vaccine.expiry_date}</li>
                          </ul>
                          <a href="vaccine_detail.html?id=${vaccine.id}" class="btn btn-primary btn-block">Show Details</a>
                      </div>
                  </div>
              `;
              allvaccines.appendChild(div);
          });
      });
}

getAllvaccines();
