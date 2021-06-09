import csvToArray from "./js/csvToArray.js";
import { exportFile, generateCSV } from "./js/generateCSV.js";
import generateTable from "./js/generateTable.js";
import "./scss/style.scss";

const uploadForm = document.getElementById("fileForm");
const csvFile = document.getElementById("csvUpload");
const preview = document.getElementById("filePreview");
const downloadBtn = document.getElementById("downloadBtn");

uploadForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (0 === csvFile.files.length) {
    return;
  }
  const file = csvFile.files[0];

  if (file) {
    const reader = new FileReader();

    // Define what happens once the FileReader has completed reading
    reader.onload = function (e) {
      const text = e.target.result;
      const data = csvToArray(text);
      console.log(data);
      preview.appendChild(generateTable(data));
      const csvContent = generateCSV(data);
      exportFile(csvContent, downloadBtn);
    };

    reader.readAsText(file);
  } else {
    preview.innerText = "Please choose a file";
  }
});
