/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/fetchKpis.js":
/*!*****************************!*\
  !*** ./client/fetchKpis.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _isomorphicUnfetch = __webpack_require__(/*! isomorphic-unfetch */ \"./node_modules/isomorphic-unfetch/browser.js\");\n\nvar _isomorphicUnfetch2 = _interopRequireDefault(_isomorphicUnfetch);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = () => {\n  // Check that the DOM elements exist\n  if (document.querySelector(\".kpis\")) {\n    const applicants = document.querySelector('#kpi-applicants');\n    const slots = document.querySelector('#kpi-unbooked-slots');\n    const waiting = document.querySelector('#kpi-avg-waiting-time');\n    let query = parseQuery(window.location.search);\n    fetchKpis(query.branch).then(data => {\n      applicants.innerHTML = data.applicantCount;\n      slots.innerHTML = data.unbookedSlots;\n      waiting.innerHTML = data.avgWaitingTime ? `${data.avgWaitingTime} days` : '?';\n    }).catch(data => {\n      applicants.innerHTML = '?';\n      slots.innerHTML = '?';\n      waiting.innerHTML = '?';\n    });\n  }\n};\n\nconst parseQuery = search => {\n  var query = search.substr(1);\n  var result = {};\n  query.split(\"&\").forEach(function (part) {\n    var item = part.split(\"=\");\n    result[item[0]] = decodeURIComponent(item[1]);\n  });\n  return result;\n};\n\nconst fetchKpis = async branchId => {\n  let endpoint = \"/api/kpis\";\n\n  if (branchId) {\n    endpoint = `/api/kpis/${branchId}`;\n  }\n\n  const response = await (0, _isomorphicUnfetch2.default)(endpoint);\n  const data = await response.json();\n  return data;\n};\n\n//# sourceURL=webpack:///./client/fetchKpis.js?");

/***/ }),

/***/ "./client/launchModal.js":
/*!*******************************!*\
  !*** ./client/launchModal.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = () => {\n  if (document.querySelector('#launch-modal')) {\n    const button = document.querySelector('#launch-modal');\n    const overlay = document.querySelector('.overlay');\n    const modal = document.querySelector('.reschedule-modal');\n    button.addEventListener('click', () => {\n      overlay.classList.add('visible');\n      modal.classList.add('visible');\n      document.body.style.overflow = 'hidden';\n    }); // Respond to overlay click\n\n    overlay.addEventListener('click', () => {\n      closeModal();\n    }); // Respond to ESC keypress\n\n    document.addEventListener('keyup', e => {\n      if (e.keyCode === 27) {\n        closeModal();\n      }\n    });\n\n    const closeModal = () => {\n      overlay.classList.remove('visible');\n      modal.classList.remove('visible');\n      document.body.style.overflow = '';\n    };\n  }\n};\n\n//# sourceURL=webpack:///./client/launchModal.js?");

/***/ }),

/***/ "./client/main.js":
/*!************************!*\
  !*** ./client/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _submitFilters = __webpack_require__(/*! ./submitFilters */ \"./client/submitFilters.js\");\n\nvar _submitFilters2 = _interopRequireDefault(_submitFilters);\n\nvar _launchModal = __webpack_require__(/*! ./launchModal */ \"./client/launchModal.js\");\n\nvar _launchModal2 = _interopRequireDefault(_launchModal);\n\nvar _fetchKpis = __webpack_require__(/*! ./fetchKpis */ \"./client/fetchKpis.js\");\n\nvar _fetchKpis2 = _interopRequireDefault(_fetchKpis);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nwindow.addEventListener(\"DOMContentLoaded\", () => {\n  (0, _submitFilters2.default)();\n  (0, _launchModal2.default)();\n  (0, _fetchKpis2.default)();\n});\n\n//# sourceURL=webpack:///./client/main.js?");

/***/ }),

/***/ "./client/submitFilters.js":
/*!*********************************!*\
  !*** ./client/submitFilters.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = () => {\n  if (document.querySelector(\".applicants-filters\")) {\n    // Grab DOM elements\n    const form = document.querySelector(\".applicants-filters\");\n    const sort = form.querySelector(\"select[name=sort]\");\n    const branch = form.querySelector(\"select[name=branch]\"); // When something is changed, trigger reload\n\n    form.addEventListener('change', () => {\n      window.location = `/?sort=${sort.value}&branch=${branch.value}`;\n    });\n  }\n};\n\n//# sourceURL=webpack:///./client/submitFilters.js?");

/***/ }),

/***/ "./node_modules/isomorphic-unfetch/browser.js":
/*!****************************************************!*\
  !*** ./node_modules/isomorphic-unfetch/browser.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = window.fetch || (window.fetch = __webpack_require__(/*! unfetch */ \"./node_modules/unfetch/dist/unfetch.mjs\").default || __webpack_require__(/*! unfetch */ \"./node_modules/unfetch/dist/unfetch.mjs\"));\n\n\n//# sourceURL=webpack:///./node_modules/isomorphic-unfetch/browser.js?");

/***/ }),

/***/ "./node_modules/unfetch/dist/unfetch.mjs":
/*!***********************************************!*\
  !*** ./node_modules/unfetch/dist/unfetch.mjs ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(e,n){return n=n||{},new Promise(function(t,r){var s=new XMLHttpRequest;for(var o in s.open(n.method||\"get\",e,!0),n.headers)s.setRequestHeader(o,n.headers[o]);function u(){var e,n=[],t=[],r={};return s.getAllResponseHeaders().replace(/^(.*?):[^\\S\\n]*([\\s\\S]*?)$/gm,function(s,o,u){n.push(o=o.toLowerCase()),t.push([o,u]),r[o]=(e=r[o])?e+\",\"+u:u}),{ok:2==(s.status/100|0),status:s.status,statusText:s.statusText,url:s.responseURL,clone:u,text:function(){return Promise.resolve(s.responseText)},json:function(){return Promise.resolve(s.responseText).then(JSON.parse)},blob:function(){return Promise.resolve(new Blob([s.response]))},headers:{keys:function(){return n},entries:function(){return t},get:function(e){return r[e.toLowerCase()]},has:function(e){return e.toLowerCase()in r}}}}s.withCredentials=\"include\"==n.credentials,s.onload=function(){t(u())},s.onerror=r,s.send(n.body||null)})});;\n//# sourceMappingURL=unfetch.mjs.map\n\n\n//# sourceURL=webpack:///./node_modules/unfetch/dist/unfetch.mjs?");

/***/ })

/******/ });