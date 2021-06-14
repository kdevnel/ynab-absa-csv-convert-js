const csvConfig = {
  headers: [
    {
      name: "Date",
      inputName: "Date",
      //optional: false,
      headerError: headerMissingError(),
    },
    {
      name: "Description",
      inputName: "Description",
      //optional: false,
      headerError: headerMissingError(),
    },
    {
      name: "Amount",
      inputName: "Amount",
      //optional: false,
      headerError: headerMissingError(),
    },
    {
      name: "Balance",
      inputName: "Balance",
      //optional: false,
      headerError: headerMissingError(),
    },
  ],
};

/**
 * Displays an error if a specific column header is missing
 * @param {string} headerName
 * @returns {string} A string containing error details
 */
function headerMissingError(headerName) {
  return `${headerName} is missing`;
}

export default csvConfig;
