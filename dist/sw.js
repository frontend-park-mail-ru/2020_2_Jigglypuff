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
/******/ 	__webpack_require__.p = "/static/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/services/ServiceWorker.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/services/ServiceWorker.js":
/*!***************************************!*\
  !*** ./src/services/ServiceWorker.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const CACHE_NAME = 'CinemaScope_serviceWorker_2020_2-v1';\n\nconst cacheUrls = [\n    '/',\n    '/static/index.html',\n    '/static/index.js',\n    'css/index.css',\n    'css/vars.css',\n    'img/button/playButton.svg',\n    'img/icons/favicon.svg',\n    'img/favicon.svg',\n    'img/logo.png',\n    'img/NoAvatar.jpg',\n    'img/ticket.svg',\n];\n\nself.addEventListener('install', (event) => {\n    event.waitUntil(\n        caches.open(CACHE_NAME)\n            .then((cache) => {\n                return cache.addAll(cacheUrls);\n            })\n            .catch((err) => {\n                console.error('failed to open caches: ', err);\n            }),\n    );\n});\n\nself.addEventListener('fetch', (event) => {\n    if (navigator.onLine) {\n        return fetch(event.request);\n    }\n\n    event.respondWith(\n        caches\n            .match(event.request)\n            .then((cachedResponse) => {\n                if (cachedResponse) {\n                    return cachedResponse;\n                }\n\n                return fetch(event.request);\n            })\n            .catch((err) => {\n                console.error('failed to match caches: ', err);\n            }),\n    );\n});\n\n\n//# sourceURL=webpack:///./src/services/ServiceWorker.js?");

/***/ })

/******/ });