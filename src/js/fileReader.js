import { exportFile, generateOutputCsv } from "./generateOutputCsv.js";
import generateTable from "./generateTable.js";
import { processInputCsv } from "./processInputCsv/processInputCsv.js";

function fileReader(file) {
  const preview = document.getElementById("filePreview");
  const reader = new FileReader();

  // Define what happens once the FileReader has completed reading
  reader.onload = function (event) {
    const inputCsvString = event.target.result;
    const processedCsvJson = processInputCsv(inputCsvString);
    console.log(processedCsvJson);
    preview.innerHTML = generateTable(processedCsvJson);
    const outputCSV = generateOutputCsv(processedCsvJson);
    exportFile(outputCSV);
  };

  reader.readAsText(file);
}

export default fileReader;
