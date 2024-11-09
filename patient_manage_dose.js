// const loadAllDoses = () => {
//   const token = localStorage.getItem("token");
//   fetch("https://vaccine-pi.vercel.app/vaccine/api/doses/", {
//       headers: {
//           Authorization: `Token ${token}`,
//       },
//   })
//   .then((res) => res.json())
//   .then((data) => {
//       console.log(data);
//       data.forEach((item) => {
//           const parent = document.getElementById("table-body");
//           const tr = document.createElement("tr");
//           tr.id = `dose-row-${item.id}`;
//           tr.innerHTML = `
//               <td class="table-success">${item.user.first_name}</td>
//               <td class="table-success">${item.mobile_no}</td>
//               <td class="table-success">${item.user.nid}</td>
//               <td class="table-success">${item.vaccine.name}</td>
//               <td class="table-success">${item.vaccine_center.name}</td>
//               <td class="table-success">${item.firstDose_date ? item.firstDose_date.date : 'N/A'}</td>
//               <td class="table-success">${item.secondDose_date ? item.secondDose_date.date : 'N/A'}</td>
//               <td class="table-success">${item.vaccine_status}</td>
//               ${
//                   item.vaccine_status == "Pending"
//                   ? `<td class="table-success"><a class="text-danger text-decoration-none" style="cursor: pointer;" onclick="deleteVaccine(${item.id})">Cancel</a></td>`
//                   : `<td class="table-success">Accepted</td>`
//               }
             
//               <td class="table-success"><i onclick="generatePDF(${item.id})" class="fa-solid fa-file-pdf fa-2xl" style="color: #dc3545;"></i></td>
//           `;
//           parent.appendChild(tr);
//       });
//   })
//   .catch((error) => console.error('Error fetching doses:', error));
// };

// loadAllDoses();



const loadAllDoses = () => {
  const token = localStorage.getItem("token");
  fetch("https://vaccine-pi.vercel.app/vaccine/api/doses/", {
      headers: {
          Authorization: `Token ${token}`,
      },
  })
  .then((res) => res.json())
  .then((data) => {
      console.log(data);
      const container = document.getElementById("vaccine-info-container");
      container.innerHTML = ""; 

      data.forEach((item) => {
          const card = document.createElement("div");
          card.classList.add("col-md-4", "mb-4");
          card.innerHTML = `
              <div class="card shadow-sm p-3 h-100" style="border-left: 4px solid ${item.vaccine_status === 'Completed' ? '#4CAF50' : 'red'}; border-radius: 8px;">
                  <div class="card-body">
                      <div class="d-flex align-items-center mb-2">
                          <i class="fa fa-user-circle me-2"></i>
                          <h5 class="card-title mb-0">${item.user.first_name}</h5>
                      </div>
                      <p class="text-muted">Mobile: ${item.mobile_no} | NID: ${item.user.nid}</p>
                      <div class="badge vac-name mb-3">${item.vaccine.name}</div>
                      <p><strong>Center:</strong> ${item.vaccine_center.name}</p>
                      <p><strong>First Dose:</strong> ${item.firstDose_date ? item.firstDose_date.date : 'N/A'}</p>
                      <p><strong>Second Dose:</strong> ${item.secondDose_date ? item.secondDose_date.date : 'N/A'}</p>
                      <p><strong>Vaccine Status:</strong> 
                          <span class="badge ${item.vaccine_status === 'Completed' ? 'bg-success' : 'bg-warning'}">
                              ${item.vaccine_status}
                          </span>
                      </p>
                      <div class="mt-3">
                          ${
                             item.vaccine_status === "Pending"
                              ? `<button style="color: #fff; font-weight: bold; background-color: red;" class="btn btn-sm w-48" onclick="deleteVaccine(${item.id})">Cancel</button>`
                              : `<span class="text-success fw-bold"></span>`
                          }
                          ${
                            item.vaccine_status === "Completed"
                            ? `<button style="color: #fff; font-weight: bold; background-color: green;" class="btn btn-sm w-100 mt-2" onclick="generatePDF(${item.id})">
                                Download Certificate
                                </button>`
                            : `<span class="text-success fw-bold"></span>`
                          }
                         
                      </div>
                  </div>
              </div>
          `;
          container.appendChild(card);
      });
  })
  .catch((error) => console.error('Error fetching doses:', error));
};

