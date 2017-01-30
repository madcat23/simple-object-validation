(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _validator = __webpack_require__(4);

	Object.defineProperty(exports, 'validator', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_validator).default;
	  }
	});

	var _chain = __webpack_require__(1);

	Object.defineProperty(exports, 'chain', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_chain).default;
	  }
	});

	var _assemble = __webpack_require__(2);

	Object.defineProperty(exports, 'assemble', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_assemble).default;
	  }
	});

	var _minValue = __webpack_require__(3);

	Object.defineProperty(exports, 'minValue', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_minValue).default;
	  }
	});

	var _maxValue = __webpack_require__(5);

	Object.defineProperty(exports, 'maxValue', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_maxValue).default;
	  }
	});

	var _valueBetween = __webpack_require__(6);

	Object.defineProperty(exports, 'valueBetween', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_valueBetween).default;
	  }
	});

	var _required = __webpack_require__(7);

	Object.defineProperty(exports, 'required', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_required).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (validators) {
	  return function (name) {
	    return function (value) {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = validators[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var validator = _step.value;

	          var result = validator(name)(value);
	          if (typeof result === 'string') {
	            return result;
	          }
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      return undefined;
	    };
	  };
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.default = function (validators) {
	  return function (value) {
	    var result = {};
	    for (var property in validators) {
	      if (validators.hasOwnProperty(property)) {
	        var eachValidator = validators[property];

	        // validate value:
	        var validationResult = eachValidator(value[property]);

	        // check result:
	        var resultIsEmptyObject = (typeof validationResult === 'undefined' ? 'undefined' : _typeof(validationResult)) === 'object' && Object.keys(validationResult).length === 0;
	        var resultIsUndefined = typeof validationResult === 'undefined';

	        // TODO: Array results are also possible
	        if (!resultIsUndefined && !resultIsEmptyObject) {
	          result[property] = validationResult;
	        }
	      }
	    }
	    return result;
	  };
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _validator = __webpack_require__(4);

	var _validator2 = _interopRequireDefault(_validator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (0, _validator2.default)(function (value, param) {
	  return value >= param;
	}, function (param, name) {
	  return name + ' must be greater than or equal ' + param + '.';
	});

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var validator = function validator(checker, messageCreator) {
	  return function (param) {
	    if (typeof param === 'function') {
	      // Called to customize messageCreator function
	      return validator(checker, param);
	    }
	    /*
	     * Called in a regular way -> produce validator function that receives
	     * a name and returns a function that validates a value
	     */
	    return function (name) {
	      return function (value) {
	        if (!checker(value, param)) {
	          return messageCreator(param, name, value);
	        }
	        return undefined;
	      };
	    };
	  };
	};

	exports.default = validator;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _validator = __webpack_require__(4);

	var _validator2 = _interopRequireDefault(_validator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (0, _validator2.default)(function (value, param) {
	  return value <= param;
	}, function (param, name) {
	  return name + ' must not exceed ' + param + '.';
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _validator = __webpack_require__(4);

	var _validator2 = _interopRequireDefault(_validator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (0, _validator2.default)(function (value, param) {
	  return value >= param.min && value <= param.max;
	}, function (param, name) {
	  return name + ' must be between ' + param.min + ' and ' + param.max + '.';
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _validator = __webpack_require__(4);

	var _validator2 = _interopRequireDefault(_validator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (0, _validator2.default)(function (value) {
	  return typeof value !== 'undefined' && value !== null;
	}, function (param, name) {
	  return name + ' is required.';
	});

/***/ }
/******/ ])));