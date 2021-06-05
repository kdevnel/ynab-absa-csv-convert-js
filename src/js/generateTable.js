/**
 * Take an array of objects and display it as a table in HTML
 *
 * @param {array} arr An array of objects for each line of CSV data
 * @returns {string}
 */
function generateTable(arr) {
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
        <td>${arr[i].date}</td>
        <td>${arr[i].memo}</td>
        <td>${arr[i].description}</td>
        <td>${arr[i].amount}</td>
        <td>${arr[i].balance}</td>
      </tr>
    `;
  }

  html += `
    </table>
  `;

  return html;
}

export default generateTable;
