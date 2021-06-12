// The delimeter that matches CSV data until the end of the header row
const delimiter = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
let headers = [];

/**
 * Convert the CSV to an array using the header row as keys
 * @param {string} str The string containing the CSV data
 * @param {string} delimiter The delimiter separating the CSV columns
 */
function processInputCsv(str) {
  // Split the header row into the header variable
  headers = str.slice(0, str.indexOf("\n")).toLowerCase().split(delimiter);
  headers.splice(1, 0, "memo");

  // Slice the CSV data from the end of the header (+1) and then split at each row
  // Also removes any empty lines
  const rows = str
    .slice(str.indexOf("\n") + 1)
    .split("\n")
    .filter(function (el) {
      return el;
    });

  // Map the rows into their own key:value pairs inside a new object
  const arr = rows.map(splitRowToColumns);
  return arr;
}

/**
 * Map a string containing a row of data into their own key:value pairs (columns)
 * @param {string} row
 * @returns {string}
 */
function splitRowToColumns(row) {
  const values = row.split(delimiter);
  values.splice(1, 0, "");
  const el = headers.reduce(function (object, header, index) {
    modifyValues(object, header, values[index]);
    return object;
  }, {});
  return el;
}

/**
 * Take the raw CSV data and manipulate it into a usable format
 *
 * @param {object} object an object containing a single row of CSV data
 * @param {string} key the key for the current item
 * @param {string} value the value of the current item
 */
function modifyValues(object, key, value) {
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
        object["memo"] = `"${value.substr(0, value.indexOf(") ") + 1)}"`;
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

  object[key] = value;
}

export default processInputCsv;
