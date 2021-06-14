import CSVFileValidator from "csv-file-validator";
import fileReader from "./fileReader.js";
import { csvConfig } from "./processInputCsv/processInputCsv.js";
import resetPage from "./resetPage.js";

const csvFile = document.getElementById("csvUpload");
const preview = document.getElementById("filePreview");
const errorMessages = document.getElementById("errorMessages");

/**
 * Callback function for the file submit event listener
 * @param {object} event
 * @returns
 */
function fileSubmitEventHandler(event) {
  event.preventDefault();
  if (0 === csvFile.files.length) {
    return;
  }
  const file = csvFile.files[0];
  resetPage();

  CSVFileValidator(file, csvConfig).then((csvData) => {
    csvData.inValidMessages.forEach((message) => {
      errorMessages.innerHTML = message;
    });
    if (csvData.inValidMessages.length === 0 && file) {
      fileReader(file);
    } else {
      preview.innerText = "Please choose a valid file";
    }
  });
}

export default fileSubmitEventHandler;
