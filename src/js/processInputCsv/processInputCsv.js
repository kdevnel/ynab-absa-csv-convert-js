// The delimeter that matches CSV data until the end of the header row
const delimiter = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
let headers = [];

const csvConfig = {
  headers: [
    {
      name: "Date",
      inputName: "Date",
    },
    {
      name: "Description",
      inputName: "Description",
    },
    {
      name: "Amount",
      inputName: "Amount",
    },
    {
      name: "Balance",
      inputName: "Balance",
    },
  ],
};

/**
 * Convert the CSV to an array using the header row as keys
 * @param {string} inputCsvString The string containing the CSV data
 */
function processInputCsv(inputCsvString) {
  // Split the header row into the header variable
  headers = inputCsvString
    .slice(0, inputCsvString.indexOf("\n"))
    .toLowerCase()
    .split(delimiter);
  headers.splice(1, 0, "memo");

  // Slice the CSV data from the end of the header (+1) and then split at each row
  // Also removes any empty lines
  const rows = inputCsvString
    .slice(inputCsvString.indexOf("\n") + 1)
    .split("\n")
    .filter(function (el) {
      return el;
    });

  // Map the rows into their own key:value pairs inside a new object
  const processedCsvJson = rows.map(splitRowToColumns);
  return processedCsvJson;
}

/**
 * Map a string containing a row of data into their own key:value pairs (columns)
 * @param {string} row
 * @returns {object}
 */
function splitRowToColumns(row) {
  const values = row.split(delimiter);
  values.splice(1, 0, "");
  const columns = headers.reduce(function (
    columnAccumulator,
    currentHeader,
    currentIndex
  ) {
    modifyValues(columnAccumulator, currentHeader, values[currentIndex]);
    return columnAccumulator;
  },
  {});
  return columns;
}

/**
 * Take the raw CSV data and manipulate it into a usable format
 *
 * @param {object} object an object containing a single row of CSV data
 * @param {string} key the key for the current item
 * @param {string} value the value of the current item
 */
function modifyValues(columnObject, key, value) {
  // Strip double quotes from any strings
  if (typeof value === "string") {
    value = value.replace(/"([^"]+(?="))"/g, "$1");
  }
  switch (key) {
    case "date":
      value = value.replace(/(\d{4})(\d{2})(\d{2})/, "$3-$2-$1");
      break;
    case "description":
      if (value.startsWith("POS", 0)) {
        columnObject["memo"] = `"${value.substr(0, value.indexOf(") ") + 1)}"`;
        value = value.substr(value.indexOf(") ") + 2);
      }
      value = `"${value}"`;
      break;
    case "memo":
      if (!value) {
        value = '""';
      }
      break;
  }

  columnObject[key] = value;
}

export { processInputCsv, csvConfig };
