const loadAllDoses = () => {
    // const patient_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");
    fetch(
      "http://127.0.0.1:8000/vaccine/api/doses/",{
        
        headers: {
            Authorization: `Token ${token}`,
          },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        data.forEach((item) => {
          const parent = document.getElementById("table-body");
          const tr = document.createElement("tr");
          tr.id = `dose-row-${item.id}`;
          tr.innerHTML = `
              <td class="table-success">${item.user.first_name
              }</td>
              <td class="table-success">${item.mobile_no}</td>
              <td class="table-success">${item.user.nid}</td>
              <td class="table-success">${item.vaccine.name}</td>
              <td class="table-success">${item.vaccine_center.name}</td>
              <td class="table-success">${item.firstDose_date ? item.firstDose_date.date : 'N/A'}</td>
                <td class="table-success">${item.secondDose_date ? item.secondDose_date.date : 'N/A'}</td>
              <td class="table-success">${item.vaccine_status}</td>
              
             ${
                item.vaccine_status == "Pending"
                ? `<td class="table-success "><a class="text-danger text-decoration-none " style="cursor: pointer;" onclick="deleteVaccine(${item.id})">Cancel</a></td>`
                 : `<td class="table-success" >✔</td>`
              }
             
              `;
          parent.appendChild(tr);
        });
      });
  };
  
  loadAllDoses();


  const deleteVaccine = (doseId) => {
    const token = localStorage.getItem("token");

    fetch(`http://127.0.0.1:8000/vaccine/api/doses/${doseId}/`, {
        method: "DELETE",
        headers: {
            Authorization: `Token ${token}`,
        },
    })
    .then((response) => {
        if (response.ok) {
            const row = document.getElementById(`dose-row-${doseId}`);
            if (row) {
                row.remove();
            }
        } else {
            console.error("Failed to delete dose:", response.statusText);
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });
};
