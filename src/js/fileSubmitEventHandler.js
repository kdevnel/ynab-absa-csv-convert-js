import { exportFile, generateOutputCsv } from "./generateOutputCsv.js";
import generateTable from "./generateTable.js";
import processInputCsv from "./processInputCsv.js";

const csvFile = document.getElementById("csvUpload");
const preview = document.getElementById("filePreview");

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
      const rawCsvString = event.target.result;
      const processedCsvJson = processInputCsv(rawCsvString);
      console.log(processedCsvJson);
      preview.innerHTML = generateTable(processedCsvJson);
      const outputCSV = generateOutputCsv(processedCsvJson);
      exportFile(outputCSV);
    };

    reader.readAsText(file);
  } else {
    preview.innerText = "Please choose a file";
  }
}

export default fileSubmitEventHandler;
