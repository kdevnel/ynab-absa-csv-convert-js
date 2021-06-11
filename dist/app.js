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

/***/ "./src/js/csvToArray.js":
/*!******************************!*\
  !*** ./src/js/csvToArray.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Convert the CSV to an array using the header row as keys
 * @param {string} str The string containing the CSV data
 * @param {string} delimiter The delimiter separating the CSV columns
 */
function csvToArray(str) {
  // Matches CSV data until the end of the header row
  const delimiter = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
  // Split the header row into the header variable
  const headers = str
    .slice(0, str.indexOf("\n"))
    .toLowerCase()
    .split(delimiter);
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
  const arr = rows.map(function (row) {
    const values = row.split(delimiter);
    values.splice(1, 0, "");
    const el = headers.reduce(function (object, header, index) {
      modifyValues(object, header, values[index]);
      return object;
    }, {});
    return el;
  });
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
  // Strip double quotes from any strings
  if (typeof value === "string") {
    value = value.replace(/"([^"]+(?="))"/g, "$1");
  }
  let memo = "";
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
  }

  if (key !== "memo") {
    object[key] = value;
  } else if (key === "memo" && !object[key]) {
    object[key] = `"${memo}"`;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (csvToArray);


/***/ }),

/***/ "./src/js/generateCSV.js":
/*!*******************************!*\
  !*** ./src/js/generateCSV.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateCSV": () => (/* binding */ generateCSV),
/* harmony export */   "exportFile": () => (/* binding */ exportFile)
/* harmony export */ });
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

function exportFile(csv, btnElement) {
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
      link.classList.add("button");
      link.textContent = "Download CSV";
      btnElement.innerHTML = link.outerHTML;
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
      cell.setAttribute("data-header", headers[j]);
      row.appendChild(cell);
    }

    tbody.appendChild(row);
  }

  table.appendChild(tbody);

  return table.outerHTML;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (generateTable);


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
/* harmony import */ var _js_csvToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/csvToArray.js */ "./src/js/csvToArray.js");
/* harmony import */ var _js_generateCSV_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/generateCSV.js */ "./src/js/generateCSV.js");
/* harmony import */ var _js_generateTable_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/generateTable.js */ "./src/js/generateTable.js");
/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scss/style.scss */ "./src/scss/style.scss");





