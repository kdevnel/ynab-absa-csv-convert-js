/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/js/fileSubmitEventHandler.js":
/*!******************************************!*\
  !*** ./src/js/fileSubmitEventHandler.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _generateOutputCsv_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./generateOutputCsv.js */ "./src/js/generateOutputCsv.js");
/* harmony import */ var _generateTable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./generateTable.js */ "./src/js/generateTable.js");
/* harmony import */ var _processInputCsv_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./processInputCsv.js */ "./src/js/processInputCsv.js");




const csvFile = document.getElementById("csvUpload");
const preview = document.getElementById("filePreview");

/**
 * Callback function for the file submit event listener
 * @param {object} event
 * @returns
 */
function fileSubmitEventHandler(event) {
  event.preventDefault();
  if (0 === csvFile.files.length) {
    return;
  }
  const file = csvFile.files[0];

  if (file) {
    const reader = new FileReader();

    // Define what happens once the FileReader has completed reading
    reader.onload = function (event) {
      const inputCsvString = event.target.result;
      const processedCsvJson = (0,_processInputCsv_js__WEBPACK_IMPORTED_MODULE_2__.default)(inputCsvString);
      console.log(processedCsvJson);
      preview.innerHTML = (0,_generateTable_js__WEBPACK_IMPORTED_MODULE_1__.default)(processedCsvJson);
      const outputCSV = (0,_generateOutputCsv_js__WEBPACK_IMPORTED_MODULE_0__.generateOutputCsv)(processedCsvJson);
      (0,_generateOutputCsv_js__WEBPACK_IMPORTED_MODULE_0__.exportFile)(outputCSV);
    };

    reader.readAsText(file);
  } else {
    preview.innerText = "Please choose a file";
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fileSubmitEventHandler);


/***/ }),

/***/ "./src/js/generateOutputCsv.js":
/*!*************************************!*\
  !*** ./src/js/generateOutputCsv.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateOutputCsv": () => (/* binding */ generateOutputCsv),
/* harmony export */   "exportFile": () => (/* binding */ exportFile)
/* harmony export */ });
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

  const exportFileName = "export.csv";
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




/***/ }),

/***/ "./src/js/generateTable.js":
/*!*********************************!*\
  !*** ./src/js/generateTable.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (generateTable);


/***/ }),

/***/ "./src/js/processInputCsv.js":
/*!***********************************!*\
  !*** ./src/js/processInputCsv.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// The delimeter that matches CSV data until the end of the header row
const delimiter = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
let headers = [];

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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (processInputCsv);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_fileSubmitEventHandler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/fileSubmitEventHandler.js */ "./src/js/fileSubmitEventHandler.js");
/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scss/style.scss */ "./src/scss/style.scss");



const uploadForm = document.getElementById("fileForm");

