/**
 * Convert an object into a CSV compatible JSON string
 *
 * @param {array} csvDataJson An object to be converted into CSV data
 * @returns {string}
 */
function generateOutputCsv(csvDataJson) {
  const stringifiedJson = JSON.stringify(csvDataJson);
  const formattedOutputCsv = stringifiedJsonToCsv(stringifiedJson);
  return formattedOutputCsv;
}

/**
 * Takes stringified JSON and parses it into desired CSV string format
 * @param {string} stringifiedJson
 * @returns
 */
function stringifiedJsonToCsv(stringifiedJson) {
  const csvJson = JSON.parse(stringifiedJson);
  let csvString = "";
  let headerArray = [];

  for (let i = 0; i < csvJson.length; i++) {
    let row = "";

    for (let value in csvJson[i]) {
      if (i === 0) {
        headerArray.push(value);
      }
      if (row !== "") {
        row += ",";
      }
      row += csvJson[i][value];
    }

    csvString += `${row}\r\n`;
  }

  csvString = `${headerArray.join()}\r\n${csvString}`;
  return csvString;
}

function exportFile(outputCsv) {
  const downloadLinkContainer = document.getElementById(
    "downloadLinkContainer"
  );

  const csvFile = document.getElementById("csvUpload").files[0];
  const fileWithoutExtension = csvFile.name.slice(0, -4);
  const exportFileName = `${fileWithoutExtension}-export.csv`;
  const blob = new Blob([outputCsv], { type: "text/csv;charset=utf-8;" });
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, exportFileName);
  } else {
    const downloadLink = document.createElement("a");
    if (downloadLink.download !== undefined) {
      // feature detection
      // Browsers that support HTML5 download attribute
      const downloadLinkUrl = URL.createObjectURL(blob);
      downloadLink.setAttribute("href", downloadLinkUrl);
      downloadLink.setAttribute("download", exportFileName);
      downloadLink.classList.add("button");
      downloadLink.textContent = "Download CSV";
      downloadLinkContainer.innerHTML = downloadLink.outerHTML;
    }
  }
}

export { generateOutputCsv, exportFile };
