/**
 * Take an array of objects and generate table markup
 *
 * @param {array} csvDataJson An array of objects for each line of CSV data
 * @returns {object}
 */
function generateTable(csvDataJson) {
  const headers = Object.keys(csvDataJson[0]);

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

  for (let i = 0; i < csvDataJson.length; i++) {
    const tr = document.createElement("tr");
    const rowData = Object.values(csvDataJson[i]);

    for (let j = 0; j < rowData.length; j++) {
      const td = document.createElement("td");
      const tdText = document.createTextNode(rowData[j]);
      td.appendChild(tdText);
      td.setAttribute("data-header", headers[j]);
      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  }

  table.appendChild(tbody);

  return table.outerHTML;
}

export default generateTable;