loadAllDoses();





// PDF part

const generatePDF = (id) => {
    console.log(id);
    const token = localStorage.getItem("token");
    fetch(`https://vaccine-pi.vercel.app/vaccine/api/doses/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => res.json())
    .then((data) => {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
  
      // Define margins
      const leftMargin = 20;
      const topMargin = 10;
  
      // Title Section
      doc.setFontSize(24);
      doc.setTextColor(0, 102, 204); // Blue color
      doc.setFont("Helvetica", "bold");
      doc.text('Vaccine Certificate', 105, topMargin+5, { align: 'center' });
  
      // Draw a horizontal line under the title
      doc.setLineWidth(1);
      doc.line(leftMargin, topMargin + 10, 200 - leftMargin, topMargin + 10);
  
      // Create a table-like layout for the certificate
      const tableColumnWidths = [80, 120]; // Column widths
      const rowHeight = 10;
      const startY = topMargin + 20;
  
      // Personal Information Section
      doc.setFontSize(16);
      doc.setTextColor(255, 0, 0); 
      doc.setFont("Helvetica", "bold");
      doc.text('Personal Information', leftMargin, startY);
  
      const personalInfo = [
        ['Patient Name:', data.user.first_name],
        ['Mobile No:', data.mobile_no],
        ['NID:', data.user.nid]
      ];
  
      personalInfo.forEach((row, index) => {
        doc.setFontSize(12);
        doc.setFont("Helvetica", "normal");
        doc.setTextColor(0);
        doc.text(row[0], leftMargin, startY + (index + 1) * rowHeight);
        doc.text(row[1], leftMargin + tableColumnWidths[0], startY + (index + 1) * rowHeight);
      });
  
      // Vaccine Details Section
      doc.setFontSize(16);
      doc.setTextColor(0, 128, 0); // Green color for the header
      doc.setFont("Helvetica", "bold");
      doc.text('Vaccine Details', leftMargin, startY + (personalInfo.length + 2) * rowHeight);
  
      const vaccineDetails = [
        ['Vaccine Name:', data.vaccine.name],
        ['Vaccine Center:', data.vaccine_center.name],
        ['First Dose Date:', data.firstDose_date ? data.firstDose_date.date : 'N/A'],
        ['Second Dose Date:', data.secondDose_date ? data.secondDose_date.date : 'N/A'],
        ['Vaccine Status:', `${data.vaccine_status}`]
      ];
  
      vaccineDetails.forEach((row, index) => {
        doc.setFontSize(12);
        doc.setFont("Helvetica", "normal");
        doc.setTextColor(0);
        doc.text(row[0], leftMargin, startY + (personalInfo.length + 3 + index) * rowHeight);
        doc.text(row[1], leftMargin + tableColumnWidths[0], startY + (personalInfo.length + 3 + index) * rowHeight);
      });
  
      // Footer
      doc.setFontSize(10);
      doc.setTextColor(128, 128, 128); // Gray color
      doc.setFont("Helvetica", "normal");
      doc.text('Issued by ImmunoHub', 105, 290, { align: 'center' });
  
      // Optional: Add a border around the content
      doc.setLineWidth(0.5);
      doc.rect(leftMargin - 5, topMargin - 5, 200 - 2 * leftMargin + 10, 290 - topMargin + 10); // Adjusted for margin
  
      // Save the PDF
      doc.save('vaccine_certificate.pdf');
    })
    .catch((error) => console.error('Error fetching dose for PDF:', error));
  };
  


  const deleteVaccine = (doseId) => {
    const token = localStorage.getItem("token");

    fetch(`https://vaccine-pi.vercel.app/vaccine/api/doses/${doseId}/`, {
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





