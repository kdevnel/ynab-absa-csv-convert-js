/**
 * Take an array of objects and generate table markup
 *
 * @param {array} csvArray An array of objects for each line of CSV data
 * @returns {object}
 */
function generateTable(csvArray) {
  const headers = Object.keys(csvArray[0]);

  const table = document.createElement("table");
  const thead = table.createTHead();

  for (let i = 0; i < headers.length; i++) {
    const th = document.createElement("th");
    const thText = document.createTextNode(headers[i]);
    th.setAttribute("data-header", headers[i]);
    th.appendChild(thText);
    thead.appendChild(th);
  }

  const tbody = document.createElement("tbody");

  for (let i = 0; i < csvArray.length; i++) {
    const row = document.createElement("tr");
    const rowArray = Object.values(csvArray[i]);

    for (let j = 0; j < rowArray.length; j++) {
      const cell = document.createElement("td");
      const cellText = document.createTextNode(rowArray[j]);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }

    tbody.appendChild(row);
  }

  table.appendChild(tbody);

  return table;
}

export default generateTable;
