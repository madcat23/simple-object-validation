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

	var _validator = __webpack_require__(1);

	Object.defineProperty(exports, 'validator', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_validator).default;
	  }
	});

	var _assemble = __webpack_require__(2);

	Object.defineProperty(exports, 'assemble', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_assemble).default;
	  }
	});

	var _chain = __webpack_require__(3);

	Object.defineProperty(exports, 'chain', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_chain).default;
	  }
	});

	var _match = __webpack_require__(4);

	Object.defineProperty(exports, 'match', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_match).default;
	  }
	});

	var _each = __webpack_require__(5);

	Object.defineProperty(exports, 'each', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_each).default;
	  }
	});

	var _greaterThanOrEqual = __webpack_require__(6);

	Object.defineProperty(exports, 'greaterThanOrEqual', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_greaterThanOrEqual).default;
	  }
	});

	var _lessThanOrEqual = __webpack_require__(8);

	Object.defineProperty(exports, 'lessThanOrEqual', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_lessThanOrEqual).default;
	  }
	});

	var _between = __webpack_require__(9);

	Object.defineProperty(exports, 'between', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_between).default;
	  }
	});

	var _required = __webpack_require__(10);

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
	var regularValidator = function regularValidator(checker, messageCreator, param) {
	  return function (name) {
	    return function (value) {
	      if (!checker(value, param)) {
	        return messageCreator(param, name, value);
	      }
	      return undefined;
	    };
	  };
	};

	var validator = function validator(checker, messageCreator) {
	  return function (param) {
	    if (typeof param === 'function') {
	      // Called to customize messageCreator function
	      return validator(checker, param);
	    }
	    /*
	     * Called without a config param but directly with the field name.
	     * It is a convention that no configuration can be passed in as a string.
	     * Every configuration object must be a number, an object or an array.
	     * If no configuration is necessary it can be omitted.
	     */
	    if (typeof param === 'string') {
	      return regularValidator(checker, messageCreator, undefined)(param);
	    }
	    /*
	     * Called in a regular way -> produce validator function that receives
	     * a name and returns a function that validates a value
	     */
	    return regularValidator(checker, messageCreator, param);
	  };
	};

	exports.default = validator;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.default = function (validators, options) {
	  return function (value) {
	    var valueIsUndefined = typeof value === 'undefined' || value == null;
	    /*
	     * In some cases it can be ok if the object that should be validated is undefined.
	     * But this should be specified with a flag (ignoreIfMissing).
	     */
	    if (valueIsUndefined && (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' && options.ignoreIfMissing === true) {
	      return {};
	    }

	    var result = {};
	    for (var property in validators) {
	      if (validators.hasOwnProperty(property)) {
	        var eachValidator = validators[property];

	        var nestedValue = void 0;
	        /*
	         * if the object itself is undefined, all the assembled validators are called with undefined
	         * as well so that an error object for all the implicitly missing nested values can still be
	         * created.
	         */
	        if (!valueIsUndefined) {
	          // Typical case:
	          nestedValue = value[property];
	        }
	        // else nestedValue = undefined

	        // validate value:
	        var validationResult = eachValidator(nestedValue);

	        // check result: (TODO: change to whitelisting!)
	        var resultIsEmptyObject = (typeof validationResult === 'undefined' ? 'undefined' : _typeof(validationResult)) === 'object' && Object.keys(validationResult).length === 0;
	        var resultIsEmptyArray = Array.isArray(validationResult) && validationResult.length === 0;
	        var resultIsUndefined = typeof validationResult === 'undefined';

	        if (!resultIsUndefined && !resultIsEmptyObject && !resultIsEmptyArray) {
	          result[property] = validationResult;
	        }
	      }
	    }
	    return result;
	  };
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	// TODO: allow multiple results?
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
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (validators) {
	  return function (values) {
	    return values.map(function (value, index) {
	      return validators[index](value);
	    });
	  };
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (getValidator) {
	  return function (values) {
	    return values.map(function (value, index) {
	      return getValidator(index)(value);
	    });
	  };
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _validator = __webpack_require__(1);

	var _validator2 = _interopRequireDefault(_validator);

	var _utils = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (0, _validator2.default)(function (value, param) {
	  if ((0, _utils.isValueEmpty)(value)) return true;
	  if (!(0, _utils.isValueNumeric)(value)) return false;

	  return value >= param;
	}, function (param, name) {
	  return name + ' must be greater than or equal ' + param + '.';
	});

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var isValueEmpty = exports.isValueEmpty = function isValueEmpty(value) {
	  return typeof value === 'undefined' || value === null || typeof value === 'string' && value === '';
	};
	var isValueNumeric = exports.isValueNumeric = function isValueNumeric(value) {
	  return !isNaN(parseFloat(value)) && isFinite(value);
	};
	var isValueAlphaNumeric = exports.isValueAlphaNumeric = function isValueAlphaNumeric(value) {
	  return (/^[a-z0-9]+$/i.test(value)
	  );
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _validator = __webpack_require__(1);

	var _validator2 = _interopRequireDefault(_validator);

	var _utils = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (0, _validator2.default)(function (value, param) {
	  if ((0, _utils.isValueEmpty)(value)) return true;
	  if (!(0, _utils.isValueNumeric)(value)) return false;

	  return value <= param;
	}, function (param, name) {
	  return name + ' must be less than or equal ' + param + '.';
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _validator = __webpack_require__(1);

	var _validator2 = _interopRequireDefault(_validator);

	var _utils = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (0, _validator2.default)(function (value, param) {
	  if ((0, _utils.isValueEmpty)(value)) return true;
	  if (!(0, _utils.isValueNumeric)(value)) return false;

	  return value >= param.min && value <= param.max;
	}, function (param, name) {
	  return name + ' must be between ' + param.min + ' and ' + param.max + '.';
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _validator = __webpack_require__(1);

	var _validator2 = _interopRequireDefault(_validator);

	var _utils = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (0, _validator2.default)(function (value) {
	  return !(0, _utils.isValueEmpty)(value);
	}, function (param, name) {
	  return name + ' is required.';
	});

/***/ }
/******/ ])));