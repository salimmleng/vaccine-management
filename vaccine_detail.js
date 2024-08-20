

const getAllvaccines = () => {
  fetch("https://vaccination-management-wbw3.onrender.com/api/vaccines/",{
     
  })
      .then((res) => res.json())
      .then((vaccines) => {
          console.log(vaccines)
          
          
          const allvaccines = document.getElementById("vaccine-container")
          vaccines.forEach((vaccine) => {
              const div = document.createElement("div")
              div.classList.add("col-md-4","mb-4")
              
              div.innerHTML = `
                  <div class="card vaccine-card">
                    <img src="${vaccine.image}" class="card-img-top2" alt="...">
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


// const getAllvaccines = () => {
//   fetch("https://vaccination-management-wbw3.onrender.com/api/vaccines/")
//     .then((res) => res.json())
//     .then((vaccines) => {
//       console.log(vaccines);

//       const allVaccinesContainer = document.getElementById("vaccine-container");
//       allVaccinesContainer.innerHTML = ""; // Clear the container before adding new content

//       vaccines.forEach((vaccine) => {
//         const cardDiv = document.createElement("div");
//         cardDiv.classList.add("col-md-4", "mb-4");

//         cardDiv.innerHTML = `
//           <div class="card h-100 shadow-sm border-0">
//             <img src="${vaccine.image}" class="card-img-top2 img-fluid" alt="${vaccine.name} Image">
//             <div class="card-body">
//               <h5 class="card-title mb-3 font-weight-bold text-dark">${vaccine.name}</h5>
//               <ul class="list-unstyled mb-4">
//                 <li class="mb-2"><strong>Manufacturer:</strong> ${vaccine.manufacturer}</li>
//                 <li class="mb-2"><strong>Batch Number:</strong> ${vaccine.batch_number}</li>
//                 <li class="mb-2"><strong>Age Limit:</strong> ${vaccine.age_limit}</li>
//                 <li class="mb-2"><strong>Expiry Date:</strong> ${vaccine.expiry_date}</li>
//               </ul>
//               <a href="vaccine_detail.html?id=${vaccine.id}" class="btn btn-deep-orange text-white px-4 py-2">Show Details</a>
//             </div>
//           </div>
//         `;

//         allVaccinesContainer.appendChild(cardDiv);
//       });
//     })
//     .catch((error) => {
//       console.error("Error fetching vaccines:", error);
//     });
// };

// getAllvaccines();







const getQueryParams = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  };

  const getVaccineDetail = () => {
    const vaccineId = getQueryParams("id");
    const token = localStorage.getItem("token");
    console.log(vaccineId)
    fetch(`https://vaccination-management-wbw3.onrender.com/api/vaccines/${vaccineId}/`,{
        method: "GET",

    })
        .then((res) => res.json())
        .then((vaccine) => {
            console.log(vaccine)
            
            const allvaccines = document.getElementById("vaccine_detail-container")
            const div = document.createElement("div")
            div.classList.add("row", "container", "whole-part", "d-flex", "align-items-center", "m-auto");

            let buttonHTML = "";
            if (token) {
                buttonHTML = `
                    <button
                        type="button"
                        class="btn btn-deep-orange btn-lg text-white px-4 py-2"
                        data-bs-toggle="modal"
                        data-bs-target="#addModal"
                    >
                        Book Dose
                    </button>
                `;
            } else {
                buttonHTML = `
                    <p class="text-left">
                        <a class="text-decoration-none text-white btn btn-deep-orange btn-lg text-white px-4 py-2" href="./registration.html">Register to Book Dose</a>
                    </p>
                `;
            }
    
            div.innerHTML = `
                <div class="col-md-6 d-flex justify-content-center">
                    <img class="detail-img img-fluid" src="${vaccine.image}" alt="${vaccine.name} Image">
                </div>
                <div class="col-md-6">
                    <div class="detailRight p-4">
                        <h2 class="text-left font-weight-bold mb-4">Vaccine Details</h2>
                        <ul class="list-unstyled">
                            <li class="mb-3">
                                <h6 class="text-dark m-0"><strong>Vaccine Name:</strong> ${vaccine.name}</h6>
                            </li>
                            <li class="mb-3">
                                <h6 class="text-dark m-0"><strong>Batch Number:</strong> ${vaccine.batch_number}</h6>
                            </li>
                            <li class="mb-3">
                                <h6 class="text-dark m-0"><strong>Manufacturer:</strong> ${vaccine.manufacturer}</h6>
                            </li>
                            <li class="mb-4">
                                <h6 class="text-dark m-0"><strong>Age Limit:</strong> ${vaccine.age_limit}</h6>
                            </li>
                        </ul>
                        ${buttonHTML}
                    </div>
                </div>
            `;
          allvaccines.appendChild(div)
        })


}

getVaccineDetail()

  // add dose 












const loadDates = ()=>{
    // const token = localStorage.getItem("token");
    const vID = getQueryParams("id");
    fetch(`https://vaccination-management-wbw3.onrender.com/vaccine/api/available_dates/?id=${vID}`
       
    )
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        console.log(item)
        const parent = document.getElementById("date-container");
        const option = document.createElement("option");
        option.value = item.id;
        option.innerText = item.date;
        parent.appendChild(option);
      });
      console.log(data);
    });

}


loadDates()


