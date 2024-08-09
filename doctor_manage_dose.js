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
              <td class="table-success">${item.user.first_name}</td>
              <td class="table-success">${item.mobile_no}</td>
              <td class="table-success">${item.user.nid}</td>
              <td class="table-success">${item.vaccine.name}</td>
              <td class="table-success">${item.vaccine_center.name}</td>
              <td class="table-success">${item.vaccine_status}</td>
              
              ${
                item.vaccine_status == "Pending"
                ? `<td class="text-danger table-success "><a style="cursor: pointer;" onclick="completeDose(${item.id}, this)">Accept</a></td>`
                 : `<td class="table-success" >Accepted</td>`
              }
      
              `;
          parent.appendChild(tr);
        });
      });
  };
  
  loadAllDoses();


  const completeDose = (doseId, element) => {
    const token = localStorage.getItem("token");
    console.log(doseId)
    fetch(`http://127.0.0.1:8000/vaccine/api/doses/${doseId}/`, {
      method: "PATCH",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ vaccine_status: "Completed" }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.vaccine_status === "Completed") {
          const row = document.getElementById(`dose-row-${doseId}`);
          row.querySelector("td:nth-child(7)").innerText = "Completed";
          element.parentElement.innerHTML = "✔";
        }
      })
      .catch((error) => {
        console.error("Error updating dose status:", error);
      });
  };



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
            // Remove the corresponding row from the table
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
