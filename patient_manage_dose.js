const loadAllDoses = () => {
  const token = localStorage.getItem("token");
  fetch("https://vaccination-management-wbw3.onrender.com/vaccine/api/doses/", {
      headers: {
          Authorization: `Token ${token}`,
      },
  })
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
              <td class="table-success">${item.firstDose_date ? item.firstDose_date.date : 'N/A'}</td>
              <td class="table-success">${item.secondDose_date ? item.secondDose_date.date : 'N/A'}</td>
              <td class="table-success">${item.vaccine_status}</td>
              ${
                  item.vaccine_status == "Pending"
                  ? `<td class="table-success"><a class="text-danger text-decoration-none" style="cursor: pointer;" onclick="deleteVaccine(${item.id})">Cancel</a></td>`
                  : `<td class="table-success">Accepted</td>`
              }
             
              <td class="table-success"><i onclick="generatePDF(${item.id})" class="fa-solid fa-file-pdf fa-2xl" style="color: #dc3545;"></i></td>
          `;
          parent.appendChild(tr);
      });
  })
  .catch((error) => console.error('Error fetching doses:', error));
};

loadAllDoses();


// PDF part

const generatePDF = (id) => {
  console.log(id);
  const token = localStorage.getItem("token");
  fetch(`https://vaccination-management-wbw3.onrender.com/vaccine/api/doses/${id}/`, {
      headers: {
          Authorization: `Token ${token}`,
      },
  })
  .then((res) => res.json())
  .then((data) => {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      // Title
      doc.setFontSize(22);
      doc.setTextColor(0, 102, 204); // Blue color
      doc.text('Vaccine Certificate', 105, 20, { align: 'center' });

      // Horizontal line under the title
      doc.setLineWidth(1);
      doc.line(10, 25, 200, 25);

      // Content with section headers
      doc.setFontSize(14);
      doc.setTextColor(0);

      // Personal Information Header (Colored)
      doc.setFontSize(14);
      doc.setTextColor(255, 0, 0); // Red color for the header
      doc.text('Personal Information:', 10, 35);

      // Personal Information Content
      doc.setFontSize(12);
      doc.setTextColor(0); // Reset to black color
      doc.text(`Patient Name: ${data.user.first_name}`, 10, 45);
      doc.text(`Mobile No: ${data.mobile_no}`, 10, 55);
      doc.text(`NID: ${data.user.nid}`, 10, 65);

      // Vaccine Details Header (Colored)
      doc.setFontSize(14);
      doc.setTextColor(0, 128, 0); // Green color for the header
      doc.text('Vaccine Details:', 10, 80);

      // Vaccine Details Content
      doc.setFontSize(12);
      doc.setTextColor(0); // Reset to black color
      doc.text(`Vaccine Name: ${data.vaccine.name}`, 10, 90);
      doc.text(`Vaccine Center: ${data.vaccine_center.name}`, 10, 100);
      doc.text(`First Dose Date: ${data.firstDose_date ? data.firstDose_date.date : 'N/A'}`, 10, 110);
      doc.text(`Second Dose Date: ${data.secondDose_date ? data.secondDose_date.date : 'N/A'}`, 10, 120);
      doc.text(`Vaccine Status: First dose ${data.vaccine_status} second dose 21 days later`, 10, 130);

      
      // Footer
      doc.setFontSize(10);
      doc.text('Issued by ImmunoHub', 105, 280, { align: 'center' });

      // Optional: Add border around the content
      doc.setLineWidth(0.5);
      doc.rect(5, 5, 200, 287); // A4 size border

      // Save the PDF
      doc.save('vaccine_certificate.pdf');
  })
  .catch((error) => console.error('Error fetching dose for PDF:', error));
};


  const deleteVaccine = (doseId) => {
    const token = localStorage.getItem("token");

    fetch(`https://vaccination-management-wbw3.onrender.com/vaccine/api/doses/${doseId}/`, {
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





