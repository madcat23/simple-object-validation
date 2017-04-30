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

	var _isGreaterThanOrEqual = __webpack_require__(6);

	Object.defineProperty(exports, 'isGreaterThanOrEqual', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_isGreaterThanOrEqual).default;
	  }
	});

	var _isLessThanOrEqual = __webpack_require__(8);

	Object.defineProperty(exports, 'isLessThanOrEqual', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_isLessThanOrEqual).default;
	  }
	});

	var _isBetween = __webpack_require__(9);

	Object.defineProperty(exports, 'isBetween', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_isBetween).default;
	  }
	});

	var _isRequired = __webpack_require__(10);

	Object.defineProperty(exports, 'isRequired', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_isRequired).default;
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

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var regularValidator = function regularValidator(checker, messageCreator, nameTransformer, param) {
	  return function (name) {
	    return function (value) {
	      var fieldName = nameTransformer ? nameTransformer(name) : name;
	      if (!checker(value, param)) {
	        if (!messageCreator) throw new Error('No messageCreator given for validator.');
	        return messageCreator(param, fieldName, value);
	      }
	      return undefined;
	    };
	  };
	};

	// eslint-disable-next-line max-len
	var validator = function validator(checker, _ref) {
	  var messageCreator = _ref.messageCreator,
	      nameTransformer = _ref.nameTransformer,
	      _ref$expectParameter = _ref.expectParameter,
	      expectParameter = _ref$expectParameter === undefined ? false : _ref$expectParameter;
	  return function (param) {
	    if ((typeof param === 'undefined' ? 'undefined' : _typeof(param)) === 'object') {
	      var hasMessageCreatorParam = param.hasOwnProperty('messageCreator');
	      var hasNameTransformerParam = param.hasOwnProperty('nameTransformer');

	      if (hasMessageCreatorParam || hasNameTransformerParam) {
	        // Called to customize error message
	        var messageCreatorOverride = hasMessageCreatorParam ? param.messageCreator : messageCreator;
	        var nameTransformerOverride = hasNameTransformerParam ? param.nameTransformer : nameTransformer; // eslint-disable-line max-len

	        return validator(checker, {
	          messageCreator: messageCreatorOverride,
	          nameTransformer: nameTransformerOverride,
	          expectParameter: expectParameter
	        });
	      }
	    }

	    /*
	     * Called without a param but directly with the field name:
	     *
	     * In some cases it can be useful not to expect a parameter.
	     * In these cases the validator should behave like it was
	     * already parameterized with undefined and interprete the "param"
	     * as the field name.
	     * This situation can be detected using a simple convention:
	     * If there is not an explicit configuration set ({ expectParameter: true })
	     * all parameters must be something like a number, an array or an object.
	     * If the parameter type must be of type string, expectParameter must be set
	     * to true.
	     */
	    if (typeof param === 'string' && !expectParameter) {
	      return regularValidator(checker, messageCreator, nameTransformer, undefined)(param);
	    }
	    /*
	     * Called in a regular way -> produce validator function that receives
	     * a name and returns a function that validates a value
	     */
	    return regularValidator(checker, messageCreator, nameTransformer, param);
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
	        if (typeof eachValidator !== 'function') {
	          throw new Error('Error validating ' + property + '. Given validator is not a function. \n          Maybe a validator has already been called by mistake: e. g. isValid(\'param1\')(\'param2\')(\'field name\')');
	        }

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
	        if (typeof validationResult === 'function') {
	          throw new Error('Error validating ' + property + '. Validation result is a function. \n          Maybe a validator has not been correctly parameterized (param, field name, etc.) ...');
	        }

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