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
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./demos/src/demo-kitchen-sink.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./demos/src/demo-kitchen-sink.js":
/*!****************************************!*\
  !*** ./demos/src/demo-kitchen-sink.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction loadScript(name, fn) {\n    var head = document.getElementsByTagName('head')[0],\n        script = document.createElement('script');\n\n    script.type = 'text/javascript';\n    script.charset = 'utf-8';\n    script.defer = true;\n    script.src = name + '.js';\n    head.appendChild(script);\n    fn && fn();\n}\nwindow.onload = function () {\n\n    loadScript('/britecharts/scripts/demo-stacked-area');\n    loadScript('/britecharts/scripts/demo-bar');\n    loadScript('/britecharts/scripts/demo-stacked-bar');\n    loadScript('/britecharts/scripts/demo-grouped-bar');\n    loadScript('/britecharts/scripts/demo-donut');\n    loadScript('/britecharts/scripts/demo-line');\n    loadScript('/britecharts/scripts/demo-sparkline');\n    loadScript('/britecharts/scripts/demo-step');\n    loadScript('/britecharts/scripts/demo-brush');\n    loadScript('/britecharts/scripts/demo-scatter-plot');\n    loadScript('/britecharts/scripts/demo-bullet');\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9kZW1vcy9zcmMvZGVtby1raXRjaGVuLXNpbmsuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9kZW1vcy9zcmMvZGVtby1raXRjaGVuLXNpbmsuanM/ODUxMiJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGxvYWRTY3JpcHQobmFtZSwgZm4pIHtcbiAgICB2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0sXG4gICAgICAgIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG4gICAgc2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiAgICBzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG4gICAgc2NyaXB0LmRlZmVyID0gdHJ1ZTtcbiAgICBzY3JpcHQuc3JjID0gbmFtZSArICcuanMnO1xuICAgIGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICBmbiAmJiBmbigpO1xufVxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcblxuICAgIGxvYWRTY3JpcHQoJy9icml0ZWNoYXJ0cy9zY3JpcHRzL2RlbW8tc3RhY2tlZC1hcmVhJyk7XG4gICAgbG9hZFNjcmlwdCgnL2JyaXRlY2hhcnRzL3NjcmlwdHMvZGVtby1iYXInKTtcbiAgICBsb2FkU2NyaXB0KCcvYnJpdGVjaGFydHMvc2NyaXB0cy9kZW1vLXN0YWNrZWQtYmFyJyk7XG4gICAgbG9hZFNjcmlwdCgnL2JyaXRlY2hhcnRzL3NjcmlwdHMvZGVtby1ncm91cGVkLWJhcicpO1xuICAgIGxvYWRTY3JpcHQoJy9icml0ZWNoYXJ0cy9zY3JpcHRzL2RlbW8tZG9udXQnKTtcbiAgICBsb2FkU2NyaXB0KCcvYnJpdGVjaGFydHMvc2NyaXB0cy9kZW1vLWxpbmUnKTtcbiAgICBsb2FkU2NyaXB0KCcvYnJpdGVjaGFydHMvc2NyaXB0cy9kZW1vLXNwYXJrbGluZScpO1xuICAgIGxvYWRTY3JpcHQoJy9icml0ZWNoYXJ0cy9zY3JpcHRzL2RlbW8tc3RlcCcpO1xuICAgIGxvYWRTY3JpcHQoJy9icml0ZWNoYXJ0cy9zY3JpcHRzL2RlbW8tYnJ1c2gnKTtcbiAgICBsb2FkU2NyaXB0KCcvYnJpdGVjaGFydHMvc2NyaXB0cy9kZW1vLXNjYXR0ZXItcGxvdCcpO1xuICAgIGxvYWRTY3JpcHQoJy9icml0ZWNoYXJ0cy9zY3JpcHRzL2RlbW8tYnVsbGV0Jyk7XG59OyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./demos/src/demo-kitchen-sink.js\n");

/***/ })

/******/ });