const uploadForm = document.getElementById("fileForm");
const csvFile = document.getElementById("csvUpload");
const preview = document.getElementById("filePreview");
const downloadBtn = document.getElementById("downloadBtn");

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
      const data = (0,_js_csvToArray_js__WEBPACK_IMPORTED_MODULE_0__.default)(text);
      console.log(data);
      preview.innerHTML = (0,_js_generateTable_js__WEBPACK_IMPORTED_MODULE_2__.default)(data);
      const csvContent = (0,_js_generateCSV_js__WEBPACK_IMPORTED_MODULE_1__.generateCSV)(data);
      (0,_js_generateCSV_js__WEBPACK_IMPORTED_MODULE_1__.exportFile)(csvContent, downloadBtn);
    };

    reader.readAsText(file);
  } else {
    preview.innerText = "Please choose a file";
  }
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly95bmFiLWFic2EtY3N2LWNvbnZlcnQvLi9zcmMvc2Nzcy9zdHlsZS5zY3NzPzk4YWYiLCJ3ZWJwYWNrOi8veW5hYi1hYnNhLWNzdi1jb252ZXJ0Ly4vc3JjL2pzL2NzdlRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8veW5hYi1hYnNhLWNzdi1jb252ZXJ0Ly4vc3JjL2pzL2dlbmVyYXRlQ1NWLmpzIiwid2VicGFjazovL3luYWItYWJzYS1jc3YtY29udmVydC8uL3NyYy9qcy9nZW5lcmF0ZVRhYmxlLmpzIiwid2VicGFjazovL3luYWItYWJzYS1jc3YtY29udmVydC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly95bmFiLWFic2EtY3N2LWNvbnZlcnQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3luYWItYWJzYS1jc3YtY29udmVydC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3luYWItYWJzYS1jc3YtY29udmVydC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3luYWItYWJzYS1jc3YtY29udmVydC8uL3NyYy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLEVBQUU7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssSUFBSTtBQUNUO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtBQUNqRDtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIseUNBQXlDO0FBQ3RFO0FBQ0E7QUFDQSxrQkFBa0IsTUFBTTtBQUN4QjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsc0JBQXNCLEtBQUs7QUFDM0I7QUFDQTs7QUFFQSxpRUFBZSxVQUFVLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0RTFCO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLGtCQUFrQjtBQUNuQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLElBQUk7QUFDckI7O0FBRUEsY0FBYyxtQkFBbUIsTUFBTSxPQUFPO0FBQzlDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdDQUFnQyxpQkFBaUIsY0FBYyxHQUFHO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFbUM7Ozs7Ozs7Ozs7Ozs7OztBQzNEbkM7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUIsb0JBQW9CO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxpQkFBaUIscUJBQXFCO0FBQ3RDO0FBQ0E7O0FBRUEsbUJBQW1CLHFCQUFxQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLGlFQUFlLGFBQWEsRUFBQzs7Ozs7OztVQzFDN0I7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7Ozs7QUNONEM7QUFDa0I7QUFDWjtBQUN2Qjs7QUFFM0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLDBEQUFVO0FBQzdCO0FBQ0EsMEJBQTBCLDZEQUFhO0FBQ3ZDLHlCQUF5QiwrREFBVztBQUNwQyxNQUFNLDhEQUFVO0FBQ2hCOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxDQUFDIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8qKlxuICogQ29udmVydCB0aGUgQ1NWIHRvIGFuIGFycmF5IHVzaW5nIHRoZSBoZWFkZXIgcm93IGFzIGtleXNcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgVGhlIHN0cmluZyBjb250YWluaW5nIHRoZSBDU1YgZGF0YVxuICogQHBhcmFtIHtzdHJpbmd9IGRlbGltaXRlciBUaGUgZGVsaW1pdGVyIHNlcGFyYXRpbmcgdGhlIENTViBjb2x1bW5zXG4gKi9cbmZ1bmN0aW9uIGNzdlRvQXJyYXkoc3RyKSB7XG4gIC8vIE1hdGNoZXMgQ1NWIGRhdGEgdW50aWwgdGhlIGVuZCBvZiB0aGUgaGVhZGVyIHJvd1xuICBjb25zdCBkZWxpbWl0ZXIgPSAvLCg/PSg/Oig/OlteXCJdKlwiKXsyfSkqW15cIl0qJCkvO1xuICAvLyBTcGxpdCB0aGUgaGVhZGVyIHJvdyBpbnRvIHRoZSBoZWFkZXIgdmFyaWFibGVcbiAgY29uc3QgaGVhZGVycyA9IHN0clxuICAgIC5zbGljZSgwLCBzdHIuaW5kZXhPZihcIlxcblwiKSlcbiAgICAudG9Mb3dlckNhc2UoKVxuICAgIC5zcGxpdChkZWxpbWl0ZXIpO1xuICBoZWFkZXJzLnNwbGljZSgxLCAwLCBcIm1lbW9cIik7XG5cbiAgLy8gU2xpY2UgdGhlIENTViBkYXRhIGZyb20gdGhlIGVuZCBvZiB0aGUgaGVhZGVyICgrMSkgYW5kIHRoZW4gc3BsaXQgYXQgZWFjaCByb3dcbiAgLy8gQWxzbyByZW1vdmVzIGFueSBlbXB0eSBsaW5lc1xuICBjb25zdCByb3dzID0gc3RyXG4gICAgLnNsaWNlKHN0ci5pbmRleE9mKFwiXFxuXCIpICsgMSlcbiAgICAuc3BsaXQoXCJcXG5cIilcbiAgICAuZmlsdGVyKGZ1bmN0aW9uIChlbCkge1xuICAgICAgcmV0dXJuIGVsO1xuICAgIH0pO1xuXG4gIC8vIE1hcCB0aGUgcm93cyBpbnRvIHRoZWlyIG93biBrZXk6dmFsdWUgcGFpcnMgaW5zaWRlIGEgbmV3IG9iamVjdFxuICBjb25zdCBhcnIgPSByb3dzLm1hcChmdW5jdGlvbiAocm93KSB7XG4gICAgY29uc3QgdmFsdWVzID0gcm93LnNwbGl0KGRlbGltaXRlcik7XG4gICAgdmFsdWVzLnNwbGljZSgxLCAwLCBcIlwiKTtcbiAgICBjb25zdCBlbCA9IGhlYWRlcnMucmVkdWNlKGZ1bmN0aW9uIChvYmplY3QsIGhlYWRlciwgaW5kZXgpIHtcbiAgICAgIG1vZGlmeVZhbHVlcyhvYmplY3QsIGhlYWRlciwgdmFsdWVzW2luZGV4XSk7XG4gICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH0sIHt9KTtcbiAgICByZXR1cm4gZWw7XG4gIH0pO1xuICByZXR1cm4gYXJyO1xufVxuXG4vKipcbiAqIFRha2UgdGhlIHJhdyBDU1YgZGF0YSBhbmQgbWFuaXB1bGF0ZSBpdCBpbnRvIGEgdXNhYmxlIGZvcm1hdFxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3QgYW4gb2JqZWN0IGNvbnRhaW5pbmcgYSBzaW5nbGUgcm93IG9mIENTViBkYXRhXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IHRoZSBrZXkgZm9yIHRoZSBjdXJyZW50IGl0ZW1cbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSB0aGUgdmFsdWUgb2YgdGhlIGN1cnJlbnQgaXRlbVxuICovXG5mdW5jdGlvbiBtb2RpZnlWYWx1ZXMob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIC8vIFN0cmlwIGRvdWJsZSBxdW90ZXMgZnJvbSBhbnkgc3RyaW5nc1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9cIihbXlwiXSsoPz1cIikpXCIvZywgXCIkMVwiKTtcbiAgfVxuICBsZXQgbWVtbyA9IFwiXCI7XG4gIHN3aXRjaCAoa2V5KSB7XG4gICAgY2FzZSBcImRhdGVcIjpcbiAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvKFxcZHs0fSkoXFxkezJ9KShcXGR7Mn0pLywgXCIkMy0kMi0kMVwiKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJkZXNjcmlwdGlvblwiOlxuICAgICAgaWYgKHZhbHVlLnN0YXJ0c1dpdGgoXCJQT1NcIiwgMCkpIHtcbiAgICAgICAgb2JqZWN0W1wibWVtb1wiXSA9IGBcIiR7dmFsdWUuc3Vic3RyKDAsIHZhbHVlLmluZGV4T2YoXCIpIFwiKSArIDEpfVwiYDtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5zdWJzdHIodmFsdWUuaW5kZXhPZihcIikgXCIpICsgMik7XG4gICAgICB9XG4gICAgICB2YWx1ZSA9IGBcIiR7dmFsdWV9XCJgO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICBpZiAoa2V5ICE9PSBcIm1lbW9cIikge1xuICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIH0gZWxzZSBpZiAoa2V5ID09PSBcIm1lbW9cIiAmJiAhb2JqZWN0W2tleV0pIHtcbiAgICBvYmplY3Rba2V5XSA9IGBcIiR7bWVtb31cImA7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY3N2VG9BcnJheTtcbiIsIi8qKlxuICogQ29udmVydCBhbiBvYmplY3QgaW50byBhIENTViBjb21wYXRpYmxlIEpTT04gc3RyaW5nXG4gKlxuICogQHBhcmFtIHthcnJheX0gYXJyT2JqIEFuIG9iamVjdCB0byBiZSBjb252ZXJ0ZWQgaW50byBDU1YgZGF0YVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2VuZXJhdGVDU1YoYXJyT2JqKSB7XG4gIGNvbnN0IGpzb24gPSBKU09OLnN0cmluZ2lmeShhcnJPYmopO1xuICBjb25zdCBjc3YgPSBqc29uVG9DU1YoanNvbik7XG4gIHJldHVybiBjc3Y7XG59XG5cbi8vIEpTT04gdG8gQ1NWIENvbnZlcnRlclxuZnVuY3Rpb24ganNvblRvQ1NWKGpzb24pIHtcbiAgY29uc3QgYXJyYXkgPSBKU09OLnBhcnNlKGpzb24pO1xuICBsZXQgc3RyaW5nID0gXCJcIjtcbiAgbGV0IGhlYWRlckFycmF5ID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgIGxldCByb3cgPSBcIlwiO1xuXG4gICAgZm9yIChsZXQgdmFsdWUgaW4gYXJyYXlbaV0pIHtcbiAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgIGhlYWRlckFycmF5LnB1c2godmFsdWUpO1xuICAgICAgfVxuICAgICAgaWYgKHJvdyAhPT0gXCJcIikge1xuICAgICAgICByb3cgKz0gXCIsXCI7XG4gICAgICB9XG4gICAgICByb3cgKz0gYXJyYXlbaV1bdmFsdWVdO1xuICAgIH1cblxuICAgIHN0cmluZyArPSBgJHtyb3d9XFxyXFxuYDtcbiAgfVxuXG4gIHN0cmluZyA9IGAke2hlYWRlckFycmF5LmpvaW4oKX1cXHJcXG4ke3N0cmluZ31gO1xuICByZXR1cm4gc3RyaW5nO1xufVxuXG5mdW5jdGlvbiBleHBvcnRGaWxlKGNzdiwgYnRuRWxlbWVudCkge1xuICBjb25zdCBmaWxlTmFtZSA9IFwiZXhwb3J0LmNzdlwiO1xuICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2Nzdl0sIHsgdHlwZTogXCJ0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04O1wiIH0pO1xuICBpZiAobmF2aWdhdG9yLm1zU2F2ZUJsb2IpIHtcbiAgICAvLyBJRSAxMCtcbiAgICBuYXZpZ2F0b3IubXNTYXZlQmxvYihibG9iLCBmaWxlTmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgIGlmIChsaW5rLmRvd25sb2FkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIGZlYXR1cmUgZGV0ZWN0aW9uXG4gICAgICAvLyBCcm93c2VycyB0aGF0IHN1cHBvcnQgSFRNTDUgZG93bmxvYWQgYXR0cmlidXRlXG4gICAgICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgICAgbGluay5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIHVybCk7XG4gICAgICBsaW5rLnNldEF0dHJpYnV0ZShcImRvd25sb2FkXCIsIGZpbGVOYW1lKTtcbiAgICAgIGxpbmsuY2xhc3NMaXN0LmFkZChcImJ1dHRvblwiKTtcbiAgICAgIGxpbmsudGV4dENvbnRlbnQgPSBcIkRvd25sb2FkIENTVlwiO1xuICAgICAgYnRuRWxlbWVudC5pbm5lckhUTUwgPSBsaW5rLm91dGVySFRNTDtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHsgZ2VuZXJhdGVDU1YsIGV4cG9ydEZpbGUgfTtcbiIsIi8qKlxuICogVGFrZSBhbiBhcnJheSBvZiBvYmplY3RzIGFuZCBnZW5lcmF0ZSB0YWJsZSBtYXJrdXBcbiAqXG4gKiBAcGFyYW0ge2FycmF5fSBjc3ZBcnJheSBBbiBhcnJheSBvZiBvYmplY3RzIGZvciBlYWNoIGxpbmUgb2YgQ1NWIGRhdGFcbiAqIEByZXR1cm5zIHtvYmplY3R9XG4gKi9cbmZ1bmN0aW9uIGdlbmVyYXRlVGFibGUoY3N2QXJyYXkpIHtcbiAgY29uc3QgaGVhZGVycyA9IE9iamVjdC5rZXlzKGNzdkFycmF5WzBdKTtcblxuICBjb25zdCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcbiAgY29uc3QgdGhlYWQgPSB0YWJsZS5jcmVhdGVUSGVhZCgpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaGVhZGVycy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpO1xuICAgIGNvbnN0IHRoVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGhlYWRlcnNbaV0pO1xuICAgIHRoLnNldEF0dHJpYnV0ZShcImRhdGEtaGVhZGVyXCIsIGhlYWRlcnNbaV0pO1xuICAgIHRoLmFwcGVuZENoaWxkKHRoVGV4dCk7XG4gICAgdGhlYWQuYXBwZW5kQ2hpbGQodGgpO1xuICB9XG5cbiAgY29uc3QgdGJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGJvZHlcIik7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjc3ZBcnJheS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcbiAgICBjb25zdCByb3dBcnJheSA9IE9iamVjdC52YWx1ZXMoY3N2QXJyYXlbaV0pO1xuXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCByb3dBcnJheS5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcbiAgICAgIGNvbnN0IGNlbGxUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocm93QXJyYXlbal0pO1xuICAgICAgY2VsbC5hcHBlbmRDaGlsZChjZWxsVGV4dCk7XG4gICAgICBjZWxsLnNldEF0dHJpYnV0ZShcImRhdGEtaGVhZGVyXCIsIGhlYWRlcnNbal0pO1xuICAgICAgcm93LmFwcGVuZENoaWxkKGNlbGwpO1xuICAgIH1cblxuICAgIHRib2R5LmFwcGVuZENoaWxkKHJvdyk7XG4gIH1cblxuICB0YWJsZS5hcHBlbmRDaGlsZCh0Ym9keSk7XG5cbiAgcmV0dXJuIHRhYmxlLm91dGVySFRNTDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2VuZXJhdGVUYWJsZTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGNzdlRvQXJyYXkgZnJvbSBcIi4vanMvY3N2VG9BcnJheS5qc1wiO1xuaW1wb3J0IHsgZXhwb3J0RmlsZSwgZ2VuZXJhdGVDU1YgfSBmcm9tIFwiLi9qcy9nZW5lcmF0ZUNTVi5qc1wiO1xuaW1wb3J0IGdlbmVyYXRlVGFibGUgZnJvbSBcIi4vanMvZ2VuZXJhdGVUYWJsZS5qc1wiO1xuaW1wb3J0IFwiLi9zY3NzL3N0eWxlLnNjc3NcIjtcblxuY29uc3QgdXBsb2FkRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmlsZUZvcm1cIik7XG5jb25zdCBjc3ZGaWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjc3ZVcGxvYWRcIik7XG5jb25zdCBwcmV2aWV3ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmaWxlUHJldmlld1wiKTtcbmNvbnN0IGRvd25sb2FkQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkb3dubG9hZEJ0blwiKTtcblxudXBsb2FkRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgaWYgKDAgPT09IGNzdkZpbGUuZmlsZXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IGZpbGUgPSBjc3ZGaWxlLmZpbGVzWzBdO1xuXG4gIGlmIChmaWxlKSB7XG4gICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgIC8vIERlZmluZSB3aGF0IGhhcHBlbnMgb25jZSB0aGUgRmlsZVJlYWRlciBoYXMgY29tcGxldGVkIHJlYWRpbmdcbiAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIGNvbnN0IHRleHQgPSBlLnRhcmdldC5yZXN1bHQ7XG4gICAgICBjb25zdCBkYXRhID0gY3N2VG9BcnJheSh0ZXh0KTtcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgcHJldmlldy5pbm5lckhUTUwgPSBnZW5lcmF0ZVRhYmxlKGRhdGEpO1xuICAgICAgY29uc3QgY3N2Q29udGVudCA9IGdlbmVyYXRlQ1NWKGRhdGEpO1xuICAgICAgZXhwb3J0RmlsZShjc3ZDb250ZW50LCBkb3dubG9hZEJ0bik7XG4gICAgfTtcblxuICAgIHJlYWRlci5yZWFkQXNUZXh0KGZpbGUpO1xuICB9IGVsc2Uge1xuICAgIHByZXZpZXcuaW5uZXJUZXh0ID0gXCJQbGVhc2UgY2hvb3NlIGEgZmlsZVwiO1xuICB9XG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=