const loadHospitalname = ()=>{
  // const token = localStorage.getItem("token");
  const vID = getQueryParams("id");
  fetch(`https://vaccination-management-wbw3.onrender.com/vaccine/api/available_hospitals/?id=${vID}`
     
  )
  .then((res) => res.json())
  .then((data) => {
    data.forEach((item) => {
      console.log(item)
      const parent = document.getElementById("center-container");
      const option = document.createElement("option");
      option.value = item.id;
      option.innerText = item.name;
      parent.appendChild(option);
    });
    console.log(data);
  });

}


loadHospitalname()



const handleTakeVaccine=(event)=>{
    
    event.preventDefault();
    const vaccine = getQueryParams("id");
    const mobile = document.getElementById("mobile_no").value
    const firstDose_date = document.getElementById("date-container")
    const selectedDate = firstDose_date.options[firstDose_date.selectedIndex]
    const center = document.getElementById("center-container")
    const selectedCenter = center.options[center.selectedIndex]
    const patientID = localStorage.getItem("user_id")


    const info ={
      user: patientID,
      vaccine_status: "Pending",
      firstDose_date_id: parseInt(selectedDate.value),
      mobile_no: mobile,
      vaccine_center_id: parseInt(selectedCenter.value),
      vaccine_id: parseInt(vaccine),


    }
    
    console.log(JSON.stringify(info))
    
    const token = localStorage.getItem("token");
    fetch("https://vaccination-management-wbw3.onrender.com/vaccine/api/doses/", {
      method: "POST",
      headers: { "content-type": "application/json",
             Authorization: `Token ${token}`,
       },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        $("#addModal").modal("hide");
        
        const alertModal = new bootstrap.Modal(document.getElementById("doseAlertModal"));
        alertModal.show();
      
        localStorage.setItem(`bookedDose_${vaccine}`, "true");  // store dose id
        displayReviewForm();
         
      });
      
     
}


document.getElementById("bookingForm").addEventListener("submit", handleTakeVaccine);


// display review form

const displayReviewForm = () => {
  const vaccineId = getQueryParams("id");
  const formContainer = document.getElementById("review-form-container");
  const token = localStorage.getItem("token");

  const hasBookedDose = localStorage.getItem(`bookedDose_${vaccineId}`) === "true";

  if (hasBookedDose) {
    if (token){
    formContainer.innerHTML = `
      <div class="mx-auto w-75 mt-5">
        <h1 class='text-center revg my-4'>Give Review</h1>
        
        <form id="review-form" class="pt-2 bord" onsubmit="submitReview(event)">
          <div class="mb-3 p-3">
            <label for="rating" class="form-label mx-2">Rating</label>
            <select id="rating" class="form-select" required>
              <option value="⭐">⭐</option>
              <option value="⭐⭐">⭐⭐</option>
              <option value="⭐⭐⭐">⭐⭐⭐</option>
              <option value="⭐⭐⭐⭐">⭐⭐⭐⭐</option>
              <option value="⭐⭐⭐⭐⭐">⭐⭐⭐⭐⭐</option>
            </select>
          </div>
          <div class="mb-3 p-3">
            <label for="comment" class="form-label mx-2">Comment</label>
            <textarea class="form-control" id="comment" rows="3" required></textarea>
          </div>
          <button type="submit" class="btn btn-deep-orange mx-3 my-2">Submit</button>
        </form>
      </div>
    `;
    }
  } else {
    if (token){
    formContainer.innerHTML = "<p class='text-center fw-bold rob'>You must book a dose before giving a review.</p>";
    }
  }
};

// Call displayReviewForm to set initial state
displayReviewForm();


// review section


const submitReview = (event) => {
  event.preventDefault();
  const reviewerID = localStorage.getItem("user_id")
  const rating = document.getElementById("rating").value;
  const comment = document.getElementById("comment").value;
  const vaccineId = getQueryParams("id");
  const token = localStorage.getItem("token");

  

  fetch("https://vaccination-management-wbw3.onrender.com/vaccine/reviews/", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
          reviewer: reviewerID,
          vaccine_id: parseInt(vaccineId),
          rating: rating,
          comment: comment,
      }),
  })
  .then((res) => res.json())
  .then((data) => {
      console.log(data);
      // alert("Review submitted successfully!");
     
  })
  .catch((error) => {
      console.error("Error:", error);
      alert("Failed to submit review. Please try again.");
  });
};

// display review

const displayReview = () => {
  const vaccineId = getQueryParams("id");
  const token = localStorage.getItem("token");
  console.log(vaccineId)
  fetch(`https://vaccination-management-wbw3.onrender.com/vaccine/reviews/${vaccineId}/`,{
      method: "GET",
      headers: {
          Authorization: `Token ${token}`,
        },

  })
      .then((res) => res.json())
      .then((reviews) => {
          console.log(reviews)

          const allReviews = document.getElementById("review-container");
          allReviews.innerHTML = ""; 
          
          if (reviews.length === 0) {
            allReviews.innerHTML = "<p class='text-center fw-bold'></p>";
          } else {
            reviews.forEach((review) => {
              const div = document.createElement("div");
              div.classList.add("col-md-3", "mb-4");
    
              div.innerHTML = `
                <div class="card rev-card mb-4 mt-3">
                 <img src="static/images/vac-icon.png" class="rev-img" alt="...">
                  <div class="card-body">
                    <h6>${review.rating}</h6>
                    <h6>Reviewer: ${review.reviewer.first_name}</h6>
                    <h6 class="rev-title">Review: ${review.comment}</h6>
                    <h6>Created at: ${review.created_at}</h6>
                  </div>
                </div>
              `;
              allReviews.appendChild(div);
      })
    }

})


}
displayReview()























