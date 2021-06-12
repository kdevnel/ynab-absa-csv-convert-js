import csvToArray from "./csvToArray.js";
import { exportFile, generateCSV } from "./generateCSV.js";
import generateTable from "./generateTable.js";

const csvFile = document.getElementById("csvUpload");
const preview = document.getElementById("filePreview");
const downloadBtn = document.getElementById("downloadBtn");

function fileSubmitEventHandler(event) {
  event.preventDefault();
  if (0 === csvFile.files.length) {
    return;
  }
  const file = csvFile.files[0];

  if (file) {
    const reader = new FileReader();

    // Define what happens once the FileReader has completed reading
    reader.onload = function (event) {
      const text = event.target.result;
      const data = csvToArray(text);
      console.log(data);
      preview.innerHTML = generateTable(data);
      const csvContent = generateCSV(data);
      exportFile(csvContent, downloadBtn);
    };

    reader.readAsText(file);
  } else {
    preview.innerText = "Please choose a file";
  }
}

export default fileSubmitEventHandler;
