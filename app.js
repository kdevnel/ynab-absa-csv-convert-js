/**
 * 1. Upload a CSV file
 * 2. Process the CSV file
 * 3. Modify the data to the correct format
 * 4. Rearrange the columns
 * 5. Export a new CSV file
 */

const uploadForm = document.getElementById("fileForm");
const csvFile = document.getElementById("csvUpload");
const preview = document.getElementById("previewFile");

/**
 * Convert the CSV to an array using the header row as keys
 * @param {string} str The string containing the CSV data
 * @param {string} delimiter The delimiter separating the CSV columns
 */
function csvToArray(str, delimiter = ",") {
  // Slice the CSV data until the end of the header row
  // Split the header row into the header variable
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

  // Slice the CSV data from the end of the header (+1) and then split at each row
  const rows = str.slice(str.indexOf("\n") + 1).split("\n");

  // Map the rows into their own key:value pairs inside a new object
  const arr = rows.map((row) => {
    const values = row.split(delimiter);
    const el = headers.reduce((object, header, index) => {
      object[header] = values[index];
      return object;
    }, {});
    return el;
  });

  console.log(arr);
  return arr;
}

uploadForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const file = csvFile.files[0];
  const reader = new FileReader();

  // Define what happens once the FileReader has completed reading
  reader.onload = function (e) {
    const text = e.target.result;
    const data = csvToArray(text);
    document.getElementById("filePreview").innerText = JSON.stringify(data);
  };

  reader.readAsText(file);
});
