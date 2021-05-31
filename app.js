const uploadForm = document.getElementById("fileForm");
const csvFile = document.getElementById("csvUpload");
const preview = document.getElementById("filePreview");

/**
 * Convert the CSV to an array using the header row as keys
 * @param {string} str The string containing the CSV data
 * @param {string} delimiter The delimiter separating the CSV columns
 */
function csvToArray(str) {
  // Matches CSV data until the end of the header row
  delimiter = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
  // Split the header row into the header variable
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
  headers.push("Memo");

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
  let memo = "";
  switch (key) {
    case "Date":
      value = value.replace(/(\d{4})(\d{2})(\d{2})/, "$3-$2-$1");
      break;
    case "Description":
      if (value.startsWith("POS", 0)) {
        switch (value.substr(0, 12)) {
          case "POS PURCHASE":
            memo = value.substr(0, value.indexOf(") ") + 1);
            value = value.substr(value.indexOf(") ") + 2);
            break;
          case "POS CARD REF":
            value = "Case: POS CARD REFUND";
            break;
        }
      }
      break;
    case "Memo":
      value = object["Description"].substr(
        0,
        object["Description"].indexOf(") ") + 1
      );
      break;
  }

  object[key] = value;
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
      preview.innerHTML = outputHTML(data);
    };

    reader.readAsText(file);
  } else {
    preview.innerText = "Please choose a file";
  }
});
