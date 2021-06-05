/**
 * Convert an object into a CSV compatible JSON string
 *
 * @param {array} arrObj An object to be converted into CSV data
 * @returns {string}
 */
function generateCSV(arrObj) {
  const json = JSON.stringify(arrObj);
  const csv = jsonToCSV(json);
  return csv;
}

// JSON to CSV Converter
function jsonToCSV(json) {
  const array = JSON.parse(json);
  let string = "";
  let headerArray = [];

  for (let i = 0; i < array.length; i++) {
    let row = "";

    for (let value in array[i]) {
      if (i === 0) {
        headerArray.push(value);
      }
      if (row !== "") {
        row += ",";
      }
      row += array[i][value];
    }

    string += `${row}\r\n`;
  }

  string = `${headerArray.join()}\r\n${string}`;
  return string;
}

function exportFile(csv) {
  const fileName = "export.csv";
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, fileName);
  } else {
    const link = document.createElement("a");
    if (link.download !== undefined) {
      // feature detection
      // Browsers that support HTML5 download attribute
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", fileName);
      link.textContent = "test";
      document.body.appendChild(link);
    }
  }
}

export { generateCSV, exportFile };