uploadForm.addEventListener("submit", _js_fileSubmitEventHandler_js__WEBPACK_IMPORTED_MODULE_0__.default);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly95bmFiLWFic2EtY3N2LWNvbnZlcnQvLi9zcmMvc2Nzcy9zdHlsZS5zY3NzPzk4YWYiLCJ3ZWJwYWNrOi8veW5hYi1hYnNhLWNzdi1jb252ZXJ0Ly4vc3JjL2pzL2ZpbGVTdWJtaXRFdmVudEhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8veW5hYi1hYnNhLWNzdi1jb252ZXJ0Ly4vc3JjL2pzL2dlbmVyYXRlT3V0cHV0Q3N2LmpzIiwid2VicGFjazovL3luYWItYWJzYS1jc3YtY29udmVydC8uL3NyYy9qcy9nZW5lcmF0ZVRhYmxlLmpzIiwid2VicGFjazovL3luYWItYWJzYS1jc3YtY29udmVydC8uL3NyYy9qcy9wcm9jZXNzSW5wdXRDc3YuanMiLCJ3ZWJwYWNrOi8veW5hYi1hYnNhLWNzdi1jb252ZXJ0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3luYWItYWJzYS1jc3YtY29udmVydC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8veW5hYi1hYnNhLWNzdi1jb252ZXJ0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8veW5hYi1hYnNhLWNzdi1jb252ZXJ0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8veW5hYi1hYnNhLWNzdi1jb252ZXJ0Ly4vc3JjL2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBdUU7QUFDeEI7QUFDSTs7QUFFbkQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsNERBQWU7QUFDOUM7QUFDQSwwQkFBMEIsMERBQWE7QUFDdkMsd0JBQXdCLHdFQUFpQjtBQUN6QyxNQUFNLGlFQUFVO0FBQ2hCOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxzQkFBc0IsRUFBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDdEM7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLG9CQUFvQjtBQUNyQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLElBQUk7QUFDeEI7O0FBRUEsaUJBQWlCLG1CQUFtQixNQUFNLFVBQVU7QUFDcEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNDQUFzQyxpQkFBaUIsY0FBYyxHQUFHO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFeUM7Ozs7Ozs7Ozs7Ozs7OztBQ25FekM7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUIsb0JBQW9CO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxpQkFBaUIsd0JBQXdCO0FBQ3pDO0FBQ0E7O0FBRUEsbUJBQW1CLG9CQUFvQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLGlFQUFlLGFBQWEsRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDMUM3QjtBQUNBLHFDQUFxQyxFQUFFO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtBQUNqRDtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMseUNBQXlDO0FBQzVFO0FBQ0E7QUFDQSxrQkFBa0IsTUFBTTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlFQUFlLGVBQWUsRUFBQzs7Ozs7OztVQ25GL0I7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7O0FDTm9FO0FBQ3pDOztBQUUzQjs7QUFFQSxzQ0FBc0Msa0VBQXNCIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCB7IGV4cG9ydEZpbGUsIGdlbmVyYXRlT3V0cHV0Q3N2IH0gZnJvbSBcIi4vZ2VuZXJhdGVPdXRwdXRDc3YuanNcIjtcbmltcG9ydCBnZW5lcmF0ZVRhYmxlIGZyb20gXCIuL2dlbmVyYXRlVGFibGUuanNcIjtcbmltcG9ydCBwcm9jZXNzSW5wdXRDc3YgZnJvbSBcIi4vcHJvY2Vzc0lucHV0Q3N2LmpzXCI7XG5cbmNvbnN0IGNzdkZpbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNzdlVwbG9hZFwiKTtcbmNvbnN0IHByZXZpZXcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZpbGVQcmV2aWV3XCIpO1xuXG4vKipcbiAqIENhbGxiYWNrIGZ1bmN0aW9uIGZvciB0aGUgZmlsZSBzdWJtaXQgZXZlbnQgbGlzdGVuZXJcbiAqIEBwYXJhbSB7b2JqZWN0fSBldmVudFxuICogQHJldHVybnNcbiAqL1xuZnVuY3Rpb24gZmlsZVN1Ym1pdEV2ZW50SGFuZGxlcihldmVudCkge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBpZiAoMCA9PT0gY3N2RmlsZS5maWxlcy5sZW5ndGgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgZmlsZSA9IGNzdkZpbGUuZmlsZXNbMF07XG5cbiAgaWYgKGZpbGUpIHtcbiAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXG4gICAgLy8gRGVmaW5lIHdoYXQgaGFwcGVucyBvbmNlIHRoZSBGaWxlUmVhZGVyIGhhcyBjb21wbGV0ZWQgcmVhZGluZ1xuICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGNvbnN0IGlucHV0Q3N2U3RyaW5nID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgIGNvbnN0IHByb2Nlc3NlZENzdkpzb24gPSBwcm9jZXNzSW5wdXRDc3YoaW5wdXRDc3ZTdHJpbmcpO1xuICAgICAgY29uc29sZS5sb2cocHJvY2Vzc2VkQ3N2SnNvbik7XG4gICAgICBwcmV2aWV3LmlubmVySFRNTCA9IGdlbmVyYXRlVGFibGUocHJvY2Vzc2VkQ3N2SnNvbik7XG4gICAgICBjb25zdCBvdXRwdXRDU1YgPSBnZW5lcmF0ZU91dHB1dENzdihwcm9jZXNzZWRDc3ZKc29uKTtcbiAgICAgIGV4cG9ydEZpbGUob3V0cHV0Q1NWKTtcbiAgICB9O1xuXG4gICAgcmVhZGVyLnJlYWRBc1RleHQoZmlsZSk7XG4gIH0gZWxzZSB7XG4gICAgcHJldmlldy5pbm5lclRleHQgPSBcIlBsZWFzZSBjaG9vc2UgYSBmaWxlXCI7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZmlsZVN1Ym1pdEV2ZW50SGFuZGxlcjtcbiIsIi8qKlxuICogQ29udmVydCBhbiBvYmplY3QgaW50byBhIENTViBjb21wYXRpYmxlIEpTT04gc3RyaW5nXG4gKlxuICogQHBhcmFtIHthcnJheX0gY3N2RGF0YUpzb24gQW4gb2JqZWN0IHRvIGJlIGNvbnZlcnRlZCBpbnRvIENTViBkYXRhXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZW5lcmF0ZU91dHB1dENzdihjc3ZEYXRhSnNvbikge1xuICBjb25zdCBzdHJpbmdpZmllZEpzb24gPSBKU09OLnN0cmluZ2lmeShjc3ZEYXRhSnNvbik7XG4gIGNvbnN0IGZvcm1hdHRlZE91dHB1dENzdiA9IHN0cmluZ2lmaWVkSnNvblRvQ3N2KHN0cmluZ2lmaWVkSnNvbik7XG4gIHJldHVybiBmb3JtYXR0ZWRPdXRwdXRDc3Y7XG59XG5cbi8qKlxuICogVGFrZXMgc3RyaW5naWZpZWQgSlNPTiBhbmQgcGFyc2VzIGl0IGludG8gZGVzaXJlZCBDU1Ygc3RyaW5nIGZvcm1hdFxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZ2lmaWVkSnNvblxuICogQHJldHVybnNcbiAqL1xuZnVuY3Rpb24gc3RyaW5naWZpZWRKc29uVG9Dc3Yoc3RyaW5naWZpZWRKc29uKSB7XG4gIGNvbnN0IGNzdkpzb24gPSBKU09OLnBhcnNlKHN0cmluZ2lmaWVkSnNvbik7XG4gIGxldCBjc3ZTdHJpbmcgPSBcIlwiO1xuICBsZXQgaGVhZGVyQXJyYXkgPSBbXTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNzdkpzb24ubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgcm93ID0gXCJcIjtcblxuICAgIGZvciAobGV0IHZhbHVlIGluIGNzdkpzb25baV0pIHtcbiAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgIGhlYWRlckFycmF5LnB1c2godmFsdWUpO1xuICAgICAgfVxuICAgICAgaWYgKHJvdyAhPT0gXCJcIikge1xuICAgICAgICByb3cgKz0gXCIsXCI7XG4gICAgICB9XG4gICAgICByb3cgKz0gY3N2SnNvbltpXVt2YWx1ZV07XG4gICAgfVxuXG4gICAgY3N2U3RyaW5nICs9IGAke3Jvd31cXHJcXG5gO1xuICB9XG5cbiAgY3N2U3RyaW5nID0gYCR7aGVhZGVyQXJyYXkuam9pbigpfVxcclxcbiR7Y3N2U3RyaW5nfWA7XG4gIHJldHVybiBjc3ZTdHJpbmc7XG59XG5cbmZ1bmN0aW9uIGV4cG9ydEZpbGUob3V0cHV0Q3N2KSB7XG4gIGNvbnN0IGRvd25sb2FkTGlua0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgIFwiZG93bmxvYWRMaW5rQ29udGFpbmVyXCJcbiAgKTtcblxuICBjb25zdCBleHBvcnRGaWxlTmFtZSA9IFwiZXhwb3J0LmNzdlwiO1xuICBjb25zdCBibG9iID0gbmV3IEJsb2IoW291dHB1dENzdl0sIHsgdHlwZTogXCJ0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04O1wiIH0pO1xuICBpZiAobmF2aWdhdG9yLm1zU2F2ZUJsb2IpIHtcbiAgICAvLyBJRSAxMCtcbiAgICBuYXZpZ2F0b3IubXNTYXZlQmxvYihibG9iLCBleHBvcnRGaWxlTmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZG93bmxvYWRMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgaWYgKGRvd25sb2FkTGluay5kb3dubG9hZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBmZWF0dXJlIGRldGVjdGlvblxuICAgICAgLy8gQnJvd3NlcnMgdGhhdCBzdXBwb3J0IEhUTUw1IGRvd25sb2FkIGF0dHJpYnV0ZVxuICAgICAgY29uc3QgZG93bmxvYWRMaW5rVXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICAgIGRvd25sb2FkTGluay5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIGRvd25sb2FkTGlua1VybCk7XG4gICAgICBkb3dubG9hZExpbmsuc2V0QXR0cmlidXRlKFwiZG93bmxvYWRcIiwgZXhwb3J0RmlsZU5hbWUpO1xuICAgICAgZG93bmxvYWRMaW5rLmNsYXNzTGlzdC5hZGQoXCJidXR0b25cIik7XG4gICAgICBkb3dubG9hZExpbmsudGV4dENvbnRlbnQgPSBcIkRvd25sb2FkIENTVlwiO1xuICAgICAgZG93bmxvYWRMaW5rQ29udGFpbmVyLmlubmVySFRNTCA9IGRvd25sb2FkTGluay5vdXRlckhUTUw7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7IGdlbmVyYXRlT3V0cHV0Q3N2LCBleHBvcnRGaWxlIH07XG4iLCIvKipcbiAqIFRha2UgYW4gYXJyYXkgb2Ygb2JqZWN0cyBhbmQgZ2VuZXJhdGUgdGFibGUgbWFya3VwXG4gKlxuICogQHBhcmFtIHthcnJheX0gY3N2RGF0YUpzb24gQW4gYXJyYXkgb2Ygb2JqZWN0cyBmb3IgZWFjaCBsaW5lIG9mIENTViBkYXRhXG4gKiBAcmV0dXJucyB7b2JqZWN0fVxuICovXG5mdW5jdGlvbiBnZW5lcmF0ZVRhYmxlKGNzdkRhdGFKc29uKSB7XG4gIGNvbnN0IGhlYWRlcnMgPSBPYmplY3Qua2V5cyhjc3ZEYXRhSnNvblswXSk7XG5cbiAgY29uc3QgdGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGFibGVcIik7XG4gIGNvbnN0IHRoZWFkID0gdGFibGUuY3JlYXRlVEhlYWQoKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGhlYWRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCB0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiKTtcbiAgICBjb25zdCB0aFRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShoZWFkZXJzW2ldKTtcbiAgICB0aC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWhlYWRlclwiLCBoZWFkZXJzW2ldKTtcbiAgICB0aC5hcHBlbmRDaGlsZCh0aFRleHQpO1xuICAgIHRoZWFkLmFwcGVuZENoaWxkKHRoKTtcbiAgfVxuXG4gIGNvbnN0IHRib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRib2R5XCIpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY3N2RGF0YUpzb24ubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCB0ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcbiAgICBjb25zdCByb3dEYXRhID0gT2JqZWN0LnZhbHVlcyhjc3ZEYXRhSnNvbltpXSk7XG5cbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJvd0RhdGEubGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IHRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICAgICAgY29uc3QgdGRUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocm93RGF0YVtqXSk7XG4gICAgICB0ZC5hcHBlbmRDaGlsZCh0ZFRleHQpO1xuICAgICAgdGQuc2V0QXR0cmlidXRlKFwiZGF0YS1oZWFkZXJcIiwgaGVhZGVyc1tqXSk7XG4gICAgICB0ci5hcHBlbmRDaGlsZCh0ZCk7XG4gICAgfVxuXG4gICAgdGJvZHkuYXBwZW5kQ2hpbGQodHIpO1xuICB9XG5cbiAgdGFibGUuYXBwZW5kQ2hpbGQodGJvZHkpO1xuXG4gIHJldHVybiB0YWJsZS5vdXRlckhUTUw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdlbmVyYXRlVGFibGU7XG4iLCIvLyBUaGUgZGVsaW1ldGVyIHRoYXQgbWF0Y2hlcyBDU1YgZGF0YSB1bnRpbCB0aGUgZW5kIG9mIHRoZSBoZWFkZXIgcm93XG5jb25zdCBkZWxpbWl0ZXIgPSAvLCg/PSg/Oig/OlteXCJdKlwiKXsyfSkqW15cIl0qJCkvO1xubGV0IGhlYWRlcnMgPSBbXTtcblxuLyoqXG4gKiBDb252ZXJ0IHRoZSBDU1YgdG8gYW4gYXJyYXkgdXNpbmcgdGhlIGhlYWRlciByb3cgYXMga2V5c1xuICogQHBhcmFtIHtzdHJpbmd9IGlucHV0Q3N2U3RyaW5nIFRoZSBzdHJpbmcgY29udGFpbmluZyB0aGUgQ1NWIGRhdGFcbiAqL1xuZnVuY3Rpb24gcHJvY2Vzc0lucHV0Q3N2KGlucHV0Q3N2U3RyaW5nKSB7XG4gIC8vIFNwbGl0IHRoZSBoZWFkZXIgcm93IGludG8gdGhlIGhlYWRlciB2YXJpYWJsZVxuICBoZWFkZXJzID0gaW5wdXRDc3ZTdHJpbmdcbiAgICAuc2xpY2UoMCwgaW5wdXRDc3ZTdHJpbmcuaW5kZXhPZihcIlxcblwiKSlcbiAgICAudG9Mb3dlckNhc2UoKVxuICAgIC5zcGxpdChkZWxpbWl0ZXIpO1xuICBoZWFkZXJzLnNwbGljZSgxLCAwLCBcIm1lbW9cIik7XG5cbiAgLy8gU2xpY2UgdGhlIENTViBkYXRhIGZyb20gdGhlIGVuZCBvZiB0aGUgaGVhZGVyICgrMSkgYW5kIHRoZW4gc3BsaXQgYXQgZWFjaCByb3dcbiAgLy8gQWxzbyByZW1vdmVzIGFueSBlbXB0eSBsaW5lc1xuICBjb25zdCByb3dzID0gaW5wdXRDc3ZTdHJpbmdcbiAgICAuc2xpY2UoaW5wdXRDc3ZTdHJpbmcuaW5kZXhPZihcIlxcblwiKSArIDEpXG4gICAgLnNwbGl0KFwiXFxuXCIpXG4gICAgLmZpbHRlcihmdW5jdGlvbiAoZWwpIHtcbiAgICAgIHJldHVybiBlbDtcbiAgICB9KTtcblxuICAvLyBNYXAgdGhlIHJvd3MgaW50byB0aGVpciBvd24ga2V5OnZhbHVlIHBhaXJzIGluc2lkZSBhIG5ldyBvYmplY3RcbiAgY29uc3QgcHJvY2Vzc2VkQ3N2SnNvbiA9IHJvd3MubWFwKHNwbGl0Um93VG9Db2x1bW5zKTtcbiAgcmV0dXJuIHByb2Nlc3NlZENzdkpzb247XG59XG5cbi8qKlxuICogTWFwIGEgc3RyaW5nIGNvbnRhaW5pbmcgYSByb3cgb2YgZGF0YSBpbnRvIHRoZWlyIG93biBrZXk6dmFsdWUgcGFpcnMgKGNvbHVtbnMpXG4gKiBAcGFyYW0ge3N0cmluZ30gcm93XG4gKiBAcmV0dXJucyB7b2JqZWN0fVxuICovXG5mdW5jdGlvbiBzcGxpdFJvd1RvQ29sdW1ucyhyb3cpIHtcbiAgY29uc3QgdmFsdWVzID0gcm93LnNwbGl0KGRlbGltaXRlcik7XG4gIHZhbHVlcy5zcGxpY2UoMSwgMCwgXCJcIik7XG4gIGNvbnN0IGNvbHVtbnMgPSBoZWFkZXJzLnJlZHVjZShmdW5jdGlvbiAoXG4gICAgY29sdW1uQWNjdW11bGF0b3IsXG4gICAgY3VycmVudEhlYWRlcixcbiAgICBjdXJyZW50SW5kZXhcbiAgKSB7XG4gICAgbW9kaWZ5VmFsdWVzKGNvbHVtbkFjY3VtdWxhdG9yLCBjdXJyZW50SGVhZGVyLCB2YWx1ZXNbY3VycmVudEluZGV4XSk7XG4gICAgcmV0dXJuIGNvbHVtbkFjY3VtdWxhdG9yO1xuICB9LFxuICB7fSk7XG4gIHJldHVybiBjb2x1bW5zO1xufVxuXG4vKipcbiAqIFRha2UgdGhlIHJhdyBDU1YgZGF0YSBhbmQgbWFuaXB1bGF0ZSBpdCBpbnRvIGEgdXNhYmxlIGZvcm1hdFxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3QgYW4gb2JqZWN0IGNvbnRhaW5pbmcgYSBzaW5nbGUgcm93IG9mIENTViBkYXRhXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IHRoZSBrZXkgZm9yIHRoZSBjdXJyZW50IGl0ZW1cbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSB0aGUgdmFsdWUgb2YgdGhlIGN1cnJlbnQgaXRlbVxuICovXG5mdW5jdGlvbiBtb2RpZnlWYWx1ZXMoY29sdW1uT2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIC8vIFN0cmlwIGRvdWJsZSBxdW90ZXMgZnJvbSBhbnkgc3RyaW5nc1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9cIihbXlwiXSsoPz1cIikpXCIvZywgXCIkMVwiKTtcbiAgfVxuICBzd2l0Y2ggKGtleSkge1xuICAgIGNhc2UgXCJkYXRlXCI6XG4gICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoLyhcXGR7NH0pKFxcZHsyfSkoXFxkezJ9KS8sIFwiJDMtJDItJDFcIik7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiZGVzY3JpcHRpb25cIjpcbiAgICAgIGlmICh2YWx1ZS5zdGFydHNXaXRoKFwiUE9TXCIsIDApKSB7XG4gICAgICAgIGNvbHVtbk9iamVjdFtcIm1lbW9cIl0gPSBgXCIke3ZhbHVlLnN1YnN0cigwLCB2YWx1ZS5pbmRleE9mKFwiKSBcIikgKyAxKX1cImA7XG4gICAgICAgIHZhbHVlID0gdmFsdWUuc3Vic3RyKHZhbHVlLmluZGV4T2YoXCIpIFwiKSArIDIpO1xuICAgICAgfVxuICAgICAgdmFsdWUgPSBgXCIke3ZhbHVlfVwiYDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJtZW1vXCI6XG4gICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgIHZhbHVlID0gJ1wiXCInO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gIH1cblxuICBjb2x1bW5PYmplY3Rba2V5XSA9IHZhbHVlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBwcm9jZXNzSW5wdXRDc3Y7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBmaWxlU3VibWl0RXZlbnRIYW5kbGVyIGZyb20gXCIuL2pzL2ZpbGVTdWJtaXRFdmVudEhhbmRsZXIuanNcIjtcbmltcG9ydCBcIi4vc2Nzcy9zdHlsZS5zY3NzXCI7XG5cbmNvbnN0IHVwbG9hZEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZpbGVGb3JtXCIpO1xuXG51cGxvYWRGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZmlsZVN1Ym1pdEV2ZW50SGFuZGxlcik7XG4iXSwic291cmNlUm9vdCI6IiJ9