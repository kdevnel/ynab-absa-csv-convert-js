const uploadForm = document.getElementById("fileForm");
const csvFile = document.getElementById("csvUpload");
const preview = document.getElementById("filePreview");

/**
 * Convert the CSV to an array using the header row as keys
 * @param {string} str The string containing the CSV data
 * @param {string} delimiter The delimiter separating the CSV columns
 */
function csvToArray(str) {
  // Slice the CSV data until the end of the header row
  // Split the header row into the header variable
  delimiter = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

  // Slice the CSV data from the end of the header (+1) and then split at each row
  const rows = str.slice(str.indexOf("\n") + 1).split("\n");

  // Map the rows into their own key:value pairs inside a new object
  const arr = rows.map(function (row) {
    const values = row.split(delimiter);
    const el = headers.reduce(function (object, header, index) {
      modifyValues(object, header, values[index]);
      return object;
    }, {});
    return el;
  });
  console.log(arr);
  return arr;
}

/**
 * Take the raw CSV data and manipulate it into a usable format
 *
 * @param {object} object an object containing a single row of CSV data
 * @param {string} key the key for the current item
 * @param {string} value the value of the current item
 */
function modifyValues(object, key, value) {
  switch (key) {
    case "Date":
      //modify the date
      value = value.replace(/(\d{4})(\d{2})(\d{2})/, "$3-$2-$1");
      break;
    case "Description":
      // modify the description
      break;
  }

  // Assign the updated values to the object
  object[key] = value;
  // Add the Memo column
  object["Memo"] = "";
}

/**
 * Take an array of objects and display it as a table in HTML
 *
 * @param {array} arr An array of objects for each line of CSV data
 * @returns {string}
 */
function outputHTML(arr) {
  let html = `
    <table>
      <thead>
        <th>Date</th>
        <th>Memo</th>
        <th>Description</th>
        <th>Amount</th>
        <th>Balance</th>
      </thead>
  `;

  for (let i = 0; i < arr.length; i++) {
    html += `
      <tr>
        <td>${arr[i].Date}</td>
        <td>${arr[i].Memo}</td>
        <td>${arr[i].Description}</td>
        <td>${arr[i].Amount}</td>
        <td>${arr[i].Balance}</td>
      </tr>
    `;
  }

  html += `
    </table>
  `;

  return html;
}

uploadForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if ( 0 === csvFile.files.length ) {
    return;
  }
  const file = csvFile.files[0];

  if (file) {
    const reader = new FileReader();

    // Define what happens once the FileReader has completed reading
    reader.onload = function (e) {
      const text = e.target.result;
      const data = csvToArray(text);
      preview.innerHTML = outputHTML(data);
    };

    reader.readAsText(file);
  } else {
    preview.innerText = "Please choose a file";
  }
});
