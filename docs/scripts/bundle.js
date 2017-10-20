/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	__webpack_require__(6);
	__webpack_require__(41);
	__webpack_require__(48);
	__webpack_require__(55);
	__webpack_require__(67);
	__webpack_require__(71);
	__webpack_require__(75);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	
	    var _ = __webpack_require__(3),
	        d3Selection = __webpack_require__(4),
	        PubSub = __webpack_require__(5),
	        debounceDelay = 200,
	        cachedWidth = window.innerWidth;
	
	    d3Selection.select(window).on('resize', _.debounce(function () {
	        var newWidth = window.innerWidth;
	
	        if (cachedWidth !== newWidth) {
	            cachedWidth = newWidth;
	            PubSub.publish('resize');
	        }
	    }, debounceDelay));
	
	    return {};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.
	
	(function() {
	
	  // Baseline setup
	  // --------------
	
	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;
	
	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;
	
	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
	
	  // Create quick reference variables for speed access to core prototypes.
	  var
	    push             = ArrayProto.push,
	    slice            = ArrayProto.slice,
	    toString         = ObjProto.toString,
	    hasOwnProperty   = ObjProto.hasOwnProperty;
	
	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var
	    nativeIsArray      = Array.isArray,
	    nativeKeys         = Object.keys,
	    nativeBind         = FuncProto.bind,
	    nativeCreate       = Object.create;
	
	  // Naked function reference for surrogate-prototype-swapping.
	  var Ctor = function(){};
	
	  // Create a safe reference to the Underscore object for use below.
	  var _ = function(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };
	
	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }
	
	  // Current version.
	  _.VERSION = '1.8.3';
	
	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var optimizeCb = function(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1: return function(value) {
	        return func.call(context, value);
	      };
	      case 2: return function(value, other) {
	        return func.call(context, value, other);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(context, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(context, accumulator, value, index, collection);
	      };
	    }
	    return function() {
	      return func.apply(context, arguments);
	    };
	  };
	
	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  var cb = function(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
	    if (_.isObject(value)) return _.matcher(value);
	    return _.property(value);
	  };
	  _.iteratee = function(value, context) {
	    return cb(value, context, Infinity);
	  };
	
	  // An internal function for creating assigner functions.
	  var createAssigner = function(keysFunc, undefinedOnly) {
	    return function(obj) {
	      var length = arguments.length;
	      if (length < 2 || obj == null) return obj;
	      for (var index = 1; index < length; index++) {
	        var source = arguments[index],
	            keys = keysFunc(source),
	            l = keys.length;
	        for (var i = 0; i < l; i++) {
	          var key = keys[i];
	          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
	        }
	      }
	      return obj;
	    };
	  };
	
	  // An internal function for creating a new object that inherits from another.
	  var baseCreate = function(prototype) {
	    if (!_.isObject(prototype)) return {};
	    if (nativeCreate) return nativeCreate(prototype);
	    Ctor.prototype = prototype;
	    var result = new Ctor;
	    Ctor.prototype = null;
	    return result;
	  };
	
	  var property = function(key) {
	    return function(obj) {
	      return obj == null ? void 0 : obj[key];
	    };
	  };
	
	  // Helper for collection methods to determine whether a collection
	  // should be iterated as an array or as an object
	  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	  var getLength = property('length');
	  var isArrayLike = function(collection) {
	    var length = getLength(collection);
	    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	  };
	
	  // Collection Functions
	  // --------------------
	
	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function(obj, iteratee, context) {
	    iteratee = optimizeCb(iteratee, context);
	    var i, length;
	    if (isArrayLike(obj)) {
	      for (i = 0, length = obj.length; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };
	
	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length);
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };
	
	  // Create a reducing function iterating left or right.
	  function createReduce(dir) {
	    // Optimized iterator function as using arguments.length
	    // in the main function will deoptimize the, see #1991.
	    function iterator(obj, iteratee, memo, keys, index, length) {
	      for (; index >= 0 && index < length; index += dir) {
	        var currentKey = keys ? keys[index] : index;
	        memo = iteratee(memo, obj[currentKey], currentKey, obj);
	      }
	      return memo;
	    }
	
	    return function(obj, iteratee, memo, context) {
	      iteratee = optimizeCb(iteratee, context, 4);
	      var keys = !isArrayLike(obj) && _.keys(obj),
	          length = (keys || obj).length,
	          index = dir > 0 ? 0 : length - 1;
	      // Determine the initial value if none is provided.
	      if (arguments.length < 3) {
	        memo = obj[keys ? keys[index] : index];
	        index += dir;
	      }
	      return iterator(obj, iteratee, memo, keys, index, length);
	    };
	  }
	
	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = createReduce(1);
	
	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = createReduce(-1);
	
	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function(obj, predicate, context) {
	    var key;
	    if (isArrayLike(obj)) {
	      key = _.findIndex(obj, predicate, context);
	    } else {
	      key = _.findKey(obj, predicate, context);
	    }
	    if (key !== void 0 && key !== -1) return obj[key];
	  };
	
	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function(obj, predicate, context) {
	    var results = [];
	    predicate = cb(predicate, context);
	    _.each(obj, function(value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };
	
	  // Return all the elements for which a truth test fails.
	  _.reject = function(obj, predicate, context) {
	    return _.filter(obj, _.negate(cb(predicate)), context);
	  };
	
	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };
	
	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };
	
	  // Determine if the array or object contains a given item (using `===`).
	  // Aliased as `includes` and `include`.
	  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
	    if (!isArrayLike(obj)) obj = _.values(obj);
	    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	    return _.indexOf(obj, item, fromIndex) >= 0;
	  };
	
	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function(obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function(value) {
	      var func = isFunc ? method : value[method];
	      return func == null ? func : func.apply(value, args);
	    });
	  };
	
	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function(obj, key) {
	    return _.map(obj, _.property(key));
	  };
	
	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function(obj, attrs) {
	    return _.filter(obj, _.matcher(attrs));
	  };
	
	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function(obj, attrs) {
	    return _.find(obj, _.matcher(attrs));
	  };
	
	  // Return the maximum element (or element-based computation).
	  _.max = function(obj, iteratee, context) {
	    var result = -Infinity, lastComputed = -Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };
	
	  // Return the minimum element (or element-based computation).
	  _.min = function(obj, iteratee, context) {
	    var result = Infinity, lastComputed = Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };
	
	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function(obj) {
	    var set = isArrayLike(obj) ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };
	
	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function(obj, n, guard) {
	    if (n == null || guard) {
	      if (!isArrayLike(obj)) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };
	
	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    return _.pluck(_.map(obj, function(value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function(left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };
	
	  // An internal function used for aggregate "group by" operations.
	  var group = function(behavior) {
	    return function(obj, iteratee, context) {
	      var result = {};
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };
	
	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
	  });
	
	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function(result, value, key) {
	    result[key] = value;
	  });
	
	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key]++; else result[key] = 1;
	  });
	
	  // Safely create a real, live array from anything iterable.
	  _.toArray = function(obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (isArrayLike(obj)) return _.map(obj, _.identity);
	    return _.values(obj);
	  };
	
	  // Return the number of elements in an object.
	  _.size = function(obj) {
	    if (obj == null) return 0;
	    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
	  };
	
	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var pass = [], fail = [];
	    _.each(obj, function(value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };
	
	  // Array Functions
	  // ---------------
	
	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    return _.initial(array, array.length - n);
	  };
	
	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N.
	  _.initial = function(array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };
	
	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array.
	  _.last = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return _.rest(array, Math.max(0, array.length - n));
	  };
	
	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array.
	  _.rest = _.tail = _.drop = function(array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };
	
	  // Trim out all falsy values from an array.
	  _.compact = function(array) {
	    return _.filter(array, _.identity);
	  };
	
	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function(input, shallow, strict, startIndex) {
	    var output = [], idx = 0;
	    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
	      var value = input[i];
	      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
	        //flatten current level of array or arguments object
	        if (!shallow) value = flatten(value, shallow, strict);
	        var j = 0, len = value.length;
	        output.length += len;
	        while (j < len) {
	          output[idx++] = value[j++];
	        }
	      } else if (!strict) {
	        output[idx++] = value;
	      }
	    }
	    return output;
	  };
	
	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function(array, shallow) {
	    return flatten(array, shallow, false);
	  };
	
	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function(array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };
	
	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = cb(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var value = array[i],
	          computed = iteratee ? iteratee(value, i, array) : value;
	      if (isSorted) {
	        if (!i || seen !== computed) result.push(value);
	        seen = computed;
	      } else if (iteratee) {
	        if (!_.contains(seen, computed)) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (!_.contains(result, value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  };
	
	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function() {
	    return _.uniq(flatten(arguments, true, true));
	  };
	
	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function(array) {
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };
	
	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function(array) {
	    var rest = flatten(arguments, true, true, 1);
	    return _.filter(array, function(value){
	      return !_.contains(rest, value);
	    });
	  };
	
	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function() {
	    return _.unzip(arguments);
	  };
	
	  // Complement of _.zip. Unzip accepts an array of arrays and groups
	  // each array's elements on shared indices
	  _.unzip = function(array) {
	    var length = array && _.max(array, getLength).length || 0;
	    var result = Array(length);
	
	    for (var index = 0; index < length; index++) {
	      result[index] = _.pluck(array, index);
	    }
	    return result;
	  };
	
	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function(list, values) {
	    var result = {};
	    for (var i = 0, length = getLength(list); i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };
	
	  // Generator function to create the findIndex and findLastIndex functions
	  function createPredicateIndexFinder(dir) {
	    return function(array, predicate, context) {
	      predicate = cb(predicate, context);
	      var length = getLength(array);
	      var index = dir > 0 ? 0 : length - 1;
	      for (; index >= 0 && index < length; index += dir) {
	        if (predicate(array[index], index, array)) return index;
	      }
	      return -1;
	    };
	  }
	
	  // Returns the first index on an array-like that passes a predicate test
	  _.findIndex = createPredicateIndexFinder(1);
	  _.findLastIndex = createPredicateIndexFinder(-1);
	
	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function(array, obj, iteratee, context) {
	    iteratee = cb(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0, high = getLength(array);
	    while (low < high) {
	      var mid = Math.floor((low + high) / 2);
	      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
	    }
	    return low;
	  };
	
	  // Generator function to create the indexOf and lastIndexOf functions
	  function createIndexFinder(dir, predicateFind, sortedIndex) {
	    return function(array, item, idx) {
	      var i = 0, length = getLength(array);
	      if (typeof idx == 'number') {
	        if (dir > 0) {
	            i = idx >= 0 ? idx : Math.max(idx + length, i);
	        } else {
	            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
	        }
	      } else if (sortedIndex && idx && length) {
	        idx = sortedIndex(array, item);
	        return array[idx] === item ? idx : -1;
	      }
	      if (item !== item) {
	        idx = predicateFind(slice.call(array, i, length), _.isNaN);
	        return idx >= 0 ? idx + i : -1;
	      }
	      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
	        if (array[idx] === item) return idx;
	      }
	      return -1;
	    };
	  }
	
	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
	  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);
	
	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function(start, stop, step) {
	    if (stop == null) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;
	
	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);
	
	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }
	
	    return range;
	  };
	
	  // Function (ahem) Functions
	  // ------------------
	
	  // Determines whether to execute a function as a constructor
	  // or a normal function with the provided arguments
	  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
	    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
	    var self = baseCreate(sourceFunc.prototype);
	    var result = sourceFunc.apply(self, args);
	    if (_.isObject(result)) return result;
	    return self;
	  };
	
	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function(func, context) {
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    var args = slice.call(arguments, 2);
	    var bound = function() {
	      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
	    };
	    return bound;
	  };
	
	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function(func) {
	    var boundArgs = slice.call(arguments, 1);
	    var bound = function() {
	      var position = 0, length = boundArgs.length;
	      var args = Array(length);
	      for (var i = 0; i < length; i++) {
	        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
	      }
	      while (position < arguments.length) args.push(arguments[position++]);
	      return executeBound(func, bound, this, this, args);
	    };
	    return bound;
	  };
	
	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function(obj) {
	    var i, length = arguments.length, key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };
	
	  // Memoize an expensive function by storing its results.
	  _.memoize = function(func, hasher) {
	    var memoize = function(key) {
	      var cache = memoize.cache;
	      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };
	
	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function(func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function(){
	      return func.apply(null, args);
	    }, wait);
	  };
	
	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = _.partial(_.delay, _, 1);
	
	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function(func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function() {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        if (timeout) {
	          clearTimeout(timeout);
	          timeout = null;
	        }
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };
	
	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;
	
	    var later = function() {
	      var last = _.now() - timestamp;
	
	      if (last < wait && last >= 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };
	
	    return function() {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }
	
	      return result;
	    };
	  };
	
	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function(func, wrapper) {
	    return _.partial(wrapper, func);
	  };
	
	  // Returns a negated version of the passed-in predicate.
	  _.negate = function(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    };
	  };
	
	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function() {
	    var args = arguments;
	    var start = args.length - 1;
	    return function() {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) result = args[i].call(this, result);
	      return result;
	    };
	  };
	
	  // Returns a function that will only be executed on and after the Nth call.
	  _.after = function(times, func) {
	    return function() {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };
	
	  // Returns a function that will only be executed up to (but not including) the Nth call.
	  _.before = function(times, func) {
	    var memo;
	    return function() {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      }
	      if (times <= 1) func = null;
	      return memo;
	    };
	  };
	
	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);
	
	  // Object Functions
	  // ----------------
	
	  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
	  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
	                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
	
	  function collectNonEnumProps(obj, keys) {
	    var nonEnumIdx = nonEnumerableProps.length;
	    var constructor = obj.constructor;
	    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;
	
	    // Constructor is a special case.
	    var prop = 'constructor';
	    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);
	
	    while (nonEnumIdx--) {
	      prop = nonEnumerableProps[nonEnumIdx];
	      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
	        keys.push(prop);
	      }
	    }
	  }
	
	  // Retrieve the names of an object's own properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) if (_.has(obj, key)) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };
	
	  // Retrieve all the property names of an object.
	  _.allKeys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    var keys = [];
	    for (var key in obj) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };
	
	  // Retrieve the values of an object's properties.
	  _.values = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };
	
	  // Returns the results of applying the iteratee to each element of the object
	  // In contrast to _.map it returns an object
	  _.mapObject = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys =  _.keys(obj),
	          length = keys.length,
	          results = {},
	          currentKey;
	      for (var index = 0; index < length; index++) {
	        currentKey = keys[index];
	        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
	      }
	      return results;
	  };
	
	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };
	
	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function(obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };
	
	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function(obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };
	
	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = createAssigner(_.allKeys);
	
	  // Assigns a given object with all the own properties in the passed-in object(s)
	  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	  _.extendOwn = _.assign = createAssigner(_.keys);
	
	  // Returns the first key on an object that passes a predicate test
	  _.findKey = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = _.keys(obj), key;
	    for (var i = 0, length = keys.length; i < length; i++) {
	      key = keys[i];
	      if (predicate(obj[key], key, obj)) return key;
	    }
	  };
	
	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function(object, oiteratee, context) {
	    var result = {}, obj = object, iteratee, keys;
	    if (obj == null) return result;
	    if (_.isFunction(oiteratee)) {
	      keys = _.allKeys(obj);
	      iteratee = optimizeCb(oiteratee, context);
	    } else {
	      keys = flatten(arguments, false, false, 1);
	      iteratee = function(value, key, obj) { return key in obj; };
	      obj = Object(obj);
	    }
	    for (var i = 0, length = keys.length; i < length; i++) {
	      var key = keys[i];
	      var value = obj[key];
	      if (iteratee(value, key, obj)) result[key] = value;
	    }
	    return result;
	  };
	
	   // Return a copy of the object without the blacklisted properties.
	  _.omit = function(obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(flatten(arguments, false, false, 1), String);
	      iteratee = function(value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };
	
	  // Fill in a given object with default properties.
	  _.defaults = createAssigner(_.allKeys, true);
	
	  // Creates an object that inherits from the given prototype object.
	  // If additional properties are provided then they will be added to the
	  // created object.
	  _.create = function(prototype, props) {
	    var result = baseCreate(prototype);
	    if (props) _.extendOwn(result, props);
	    return result;
	  };
	
	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };
	
	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function(obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };
	
	  // Returns whether an object has a given set of `key:value` pairs.
	  _.isMatch = function(object, attrs) {
	    var keys = _.keys(attrs), length = keys.length;
	    if (object == null) return !length;
	    var obj = Object(object);
	    for (var i = 0; i < length; i++) {
	      var key = keys[i];
	      if (attrs[key] !== obj[key] || !(key in obj)) return false;
	    }
	    return true;
	  };
	
	
	  // Internal recursive comparison function for `isEqual`.
	  var eq = function(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }
	
	    var areArrays = className === '[object Array]';
	    if (!areArrays) {
	      if (typeof a != 'object' || typeof b != 'object') return false;
	
	      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	      // from different frames are.
	      var aCtor = a.constructor, bCtor = b.constructor;
	      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
	                               _.isFunction(bCtor) && bCtor instanceof bCtor)
	                          && ('constructor' in a && 'constructor' in b)) {
	        return false;
	      }
	    }
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
	
	    // Initializing stack of traversed objects.
	    // It's done here since we only need them for objects and arrays comparison.
	    aStack = aStack || [];
	    bStack = bStack || [];
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }
	
	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);
	
	    // Recursively compare objects and arrays.
	    if (areArrays) {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      length = a.length;
	      if (length !== b.length) return false;
	      // Deep compare the contents, ignoring non-numeric properties.
	      while (length--) {
	        if (!eq(a[length], b[length], aStack, bStack)) return false;
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a), key;
	      length = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      if (_.keys(b).length !== length) return false;
	      while (length--) {
	        // Deep compare each member
	        key = keys[length];
	        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return true;
	  };
	
	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function(a, b) {
	    return eq(a, b);
	  };
	
	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function(obj) {
	    if (obj == null) return true;
	    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
	    return _.keys(obj).length === 0;
	  };
	
	  // Is a given value a DOM element?
	  _.isElement = function(obj) {
	    return !!(obj && obj.nodeType === 1);
	  };
	
	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function(obj) {
	    return toString.call(obj) === '[object Array]';
	  };
	
	  // Is a given variable an object?
	  _.isObject = function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  };
	
	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
	    _['is' + name] = function(obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });
	
	  // Define a fallback version of the method in browsers (ahem, IE < 9), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function(obj) {
	      return _.has(obj, 'callee');
	    };
	  }
	
	  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
	  // IE 11 (#1621), and in Safari 8 (#1929).
	  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
	    _.isFunction = function(obj) {
	      return typeof obj == 'function' || false;
	    };
	  }
	
	  // Is a given object a finite number?
	  _.isFinite = function(obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };
	
	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function(obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };
	
	  // Is a given value a boolean?
	  _.isBoolean = function(obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };
	
	  // Is a given value equal to null?
	  _.isNull = function(obj) {
	    return obj === null;
	  };
	
	  // Is a given variable undefined?
	  _.isUndefined = function(obj) {
	    return obj === void 0;
	  };
	
	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function(obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };
	
	  // Utility Functions
	  // -----------------
	
	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function() {
	    root._ = previousUnderscore;
	    return this;
	  };
	
	  // Keep the identity function around for default iteratees.
	  _.identity = function(value) {
	    return value;
	  };
	
	  // Predicate-generating functions. Often useful outside of Underscore.
	  _.constant = function(value) {
	    return function() {
	      return value;
	    };
	  };
	
	  _.noop = function(){};
	
	  _.property = property;
	
	  // Generates a function for a given object that returns a given property.
	  _.propertyOf = function(obj) {
	    return obj == null ? function(){} : function(key) {
	      return obj[key];
	    };
	  };
	
	  // Returns a predicate for checking whether an object has a given set of
	  // `key:value` pairs.
	  _.matcher = _.matches = function(attrs) {
	    attrs = _.extendOwn({}, attrs);
	    return function(obj) {
	      return _.isMatch(obj, attrs);
	    };
	  };
	
	  // Run a function **n** times.
	  _.times = function(n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = optimizeCb(iteratee, context, 1);
	    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	    return accum;
	  };
	
	  // Return a random integer between min and max (inclusive).
	  _.random = function(min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };
	
	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function() {
	    return new Date().getTime();
	  };
	
	   // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);
	
	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function(map) {
	    var escaper = function(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function(string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);
	
	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function(object, property, fallback) {
	    var value = object == null ? void 0 : object[property];
	    if (value === void 0) {
	      value = fallback;
	    }
	    return _.isFunction(value) ? value.call(object) : value;
	  };
	
	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function(prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };
	
	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate    : /<%([\s\S]+?)%>/g,
	    interpolate : /<%=([\s\S]+?)%>/g,
	    escape      : /<%-([\s\S]+?)%>/g
	  };
	
	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;
	
	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };
	
	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;
	
	  var escapeChar = function(match) {
	    return '\\' + escapes[match];
	  };
	
	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function(text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);
	
	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([
	      (settings.escape || noMatch).source,
	      (settings.interpolate || noMatch).source,
	      (settings.evaluate || noMatch).source
	    ].join('|') + '|$', 'g');
	
	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;
	
	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }
	
	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += "';\n";
	
	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';
	
	    source = "var __t,__p='',__j=Array.prototype.join," +
	      "print=function(){__p+=__j.call(arguments,'');};\n" +
	      source + 'return __p;\n';
	
	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }
	
	    var template = function(data) {
	      return render.call(this, data, _);
	    };
	
	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';
	
	    return template;
	  };
	
	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function(obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };
	
	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.
	
	  // Helper function to continue chaining intermediate results.
	  var result = function(instance, obj) {
	    return instance._chain ? _(obj).chain() : obj;
	  };
	
	  // Add your own custom functions to the Underscore object.
	  _.mixin = function(obj) {
	    _.each(_.functions(obj), function(name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function() {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result(this, func.apply(_, args));
	      };
	    });
	  };
	
	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);
	
	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result(this, obj);
	    };
	  });
	
	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      return result(this, method.apply(this._wrapped, arguments));
	    };
	  });
	
	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function() {
	    return this._wrapped;
	  };
	
	  // Provide unwrapping proxy for some methods used in engine operations
	  // such as arithmetic and JSON stringification.
	  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;
	
	  _.prototype.toString = function() {
	    return '' + this._wrapped;
	  };
	
	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}.call(this));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-selection/ Version 1.1.0. Copyright 2017 Mike Bostock.
	(function (global, factory) {
		 true ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';
	
	var xhtml = "http://www.w3.org/1999/xhtml";
	
	var namespaces = {
	  svg: "http://www.w3.org/2000/svg",
	  xhtml: xhtml,
	  xlink: "http://www.w3.org/1999/xlink",
	  xml: "http://www.w3.org/XML/1998/namespace",
	  xmlns: "http://www.w3.org/2000/xmlns/"
	};
	
	var namespace = function(name) {
	  var prefix = name += "", i = prefix.indexOf(":");
	  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
	  return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name;
	};
	
	function creatorInherit(name) {
	  return function() {
	    var document = this.ownerDocument,
	        uri = this.namespaceURI;
	    return uri === xhtml && document.documentElement.namespaceURI === xhtml
	        ? document.createElement(name)
	        : document.createElementNS(uri, name);
	  };
	}
	
	function creatorFixed(fullname) {
	  return function() {
	    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
	  };
	}
	
	var creator = function(name) {
	  var fullname = namespace(name);
	  return (fullname.local
	      ? creatorFixed
	      : creatorInherit)(fullname);
	};
	
	var nextId = 0;
	
	function local() {
	  return new Local;
	}
	
	function Local() {
	  this._ = "@" + (++nextId).toString(36);
	}
	
	Local.prototype = local.prototype = {
	  constructor: Local,
	  get: function(node) {
	    var id = this._;
	    while (!(id in node)) if (!(node = node.parentNode)) return;
	    return node[id];
	  },
	  set: function(node, value) {
	    return node[this._] = value;
	  },
	  remove: function(node) {
	    return this._ in node && delete node[this._];
	  },
	  toString: function() {
	    return this._;
	  }
	};
	
	var matcher = function(selector) {
	  return function() {
	    return this.matches(selector);
	  };
	};
	
	if (typeof document !== "undefined") {
	  var element = document.documentElement;
	  if (!element.matches) {
	    var vendorMatches = element.webkitMatchesSelector
	        || element.msMatchesSelector
	        || element.mozMatchesSelector
	        || element.oMatchesSelector;
	    matcher = function(selector) {
	      return function() {
	        return vendorMatches.call(this, selector);
	      };
	    };
	  }
	}
	
	var matcher$1 = matcher;
	
	var filterEvents = {};
	
	exports.event = null;
	
	if (typeof document !== "undefined") {
	  var element$1 = document.documentElement;
	  if (!("onmouseenter" in element$1)) {
	    filterEvents = {mouseenter: "mouseover", mouseleave: "mouseout"};
	  }
	}
	
	function filterContextListener(listener, index, group) {
	  listener = contextListener(listener, index, group);
	  return function(event) {
	    var related = event.relatedTarget;
	    if (!related || (related !== this && !(related.compareDocumentPosition(this) & 8))) {
	      listener.call(this, event);
	    }
	  };
	}
	
	function contextListener(listener, index, group) {
	  return function(event1) {
	    var event0 = exports.event; // Events can be reentrant (e.g., focus).
	    exports.event = event1;
	    try {
	      listener.call(this, this.__data__, index, group);
	    } finally {
	      exports.event = event0;
	    }
	  };
	}
	
	function parseTypenames(typenames) {
	  return typenames.trim().split(/^|\s+/).map(function(t) {
	    var name = "", i = t.indexOf(".");
	    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
	    return {type: t, name: name};
	  });
	}
	
	function onRemove(typename) {
	  return function() {
	    var on = this.__on;
	    if (!on) return;
	    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
	      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
	        this.removeEventListener(o.type, o.listener, o.capture);
	      } else {
	        on[++i] = o;
	      }
	    }
	    if (++i) on.length = i;
	    else delete this.__on;
	  };
	}
	
	function onAdd(typename, value, capture) {
	  var wrap = filterEvents.hasOwnProperty(typename.type) ? filterContextListener : contextListener;
	  return function(d, i, group) {
	    var on = this.__on, o, listener = wrap(value, i, group);
	    if (on) for (var j = 0, m = on.length; j < m; ++j) {
	      if ((o = on[j]).type === typename.type && o.name === typename.name) {
	        this.removeEventListener(o.type, o.listener, o.capture);
	        this.addEventListener(o.type, o.listener = listener, o.capture = capture);
	        o.value = value;
	        return;
	      }
	    }
	    this.addEventListener(typename.type, listener, capture);
	    o = {type: typename.type, name: typename.name, value: value, listener: listener, capture: capture};
	    if (!on) this.__on = [o];
	    else on.push(o);
	  };
	}
	
	var selection_on = function(typename, value, capture) {
	  var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;
	
	  if (arguments.length < 2) {
	    var on = this.node().__on;
	    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
	      for (i = 0, o = on[j]; i < n; ++i) {
	        if ((t = typenames[i]).type === o.type && t.name === o.name) {
	          return o.value;
	        }
	      }
	    }
	    return;
	  }
	
	  on = value ? onAdd : onRemove;
	  if (capture == null) capture = false;
	  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, capture));
	  return this;
	};
	
	function customEvent(event1, listener, that, args) {
	  var event0 = exports.event;
	  event1.sourceEvent = exports.event;
	  exports.event = event1;
	  try {
	    return listener.apply(that, args);
	  } finally {
	    exports.event = event0;
	  }
	}
	
	var sourceEvent = function() {
	  var current = exports.event, source;
	  while (source = current.sourceEvent) current = source;
	  return current;
	};
	
	var point = function(node, event) {
	  var svg = node.ownerSVGElement || node;
	
	  if (svg.createSVGPoint) {
	    var point = svg.createSVGPoint();
	    point.x = event.clientX, point.y = event.clientY;
	    point = point.matrixTransform(node.getScreenCTM().inverse());
	    return [point.x, point.y];
	  }
	
	  var rect = node.getBoundingClientRect();
	  return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
	};
	
	var mouse = function(node) {
	  var event = sourceEvent();
	  if (event.changedTouches) event = event.changedTouches[0];
	  return point(node, event);
	};
	
	function none() {}
	
	var selector = function(selector) {
	  return selector == null ? none : function() {
	    return this.querySelector(selector);
	  };
	};
	
	var selection_select = function(select) {
	  if (typeof select !== "function") select = selector(select);
	
	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
	      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
	        if ("__data__" in node) subnode.__data__ = node.__data__;
	        subgroup[i] = subnode;
	      }
	    }
	  }
	
	  return new Selection(subgroups, this._parents);
	};
	
	function empty() {
	  return [];
	}
	
	var selectorAll = function(selector) {
	  return selector == null ? empty : function() {
	    return this.querySelectorAll(selector);
	  };
	};
	
	var selection_selectAll = function(select) {
	  if (typeof select !== "function") select = selectorAll(select);
	
	  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        subgroups.push(select.call(node, node.__data__, i, group));
	        parents.push(node);
	      }
	    }
	  }
	
	  return new Selection(subgroups, parents);
	};
	
	var selection_filter = function(match) {
	  if (typeof match !== "function") match = matcher$1(match);
	
	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
	      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
	        subgroup.push(node);
	      }
	    }
	  }
	
	  return new Selection(subgroups, this._parents);
	};
	
	var sparse = function(update) {
	  return new Array(update.length);
	};
	
	var selection_enter = function() {
	  return new Selection(this._enter || this._groups.map(sparse), this._parents);
	};
	
	function EnterNode(parent, datum) {
	  this.ownerDocument = parent.ownerDocument;
	  this.namespaceURI = parent.namespaceURI;
	  this._next = null;
	  this._parent = parent;
	  this.__data__ = datum;
	}
	
	EnterNode.prototype = {
	  constructor: EnterNode,
	  appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
	  insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
	  querySelector: function(selector) { return this._parent.querySelector(selector); },
	  querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
	};
	
	var constant = function(x) {
	  return function() {
	    return x;
	  };
	};
	
	var keyPrefix = "$"; // Protect against keys like “__proto__”.
	
	function bindIndex(parent, group, enter, update, exit, data) {
	  var i = 0,
	      node,
	      groupLength = group.length,
	      dataLength = data.length;
	
	  // Put any non-null nodes that fit into update.
	  // Put any null nodes into enter.
	  // Put any remaining data into enter.
	  for (; i < dataLength; ++i) {
	    if (node = group[i]) {
	      node.__data__ = data[i];
	      update[i] = node;
	    } else {
	      enter[i] = new EnterNode(parent, data[i]);
	    }
	  }
	
	  // Put any non-null nodes that don’t fit into exit.
	  for (; i < groupLength; ++i) {
	    if (node = group[i]) {
	      exit[i] = node;
	    }
	  }
	}
	
	function bindKey(parent, group, enter, update, exit, data, key) {
	  var i,
	      node,
	      nodeByKeyValue = {},
	      groupLength = group.length,
	      dataLength = data.length,
	      keyValues = new Array(groupLength),
	      keyValue;
	
	  // Compute the key for each node.
	  // If multiple nodes have the same key, the duplicates are added to exit.
	  for (i = 0; i < groupLength; ++i) {
	    if (node = group[i]) {
	      keyValues[i] = keyValue = keyPrefix + key.call(node, node.__data__, i, group);
	      if (keyValue in nodeByKeyValue) {
	        exit[i] = node;
	      } else {
	        nodeByKeyValue[keyValue] = node;
	      }
	    }
	  }
	
	  // Compute the key for each datum.
	  // If there a node associated with this key, join and add it to update.
	  // If there is not (or the key is a duplicate), add it to enter.
	  for (i = 0; i < dataLength; ++i) {
	    keyValue = keyPrefix + key.call(parent, data[i], i, data);
	    if (node = nodeByKeyValue[keyValue]) {
	      update[i] = node;
	      node.__data__ = data[i];
	      nodeByKeyValue[keyValue] = null;
	    } else {
	      enter[i] = new EnterNode(parent, data[i]);
	    }
	  }
	
	  // Add any remaining nodes that were not bound to data to exit.
	  for (i = 0; i < groupLength; ++i) {
	    if ((node = group[i]) && (nodeByKeyValue[keyValues[i]] === node)) {
	      exit[i] = node;
	    }
	  }
	}
	
	var selection_data = function(value, key) {
	  if (!value) {
	    data = new Array(this.size()), j = -1;
	    this.each(function(d) { data[++j] = d; });
	    return data;
	  }
	
	  var bind = key ? bindKey : bindIndex,
	      parents = this._parents,
	      groups = this._groups;
	
	  if (typeof value !== "function") value = constant(value);
	
	  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
	    var parent = parents[j],
	        group = groups[j],
	        groupLength = group.length,
	        data = value.call(parent, parent && parent.__data__, j, parents),
	        dataLength = data.length,
	        enterGroup = enter[j] = new Array(dataLength),
	        updateGroup = update[j] = new Array(dataLength),
	        exitGroup = exit[j] = new Array(groupLength);
	
	    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);
	
	    // Now connect the enter nodes to their following update node, such that
	    // appendChild can insert the materialized enter node before this node,
	    // rather than at the end of the parent node.
	    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
	      if (previous = enterGroup[i0]) {
	        if (i0 >= i1) i1 = i0 + 1;
	        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
	        previous._next = next || null;
	      }
	    }
	  }
	
	  update = new Selection(update, parents);
	  update._enter = enter;
	  update._exit = exit;
	  return update;
	};
	
	var selection_exit = function() {
	  return new Selection(this._exit || this._groups.map(sparse), this._parents);
	};
	
	var selection_merge = function(selection) {
	
	  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
	    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
	      if (node = group0[i] || group1[i]) {
	        merge[i] = node;
	      }
	    }
	  }
	
	  for (; j < m0; ++j) {
	    merges[j] = groups0[j];
	  }
	
	  return new Selection(merges, this._parents);
	};
	
	var selection_order = function() {
	
	  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
	    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
	      if (node = group[i]) {
	        if (next && next !== node.nextSibling) next.parentNode.insertBefore(node, next);
	        next = node;
	      }
	    }
	  }
	
	  return this;
	};
	
	var selection_sort = function(compare) {
	  if (!compare) compare = ascending;
	
	  function compareNode(a, b) {
	    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
	  }
	
	  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        sortgroup[i] = node;
	      }
	    }
	    sortgroup.sort(compareNode);
	  }
	
	  return new Selection(sortgroups, this._parents).order();
	};
	
	function ascending(a, b) {
	  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
	}
	
	var selection_call = function() {
	  var callback = arguments[0];
	  arguments[0] = this;
	  callback.apply(null, arguments);
	  return this;
	};
	
	var selection_nodes = function() {
	  var nodes = new Array(this.size()), i = -1;
	  this.each(function() { nodes[++i] = this; });
	  return nodes;
	};
	
	var selection_node = function() {
	
	  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
	    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
	      var node = group[i];
	      if (node) return node;
	    }
	  }
	
	  return null;
	};
	
	var selection_size = function() {
	  var size = 0;
	  this.each(function() { ++size; });
	  return size;
	};
	
	var selection_empty = function() {
	  return !this.node();
	};
	
	var selection_each = function(callback) {
	
	  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
	    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
	      if (node = group[i]) callback.call(node, node.__data__, i, group);
	    }
	  }
	
	  return this;
	};
	
	function attrRemove(name) {
	  return function() {
	    this.removeAttribute(name);
	  };
	}
	
	function attrRemoveNS(fullname) {
	  return function() {
	    this.removeAttributeNS(fullname.space, fullname.local);
	  };
	}
	
	function attrConstant(name, value) {
	  return function() {
	    this.setAttribute(name, value);
	  };
	}
	
	function attrConstantNS(fullname, value) {
	  return function() {
	    this.setAttributeNS(fullname.space, fullname.local, value);
	  };
	}
	
	function attrFunction(name, value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) this.removeAttribute(name);
	    else this.setAttribute(name, v);
	  };
	}
	
	function attrFunctionNS(fullname, value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
	    else this.setAttributeNS(fullname.space, fullname.local, v);
	  };
	}
	
	var selection_attr = function(name, value) {
	  var fullname = namespace(name);
	
	  if (arguments.length < 2) {
	    var node = this.node();
	    return fullname.local
	        ? node.getAttributeNS(fullname.space, fullname.local)
	        : node.getAttribute(fullname);
	  }
	
	  return this.each((value == null
	      ? (fullname.local ? attrRemoveNS : attrRemove) : (typeof value === "function"
	      ? (fullname.local ? attrFunctionNS : attrFunction)
	      : (fullname.local ? attrConstantNS : attrConstant)))(fullname, value));
	};
	
	var defaultView = function(node) {
	  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
	      || (node.document && node) // node is a Window
	      || node.defaultView; // node is a Document
	};
	
	function styleRemove(name) {
	  return function() {
	    this.style.removeProperty(name);
	  };
	}
	
	function styleConstant(name, value, priority) {
	  return function() {
	    this.style.setProperty(name, value, priority);
	  };
	}
	
	function styleFunction(name, value, priority) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) this.style.removeProperty(name);
	    else this.style.setProperty(name, v, priority);
	  };
	}
	
	var selection_style = function(name, value, priority) {
	  return arguments.length > 1
	      ? this.each((value == null
	            ? styleRemove : typeof value === "function"
	            ? styleFunction
	            : styleConstant)(name, value, priority == null ? "" : priority))
	      : styleValue(this.node(), name);
	};
	
	function styleValue(node, name) {
	  return node.style.getPropertyValue(name)
	      || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
	}
	
	function propertyRemove(name) {
	  return function() {
	    delete this[name];
	  };
	}
	
	function propertyConstant(name, value) {
	  return function() {
	    this[name] = value;
	  };
	}
	
	function propertyFunction(name, value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) delete this[name];
	    else this[name] = v;
	  };
	}
	
	var selection_property = function(name, value) {
	  return arguments.length > 1
	      ? this.each((value == null
	          ? propertyRemove : typeof value === "function"
	          ? propertyFunction
	          : propertyConstant)(name, value))
	      : this.node()[name];
	};
	
	function classArray(string) {
	  return string.trim().split(/^|\s+/);
	}
	
	function classList(node) {
	  return node.classList || new ClassList(node);
	}
	
	function ClassList(node) {
	  this._node = node;
	  this._names = classArray(node.getAttribute("class") || "");
	}
	
	ClassList.prototype = {
	  add: function(name) {
	    var i = this._names.indexOf(name);
	    if (i < 0) {
	      this._names.push(name);
	      this._node.setAttribute("class", this._names.join(" "));
	    }
	  },
	  remove: function(name) {
	    var i = this._names.indexOf(name);
	    if (i >= 0) {
	      this._names.splice(i, 1);
	      this._node.setAttribute("class", this._names.join(" "));
	    }
	  },
	  contains: function(name) {
	    return this._names.indexOf(name) >= 0;
	  }
	};
	
	function classedAdd(node, names) {
	  var list = classList(node), i = -1, n = names.length;
	  while (++i < n) list.add(names[i]);
	}
	
	function classedRemove(node, names) {
	  var list = classList(node), i = -1, n = names.length;
	  while (++i < n) list.remove(names[i]);
	}
	
	function classedTrue(names) {
	  return function() {
	    classedAdd(this, names);
	  };
	}
	
	function classedFalse(names) {
	  return function() {
	    classedRemove(this, names);
	  };
	}
	
	function classedFunction(names, value) {
	  return function() {
	    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
	  };
	}
	
	var selection_classed = function(name, value) {
	  var names = classArray(name + "");
	
	  if (arguments.length < 2) {
	    var list = classList(this.node()), i = -1, n = names.length;
	    while (++i < n) if (!list.contains(names[i])) return false;
	    return true;
	  }
	
	  return this.each((typeof value === "function"
	      ? classedFunction : value
	      ? classedTrue
	      : classedFalse)(names, value));
	};
	
	function textRemove() {
	  this.textContent = "";
	}
	
	function textConstant(value) {
	  return function() {
	    this.textContent = value;
	  };
	}
	
	function textFunction(value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    this.textContent = v == null ? "" : v;
	  };
	}
	
	var selection_text = function(value) {
	  return arguments.length
	      ? this.each(value == null
	          ? textRemove : (typeof value === "function"
	          ? textFunction
	          : textConstant)(value))
	      : this.node().textContent;
	};
	
	function htmlRemove() {
	  this.innerHTML = "";
	}
	
	function htmlConstant(value) {
	  return function() {
	    this.innerHTML = value;
	  };
	}
	
	function htmlFunction(value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    this.innerHTML = v == null ? "" : v;
	  };
	}
	
	var selection_html = function(value) {
	  return arguments.length
	      ? this.each(value == null
	          ? htmlRemove : (typeof value === "function"
	          ? htmlFunction
	          : htmlConstant)(value))
	      : this.node().innerHTML;
	};
	
	function raise() {
	  if (this.nextSibling) this.parentNode.appendChild(this);
	}
	
	var selection_raise = function() {
	  return this.each(raise);
	};
	
	function lower() {
	  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
	}
	
	var selection_lower = function() {
	  return this.each(lower);
	};
	
	var selection_append = function(name) {
	  var create = typeof name === "function" ? name : creator(name);
	  return this.select(function() {
	    return this.appendChild(create.apply(this, arguments));
	  });
	};
	
	function constantNull() {
	  return null;
	}
	
	var selection_insert = function(name, before) {
	  var create = typeof name === "function" ? name : creator(name),
	      select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
	  return this.select(function() {
	    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
	  });
	};
	
	function remove() {
	  var parent = this.parentNode;
	  if (parent) parent.removeChild(this);
	}
	
	var selection_remove = function() {
	  return this.each(remove);
	};
	
	var selection_datum = function(value) {
	  return arguments.length
	      ? this.property("__data__", value)
	      : this.node().__data__;
	};
	
	function dispatchEvent(node, type, params) {
	  var window = defaultView(node),
	      event = window.CustomEvent;
	
	  if (typeof event === "function") {
	    event = new event(type, params);
	  } else {
	    event = window.document.createEvent("Event");
	    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
	    else event.initEvent(type, false, false);
	  }
	
	  node.dispatchEvent(event);
	}
	
	function dispatchConstant(type, params) {
	  return function() {
	    return dispatchEvent(this, type, params);
	  };
	}
	
	function dispatchFunction(type, params) {
	  return function() {
	    return dispatchEvent(this, type, params.apply(this, arguments));
	  };
	}
	
	var selection_dispatch = function(type, params) {
	  return this.each((typeof params === "function"
	      ? dispatchFunction
	      : dispatchConstant)(type, params));
	};
	
	var root = [null];
	
	function Selection(groups, parents) {
	  this._groups = groups;
	  this._parents = parents;
	}
	
	function selection() {
	  return new Selection([[document.documentElement]], root);
	}
	
	Selection.prototype = selection.prototype = {
	  constructor: Selection,
	  select: selection_select,
	  selectAll: selection_selectAll,
	  filter: selection_filter,
	  data: selection_data,
	  enter: selection_enter,
	  exit: selection_exit,
	  merge: selection_merge,
	  order: selection_order,
	  sort: selection_sort,
	  call: selection_call,
	  nodes: selection_nodes,
	  node: selection_node,
	  size: selection_size,
	  empty: selection_empty,
	  each: selection_each,
	  attr: selection_attr,
	  style: selection_style,
	  property: selection_property,
	  classed: selection_classed,
	  text: selection_text,
	  html: selection_html,
	  raise: selection_raise,
	  lower: selection_lower,
	  append: selection_append,
	  insert: selection_insert,
	  remove: selection_remove,
	  datum: selection_datum,
	  on: selection_on,
	  dispatch: selection_dispatch
	};
	
	var select = function(selector) {
	  return typeof selector === "string"
	      ? new Selection([[document.querySelector(selector)]], [document.documentElement])
	      : new Selection([[selector]], root);
	};
	
	var selectAll = function(selector) {
	  return typeof selector === "string"
	      ? new Selection([document.querySelectorAll(selector)], [document.documentElement])
	      : new Selection([selector == null ? [] : selector], root);
	};
	
	var touch = function(node, touches, identifier) {
	  if (arguments.length < 3) identifier = touches, touches = sourceEvent().changedTouches;
	
	  for (var i = 0, n = touches ? touches.length : 0, touch; i < n; ++i) {
	    if ((touch = touches[i]).identifier === identifier) {
	      return point(node, touch);
	    }
	  }
	
	  return null;
	};
	
	var touches = function(node, touches) {
	  if (touches == null) touches = sourceEvent().touches;
	
	  for (var i = 0, n = touches ? touches.length : 0, points = new Array(n); i < n; ++i) {
	    points[i] = point(node, touches[i]);
	  }
	
	  return points;
	};
	
	exports.creator = creator;
	exports.local = local;
	exports.matcher = matcher$1;
	exports.mouse = mouse;
	exports.namespace = namespace;
	exports.namespaces = namespaces;
	exports.select = select;
	exports.selectAll = selectAll;
	exports.selection = selection;
	exports.selector = selector;
	exports.selectorAll = selectorAll;
	exports.style = styleValue;
	exports.touch = touch;
	exports.touches = touches;
	exports.window = defaultView;
	exports.customEvent = customEvent;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*
	Copyright (c) 2010,2011,2012,2013,2014 Morgan Roderick http://roderick.dk
	License: MIT - http://mrgnrdrck.mit-license.org
	
	https://github.com/mroderick/PubSubJS
	*/
	(function (root, factory){
		'use strict';
	
		var PubSub = {};
		root.PubSub = PubSub;
		factory(PubSub);
	
		// AMD support
		if (true){
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return PubSub; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
		// CommonJS and Node.js module support
		} else if (typeof exports === 'object'){
			if (module !== undefined && module.exports) {
				exports = module.exports = PubSub; // Node.js specific `module.exports`
			}
			exports.PubSub = PubSub; // CommonJS module 1.1.1 spec
			module.exports = exports = PubSub; // CommonJS
		}
	
	}(( typeof window === 'object' && window ) || this, function (PubSub){
		'use strict';
	
		var messages = {},
			lastUid = -1;
	
		function hasKeys(obj){
			var key;
	
			for (key in obj){
				if ( obj.hasOwnProperty(key) ){
					return true;
				}
			}
			return false;
		}
	
		/**
		 *	Returns a function that throws the passed exception, for use as argument for setTimeout
		 *	@param { Object } ex An Error object
		 */
		function throwException( ex ){
			return function reThrowException(){
				throw ex;
			};
		}
	
		function callSubscriberWithDelayedExceptions( subscriber, message, data ){
			try {
				subscriber( message, data );
			} catch( ex ){
				setTimeout( throwException( ex ), 0);
			}
		}
	
		function callSubscriberWithImmediateExceptions( subscriber, message, data ){
			subscriber( message, data );
		}
	
		function deliverMessage( originalMessage, matchedMessage, data, immediateExceptions ){
			var subscribers = messages[matchedMessage],
				callSubscriber = immediateExceptions ? callSubscriberWithImmediateExceptions : callSubscriberWithDelayedExceptions,
				s;
	
			if ( !messages.hasOwnProperty( matchedMessage ) ) {
				return;
			}
	
			for (s in subscribers){
				if ( subscribers.hasOwnProperty(s)){
					callSubscriber( subscribers[s], originalMessage, data );
				}
			}
		}
	
		function createDeliveryFunction( message, data, immediateExceptions ){
			return function deliverNamespaced(){
				var topic = String( message ),
					position = topic.lastIndexOf( '.' );
	
				// deliver the message as it is now
				deliverMessage(message, message, data, immediateExceptions);
	
				// trim the hierarchy and deliver message to each level
				while( position !== -1 ){
					topic = topic.substr( 0, position );
					position = topic.lastIndexOf('.');
					deliverMessage( message, topic, data, immediateExceptions );
				}
			};
		}
	
		function messageHasSubscribers( message ){
			var topic = String( message ),
				found = Boolean(messages.hasOwnProperty( topic ) && hasKeys(messages[topic])),
				position = topic.lastIndexOf( '.' );
	
			while ( !found && position !== -1 ){
				topic = topic.substr( 0, position );
				position = topic.lastIndexOf( '.' );
				found = Boolean(messages.hasOwnProperty( topic ) && hasKeys(messages[topic]));
			}
	
			return found;
		}
	
		function publish( message, data, sync, immediateExceptions ){
			var deliver = createDeliveryFunction( message, data, immediateExceptions ),
				hasSubscribers = messageHasSubscribers( message );
	
			if ( !hasSubscribers ){
				return false;
			}
	
			if ( sync === true ){
				deliver();
			} else {
				setTimeout( deliver, 0 );
			}
			return true;
		}
	
		/**
		 *	PubSub.publish( message[, data] ) -> Boolean
		 *	- message (String): The message to publish
		 *	- data: The data to pass to subscribers
		 *	Publishes the the message, passing the data to it's subscribers
		**/
		PubSub.publish = function( message, data ){
			return publish( message, data, false, PubSub.immediateExceptions );
		};
	
		/**
		 *	PubSub.publishSync( message[, data] ) -> Boolean
		 *	- message (String): The message to publish
		 *	- data: The data to pass to subscribers
		 *	Publishes the the message synchronously, passing the data to it's subscribers
		**/
		PubSub.publishSync = function( message, data ){
			return publish( message, data, true, PubSub.immediateExceptions );
		};
	
		/**
		 *	PubSub.subscribe( message, func ) -> String
		 *	- message (String): The message to subscribe to
		 *	- func (Function): The function to call when a new message is published
		 *	Subscribes the passed function to the passed message. Every returned token is unique and should be stored if
		 *	you need to unsubscribe
		**/
		PubSub.subscribe = function( message, func ){
			if ( typeof func !== 'function'){
				return false;
			}
	
			// message is not registered yet
			if ( !messages.hasOwnProperty( message ) ){
				messages[message] = {};
			}
	
			// forcing token as String, to allow for future expansions without breaking usage
			// and allow for easy use as key names for the 'messages' object
			var token = 'uid_' + String(++lastUid);
			messages[message][token] = func;
	
			// return token for unsubscribing
			return token;
		};
	
		/* Public: Clears all subscriptions
		 */
		PubSub.clearAllSubscriptions = function clearAllSubscriptions(){
			messages = {};
		};
	
		/*Public: Clear subscriptions by the topic
		*/
		PubSub.clearSubscriptions = function clearSubscriptions(topic){
			var m;
			for (m in messages){
				if (messages.hasOwnProperty(m) && m.indexOf(topic) === 0){
					delete messages[m];
				}
			}
		};
	
		/* Public: removes subscriptions.
		 * When passed a token, removes a specific subscription.
		 * When passed a function, removes all subscriptions for that function
		 * When passed a topic, removes all subscriptions for that topic (hierarchy)
		 *
		 * value - A token, function or topic to unsubscribe.
		 *
		 * Examples
		 *
		 *		// Example 1 - unsubscribing with a token
		 *		var token = PubSub.subscribe('mytopic', myFunc);
		 *		PubSub.unsubscribe(token);
		 *
		 *		// Example 2 - unsubscribing with a function
		 *		PubSub.unsubscribe(myFunc);
		 *
		 *		// Example 3 - unsubscribing a topic
		 *		PubSub.unsubscribe('mytopic');
		 */
		PubSub.unsubscribe = function(value){
			var descendantTopicExists = function(topic) {
					var m;
					for ( m in messages ){
						if ( messages.hasOwnProperty(m) && m.indexOf(topic) === 0 ){
							// a descendant of the topic exists:
							return true;
						}
					}
	
					return false;
				},
				isTopic    = typeof value === 'string' && ( messages.hasOwnProperty(value) || descendantTopicExists(value) ),
				isToken    = !isTopic && typeof value === 'string',
				isFunction = typeof value === 'function',
				result = false,
				m, message, t;
	
			if (isTopic){
				PubSub.clearSubscriptions(value);
				return;
			}
	
			for ( m in messages ){
				if ( messages.hasOwnProperty( m ) ){
					message = messages[m];
	
					if ( isToken && message[value] ){
						delete message[value];
						result = value;
						// tokens are unique, so we can just stop here
						break;
					}
	
					if (isFunction) {
						for ( t in message ){
							if (message.hasOwnProperty(t) && message[t] === value){
								delete message[t];
								result = true;
							}
						}
					}
				}
			}
	
			return result;
		};
	}));


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var d3Selection = __webpack_require__(4),
	    PubSub = __webpack_require__(5),
	    colors = __webpack_require__(7),
	    stackedAreaChart = __webpack_require__(8),
	    tooltip = __webpack_require__(33),
	    stackedDataBuilder = __webpack_require__(34),
	    colorSelectorHelper = __webpack_require__(40);
	
	function createStackedAreaChartWithTooltip(optionalColorSchema) {
	    var stackedArea = stackedAreaChart(),
	        chartTooltip = tooltip(),
	        testDataSet = new stackedDataBuilder.StackedAreaDataBuilder(),
	        container = d3Selection.select('.js-stacked-area-chart-tooltip-container'),
	        containerWidth = container.node() ? container.node().getBoundingClientRect().width : false,
	        tooltipContainer,
	        dataset;
	
	    if (containerWidth) {
	        // dataset = testDataSet.withReportData().build();
	        // dataset = testDataSet.with3Sources().build();
	        // dataset = testDataSet.with6Sources().build();
	        dataset = testDataSet.withSalesChannelData().build();
	        // dataset = testDataSet.withLargeData().build();
	        // dataset = testDataSet.withGeneratedData().build();
	
	        // StackedAreChart Setup and start
	        stackedArea.isAnimated(true).tooltipThreshold(600).width(containerWidth).grid('horizontal').on('customMouseOver', chartTooltip.show).on('customMouseMove', chartTooltip.update).on('customMouseOut', chartTooltip.hide);
	
	        if (optionalColorSchema) {
	            stackedArea.colorSchema(optionalColorSchema);
	        }
	
	        container.datum(dataset.data).call(stackedArea);
	
	        // Tooltip Setup and start
	        chartTooltip.topicLabel('values').title('Testing tooltip');
	
	        // Note that if the viewport width is less than the tooltipThreshold value,
	        // this container won't exist, and the tooltip won't show up
	        tooltipContainer = d3Selection.select('.js-stacked-area-chart-tooltip-container .metadata-group .vertical-marker-container');
	        tooltipContainer.datum([]).call(chartTooltip);
	
	        d3Selection.select('#button').on('click', function () {
	            stackedArea.exportChart('stacked-area.png', 'Britecharts Stacked Area');
	        });
	    }
	}
	
	function createStackedAreaChartWithFixedAspectRatio(optionalColorSchema) {
	    var stackedArea = stackedAreaChart(),
	        chartTooltip = tooltip(),
	        testDataSet = new stackedDataBuilder.StackedAreaDataBuilder(),
	        container = d3Selection.select('.js-stacked-area-chart-fixed-container'),
	        containerWidth = container.node() ? container.node().getBoundingClientRect().width : false,
	        tooltipContainer,
	        dataset;
	
	    if (containerWidth) {
	        // dataset = testDataSet.withReportData().build();
	        dataset = testDataSet.with3Sources().build();
	        // dataset = testDataSet.with6Sources().build();
	        // dataset = testDataSet.withLargeData().build();
	
	        // StackedAreChart Setup and start
	        stackedArea.tooltipThreshold(600).aspectRatio(0.6).grid('full').forceAxisFormat('custom').forcedXFormat('%Y/%m/%d').forcedXTicks(2).width(containerWidth).dateLabel('dateUTC').valueLabel('views').on('customMouseOver', chartTooltip.show).on('customMouseMove', chartTooltip.update).on('customMouseOut', chartTooltip.hide);
	
	        if (optionalColorSchema) {
	            stackedArea.colorSchema(optionalColorSchema);
	        }
	
	        container.datum(dataset.data).call(stackedArea);
	
	        // Tooltip Setup and start
	        chartTooltip.topicLabel('values').title('Tooltip Title');
	
	        // Note that if the viewport width is less than the tooltipThreshold value,
	        // this container won't exist, and the tooltip won't show up
	        tooltipContainer = d3Selection.select('.js-stacked-area-chart-fixed-container .metadata-group .vertical-marker-container');
	        tooltipContainer.datum([]).call(chartTooltip);
	    }
	}
	
	if (d3Selection.select('.js-stacked-area-chart-tooltip-container').node()) {
	    // Chart creation
	    createStackedAreaChartWithTooltip();
	    createStackedAreaChartWithFixedAspectRatio();
	
	    // For getting a responsive behavior on our chart,
	    // we'll need to listen to the window resize event
	    var redrawCharts = function redrawCharts() {
	        d3Selection.selectAll('.stacked-area').remove();
	
	        createStackedAreaChartWithTooltip();
	        createStackedAreaChartWithFixedAspectRatio();
	    };
	
	    // Redraw charts on window resize
	    PubSub.subscribe('resize', redrawCharts);
	
	    // Color schema selector
	    colorSelectorHelper.createColorSelector('.js-color-selector-container', '.stacked-area', createStackedAreaChartWithTooltip);
	}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	
	    // Color Gradients
	    var britechartGradients = {
	        greenBlueGradient: ['#39C7EA', '#4CDCBA'],
	        orangePinkGradient: ['#FBC670', '#F766B8'],
	        bluePurpleGradient: ['#3DC3C9', '#824a9e']
	    };
	
	    // Color Schemas
	    // Standard Color Schema for Britecharts
	    var britechartsColorSchema = ['#6aedc7', //green
	    '#39c2c9', //blue
	    '#ffce00', //yellow
	    '#ffa71a', //orange
	    '#f866b9', //pink
	    '#998ce3' //purple
	    ];
	
	    // Grey Schema for Britecharts
	    var britechartsGreySchema = ['#F8F8FA', '#EFF2F5', '#D2D6DF', '#C3C6CF', '#ADB0B6', '#666A73', '#45494E', '#363A43', '#282C35'];
	
	    // Extended Orange Palette
	    var extendedOrangeColorSchema = ['#fcc870', '#ffa71a', '#fb8825', '#f6682f', '#db5a2c', '#bf4c28', '#a43b1c', '#892a10', '#f9e9c5'];
	    // Extended Blue Palette
	    var extendedBlueColorSchema = ['#ccf7f6', '#70e4e0', '#00d8d2', '#00acaf', '#007f8c', '#005e66', '#003c3f', '#002d2f', '#0d2223'];
	    // Extended LightBlue Palette
	    var extendedLightBlueColorSchema = ['#ccfffe', '#94f7f4', '#00fff8', '#1de1e1', '#39c2c9', '#2e9a9d', '#227270', '#1a5957', '#133f3e'];
	    // Extended Green Palette
	    var extendedGreenColorSchema = ['#edfff7', '#d7ffef', '#c0ffe7', '#95f5d7', '#6aedc7', '#59c3a3', '#479980', '#34816a', '#206953'];
	    // Extended Yellow Palette
	    var extendedYellowColorSchema = ['#f9f2b3', '#fbe986', '#fce05a', '#fed72d', '#ffce00', '#fcc11c', '#f9b438', '#eda629', '#e09819'];
	    // Extended Pink Palette
	    var extendedPinkColorSchema = ['#fdd1ea', '#fb9cd2', '#f866b9', '#fc40b6', '#ff1ab3', '#e3239d', '#c62c86', '#a62073', '#85135f'];
	    // Extended Purple Palette
	    var extendedPurpleColorSchema = ['#ddd6fc', '#bbb1f0', '#998ce3', '#8e6bc1', '#824a9e', '#77337f', '#6b1c60', '#591650', '#470f3f'];
	    // Extended Red Palette
	    var extendedRedColorSchema = ['#ffd8d4', '#ffb5b0', '#ff938c', '#ff766c', '#ff584c', '#f04b42', '#e03d38', '#be2e29', '#9c1e19'];
	
	    var aloeGreen = ['#7bdcc0'];
	
	    return {
	        colorSchemas: {
	            britechartsColorSchema: britechartsColorSchema,
	            britechartsGreySchema: britechartsGreySchema,
	            extendedOrangeColorSchema: extendedOrangeColorSchema,
	            extendedBlueColorSchema: extendedBlueColorSchema,
	            extendedLightBlueColorSchema: extendedLightBlueColorSchema,
	            extendedGreenColorSchema: extendedGreenColorSchema,
	            extendedYellowColorSchema: extendedYellowColorSchema,
	            extendedPinkColorSchema: extendedPinkColorSchema,
	            extendedPurpleColorSchema: extendedPurpleColorSchema,
	            extendedRedColorSchema: extendedRedColorSchema
	        },
	        colorSchemasHuman: {
	            'britechartsColorSchema': 'Britecharts Default',
	            'britechartsGreySchema': 'Britecharts Grey',
	            'extendedOrangeColorSchema': 'Orange',
	            'extendedBlueColorSchema': 'Blue',
	            'extendedLightBlueColorSchema': 'Light Blue',
	            'extendedGreenColorSchema': 'Green',
	            'extendedYellowColorSchema': 'Yellow',
	            'extendedPinkColorSchema': 'Pink',
	            'extendedPurpleColorSchema': 'Purple',
	            'extendedRedColorSchema': 'Red'
	        },
	        singleColors: {
	            aloeGreen: aloeGreen
	        },
	        colorGradients: britechartGradients,
	        colorGradientsHuman: {
	            greenBlueGradient: 'Green To Blue',
	            orangePinkGradient: 'Orange to Pink',
	            bluePurpleGradient: 'Blue to Purple'
	        }
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    'use strict';
	
	    var d3Array = __webpack_require__(9);
	    var d3Axis = __webpack_require__(10);
	    var d3Collection = __webpack_require__(11);
	    var d3Dispatch = __webpack_require__(12);
	    var d3Ease = __webpack_require__(13);
	    var d3Scale = __webpack_require__(14);
	    var d3Shape = __webpack_require__(20);
	    var d3Selection = __webpack_require__(4);
	    var d3Transition = __webpack_require__(22);
	    var d3TimeFormat = __webpack_require__(19);
	
	    var assign = __webpack_require__(24);
	
	    var _require = __webpack_require__(25),
	        exportChart = _require.exportChart;
	
	    var colorHelper = __webpack_require__(7);
	    var timeAxisHelper = __webpack_require__(30);
	
	    var _require2 = __webpack_require__(31),
	        isInteger = _require2.isInteger;
	
	    var _require3 = __webpack_require__(26),
	        axisTimeCombinations = _require3.axisTimeCombinations;
	
	    var _require4 = __webpack_require__(32),
	        formatIntegerValue = _require4.formatIntegerValue,
	        formatDecimalValue = _require4.formatDecimalValue;
	
	    var uniq = function uniq(arrArg) {
	        return arrArg.filter(function (elem, pos, arr) {
	            return arr.indexOf(elem) == pos;
	        });
	    };
	
	    /**
	     * @typdef D3Layout
	     * @type function
	     */
	
	    /**
	     * @typedef areaChartData
	     * @type {Object}
	     * @property {Object[]} data       All data entries
	     * @property {String} date         Date of the entry
	     * @property {String} name         Name of the entry
	     * @property {Number} value        Value of the entry
	     *
	     * @example
	     * {
	     *     'data': [
	     *         {
	     *             "date": "2011-01-05T00:00:00Z",
	     *             "name": "Direct",
	     *             "value": 0
	     *         }
	     *     ]
	     * }
	     */
	
	    /**
	     * Stacked Area Chart reusable API module that allows us
	     * rendering a multi area and configurable chart.
	     *
	     * @module Stacked-area
	     * @tutorial stacked-area
	     * @requires d3-array, d3-axis, d3-collection, d3-ease, d3-scale, d3-shape, d3-selection, d3-time, d3-time-format
	     *
	     * @example
	     * let stackedArea = stackedArea();
	     *
	     * stackedArea
	     *     .width(containerWidth);
	     *
	     * d3Selection.select('.css-selector')
	     *     .datum(dataset.data)
	     *     .call(stackedArea);
	     *
	     */
	
	    return function module() {
	
	        var margin = {
	            top: 70,
	            right: 30,
	            bottom: 60,
	            left: 70
	        },
	            width = 960,
	            height = 500,
	            xScale = void 0,
	            xAxis = void 0,
	            xMonthAxis = void 0,
	            yScale = void 0,
	            yAxis = void 0,
	            aspectRatio = null,
	            monthAxisPadding = 30,
	            verticalTicks = 5,
	            yTickTextYOffset = -8,
	            yTickTextXOffset = -20,
	            tickPadding = 5,
	            colorSchema = colorHelper.colorSchemas.britechartsColorSchema,
	            colorOrder = colorSchema.reduce(function (acc, color, index) {
	            acc[color] = index;
	
	            return acc;
	        }, {}),
	            areaOpacity = 0.64,
	            colorScale = void 0,
	            categoryColorMap = void 0,
	            order = void 0,
	            forceAxisSettings = null,
	            forcedXTicks = null,
	            forcedXFormat = null,
	            baseLine = void 0,
	            layers = void 0,
	            layersInitial = void 0,
	            area = void 0,
	
	
	        // Area Animation
	        maxAreaNumber = 8,
	            areaAnimationDelayStep = 20,
	            areaAnimationDelays = d3Array.range(areaAnimationDelayStep, maxAreaNumber * areaAnimationDelayStep, areaAnimationDelayStep),
	            overlay = void 0,
	            verticalMarkerContainer = void 0,
	            verticalMarker = void 0,
	            epsilon = void 0,
	            dataPoints = {},
	            pointsSize = 1.5,
	            pointsColor = '#c0c6cc',
	            pointsBorderColor = '#ffffff',
	            isAnimated = false,
	            ease = d3Ease.easeQuadInOut,
	            areaAnimationDuration = 1000,
	            svg = void 0,
	            chartWidth = void 0,
	            chartHeight = void 0,
	            data = void 0,
	            dataByDate = void 0,
	            dataByDateFormatted = void 0,
	            dataByDateZeroed = void 0,
	            verticalGridLines = void 0,
	            horizontalGridLines = void 0,
	            grid = null,
	            tooltipThreshold = 480,
	            xAxisPadding = {
	            top: 0,
	            left: 15,
	            bottom: 0,
	            right: 0
	        },
	            dateLabel = 'date',
	            valueLabel = 'value',
	            keyLabel = 'name',
	
	
	        // getters
	        getName = function getName(_ref) {
	            var name = _ref.name;
	            return name;
	        },
	            getDate = function getDate(_ref2) {
	            var date = _ref2.date;
	            return date;
	        },
	
	
	        // events
	        dispatcher = d3Dispatch.dispatch('customMouseOver', 'customMouseOut', 'customMouseMove');
	
	        /**
	          * This function creates the graph using the selection and data provided
	          * @param {D3Selection} _selection A d3 selection that represents
	          * the container(s) where the chart(s) will be rendered
	          * @param {areaChartData} _data The data to attach and generate the chart
	          */
	        function exports(_selection) {
	            _selection.each(function (_data) {
	                chartWidth = width - margin.left - margin.right;
	                chartHeight = height - margin.top - margin.bottom;
	                data = cleanData(_data);
	                dataByDate = getDataByDate(data);
	
	                buildLayers();
	                buildScales();
	                buildSVG(this);
	                buildAxis();
	                drawAxis();
	                drawStackedAreas();
	
	                if (shouldShowTooltip()) {
	                    drawHoverOverlay();
	                    drawVerticalMarker();
	                    addMouseEvents();
	                }
	            });
	        }
	
	        /**
	         * Adds events to the container group if the environment is not mobile
	         * Adding: mouseover, mouseout and mousemove
	         */
	        function addMouseEvents() {
	            svg.on('mouseover', handleMouseOver).on('mouseout', handleMouseOut).on('mousemove', handleMouseMove);
	        }
	
	        /**
	         * Formats the value depending on its characteristics
	         * @param  {Number} value Value to format
	         * @return {Number}       Formatted value
	         */
	        function getFormattedValue(value) {
	            var format = void 0;
	
	            if (isInteger(value)) {
	                format = formatIntegerValue;
	            } else {
	                format = formatDecimalValue;
	            }
	
	            return format(value);
	        }
	
	        /**
	         * Creates the d3 x and y axis, setting orientations
	         * @private
	         */
	        function buildAxis() {
	            var dataSpan = yScale.domain()[1] - yScale.domain()[0];
	            var yTickNumber = dataSpan < verticalTicks - 1 ? dataSpan : verticalTicks;
	            var minor = void 0,
	                major = void 0;
	
	            if (forceAxisSettings === 'custom' && typeof forcedXFormat === 'string') {
	                minor = {
	                    tick: forcedXTicks,
	                    format: d3TimeFormat.timeFormat(forcedXFormat)
	                };
	                major = null;
	            } else {
	                var _timeAxisHelper$getXA = timeAxisHelper.getXAxisSettings(dataByDate, width, forceAxisSettings);
	
	                minor = _timeAxisHelper$getXA.minor;
	                major = _timeAxisHelper$getXA.major;
	
	
	                xMonthAxis = d3Axis.axisBottom(xScale).ticks(major.tick).tickSize(0, 0).tickFormat(major.format);
	            }
	
	            xAxis = d3Axis.axisBottom(xScale).ticks(minor.tick).tickSize(10, 0).tickPadding(tickPadding).tickFormat(minor.format);
	
	            yAxis = d3Axis.axisRight(yScale).ticks(yTickNumber).tickSize([0]).tickPadding(tickPadding).tickFormat(getFormattedValue);
	
	            drawGridLines(minor.tick, yTickNumber);
	        }
	
	        /**
	         * Builds containers for the chart, the axis and a wrapper for all of them
	         * NOTE: The order of drawing of this group elements is really important,
	         * as everything else will be drawn on top of them
	         * @private
	         */
	        function buildContainerGroups() {
	            var container = svg.append('g').classed('container-group', true).attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
	
	            container.append('g').classed('x-axis-group', true).append('g').classed('x axis', true);
	            container.selectAll('.x-axis-group').append('g').classed('month-axis', true);
	            container.append('g').classed('y-axis-group axis', true);
	            container.append('g').classed('grid-lines-group', true);
	            container.append('g').classed('chart-group', true);
	            container.append('g').classed('metadata-group', true);
	        }
	
	        /**
	         * Builds the stacked layers layout
	         * @return {D3Layout} Layout for drawing the chart
	         * @private
	         */
	        function buildLayers() {
	            dataByDateFormatted = dataByDate.map(function (d) {
	                return assign({}, d, d.values);
	            }).map(function (d) {
	                Object.keys(d).forEach(function (k) {
	                    var entry = d[k];
	
	                    if (entry && entry.name) {
	                        d[entry.name] = entry.value;
	                    }
	                });
	
	                return assign({}, d, {
	                    date: new Date(d['key'])
	                });
	            });
	
	            dataByDateZeroed = dataByDate.map(function (d) {
	                return assign({}, d, d.values);
	            }).map(function (d) {
	                Object.keys(d).forEach(function (k) {
	                    var entry = d[k];
	
	                    if (entry && entry.name) {
	                        d[entry.name] = 0;
	                    }
	                });
	
	                return assign({}, d, {
	                    date: new Date(d['key'])
	                });
	            });
	
	            order = uniq(data.map(function (o) {
	                return o.name;
	            }));
	            var stack3 = d3Shape.stack().keys(order).order(d3Shape.stackOrderNone).offset(d3Shape.stackOffsetNone);
	
	            layersInitial = stack3(dataByDateZeroed);
	            layers = stack3(dataByDateFormatted);
	        }
	
	        /**
	         * Creates the x, y and color scales of the chart
	         * @private
	         */
	        function buildScales() {
	            xScale = d3Scale.scaleTime().domain(d3Array.extent(dataByDate, function (_ref3) {
	                var date = _ref3.date;
	                return date;
	            })).rangeRound([0, chartWidth]);
	
	            yScale = d3Scale.scaleLinear().domain([0, getMaxValueByDate()]).rangeRound([chartHeight, 0]).nice();
	
	            colorScale = d3Scale.scaleOrdinal().range(colorSchema).domain(data.map(getName));
	
	            var range = colorScale.range();
	            categoryColorMap = colorScale.domain().reduce(function (memo, item, i) {
	                memo[item] = range[i];
	
	                return memo;
	            }, {});
	        }
	
	        /**
	         * @param  {HTMLElement} container DOM element that will work as the container of the graph
	         * @private
	         */
	        function buildSVG(container) {
	            if (!svg) {
	                svg = d3Selection.select(container).append('svg').classed('britechart stacked-area', true);
	
	                buildContainerGroups();
	            }
	
	            svg.attr('width', width).attr('height', height);
	        }
	
	        /**
	         * Parses dates and values into JS Date objects and numbers
	         * @param  {obj} data Raw data from JSON file
	         * @return {obj}      Parsed data with values and dates
	         */
	        function cleanData(data) {
	            return data.map(function (d) {
	                d.date = new Date(d[dateLabel]), d.value = +d[valueLabel];
	
	                return d;
	            });
	        }
	
	        /**
	         * Draws the x and y axis on the svg object within their
	         * respective groups
	         * @private
	         */
	        function drawAxis() {
	            svg.select('.x-axis-group .axis.x').attr('transform', 'translate( 0, ' + chartHeight + ' )').call(xAxis);
	
	            if (forceAxisSettings !== 'custom') {
	                svg.select('.x-axis-group .month-axis').attr('transform', 'translate(0, ' + (chartHeight + monthAxisPadding) + ')').call(xMonthAxis);
	            }
	
	            svg.select('.y-axis-group.axis').attr('transform', 'translate( ' + -xAxisPadding.left + ', 0)').call(yAxis).call(adjustYTickLabels);
	
	            // Moving the YAxis tick labels to the right side
	            // d3Selection.selectAll('.y-axis-group .tick text')
	            //     .attr('transform', `translate( ${-chartWidth - yTickTextXOffset}, ${yTickTextYOffset})` );
	        }
	
	        /**
	         * Adjusts the position of the y axis' ticks
	         * @param  {D3Selection} selection Y axis group
	         * @return void
	         */
	        function adjustYTickLabels(selection) {
	            selection.selectAll('.tick text').attr('transform', 'translate(' + yTickTextXOffset + ', ' + yTickTextYOffset + ')');
	        }
	
	        /**
	         * Creates SVG dot elements for each data entry and draws them
	         * TODO: Plug
	         */
	        function drawDataReferencePoints() {
	            // Creates Dots on Data points
	            var points = svg.select('.chart-group').selectAll('.dots').data(layers).enter().append('g').attr('class', 'dots').attr('d', function (_ref4) {
	                var values = _ref4.values;
	                return area(values);
	            }).attr('clip-path', 'url(#clip)');
	
	            // Processes the points
	            // TODO: Optimize this code
	            points.selectAll('.dot').data(function (_ref5, index) {
	                var values = _ref5.values;
	                return values.map(function (point) {
	                    return { index: index, point: point };
	                });
	            }).enter().append('circle').attr('class', 'dot').attr('r', function () {
	                return pointsSize;
	            }).attr('fill', function () {
	                return pointsColor;
	            }).attr('stroke-width', '0').attr('stroke', pointsBorderColor).attr('transform', function (d) {
	                var point = d.point;
	
	                var key = xScale(point.date);
	
	                dataPoints[key] = dataPoints[key] || [];
	                dataPoints[key].push(d);
	
	                var date = point.date,
	                    y = point.y,
	                    y0 = point.y0;
	
	                return 'translate( ' + xScale(date) + ', ' + yScale(y + y0) + ' )';
	            });
	        }
	
	        /**
	         * Draws grid lines on the background of the chart
	         * @return void
	         */
	        function drawGridLines(xTicks, yTicks) {
	            if (grid === 'horizontal' || grid === 'full') {
	                horizontalGridLines = svg.select('.grid-lines-group').selectAll('line.horizontal-grid-line').data(yScale.ticks(yTicks)).enter().append('line').attr('class', 'horizontal-grid-line').attr('x1', -xAxisPadding.left - 30).attr('x2', chartWidth).attr('y1', function (d) {
	                    return yScale(d);
	                }).attr('y2', function (d) {
	                    return yScale(d);
	                });
	            }
	
	            if (grid === 'vertical' || grid === 'full') {
	                verticalGridLines = svg.select('.grid-lines-group').selectAll('line.vertical-grid-line').data(xScale.ticks(xTicks)).enter().append('line').attr('class', 'vertical-grid-line').attr('y1', 0).attr('y2', chartHeight).attr('x1', function (d) {
	                    return xScale(d);
	                }).attr('x2', function (d) {
	                    return xScale(d);
	                });
	            }
	
	            //draw a horizontal line to extend x-axis till the edges
	            baseLine = svg.select('.grid-lines-group').selectAll('line.extended-x-line').data([0]).enter().append('line').attr('class', 'extended-x-line').attr('x1', -xAxisPadding.left - 30).attr('x2', chartWidth).attr('y1', height - margin.bottom - margin.top).attr('y2', height - margin.bottom - margin.top);
	        }
	
	        /**
	         * Draws an overlay element over the graph
	         * @private
	         */
	        function drawHoverOverlay() {
	            overlay = svg.select('.metadata-group').append('rect').attr('class', 'overlay').attr('y1', 0).attr('y2', chartHeight).attr('height', chartHeight).attr('width', chartWidth).attr('fill', 'rgba(0,0,0,0)').style('display', 'none');
	        }
	
	        /**
	         * Draws the different areas into the chart-group element
	         * @private
	         */
	        function drawStackedAreas() {
	            var series = void 0;
	
	            area = d3Shape.area().curve(d3Shape.curveMonotoneX).x(function (_ref6) {
	                var data = _ref6.data;
	                return xScale(data.date);
	            }).y0(function (d) {
	                return yScale(d[0]);
	            }).y1(function (d) {
	                return yScale(d[1]);
	            });
	
	            if (isAnimated) {
	                series = svg.select('.chart-group').selectAll('.layer').data(layersInitial).enter().append('g').classed('layer-container', true);
	
	                series.append('path').attr('class', 'layer').attr('d', area).style('fill', function (_ref7) {
	                    var key = _ref7.key;
	                    return categoryColorMap[key];
	                });
	
	                // Update
	                svg.select('.chart-group').selectAll('.layer').data(layers).transition().delay(function (_, i) {
	                    return areaAnimationDelays[i];
	                }).duration(areaAnimationDuration).ease(ease).attr('d', area).style('opacity', areaOpacity).style('fill', function (_ref8) {
	                    var key = _ref8.key;
	                    return categoryColorMap[key];
	                });
	            } else {
	                series = svg.select('.chart-group').selectAll('.layer').data(layers).enter().append('g').classed('layer-container', true);
	
	                series.append('path').attr('class', 'layer').attr('d', area).style('fill', function (_ref9) {
	                    var key = _ref9.key;
	                    return categoryColorMap[key];
	                });
	
	                // Update
	                series.attr('d', area).style('opacity', areaOpacity).style('fill', function (_ref10) {
	                    var key = _ref10.key;
	                    return categoryColorMap[key];
	                });
	            }
	
	            // Exit
	            series.exit().transition().style('opacity', 0).remove();
	        }
	
	        /**
	         * Creates the vertical marker
	         * @return void
	         */
	        function drawVerticalMarker() {
	            verticalMarkerContainer = svg.select('.metadata-group').append('g').attr('class', 'vertical-marker-container').attr('transform', 'translate(9999, 0)');
	
	            verticalMarker = verticalMarkerContainer.selectAll('path').data([{
	                x1: 0,
	                y1: 0,
	                x2: 0,
	                y2: 0
	            }]).enter().append('line').classed('vertical-marker', true).attr('x1', 0).attr('y1', chartHeight).attr('x2', 0).attr('y2', 0);
	        }
	
	        /**
	         * Removes all the datapoints highlighter circles added to the marker container
	         * @return void
	         */
	        function eraseDataPointHighlights() {
	            verticalMarkerContainer.selectAll('.circle-container').remove();
	        }
	
	        /**
	         * Orders the data by date for consumption on the chart tooltip
	         * @param  {areaChartData} data    Chart data
	         * @return {Object[]}               Chart data ordered by date
	         * @private
	         */
	        function getDataByDate(data) {
	            return d3Collection.nest().key(getDate).entries(data.sort(function (a, b) {
	                return a.date - b.date;
	            })).map(function (d) {
	                return assign({}, d, {
	                    date: new Date(d.key)
	                });
	            });
	
	            // let b =  d3Collection.nest()
	            //                     .key(getDate).sortKeys(d3Array.ascending)
	            //                     .entries(data);
	        }
	
	        /**
	         * Computes the maximum sum of values for any date
	         *
	         * @return {Number} Max value
	         */
	        function getMaxValueByDate() {
	            var keys = uniq(data.map(function (o) {
	                return o.name;
	            }));
	            var maxValueByDate = d3Array.max(dataByDateFormatted, function (d) {
	                var vals = keys.map(function (key) {
	                    return d[key];
	                });
	
	                return d3Array.sum(vals);
	            });
	
	            return maxValueByDate;
	        }
	
	        /**
	         * Extract X position on the chart from a given mouse event
	         * @param  {obj} event D3 mouse event
	         * @return {Number}       Position on the x axis of the mouse
	         * @private
	         */
	        function getMouseXPosition(event) {
	            return d3Selection.mouse(event)[0];
	        }
	
	        /**
	         * Finds out the data entry that is closer to the given position on pixels
	         * @param  {Number} mouseX X position of the mouse
	         * @return {obj}        Data entry that is closer to that x axis position
	         */
	        function getNearestDataPoint(mouseX) {
	            return dataByDate.find(function (_ref11) {
	                var date = _ref11.date;
	                return Math.abs(xScale(date) - mouseX) <= epsilon;
	            });
	        }
	
	        /**
	         * Epsilon is the value given to the number representing half of the distance in
	         * pixels between two date data points
	         * @return {Number} half distance between any two points
	         */
	        function setEpsilon() {
	            var dates = dataByDate.map(function (_ref12) {
	                var date = _ref12.date;
	                return date;
	            });
	
	            epsilon = (xScale(dates[1]) - xScale(dates[0])) / 2;
	        }
	
	        /**
	         * MouseMove handler, calculates the nearest dataPoint to the cursor
	         * and updates metadata related to it
	         * @private
	         */
	        function handleMouseMove() {
	            epsilon || setEpsilon();
	
	            var dataPoint = getNearestDataPoint(getMouseXPosition(this) - margin.left),
	                dataPointXPosition = void 0;
	
	            if (dataPoint) {
	                dataPointXPosition = xScale(new Date(dataPoint.key));
	                // Move verticalMarker to that datapoint
	                moveVerticalMarker(dataPointXPosition);
	                // Add data points highlighting
	                highlightDataPoints(dataPoint);
	                // Emit event with xPosition for tooltip or similar feature
	                dispatcher.call('customMouseMove', this, dataPoint, categoryColorMap, dataPointXPosition);
	            }
	        }
	
	        /**
	         * MouseOut handler, hides overlay and removes active class on verticalMarkerLine
	         * It also resets the container of the vertical marker
	         * @private
	         */
	        function handleMouseOut(data) {
	            overlay.style('display', 'none');
	            verticalMarker.classed('bc-is-active', false);
	            verticalMarkerContainer.attr('transform', 'translate(9999, 0)');
	
	            dispatcher.call('customMouseOut', this, data);
	        }
	
	        /**
	         * Mouseover handler, shows overlay and adds active class to verticalMarkerLine
	         * @private
	         */
	        function handleMouseOver(data) {
	            overlay.style('display', 'block');
	            verticalMarker.classed('bc-is-active', true);
	
	            dispatcher.call('customMouseOver', this, data);
	        }
	
	        /**
	         * Creates coloured circles marking where the exact data y value is for a given data point
	         * @param  {obj} dataPoint Data point to extract info from
	         * @private
	         */
	        function highlightDataPoints(_ref13) {
	            var values = _ref13.values;
	
	            var accumulator = 0;
	
	            eraseDataPointHighlights();
	
	            // ensure order stays constant
	            values = values.filter(function (v) {
	                return !!v;
	            }).sort(function (a, b) {
	                return order.indexOf(a.name) > order.indexOf(b.name);
	            });
	
	            values.forEach(function (_ref14, index) {
	                var name = _ref14.name;
	
	                var marker = verticalMarkerContainer.append('g').classed('circle-container', true),
	                    circleSize = 12;
	
	                accumulator = accumulator + values[index][valueLabel];
	
	                marker.append('circle').classed('data-point-highlighter', true).attr('cx', circleSize).attr('cy', 0).attr('r', 5).style('stroke-width', 2).style('stroke', categoryColorMap[name]);
	
	                marker.attr('transform', 'translate( ' + -circleSize + ', ' + yScale(accumulator) + ' )');
	            });
	        }
	
	        /**
	         * Helper method to update the x position of the vertical marker
	         * @param  {obj} dataPoint Data entry to extract info
	         * @return void
	         */
	        function moveVerticalMarker(verticalMarkerXPosition) {
	            verticalMarkerContainer.attr('transform', 'translate(' + verticalMarkerXPosition + ',0)');
	        }
	
	        /**
	         * Determines if we should add the tooltip related logic depending on the
	         * size of the chart and the tooltipThreshold variable value
	         * @return {boolean} Should we build the tooltip?
	         * @private
	         */
	        function shouldShowTooltip() {
	            return width > tooltipThreshold;
	        }
	
	        // Accessors
	
	        /**
	         * Gets or Sets the opacity of the stacked areas in the chart (all of them will have the same opacity)
	         * @param  {Object} _x                  Opacity to get/set
	         * @return { opacity | module}          Current opacity or Area Chart module to chain calls
	         * @public
	         */
	        exports.areaOpacity = function (_x) {
	            if (!arguments.length) {
	                return areaOpacity;
	            }
	            areaOpacity = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the aspect ratio of the chart
	         * @param  {Number} _x Desired aspect ratio for the graph
	         * @return { (Number | Module) } Current aspect ratio or Area Chart module to chain calls
	         * @public
	         */
	        exports.aspectRatio = function (_x) {
	            if (!arguments.length) {
	                return aspectRatio;
	            }
	            aspectRatio = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the colorSchema of the chart
	         * @param  {String[]} _x Desired colorSchema for the graph
	         * @return { colorSchema | module} Current colorSchema or Chart module to chain calls
	         * @public
	         */
	        exports.colorSchema = function (_x) {
	            if (!arguments.length) {
	                return colorSchema;
	            }
	            colorSchema = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the dateLabel of the chart
	         * @param  {Number} _x Desired dateLabel for the graph
	         * @return { dateLabel | module} Current dateLabel or Chart module to chain calls
	         * @public
	         */
	        exports.dateLabel = function (_x) {
	            if (!arguments.length) {
	                return dateLabel;
	            }
	            dateLabel = _x;
	
	            return this;
	        };
	
	        /**
	         * Exposes the ability to force the chart to show a certain x axis grouping
	         * @param  {String} _x Desired format
	         * @return { (String|Module) }    Current format or module to chain calls
	         * @example
	         *     area.forceAxisFormat(area.axisTimeCombinations.HOUR_DAY)
	         */
	        exports.forceAxisFormat = function (_x) {
	            if (!arguments.length) {
	                return forceAxisSettings;
	            }
	            forceAxisSettings = _x;
	
	            return this;
	        };
	
	        /**
	         * Exposes the ability to force the chart to show a certain x format
	         * It requires a `forceAxisFormat` of 'custom' in order to work.
	         * @param  {String} _x              Desired format for x axis
	         * @return { (String|Module) }      Current format or module to chain calls
	         */
	        exports.forcedXFormat = function (_x) {
	            if (!arguments.length) {
	                return forcedXFormat;
	            }
	            forcedXFormat = _x;
	
	            return this;
	        };
	
	        /**
	         * Exposes the ability to force the chart to show a certain x ticks. It requires a `forceAxisFormat` of 'custom' in order to work.
	         * NOTE: This value needs to be a multiple of 2, 5 or 10. They won't always work as expected, as D3 decides at the end
	         * how many and where the ticks will appear.
	         *
	         * @param  {Number} _x              Desired number of x axis ticks (multiple of 2, 5 or 10)
	         * @return { (Number|Module) }      Current number or ticks or module to chain calls
	         */
	        exports.forcedXTicks = function (_x) {
	            if (!arguments.length) {
	                return forcedXTicks;
	            }
	            forcedXTicks = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the grid mode.
	         *
	         * @param  {String} _x Desired mode for the grid ('vertical'|'horizontal'|'full')
	         * @return { String | module} Current mode of the grid or Area Chart module to chain calls
	         * @public
	         */
	        exports.grid = function (_x) {
	            if (!arguments.length) {
	                return grid;
	            }
	            grid = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the height of the chart
	         * @param  {Number} _x Desired width for the graph
	         * @return { height | module} Current height or Area Chart module to chain calls
	         * @public
	         */
	        exports.height = function (_x) {
	            if (!arguments.length) {
	                return height;
	            }
	            if (aspectRatio) {
	                width = Math.ceil(_x / aspectRatio);
	            }
	            height = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the isAnimated property of the chart, making it to animate when render.
	         * By default this is 'false'
	         *
	         * @param  {Boolean} _x Desired animation flag
	         * @return { isAnimated | module} Current isAnimated flag or Chart module
	         * @public
	         */
	        exports.isAnimated = function (_x) {
	            if (!arguments.length) {
	                return isAnimated;
	            }
	            isAnimated = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the keyLabel of the chart
	         * @param  {Number} _x Desired keyLabel for the graph
	         * @return { keyLabel | module} Current keyLabel or Chart module to chain calls
	         * @public
	         */
	        exports.keyLabel = function (_x) {
	            if (!arguments.length) {
	                return keyLabel;
	            }
	            keyLabel = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the margin of the chart
	         * @param  {Object} _x Margin object to get/set
	         * @return { margin | module} Current margin or Area Chart module to chain calls
	         * @public
	         */
	        exports.margin = function (_x) {
	            if (!arguments.length) {
	                return margin;
	            }
	            margin = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the minimum width of the graph in order to show the tooltip
	         * NOTE: This could also depend on the aspect ratio
	         *
	         * @param  {Object} _x Margin object to get/set
	         * @return { tooltipThreshold | module} Current tooltipThreshold or Area Chart module to chain calls
	         * @public
	         */
	        exports.tooltipThreshold = function (_x) {
	            if (!arguments.length) {
	                return tooltipThreshold;
	            }
	            tooltipThreshold = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the valueLabel of the chart
	         * @param  {Number} _x Desired valueLabel for the graph
	         * @return { valueLabel | module} Current valueLabel or Chart module to chain calls
	         * @public
	         */
	        exports.valueLabel = function (_x) {
	            if (!arguments.length) {
	                return valueLabel;
	            }
	            valueLabel = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the number of verticalTicks of the yAxis on the chart
	         * @param  {Number} _x Desired verticalTicks
	         * @return { verticalTicks | module} Current verticalTicks or Chart module to chain calls
	         * @public
	         */
	        exports.verticalTicks = function (_x) {
	            if (!arguments.length) {
	                return verticalTicks;
	            }
	            verticalTicks = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the width of the chart
	         * @param  {Number} _x Desired width for the graph
	         * @return { width | module} Current width or Area Chart module to chain calls
	         * @public
	         */
	        exports.width = function (_x) {
	            if (!arguments.length) {
	                return width;
	            }
	            if (aspectRatio) {
	                height = Math.ceil(_x * aspectRatio);
	            }
	            width = _x;
	
	            return this;
	        };
	
	        /**
	         * Chart exported to png and a download action is fired
	         * @public
	         */
	        exports.exportChart = function (filename, title) {
	            exportChart.call(exports, svg, filename, title);
	        };
	
	        /**
	         * Exposes an 'on' method that acts as a bridge with the event dispatcher
	         * We are going to expose this events:
	         * customMouseOver, customMouseMove and customMouseOut
	         *
	         * @return {module} Bar Chart
	         * @public
	         */
	        exports.on = function () {
	            var value = dispatcher.on.apply(dispatcher, arguments);
	
	            return value === dispatcher ? exports : value;
	        };
	
	        /**
	         * Exposes the constants to be used to force the x axis to respect a certain granularity
	         * current options: MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR
	         * @example
	         *     area.forceAxisFormat(area.axisTimeCombinations.HOUR_DAY)
	         */
	        exports.axisTimeCombinations = axisTimeCombinations;
	
	        return exports;
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-array/ Version 1.2.0. Copyright 2017 Mike Bostock.
	(function (global, factory) {
		 true ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';
	
	var ascending = function(a, b) {
	  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
	};
	
	var bisector = function(compare) {
	  if (compare.length === 1) compare = ascendingComparator(compare);
	  return {
	    left: function(a, x, lo, hi) {
	      if (lo == null) lo = 0;
	      if (hi == null) hi = a.length;
	      while (lo < hi) {
	        var mid = lo + hi >>> 1;
	        if (compare(a[mid], x) < 0) lo = mid + 1;
	        else hi = mid;
	      }
	      return lo;
	    },
	    right: function(a, x, lo, hi) {
	      if (lo == null) lo = 0;
	      if (hi == null) hi = a.length;
	      while (lo < hi) {
	        var mid = lo + hi >>> 1;
	        if (compare(a[mid], x) > 0) hi = mid;
	        else lo = mid + 1;
	      }
	      return lo;
	    }
	  };
	};
	
	function ascendingComparator(f) {
	  return function(d, x) {
	    return ascending(f(d), x);
	  };
	}
	
	var ascendingBisect = bisector(ascending);
	var bisectRight = ascendingBisect.right;
	var bisectLeft = ascendingBisect.left;
	
	var pairs = function(array, f) {
	  if (f == null) f = pair;
	  var i = 0, n = array.length - 1, p = array[0], pairs = new Array(n < 0 ? 0 : n);
	  while (i < n) pairs[i] = f(p, p = array[++i]);
	  return pairs;
	};
	
	function pair(a, b) {
	  return [a, b];
	}
	
	var cross = function(values0, values1, reduce) {
	  var n0 = values0.length,
	      n1 = values1.length,
	      values = new Array(n0 * n1),
	      i0,
	      i1,
	      i,
	      value0;
	
	  if (reduce == null) reduce = pair;
	
	  for (i0 = i = 0; i0 < n0; ++i0) {
	    for (value0 = values0[i0], i1 = 0; i1 < n1; ++i1, ++i) {
	      values[i] = reduce(value0, values1[i1]);
	    }
	  }
	
	  return values;
	};
	
	var descending = function(a, b) {
	  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
	};
	
	var number = function(x) {
	  return x === null ? NaN : +x;
	};
	
	var variance = function(values, valueof) {
	  var n = values.length,
	      m = 0,
	      i = -1,
	      mean = 0,
	      value,
	      delta,
	      sum = 0;
	
	  if (valueof == null) {
	    while (++i < n) {
	      if (!isNaN(value = number(values[i]))) {
	        delta = value - mean;
	        mean += delta / ++m;
	        sum += delta * (value - mean);
	      }
	    }
	  }
	
	  else {
	    while (++i < n) {
	      if (!isNaN(value = number(valueof(values[i], i, values)))) {
	        delta = value - mean;
	        mean += delta / ++m;
	        sum += delta * (value - mean);
	      }
	    }
	  }
	
	  if (m > 1) return sum / (m - 1);
	};
	
	var deviation = function(array, f) {
	  var v = variance(array, f);
	  return v ? Math.sqrt(v) : v;
	};
	
	var extent = function(values, valueof) {
	  var n = values.length,
	      i = -1,
	      value,
	      min,
	      max;
	
	  if (valueof == null) {
	    while (++i < n) { // Find the first comparable value.
	      if ((value = values[i]) != null && value >= value) {
	        min = max = value;
	        while (++i < n) { // Compare the remaining values.
	          if ((value = values[i]) != null) {
	            if (min > value) min = value;
	            if (max < value) max = value;
	          }
	        }
	      }
	    }
	  }
	
	  else {
	    while (++i < n) { // Find the first comparable value.
	      if ((value = valueof(values[i], i, values)) != null && value >= value) {
	        min = max = value;
	        while (++i < n) { // Compare the remaining values.
	          if ((value = valueof(values[i], i, values)) != null) {
	            if (min > value) min = value;
	            if (max < value) max = value;
	          }
	        }
	      }
	    }
	  }
	
	  return [min, max];
	};
	
	var array = Array.prototype;
	
	var slice = array.slice;
	var map = array.map;
	
	var constant = function(x) {
	  return function() {
	    return x;
	  };
	};
	
	var identity = function(x) {
	  return x;
	};
	
	var range = function(start, stop, step) {
	  start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;
	
	  var i = -1,
	      n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
	      range = new Array(n);
	
	  while (++i < n) {
	    range[i] = start + i * step;
	  }
	
	  return range;
	};
	
	var e10 = Math.sqrt(50);
	var e5 = Math.sqrt(10);
	var e2 = Math.sqrt(2);
	
	var ticks = function(start, stop, count) {
	  var reverse = stop < start,
	      i = -1,
	      n,
	      ticks,
	      step;
	
	  if (reverse) n = start, start = stop, stop = n;
	
	  if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];
	
	  if (step > 0) {
	    start = Math.ceil(start / step);
	    stop = Math.floor(stop / step);
	    ticks = new Array(n = Math.ceil(stop - start + 1));
	    while (++i < n) ticks[i] = (start + i) * step;
	  } else {
	    start = Math.floor(start * step);
	    stop = Math.ceil(stop * step);
	    ticks = new Array(n = Math.ceil(start - stop + 1));
	    while (++i < n) ticks[i] = (start - i) / step;
	  }
	
	  if (reverse) ticks.reverse();
	
	  return ticks;
	};
	
	function tickIncrement(start, stop, count) {
	  var step = (stop - start) / Math.max(0, count),
	      power = Math.floor(Math.log(step) / Math.LN10),
	      error = step / Math.pow(10, power);
	  return power >= 0
	      ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power)
	      : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
	}
	
	function tickStep(start, stop, count) {
	  var step0 = Math.abs(stop - start) / Math.max(0, count),
	      step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
	      error = step0 / step1;
	  if (error >= e10) step1 *= 10;
	  else if (error >= e5) step1 *= 5;
	  else if (error >= e2) step1 *= 2;
	  return stop < start ? -step1 : step1;
	}
	
	var sturges = function(values) {
	  return Math.ceil(Math.log(values.length) / Math.LN2) + 1;
	};
	
	var histogram = function() {
	  var value = identity,
	      domain = extent,
	      threshold = sturges;
	
	  function histogram(data) {
	    var i,
	        n = data.length,
	        x,
	        values = new Array(n);
	
	    for (i = 0; i < n; ++i) {
	      values[i] = value(data[i], i, data);
	    }
	
	    var xz = domain(values),
	        x0 = xz[0],
	        x1 = xz[1],
	        tz = threshold(values, x0, x1);
	
	    // Convert number of thresholds into uniform thresholds.
	    if (!Array.isArray(tz)) {
	      tz = tickStep(x0, x1, tz);
	      tz = range(Math.ceil(x0 / tz) * tz, Math.floor(x1 / tz) * tz, tz); // exclusive
	    }
	
	    // Remove any thresholds outside the domain.
	    var m = tz.length;
	    while (tz[0] <= x0) tz.shift(), --m;
	    while (tz[m - 1] > x1) tz.pop(), --m;
	
	    var bins = new Array(m + 1),
	        bin;
	
	    // Initialize bins.
	    for (i = 0; i <= m; ++i) {
	      bin = bins[i] = [];
	      bin.x0 = i > 0 ? tz[i - 1] : x0;
	      bin.x1 = i < m ? tz[i] : x1;
	    }
	
	    // Assign data to bins by value, ignoring any outside the domain.
	    for (i = 0; i < n; ++i) {
	      x = values[i];
	      if (x0 <= x && x <= x1) {
	        bins[bisectRight(tz, x, 0, m)].push(data[i]);
	      }
	    }
	
	    return bins;
	  }
	
	  histogram.value = function(_) {
	    return arguments.length ? (value = typeof _ === "function" ? _ : constant(_), histogram) : value;
	  };
	
	  histogram.domain = function(_) {
	    return arguments.length ? (domain = typeof _ === "function" ? _ : constant([_[0], _[1]]), histogram) : domain;
	  };
	
	  histogram.thresholds = function(_) {
	    return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? constant(slice.call(_)) : constant(_), histogram) : threshold;
	  };
	
	  return histogram;
	};
	
	var quantile = function(values, p, valueof) {
	  if (valueof == null) valueof = number;
	  if (!(n = values.length)) return;
	  if ((p = +p) <= 0 || n < 2) return +valueof(values[0], 0, values);
	  if (p >= 1) return +valueof(values[n - 1], n - 1, values);
	  var n,
	      i = (n - 1) * p,
	      i0 = Math.floor(i),
	      value0 = +valueof(values[i0], i0, values),
	      value1 = +valueof(values[i0 + 1], i0 + 1, values);
	  return value0 + (value1 - value0) * (i - i0);
	};
	
	var freedmanDiaconis = function(values, min, max) {
	  values = map.call(values, number).sort(ascending);
	  return Math.ceil((max - min) / (2 * (quantile(values, 0.75) - quantile(values, 0.25)) * Math.pow(values.length, -1 / 3)));
	};
	
	var scott = function(values, min, max) {
	  return Math.ceil((max - min) / (3.5 * deviation(values) * Math.pow(values.length, -1 / 3)));
	};
	
	var max = function(values, valueof) {
	  var n = values.length,
	      i = -1,
	      value,
	      max;
	
	  if (valueof == null) {
	    while (++i < n) { // Find the first comparable value.
	      if ((value = values[i]) != null && value >= value) {
	        max = value;
	        while (++i < n) { // Compare the remaining values.
	          if ((value = values[i]) != null && value > max) {
	            max = value;
	          }
	        }
	      }
	    }
	  }
	
	  else {
	    while (++i < n) { // Find the first comparable value.
	      if ((value = valueof(values[i], i, values)) != null && value >= value) {
	        max = value;
	        while (++i < n) { // Compare the remaining values.
	          if ((value = valueof(values[i], i, values)) != null && value > max) {
	            max = value;
	          }
	        }
	      }
	    }
	  }
	
	  return max;
	};
	
	var mean = function(values, valueof) {
	  var n = values.length,
	      m = n,
	      i = -1,
	      value,
	      sum = 0;
	
	  if (valueof == null) {
	    while (++i < n) {
	      if (!isNaN(value = number(values[i]))) sum += value;
	      else --m;
	    }
	  }
	
	  else {
	    while (++i < n) {
	      if (!isNaN(value = number(valueof(values[i], i, values)))) sum += value;
	      else --m;
	    }
	  }
	
	  if (m) return sum / m;
	};
	
	var median = function(values, valueof) {
	  var n = values.length,
	      i = -1,
	      value,
	      numbers = [];
	
	  if (valueof == null) {
	    while (++i < n) {
	      if (!isNaN(value = number(values[i]))) {
	        numbers.push(value);
	      }
	    }
	  }
	
	  else {
	    while (++i < n) {
	      if (!isNaN(value = number(valueof(values[i], i, values)))) {
	        numbers.push(value);
	      }
	    }
	  }
	
	  return quantile(numbers.sort(ascending), 0.5);
	};
	
	var merge = function(arrays) {
	  var n = arrays.length,
	      m,
	      i = -1,
	      j = 0,
	      merged,
	      array;
	
	  while (++i < n) j += arrays[i].length;
	  merged = new Array(j);
	
	  while (--n >= 0) {
	    array = arrays[n];
	    m = array.length;
	    while (--m >= 0) {
	      merged[--j] = array[m];
	    }
	  }
	
	  return merged;
	};
	
	var min = function(values, valueof) {
	  var n = values.length,
	      i = -1,
	      value,
	      min;
	
	  if (valueof == null) {
	    while (++i < n) { // Find the first comparable value.
	      if ((value = values[i]) != null && value >= value) {
	        min = value;
	        while (++i < n) { // Compare the remaining values.
	          if ((value = values[i]) != null && min > value) {
	            min = value;
	          }
	        }
	      }
	    }
	  }
	
	  else {
	    while (++i < n) { // Find the first comparable value.
	      if ((value = valueof(values[i], i, values)) != null && value >= value) {
	        min = value;
	        while (++i < n) { // Compare the remaining values.
	          if ((value = valueof(values[i], i, values)) != null && min > value) {
	            min = value;
	          }
	        }
	      }
	    }
	  }
	
	  return min;
	};
	
	var permute = function(array, indexes) {
	  var i = indexes.length, permutes = new Array(i);
	  while (i--) permutes[i] = array[indexes[i]];
	  return permutes;
	};
	
	var scan = function(values, compare) {
	  if (!(n = values.length)) return;
	  var n,
	      i = 0,
	      j = 0,
	      xi,
	      xj = values[j];
	
	  if (compare == null) compare = ascending;
	
	  while (++i < n) {
	    if (compare(xi = values[i], xj) < 0 || compare(xj, xj) !== 0) {
	      xj = xi, j = i;
	    }
	  }
	
	  if (compare(xj, xj) === 0) return j;
	};
	
	var shuffle = function(array, i0, i1) {
	  var m = (i1 == null ? array.length : i1) - (i0 = i0 == null ? 0 : +i0),
	      t,
	      i;
	
	  while (m) {
	    i = Math.random() * m-- | 0;
	    t = array[m + i0];
	    array[m + i0] = array[i + i0];
	    array[i + i0] = t;
	  }
	
	  return array;
	};
	
	var sum = function(values, valueof) {
	  var n = values.length,
	      i = -1,
	      value,
	      sum = 0;
	
	  if (valueof == null) {
	    while (++i < n) {
	      if (value = +values[i]) sum += value; // Note: zero and null are equivalent.
	    }
	  }
	
	  else {
	    while (++i < n) {
	      if (value = +valueof(values[i], i, values)) sum += value;
	    }
	  }
	
	  return sum;
	};
	
	var transpose = function(matrix) {
	  if (!(n = matrix.length)) return [];
	  for (var i = -1, m = min(matrix, length), transpose = new Array(m); ++i < m;) {
	    for (var j = -1, n, row = transpose[i] = new Array(n); ++j < n;) {
	      row[j] = matrix[j][i];
	    }
	  }
	  return transpose;
	};
	
	function length(d) {
	  return d.length;
	}
	
	var zip = function() {
	  return transpose(arguments);
	};
	
	exports.bisect = bisectRight;
	exports.bisectRight = bisectRight;
	exports.bisectLeft = bisectLeft;
	exports.ascending = ascending;
	exports.bisector = bisector;
	exports.cross = cross;
	exports.descending = descending;
	exports.deviation = deviation;
	exports.extent = extent;
	exports.histogram = histogram;
	exports.thresholdFreedmanDiaconis = freedmanDiaconis;
	exports.thresholdScott = scott;
	exports.thresholdSturges = sturges;
	exports.max = max;
	exports.mean = mean;
	exports.median = median;
	exports.merge = merge;
	exports.min = min;
	exports.pairs = pairs;
	exports.permute = permute;
	exports.quantile = quantile;
	exports.range = range;
	exports.scan = scan;
	exports.shuffle = shuffle;
	exports.sum = sum;
	exports.ticks = ticks;
	exports.tickIncrement = tickIncrement;
	exports.tickStep = tickStep;
	exports.transpose = transpose;
	exports.variance = variance;
	exports.zip = zip;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-axis/ Version 1.0.7. Copyright 2017 Mike Bostock.
	(function (global, factory) {
		 true ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';
	
	var slice = Array.prototype.slice;
	
	var identity = function(x) {
	  return x;
	};
	
	var top = 1;
	var right = 2;
	var bottom = 3;
	var left = 4;
	var epsilon = 1e-6;
	
	function translateX(x) {
	  return "translate(" + (x + 0.5) + ",0)";
	}
	
	function translateY(y) {
	  return "translate(0," + (y + 0.5) + ")";
	}
	
	function center(scale) {
	  var offset = Math.max(0, scale.bandwidth() - 1) / 2; // Adjust for 0.5px offset.
	  if (scale.round()) offset = Math.round(offset);
	  return function(d) {
	    return scale(d) + offset;
	  };
	}
	
	function entering() {
	  return !this.__axis;
	}
	
	function axis(orient, scale) {
	  var tickArguments = [],
	      tickValues = null,
	      tickFormat = null,
	      tickSizeInner = 6,
	      tickSizeOuter = 6,
	      tickPadding = 3,
	      k = orient === top || orient === left ? -1 : 1,
	      x = orient === left || orient === right ? "x" : "y",
	      transform = orient === top || orient === bottom ? translateX : translateY;
	
	  function axis(context) {
	    var values = tickValues == null ? (scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain()) : tickValues,
	        format = tickFormat == null ? (scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : identity) : tickFormat,
	        spacing = Math.max(tickSizeInner, 0) + tickPadding,
	        range = scale.range(),
	        range0 = range[0] + 0.5,
	        range1 = range[range.length - 1] + 0.5,
	        position = (scale.bandwidth ? center : identity)(scale.copy()),
	        selection = context.selection ? context.selection() : context,
	        path = selection.selectAll(".domain").data([null]),
	        tick = selection.selectAll(".tick").data(values, scale).order(),
	        tickExit = tick.exit(),
	        tickEnter = tick.enter().append("g").attr("class", "tick"),
	        line = tick.select("line"),
	        text = tick.select("text");
	
	    path = path.merge(path.enter().insert("path", ".tick")
	        .attr("class", "domain")
	        .attr("stroke", "#000"));
	
	    tick = tick.merge(tickEnter);
	
	    line = line.merge(tickEnter.append("line")
	        .attr("stroke", "#000")
	        .attr(x + "2", k * tickSizeInner));
	
	    text = text.merge(tickEnter.append("text")
	        .attr("fill", "#000")
	        .attr(x, k * spacing)
	        .attr("dy", orient === top ? "0em" : orient === bottom ? "0.71em" : "0.32em"));
	
	    if (context !== selection) {
	      path = path.transition(context);
	      tick = tick.transition(context);
	      line = line.transition(context);
	      text = text.transition(context);
	
	      tickExit = tickExit.transition(context)
	          .attr("opacity", epsilon)
	          .attr("transform", function(d) { return isFinite(d = position(d)) ? transform(d) : this.getAttribute("transform"); });
	
	      tickEnter
	          .attr("opacity", epsilon)
	          .attr("transform", function(d) { var p = this.parentNode.__axis; return transform(p && isFinite(p = p(d)) ? p : position(d)); });
	    }
	
	    tickExit.remove();
	
	    path
	        .attr("d", orient === left || orient == right
	            ? "M" + k * tickSizeOuter + "," + range0 + "H0.5V" + range1 + "H" + k * tickSizeOuter
	            : "M" + range0 + "," + k * tickSizeOuter + "V0.5H" + range1 + "V" + k * tickSizeOuter);
	
	    tick
	        .attr("opacity", 1)
	        .attr("transform", function(d) { return transform(position(d)); });
	
	    line
	        .attr(x + "2", k * tickSizeInner);
	
	    text
	        .attr(x, k * spacing)
	        .text(format);
	
	    selection.filter(entering)
	        .attr("fill", "none")
	        .attr("font-size", 10)
	        .attr("font-family", "sans-serif")
	        .attr("text-anchor", orient === right ? "start" : orient === left ? "end" : "middle");
	
	    selection
	        .each(function() { this.__axis = position; });
	  }
	
	  axis.scale = function(_) {
	    return arguments.length ? (scale = _, axis) : scale;
	  };
	
	  axis.ticks = function() {
	    return tickArguments = slice.call(arguments), axis;
	  };
	
	  axis.tickArguments = function(_) {
	    return arguments.length ? (tickArguments = _ == null ? [] : slice.call(_), axis) : tickArguments.slice();
	  };
	
	  axis.tickValues = function(_) {
	    return arguments.length ? (tickValues = _ == null ? null : slice.call(_), axis) : tickValues && tickValues.slice();
	  };
	
	  axis.tickFormat = function(_) {
	    return arguments.length ? (tickFormat = _, axis) : tickFormat;
	  };
	
	  axis.tickSize = function(_) {
	    return arguments.length ? (tickSizeInner = tickSizeOuter = +_, axis) : tickSizeInner;
	  };
	
	  axis.tickSizeInner = function(_) {
	    return arguments.length ? (tickSizeInner = +_, axis) : tickSizeInner;
	  };
	
	  axis.tickSizeOuter = function(_) {
	    return arguments.length ? (tickSizeOuter = +_, axis) : tickSizeOuter;
	  };
	
	  axis.tickPadding = function(_) {
	    return arguments.length ? (tickPadding = +_, axis) : tickPadding;
	  };
	
	  return axis;
	}
	
	function axisTop(scale) {
	  return axis(top, scale);
	}
	
	function axisRight(scale) {
	  return axis(right, scale);
	}
	
	function axisBottom(scale) {
	  return axis(bottom, scale);
	}
	
	function axisLeft(scale) {
	  return axis(left, scale);
	}
	
	exports.axisTop = axisTop;
	exports.axisRight = axisRight;
	exports.axisBottom = axisBottom;
	exports.axisLeft = axisLeft;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-collection/ Version 1.0.3. Copyright 2017 Mike Bostock.
	(function (global, factory) {
		 true ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';
	
	var prefix = "$";
	
	function Map() {}
	
	Map.prototype = map.prototype = {
	  constructor: Map,
	  has: function(key) {
	    return (prefix + key) in this;
	  },
	  get: function(key) {
	    return this[prefix + key];
	  },
	  set: function(key, value) {
	    this[prefix + key] = value;
	    return this;
	  },
	  remove: function(key) {
	    var property = prefix + key;
	    return property in this && delete this[property];
	  },
	  clear: function() {
	    for (var property in this) if (property[0] === prefix) delete this[property];
	  },
	  keys: function() {
	    var keys = [];
	    for (var property in this) if (property[0] === prefix) keys.push(property.slice(1));
	    return keys;
	  },
	  values: function() {
	    var values = [];
	    for (var property in this) if (property[0] === prefix) values.push(this[property]);
	    return values;
	  },
	  entries: function() {
	    var entries = [];
	    for (var property in this) if (property[0] === prefix) entries.push({key: property.slice(1), value: this[property]});
	    return entries;
	  },
	  size: function() {
	    var size = 0;
	    for (var property in this) if (property[0] === prefix) ++size;
	    return size;
	  },
	  empty: function() {
	    for (var property in this) if (property[0] === prefix) return false;
	    return true;
	  },
	  each: function(f) {
	    for (var property in this) if (property[0] === prefix) f(this[property], property.slice(1), this);
	  }
	};
	
	function map(object, f) {
	  var map = new Map;
	
	  // Copy constructor.
	  if (object instanceof Map) object.each(function(value, key) { map.set(key, value); });
	
	  // Index array by numeric index or specified key function.
	  else if (Array.isArray(object)) {
	    var i = -1,
	        n = object.length,
	        o;
	
	    if (f == null) while (++i < n) map.set(i, object[i]);
	    else while (++i < n) map.set(f(o = object[i], i, object), o);
	  }
	
	  // Convert object to map.
	  else if (object) for (var key in object) map.set(key, object[key]);
	
	  return map;
	}
	
	var nest = function() {
	  var keys = [],
	      sortKeys = [],
	      sortValues,
	      rollup,
	      nest;
	
	  function apply(array, depth, createResult, setResult) {
	    if (depth >= keys.length) return rollup != null
	        ? rollup(array) : (sortValues != null
	        ? array.sort(sortValues)
	        : array);
	
	    var i = -1,
	        n = array.length,
	        key = keys[depth++],
	        keyValue,
	        value,
	        valuesByKey = map(),
	        values,
	        result = createResult();
	
	    while (++i < n) {
	      if (values = valuesByKey.get(keyValue = key(value = array[i]) + "")) {
	        values.push(value);
	      } else {
	        valuesByKey.set(keyValue, [value]);
	      }
	    }
	
	    valuesByKey.each(function(values, key) {
	      setResult(result, key, apply(values, depth, createResult, setResult));
	    });
	
	    return result;
	  }
	
	  function entries(map$$1, depth) {
	    if (++depth > keys.length) return map$$1;
	    var array, sortKey = sortKeys[depth - 1];
	    if (rollup != null && depth >= keys.length) array = map$$1.entries();
	    else array = [], map$$1.each(function(v, k) { array.push({key: k, values: entries(v, depth)}); });
	    return sortKey != null ? array.sort(function(a, b) { return sortKey(a.key, b.key); }) : array;
	  }
	
	  return nest = {
	    object: function(array) { return apply(array, 0, createObject, setObject); },
	    map: function(array) { return apply(array, 0, createMap, setMap); },
	    entries: function(array) { return entries(apply(array, 0, createMap, setMap), 0); },
	    key: function(d) { keys.push(d); return nest; },
	    sortKeys: function(order) { sortKeys[keys.length - 1] = order; return nest; },
	    sortValues: function(order) { sortValues = order; return nest; },
	    rollup: function(f) { rollup = f; return nest; }
	  };
	};
	
	function createObject() {
	  return {};
	}
	
	function setObject(object, key, value) {
	  object[key] = value;
	}
	
	function createMap() {
	  return map();
	}
	
	function setMap(map$$1, key, value) {
	  map$$1.set(key, value);
	}
	
	function Set() {}
	
	var proto = map.prototype;
	
	Set.prototype = set.prototype = {
	  constructor: Set,
	  has: proto.has,
	  add: function(value) {
	    value += "";
	    this[prefix + value] = value;
	    return this;
	  },
	  remove: proto.remove,
	  clear: proto.clear,
	  values: proto.keys,
	  size: proto.size,
	  empty: proto.empty,
	  each: proto.each
	};
	
	function set(object, f) {
	  var set = new Set;
	
	  // Copy constructor.
	  if (object instanceof Set) object.each(function(value) { set.add(value); });
	
	  // Otherwise, assume it’s an array.
	  else if (object) {
	    var i = -1, n = object.length;
	    if (f == null) while (++i < n) set.add(object[i]);
	    else while (++i < n) set.add(f(object[i], i, object));
	  }
	
	  return set;
	}
	
	var keys = function(map) {
	  var keys = [];
	  for (var key in map) keys.push(key);
	  return keys;
	};
	
	var values = function(map) {
	  var values = [];
	  for (var key in map) values.push(map[key]);
	  return values;
	};
	
	var entries = function(map) {
	  var entries = [];
	  for (var key in map) entries.push({key: key, value: map[key]});
	  return entries;
	};
	
	exports.nest = nest;
	exports.set = set;
	exports.map = map;
	exports.keys = keys;
	exports.values = values;
	exports.entries = entries;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-dispatch/ Version 1.0.3. Copyright 2017 Mike Bostock.
	(function (global, factory) {
		 true ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';
	
	var noop = {value: function() {}};
	
	function dispatch() {
	  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
	    if (!(t = arguments[i] + "") || (t in _)) throw new Error("illegal type: " + t);
	    _[t] = [];
	  }
	  return new Dispatch(_);
	}
	
	function Dispatch(_) {
	  this._ = _;
	}
	
	function parseTypenames(typenames, types) {
	  return typenames.trim().split(/^|\s+/).map(function(t) {
	    var name = "", i = t.indexOf(".");
	    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
	    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
	    return {type: t, name: name};
	  });
	}
	
	Dispatch.prototype = dispatch.prototype = {
	  constructor: Dispatch,
	  on: function(typename, callback) {
	    var _ = this._,
	        T = parseTypenames(typename + "", _),
	        t,
	        i = -1,
	        n = T.length;
	
	    // If no callback was specified, return the callback of the given type and name.
	    if (arguments.length < 2) {
	      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
	      return;
	    }
	
	    // If a type was specified, set the callback for the given type and name.
	    // Otherwise, if a null callback was specified, remove callbacks of the given name.
	    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
	    while (++i < n) {
	      if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
	      else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
	    }
	
	    return this;
	  },
	  copy: function() {
	    var copy = {}, _ = this._;
	    for (var t in _) copy[t] = _[t].slice();
	    return new Dispatch(copy);
	  },
	  call: function(type, that) {
	    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
	    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
	    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
	  },
	  apply: function(type, that, args) {
	    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
	    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
	  }
	};
	
	function get(type, name) {
	  for (var i = 0, n = type.length, c; i < n; ++i) {
	    if ((c = type[i]).name === name) {
	      return c.value;
	    }
	  }
	}
	
	function set(type, name, callback) {
	  for (var i = 0, n = type.length; i < n; ++i) {
	    if (type[i].name === name) {
	      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
	      break;
	    }
	  }
	  if (callback != null) type.push({name: name, value: callback});
	  return type;
	}
	
	exports.dispatch = dispatch;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-ease/ Version 1.0.3. Copyright 2017 Mike Bostock.
	(function (global, factory) {
		 true ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';
	
	function linear(t) {
	  return +t;
	}
	
	function quadIn(t) {
	  return t * t;
	}
	
	function quadOut(t) {
	  return t * (2 - t);
	}
	
	function quadInOut(t) {
	  return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
	}
	
	function cubicIn(t) {
	  return t * t * t;
	}
	
	function cubicOut(t) {
	  return --t * t * t + 1;
	}
	
	function cubicInOut(t) {
	  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
	}
	
	var exponent = 3;
	
	var polyIn = (function custom(e) {
	  e = +e;
	
	  function polyIn(t) {
	    return Math.pow(t, e);
	  }
	
	  polyIn.exponent = custom;
	
	  return polyIn;
	})(exponent);
	
	var polyOut = (function custom(e) {
	  e = +e;
	
	  function polyOut(t) {
	    return 1 - Math.pow(1 - t, e);
	  }
	
	  polyOut.exponent = custom;
	
	  return polyOut;
	})(exponent);
	
	var polyInOut = (function custom(e) {
	  e = +e;
	
	  function polyInOut(t) {
	    return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
	  }
	
	  polyInOut.exponent = custom;
	
	  return polyInOut;
	})(exponent);
	
	var pi = Math.PI;
	var halfPi = pi / 2;
	
	function sinIn(t) {
	  return 1 - Math.cos(t * halfPi);
	}
	
	function sinOut(t) {
	  return Math.sin(t * halfPi);
	}
	
	function sinInOut(t) {
	  return (1 - Math.cos(pi * t)) / 2;
	}
	
	function expIn(t) {
	  return Math.pow(2, 10 * t - 10);
	}
	
	function expOut(t) {
	  return 1 - Math.pow(2, -10 * t);
	}
	
	function expInOut(t) {
	  return ((t *= 2) <= 1 ? Math.pow(2, 10 * t - 10) : 2 - Math.pow(2, 10 - 10 * t)) / 2;
	}
	
	function circleIn(t) {
	  return 1 - Math.sqrt(1 - t * t);
	}
	
	function circleOut(t) {
	  return Math.sqrt(1 - --t * t);
	}
	
	function circleInOut(t) {
	  return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
	}
	
	var b1 = 4 / 11;
	var b2 = 6 / 11;
	var b3 = 8 / 11;
	var b4 = 3 / 4;
	var b5 = 9 / 11;
	var b6 = 10 / 11;
	var b7 = 15 / 16;
	var b8 = 21 / 22;
	var b9 = 63 / 64;
	var b0 = 1 / b1 / b1;
	
	function bounceIn(t) {
	  return 1 - bounceOut(1 - t);
	}
	
	function bounceOut(t) {
	  return (t = +t) < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9;
	}
	
	function bounceInOut(t) {
	  return ((t *= 2) <= 1 ? 1 - bounceOut(1 - t) : bounceOut(t - 1) + 1) / 2;
	}
	
	var overshoot = 1.70158;
	
	var backIn = (function custom(s) {
	  s = +s;
	
	  function backIn(t) {
	    return t * t * ((s + 1) * t - s);
	  }
	
	  backIn.overshoot = custom;
	
	  return backIn;
	})(overshoot);
	
	var backOut = (function custom(s) {
	  s = +s;
	
	  function backOut(t) {
	    return --t * t * ((s + 1) * t + s) + 1;
	  }
	
	  backOut.overshoot = custom;
	
	  return backOut;
	})(overshoot);
	
	var backInOut = (function custom(s) {
	  s = +s;
	
	  function backInOut(t) {
	    return ((t *= 2) < 1 ? t * t * ((s + 1) * t - s) : (t -= 2) * t * ((s + 1) * t + s) + 2) / 2;
	  }
	
	  backInOut.overshoot = custom;
	
	  return backInOut;
	})(overshoot);
	
	var tau = 2 * Math.PI;
	var amplitude = 1;
	var period = 0.3;
	
	var elasticIn = (function custom(a, p) {
	  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
	
	  function elasticIn(t) {
	    return a * Math.pow(2, 10 * --t) * Math.sin((s - t) / p);
	  }
	
	  elasticIn.amplitude = function(a) { return custom(a, p * tau); };
	  elasticIn.period = function(p) { return custom(a, p); };
	
	  return elasticIn;
	})(amplitude, period);
	
	var elasticOut = (function custom(a, p) {
	  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
	
	  function elasticOut(t) {
	    return 1 - a * Math.pow(2, -10 * (t = +t)) * Math.sin((t + s) / p);
	  }
	
	  elasticOut.amplitude = function(a) { return custom(a, p * tau); };
	  elasticOut.period = function(p) { return custom(a, p); };
	
	  return elasticOut;
	})(amplitude, period);
	
	var elasticInOut = (function custom(a, p) {
	  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
	
	  function elasticInOut(t) {
	    return ((t = t * 2 - 1) < 0
	        ? a * Math.pow(2, 10 * t) * Math.sin((s - t) / p)
	        : 2 - a * Math.pow(2, -10 * t) * Math.sin((s + t) / p)) / 2;
	  }
	
	  elasticInOut.amplitude = function(a) { return custom(a, p * tau); };
	  elasticInOut.period = function(p) { return custom(a, p); };
	
	  return elasticInOut;
	})(amplitude, period);
	
	exports.easeLinear = linear;
	exports.easeQuad = quadInOut;
	exports.easeQuadIn = quadIn;
	exports.easeQuadOut = quadOut;
	exports.easeQuadInOut = quadInOut;
	exports.easeCubic = cubicInOut;
	exports.easeCubicIn = cubicIn;
	exports.easeCubicOut = cubicOut;
	exports.easeCubicInOut = cubicInOut;
	exports.easePoly = polyInOut;
	exports.easePolyIn = polyIn;
	exports.easePolyOut = polyOut;
	exports.easePolyInOut = polyInOut;
	exports.easeSin = sinInOut;
	exports.easeSinIn = sinIn;
	exports.easeSinOut = sinOut;
	exports.easeSinInOut = sinInOut;
	exports.easeExp = expInOut;
	exports.easeExpIn = expIn;
	exports.easeExpOut = expOut;
	exports.easeExpInOut = expInOut;
	exports.easeCircle = circleInOut;
	exports.easeCircleIn = circleIn;
	exports.easeCircleOut = circleOut;
	exports.easeCircleInOut = circleInOut;
	exports.easeBounce = bounceOut;
	exports.easeBounceIn = bounceIn;
	exports.easeBounceOut = bounceOut;
	exports.easeBounceInOut = bounceInOut;
	exports.easeBack = backInOut;
	exports.easeBackIn = backIn;
	exports.easeBackOut = backOut;
	exports.easeBackInOut = backInOut;
	exports.easeElastic = elasticOut;
	exports.easeElasticIn = elasticIn;
	exports.easeElasticOut = elasticOut;
	exports.easeElasticInOut = elasticInOut;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-scale/ Version 1.0.6. Copyright 2017 Mike Bostock.
	(function (global, factory) {
		 true ? factory(exports, __webpack_require__(9), __webpack_require__(11), __webpack_require__(15), __webpack_require__(17), __webpack_require__(18), __webpack_require__(19), __webpack_require__(16)) :
		typeof define === 'function' && define.amd ? define(['exports', 'd3-array', 'd3-collection', 'd3-interpolate', 'd3-format', 'd3-time', 'd3-time-format', 'd3-color'], factory) :
		(factory((global.d3 = global.d3 || {}),global.d3,global.d3,global.d3,global.d3,global.d3,global.d3,global.d3));
	}(this, (function (exports,d3Array,d3Collection,d3Interpolate,d3Format,d3Time,d3TimeFormat,d3Color) { 'use strict';
	
	var array = Array.prototype;
	
	var map$1 = array.map;
	var slice = array.slice;
	
	var implicit = {name: "implicit"};
	
	function ordinal(range$$1) {
	  var index = d3Collection.map(),
	      domain = [],
	      unknown = implicit;
	
	  range$$1 = range$$1 == null ? [] : slice.call(range$$1);
	
	  function scale(d) {
	    var key = d + "", i = index.get(key);
	    if (!i) {
	      if (unknown !== implicit) return unknown;
	      index.set(key, i = domain.push(d));
	    }
	    return range$$1[(i - 1) % range$$1.length];
	  }
	
	  scale.domain = function(_) {
	    if (!arguments.length) return domain.slice();
	    domain = [], index = d3Collection.map();
	    var i = -1, n = _.length, d, key;
	    while (++i < n) if (!index.has(key = (d = _[i]) + "")) index.set(key, domain.push(d));
	    return scale;
	  };
	
	  scale.range = function(_) {
	    return arguments.length ? (range$$1 = slice.call(_), scale) : range$$1.slice();
	  };
	
	  scale.unknown = function(_) {
	    return arguments.length ? (unknown = _, scale) : unknown;
	  };
	
	  scale.copy = function() {
	    return ordinal()
	        .domain(domain)
	        .range(range$$1)
	        .unknown(unknown);
	  };
	
	  return scale;
	}
	
	function band() {
	  var scale = ordinal().unknown(undefined),
	      domain = scale.domain,
	      ordinalRange = scale.range,
	      range$$1 = [0, 1],
	      step,
	      bandwidth,
	      round = false,
	      paddingInner = 0,
	      paddingOuter = 0,
	      align = 0.5;
	
	  delete scale.unknown;
	
	  function rescale() {
	    var n = domain().length,
	        reverse = range$$1[1] < range$$1[0],
	        start = range$$1[reverse - 0],
	        stop = range$$1[1 - reverse];
	    step = (stop - start) / Math.max(1, n - paddingInner + paddingOuter * 2);
	    if (round) step = Math.floor(step);
	    start += (stop - start - step * (n - paddingInner)) * align;
	    bandwidth = step * (1 - paddingInner);
	    if (round) start = Math.round(start), bandwidth = Math.round(bandwidth);
	    var values = d3Array.range(n).map(function(i) { return start + step * i; });
	    return ordinalRange(reverse ? values.reverse() : values);
	  }
	
	  scale.domain = function(_) {
	    return arguments.length ? (domain(_), rescale()) : domain();
	  };
	
	  scale.range = function(_) {
	    return arguments.length ? (range$$1 = [+_[0], +_[1]], rescale()) : range$$1.slice();
	  };
	
	  scale.rangeRound = function(_) {
	    return range$$1 = [+_[0], +_[1]], round = true, rescale();
	  };
	
	  scale.bandwidth = function() {
	    return bandwidth;
	  };
	
	  scale.step = function() {
	    return step;
	  };
	
	  scale.round = function(_) {
	    return arguments.length ? (round = !!_, rescale()) : round;
	  };
	
	  scale.padding = function(_) {
	    return arguments.length ? (paddingInner = paddingOuter = Math.max(0, Math.min(1, _)), rescale()) : paddingInner;
	  };
	
	  scale.paddingInner = function(_) {
	    return arguments.length ? (paddingInner = Math.max(0, Math.min(1, _)), rescale()) : paddingInner;
	  };
	
	  scale.paddingOuter = function(_) {
	    return arguments.length ? (paddingOuter = Math.max(0, Math.min(1, _)), rescale()) : paddingOuter;
	  };
	
	  scale.align = function(_) {
	    return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
	  };
	
	  scale.copy = function() {
	    return band()
	        .domain(domain())
	        .range(range$$1)
	        .round(round)
	        .paddingInner(paddingInner)
	        .paddingOuter(paddingOuter)
	        .align(align);
	  };
	
	  return rescale();
	}
	
	function pointish(scale) {
	  var copy = scale.copy;
	
	  scale.padding = scale.paddingOuter;
	  delete scale.paddingInner;
	  delete scale.paddingOuter;
	
	  scale.copy = function() {
	    return pointish(copy());
	  };
	
	  return scale;
	}
	
	function point() {
	  return pointish(band().paddingInner(1));
	}
	
	var constant = function(x) {
	  return function() {
	    return x;
	  };
	};
	
	var number = function(x) {
	  return +x;
	};
	
	var unit = [0, 1];
	
	function deinterpolateLinear(a, b) {
	  return (b -= (a = +a))
	      ? function(x) { return (x - a) / b; }
	      : constant(b);
	}
	
	function deinterpolateClamp(deinterpolate) {
	  return function(a, b) {
	    var d = deinterpolate(a = +a, b = +b);
	    return function(x) { return x <= a ? 0 : x >= b ? 1 : d(x); };
	  };
	}
	
	function reinterpolateClamp(reinterpolate) {
	  return function(a, b) {
	    var r = reinterpolate(a = +a, b = +b);
	    return function(t) { return t <= 0 ? a : t >= 1 ? b : r(t); };
	  };
	}
	
	function bimap(domain, range$$1, deinterpolate, reinterpolate) {
	  var d0 = domain[0], d1 = domain[1], r0 = range$$1[0], r1 = range$$1[1];
	  if (d1 < d0) d0 = deinterpolate(d1, d0), r0 = reinterpolate(r1, r0);
	  else d0 = deinterpolate(d0, d1), r0 = reinterpolate(r0, r1);
	  return function(x) { return r0(d0(x)); };
	}
	
	function polymap(domain, range$$1, deinterpolate, reinterpolate) {
	  var j = Math.min(domain.length, range$$1.length) - 1,
	      d = new Array(j),
	      r = new Array(j),
	      i = -1;
	
	  // Reverse descending domains.
	  if (domain[j] < domain[0]) {
	    domain = domain.slice().reverse();
	    range$$1 = range$$1.slice().reverse();
	  }
	
	  while (++i < j) {
	    d[i] = deinterpolate(domain[i], domain[i + 1]);
	    r[i] = reinterpolate(range$$1[i], range$$1[i + 1]);
	  }
	
	  return function(x) {
	    var i = d3Array.bisect(domain, x, 1, j) - 1;
	    return r[i](d[i](x));
	  };
	}
	
	function copy(source, target) {
	  return target
	      .domain(source.domain())
	      .range(source.range())
	      .interpolate(source.interpolate())
	      .clamp(source.clamp());
	}
	
	// deinterpolate(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
	// reinterpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding domain value x in [a,b].
	function continuous(deinterpolate, reinterpolate) {
	  var domain = unit,
	      range$$1 = unit,
	      interpolate$$1 = d3Interpolate.interpolate,
	      clamp = false,
	      piecewise,
	      output,
	      input;
	
	  function rescale() {
	    piecewise = Math.min(domain.length, range$$1.length) > 2 ? polymap : bimap;
	    output = input = null;
	    return scale;
	  }
	
	  function scale(x) {
	    return (output || (output = piecewise(domain, range$$1, clamp ? deinterpolateClamp(deinterpolate) : deinterpolate, interpolate$$1)))(+x);
	  }
	
	  scale.invert = function(y) {
	    return (input || (input = piecewise(range$$1, domain, deinterpolateLinear, clamp ? reinterpolateClamp(reinterpolate) : reinterpolate)))(+y);
	  };
	
	  scale.domain = function(_) {
	    return arguments.length ? (domain = map$1.call(_, number), rescale()) : domain.slice();
	  };
	
	  scale.range = function(_) {
	    return arguments.length ? (range$$1 = slice.call(_), rescale()) : range$$1.slice();
	  };
	
	  scale.rangeRound = function(_) {
	    return range$$1 = slice.call(_), interpolate$$1 = d3Interpolate.interpolateRound, rescale();
	  };
	
	  scale.clamp = function(_) {
	    return arguments.length ? (clamp = !!_, rescale()) : clamp;
	  };
	
	  scale.interpolate = function(_) {
	    return arguments.length ? (interpolate$$1 = _, rescale()) : interpolate$$1;
	  };
	
	  return rescale();
	}
	
	var tickFormat = function(domain, count, specifier) {
	  var start = domain[0],
	      stop = domain[domain.length - 1],
	      step = d3Array.tickStep(start, stop, count == null ? 10 : count),
	      precision;
	  specifier = d3Format.formatSpecifier(specifier == null ? ",f" : specifier);
	  switch (specifier.type) {
	    case "s": {
	      var value = Math.max(Math.abs(start), Math.abs(stop));
	      if (specifier.precision == null && !isNaN(precision = d3Format.precisionPrefix(step, value))) specifier.precision = precision;
	      return d3Format.formatPrefix(specifier, value);
	    }
	    case "":
	    case "e":
	    case "g":
	    case "p":
	    case "r": {
	      if (specifier.precision == null && !isNaN(precision = d3Format.precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
	      break;
	    }
	    case "f":
	    case "%": {
	      if (specifier.precision == null && !isNaN(precision = d3Format.precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
	      break;
	    }
	  }
	  return d3Format.format(specifier);
	};
	
	function linearish(scale) {
	  var domain = scale.domain;
	
	  scale.ticks = function(count) {
	    var d = domain();
	    return d3Array.ticks(d[0], d[d.length - 1], count == null ? 10 : count);
	  };
	
	  scale.tickFormat = function(count, specifier) {
	    return tickFormat(domain(), count, specifier);
	  };
	
	  scale.nice = function(count) {
	    if (count == null) count = 10;
	
	    var d = domain(),
	        i0 = 0,
	        i1 = d.length - 1,
	        start = d[i0],
	        stop = d[i1],
	        step;
	
	    if (stop < start) {
	      step = start, start = stop, stop = step;
	      step = i0, i0 = i1, i1 = step;
	    }
	
	    step = d3Array.tickIncrement(start, stop, count);
	
	    if (step > 0) {
	      start = Math.floor(start / step) * step;
	      stop = Math.ceil(stop / step) * step;
	      step = d3Array.tickIncrement(start, stop, count);
	    } else if (step < 0) {
	      start = Math.ceil(start * step) / step;
	      stop = Math.floor(stop * step) / step;
	      step = d3Array.tickIncrement(start, stop, count);
	    }
	
	    if (step > 0) {
	      d[i0] = Math.floor(start / step) * step;
	      d[i1] = Math.ceil(stop / step) * step;
	      domain(d);
	    } else if (step < 0) {
	      d[i0] = Math.ceil(start * step) / step;
	      d[i1] = Math.floor(stop * step) / step;
	      domain(d);
	    }
	
	    return scale;
	  };
	
	  return scale;
	}
	
	function linear() {
	  var scale = continuous(deinterpolateLinear, d3Interpolate.interpolateNumber);
	
	  scale.copy = function() {
	    return copy(scale, linear());
	  };
	
	  return linearish(scale);
	}
	
	function identity() {
	  var domain = [0, 1];
	
	  function scale(x) {
	    return +x;
	  }
	
	  scale.invert = scale;
	
	  scale.domain = scale.range = function(_) {
	    return arguments.length ? (domain = map$1.call(_, number), scale) : domain.slice();
	  };
	
	  scale.copy = function() {
	    return identity().domain(domain);
	  };
	
	  return linearish(scale);
	}
	
	var nice = function(domain, interval) {
	  domain = domain.slice();
	
	  var i0 = 0,
	      i1 = domain.length - 1,
	      x0 = domain[i0],
	      x1 = domain[i1],
	      t;
	
	  if (x1 < x0) {
	    t = i0, i0 = i1, i1 = t;
	    t = x0, x0 = x1, x1 = t;
	  }
	
	  domain[i0] = interval.floor(x0);
	  domain[i1] = interval.ceil(x1);
	  return domain;
	};
	
	function deinterpolate(a, b) {
	  return (b = Math.log(b / a))
	      ? function(x) { return Math.log(x / a) / b; }
	      : constant(b);
	}
	
	function reinterpolate(a, b) {
	  return a < 0
	      ? function(t) { return -Math.pow(-b, t) * Math.pow(-a, 1 - t); }
	      : function(t) { return Math.pow(b, t) * Math.pow(a, 1 - t); };
	}
	
	function pow10(x) {
	  return isFinite(x) ? +("1e" + x) : x < 0 ? 0 : x;
	}
	
	function powp(base) {
	  return base === 10 ? pow10
	      : base === Math.E ? Math.exp
	      : function(x) { return Math.pow(base, x); };
	}
	
	function logp(base) {
	  return base === Math.E ? Math.log
	      : base === 10 && Math.log10
	      || base === 2 && Math.log2
	      || (base = Math.log(base), function(x) { return Math.log(x) / base; });
	}
	
	function reflect(f) {
	  return function(x) {
	    return -f(-x);
	  };
	}
	
	function log() {
	  var scale = continuous(deinterpolate, reinterpolate).domain([1, 10]),
	      domain = scale.domain,
	      base = 10,
	      logs = logp(10),
	      pows = powp(10);
	
	  function rescale() {
	    logs = logp(base), pows = powp(base);
	    if (domain()[0] < 0) logs = reflect(logs), pows = reflect(pows);
	    return scale;
	  }
	
	  scale.base = function(_) {
	    return arguments.length ? (base = +_, rescale()) : base;
	  };
	
	  scale.domain = function(_) {
	    return arguments.length ? (domain(_), rescale()) : domain();
	  };
	
	  scale.ticks = function(count) {
	    var d = domain(),
	        u = d[0],
	        v = d[d.length - 1],
	        r;
	
	    if (r = v < u) i = u, u = v, v = i;
	
	    var i = logs(u),
	        j = logs(v),
	        p,
	        k,
	        t,
	        n = count == null ? 10 : +count,
	        z = [];
	
	    if (!(base % 1) && j - i < n) {
	      i = Math.round(i) - 1, j = Math.round(j) + 1;
	      if (u > 0) for (; i < j; ++i) {
	        for (k = 1, p = pows(i); k < base; ++k) {
	          t = p * k;
	          if (t < u) continue;
	          if (t > v) break;
	          z.push(t);
	        }
	      } else for (; i < j; ++i) {
	        for (k = base - 1, p = pows(i); k >= 1; --k) {
	          t = p * k;
	          if (t < u) continue;
	          if (t > v) break;
	          z.push(t);
	        }
	      }
	    } else {
	      z = d3Array.ticks(i, j, Math.min(j - i, n)).map(pows);
	    }
	
	    return r ? z.reverse() : z;
	  };
	
	  scale.tickFormat = function(count, specifier) {
	    if (specifier == null) specifier = base === 10 ? ".0e" : ",";
	    if (typeof specifier !== "function") specifier = d3Format.format(specifier);
	    if (count === Infinity) return specifier;
	    if (count == null) count = 10;
	    var k = Math.max(1, base * count / scale.ticks().length); // TODO fast estimate?
	    return function(d) {
	      var i = d / pows(Math.round(logs(d)));
	      if (i * base < base - 0.5) i *= base;
	      return i <= k ? specifier(d) : "";
	    };
	  };
	
	  scale.nice = function() {
	    return domain(nice(domain(), {
	      floor: function(x) { return pows(Math.floor(logs(x))); },
	      ceil: function(x) { return pows(Math.ceil(logs(x))); }
	    }));
	  };
	
	  scale.copy = function() {
	    return copy(scale, log().base(base));
	  };
	
	  return scale;
	}
	
	function raise(x, exponent) {
	  return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
	}
	
	function pow() {
	  var exponent = 1,
	      scale = continuous(deinterpolate, reinterpolate),
	      domain = scale.domain;
	
	  function deinterpolate(a, b) {
	    return (b = raise(b, exponent) - (a = raise(a, exponent)))
	        ? function(x) { return (raise(x, exponent) - a) / b; }
	        : constant(b);
	  }
	
	  function reinterpolate(a, b) {
	    b = raise(b, exponent) - (a = raise(a, exponent));
	    return function(t) { return raise(a + b * t, 1 / exponent); };
	  }
	
	  scale.exponent = function(_) {
	    return arguments.length ? (exponent = +_, domain(domain())) : exponent;
	  };
	
	  scale.copy = function() {
	    return copy(scale, pow().exponent(exponent));
	  };
	
	  return linearish(scale);
	}
	
	function sqrt() {
	  return pow().exponent(0.5);
	}
	
	function quantile$1() {
	  var domain = [],
	      range$$1 = [],
	      thresholds = [];
	
	  function rescale() {
	    var i = 0, n = Math.max(1, range$$1.length);
	    thresholds = new Array(n - 1);
	    while (++i < n) thresholds[i - 1] = d3Array.quantile(domain, i / n);
	    return scale;
	  }
	
	  function scale(x) {
	    if (!isNaN(x = +x)) return range$$1[d3Array.bisect(thresholds, x)];
	  }
	
	  scale.invertExtent = function(y) {
	    var i = range$$1.indexOf(y);
	    return i < 0 ? [NaN, NaN] : [
	      i > 0 ? thresholds[i - 1] : domain[0],
	      i < thresholds.length ? thresholds[i] : domain[domain.length - 1]
	    ];
	  };
	
	  scale.domain = function(_) {
	    if (!arguments.length) return domain.slice();
	    domain = [];
	    for (var i = 0, n = _.length, d; i < n; ++i) if (d = _[i], d != null && !isNaN(d = +d)) domain.push(d);
	    domain.sort(d3Array.ascending);
	    return rescale();
	  };
	
	  scale.range = function(_) {
	    return arguments.length ? (range$$1 = slice.call(_), rescale()) : range$$1.slice();
	  };
	
	  scale.quantiles = function() {
	    return thresholds.slice();
	  };
	
	  scale.copy = function() {
	    return quantile$1()
	        .domain(domain)
	        .range(range$$1);
	  };
	
	  return scale;
	}
	
	function quantize() {
	  var x0 = 0,
	      x1 = 1,
	      n = 1,
	      domain = [0.5],
	      range$$1 = [0, 1];
	
	  function scale(x) {
	    if (x <= x) return range$$1[d3Array.bisect(domain, x, 0, n)];
	  }
	
	  function rescale() {
	    var i = -1;
	    domain = new Array(n);
	    while (++i < n) domain[i] = ((i + 1) * x1 - (i - n) * x0) / (n + 1);
	    return scale;
	  }
	
	  scale.domain = function(_) {
	    return arguments.length ? (x0 = +_[0], x1 = +_[1], rescale()) : [x0, x1];
	  };
	
	  scale.range = function(_) {
	    return arguments.length ? (n = (range$$1 = slice.call(_)).length - 1, rescale()) : range$$1.slice();
	  };
	
	  scale.invertExtent = function(y) {
	    var i = range$$1.indexOf(y);
	    return i < 0 ? [NaN, NaN]
	        : i < 1 ? [x0, domain[0]]
	        : i >= n ? [domain[n - 1], x1]
	        : [domain[i - 1], domain[i]];
	  };
	
	  scale.copy = function() {
	    return quantize()
	        .domain([x0, x1])
	        .range(range$$1);
	  };
	
	  return linearish(scale);
	}
	
	function threshold() {
	  var domain = [0.5],
	      range$$1 = [0, 1],
	      n = 1;
	
	  function scale(x) {
	    if (x <= x) return range$$1[d3Array.bisect(domain, x, 0, n)];
	  }
	
	  scale.domain = function(_) {
	    return arguments.length ? (domain = slice.call(_), n = Math.min(domain.length, range$$1.length - 1), scale) : domain.slice();
	  };
	
	  scale.range = function(_) {
	    return arguments.length ? (range$$1 = slice.call(_), n = Math.min(domain.length, range$$1.length - 1), scale) : range$$1.slice();
	  };
	
	  scale.invertExtent = function(y) {
	    var i = range$$1.indexOf(y);
	    return [domain[i - 1], domain[i]];
	  };
	
	  scale.copy = function() {
	    return threshold()
	        .domain(domain)
	        .range(range$$1);
	  };
	
	  return scale;
	}
	
	var durationSecond = 1000;
	var durationMinute = durationSecond * 60;
	var durationHour = durationMinute * 60;
	var durationDay = durationHour * 24;
	var durationWeek = durationDay * 7;
	var durationMonth = durationDay * 30;
	var durationYear = durationDay * 365;
	
	function date(t) {
	  return new Date(t);
	}
	
	function number$1(t) {
	  return t instanceof Date ? +t : +new Date(+t);
	}
	
	function calendar(year, month, week, day, hour, minute, second, millisecond, format$$1) {
	  var scale = continuous(deinterpolateLinear, d3Interpolate.interpolateNumber),
	      invert = scale.invert,
	      domain = scale.domain;
	
	  var formatMillisecond = format$$1(".%L"),
	      formatSecond = format$$1(":%S"),
	      formatMinute = format$$1("%I:%M"),
	      formatHour = format$$1("%I %p"),
	      formatDay = format$$1("%a %d"),
	      formatWeek = format$$1("%b %d"),
	      formatMonth = format$$1("%B"),
	      formatYear = format$$1("%Y");
	
	  var tickIntervals = [
	    [second,  1,      durationSecond],
	    [second,  5,  5 * durationSecond],
	    [second, 15, 15 * durationSecond],
	    [second, 30, 30 * durationSecond],
	    [minute,  1,      durationMinute],
	    [minute,  5,  5 * durationMinute],
	    [minute, 15, 15 * durationMinute],
	    [minute, 30, 30 * durationMinute],
	    [  hour,  1,      durationHour  ],
	    [  hour,  3,  3 * durationHour  ],
	    [  hour,  6,  6 * durationHour  ],
	    [  hour, 12, 12 * durationHour  ],
	    [   day,  1,      durationDay   ],
	    [   day,  2,  2 * durationDay   ],
	    [  week,  1,      durationWeek  ],
	    [ month,  1,      durationMonth ],
	    [ month,  3,  3 * durationMonth ],
	    [  year,  1,      durationYear  ]
	  ];
	
	  function tickFormat(date) {
	    return (second(date) < date ? formatMillisecond
	        : minute(date) < date ? formatSecond
	        : hour(date) < date ? formatMinute
	        : day(date) < date ? formatHour
	        : month(date) < date ? (week(date) < date ? formatDay : formatWeek)
	        : year(date) < date ? formatMonth
	        : formatYear)(date);
	  }
	
	  function tickInterval(interval, start, stop, step) {
	    if (interval == null) interval = 10;
	
	    // If a desired tick count is specified, pick a reasonable tick interval
	    // based on the extent of the domain and a rough estimate of tick size.
	    // Otherwise, assume interval is already a time interval and use it.
	    if (typeof interval === "number") {
	      var target = Math.abs(stop - start) / interval,
	          i = d3Array.bisector(function(i) { return i[2]; }).right(tickIntervals, target);
	      if (i === tickIntervals.length) {
	        step = d3Array.tickStep(start / durationYear, stop / durationYear, interval);
	        interval = year;
	      } else if (i) {
	        i = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
	        step = i[1];
	        interval = i[0];
	      } else {
	        step = d3Array.tickStep(start, stop, interval);
	        interval = millisecond;
	      }
	    }
	
	    return step == null ? interval : interval.every(step);
	  }
	
	  scale.invert = function(y) {
	    return new Date(invert(y));
	  };
	
	  scale.domain = function(_) {
	    return arguments.length ? domain(map$1.call(_, number$1)) : domain().map(date);
	  };
	
	  scale.ticks = function(interval, step) {
	    var d = domain(),
	        t0 = d[0],
	        t1 = d[d.length - 1],
	        r = t1 < t0,
	        t;
	    if (r) t = t0, t0 = t1, t1 = t;
	    t = tickInterval(interval, t0, t1, step);
	    t = t ? t.range(t0, t1 + 1) : []; // inclusive stop
	    return r ? t.reverse() : t;
	  };
	
	  scale.tickFormat = function(count, specifier) {
	    return specifier == null ? tickFormat : format$$1(specifier);
	  };
	
	  scale.nice = function(interval, step) {
	    var d = domain();
	    return (interval = tickInterval(interval, d[0], d[d.length - 1], step))
	        ? domain(nice(d, interval))
	        : scale;
	  };
	
	  scale.copy = function() {
	    return copy(scale, calendar(year, month, week, day, hour, minute, second, millisecond, format$$1));
	  };
	
	  return scale;
	}
	
	var time = function() {
	  return calendar(d3Time.timeYear, d3Time.timeMonth, d3Time.timeWeek, d3Time.timeDay, d3Time.timeHour, d3Time.timeMinute, d3Time.timeSecond, d3Time.timeMillisecond, d3TimeFormat.timeFormat).domain([new Date(2000, 0, 1), new Date(2000, 0, 2)]);
	};
	
	var utcTime = function() {
	  return calendar(d3Time.utcYear, d3Time.utcMonth, d3Time.utcWeek, d3Time.utcDay, d3Time.utcHour, d3Time.utcMinute, d3Time.utcSecond, d3Time.utcMillisecond, d3TimeFormat.utcFormat).domain([Date.UTC(2000, 0, 1), Date.UTC(2000, 0, 2)]);
	};
	
	var colors = function(s) {
	  return s.match(/.{6}/g).map(function(x) {
	    return "#" + x;
	  });
	};
	
	var category10 = colors("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");
	
	var category20b = colors("393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6");
	
	var category20c = colors("3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9");
	
	var category20 = colors("1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5");
	
	var cubehelix$1 = d3Interpolate.interpolateCubehelixLong(d3Color.cubehelix(300, 0.5, 0.0), d3Color.cubehelix(-240, 0.5, 1.0));
	
	var warm = d3Interpolate.interpolateCubehelixLong(d3Color.cubehelix(-100, 0.75, 0.35), d3Color.cubehelix(80, 1.50, 0.8));
	
	var cool = d3Interpolate.interpolateCubehelixLong(d3Color.cubehelix(260, 0.75, 0.35), d3Color.cubehelix(80, 1.50, 0.8));
	
	var rainbow = d3Color.cubehelix();
	
	var rainbow$1 = function(t) {
	  if (t < 0 || t > 1) t -= Math.floor(t);
	  var ts = Math.abs(t - 0.5);
	  rainbow.h = 360 * t - 100;
	  rainbow.s = 1.5 - 1.5 * ts;
	  rainbow.l = 0.8 - 0.9 * ts;
	  return rainbow + "";
	};
	
	function ramp(range$$1) {
	  var n = range$$1.length;
	  return function(t) {
	    return range$$1[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
	  };
	}
	
	var viridis = ramp(colors("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"));
	
	var magma = ramp(colors("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"));
	
	var inferno = ramp(colors("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4"));
	
	var plasma = ramp(colors("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));
	
	function sequential(interpolator) {
	  var x0 = 0,
	      x1 = 1,
	      clamp = false;
	
	  function scale(x) {
	    var t = (x - x0) / (x1 - x0);
	    return interpolator(clamp ? Math.max(0, Math.min(1, t)) : t);
	  }
	
	  scale.domain = function(_) {
	    return arguments.length ? (x0 = +_[0], x1 = +_[1], scale) : [x0, x1];
	  };
	
	  scale.clamp = function(_) {
	    return arguments.length ? (clamp = !!_, scale) : clamp;
	  };
	
	  scale.interpolator = function(_) {
	    return arguments.length ? (interpolator = _, scale) : interpolator;
	  };
	
	  scale.copy = function() {
	    return sequential(interpolator).domain([x0, x1]).clamp(clamp);
	  };
	
	  return linearish(scale);
	}
	
	exports.scaleBand = band;
	exports.scalePoint = point;
	exports.scaleIdentity = identity;
	exports.scaleLinear = linear;
	exports.scaleLog = log;
	exports.scaleOrdinal = ordinal;
	exports.scaleImplicit = implicit;
	exports.scalePow = pow;
	exports.scaleSqrt = sqrt;
	exports.scaleQuantile = quantile$1;
	exports.scaleQuantize = quantize;
	exports.scaleThreshold = threshold;
	exports.scaleTime = time;
	exports.scaleUtc = utcTime;
	exports.schemeCategory10 = category10;
	exports.schemeCategory20b = category20b;
	exports.schemeCategory20c = category20c;
	exports.schemeCategory20 = category20;
	exports.interpolateCubehelixDefault = cubehelix$1;
	exports.interpolateRainbow = rainbow$1;
	exports.interpolateWarm = warm;
	exports.interpolateCool = cool;
	exports.interpolateViridis = viridis;
	exports.interpolateMagma = magma;
	exports.interpolateInferno = inferno;
	exports.interpolatePlasma = plasma;
	exports.scaleSequential = sequential;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-interpolate/ Version 1.1.5. Copyright 2017 Mike Bostock.
	(function (global, factory) {
		 true ? factory(exports, __webpack_require__(16)) :
		typeof define === 'function' && define.amd ? define(['exports', 'd3-color'], factory) :
		(factory((global.d3 = global.d3 || {}),global.d3));
	}(this, (function (exports,d3Color) { 'use strict';
	
	function basis(t1, v0, v1, v2, v3) {
	  var t2 = t1 * t1, t3 = t2 * t1;
	  return ((1 - 3 * t1 + 3 * t2 - t3) * v0
	      + (4 - 6 * t2 + 3 * t3) * v1
	      + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2
	      + t3 * v3) / 6;
	}
	
	var basis$1 = function(values) {
	  var n = values.length - 1;
	  return function(t) {
	    var i = t <= 0 ? (t = 0) : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
	        v1 = values[i],
	        v2 = values[i + 1],
	        v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
	        v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
	    return basis((t - i / n) * n, v0, v1, v2, v3);
	  };
	};
	
	var basisClosed = function(values) {
	  var n = values.length;
	  return function(t) {
	    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n),
	        v0 = values[(i + n - 1) % n],
	        v1 = values[i % n],
	        v2 = values[(i + 1) % n],
	        v3 = values[(i + 2) % n];
	    return basis((t - i / n) * n, v0, v1, v2, v3);
	  };
	};
	
	var constant = function(x) {
	  return function() {
	    return x;
	  };
	};
	
	function linear(a, d) {
	  return function(t) {
	    return a + t * d;
	  };
	}
	
	function exponential(a, b, y) {
	  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
	    return Math.pow(a + t * b, y);
	  };
	}
	
	function hue(a, b) {
	  var d = b - a;
	  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant(isNaN(a) ? b : a);
	}
	
	function gamma(y) {
	  return (y = +y) === 1 ? nogamma : function(a, b) {
	    return b - a ? exponential(a, b, y) : constant(isNaN(a) ? b : a);
	  };
	}
	
	function nogamma(a, b) {
	  var d = b - a;
	  return d ? linear(a, d) : constant(isNaN(a) ? b : a);
	}
	
	var rgb$1 = ((function rgbGamma(y) {
	  var color$$1 = gamma(y);
	
	  function rgb$$1(start, end) {
	    var r = color$$1((start = d3Color.rgb(start)).r, (end = d3Color.rgb(end)).r),
	        g = color$$1(start.g, end.g),
	        b = color$$1(start.b, end.b),
	        opacity = nogamma(start.opacity, end.opacity);
	    return function(t) {
	      start.r = r(t);
	      start.g = g(t);
	      start.b = b(t);
	      start.opacity = opacity(t);
	      return start + "";
	    };
	  }
	
	  rgb$$1.gamma = rgbGamma;
	
	  return rgb$$1;
	}))(1);
	
	function rgbSpline(spline) {
	  return function(colors) {
	    var n = colors.length,
	        r = new Array(n),
	        g = new Array(n),
	        b = new Array(n),
	        i, color$$1;
	    for (i = 0; i < n; ++i) {
	      color$$1 = d3Color.rgb(colors[i]);
	      r[i] = color$$1.r || 0;
	      g[i] = color$$1.g || 0;
	      b[i] = color$$1.b || 0;
	    }
	    r = spline(r);
	    g = spline(g);
	    b = spline(b);
	    color$$1.opacity = 1;
	    return function(t) {
	      color$$1.r = r(t);
	      color$$1.g = g(t);
	      color$$1.b = b(t);
	      return color$$1 + "";
	    };
	  };
	}
	
	var rgbBasis = rgbSpline(basis$1);
	var rgbBasisClosed = rgbSpline(basisClosed);
	
	var array = function(a, b) {
	  var nb = b ? b.length : 0,
	      na = a ? Math.min(nb, a.length) : 0,
	      x = new Array(nb),
	      c = new Array(nb),
	      i;
	
	  for (i = 0; i < na; ++i) x[i] = value(a[i], b[i]);
	  for (; i < nb; ++i) c[i] = b[i];
	
	  return function(t) {
	    for (i = 0; i < na; ++i) c[i] = x[i](t);
	    return c;
	  };
	};
	
	var date = function(a, b) {
	  var d = new Date;
	  return a = +a, b -= a, function(t) {
	    return d.setTime(a + b * t), d;
	  };
	};
	
	var number = function(a, b) {
	  return a = +a, b -= a, function(t) {
	    return a + b * t;
	  };
	};
	
	var object = function(a, b) {
	  var i = {},
	      c = {},
	      k;
	
	  if (a === null || typeof a !== "object") a = {};
	  if (b === null || typeof b !== "object") b = {};
	
	  for (k in b) {
	    if (k in a) {
	      i[k] = value(a[k], b[k]);
	    } else {
	      c[k] = b[k];
	    }
	  }
	
	  return function(t) {
	    for (k in i) c[k] = i[k](t);
	    return c;
	  };
	};
	
	var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
	var reB = new RegExp(reA.source, "g");
	
	function zero(b) {
	  return function() {
	    return b;
	  };
	}
	
	function one(b) {
	  return function(t) {
	    return b(t) + "";
	  };
	}
	
	var string = function(a, b) {
	  var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
	      am, // current match in a
	      bm, // current match in b
	      bs, // string preceding current number in b, if any
	      i = -1, // index in s
	      s = [], // string constants and placeholders
	      q = []; // number interpolators
	
	  // Coerce inputs to strings.
	  a = a + "", b = b + "";
	
	  // Interpolate pairs of numbers in a & b.
	  while ((am = reA.exec(a))
	      && (bm = reB.exec(b))) {
	    if ((bs = bm.index) > bi) { // a string precedes the next number in b
	      bs = b.slice(bi, bs);
	      if (s[i]) s[i] += bs; // coalesce with previous string
	      else s[++i] = bs;
	    }
	    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
	      if (s[i]) s[i] += bm; // coalesce with previous string
	      else s[++i] = bm;
	    } else { // interpolate non-matching numbers
	      s[++i] = null;
	      q.push({i: i, x: number(am, bm)});
	    }
	    bi = reB.lastIndex;
	  }
	
	  // Add remains of b.
	  if (bi < b.length) {
	    bs = b.slice(bi);
	    if (s[i]) s[i] += bs; // coalesce with previous string
	    else s[++i] = bs;
	  }
	
	  // Special optimization for only a single match.
	  // Otherwise, interpolate each of the numbers and rejoin the string.
	  return s.length < 2 ? (q[0]
	      ? one(q[0].x)
	      : zero(b))
	      : (b = q.length, function(t) {
	          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
	          return s.join("");
	        });
	};
	
	var value = function(a, b) {
	  var t = typeof b, c;
	  return b == null || t === "boolean" ? constant(b)
	      : (t === "number" ? number
	      : t === "string" ? ((c = d3Color.color(b)) ? (b = c, rgb$1) : string)
	      : b instanceof d3Color.color ? rgb$1
	      : b instanceof Date ? date
	      : Array.isArray(b) ? array
	      : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object
	      : number)(a, b);
	};
	
	var round = function(a, b) {
	  return a = +a, b -= a, function(t) {
	    return Math.round(a + b * t);
	  };
	};
	
	var degrees = 180 / Math.PI;
	
	var identity = {
	  translateX: 0,
	  translateY: 0,
	  rotate: 0,
	  skewX: 0,
	  scaleX: 1,
	  scaleY: 1
	};
	
	var decompose = function(a, b, c, d, e, f) {
	  var scaleX, scaleY, skewX;
	  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
	  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
	  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
	  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
	  return {
	    translateX: e,
	    translateY: f,
	    rotate: Math.atan2(b, a) * degrees,
	    skewX: Math.atan(skewX) * degrees,
	    scaleX: scaleX,
	    scaleY: scaleY
	  };
	};
	
	var cssNode;
	var cssRoot;
	var cssView;
	var svgNode;
	
	function parseCss(value) {
	  if (value === "none") return identity;
	  if (!cssNode) cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView;
	  cssNode.style.transform = value;
	  value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue("transform");
	  cssRoot.removeChild(cssNode);
	  value = value.slice(7, -1).split(",");
	  return decompose(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
	}
	
	function parseSvg(value) {
	  if (value == null) return identity;
	  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
	  svgNode.setAttribute("transform", value);
	  if (!(value = svgNode.transform.baseVal.consolidate())) return identity;
	  value = value.matrix;
	  return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
	}
	
	function interpolateTransform(parse, pxComma, pxParen, degParen) {
	
	  function pop(s) {
	    return s.length ? s.pop() + " " : "";
	  }
	
	  function translate(xa, ya, xb, yb, s, q) {
	    if (xa !== xb || ya !== yb) {
	      var i = s.push("translate(", null, pxComma, null, pxParen);
	      q.push({i: i - 4, x: number(xa, xb)}, {i: i - 2, x: number(ya, yb)});
	    } else if (xb || yb) {
	      s.push("translate(" + xb + pxComma + yb + pxParen);
	    }
	  }
	
	  function rotate(a, b, s, q) {
	    if (a !== b) {
	      if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
	      q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: number(a, b)});
	    } else if (b) {
	      s.push(pop(s) + "rotate(" + b + degParen);
	    }
	  }
	
	  function skewX(a, b, s, q) {
	    if (a !== b) {
	      q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: number(a, b)});
	    } else if (b) {
	      s.push(pop(s) + "skewX(" + b + degParen);
	    }
	  }
	
	  function scale(xa, ya, xb, yb, s, q) {
	    if (xa !== xb || ya !== yb) {
	      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
	      q.push({i: i - 4, x: number(xa, xb)}, {i: i - 2, x: number(ya, yb)});
	    } else if (xb !== 1 || yb !== 1) {
	      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
	    }
	  }
	
	  return function(a, b) {
	    var s = [], // string constants and placeholders
	        q = []; // number interpolators
	    a = parse(a), b = parse(b);
	    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
	    rotate(a.rotate, b.rotate, s, q);
	    skewX(a.skewX, b.skewX, s, q);
	    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
	    a = b = null; // gc
	    return function(t) {
	      var i = -1, n = q.length, o;
	      while (++i < n) s[(o = q[i]).i] = o.x(t);
	      return s.join("");
	    };
	  };
	}
	
	var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
	var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");
	
	var rho = Math.SQRT2;
	var rho2 = 2;
	var rho4 = 4;
	var epsilon2 = 1e-12;
	
	function cosh(x) {
	  return ((x = Math.exp(x)) + 1 / x) / 2;
	}
	
	function sinh(x) {
	  return ((x = Math.exp(x)) - 1 / x) / 2;
	}
	
	function tanh(x) {
	  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
	}
	
	// p0 = [ux0, uy0, w0]
	// p1 = [ux1, uy1, w1]
	var zoom = function(p0, p1) {
	  var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
	      ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
	      dx = ux1 - ux0,
	      dy = uy1 - uy0,
	      d2 = dx * dx + dy * dy,
	      i,
	      S;
	
	  // Special case for u0 ≅ u1.
	  if (d2 < epsilon2) {
	    S = Math.log(w1 / w0) / rho;
	    i = function(t) {
	      return [
	        ux0 + t * dx,
	        uy0 + t * dy,
	        w0 * Math.exp(rho * t * S)
	      ];
	    };
	  }
	
	  // General case.
	  else {
	    var d1 = Math.sqrt(d2),
	        b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
	        b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
	        r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
	        r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
	    S = (r1 - r0) / rho;
	    i = function(t) {
	      var s = t * S,
	          coshr0 = cosh(r0),
	          u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
	      return [
	        ux0 + u * dx,
	        uy0 + u * dy,
	        w0 * coshr0 / cosh(rho * s + r0)
	      ];
	    };
	  }
	
	  i.duration = S * 1000;
	
	  return i;
	};
	
	function hsl$1(hue$$1) {
	  return function(start, end) {
	    var h = hue$$1((start = d3Color.hsl(start)).h, (end = d3Color.hsl(end)).h),
	        s = nogamma(start.s, end.s),
	        l = nogamma(start.l, end.l),
	        opacity = nogamma(start.opacity, end.opacity);
	    return function(t) {
	      start.h = h(t);
	      start.s = s(t);
	      start.l = l(t);
	      start.opacity = opacity(t);
	      return start + "";
	    };
	  }
	}
	
	var hsl$2 = hsl$1(hue);
	var hslLong = hsl$1(nogamma);
	
	function lab$1(start, end) {
	  var l = nogamma((start = d3Color.lab(start)).l, (end = d3Color.lab(end)).l),
	      a = nogamma(start.a, end.a),
	      b = nogamma(start.b, end.b),
	      opacity = nogamma(start.opacity, end.opacity);
	  return function(t) {
	    start.l = l(t);
	    start.a = a(t);
	    start.b = b(t);
	    start.opacity = opacity(t);
	    return start + "";
	  };
	}
	
	function hcl$1(hue$$1) {
	  return function(start, end) {
	    var h = hue$$1((start = d3Color.hcl(start)).h, (end = d3Color.hcl(end)).h),
	        c = nogamma(start.c, end.c),
	        l = nogamma(start.l, end.l),
	        opacity = nogamma(start.opacity, end.opacity);
	    return function(t) {
	      start.h = h(t);
	      start.c = c(t);
	      start.l = l(t);
	      start.opacity = opacity(t);
	      return start + "";
	    };
	  }
	}
	
	var hcl$2 = hcl$1(hue);
	var hclLong = hcl$1(nogamma);
	
	function cubehelix$1(hue$$1) {
	  return (function cubehelixGamma(y) {
	    y = +y;
	
	    function cubehelix$$1(start, end) {
	      var h = hue$$1((start = d3Color.cubehelix(start)).h, (end = d3Color.cubehelix(end)).h),
	          s = nogamma(start.s, end.s),
	          l = nogamma(start.l, end.l),
	          opacity = nogamma(start.opacity, end.opacity);
	      return function(t) {
	        start.h = h(t);
	        start.s = s(t);
	        start.l = l(Math.pow(t, y));
	        start.opacity = opacity(t);
	        return start + "";
	      };
	    }
	
	    cubehelix$$1.gamma = cubehelixGamma;
	
	    return cubehelix$$1;
	  })(1);
	}
	
	var cubehelix$2 = cubehelix$1(hue);
	var cubehelixLong = cubehelix$1(nogamma);
	
	var quantize = function(interpolator, n) {
	  var samples = new Array(n);
	  for (var i = 0; i < n; ++i) samples[i] = interpolator(i / (n - 1));
	  return samples;
	};
	
	exports.interpolate = value;
	exports.interpolateArray = array;
	exports.interpolateBasis = basis$1;
	exports.interpolateBasisClosed = basisClosed;
	exports.interpolateDate = date;
	exports.interpolateNumber = number;
	exports.interpolateObject = object;
	exports.interpolateRound = round;
	exports.interpolateString = string;
	exports.interpolateTransformCss = interpolateTransformCss;
	exports.interpolateTransformSvg = interpolateTransformSvg;
	exports.interpolateZoom = zoom;
	exports.interpolateRgb = rgb$1;
	exports.interpolateRgbBasis = rgbBasis;
	exports.interpolateRgbBasisClosed = rgbBasisClosed;
	exports.interpolateHsl = hsl$2;
	exports.interpolateHslLong = hslLong;
	exports.interpolateLab = lab$1;
	exports.interpolateHcl = hcl$2;
	exports.interpolateHclLong = hclLong;
	exports.interpolateCubehelix = cubehelix$2;
	exports.interpolateCubehelixLong = cubehelixLong;
	exports.quantize = quantize;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-color/ Version 1.0.3. Copyright 2017 Mike Bostock.
	(function (global, factory) {
		 true ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';
	
	var define = function(constructor, factory, prototype) {
	  constructor.prototype = factory.prototype = prototype;
	  prototype.constructor = constructor;
	};
	
	function extend(parent, definition) {
	  var prototype = Object.create(parent.prototype);
	  for (var key in definition) prototype[key] = definition[key];
	  return prototype;
	}
	
	function Color() {}
	
	var darker = 0.7;
	var brighter = 1 / darker;
	
	var reI = "\\s*([+-]?\\d+)\\s*";
	var reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*";
	var reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
	var reHex3 = /^#([0-9a-f]{3})$/;
	var reHex6 = /^#([0-9a-f]{6})$/;
	var reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$");
	var reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$");
	var reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$");
	var reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$");
	var reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$");
	var reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");
	
	var named = {
	  aliceblue: 0xf0f8ff,
	  antiquewhite: 0xfaebd7,
	  aqua: 0x00ffff,
	  aquamarine: 0x7fffd4,
	  azure: 0xf0ffff,
	  beige: 0xf5f5dc,
	  bisque: 0xffe4c4,
	  black: 0x000000,
	  blanchedalmond: 0xffebcd,
	  blue: 0x0000ff,
	  blueviolet: 0x8a2be2,
	  brown: 0xa52a2a,
	  burlywood: 0xdeb887,
	  cadetblue: 0x5f9ea0,
	  chartreuse: 0x7fff00,
	  chocolate: 0xd2691e,
	  coral: 0xff7f50,
	  cornflowerblue: 0x6495ed,
	  cornsilk: 0xfff8dc,
	  crimson: 0xdc143c,
	  cyan: 0x00ffff,
	  darkblue: 0x00008b,
	  darkcyan: 0x008b8b,
	  darkgoldenrod: 0xb8860b,
	  darkgray: 0xa9a9a9,
	  darkgreen: 0x006400,
	  darkgrey: 0xa9a9a9,
	  darkkhaki: 0xbdb76b,
	  darkmagenta: 0x8b008b,
	  darkolivegreen: 0x556b2f,
	  darkorange: 0xff8c00,
	  darkorchid: 0x9932cc,
	  darkred: 0x8b0000,
	  darksalmon: 0xe9967a,
	  darkseagreen: 0x8fbc8f,
	  darkslateblue: 0x483d8b,
	  darkslategray: 0x2f4f4f,
	  darkslategrey: 0x2f4f4f,
	  darkturquoise: 0x00ced1,
	  darkviolet: 0x9400d3,
	  deeppink: 0xff1493,
	  deepskyblue: 0x00bfff,
	  dimgray: 0x696969,
	  dimgrey: 0x696969,
	  dodgerblue: 0x1e90ff,
	  firebrick: 0xb22222,
	  floralwhite: 0xfffaf0,
	  forestgreen: 0x228b22,
	  fuchsia: 0xff00ff,
	  gainsboro: 0xdcdcdc,
	  ghostwhite: 0xf8f8ff,
	  gold: 0xffd700,
	  goldenrod: 0xdaa520,
	  gray: 0x808080,
	  green: 0x008000,
	  greenyellow: 0xadff2f,
	  grey: 0x808080,
	  honeydew: 0xf0fff0,
	  hotpink: 0xff69b4,
	  indianred: 0xcd5c5c,
	  indigo: 0x4b0082,
	  ivory: 0xfffff0,
	  khaki: 0xf0e68c,
	  lavender: 0xe6e6fa,
	  lavenderblush: 0xfff0f5,
	  lawngreen: 0x7cfc00,
	  lemonchiffon: 0xfffacd,
	  lightblue: 0xadd8e6,
	  lightcoral: 0xf08080,
	  lightcyan: 0xe0ffff,
	  lightgoldenrodyellow: 0xfafad2,
	  lightgray: 0xd3d3d3,
	  lightgreen: 0x90ee90,
	  lightgrey: 0xd3d3d3,
	  lightpink: 0xffb6c1,
	  lightsalmon: 0xffa07a,
	  lightseagreen: 0x20b2aa,
	  lightskyblue: 0x87cefa,
	  lightslategray: 0x778899,
	  lightslategrey: 0x778899,
	  lightsteelblue: 0xb0c4de,
	  lightyellow: 0xffffe0,
	  lime: 0x00ff00,
	  limegreen: 0x32cd32,
	  linen: 0xfaf0e6,
	  magenta: 0xff00ff,
	  maroon: 0x800000,
	  mediumaquamarine: 0x66cdaa,
	  mediumblue: 0x0000cd,
	  mediumorchid: 0xba55d3,
	  mediumpurple: 0x9370db,
	  mediumseagreen: 0x3cb371,
	  mediumslateblue: 0x7b68ee,
	  mediumspringgreen: 0x00fa9a,
	  mediumturquoise: 0x48d1cc,
	  mediumvioletred: 0xc71585,
	  midnightblue: 0x191970,
	  mintcream: 0xf5fffa,
	  mistyrose: 0xffe4e1,
	  moccasin: 0xffe4b5,
	  navajowhite: 0xffdead,
	  navy: 0x000080,
	  oldlace: 0xfdf5e6,
	  olive: 0x808000,
	  olivedrab: 0x6b8e23,
	  orange: 0xffa500,
	  orangered: 0xff4500,
	  orchid: 0xda70d6,
	  palegoldenrod: 0xeee8aa,
	  palegreen: 0x98fb98,
	  paleturquoise: 0xafeeee,
	  palevioletred: 0xdb7093,
	  papayawhip: 0xffefd5,
	  peachpuff: 0xffdab9,
	  peru: 0xcd853f,
	  pink: 0xffc0cb,
	  plum: 0xdda0dd,
	  powderblue: 0xb0e0e6,
	  purple: 0x800080,
	  rebeccapurple: 0x663399,
	  red: 0xff0000,
	  rosybrown: 0xbc8f8f,
	  royalblue: 0x4169e1,
	  saddlebrown: 0x8b4513,
	  salmon: 0xfa8072,
	  sandybrown: 0xf4a460,
	  seagreen: 0x2e8b57,
	  seashell: 0xfff5ee,
	  sienna: 0xa0522d,
	  silver: 0xc0c0c0,
	  skyblue: 0x87ceeb,
	  slateblue: 0x6a5acd,
	  slategray: 0x708090,
	  slategrey: 0x708090,
	  snow: 0xfffafa,
	  springgreen: 0x00ff7f,
	  steelblue: 0x4682b4,
	  tan: 0xd2b48c,
	  teal: 0x008080,
	  thistle: 0xd8bfd8,
	  tomato: 0xff6347,
	  turquoise: 0x40e0d0,
	  violet: 0xee82ee,
	  wheat: 0xf5deb3,
	  white: 0xffffff,
	  whitesmoke: 0xf5f5f5,
	  yellow: 0xffff00,
	  yellowgreen: 0x9acd32
	};
	
	define(Color, color, {
	  displayable: function() {
	    return this.rgb().displayable();
	  },
	  toString: function() {
	    return this.rgb() + "";
	  }
	});
	
	function color(format) {
	  var m;
	  format = (format + "").trim().toLowerCase();
	  return (m = reHex3.exec(format)) ? (m = parseInt(m[1], 16), new Rgb((m >> 8 & 0xf) | (m >> 4 & 0x0f0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1)) // #f00
	      : (m = reHex6.exec(format)) ? rgbn(parseInt(m[1], 16)) // #ff0000
	      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
	      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
	      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
	      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
	      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
	      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
	      : named.hasOwnProperty(format) ? rgbn(named[format])
	      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
	      : null;
	}
	
	function rgbn(n) {
	  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
	}
	
	function rgba(r, g, b, a) {
	  if (a <= 0) r = g = b = NaN;
	  return new Rgb(r, g, b, a);
	}
	
	function rgbConvert(o) {
	  if (!(o instanceof Color)) o = color(o);
	  if (!o) return new Rgb;
	  o = o.rgb();
	  return new Rgb(o.r, o.g, o.b, o.opacity);
	}
	
	function rgb(r, g, b, opacity) {
	  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
	}
	
	function Rgb(r, g, b, opacity) {
	  this.r = +r;
	  this.g = +g;
	  this.b = +b;
	  this.opacity = +opacity;
	}
	
	define(Rgb, rgb, extend(Color, {
	  brighter: function(k) {
	    k = k == null ? brighter : Math.pow(brighter, k);
	    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
	  },
	  darker: function(k) {
	    k = k == null ? darker : Math.pow(darker, k);
	    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
	  },
	  rgb: function() {
	    return this;
	  },
	  displayable: function() {
	    return (0 <= this.r && this.r <= 255)
	        && (0 <= this.g && this.g <= 255)
	        && (0 <= this.b && this.b <= 255)
	        && (0 <= this.opacity && this.opacity <= 1);
	  },
	  toString: function() {
	    var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
	    return (a === 1 ? "rgb(" : "rgba(")
	        + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
	        + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
	        + Math.max(0, Math.min(255, Math.round(this.b) || 0))
	        + (a === 1 ? ")" : ", " + a + ")");
	  }
	}));
	
	function hsla(h, s, l, a) {
	  if (a <= 0) h = s = l = NaN;
	  else if (l <= 0 || l >= 1) h = s = NaN;
	  else if (s <= 0) h = NaN;
	  return new Hsl(h, s, l, a);
	}
	
	function hslConvert(o) {
	  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
	  if (!(o instanceof Color)) o = color(o);
	  if (!o) return new Hsl;
	  if (o instanceof Hsl) return o;
	  o = o.rgb();
	  var r = o.r / 255,
	      g = o.g / 255,
	      b = o.b / 255,
	      min = Math.min(r, g, b),
	      max = Math.max(r, g, b),
	      h = NaN,
	      s = max - min,
	      l = (max + min) / 2;
	  if (s) {
	    if (r === max) h = (g - b) / s + (g < b) * 6;
	    else if (g === max) h = (b - r) / s + 2;
	    else h = (r - g) / s + 4;
	    s /= l < 0.5 ? max + min : 2 - max - min;
	    h *= 60;
	  } else {
	    s = l > 0 && l < 1 ? 0 : h;
	  }
	  return new Hsl(h, s, l, o.opacity);
	}
	
	function hsl(h, s, l, opacity) {
	  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
	}
	
	function Hsl(h, s, l, opacity) {
	  this.h = +h;
	  this.s = +s;
	  this.l = +l;
	  this.opacity = +opacity;
	}
	
	define(Hsl, hsl, extend(Color, {
	  brighter: function(k) {
	    k = k == null ? brighter : Math.pow(brighter, k);
	    return new Hsl(this.h, this.s, this.l * k, this.opacity);
	  },
	  darker: function(k) {
	    k = k == null ? darker : Math.pow(darker, k);
	    return new Hsl(this.h, this.s, this.l * k, this.opacity);
	  },
	  rgb: function() {
	    var h = this.h % 360 + (this.h < 0) * 360,
	        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
	        l = this.l,
	        m2 = l + (l < 0.5 ? l : 1 - l) * s,
	        m1 = 2 * l - m2;
	    return new Rgb(
	      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
	      hsl2rgb(h, m1, m2),
	      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
	      this.opacity
	    );
	  },
	  displayable: function() {
	    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
	        && (0 <= this.l && this.l <= 1)
	        && (0 <= this.opacity && this.opacity <= 1);
	  }
	}));
	
	/* From FvD 13.37, CSS Color Module Level 3 */
	function hsl2rgb(h, m1, m2) {
	  return (h < 60 ? m1 + (m2 - m1) * h / 60
	      : h < 180 ? m2
	      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
	      : m1) * 255;
	}
	
	var deg2rad = Math.PI / 180;
	var rad2deg = 180 / Math.PI;
	
	var Kn = 18;
	var Xn = 0.950470;
	var Yn = 1;
	var Zn = 1.088830;
	var t0 = 4 / 29;
	var t1 = 6 / 29;
	var t2 = 3 * t1 * t1;
	var t3 = t1 * t1 * t1;
	
	function labConvert(o) {
	  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
	  if (o instanceof Hcl) {
	    var h = o.h * deg2rad;
	    return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
	  }
	  if (!(o instanceof Rgb)) o = rgbConvert(o);
	  var b = rgb2xyz(o.r),
	      a = rgb2xyz(o.g),
	      l = rgb2xyz(o.b),
	      x = xyz2lab((0.4124564 * b + 0.3575761 * a + 0.1804375 * l) / Xn),
	      y = xyz2lab((0.2126729 * b + 0.7151522 * a + 0.0721750 * l) / Yn),
	      z = xyz2lab((0.0193339 * b + 0.1191920 * a + 0.9503041 * l) / Zn);
	  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
	}
	
	function lab(l, a, b, opacity) {
	  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
	}
	
	function Lab(l, a, b, opacity) {
	  this.l = +l;
	  this.a = +a;
	  this.b = +b;
	  this.opacity = +opacity;
	}
	
	define(Lab, lab, extend(Color, {
	  brighter: function(k) {
	    return new Lab(this.l + Kn * (k == null ? 1 : k), this.a, this.b, this.opacity);
	  },
	  darker: function(k) {
	    return new Lab(this.l - Kn * (k == null ? 1 : k), this.a, this.b, this.opacity);
	  },
	  rgb: function() {
	    var y = (this.l + 16) / 116,
	        x = isNaN(this.a) ? y : y + this.a / 500,
	        z = isNaN(this.b) ? y : y - this.b / 200;
	    y = Yn * lab2xyz(y);
	    x = Xn * lab2xyz(x);
	    z = Zn * lab2xyz(z);
	    return new Rgb(
	      xyz2rgb( 3.2404542 * x - 1.5371385 * y - 0.4985314 * z), // D65 -> sRGB
	      xyz2rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z),
	      xyz2rgb( 0.0556434 * x - 0.2040259 * y + 1.0572252 * z),
	      this.opacity
	    );
	  }
	}));
	
	function xyz2lab(t) {
	  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
	}
	
	function lab2xyz(t) {
	  return t > t1 ? t * t * t : t2 * (t - t0);
	}
	
	function xyz2rgb(x) {
	  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
	}
	
	function rgb2xyz(x) {
	  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
	}
	
	function hclConvert(o) {
	  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
	  if (!(o instanceof Lab)) o = labConvert(o);
	  var h = Math.atan2(o.b, o.a) * rad2deg;
	  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
	}
	
	function hcl(h, c, l, opacity) {
	  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
	}
	
	function Hcl(h, c, l, opacity) {
	  this.h = +h;
	  this.c = +c;
	  this.l = +l;
	  this.opacity = +opacity;
	}
	
	define(Hcl, hcl, extend(Color, {
	  brighter: function(k) {
	    return new Hcl(this.h, this.c, this.l + Kn * (k == null ? 1 : k), this.opacity);
	  },
	  darker: function(k) {
	    return new Hcl(this.h, this.c, this.l - Kn * (k == null ? 1 : k), this.opacity);
	  },
	  rgb: function() {
	    return labConvert(this).rgb();
	  }
	}));
	
	var A = -0.14861;
	var B = +1.78277;
	var C = -0.29227;
	var D = -0.90649;
	var E = +1.97294;
	var ED = E * D;
	var EB = E * B;
	var BC_DA = B * C - D * A;
	
	function cubehelixConvert(o) {
	  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
	  if (!(o instanceof Rgb)) o = rgbConvert(o);
	  var r = o.r / 255,
	      g = o.g / 255,
	      b = o.b / 255,
	      l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
	      bl = b - l,
	      k = (E * (g - l) - C * bl) / D,
	      s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), // NaN if l=0 or l=1
	      h = s ? Math.atan2(k, bl) * rad2deg - 120 : NaN;
	  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
	}
	
	function cubehelix(h, s, l, opacity) {
	  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
	}
	
	function Cubehelix(h, s, l, opacity) {
	  this.h = +h;
	  this.s = +s;
	  this.l = +l;
	  this.opacity = +opacity;
	}
	
	define(Cubehelix, cubehelix, extend(Color, {
	  brighter: function(k) {
	    k = k == null ? brighter : Math.pow(brighter, k);
	    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
	  },
	  darker: function(k) {
	    k = k == null ? darker : Math.pow(darker, k);
	    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
	  },
	  rgb: function() {
	    var h = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad,
	        l = +this.l,
	        a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
	        cosh = Math.cos(h),
	        sinh = Math.sin(h);
	    return new Rgb(
	      255 * (l + a * (A * cosh + B * sinh)),
	      255 * (l + a * (C * cosh + D * sinh)),
	      255 * (l + a * (E * cosh)),
	      this.opacity
	    );
	  }
	}));
	
	exports.color = color;
	exports.rgb = rgb;
	exports.hsl = hsl;
	exports.lab = lab;
	exports.hcl = hcl;
	exports.cubehelix = cubehelix;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-format/ Version 1.2.0. Copyright 2017 Mike Bostock.
	(function (global, factory) {
		 true ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';
	
	// Computes the decimal coefficient and exponent of the specified number x with
	// significant digits p, where x is positive and p is in [1, 21] or undefined.
	// For example, formatDecimal(1.23) returns ["123", 0].
	var formatDecimal = function(x, p) {
	  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
	  var i, coefficient = x.slice(0, i);
	
	  // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
	  // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
	  return [
	    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
	    +x.slice(i + 1)
	  ];
	};
	
	var exponent = function(x) {
	  return x = formatDecimal(Math.abs(x)), x ? x[1] : NaN;
	};
	
	var formatGroup = function(grouping, thousands) {
	  return function(value, width) {
	    var i = value.length,
	        t = [],
	        j = 0,
	        g = grouping[0],
	        length = 0;
	
	    while (i > 0 && g > 0) {
	      if (length + g + 1 > width) g = Math.max(1, width - length);
	      t.push(value.substring(i -= g, i + g));
	      if ((length += g + 1) > width) break;
	      g = grouping[j = (j + 1) % grouping.length];
	    }
	
	    return t.reverse().join(thousands);
	  };
	};
	
	var formatNumerals = function(numerals) {
	  return function(value) {
	    return value.replace(/[0-9]/g, function(i) {
	      return numerals[+i];
	    });
	  };
	};
	
	var formatDefault = function(x, p) {
	  x = x.toPrecision(p);
	
	  out: for (var n = x.length, i = 1, i0 = -1, i1; i < n; ++i) {
	    switch (x[i]) {
	      case ".": i0 = i1 = i; break;
	      case "0": if (i0 === 0) i0 = i; i1 = i; break;
	      case "e": break out;
	      default: if (i0 > 0) i0 = 0; break;
	    }
	  }
	
	  return i0 > 0 ? x.slice(0, i0) + x.slice(i1 + 1) : x;
	};
	
	var prefixExponent;
	
	var formatPrefixAuto = function(x, p) {
	  var d = formatDecimal(x, p);
	  if (!d) return x + "";
	  var coefficient = d[0],
	      exponent = d[1],
	      i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
	      n = coefficient.length;
	  return i === n ? coefficient
	      : i > n ? coefficient + new Array(i - n + 1).join("0")
	      : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
	      : "0." + new Array(1 - i).join("0") + formatDecimal(x, Math.max(0, p + i - 1))[0]; // less than 1y!
	};
	
	var formatRounded = function(x, p) {
	  var d = formatDecimal(x, p);
	  if (!d) return x + "";
	  var coefficient = d[0],
	      exponent = d[1];
	  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
	      : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
	      : coefficient + new Array(exponent - coefficient.length + 2).join("0");
	};
	
	var formatTypes = {
	  "": formatDefault,
	  "%": function(x, p) { return (x * 100).toFixed(p); },
	  "b": function(x) { return Math.round(x).toString(2); },
	  "c": function(x) { return x + ""; },
	  "d": function(x) { return Math.round(x).toString(10); },
	  "e": function(x, p) { return x.toExponential(p); },
	  "f": function(x, p) { return x.toFixed(p); },
	  "g": function(x, p) { return x.toPrecision(p); },
	  "o": function(x) { return Math.round(x).toString(8); },
	  "p": function(x, p) { return formatRounded(x * 100, p); },
	  "r": formatRounded,
	  "s": formatPrefixAuto,
	  "X": function(x) { return Math.round(x).toString(16).toUpperCase(); },
	  "x": function(x) { return Math.round(x).toString(16); }
	};
	
	// [[fill]align][sign][symbol][0][width][,][.precision][type]
	var re = /^(?:(.)?([<>=^]))?([+\-\( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?([a-z%])?$/i;
	
	function formatSpecifier(specifier) {
	  return new FormatSpecifier(specifier);
	}
	
	formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof
	
	function FormatSpecifier(specifier) {
	  if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
	
	  var match,
	      fill = match[1] || " ",
	      align = match[2] || ">",
	      sign = match[3] || "-",
	      symbol = match[4] || "",
	      zero = !!match[5],
	      width = match[6] && +match[6],
	      comma = !!match[7],
	      precision = match[8] && +match[8].slice(1),
	      type = match[9] || "";
	
	  // The "n" type is an alias for ",g".
	  if (type === "n") comma = true, type = "g";
	
	  // Map invalid types to the default format.
	  else if (!formatTypes[type]) type = "";
	
	  // If zero fill is specified, padding goes after sign and before digits.
	  if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";
	
	  this.fill = fill;
	  this.align = align;
	  this.sign = sign;
	  this.symbol = symbol;
	  this.zero = zero;
	  this.width = width;
	  this.comma = comma;
	  this.precision = precision;
	  this.type = type;
	}
	
	FormatSpecifier.prototype.toString = function() {
	  return this.fill
	      + this.align
	      + this.sign
	      + this.symbol
	      + (this.zero ? "0" : "")
	      + (this.width == null ? "" : Math.max(1, this.width | 0))
	      + (this.comma ? "," : "")
	      + (this.precision == null ? "" : "." + Math.max(0, this.precision | 0))
	      + this.type;
	};
	
	var identity = function(x) {
	  return x;
	};
	
	var prefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];
	
	var formatLocale = function(locale) {
	  var group = locale.grouping && locale.thousands ? formatGroup(locale.grouping, locale.thousands) : identity,
	      currency = locale.currency,
	      decimal = locale.decimal,
	      numerals = locale.numerals ? formatNumerals(locale.numerals) : identity,
	      percent = locale.percent || "%";
	
	  function newFormat(specifier) {
	    specifier = formatSpecifier(specifier);
	
	    var fill = specifier.fill,
	        align = specifier.align,
	        sign = specifier.sign,
	        symbol = specifier.symbol,
	        zero = specifier.zero,
	        width = specifier.width,
	        comma = specifier.comma,
	        precision = specifier.precision,
	        type = specifier.type;
	
	    // Compute the prefix and suffix.
	    // For SI-prefix, the suffix is lazily computed.
	    var prefix = symbol === "$" ? currency[0] : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
	        suffix = symbol === "$" ? currency[1] : /[%p]/.test(type) ? percent : "";
	
	    // What format function should we use?
	    // Is this an integer type?
	    // Can this type generate exponential notation?
	    var formatType = formatTypes[type],
	        maybeSuffix = !type || /[defgprs%]/.test(type);
	
	    // Set the default precision if not specified,
	    // or clamp the specified precision to the supported range.
	    // For significant precision, it must be in [1, 21].
	    // For fixed precision, it must be in [0, 20].
	    precision = precision == null ? (type ? 6 : 12)
	        : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
	        : Math.max(0, Math.min(20, precision));
	
	    function format(value) {
	      var valuePrefix = prefix,
	          valueSuffix = suffix,
	          i, n, c;
	
	      if (type === "c") {
	        valueSuffix = formatType(value) + valueSuffix;
	        value = "";
	      } else {
	        value = +value;
	
	        // Perform the initial formatting.
	        var valueNegative = value < 0;
	        value = formatType(Math.abs(value), precision);
	
	        // If a negative value rounds to zero during formatting, treat as positive.
	        if (valueNegative && +value === 0) valueNegative = false;
	
	        // Compute the prefix and suffix.
	        valuePrefix = (valueNegative ? (sign === "(" ? sign : "-") : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
	        valueSuffix = valueSuffix + (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + (valueNegative && sign === "(" ? ")" : "");
	
	        // Break the formatted value into the integer “value” part that can be
	        // grouped, and fractional or exponential “suffix” part that is not.
	        if (maybeSuffix) {
	          i = -1, n = value.length;
	          while (++i < n) {
	            if (c = value.charCodeAt(i), 48 > c || c > 57) {
	              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
	              value = value.slice(0, i);
	              break;
	            }
	          }
	        }
	      }
	
	      // If the fill character is not "0", grouping is applied before padding.
	      if (comma && !zero) value = group(value, Infinity);
	
	      // Compute the padding.
	      var length = valuePrefix.length + value.length + valueSuffix.length,
	          padding = length < width ? new Array(width - length + 1).join(fill) : "";
	
	      // If the fill character is "0", grouping is applied after padding.
	      if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";
	
	      // Reconstruct the final output based on the desired alignment.
	      switch (align) {
	        case "<": value = valuePrefix + value + valueSuffix + padding; break;
	        case "=": value = valuePrefix + padding + value + valueSuffix; break;
	        case "^": value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length); break;
	        default: value = padding + valuePrefix + value + valueSuffix; break;
	      }
	
	      return numerals(value);
	    }
	
	    format.toString = function() {
	      return specifier + "";
	    };
	
	    return format;
	  }
	
	  function formatPrefix(specifier, value) {
	    var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
	        e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
	        k = Math.pow(10, -e),
	        prefix = prefixes[8 + e / 3];
	    return function(value) {
	      return f(k * value) + prefix;
	    };
	  }
	
	  return {
	    format: newFormat,
	    formatPrefix: formatPrefix
	  };
	};
	
	var locale;
	
	
	
	defaultLocale({
	  decimal: ".",
	  thousands: ",",
	  grouping: [3],
	  currency: ["$", ""]
	});
	
	function defaultLocale(definition) {
	  locale = formatLocale(definition);
	  exports.format = locale.format;
	  exports.formatPrefix = locale.formatPrefix;
	  return locale;
	}
	
	var precisionFixed = function(step) {
	  return Math.max(0, -exponent(Math.abs(step)));
	};
	
	var precisionPrefix = function(step, value) {
	  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
	};
	
	var precisionRound = function(step, max) {
	  step = Math.abs(step), max = Math.abs(max) - step;
	  return Math.max(0, exponent(max) - exponent(step)) + 1;
	};
	
	exports.formatDefaultLocale = defaultLocale;
	exports.formatLocale = formatLocale;
	exports.formatSpecifier = formatSpecifier;
	exports.precisionFixed = precisionFixed;
	exports.precisionPrefix = precisionPrefix;
	exports.precisionRound = precisionRound;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-time/ Version 1.0.6. Copyright 2017 Mike Bostock.
	(function (global, factory) {
		 true ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';
	
	var t0 = new Date;
	var t1 = new Date;
	
	function newInterval(floori, offseti, count, field) {
	
	  function interval(date) {
	    return floori(date = new Date(+date)), date;
	  }
	
	  interval.floor = interval;
	
	  interval.ceil = function(date) {
	    return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
	  };
	
	  interval.round = function(date) {
	    var d0 = interval(date),
	        d1 = interval.ceil(date);
	    return date - d0 < d1 - date ? d0 : d1;
	  };
	
	  interval.offset = function(date, step) {
	    return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
	  };
	
	  interval.range = function(start, stop, step) {
	    var range = [];
	    start = interval.ceil(start);
	    step = step == null ? 1 : Math.floor(step);
	    if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date
	    do range.push(new Date(+start)); while (offseti(start, step), floori(start), start < stop)
	    return range;
	  };
	
	  interval.filter = function(test) {
	    return newInterval(function(date) {
	      if (date >= date) while (floori(date), !test(date)) date.setTime(date - 1);
	    }, function(date, step) {
	      if (date >= date) while (--step >= 0) while (offseti(date, 1), !test(date)) {} // eslint-disable-line no-empty
	    });
	  };
	
	  if (count) {
	    interval.count = function(start, end) {
	      t0.setTime(+start), t1.setTime(+end);
	      floori(t0), floori(t1);
	      return Math.floor(count(t0, t1));
	    };
	
	    interval.every = function(step) {
	      step = Math.floor(step);
	      return !isFinite(step) || !(step > 0) ? null
	          : !(step > 1) ? interval
	          : interval.filter(field
	              ? function(d) { return field(d) % step === 0; }
	              : function(d) { return interval.count(0, d) % step === 0; });
	    };
	  }
	
	  return interval;
	}
	
	var millisecond = newInterval(function() {
	  // noop
	}, function(date, step) {
	  date.setTime(+date + step);
	}, function(start, end) {
	  return end - start;
	});
	
	// An optimized implementation for this simple case.
	millisecond.every = function(k) {
	  k = Math.floor(k);
	  if (!isFinite(k) || !(k > 0)) return null;
	  if (!(k > 1)) return millisecond;
	  return newInterval(function(date) {
	    date.setTime(Math.floor(date / k) * k);
	  }, function(date, step) {
	    date.setTime(+date + step * k);
	  }, function(start, end) {
	    return (end - start) / k;
	  });
	};
	
	var milliseconds = millisecond.range;
	
	var durationSecond = 1e3;
	var durationMinute = 6e4;
	var durationHour = 36e5;
	var durationDay = 864e5;
	var durationWeek = 6048e5;
	
	var second = newInterval(function(date) {
	  date.setTime(Math.floor(date / durationSecond) * durationSecond);
	}, function(date, step) {
	  date.setTime(+date + step * durationSecond);
	}, function(start, end) {
	  return (end - start) / durationSecond;
	}, function(date) {
	  return date.getUTCSeconds();
	});
	
	var seconds = second.range;
	
	var minute = newInterval(function(date) {
	  date.setTime(Math.floor(date / durationMinute) * durationMinute);
	}, function(date, step) {
	  date.setTime(+date + step * durationMinute);
	}, function(start, end) {
	  return (end - start) / durationMinute;
	}, function(date) {
	  return date.getMinutes();
	});
	
	var minutes = minute.range;
	
	var hour = newInterval(function(date) {
	  var offset = date.getTimezoneOffset() * durationMinute % durationHour;
	  if (offset < 0) offset += durationHour;
	  date.setTime(Math.floor((+date - offset) / durationHour) * durationHour + offset);
	}, function(date, step) {
	  date.setTime(+date + step * durationHour);
	}, function(start, end) {
	  return (end - start) / durationHour;
	}, function(date) {
	  return date.getHours();
	});
	
	var hours = hour.range;
	
	var day = newInterval(function(date) {
	  date.setHours(0, 0, 0, 0);
	}, function(date, step) {
	  date.setDate(date.getDate() + step);
	}, function(start, end) {
	  return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay;
	}, function(date) {
	  return date.getDate() - 1;
	});
	
	var days = day.range;
	
	function weekday(i) {
	  return newInterval(function(date) {
	    date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
	    date.setHours(0, 0, 0, 0);
	  }, function(date, step) {
	    date.setDate(date.getDate() + step * 7);
	  }, function(start, end) {
	    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationWeek;
	  });
	}
	
	var sunday = weekday(0);
	var monday = weekday(1);
	var tuesday = weekday(2);
	var wednesday = weekday(3);
	var thursday = weekday(4);
	var friday = weekday(5);
	var saturday = weekday(6);
	
	var sundays = sunday.range;
	var mondays = monday.range;
	var tuesdays = tuesday.range;
	var wednesdays = wednesday.range;
	var thursdays = thursday.range;
	var fridays = friday.range;
	var saturdays = saturday.range;
	
	var month = newInterval(function(date) {
	  date.setDate(1);
	  date.setHours(0, 0, 0, 0);
	}, function(date, step) {
	  date.setMonth(date.getMonth() + step);
	}, function(start, end) {
	  return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
	}, function(date) {
	  return date.getMonth();
	});
	
	var months = month.range;
	
	var year = newInterval(function(date) {
	  date.setMonth(0, 1);
	  date.setHours(0, 0, 0, 0);
	}, function(date, step) {
	  date.setFullYear(date.getFullYear() + step);
	}, function(start, end) {
	  return end.getFullYear() - start.getFullYear();
	}, function(date) {
	  return date.getFullYear();
	});
	
	// An optimized implementation for this simple case.
	year.every = function(k) {
	  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date) {
	    date.setFullYear(Math.floor(date.getFullYear() / k) * k);
	    date.setMonth(0, 1);
	    date.setHours(0, 0, 0, 0);
	  }, function(date, step) {
	    date.setFullYear(date.getFullYear() + step * k);
	  });
	};
	
	var years = year.range;
	
	var utcMinute = newInterval(function(date) {
	  date.setUTCSeconds(0, 0);
	}, function(date, step) {
	  date.setTime(+date + step * durationMinute);
	}, function(start, end) {
	  return (end - start) / durationMinute;
	}, function(date) {
	  return date.getUTCMinutes();
	});
	
	var utcMinutes = utcMinute.range;
	
	var utcHour = newInterval(function(date) {
	  date.setUTCMinutes(0, 0, 0);
	}, function(date, step) {
	  date.setTime(+date + step * durationHour);
	}, function(start, end) {
	  return (end - start) / durationHour;
	}, function(date) {
	  return date.getUTCHours();
	});
	
	var utcHours = utcHour.range;
	
	var utcDay = newInterval(function(date) {
	  date.setUTCHours(0, 0, 0, 0);
	}, function(date, step) {
	  date.setUTCDate(date.getUTCDate() + step);
	}, function(start, end) {
	  return (end - start) / durationDay;
	}, function(date) {
	  return date.getUTCDate() - 1;
	});
	
	var utcDays = utcDay.range;
	
	function utcWeekday(i) {
	  return newInterval(function(date) {
	    date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
	    date.setUTCHours(0, 0, 0, 0);
	  }, function(date, step) {
	    date.setUTCDate(date.getUTCDate() + step * 7);
	  }, function(start, end) {
	    return (end - start) / durationWeek;
	  });
	}
	
	var utcSunday = utcWeekday(0);
	var utcMonday = utcWeekday(1);
	var utcTuesday = utcWeekday(2);
	var utcWednesday = utcWeekday(3);
	var utcThursday = utcWeekday(4);
	var utcFriday = utcWeekday(5);
	var utcSaturday = utcWeekday(6);
	
	var utcSundays = utcSunday.range;
	var utcMondays = utcMonday.range;
	var utcTuesdays = utcTuesday.range;
	var utcWednesdays = utcWednesday.range;
	var utcThursdays = utcThursday.range;
	var utcFridays = utcFriday.range;
	var utcSaturdays = utcSaturday.range;
	
	var utcMonth = newInterval(function(date) {
	  date.setUTCDate(1);
	  date.setUTCHours(0, 0, 0, 0);
	}, function(date, step) {
	  date.setUTCMonth(date.getUTCMonth() + step);
	}, function(start, end) {
	  return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
	}, function(date) {
	  return date.getUTCMonth();
	});
	
	var utcMonths = utcMonth.range;
	
	var utcYear = newInterval(function(date) {
	  date.setUTCMonth(0, 1);
	  date.setUTCHours(0, 0, 0, 0);
	}, function(date, step) {
	  date.setUTCFullYear(date.getUTCFullYear() + step);
	}, function(start, end) {
	  return end.getUTCFullYear() - start.getUTCFullYear();
	}, function(date) {
	  return date.getUTCFullYear();
	});
	
	// An optimized implementation for this simple case.
	utcYear.every = function(k) {
	  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date) {
	    date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
	    date.setUTCMonth(0, 1);
	    date.setUTCHours(0, 0, 0, 0);
	  }, function(date, step) {
	    date.setUTCFullYear(date.getUTCFullYear() + step * k);
	  });
	};
	
	var utcYears = utcYear.range;
	
	exports.timeInterval = newInterval;
	exports.timeMillisecond = millisecond;
	exports.timeMilliseconds = milliseconds;
	exports.utcMillisecond = millisecond;
	exports.utcMilliseconds = milliseconds;
	exports.timeSecond = second;
	exports.timeSeconds = seconds;
	exports.utcSecond = second;
	exports.utcSeconds = seconds;
	exports.timeMinute = minute;
	exports.timeMinutes = minutes;
	exports.timeHour = hour;
	exports.timeHours = hours;
	exports.timeDay = day;
	exports.timeDays = days;
	exports.timeWeek = sunday;
	exports.timeWeeks = sundays;
	exports.timeSunday = sunday;
	exports.timeSundays = sundays;
	exports.timeMonday = monday;
	exports.timeMondays = mondays;
	exports.timeTuesday = tuesday;
	exports.timeTuesdays = tuesdays;
	exports.timeWednesday = wednesday;
	exports.timeWednesdays = wednesdays;
	exports.timeThursday = thursday;
	exports.timeThursdays = thursdays;
	exports.timeFriday = friday;
	exports.timeFridays = fridays;
	exports.timeSaturday = saturday;
	exports.timeSaturdays = saturdays;
	exports.timeMonth = month;
	exports.timeMonths = months;
	exports.timeYear = year;
	exports.timeYears = years;
	exports.utcMinute = utcMinute;
	exports.utcMinutes = utcMinutes;
	exports.utcHour = utcHour;
	exports.utcHours = utcHours;
	exports.utcDay = utcDay;
	exports.utcDays = utcDays;
	exports.utcWeek = utcSunday;
	exports.utcWeeks = utcSundays;
	exports.utcSunday = utcSunday;
	exports.utcSundays = utcSundays;
	exports.utcMonday = utcMonday;
	exports.utcMondays = utcMondays;
	exports.utcTuesday = utcTuesday;
	exports.utcTuesdays = utcTuesdays;
	exports.utcWednesday = utcWednesday;
	exports.utcWednesdays = utcWednesdays;
	exports.utcThursday = utcThursday;
	exports.utcThursdays = utcThursdays;
	exports.utcFriday = utcFriday;
	exports.utcFridays = utcFridays;
	exports.utcSaturday = utcSaturday;
	exports.utcSaturdays = utcSaturdays;
	exports.utcMonth = utcMonth;
	exports.utcMonths = utcMonths;
	exports.utcYear = utcYear;
	exports.utcYears = utcYears;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-time-format/ Version 2.0.5. Copyright 2017 Mike Bostock.
	(function (global, factory) {
		 true ? factory(exports, __webpack_require__(18)) :
		typeof define === 'function' && define.amd ? define(['exports', 'd3-time'], factory) :
		(factory((global.d3 = global.d3 || {}),global.d3));
	}(this, (function (exports,d3Time) { 'use strict';
	
	function localDate(d) {
	  if (0 <= d.y && d.y < 100) {
	    var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
	    date.setFullYear(d.y);
	    return date;
	  }
	  return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
	}
	
	function utcDate(d) {
	  if (0 <= d.y && d.y < 100) {
	    var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
	    date.setUTCFullYear(d.y);
	    return date;
	  }
	  return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
	}
	
	function newYear(y) {
	  return {y: y, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0};
	}
	
	function formatLocale(locale) {
	  var locale_dateTime = locale.dateTime,
	      locale_date = locale.date,
	      locale_time = locale.time,
	      locale_periods = locale.periods,
	      locale_weekdays = locale.days,
	      locale_shortWeekdays = locale.shortDays,
	      locale_months = locale.months,
	      locale_shortMonths = locale.shortMonths;
	
	  var periodRe = formatRe(locale_periods),
	      periodLookup = formatLookup(locale_periods),
	      weekdayRe = formatRe(locale_weekdays),
	      weekdayLookup = formatLookup(locale_weekdays),
	      shortWeekdayRe = formatRe(locale_shortWeekdays),
	      shortWeekdayLookup = formatLookup(locale_shortWeekdays),
	      monthRe = formatRe(locale_months),
	      monthLookup = formatLookup(locale_months),
	      shortMonthRe = formatRe(locale_shortMonths),
	      shortMonthLookup = formatLookup(locale_shortMonths);
	
	  var formats = {
	    "a": formatShortWeekday,
	    "A": formatWeekday,
	    "b": formatShortMonth,
	    "B": formatMonth,
	    "c": null,
	    "d": formatDayOfMonth,
	    "e": formatDayOfMonth,
	    "H": formatHour24,
	    "I": formatHour12,
	    "j": formatDayOfYear,
	    "L": formatMilliseconds,
	    "m": formatMonthNumber,
	    "M": formatMinutes,
	    "p": formatPeriod,
	    "S": formatSeconds,
	    "U": formatWeekNumberSunday,
	    "w": formatWeekdayNumber,
	    "W": formatWeekNumberMonday,
	    "x": null,
	    "X": null,
	    "y": formatYear,
	    "Y": formatFullYear,
	    "Z": formatZone,
	    "%": formatLiteralPercent
	  };
	
	  var utcFormats = {
	    "a": formatUTCShortWeekday,
	    "A": formatUTCWeekday,
	    "b": formatUTCShortMonth,
	    "B": formatUTCMonth,
	    "c": null,
	    "d": formatUTCDayOfMonth,
	    "e": formatUTCDayOfMonth,
	    "H": formatUTCHour24,
	    "I": formatUTCHour12,
	    "j": formatUTCDayOfYear,
	    "L": formatUTCMilliseconds,
	    "m": formatUTCMonthNumber,
	    "M": formatUTCMinutes,
	    "p": formatUTCPeriod,
	    "S": formatUTCSeconds,
	    "U": formatUTCWeekNumberSunday,
	    "w": formatUTCWeekdayNumber,
	    "W": formatUTCWeekNumberMonday,
	    "x": null,
	    "X": null,
	    "y": formatUTCYear,
	    "Y": formatUTCFullYear,
	    "Z": formatUTCZone,
	    "%": formatLiteralPercent
	  };
	
	  var parses = {
	    "a": parseShortWeekday,
	    "A": parseWeekday,
	    "b": parseShortMonth,
	    "B": parseMonth,
	    "c": parseLocaleDateTime,
	    "d": parseDayOfMonth,
	    "e": parseDayOfMonth,
	    "H": parseHour24,
	    "I": parseHour24,
	    "j": parseDayOfYear,
	    "L": parseMilliseconds,
	    "m": parseMonthNumber,
	    "M": parseMinutes,
	    "p": parsePeriod,
	    "S": parseSeconds,
	    "U": parseWeekNumberSunday,
	    "w": parseWeekdayNumber,
	    "W": parseWeekNumberMonday,
	    "x": parseLocaleDate,
	    "X": parseLocaleTime,
	    "y": parseYear,
	    "Y": parseFullYear,
	    "Z": parseZone,
	    "%": parseLiteralPercent
	  };
	
	  // These recursive directive definitions must be deferred.
	  formats.x = newFormat(locale_date, formats);
	  formats.X = newFormat(locale_time, formats);
	  formats.c = newFormat(locale_dateTime, formats);
	  utcFormats.x = newFormat(locale_date, utcFormats);
	  utcFormats.X = newFormat(locale_time, utcFormats);
	  utcFormats.c = newFormat(locale_dateTime, utcFormats);
	
	  function newFormat(specifier, formats) {
	    return function(date) {
	      var string = [],
	          i = -1,
	          j = 0,
	          n = specifier.length,
	          c,
	          pad,
	          format;
	
	      if (!(date instanceof Date)) date = new Date(+date);
	
	      while (++i < n) {
	        if (specifier.charCodeAt(i) === 37) {
	          string.push(specifier.slice(j, i));
	          if ((pad = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);
	          else pad = c === "e" ? " " : "0";
	          if (format = formats[c]) c = format(date, pad);
	          string.push(c);
	          j = i + 1;
	        }
	      }
	
	      string.push(specifier.slice(j, i));
	      return string.join("");
	    };
	  }
	
	  function newParse(specifier, newDate) {
	    return function(string) {
	      var d = newYear(1900),
	          i = parseSpecifier(d, specifier, string += "", 0);
	      if (i != string.length) return null;
	
	      // The am-pm flag is 0 for AM, and 1 for PM.
	      if ("p" in d) d.H = d.H % 12 + d.p * 12;
	
	      // Convert day-of-week and week-of-year to day-of-year.
	      if ("W" in d || "U" in d) {
	        if (!("w" in d)) d.w = "W" in d ? 1 : 0;
	        var day = "Z" in d ? utcDate(newYear(d.y)).getUTCDay() : newDate(newYear(d.y)).getDay();
	        d.m = 0;
	        d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day + 5) % 7 : d.w + d.U * 7 - (day + 6) % 7;
	      }
	
	      // If a time zone is specified, all fields are interpreted as UTC and then
	      // offset according to the specified time zone.
	      if ("Z" in d) {
	        d.H += d.Z / 100 | 0;
	        d.M += d.Z % 100;
	        return utcDate(d);
	      }
	
	      // Otherwise, all fields are in local time.
	      return newDate(d);
	    };
	  }
	
	  function parseSpecifier(d, specifier, string, j) {
	    var i = 0,
	        n = specifier.length,
	        m = string.length,
	        c,
	        parse;
	
	    while (i < n) {
	      if (j >= m) return -1;
	      c = specifier.charCodeAt(i++);
	      if (c === 37) {
	        c = specifier.charAt(i++);
	        parse = parses[c in pads ? specifier.charAt(i++) : c];
	        if (!parse || ((j = parse(d, string, j)) < 0)) return -1;
	      } else if (c != string.charCodeAt(j++)) {
	        return -1;
	      }
	    }
	
	    return j;
	  }
	
	  function parsePeriod(d, string, i) {
	    var n = periodRe.exec(string.slice(i));
	    return n ? (d.p = periodLookup[n[0].toLowerCase()], i + n[0].length) : -1;
	  }
	
	  function parseShortWeekday(d, string, i) {
	    var n = shortWeekdayRe.exec(string.slice(i));
	    return n ? (d.w = shortWeekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
	  }
	
	  function parseWeekday(d, string, i) {
	    var n = weekdayRe.exec(string.slice(i));
	    return n ? (d.w = weekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
	  }
	
	  function parseShortMonth(d, string, i) {
	    var n = shortMonthRe.exec(string.slice(i));
	    return n ? (d.m = shortMonthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
	  }
	
	  function parseMonth(d, string, i) {
	    var n = monthRe.exec(string.slice(i));
	    return n ? (d.m = monthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
	  }
	
	  function parseLocaleDateTime(d, string, i) {
	    return parseSpecifier(d, locale_dateTime, string, i);
	  }
	
	  function parseLocaleDate(d, string, i) {
	    return parseSpecifier(d, locale_date, string, i);
	  }
	
	  function parseLocaleTime(d, string, i) {
	    return parseSpecifier(d, locale_time, string, i);
	  }
	
	  function formatShortWeekday(d) {
	    return locale_shortWeekdays[d.getDay()];
	  }
	
	  function formatWeekday(d) {
	    return locale_weekdays[d.getDay()];
	  }
	
	  function formatShortMonth(d) {
	    return locale_shortMonths[d.getMonth()];
	  }
	
	  function formatMonth(d) {
	    return locale_months[d.getMonth()];
	  }
	
	  function formatPeriod(d) {
	    return locale_periods[+(d.getHours() >= 12)];
	  }
	
	  function formatUTCShortWeekday(d) {
	    return locale_shortWeekdays[d.getUTCDay()];
	  }
	
	  function formatUTCWeekday(d) {
	    return locale_weekdays[d.getUTCDay()];
	  }
	
	  function formatUTCShortMonth(d) {
	    return locale_shortMonths[d.getUTCMonth()];
	  }
	
	  function formatUTCMonth(d) {
	    return locale_months[d.getUTCMonth()];
	  }
	
	  function formatUTCPeriod(d) {
	    return locale_periods[+(d.getUTCHours() >= 12)];
	  }
	
	  return {
	    format: function(specifier) {
	      var f = newFormat(specifier += "", formats);
	      f.toString = function() { return specifier; };
	      return f;
	    },
	    parse: function(specifier) {
	      var p = newParse(specifier += "", localDate);
	      p.toString = function() { return specifier; };
	      return p;
	    },
	    utcFormat: function(specifier) {
	      var f = newFormat(specifier += "", utcFormats);
	      f.toString = function() { return specifier; };
	      return f;
	    },
	    utcParse: function(specifier) {
	      var p = newParse(specifier, utcDate);
	      p.toString = function() { return specifier; };
	      return p;
	    }
	  };
	}
	
	var pads = {"-": "", "_": " ", "0": "0"};
	var numberRe = /^\s*\d+/;
	var percentRe = /^%/;
	var requoteRe = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
	
	function pad(value, fill, width) {
	  var sign = value < 0 ? "-" : "",
	      string = (sign ? -value : value) + "",
	      length = string.length;
	  return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
	}
	
	function requote(s) {
	  return s.replace(requoteRe, "\\$&");
	}
	
	function formatRe(names) {
	  return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
	}
	
	function formatLookup(names) {
	  var map = {}, i = -1, n = names.length;
	  while (++i < n) map[names[i].toLowerCase()] = i;
	  return map;
	}
	
	function parseWeekdayNumber(d, string, i) {
	  var n = numberRe.exec(string.slice(i, i + 1));
	  return n ? (d.w = +n[0], i + n[0].length) : -1;
	}
	
	function parseWeekNumberSunday(d, string, i) {
	  var n = numberRe.exec(string.slice(i));
	  return n ? (d.U = +n[0], i + n[0].length) : -1;
	}
	
	function parseWeekNumberMonday(d, string, i) {
	  var n = numberRe.exec(string.slice(i));
	  return n ? (d.W = +n[0], i + n[0].length) : -1;
	}
	
	function parseFullYear(d, string, i) {
	  var n = numberRe.exec(string.slice(i, i + 4));
	  return n ? (d.y = +n[0], i + n[0].length) : -1;
	}
	
	function parseYear(d, string, i) {
	  var n = numberRe.exec(string.slice(i, i + 2));
	  return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2000), i + n[0].length) : -1;
	}
	
	function parseZone(d, string, i) {
	  var n = /^(Z)|([+-]\d\d)(?:\:?(\d\d))?/.exec(string.slice(i, i + 6));
	  return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
	}
	
	function parseMonthNumber(d, string, i) {
	  var n = numberRe.exec(string.slice(i, i + 2));
	  return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
	}
	
	function parseDayOfMonth(d, string, i) {
	  var n = numberRe.exec(string.slice(i, i + 2));
	  return n ? (d.d = +n[0], i + n[0].length) : -1;
	}
	
	function parseDayOfYear(d, string, i) {
	  var n = numberRe.exec(string.slice(i, i + 3));
	  return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
	}
	
	function parseHour24(d, string, i) {
	  var n = numberRe.exec(string.slice(i, i + 2));
	  return n ? (d.H = +n[0], i + n[0].length) : -1;
	}
	
	function parseMinutes(d, string, i) {
	  var n = numberRe.exec(string.slice(i, i + 2));
	  return n ? (d.M = +n[0], i + n[0].length) : -1;
	}
	
	function parseSeconds(d, string, i) {
	  var n = numberRe.exec(string.slice(i, i + 2));
	  return n ? (d.S = +n[0], i + n[0].length) : -1;
	}
	
	function parseMilliseconds(d, string, i) {
	  var n = numberRe.exec(string.slice(i, i + 3));
	  return n ? (d.L = +n[0], i + n[0].length) : -1;
	}
	
	function parseLiteralPercent(d, string, i) {
	  var n = percentRe.exec(string.slice(i, i + 1));
	  return n ? i + n[0].length : -1;
	}
	
	function formatDayOfMonth(d, p) {
	  return pad(d.getDate(), p, 2);
	}
	
	function formatHour24(d, p) {
	  return pad(d.getHours(), p, 2);
	}
	
	function formatHour12(d, p) {
	  return pad(d.getHours() % 12 || 12, p, 2);
	}
	
	function formatDayOfYear(d, p) {
	  return pad(1 + d3Time.timeDay.count(d3Time.timeYear(d), d), p, 3);
	}
	
	function formatMilliseconds(d, p) {
	  return pad(d.getMilliseconds(), p, 3);
	}
	
	function formatMonthNumber(d, p) {
	  return pad(d.getMonth() + 1, p, 2);
	}
	
	function formatMinutes(d, p) {
	  return pad(d.getMinutes(), p, 2);
	}
	
	function formatSeconds(d, p) {
	  return pad(d.getSeconds(), p, 2);
	}
	
	function formatWeekNumberSunday(d, p) {
	  return pad(d3Time.timeSunday.count(d3Time.timeYear(d), d), p, 2);
	}
	
	function formatWeekdayNumber(d) {
	  return d.getDay();
	}
	
	function formatWeekNumberMonday(d, p) {
	  return pad(d3Time.timeMonday.count(d3Time.timeYear(d), d), p, 2);
	}
	
	function formatYear(d, p) {
	  return pad(d.getFullYear() % 100, p, 2);
	}
	
	function formatFullYear(d, p) {
	  return pad(d.getFullYear() % 10000, p, 4);
	}
	
	function formatZone(d) {
	  var z = d.getTimezoneOffset();
	  return (z > 0 ? "-" : (z *= -1, "+"))
	      + pad(z / 60 | 0, "0", 2)
	      + pad(z % 60, "0", 2);
	}
	
	function formatUTCDayOfMonth(d, p) {
	  return pad(d.getUTCDate(), p, 2);
	}
	
	function formatUTCHour24(d, p) {
	  return pad(d.getUTCHours(), p, 2);
	}
	
	function formatUTCHour12(d, p) {
	  return pad(d.getUTCHours() % 12 || 12, p, 2);
	}
	
	function formatUTCDayOfYear(d, p) {
	  return pad(1 + d3Time.utcDay.count(d3Time.utcYear(d), d), p, 3);
	}
	
	function formatUTCMilliseconds(d, p) {
	  return pad(d.getUTCMilliseconds(), p, 3);
	}
	
	function formatUTCMonthNumber(d, p) {
	  return pad(d.getUTCMonth() + 1, p, 2);
	}
	
	function formatUTCMinutes(d, p) {
	  return pad(d.getUTCMinutes(), p, 2);
	}
	
	function formatUTCSeconds(d, p) {
	  return pad(d.getUTCSeconds(), p, 2);
	}
	
	function formatUTCWeekNumberSunday(d, p) {
	  return pad(d3Time.utcSunday.count(d3Time.utcYear(d), d), p, 2);
	}
	
	function formatUTCWeekdayNumber(d) {
	  return d.getUTCDay();
	}
	
	function formatUTCWeekNumberMonday(d, p) {
	  return pad(d3Time.utcMonday.count(d3Time.utcYear(d), d), p, 2);
	}
	
	function formatUTCYear(d, p) {
	  return pad(d.getUTCFullYear() % 100, p, 2);
	}
	
	function formatUTCFullYear(d, p) {
	  return pad(d.getUTCFullYear() % 10000, p, 4);
	}
	
	function formatUTCZone() {
	  return "+0000";
	}
	
	function formatLiteralPercent() {
	  return "%";
	}
	
	var locale$1;
	
	
	
	
	
	defaultLocale({
	  dateTime: "%x, %X",
	  date: "%-m/%-d/%Y",
	  time: "%-I:%M:%S %p",
	  periods: ["AM", "PM"],
	  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	});
	
	function defaultLocale(definition) {
	  locale$1 = formatLocale(definition);
	  exports.timeFormat = locale$1.format;
	  exports.timeParse = locale$1.parse;
	  exports.utcFormat = locale$1.utcFormat;
	  exports.utcParse = locale$1.utcParse;
	  return locale$1;
	}
	
	var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";
	
	function formatIsoNative(date) {
	  return date.toISOString();
	}
	
	var formatIso = Date.prototype.toISOString
	    ? formatIsoNative
	    : exports.utcFormat(isoSpecifier);
	
	function parseIsoNative(string) {
	  var date = new Date(string);
	  return isNaN(date) ? null : date;
	}
	
	var parseIso = +new Date("2000-01-01T00:00:00.000Z")
	    ? parseIsoNative
	    : exports.utcParse(isoSpecifier);
	
	exports.timeFormatDefaultLocale = defaultLocale;
	exports.timeFormatLocale = formatLocale;
	exports.isoFormat = formatIso;
	exports.isoParse = parseIso;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-shape/ Version 1.1.1. Copyright 2017 Mike Bostock.
	(function (global, factory) {
		 true ? factory(exports, __webpack_require__(21)) :
		typeof define === 'function' && define.amd ? define(['exports', 'd3-path'], factory) :
		(factory((global.d3 = global.d3 || {}),global.d3));
	}(this, (function (exports,d3Path) { 'use strict';
	
	var constant = function(x) {
	  return function constant() {
	    return x;
	  };
	};
	
	var abs = Math.abs;
	var atan2 = Math.atan2;
	var cos = Math.cos;
	var max = Math.max;
	var min = Math.min;
	var sin = Math.sin;
	var sqrt = Math.sqrt;
	
	var epsilon = 1e-12;
	var pi = Math.PI;
	var halfPi = pi / 2;
	var tau = 2 * pi;
	
	function acos(x) {
	  return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
	}
	
	function asin(x) {
	  return x >= 1 ? halfPi : x <= -1 ? -halfPi : Math.asin(x);
	}
	
	function arcInnerRadius(d) {
	  return d.innerRadius;
	}
	
	function arcOuterRadius(d) {
	  return d.outerRadius;
	}
	
	function arcStartAngle(d) {
	  return d.startAngle;
	}
	
	function arcEndAngle(d) {
	  return d.endAngle;
	}
	
	function arcPadAngle(d) {
	  return d && d.padAngle; // Note: optional!
	}
	
	function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
	  var x10 = x1 - x0, y10 = y1 - y0,
	      x32 = x3 - x2, y32 = y3 - y2,
	      t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / (y32 * x10 - x32 * y10);
	  return [x0 + t * x10, y0 + t * y10];
	}
	
	// Compute perpendicular offset line of length rc.
	// http://mathworld.wolfram.com/Circle-LineIntersection.html
	function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
	  var x01 = x0 - x1,
	      y01 = y0 - y1,
	      lo = (cw ? rc : -rc) / sqrt(x01 * x01 + y01 * y01),
	      ox = lo * y01,
	      oy = -lo * x01,
	      x11 = x0 + ox,
	      y11 = y0 + oy,
	      x10 = x1 + ox,
	      y10 = y1 + oy,
	      x00 = (x11 + x10) / 2,
	      y00 = (y11 + y10) / 2,
	      dx = x10 - x11,
	      dy = y10 - y11,
	      d2 = dx * dx + dy * dy,
	      r = r1 - rc,
	      D = x11 * y10 - x10 * y11,
	      d = (dy < 0 ? -1 : 1) * sqrt(max(0, r * r * d2 - D * D)),
	      cx0 = (D * dy - dx * d) / d2,
	      cy0 = (-D * dx - dy * d) / d2,
	      cx1 = (D * dy + dx * d) / d2,
	      cy1 = (-D * dx + dy * d) / d2,
	      dx0 = cx0 - x00,
	      dy0 = cy0 - y00,
	      dx1 = cx1 - x00,
	      dy1 = cy1 - y00;
	
	  // Pick the closer of the two intersection points.
	  // TODO Is there a faster way to determine which intersection to use?
	  if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;
	
	  return {
	    cx: cx0,
	    cy: cy0,
	    x01: -ox,
	    y01: -oy,
	    x11: cx0 * (r1 / r - 1),
	    y11: cy0 * (r1 / r - 1)
	  };
	}
	
	var arc = function() {
	  var innerRadius = arcInnerRadius,
	      outerRadius = arcOuterRadius,
	      cornerRadius = constant(0),
	      padRadius = null,
	      startAngle = arcStartAngle,
	      endAngle = arcEndAngle,
	      padAngle = arcPadAngle,
	      context = null;
	
	  function arc() {
	    var buffer,
	        r,
	        r0 = +innerRadius.apply(this, arguments),
	        r1 = +outerRadius.apply(this, arguments),
	        a0 = startAngle.apply(this, arguments) - halfPi,
	        a1 = endAngle.apply(this, arguments) - halfPi,
	        da = abs(a1 - a0),
	        cw = a1 > a0;
	
	    if (!context) context = buffer = d3Path.path();
	
	    // Ensure that the outer radius is always larger than the inner radius.
	    if (r1 < r0) r = r1, r1 = r0, r0 = r;
	
	    // Is it a point?
	    if (!(r1 > epsilon)) context.moveTo(0, 0);
	
	    // Or is it a circle or annulus?
	    else if (da > tau - epsilon) {
	      context.moveTo(r1 * cos(a0), r1 * sin(a0));
	      context.arc(0, 0, r1, a0, a1, !cw);
	      if (r0 > epsilon) {
	        context.moveTo(r0 * cos(a1), r0 * sin(a1));
	        context.arc(0, 0, r0, a1, a0, cw);
	      }
	    }
	
	    // Or is it a circular or annular sector?
	    else {
	      var a01 = a0,
	          a11 = a1,
	          a00 = a0,
	          a10 = a1,
	          da0 = da,
	          da1 = da,
	          ap = padAngle.apply(this, arguments) / 2,
	          rp = (ap > epsilon) && (padRadius ? +padRadius.apply(this, arguments) : sqrt(r0 * r0 + r1 * r1)),
	          rc = min(abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments)),
	          rc0 = rc,
	          rc1 = rc,
	          t0,
	          t1;
	
	      // Apply padding? Note that since r1 ≥ r0, da1 ≥ da0.
	      if (rp > epsilon) {
	        var p0 = asin(rp / r0 * sin(ap)),
	            p1 = asin(rp / r1 * sin(ap));
	        if ((da0 -= p0 * 2) > epsilon) p0 *= (cw ? 1 : -1), a00 += p0, a10 -= p0;
	        else da0 = 0, a00 = a10 = (a0 + a1) / 2;
	        if ((da1 -= p1 * 2) > epsilon) p1 *= (cw ? 1 : -1), a01 += p1, a11 -= p1;
	        else da1 = 0, a01 = a11 = (a0 + a1) / 2;
	      }
	
	      var x01 = r1 * cos(a01),
	          y01 = r1 * sin(a01),
	          x10 = r0 * cos(a10),
	          y10 = r0 * sin(a10);
	
	      // Apply rounded corners?
	      if (rc > epsilon) {
	        var x11 = r1 * cos(a11),
	            y11 = r1 * sin(a11),
	            x00 = r0 * cos(a00),
	            y00 = r0 * sin(a00);
	
	        // Restrict the corner radius according to the sector angle.
	        if (da < pi) {
	          var oc = da0 > epsilon ? intersect(x01, y01, x00, y00, x11, y11, x10, y10) : [x10, y10],
	              ax = x01 - oc[0],
	              ay = y01 - oc[1],
	              bx = x11 - oc[0],
	              by = y11 - oc[1],
	              kc = 1 / sin(acos((ax * bx + ay * by) / (sqrt(ax * ax + ay * ay) * sqrt(bx * bx + by * by))) / 2),
	              lc = sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
	          rc0 = min(rc, (r0 - lc) / (kc - 1));
	          rc1 = min(rc, (r1 - lc) / (kc + 1));
	        }
	      }
	
	      // Is the sector collapsed to a line?
	      if (!(da1 > epsilon)) context.moveTo(x01, y01);
	
	      // Does the sector’s outer ring have rounded corners?
	      else if (rc1 > epsilon) {
	        t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
	        t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);
	
	        context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01);
	
	        // Have the corners merged?
	        if (rc1 < rc) context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);
	
	        // Otherwise, draw the two corners and the ring.
	        else {
	          context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
	          context.arc(0, 0, r1, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
	          context.arc(t1.cx, t1.cy, rc1, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
	        }
	      }
	
	      // Or is the outer ring just a circular arc?
	      else context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw);
	
	      // Is there no inner ring, and it’s a circular sector?
	      // Or perhaps it’s an annular sector collapsed due to padding?
	      if (!(r0 > epsilon) || !(da0 > epsilon)) context.lineTo(x10, y10);
	
	      // Does the sector’s inner ring (or point) have rounded corners?
	      else if (rc0 > epsilon) {
	        t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
	        t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);
	
	        context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01);
	
	        // Have the corners merged?
	        if (rc0 < rc) context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);
	
	        // Otherwise, draw the two corners and the ring.
	        else {
	          context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
	          context.arc(0, 0, r0, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), cw);
	          context.arc(t1.cx, t1.cy, rc0, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
	        }
	      }
	
	      // Or is the inner ring just a circular arc?
	      else context.arc(0, 0, r0, a10, a00, cw);
	    }
	
	    context.closePath();
	
	    if (buffer) return context = null, buffer + "" || null;
	  }
	
	  arc.centroid = function() {
	    var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2,
	        a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - pi / 2;
	    return [cos(a) * r, sin(a) * r];
	  };
	
	  arc.innerRadius = function(_) {
	    return arguments.length ? (innerRadius = typeof _ === "function" ? _ : constant(+_), arc) : innerRadius;
	  };
	
	  arc.outerRadius = function(_) {
	    return arguments.length ? (outerRadius = typeof _ === "function" ? _ : constant(+_), arc) : outerRadius;
	  };
	
	  arc.cornerRadius = function(_) {
	    return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : constant(+_), arc) : cornerRadius;
	  };
	
	  arc.padRadius = function(_) {
	    return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : constant(+_), arc) : padRadius;
	  };
	
	  arc.startAngle = function(_) {
	    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant(+_), arc) : startAngle;
	  };
	
	  arc.endAngle = function(_) {
	    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant(+_), arc) : endAngle;
	  };
	
	  arc.padAngle = function(_) {
	    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant(+_), arc) : padAngle;
	  };
	
	  arc.context = function(_) {
	    return arguments.length ? ((context = _ == null ? null : _), arc) : context;
	  };
	
	  return arc;
	};
	
	function Linear(context) {
	  this._context = context;
	}
	
	Linear.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	      case 1: this._point = 2; // proceed
	      default: this._context.lineTo(x, y); break;
	    }
	  }
	};
	
	var curveLinear = function(context) {
	  return new Linear(context);
	};
	
	function x(p) {
	  return p[0];
	}
	
	function y(p) {
	  return p[1];
	}
	
	var line = function() {
	  var x$$1 = x,
	      y$$1 = y,
	      defined = constant(true),
	      context = null,
	      curve = curveLinear,
	      output = null;
	
	  function line(data) {
	    var i,
	        n = data.length,
	        d,
	        defined0 = false,
	        buffer;
	
	    if (context == null) output = curve(buffer = d3Path.path());
	
	    for (i = 0; i <= n; ++i) {
	      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
	        if (defined0 = !defined0) output.lineStart();
	        else output.lineEnd();
	      }
	      if (defined0) output.point(+x$$1(d, i, data), +y$$1(d, i, data));
	    }
	
	    if (buffer) return output = null, buffer + "" || null;
	  }
	
	  line.x = function(_) {
	    return arguments.length ? (x$$1 = typeof _ === "function" ? _ : constant(+_), line) : x$$1;
	  };
	
	  line.y = function(_) {
	    return arguments.length ? (y$$1 = typeof _ === "function" ? _ : constant(+_), line) : y$$1;
	  };
	
	  line.defined = function(_) {
	    return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), line) : defined;
	  };
	
	  line.curve = function(_) {
	    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
	  };
	
	  line.context = function(_) {
	    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
	  };
	
	  return line;
	};
	
	var area = function() {
	  var x0 = x,
	      x1 = null,
	      y0 = constant(0),
	      y1 = y,
	      defined = constant(true),
	      context = null,
	      curve = curveLinear,
	      output = null;
	
	  function area(data) {
	    var i,
	        j,
	        k,
	        n = data.length,
	        d,
	        defined0 = false,
	        buffer,
	        x0z = new Array(n),
	        y0z = new Array(n);
	
	    if (context == null) output = curve(buffer = d3Path.path());
	
	    for (i = 0; i <= n; ++i) {
	      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
	        if (defined0 = !defined0) {
	          j = i;
	          output.areaStart();
	          output.lineStart();
	        } else {
	          output.lineEnd();
	          output.lineStart();
	          for (k = i - 1; k >= j; --k) {
	            output.point(x0z[k], y0z[k]);
	          }
	          output.lineEnd();
	          output.areaEnd();
	        }
	      }
	      if (defined0) {
	        x0z[i] = +x0(d, i, data), y0z[i] = +y0(d, i, data);
	        output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
	      }
	    }
	
	    if (buffer) return output = null, buffer + "" || null;
	  }
	
	  function arealine() {
	    return line().defined(defined).curve(curve).context(context);
	  }
	
	  area.x = function(_) {
	    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant(+_), x1 = null, area) : x0;
	  };
	
	  area.x0 = function(_) {
	    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant(+_), area) : x0;
	  };
	
	  area.x1 = function(_) {
	    return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : constant(+_), area) : x1;
	  };
	
	  area.y = function(_) {
	    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant(+_), y1 = null, area) : y0;
	  };
	
	  area.y0 = function(_) {
	    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant(+_), area) : y0;
	  };
	
	  area.y1 = function(_) {
	    return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : constant(+_), area) : y1;
	  };
	
	  area.lineX0 =
	  area.lineY0 = function() {
	    return arealine().x(x0).y(y0);
	  };
	
	  area.lineY1 = function() {
	    return arealine().x(x0).y(y1);
	  };
	
	  area.lineX1 = function() {
	    return arealine().x(x1).y(y0);
	  };
	
	  area.defined = function(_) {
	    return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), area) : defined;
	  };
	
	  area.curve = function(_) {
	    return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
	  };
	
	  area.context = function(_) {
	    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
	  };
	
	  return area;
	};
	
	var descending = function(a, b) {
	  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
	};
	
	var identity = function(d) {
	  return d;
	};
	
	var pie = function() {
	  var value = identity,
	      sortValues = descending,
	      sort = null,
	      startAngle = constant(0),
	      endAngle = constant(tau),
	      padAngle = constant(0);
	
	  function pie(data) {
	    var i,
	        n = data.length,
	        j,
	        k,
	        sum = 0,
	        index = new Array(n),
	        arcs = new Array(n),
	        a0 = +startAngle.apply(this, arguments),
	        da = Math.min(tau, Math.max(-tau, endAngle.apply(this, arguments) - a0)),
	        a1,
	        p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)),
	        pa = p * (da < 0 ? -1 : 1),
	        v;
	
	    for (i = 0; i < n; ++i) {
	      if ((v = arcs[index[i] = i] = +value(data[i], i, data)) > 0) {
	        sum += v;
	      }
	    }
	
	    // Optionally sort the arcs by previously-computed values or by data.
	    if (sortValues != null) index.sort(function(i, j) { return sortValues(arcs[i], arcs[j]); });
	    else if (sort != null) index.sort(function(i, j) { return sort(data[i], data[j]); });
	
	    // Compute the arcs! They are stored in the original data's order.
	    for (i = 0, k = sum ? (da - n * pa) / sum : 0; i < n; ++i, a0 = a1) {
	      j = index[i], v = arcs[j], a1 = a0 + (v > 0 ? v * k : 0) + pa, arcs[j] = {
	        data: data[j],
	        index: i,
	        value: v,
	        startAngle: a0,
	        endAngle: a1,
	        padAngle: p
	      };
	    }
	
	    return arcs;
	  }
	
	  pie.value = function(_) {
	    return arguments.length ? (value = typeof _ === "function" ? _ : constant(+_), pie) : value;
	  };
	
	  pie.sortValues = function(_) {
	    return arguments.length ? (sortValues = _, sort = null, pie) : sortValues;
	  };
	
	  pie.sort = function(_) {
	    return arguments.length ? (sort = _, sortValues = null, pie) : sort;
	  };
	
	  pie.startAngle = function(_) {
	    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant(+_), pie) : startAngle;
	  };
	
	  pie.endAngle = function(_) {
	    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant(+_), pie) : endAngle;
	  };
	
	  pie.padAngle = function(_) {
	    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant(+_), pie) : padAngle;
	  };
	
	  return pie;
	};
	
	var curveRadialLinear = curveRadial(curveLinear);
	
	function Radial(curve) {
	  this._curve = curve;
	}
	
	Radial.prototype = {
	  areaStart: function() {
	    this._curve.areaStart();
	  },
	  areaEnd: function() {
	    this._curve.areaEnd();
	  },
	  lineStart: function() {
	    this._curve.lineStart();
	  },
	  lineEnd: function() {
	    this._curve.lineEnd();
	  },
	  point: function(a, r) {
	    this._curve.point(r * Math.sin(a), r * -Math.cos(a));
	  }
	};
	
	function curveRadial(curve) {
	
	  function radial(context) {
	    return new Radial(curve(context));
	  }
	
	  radial._curve = curve;
	
	  return radial;
	}
	
	function radialLine(l) {
	  var c = l.curve;
	
	  l.angle = l.x, delete l.x;
	  l.radius = l.y, delete l.y;
	
	  l.curve = function(_) {
	    return arguments.length ? c(curveRadial(_)) : c()._curve;
	  };
	
	  return l;
	}
	
	var radialLine$1 = function() {
	  return radialLine(line().curve(curveRadialLinear));
	};
	
	var radialArea = function() {
	  var a = area().curve(curveRadialLinear),
	      c = a.curve,
	      x0 = a.lineX0,
	      x1 = a.lineX1,
	      y0 = a.lineY0,
	      y1 = a.lineY1;
	
	  a.angle = a.x, delete a.x;
	  a.startAngle = a.x0, delete a.x0;
	  a.endAngle = a.x1, delete a.x1;
	  a.radius = a.y, delete a.y;
	  a.innerRadius = a.y0, delete a.y0;
	  a.outerRadius = a.y1, delete a.y1;
	  a.lineStartAngle = function() { return radialLine(x0()); }, delete a.lineX0;
	  a.lineEndAngle = function() { return radialLine(x1()); }, delete a.lineX1;
	  a.lineInnerRadius = function() { return radialLine(y0()); }, delete a.lineY0;
	  a.lineOuterRadius = function() { return radialLine(y1()); }, delete a.lineY1;
	
	  a.curve = function(_) {
	    return arguments.length ? c(curveRadial(_)) : c()._curve;
	  };
	
	  return a;
	};
	
	var slice = Array.prototype.slice;
	
	var radialPoint = function(x, y) {
	  return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
	};
	
	function linkSource(d) {
	  return d.source;
	}
	
	function linkTarget(d) {
	  return d.target;
	}
	
	function link(curve) {
	  var source = linkSource,
	      target = linkTarget,
	      x$$1 = x,
	      y$$1 = y,
	      context = null;
	
	  function link() {
	    var buffer, argv = slice.call(arguments), s = source.apply(this, argv), t = target.apply(this, argv);
	    if (!context) context = buffer = d3Path.path();
	    curve(context, +x$$1.apply(this, (argv[0] = s, argv)), +y$$1.apply(this, argv), +x$$1.apply(this, (argv[0] = t, argv)), +y$$1.apply(this, argv));
	    if (buffer) return context = null, buffer + "" || null;
	  }
	
	  link.source = function(_) {
	    return arguments.length ? (source = _, link) : source;
	  };
	
	  link.target = function(_) {
	    return arguments.length ? (target = _, link) : target;
	  };
	
	  link.x = function(_) {
	    return arguments.length ? (x$$1 = typeof _ === "function" ? _ : constant(+_), link) : x$$1;
	  };
	
	  link.y = function(_) {
	    return arguments.length ? (y$$1 = typeof _ === "function" ? _ : constant(+_), link) : y$$1;
	  };
	
	  link.context = function(_) {
	    return arguments.length ? ((context = _ == null ? null : _), link) : context;
	  };
	
	  return link;
	}
	
	function curveHorizontal(context, x0, y0, x1, y1) {
	  context.moveTo(x0, y0);
	  context.bezierCurveTo(x0 = (x0 + x1) / 2, y0, x0, y1, x1, y1);
	}
	
	function curveVertical(context, x0, y0, x1, y1) {
	  context.moveTo(x0, y0);
	  context.bezierCurveTo(x0, y0 = (y0 + y1) / 2, x1, y0, x1, y1);
	}
	
	function curveRadial$1(context, x0, y0, x1, y1) {
	  var p0 = radialPoint(x0, y0),
	      p1 = radialPoint(x0, y0 = (y0 + y1) / 2),
	      p2 = radialPoint(x1, y0),
	      p3 = radialPoint(x1, y1);
	  context.moveTo(p0[0], p0[1]);
	  context.bezierCurveTo(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
	}
	
	function linkHorizontal() {
	  return link(curveHorizontal);
	}
	
	function linkVertical() {
	  return link(curveVertical);
	}
	
	function linkRadial() {
	  var l = link(curveRadial$1);
	  l.angle = l.x, delete l.x;
	  l.radius = l.y, delete l.y;
	  return l;
	}
	
	var circle = {
	  draw: function(context, size) {
	    var r = Math.sqrt(size / pi);
	    context.moveTo(r, 0);
	    context.arc(0, 0, r, 0, tau);
	  }
	};
	
	var cross = {
	  draw: function(context, size) {
	    var r = Math.sqrt(size / 5) / 2;
	    context.moveTo(-3 * r, -r);
	    context.lineTo(-r, -r);
	    context.lineTo(-r, -3 * r);
	    context.lineTo(r, -3 * r);
	    context.lineTo(r, -r);
	    context.lineTo(3 * r, -r);
	    context.lineTo(3 * r, r);
	    context.lineTo(r, r);
	    context.lineTo(r, 3 * r);
	    context.lineTo(-r, 3 * r);
	    context.lineTo(-r, r);
	    context.lineTo(-3 * r, r);
	    context.closePath();
	  }
	};
	
	var tan30 = Math.sqrt(1 / 3);
	var tan30_2 = tan30 * 2;
	
	var diamond = {
	  draw: function(context, size) {
	    var y = Math.sqrt(size / tan30_2),
	        x = y * tan30;
	    context.moveTo(0, -y);
	    context.lineTo(x, 0);
	    context.lineTo(0, y);
	    context.lineTo(-x, 0);
	    context.closePath();
	  }
	};
	
	var ka = 0.89081309152928522810;
	var kr = Math.sin(pi / 10) / Math.sin(7 * pi / 10);
	var kx = Math.sin(tau / 10) * kr;
	var ky = -Math.cos(tau / 10) * kr;
	
	var star = {
	  draw: function(context, size) {
	    var r = Math.sqrt(size * ka),
	        x = kx * r,
	        y = ky * r;
	    context.moveTo(0, -r);
	    context.lineTo(x, y);
	    for (var i = 1; i < 5; ++i) {
	      var a = tau * i / 5,
	          c = Math.cos(a),
	          s = Math.sin(a);
	      context.lineTo(s * r, -c * r);
	      context.lineTo(c * x - s * y, s * x + c * y);
	    }
	    context.closePath();
	  }
	};
	
	var square = {
	  draw: function(context, size) {
	    var w = Math.sqrt(size),
	        x = -w / 2;
	    context.rect(x, x, w, w);
	  }
	};
	
	var sqrt3 = Math.sqrt(3);
	
	var triangle = {
	  draw: function(context, size) {
	    var y = -Math.sqrt(size / (sqrt3 * 3));
	    context.moveTo(0, y * 2);
	    context.lineTo(-sqrt3 * y, -y);
	    context.lineTo(sqrt3 * y, -y);
	    context.closePath();
	  }
	};
	
	var c = -0.5;
	var s = Math.sqrt(3) / 2;
	var k = 1 / Math.sqrt(12);
	var a = (k / 2 + 1) * 3;
	
	var wye = {
	  draw: function(context, size) {
	    var r = Math.sqrt(size / a),
	        x0 = r / 2,
	        y0 = r * k,
	        x1 = x0,
	        y1 = r * k + r,
	        x2 = -x1,
	        y2 = y1;
	    context.moveTo(x0, y0);
	    context.lineTo(x1, y1);
	    context.lineTo(x2, y2);
	    context.lineTo(c * x0 - s * y0, s * x0 + c * y0);
	    context.lineTo(c * x1 - s * y1, s * x1 + c * y1);
	    context.lineTo(c * x2 - s * y2, s * x2 + c * y2);
	    context.lineTo(c * x0 + s * y0, c * y0 - s * x0);
	    context.lineTo(c * x1 + s * y1, c * y1 - s * x1);
	    context.lineTo(c * x2 + s * y2, c * y2 - s * x2);
	    context.closePath();
	  }
	};
	
	var symbols = [
	  circle,
	  cross,
	  diamond,
	  square,
	  star,
	  triangle,
	  wye
	];
	
	var symbol = function() {
	  var type = constant(circle),
	      size = constant(64),
	      context = null;
	
	  function symbol() {
	    var buffer;
	    if (!context) context = buffer = d3Path.path();
	    type.apply(this, arguments).draw(context, +size.apply(this, arguments));
	    if (buffer) return context = null, buffer + "" || null;
	  }
	
	  symbol.type = function(_) {
	    return arguments.length ? (type = typeof _ === "function" ? _ : constant(_), symbol) : type;
	  };
	
	  symbol.size = function(_) {
	    return arguments.length ? (size = typeof _ === "function" ? _ : constant(+_), symbol) : size;
	  };
	
	  symbol.context = function(_) {
	    return arguments.length ? (context = _ == null ? null : _, symbol) : context;
	  };
	
	  return symbol;
	};
	
	var noop = function() {};
	
	function point(that, x, y) {
	  that._context.bezierCurveTo(
	    (2 * that._x0 + that._x1) / 3,
	    (2 * that._y0 + that._y1) / 3,
	    (that._x0 + 2 * that._x1) / 3,
	    (that._y0 + 2 * that._y1) / 3,
	    (that._x0 + 4 * that._x1 + x) / 6,
	    (that._y0 + 4 * that._y1 + y) / 6
	  );
	}
	
	function Basis(context) {
	  this._context = context;
	}
	
	Basis.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 =
	    this._y0 = this._y1 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 3: point(this, this._x1, this._y1); // proceed
	      case 2: this._context.lineTo(this._x1, this._y1); break;
	    }
	    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	      case 1: this._point = 2; break;
	      case 2: this._point = 3; this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6); // proceed
	      default: point(this, x, y); break;
	    }
	    this._x0 = this._x1, this._x1 = x;
	    this._y0 = this._y1, this._y1 = y;
	  }
	};
	
	var basis = function(context) {
	  return new Basis(context);
	};
	
	function BasisClosed(context) {
	  this._context = context;
	}
	
	BasisClosed.prototype = {
	  areaStart: noop,
	  areaEnd: noop,
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 =
	    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 1: {
	        this._context.moveTo(this._x2, this._y2);
	        this._context.closePath();
	        break;
	      }
	      case 2: {
	        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
	        this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
	        this._context.closePath();
	        break;
	      }
	      case 3: {
	        this.point(this._x2, this._y2);
	        this.point(this._x3, this._y3);
	        this.point(this._x4, this._y4);
	        break;
	      }
	    }
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; this._x2 = x, this._y2 = y; break;
	      case 1: this._point = 2; this._x3 = x, this._y3 = y; break;
	      case 2: this._point = 3; this._x4 = x, this._y4 = y; this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6); break;
	      default: point(this, x, y); break;
	    }
	    this._x0 = this._x1, this._x1 = x;
	    this._y0 = this._y1, this._y1 = y;
	  }
	};
	
	var basisClosed = function(context) {
	  return new BasisClosed(context);
	};
	
	function BasisOpen(context) {
	  this._context = context;
	}
	
	BasisOpen.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 =
	    this._y0 = this._y1 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; break;
	      case 1: this._point = 2; break;
	      case 2: this._point = 3; var x0 = (this._x0 + 4 * this._x1 + x) / 6, y0 = (this._y0 + 4 * this._y1 + y) / 6; this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0); break;
	      case 3: this._point = 4; // proceed
	      default: point(this, x, y); break;
	    }
	    this._x0 = this._x1, this._x1 = x;
	    this._y0 = this._y1, this._y1 = y;
	  }
	};
	
	var basisOpen = function(context) {
	  return new BasisOpen(context);
	};
	
	function Bundle(context, beta) {
	  this._basis = new Basis(context);
	  this._beta = beta;
	}
	
	Bundle.prototype = {
	  lineStart: function() {
	    this._x = [];
	    this._y = [];
	    this._basis.lineStart();
	  },
	  lineEnd: function() {
	    var x = this._x,
	        y = this._y,
	        j = x.length - 1;
	
	    if (j > 0) {
	      var x0 = x[0],
	          y0 = y[0],
	          dx = x[j] - x0,
	          dy = y[j] - y0,
	          i = -1,
	          t;
	
	      while (++i <= j) {
	        t = i / j;
	        this._basis.point(
	          this._beta * x[i] + (1 - this._beta) * (x0 + t * dx),
	          this._beta * y[i] + (1 - this._beta) * (y0 + t * dy)
	        );
	      }
	    }
	
	    this._x = this._y = null;
	    this._basis.lineEnd();
	  },
	  point: function(x, y) {
	    this._x.push(+x);
	    this._y.push(+y);
	  }
	};
	
	var bundle = ((function custom(beta) {
	
	  function bundle(context) {
	    return beta === 1 ? new Basis(context) : new Bundle(context, beta);
	  }
	
	  bundle.beta = function(beta) {
	    return custom(+beta);
	  };
	
	  return bundle;
	}))(0.85);
	
	function point$1(that, x, y) {
	  that._context.bezierCurveTo(
	    that._x1 + that._k * (that._x2 - that._x0),
	    that._y1 + that._k * (that._y2 - that._y0),
	    that._x2 + that._k * (that._x1 - x),
	    that._y2 + that._k * (that._y1 - y),
	    that._x2,
	    that._y2
	  );
	}
	
	function Cardinal(context, tension) {
	  this._context = context;
	  this._k = (1 - tension) / 6;
	}
	
	Cardinal.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 =
	    this._y0 = this._y1 = this._y2 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 2: this._context.lineTo(this._x2, this._y2); break;
	      case 3: point$1(this, this._x1, this._y1); break;
	    }
	    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	      case 1: this._point = 2; this._x1 = x, this._y1 = y; break;
	      case 2: this._point = 3; // proceed
	      default: point$1(this, x, y); break;
	    }
	    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	  }
	};
	
	var cardinal = ((function custom(tension) {
	
	  function cardinal(context) {
	    return new Cardinal(context, tension);
	  }
	
	  cardinal.tension = function(tension) {
	    return custom(+tension);
	  };
	
	  return cardinal;
	}))(0);
	
	function CardinalClosed(context, tension) {
	  this._context = context;
	  this._k = (1 - tension) / 6;
	}
	
	CardinalClosed.prototype = {
	  areaStart: noop,
	  areaEnd: noop,
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
	    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 1: {
	        this._context.moveTo(this._x3, this._y3);
	        this._context.closePath();
	        break;
	      }
	      case 2: {
	        this._context.lineTo(this._x3, this._y3);
	        this._context.closePath();
	        break;
	      }
	      case 3: {
	        this.point(this._x3, this._y3);
	        this.point(this._x4, this._y4);
	        this.point(this._x5, this._y5);
	        break;
	      }
	    }
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
	      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
	      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
	      default: point$1(this, x, y); break;
	    }
	    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	  }
	};
	
	var cardinalClosed = ((function custom(tension) {
	
	  function cardinal(context) {
	    return new CardinalClosed(context, tension);
	  }
	
	  cardinal.tension = function(tension) {
	    return custom(+tension);
	  };
	
	  return cardinal;
	}))(0);
	
	function CardinalOpen(context, tension) {
	  this._context = context;
	  this._k = (1 - tension) / 6;
	}
	
	CardinalOpen.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 =
	    this._y0 = this._y1 = this._y2 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; break;
	      case 1: this._point = 2; break;
	      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
	      case 3: this._point = 4; // proceed
	      default: point$1(this, x, y); break;
	    }
	    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	  }
	};
	
	var cardinalOpen = ((function custom(tension) {
	
	  function cardinal(context) {
	    return new CardinalOpen(context, tension);
	  }
	
	  cardinal.tension = function(tension) {
	    return custom(+tension);
	  };
	
	  return cardinal;
	}))(0);
	
	function point$2(that, x, y) {
	  var x1 = that._x1,
	      y1 = that._y1,
	      x2 = that._x2,
	      y2 = that._y2;
	
	  if (that._l01_a > epsilon) {
	    var a = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a,
	        n = 3 * that._l01_a * (that._l01_a + that._l12_a);
	    x1 = (x1 * a - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
	    y1 = (y1 * a - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
	  }
	
	  if (that._l23_a > epsilon) {
	    var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a,
	        m = 3 * that._l23_a * (that._l23_a + that._l12_a);
	    x2 = (x2 * b + that._x1 * that._l23_2a - x * that._l12_2a) / m;
	    y2 = (y2 * b + that._y1 * that._l23_2a - y * that._l12_2a) / m;
	  }
	
	  that._context.bezierCurveTo(x1, y1, x2, y2, that._x2, that._y2);
	}
	
	function CatmullRom(context, alpha) {
	  this._context = context;
	  this._alpha = alpha;
	}
	
	CatmullRom.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 =
	    this._y0 = this._y1 = this._y2 = NaN;
	    this._l01_a = this._l12_a = this._l23_a =
	    this._l01_2a = this._l12_2a = this._l23_2a =
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 2: this._context.lineTo(this._x2, this._y2); break;
	      case 3: this.point(this._x2, this._y2); break;
	    }
	    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	
	    if (this._point) {
	      var x23 = this._x2 - x,
	          y23 = this._y2 - y;
	      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
	    }
	
	    switch (this._point) {
	      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	      case 1: this._point = 2; break;
	      case 2: this._point = 3; // proceed
	      default: point$2(this, x, y); break;
	    }
	
	    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
	    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
	    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	  }
	};
	
	var catmullRom = ((function custom(alpha) {
	
	  function catmullRom(context) {
	    return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
	  }
	
	  catmullRom.alpha = function(alpha) {
	    return custom(+alpha);
	  };
	
	  return catmullRom;
	}))(0.5);
	
	function CatmullRomClosed(context, alpha) {
	  this._context = context;
	  this._alpha = alpha;
	}
	
	CatmullRomClosed.prototype = {
	  areaStart: noop,
	  areaEnd: noop,
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
	    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
	    this._l01_a = this._l12_a = this._l23_a =
	    this._l01_2a = this._l12_2a = this._l23_2a =
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 1: {
	        this._context.moveTo(this._x3, this._y3);
	        this._context.closePath();
	        break;
	      }
	      case 2: {
	        this._context.lineTo(this._x3, this._y3);
	        this._context.closePath();
	        break;
	      }
	      case 3: {
	        this.point(this._x3, this._y3);
	        this.point(this._x4, this._y4);
	        this.point(this._x5, this._y5);
	        break;
	      }
	    }
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	
	    if (this._point) {
	      var x23 = this._x2 - x,
	          y23 = this._y2 - y;
	      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
	    }
	
	    switch (this._point) {
	      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
	      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
	      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
	      default: point$2(this, x, y); break;
	    }
	
	    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
	    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
	    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	  }
	};
	
	var catmullRomClosed = ((function custom(alpha) {
	
	  function catmullRom(context) {
	    return alpha ? new CatmullRomClosed(context, alpha) : new CardinalClosed(context, 0);
	  }
	
	  catmullRom.alpha = function(alpha) {
	    return custom(+alpha);
	  };
	
	  return catmullRom;
	}))(0.5);
	
	function CatmullRomOpen(context, alpha) {
	  this._context = context;
	  this._alpha = alpha;
	}
	
	CatmullRomOpen.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 =
	    this._y0 = this._y1 = this._y2 = NaN;
	    this._l01_a = this._l12_a = this._l23_a =
	    this._l01_2a = this._l12_2a = this._l23_2a =
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	
	    if (this._point) {
	      var x23 = this._x2 - x,
	          y23 = this._y2 - y;
	      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
	    }
	
	    switch (this._point) {
	      case 0: this._point = 1; break;
	      case 1: this._point = 2; break;
	      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
	      case 3: this._point = 4; // proceed
	      default: point$2(this, x, y); break;
	    }
	
	    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
	    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
	    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	  }
	};
	
	var catmullRomOpen = ((function custom(alpha) {
	
	  function catmullRom(context) {
	    return alpha ? new CatmullRomOpen(context, alpha) : new CardinalOpen(context, 0);
	  }
	
	  catmullRom.alpha = function(alpha) {
	    return custom(+alpha);
	  };
	
	  return catmullRom;
	}))(0.5);
	
	function LinearClosed(context) {
	  this._context = context;
	}
	
	LinearClosed.prototype = {
	  areaStart: noop,
	  areaEnd: noop,
	  lineStart: function() {
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (this._point) this._context.closePath();
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    if (this._point) this._context.lineTo(x, y);
	    else this._point = 1, this._context.moveTo(x, y);
	  }
	};
	
	var linearClosed = function(context) {
	  return new LinearClosed(context);
	};
	
	function sign(x) {
	  return x < 0 ? -1 : 1;
	}
	
	// Calculate the slopes of the tangents (Hermite-type interpolation) based on
	// the following paper: Steffen, M. 1990. A Simple Method for Monotonic
	// Interpolation in One Dimension. Astronomy and Astrophysics, Vol. 239, NO.
	// NOV(II), P. 443, 1990.
	function slope3(that, x2, y2) {
	  var h0 = that._x1 - that._x0,
	      h1 = x2 - that._x1,
	      s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0),
	      s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0),
	      p = (s0 * h1 + s1 * h0) / (h0 + h1);
	  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
	}
	
	// Calculate a one-sided slope.
	function slope2(that, t) {
	  var h = that._x1 - that._x0;
	  return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
	}
	
	// According to https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Representations
	// "you can express cubic Hermite interpolation in terms of cubic Bézier curves
	// with respect to the four values p0, p0 + m0 / 3, p1 - m1 / 3, p1".
	function point$3(that, t0, t1) {
	  var x0 = that._x0,
	      y0 = that._y0,
	      x1 = that._x1,
	      y1 = that._y1,
	      dx = (x1 - x0) / 3;
	  that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
	}
	
	function MonotoneX(context) {
	  this._context = context;
	}
	
	MonotoneX.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 =
	    this._y0 = this._y1 =
	    this._t0 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 2: this._context.lineTo(this._x1, this._y1); break;
	      case 3: point$3(this, this._t0, slope2(this, this._t0)); break;
	    }
	    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    var t1 = NaN;
	
	    x = +x, y = +y;
	    if (x === this._x1 && y === this._y1) return; // Ignore coincident points.
	    switch (this._point) {
	      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	      case 1: this._point = 2; break;
	      case 2: this._point = 3; point$3(this, slope2(this, t1 = slope3(this, x, y)), t1); break;
	      default: point$3(this, this._t0, t1 = slope3(this, x, y)); break;
	    }
	
	    this._x0 = this._x1, this._x1 = x;
	    this._y0 = this._y1, this._y1 = y;
	    this._t0 = t1;
	  }
	};
	
	function MonotoneY(context) {
	  this._context = new ReflectContext(context);
	}
	
	(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x, y) {
	  MonotoneX.prototype.point.call(this, y, x);
	};
	
	function ReflectContext(context) {
	  this._context = context;
	}
	
	ReflectContext.prototype = {
	  moveTo: function(x, y) { this._context.moveTo(y, x); },
	  closePath: function() { this._context.closePath(); },
	  lineTo: function(x, y) { this._context.lineTo(y, x); },
	  bezierCurveTo: function(x1, y1, x2, y2, x, y) { this._context.bezierCurveTo(y1, x1, y2, x2, y, x); }
	};
	
	function monotoneX(context) {
	  return new MonotoneX(context);
	}
	
	function monotoneY(context) {
	  return new MonotoneY(context);
	}
	
	function Natural(context) {
	  this._context = context;
	}
	
	Natural.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x = [];
	    this._y = [];
	  },
	  lineEnd: function() {
	    var x = this._x,
	        y = this._y,
	        n = x.length;
	
	    if (n) {
	      this._line ? this._context.lineTo(x[0], y[0]) : this._context.moveTo(x[0], y[0]);
	      if (n === 2) {
	        this._context.lineTo(x[1], y[1]);
	      } else {
	        var px = controlPoints(x),
	            py = controlPoints(y);
	        for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) {
	          this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x[i1], y[i1]);
	        }
	      }
	    }
	
	    if (this._line || (this._line !== 0 && n === 1)) this._context.closePath();
	    this._line = 1 - this._line;
	    this._x = this._y = null;
	  },
	  point: function(x, y) {
	    this._x.push(+x);
	    this._y.push(+y);
	  }
	};
	
	// See https://www.particleincell.com/2012/bezier-splines/ for derivation.
	function controlPoints(x) {
	  var i,
	      n = x.length - 1,
	      m,
	      a = new Array(n),
	      b = new Array(n),
	      r = new Array(n);
	  a[0] = 0, b[0] = 2, r[0] = x[0] + 2 * x[1];
	  for (i = 1; i < n - 1; ++i) a[i] = 1, b[i] = 4, r[i] = 4 * x[i] + 2 * x[i + 1];
	  a[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x[n - 1] + x[n];
	  for (i = 1; i < n; ++i) m = a[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];
	  a[n - 1] = r[n - 1] / b[n - 1];
	  for (i = n - 2; i >= 0; --i) a[i] = (r[i] - a[i + 1]) / b[i];
	  b[n - 1] = (x[n] + a[n - 1]) / 2;
	  for (i = 0; i < n - 1; ++i) b[i] = 2 * x[i + 1] - a[i + 1];
	  return [a, b];
	}
	
	var natural = function(context) {
	  return new Natural(context);
	};
	
	function Step(context, t) {
	  this._context = context;
	  this._t = t;
	}
	
	Step.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x = this._y = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);
	    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	    if (this._line >= 0) this._t = 1 - this._t, this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	      case 1: this._point = 2; // proceed
	      default: {
	        if (this._t <= 0) {
	          this._context.lineTo(this._x, y);
	          this._context.lineTo(x, y);
	        } else {
	          var x1 = this._x * (1 - this._t) + x * this._t;
	          this._context.lineTo(x1, this._y);
	          this._context.lineTo(x1, y);
	        }
	        break;
	      }
	    }
	    this._x = x, this._y = y;
	  }
	};
	
	var step = function(context) {
	  return new Step(context, 0.5);
	};
	
	function stepBefore(context) {
	  return new Step(context, 0);
	}
	
	function stepAfter(context) {
	  return new Step(context, 1);
	}
	
	var none = function(series, order) {
	  if (!((n = series.length) > 1)) return;
	  for (var i = 1, j, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
	    s0 = s1, s1 = series[order[i]];
	    for (j = 0; j < m; ++j) {
	      s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
	    }
	  }
	};
	
	var none$1 = function(series) {
	  var n = series.length, o = new Array(n);
	  while (--n >= 0) o[n] = n;
	  return o;
	};
	
	function stackValue(d, key) {
	  return d[key];
	}
	
	var stack = function() {
	  var keys = constant([]),
	      order = none$1,
	      offset = none,
	      value = stackValue;
	
	  function stack(data) {
	    var kz = keys.apply(this, arguments),
	        i,
	        m = data.length,
	        n = kz.length,
	        sz = new Array(n),
	        oz;
	
	    for (i = 0; i < n; ++i) {
	      for (var ki = kz[i], si = sz[i] = new Array(m), j = 0, sij; j < m; ++j) {
	        si[j] = sij = [0, +value(data[j], ki, j, data)];
	        sij.data = data[j];
	      }
	      si.key = ki;
	    }
	
	    for (i = 0, oz = order(sz); i < n; ++i) {
	      sz[oz[i]].index = i;
	    }
	
	    offset(sz, oz);
	    return sz;
	  }
	
	  stack.keys = function(_) {
	    return arguments.length ? (keys = typeof _ === "function" ? _ : constant(slice.call(_)), stack) : keys;
	  };
	
	  stack.value = function(_) {
	    return arguments.length ? (value = typeof _ === "function" ? _ : constant(+_), stack) : value;
	  };
	
	  stack.order = function(_) {
	    return arguments.length ? (order = _ == null ? none$1 : typeof _ === "function" ? _ : constant(slice.call(_)), stack) : order;
	  };
	
	  stack.offset = function(_) {
	    return arguments.length ? (offset = _ == null ? none : _, stack) : offset;
	  };
	
	  return stack;
	};
	
	var expand = function(series, order) {
	  if (!((n = series.length) > 0)) return;
	  for (var i, n, j = 0, m = series[0].length, y; j < m; ++j) {
	    for (y = i = 0; i < n; ++i) y += series[i][j][1] || 0;
	    if (y) for (i = 0; i < n; ++i) series[i][j][1] /= y;
	  }
	  none(series, order);
	};
	
	var diverging = function(series, order) {
	  if (!((n = series.length) > 1)) return;
	  for (var i, j = 0, d, dy, yp, yn, n, m = series[order[0]].length; j < m; ++j) {
	    for (yp = yn = 0, i = 0; i < n; ++i) {
	      if ((dy = (d = series[order[i]][j])[1] - d[0]) >= 0) {
	        d[0] = yp, d[1] = yp += dy;
	      } else if (dy < 0) {
	        d[1] = yn, d[0] = yn += dy;
	      } else {
	        d[0] = yp;
	      }
	    }
	  }
	};
	
	var silhouette = function(series, order) {
	  if (!((n = series.length) > 0)) return;
	  for (var j = 0, s0 = series[order[0]], n, m = s0.length; j < m; ++j) {
	    for (var i = 0, y = 0; i < n; ++i) y += series[i][j][1] || 0;
	    s0[j][1] += s0[j][0] = -y / 2;
	  }
	  none(series, order);
	};
	
	var wiggle = function(series, order) {
	  if (!((n = series.length) > 0) || !((m = (s0 = series[order[0]]).length) > 0)) return;
	  for (var y = 0, j = 1, s0, m, n; j < m; ++j) {
	    for (var i = 0, s1 = 0, s2 = 0; i < n; ++i) {
	      var si = series[order[i]],
	          sij0 = si[j][1] || 0,
	          sij1 = si[j - 1][1] || 0,
	          s3 = (sij0 - sij1) / 2;
	      for (var k = 0; k < i; ++k) {
	        var sk = series[order[k]],
	            skj0 = sk[j][1] || 0,
	            skj1 = sk[j - 1][1] || 0;
	        s3 += skj0 - skj1;
	      }
	      s1 += sij0, s2 += s3 * sij0;
	    }
	    s0[j - 1][1] += s0[j - 1][0] = y;
	    if (s1) y -= s2 / s1;
	  }
	  s0[j - 1][1] += s0[j - 1][0] = y;
	  none(series, order);
	};
	
	var ascending = function(series) {
	  var sums = series.map(sum);
	  return none$1(series).sort(function(a, b) { return sums[a] - sums[b]; });
	};
	
	function sum(series) {
	  var s = 0, i = -1, n = series.length, v;
	  while (++i < n) if (v = +series[i][1]) s += v;
	  return s;
	}
	
	var descending$1 = function(series) {
	  return ascending(series).reverse();
	};
	
	var insideOut = function(series) {
	  var n = series.length,
	      i,
	      j,
	      sums = series.map(sum),
	      order = none$1(series).sort(function(a, b) { return sums[b] - sums[a]; }),
	      top = 0,
	      bottom = 0,
	      tops = [],
	      bottoms = [];
	
	  for (i = 0; i < n; ++i) {
	    j = order[i];
	    if (top < bottom) {
	      top += sums[j];
	      tops.push(j);
	    } else {
	      bottom += sums[j];
	      bottoms.push(j);
	    }
	  }
	
	  return bottoms.reverse().concat(tops);
	};
	
	var reverse = function(series) {
	  return none$1(series).reverse();
	};
	
	exports.arc = arc;
	exports.area = area;
	exports.line = line;
	exports.pie = pie;
	exports.radialArea = radialArea;
	exports.radialLine = radialLine$1;
	exports.linkHorizontal = linkHorizontal;
	exports.linkVertical = linkVertical;
	exports.linkRadial = linkRadial;
	exports.symbol = symbol;
	exports.symbols = symbols;
	exports.symbolCircle = circle;
	exports.symbolCross = cross;
	exports.symbolDiamond = diamond;
	exports.symbolSquare = square;
	exports.symbolStar = star;
	exports.symbolTriangle = triangle;
	exports.symbolWye = wye;
	exports.curveBasisClosed = basisClosed;
	exports.curveBasisOpen = basisOpen;
	exports.curveBasis = basis;
	exports.curveBundle = bundle;
	exports.curveCardinalClosed = cardinalClosed;
	exports.curveCardinalOpen = cardinalOpen;
	exports.curveCardinal = cardinal;
	exports.curveCatmullRomClosed = catmullRomClosed;
	exports.curveCatmullRomOpen = catmullRomOpen;
	exports.curveCatmullRom = catmullRom;
	exports.curveLinearClosed = linearClosed;
	exports.curveLinear = curveLinear;
	exports.curveMonotoneX = monotoneX;
	exports.curveMonotoneY = monotoneY;
	exports.curveNatural = natural;
	exports.curveStep = step;
	exports.curveStepAfter = stepAfter;
	exports.curveStepBefore = stepBefore;
	exports.stack = stack;
	exports.stackOffsetExpand = expand;
	exports.stackOffsetDiverging = diverging;
	exports.stackOffsetNone = none;
	exports.stackOffsetSilhouette = silhouette;
	exports.stackOffsetWiggle = wiggle;
	exports.stackOrderAscending = ascending;
	exports.stackOrderDescending = descending$1;
	exports.stackOrderInsideOut = insideOut;
	exports.stackOrderNone = none$1;
	exports.stackOrderReverse = reverse;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-path/ Version 1.0.5. Copyright 2017 Mike Bostock.
	(function (global, factory) {
		 true ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';
	
	var pi = Math.PI;
	var tau = 2 * pi;
	var epsilon = 1e-6;
	var tauEpsilon = tau - epsilon;
	
	function Path() {
	  this._x0 = this._y0 = // start of current subpath
	  this._x1 = this._y1 = null; // end of current subpath
	  this._ = "";
	}
	
	function path() {
	  return new Path;
	}
	
	Path.prototype = path.prototype = {
	  constructor: Path,
	  moveTo: function(x, y) {
	    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
	  },
	  closePath: function() {
	    if (this._x1 !== null) {
	      this._x1 = this._x0, this._y1 = this._y0;
	      this._ += "Z";
	    }
	  },
	  lineTo: function(x, y) {
	    this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
	  },
	  quadraticCurveTo: function(x1, y1, x, y) {
	    this._ += "Q" + (+x1) + "," + (+y1) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
	  },
	  bezierCurveTo: function(x1, y1, x2, y2, x, y) {
	    this._ += "C" + (+x1) + "," + (+y1) + "," + (+x2) + "," + (+y2) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
	  },
	  arcTo: function(x1, y1, x2, y2, r) {
	    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
	    var x0 = this._x1,
	        y0 = this._y1,
	        x21 = x2 - x1,
	        y21 = y2 - y1,
	        x01 = x0 - x1,
	        y01 = y0 - y1,
	        l01_2 = x01 * x01 + y01 * y01;
	
	    // Is the radius negative? Error.
	    if (r < 0) throw new Error("negative radius: " + r);
	
	    // Is this path empty? Move to (x1,y1).
	    if (this._x1 === null) {
	      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
	    }
	
	    // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
	    else if (!(l01_2 > epsilon)) {}
	
	    // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
	    // Equivalently, is (x1,y1) coincident with (x2,y2)?
	    // Or, is the radius zero? Line to (x1,y1).
	    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
	      this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
	    }
	
	    // Otherwise, draw an arc!
	    else {
	      var x20 = x2 - x0,
	          y20 = y2 - y0,
	          l21_2 = x21 * x21 + y21 * y21,
	          l20_2 = x20 * x20 + y20 * y20,
	          l21 = Math.sqrt(l21_2),
	          l01 = Math.sqrt(l01_2),
	          l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
	          t01 = l / l01,
	          t21 = l / l21;
	
	      // If the start tangent is not coincident with (x0,y0), line to.
	      if (Math.abs(t01 - 1) > epsilon) {
	        this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
	      }
	
	      this._ += "A" + r + "," + r + ",0,0," + (+(y01 * x20 > x01 * y20)) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
	    }
	  },
	  arc: function(x, y, r, a0, a1, ccw) {
	    x = +x, y = +y, r = +r;
	    var dx = r * Math.cos(a0),
	        dy = r * Math.sin(a0),
	        x0 = x + dx,
	        y0 = y + dy,
	        cw = 1 ^ ccw,
	        da = ccw ? a0 - a1 : a1 - a0;
	
	    // Is the radius negative? Error.
	    if (r < 0) throw new Error("negative radius: " + r);
	
	    // Is this path empty? Move to (x0,y0).
	    if (this._x1 === null) {
	      this._ += "M" + x0 + "," + y0;
	    }
	
	    // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
	    else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
	      this._ += "L" + x0 + "," + y0;
	    }
	
	    // Is this arc empty? We’re done.
	    if (!r) return;
	
	    // Does the angle go the wrong way? Flip the direction.
	    if (da < 0) da = da % tau + tau;
	
	    // Is this a complete circle? Draw two arcs to complete the circle.
	    if (da > tauEpsilon) {
	      this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
	    }
	
	    // Is this arc non-empty? Draw an arc!
	    else if (da > epsilon) {
	      this._ += "A" + r + "," + r + ",0," + (+(da >= pi)) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
	    }
	  },
	  rect: function(x, y, w, h) {
	    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + (+w) + "v" + (+h) + "h" + (-w) + "Z";
	  },
	  toString: function() {
	    return this._;
	  }
	};
	
	exports.path = path;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-transition/ Version 1.1.0. Copyright 2017 Mike Bostock.
	(function (global, factory) {
		 true ? factory(exports, __webpack_require__(4), __webpack_require__(12), __webpack_require__(23), __webpack_require__(15), __webpack_require__(16), __webpack_require__(13)) :
		typeof define === 'function' && define.amd ? define(['exports', 'd3-selection', 'd3-dispatch', 'd3-timer', 'd3-interpolate', 'd3-color', 'd3-ease'], factory) :
		(factory((global.d3 = global.d3 || {}),global.d3,global.d3,global.d3,global.d3,global.d3,global.d3));
	}(this, (function (exports,d3Selection,d3Dispatch,d3Timer,d3Interpolate,d3Color,d3Ease) { 'use strict';
	
	var emptyOn = d3Dispatch.dispatch("start", "end", "interrupt");
	var emptyTween = [];
	
	var CREATED = 0;
	var SCHEDULED = 1;
	var STARTING = 2;
	var STARTED = 3;
	var RUNNING = 4;
	var ENDING = 5;
	var ENDED = 6;
	
	var schedule = function(node, name, id, index, group, timing) {
	  var schedules = node.__transition;
	  if (!schedules) node.__transition = {};
	  else if (id in schedules) return;
	  create(node, id, {
	    name: name,
	    index: index, // For context during callback.
	    group: group, // For context during callback.
	    on: emptyOn,
	    tween: emptyTween,
	    time: timing.time,
	    delay: timing.delay,
	    duration: timing.duration,
	    ease: timing.ease,
	    timer: null,
	    state: CREATED
	  });
	};
	
	function init(node, id) {
	  var schedule = node.__transition;
	  if (!schedule || !(schedule = schedule[id]) || schedule.state > CREATED) throw new Error("too late");
	  return schedule;
	}
	
	function set(node, id) {
	  var schedule = node.__transition;
	  if (!schedule || !(schedule = schedule[id]) || schedule.state > STARTING) throw new Error("too late");
	  return schedule;
	}
	
	function get(node, id) {
	  var schedule = node.__transition;
	  if (!schedule || !(schedule = schedule[id])) throw new Error("too late");
	  return schedule;
	}
	
	function create(node, id, self) {
	  var schedules = node.__transition,
	      tween;
	
	  // Initialize the self timer when the transition is created.
	  // Note the actual delay is not known until the first callback!
	  schedules[id] = self;
	  self.timer = d3Timer.timer(schedule, 0, self.time);
	
	  function schedule(elapsed) {
	    self.state = SCHEDULED;
	    self.timer.restart(start, self.delay, self.time);
	
	    // If the elapsed delay is less than our first sleep, start immediately.
	    if (self.delay <= elapsed) start(elapsed - self.delay);
	  }
	
	  function start(elapsed) {
	    var i, j, n, o;
	
	    // If the state is not SCHEDULED, then we previously errored on start.
	    if (self.state !== SCHEDULED) return stop();
	
	    for (i in schedules) {
	      o = schedules[i];
	      if (o.name !== self.name) continue;
	
	      // While this element already has a starting transition during this frame,
	      // defer starting an interrupting transition until that transition has a
	      // chance to tick (and possibly end); see d3/d3-transition#54!
	      if (o.state === STARTED) return d3Timer.timeout(start);
	
	      // Interrupt the active transition, if any.
	      // Dispatch the interrupt event.
	      if (o.state === RUNNING) {
	        o.state = ENDED;
	        o.timer.stop();
	        o.on.call("interrupt", node, node.__data__, o.index, o.group);
	        delete schedules[i];
	      }
	
	      // Cancel any pre-empted transitions. No interrupt event is dispatched
	      // because the cancelled transitions never started. Note that this also
	      // removes this transition from the pending list!
	      else if (+i < id) {
	        o.state = ENDED;
	        o.timer.stop();
	        delete schedules[i];
	      }
	    }
	
	    // Defer the first tick to end of the current frame; see d3/d3#1576.
	    // Note the transition may be canceled after start and before the first tick!
	    // Note this must be scheduled before the start event; see d3/d3-transition#16!
	    // Assuming this is successful, subsequent callbacks go straight to tick.
	    d3Timer.timeout(function() {
	      if (self.state === STARTED) {
	        self.state = RUNNING;
	        self.timer.restart(tick, self.delay, self.time);
	        tick(elapsed);
	      }
	    });
	
	    // Dispatch the start event.
	    // Note this must be done before the tween are initialized.
	    self.state = STARTING;
	    self.on.call("start", node, node.__data__, self.index, self.group);
	    if (self.state !== STARTING) return; // interrupted
	    self.state = STARTED;
	
	    // Initialize the tween, deleting null tween.
	    tween = new Array(n = self.tween.length);
	    for (i = 0, j = -1; i < n; ++i) {
	      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
	        tween[++j] = o;
	      }
	    }
	    tween.length = j + 1;
	  }
	
	  function tick(elapsed) {
	    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
	        i = -1,
	        n = tween.length;
	
	    while (++i < n) {
	      tween[i].call(null, t);
	    }
	
	    // Dispatch the end event.
	    if (self.state === ENDING) {
	      self.on.call("end", node, node.__data__, self.index, self.group);
	      stop();
	    }
	  }
	
	  function stop() {
	    self.state = ENDED;
	    self.timer.stop();
	    delete schedules[id];
	    for (var i in schedules) return; // eslint-disable-line no-unused-vars
	    delete node.__transition;
	  }
	}
	
	var interrupt = function(node, name) {
	  var schedules = node.__transition,
	      schedule,
	      active,
	      empty = true,
	      i;
	
	  if (!schedules) return;
	
	  name = name == null ? null : name + "";
	
	  for (i in schedules) {
	    if ((schedule = schedules[i]).name !== name) { empty = false; continue; }
	    active = schedule.state > STARTING && schedule.state < ENDING;
	    schedule.state = ENDED;
	    schedule.timer.stop();
	    if (active) schedule.on.call("interrupt", node, node.__data__, schedule.index, schedule.group);
	    delete schedules[i];
	  }
	
	  if (empty) delete node.__transition;
	};
	
	var selection_interrupt = function(name) {
	  return this.each(function() {
	    interrupt(this, name);
	  });
	};
	
	function tweenRemove(id, name) {
	  var tween0, tween1;
	  return function() {
	    var schedule = set(this, id),
	        tween = schedule.tween;
	
	    // If this node shared tween with the previous node,
	    // just assign the updated shared tween and we’re done!
	    // Otherwise, copy-on-write.
	    if (tween !== tween0) {
	      tween1 = tween0 = tween;
	      for (var i = 0, n = tween1.length; i < n; ++i) {
	        if (tween1[i].name === name) {
	          tween1 = tween1.slice();
	          tween1.splice(i, 1);
	          break;
	        }
	      }
	    }
	
	    schedule.tween = tween1;
	  };
	}
	
	function tweenFunction(id, name, value) {
	  var tween0, tween1;
	  if (typeof value !== "function") throw new Error;
	  return function() {
	    var schedule = set(this, id),
	        tween = schedule.tween;
	
	    // If this node shared tween with the previous node,
	    // just assign the updated shared tween and we’re done!
	    // Otherwise, copy-on-write.
	    if (tween !== tween0) {
	      tween1 = (tween0 = tween).slice();
	      for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {
	        if (tween1[i].name === name) {
	          tween1[i] = t;
	          break;
	        }
	      }
	      if (i === n) tween1.push(t);
	    }
	
	    schedule.tween = tween1;
	  };
	}
	
	var transition_tween = function(name, value) {
	  var id = this._id;
	
	  name += "";
	
	  if (arguments.length < 2) {
	    var tween = get(this.node(), id).tween;
	    for (var i = 0, n = tween.length, t; i < n; ++i) {
	      if ((t = tween[i]).name === name) {
	        return t.value;
	      }
	    }
	    return null;
	  }
	
	  return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
	};
	
	function tweenValue(transition, name, value) {
	  var id = transition._id;
	
	  transition.each(function() {
	    var schedule = set(this, id);
	    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
	  });
	
	  return function(node) {
	    return get(node, id).value[name];
	  };
	}
	
	var interpolate = function(a, b) {
	  var c;
	  return (typeof b === "number" ? d3Interpolate.interpolateNumber
	      : b instanceof d3Color.color ? d3Interpolate.interpolateRgb
	      : (c = d3Color.color(b)) ? (b = c, d3Interpolate.interpolateRgb)
	      : d3Interpolate.interpolateString)(a, b);
	};
	
	function attrRemove(name) {
	  return function() {
	    this.removeAttribute(name);
	  };
	}
	
	function attrRemoveNS(fullname) {
	  return function() {
	    this.removeAttributeNS(fullname.space, fullname.local);
	  };
	}
	
	function attrConstant(name, interpolate$$1, value1) {
	  var value00,
	      interpolate0;
	  return function() {
	    var value0 = this.getAttribute(name);
	    return value0 === value1 ? null
	        : value0 === value00 ? interpolate0
	        : interpolate0 = interpolate$$1(value00 = value0, value1);
	  };
	}
	
	function attrConstantNS(fullname, interpolate$$1, value1) {
	  var value00,
	      interpolate0;
	  return function() {
	    var value0 = this.getAttributeNS(fullname.space, fullname.local);
	    return value0 === value1 ? null
	        : value0 === value00 ? interpolate0
	        : interpolate0 = interpolate$$1(value00 = value0, value1);
	  };
	}
	
	function attrFunction(name, interpolate$$1, value) {
	  var value00,
	      value10,
	      interpolate0;
	  return function() {
	    var value0, value1 = value(this);
	    if (value1 == null) return void this.removeAttribute(name);
	    value0 = this.getAttribute(name);
	    return value0 === value1 ? null
	        : value0 === value00 && value1 === value10 ? interpolate0
	        : interpolate0 = interpolate$$1(value00 = value0, value10 = value1);
	  };
	}
	
	function attrFunctionNS(fullname, interpolate$$1, value) {
	  var value00,
	      value10,
	      interpolate0;
	  return function() {
	    var value0, value1 = value(this);
	    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
	    value0 = this.getAttributeNS(fullname.space, fullname.local);
	    return value0 === value1 ? null
	        : value0 === value00 && value1 === value10 ? interpolate0
	        : interpolate0 = interpolate$$1(value00 = value0, value10 = value1);
	  };
	}
	
	var transition_attr = function(name, value) {
	  var fullname = d3Selection.namespace(name), i = fullname === "transform" ? d3Interpolate.interpolateTransformSvg : interpolate;
	  return this.attrTween(name, typeof value === "function"
	      ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value))
	      : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname)
	      : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value + ""));
	};
	
	function attrTweenNS(fullname, value) {
	  function tween() {
	    var node = this, i = value.apply(node, arguments);
	    return i && function(t) {
	      node.setAttributeNS(fullname.space, fullname.local, i(t));
	    };
	  }
	  tween._value = value;
	  return tween;
	}
	
	function attrTween(name, value) {
	  function tween() {
	    var node = this, i = value.apply(node, arguments);
	    return i && function(t) {
	      node.setAttribute(name, i(t));
	    };
	  }
	  tween._value = value;
	  return tween;
	}
	
	var transition_attrTween = function(name, value) {
	  var key = "attr." + name;
	  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
	  if (value == null) return this.tween(key, null);
	  if (typeof value !== "function") throw new Error;
	  var fullname = d3Selection.namespace(name);
	  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
	};
	
	function delayFunction(id, value) {
	  return function() {
	    init(this, id).delay = +value.apply(this, arguments);
	  };
	}
	
	function delayConstant(id, value) {
	  return value = +value, function() {
	    init(this, id).delay = value;
	  };
	}
	
	var transition_delay = function(value) {
	  var id = this._id;
	
	  return arguments.length
	      ? this.each((typeof value === "function"
	          ? delayFunction
	          : delayConstant)(id, value))
	      : get(this.node(), id).delay;
	};
	
	function durationFunction(id, value) {
	  return function() {
	    set(this, id).duration = +value.apply(this, arguments);
	  };
	}
	
	function durationConstant(id, value) {
	  return value = +value, function() {
	    set(this, id).duration = value;
	  };
	}
	
	var transition_duration = function(value) {
	  var id = this._id;
	
	  return arguments.length
	      ? this.each((typeof value === "function"
	          ? durationFunction
	          : durationConstant)(id, value))
	      : get(this.node(), id).duration;
	};
	
	function easeConstant(id, value) {
	  if (typeof value !== "function") throw new Error;
	  return function() {
	    set(this, id).ease = value;
	  };
	}
	
	var transition_ease = function(value) {
	  var id = this._id;
	
	  return arguments.length
	      ? this.each(easeConstant(id, value))
	      : get(this.node(), id).ease;
	};
	
	var transition_filter = function(match) {
	  if (typeof match !== "function") match = d3Selection.matcher(match);
	
	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
	      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
	        subgroup.push(node);
	      }
	    }
	  }
	
	  return new Transition(subgroups, this._parents, this._name, this._id);
	};
	
	var transition_merge = function(transition) {
	  if (transition._id !== this._id) throw new Error;
	
	  for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
	    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
	      if (node = group0[i] || group1[i]) {
	        merge[i] = node;
	      }
	    }
	  }
	
	  for (; j < m0; ++j) {
	    merges[j] = groups0[j];
	  }
	
	  return new Transition(merges, this._parents, this._name, this._id);
	};
	
	function start(name) {
	  return (name + "").trim().split(/^|\s+/).every(function(t) {
	    var i = t.indexOf(".");
	    if (i >= 0) t = t.slice(0, i);
	    return !t || t === "start";
	  });
	}
	
	function onFunction(id, name, listener) {
	  var on0, on1, sit = start(name) ? init : set;
	  return function() {
	    var schedule = sit(this, id),
	        on = schedule.on;
	
	    // If this node shared a dispatch with the previous node,
	    // just assign the updated shared dispatch and we’re done!
	    // Otherwise, copy-on-write.
	    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);
	
	    schedule.on = on1;
	  };
	}
	
	var transition_on = function(name, listener) {
	  var id = this._id;
	
	  return arguments.length < 2
	      ? get(this.node(), id).on.on(name)
	      : this.each(onFunction(id, name, listener));
	};
	
	function removeFunction(id) {
	  return function() {
	    var parent = this.parentNode;
	    for (var i in this.__transition) if (+i !== id) return;
	    if (parent) parent.removeChild(this);
	  };
	}
	
	var transition_remove = function() {
	  return this.on("end.remove", removeFunction(this._id));
	};
	
	var transition_select = function(select) {
	  var name = this._name,
	      id = this._id;
	
	  if (typeof select !== "function") select = d3Selection.selector(select);
	
	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
	      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
	        if ("__data__" in node) subnode.__data__ = node.__data__;
	        subgroup[i] = subnode;
	        schedule(subgroup[i], name, id, i, subgroup, get(node, id));
	      }
	    }
	  }
	
	  return new Transition(subgroups, this._parents, name, id);
	};
	
	var transition_selectAll = function(select) {
	  var name = this._name,
	      id = this._id;
	
	  if (typeof select !== "function") select = d3Selection.selectorAll(select);
	
	  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        for (var children = select.call(node, node.__data__, i, group), child, inherit = get(node, id), k = 0, l = children.length; k < l; ++k) {
	          if (child = children[k]) {
	            schedule(child, name, id, k, children, inherit);
	          }
	        }
	        subgroups.push(children);
	        parents.push(node);
	      }
	    }
	  }
	
	  return new Transition(subgroups, parents, name, id);
	};
	
	var Selection = d3Selection.selection.prototype.constructor;
	
	var transition_selection = function() {
	  return new Selection(this._groups, this._parents);
	};
	
	function styleRemove(name, interpolate$$1) {
	  var value00,
	      value10,
	      interpolate0;
	  return function() {
	    var value0 = d3Selection.style(this, name),
	        value1 = (this.style.removeProperty(name), d3Selection.style(this, name));
	    return value0 === value1 ? null
	        : value0 === value00 && value1 === value10 ? interpolate0
	        : interpolate0 = interpolate$$1(value00 = value0, value10 = value1);
	  };
	}
	
	function styleRemoveEnd(name) {
	  return function() {
	    this.style.removeProperty(name);
	  };
	}
	
	function styleConstant(name, interpolate$$1, value1) {
	  var value00,
	      interpolate0;
	  return function() {
	    var value0 = d3Selection.style(this, name);
	    return value0 === value1 ? null
	        : value0 === value00 ? interpolate0
	        : interpolate0 = interpolate$$1(value00 = value0, value1);
	  };
	}
	
	function styleFunction(name, interpolate$$1, value) {
	  var value00,
	      value10,
	      interpolate0;
	  return function() {
	    var value0 = d3Selection.style(this, name),
	        value1 = value(this);
	    if (value1 == null) value1 = (this.style.removeProperty(name), d3Selection.style(this, name));
	    return value0 === value1 ? null
	        : value0 === value00 && value1 === value10 ? interpolate0
	        : interpolate0 = interpolate$$1(value00 = value0, value10 = value1);
	  };
	}
	
	var transition_style = function(name, value, priority) {
	  var i = (name += "") === "transform" ? d3Interpolate.interpolateTransformCss : interpolate;
	  return value == null ? this
	          .styleTween(name, styleRemove(name, i))
	          .on("end.style." + name, styleRemoveEnd(name))
	      : this.styleTween(name, typeof value === "function"
	          ? styleFunction(name, i, tweenValue(this, "style." + name, value))
	          : styleConstant(name, i, value + ""), priority);
	};
	
	function styleTween(name, value, priority) {
	  function tween() {
	    var node = this, i = value.apply(node, arguments);
	    return i && function(t) {
	      node.style.setProperty(name, i(t), priority);
	    };
	  }
	  tween._value = value;
	  return tween;
	}
	
	var transition_styleTween = function(name, value, priority) {
	  var key = "style." + (name += "");
	  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
	  if (value == null) return this.tween(key, null);
	  if (typeof value !== "function") throw new Error;
	  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
	};
	
	function textConstant(value) {
	  return function() {
	    this.textContent = value;
	  };
	}
	
	function textFunction(value) {
	  return function() {
	    var value1 = value(this);
	    this.textContent = value1 == null ? "" : value1;
	  };
	}
	
	var transition_text = function(value) {
	  return this.tween("text", typeof value === "function"
	      ? textFunction(tweenValue(this, "text", value))
	      : textConstant(value == null ? "" : value + ""));
	};
	
	var transition_transition = function() {
	  var name = this._name,
	      id0 = this._id,
	      id1 = newId();
	
	  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        var inherit = get(node, id0);
	        schedule(node, name, id1, i, group, {
	          time: inherit.time + inherit.delay + inherit.duration,
	          delay: 0,
	          duration: inherit.duration,
	          ease: inherit.ease
	        });
	      }
	    }
	  }
	
	  return new Transition(groups, this._parents, name, id1);
	};
	
	var id = 0;
	
	function Transition(groups, parents, name, id) {
	  this._groups = groups;
	  this._parents = parents;
	  this._name = name;
	  this._id = id;
	}
	
	function transition(name) {
	  return d3Selection.selection().transition(name);
	}
	
	function newId() {
	  return ++id;
	}
	
	var selection_prototype = d3Selection.selection.prototype;
	
	Transition.prototype = transition.prototype = {
	  constructor: Transition,
	  select: transition_select,
	  selectAll: transition_selectAll,
	  filter: transition_filter,
	  merge: transition_merge,
	  selection: transition_selection,
	  transition: transition_transition,
	  call: selection_prototype.call,
	  nodes: selection_prototype.nodes,
	  node: selection_prototype.node,
	  size: selection_prototype.size,
	  empty: selection_prototype.empty,
	  each: selection_prototype.each,
	  on: transition_on,
	  attr: transition_attr,
	  attrTween: transition_attrTween,
	  style: transition_style,
	  styleTween: transition_styleTween,
	  text: transition_text,
	  remove: transition_remove,
	  tween: transition_tween,
	  delay: transition_delay,
	  duration: transition_duration,
	  ease: transition_ease
	};
	
	var defaultTiming = {
	  time: null, // Set on use.
	  delay: 0,
	  duration: 250,
	  ease: d3Ease.easeCubicInOut
	};
	
	function inherit(node, id) {
	  var timing;
	  while (!(timing = node.__transition) || !(timing = timing[id])) {
	    if (!(node = node.parentNode)) {
	      return defaultTiming.time = d3Timer.now(), defaultTiming;
	    }
	  }
	  return timing;
	}
	
	var selection_transition = function(name) {
	  var id,
	      timing;
	
	  if (name instanceof Transition) {
	    id = name._id, name = name._name;
	  } else {
	    id = newId(), (timing = defaultTiming).time = d3Timer.now(), name = name == null ? null : name + "";
	  }
	
	  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        schedule(node, name, id, i, group, timing || inherit(node, id));
	      }
	    }
	  }
	
	  return new Transition(groups, this._parents, name, id);
	};
	
	d3Selection.selection.prototype.interrupt = selection_interrupt;
	d3Selection.selection.prototype.transition = selection_transition;
	
	var root = [null];
	
	var active = function(node, name) {
	  var schedules = node.__transition,
	      schedule,
	      i;
	
	  if (schedules) {
	    name = name == null ? null : name + "";
	    for (i in schedules) {
	      if ((schedule = schedules[i]).state > SCHEDULED && schedule.name === name) {
	        return new Transition([[node]], root, name, +i);
	      }
	    }
	  }
	
	  return null;
	};
	
	exports.transition = transition;
	exports.active = active;
	exports.interrupt = interrupt;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-timer/ Version 1.0.5. Copyright 2017 Mike Bostock.
	(function (global, factory) {
		 true ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';
	
	var frame = 0;
	var timeout = 0;
	var interval = 0;
	var pokeDelay = 1000;
	var taskHead;
	var taskTail;
	var clockLast = 0;
	var clockNow = 0;
	var clockSkew = 0;
	var clock = typeof performance === "object" && performance.now ? performance : Date;
	var setFrame = typeof requestAnimationFrame === "function" ? requestAnimationFrame : function(f) { setTimeout(f, 17); };
	
	function now() {
	  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
	}
	
	function clearNow() {
	  clockNow = 0;
	}
	
	function Timer() {
	  this._call =
	  this._time =
	  this._next = null;
	}
	
	Timer.prototype = timer.prototype = {
	  constructor: Timer,
	  restart: function(callback, delay, time) {
	    if (typeof callback !== "function") throw new TypeError("callback is not a function");
	    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
	    if (!this._next && taskTail !== this) {
	      if (taskTail) taskTail._next = this;
	      else taskHead = this;
	      taskTail = this;
	    }
	    this._call = callback;
	    this._time = time;
	    sleep();
	  },
	  stop: function() {
	    if (this._call) {
	      this._call = null;
	      this._time = Infinity;
	      sleep();
	    }
	  }
	};
	
	function timer(callback, delay, time) {
	  var t = new Timer;
	  t.restart(callback, delay, time);
	  return t;
	}
	
	function timerFlush() {
	  now(); // Get the current time, if not already set.
	  ++frame; // Pretend we’ve set an alarm, if we haven’t already.
	  var t = taskHead, e;
	  while (t) {
	    if ((e = clockNow - t._time) >= 0) t._call.call(null, e);
	    t = t._next;
	  }
	  --frame;
	}
	
	function wake() {
	  clockNow = (clockLast = clock.now()) + clockSkew;
	  frame = timeout = 0;
	  try {
	    timerFlush();
	  } finally {
	    frame = 0;
	    nap();
	    clockNow = 0;
	  }
	}
	
	function poke() {
	  var now = clock.now(), delay = now - clockLast;
	  if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
	}
	
	function nap() {
	  var t0, t1 = taskHead, t2, time = Infinity;
	  while (t1) {
	    if (t1._call) {
	      if (time > t1._time) time = t1._time;
	      t0 = t1, t1 = t1._next;
	    } else {
	      t2 = t1._next, t1._next = null;
	      t1 = t0 ? t0._next = t2 : taskHead = t2;
	    }
	  }
	  taskTail = t0;
	  sleep(time);
	}
	
	function sleep(time) {
	  if (frame) return; // Soonest alarm already set, or will be.
	  if (timeout) timeout = clearTimeout(timeout);
	  var delay = time - clockNow;
	  if (delay > 24) {
	    if (time < Infinity) timeout = setTimeout(wake, delay);
	    if (interval) interval = clearInterval(interval);
	  } else {
	    if (!interval) clockLast = clockNow, interval = setInterval(poke, pokeDelay);
	    frame = 1, setFrame(wake);
	  }
	}
	
	var timeout$1 = function(callback, delay, time) {
	  var t = new Timer;
	  delay = delay == null ? 0 : +delay;
	  t.restart(function(elapsed) {
	    t.stop();
	    callback(elapsed + delay);
	  }, delay, time);
	  return t;
	};
	
	var interval$1 = function(callback, delay, time) {
	  var t = new Timer, total = delay;
	  if (delay == null) return t.restart(callback, delay, time), t;
	  delay = +delay, time = time == null ? now() : +time;
	  t.restart(function tick(elapsed) {
	    elapsed += total;
	    t.restart(tick, total += delay, time);
	    callback(elapsed);
	  }, delay, time);
	  return t;
	};
	
	exports.now = now;
	exports.timer = timer;
	exports.timerFlush = timerFlush;
	exports.timeout = timeout$1;
	exports.interval = interval$1;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ }),
/* 24 */
/***/ (function(module, exports) {

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */
	
	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	
	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}
	
	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);
	
	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}
	
	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object),
	    nativeMax = Math.max;
	
	/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
	var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');
	
	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  // Safari 9 makes `arguments.length` enumerable in strict mode.
	  var result = (isArray(value) || isArguments(value))
	    ? baseTimes(value.length, String)
	    : [];
	
	  var length = result.length,
	      skipIndexes = !!length;
	
	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    object[key] = value;
	  }
	}
	
	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	/**
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */
	function baseRest(func, start) {
	  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);
	
	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = array;
	    return apply(func, this, otherArgs);
	  };
	}
	
	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  object || (object = {});
	
	  var index = -1,
	      length = props.length;
	
	  while (++index < length) {
	    var key = props[index];
	
	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;
	
	    assignValue(object, key, newValue === undefined ? source[key] : newValue);
	  }
	  return object;
	}
	
	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return baseRest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;
	
	    customizer = (assigner.length > 3 && typeof customizer == 'function')
	      ? (length--, customizer)
	      : undefined;
	
	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}
	
	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	        ? (isArrayLike(object) && isIndex(index, object.length))
	        : (type == 'string' && index in object)
	      ) {
	    return eq(object[index], value);
	  }
	  return false;
	}
	
	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
	
	  return value === proto;
	}
	
	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}
	
	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}
	
	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;
	
	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}
	
	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8-9 which returns 'object' for typed array and other constructors.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/**
	 * Assigns own enumerable string keyed properties of source objects to the
	 * destination object. Source objects are applied from left to right.
	 * Subsequent sources overwrite property assignments of previous sources.
	 *
	 * **Note:** This method mutates `object` and is loosely based on
	 * [`Object.assign`](https://mdn.io/Object/assign).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.10.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @see _.assignIn
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * function Bar() {
	 *   this.c = 3;
	 * }
	 *
	 * Foo.prototype.b = 2;
	 * Bar.prototype.d = 4;
	 *
	 * _.assign({ 'a': 0 }, new Foo, new Bar);
	 * // => { 'a': 1, 'c': 3 }
	 */
	var assign = createAssigner(function(object, source) {
	  if (nonEnumShadows || isPrototype(source) || isArrayLike(source)) {
	    copyObject(source, keys(source), object);
	    return;
	  }
	  for (var key in source) {
	    if (hasOwnProperty.call(source, key)) {
	      assignValue(object, key, source[key]);
	    }
	  }
	});
	
	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}
	
	module.exports = assign;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    'use strict';
	
	    var _require = __webpack_require__(7),
	        colorSchemas = _require.colorSchemas;
	
	    var constants = __webpack_require__(26);
	    var serializeWithStyles = __webpack_require__(27);
	
	    var encoder = window.btoa;
	
	    if (!encoder) {
	        encoder = __webpack_require__(28).encode;
	    }
	
	    // Base64 doesn't work really well with Unicode strings, so we need to use this function
	    // Ref: https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
	    var b64EncodeUnicode = function b64EncodeUnicode(str) {
	        return encoder(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
	            return String.fromCharCode('0x' + p1);
	        }));
	    };
	
	    var config = {
	        styleClass: 'britechartStyle',
	        defaultFilename: 'britechart.png',
	        chartBackground: 'white',
	        imageSourceBase: 'data:image/svg+xml;base64,',
	        titleFontSize: '15px',
	        titleFontFamily: '\'Benton Sans\', sans-serif',
	        titleTopOffset: 30,
	        get styleBackgroundString() {
	            return '<style>svg{background:' + this.chartBackground + ';}</style>';
	        }
	    };
	
	    /**
	     * Main function to be used as a method by chart instances to export charts to png
	     * @param  {array} svgs         (or an svg element) pass in both chart & legend as array or just chart as svg or in array
	     * @param  {string} filename    [download to be called <filename>.png]
	     * @param  {string} title       Title for the image
	     */
	    function exportChart(d3svg, filename, title) {
	        var img = createImage(convertSvgToHtml.call(this, d3svg, title));
	
	        img.onload = handleImageLoad.bind(img, createCanvas(this.width(), this.height()), filename);
	    }
	
	    /**
	     * adds background styles to raw html
	     * @param {string} html raw html
	     */
	    function addBackground(html) {
	        return html.replace('>', '>' + config.styleBackgroundString);
	    }
	
	    /**
	     * takes d3 svg el, adds proper svg tags, adds inline styles
	     * from stylesheets, adds white background and returns string
	     * @param  {object} d3svg TYPE d3 svg element
	     * @return {string} string of passed d3
	     */
	    function convertSvgToHtml(d3svg, title) {
	        if (!d3svg) {
	            return;
	        }
	
	        d3svg.attr('version', 1.1).attr('xmlns', 'http://www.w3.org/2000/svg');
	        var serializer = serializeWithStyles.initializeSerializer();
	        var html = serializer(d3svg.node());
	        html = formatHtmlByBrowser(html);
	        html = prependTitle.call(this, html, title, parseInt(d3svg.attr('width')));
	        html = addBackground(html);
	
	        return html;
	    }
	
	    /**
	     * Create Canvas
	     * @param  {number} width
	     * @param  {number} height
	     * @return {object} TYPE canvas element
	     */
	    function createCanvas(width, height) {
	        var canvas = document.createElement('canvas');
	
	        canvas.height = height;
	        canvas.width = width;
	
	        return canvas;
	    }
	
	    /**
	     * Create Image
	     * @param  {string} svgHtml string representation of svg el
	     * @return {object}  TYPE element <img>, src points at svg
	     */
	    function createImage(svgHtml) {
	        var img = new Image();
	
	        img.src = '' + config.imageSourceBase + b64EncodeUnicode(svgHtml);
	
	        return img;
	    };
	
	    /**
	     * Draws image on canvas
	     * @param  {object} image TYPE:el <img>, to be drawn
	     * @param  {object} canvas TYPE: el <canvas>, to draw on
	     */
	    function drawImageOnCanvas(image, canvas) {
	        canvas.getContext('2d').drawImage(image, 0, 0);
	
	        return canvas;
	    }
	
	    /**
	     * Triggers browser to download image, convert canvas to url,
	     * we need to append the link el to the dom before clicking it for Firefox to register
	     * point <a> at it and trigger click
	     * @param  {object} canvas TYPE: el <canvas>
	     * @param  {string} filename
	     * @param  {string} extensionType
	     */
	    function downloadCanvas(canvas) {
	        var filename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : config.defaultFilename;
	        var extensionType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'image/png';
	
	        var url = canvas.toDataURL(extensionType);
	        var link = document.createElement('a');
	
	        link.href = url;
	        link.download = filename;
	        document.body.appendChild(link);
	        link.click();
	        document.body.removeChild(link);
	    }
	
	    /**
	     * Some browsers need special formatting, we handle that here
	     * @param  {string} html string of svg html
	     * @return {string} string of svg html
	     */
	    function formatHtmlByBrowser(html) {
	        if (navigator.userAgent.search('FireFox') > -1) {
	            return html.replace(/url.*&quot;\)/, 'url(&quot;#' + constants.lineGradientId + '&quot;);');
	        }
	
	        return html;
	    }
	
	    /**
	     * Handles on load event fired by img.onload, this=img
	     * @param  {object} canvas TYPE: el <canvas>
	     * @param  {string} filename
	     * @param  {object} e
	     */
	    function handleImageLoad(canvas, filename, e) {
	        e.preventDefault();
	
	        downloadCanvas(drawImageOnCanvas(this, canvas), filename);
	    }
	
	    /**
	     * if passed, append title to the raw html to appear on graph
	     * @param  {string} html     raw html string
	     * @param  {string} title    title of the graph
	     * @param  {number} svgWidth width of graph container
	     * @return {string}         raw html with title prepended
	     */
	    function prependTitle(html, title, svgWidth) {
	        if (!title || !svgWidth) {
	            return html;
	        }
	        var britechartsGreySchema = colorSchemas.britechartsGreySchema;
	
	        html = html.replace(/<g/, '<text x="' + this.margin().left + '" y="' + config.titleTopOffset + '" font-family="' + config.titleFontFamily + '" font-size="' + config.titleFontSize + '" fill="' + britechartsGreySchema[6] + '"> ' + title + ' </text><g ');
	
	        return html;
	    }
	
	    return {
	        exportChart: exportChart,
	        convertSvgToHtml: convertSvgToHtml,
	        createImage: createImage,
	        drawImageOnCanvas: drawImageOnCanvas
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    var axisTimeCombinations = {
	        MINUTE_HOUR: 'minute-hour',
	        HOUR_DAY: 'hour-daymonth',
	        DAY_MONTH: 'day-month',
	        MONTH_YEAR: 'month-year'
	    };
	
	    var timeBenchmarks = {
	        ONE_AND_A_HALF_YEARS: 47304000000,
	        ONE_YEAR: 31536000365,
	        ONE_DAY: 86400001
	    };
	
	    return {
	        axisTimeCombinations: axisTimeCombinations,
	        timeBenchmarks: timeBenchmarks,
	        lineGradientId: 'lineGradientId'
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 27 */
/***/ (function(module, exports) {

	'use strict';
	
	module.exports = function () {
	
	    'use strict';
	
	    return {
	
	        /**
	         * returns serializer function, only run it when you know you want to serialize your chart
	         * @return {func} serializer to add styles in line to dom string
	         */
	        initializeSerializer: function initializeSerializer() {
	
	            // Mapping between tag names and css default values lookup tables. This allows to exclude default values in the result.
	            var defaultStylesByTagName = {};
	
	            // Styles inherited from style sheets will not be rendered for elements with these tag names
	            var noStyleTags = { 'BASE': true, 'HEAD': true, 'HTML': true, 'META': true, 'NOFRAME': true, 'NOSCRIPT': true, 'PARAM': true, 'SCRIPT': true, 'STYLE': true, 'TITLE': true };
	
	            // This list determines which css default values lookup tables are precomputed at load time
	            // Lookup tables for other tag names will be automatically built at runtime if needed
	            var tagNames = ['A', 'ABBR', 'ADDRESS', 'AREA', 'ARTICLE', 'ASIDE', 'AUDIO', 'B', 'BASE', 'BDI', 'BDO', 'BLOCKQUOTE', 'BODY', 'BR', 'BUTTON', 'CANVAS', 'CAPTION', 'CENTER', 'CITE', 'CODE', 'COL', 'COLGROUP', 'COMMAND', 'DATALIST', 'DD', 'DEL', 'DETAILS', 'DFN', 'DIV', 'DL', 'DT', 'EM', 'EMBED', 'FIELDSET', 'FIGCAPTION', 'FIGURE', 'FONT', 'FOOTER', 'FORM', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'HEAD', 'HEADER', 'HGROUP', 'HR', 'HTML', 'I', 'IFRAME', 'IMG', 'INPUT', 'INS', 'KBD', 'LABEL', 'LEGEND', 'LI', 'LINK', 'MAP', 'MARK', 'MATH', 'MENU', 'META', 'METER', 'NAV', 'NOBR', 'NOSCRIPT', 'OBJECT', 'OL', 'OPTION', 'OPTGROUP', 'OUTPUT', 'P', 'PARAM', 'PRE', 'PROGRESS', 'Q', 'RP', 'RT', 'RUBY', 'S', 'SAMP', 'SCRIPT', 'SECTION', 'SELECT', 'SMALL', 'SOURCE', 'SPAN', 'STRONG', 'STYLE', 'SUB', 'SUMMARY', 'SUP', 'SVG', 'TABLE', 'TBODY', 'TD', 'TEXTAREA', 'TFOOT', 'TH', 'THEAD', 'TIME', 'TITLE', 'TR', 'TRACK', 'U', 'UL', 'VAR', 'VIDEO', 'WBR'];
	
	            // Precompute the lookup tables.
	            [].forEach.call(tagNames, function (name) {
	                if (!noStyleTags[name]) {
	                    defaultStylesByTagName[name] = computeDefaultStyleByTagName(name);
	                }
	            });
	
	            function computeDefaultStyleByTagName(tagName) {
	                var defaultStyle = {},
	                    element = document.body.appendChild(document.createElement(tagName)),
	                    computedStyle = window.getComputedStyle(element);
	
	                [].forEach.call(computedStyle, function (style) {
	                    defaultStyle[style] = computedStyle[style];
	                });
	                document.body.removeChild(element);
	                return defaultStyle;
	            }
	
	            function getDefaultStyleByTagName(tagName) {
	                tagName = tagName.toUpperCase();
	                if (!defaultStylesByTagName[tagName]) {
	                    defaultStylesByTagName[tagName] = computeDefaultStyleByTagName(tagName);
	                }
	                return defaultStylesByTagName[tagName];
	            };
	
	            function serializeWithStyles(elem) {
	
	                var cssTexts = [],
	                    elements = void 0,
	                    computedStyle = void 0,
	                    defaultStyle = void 0,
	                    result = void 0;
	
	                if (!elem || elem.nodeType !== Node.ELEMENT_NODE) {
	                    console.error('Error: Object passed in to serializeWithSyles not of nodeType Node.ELEMENT_NODE');
	                    return;
	                }
	
	                cssTexts = [];
	                elements = elem.querySelectorAll('*');
	
	                [].forEach.call(elements, function (el, i) {
	                    if (!noStyleTags[el.tagName]) {
	                        computedStyle = window.getComputedStyle(el);
	                        defaultStyle = getDefaultStyleByTagName(el.tagName);
	                        cssTexts[i] = el.style.cssText;
	                        [].forEach.call(computedStyle, function (cssPropName) {
	                            if (computedStyle[cssPropName] !== defaultStyle[cssPropName]) {
	                                el.style[cssPropName] = computedStyle[cssPropName];
	                            }
	                        });
	                    }
	                });
	
	                result = elem.outerHTML;
	                elements = [].map.call(elements, function (el, i) {
	                    el.style.cssText = cssTexts[i];
	                    return el;
	                });
	
	                return result;
	            };
	
	            return serializeWithStyles;
	        }
	    };
	}();

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! http://mths.be/base64 v0.1.0 by @mathias | MIT license */
	;(function(root) {
	
		// Detect free variables `exports`.
		var freeExports = typeof exports == 'object' && exports;
	
		// Detect free variable `module`.
		var freeModule = typeof module == 'object' && module &&
			module.exports == freeExports && module;
	
		// Detect free variable `global`, from Node.js or Browserified code, and use
		// it as `root`.
		var freeGlobal = typeof global == 'object' && global;
		if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
			root = freeGlobal;
		}
	
		/*--------------------------------------------------------------------------*/
	
		var InvalidCharacterError = function(message) {
			this.message = message;
		};
		InvalidCharacterError.prototype = new Error;
		InvalidCharacterError.prototype.name = 'InvalidCharacterError';
	
		var error = function(message) {
			// Note: the error messages used throughout this file match those used by
			// the native `atob`/`btoa` implementation in Chromium.
			throw new InvalidCharacterError(message);
		};
	
		var TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
		// http://whatwg.org/html/common-microsyntaxes.html#space-character
		var REGEX_SPACE_CHARACTERS = /[\t\n\f\r ]/g;
	
		// `decode` is designed to be fully compatible with `atob` as described in the
		// HTML Standard. http://whatwg.org/html/webappapis.html#dom-windowbase64-atob
		// The optimized base64-decoding algorithm used is based on @atk’s excellent
		// implementation. https://gist.github.com/atk/1020396
		var decode = function(input) {
			input = String(input)
				.replace(REGEX_SPACE_CHARACTERS, '');
			var length = input.length;
			if (length % 4 == 0) {
				input = input.replace(/==?$/, '');
				length = input.length;
			}
			if (
				length % 4 == 1 ||
				// http://whatwg.org/C#alphanumeric-ascii-characters
				/[^+a-zA-Z0-9/]/.test(input)
			) {
				error(
					'Invalid character: the string to be decoded is not correctly encoded.'
				);
			}
			var bitCounter = 0;
			var bitStorage;
			var buffer;
			var output = '';
			var position = -1;
			while (++position < length) {
				buffer = TABLE.indexOf(input.charAt(position));
				bitStorage = bitCounter % 4 ? bitStorage * 64 + buffer : buffer;
				// Unless this is the first of a group of 4 characters…
				if (bitCounter++ % 4) {
					// …convert the first 8 bits to a single ASCII character.
					output += String.fromCharCode(
						0xFF & bitStorage >> (-2 * bitCounter & 6)
					);
				}
			}
			return output;
		};
	
		// `encode` is designed to be fully compatible with `btoa` as described in the
		// HTML Standard: http://whatwg.org/html/webappapis.html#dom-windowbase64-btoa
		var encode = function(input) {
			input = String(input);
			if (/[^\0-\xFF]/.test(input)) {
				// Note: no need to special-case astral symbols here, as surrogates are
				// matched, and the input is supposed to only contain ASCII anyway.
				error(
					'The string to be encoded contains characters outside of the ' +
					'Latin1 range.'
				);
			}
			var padding = input.length % 3;
			var output = '';
			var position = -1;
			var a;
			var b;
			var c;
			var d;
			var buffer;
			// Make sure any padding is handled outside of the loop.
			var length = input.length - padding;
	
			while (++position < length) {
				// Read three bytes, i.e. 24 bits.
				a = input.charCodeAt(position) << 16;
				b = input.charCodeAt(++position) << 8;
				c = input.charCodeAt(++position);
				buffer = a + b + c;
				// Turn the 24 bits into four chunks of 6 bits each, and append the
				// matching character for each of them to the output.
				output += (
					TABLE.charAt(buffer >> 18 & 0x3F) +
					TABLE.charAt(buffer >> 12 & 0x3F) +
					TABLE.charAt(buffer >> 6 & 0x3F) +
					TABLE.charAt(buffer & 0x3F)
				);
			}
	
			if (padding == 2) {
				a = input.charCodeAt(position) << 8;
				b = input.charCodeAt(++position);
				buffer = a + b;
				output += (
					TABLE.charAt(buffer >> 10) +
					TABLE.charAt((buffer >> 4) & 0x3F) +
					TABLE.charAt((buffer << 2) & 0x3F) +
					'='
				);
			} else if (padding == 1) {
				buffer = input.charCodeAt(position);
				output += (
					TABLE.charAt(buffer >> 2) +
					TABLE.charAt((buffer << 4) & 0x3F) +
					'=='
				);
			}
	
			return output;
		};
	
		var base64 = {
			'encode': encode,
			'decode': decode,
			'version': '0.1.0'
		};
	
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return base64;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		}	else if (freeExports && !freeExports.nodeType) {
			if (freeModule) { // in Node.js or RingoJS v0.8.0+
				freeModule.exports = base64;
			} else { // in Narwhal or RingoJS v0.7.0-
				for (var key in base64) {
					base64.hasOwnProperty(key) && (freeExports[key] = base64[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.base64 = base64;
		}
	
	}(this));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)(module), (function() { return this; }())))

/***/ }),
/* 29 */
/***/ (function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    'use strict';
	
	    var _settingsToMajorTickM;
	
	    var d3Time = __webpack_require__(18);
	    var d3TimeFormat = __webpack_require__(19);
	
	    var _require = __webpack_require__(26),
	        axisTimeCombinations = _require.axisTimeCombinations,
	        timeBenchmarks = _require.timeBenchmarks;
	
	    var singleTickWidth = 20;
	    var horizontalTickSpacing = 50;
	    var minEntryNumForDayFormat = 5;
	    var xTickMinuteFormat = d3TimeFormat.timeFormat('%M m');
	    var xTickHourFormat = d3TimeFormat.timeFormat('%H %p');
	    var xTickSimpleDayFormat = d3TimeFormat.timeFormat('%e');
	    var xTickDayMonthFormat = d3TimeFormat.timeFormat('%d %b');
	    var xTickMonthFormat = d3TimeFormat.timeFormat('%b');
	    var xTickYearFormat = d3TimeFormat.timeFormat('%Y');
	
	    var formatMap = {
	        minute: xTickMinuteFormat,
	        hour: xTickHourFormat,
	        day: xTickSimpleDayFormat,
	        daymonth: xTickDayMonthFormat,
	        month: xTickMonthFormat,
	        year: xTickYearFormat
	    };
	    var settingsToMajorTickMap = (_settingsToMajorTickM = {}, _defineProperty(_settingsToMajorTickM, axisTimeCombinations.MINUTE_HOUR, d3Time.timeHour.every(1)), _defineProperty(_settingsToMajorTickM, axisTimeCombinations.HOUR_DAY, d3Time.timeDay.every(1)), _defineProperty(_settingsToMajorTickM, axisTimeCombinations.DAY_MONTH, d3Time.timeMonth.every(1)), _defineProperty(_settingsToMajorTickM, axisTimeCombinations.MONTH_YEAR, d3Time.timeYear.every(1)), _settingsToMajorTickM);
	
	    /**
	     * Figures out the proper settings from the current time span
	     * @param  {Number} timeSpan    Span of time charted by the graph in milliseconds
	     * @return {String}             Type of settings for the given timeSpan
	     */
	    var getAxisSettingsFromTimeSpan = function getAxisSettingsFromTimeSpan(timeSpan) {
	        var ONE_YEAR = timeBenchmarks.ONE_YEAR,
	            ONE_DAY = timeBenchmarks.ONE_DAY;
	
	        var settings = void 0;
	
	        if (timeSpan < ONE_DAY) {
	            settings = axisTimeCombinations.HOUR_DAY;
	        } else if (timeSpan < ONE_YEAR) {
	            settings = axisTimeCombinations.DAY_MONTH;
	        } else {
	            settings = axisTimeCombinations.MONTH_YEAR;
	        }
	
	        return settings;
	    };
	
	    /**
	     * Calculates the maximum number of ticks for the x axis
	     * @param  {Number} width Chart width
	     * @param  {Number} dataPointNumber  Number of entries on the data
	     * @return {Number}       Number of ticks to render
	     */
	    var getMaxNumOfHorizontalTicks = function getMaxNumOfHorizontalTicks(width, dataPointNumber) {
	        var ticksForWidth = Math.ceil(width / (singleTickWidth + horizontalTickSpacing));
	
	        return dataPointNumber < minEntryNumForDayFormat ? d3Time.timeDay : Math.min(dataPointNumber, ticksForWidth);
	    };
	
	    /**
	     * Returns tick object to be used when building the x axis
	     * @param {dataByDate} dataByDate       Chart data ordered by Date
	     * @param {Number} width                Chart width
	     * @param {String} settings             Optional forced settings for axis
	     * @return {object} tick settings for major and minr axis
	     */
	    var getXAxisSettings = function getXAxisSettings(dataByDate, width) {
	        var settings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
	
	        var firstDate = new Date(dataByDate[0].date);
	        var lastDate = new Date(dataByDate[dataByDate.length - 1].date);
	        var dateTimeSpan = lastDate - firstDate;
	
	        if (!settings) {
	            settings = getAxisSettingsFromTimeSpan(dateTimeSpan);
	        }
	
	        var _settings$split = settings.split('-'),
	            _settings$split2 = _slicedToArray(_settings$split, 2),
	            minor = _settings$split2[0],
	            major = _settings$split2[1];
	
	        var majorTickValue = settingsToMajorTickMap[settings];
	        var minorTickValue = getMaxNumOfHorizontalTicks(width, dataByDate.length);
	
	        return {
	            minor: {
	                format: formatMap[minor],
	                tick: minorTickValue
	            },
	            major: {
	                format: formatMap[major],
	                tick: majorTickValue
	            }
	        };
	    };
	
	    return {
	        getXAxisSettings: getXAxisSettings
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    'use strict';
	
	    var d3Format = __webpack_require__(17);
	
	    /**
	     * Calculates percentage of value from total
	     * @param  {Number}  value    Value to check
	     * @param  {Number}  total    Sum of values
	     * @param  {String}  decimals Specifies number of decimals https://github.com/d3/d3-format
	     * @return {String}           Percentage
	     */
	    function calculatePercent(value, total, decimals) {
	        return d3Format.format(decimals)(value / total * 100);
	    }
	
	    /**
	     * Checks if a number is an integer of has decimal values
	     * @param  {Number}  value Value to check
	     * @return {Boolean}       If it is an iteger
	     */
	    function isInteger(value) {
	        return value % 1 === 0;
	    }
	
	    return {
	        calculatePercent: calculatePercent,
	        isInteger: isInteger
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    'use strict';
	
	    var d3Format = __webpack_require__(17);
	
	    var valueRangeLimits = {
	        small: 10,
	        medium: 100
	    };
	    var integerValueFormats = {
	        small: d3Format.format(''),
	        medium: d3Format.format(''),
	        large: d3Format.format('.2s')
	    };
	    var decimalValueFormats = {
	        small: d3Format.format('.3f'),
	        medium: d3Format.format('.1f'),
	        large: d3Format.format('.2s')
	    };
	
	    function getValueSize(value) {
	        var size = 'large';
	
	        if (value < valueRangeLimits.small) {
	            size = 'small';
	        } else if (value < valueRangeLimits.medium) {
	            size = 'medium';
	        }
	        return size;
	    }
	
	    /**
	     * Formats an integer value depending on its value range
	     * @param  {Number} value Decimal point value to format
	     * @return {Number}       Formatted value to show
	     */
	    function formatIntegerValue(value) {
	        var format = integerValueFormats[getValueSize(value)];
	
	        return format(value);
	    }
	
	    /**
	     * Formats a floating point value depending on its value range
	     * @param  {Number} value Decimal point value to format
	     * @return {Number}       Formatted value to show
	     */
	    function formatDecimalValue(value) {
	        var format = decimalValueFormats[getValueSize(value)];
	
	        return format(value);
	    }
	
	    return {
	        formatDecimalValue: formatDecimalValue,
	        formatIntegerValue: formatIntegerValue
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    'use strict';
	
	    var d3Format = __webpack_require__(17);
	    var d3Selection = __webpack_require__(4);
	    var d3Transition = __webpack_require__(22);
	    var d3TimeFormat = __webpack_require__(19);
	
	    var _require = __webpack_require__(26),
	        axisTimeCombinations = _require.axisTimeCombinations;
	
	    var _require2 = __webpack_require__(32),
	        formatIntegerValue = _require2.formatIntegerValue,
	        formatDecimalValue = _require2.formatDecimalValue;
	
	    var _require3 = __webpack_require__(31),
	        isInteger = _require3.isInteger;
	
	    /**
	     * Tooltip Component reusable API class that renders a
	     * simple and configurable tooltip element for Britechart's
	     * line chart or stacked area chart.
	     *
	     * @module Tooltip
	     * @tutorial tooltip
	     * @requires d3-array, d3-axis, d3-dispatch, d3-format, d3-scale, d3-selection, d3-transition
	     *
	     * @example
	     * var lineChart = line(),
	     *     tooltip = tooltip();
	     *
	     * tooltip
	     *     .title('Tooltip title');
	     *
	     * lineChart
	     *     .width(500)
	     *     .on('customMouseOver', function() {
	     *          tooltip.show();
	     *     })
	     *     .on('customMouseMove', function(dataPoint, topicColorMap, dataPointXPosition) {
	     *          tooltip.update(dataPoint, topicColorMap, dataPointXPosition);
	     *     })
	     *     .on('customMouseOut', function() {
	     *          tooltip.hide();
	     *     });
	     *
	     * d3Selection.select('.css-selector')
	     *     .datum(dataset)
	     *     .call(lineChart);
	     *
	     * d3Selection.select('.metadata-group .hover-marker')
	     *     .datum([])
	     *     .call(tooltip);
	     *
	     */
	
	
	    return function module() {
	
	        var margin = {
	            top: 2,
	            right: 2,
	            bottom: 2,
	            left: 2
	        },
	            width = 250,
	            height = 45,
	            title = 'Tooltip title',
	
	
	        // tooltip
	        tooltip = void 0,
	            tooltipOffset = {
	            y: -55,
	            x: 0
	        },
	            tooltipMaxTopicLength = 170,
	            tooltipTextContainer = void 0,
	            tooltipDivider = void 0,
	            tooltipBody = void 0,
	            tooltipTitle = void 0,
	            tooltipWidth = 250,
	            tooltipHeight = 48,
	            ttTextX = 0,
	            ttTextY = 37,
	            textSize = void 0,
	            entryLineLimit = 3,
	            circleYOffset = 8,
	            colorMap = void 0,
	            bodyFillColor = '#FFFFFF',
	            borderStrokeColor = '#D2D6DF',
	            titleFillColor = '#6D717A',
	            textFillColor = '#282C35',
	            tooltipTextColor = '#000000',
	            dateLabel = 'date',
	            valueLabel = 'value',
	            topicLabel = 'topics',
	            defaultAxisSettings = axisTimeCombinations.DAY_MONTH,
	            forceAxisSettings = null,
	            forceOrder = [],
	
	
	        // formats
	        monthDayYearFormat = d3TimeFormat.timeFormat('%b %d, %Y'),
	            monthDayHourFormat = d3TimeFormat.timeFormat('%b %d, %I %p'),
	            chartWidth = void 0,
	            chartHeight = void 0,
	            data = void 0,
	            svg = void 0;
	
	        /**
	         * This function creates the graph using the selection as container
	         * @param {D3Selection} _selection A d3 selection that represents
	         *                                  the container(s) where the chart(s) will be rendered
	         * @param {Object} _data The data to attach and generate the chart
	         */
	        function exports(_selection) {
	            _selection.each(function (_data) {
	                chartWidth = width - margin.left - margin.right;
	                chartHeight = height - margin.top - margin.bottom;
	                data = _data;
	
	                buildSVG(this);
	            });
	        }
	
	        /**
	         * Builds containers for the tooltip
	         * Also applies the Margin convention
	         * @private
	         */
	        function buildContainerGroups() {
	            var container = svg.append('g').classed('tooltip-container-group', true).attr('transform', 'translate( ' + margin.left + ', ' + margin.top + ')');
	
	            container.append('g').classed('tooltip-group', true);
	        }
	
	        /**
	         * Builds the SVG element that will contain the chart
	         * @param  {HTMLElement} container DOM element that will work as the container of the graph
	         * @private
	         */
	        function buildSVG(container) {
	            if (!svg) {
	                svg = d3Selection.select(container).append('g').classed('britechart britechart-tooltip', true);
	
	                buildContainerGroups();
	                drawTooltip();
	            }
	            svg.transition().attr('width', width).attr('height', height);
	
	            // Hidden by default
	            exports.hide();
	        }
	
	        /**
	         * Resets the tooltipBody content
	         * @return void
	         */
	        function cleanContent() {
	            tooltipBody.selectAll('text').remove();
	            tooltipBody.selectAll('circle').remove();
	        }
	
	        /**
	         * Draws the different elements of the Tooltip box
	         * @return void
	         */
	        function drawTooltip() {
	            tooltipTextContainer = svg.selectAll('.tooltip-group').append('g').classed('tooltip-text', true);
	
	            tooltip = tooltipTextContainer.append('rect').classed('tooltip-text-container', true).attr('x', -tooltipWidth / 4 + 8).attr('y', 0).attr('width', tooltipWidth).attr('height', tooltipHeight).attr('rx', 3).attr('ry', 3).style('fill', bodyFillColor).style('stroke', borderStrokeColor).style('stroke-width', 1);
	
	            tooltipTitle = tooltipTextContainer.append('text').classed('tooltip-title', true).attr('x', -tooltipWidth / 4 + 17).attr('dy', '.35em').attr('y', 16).style('fill', titleFillColor);
	
	            tooltipDivider = tooltipTextContainer.append('line').classed('tooltip-divider', true).attr('x1', -tooltipWidth / 4 + 15).attr('y1', 31).attr('x2', 265).attr('y2', 31).style('stroke', borderStrokeColor);
	
	            tooltipBody = tooltipTextContainer.append('g').classed('tooltip-body', true).style('transform', 'translateY(8px)').style('fill', textFillColor);
	        }
	
	        /**
	         * Formats the value depending on its characteristics
	         * @param  {Number} value Value to format
	         * @return {Number}       Formatted value
	         */
	        function getFormattedValue(value) {
	            if (!value) {
	                return 0;
	            }
	
	            if (isInteger(value)) {
	                value = formatIntegerValue(value);
	            } else {
	                value = formatDecimalValue(value);
	            }
	
	            return value;
	        }
	
	        /**
	         * Extracts the value from the data object
	         * @param  {Object} data Data value containing the info
	         * @return {String}      Value to show
	         */
	        function getValueText(data) {
	            var value = data[valueLabel];
	            var valueText = void 0;
	
	            if (data.missingValue) {
	                valueText = '-';
	            } else {
	                valueText = getFormattedValue(value).toString();
	            }
	
	            return valueText;
	        }
	
	        /**
	         * Resets the height of the tooltip and the pointer for the text
	         * position
	         */
	        function resetSizeAndPositionPointers() {
	            tooltipHeight = 48;
	            ttTextY = 37;
	            ttTextX = 0;
	        }
	
	        /**
	         * Draws the data entries inside the tooltip for a given topic
	         * @param  {Object} topic Topic to extract data from
	         * @return void
	         */
	        function updateContent(topic) {
	            var name = topic.name,
	                tooltipRight = void 0,
	                tooltipLeftText = void 0,
	                tooltipRightText = void 0,
	                elementText = void 0;
	
	            tooltipLeftText = topic.topicName || name;
	            tooltipRightText = getValueText(topic);
	
	            elementText = tooltipBody.append('text').classed('tooltip-left-text', true).attr('dy', '1em').attr('x', ttTextX - 20).attr('y', ttTextY).style('fill', tooltipTextColor).text(tooltipLeftText).call(textWrap, tooltipMaxTopicLength, -25);
	
	            tooltipRight = tooltipBody.append('text').classed('tooltip-right-text', true).attr('dy', '1em').attr('x', ttTextX + 8).attr('y', ttTextY).style('fill', tooltipTextColor).text(tooltipRightText);
	
	            textSize = elementText.node().getBBox();
	            tooltipHeight += textSize.height + 5;
	
	            // Not sure if necessary
	            tooltipRight.attr('x', tooltipWidth - tooltipRight.node().getBBox().width - 10 - tooltipWidth / 4);
	
	            tooltipBody.append('circle').classed('tooltip-circle', true).attr('cx', 23 - tooltipWidth / 4).attr('cy', ttTextY + circleYOffset).attr('r', 5).style('fill', colorMap[name]).style('stroke-width', 1);
	
	            ttTextY += textSize.height + 7;
	        }
	
	        /**
	         * Updates size and position of tooltip depending on the side of the chart we are in
	         * @param  {Object} dataPoint DataPoint of the tooltip
	         * @param  {Number} xPosition DataPoint's x position in the chart
	         * @return void
	         */
	        function updatePositionAndSize(dataPoint, xPosition) {
	            tooltip.attr('width', tooltipWidth).attr('height', tooltipHeight + 10);
	
	            // show tooltip to the right
	            if (xPosition - tooltipWidth < 0) {
	                // Tooltip on the right
	                tooltipTextContainer.attr('transform', 'translate(' + (tooltipWidth - 185) + ',' + tooltipOffset.y + ')');
	            } else {
	                // Tooltip on the left
	                tooltipTextContainer.attr('transform', 'translate(' + -205 + ',' + tooltipOffset.y + ')');
	            }
	
	            tooltipDivider.attr('x2', tooltipWidth - 60);
	        }
	
	        /**
	         * Updates value of tooltipTitle with the data meaning and the date
	         * @param  {Object} dataPoint Point of data to use as source
	         * @return void
	         */
	        function updateTitle(dataPoint) {
	            var date = new Date(dataPoint[dateLabel]),
	                tooltipTitleText = title + ' - ' + formatDate(date);
	
	            tooltipTitle.text(tooltipTitleText);
	        }
	
	        /**
	         * Figures out which date format to use when showing the date of the current data entry
	         * @return {Function} The proper date formatting function
	         */
	        function formatDate(date) {
	            var settings = forceAxisSettings || defaultAxisSettings;
	            var format = null;
	
	            if (settings === axisTimeCombinations.DAY_MONTH || settings === axisTimeCombinations.MONTH_YEAR) {
	                format = monthDayYearFormat;
	            } else if (settings === axisTimeCombinations.HOUR_DAY || settings === axisTimeCombinations.MINUTE_HOUR) {
	                format = monthDayHourFormat;
	            }
	
	            return format(date);
	        }
	
	        /**
	         * Helper method to sort the passed topics array by the names passed int he order arary
	         * @param  {Object[]} topics    Topics data, retrieved from datapoint passed by line chart
	         * @param  {Object[]} order     Array of names in the order to sort topics by
	         * @return {Object[]}           sorted topics object
	         */
	        function _sortByForceOrder(topics) {
	            var order = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : forceOrder;
	
	            return forceOrder.map(function (orderName) {
	                return topics.filter(function (_ref) {
	                    var name = _ref.name;
	                    return name === orderName;
	                })[0];
	            });
	        }
	
	        /**
	         * Updates tooltip title, content, size and position
	         *
	         * @param  {lineChartPointByDate} dataPoint  Current datapoint to show info about
	         * @param  {Number} xPosition           Position of the mouse on the X axis
	         * @return void
	         */
	        function updateTooltip(dataPoint, xPosition) {
	            var topics = dataPoint[topicLabel];
	
	            // sort order by forceOrder array if passed
	            if (forceOrder.length) {
	                topics = _sortByForceOrder(topics);
	            }
	
	            cleanContent();
	            resetSizeAndPositionPointers();
	            updateTitle(dataPoint);
	            topics.forEach(updateContent);
	            updatePositionAndSize(dataPoint, xPosition);
	        }
	
	        /**
	         * Wraps a text given the text, width, x position and textFormatter function
	         * @param  {D3Selection} text  Selection with the text to wrap inside
	         * @param  {Number} width Desired max width for that line
	         * @param  {Number} xpos  Initial x position of the text
	         *
	         * REF: http://bl.ocks.org/mbostock/7555321
	         * More discussions on https://github.com/mbostock/d3/issues/1642
	         */
	        function textWrap(text, width, xpos) {
	            xpos = xpos || 0;
	
	            text.each(function () {
	                var words, word, line, lineNumber, lineHeight, y, dy, tspan;
	
	                text = d3Selection.select(this);
	
	                words = text.text().split(/\s+/).reverse();
	                line = [];
	                lineNumber = 0;
	                lineHeight = 1.2;
	                y = text.attr('y');
	                dy = parseFloat(text.attr('dy'));
	                tspan = text.text(null).append('tspan').attr('x', xpos).attr('y', y).attr('dy', dy + 'em');
	
	                while (word = words.pop()) {
	                    line.push(word);
	                    tspan.text(line.join(' '));
	
	                    if (tspan.node().getComputedTextLength() > width) {
	                        line.pop();
	                        tspan.text(line.join(' '));
	
	                        if (lineNumber < entryLineLimit - 1) {
	                            line = [word];
	                            tspan = text.append('tspan').attr('x', xpos).attr('y', y).attr('dy', ++lineNumber * lineHeight + dy + 'em').text(word);
	                        }
	                    }
	                }
	            });
	        }
	
	        /**
	         * Gets or Sets the dateLabel of the data
	         * @param  {Number} _x Desired dateLabel
	         * @return { dateLabel | module} Current dateLabel or Chart module to chain calls
	         * @public
	         */
	        exports.dateLabel = function (_x) {
	            if (!arguments.length) {
	                return dateLabel;
	            }
	            dateLabel = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the valueLabel of the data
	         * @param  {Number} _x Desired valueLabel
	         * @return { valueLabel | module} Current valueLabel or Chart module to chain calls
	         * @public
	         */
	        exports.valueLabel = function (_x) {
	            if (!arguments.length) {
	                return valueLabel;
	            }
	            valueLabel = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the topicLabel of the data
	         * @param  {Number} _x Desired topicLabel
	         * @return { topicLabel | module} Current topicLabel or Chart module to chain calls
	         * @public
	         */
	        exports.topicLabel = function (_x) {
	            if (!arguments.length) {
	                return topicLabel;
	            }
	            topicLabel = _x;
	
	            return this;
	        };
	
	        /**
	         * Hides the tooltip
	         * @return {Module} Tooltip module to chain calls
	         * @public
	         */
	        exports.hide = function () {
	            svg.style('display', 'none');
	
	            return this;
	        };
	
	        /**
	         * Shows the tooltip
	         * @return {Module} Tooltip module to chain calls
	         * @public
	         */
	        exports.show = function () {
	            svg.style('display', 'block');
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the title of the tooltip
	         * @param  {string} _x Desired title
	         * @return { string | module} Current title or module to chain calls
	         * @public
	         */
	        exports.title = function (_x) {
	            if (!arguments.length) {
	                return title;
	            }
	            title = _x;
	
	            return this;
	        };
	
	        /**
	         * Pass an override for the ordering of your tooltip
	         * @param  {Object[]} _x    Array of the names of your tooltip items
	         * @return { overrideOrder | module} Current overrideOrder or Chart module to chain calls
	         * @public
	         */
	        exports.forceOrder = function (_x) {
	            if (!arguments.length) {
	                return forceOrder;
	            }
	            forceOrder = _x;
	
	            return this;
	        };
	
	        /**
	         * Updates the position and content of the tooltip
	         * @param  {Object} dataPoint    Datapoint to represent
	         * @param  {Object} colorMapping Color scheme of the topics
	         * @param  {Number} position     X-scale position in pixels
	         * @return {Module} Tooltip module to chain calls
	         * @public
	         */
	        exports.update = function (dataPoint, colorMapping, position) {
	            colorMap = colorMapping;
	            updateTooltip(dataPoint, position);
	
	            return this;
	        };
	
	        /**
	         * Exposes the ability to force the tooltip to use a certain date format
	         * @param  {String} _x Desired format
	         * @return { (String|Module) }    Current format or module to chain calls
	         */
	        exports.forceDateRange = function (_x) {
	            if (!arguments.length) {
	                return forceAxisSettings || defaultAxisSettings;
	            }
	            forceAxisSettings = _x;
	            return this;
	        };
	
	        /**
	         * constants to be used to force the x axis to respect a certain granularity
	         * current options: HOUR_DAY, DAY_MONTH, MONTH_YEAR
	         * @example tooltip.forceDateRange(tooltip.axisTimeCombinations.HOUR_DAY)
	         */
	        exports.axisTimeCombinations = axisTimeCombinations;
	
	        return exports;
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    'use strict';
	
	    var _ = __webpack_require__(3),
	        jsonThreeSources = __webpack_require__(35),
	        jsonSixSources = __webpack_require__(36),
	        jsonSalesChannel = __webpack_require__(37),
	        jsonReportService = __webpack_require__(38),
	        jsonLargeService = __webpack_require__(39);
	
	    function StackedAreaDataBuilder(config) {
	        this.Klass = StackedAreaDataBuilder;
	
	        this.config = _.defaults({}, config);
	
	        this.with3Sources = function () {
	            var attributes = _.extend({}, this.config, jsonThreeSources);
	
	            return new this.Klass(attributes);
	        };
	
	        this.with6Sources = function () {
	            var attributes = _.extend({}, this.config, jsonSixSources);
	
	            return new this.Klass(attributes);
	        };
	
	        this.withReportData = function () {
	            var attributes = _.extend({}, this.config, jsonReportService);
	
	            return new this.Klass(attributes);
	        };
	
	        this.withSalesChannelData = function () {
	            var attributes = _.extend({}, this.config, jsonSalesChannel);
	
	            return new this.Klass(attributes);
	        };
	
	        this.withLargeData = function () {
	            var attributes = _.extend({}, this.config, jsonLargeService);
	            return new this.Klass(attributes);
	        };
	
	        this.build = function () {
	            return this.config;
	        };
	    }
	
	    return {
	        StackedAreaDataBuilder: StackedAreaDataBuilder
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 35 */
/***/ (function(module, exports) {

	module.exports = {
		"data": [
			{
				"name": "Direct",
				"views": 0,
				"dateUTC": "2011-01-05T00:00:00Z"
			},
			{
				"name": "Direct",
				"views": 10,
				"dateUTC": "2011-01-06T00:00:00Z"
			},
			{
				"name": "Direct",
				"views": 16,
				"dateUTC": "2011-01-07T00:00:00Z"
			},
			{
				"name": "Direct",
				"views": 23,
				"dateUTC": "2011-01-08T00:00:00Z"
			},
			{
				"name": "Eventbrite",
				"views": 23,
				"dateUTC": "2011-01-05T00:00:00Z"
			},
			{
				"name": "Eventbrite",
				"views": 16,
				"dateUTC": "2011-01-06T00:00:00Z"
			},
			{
				"name": "Eventbrite",
				"views": 10,
				"dateUTC": "2011-01-07T00:00:00Z"
			},
			{
				"name": "Eventbrite",
				"views": 0,
				"dateUTC": "2011-01-08T00:00:00Z"
			},
			{
				"name": "Email",
				"views": 10,
				"dateUTC": "2011-01-05T00:00:00Z"
			},
			{
				"name": "Email",
				"views": 20,
				"dateUTC": "2011-01-06T00:00:00Z"
			},
			{
				"name": "Email",
				"views": 26,
				"dateUTC": "2011-01-07T00:00:00Z"
			},
			{
				"name": "Email",
				"views": 33,
				"dateUTC": "2011-01-08T00:00:00Z"
			}
		]
	};

/***/ }),
/* 36 */
/***/ (function(module, exports) {

	module.exports = {
		"data": [
			{
				"name": "Direct",
				"views": 0,
				"dateUTC": "2011-01-05T00:00:00Z"
			},
			{
				"name": "Direct",
				"views": 1000,
				"dateUTC": "2011-01-06T00:00:00Z"
			},
			{
				"name": "Direct",
				"views": 1006.34,
				"dateUTC": "2011-01-07T00:00:00Z"
			},
			{
				"name": "Direct",
				"views": 2000,
				"dateUTC": "2011-01-08T00:00:00Z"
			},
			{
				"name": "Eventbrite",
				"views": 1003,
				"dateUTC": "2011-01-05T00:00:00Z"
			},
			{
				"name": "Eventbrite",
				"views": 1006,
				"dateUTC": "2011-01-06T00:00:00Z"
			},
			{
				"name": "Eventbrite",
				"views": 1000,
				"dateUTC": "2011-01-07T00:00:00Z"
			},
			{
				"name": "Eventbrite",
				"views": 500,
				"dateUTC": "2011-01-08T00:00:00Z"
			},
			{
				"name": "Email",
				"views": 1000,
				"dateUTC": "2011-01-05T00:00:00Z"
			},
			{
				"name": "Email",
				"views": 2000,
				"dateUTC": "2011-01-06T00:00:00Z"
			},
			{
				"name": "Email",
				"views": 2002,
				"dateUTC": "2011-01-07T00:00:00Z"
			},
			{
				"name": "Email",
				"views": 700,
				"dateUTC": "2011-01-08T00:00:00Z"
			},
			{
				"name": "Sun's Website",
				"views": 0,
				"dateUTC": "2011-01-05T00:00:00Z"
			},
			{
				"name": "Sun's Website",
				"views": 1000,
				"dateUTC": "2011-01-06T00:00:00Z"
			},
			{
				"name": "Sun's Website",
				"views": 1006,
				"dateUTC": "2011-01-07T00:00:00Z"
			},
			{
				"name": "Sun's Website",
				"views": 300,
				"dateUTC": "2011-01-08T00:00:00Z"
			},
			{
				"name": "Related Events",
				"views": 1008,
				"dateUTC": "2011-01-05T00:00:00Z"
			},
			{
				"name": "Related Events",
				"views": 1002,
				"dateUTC": "2011-01-06T00:00:00Z"
			},
			{
				"name": "Related Events",
				"views": 500,
				"dateUTC": "2011-01-07T00:00:00Z"
			},
			{
				"name": "Related Events",
				"views": 300,
				"dateUTC": "2011-01-08T00:00:00Z"
			},
			{
				"name": "Facebook",
				"views": 400,
				"dateUTC": "2011-01-05T00:00:00Z"
			},
			{
				"name": "Facebook",
				"views": 900,
				"dateUTC": "2011-01-06T00:00:00Z"
			},
			{
				"name": "Facebook",
				"views": 600,
				"dateUTC": "2011-01-07T00:00:00Z"
			},
			{
				"name": "Facebook",
				"views": 300,
				"dateUTC": "2011-01-08T00:00:00Z"
			}
		]
	};

/***/ }),
/* 37 */
/***/ (function(module, exports) {

	module.exports = {
		"data": [
			{
				"date": "2017-02-16T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 5
			},
			{
				"date": "2017-02-16T00:00:00-08:00",
				"name": "EB Driven",
				"value": 0
			},
			{
				"date": "2017-02-17T00:00:00-08:00",
				"name": "EB Driven",
				"value": 1
			},
			{
				"date": "2017-02-17T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 13
			},
			{
				"date": "2017-02-18T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 15
			},
			{
				"date": "2017-02-18T00:00:00-08:00",
				"name": "EB Driven",
				"value": 1
			},
			{
				"date": "2017-02-19T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 15
			},
			{
				"date": "2017-02-19T00:00:00-08:00",
				"name": "EB Driven",
				"value": 1
			},
			{
				"date": "2017-02-20T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 15
			},
			{
				"date": "2017-02-20T00:00:00-08:00",
				"name": "EB Driven",
				"value": 1
			},
			{
				"date": "2017-02-21T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 18
			},
			{
				"date": "2017-02-21T00:00:00-08:00",
				"name": "EB Driven",
				"value": 1
			},
			{
				"date": "2017-02-22T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 19
			},
			{
				"date": "2017-02-22T00:00:00-08:00",
				"name": "EB Driven",
				"value": 1
			},
			{
				"date": "2017-02-23T00:00:00-08:00",
				"name": "EB Driven",
				"value": 2
			},
			{
				"date": "2017-02-23T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 22
			},
			{
				"date": "2017-02-24T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 25
			},
			{
				"date": "2017-02-24T00:00:00-08:00",
				"name": "EB Driven",
				"value": 2
			},
			{
				"date": "2017-02-25T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 28
			},
			{
				"date": "2017-02-25T00:00:00-08:00",
				"name": "EB Driven",
				"value": 2
			},
			{
				"date": "2017-02-26T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 30
			},
			{
				"date": "2017-02-26T00:00:00-08:00",
				"name": "EB Driven",
				"value": 2
			},
			{
				"date": "2017-02-27T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 30
			},
			{
				"date": "2017-02-27T00:00:00-08:00",
				"name": "EB Driven",
				"value": 2
			},
			{
				"date": "2017-02-28T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 31
			},
			{
				"date": "2017-02-28T00:00:00-08:00",
				"name": "EB Driven",
				"value": 2
			},
			{
				"date": "2017-03-01T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 33
			},
			{
				"date": "2017-03-01T00:00:00-08:00",
				"name": "EB Driven",
				"value": 2
			},
			{
				"date": "2017-03-02T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 33
			},
			{
				"date": "2017-03-02T00:00:00-08:00",
				"name": "EB Driven",
				"value": 2
			},
			{
				"date": "2017-03-03T00:00:00-08:00",
				"name": "EB Driven",
				"value": 4
			},
			{
				"date": "2017-03-03T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 34
			},
			{
				"date": "2017-03-04T00:00:00-08:00",
				"name": "EB Driven",
				"value": 4
			},
			{
				"date": "2017-03-04T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 34
			},
			{
				"date": "2017-03-05T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 37
			},
			{
				"date": "2017-03-05T00:00:00-08:00",
				"name": "EB Driven",
				"value": 4
			},
			{
				"date": "2017-03-06T00:00:00-08:00",
				"name": "EB Driven",
				"value": 5
			},
			{
				"date": "2017-03-06T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 41
			},
			{
				"date": "2017-03-07T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 69
			},
			{
				"date": "2017-03-07T00:00:00-08:00",
				"name": "EB Driven",
				"value": 5
			},
			{
				"date": "2017-03-08T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 77
			},
			{
				"date": "2017-03-08T00:00:00-08:00",
				"name": "EB Driven",
				"value": 5
			},
			{
				"date": "2017-03-09T00:00:00-08:00",
				"name": "EB Driven",
				"value": 8
			},
			{
				"date": "2017-03-09T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 79
			},
			{
				"date": "2017-03-10T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 85
			},
			{
				"date": "2017-03-10T00:00:00-08:00",
				"name": "EB Driven",
				"value": 8
			},
			{
				"date": "2017-03-11T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 85
			},
			{
				"date": "2017-03-11T00:00:00-08:00",
				"name": "EB Driven",
				"value": 8
			},
			{
				"date": "2017-03-12T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 85
			},
			{
				"date": "2017-03-12T00:00:00-08:00",
				"name": "EB Driven",
				"value": 8
			},
			{
				"date": "2017-03-13T00:00:00-07:00",
				"name": "Organizer Driven",
				"value": 85
			},
			{
				"date": "2017-03-13T00:00:00-07:00",
				"name": "EB Driven",
				"value": 8
			},
			{
				"date": "2017-03-14T00:00:00-07:00",
				"name": "Organizer Driven",
				"value": 85
			},
			{
				"date": "2017-03-14T00:00:00-07:00",
				"name": "EB Driven",
				"value": 8
			},
			{
				"date": "2017-03-15T00:00:00-07:00",
				"name": "Organizer Driven",
				"value": 85
			},
			{
				"date": "2017-03-15T00:00:00-07:00",
				"name": "EB Driven",
				"value": 8
			},
			{
				"date": "2017-03-16T00:00:00-07:00",
				"name": "Organizer Driven",
				"value": 85
			},
			{
				"date": "2017-03-16T00:00:00-07:00",
				"name": "EB Driven",
				"value": 8
			},
			{
				"date": "2017-03-17T00:00:00-07:00",
				"name": "Organizer Driven",
				"value": 85
			},
			{
				"date": "2017-03-17T00:00:00-07:00",
				"name": "EB Driven",
				"value": 8
			}
		]
	};

/***/ }),
/* 38 */
/***/ (function(module, exports) {

	module.exports = {
		"data": [
			{
				"dateUTC": "2016-01-02T08:00:00Z",
				"dateEventTZ": "2016-01-02T00:00:00",
				"name": "google",
				"views": "22"
			},
			{
				"dateUTC": "2016-01-02T08:00:00Z",
				"dateEventTZ": "2016-01-02T00:00:00",
				"name": "facebook",
				"views": "21"
			},
			{
				"dateUTC": "2016-01-02T08:00:00Z",
				"dateEventTZ": "2016-01-02T00:00:00",
				"name": "twitter",
				"views": "24"
			},
			{
				"dateUTC": "2016-01-02T08:00:00Z",
				"dateEventTZ": "2016-01-02T00:00:00",
				"name": "user_newsletter",
				"views": "26"
			},
			{
				"dateUTC": "2016-01-02T08:00:00Z",
				"dateEventTZ": "2016-01-02T00:00:00",
				"name": "user_email",
				"views": "31"
			},
			{
				"dateUTC": "2016-01-02T08:00:00Z",
				"dateEventTZ": "2016-01-02T00:00:00",
				"name": "unknown",
				"views": "50"
			},
			{
				"dateUTC": "2016-01-03T08:00:00Z",
				"dateEventTZ": "2016-01-03T00:00:00",
				"name": "google",
				"views": "37"
			},
			{
				"dateUTC": "2016-01-03T08:00:00Z",
				"dateEventTZ": "2016-01-03T00:00:00",
				"name": "facebook",
				"views": "24"
			},
			{
				"dateUTC": "2016-01-03T08:00:00Z",
				"dateEventTZ": "2016-01-03T00:00:00",
				"name": "twitter",
				"views": "31"
			},
			{
				"dateUTC": "2016-01-03T08:00:00Z",
				"dateEventTZ": "2016-01-03T00:00:00",
				"name": "user_newsletter",
				"views": "24"
			},
			{
				"dateUTC": "2016-01-03T08:00:00Z",
				"dateEventTZ": "2016-01-03T00:00:00",
				"name": "user_email",
				"views": "41"
			},
			{
				"dateUTC": "2016-01-03T08:00:00Z",
				"dateEventTZ": "2016-01-03T00:00:00",
				"name": "unknown",
				"views": "0"
			}
		]
	};

/***/ }),
/* 39 */
/***/ (function(module, exports) {

	module.exports = {
		"data": [
			{
				"dateUTC": "2016-07-14T08:00:00Z",
				"name": "google",
				"views": 69
			},
			{
				"dateUTC": "2016-07-14T08:00:00Z",
				"name": "facebook",
				"views": 0
			},
			{
				"dateUTC": "2016-07-14T08:00:00Z",
				"name": "twitter",
				"views": 23
			},
			{
				"dateUTC": "2016-07-14T08:00:00Z",
				"name": "user_newsvarter",
				"views": 46
			},
			{
				"dateUTC": "2016-07-14T08:00:00Z",
				"name": "user_email",
				"views": 92
			},
			{
				"dateUTC": "2016-07-14T08:00:00Z",
				"name": "unknown",
				"views": 56
			},
			{
				"dateUTC": "2016-07-15T08:00:00Z",
				"name": "google",
				"views": 74
			},
			{
				"dateUTC": "2016-07-15T08:00:00Z",
				"name": "facebook",
				"views": 74
			},
			{
				"dateUTC": "2016-07-15T08:00:00Z",
				"name": "twitter",
				"views": 26
			},
			{
				"dateUTC": "2016-07-15T08:00:00Z",
				"name": "user_newsvarter",
				"views": 8
			},
			{
				"dateUTC": "2016-07-15T08:00:00Z",
				"name": "user_email",
				"views": 91
			},
			{
				"dateUTC": "2016-07-15T08:00:00Z",
				"name": "unknown",
				"views": 2
			},
			{
				"dateUTC": "2016-07-16T08:00:00Z",
				"name": "google",
				"views": 63
			},
			{
				"dateUTC": "2016-07-16T08:00:00Z",
				"name": "facebook",
				"views": 66
			},
			{
				"dateUTC": "2016-07-16T08:00:00Z",
				"name": "twitter",
				"views": 10
			},
			{
				"dateUTC": "2016-07-16T08:00:00Z",
				"name": "user_newsvarter",
				"views": 76
			},
			{
				"dateUTC": "2016-07-16T08:00:00Z",
				"name": "user_email",
				"views": 88
			},
			{
				"dateUTC": "2016-07-16T08:00:00Z",
				"name": "unknown",
				"views": 9
			},
			{
				"dateUTC": "2016-07-17T08:00:00Z",
				"name": "google",
				"views": 70
			},
			{
				"dateUTC": "2016-07-17T08:00:00Z",
				"name": "facebook",
				"views": 48
			},
			{
				"dateUTC": "2016-07-17T08:00:00Z",
				"name": "twitter",
				"views": 1
			},
			{
				"dateUTC": "2016-07-17T08:00:00Z",
				"name": "user_newsvarter",
				"views": 20
			},
			{
				"dateUTC": "2016-07-17T08:00:00Z",
				"name": "user_email",
				"views": 77
			},
			{
				"dateUTC": "2016-07-17T08:00:00Z",
				"name": "unknown",
				"views": 34
			},
			{
				"dateUTC": "2016-07-18T08:00:00Z",
				"name": "google",
				"views": 61
			},
			{
				"dateUTC": "2016-07-18T08:00:00Z",
				"name": "facebook",
				"views": 7
			},
			{
				"dateUTC": "2016-07-18T08:00:00Z",
				"name": "twitter",
				"views": 34
			},
			{
				"dateUTC": "2016-07-18T08:00:00Z",
				"name": "user_newsvarter",
				"views": 82
			},
			{
				"dateUTC": "2016-07-18T08:00:00Z",
				"name": "user_email",
				"views": 61
			},
			{
				"dateUTC": "2016-07-18T08:00:00Z",
				"name": "unknown",
				"views": 58
			},
			{
				"dateUTC": "2016-07-19T08:00:00Z",
				"name": "google",
				"views": 0
			},
			{
				"dateUTC": "2016-07-19T08:00:00Z",
				"name": "facebook",
				"views": 1
			},
			{
				"dateUTC": "2016-07-19T08:00:00Z",
				"name": "twitter",
				"views": 52
			},
			{
				"dateUTC": "2016-07-19T08:00:00Z",
				"name": "user_newsvarter",
				"views": 95
			},
			{
				"dateUTC": "2016-07-19T08:00:00Z",
				"name": "user_email",
				"views": 76
			},
			{
				"dateUTC": "2016-07-19T08:00:00Z",
				"name": "unknown",
				"views": 33
			},
			{
				"dateUTC": "2016-07-20T08:00:00Z",
				"name": "google",
				"views": 3
			},
			{
				"dateUTC": "2016-07-20T08:00:00Z",
				"name": "facebook",
				"views": 63
			},
			{
				"dateUTC": "2016-07-20T08:00:00Z",
				"name": "twitter",
				"views": 67
			},
			{
				"dateUTC": "2016-07-20T08:00:00Z",
				"name": "user_newsvarter",
				"views": 12
			},
			{
				"dateUTC": "2016-07-20T08:00:00Z",
				"name": "user_email",
				"views": 10
			},
			{
				"dateUTC": "2016-07-20T08:00:00Z",
				"name": "unknown",
				"views": 97
			},
			{
				"dateUTC": "2016-07-21T08:00:00Z",
				"name": "google",
				"views": 77
			},
			{
				"dateUTC": "2016-07-21T08:00:00Z",
				"name": "facebook",
				"views": 13
			},
			{
				"dateUTC": "2016-07-21T08:00:00Z",
				"name": "twitter",
				"views": 9
			},
			{
				"dateUTC": "2016-07-21T08:00:00Z",
				"name": "user_newsvarter",
				"views": 37
			},
			{
				"dateUTC": "2016-07-21T08:00:00Z",
				"name": "user_email",
				"views": 35
			},
			{
				"dateUTC": "2016-07-21T08:00:00Z",
				"name": "unknown",
				"views": 18
			},
			{
				"dateUTC": "2016-07-22T08:00:00Z",
				"name": "google",
				"views": 72
			},
			{
				"dateUTC": "2016-07-22T08:00:00Z",
				"name": "facebook",
				"views": 88
			},
			{
				"dateUTC": "2016-07-22T08:00:00Z",
				"name": "twitter",
				"views": 64
			},
			{
				"dateUTC": "2016-07-22T08:00:00Z",
				"name": "user_newsvarter",
				"views": 77
			},
			{
				"dateUTC": "2016-07-22T08:00:00Z",
				"name": "user_email",
				"views": 86
			},
			{
				"dateUTC": "2016-07-22T08:00:00Z",
				"name": "unknown",
				"views": 30
			},
			{
				"dateUTC": "2016-07-23T08:00:00Z",
				"name": "google",
				"views": 11
			},
			{
				"dateUTC": "2016-07-23T08:00:00Z",
				"name": "facebook",
				"views": 90
			},
			{
				"dateUTC": "2016-07-23T08:00:00Z",
				"name": "twitter",
				"views": 30
			},
			{
				"dateUTC": "2016-07-23T08:00:00Z",
				"name": "user_newsvarter",
				"views": 22
			},
			{
				"dateUTC": "2016-07-23T08:00:00Z",
				"name": "user_email",
				"views": 32
			},
			{
				"dateUTC": "2016-07-23T08:00:00Z",
				"name": "unknown",
				"views": 19
			},
			{
				"dateUTC": "2016-07-24T08:00:00Z",
				"name": "google",
				"views": 46
			},
			{
				"dateUTC": "2016-07-24T08:00:00Z",
				"name": "facebook",
				"views": 58
			},
			{
				"dateUTC": "2016-07-24T08:00:00Z",
				"name": "twitter",
				"views": 0
			},
			{
				"dateUTC": "2016-07-24T08:00:00Z",
				"name": "user_newsvarter",
				"views": 9
			},
			{
				"dateUTC": "2016-07-24T08:00:00Z",
				"name": "user_email",
				"views": 31
			},
			{
				"dateUTC": "2016-07-24T08:00:00Z",
				"name": "unknown",
				"views": 48
			},
			{
				"dateUTC": "2016-07-25T08:00:00Z",
				"name": "google",
				"views": 19
			},
			{
				"dateUTC": "2016-07-25T08:00:00Z",
				"name": "facebook",
				"views": 93
			},
			{
				"dateUTC": "2016-07-25T08:00:00Z",
				"name": "twitter",
				"views": 15
			},
			{
				"dateUTC": "2016-07-25T08:00:00Z",
				"name": "user_newsvarter",
				"views": 90
			},
			{
				"dateUTC": "2016-07-25T08:00:00Z",
				"name": "user_email",
				"views": 30
			},
			{
				"dateUTC": "2016-07-25T08:00:00Z",
				"name": "unknown",
				"views": 0
			},
			{
				"dateUTC": "2016-07-26T08:00:00Z",
				"name": "google",
				"views": 37
			},
			{
				"dateUTC": "2016-07-26T08:00:00Z",
				"name": "facebook",
				"views": 44
			},
			{
				"dateUTC": "2016-07-26T08:00:00Z",
				"name": "twitter",
				"views": 78
			},
			{
				"dateUTC": "2016-07-26T08:00:00Z",
				"name": "user_newsvarter",
				"views": 72
			},
			{
				"dateUTC": "2016-07-26T08:00:00Z",
				"name": "user_email",
				"views": 26
			},
			{
				"dateUTC": "2016-07-26T08:00:00Z",
				"name": "unknown",
				"views": 70
			},
			{
				"dateUTC": "2016-07-27T08:00:00Z",
				"name": "google",
				"views": 85
			},
			{
				"dateUTC": "2016-07-27T08:00:00Z",
				"name": "facebook",
				"views": 15
			},
			{
				"dateUTC": "2016-07-27T08:00:00Z",
				"name": "twitter",
				"views": 8
			},
			{
				"dateUTC": "2016-07-27T08:00:00Z",
				"name": "user_newsvarter",
				"views": 22
			},
			{
				"dateUTC": "2016-07-27T08:00:00Z",
				"name": "user_email",
				"views": 65
			},
			{
				"dateUTC": "2016-07-27T08:00:00Z",
				"name": "unknown",
				"views": 83
			},
			{
				"dateUTC": "2016-07-28T08:00:00Z",
				"name": "google",
				"views": 89
			},
			{
				"dateUTC": "2016-07-28T08:00:00Z",
				"name": "facebook",
				"views": 39
			},
			{
				"dateUTC": "2016-07-28T08:00:00Z",
				"name": "twitter",
				"views": 47
			},
			{
				"dateUTC": "2016-07-28T08:00:00Z",
				"name": "user_newsvarter",
				"views": 90
			},
			{
				"dateUTC": "2016-07-28T08:00:00Z",
				"name": "user_email",
				"views": 16
			},
			{
				"dateUTC": "2016-07-28T08:00:00Z",
				"name": "unknown",
				"views": 96
			},
			{
				"dateUTC": "2016-07-29T08:00:00Z",
				"name": "google",
				"views": 1
			},
			{
				"dateUTC": "2016-07-29T08:00:00Z",
				"name": "facebook",
				"views": 38
			},
			{
				"dateUTC": "2016-07-29T08:00:00Z",
				"name": "twitter",
				"views": 89
			},
			{
				"dateUTC": "2016-07-29T08:00:00Z",
				"name": "user_newsvarter",
				"views": 26
			},
			{
				"dateUTC": "2016-07-29T08:00:00Z",
				"name": "user_email",
				"views": 84
			},
			{
				"dateUTC": "2016-07-29T08:00:00Z",
				"name": "unknown",
				"views": 48
			},
			{
				"dateUTC": "2016-07-30T08:00:00Z",
				"name": "google",
				"views": 63
			},
			{
				"dateUTC": "2016-07-30T08:00:00Z",
				"name": "facebook",
				"views": 8
			},
			{
				"dateUTC": "2016-07-30T08:00:00Z",
				"name": "twitter",
				"views": 56
			},
			{
				"dateUTC": "2016-07-30T08:00:00Z",
				"name": "user_newsvarter",
				"views": 62
			},
			{
				"dateUTC": "2016-07-30T08:00:00Z",
				"name": "user_email",
				"views": 0
			},
			{
				"dateUTC": "2016-07-30T08:00:00Z",
				"name": "unknown",
				"views": 23
			},
			{
				"dateUTC": "2016-07-31T08:00:00Z",
				"name": "google",
				"views": 9
			},
			{
				"dateUTC": "2016-07-31T08:00:00Z",
				"name": "facebook",
				"views": 39
			},
			{
				"dateUTC": "2016-07-31T08:00:00Z",
				"name": "twitter",
				"views": 66
			},
			{
				"dateUTC": "2016-07-31T08:00:00Z",
				"name": "user_newsvarter",
				"views": 31
			},
			{
				"dateUTC": "2016-07-31T08:00:00Z",
				"name": "user_email",
				"views": 14
			},
			{
				"dateUTC": "2016-07-31T08:00:00Z",
				"name": "unknown",
				"views": 37
			},
			{
				"dateUTC": "2016-08-01T08:00:00Z",
				"name": "google",
				"views": 3
			},
			{
				"dateUTC": "2016-08-01T08:00:00Z",
				"name": "facebook",
				"views": 90
			},
			{
				"dateUTC": "2016-08-01T08:00:00Z",
				"name": "twitter",
				"views": 80
			},
			{
				"dateUTC": "2016-08-01T08:00:00Z",
				"name": "user_newsvarter",
				"views": 42
			},
			{
				"dateUTC": "2016-08-01T08:00:00Z",
				"name": "user_email",
				"views": 76
			},
			{
				"dateUTC": "2016-08-01T08:00:00Z",
				"name": "unknown",
				"views": 39
			},
			{
				"dateUTC": "2016-08-02T08:00:00Z",
				"name": "google",
				"views": 24
			},
			{
				"dateUTC": "2016-08-02T08:00:00Z",
				"name": "facebook",
				"views": 20
			},
			{
				"dateUTC": "2016-08-02T08:00:00Z",
				"name": "twitter",
				"views": 71
			},
			{
				"dateUTC": "2016-08-02T08:00:00Z",
				"name": "user_newsvarter",
				"views": 65
			},
			{
				"dateUTC": "2016-08-02T08:00:00Z",
				"name": "user_email",
				"views": 58
			},
			{
				"dateUTC": "2016-08-02T08:00:00Z",
				"name": "unknown",
				"views": 19
			},
			{
				"dateUTC": "2016-08-03T08:00:00Z",
				"name": "google",
				"views": 79
			},
			{
				"dateUTC": "2016-08-03T08:00:00Z",
				"name": "facebook",
				"views": 81
			},
			{
				"dateUTC": "2016-08-03T08:00:00Z",
				"name": "twitter",
				"views": 2
			},
			{
				"dateUTC": "2016-08-03T08:00:00Z",
				"name": "user_newsvarter",
				"views": 85
			},
			{
				"dateUTC": "2016-08-03T08:00:00Z",
				"name": "user_email",
				"views": 56
			},
			{
				"dateUTC": "2016-08-03T08:00:00Z",
				"name": "unknown",
				"views": 65
			},
			{
				"dateUTC": "2016-08-04T08:00:00Z",
				"name": "google",
				"views": 85
			},
			{
				"dateUTC": "2016-08-04T08:00:00Z",
				"name": "facebook",
				"views": 65
			},
			{
				"dateUTC": "2016-08-04T08:00:00Z",
				"name": "twitter",
				"views": 24
			},
			{
				"dateUTC": "2016-08-04T08:00:00Z",
				"name": "user_newsvarter",
				"views": 80
			},
			{
				"dateUTC": "2016-08-04T08:00:00Z",
				"name": "user_email",
				"views": 47
			},
			{
				"dateUTC": "2016-08-04T08:00:00Z",
				"name": "unknown",
				"views": 49
			},
			{
				"dateUTC": "2016-08-05T08:00:00Z",
				"name": "google",
				"views": 38
			},
			{
				"dateUTC": "2016-08-05T08:00:00Z",
				"name": "facebook",
				"views": 5
			},
			{
				"dateUTC": "2016-08-05T08:00:00Z",
				"name": "twitter",
				"views": 94
			},
			{
				"dateUTC": "2016-08-05T08:00:00Z",
				"name": "user_newsvarter",
				"views": 65
			},
			{
				"dateUTC": "2016-08-05T08:00:00Z",
				"name": "user_email",
				"views": 76
			},
			{
				"dateUTC": "2016-08-05T08:00:00Z",
				"name": "unknown",
				"views": 73
			},
			{
				"dateUTC": "2016-08-06T08:00:00Z",
				"name": "google",
				"views": 88
			},
			{
				"dateUTC": "2016-08-06T08:00:00Z",
				"name": "facebook",
				"views": 66
			},
			{
				"dateUTC": "2016-08-06T08:00:00Z",
				"name": "twitter",
				"views": 18
			},
			{
				"dateUTC": "2016-08-06T08:00:00Z",
				"name": "user_newsvarter",
				"views": 74
			},
			{
				"dateUTC": "2016-08-06T08:00:00Z",
				"name": "user_email",
				"views": 58
			},
			{
				"dateUTC": "2016-08-06T08:00:00Z",
				"name": "unknown",
				"views": 18
			},
			{
				"dateUTC": "2016-08-07T08:00:00Z",
				"name": "google",
				"views": 72
			},
			{
				"dateUTC": "2016-08-07T08:00:00Z",
				"name": "facebook",
				"views": 95
			},
			{
				"dateUTC": "2016-08-07T08:00:00Z",
				"name": "twitter",
				"views": 62
			},
			{
				"dateUTC": "2016-08-07T08:00:00Z",
				"name": "user_newsvarter",
				"views": 24
			},
			{
				"dateUTC": "2016-08-07T08:00:00Z",
				"name": "user_email",
				"views": 25
			},
			{
				"dateUTC": "2016-08-07T08:00:00Z",
				"name": "unknown",
				"views": 74
			},
			{
				"dateUTC": "2016-08-08T08:00:00Z",
				"name": "google",
				"views": 78
			},
			{
				"dateUTC": "2016-08-08T08:00:00Z",
				"name": "facebook",
				"views": 5
			},
			{
				"dateUTC": "2016-08-08T08:00:00Z",
				"name": "twitter",
				"views": 12
			},
			{
				"dateUTC": "2016-08-08T08:00:00Z",
				"name": "user_newsvarter",
				"views": 95
			},
			{
				"dateUTC": "2016-08-08T08:00:00Z",
				"name": "user_email",
				"views": 19
			},
			{
				"dateUTC": "2016-08-08T08:00:00Z",
				"name": "unknown",
				"views": 35
			},
			{
				"dateUTC": "2016-08-09T08:00:00Z",
				"name": "google",
				"views": 92
			},
			{
				"dateUTC": "2016-08-09T08:00:00Z",
				"name": "facebook",
				"views": 81
			},
			{
				"dateUTC": "2016-08-09T08:00:00Z",
				"name": "twitter",
				"views": 93
			},
			{
				"dateUTC": "2016-08-09T08:00:00Z",
				"name": "user_newsvarter",
				"views": 98
			},
			{
				"dateUTC": "2016-08-09T08:00:00Z",
				"name": "user_email",
				"views": 25
			},
			{
				"dateUTC": "2016-08-09T08:00:00Z",
				"name": "unknown",
				"views": 23
			},
			{
				"dateUTC": "2016-08-10T08:00:00Z",
				"name": "google",
				"views": 94
			},
			{
				"dateUTC": "2016-08-10T08:00:00Z",
				"name": "facebook",
				"views": 12
			},
			{
				"dateUTC": "2016-08-10T08:00:00Z",
				"name": "twitter",
				"views": 53
			},
			{
				"dateUTC": "2016-08-10T08:00:00Z",
				"name": "user_newsvarter",
				"views": 39
			},
			{
				"dateUTC": "2016-08-10T08:00:00Z",
				"name": "user_email",
				"views": 61
			},
			{
				"dateUTC": "2016-08-10T08:00:00Z",
				"name": "unknown",
				"views": 63
			},
			{
				"dateUTC": "2016-08-11T08:00:00Z",
				"name": "google",
				"views": 5
			},
			{
				"dateUTC": "2016-08-11T08:00:00Z",
				"name": "facebook",
				"views": 25
			},
			{
				"dateUTC": "2016-08-11T08:00:00Z",
				"name": "twitter",
				"views": 92
			},
			{
				"dateUTC": "2016-08-11T08:00:00Z",
				"name": "user_newsvarter",
				"views": 96
			},
			{
				"dateUTC": "2016-08-11T08:00:00Z",
				"name": "user_email",
				"views": 37
			},
			{
				"dateUTC": "2016-08-11T08:00:00Z",
				"name": "unknown",
				"views": 24
			},
			{
				"dateUTC": "2016-08-12T08:00:00Z",
				"name": "google",
				"views": 20
			},
			{
				"dateUTC": "2016-08-12T08:00:00Z",
				"name": "facebook",
				"views": 89
			},
			{
				"dateUTC": "2016-08-12T08:00:00Z",
				"name": "twitter",
				"views": 57
			},
			{
				"dateUTC": "2016-08-12T08:00:00Z",
				"name": "user_newsvarter",
				"views": 68
			},
			{
				"dateUTC": "2016-08-12T08:00:00Z",
				"name": "user_email",
				"views": 29
			},
			{
				"dateUTC": "2016-08-12T08:00:00Z",
				"name": "unknown",
				"views": 54
			},
			{
				"dateUTC": "2016-08-13T08:00:00Z",
				"name": "google",
				"views": 33
			},
			{
				"dateUTC": "2016-08-13T08:00:00Z",
				"name": "facebook",
				"views": 75
			},
			{
				"dateUTC": "2016-08-13T08:00:00Z",
				"name": "twitter",
				"views": 74
			},
			{
				"dateUTC": "2016-08-13T08:00:00Z",
				"name": "user_newsvarter",
				"views": 42
			},
			{
				"dateUTC": "2016-08-13T08:00:00Z",
				"name": "user_email",
				"views": 96
			},
			{
				"dateUTC": "2016-08-13T08:00:00Z",
				"name": "unknown",
				"views": 60
			},
			{
				"dateUTC": "2016-08-14T08:00:00Z",
				"name": "google",
				"views": 87
			},
			{
				"dateUTC": "2016-08-14T08:00:00Z",
				"name": "facebook",
				"views": 40
			},
			{
				"dateUTC": "2016-08-14T08:00:00Z",
				"name": "twitter",
				"views": 89
			},
			{
				"dateUTC": "2016-08-14T08:00:00Z",
				"name": "user_newsvarter",
				"views": 75
			},
			{
				"dateUTC": "2016-08-14T08:00:00Z",
				"name": "user_email",
				"views": 84
			},
			{
				"dateUTC": "2016-08-14T08:00:00Z",
				"name": "unknown",
				"views": 77
			},
			{
				"dateUTC": "2016-08-15T08:00:00Z",
				"name": "google",
				"views": 6
			},
			{
				"dateUTC": "2016-08-15T08:00:00Z",
				"name": "facebook",
				"views": 14
			},
			{
				"dateUTC": "2016-08-15T08:00:00Z",
				"name": "twitter",
				"views": 55
			},
			{
				"dateUTC": "2016-08-15T08:00:00Z",
				"name": "user_newsvarter",
				"views": 67
			},
			{
				"dateUTC": "2016-08-15T08:00:00Z",
				"name": "user_email",
				"views": 63
			},
			{
				"dateUTC": "2016-08-15T08:00:00Z",
				"name": "unknown",
				"views": 60
			},
			{
				"dateUTC": "2016-08-16T08:00:00Z",
				"name": "google",
				"views": 68
			},
			{
				"dateUTC": "2016-08-16T08:00:00Z",
				"name": "facebook",
				"views": 88
			},
			{
				"dateUTC": "2016-08-16T08:00:00Z",
				"name": "twitter",
				"views": 64
			},
			{
				"dateUTC": "2016-08-16T08:00:00Z",
				"name": "user_newsvarter",
				"views": 50
			},
			{
				"dateUTC": "2016-08-16T08:00:00Z",
				"name": "user_email",
				"views": 18
			},
			{
				"dateUTC": "2016-08-16T08:00:00Z",
				"name": "unknown",
				"views": 59
			},
			{
				"dateUTC": "2016-08-17T08:00:00Z",
				"name": "google",
				"views": 23
			},
			{
				"dateUTC": "2016-08-17T08:00:00Z",
				"name": "facebook",
				"views": 47
			},
			{
				"dateUTC": "2016-08-17T08:00:00Z",
				"name": "twitter",
				"views": 80
			},
			{
				"dateUTC": "2016-08-17T08:00:00Z",
				"name": "user_newsvarter",
				"views": 6
			},
			{
				"dateUTC": "2016-08-17T08:00:00Z",
				"name": "user_email",
				"views": 50
			},
			{
				"dateUTC": "2016-08-17T08:00:00Z",
				"name": "unknown",
				"views": 19
			},
			{
				"dateUTC": "2016-08-18T08:00:00Z",
				"name": "google",
				"views": 1
			},
			{
				"dateUTC": "2016-08-18T08:00:00Z",
				"name": "facebook",
				"views": 43
			},
			{
				"dateUTC": "2016-08-18T08:00:00Z",
				"name": "twitter",
				"views": 9
			},
			{
				"dateUTC": "2016-08-18T08:00:00Z",
				"name": "user_newsvarter",
				"views": 60
			},
			{
				"dateUTC": "2016-08-18T08:00:00Z",
				"name": "user_email",
				"views": 71
			},
			{
				"dateUTC": "2016-08-18T08:00:00Z",
				"name": "unknown",
				"views": 7
			},
			{
				"dateUTC": "2016-08-19T08:00:00Z",
				"name": "google",
				"views": 57
			},
			{
				"dateUTC": "2016-08-19T08:00:00Z",
				"name": "facebook",
				"views": 13
			},
			{
				"dateUTC": "2016-08-19T08:00:00Z",
				"name": "twitter",
				"views": 42
			},
			{
				"dateUTC": "2016-08-19T08:00:00Z",
				"name": "user_newsvarter",
				"views": 50
			},
			{
				"dateUTC": "2016-08-19T08:00:00Z",
				"name": "user_email",
				"views": 73
			},
			{
				"dateUTC": "2016-08-19T08:00:00Z",
				"name": "unknown",
				"views": 68
			},
			{
				"dateUTC": "2016-08-20T08:00:00Z",
				"name": "google",
				"views": 44
			},
			{
				"dateUTC": "2016-08-20T08:00:00Z",
				"name": "facebook",
				"views": 23
			},
			{
				"dateUTC": "2016-08-20T08:00:00Z",
				"name": "twitter",
				"views": 0
			},
			{
				"dateUTC": "2016-08-20T08:00:00Z",
				"name": "user_newsvarter",
				"views": 4
			},
			{
				"dateUTC": "2016-08-20T08:00:00Z",
				"name": "user_email",
				"views": 81
			},
			{
				"dateUTC": "2016-08-20T08:00:00Z",
				"name": "unknown",
				"views": 78
			},
			{
				"dateUTC": "2016-08-21T08:00:00Z",
				"name": "google",
				"views": 7
			},
			{
				"dateUTC": "2016-08-21T08:00:00Z",
				"name": "facebook",
				"views": 2
			},
			{
				"dateUTC": "2016-08-21T08:00:00Z",
				"name": "twitter",
				"views": 18
			},
			{
				"dateUTC": "2016-08-21T08:00:00Z",
				"name": "user_newsvarter",
				"views": 32
			},
			{
				"dateUTC": "2016-08-21T08:00:00Z",
				"name": "user_email",
				"views": 8
			},
			{
				"dateUTC": "2016-08-21T08:00:00Z",
				"name": "unknown",
				"views": 69
			},
			{
				"dateUTC": "2016-08-22T08:00:00Z",
				"name": "google",
				"views": 44
			},
			{
				"dateUTC": "2016-08-22T08:00:00Z",
				"name": "facebook",
				"views": 93
			},
			{
				"dateUTC": "2016-08-22T08:00:00Z",
				"name": "twitter",
				"views": 30
			},
			{
				"dateUTC": "2016-08-22T08:00:00Z",
				"name": "user_newsvarter",
				"views": 80
			},
			{
				"dateUTC": "2016-08-22T08:00:00Z",
				"name": "user_email",
				"views": 64
			},
			{
				"dateUTC": "2016-08-22T08:00:00Z",
				"name": "unknown",
				"views": 65
			},
			{
				"dateUTC": "2016-08-23T08:00:00Z",
				"name": "google",
				"views": 85
			},
			{
				"dateUTC": "2016-08-23T08:00:00Z",
				"name": "facebook",
				"views": 23
			},
			{
				"dateUTC": "2016-08-23T08:00:00Z",
				"name": "twitter",
				"views": 30
			},
			{
				"dateUTC": "2016-08-23T08:00:00Z",
				"name": "user_newsvarter",
				"views": 9
			},
			{
				"dateUTC": "2016-08-23T08:00:00Z",
				"name": "user_email",
				"views": 84
			},
			{
				"dateUTC": "2016-08-23T08:00:00Z",
				"name": "unknown",
				"views": 95
			},
			{
				"dateUTC": "2016-08-24T08:00:00Z",
				"name": "google",
				"views": 23
			},
			{
				"dateUTC": "2016-08-24T08:00:00Z",
				"name": "facebook",
				"views": 50
			},
			{
				"dateUTC": "2016-08-24T08:00:00Z",
				"name": "twitter",
				"views": 49
			},
			{
				"dateUTC": "2016-08-24T08:00:00Z",
				"name": "user_newsvarter",
				"views": 29
			},
			{
				"dateUTC": "2016-08-24T08:00:00Z",
				"name": "user_email",
				"views": 38
			},
			{
				"dateUTC": "2016-08-24T08:00:00Z",
				"name": "unknown",
				"views": 27
			},
			{
				"dateUTC": "2016-08-25T08:00:00Z",
				"name": "google",
				"views": 49
			},
			{
				"dateUTC": "2016-08-25T08:00:00Z",
				"name": "facebook",
				"views": 41
			},
			{
				"dateUTC": "2016-08-25T08:00:00Z",
				"name": "twitter",
				"views": 12
			},
			{
				"dateUTC": "2016-08-25T08:00:00Z",
				"name": "user_newsvarter",
				"views": 72
			},
			{
				"dateUTC": "2016-08-25T08:00:00Z",
				"name": "user_email",
				"views": 31
			},
			{
				"dateUTC": "2016-08-25T08:00:00Z",
				"name": "unknown",
				"views": 70
			},
			{
				"dateUTC": "2016-08-26T08:00:00Z",
				"name": "google",
				"views": 41
			},
			{
				"dateUTC": "2016-08-26T08:00:00Z",
				"name": "facebook",
				"views": 28
			},
			{
				"dateUTC": "2016-08-26T08:00:00Z",
				"name": "twitter",
				"views": 67
			},
			{
				"dateUTC": "2016-08-26T08:00:00Z",
				"name": "user_newsvarter",
				"views": 99
			},
			{
				"dateUTC": "2016-08-26T08:00:00Z",
				"name": "user_email",
				"views": 71
			},
			{
				"dateUTC": "2016-08-26T08:00:00Z",
				"name": "unknown",
				"views": 61
			},
			{
				"dateUTC": "2016-08-27T08:00:00Z",
				"name": "google",
				"views": 71
			},
			{
				"dateUTC": "2016-08-27T08:00:00Z",
				"name": "facebook",
				"views": 33
			},
			{
				"dateUTC": "2016-08-27T08:00:00Z",
				"name": "twitter",
				"views": 65
			},
			{
				"dateUTC": "2016-08-27T08:00:00Z",
				"name": "user_newsvarter",
				"views": 43
			},
			{
				"dateUTC": "2016-08-27T08:00:00Z",
				"name": "user_email",
				"views": 1
			},
			{
				"dateUTC": "2016-08-27T08:00:00Z",
				"name": "unknown",
				"views": 46
			},
			{
				"dateUTC": "2016-08-28T08:00:00Z",
				"name": "google",
				"views": 43
			},
			{
				"dateUTC": "2016-08-28T08:00:00Z",
				"name": "facebook",
				"views": 42
			},
			{
				"dateUTC": "2016-08-28T08:00:00Z",
				"name": "twitter",
				"views": 63
			},
			{
				"dateUTC": "2016-08-28T08:00:00Z",
				"name": "user_newsvarter",
				"views": 65
			},
			{
				"dateUTC": "2016-08-28T08:00:00Z",
				"name": "user_email",
				"views": 44
			},
			{
				"dateUTC": "2016-08-28T08:00:00Z",
				"name": "unknown",
				"views": 51
			},
			{
				"dateUTC": "2016-08-29T08:00:00Z",
				"name": "google",
				"views": 26
			},
			{
				"dateUTC": "2016-08-29T08:00:00Z",
				"name": "facebook",
				"views": 10
			},
			{
				"dateUTC": "2016-08-29T08:00:00Z",
				"name": "twitter",
				"views": 30
			},
			{
				"dateUTC": "2016-08-29T08:00:00Z",
				"name": "user_newsvarter",
				"views": 37
			},
			{
				"dateUTC": "2016-08-29T08:00:00Z",
				"name": "user_email",
				"views": 72
			},
			{
				"dateUTC": "2016-08-29T08:00:00Z",
				"name": "unknown",
				"views": 25
			},
			{
				"dateUTC": "2016-08-30T08:00:00Z",
				"name": "google",
				"views": 18
			},
			{
				"dateUTC": "2016-08-30T08:00:00Z",
				"name": "facebook",
				"views": 68
			},
			{
				"dateUTC": "2016-08-30T08:00:00Z",
				"name": "twitter",
				"views": 79
			},
			{
				"dateUTC": "2016-08-30T08:00:00Z",
				"name": "user_newsvarter",
				"views": 95
			},
			{
				"dateUTC": "2016-08-30T08:00:00Z",
				"name": "user_email",
				"views": 93
			},
			{
				"dateUTC": "2016-08-30T08:00:00Z",
				"name": "unknown",
				"views": 74
			},
			{
				"dateUTC": "2016-08-31T08:00:00Z",
				"name": "google",
				"views": 47
			},
			{
				"dateUTC": "2016-08-31T08:00:00Z",
				"name": "facebook",
				"views": 67
			},
			{
				"dateUTC": "2016-08-31T08:00:00Z",
				"name": "twitter",
				"views": 44
			},
			{
				"dateUTC": "2016-08-31T08:00:00Z",
				"name": "user_newsvarter",
				"views": 14
			},
			{
				"dateUTC": "2016-08-31T08:00:00Z",
				"name": "user_email",
				"views": 28
			},
			{
				"dateUTC": "2016-08-31T08:00:00Z",
				"name": "unknown",
				"views": 86
			},
			{
				"dateUTC": "2016-09-01T08:00:00Z",
				"name": "google",
				"views": 3
			},
			{
				"dateUTC": "2016-09-01T08:00:00Z",
				"name": "facebook",
				"views": 22
			},
			{
				"dateUTC": "2016-09-01T08:00:00Z",
				"name": "twitter",
				"views": 78
			},
			{
				"dateUTC": "2016-09-01T08:00:00Z",
				"name": "user_newsvarter",
				"views": 91
			},
			{
				"dateUTC": "2016-09-01T08:00:00Z",
				"name": "user_email",
				"views": 15
			},
			{
				"dateUTC": "2016-09-01T08:00:00Z",
				"name": "unknown",
				"views": 33
			},
			{
				"dateUTC": "2016-09-02T08:00:00Z",
				"name": "google",
				"views": 91
			},
			{
				"dateUTC": "2016-09-02T08:00:00Z",
				"name": "facebook",
				"views": 20
			},
			{
				"dateUTC": "2016-09-02T08:00:00Z",
				"name": "twitter",
				"views": 28
			},
			{
				"dateUTC": "2016-09-02T08:00:00Z",
				"name": "user_newsvarter",
				"views": 51
			},
			{
				"dateUTC": "2016-09-02T08:00:00Z",
				"name": "user_email",
				"views": 72
			},
			{
				"dateUTC": "2016-09-02T08:00:00Z",
				"name": "unknown",
				"views": 48
			},
			{
				"dateUTC": "2016-09-03T08:00:00Z",
				"name": "google",
				"views": 53
			},
			{
				"dateUTC": "2016-09-03T08:00:00Z",
				"name": "facebook",
				"views": 67
			},
			{
				"dateUTC": "2016-09-03T08:00:00Z",
				"name": "twitter",
				"views": 52
			},
			{
				"dateUTC": "2016-09-03T08:00:00Z",
				"name": "user_newsvarter",
				"views": 92
			},
			{
				"dateUTC": "2016-09-03T08:00:00Z",
				"name": "user_email",
				"views": 8
			},
			{
				"dateUTC": "2016-09-03T08:00:00Z",
				"name": "unknown",
				"views": 77
			},
			{
				"dateUTC": "2016-09-04T08:00:00Z",
				"name": "google",
				"views": 65
			},
			{
				"dateUTC": "2016-09-04T08:00:00Z",
				"name": "facebook",
				"views": 62
			},
			{
				"dateUTC": "2016-09-04T08:00:00Z",
				"name": "twitter",
				"views": 48
			},
			{
				"dateUTC": "2016-09-04T08:00:00Z",
				"name": "user_newsvarter",
				"views": 60
			},
			{
				"dateUTC": "2016-09-04T08:00:00Z",
				"name": "user_email",
				"views": 79
			},
			{
				"dateUTC": "2016-09-04T08:00:00Z",
				"name": "unknown",
				"views": 60
			},
			{
				"dateUTC": "2016-09-05T08:00:00Z",
				"name": "google",
				"views": 80
			},
			{
				"dateUTC": "2016-09-05T08:00:00Z",
				"name": "facebook",
				"views": 78
			},
			{
				"dateUTC": "2016-09-05T08:00:00Z",
				"name": "twitter",
				"views": 65
			},
			{
				"dateUTC": "2016-09-05T08:00:00Z",
				"name": "user_newsvarter",
				"views": 59
			},
			{
				"dateUTC": "2016-09-05T08:00:00Z",
				"name": "user_email",
				"views": 95
			},
			{
				"dateUTC": "2016-09-05T08:00:00Z",
				"name": "unknown",
				"views": 58
			},
			{
				"dateUTC": "2016-09-06T08:00:00Z",
				"name": "google",
				"views": 89
			},
			{
				"dateUTC": "2016-09-06T08:00:00Z",
				"name": "facebook",
				"views": 53
			},
			{
				"dateUTC": "2016-09-06T08:00:00Z",
				"name": "twitter",
				"views": 70
			},
			{
				"dateUTC": "2016-09-06T08:00:00Z",
				"name": "user_newsvarter",
				"views": 82
			},
			{
				"dateUTC": "2016-09-06T08:00:00Z",
				"name": "user_email",
				"views": 6
			},
			{
				"dateUTC": "2016-09-06T08:00:00Z",
				"name": "unknown",
				"views": 40
			},
			{
				"dateUTC": "2016-09-07T08:00:00Z",
				"name": "google",
				"views": 85
			},
			{
				"dateUTC": "2016-09-07T08:00:00Z",
				"name": "facebook",
				"views": 62
			},
			{
				"dateUTC": "2016-09-07T08:00:00Z",
				"name": "twitter",
				"views": 21
			},
			{
				"dateUTC": "2016-09-07T08:00:00Z",
				"name": "user_newsvarter",
				"views": 74
			},
			{
				"dateUTC": "2016-09-07T08:00:00Z",
				"name": "user_email",
				"views": 81
			},
			{
				"dateUTC": "2016-09-07T08:00:00Z",
				"name": "unknown",
				"views": 19
			},
			{
				"dateUTC": "2016-09-08T08:00:00Z",
				"name": "google",
				"views": 50
			},
			{
				"dateUTC": "2016-09-08T08:00:00Z",
				"name": "facebook",
				"views": 81
			},
			{
				"dateUTC": "2016-09-08T08:00:00Z",
				"name": "twitter",
				"views": 87
			},
			{
				"dateUTC": "2016-09-08T08:00:00Z",
				"name": "user_newsvarter",
				"views": 69
			},
			{
				"dateUTC": "2016-09-08T08:00:00Z",
				"name": "user_email",
				"views": 8
			},
			{
				"dateUTC": "2016-09-08T08:00:00Z",
				"name": "unknown",
				"views": 95
			},
			{
				"dateUTC": "2016-09-09T08:00:00Z",
				"name": "google",
				"views": 45
			},
			{
				"dateUTC": "2016-09-09T08:00:00Z",
				"name": "facebook",
				"views": 99
			},
			{
				"dateUTC": "2016-09-09T08:00:00Z",
				"name": "twitter",
				"views": 11
			},
			{
				"dateUTC": "2016-09-09T08:00:00Z",
				"name": "user_newsvarter",
				"views": 15
			},
			{
				"dateUTC": "2016-09-09T08:00:00Z",
				"name": "user_email",
				"views": 17
			},
			{
				"dateUTC": "2016-09-09T08:00:00Z",
				"name": "unknown",
				"views": 0
			},
			{
				"dateUTC": "2016-09-10T08:00:00Z",
				"name": "google",
				"views": 1
			},
			{
				"dateUTC": "2016-09-10T08:00:00Z",
				"name": "facebook",
				"views": 82
			},
			{
				"dateUTC": "2016-09-10T08:00:00Z",
				"name": "twitter",
				"views": 87
			},
			{
				"dateUTC": "2016-09-10T08:00:00Z",
				"name": "user_newsvarter",
				"views": 32
			},
			{
				"dateUTC": "2016-09-10T08:00:00Z",
				"name": "user_email",
				"views": 27
			},
			{
				"dateUTC": "2016-09-10T08:00:00Z",
				"name": "unknown",
				"views": 12
			},
			{
				"dateUTC": "2016-09-11T08:00:00Z",
				"name": "google",
				"views": 64
			},
			{
				"dateUTC": "2016-09-11T08:00:00Z",
				"name": "facebook",
				"views": 96
			},
			{
				"dateUTC": "2016-09-11T08:00:00Z",
				"name": "twitter",
				"views": 66
			},
			{
				"dateUTC": "2016-09-11T08:00:00Z",
				"name": "user_newsvarter",
				"views": 2
			},
			{
				"dateUTC": "2016-09-11T08:00:00Z",
				"name": "user_email",
				"views": 26
			},
			{
				"dateUTC": "2016-09-11T08:00:00Z",
				"name": "unknown",
				"views": 71
			},
			{
				"dateUTC": "2016-09-12T08:00:00Z",
				"name": "google",
				"views": 77
			},
			{
				"dateUTC": "2016-09-12T08:00:00Z",
				"name": "facebook",
				"views": 2
			},
			{
				"dateUTC": "2016-09-12T08:00:00Z",
				"name": "twitter",
				"views": 85
			},
			{
				"dateUTC": "2016-09-12T08:00:00Z",
				"name": "user_newsvarter",
				"views": 13
			},
			{
				"dateUTC": "2016-09-12T08:00:00Z",
				"name": "user_email",
				"views": 30
			},
			{
				"dateUTC": "2016-09-12T08:00:00Z",
				"name": "unknown",
				"views": 28
			},
			{
				"dateUTC": "2016-09-13T08:00:00Z",
				"name": "google",
				"views": 32
			},
			{
				"dateUTC": "2016-09-13T08:00:00Z",
				"name": "facebook",
				"views": 80
			},
			{
				"dateUTC": "2016-09-13T08:00:00Z",
				"name": "twitter",
				"views": 98
			},
			{
				"dateUTC": "2016-09-13T08:00:00Z",
				"name": "user_newsvarter",
				"views": 60
			},
			{
				"dateUTC": "2016-09-13T08:00:00Z",
				"name": "user_email",
				"views": 0
			},
			{
				"dateUTC": "2016-09-13T08:00:00Z",
				"name": "unknown",
				"views": 34
			},
			{
				"dateUTC": "2016-09-14T08:00:00Z",
				"name": "google",
				"views": 71
			},
			{
				"dateUTC": "2016-09-14T08:00:00Z",
				"name": "facebook",
				"views": 71
			},
			{
				"dateUTC": "2016-09-14T08:00:00Z",
				"name": "twitter",
				"views": 67
			},
			{
				"dateUTC": "2016-09-14T08:00:00Z",
				"name": "user_newsvarter",
				"views": 62
			},
			{
				"dateUTC": "2016-09-14T08:00:00Z",
				"name": "user_email",
				"views": 75
			},
			{
				"dateUTC": "2016-09-14T08:00:00Z",
				"name": "unknown",
				"views": 92
			},
			{
				"dateUTC": "2016-09-15T08:00:00Z",
				"name": "google",
				"views": 54
			},
			{
				"dateUTC": "2016-09-15T08:00:00Z",
				"name": "facebook",
				"views": 0
			},
			{
				"dateUTC": "2016-09-15T08:00:00Z",
				"name": "twitter",
				"views": 74
			},
			{
				"dateUTC": "2016-09-15T08:00:00Z",
				"name": "user_newsvarter",
				"views": 11
			},
			{
				"dateUTC": "2016-09-15T08:00:00Z",
				"name": "user_email",
				"views": 41
			},
			{
				"dateUTC": "2016-09-15T08:00:00Z",
				"name": "unknown",
				"views": 70
			},
			{
				"dateUTC": "2016-09-16T08:00:00Z",
				"name": "google",
				"views": 39
			},
			{
				"dateUTC": "2016-09-16T08:00:00Z",
				"name": "facebook",
				"views": 92
			},
			{
				"dateUTC": "2016-09-16T08:00:00Z",
				"name": "twitter",
				"views": 95
			},
			{
				"dateUTC": "2016-09-16T08:00:00Z",
				"name": "user_newsvarter",
				"views": 48
			},
			{
				"dateUTC": "2016-09-16T08:00:00Z",
				"name": "user_email",
				"views": 56
			},
			{
				"dateUTC": "2016-09-16T08:00:00Z",
				"name": "unknown",
				"views": 3
			},
			{
				"dateUTC": "2016-09-17T08:00:00Z",
				"name": "google",
				"views": 64
			},
			{
				"dateUTC": "2016-09-17T08:00:00Z",
				"name": "facebook",
				"views": 19
			},
			{
				"dateUTC": "2016-09-17T08:00:00Z",
				"name": "twitter",
				"views": 89
			},
			{
				"dateUTC": "2016-09-17T08:00:00Z",
				"name": "user_newsvarter",
				"views": 59
			},
			{
				"dateUTC": "2016-09-17T08:00:00Z",
				"name": "user_email",
				"views": 80
			},
			{
				"dateUTC": "2016-09-17T08:00:00Z",
				"name": "unknown",
				"views": 85
			},
			{
				"dateUTC": "2016-09-18T08:00:00Z",
				"name": "google",
				"views": 44
			},
			{
				"dateUTC": "2016-09-18T08:00:00Z",
				"name": "facebook",
				"views": 38
			},
			{
				"dateUTC": "2016-09-18T08:00:00Z",
				"name": "twitter",
				"views": 89
			},
			{
				"dateUTC": "2016-09-18T08:00:00Z",
				"name": "user_newsvarter",
				"views": 73
			},
			{
				"dateUTC": "2016-09-18T08:00:00Z",
				"name": "user_email",
				"views": 0
			},
			{
				"dateUTC": "2016-09-18T08:00:00Z",
				"name": "unknown",
				"views": 50
			},
			{
				"dateUTC": "2016-09-19T08:00:00Z",
				"name": "google",
				"views": 73
			},
			{
				"dateUTC": "2016-09-19T08:00:00Z",
				"name": "facebook",
				"views": 8
			},
			{
				"dateUTC": "2016-09-19T08:00:00Z",
				"name": "twitter",
				"views": 52
			},
			{
				"dateUTC": "2016-09-19T08:00:00Z",
				"name": "user_newsvarter",
				"views": 38
			},
			{
				"dateUTC": "2016-09-19T08:00:00Z",
				"name": "user_email",
				"views": 53
			},
			{
				"dateUTC": "2016-09-19T08:00:00Z",
				"name": "unknown",
				"views": 88
			},
			{
				"dateUTC": "2016-09-20T08:00:00Z",
				"name": "google",
				"views": 5
			},
			{
				"dateUTC": "2016-09-20T08:00:00Z",
				"name": "facebook",
				"views": 94
			},
			{
				"dateUTC": "2016-09-20T08:00:00Z",
				"name": "twitter",
				"views": 34
			},
			{
				"dateUTC": "2016-09-20T08:00:00Z",
				"name": "user_newsvarter",
				"views": 63
			},
			{
				"dateUTC": "2016-09-20T08:00:00Z",
				"name": "user_email",
				"views": 48
			},
			{
				"dateUTC": "2016-09-20T08:00:00Z",
				"name": "unknown",
				"views": 88
			},
			{
				"dateUTC": "2016-09-21T08:00:00Z",
				"name": "google",
				"views": 48
			},
			{
				"dateUTC": "2016-09-21T08:00:00Z",
				"name": "facebook",
				"views": 27
			},
			{
				"dateUTC": "2016-09-21T08:00:00Z",
				"name": "twitter",
				"views": 78
			},
			{
				"dateUTC": "2016-09-21T08:00:00Z",
				"name": "user_newsvarter",
				"views": 50
			},
			{
				"dateUTC": "2016-09-21T08:00:00Z",
				"name": "user_email",
				"views": 31
			},
			{
				"dateUTC": "2016-09-21T08:00:00Z",
				"name": "unknown",
				"views": 83
			},
			{
				"dateUTC": "2016-09-22T08:00:00Z",
				"name": "google",
				"views": 73
			},
			{
				"dateUTC": "2016-09-22T08:00:00Z",
				"name": "facebook",
				"views": 36
			},
			{
				"dateUTC": "2016-09-22T08:00:00Z",
				"name": "twitter",
				"views": 8
			},
			{
				"dateUTC": "2016-09-22T08:00:00Z",
				"name": "user_newsvarter",
				"views": 96
			},
			{
				"dateUTC": "2016-09-22T08:00:00Z",
				"name": "user_email",
				"views": 22
			},
			{
				"dateUTC": "2016-09-22T08:00:00Z",
				"name": "unknown",
				"views": 36
			},
			{
				"dateUTC": "2016-09-23T08:00:00Z",
				"name": "google",
				"views": 42
			},
			{
				"dateUTC": "2016-09-23T08:00:00Z",
				"name": "facebook",
				"views": 70
			},
			{
				"dateUTC": "2016-09-23T08:00:00Z",
				"name": "twitter",
				"views": 91
			},
			{
				"dateUTC": "2016-09-23T08:00:00Z",
				"name": "user_newsvarter",
				"views": 93
			},
			{
				"dateUTC": "2016-09-23T08:00:00Z",
				"name": "user_email",
				"views": 25
			},
			{
				"dateUTC": "2016-09-23T08:00:00Z",
				"name": "unknown",
				"views": 85
			},
			{
				"dateUTC": "2016-09-24T08:00:00Z",
				"name": "google",
				"views": 74
			},
			{
				"dateUTC": "2016-09-24T08:00:00Z",
				"name": "facebook",
				"views": 6
			},
			{
				"dateUTC": "2016-09-24T08:00:00Z",
				"name": "twitter",
				"views": 95
			},
			{
				"dateUTC": "2016-09-24T08:00:00Z",
				"name": "user_newsvarter",
				"views": 3
			},
			{
				"dateUTC": "2016-09-24T08:00:00Z",
				"name": "user_email",
				"views": 14
			},
			{
				"dateUTC": "2016-09-24T08:00:00Z",
				"name": "unknown",
				"views": 40
			},
			{
				"dateUTC": "2016-09-25T08:00:00Z",
				"name": "google",
				"views": 66
			},
			{
				"dateUTC": "2016-09-25T08:00:00Z",
				"name": "facebook",
				"views": 33
			},
			{
				"dateUTC": "2016-09-25T08:00:00Z",
				"name": "twitter",
				"views": 52
			},
			{
				"dateUTC": "2016-09-25T08:00:00Z",
				"name": "user_newsvarter",
				"views": 81
			},
			{
				"dateUTC": "2016-09-25T08:00:00Z",
				"name": "user_email",
				"views": 87
			},
			{
				"dateUTC": "2016-09-25T08:00:00Z",
				"name": "unknown",
				"views": 90
			},
			{
				"dateUTC": "2016-09-26T08:00:00Z",
				"name": "google",
				"views": 50
			},
			{
				"dateUTC": "2016-09-26T08:00:00Z",
				"name": "facebook",
				"views": 91
			},
			{
				"dateUTC": "2016-09-26T08:00:00Z",
				"name": "twitter",
				"views": 47
			},
			{
				"dateUTC": "2016-09-26T08:00:00Z",
				"name": "user_newsvarter",
				"views": 87
			},
			{
				"dateUTC": "2016-09-26T08:00:00Z",
				"name": "user_email",
				"views": 82
			},
			{
				"dateUTC": "2016-09-26T08:00:00Z",
				"name": "unknown",
				"views": 31
			},
			{
				"dateUTC": "2016-09-27T08:00:00Z",
				"name": "google",
				"views": 52
			},
			{
				"dateUTC": "2016-09-27T08:00:00Z",
				"name": "facebook",
				"views": 97
			},
			{
				"dateUTC": "2016-09-27T08:00:00Z",
				"name": "twitter",
				"views": 21
			},
			{
				"dateUTC": "2016-09-27T08:00:00Z",
				"name": "user_newsvarter",
				"views": 32
			},
			{
				"dateUTC": "2016-09-27T08:00:00Z",
				"name": "user_email",
				"views": 73
			},
			{
				"dateUTC": "2016-09-27T08:00:00Z",
				"name": "unknown",
				"views": 29
			},
			{
				"dateUTC": "2016-09-28T08:00:00Z",
				"name": "google",
				"views": 91
			},
			{
				"dateUTC": "2016-09-28T08:00:00Z",
				"name": "facebook",
				"views": 32
			},
			{
				"dateUTC": "2016-09-28T08:00:00Z",
				"name": "twitter",
				"views": 26
			},
			{
				"dateUTC": "2016-09-28T08:00:00Z",
				"name": "user_newsvarter",
				"views": 1
			},
			{
				"dateUTC": "2016-09-28T08:00:00Z",
				"name": "user_email",
				"views": 28
			},
			{
				"dateUTC": "2016-09-28T08:00:00Z",
				"name": "unknown",
				"views": 50
			},
			{
				"dateUTC": "2016-09-29T08:00:00Z",
				"name": "google",
				"views": 80
			},
			{
				"dateUTC": "2016-09-29T08:00:00Z",
				"name": "facebook",
				"views": 40
			},
			{
				"dateUTC": "2016-09-29T08:00:00Z",
				"name": "twitter",
				"views": 62
			},
			{
				"dateUTC": "2016-09-29T08:00:00Z",
				"name": "user_newsvarter",
				"views": 29
			},
			{
				"dateUTC": "2016-09-29T08:00:00Z",
				"name": "user_email",
				"views": 82
			},
			{
				"dateUTC": "2016-09-29T08:00:00Z",
				"name": "unknown",
				"views": 30
			},
			{
				"dateUTC": "2016-09-30T08:00:00Z",
				"name": "google",
				"views": 40
			},
			{
				"dateUTC": "2016-09-30T08:00:00Z",
				"name": "facebook",
				"views": 20
			},
			{
				"dateUTC": "2016-09-30T08:00:00Z",
				"name": "twitter",
				"views": 14
			},
			{
				"dateUTC": "2016-09-30T08:00:00Z",
				"name": "user_newsvarter",
				"views": 68
			},
			{
				"dateUTC": "2016-09-30T08:00:00Z",
				"name": "user_email",
				"views": 26
			},
			{
				"dateUTC": "2016-09-30T08:00:00Z",
				"name": "unknown",
				"views": 30
			},
			{
				"dateUTC": "2016-10-01T08:00:00Z",
				"name": "google",
				"views": 62
			},
			{
				"dateUTC": "2016-10-01T08:00:00Z",
				"name": "facebook",
				"views": 18
			},
			{
				"dateUTC": "2016-10-01T08:00:00Z",
				"name": "twitter",
				"views": 81
			},
			{
				"dateUTC": "2016-10-01T08:00:00Z",
				"name": "user_newsvarter",
				"views": 15
			},
			{
				"dateUTC": "2016-10-01T08:00:00Z",
				"name": "user_email",
				"views": 4
			},
			{
				"dateUTC": "2016-10-01T08:00:00Z",
				"name": "unknown",
				"views": 67
			},
			{
				"dateUTC": "2016-10-02T08:00:00Z",
				"name": "google",
				"views": 28
			},
			{
				"dateUTC": "2016-10-02T08:00:00Z",
				"name": "facebook",
				"views": 4
			},
			{
				"dateUTC": "2016-10-02T08:00:00Z",
				"name": "twitter",
				"views": 17
			},
			{
				"dateUTC": "2016-10-02T08:00:00Z",
				"name": "user_newsvarter",
				"views": 85
			},
			{
				"dateUTC": "2016-10-02T08:00:00Z",
				"name": "user_email",
				"views": 47
			},
			{
				"dateUTC": "2016-10-02T08:00:00Z",
				"name": "unknown",
				"views": 62
			},
			{
				"dateUTC": "2016-10-03T08:00:00Z",
				"name": "google",
				"views": 55
			},
			{
				"dateUTC": "2016-10-03T08:00:00Z",
				"name": "facebook",
				"views": 8
			},
			{
				"dateUTC": "2016-10-03T08:00:00Z",
				"name": "twitter",
				"views": 63
			},
			{
				"dateUTC": "2016-10-03T08:00:00Z",
				"name": "user_newsvarter",
				"views": 72
			},
			{
				"dateUTC": "2016-10-03T08:00:00Z",
				"name": "user_email",
				"views": 6
			},
			{
				"dateUTC": "2016-10-03T08:00:00Z",
				"name": "unknown",
				"views": 27
			},
			{
				"dateUTC": "2016-10-04T08:00:00Z",
				"name": "google",
				"views": 34
			},
			{
				"dateUTC": "2016-10-04T08:00:00Z",
				"name": "facebook",
				"views": 63
			},
			{
				"dateUTC": "2016-10-04T08:00:00Z",
				"name": "twitter",
				"views": 8
			},
			{
				"dateUTC": "2016-10-04T08:00:00Z",
				"name": "user_newsvarter",
				"views": 85
			},
			{
				"dateUTC": "2016-10-04T08:00:00Z",
				"name": "user_email",
				"views": 74
			},
			{
				"dateUTC": "2016-10-04T08:00:00Z",
				"name": "unknown",
				"views": 55
			},
			{
				"dateUTC": "2016-10-05T08:00:00Z",
				"name": "google",
				"views": 33
			},
			{
				"dateUTC": "2016-10-05T08:00:00Z",
				"name": "facebook",
				"views": 99
			},
			{
				"dateUTC": "2016-10-05T08:00:00Z",
				"name": "twitter",
				"views": 82
			},
			{
				"dateUTC": "2016-10-05T08:00:00Z",
				"name": "user_newsvarter",
				"views": 22
			},
			{
				"dateUTC": "2016-10-05T08:00:00Z",
				"name": "user_email",
				"views": 94
			},
			{
				"dateUTC": "2016-10-05T08:00:00Z",
				"name": "unknown",
				"views": 77
			},
			{
				"dateUTC": "2016-10-06T08:00:00Z",
				"name": "google",
				"views": 97
			},
			{
				"dateUTC": "2016-10-06T08:00:00Z",
				"name": "facebook",
				"views": 31
			},
			{
				"dateUTC": "2016-10-06T08:00:00Z",
				"name": "twitter",
				"views": 34
			},
			{
				"dateUTC": "2016-10-06T08:00:00Z",
				"name": "user_newsvarter",
				"views": 50
			},
			{
				"dateUTC": "2016-10-06T08:00:00Z",
				"name": "user_email",
				"views": 6
			},
			{
				"dateUTC": "2016-10-06T08:00:00Z",
				"name": "unknown",
				"views": 78
			},
			{
				"dateUTC": "2016-10-07T08:00:00Z",
				"name": "google",
				"views": 14
			},
			{
				"dateUTC": "2016-10-07T08:00:00Z",
				"name": "facebook",
				"views": 91
			},
			{
				"dateUTC": "2016-10-07T08:00:00Z",
				"name": "twitter",
				"views": 88
			},
			{
				"dateUTC": "2016-10-07T08:00:00Z",
				"name": "user_newsvarter",
				"views": 53
			},
			{
				"dateUTC": "2016-10-07T08:00:00Z",
				"name": "user_email",
				"views": 99
			},
			{
				"dateUTC": "2016-10-07T08:00:00Z",
				"name": "unknown",
				"views": 9
			},
			{
				"dateUTC": "2016-10-08T08:00:00Z",
				"name": "google",
				"views": 76
			},
			{
				"dateUTC": "2016-10-08T08:00:00Z",
				"name": "facebook",
				"views": 4
			},
			{
				"dateUTC": "2016-10-08T08:00:00Z",
				"name": "twitter",
				"views": 85
			},
			{
				"dateUTC": "2016-10-08T08:00:00Z",
				"name": "user_newsvarter",
				"views": 13
			},
			{
				"dateUTC": "2016-10-08T08:00:00Z",
				"name": "user_email",
				"views": 76
			},
			{
				"dateUTC": "2016-10-08T08:00:00Z",
				"name": "unknown",
				"views": 44
			},
			{
				"dateUTC": "2016-10-09T08:00:00Z",
				"name": "google",
				"views": 61
			},
			{
				"dateUTC": "2016-10-09T08:00:00Z",
				"name": "facebook",
				"views": 25
			},
			{
				"dateUTC": "2016-10-09T08:00:00Z",
				"name": "twitter",
				"views": 30
			},
			{
				"dateUTC": "2016-10-09T08:00:00Z",
				"name": "user_newsvarter",
				"views": 64
			},
			{
				"dateUTC": "2016-10-09T08:00:00Z",
				"name": "user_email",
				"views": 57
			},
			{
				"dateUTC": "2016-10-09T08:00:00Z",
				"name": "unknown",
				"views": 30
			},
			{
				"dateUTC": "2016-10-10T08:00:00Z",
				"name": "google",
				"views": 27
			},
			{
				"dateUTC": "2016-10-10T08:00:00Z",
				"name": "facebook",
				"views": 4
			},
			{
				"dateUTC": "2016-10-10T08:00:00Z",
				"name": "twitter",
				"views": 8
			},
			{
				"dateUTC": "2016-10-10T08:00:00Z",
				"name": "user_newsvarter",
				"views": 85
			},
			{
				"dateUTC": "2016-10-10T08:00:00Z",
				"name": "user_email",
				"views": 43
			},
			{
				"dateUTC": "2016-10-10T08:00:00Z",
				"name": "unknown",
				"views": 98
			},
			{
				"dateUTC": "2016-10-11T08:00:00Z",
				"name": "google",
				"views": 8
			},
			{
				"dateUTC": "2016-10-11T08:00:00Z",
				"name": "facebook",
				"views": 54
			},
			{
				"dateUTC": "2016-10-11T08:00:00Z",
				"name": "twitter",
				"views": 56
			},
			{
				"dateUTC": "2016-10-11T08:00:00Z",
				"name": "user_newsvarter",
				"views": 44
			},
			{
				"dateUTC": "2016-10-11T08:00:00Z",
				"name": "user_email",
				"views": 37
			},
			{
				"dateUTC": "2016-10-11T08:00:00Z",
				"name": "unknown",
				"views": 8
			},
			{
				"dateUTC": "2016-10-12T08:00:00Z",
				"name": "google",
				"views": 8
			},
			{
				"dateUTC": "2016-10-12T08:00:00Z",
				"name": "facebook",
				"views": 89
			},
			{
				"dateUTC": "2016-10-12T08:00:00Z",
				"name": "twitter",
				"views": 97
			},
			{
				"dateUTC": "2016-10-12T08:00:00Z",
				"name": "user_newsvarter",
				"views": 94
			},
			{
				"dateUTC": "2016-10-12T08:00:00Z",
				"name": "user_email",
				"views": 61
			},
			{
				"dateUTC": "2016-10-12T08:00:00Z",
				"name": "unknown",
				"views": 13
			},
			{
				"dateUTC": "2016-10-13T08:00:00Z",
				"name": "google",
				"views": 45
			},
			{
				"dateUTC": "2016-10-13T08:00:00Z",
				"name": "facebook",
				"views": 45
			},
			{
				"dateUTC": "2016-10-13T08:00:00Z",
				"name": "twitter",
				"views": 89
			},
			{
				"dateUTC": "2016-10-13T08:00:00Z",
				"name": "user_newsvarter",
				"views": 84
			},
			{
				"dateUTC": "2016-10-13T08:00:00Z",
				"name": "user_email",
				"views": 78
			},
			{
				"dateUTC": "2016-10-13T08:00:00Z",
				"name": "unknown",
				"views": 83
			},
			{
				"dateUTC": "2016-10-14T08:00:00Z",
				"name": "google",
				"views": 11
			},
			{
				"dateUTC": "2016-10-14T08:00:00Z",
				"name": "facebook",
				"views": 39
			},
			{
				"dateUTC": "2016-10-14T08:00:00Z",
				"name": "twitter",
				"views": 80
			},
			{
				"dateUTC": "2016-10-14T08:00:00Z",
				"name": "user_newsvarter",
				"views": 8
			},
			{
				"dateUTC": "2016-10-14T08:00:00Z",
				"name": "user_email",
				"views": 50
			},
			{
				"dateUTC": "2016-10-14T08:00:00Z",
				"name": "unknown",
				"views": 56
			},
			{
				"dateUTC": "2016-10-15T08:00:00Z",
				"name": "google",
				"views": 69
			},
			{
				"dateUTC": "2016-10-15T08:00:00Z",
				"name": "facebook",
				"views": 27
			},
			{
				"dateUTC": "2016-10-15T08:00:00Z",
				"name": "twitter",
				"views": 42
			},
			{
				"dateUTC": "2016-10-15T08:00:00Z",
				"name": "user_newsvarter",
				"views": 9
			},
			{
				"dateUTC": "2016-10-15T08:00:00Z",
				"name": "user_email",
				"views": 30
			},
			{
				"dateUTC": "2016-10-15T08:00:00Z",
				"name": "unknown",
				"views": 43
			},
			{
				"dateUTC": "2016-10-16T08:00:00Z",
				"name": "google",
				"views": 29
			},
			{
				"dateUTC": "2016-10-16T08:00:00Z",
				"name": "facebook",
				"views": 86
			},
			{
				"dateUTC": "2016-10-16T08:00:00Z",
				"name": "twitter",
				"views": 27
			},
			{
				"dateUTC": "2016-10-16T08:00:00Z",
				"name": "user_newsvarter",
				"views": 35
			},
			{
				"dateUTC": "2016-10-16T08:00:00Z",
				"name": "user_email",
				"views": 3
			},
			{
				"dateUTC": "2016-10-16T08:00:00Z",
				"name": "unknown",
				"views": 77
			},
			{
				"dateUTC": "2016-10-17T08:00:00Z",
				"name": "google",
				"views": 39
			},
			{
				"dateUTC": "2016-10-17T08:00:00Z",
				"name": "facebook",
				"views": 92
			},
			{
				"dateUTC": "2016-10-17T08:00:00Z",
				"name": "twitter",
				"views": 30
			},
			{
				"dateUTC": "2016-10-17T08:00:00Z",
				"name": "user_newsvarter",
				"views": 97
			},
			{
				"dateUTC": "2016-10-17T08:00:00Z",
				"name": "user_email",
				"views": 75
			},
			{
				"dateUTC": "2016-10-17T08:00:00Z",
				"name": "unknown",
				"views": 30
			},
			{
				"dateUTC": "2016-10-18T08:00:00Z",
				"name": "google",
				"views": 32
			},
			{
				"dateUTC": "2016-10-18T08:00:00Z",
				"name": "facebook",
				"views": 67
			},
			{
				"dateUTC": "2016-10-18T08:00:00Z",
				"name": "twitter",
				"views": 75
			},
			{
				"dateUTC": "2016-10-18T08:00:00Z",
				"name": "user_newsvarter",
				"views": 99
			},
			{
				"dateUTC": "2016-10-18T08:00:00Z",
				"name": "user_email",
				"views": 92
			},
			{
				"dateUTC": "2016-10-18T08:00:00Z",
				"name": "unknown",
				"views": 66
			},
			{
				"dateUTC": "2016-10-19T08:00:00Z",
				"name": "google",
				"views": 29
			},
			{
				"dateUTC": "2016-10-19T08:00:00Z",
				"name": "facebook",
				"views": 64
			},
			{
				"dateUTC": "2016-10-19T08:00:00Z",
				"name": "twitter",
				"views": 92
			},
			{
				"dateUTC": "2016-10-19T08:00:00Z",
				"name": "user_newsvarter",
				"views": 23
			},
			{
				"dateUTC": "2016-10-19T08:00:00Z",
				"name": "user_email",
				"views": 25
			},
			{
				"dateUTC": "2016-10-19T08:00:00Z",
				"name": "unknown",
				"views": 40
			},
			{
				"dateUTC": "2016-10-20T08:00:00Z",
				"name": "google",
				"views": 41
			},
			{
				"dateUTC": "2016-10-20T08:00:00Z",
				"name": "facebook",
				"views": 23
			},
			{
				"dateUTC": "2016-10-20T08:00:00Z",
				"name": "twitter",
				"views": 19
			},
			{
				"dateUTC": "2016-10-20T08:00:00Z",
				"name": "user_newsvarter",
				"views": 13
			},
			{
				"dateUTC": "2016-10-20T08:00:00Z",
				"name": "user_email",
				"views": 32
			},
			{
				"dateUTC": "2016-10-20T08:00:00Z",
				"name": "unknown",
				"views": 42
			},
			{
				"dateUTC": "2016-10-21T08:00:00Z",
				"name": "google",
				"views": 20
			},
			{
				"dateUTC": "2016-10-21T08:00:00Z",
				"name": "facebook",
				"views": 85
			},
			{
				"dateUTC": "2016-10-21T08:00:00Z",
				"name": "twitter",
				"views": 27
			},
			{
				"dateUTC": "2016-10-21T08:00:00Z",
				"name": "user_newsvarter",
				"views": 38
			},
			{
				"dateUTC": "2016-10-21T08:00:00Z",
				"name": "user_email",
				"views": 54
			},
			{
				"dateUTC": "2016-10-21T08:00:00Z",
				"name": "unknown",
				"views": 42
			}
		]
	};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	
	    var d3Selection = __webpack_require__(4),
	        colors = __webpack_require__(7),
	        selectClass = 'form-control';
	
	    /**
	     * Creates a color schema selector
	     * @param  {String}   selectContainerSelector   CSS DOM selector for the select box root
	     * @param  {String}   chartSelector             CSS DOM selector of the chart to render
	     * @param  {Function} callback                  Optional callback to execute after color change
	     * @return {void}
	     */
	    function createColorSelector(selectContainerSelector, chartSelector, callback) {
	        var colorKeys = Object.keys(colors.colorSchemas);
	        var containerSelector = document.querySelector(selectContainerSelector);
	
	        if (!containerSelector) {
	            return;
	        }
	
	        // Create Select
	        var sel = document.createElement("select");
	        sel.className += ' ' + selectClass;
	
	        // And fill with options
	        colorKeys.forEach(function (key, i) {
	            var opt = document.createElement("option");
	
	            opt.value = key;
	            opt.text = colors.colorSchemasHuman[key];
	            sel.add(opt);
	        });
	
	        // Add it to the DOM
	        containerSelector.append(sel);
	
	        // Listen for changes
	        d3Selection.select(sel).on('change', function () {
	            // Get new color schema
	            var newSchema = colors.colorSchemas[this.value];
	
	            d3Selection.select(chartSelector).remove();
	
	            // Draw
	            if (callback) {
	                callback(newSchema);
	            }
	        });
	    }
	
	    return {
	        createColorSelector: createColorSelector
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var d3Selection = __webpack_require__(4),
	    PubSub = __webpack_require__(5),
	    bar = __webpack_require__(42),
	    miniTooltip = __webpack_require__(44),
	    colors = __webpack_require__(7),
	    dataBuilder = __webpack_require__(45);
	
	function createSimpleBarChart() {
	    var barChart = bar(),
	        testDataSet = new dataBuilder.BarDataBuilder(),
	        barContainer = d3Selection.select('.js-bar-chart-container'),
	        containerWidth = barContainer.node() ? barContainer.node().getBoundingClientRect().width : false,
	        dataset;
	
	    if (containerWidth) {
	        dataset = testDataSet.withLettersFrequency().build();
	
	        barChart.width(containerWidth).height(300);
	
	        barContainer.datum(dataset).call(barChart);
	    }
	}
	
	function createHorizontalBarChart() {
	    var barChart = bar(),
	        tooltip = miniTooltip(),
	        testDataSet = new dataBuilder.BarDataBuilder(),
	        barContainer = d3Selection.select('.js-horizontal-bar-chart-container'),
	        containerWidth = barContainer.node() ? barContainer.node().getBoundingClientRect().width : false,
	        tooltipContainer,
	        dataset;
	
	    if (containerWidth) {
	        dataset = testDataSet.withColors().build();
	
	        barChart.horizontal(true).isAnimated(true).margin({
	            left: 120,
	            right: 20,
	            top: 20,
	            bottom: 30
	        }).colorSchema(colors.colorSchemas.britechartsColorSchema).width(containerWidth).yAxisPaddingBetweenChart(30).height(300).percentageAxisToMaxRatio(1.3).on('customMouseOver', tooltip.show).on('customMouseMove', tooltip.update).on('customMouseOut', tooltip.hide);
	
	        barContainer.datum(dataset).call(barChart);
	
	        tooltipContainer = d3Selection.select('.js-horizontal-bar-chart-container .bar-chart .metadata-group');
	        tooltipContainer.datum([]).call(tooltip);
	    }
	}
	
	function createBarChartWithTooltip() {
	    var barChart = bar(),
	        tooltip = miniTooltip(),
	        testDataSet = new dataBuilder.BarDataBuilder(),
	        barContainer = d3Selection.select('.js-bar-chart-tooltip-container'),
	        containerWidth = barContainer.node() ? barContainer.node().getBoundingClientRect().width : false,
	        tooltipContainer,
	        dataset;
	
	    if (containerWidth) {
	        d3Selection.select('.js-download-button').on('click', function () {
	            barChart.exportChart('barchart.png', 'Britecharts Bar Chart');
	        });
	
	        dataset = testDataSet.withLettersFrequency().build();
	
	        barChart.width(containerWidth).height(300).isAnimated(true).usePercentage(true).on('customMouseOver', tooltip.show).on('customMouseMove', tooltip.update).on('customMouseOut', tooltip.hide);
	
	        barContainer.datum(dataset).call(barChart);
	
	        tooltipContainer = d3Selection.select('.bar-chart .metadata-group');
	        tooltipContainer.datum([]).call(tooltip);
	    }
	}
	
	// Show charts if container available
	if (d3Selection.select('.js-bar-chart-tooltip-container').node()) {
	    createBarChartWithTooltip();
	    createHorizontalBarChart();
	    createSimpleBarChart();
	
	    var redrawCharts = function redrawCharts() {
	        d3Selection.selectAll('.bar-chart').remove();
	
	        createBarChartWithTooltip();
	        createHorizontalBarChart();
	        createSimpleBarChart();
	    };
	
	    // Redraw charts on window resize
	    PubSub.subscribe('resize', redrawCharts);
	}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    'use strict';
	
	    var d3Array = __webpack_require__(9);
	    var d3Ease = __webpack_require__(13);
	    var d3Axis = __webpack_require__(10);
	    var d3Color = __webpack_require__(16);
	    var d3Dispatch = __webpack_require__(12);
	    var d3Format = __webpack_require__(17);
	    var d3Scale = __webpack_require__(14);
	    var d3Selection = __webpack_require__(4);
	    var d3Transition = __webpack_require__(22);
	
	    var textHelper = __webpack_require__(43);
	
	    var _require = __webpack_require__(25),
	        exportChart = _require.exportChart;
	
	    var colorHelper = __webpack_require__(7);
	
	    var PERCENTAGE_FORMAT = '%';
	    var NUMBER_FORMAT = ',f';
	
	    /**
	     * @typedef BarChartData
	     * @type {Object[]}
	     * @property {Number} value        Value of the group (required)
	     * @property {String} name         Name of the group (required)
	     *
	     * @example
	     * [
	     *     {
	     *         value: 1,
	     *         name: 'glittering'
	     *     },
	     *     {
	     *         value: 1,
	     *         name: 'luminous'
	     *     }
	     * ]
	     */
	
	    /**
	     * Bar Chart reusable API class that renders a
	     * simple and configurable bar chart.
	     *
	     * @module Bar
	     * @tutorial bar
	     * @requires d3-array, d3-axis, d3-dispatch, d3-scale, d3-selection
	     *
	     * @example
	     * var barChart = bar();
	     *
	     * barChart
	     *     .height(500)
	     *     .width(800);
	     *
	     * d3Selection.select('.css-selector')
	     *     .datum(dataset)
	     *     .call(barChart);
	     *
	     */
	    return function module() {
	
	        var margin = {
	            top: 20,
	            right: 20,
	            bottom: 30,
	            left: 40
	        },
	            width = 960,
	            height = 500,
	            data = void 0,
	            dataZeroed = void 0,
	            chartWidth = void 0,
	            chartHeight = void 0,
	            xScale = void 0,
	            yScale = void 0,
	            colorSchema = colorHelper.singleColors.aloeGreen,
	            colorList = void 0,
	            colorMap = void 0,
	            numOfVerticalTicks = 5,
	            numOfHorizontalTicks = 5,
	            percentageAxisToMaxRatio = 1,
	            enablePercentageLabels = false,
	            percentageLabelMargin = 7,
	            percentageLabelSize = 12,
	            horizontalLabelFormat = '.0%',
	            verticalLabelFormat = '.0f',
	            valueLabelFormat = NUMBER_FORMAT,
	            xAxis = void 0,
	            yAxis = void 0,
	            xAxisPadding = {
	            top: 0,
	            left: 0,
	            bottom: 0,
	            right: 0
	        },
	            yAxisPaddingBetweenChart = 10,
	            yAxisLineWrapLimit = 1,
	            horizontal = false,
	            svg = void 0,
	            isAnimated = false,
	            ease = d3Ease.easeQuadInOut,
	            animationDuration = 800,
	            interBarDelay = function interBarDelay(d, i) {
	            return 70 * i;
	        },
	            valueLabel = 'value',
	            nameLabel = 'name',
	            maskGridLines = void 0,
	            baseLine = void 0,
	
	
	        // Dispatcher object to broadcast the mouse events
	        // Ref: https://github.com/mbostock/d3/wiki/Internals#d3_dispatch
	        dispatcher = d3Dispatch.dispatch('customMouseOver', 'customMouseOut', 'customMouseMove'),
	
	
	        // extractors
	        getName = function getName(_ref) {
	            var name = _ref.name;
	            return name;
	        },
	            getValue = function getValue(_ref2) {
	            var value = _ref2.value;
	            return value;
	        },
	            _percentageLabelHorizontalX = function _percentageLabelHorizontalX(_ref3) {
	            var value = _ref3.value;
	            return xScale(value) + percentageLabelMargin;
	        },
	            _percentageLabelHorizontalY = function _percentageLabelHorizontalY(_ref4) {
	            var name = _ref4.name;
	            return yScale(name) + yScale.bandwidth() / 2 + percentageLabelSize * (3 / 8);
	        },
	            _percentageLabelVerticalX = function _percentageLabelVerticalX(_ref5) {
	            var name = _ref5.name;
	            return xScale(name);
	        },
	            _percentageLabelVerticalY = function _percentageLabelVerticalY(_ref6) {
	            var value = _ref6.value;
	            return yScale(value) - percentageLabelMargin;
	        },
	            _percentageLabelHorizontalFormatValue = function _percentageLabelHorizontalFormatValue(_ref7) {
	            var value = _ref7.value;
	            return d3Format.format(horizontalLabelFormat)(value);
	        },
	            _percentageLabelVerticalFormatValue = function _percentageLabelVerticalFormatValue(_ref8) {
	            var value = _ref8.value;
	            return d3Format.format(verticalLabelFormat)(parseFloat(value) * 100);
	        };
	
	        /**
	         * This function creates the graph using the selection as container
	         * @param  {D3Selection} _selection A d3 selection that represents
	         *                                  the container(s) where the chart(s) will be rendered
	         * @param {BarChartData} _data The data to attach and generate the chart
	         */
	        function exports(_selection) {
	            _selection.each(function (_data) {
	                chartWidth = width - margin.left - margin.right - yAxisPaddingBetweenChart * 1.2;
	                chartHeight = height - margin.top - margin.bottom;
	
	                var _cleanData = cleanData(_data);
	
	                data = _cleanData.data;
	                dataZeroed = _cleanData.dataZeroed;
	
	
	                buildScales();
	                buildAxis();
	                buildSVG(this);
	                drawGridLines();
	                drawBars();
	                drawAxis();
	                if (enablePercentageLabels) {
	                    drawPercentageLabels();
	                }
	            });
	        }
	
	        /**
	         * Creates the d3 x and y axis, setting orientations
	         * @private
	         */
	        function buildAxis() {
	            if (!horizontal) {
	                xAxis = d3Axis.axisBottom(xScale);
	
	                yAxis = d3Axis.axisLeft(yScale).ticks(numOfVerticalTicks, valueLabelFormat);
	            } else {
	                xAxis = d3Axis.axisBottom(xScale).ticks(numOfHorizontalTicks, valueLabelFormat).tickSizeInner([-chartHeight]);
	
	                yAxis = d3Axis.axisLeft(yScale);
	            }
	        }
	
	        /**
	         * Builds containers for the chart, the axis and a wrapper for all of them
	         * Also applies the Margin convention
	         * @private
	         */
	        function buildContainerGroups() {
	            var container = svg.append('g').classed('container-group', true).attr('transform', 'translate(' + (margin.left + yAxisPaddingBetweenChart) + ', ' + margin.top + ')');
	
	            container.append('g').classed('grid-lines-group', true);
	            container.append('g').classed('chart-group', true);
	            container.append('g').classed('x-axis-group axis', true);
	            container.append('g').attr('transform', 'translate(' + -1 * yAxisPaddingBetweenChart + ', 0)').classed('y-axis-group axis', true);
	            container.append('g').classed('metadata-group', true);
	        }
	
	        /**
	         * Creates the x and y scales of the graph
	         * @private
	         */
	        function buildScales() {
	            var percentageAxis = Math.min(percentageAxisToMaxRatio * d3Array.max(data, getValue));
	
	            if (!horizontal) {
	                xScale = d3Scale.scaleBand().domain(data.map(getName)).rangeRound([0, chartWidth]).padding(0.1);
	
	                yScale = d3Scale.scaleLinear().domain([0, percentageAxis]).rangeRound([chartHeight, 0]);
	            } else {
	                xScale = d3Scale.scaleLinear().domain([0, percentageAxis]).rangeRound([0, chartWidth]);
	
	                yScale = d3Scale.scaleBand().domain(data.map(getName)).rangeRound([chartHeight, 0]).padding(0.1);
	            }
	
	            colorList = data.map(function (d) {
	                return d;
	            }).reverse().map(function (_ref9, i) {
	                var name = _ref9.name;
	                return {
	                    name: name,
	                    color: colorSchema[i % colorSchema.length] };
	            });
	
	            colorMap = function colorMap(item) {
	                return colorList.filter(function (_ref10) {
	                    var name = _ref10.name;
	                    return name === item;
	                })[0].color;
	            };
	        }
	
	        /**
	         * Builds the SVG element that will contain the chart
	         * @param  {HTMLElement} container DOM element that will work as the container of the graph
	         * @private
	         */
	        function buildSVG(container) {
	            if (!svg) {
	                svg = d3Selection.select(container).append('svg').classed('britechart bar-chart', true);
	
	                buildContainerGroups();
	            }
	
	            svg.attr('width', width).attr('height', height);
	        }
	
	        /**
	         * Cleaning data adding the proper format
	         * @param  {BarChartData} originalData Data
	         * @private
	         */
	        function cleanData(originalData) {
	            var data = originalData.map(function (d) {
	                return {
	                    value: +d[valueLabel],
	                    name: String(d[nameLabel])
	                };
	            });
	            var dataZeroed = data.map(function (d) {
	                return {
	                    value: 0,
	                    name: String(d[nameLabel])
	                };
	            });
	
	            return { data: data, dataZeroed: dataZeroed };
	        }
	
	        /**
	         * Utility function that wraps a text into the given width
	         * @param  {D3Selection} text         Text to write
	         * @param  {Number} containerWidth
	         * @private
	         */
	        function wrapText(text, containerWidth) {
	            textHelper.wrapTextWithEllipses(text, containerWidth, 0, yAxisLineWrapLimit);
	        }
	
	        /**
	         * Draws the x and y axis on the svg object within their
	         * respective groups
	         * @private
	         */
	        function drawAxis() {
	            svg.select('.x-axis-group.axis').attr('transform', 'translate(0, ' + chartHeight + ')').call(xAxis);
	
	            svg.select('.y-axis-group.axis').call(yAxis);
	
	            svg.selectAll('.y-axis-group .tick text').call(wrapText, margin.left - yAxisPaddingBetweenChart);
	        }
	
	        /**
	         * Draws the bars along the x axis
	         * @param  {D3Selection} bars Selection of bars
	         * @return {void}
	         */
	        function drawHorizontalBars(bars) {
	            // Enter + Update
	            bars.enter().append('rect').classed('bar', true).attr('y', chartHeight).attr('x', 0).attr('height', yScale.bandwidth()).attr('width', function (_ref11) {
	                var value = _ref11.value;
	                return xScale(value);
	            }).attr('fill', function (_ref12) {
	                var name = _ref12.name;
	                return colorMap(name);
	            }).on('mouseover', function () {
	                dispatcher.call('customMouseOver', this);
	                d3Selection.select(this).attr('fill', function (_ref13) {
	                    var name = _ref13.name;
	                    return d3Color.color(colorMap(name)).darker();
	                });
	            }).on('mousemove', function (d) {
	                dispatcher.call('customMouseMove', this, d, d3Selection.mouse(this), [chartWidth, chartHeight]);
	            }).on('mouseout', function () {
	                dispatcher.call('customMouseOut', this);
	                d3Selection.select(this).attr('fill', function (_ref14) {
	                    var name = _ref14.name;
	                    return colorMap(name);
	                });
	            }).merge(bars).attr('x', 0).attr('y', function (_ref15) {
	                var name = _ref15.name;
	                return yScale(name);
	            }).attr('height', yScale.bandwidth()).attr('width', function (_ref16) {
	                var value = _ref16.value;
	                return xScale(value);
	            });
	        }
	
	        /**
	         * Draws and animates the bars along the x axis
	         * @param  {D3Selection} bars Selection of bars
	         * @return {void}
	         */
	        function drawAnimatedHorizontalBars(bars) {
	            // Enter + Update
	            bars.enter().append('rect').classed('bar', true).attr('x', 0).attr('y', chartHeight).attr('height', yScale.bandwidth()).attr('width', function (_ref17) {
	                var value = _ref17.value;
	                return xScale(value);
	            }).attr('fill', function (_ref18) {
	                var name = _ref18.name;
	                return colorMap(name);
	            }).on('mouseover', function () {
	                dispatcher.call('customMouseOver', this);
	                d3Selection.select(this).attr('fill', function (_ref19) {
	                    var name = _ref19.name;
	                    return d3Color.color(colorMap(name)).darker();
	                });
	            }).on('mousemove', function (d) {
	                dispatcher.call('customMouseMove', this, d, d3Selection.mouse(this), [chartWidth, chartHeight]);
	            }).on('mouseout', function () {
	                dispatcher.call('customMouseOut', this);
	                d3Selection.select(this).attr('fill', function (_ref20) {
	                    var name = _ref20.name;
	                    return colorMap(name);
	                });
	            });
	
	            bars.attr('x', 0).attr('y', function (_ref21) {
	                var name = _ref21.name;
	                return yScale(name);
	            }).attr('height', yScale.bandwidth()).transition().duration(animationDuration).delay(interBarDelay).ease(ease).attr('width', function (_ref22) {
	                var value = _ref22.value;
	                return xScale(value);
	            });
	        }
	
	        /**
	         * Draws and animates the bars along the y axis
	         * @param  {D3Selection} bars Selection of bars
	         * @return {void}
	         */
	        function drawAnimatedVerticalBars(bars) {
	            // Enter + Update
	            bars.enter().append('rect').classed('bar', true).attr('x', chartWidth).attr('y', function (_ref23) {
	                var value = _ref23.value;
	                return yScale(value);
	            }).attr('width', xScale.bandwidth()).attr('height', function (_ref24) {
	                var value = _ref24.value;
	                return chartHeight - yScale(value);
	            }).attr('fill', function (_ref25) {
	                var name = _ref25.name;
	                return colorMap(name);
	            }).on('mouseover', function () {
	                dispatcher.call('customMouseOver', this);
	                d3Selection.select(this).attr('fill', function (_ref26) {
	                    var name = _ref26.name;
	                    return d3Color.color(colorMap(name)).darker();
	                });
	            }).on('mousemove', function (d) {
	                dispatcher.call('customMouseMove', this, d, d3Selection.mouse(this), [chartWidth, chartHeight]);
	            }).on('mouseout', function () {
	                dispatcher.call('customMouseOut', this);
	                d3Selection.select(this).attr('fill', function (_ref27) {
	                    var name = _ref27.name;
	                    return colorMap(name);
	                });
	            }).merge(bars).attr('x', function (_ref28) {
	                var name = _ref28.name;
	                return xScale(name);
	            }).attr('width', xScale.bandwidth()).transition().duration(animationDuration).delay(interBarDelay).ease(ease).attr('y', function (_ref29) {
	                var value = _ref29.value;
	                return yScale(value);
	            }).attr('height', function (_ref30) {
	                var value = _ref30.value;
	                return chartHeight - yScale(value);
	            });
	        }
	
	        /**
	         * Draws the bars along the y axis
	         * @param  {D3Selection} bars Selection of bars
	         * @return {void}
	         */
	        function drawVerticalBars(bars) {
	            // Enter + Update
	            bars.enter().append('rect').classed('bar', true).attr('x', chartWidth).attr('y', function (_ref31) {
	                var value = _ref31.value;
	                return yScale(value);
	            }).attr('width', xScale.bandwidth()).attr('height', function (_ref32) {
	                var value = _ref32.value;
	                return chartHeight - yScale(value);
	            }).attr('fill', function (_ref33) {
	                var name = _ref33.name;
	                return colorMap(name);
	            }).on('mouseover', function () {
	                dispatcher.call('customMouseOver', this);
	                d3Selection.select(this).attr('fill', function (_ref34) {
	                    var name = _ref34.name;
	                    return d3Color.color(colorMap(name)).darker();
	                });
	            }).on('mousemove', function (d) {
	                dispatcher.call('customMouseMove', this, d, d3Selection.mouse(this), [chartWidth, chartHeight]);
	            }).on('mouseout', function () {
	                dispatcher.call('customMouseOut', this);
	                d3Selection.select(this).attr('fill', function (_ref35) {
	                    var name = _ref35.name;
	                    return colorMap(name);
	                });
	            }).merge(bars).attr('x', function (_ref36) {
	                var name = _ref36.name;
	                return xScale(name);
	            }).attr('y', function (_ref37) {
	                var value = _ref37.value;
	                return yScale(value);
	            }).attr('width', xScale.bandwidth()).attr('height', function (_ref38) {
	                var value = _ref38.value;
	                return chartHeight - yScale(value);
	            });
	        }
	
	        /**
	         * Draws percentage labels at the end of each bar
	         * @private
	         * @return {void}
	         */
	        function drawPercentageLabels() {
	            var labelXPosition = horizontal ? _percentageLabelHorizontalX : _percentageLabelVerticalX;
	            var labelYPosition = horizontal ? _percentageLabelHorizontalY : _percentageLabelVerticalY;
	            var text = horizontal ? _percentageLabelHorizontalFormatValue : _percentageLabelVerticalFormatValue;
	
	            var percentageLabels = svg.select('.metadata-group').append('g').classed('percentage-label-group', true).selectAll('text').data(data.reverse()).enter().append('text');
	
	            percentageLabels.classed('percentage-label', true).attr('x', labelXPosition).attr('y', labelYPosition).text(text).attr('font-size', percentageLabelSize + 'px');
	        }
	
	        /**
	         * Draws the bar elements within the chart group
	         * @private
	         */
	        function drawBars() {
	            var bars = void 0;
	
	            if (isAnimated) {
	                bars = svg.select('.chart-group').selectAll('.bar').data(dataZeroed);
	
	                if (!horizontal) {
	                    drawVerticalBars(bars);
	                } else {
	                    drawHorizontalBars(bars);
	                }
	
	                bars = svg.select('.chart-group').selectAll('.bar').data(data);
	
	                if (!horizontal) {
	                    drawAnimatedVerticalBars(bars);
	                } else {
	                    drawAnimatedHorizontalBars(bars);
	                }
	            } else {
	                bars = svg.select('.chart-group').selectAll('.bar').data(data);
	
	                if (!horizontal) {
	                    drawVerticalBars(bars);
	                } else {
	                    drawHorizontalBars(bars);
	                }
	            }
	
	            // Exit
	            bars.exit().transition().style('opacity', 0).remove();
	        }
	
	        /**
	         * Draws grid lines on the background of the chart
	         * @return void
	         */
	        function drawGridLines() {
	            if (!horizontal) {
	                drawVerticalGridLines();
	            } else {
	                drawHorizontalGridLines();
	            }
	        }
	
	        /**
	         * Draws the grid lines for an horizontal bar chart
	         * @return {void}
	         */
	        function drawHorizontalGridLines() {
	            maskGridLines = svg.select('.grid-lines-group').selectAll('line.vertical-grid-line').data(xScale.ticks(4)).enter().append('line').attr('class', 'vertical-grid-line').attr('y1', xAxisPadding.left).attr('y2', chartHeight).attr('x1', function (d) {
	                return xScale(d);
	            }).attr('x2', function (d) {
	                return xScale(d);
	            });
	
	            //draw a horizontal line to extend y-axis till the edges
	            baseLine = svg.select('.grid-lines-group').selectAll('line.extended-y-line').data([0]).enter().append('line').attr('class', 'extended-y-line').attr('y1', xAxisPadding.left).attr('y2', chartHeight).attr('x1', 0).attr('x2', 0);
	        }
	
	        /**
	         * Draws the grid lines for a vertical bar chart
	         * @return {void}
	         */
	        function drawVerticalGridLines() {
	            maskGridLines = svg.select('.grid-lines-group').selectAll('line.horizontal-grid-line').data(yScale.ticks(4)).enter().append('line').attr('class', 'horizontal-grid-line').attr('x1', xAxisPadding.left).attr('x2', chartWidth).attr('y1', function (d) {
	                return yScale(d);
	            }).attr('y2', function (d) {
	                return yScale(d);
	            });
	
	            //draw a horizontal line to extend x-axis till the edges
	            baseLine = svg.select('.grid-lines-group').selectAll('line.extended-x-line').data([0]).enter().append('line').attr('class', 'extended-x-line').attr('x1', xAxisPadding.left).attr('x2', chartWidth).attr('y1', height - margin.bottom - margin.top).attr('y2', height - margin.bottom - margin.top);
	        }
	
	        /**
	         * Chart exported to png and a download action is fired
	         * @public
	         */
	        exports.exportChart = function (filename) {
	            exportChart.call(exports, svg, filename);
	        };
	
	        /**
	         * Gets or Sets the height of the chart
	         * @param  {number} _x Desired width for the graph
	         * @return { height | module} Current height or Bar Chart module to chain calls
	         * @public
	         */
	        exports.height = function (_x) {
	            if (!arguments.length) {
	                return height;
	            }
	            height = _x;
	            return this;
	        };
	
	        /**
	         * Gets or Sets the margin of the chart
	         * @param  {object} _x Margin object to get/set
	         * @return { margin | module} Current margin or Bar Chart module to chain calls
	         * @public
	         */
	        exports.margin = function (_x) {
	            if (!arguments.length) {
	                return margin;
	            }
	            margin = _x;
	            return this;
	        };
	
	        /**
	         * Gets or Sets the width of the chart
	         * @param  {number} _x Desired width for the graph
	         * @return { width | module} Current width or Bar Chart module to chain calls
	         * @public
	         */
	        exports.width = function (_x) {
	            if (!arguments.length) {
	                return width;
	            }
	            width = _x;
	            return this;
	        };
	
	        /**
	         * Gets or Sets the horizontal direction of the chart
	         * @param  {number} _x Desired horizontal direction for the graph
	         * @return { horizontal | module} Current horizontal direction or Bar Chart module to chain calls
	         * @public
	         */
	        exports.horizontal = function (_x) {
	            if (!arguments.length) {
	                return horizontal;
	            }
	            horizontal = _x;
	            return this;
	        };
	
	        /**
	         * Gets or Sets the isAnimated property of the chart, making it to animate when render.
	         * By default this is 'false'
	         *
	         * @param  {Boolean} _x Desired animation flag
	         * @return { isAnimated | module} Current isAnimated flag or Chart module
	         * @public
	         */
	        exports.isAnimated = function (_x) {
	            if (!arguments.length) {
	                return isAnimated;
	            }
	            isAnimated = _x;
	
	            return this;
	        };
	
	        /**
	         * Exposes an 'on' method that acts as a bridge with the event dispatcher
	         * We are going to expose this events:
	         * customMouseOver, customMouseMove and customMouseOut
	         *
	         * @return {module} Bar Chart
	         * @public
	         */
	        exports.on = function () {
	            var value = dispatcher.on.apply(dispatcher, arguments);
	
	            return value === dispatcher ? exports : value;
	        };
	
	        /**
	         * Chart exported to png and a download action is fired
	         * @public
	         */
	        exports.exportChart = function (filename, title) {
	            exportChart.call(exports, svg, filename, title);
	        };
	
	        /**
	         * Gets or Sets the colorSchema of the chart
	         * @param  {String[]} _x Desired colorSchema for the graph
	         * @return { colorSchema | module} Current colorSchema or Chart module to chain calls
	         * @public
	         */
	        exports.colorSchema = function (_x) {
	            if (!arguments.length) {
	                return colorSchema;
	            }
	            colorSchema = _x;
	            return this;
	        };
	
	        /**
	         * Gets or Sets the valueLabelFormat to a percentage format if true (default false)
	         * @param  {boolean} _x     Should use percentage as value format
	         * @return { valueLabelFormat | module} Is percentage value format used or Chart module to chain calls
	         * @public
	         */
	        exports.usePercentage = function (_x) {
	            if (!arguments.length) {
	                return valueLabelFormat === PERCENTAGE_FORMAT;
	            }
	            if (_x) {
	                valueLabelFormat = PERCENTAGE_FORMAT;
	            } else {
	                valueLabelFormat = NUMBER_FORMAT;
	            }
	            return this;
	        };
	
	        /**
	         * Configurable extension of the x axis
	         * if your max point was 50% you might want to show x axis to 60%, pass 1.2
	         * @param  {number} _x ratio to max data point to add to the x axis
	         * @return { ratio | module} Current ratio or Bar Chart module to chain calls
	         * @public
	         */
	        exports.percentageAxisToMaxRatio = function (_x) {
	            if (!arguments.length) {
	                return percentageAxisToMaxRatio;
	            }
	            percentageAxisToMaxRatio = _x;
	            return this;
	        };
	
	        /**
	         * Default 10px. Offset between end of bar and start of the percentage bars
	         * @param  {number} _x percentage margin offset from end of bar
	         * @return {number | module}    Currnet offset or Bar Chart module to chain calls
	         */
	        exports.percentageLabelMargin = function (_x) {
	            if (!arguments.length) {
	                return percentageLabelMargin;
	            }
	            percentageLabelMargin = _x;
	            return this;
	        };
	
	        /**
	         * Default false. If true, adds percentage labels at the end of the bars
	         * @param  {Boolean} _x
	         * @return {Boolean | module}    Current value of enablePercentageLables or Bar Chart module to chain calls
	         */
	        exports.enablePercentageLabels = function (_x) {
	            if (!arguments.length) {
	                return enablePercentageLabels;
	            }
	            enablePercentageLabels = _x;
	            return this;
	        };
	
	        /**
	         * Default 10. Space between y axis and chart
	         * @param  {number} _x space between y axis and chart
	         * @return {number| module}    Current value of yAxisPaddingBetweenChart or Bar Chart module to chain calls
	         */
	        exports.yAxisPaddingBetweenChart = function (_x) {
	            if (!arguments.length) {
	                return yAxisPaddingBetweenChart;
	            }
	            yAxisPaddingBetweenChart = _x;
	            return this;
	        };
	
	        /**
	         * Gets or Sets the valueLabel of the chart
	         * @param  {Number} _x Desired valueLabel for the graph
	         * @return { valueLabel | module} Current valueLabel or Chart module to chain calls
	         * @public
	         */
	        exports.valueLabel = function (_x) {
	            if (!arguments.length) {
	                return valueLabel;
	            }
	            valueLabel = _x;
	            return this;
	        };
	
	        /**
	         * Gets or Sets the nameLabel of the chart
	         * @param  {Number} _x Desired nameLabel for the graph
	         * @return { nameLabel | module} Current nameLabel or Chart module to chain calls
	         * @public
	         */
	        exports.nameLabel = function (_x) {
	            if (!arguments.length) {
	                return nameLabel;
	            }
	            nameLabel = _x;
	            return this;
	        };
	
	        return exports;
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	
	    var d3Selection = __webpack_require__(4);
	
	    var wrapConfig = {
	        lineHeight: 1.2,
	        smallTextOffset: 10,
	        smallTextLineHeightRatio: 0.9,
	        smallTextRatio: 0.6,
	        valueClassName: 'value',
	        labelClassName: 'label'
	    };
	
	    var defaultTextSize = 12;
	    var defaultFontFace = 'Arial';
	
	    /**
	     * Wraps a selection of text within the available width
	     * @param  {Number} fontSize       Size of the base font
	     * @param  {Number} availableWidth Width of the container where the text needs to wrap on
	     * @param  {D3Selection} node      SVG text element that contains the text to wrap
	     *
	     * REF: http://bl.ocks.org/mbostock/7555321
	     * More discussions on https://github.com/mbostock/d3/issues/1642
	     * @return {void}
	     */
	    var wrapText = function wrapText(xOffset, fontSize, availableWidth, node, data, i) {
	        var text = d3Selection.select(node),
	            words = text.text().split(/\s+/).reverse(),
	            word = void 0,
	            line = [],
	            lineNumber = 0,
	            smallLineHeight = wrapConfig.lineHeight * wrapConfig.smallTextLineHeightRatio,
	            y = text.attr('y'),
	            dy = parseFloat(text.attr('dy')),
	            smallFontSize = fontSize * wrapConfig.smallTextRatio,
	            tspan = text.text(null).append('tspan').attr('x', xOffset).attr('y', y - 5).attr('dy', dy + 'em').classed(wrapConfig.valueClassName, true).style('font-size', fontSize + 'px');
	
	        tspan.text(words.pop());
	        tspan = text.append('tspan').classed(wrapConfig.labelClassName, true).attr('x', xOffset).attr('y', y + wrapConfig.smallTextOffset).attr('dy', ++lineNumber * smallLineHeight + dy + 'em').style('font-size', smallFontSize + 'px');
	
	        while (word = words.pop()) {
	            line.push(word);
	            tspan.text(line.join(' '));
	            if (tspan.node().getComputedTextLength() > availableWidth - 50) {
	                line.pop();
	                tspan.text(line.join(' '));
	                line = [word];
	                tspan = text.append('tspan').classed(wrapConfig.labelClassName, true).attr('x', xOffset).attr('y', y + wrapConfig.smallTextOffset).attr('dy', ++lineNumber * smallLineHeight + dy + 'em').text(word).style('font-size', smallFontSize + 'px');
	            }
	        }
	    };
	
	    /**
	     * Wraps a selection of text within the available width, also adds class .adjust-upwards
	     * to configure a y offset for entries with multiple rows
	     * @param  {D3Sekectuib} text       d3 text element
	     * @param  {Number} width           Width of the container where the text needs to wrap on
	     * @param  {Number} xpos            number passed to determine the x offset
	     * @param  {Number} limit           number of lines before an ellipses is added and the rest of the text is cut off
	     *
	     * REF: http://bl.ocks.org/mbostock/7555321
	     * More discussions on https://github.com/mbostock/d3/issues/1642
	     * @return {void}
	     */
	    var wrapTextWithEllipses = function wrapTextWithEllipses(text, width) {
	        var xpos = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	        var limit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2;
	
	
	        text.each(function () {
	            var words, word, line, lineNumber, lineHeight, y, dy, tspan;
	
	            text = d3Selection.select(this);
	
	            words = text.text().split(/\s+/).reverse();
	            line = [];
	            lineNumber = 0;
	            lineHeight = 1.2;
	            y = text.attr('y');
	            dy = parseFloat(text.attr('dy'));
	            tspan = text.text(null).append('tspan').attr('x', xpos).attr('y', y).attr('dy', dy + 'em');
	
	            while (word = words.pop()) {
	                line.push(word);
	                tspan.text(line.join(' '));
	
	                if (tspan.node().getComputedTextLength() > width) {
	                    line.pop();
	                    tspan.text(line.join(' '));
	
	                    if (lineNumber < limit - 1) {
	                        line = [word];
	                        tspan = text.append('tspan').attr('x', xpos).attr('y', y).attr('dy', ++lineNumber * lineHeight + dy + 'em').text(word);
	                        // if we need two lines for the text, move them both up to center them
	                        text.classed('adjust-upwards', true);
	                    } else {
	                        line.push('...');
	                        tspan.text(line.join(' '));
	                        break;
	                    }
	                }
	            }
	        });
	    };
	
	    /**
	     * Figures out an approximate of the text width by using a canvas element
	     * This avoids having to actually render the text to measure it from the DOM itself
	     * @param  {String} text     Text to measure
	     * @param  {Number} fontSize Fontsize (or default)
	     * @param  {String} fontFace Font familty (or default)
	     * @return {String}          Approximate font size of the text
	     */
	    var getTextWidth = function getTextWidth(text) {
	        var fontSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultTextSize;
	        var fontFace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultFontFace;
	
	        var a = document.createElement('canvas'),
	            b = a.getContext('2d');
	
	        b.font = fontSize + 'px ' + fontFace;
	
	        return b.measureText(text).width;
	    };
	
	    return {
	        getTextWidth: getTextWidth,
	        wrapText: wrapText,
	        wrapTextWithEllipses: wrapTextWithEllipses
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    'use strict';
	
	    var d3Array = __webpack_require__(9);
	    var d3Ease = __webpack_require__(13);
	    var d3Format = __webpack_require__(17);
	    var d3Selection = __webpack_require__(4);
	    var d3Transition = __webpack_require__(22);
	
	    /**
	     * Mini Tooltip Component reusable API class that renders a
	     * simple and configurable tooltip element for Britechart's
	     * bar and step chart.
	     *
	     * @module Mini-tooltip
	     * @tutorial bar
	     * @requires d3
	     *
	     * @example
	     * var barChart = line(),
	     *     miniTooltip = miniTooltip();
	     *
	     * barChart
	     *     .width(500)
	     *     .height(300)
	     *     .on('customMouseHover', miniTooltip.show)
	     *     .on('customMouseMove', miniTooltip.update)
	     *     .on('customMouseOut', miniTooltip.hide);
	     *
	     * d3Selection.select('.css-selector')
	     *     .datum(dataset)
	     *     .call(barChart);
	     *
	     * d3Selection.select('.metadata-group .mini-tooltip-container')
	     *     .datum([])
	     *     .call(miniTooltip);
	     *
	     */
	    return function module() {
	
	        var margin = {
	            top: 12,
	            right: 12,
	            bottom: 12,
	            left: 12
	        },
	            width = 100,
	            height = 100,
	
	
	        // Optional Title
	        title = '',
	
	
	        // Data Format
	        valueLabel = 'value',
	            nameLabel = 'name',
	
	
	        // Animations
	        mouseChaseDuration = 100,
	            ease = d3Ease.easeQuadInOut,
	
	
	        // tooltip
	        tooltipBackground = void 0,
	            backgroundBorderRadius = 1,
	            tooltipTextContainer = void 0,
	            tooltipOffset = {
	            y: 0,
	            x: 20
	        },
	
	
	        // Fonts
	        textSize = 14,
	            textLineHeight = 1.5,
	            valueTextSize = 27,
	            valueTextLineHeight = 1.18,
	
	
	        // Colors
	        bodyFillColor = '#FFFFFF',
	            borderStrokeColor = '#D2D6DF',
	            titleFillColor = '#666a73',
	            nameTextFillColor = '#666a73',
	            valueTextFillColor = '#45494E',
	            valueTextWeight = 200,
	
	
	        // formats
	        tooltipValueFormat = d3Format.format('.2f'),
	            chartWidth = void 0,
	            chartHeight = void 0,
	            svg = void 0;
	
	        /**
	         * This function creates the graph using the selection as container
	         * @param {D3Selection} _selection A d3 selection that represents
	         *                                  the container(s) where the chart(s) will be rendered
	         * @param {Array} _data The data to attach and generate the chart (usually an empty array)
	         */
	        function exports(_selection) {
	            _selection.each(function (_data) {
	                chartWidth = width - margin.left - margin.right;
	                chartHeight = height - margin.top - margin.bottom;
	
	                buildSVG(this);
	                drawTooltip();
	            });
	        }
	
	        /**
	         * Builds containers for the tooltip
	         * Also applies the Margin convention
	         * @private
	         */
	        function buildContainerGroups() {
	            var container = svg.append('g').classed('tooltip-container-group', true).attr('transform', 'translate( ' + margin.left + ', ' + margin.top + ')');
	
	            container.append('g').classed('tooltip-group', true);
	        }
	
	        /**
	         * Builds the SVG element that will contain the chart
	         * @param  {HTMLElement} container DOM element that will work as the container of the graph
	         * @private
	         */
	        function buildSVG(container) {
	            if (!svg) {
	                svg = d3Selection.select(container).append('g').classed('britechart britechart-mini-tooltip', true);
	
	                buildContainerGroups();
	            }
	            svg.transition().attr('width', width).attr('height', height);
	
	            // Hidden by default
	            exports.hide();
	        }
	
	        /**
	         * Draws the different elements of the Tooltip box
	         * @return void
	         */
	        function drawTooltip() {
	            tooltipTextContainer = svg.selectAll('.tooltip-group').append('g').classed('tooltip-text', true);
	
	            tooltipBackground = tooltipTextContainer.append('rect').classed('tooltip-background', true).attr('width', width).attr('height', height).attr('rx', backgroundBorderRadius).attr('ry', backgroundBorderRadius).attr('y', -margin.top).attr('x', -margin.left).style('fill', bodyFillColor).style('stroke', borderStrokeColor).style('stroke-width', 1).style('pointer-events', 'none').style('opacity', 0.9);
	        }
	
	        /**
	         * Figures out the max length of the tooltip lines
	         * @param  {D3Selection[]} texts    List of svg elements of each line
	         * @return {Number}                 Max size of the lines
	         */
	        function getMaxLengthLine() {
	            for (var _len = arguments.length, texts = Array(_len), _key = 0; _key < _len; _key++) {
	                texts[_key] = arguments[_key];
	            }
	
	            var textSizes = texts.filter(function (x) {
	                return !!x;
	            }).map(function (x) {
	                return x.node().getBBox().width;
	            });
	
	            return d3Array.max(textSizes);
	        }
	
	        /**
	         * Calculates the desired position for the tooltip
	         * @param  {Number} mouseX             Current horizontal mouse position
	         * @param  {Number} mouseY             Current vertical mouse position
	         * @param  {Number} parentChartWidth   Parent's chart width
	         * @param  {Number} parentChartHeight  Parent's chart height
	         * @return {Number[]}                  X and Y position
	         * @private
	         */
	        function getTooltipPosition(_ref, _ref2) {
	            var _ref4 = _slicedToArray(_ref, 2),
	                mouseX = _ref4[0],
	                mouseY = _ref4[1];
	
	            var _ref3 = _slicedToArray(_ref2, 2),
	                parentChartWidth = _ref3[0],
	                parentChartHeight = _ref3[1];
	
	            var tooltipX = void 0,
	                tooltipY = void 0;
	
	            if (hasEnoughHorizontalRoom(parentChartWidth, mouseX)) {
	                tooltipX = mouseX + tooltipOffset.x;
	            } else {
	                tooltipX = mouseX - chartWidth - tooltipOffset.x - margin.right;
	            }
	
	            if (hasEnoughVerticalRoom(parentChartHeight, mouseY)) {
	                tooltipY = mouseY + tooltipOffset.y;
	            } else {
	                tooltipY = mouseY - chartHeight - tooltipOffset.y - margin.bottom;
	            }
	
	            return [tooltipX, tooltipY];
	        }
	
	        /**
	         * Checks if the mouse is over the bounds of the parent chart
	         * @param  {Number}  chartWidth Parent's chart
	         * @param  {Number}  positionX  Mouse position
	         * @return {Boolean}            If the mouse position allows space for the tooltip
	         */
	        function hasEnoughHorizontalRoom(parentChartWidth, positionX) {
	            return parentChartWidth - margin.left - margin.right - chartWidth - positionX > 0;
	        }
	
	        /**
	         * Checks if the mouse is over the bounds of the parent chart
	         * @param  {Number}  chartWidth Parent's chart
	         * @param  {Number}  positionX  Mouse position
	         * @return {Boolean}            If the mouse position allows space for the tooltip
	         */
	        function hasEnoughVerticalRoom(parentChartHeight, positionY) {
	            return parentChartHeight - margin.top - margin.bottom - chartHeight - positionY > 0;
	        }
	
	        /**
	         * Hides the tooltip
	         * @return {void}
	         */
	        function hideTooltip() {
	            svg.style('display', 'none');
	        }
	
	        /**
	         * Shows the tooltip updating it's content
	         * @param  {Object} dataPoint Data point from the chart
	         * @return {void}
	         */
	        function showTooltip(dataPoint) {
	            updateContent(dataPoint);
	            svg.style('display', 'block');
	        }
	
	        /**
	         * Draws the data entries inside the tooltip for a given topic
	         * @param  {Object} topic Topic to extract data from
	         * @return void
	         */
	        function updateContent() {
	            var dataPoint = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	            var value = dataPoint[valueLabel] || '',
	                name = dataPoint[nameLabel] || '',
	                lineHeight = textSize * textLineHeight,
	                valueLineHeight = valueTextSize * valueTextLineHeight,
	                defaultDy = '1em',
	                temporalHeight = 0,
	                tooltipValue = void 0,
	                tooltipName = void 0,
	                tooltipTitle = void 0;
	
	            tooltipTextContainer.selectAll('text').remove();
	
	            if (title) {
	                tooltipTitle = tooltipTextContainer.append('text').classed('mini-tooltip-title', true).attr('dy', defaultDy).attr('y', 0).style('fill', titleFillColor).style('font-size', textSize).text(title);
	
	                temporalHeight = lineHeight + temporalHeight;
	            }
	
	            if (name) {
	                tooltipName = tooltipTextContainer.append('text').classed('mini-tooltip-name', true).attr('dy', defaultDy).attr('y', temporalHeight || 0).style('fill', nameTextFillColor).style('font-size', textSize).text(name);
	
	                temporalHeight = lineHeight + temporalHeight;
	            }
	
	            if (value) {
	                tooltipValue = tooltipTextContainer.append('text').classed('mini-tooltip-value', true).attr('dy', defaultDy).attr('y', temporalHeight || 0).style('fill', valueTextFillColor).style('font-size', valueTextSize).style('font-weight', valueTextWeight).text(tooltipValueFormat(value));
	
	                temporalHeight = valueLineHeight + temporalHeight;
	            }
	
	            chartWidth = getMaxLengthLine(tooltipName, tooltipTitle, tooltipValue);
	            chartHeight = temporalHeight;
	        }
	
	        /**
	         * Updates size and position of tooltip depending on the side of the chart we are in
	         * @param  {Object} dataPoint DataPoint of the tooltip
	         * @return void
	         */
	        function updatePositionAndSize(mousePosition, parentChartSize) {
	            var _getTooltipPosition = getTooltipPosition(mousePosition, parentChartSize),
	                _getTooltipPosition2 = _slicedToArray(_getTooltipPosition, 2),
	                tooltipX = _getTooltipPosition2[0],
	                tooltipY = _getTooltipPosition2[1];
	
	            svg.transition().duration(mouseChaseDuration).ease(ease).attr('height', chartHeight + margin.top + margin.bottom).attr('width', chartWidth + margin.left + margin.right).attr('transform', 'translate(' + tooltipX + ',' + tooltipY + ')');
	
	            tooltipBackground.attr('height', chartHeight + margin.top + margin.bottom).attr('width', chartWidth + margin.left + margin.right);
	        }
	
	        /**
	         * Updates tooltip content, size and position
	         *
	         * @param  {Object} dataPoint Current datapoint to show info about
	         * @return void
	         */
	        function updateTooltip(dataPoint, position, chartSize) {
	            updateContent(dataPoint);
	            updatePositionAndSize(position, chartSize);
	        }
	
	        /**
	         * Hides the tooltip
	         * @return {Module} Tooltip module to chain calls
	         * @public
	         */
	        exports.hide = function () {
	            hideTooltip();
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets data's nameLabel
	         * @param  {text} _x Desired nameLabel
	         * @return { text | module} nameLabel or Step Chart module to chain calls
	         * @public
	         */
	        exports.nameLabel = function (_x) {
	            if (!arguments.length) {
	                return nameLabel;
	            }
	            nameLabel = _x;
	            return this;
	        };
	
	        /**
	         * Shows the tooltip
	         * @return {Module} Tooltip module to chain calls
	         * @public
	         */
	        exports.show = function () {
	            showTooltip();
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the title of the tooltip
	         * @param  {string} _x Desired title
	         * @return { string | module} Current title or module to chain calls
	         * @public
	         */
	        exports.title = function (_x) {
	            if (!arguments.length) {
	                return title;
	            }
	            title = _x;
	            return this;
	        };
	
	        /**
	         * Updates the position and content of the tooltip
	         * @param  {Object} dataPoint       Datapoint of the hovered element
	         * @param  {Array} mousePosition    Mouse position relative to the parent chart [x, y]
	         * @param  {Array} chartSize        Parent chart size [x, y]
	         * @return {module}                 Current component
	         */
	        exports.update = function (dataPoint, mousePosition, chartSize) {
	            updateTooltip(dataPoint, mousePosition, chartSize);
	
	            return this;
	        };
	
	        return exports;
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    'use strict';
	
	    var _ = __webpack_require__(3),
	        jsonColors = __webpack_require__(46),
	        jsonLetters = __webpack_require__(47);
	
	    function BarDataBuilder(config) {
	        this.Klass = BarDataBuilder;
	
	        this.config = _.defaults({}, config);
	
	        this.withLettersFrequency = function () {
	            var attributes = _.extend({}, this.config, jsonLetters);
	
	            return new this.Klass(attributes);
	        };
	
	        this.withColors = function () {
	            var attributes = _.extend({}, this.config, jsonColors);
	
	            return new this.Klass(attributes);
	        };
	
	        /**
	         * Sets the path for fetching the data
	         * @param  {String} path Desired path for test data
	         * @return {BarDataBuilder}      Builder object
	         */
	        this.withPath = function (path) {
	            var attributes = _.extend({}, this.config, {
	                jsonURL: path
	            });
	
	            return new this.Klass(attributes);
	        };
	
	        this.build = function () {
	            return this.config.data;
	        };
	    }
	
	    return {
	        BarDataBuilder: BarDataBuilder
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 46 */
/***/ (function(module, exports) {

	module.exports = {
		"data": [
			{
				"name": "Radiating",
				"value": 2
			},
			{
				"name": "Opalescent",
				"value": 4
			},
			{
				"name": "Shining",
				"value": 3
			},
			{
				"name": "Vibrant",
				"value": 6
			},
			{
				"name": "Vivid",
				"value": 6
			},
			{
				"name": "Brilliant",
				"value": 1
			}
		]
	};

/***/ }),
/* 47 */
/***/ (function(module, exports) {

	module.exports = {
		"data": [
			{
				"name": "A",
				"value": 0.08167
			},
			{
				"name": "B",
				"value": 0.01492
			},
			{
				"name": "C",
				"value": 0.02782
			},
			{
				"name": "D",
				"value": 0.04253
			},
			{
				"name": "E",
				"value": 0.12702
			},
			{
				"name": "F",
				"value": 0.02288
			},
			{
				"name": "G",
				"value": 0.02015
			},
			{
				"name": "H",
				"value": 0.06094
			},
			{
				"name": "I",
				"value": 0.06966
			},
			{
				"name": "J",
				"value": 0.00153
			},
			{
				"name": "K",
				"value": 0.00772
			},
			{
				"name": "L",
				"value": 0.04025
			},
			{
				"name": "M",
				"value": 0.02406
			},
			{
				"name": "N",
				"value": 0.06749
			},
			{
				"name": "O",
				"value": 0.07507
			},
			{
				"name": "P",
				"value": 0.01929
			},
			{
				"name": "Q",
				"value": 0.00095
			},
			{
				"name": "R",
				"value": 0.05987
			},
			{
				"name": "S",
				"value": 0.06327
			},
			{
				"name": "T",
				"value": 0.09056
			},
			{
				"name": "U",
				"value": 0.02758
			},
			{
				"name": "V",
				"value": 0.00978
			},
			{
				"name": "W",
				"value": 0.0236
			},
			{
				"name": "X",
				"value": 0.0015
			},
			{
				"name": "Y",
				"value": 0.01974
			},
			{
				"name": "Z",
				"value": 0.00074
			}
		]
	};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var d3Selection = __webpack_require__(4),
	    PubSub = __webpack_require__(5),
	    donut = __webpack_require__(49),
	    legend = __webpack_require__(50),
	    dataBuilder = __webpack_require__(51),
	    colorSelectorHelper = __webpack_require__(40),
	    dataset = new dataBuilder.DonutDataBuilder().withFivePlusOther().build(),
	    legendChart;
	
	function createDonutChart(dataset, optionalColorSchema) {
	    var legendChart = getLegendChart(dataset, optionalColorSchema),
	        donutChart = donut(),
	        donutContainer = d3Selection.select('.js-donut-chart-container'),
	        containerWidth = donutContainer.node() ? donutContainer.node().getBoundingClientRect().width : false;
	
	    if (containerWidth) {
	        d3Selection.select('#button').on('click', function () {
	            donutChart.exportChart();
	        });
	
	        donutChart.isAnimated(true).highlightSliceById(2).width(containerWidth).height(containerWidth).externalRadius(containerWidth / 2.5).internalRadius(containerWidth / 5).on('customMouseOver', function (data) {
	            legendChart.highlight(data.data.id);
	        }).on('customMouseOut', function () {
	            legendChart.clearHighlight();
	        });
	
	        if (optionalColorSchema) {
	            donutChart.colorSchema(optionalColorSchema);
	        }
	
	        donutContainer.datum(dataset).call(donutChart);
	
	        d3Selection.select('#button').on('click', function () {
	            donutChart.exportChart('donut.png', 'Britecharts Donut Chart');
	        });
	    }
	}
	
	function getLegendChart(dataset, optionalColorSchema) {
	    var legendChart = legend(),
	        legendContainer = d3Selection.select('.js-legend-chart-container'),
	        containerWidth = legendContainer.node() ? legendContainer.node().getBoundingClientRect().width : false;
	
	    if (containerWidth) {
	        d3Selection.select('.js-legend-chart-container .britechart-legend').remove();
	
	        legendChart.width(containerWidth * 0.8).height(200);
	
	        if (optionalColorSchema) {
	            legendChart.colorSchema(optionalColorSchema);
	        }
	
	        legendContainer.datum(dataset).call(legendChart);
	
	        return legendChart;
	    }
	}
	
	function getInlineLegendChart(dataset, optionalColorSchema) {
	    var legendChart = legend(),
	        legendContainer = d3Selection.select('.js-inline-legend-chart-container'),
	        containerWidth = legendContainer.node() ? legendContainer.node().getBoundingClientRect().width : false;
	
	    if (containerWidth) {
	        d3Selection.select('.js-inline-legend-chart-container .britechart-legend').remove();
	
	        legendChart.horizontal(true).width(containerWidth * 0.6).markerSize(8).height(40);
	
	        if (optionalColorSchema) {
	            legendChart.colorSchema(optionalColorSchema);
	        }
	
	        legendContainer.datum(dataset).call(legendChart);
	
	        return legendChart;
	    }
	}
	
	function createSmallDonutChart() {
	    var donutChart = donut(),
	        donutContainer = d3Selection.select('.js-small-donut-chart-container'),
	        containerWidth = donutContainer.node() ? donutContainer.node().getBoundingClientRect().width : false,
	        dataset = new dataBuilder.DonutDataBuilder().withThreeCategories().build(),
	        legendChart = getInlineLegendChart(dataset);
	
	    if (containerWidth) {
	        donutChart.width(containerWidth).height(containerWidth / 1.8).externalRadius(containerWidth / 5).internalRadius(containerWidth / 10).on('customMouseOver', function (data) {
	            legendChart.highlight(data.data.id);
	        }).on('customMouseOut', function () {
	            legendChart.clearHighlight();
	        });
	
	        donutContainer.datum(dataset).call(donutChart);
	    }
	}
	
	function createDonutWithHighlightSliceChart() {
	    var donutChart = donut(),
	        donutContainer = d3Selection.select('.js-donut-highlight-slice-chart-container'),
	        containerWidth = donutContainer.node() ? donutContainer.node().getBoundingClientRect().width : false,
	        dataset = new dataBuilder.DonutDataBuilder().withThreeCategories().build();
	
	    if (containerWidth) {
	        donutChart.highlightSliceById(1).hasFixedHighlightedSlice(true).width(containerWidth).height(containerWidth / 1.8).externalRadius(containerWidth / 5).internalRadius(containerWidth / 10);
	
	        donutContainer.datum(dataset).call(donutChart);
	    }
	}
	
	// Show charts if container available
	if (d3Selection.select('.js-donut-chart-container').node()) {
	    createDonutChart(dataset);
	    createSmallDonutChart();
	    createDonutWithHighlightSliceChart();
	
	    var redrawCharts = function redrawCharts() {
	        d3Selection.selectAll('.donut-chart').remove();
	
	        createDonutChart(dataset);
	        createSmallDonutChart();
	        createDonutWithHighlightSliceChart();
	    };
	
	    // Redraw charts on window resize
	    PubSub.subscribe('resize', redrawCharts);
	
	    // Color schema selector
	    colorSelectorHelper.createColorSelector('.js-color-selector-container', '.donut-chart', createDonutChart.bind(null, dataset));
	}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    'use strict';
	
	    var d3Dispatch = __webpack_require__(12);
	    var d3Ease = __webpack_require__(13);
	    var d3Interpolate = __webpack_require__(15);
	    var d3Scale = __webpack_require__(14);
	    var d3Shape = __webpack_require__(20);
	    var d3Selection = __webpack_require__(4);
	    var d3Transition = __webpack_require__(22);
	
	    var _require = __webpack_require__(25),
	        exportChart = _require.exportChart;
	
	    var textHelper = __webpack_require__(43);
	    var colorHelper = __webpack_require__(7);
	
	    var _require2 = __webpack_require__(31),
	        calculatePercent = _require2.calculatePercent;
	
	    /**
	     * @typedef DonutChartData
	     * @type {Object[]}
	     * @property {Number} quantity     Quantity of the group (required)
	     * @property {Number} percentage   Percentage of the total (optional)
	     * @property {String} name         Name of the group (required)
	     * @property {Number} id           Identifier for the group required for legend feature (optional)
	     *
	     * @example
	     * [
	     *     {
	     *         quantity: 1,
	     *         percentage: 50,
	     *         name: 'glittering',
	     *         id: 1
	     *     },
	     *     {
	     *         quantity: 1,
	     *         percentage: 50,
	     *         name: 'luminous',
	     *         id: 2
	     *     }
	     * ]
	     */
	
	    /**
	     * Reusable Donut Chart API class that renders a
	     * simple and configurable donut chart.
	     *
	     * @module Donut
	     * @tutorial donut
	     * @requires d3-dispatch, d3-ease, d3-interpolate, d3-scale, d3-shape, d3-selection
	     *
	     * @example
	     * var donutChart = donut();
	     *
	     * donutChart
	     *     .externalRadius(500)
	     *     .internalRadius(200);
	     *
	     * d3Selection.select('.css-selector')
	     *     .datum(dataset)
	     *     .call(donutChart);
	     *
	     */
	
	
	    return function module() {
	
	        var margin = {
	            top: 0,
	            right: 0,
	            bottom: 0,
	            left: 0
	        },
	            width = 300,
	            height = 300,
	            ease = d3Ease.easeCubicInOut,
	            arcTransitionDuration = 750,
	            pieDrawingTransitionDuration = 1200,
	            pieHoverTransitionDuration = 150,
	            radiusHoverOffset = 12,
	            paddingAngle = 0.016,
	            data = void 0,
	            chartWidth = void 0,
	            chartHeight = void 0,
	            externalRadius = 140,
	            internalRadius = 45.5,
	            legendWidth = externalRadius + internalRadius,
	            layout = void 0,
	            shape = void 0,
	            slices = void 0,
	            svg = void 0,
	            isAnimated = false,
	            highlightedSliceId = void 0,
	            highlightedSlice = void 0,
	            hasFixedHighlightedSlice = false,
	            quantityLabel = 'quantity',
	            nameLabel = 'name',
	            percentageLabel = 'percentage',
	
	
	        // colors
	        colorScale = void 0,
	            colorSchema = colorHelper.colorSchemas.britechartsColorSchema,
	
	
	        // utils
	        storeAngle = function storeAngle(d) {
	            this._current = d;
	        },
	            reduceOuterRadius = function reduceOuterRadius(d) {
	            d.outerRadius = externalRadius - radiusHoverOffset;
	        },
	            sortComparator = function sortComparator(a, b) {
	            return b.quantity - a.quantity;
	        },
	            sumValues = function sumValues(data) {
	            return data.reduce(function (total, d) {
	                return d.quantity + total;
	            }, 0);
	        },
	
	
	        // extractors
	        getQuantity = function getQuantity(_ref) {
	            var quantity = _ref.quantity;
	            return quantity;
	        },
	            getSliceFill = function getSliceFill(_ref2) {
	            var data = _ref2.data;
	            return colorScale(data.name);
	        },
	
	
	        // events
	        dispatcher = d3Dispatch.dispatch('customMouseOver', 'customMouseOut', 'customMouseMove');
	
	        /**
	         * This function creates the graph using the selection as container
	         *
	         * @param {D3Selection} _selection A d3 selection that represents
	         *                                  the container(s) where the chart(s) will be rendered
	         * @param {DonutChartData} _data The data to attach and generate the chart
	         */
	        function exports(_selection) {
	            _selection.each(function (_data) {
	                chartWidth = width - margin.left - margin.right;
	                chartHeight = height - margin.top - margin.bottom;
	                data = cleanData(_data);
	
	                buildLayout();
	                buildColorScale();
	                buildShape();
	                buildSVG(this);
	                drawSlices();
	                initTooltip();
	
	                if (highlightedSliceId) {
	                    initHighlightSlice();
	                }
	            });
	        }
	
	        /**
	         * Builds color scale for chart, if any colorSchema was defined
	         * @private
	         */
	        function buildColorScale() {
	            if (colorSchema) {
	                colorScale = d3Scale.scaleOrdinal().range(colorSchema);
	            }
	        }
	
	        /**
	         * Builds containers for the chart, the legend and a wrapper for all of them
	         * @private
	         */
	        function buildContainerGroups() {
	            var container = svg.append('g').classed('container-group', true).attr('transform', 'translate(' + width / 2 + ', ' + height / 2 + ')');
	
	            container.append('g').classed('chart-group', true);
	            container.append('g').classed('legend-group', true);
	        }
	
	        /**
	         * Builds the pie layout that will produce data ready to draw
	         * @private
	         */
	        function buildLayout() {
	            layout = d3Shape.pie().padAngle(paddingAngle).value(getQuantity).sort(sortComparator);
	        }
	
	        /**
	         * Builds the shape function
	         * @private
	         */
	        function buildShape() {
	            shape = d3Shape.arc().innerRadius(internalRadius).padRadius(externalRadius);
	        }
	
	        /**
	         * Builds the SVG element that will contain the chart
	         *
	         * @param  {HTMLElement} container DOM element that will work as the container of the graph
	         * @private
	         */
	        function buildSVG(container) {
	            if (!svg) {
	                svg = d3Selection.select(container).append('svg').classed('britechart donut-chart', true).data([data]); //TO REVIEW
	
	                buildContainerGroups();
	            }
	
	            svg.attr('width', width).attr('height', height);
	        }
	
	        /**
	         * Cleaning data adding the proper format
	         * @param  {DonutChartData} data Data
	         * @private
	         */
	        function cleanData(data) {
	            var totalQuantity = sumValues(data);
	
	            return data.map(function (d) {
	                d.quantity = +d[quantityLabel];
	                d.name = String(d[nameLabel]);
	                d.percentage = String(d.percentage || calculatePercent(d[quantityLabel], totalQuantity, '.1f'));
	
	                return d;
	            });
	        }
	
	        /**
	         * Cleans any value that could be on the legend text element
	         * @private
	         */
	        function cleanLegend() {
	            svg.select('.donut-text').text('');
	        }
	
	        /**
	         * Draws the values on the donut slice inside the text element
	         *
	         * @param  {Object} obj Data object
	         * @private
	         */
	        function drawLegend(obj) {
	            if (obj.data) {
	                svg.select('.donut-text').text(function () {
	                    return obj.data.percentage + '% ' + obj.data.name;
	                }).attr('dy', '.2em').attr('text-anchor', 'middle');
	
	                svg.select('.donut-text').call(wrapText, legendWidth);
	            }
	        }
	
	        /**
	         * Draws the slices of the donut
	         * @private
	         */
	        function drawSlices() {
	            if (!slices) {
	                slices = svg.select('.chart-group').selectAll('g.arc').data(layout(data));
	
	                var newSlices = slices.enter().append('g').each(storeAngle).each(reduceOuterRadius).classed('arc', true);
	
	                if (isAnimated) {
	                    newSlices.merge(slices).append('path').attr('fill', getSliceFill).on('mouseover', handleMouseOver).on('mouseout', handleMouseOut).transition().ease(ease).duration(pieDrawingTransitionDuration).attrTween('d', tweenLoading);
	                } else {
	                    newSlices.merge(slices).append('path').attr('fill', getSliceFill).attr('d', shape).on('mouseover', handleMouseOver).on('mouseout', handleMouseOut);
	                }
	            } else {
	                slices = svg.select('.chart-group').selectAll('path').data(layout(data));
	
	                slices.attr('d', shape);
	
	                // Redraws the angles of the data
	                slices.transition().duration(arcTransitionDuration).attrTween('d', tweenArc);
	            }
	        }
	
	        /**
	         * Checks if the given element id is the same as the highlightedSliceId and returns the
	         * element if that's the case
	         * @param  {DOMElement} options.data Dom element to check
	         * @return {DOMElement}              Dom element if it has the same id
	         */
	        function filterHighlightedSlice(_ref3) {
	            var data = _ref3.data;
	
	            if (data.id === highlightedSliceId) {
	                return this;
	            }
	        }
	
	        /**
	         * Handles a path mouse over
	         * @return {void}
	         * @private
	         */
	        function handleMouseOver(datum) {
	            drawLegend(datum);
	            dispatcher.call('customMouseOver', this, datum);
	
	            if (highlightedSlice && this !== highlightedSlice) {
	                tweenGrowth(highlightedSlice, externalRadius - radiusHoverOffset);
	            }
	            tweenGrowth(this, externalRadius);
	        }
	
	        /**
	         * Handles a path mouse out
	         * @return {void}
	         * @private
	         */
	        function handleMouseOut() {
	            if (highlightedSlice && hasFixedHighlightedSlice) {
	                drawLegend(highlightedSlice.__data__);
	            } else {
	                cleanLegend();
	            }
	            dispatcher.call('customMouseOut', this);
	
	            if (highlightedSlice && hasFixedHighlightedSlice && this !== highlightedSlice) {
	                tweenGrowth(highlightedSlice, externalRadius);
	            }
	            tweenGrowth(this, externalRadius - radiusHoverOffset, pieHoverTransitionDuration);
	        }
	
	        /**
	         * Find the slice by id and growth it if needed
	         * @private
	         */
	        function initHighlightSlice() {
	            highlightedSlice = svg.selectAll('.chart-group .arc path').select(filterHighlightedSlice).node();
	
	            if (highlightedSlice) {
	                drawLegend(highlightedSlice.__data__);
	                tweenGrowth(highlightedSlice, externalRadius, pieDrawingTransitionDuration);
	            }
	        }
	
	        /**
	         * Creates the text element that will hold the legend of the chart
	         */
	        function initTooltip() {
	            svg.select('.legend-group').append('text').attr('class', 'donut-text');
	        }
	
	        /**
	         * Stores current angles and interpolates with new angles
	         * Check out {@link http://bl.ocks.org/mbostock/1346410| this example}
	         *
	         * @param  {Object}     a   New data for slice
	         * @return {Function}       Tweening function for the donut shape
	         * @private
	         */
	        function tweenArc(a) {
	            var i = d3Interpolate.interpolate(this._current, a);
	
	            this._current = i(0);
	
	            return function (t) {
	                return shape(i(t));
	            };
	        }
	
	        /**
	         * Animate slice with tweens depending on the attributes given
	         *
	         * @param  {DOMElement} slice   Slice to growth
	         * @param  {Number} outerRadius Final outer radius value
	         * @param  {Number} delay       Delay of animation
	         * @private
	         */
	        function tweenGrowth(slice, outerRadius) {
	            var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	
	            d3Selection.select(slice).transition().delay(delay).attrTween('d', function (d) {
	                var i = d3Interpolate.interpolate(d.outerRadius, outerRadius);
	
	                return function (t) {
	                    d.outerRadius = i(t);
	
	                    return shape(d);
	                };
	            });
	        }
	
	        /**
	         * Animation for chart loading
	         * Check out {@link http://bl.ocks.org/mbostock/4341574| this example}
	         *
	         * @param  {Object} b Data point
	         * @return {Function}   Tween function
	         * @private
	         */
	        function tweenLoading(b) {
	            var i = void 0;
	
	            b.innerRadius = 0;
	            i = d3Interpolate.interpolate({ startAngle: 0, endAngle: 0 }, b);
	
	            return function (t) {
	                return shape(i(t));
	            };
	        }
	
	        /**
	         * Utility function that wraps a text into the given width
	         *
	         * @param  {D3Selection} text         Text to write
	         * @param  {Number} legendWidth Width of the container
	         * @private
	         */
	        function wrapText(text, legendWidth) {
	            var fontSize = externalRadius / 5;
	
	            textHelper.wrapText.call(null, 0, fontSize, legendWidth, text.node());
	        }
	
	        /**
	         * Gets or Sets the colorSchema of the chart
	         * @param  {String[]} _x Desired colorSchema for the graph
	         * @return { colorSchema | module} Current colorSchema or Chart module to chain calls
	         * @public
	         */
	        exports.colorSchema = function (_x) {
	            if (!arguments.length) {
	                return colorSchema;
	            }
	            colorSchema = _x;
	            return this;
	        };
	
	        /**
	         * Gets or Sets the externalRadius of the chart
	         * @param  {Number} _x ExternalRadius number to get/set
	         * @return { (Number | Module) } Current externalRadius or Donut Chart module to chain calls
	         * @public
	         */
	        exports.externalRadius = function (_x) {
	            if (!arguments.length) {
	                return externalRadius;
	            }
	            externalRadius = _x;
	            return this;
	        };
	
	        /**
	         * Gets or Sets the hasFixedHighlightedSlice property of the chart, making it to
	         * highlight the selected slice id set with `highlightSliceById` all the time.
	         *
	         * @param  {Boolean} _x                         If we want to make the highlighted slice permanently highlighted
	         * @return { hasFixedHighlightedSlice | module} Current hasFixedHighlightedSlice flag or Chart module
	         * @public
	         */
	        exports.hasFixedHighlightedSlice = function (_x) {
	            if (!arguments.length) {
	                return hasFixedHighlightedSlice;
	            }
	            hasFixedHighlightedSlice = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the height of the chart
	         * @param  {Number} _x Desired width for the graph
	         * @return { (Number | Module) } Current height or Donut Chart module to chain calls
	         * @public
	         */
	        exports.height = function (_x) {
	            if (!arguments.length) {
	                return height;
	            }
	            height = _x;
	            return this;
	        };
	
	        /**
	         * Gets or Sets the isAnimated property of the chart, making it to animate when render.
	         * By default this is 'false'
	         *
	         * @param  {Boolean} _x Desired animation flag
	         * @return { isAnimated | module} Current isAnimated flag or Chart module
	         * @public
	         */
	        exports.isAnimated = function (_x) {
	            if (!arguments.length) {
	                return isAnimated;
	            }
	            isAnimated = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the internalRadius of the chart
	         * @param  {Number} _x InternalRadius number to get/set
	         * @return { (Number | Module) } Current internalRadius or Donut Chart module to chain calls
	         * @public
	         */
	        exports.internalRadius = function (_x) {
	            if (!arguments.length) {
	                return internalRadius;
	            }
	            internalRadius = _x;
	            return this;
	        };
	
	        /**
	         * Gets or Sets the margin of the chart
	         * @param  {Object} _x Margin object to get/set
	         * @return { (Number | Module) } Current margin or Donut Chart module to chain calls
	         * @public
	         */
	        exports.margin = function (_x) {
	            if (!arguments.length) {
	                return margin;
	            }
	            margin = _x;
	            return this;
	        };
	
	        /**
	         * Gets or Sets the width of the chart
	         * @param  {Number} _x Desired width for the graph
	         * @return { (Number | Module) } Current width or Donut Chart module to chain calls
	         * @public
	         */
	        exports.width = function (_x) {
	            if (!arguments.length) {
	                return width;
	            }
	            width = _x;
	            return this;
	        };
	
	        /**
	         * Chart exported to png and a download action is fired
	         * @public
	         */
	        exports.exportChart = function (filename, title) {
	            exportChart.call(exports, svg, filename, title);
	        };
	
	        /**
	         * Gets or Sets the id of the slice to highlight
	         * @param  {Number} _x Slice id
	         * @return { (Number | Module) } Current highlighted slice id or Donut Chart module to chain calls
	         * @public
	         */
	        exports.highlightSliceById = function (_x) {
	            if (!arguments.length) {
	                return highlightedSliceId;
	            }
	            highlightedSliceId = _x;
	            return this;
	        };
	
	        /**
	         * Exposes an 'on' method that acts as a bridge with the event dispatcher
	         * We are going to expose this events:
	         * customMouseOver, customMouseMove and customMouseOut
	         *
	         * @return {module} Bar Chart
	         * @public
	         */
	        exports.on = function () {
	            var value = dispatcher.on.apply(dispatcher, arguments);
	
	            return value === dispatcher ? exports : value;
	        };
	
	        return exports;
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    'use strict';
	
	    var d3Format = __webpack_require__(17);
	    var d3Scale = __webpack_require__(14);
	    var d3Selection = __webpack_require__(4);
	    var d3Transition = __webpack_require__(22);
	
	    var textHelper = __webpack_require__(43);
	    var colorHelper = __webpack_require__(7);
	
	    /**
	     * @typedef LegendChartData
	     * @type {Object[]}
	     * @property {Number} id        Id of the group (required)
	     * @property {Number} quantity  Quantity of the group (required)
	     * @property {String} name      Name of the group (required)
	     *
	     * @example
	     * [
	     *     {
	     *         id: 1,
	     *         quantity: 2,
	     *         name: 'glittering'
	     *     },
	     *     {
	     *         id: 2,
	     *         quantity: 3,
	     *         name: 'luminous'
	     *     }
	     */
	
	    /**
	     * @fileOverview Legend Component reusable API class that renders a
	     * simple and configurable legend element.
	     *
	     * @example
	     * var donutChart = donut(),
	     *     legendBox = legend();
	     *
	     * donutChart
	     *     .externalRadius(500)
	     *     .internalRadius(200)
	     *     .on('customMouseOver', function(data) {
	     *         legendBox.highlight(data.data.id);
	     *     })
	     *     .on('customMouseOut', function() {
	     *         legendBox.clearHighlight();
	     *     });
	     *
	     * d3Selection.select('.css-selector')
	     *     .datum(dataset)
	     *     .call(donutChart);
	     *
	     * d3Selection.select('.other-css-selector')
	     *     .datum(dataset)
	     *     .call(legendBox);
	     *
	     * @module Legend
	     * @tutorial legend
	     * @exports charts/legend
	     * @requires d3
	     */
	    return function module() {
	
	        var margin = {
	            top: 5,
	            right: 5,
	            bottom: 5,
	            left: 5
	        },
	            width = 320,
	            height = 180,
	            textSize = 12,
	            textLetterSpacing = 0.5,
	            markerSize = 16,
	            markerYOffset = -(textSize - 2) / 2,
	            marginRatio = 1.5,
	            valueReservedSpace = 40,
	            numberLetterSpacing = 0.8,
	            numberFormat = d3Format.format('s'),
	            isFadedClassName = 'is-faded',
	            horizontal = false,
	
	
	        // colors
	        colorScale = void 0,
	            colorSchema = colorHelper.colorSchemas.britechartsColorSchema,
	            getId = function getId(_ref) {
	            var id = _ref.id;
	            return id;
	        },
	            getName = function getName(_ref2) {
	            var name = _ref2.name;
	            return name;
	        },
	            getFormattedQuantity = function getFormattedQuantity(_ref3) {
	            var quantity = _ref3.quantity;
	            return numberFormat(quantity);
	        },
	            getCircleFill = function getCircleFill(_ref4) {
	            var name = _ref4.name;
	            return colorScale(name);
	        },
	            entries = void 0,
	            chartWidth = void 0,
	            chartHeight = void 0,
	            data = void 0,
	            svg = void 0;
	
	        /**
	         * This function creates the graph using the selection as container
	         * @param  {D3Selection} _selection A d3 selection that represents
	         *                                  the container(s) where the chart(s) will be rendered
	         * @param {object} _data The data to attach and generate the chart
	         */
	        function exports(_selection) {
	            _selection.each(function (_data) {
	                chartWidth = width - margin.left - margin.right;
	                chartHeight = height - margin.top - margin.bottom;
	                data = _data;
	
	                buildColorScale();
	                buildSVG(this);
	                if (horizontal) {
	                    drawHorizontalLegend();
	                } else {
	                    drawVerticalLegend();
	                }
	            });
	        }
	
	        /**
	         * Depending on the size of the horizontal legend, we are going to either
	         * center the legend or add a new line with the last entry of the legend
	         * @return {void}
	         */
	        function adjustLines() {
	            var lineWidth = svg.select('.legend-line').node().getBoundingClientRect().width;
	            var lineWidthSpace = chartWidth - lineWidth;
	
	            if (lineWidthSpace > 0) {
	                centerLegendOnSVG();
	            } else {
	                splitInLines();
	            }
	        }
	
	        /**
	         * Builds containers for the legend
	         * Also applies the Margin convention
	         * @private
	         */
	        function buildContainerGroups() {
	            var container = svg.append('g').classed('legend-container-group', true).attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
	
	            container.append('g').classed('legend-group', true);
	        }
	
	        /**
	         * Builds color scale for chart, if any colorSchema was defined
	         * @private
	         */
	        function buildColorScale() {
	            if (colorSchema) {
	                colorScale = d3Scale.scaleOrdinal().range(colorSchema);
	            }
	        }
	
	        /**
	         * Builds the SVG element that will contain the chart
	         * @param  {HTMLElement} container DOM element that will work as the container of the graph
	         * @private
	         */
	        function buildSVG(container) {
	            if (!svg) {
	                svg = d3Selection.select(container).append('svg').classed('britechart britechart-legend', true);
	
	                buildContainerGroups();
	            }
	
	            svg.attr('width', width).attr('height', height);
	        }
	
	        /**
	         * Centers the legend on the chart given that is a single line of labels
	         * @return {void}
	         */
	        function centerLegendOnSVG() {
	            var legendGroupSize = svg.select('g.legend-container-group').node().getBoundingClientRect().width;
	            var emptySpace = width - legendGroupSize;
	
	            if (emptySpace > 0) {
	                svg.select('g.legend-container-group').attr('transform', 'translate(' + emptySpace / 2 + ',0)');
	            }
	        }
	
	        /**
	         * Removes the faded class from all the entry lines
	         */
	        function cleanFadedLines() {
	            svg.select('.legend-group').selectAll('g.legend-entry').classed(isFadedClassName, false);
	        }
	
	        /**
	         * Draws the entries of the legend within a single line
	         * @private
	         */
	        function drawHorizontalLegend() {
	            var xOffset = markerSize;
	
	            // We want a single line
	            svg.select('.legend-group').append('g').classed('legend-line', true);
	
	            // And one entry per data item
	            entries = svg.select('.legend-line').selectAll('g.legend-entry').data(data);
	
	            // Enter
	            entries.enter().append('g').classed('legend-entry', true).attr('data-item', getId).attr('transform', function (d, i) {
	                var horizontalOffset = xOffset,
	                    lineHeight = chartHeight / 2,
	                    verticalOffset = lineHeight,
	                    labelWidth = textHelper.getTextWidth(d.name, textSize);
	
	                xOffset += markerSize + 2 * getLineElementMargin() + labelWidth;
	
	                return 'translate(' + horizontalOffset + ',' + verticalOffset + ')';
	            }).merge(entries).append('circle').classed('legend-circle', true).attr('cx', markerSize / 2).attr('cy', markerYOffset).attr('r', markerSize / 2).style('fill', getCircleFill).style('stroke-width', 1);
	
	            svg.select('.legend-group').selectAll('g.legend-entry').append('text').classed('legend-entry-name', true).text(getName).attr('x', getLineElementMargin()).style('font-size', textSize + 'px').style('letter-spacing', textLetterSpacing + 'px');
	
	            // Exit
	            svg.select('.legend-group').selectAll('g.legend-entry').exit().transition().style('opacity', 0).remove();
	
	            adjustLines();
	        }
	
	        /**
	         * Draws the entries of the legend
	         * @private
	         */
	        function drawVerticalLegend() {
	            entries = svg.select('.legend-group').selectAll('g.legend-line').data(data);
	
	            // Enter
	            entries.enter().append('g').classed('legend-line', true).append('g').classed('legend-entry', true).attr('data-item', getId).attr('transform', function (d, i) {
	                var horizontalOffset = markerSize + getLineElementMargin(),
	                    lineHeight = chartHeight / (data.length + 1),
	                    verticalOffset = (i + 1) * lineHeight;
	
	                return 'translate(' + horizontalOffset + ',' + verticalOffset + ')';
	            }).merge(entries).append('circle').classed('legend-circle', true).attr('cx', markerSize / 2).attr('cy', markerYOffset).attr('r', markerSize / 2).style('fill', getCircleFill).style('stroke-width', 1);
	
	            svg.select('.legend-group').selectAll('g.legend-line').selectAll('g.legend-entry').append('text').classed('legend-entry-name', true).text(getName).attr('x', getLineElementMargin()).style('font-size', textSize + 'px').style('letter-spacing', textLetterSpacing + 'px');
	
	            svg.select('.legend-group').selectAll('g.legend-line').selectAll('g.legend-entry').append('text').classed('legend-entry-value', true).text(getFormattedQuantity).attr('x', chartWidth - valueReservedSpace).style('font-size', textSize + 'px').style('letter-spacing', numberLetterSpacing + 'px').style('text-anchor', 'end').style('startOffset', '100%');
	
	            // Exit
	            svg.select('.legend-group').selectAll('g.legend-line').exit().transition().style('opacity', 0).remove();
	        }
	
	        /**
	         * Applies the faded class to all lines but the one that has the given id
	         * @param  {number} exceptionItemId Id of the line that needs to stay the same
	         */
	        function fadeLinesBut(exceptionItemId) {
	            var classToFade = 'g.legend-entry';
	
	            svg.select('.legend-group').selectAll(classToFade).classed(isFadedClassName, true);
	
	            svg.select('[data-item="' + exceptionItemId + '"]').classed(isFadedClassName, false);
	        }
	
	        /**
	         * Calculates the margin between elements of the legend
	         * @return {Number} Margin to apply between elements
	         */
	        function getLineElementMargin() {
	            return marginRatio * markerSize;
	        }
	
	        /**
	         * Simple method to move the last item of an overflowing legend into the next line
	         * @return {void}
	         * @private
	         */
	        function splitInLines() {
	            var legendEntries = svg.selectAll('.legend-entry');
	            var numberOfEntries = legendEntries.size();
	            var lineHeight = chartHeight / 2 * 1.7;
	
	            var newLine = svg.select('.legend-group').append('g').classed('legend-line', true).attr('transform', 'translate(0, ' + lineHeight + ')');
	
	            var lastEntry = legendEntries.filter(':nth-child(' + numberOfEntries + ')');
	            lastEntry.attr('transform', 'translate(' + markerSize + ',0)');
	            newLine.append(function () {
	                return lastEntry.node();
	            });
	        }
	
	        /**
	         * Clears the highlighted line entry
	         */
	        exports.clearHighlight = function () {
	            cleanFadedLines();
	        };
	
	        /**
	         * Gets or Sets the colorSchema of the chart
	         * @param  {array} _x Color scheme array to get/set
	         * @return {number | module} Current colorSchema or Donut Chart module to chain calls
	         * @public
	         */
	        exports.colorSchema = function (_x) {
	            if (!arguments.length) {
	                return colorSchema;
	            }
	            colorSchema = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the height of the legend chart
	         * @param  {number} _x Desired width for the chart
	         * @return {height | module} Current height or Legend module to chain calls
	         * @public
	         */
	        exports.height = function (_x) {
	            if (!arguments.length) {
	                return height;
	            }
	            height = _x;
	
	            return this;
	        };
	
	        /**
	         * Highlights a line entry by fading the rest of lines
	         * @param  {number} entryId ID of the entry line
	         */
	        exports.highlight = function (entryId) {
	            cleanFadedLines();
	            fadeLinesBut(entryId);
	        };
	
	        /**
	         * Gets or Sets the horizontal mode on the legend
	         * @param  {boolean} _x Desired horizontal mode for the graph
	         * @return {horizontal | module} Current horizontal mode or Legend module to chain calls
	         * @public
	         */
	        exports.horizontal = function (_x) {
	            if (!arguments.length) {
	                return horizontal;
	            }
	            horizontal = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the margin of the legend chart
	         * @param  {object} _x Margin object to get/set
	         * @return {margin | module} Current margin or Legend module to chain calls
	         * @public
	         */
	        exports.margin = function (_x) {
	            if (!arguments.length) {
	                return margin;
	            }
	            margin = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the markerSize of the legend chart.
	         * This markerSize will determine the horizontal and vertical size of the colored marks
	         * added as color identifiers for the chart's categories.
	         *
	         * @param  {object} _x Margin object to get/set
	         * @return {markerSize | module} Current markerSize or Legend module to chain calls
	         * @public
	         */
	        exports.markerSize = function (_x) {
	            if (!arguments.length) {
	                return markerSize;
	            }
	            markerSize = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the width of the legend chart
	         * @param  {number} _x Desired width for the graph
	         * @return {width | module} Current width or Legend module to chain calls
	         * @public
	         */
	        exports.width = function (_x) {
	            if (!arguments.length) {
	                return width;
	            }
	            width = _x;
	
	            return this;
	        };
	
	        return exports;
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    'use strict';
	
	    var _ = __webpack_require__(3),
	        jsonFivePlusOther = __webpack_require__(52),
	        jsonFivePlusOtherNoPercent = __webpack_require__(53),
	        jsonThreeCategories = __webpack_require__(54);
	
	    function DonutDataBuilder(config) {
	        this.Klass = DonutDataBuilder;
	
	        this.config = _.defaults({}, config);
	
	        this.withFivePlusOther = function () {
	            var attributes = _.extend({}, this.config, jsonFivePlusOther);
	
	            return new this.Klass(attributes);
	        };
	
	        this.withFivePlusOtherNoPercent = function () {
	            var attributes = _.extend({}, this.config, jsonFivePlusOtherNoPercent);
	
	            return new this.Klass(attributes);
	        };
	
	        this.withThreeCategories = function () {
	            var attributes = _.extend({}, this.config, jsonThreeCategories);
	
	            return new this.Klass(attributes);
	        };
	
	        /**
	         * Sets the path for fetching the data
	         * @param  {String} path Desired path for test data
	         * @return {DonutDataBuilder}      Builder object
	         */
	        this.withPath = function (path) {
	            var attributes = _.extend({}, this.config, {
	                jsonURL: path
	            });
	
	            return new this.Klass(attributes);
	        };
	
	        this.build = function () {
	            return this.config.data;
	        };
	    }
	
	    return {
	        DonutDataBuilder: DonutDataBuilder
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 52 */
/***/ (function(module, exports) {

	module.exports = {
		"data": [
			{
				"name": "Shiny",
				"id": 1,
				"quantity": 86,
				"percentage": 5
			},
			{
				"name": "Blazing",
				"id": 2,
				"quantity": 300,
				"percentage": 18
			},
			{
				"name": "Dazzling",
				"id": 3,
				"quantity": 276,
				"percentage": 16
			},
			{
				"name": "Radiant",
				"id": 4,
				"quantity": 195,
				"percentage": 11
			},
			{
				"name": "Sparkling",
				"id": 5,
				"quantity": 36,
				"percentage": 2
			},
			{
				"name": "Other",
				"id": 0,
				"quantity": 814,
				"percentage": 48
			}
		]
	};

/***/ }),
/* 53 */
/***/ (function(module, exports) {

	module.exports = {
		"data": [
			{
				"name": "Shiny",
				"id": 1,
				"quantity": 86
			},
			{
				"name": "Blazing",
				"id": 2,
				"quantity": 300
			},
			{
				"name": "Dazzling",
				"id": 3,
				"quantity": 276
			},
			{
				"name": "Radiant",
				"id": 4,
				"quantity": 195
			},
			{
				"name": "Sparkling",
				"id": 5,
				"quantity": 36
			},
			{
				"name": "Other",
				"id": 0,
				"quantity": 814
			}
		]
	};

/***/ }),
/* 54 */
/***/ (function(module, exports) {

	module.exports = {
		"data": [
			{
				"name": "Shiny",
				"id": 1,
				"quantity": 200,
				"percentage": 20
			},
			{
				"name": "Radiant",
				"id": 2,
				"quantity": 200,
				"percentage": 20
			},
			{
				"name": "Sparkling",
				"id": 3,
				"quantity": 600,
				"percentage": 60
			}
		]
	};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ = __webpack_require__(3),
	    d3Selection = __webpack_require__(4),
	    d3TimeFormat = __webpack_require__(19),
	    PubSub = __webpack_require__(5),
	    brush = __webpack_require__(56),
	    line = __webpack_require__(59),
	    tooltip = __webpack_require__(33),
	    dataBuilder = __webpack_require__(60),
	    colorSelectorHelper = __webpack_require__(40),
	    lineMargin = { top: 60, bottom: 50, left: 50, right: 30 };
	
	function createBrushChart(optionalColorSchema) {
	    var brushChart = brush(),
	        brushMargin = { top: 0, bottom: 40, left: 50, right: 30 },
	        testDataSet = new dataBuilder.LineDataBuilder(),
	        brushContainer = d3Selection.select('.js-line-brush-chart-container'),
	        containerWidth = brushContainer.node() ? brushContainer.node().getBoundingClientRect().width : false,
	        dataset;
	
	    if (containerWidth) {
	        dataset = testDataSet.with5Topics().build();
	
	        brushChart.width(containerWidth).height(100).margin(brushMargin).onBrush(function (brushExtent) {
	            var format = d3TimeFormat.timeFormat('%m/%d/%Y');
	
	            d3Selection.select('.js-start-date').text(format(brushExtent[0]));
	            d3Selection.select('.js-end-date').text(format(brushExtent[1]));
	
	            d3Selection.select('.js-date-range').classed('is-hidden', false);
	
	            // Filter
	            d3Selection.selectAll('.js-line-chart-container .line-chart').remove();
	            createLineChart(optionalColorSchema ? optionalColorSchema : null, filterData(brushExtent[0], brushExtent[1]));
	        });
	
	        brushContainer.datum(brushDataAdapter(dataset)).call(brushChart);
	    }
	}
	
	function createLineChart(optionalColorSchema, optionalData) {
	    var lineChart1 = line(),
	        chartTooltip = tooltip(),
	        testDataSet = new dataBuilder.LineDataBuilder(),
	        container = d3Selection.select('.js-line-chart-container'),
	        containerWidth = container.node() ? container.node().getBoundingClientRect().width : false,
	        tooltipContainer,
	        dataset;
	
	    if (containerWidth) {
	        d3Selection.select('#button').on('click', function () {
	            lineChart1.exportChart('linechart.png', 'Britecharts Line Chart');
	        });
	
	        dataset = testDataSet.with5Topics().build();
	
	        // LineChart Setup and start
	        lineChart1.isAnimated(true).aspectRatio(0.7).grid('horizontal').tooltipThreshold(600).width(containerWidth).margin(lineMargin).dateLabel('fullDate').on('customMouseOver', chartTooltip.show).on('customMouseMove', chartTooltip.update).on('customMouseOut', chartTooltip.hide);
	
	        if (optionalColorSchema) {
	            lineChart1.colorSchema(optionalColorSchema);
	        }
	
	        if (optionalData) {
	            container.datum(optionalData).call(lineChart1);
	        } else {
	            container.datum(dataset).call(lineChart1);
	        }
	
	        // Tooltip Setup and start
	        chartTooltip
	        // In order to change the date range on the tooltip title, uncomment this line
	        // .forceDateRange(chartTooltip.axisTimeCombinations.HOUR_DAY)
	        .title('Quantity Sold').forceOrder(dataset.dataByTopic.map(function (topic) {
	            return topic.topic;
	        }));
	
	        // Note that if the viewport width is less than the tooltipThreshold value,
	        // this container won't exist, and the tooltip won't show up
	        tooltipContainer = d3Selection.select('.js-line-chart-container .metadata-group .hover-marker');
	        tooltipContainer.datum([]).call(chartTooltip);
	    }
	}
	
	function createLineChartWithSingleLine() {
	    var lineChart2 = line(),
	        chartTooltip = tooltip(),
	        testDataSet = new dataBuilder.LineDataBuilder(),
	        container = d3Selection.select('.js-single-line-chart-container'),
	        containerWidth = container.node() ? container.node().getBoundingClientRect().width : false,
	        tooltipContainer,
	        dataset;
	
	    if (containerWidth) {
	        dataset = testDataSet.withOneSource().build();
	
	        d3Selection.select('#button2').on('click', function () {
	            lineChart2.exportChart('linechart.png', 'Britecharts LÍne Chart');
	        });
	
	        lineChart2.tooltipThreshold(600).height(300).margin(lineMargin).grid('vertical').width(containerWidth).dateLabel('fullDate').on('customMouseOver', function () {
	            chartTooltip.show();
	        }).on('customMouseMove', function (dataPoint, topicColorMap, dataPointXPosition) {
	            chartTooltip.update(dataPoint, topicColorMap, dataPointXPosition);
	        }).on('customMouseOut', function () {
	            chartTooltip.hide();
	        });
	
	        container.datum(dataset).call(lineChart2);
	
	        // Tooltip Setup and start
	        chartTooltip.title('Quantity Sold');
	
	        // Note that if the viewport width is less than the tooltipThreshold value,
	        // this container won't exist, and the tooltip won't show up
	        tooltipContainer = d3Selection.select('.js-single-line-chart-container .metadata-group .hover-marker');
	        tooltipContainer.datum([]).call(chartTooltip);
	    }
	}
	
	function createLineChartWithFixedHeight() {
	    var lineChart3 = line(),
	        chartTooltip = tooltip(),
	        testDataSet = new dataBuilder.LineDataBuilder(),
	        container = d3Selection.select('.js-fixed-line-chart-container'),
	        containerWidth = container.node() ? container.node().getBoundingClientRect().width : false,
	        tooltipContainer,
	        dataset;
	
	    if (containerWidth) {
	        dataset = testDataSet.with5Topics().build();
	
	        lineChart3.height(300).width(containerWidth).margin(lineMargin).grid('full').dateLabel('fullDate').on('customMouseOver', function () {
	            chartTooltip.show();
	        }).on('customMouseMove', function (dataPoint, topicColorMap, dataPointXPosition) {
	            chartTooltip.update(dataPoint, topicColorMap, dataPointXPosition);
	        }).on('customMouseOut', function () {
	            chartTooltip.hide();
	        });
	
	        container.datum(dataset).call(lineChart3);
	
	        // Tooltip Setup and start
	        chartTooltip.title('Quantity Sold');
	
	        // Note that if the viewport width is less than the tooltipThreshold value,
	        // this container won't exist, and the tooltip won't show up
	        tooltipContainer = d3Selection.select('.js-fixed-line-chart-container .metadata-group .hover-marker');
	        tooltipContainer.datum([]).call(chartTooltip);
	    }
	}
	
	/*
	 * The Brush chart wants an input like this one
	 * @example
	 * [
	 *     {
	 *         value: 1,
	 *         date: '2011-01-06T00:00:00Z'
	 *     },
	 *     {
	 *         value: 2,
	 *         date: '2011-01-07T00:00:00Z'
	 *     }
	 * ]
	 */
	function brushDataAdapter(dataLine) {
	    return dataLine.dataByDate.map(function (d) {
	        d.value = d.topics.reduce(function (acc, topic) {
	            return acc + topic.value;
	        }, 0);
	
	        return d;
	    });
	}
	
	function filterData(d0, d1) {
	    var testDataSet = new dataBuilder.LineDataBuilder(),
	        data = JSON.parse(JSON.stringify(testDataSet.with5Topics().build()));
	
	    data.dataByDate = data.dataByDate.filter(isInRange.bind(null, d0, d1));
	
	    data.dataByTopic = data.dataByTopic.map(function (topic) {
	        topic.dates = topic.dates.filter(isInRange.bind(null, d0, d1));
	
	        return topic;
	    });
	
	    return data;
	}
	
	function isInRange(d0, d1, d) {
	    return new Date(d.date) >= d0 && new Date(d.date) <= d1;
	}
	
	// Show charts if container available
	if (d3Selection.select('.js-line-chart-container').node()) {
	    createLineChart();
	    createBrushChart();
	    createLineChartWithSingleLine();
	    createLineChartWithFixedHeight();
	
	    var redrawCharts = function redrawCharts() {
	        d3Selection.selectAll('.line-chart').remove();
	        d3Selection.selectAll('.brush-chart').remove();
	
	        createLineChart();
	        createBrushChart();
	        createLineChartWithSingleLine();
	        createLineChartWithFixedHeight();
	    };
	
	    // Redraw charts on window resize
	    PubSub.subscribe('resize', redrawCharts);
	
	    // Color schema selector
	    colorSelectorHelper.createColorSelector('.js-color-selector-container', '.line-chart', function (newSchema) {
	        createLineChart(newSchema);
	        d3Selection.selectAll('.brush-chart').remove();
	        createBrushChart(newSchema);
	    });
	}

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    'use strict';
	
	    var d3Array = __webpack_require__(9);
	    var d3Axis = __webpack_require__(10);
	    var d3Brush = __webpack_require__(57);
	    var d3Ease = __webpack_require__(13);
	    var d3Scale = __webpack_require__(14);
	    var d3Shape = __webpack_require__(20);
	    var d3Selection = __webpack_require__(4);
	    var d3Time = __webpack_require__(18);
	    var d3Transition = __webpack_require__(22);
	    var d3TimeFormat = __webpack_require__(19);
	
	    var colorHelper = __webpack_require__(7);
	    var timeAxisHelper = __webpack_require__(30);
	
	    var _require = __webpack_require__(26),
	        axisTimeCombinations = _require.axisTimeCombinations;
	
	    /**
	     * @typedef BrushChartData
	     * @type {Object[]}
	     * @property {Number} value        Value to chart (required)
	     * @property {Date} date           Date of the value (required)
	     *
	     * @example
	     * [
	     *     {
	     *         value: 1,
	     *         date: '2011-01-06T00:00:00Z'
	     *     },
	     *     {
	     *         value: 2,
	     *         date: '2011-01-07T00:00:00Z'
	     *     }
	     * ]
	     */
	
	    /**
	     * Brush Chart reusable API class that renders a
	     * simple and configurable brush chart.
	     *
	     * @module Brush
	     * @tutorial brush
	     * @requires d3-array, d3-axis, d3-brush, d3-ease, d3-scale, d3-shape, d3-selection, d3-time, d3-time-format
	     *
	     * @example
	     * let brushChart = brush();
	     *
	     * brushChart
	     *     .height(500)
	     *     .width(800);
	     *
	     * d3Selection.select('.css-selector')
	     *     .datum(dataset)
	     *     .call(brushChart);
	     *
	     */
	
	    return function module() {
	
	        var margin = {
	            top: 20,
	            right: 20,
	            bottom: 30,
	            left: 20
	        },
	            width = 960,
	            height = 500,
	            data = void 0,
	            svg = void 0,
	            ease = d3Ease.easeQuadOut,
	            dateLabel = 'date',
	            valueLabel = 'value',
	            dateRange = [null, null],
	            chartWidth = void 0,
	            chartHeight = void 0,
	            xScale = void 0,
	            yScale = void 0,
	            xAxis = void 0,
	            forceAxisSettings = null,
	            forcedXTicks = null,
	            forcedXFormat = null,
	            brush = void 0,
	            chartBrush = void 0,
	            handle = void 0,
	            tickPadding = 5,
	            onBrush = null,
	            gradient = colorHelper.colorGradients.greenBlueGradient,
	
	
	        // extractors
	        getValue = function getValue(_ref) {
	            var value = _ref.value;
	            return value;
	        },
	            getDate = function getDate(_ref2) {
	            var date = _ref2.date;
	            return date;
	        };
	
	        /**
	         * This function creates the graph using the selection as container
	         * @param  {D3Selection} _selection A d3 selection that represents
	         *                                  the container(s) where the chart(s) will be rendered
	         * @param {BrushChartData} _data The data to attach and generate the chart
	         */
	        function exports(_selection) {
	            _selection.each(function (_data) {
	                chartWidth = width - margin.left - margin.right;
	                chartHeight = height - margin.top - margin.bottom;
	                data = cleanData(cloneData(_data));
	
	                buildScales();
	                buildAxis();
	                buildSVG(this);
	                buildGradient();
	                buildBrush();
	                drawArea();
	                drawAxis();
	                drawBrush();
	                drawHandles();
	            });
	        }
	
	        /**
	         * Creates the d3 x axis, setting orientation
	         * @private
	         */
	        function buildAxis() {
	            var minor = void 0,
	                major = void 0;
	
	            if (forceAxisSettings === 'custom' && typeof forcedXFormat === 'string') {
	                minor = {
	                    tick: forcedXTicks,
	                    format: d3TimeFormat.timeFormat(forcedXFormat)
	                };
	            } else {
	                var _timeAxisHelper$getXA = timeAxisHelper.getXAxisSettings(data, width, forceAxisSettings);
	
	                minor = _timeAxisHelper$getXA.minor;
	                major = _timeAxisHelper$getXA.major;
	            }
	
	            xAxis = d3Axis.axisBottom(xScale).ticks(minor.tick).tickSize(10, 0).tickPadding([tickPadding]).tickFormat(minor.format);
	        }
	
	        /**
	         * Creates the brush element and attaches a listener
	         * @return {void}
	         */
	        function buildBrush() {
	            brush = d3Brush.brushX().extent([[0, 0], [chartWidth, chartHeight]]).on('brush', handleBrush).on('end', handleBrushEnded);
	        }
	
	        /**
	         * Builds containers for the chart, the axis and a wrapper for all of them
	         * Also applies the Margin convention
	         * @private
	         */
	        function buildContainerGroups() {
	            var container = svg.append('g').classed('container-group', true).attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
	
	            container.append('g').classed('chart-group', true);
	            container.append('g').classed('metadata-group', true);
	            container.append('g').classed('x-axis-group', true);
	            container.append('g').classed('brush-group', true);
	        }
	
	        /**
	         * Creates the gradient on the area
	         * @return {void}
	         */
	        function buildGradient() {
	            var metadataGroup = svg.select('.metadata-group');
	
	            metadataGroup.append('linearGradient').attr('id', 'brush-area-gradient').attr('gradientUnits', 'userSpaceOnUse').attr('x1', 0).attr('x2', xScale(data[data.length - 1].date)).attr('y1', 0).attr('y2', 0).selectAll('stop').data([{ offset: '0%', color: gradient[0] }, { offset: '100%', color: gradient[1] }]).enter().append('stop').attr('offset', function (_ref3) {
	                var offset = _ref3.offset;
	                return offset;
	            }).attr('stop-color', function (_ref4) {
	                var color = _ref4.color;
	                return color;
	            });
	        }
	
	        /**
	         * Creates the x and y scales of the graph
	         * @private
	         */
	        function buildScales() {
	            xScale = d3Scale.scaleTime().domain(d3Array.extent(data, getDate)).range([0, chartWidth]);
	
	            yScale = d3Scale.scaleLinear().domain([0, d3Array.max(data, getValue)]).range([chartHeight, 0]);
	        }
	
	        /**
	         * Builds the SVG element that will contain the chart
	         * @param  {HTMLElement} container DOM element that will work as the container of the graph
	         * @private
	         */
	        function buildSVG(container) {
	            if (!svg) {
	                svg = d3Selection.select(container).append('svg').classed('britechart brush-chart', true);
	
	                buildContainerGroups();
	            }
	
	            svg.attr('width', width).attr('height', height);
	        }
	
	        /**
	         * Cleaning data adding the proper format
	         *
	         * @param  {BrushChartData} data Data
	         */
	        function cleanData(data) {
	            return data.map(function (d) {
	                d.date = new Date(d[dateLabel]);
	                d.value = +d[valueLabel];
	
	                return d;
	            });
	        }
	
	        /**
	         * Clones the passed array of data
	         * @param  {Object[]} dataToClone Data to clone
	         * @return {Object[]}             Cloned data
	         */
	        function cloneData(dataToClone) {
	            return JSON.parse(JSON.stringify(dataToClone));
	        }
	
	        /**
	         * Draws the x axis on the svg object within its group
	         *
	         * @private
	         */
	        function drawAxis() {
	            svg.select('.x-axis-group').append('g').attr('class', 'x axis').attr('transform', 'translate(0, ' + chartHeight + ')').call(xAxis);
	        }
	
	        /**
	         * Draws the area that is going to represent the data
	         *
	         * @return {void}
	         */
	        function drawArea() {
	            // Create and configure the area generator
	            var area = d3Shape.area().x(function (_ref5) {
	                var date = _ref5.date;
	                return xScale(date);
	            }).y0(chartHeight).y1(function (_ref6) {
	                var value = _ref6.value;
	                return yScale(value);
	            }).curve(d3Shape.curveBasis);
	
	            // Create the area path
	            svg.select('.chart-group').append('path').datum(data).attr('class', 'brush-area').attr('d', area);
	        }
	
	        /**
	         * Draws the Brush components on its group
	         * @return {void}
	         */
	        function drawBrush() {
	            chartBrush = svg.select('.brush-group').call(brush);
	
	            // Update the height of the brushing rectangle
	            chartBrush.selectAll('rect').classed('brush-rect', true).attr('height', chartHeight);
	        }
	
	        /**
	         * Draws a handle for the Brush section
	         * @return {void}
	         */
	        function drawHandles() {
	            var handleFillColor = colorHelper.colorSchemasHuman.britechartsGreySchema[1];
	
	            // Styling
	            handle = chartBrush.selectAll('.handle.brush-rect').style('fill', handleFillColor);
	        }
	
	        /**
	         * When a brush event happens, we can extract info from the extension
	         * of the brush.
	         *
	         * @return {void}
	         */
	        function handleBrush() {
	            var s = d3Selection.event.selection,
	                dateExtent = s.map(xScale.invert);
	
	            if (typeof onBrush === 'function') {
	                onBrush.call(null, dateExtent);
	            }
	
	            // updateHandlers(dateExtent);
	        }
	
	        /**
	         * Processes the end brush event, snapping the boundaries to days
	         * as showed on the example on https://bl.ocks.org/mbostock/6232537
	         * @return {void}
	         * @private
	         */
	        function handleBrushEnded() {
	            if (!d3Selection.event.sourceEvent) return; // Only transition after input.
	            if (!d3Selection.event.selection) return; // Ignore empty selections.
	
	            var d0 = d3Selection.event.selection.map(xScale.invert),
	                d1 = d0.map(d3Time.timeDay.round);
	
	            // If empty when rounded, use floor & ceil instead.
	            if (d1[0] >= d1[1]) {
	                d1[0] = d3Time.timeDay.floor(d0[0]);
	                d1[1] = d3Time.timeDay.offset(d1[0]);
	            }
	
	            d3Selection.select(this).transition().call(d3Selection.event.target.move, d1.map(xScale));
	        }
	
	        /**
	         * Sets a new brush extent within the passed percentage positions
	         * @param {Number} a Percentage of data that the brush start with
	         * @param {Number} b Percentage of data that the brush ends with
	         * @example
	         *     setBrushByPercentages(0.25, 0.5)
	         */
	        function setBrushByPercentages(a, b) {
	            var x0 = a * chartWidth,
	                x1 = b * chartWidth;
	
	            brush.move(chartBrush, [x0, x1]);
	        }
	
	        /**
	         * Sets a new brush extent within the passed dates
	         * @param {String | Date} dateA Initial Date
	         * @param {String | Date} dateB End Date
	         */
	        function setBrushByDates(dateA, dateB) {
	            var x0 = xScale(new Date(dateA)),
	                x1 = xScale(new Date(dateB));
	
	            brush.move(chartBrush, [x0, x1]);
	        }
	
	        /**
	         * Updates visibility and position of the brush handlers
	         * @param  {Number[]} dateExtent Date range
	         * @return {void}
	         */
	        function updateHandlers(dateExtent) {
	            if (dateExtent == null) {
	                handle.attr('display', 'none');
	            } else {
	                handle.attr('display', null).attr('transform', function (d, i) {
	                    return 'translate(' + dateExtent[i] + ',' + chartHeight / 2 + ')';
	                });
	            }
	        }
	
	        // API
	
	        /**
	         * Gets or Sets the dateRange for the selected part of the brush
	         * @param  {String[]} _x Desired dateRange for the graph
	         * @return { dateRange | module} Current dateRange or Chart module to chain calls
	         * @public
	         */
	        exports.dateRange = function (_x) {
	            if (!arguments.length) {
	                return dateRange;
	            }
	            dateRange = _x;
	
	            if (Array.isArray(dateRange)) {
	                setBrushByDates.apply(undefined, _toConsumableArray(dateRange));
	            }
	
	            return this;
	        };
	
	        /**
	         * Exposes the ability to force the chart to show a certain x axis grouping
	         * @param  {String} _x Desired format
	         * @return { (String|Module) }    Current format or module to chain calls
	         * @example
	         *     brush.forceAxisFormat(brush.axisTimeCombinations.HOUR_DAY)
	         */
	        exports.forceAxisFormat = function (_x) {
	            if (!arguments.length) {
	                return forceAxisSettings;
	            }
	            forceAxisSettings = _x;
	
	            return this;
	        };
	
	        /**
	         * Exposes the ability to force the chart to show a certain x format
	         * It requires a `forceAxisFormat` of 'custom' in order to work.
	         * @param  {String} _x              Desired format for x axis
	         * @return { (String|Module) }      Current format or module to chain calls
	         */
	        exports.forcedXFormat = function (_x) {
	            if (!arguments.length) {
	                return forcedXFormat;
	            }
	            forcedXFormat = _x;
	
	            return this;
	        };
	
	        /**
	         * Exposes the ability to force the chart to show a certain x ticks. It requires a `forceAxisFormat` of 'custom' in order to work.
	         * NOTE: This value needs to be a multiple of 2, 5 or 10. They won't always work as expected, as D3 decides at the end
	         * how many and where the ticks will appear.
	         *
	         * @param  {Number} _x              Desired number of x axis ticks (multiple of 2, 5 or 10)
	         * @return { (Number|Module) }      Current number or ticks or module to chain calls
	         */
	        exports.forcedXTicks = function (_x) {
	            if (!arguments.length) {
	                return forcedXTicks;
	            }
	            forcedXTicks = _x;
	
	            return this;
	        };
	
	        /**
	         * Exposes the constants to be used to force the x axis to respect a certain granularity
	         * current options: MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR
	         * @example
	         *     brush.forceAxisFormat(brush.axisTimeCombinations.HOUR_DAY)
	         */
	        exports.axisTimeCombinations = axisTimeCombinations;
	
	        /**
	         * Gets or Sets the gradient of the chart
	         * @param  {String[]} _x Desired gradient for the graph
	         * @return { gradient | module} Current gradient or Chart module to chain calls
	         * @public
	         */
	        exports.gradient = function (_x) {
	            if (!arguments.length) {
	                return gradient;
	            }
	            gradient = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the height of the chart
	         * @param  {number} _x Desired width for the graph
	         * @return { height | module} Current height or Chart module to chain calls
	         * @public
	         */
	        exports.height = function (_x) {
	            if (!arguments.length) {
	                return height;
	            }
	            height = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the margin of the chart
	         * @param  {object} _x Margin object to get/set
	         * @return { margin | module} Current margin or Chart module to chain calls
	         * @public
	         */
	        exports.margin = function (_x) {
	            if (!arguments.length) {
	                return margin;
	            }
	            margin = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the callback that will be called when the user brushes over the area
	         * @param  {Function} _x Callback to call
	         * @return {Function | module}    Current callback function or the Chart Module
	         */
	        exports.onBrush = function (_x) {
	            if (!arguments.length) return onBrush;
	            onBrush = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the width of the chart
	         * @param  {number} _x Desired width for the graph
	         * @return { width | module} Current width or Chart module to chain calls
	         * @public
	         */
	        exports.width = function (_x) {
	            if (!arguments.length) {
	                return width;
	            }
	            width = _x;
	
	            return this;
	        };
	
	        return exports;
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-brush/ Version 1.0.4. Copyright 2017 Mike Bostock.
	(function (global, factory) {
		 true ? factory(exports, __webpack_require__(12), __webpack_require__(58), __webpack_require__(15), __webpack_require__(4), __webpack_require__(22)) :
		typeof define === 'function' && define.amd ? define(['exports', 'd3-dispatch', 'd3-drag', 'd3-interpolate', 'd3-selection', 'd3-transition'], factory) :
		(factory((global.d3 = global.d3 || {}),global.d3,global.d3,global.d3,global.d3,global.d3));
	}(this, (function (exports,d3Dispatch,d3Drag,d3Interpolate,d3Selection,d3Transition) { 'use strict';
	
	var constant = function(x) {
	  return function() {
	    return x;
	  };
	};
	
	var BrushEvent = function(target, type, selection) {
	  this.target = target;
	  this.type = type;
	  this.selection = selection;
	};
	
	function nopropagation() {
	  d3Selection.event.stopImmediatePropagation();
	}
	
	var noevent = function() {
	  d3Selection.event.preventDefault();
	  d3Selection.event.stopImmediatePropagation();
	};
	
	var MODE_DRAG = {name: "drag"};
	var MODE_SPACE = {name: "space"};
	var MODE_HANDLE = {name: "handle"};
	var MODE_CENTER = {name: "center"};
	
	var X = {
	  name: "x",
	  handles: ["e", "w"].map(type),
	  input: function(x, e) { return x && [[x[0], e[0][1]], [x[1], e[1][1]]]; },
	  output: function(xy) { return xy && [xy[0][0], xy[1][0]]; }
	};
	
	var Y = {
	  name: "y",
	  handles: ["n", "s"].map(type),
	  input: function(y, e) { return y && [[e[0][0], y[0]], [e[1][0], y[1]]]; },
	  output: function(xy) { return xy && [xy[0][1], xy[1][1]]; }
	};
	
	var XY = {
	  name: "xy",
	  handles: ["n", "e", "s", "w", "nw", "ne", "se", "sw"].map(type),
	  input: function(xy) { return xy; },
	  output: function(xy) { return xy; }
	};
	
	var cursors = {
	  overlay: "crosshair",
	  selection: "move",
	  n: "ns-resize",
	  e: "ew-resize",
	  s: "ns-resize",
	  w: "ew-resize",
	  nw: "nwse-resize",
	  ne: "nesw-resize",
	  se: "nwse-resize",
	  sw: "nesw-resize"
	};
	
	var flipX = {
	  e: "w",
	  w: "e",
	  nw: "ne",
	  ne: "nw",
	  se: "sw",
	  sw: "se"
	};
	
	var flipY = {
	  n: "s",
	  s: "n",
	  nw: "sw",
	  ne: "se",
	  se: "ne",
	  sw: "nw"
	};
	
	var signsX = {
	  overlay: +1,
	  selection: +1,
	  n: null,
	  e: +1,
	  s: null,
	  w: -1,
	  nw: -1,
	  ne: +1,
	  se: +1,
	  sw: -1
	};
	
	var signsY = {
	  overlay: +1,
	  selection: +1,
	  n: -1,
	  e: null,
	  s: +1,
	  w: null,
	  nw: -1,
	  ne: -1,
	  se: +1,
	  sw: +1
	};
	
	function type(t) {
	  return {type: t};
	}
	
	// Ignore right-click, since that should open the context menu.
	function defaultFilter() {
	  return !d3Selection.event.button;
	}
	
	function defaultExtent() {
	  var svg = this.ownerSVGElement || this;
	  return [[0, 0], [svg.width.baseVal.value, svg.height.baseVal.value]];
	}
	
	// Like d3.local, but with the name “__brush” rather than auto-generated.
	function local(node) {
	  while (!node.__brush) if (!(node = node.parentNode)) return;
	  return node.__brush;
	}
	
	function empty(extent) {
	  return extent[0][0] === extent[1][0]
	      || extent[0][1] === extent[1][1];
	}
	
	function brushSelection(node) {
	  var state = node.__brush;
	  return state ? state.dim.output(state.selection) : null;
	}
	
	function brushX() {
	  return brush$1(X);
	}
	
	function brushY() {
	  return brush$1(Y);
	}
	
	var brush = function() {
	  return brush$1(XY);
	};
	
	function brush$1(dim) {
	  var extent = defaultExtent,
	      filter = defaultFilter,
	      listeners = d3Dispatch.dispatch(brush, "start", "brush", "end"),
	      handleSize = 6,
	      touchending;
	
	  function brush(group) {
	    var overlay = group
	        .property("__brush", initialize)
	      .selectAll(".overlay")
	      .data([type("overlay")]);
	
	    overlay.enter().append("rect")
	        .attr("class", "overlay")
	        .attr("pointer-events", "all")
	        .attr("cursor", cursors.overlay)
	      .merge(overlay)
	        .each(function() {
	          var extent = local(this).extent;
	          d3Selection.select(this)
	              .attr("x", extent[0][0])
	              .attr("y", extent[0][1])
	              .attr("width", extent[1][0] - extent[0][0])
	              .attr("height", extent[1][1] - extent[0][1]);
	        });
	
	    group.selectAll(".selection")
	      .data([type("selection")])
	      .enter().append("rect")
	        .attr("class", "selection")
	        .attr("cursor", cursors.selection)
	        .attr("fill", "#777")
	        .attr("fill-opacity", 0.3)
	        .attr("stroke", "#fff")
	        .attr("shape-rendering", "crispEdges");
	
	    var handle = group.selectAll(".handle")
	      .data(dim.handles, function(d) { return d.type; });
	
	    handle.exit().remove();
	
	    handle.enter().append("rect")
	        .attr("class", function(d) { return "handle handle--" + d.type; })
	        .attr("cursor", function(d) { return cursors[d.type]; });
	
	    group
	        .each(redraw)
	        .attr("fill", "none")
	        .attr("pointer-events", "all")
	        .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)")
	        .on("mousedown.brush touchstart.brush", started);
	  }
	
	  brush.move = function(group, selection) {
	    if (group.selection) {
	      group
	          .on("start.brush", function() { emitter(this, arguments).beforestart().start(); })
	          .on("interrupt.brush end.brush", function() { emitter(this, arguments).end(); })
	          .tween("brush", function() {
	            var that = this,
	                state = that.__brush,
	                emit = emitter(that, arguments),
	                selection0 = state.selection,
	                selection1 = dim.input(typeof selection === "function" ? selection.apply(this, arguments) : selection, state.extent),
	                i = d3Interpolate.interpolate(selection0, selection1);
	
	            function tween(t) {
	              state.selection = t === 1 && empty(selection1) ? null : i(t);
	              redraw.call(that);
	              emit.brush();
	            }
	
	            return selection0 && selection1 ? tween : tween(1);
	          });
	    } else {
	      group
	          .each(function() {
	            var that = this,
	                args = arguments,
	                state = that.__brush,
	                selection1 = dim.input(typeof selection === "function" ? selection.apply(that, args) : selection, state.extent),
	                emit = emitter(that, args).beforestart();
	
	            d3Transition.interrupt(that);
	            state.selection = selection1 == null || empty(selection1) ? null : selection1;
	            redraw.call(that);
	            emit.start().brush().end();
	          });
	    }
	  };
	
	  function redraw() {
	    var group = d3Selection.select(this),
	        selection = local(this).selection;
	
	    if (selection) {
	      group.selectAll(".selection")
	          .style("display", null)
	          .attr("x", selection[0][0])
	          .attr("y", selection[0][1])
	          .attr("width", selection[1][0] - selection[0][0])
	          .attr("height", selection[1][1] - selection[0][1]);
	
	      group.selectAll(".handle")
	          .style("display", null)
	          .attr("x", function(d) { return d.type[d.type.length - 1] === "e" ? selection[1][0] - handleSize / 2 : selection[0][0] - handleSize / 2; })
	          .attr("y", function(d) { return d.type[0] === "s" ? selection[1][1] - handleSize / 2 : selection[0][1] - handleSize / 2; })
	          .attr("width", function(d) { return d.type === "n" || d.type === "s" ? selection[1][0] - selection[0][0] + handleSize : handleSize; })
	          .attr("height", function(d) { return d.type === "e" || d.type === "w" ? selection[1][1] - selection[0][1] + handleSize : handleSize; });
	    }
	
	    else {
	      group.selectAll(".selection,.handle")
	          .style("display", "none")
	          .attr("x", null)
	          .attr("y", null)
	          .attr("width", null)
	          .attr("height", null);
	    }
	  }
	
	  function emitter(that, args) {
	    return that.__brush.emitter || new Emitter(that, args);
	  }
	
	  function Emitter(that, args) {
	    this.that = that;
	    this.args = args;
	    this.state = that.__brush;
	    this.active = 0;
	  }
	
	  Emitter.prototype = {
	    beforestart: function() {
	      if (++this.active === 1) this.state.emitter = this, this.starting = true;
	      return this;
	    },
	    start: function() {
	      if (this.starting) this.starting = false, this.emit("start");
	      return this;
	    },
	    brush: function() {
	      this.emit("brush");
	      return this;
	    },
	    end: function() {
	      if (--this.active === 0) delete this.state.emitter, this.emit("end");
	      return this;
	    },
	    emit: function(type) {
	      d3Selection.customEvent(new BrushEvent(brush, type, dim.output(this.state.selection)), listeners.apply, listeners, [type, this.that, this.args]);
	    }
	  };
	
	  function started() {
	    if (d3Selection.event.touches) { if (d3Selection.event.changedTouches.length < d3Selection.event.touches.length) return noevent(); }
	    else if (touchending) return;
	    if (!filter.apply(this, arguments)) return;
	
	    var that = this,
	        type = d3Selection.event.target.__data__.type,
	        mode = (d3Selection.event.metaKey ? type = "overlay" : type) === "selection" ? MODE_DRAG : (d3Selection.event.altKey ? MODE_CENTER : MODE_HANDLE),
	        signX = dim === Y ? null : signsX[type],
	        signY = dim === X ? null : signsY[type],
	        state = local(that),
	        extent = state.extent,
	        selection = state.selection,
	        W = extent[0][0], w0, w1,
	        N = extent[0][1], n0, n1,
	        E = extent[1][0], e0, e1,
	        S = extent[1][1], s0, s1,
	        dx,
	        dy,
	        moving,
	        shifting = signX && signY && d3Selection.event.shiftKey,
	        lockX,
	        lockY,
	        point0 = d3Selection.mouse(that),
	        point = point0,
	        emit = emitter(that, arguments).beforestart();
	
	    if (type === "overlay") {
	      state.selection = selection = [
	        [w0 = dim === Y ? W : point0[0], n0 = dim === X ? N : point0[1]],
	        [e0 = dim === Y ? E : w0, s0 = dim === X ? S : n0]
	      ];
	    } else {
	      w0 = selection[0][0];
	      n0 = selection[0][1];
	      e0 = selection[1][0];
	      s0 = selection[1][1];
	    }
	
	    w1 = w0;
	    n1 = n0;
	    e1 = e0;
	    s1 = s0;
	
	    var group = d3Selection.select(that)
	        .attr("pointer-events", "none");
	
	    var overlay = group.selectAll(".overlay")
	        .attr("cursor", cursors[type]);
	
	    if (d3Selection.event.touches) {
	      group
	          .on("touchmove.brush", moved, true)
	          .on("touchend.brush touchcancel.brush", ended, true);
	    } else {
	      var view = d3Selection.select(d3Selection.event.view)
	          .on("keydown.brush", keydowned, true)
	          .on("keyup.brush", keyupped, true)
	          .on("mousemove.brush", moved, true)
	          .on("mouseup.brush", ended, true);
	
	      d3Drag.dragDisable(d3Selection.event.view);
	    }
	
	    nopropagation();
	    d3Transition.interrupt(that);
	    redraw.call(that);
	    emit.start();
	
	    function moved() {
	      var point1 = d3Selection.mouse(that);
	      if (shifting && !lockX && !lockY) {
	        if (Math.abs(point1[0] - point[0]) > Math.abs(point1[1] - point[1])) lockY = true;
	        else lockX = true;
	      }
	      point = point1;
	      moving = true;
	      noevent();
	      move();
	    }
	
	    function move() {
	      var t;
	
	      dx = point[0] - point0[0];
	      dy = point[1] - point0[1];
	
	      switch (mode) {
	        case MODE_SPACE:
	        case MODE_DRAG: {
	          if (signX) dx = Math.max(W - w0, Math.min(E - e0, dx)), w1 = w0 + dx, e1 = e0 + dx;
	          if (signY) dy = Math.max(N - n0, Math.min(S - s0, dy)), n1 = n0 + dy, s1 = s0 + dy;
	          break;
	        }
	        case MODE_HANDLE: {
	          if (signX < 0) dx = Math.max(W - w0, Math.min(E - w0, dx)), w1 = w0 + dx, e1 = e0;
	          else if (signX > 0) dx = Math.max(W - e0, Math.min(E - e0, dx)), w1 = w0, e1 = e0 + dx;
	          if (signY < 0) dy = Math.max(N - n0, Math.min(S - n0, dy)), n1 = n0 + dy, s1 = s0;
	          else if (signY > 0) dy = Math.max(N - s0, Math.min(S - s0, dy)), n1 = n0, s1 = s0 + dy;
	          break;
	        }
	        case MODE_CENTER: {
	          if (signX) w1 = Math.max(W, Math.min(E, w0 - dx * signX)), e1 = Math.max(W, Math.min(E, e0 + dx * signX));
	          if (signY) n1 = Math.max(N, Math.min(S, n0 - dy * signY)), s1 = Math.max(N, Math.min(S, s0 + dy * signY));
	          break;
	        }
	      }
	
	      if (e1 < w1) {
	        signX *= -1;
	        t = w0, w0 = e0, e0 = t;
	        t = w1, w1 = e1, e1 = t;
	        if (type in flipX) overlay.attr("cursor", cursors[type = flipX[type]]);
	      }
	
	      if (s1 < n1) {
	        signY *= -1;
	        t = n0, n0 = s0, s0 = t;
	        t = n1, n1 = s1, s1 = t;
	        if (type in flipY) overlay.attr("cursor", cursors[type = flipY[type]]);
	      }
	
	      if (state.selection) selection = state.selection; // May be set by brush.move!
	      if (lockX) w1 = selection[0][0], e1 = selection[1][0];
	      if (lockY) n1 = selection[0][1], s1 = selection[1][1];
	
	      if (selection[0][0] !== w1
	          || selection[0][1] !== n1
	          || selection[1][0] !== e1
	          || selection[1][1] !== s1) {
	        state.selection = [[w1, n1], [e1, s1]];
	        redraw.call(that);
	        emit.brush();
	      }
	    }
	
	    function ended() {
	      nopropagation();
	      if (d3Selection.event.touches) {
	        if (d3Selection.event.touches.length) return;
	        if (touchending) clearTimeout(touchending);
	        touchending = setTimeout(function() { touchending = null; }, 500); // Ghost clicks are delayed!
	        group.on("touchmove.brush touchend.brush touchcancel.brush", null);
	      } else {
	        d3Drag.dragEnable(d3Selection.event.view, moving);
	        view.on("keydown.brush keyup.brush mousemove.brush mouseup.brush", null);
	      }
	      group.attr("pointer-events", "all");
	      overlay.attr("cursor", cursors.overlay);
	      if (state.selection) selection = state.selection; // May be set by brush.move (on start)!
	      if (empty(selection)) state.selection = null, redraw.call(that);
	      emit.end();
	    }
	
	    function keydowned() {
	      switch (d3Selection.event.keyCode) {
	        case 16: { // SHIFT
	          shifting = signX && signY;
	          break;
	        }
	        case 18: { // ALT
	          if (mode === MODE_HANDLE) {
	            if (signX) e0 = e1 - dx * signX, w0 = w1 + dx * signX;
	            if (signY) s0 = s1 - dy * signY, n0 = n1 + dy * signY;
	            mode = MODE_CENTER;
	            move();
	          }
	          break;
	        }
	        case 32: { // SPACE; takes priority over ALT
	          if (mode === MODE_HANDLE || mode === MODE_CENTER) {
	            if (signX < 0) e0 = e1 - dx; else if (signX > 0) w0 = w1 - dx;
	            if (signY < 0) s0 = s1 - dy; else if (signY > 0) n0 = n1 - dy;
	            mode = MODE_SPACE;
	            overlay.attr("cursor", cursors.selection);
	            move();
	          }
	          break;
	        }
	        default: return;
	      }
	      noevent();
	    }
	
	    function keyupped() {
	      switch (d3Selection.event.keyCode) {
	        case 16: { // SHIFT
	          if (shifting) {
	            lockX = lockY = shifting = false;
	            move();
	          }
	          break;
	        }
	        case 18: { // ALT
	          if (mode === MODE_CENTER) {
	            if (signX < 0) e0 = e1; else if (signX > 0) w0 = w1;
	            if (signY < 0) s0 = s1; else if (signY > 0) n0 = n1;
	            mode = MODE_HANDLE;
	            move();
	          }
	          break;
	        }
	        case 32: { // SPACE
	          if (mode === MODE_SPACE) {
	            if (d3Selection.event.altKey) {
	              if (signX) e0 = e1 - dx * signX, w0 = w1 + dx * signX;
	              if (signY) s0 = s1 - dy * signY, n0 = n1 + dy * signY;
	              mode = MODE_CENTER;
	            } else {
	              if (signX < 0) e0 = e1; else if (signX > 0) w0 = w1;
	              if (signY < 0) s0 = s1; else if (signY > 0) n0 = n1;
	              mode = MODE_HANDLE;
	            }
	            overlay.attr("cursor", cursors[type]);
	            move();
	          }
	          break;
	        }
	        default: return;
	      }
	      noevent();
	    }
	  }
	
	  function initialize() {
	    var state = this.__brush || {selection: null};
	    state.extent = extent.apply(this, arguments);
	    state.dim = dim;
	    return state;
	  }
	
	  brush.extent = function(_) {
	    return arguments.length ? (extent = typeof _ === "function" ? _ : constant([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), brush) : extent;
	  };
	
	  brush.filter = function(_) {
	    return arguments.length ? (filter = typeof _ === "function" ? _ : constant(!!_), brush) : filter;
	  };
	
	  brush.handleSize = function(_) {
	    return arguments.length ? (handleSize = +_, brush) : handleSize;
	  };
	
	  brush.on = function() {
	    var value = listeners.on.apply(listeners, arguments);
	    return value === listeners ? brush : value;
	  };
	
	  return brush;
	}
	
	exports.brush = brush;
	exports.brushX = brushX;
	exports.brushY = brushY;
	exports.brushSelection = brushSelection;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-drag/ Version 1.1.0. Copyright 2017 Mike Bostock.
	(function (global, factory) {
		 true ? factory(exports, __webpack_require__(12), __webpack_require__(4)) :
		typeof define === 'function' && define.amd ? define(['exports', 'd3-dispatch', 'd3-selection'], factory) :
		(factory((global.d3 = global.d3 || {}),global.d3,global.d3));
	}(this, (function (exports,d3Dispatch,d3Selection) { 'use strict';
	
	function nopropagation() {
	  d3Selection.event.stopImmediatePropagation();
	}
	
	var noevent = function() {
	  d3Selection.event.preventDefault();
	  d3Selection.event.stopImmediatePropagation();
	};
	
	var nodrag = function(view) {
	  var root = view.document.documentElement,
	      selection = d3Selection.select(view).on("dragstart.drag", noevent, true);
	  if ("onselectstart" in root) {
	    selection.on("selectstart.drag", noevent, true);
	  } else {
	    root.__noselect = root.style.MozUserSelect;
	    root.style.MozUserSelect = "none";
	  }
	};
	
	function yesdrag(view, noclick) {
	  var root = view.document.documentElement,
	      selection = d3Selection.select(view).on("dragstart.drag", null);
	  if (noclick) {
	    selection.on("click.drag", noevent, true);
	    setTimeout(function() { selection.on("click.drag", null); }, 0);
	  }
	  if ("onselectstart" in root) {
	    selection.on("selectstart.drag", null);
	  } else {
	    root.style.MozUserSelect = root.__noselect;
	    delete root.__noselect;
	  }
	}
	
	var constant = function(x) {
	  return function() {
	    return x;
	  };
	};
	
	function DragEvent(target, type, subject, id, active, x, y, dx, dy, dispatch$$1) {
	  this.target = target;
	  this.type = type;
	  this.subject = subject;
	  this.identifier = id;
	  this.active = active;
	  this.x = x;
	  this.y = y;
	  this.dx = dx;
	  this.dy = dy;
	  this._ = dispatch$$1;
	}
	
	DragEvent.prototype.on = function() {
	  var value = this._.on.apply(this._, arguments);
	  return value === this._ ? this : value;
	};
	
	// Ignore right-click, since that should open the context menu.
	function defaultFilter() {
	  return !d3Selection.event.button;
	}
	
	function defaultContainer() {
	  return this.parentNode;
	}
	
	function defaultSubject(d) {
	  return d == null ? {x: d3Selection.event.x, y: d3Selection.event.y} : d;
	}
	
	var drag = function() {
	  var filter = defaultFilter,
	      container = defaultContainer,
	      subject = defaultSubject,
	      gestures = {},
	      listeners = d3Dispatch.dispatch("start", "drag", "end"),
	      active = 0,
	      mousedownx,
	      mousedowny,
	      mousemoving,
	      touchending,
	      clickDistance2 = 0;
	
	  function drag(selection) {
	    selection
	        .on("mousedown.drag", mousedowned)
	        .on("touchstart.drag", touchstarted)
	        .on("touchmove.drag", touchmoved)
	        .on("touchend.drag touchcancel.drag", touchended)
	        .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
	  }
	
	  function mousedowned() {
	    if (touchending || !filter.apply(this, arguments)) return;
	    var gesture = beforestart("mouse", container.apply(this, arguments), d3Selection.mouse, this, arguments);
	    if (!gesture) return;
	    d3Selection.select(d3Selection.event.view).on("mousemove.drag", mousemoved, true).on("mouseup.drag", mouseupped, true);
	    nodrag(d3Selection.event.view);
	    nopropagation();
	    mousemoving = false;
	    mousedownx = d3Selection.event.clientX;
	    mousedowny = d3Selection.event.clientY;
	    gesture("start");
	  }
	
	  function mousemoved() {
	    noevent();
	    if (!mousemoving) {
	      var dx = d3Selection.event.clientX - mousedownx, dy = d3Selection.event.clientY - mousedowny;
	      mousemoving = dx * dx + dy * dy > clickDistance2;
	    }
	    gestures.mouse("drag");
	  }
	
	  function mouseupped() {
	    d3Selection.select(d3Selection.event.view).on("mousemove.drag mouseup.drag", null);
	    yesdrag(d3Selection.event.view, mousemoving);
	    noevent();
	    gestures.mouse("end");
	  }
	
	  function touchstarted() {
	    if (!filter.apply(this, arguments)) return;
	    var touches = d3Selection.event.changedTouches,
	        c = container.apply(this, arguments),
	        n = touches.length, i, gesture;
	
	    for (i = 0; i < n; ++i) {
	      if (gesture = beforestart(touches[i].identifier, c, d3Selection.touch, this, arguments)) {
	        nopropagation();
	        gesture("start");
	      }
	    }
	  }
	
	  function touchmoved() {
	    var touches = d3Selection.event.changedTouches,
	        n = touches.length, i, gesture;
	
	    for (i = 0; i < n; ++i) {
	      if (gesture = gestures[touches[i].identifier]) {
	        noevent();
	        gesture("drag");
	      }
	    }
	  }
	
	  function touchended() {
	    var touches = d3Selection.event.changedTouches,
	        n = touches.length, i, gesture;
	
	    if (touchending) clearTimeout(touchending);
	    touchending = setTimeout(function() { touchending = null; }, 500); // Ghost clicks are delayed!
	    for (i = 0; i < n; ++i) {
	      if (gesture = gestures[touches[i].identifier]) {
	        nopropagation();
	        gesture("end");
	      }
	    }
	  }
	
	  function beforestart(id, container, point, that, args) {
	    var p = point(container, id), s, dx, dy,
	        sublisteners = listeners.copy();
	
	    if (!d3Selection.customEvent(new DragEvent(drag, "beforestart", s, id, active, p[0], p[1], 0, 0, sublisteners), function() {
	      if ((d3Selection.event.subject = s = subject.apply(that, args)) == null) return false;
	      dx = s.x - p[0] || 0;
	      dy = s.y - p[1] || 0;
	      return true;
	    })) return;
	
	    return function gesture(type) {
	      var p0 = p, n;
	      switch (type) {
	        case "start": gestures[id] = gesture, n = active++; break;
	        case "end": delete gestures[id], --active; // nobreak
	        case "drag": p = point(container, id), n = active; break;
	      }
	      d3Selection.customEvent(new DragEvent(drag, type, s, id, n, p[0] + dx, p[1] + dy, p[0] - p0[0], p[1] - p0[1], sublisteners), sublisteners.apply, sublisteners, [type, that, args]);
	    };
	  }
	
	  drag.filter = function(_) {
	    return arguments.length ? (filter = typeof _ === "function" ? _ : constant(!!_), drag) : filter;
	  };
	
	  drag.container = function(_) {
	    return arguments.length ? (container = typeof _ === "function" ? _ : constant(_), drag) : container;
	  };
	
	  drag.subject = function(_) {
	    return arguments.length ? (subject = typeof _ === "function" ? _ : constant(_), drag) : subject;
	  };
	
	  drag.on = function() {
	    var value = listeners.on.apply(listeners, arguments);
	    return value === listeners ? drag : value;
	  };
	
	  drag.clickDistance = function(_) {
	    return arguments.length ? (clickDistance2 = (_ = +_) * _, drag) : Math.sqrt(clickDistance2);
	  };
	
	  return drag;
	};
	
	exports.drag = drag;
	exports.dragDisable = nodrag;
	exports.dragEnable = yesdrag;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    'use strict';
	
	    var d3Array = __webpack_require__(9);
	    var d3Axis = __webpack_require__(10);
	    var d3Collection = __webpack_require__(11);
	    var d3Dispatch = __webpack_require__(12);
	    var d3Ease = __webpack_require__(13);
	    var d3Scale = __webpack_require__(14);
	    var d3Shape = __webpack_require__(20);
	    var d3Selection = __webpack_require__(4);
	    var d3Transition = __webpack_require__(22);
	    var d3TimeFormat = __webpack_require__(19);
	
	    var _require = __webpack_require__(25),
	        exportChart = _require.exportChart;
	
	    var colorHelper = __webpack_require__(7);
	    var timeAxisHelper = __webpack_require__(30);
	
	    var _require2 = __webpack_require__(31),
	        isInteger = _require2.isInteger;
	
	    var _require3 = __webpack_require__(26),
	        axisTimeCombinations = _require3.axisTimeCombinations,
	        lineGradientId = _require3.lineGradientId;
	
	    var _require4 = __webpack_require__(32),
	        formatIntegerValue = _require4.formatIntegerValue,
	        formatDecimalValue = _require4.formatDecimalValue;
	
	    /**
	     * @typedef D3Selection
	     * @type {Array[]}
	     * @property {Number} length            Size of the selection
	     * @property {DOMElement} parentNode    Parent of the selection
	     */
	
	    /**
	     * @typedef lineChartDataByTopic
	     * @type {Object}
	     * @property {String} topicName    Topic name (required)
	     * @property {Number} topic        Topic identifier (required)
	     * @property {Object[]} dates      All date entries with values for that topic (required)
	     *
	     * @example
	     * {
	     *     topicName: 'San Francisco',
	     *     topic: 123,
	     *     dates: [
	     *         {
	     *             date: '2017-01-16T16:00:00-08:00',
	     *             value: 1
	     *         },
	     *         {
	     *             date: '2017-01-16T17:00:00-08:00',
	     *             value: 2
	     *         }
	     *     ]
	     * }
	     */
	
	    /**
	     * @typedef LineChartData
	     * @type {Object[]}
	     * @property {lineChartDataByTopic[]} dataByTopic  Data values to chart (required)
	     *
	     * @example
	     * {
	     *     dataByTopic: [
	     *         {
	     *             topicName: 'San Francisco',
	     *             topic: 123,
	     *             dates: [
	     *                 {
	     *                     date: '2017-01-16T16:00:00-08:00',
	     *                     value: 1
	     *                 },
	     *                 {
	     *                     date: '2017-01-16T17:00:00-08:00',
	     *                     value: 2
	     *                 }
	     *             ]
	     *         },
	     *         {
	     *             topicName: 'Other',
	     *             topic: 345,
	     *             dates: [
	     *                 {...},
	     *                 {...}
	     *             ]
	     *         }
	     *     ]
	     * }
	     */
	
	    /**
	     * Line Chart reusable API module that allows us
	     * rendering a multi line and configurable chart.
	     *
	     * @module Line
	     * @tutorial line
	     * @requires d3-array, d3-axis, d3-brush, d3-ease, d3-format, d3-scale, d3-shape, d3-selection, d3-time, d3-time-format
	     *
	     * @example
	     * let lineChart = line();
	     *
	     * lineChart
	     *     .aspectRatio(0.5)
	     *     .width(500);
	     *
	     * d3Selection.select('.css-selector')
	     *     .datum(dataset)
	     *     .call(lineChart);
	     *
	     */
	
	
	    return function line() {
	
	        var margin = {
	            top: 60,
	            right: 30,
	            bottom: 40,
	            left: 70
	        },
	            width = 960,
	            height = 500,
	            aspectRatio = null,
	            tooltipThreshold = 480,
	            svg = void 0,
	            chartWidth = void 0,
	            chartHeight = void 0,
	            xScale = void 0,
	            yScale = void 0,
	            colorScale = void 0,
	            xAxis = void 0,
	            xMonthAxis = void 0,
	            yAxis = void 0,
	            xAxisPadding = {
	            top: 0,
	            left: 15,
	            bottom: 0,
	            right: 0
	        },
	            monthAxisPadding = 28,
	            tickPadding = 5,
	            colorSchema = colorHelper.colorSchemas.britechartsColorSchema,
	            singleLineGradientColors = colorHelper.colorGradients.greenBlueGradient,
	            topicColorMap = void 0,
	            forceAxisSettings = null,
	            forcedXTicks = null,
	            forcedXFormat = null,
	            isAnimated = false,
	            ease = d3Ease.easeQuadInOut,
	            animationDuration = 1500,
	            maskingRectangle = void 0,
	            dataByTopic = void 0,
	            dataByDate = void 0,
	            dateLabel = 'date',
	            valueLabel = 'value',
	            topicLabel = 'topic',
	            topicNameLabel = 'topicName',
	            verticalTicks = 5,
	            overlay = void 0,
	            overlayColor = 'rgba(0, 0, 0, 0)',
	            verticalMarkerContainer = void 0,
	            verticalMarkerLine = void 0,
	            verticalGridLines = void 0,
	            horizontalGridLines = void 0,
	            grid = null,
	            baseLine = void 0,
	
	
	        // extractors
	        getDate = function getDate(_ref) {
	            var date = _ref.date;
	            return date;
	        },
	            getValue = function getValue(_ref2) {
	            var value = _ref2.value;
	            return value;
	        },
	            getTopic = function getTopic(_ref3) {
	            var topic = _ref3.topic;
	            return topic;
	        },
	            getLineColor = function getLineColor(_ref4) {
	            var topic = _ref4.topic;
	            return colorScale(topic);
	        },
	
	
	        // events
	        dispatcher = d3Dispatch.dispatch('customMouseOver', 'customMouseOut', 'customMouseMove');
	
	        /**
	         * This function creates the graph using the selection and data provided
	         *
	         * @param {D3Selection} _selection A d3 selection that represents
	         *                                  the container(s) where the chart(s) will be rendered
	         * @param {LineChartData} _data The data to attach and generate the chart
	         */
	        function exports(_selection) {
	            _selection.each(function (_data) {
	                var _cleanData = cleanData(_data);
	
	                dataByTopic = _cleanData.dataByTopic;
	                dataByDate = _cleanData.dataByDate;
	
	
	                chartWidth = width - margin.left - margin.right;
	                chartHeight = height - margin.top - margin.bottom;
	
	                buildScales();
	                buildSVG(this);
	                buildAxis();
	                drawAxis();
	                buildGradient();
	                drawLines();
	                createMaskingClip();
	
	                if (shouldShowTooltip()) {
	                    drawVerticalMarker();
	                    drawHoverOverlay();
	                    addMouseEvents();
	                }
	            });
	        }
	
	        /**
	         * Adds events to the container group if the environment is not mobile
	         * Adding: mouseover, mouseout and mousemove
	         */
	        function addMouseEvents() {
	            svg.on('mouseover', handleMouseOver).on('mouseout', handleMouseOut).on('mousemove', handleMouseMove);
	        }
	
	        /**
	         * Adjusts the position of the y axis' ticks
	         * @param  {D3Selection} selection Y axis group
	         * @return void
	         */
	        function adjustYTickLabels(selection) {
	            selection.selectAll('.tick text').attr('transform', 'translate(0, -7)');
	        }
	
	        /**
	         * Formats the value depending on its characteristics
	         * @param  {Number} value Value to format
	         * @return {Number}       Formatted value
	         */
	        function getFormattedValue(value) {
	            var format = void 0;
	
	            if (isInteger(value)) {
	                format = formatIntegerValue;
	            } else {
	                format = formatDecimalValue;
	            }
	
	            return format(value);
	        }
	
	        /**
	         * Creates the d3 x and y axis, setting orientations
	         * @private
	         */
	        function buildAxis() {
	            var dataTimeSpan = yScale.domain()[1] - yScale.domain()[0];
	            var yTickNumber = dataTimeSpan < verticalTicks - 1 ? dataTimeSpan : verticalTicks;
	            var minor = void 0,
	                major = void 0;
	
	            if (forceAxisSettings === 'custom' && typeof forcedXFormat === 'string') {
	                minor = {
	                    tick: forcedXTicks,
	                    format: d3TimeFormat.timeFormat(forcedXFormat)
	                };
	                major = null;
	            } else {
	                var _timeAxisHelper$getXA = timeAxisHelper.getXAxisSettings(dataByDate, width, forceAxisSettings);
	
	                minor = _timeAxisHelper$getXA.minor;
	                major = _timeAxisHelper$getXA.major;
	
	
	                xMonthAxis = d3Axis.axisBottom(xScale).ticks(major.tick).tickSize(0, 0).tickFormat(major.format);
	            }
	
	            xAxis = d3Axis.axisBottom(xScale).ticks(minor.tick).tickSize(10, 0).tickPadding(tickPadding).tickFormat(minor.format);
	
	            yAxis = d3Axis.axisLeft(yScale).ticks(yTickNumber).tickSize([0]).tickPadding(tickPadding).tickFormat(getFormattedValue);
	
	            drawGridLines(minor.tick, yTickNumber);
	        }
	
	        /**
	         * Builds containers for the chart, the axis and a wrapper for all of them
	         * NOTE: The order of drawing of this group elements is really important,
	         * as everything else will be drawn on top of them
	         * @private
	         */
	        function buildContainerGroups() {
	            var container = svg.append('g').classed('container-group', true).attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
	
	            container.append('g').classed('x-axis-group', true).append('g').classed('axis x', true);
	            container.selectAll('.x-axis-group').append('g').classed('month-axis', true);
	            container.append('g').classed('y-axis-group axis y', true);
	            container.append('g').classed('grid-lines-group', true);
	            container.append('g').classed('chart-group', true);
	            container.append('g').classed('metadata-group', true);
	        }
	
	        /**
	         * Builds the gradient element to be used later
	         * @return {void}
	         */
	        function buildGradient() {
	            svg.select('.metadata-group').append('linearGradient').attr('id', lineGradientId).attr('x1', '0%').attr('y1', '0%').attr('x2', '100%').attr('y2', '0%').selectAll('stop').data([{ offset: '0%', color: singleLineGradientColors[0] }, { offset: '100%', color: singleLineGradientColors[1] }]).enter().append('stop').attr('offset', function (_ref5) {
	                var offset = _ref5.offset;
	                return offset;
	            }).attr('stop-color', function (_ref6) {
	                var color = _ref6.color;
	                return color;
	            });
	        }
	
	        /**
	         * Creates the x and y scales of the graph
	         * @private
	         */
	        function buildScales() {
	            var minX = d3Array.min(dataByTopic, function (_ref7) {
	                var dates = _ref7.dates;
	                return d3Array.min(dates, getDate);
	            }),
	                maxX = d3Array.max(dataByTopic, function (_ref8) {
	                var dates = _ref8.dates;
	                return d3Array.max(dates, getDate);
	            }),
	                maxY = d3Array.max(dataByTopic, function (_ref9) {
	                var dates = _ref9.dates;
	                return d3Array.max(dates, getValue);
	            }),
	                minY = d3Array.min(dataByTopic, function (_ref10) {
	                var dates = _ref10.dates;
	                return d3Array.min(dates, getValue);
	            });
	            var yScaleBottomValue = Math.abs(minY) < 0 ? Math.abs(minY) : 0;
	
	            xScale = d3Scale.scaleTime().domain([minX, maxX]).rangeRound([0, chartWidth]);
	
	            yScale = d3Scale.scaleLinear().domain([yScaleBottomValue, Math.abs(maxY)]).rangeRound([chartHeight, 0]).nice();
	
	            colorScale = d3Scale.scaleOrdinal().range(colorSchema).domain(dataByTopic.map(getTopic));
	
	            var range = colorScale.range();
	            topicColorMap = colorScale.domain().reduce(function (memo, item, i) {
	                memo[item] = range[i];
	
	                return memo;
	            }, {});
	        }
	
	        /**
	         * Builds the SVG element that will contain the chart
	         *
	         * @param  {HTMLElement} container DOM element that will work as the container of the graph
	         * @private
	         */
	        function buildSVG(container) {
	            if (!svg) {
	                svg = d3Selection.select(container).append('svg').classed('britechart line-chart', true);
	
	                buildContainerGroups();
	            }
	
	            svg.attr('width', width).attr('height', height);
	        }
	
	        /**
	         * Parses dates and values into JS Date objects and numbers
	         * @param  {obj} dataByTopic    Raw data grouped by topic
	         * @return {obj}                Parsed data with dataByTopic and dataByDate
	         */
	        function cleanData(_ref11) {
	            var dataByTopic = _ref11.dataByTopic,
	                dataByDate = _ref11.dataByDate;
	
	
	            if (dataByTopic) {
	                var flatData = [];
	
	                dataByTopic.forEach(function (topic) {
	                    topic.dates.forEach(function (date) {
	                        flatData.push({
	                            topicName: topic[topicNameLabel],
	                            name: topic[topicLabel],
	                            date: date[dateLabel],
	                            value: date[valueLabel]
	                        });
	                    });
	                });
	
	                // Nest data by date and format
	                dataByDate = d3Collection.nest().key(getDate).entries(flatData).map(function (d) {
	                    return {
	                        date: new Date(d.key),
	                        topics: d.values
	                    };
	                });
	
	                // Normalize dates in keys
	                dataByDate = dataByDate.map(function (d) {
	                    d.date = new Date(d.date);
	
	                    return d;
	                });
	
	                // Normalize dataByTopic
	                dataByTopic.forEach(function (kv) {
	                    kv.dates.forEach(function (d) {
	                        d.date = new Date(d[dateLabel]);
	                        d.value = +d[valueLabel];
	                    });
	                });
	            }
	
	            return { dataByTopic: dataByTopic, dataByDate: dataByDate };
	        }
	
	        /**
	         * Removes all the datapoints highlighter circles added to the marker container
	         * @return void
	         */
	        function cleanDataPointHighlights() {
	            verticalMarkerContainer.selectAll('.circle-container').remove();
	        }
	
	        /**
	         * Creates a masking clip that would help us fake an animation if the
	         * proper flag is true
	         *
	         * @return {void}
	         */
	        function createMaskingClip() {
	            if (isAnimated) {
	                // We use a white rectangle to simulate the line drawing animation
	                maskingRectangle = svg.append('rect').attr('class', 'masking-rectangle').attr('width', width).attr('height', height).attr('x', 0).attr('y', 0);
	
	                maskingRectangle.transition().duration(animationDuration).ease(ease).attr('x', width).on('end', function () {
	                    return maskingRectangle.remove();
	                });
	            }
	        }
	
	        /**
	         * Draws the x and y axis on the svg object within their
	         * respective groups
	         * @private
	         */
	        function drawAxis() {
	            svg.select('.x-axis-group .axis.x').attr('transform', 'translate(0, ' + chartHeight + ')').call(xAxis);
	
	            if (forceAxisSettings !== 'custom') {
	                svg.select('.x-axis-group .month-axis').attr('transform', 'translate(0, ' + (chartHeight + monthAxisPadding) + ')').call(xMonthAxis);
	            }
	
	            svg.select('.y-axis-group.axis.y').transition().ease(ease).attr('transform', 'translate(' + -xAxisPadding.left + ', 0)').call(yAxis).call(adjustYTickLabels);
	        }
	
	        /**
	         * Draws the line elements within the chart group
	         * @private
	         */
	        function drawLines() {
	            var lines = void 0,
	                topicLine = void 0;
	
	            topicLine = d3Shape.line().x(function (_ref12) {
	                var date = _ref12.date;
	                return xScale(date);
	            }).y(function (_ref13) {
	                var value = _ref13.value;
	                return yScale(value);
	            });
	
	            lines = svg.select('.chart-group').selectAll('.line').data(dataByTopic);
	
	            lines.enter().append('g').attr('class', 'topic').append('path').attr('class', 'line').attr('d', function (_ref14) {
	                var dates = _ref14.dates;
	                return topicLine(dates);
	            }).style('stroke', function (d) {
	                return dataByTopic.length === 1 ? 'url(#' + lineGradientId + ')' : getLineColor(d);
	            });
	
	            lines.exit().remove();
	        }
	
	        /**
	         * Draws grid lines on the background of the chart
	         * @return void
	         */
	        function drawGridLines(xTicks, yTicks) {
	            if (grid === 'horizontal' || grid === 'full') {
	                horizontalGridLines = svg.select('.grid-lines-group').selectAll('line.horizontal-grid-line').data(yScale.ticks(yTicks)).enter().append('line').attr('class', 'horizontal-grid-line').attr('x1', -xAxisPadding.left - 30).attr('x2', chartWidth).attr('y1', function (d) {
	                    return yScale(d);
	                }).attr('y2', function (d) {
	                    return yScale(d);
	                });
	            }
	
	            if (grid === 'vertical' || grid === 'full') {
	                verticalGridLines = svg.select('.grid-lines-group').selectAll('line.vertical-grid-line').data(xScale.ticks(xTicks)).enter().append('line').attr('class', 'vertical-grid-line').attr('y1', 0).attr('y2', chartHeight).attr('x1', function (d) {
	                    return xScale(d);
	                }).attr('x2', function (d) {
	                    return xScale(d);
	                });
	            }
	
	            //draw a horizontal line to extend x-axis till the edges
	            baseLine = svg.select('.grid-lines-group').selectAll('line.extended-x-line').data([0]).enter().append('line').attr('class', 'extended-x-line').attr('x1', -xAxisPadding.left - 30).attr('x2', chartWidth).attr('y1', height - margin.bottom - margin.top).attr('y2', height - margin.bottom - margin.top);
	        }
	
	        /**
	         * Draws an overlay element over the graph
	         * @inner
	         * @return void
	         */
	        function drawHoverOverlay() {
	            overlay = svg.select('.metadata-group').append('rect').attr('class', 'overlay').attr('y1', 0).attr('y2', height).attr('height', chartHeight).attr('width', chartWidth).attr('fill', overlayColor).style('display', 'none');
	        }
	
	        /**
	         * Creates the vertical marker
	         * @return void
	         */
	        function drawVerticalMarker() {
	            verticalMarkerContainer = svg.select('.metadata-group').append('g').attr('class', 'hover-marker vertical-marker-container').attr('transform', 'translate(9999, 0)');
	
	            verticalMarkerLine = verticalMarkerContainer.selectAll('path').data([{
	                x1: 0,
	                y1: 0,
	                x2: 0,
	                y2: 0
	            }]).enter().append('line').classed('vertical-marker', true).attr('x1', 0).attr('y1', chartHeight).attr('x2', 0).attr('y2', 0);
	        }
	
	        /**
	         * Finds out which datapoint is closer to the given x position
	         * @param  {Number} x0 Date value for data point
	         * @param  {Object} d0 Previous datapoint
	         * @param  {Object} d1 Next datapoint
	         * @return {Object}    d0 or d1, the datapoint with closest date to x0
	         */
	        function findOutNearestDate(x0, d0, d1) {
	            return new Date(x0).getTime() - new Date(d0.date).getTime() > new Date(d1.date).getTime() - new Date(x0).getTime() ? d0 : d1;
	        }
	
	        /**
	         * Extract X position on the graph from a given mouse event
	         * @param  {Object} event D3 mouse event
	         * @return {Number}       Position on the x axis of the mouse
	         */
	        function getMouseXPosition(event) {
	            return d3Selection.mouse(event)[0];
	        }
	
	        /**
	         * Finds out the data entry that is closer to the given position on pixels
	         * @param  {Number} mouseX X position of the mouse
	         * @return {Object}        Data entry that is closer to that x axis position
	         */
	        function getNearestDataPoint(mouseX) {
	            var dateFromInvertedX = xScale.invert(mouseX);
	            var bisectDate = d3Array.bisector(getDate).left;
	            var dataEntryIndex = bisectDate(dataByDate, dateFromInvertedX, 1);
	            var dataEntryForXPosition = dataByDate[dataEntryIndex];
	            var previousDataEntryForXPosition = dataByDate[dataEntryIndex - 1];
	            var nearestDataPoint = void 0;
	
	            if (previousDataEntryForXPosition && dataEntryForXPosition) {
	                nearestDataPoint = findOutNearestDate(dateFromInvertedX, dataEntryForXPosition, previousDataEntryForXPosition);
	            } else {
	                nearestDataPoint = dataEntryForXPosition;
	            }
	
	            return nearestDataPoint;
	        }
	
	        /**
	         * MouseMove handler, calculates the nearest dataPoint to the cursor
	         * and updates metadata related to it
	         * @private
	         */
	        function handleMouseMove() {
	            var xPositionOffset = -margin.left,
	                //Arbitrary number, will love to know how to assess it
	            dataPoint = getNearestDataPoint(getMouseXPosition(this) + xPositionOffset),
	                dataPointXPosition = void 0;
	
	            if (dataPoint) {
	                dataPointXPosition = xScale(new Date(dataPoint.date));
	                // More verticalMarker to that datapoint
	                moveVerticalMarker(dataPointXPosition);
	                // Add data points highlighting
	                highlightDataPoints(dataPoint);
	                // Emit event with xPosition for tooltip or similar feature
	                dispatcher.call('customMouseMove', this, dataPoint, topicColorMap, dataPointXPosition);
	            }
	        }
	
	        /**
	         * MouseOut handler, hides overlay and removes active class on verticalMarkerLine
	         * It also resets the container of the vertical marker
	         * @private
	         */
	        function handleMouseOut(data) {
	            overlay.style('display', 'none');
	            verticalMarkerLine.classed('bc-is-active', false);
	            verticalMarkerContainer.attr('transform', 'translate(9999, 0)');
	
	            dispatcher.call('customMouseOut', this, data);
	        }
	
	        /**
	         * Mouseover handler, shows overlay and adds active class to verticalMarkerLine
	         * @private
	         */
	        function handleMouseOver(data) {
	            overlay.style('display', 'block');
	            verticalMarkerLine.classed('bc-is-active', true);
	
	            dispatcher.call('customMouseOver', this, data);
	        }
	
	        /**
	         * Creates coloured circles marking where the exact data y value is for a given data point
	         * @param  {Object} dataPoint Data point to extract info from
	         * @private
	         */
	        function highlightDataPoints(dataPoint) {
	            cleanDataPointHighlights();
	
	            // sorting the topics based on the order of the colors,
	            // so that the order always stays constant
	            dataPoint.topics = dataPoint.topics.filter(function (t) {
	                return !!t;
	            }).sort(function (a, b) {
	                return topicColorMap[a.name] < topicColorMap[b.name];
	            });
	
	            dataPoint.topics.forEach(function (_ref15, index) {
	                var name = _ref15.name;
	
	                var marker = verticalMarkerContainer.append('g').classed('circle-container', true),
	                    circleSize = 12;
	
	                marker.append('circle').classed('data-point-highlighter', true).attr('cx', circleSize).attr('cy', 0).attr('r', 5).style('stroke', topicColorMap[name]);
	
	                marker.attr('transform', 'translate( ' + -circleSize + ', ' + yScale(dataPoint.topics[index].value) + ' )');
	            });
	        }
	
	        /**
	         * Helper method to update the x position of the vertical marker
	         * @param  {Object} dataPoint Data entry to extract info
	         * @return void
	         */
	        function moveVerticalMarker(verticalMarkerXPosition) {
	            verticalMarkerContainer.attr('transform', 'translate(' + verticalMarkerXPosition + ',0)');
	        }
	
	        /**
	         * Determines if we should add the tooltip related logic depending on the
	         * size of the chart and the tooltipThreshold variable value
	         * @return {Boolean} Should we build the tooltip?
	         */
	        function shouldShowTooltip() {
	            return width > tooltipThreshold;
	        }
	
	        // API Methods
	
	        /**
	         * Gets or Sets the aspect ratio of the chart
	         * @param  {Number} _x Desired aspect ratio for the graph
	         * @return { (Number | Module) } Current aspect ratio or Line Chart module to chain calls
	         * @public
	         */
	        exports.aspectRatio = function (_x) {
	            if (!arguments.length) {
	                return aspectRatio;
	            }
	            aspectRatio = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the colorSchema of the chart
	         * @param  {String[]} _x Desired colorSchema for the graph
	         * @return { colorSchema | module} Current colorSchema or Chart module to chain calls
	         * @public
	         */
	        exports.colorSchema = function (_x) {
	            if (!arguments.length) {
	                return colorSchema;
	            }
	            colorSchema = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the dateLabel of the chart
	         * @param  {Number} _x Desired dateLabel for the graph
	         * @return { dateLabel | module} Current dateLabel or Chart module to chain calls
	         * @public
	         */
	        exports.dateLabel = function (_x) {
	            if (!arguments.length) {
	                return dateLabel;
	            }
	            dateLabel = _x;
	
	            return this;
	        };
	
	        /**
	         * Exposes the ability to force the chart to show a certain x axis grouping
	         * @param  {String} _x Desired format
	         * @return { (String|Module) }    Current format or module to chain calls
	         * @example
	         *     line.forceAxisFormat(line.axisTimeCombinations.HOUR_DAY)
	         */
	        exports.forceAxisFormat = function (_x) {
	            if (!arguments.length) {
	                return forceAxisSettings;
	            }
	            forceAxisSettings = _x;
	
	            return this;
	        };
	
	        /**
	         * Exposes the ability to force the chart to show a certain x format
	         * It requires a `forceAxisFormat` of 'custom' in order to work.
	         * @param  {String} _x              Desired format for x axis
	         * @return { (String|Module) }      Current format or module to chain calls
	         */
	        exports.forcedXFormat = function (_x) {
	            if (!arguments.length) {
	                return forcedXFormat;
	            }
	            forcedXFormat = _x;
	
	            return this;
	        };
	
	        /**
	         * Exposes the ability to force the chart to show a certain x ticks. It requires a `forceAxisFormat` of 'custom' in order to work.
	         * NOTE: This value needs to be a multiple of 2, 5 or 10. They won't always work as expected, as D3 decides at the end
	         * how many and where the ticks will appear.
	         *
	         * @param  {Number} _x              Desired number of x axis ticks (multiple of 2, 5 or 10)
	         * @return { (Number|Module) }      Current number or ticks or module to chain calls
	         */
	        exports.forcedXTicks = function (_x) {
	            if (!arguments.length) {
	                return forcedXTicks;
	            }
	            forcedXTicks = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the grid mode.
	         *
	         * @param  {String} _x Desired mode for the grid ('vertical'|'horizontal'|'full')
	         * @return { String | module} Current mode of the grid or Line Chart module to chain calls
	         * @public
	         */
	        exports.grid = function (_x) {
	            if (!arguments.length) {
	                return grid;
	            }
	            grid = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the height of the chart
	         * @param  {Number} _x Desired width for the graph
	         * @return { (Number | Module) } Current height or Line Chart module to chain calls
	         * @public
	         */
	        exports.height = function (_x) {
	            if (!arguments.length) {
	                return height;
	            }
	            if (aspectRatio) {
	                width = Math.ceil(_x / aspectRatio);
	            }
	            height = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the isAnimated property of the chart, making it to animate when render.
	         * By default this is 'false'
	         *
	         * @param  {Boolean} _x Desired animation flag
	         * @return { isAnimated | module} Current isAnimated flag or Chart module
	         * @public
	         */
	        exports.isAnimated = function (_x) {
	            if (!arguments.length) {
	                return isAnimated;
	            }
	            isAnimated = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the margin of the chart
	         * @param  {Object} _x Margin object to get/set
	         * @return { (Number | Module) } Current margin or Line Chart module to chain calls
	         * @public
	         */
	        exports.margin = function (_x) {
	            if (!arguments.length) {
	                return margin;
	            }
	            margin = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the gradient colors of the line chart when there is only one line
	         * @param  {String[]} _x Desired color gradient for the line (array of two hexadecimal numbers)
	         * @return { (Number | Module) } Current color gradient or Line Chart module to chain calls
	         * @public
	         */
	        exports.lineGradient = function (_x) {
	            if (!arguments.length) {
	                return singleLineGradientColors;
	            }
	            singleLineGradientColors = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the minimum width of the graph in order to show the tooltip
	         * NOTE: This could also depend on the aspect ratio
	         * @param  {Number} _x Desired tooltip threshold for the graph
	         * @return { (Number | Module) } Current tooltip threshold or Line Chart module to chain calls
	         * @public
	         */
	        exports.tooltipThreshold = function (_x) {
	            if (!arguments.length) {
	                return tooltipThreshold;
	            }
	            tooltipThreshold = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the topicLabel of the chart
	         * @param  {Number} _x Desired topicLabel for the graph
	         * @return { topicLabel | module} Current topicLabel or Chart module to chain calls
	         * @public
	         */
	        exports.topicLabel = function (_x) {
	            if (!arguments.length) {
	                return topicLabel;
	            }
	            topicLabel = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the valueLabel of the chart
	         * @param  {Number} _x Desired valueLabel for the graph
	         * @return { valueLabel | module} Current valueLabel or Chart module to chain calls
	         * @public
	         */
	        exports.valueLabel = function (_x) {
	            if (!arguments.length) {
	                return valueLabel;
	            }
	            valueLabel = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the number of verticalTicks of the yAxis on the chart
	         * @param  {Number} _x Desired verticalTicks
	         * @return { verticalTicks | module} Current verticalTicks or Chart module to chain calls
	         * @public
	         */
	        exports.verticalTicks = function (_x) {
	            if (!arguments.length) {
	                return verticalTicks;
	            }
	            verticalTicks = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the width of the chart
	         * @param  {Number} _x Desired width for the graph
	         * @return { (Number | Module) } Current width or Line Chart module to chain calls
	         * @public
	         */
	        exports.width = function (_x) {
	            if (!arguments.length) {
	                return width;
	            }
	            if (aspectRatio) {
	                height = Math.ceil(_x * aspectRatio);
	            }
	            width = _x;
	
	            return this;
	        };
	
	        /**
	         * Chart exported to png and a download action is fired
	         * @public
	         */
	        exports.exportChart = function (filename, title) {
	            exportChart.call(exports, svg, filename, title);
	        };
	
	        /**
	         * Exposes an 'on' method that acts as a bridge with the event dispatcher
	         * We are going to expose this events:
	         * customMouseHover, customMouseMove and customMouseOut
	         *
	         * @return {module} Bar Chart
	         * @public
	         */
	        exports.on = function () {
	            var value = dispatcher.on.apply(dispatcher, arguments);
	
	            return value === dispatcher ? exports : value;
	        };
	
	        /**
	         * Exposes the constants to be used to force the x axis to respect a certain granularity
	         * current options: MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR
	         * @example
	         *     line.forceAxisFormat(line.axisTimeCombinations.HOUR_DAY)
	         */
	        exports.axisTimeCombinations = axisTimeCombinations;
	
	        return exports;
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    'use strict';
	
	    var _ = __webpack_require__(3),
	        jsonAllDatas = __webpack_require__(61),
	        jsonFiveTopics = __webpack_require__(62),
	        jsonOneSource = __webpack_require__(63),
	        jsonMultiMonthValueRange = __webpack_require__(64),
	        jsonHourDateRange = __webpack_require__(65),
	        jsonSmallValueRange = __webpack_require__(66);
	
	    function LineDataBuilder(config) {
	        this.Klass = LineDataBuilder;
	
	        this.config = _.defaults({}, config);
	
	        this.with5Topics = function () {
	            var attributes = _.extend({}, this.config, jsonFiveTopics);
	
	            return new this.Klass(attributes);
	        };
	
	        this.withOneSource = function () {
	            var attributes = _.extend({}, this.config, jsonOneSource);
	
	            return new this.Klass(attributes);
	        };
	
	        this.withSmallValueRange = function () {
	            var attributes = _.extend({}, this.config, jsonSmallValueRange);
	
	            return new this.Klass(attributes);
	        };
	
	        this.withMultiMonthValueRange = function () {
	            var attributes = _.extend({}, this.config, jsonMultiMonthValueRange);
	
	            return new this.Klass(attributes);
	        };
	
	        this.withHourDateRange = function () {
	            var attributes = _.extend({}, this.config, jsonHourDateRange);
	
	            return new this.Klass(attributes);
	        };
	
	        this.withAllDatas = function () {
	            var attributes = _.extend({}, this.config, jsonAllDatas);
	
	            return new this.Klass(attributes);
	        };
	
	        /**
	         * Sets the path for fetching the data
	         * @param  {string} path Desired path for test data
	         * @return {LineDataBuilder}      Builder object
	         */
	        this.withPath = function (path) {
	            var attributes = _.extend({}, this.config, {
	                jsonURL: path
	            });
	
	            return new this.Klass(attributes);
	        };
	
	        this.build = function () {
	            return this.config;
	        };
	    }
	
	    return {
	        LineDataBuilder: LineDataBuilder
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 61 */
/***/ (function(module, exports) {

	module.exports = {
		"data": [
			{
				"topicName": "Sales",
				"topic": -1,
				"value": 15,
				"date": "2015-12-30T00:00:00-08:00"
			},
			{
				"topicName": "Sales",
				"topic": -1,
				"value": 16,
				"date": "2015-12-31T00:00:00-08:00"
			},
			{
				"topicName": "Sales",
				"topic": -1,
				"value": 15,
				"date": "2016-01-01T00:00:00-08:00"
			},
			{
				"topicName": "Sales",
				"topic": -1,
				"value": 18,
				"date": "2016-01-02T00:00:00-08:00"
			},
			{
				"topicName": "Sales",
				"topic": -1,
				"value": 16,
				"date": "2016-01-03T00:00:00-08:00"
			}
		],
		"dataByTopic": [
			{
				"topic": -1,
				"topicName": "Sales",
				"dates": [
					{
						"value": 15,
						"date": "2015-12-30T00:00:00-08:00"
					},
					{
						"value": 16,
						"date": "2015-12-31T00:00:00-08:00"
					},
					{
						"value": 15,
						"date": "2016-01-01T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-02T00:00:00-08:00"
					},
					{
						"value": 16,
						"date": "2016-01-03T00:00:00-08:00"
					},
					{
						"value": 16,
						"date": "2016-01-04T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-05T00:00:00-08:00"
					},
					{
						"value": 15,
						"date": "2016-01-06T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-07T00:00:00-08:00"
					},
					{
						"value": 21,
						"date": "2016-01-08T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-09T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-10T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-11T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-12T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-13T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-14T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-15T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-16T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-17T00:00:00-08:00"
					},
					{
						"value": 20,
						"date": "2016-01-18T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-19T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-20T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-21T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-22T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-23T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-24T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-25T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-26T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-27T00:00:00-08:00"
					},
					{
						"value": 21,
						"date": "2016-01-28T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-29T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-30T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-31T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-01T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-02T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-03T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-04T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-05T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-06T00:00:00-08:00"
					},
					{
						"value": 20,
						"date": "2016-02-07T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-08T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-09T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-10T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-11T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-12T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-13T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-14T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-15T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-16T00:00:00-08:00"
					},
					{
						"value": 21,
						"date": "2016-02-17T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-18T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-19T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-20T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-21T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-22T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-23T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-24T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-25T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-26T00:00:00-08:00"
					},
					{
						"value": 20,
						"date": "2016-02-27T00:00:00-08:00"
					},
					{
						"value": 17,
						"date": "2016-02-28T00:00:00-08:00"
					},
					{
						"value": 17,
						"date": "2016-02-29T00:00:00-08:00"
					},
					{
						"value": 17,
						"date": "2016-03-01T00:00:00-08:00"
					},
					{
						"value": 17,
						"date": "2016-03-02T00:00:00-08:00"
					},
					{
						"value": 17,
						"date": "2016-03-03T00:00:00-08:00"
					},
					{
						"value": 17,
						"date": "2016-03-04T00:00:00-08:00"
					},
					{
						"value": 17,
						"date": "2016-03-05T00:00:00-08:00"
					},
					{
						"value": 17,
						"date": "2016-03-06T00:00:00-08:00"
					},
					{
						"value": 17,
						"date": "2016-03-07T00:00:00-08:00"
					},
					{
						"value": 20,
						"date": "2016-03-08T00:00:00-08:00"
					},
					{
						"value": 17,
						"date": "2016-03-09T00:00:00-08:00"
					},
					{
						"value": 17,
						"date": "2016-03-10T00:00:00-08:00"
					},
					{
						"value": 17,
						"date": "2016-03-11T00:00:00-08:00"
					},
					{
						"value": 17,
						"date": "2016-03-12T00:00:00-08:00"
					},
					{
						"value": 17,
						"date": "2016-03-13T00:00:00-08:00"
					},
					{
						"value": 17,
						"date": "2016-03-14T00:00:00-07:00"
					},
					{
						"value": 17,
						"date": "2016-03-15T00:00:00-07:00"
					},
					{
						"value": 17,
						"date": "2016-03-16T00:00:00-07:00"
					},
					{
						"value": 17,
						"date": "2016-03-17T00:00:00-07:00"
					},
					{
						"value": 20,
						"date": "2016-03-18T00:00:00-07:00"
					},
					{
						"value": 18,
						"date": "2016-03-19T00:00:00-07:00"
					},
					{
						"value": 18,
						"date": "2016-03-20T00:00:00-07:00"
					},
					{
						"value": 18,
						"date": "2016-03-21T00:00:00-07:00"
					},
					{
						"value": 18,
						"date": "2016-03-22T00:00:00-07:00"
					},
					{
						"value": 18,
						"date": "2016-03-23T00:00:00-07:00"
					},
					{
						"value": 18,
						"date": "2016-03-24T00:00:00-07:00"
					},
					{
						"value": 18,
						"date": "2016-03-25T00:00:00-07:00"
					},
					{
						"value": 18,
						"date": "2016-03-26T00:00:00-07:00"
					},
					{
						"value": 18,
						"date": "2016-03-27T00:00:00-07:00"
					},
					{
						"value": 30,
						"date": "2016-03-28T00:00:00-07:00"
					}
				]
			}
		]
	};

/***/ }),
/* 62 */
/***/ (function(module, exports) {

	module.exports = {
		"dataByTopic": [
			{
				"topic": 103,
				"dates": [
					{
						"date": "27-Jun-15",
						"value": 1,
						"fullDate": "2015-06-27T07:00:00.000Z"
					},
					{
						"date": "28-Jun-15",
						"value": 1,
						"fullDate": "2015-06-28T07:00:00.000Z"
					},
					{
						"date": "29-Jun-15",
						"value": 4,
						"fullDate": "2015-06-29T07:00:00.000Z"
					},
					{
						"date": "30-Jun-15",
						"value": 2,
						"fullDate": "2015-06-30T07:00:00.000Z"
					},
					{
						"date": "1-Jul-15",
						"value": 3,
						"fullDate": "2015-07-01T07:00:00.000Z"
					},
					{
						"date": "2-Jul-15",
						"value": 3,
						"fullDate": "2015-07-02T07:00:00.000Z"
					},
					{
						"date": "3-Jul-15",
						"value": 0,
						"fullDate": "2015-07-03T07:00:00.000Z"
					},
					{
						"date": "4-Jul-15",
						"value": 3,
						"fullDate": "2015-07-04T07:00:00.000Z"
					},
					{
						"date": "5-Jul-15",
						"value": 1,
						"fullDate": "2015-07-05T07:00:00.000Z"
					},
					{
						"date": "6-Jul-15",
						"value": 2,
						"fullDate": "2015-07-06T07:00:00.000Z"
					},
					{
						"date": "7-Jul-15",
						"value": 0,
						"fullDate": "2015-07-07T07:00:00.000Z"
					},
					{
						"date": "8-Jul-15",
						"value": 2,
						"fullDate": "2015-07-08T07:00:00.000Z"
					},
					{
						"date": "9-Jul-15",
						"value": 1,
						"fullDate": "2015-07-09T07:00:00.000Z"
					},
					{
						"date": "10-Jul-15",
						"value": 4,
						"fullDate": "2015-07-10T07:00:00.000Z"
					},
					{
						"date": "11-Jul-15",
						"value": 2,
						"fullDate": "2015-07-11T07:00:00.000Z"
					},
					{
						"date": "12-Jul-15",
						"value": 1,
						"fullDate": "2015-07-12T07:00:00.000Z"
					},
					{
						"date": "13-Jul-15",
						"value": 6,
						"fullDate": "2015-07-13T07:00:00.000Z"
					},
					{
						"date": "14-Jul-15",
						"value": 5,
						"fullDate": "2015-07-14T07:00:00.000Z"
					},
					{
						"date": "15-Jul-15",
						"value": 2,
						"fullDate": "2015-07-15T07:00:00.000Z"
					},
					{
						"date": "16-Jul-15",
						"value": 7,
						"fullDate": "2015-07-16T07:00:00.000Z"
					},
					{
						"date": "17-Jul-15",
						"value": 3,
						"fullDate": "2015-07-17T07:00:00.000Z"
					},
					{
						"date": "18-Jul-15",
						"value": 1,
						"fullDate": "2015-07-18T07:00:00.000Z"
					},
					{
						"date": "19-Jul-15",
						"value": 4,
						"fullDate": "2015-07-19T07:00:00.000Z"
					},
					{
						"date": "20-Jul-15",
						"value": 8,
						"fullDate": "2015-07-20T07:00:00.000Z"
					},
					{
						"date": "21-Jul-15",
						"value": 4,
						"fullDate": "2015-07-21T07:00:00.000Z"
					},
					{
						"date": "22-Jul-15",
						"value": 11,
						"fullDate": "2015-07-22T07:00:00.000Z"
					},
					{
						"date": "23-Jul-15",
						"value": 7,
						"fullDate": "2015-07-23T07:00:00.000Z"
					},
					{
						"date": "24-Jul-15",
						"value": 5,
						"fullDate": "2015-07-24T07:00:00.000Z"
					},
					{
						"date": "25-Jul-15",
						"value": 5,
						"fullDate": "2015-07-25T07:00:00.000Z"
					},
					{
						"date": "26-Jul-15",
						"value": 6,
						"fullDate": "2015-07-26T07:00:00.000Z"
					},
					{
						"date": "27-Jul-15",
						"value": 16,
						"fullDate": "2015-07-27T07:00:00.000Z"
					},
					{
						"date": "28-Jul-15",
						"value": 17,
						"fullDate": "2015-07-28T07:00:00.000Z"
					},
					{
						"date": "29-Jul-15",
						"value": 15,
						"fullDate": "2015-07-29T07:00:00.000Z"
					},
					{
						"date": "30-Jul-15",
						"value": 12,
						"fullDate": "2015-07-30T07:00:00.000Z"
					},
					{
						"date": "31-Jul-15",
						"value": 0,
						"fullDate": "2015-07-31T07:00:00.000Z"
					},
					{
						"date": "1-Aug-15",
						"value": 0,
						"fullDate": "2015-08-01T07:00:00.000Z"
					},
					{
						"date": "2-Aug-15",
						"value": 0,
						"fullDate": "2015-08-02T07:00:00.000Z"
					}
				],
				"topicName": "San Francisco"
			},
			{
				"topic": 149,
				"dates": [
					{
						"date": "27-Jun-15",
						"value": 0,
						"fullDate": "2015-06-27T07:00:00.000Z"
					},
					{
						"date": "28-Jun-15",
						"value": 2,
						"fullDate": "2015-06-28T07:00:00.000Z"
					},
					{
						"date": "29-Jun-15",
						"value": 4,
						"fullDate": "2015-06-29T07:00:00.000Z"
					},
					{
						"date": "30-Jun-15",
						"value": 3,
						"fullDate": "2015-06-30T07:00:00.000Z"
					},
					{
						"date": "1-Jul-15",
						"value": 1,
						"fullDate": "2015-07-01T07:00:00.000Z"
					},
					{
						"date": "2-Jul-15",
						"value": 3,
						"fullDate": "2015-07-02T07:00:00.000Z"
					},
					{
						"date": "3-Jul-15",
						"value": 3,
						"fullDate": "2015-07-03T07:00:00.000Z"
					},
					{
						"date": "4-Jul-15",
						"value": 1,
						"fullDate": "2015-07-04T07:00:00.000Z"
					},
					{
						"date": "5-Jul-15",
						"value": 2,
						"fullDate": "2015-07-05T07:00:00.000Z"
					},
					{
						"date": "6-Jul-15",
						"value": 2,
						"fullDate": "2015-07-06T07:00:00.000Z"
					},
					{
						"date": "7-Jul-15",
						"value": 4,
						"fullDate": "2015-07-07T07:00:00.000Z"
					},
					{
						"date": "8-Jul-15",
						"value": 7,
						"fullDate": "2015-07-08T07:00:00.000Z"
					},
					{
						"date": "9-Jul-15",
						"value": 1,
						"fullDate": "2015-07-09T07:00:00.000Z"
					},
					{
						"date": "10-Jul-15",
						"value": 5,
						"fullDate": "2015-07-10T07:00:00.000Z"
					},
					{
						"date": "11-Jul-15",
						"value": 9,
						"fullDate": "2015-07-11T07:00:00.000Z"
					},
					{
						"date": "12-Jul-15",
						"value": 5,
						"fullDate": "2015-07-12T07:00:00.000Z"
					},
					{
						"date": "13-Jul-15",
						"value": 2,
						"fullDate": "2015-07-13T07:00:00.000Z"
					},
					{
						"date": "14-Jul-15",
						"value": 8,
						"fullDate": "2015-07-14T07:00:00.000Z"
					},
					{
						"date": "15-Jul-15",
						"value": 3,
						"fullDate": "2015-07-15T07:00:00.000Z"
					},
					{
						"date": "16-Jul-15",
						"value": 1,
						"fullDate": "2015-07-16T07:00:00.000Z"
					},
					{
						"date": "17-Jul-15",
						"value": 2,
						"fullDate": "2015-07-17T07:00:00.000Z"
					},
					{
						"date": "18-Jul-15",
						"value": 7,
						"fullDate": "2015-07-18T07:00:00.000Z"
					},
					{
						"date": "19-Jul-15",
						"value": 1,
						"fullDate": "2015-07-19T07:00:00.000Z"
					},
					{
						"date": "20-Jul-15",
						"value": 5,
						"fullDate": "2015-07-20T07:00:00.000Z"
					},
					{
						"date": "21-Jul-15",
						"value": 0,
						"fullDate": "2015-07-21T07:00:00.000Z"
					},
					{
						"date": "22-Jul-15",
						"value": 2,
						"fullDate": "2015-07-22T07:00:00.000Z"
					},
					{
						"date": "23-Jul-15",
						"value": 5,
						"fullDate": "2015-07-23T07:00:00.000Z"
					},
					{
						"date": "24-Jul-15",
						"value": 2,
						"fullDate": "2015-07-24T07:00:00.000Z"
					},
					{
						"date": "25-Jul-15",
						"value": 2,
						"fullDate": "2015-07-25T07:00:00.000Z"
					},
					{
						"date": "26-Jul-15",
						"value": 3,
						"fullDate": "2015-07-26T07:00:00.000Z"
					},
					{
						"date": "27-Jul-15",
						"value": 8,
						"fullDate": "2015-07-27T07:00:00.000Z"
					},
					{
						"date": "28-Jul-15",
						"value": 11,
						"fullDate": "2015-07-28T07:00:00.000Z"
					},
					{
						"date": "29-Jul-15",
						"value": 17,
						"fullDate": "2015-07-29T07:00:00.000Z"
					},
					{
						"date": "30-Jul-15",
						"value": 14,
						"fullDate": "2015-07-30T07:00:00.000Z"
					},
					{
						"date": "31-Jul-15",
						"value": 0,
						"fullDate": "2015-07-31T07:00:00.000Z"
					},
					{
						"date": "1-Aug-15",
						"value": 0,
						"fullDate": "2015-08-01T07:00:00.000Z"
					},
					{
						"date": "2-Aug-15",
						"value": 0,
						"fullDate": "2015-08-02T07:00:00.000Z"
					}
				],
				"topicName": "Unknown Location with a super hyper mega very very very long name."
			},
			{
				"topic": 60,
				"dates": [
					{
						"date": "27-Jun-15",
						"value": 0,
						"fullDate": "2015-06-27T07:00:00.000Z"
					},
					{
						"date": "28-Jun-15",
						"value": 0,
						"fullDate": "2015-06-28T07:00:00.000Z"
					},
					{
						"date": "29-Jun-15",
						"value": 18,
						"fullDate": "2015-06-29T07:00:00.000Z"
					},
					{
						"date": "30-Jun-15",
						"value": 1,
						"fullDate": "2015-06-30T07:00:00.000Z"
					},
					{
						"date": "1-Jul-15",
						"value": 6,
						"fullDate": "2015-07-01T07:00:00.000Z"
					},
					{
						"date": "2-Jul-15",
						"value": 0,
						"fullDate": "2015-07-02T07:00:00.000Z"
					},
					{
						"date": "3-Jul-15",
						"value": 0,
						"fullDate": "2015-07-03T07:00:00.000Z"
					},
					{
						"date": "4-Jul-15",
						"value": 0,
						"fullDate": "2015-07-04T07:00:00.000Z"
					},
					{
						"date": "5-Jul-15",
						"value": 0,
						"fullDate": "2015-07-05T07:00:00.000Z"
					},
					{
						"date": "6-Jul-15",
						"value": 0,
						"fullDate": "2015-07-06T07:00:00.000Z"
					},
					{
						"date": "7-Jul-15",
						"value": 15,
						"fullDate": "2015-07-07T07:00:00.000Z"
					},
					{
						"date": "8-Jul-15",
						"value": 32,
						"fullDate": "2015-07-08T07:00:00.000Z"
					},
					{
						"date": "9-Jul-15",
						"value": 0,
						"fullDate": "2015-07-09T07:00:00.000Z"
					},
					{
						"date": "10-Jul-15",
						"value": 0,
						"fullDate": "2015-07-10T07:00:00.000Z"
					},
					{
						"date": "11-Jul-15",
						"value": 0,
						"fullDate": "2015-07-11T07:00:00.000Z"
					},
					{
						"date": "12-Jul-15",
						"value": 0,
						"fullDate": "2015-07-12T07:00:00.000Z"
					},
					{
						"date": "13-Jul-15",
						"value": 3,
						"fullDate": "2015-07-13T07:00:00.000Z"
					},
					{
						"date": "14-Jul-15",
						"value": 0,
						"fullDate": "2015-07-14T07:00:00.000Z"
					},
					{
						"date": "15-Jul-15",
						"value": 0,
						"fullDate": "2015-07-15T07:00:00.000Z"
					},
					{
						"date": "16-Jul-15",
						"value": 15,
						"fullDate": "2015-07-16T07:00:00.000Z"
					},
					{
						"date": "17-Jul-15",
						"value": 0,
						"fullDate": "2015-07-17T07:00:00.000Z"
					},
					{
						"date": "18-Jul-15",
						"value": 0,
						"fullDate": "2015-07-18T07:00:00.000Z"
					},
					{
						"date": "19-Jul-15",
						"value": 0,
						"fullDate": "2015-07-19T07:00:00.000Z"
					},
					{
						"date": "20-Jul-15",
						"value": 0,
						"fullDate": "2015-07-20T07:00:00.000Z"
					},
					{
						"date": "21-Jul-15",
						"value": 0,
						"fullDate": "2015-07-21T07:00:00.000Z"
					},
					{
						"date": "22-Jul-15",
						"value": 5,
						"fullDate": "2015-07-22T07:00:00.000Z"
					},
					{
						"date": "23-Jul-15",
						"value": 0,
						"fullDate": "2015-07-23T07:00:00.000Z"
					},
					{
						"date": "24-Jul-15",
						"value": 1,
						"fullDate": "2015-07-24T07:00:00.000Z"
					},
					{
						"date": "25-Jul-15",
						"value": 0,
						"fullDate": "2015-07-25T07:00:00.000Z"
					},
					{
						"date": "26-Jul-15",
						"value": 1,
						"fullDate": "2015-07-26T07:00:00.000Z"
					},
					{
						"date": "27-Jul-15",
						"value": 0,
						"fullDate": "2015-07-27T07:00:00.000Z"
					},
					{
						"date": "28-Jul-15",
						"value": 0,
						"fullDate": "2015-07-28T07:00:00.000Z"
					},
					{
						"date": "29-Jul-15",
						"value": 3,
						"fullDate": "2015-07-29T07:00:00.000Z"
					},
					{
						"date": "30-Jul-15",
						"value": 2,
						"fullDate": "2015-07-30T07:00:00.000Z"
					},
					{
						"date": "31-Jul-15",
						"value": 0,
						"fullDate": "2015-07-31T07:00:00.000Z"
					},
					{
						"date": "1-Aug-15",
						"value": 0,
						"fullDate": "2015-08-01T07:00:00.000Z"
					},
					{
						"date": "2-Aug-15",
						"value": 0,
						"fullDate": "2015-08-02T07:00:00.000Z"
					}
				],
				"topicName": "Los Angeles"
			},
			{
				"topic": 81,
				"dates": [
					{
						"date": "27-Jun-15",
						"value": 0,
						"fullDate": "2015-06-27T07:00:00.000Z"
					},
					{
						"date": "28-Jun-15",
						"value": 0,
						"fullDate": "2015-06-28T07:00:00.000Z"
					},
					{
						"date": "29-Jun-15",
						"value": 1,
						"fullDate": "2015-06-29T07:00:00.000Z"
					},
					{
						"date": "30-Jun-15",
						"value": 0,
						"fullDate": "2015-06-30T07:00:00.000Z"
					},
					{
						"date": "1-Jul-15",
						"value": 0,
						"fullDate": "2015-07-01T07:00:00.000Z"
					},
					{
						"date": "2-Jul-15",
						"value": 0,
						"fullDate": "2015-07-02T07:00:00.000Z"
					},
					{
						"date": "3-Jul-15",
						"value": 0,
						"fullDate": "2015-07-03T07:00:00.000Z"
					},
					{
						"date": "4-Jul-15",
						"value": 0,
						"fullDate": "2015-07-04T07:00:00.000Z"
					},
					{
						"date": "5-Jul-15",
						"value": 0,
						"fullDate": "2015-07-05T07:00:00.000Z"
					},
					{
						"date": "6-Jul-15",
						"value": 0,
						"fullDate": "2015-07-06T07:00:00.000Z"
					},
					{
						"date": "7-Jul-15",
						"value": 0,
						"fullDate": "2015-07-07T07:00:00.000Z"
					},
					{
						"date": "8-Jul-15",
						"value": 0,
						"fullDate": "2015-07-08T07:00:00.000Z"
					},
					{
						"date": "9-Jul-15",
						"value": 1,
						"fullDate": "2015-07-09T07:00:00.000Z"
					},
					{
						"date": "10-Jul-15",
						"value": 0,
						"fullDate": "2015-07-10T07:00:00.000Z"
					},
					{
						"date": "11-Jul-15",
						"value": 1,
						"fullDate": "2015-07-11T07:00:00.000Z"
					},
					{
						"date": "12-Jul-15",
						"value": 1,
						"fullDate": "2015-07-12T07:00:00.000Z"
					},
					{
						"date": "13-Jul-15",
						"value": 0,
						"fullDate": "2015-07-13T07:00:00.000Z"
					},
					{
						"date": "14-Jul-15",
						"value": 2,
						"fullDate": "2015-07-14T07:00:00.000Z"
					},
					{
						"date": "15-Jul-15",
						"value": 3,
						"fullDate": "2015-07-15T07:00:00.000Z"
					},
					{
						"date": "16-Jul-15",
						"value": 0,
						"fullDate": "2015-07-16T07:00:00.000Z"
					},
					{
						"date": "17-Jul-15",
						"value": 0,
						"fullDate": "2015-07-17T07:00:00.000Z"
					},
					{
						"date": "18-Jul-15",
						"value": 0,
						"fullDate": "2015-07-18T07:00:00.000Z"
					},
					{
						"date": "19-Jul-15",
						"value": 2,
						"fullDate": "2015-07-19T07:00:00.000Z"
					},
					{
						"date": "20-Jul-15",
						"value": 7,
						"fullDate": "2015-07-20T07:00:00.000Z"
					},
					{
						"date": "21-Jul-15",
						"value": 0,
						"fullDate": "2015-07-21T07:00:00.000Z"
					},
					{
						"date": "22-Jul-15",
						"value": 1,
						"fullDate": "2015-07-22T07:00:00.000Z"
					},
					{
						"date": "23-Jul-15",
						"value": 2,
						"fullDate": "2015-07-23T07:00:00.000Z"
					},
					{
						"date": "24-Jul-15",
						"value": 0,
						"fullDate": "2015-07-24T07:00:00.000Z"
					},
					{
						"date": "25-Jul-15",
						"value": 0,
						"fullDate": "2015-07-25T07:00:00.000Z"
					},
					{
						"date": "26-Jul-15",
						"value": 0,
						"fullDate": "2015-07-26T07:00:00.000Z"
					},
					{
						"date": "27-Jul-15",
						"value": 1,
						"fullDate": "2015-07-27T07:00:00.000Z"
					},
					{
						"date": "28-Jul-15",
						"value": 2,
						"fullDate": "2015-07-28T07:00:00.000Z"
					},
					{
						"date": "29-Jul-15",
						"value": 2,
						"fullDate": "2015-07-29T07:00:00.000Z"
					},
					{
						"date": "30-Jul-15",
						"value": 6,
						"fullDate": "2015-07-30T07:00:00.000Z"
					},
					{
						"date": "31-Jul-15",
						"value": 0,
						"fullDate": "2015-07-31T07:00:00.000Z"
					},
					{
						"date": "1-Aug-15",
						"value": 0,
						"fullDate": "2015-08-01T07:00:00.000Z"
					},
					{
						"date": "2-Aug-15",
						"value": 0,
						"fullDate": "2015-08-02T07:00:00.000Z"
					}
				],
				"topicName": "Oakland"
			},
			{
				"topic": 0,
				"topicName": "Other",
				"dates": [
					{
						"date": "27-Jun-15",
						"value": 3,
						"fullDate": "2015-06-27T07:00:00.000Z"
					},
					{
						"date": "28-Jun-15",
						"value": 9,
						"fullDate": "2015-06-28T07:00:00.000Z"
					},
					{
						"date": "29-Jun-15",
						"value": 6,
						"fullDate": "2015-06-29T07:00:00.000Z"
					},
					{
						"date": "30-Jun-15",
						"value": 11,
						"fullDate": "2015-06-30T07:00:00.000Z"
					},
					{
						"date": "1-Jul-15",
						"value": 7,
						"fullDate": "2015-07-01T07:00:00.000Z"
					},
					{
						"date": "2-Jul-15",
						"value": 10,
						"fullDate": "2015-07-02T07:00:00.000Z"
					},
					{
						"date": "3-Jul-15",
						"value": 5,
						"fullDate": "2015-07-03T07:00:00.000Z"
					},
					{
						"date": "4-Jul-15",
						"value": 10,
						"fullDate": "2015-07-04T07:00:00.000Z"
					},
					{
						"date": "5-Jul-15",
						"value": 8,
						"fullDate": "2015-07-05T07:00:00.000Z"
					},
					{
						"date": "6-Jul-15",
						"value": 10,
						"fullDate": "2015-07-06T07:00:00.000Z"
					},
					{
						"date": "7-Jul-15",
						"value": 6,
						"fullDate": "2015-07-07T07:00:00.000Z"
					},
					{
						"date": "8-Jul-15",
						"value": 14,
						"fullDate": "2015-07-08T07:00:00.000Z"
					},
					{
						"date": "9-Jul-15",
						"value": 12,
						"fullDate": "2015-07-09T07:00:00.000Z"
					},
					{
						"date": "10-Jul-15",
						"value": 17,
						"fullDate": "2015-07-10T07:00:00.000Z"
					},
					{
						"date": "11-Jul-15",
						"value": 9,
						"fullDate": "2015-07-11T07:00:00.000Z"
					},
					{
						"date": "12-Jul-15",
						"value": 9,
						"fullDate": "2015-07-12T07:00:00.000Z"
					},
					{
						"date": "13-Jul-15",
						"value": 9,
						"fullDate": "2015-07-13T07:00:00.000Z"
					},
					{
						"date": "14-Jul-15",
						"value": 11,
						"fullDate": "2015-07-14T07:00:00.000Z"
					},
					{
						"date": "15-Jul-15",
						"value": 16,
						"fullDate": "2015-07-15T07:00:00.000Z"
					},
					{
						"date": "16-Jul-15",
						"value": 6,
						"fullDate": "2015-07-16T07:00:00.000Z"
					},
					{
						"date": "17-Jul-15",
						"value": 7,
						"fullDate": "2015-07-17T07:00:00.000Z"
					},
					{
						"date": "18-Jul-15",
						"value": 8,
						"fullDate": "2015-07-18T07:00:00.000Z"
					},
					{
						"date": "19-Jul-15",
						"value": 4,
						"fullDate": "2015-07-19T07:00:00.000Z"
					},
					{
						"date": "20-Jul-15",
						"value": 9,
						"fullDate": "2015-07-20T07:00:00.000Z"
					},
					{
						"date": "21-Jul-15",
						"value": 5,
						"fullDate": "2015-07-21T07:00:00.000Z"
					},
					{
						"date": "22-Jul-15",
						"value": 7,
						"fullDate": "2015-07-22T07:00:00.000Z"
					},
					{
						"date": "23-Jul-15",
						"value": 7,
						"fullDate": "2015-07-23T07:00:00.000Z"
					},
					{
						"date": "24-Jul-15",
						"value": 10,
						"fullDate": "2015-07-24T07:00:00.000Z"
					},
					{
						"date": "25-Jul-15",
						"value": 8,
						"fullDate": "2015-07-25T07:00:00.000Z"
					},
					{
						"date": "26-Jul-15",
						"value": 13,
						"fullDate": "2015-07-26T07:00:00.000Z"
					},
					{
						"date": "27-Jul-15",
						"value": 18,
						"fullDate": "2015-07-27T07:00:00.000Z"
					},
					{
						"date": "28-Jul-15",
						"value": 14,
						"fullDate": "2015-07-28T07:00:00.000Z"
					},
					{
						"date": "29-Jul-15",
						"value": 30,
						"fullDate": "2015-07-29T07:00:00.000Z"
					},
					{
						"date": "30-Jul-15",
						"value": 33,
						"fullDate": "2015-07-30T07:00:00.000Z"
					},
					{
						"date": "31-Jul-15",
						"value": 0,
						"fullDate": "2015-07-31T07:00:00.000Z"
					},
					{
						"date": "1-Aug-15",
						"value": 0,
						"fullDate": "2015-08-01T07:00:00.000Z"
					},
					{
						"date": "2-Aug-15",
						"value": 0,
						"fullDate": "2015-08-02T07:00:00.000Z"
					}
				]
			}
		],
		"dataByDate": [
			{
				"date": "2015-06-27T07:00:00.000Z",
				"topics": [
					{
						"name": 103,
						"value": 1,
						"topicName": "San Francisco"
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 149,
						"value": 0,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 0,
						"value": 3,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-06-28T07:00:00.000Z",
				"topics": [
					{
						"name": 103,
						"value": 1,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 2,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 0,
						"value": 9,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-06-29T07:00:00.000Z",
				"topics": [
					{
						"name": 60,
						"value": 18,
						"topicName": "Los Angeles"
					},
					{
						"name": 81,
						"value": 1,
						"topicName": "Oakland"
					},
					{
						"name": 103,
						"value": 4,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 4,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 0,
						"value": 6,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-06-30T07:00:00.000Z",
				"topics": [
					{
						"name": 60,
						"value": 1,
						"topicName": "Los Angeles"
					},
					{
						"name": 103,
						"value": 2,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 3,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 0,
						"value": 11,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-01T07:00:00.000Z",
				"topics": [
					{
						"name": 60,
						"value": 6,
						"topicName": "Los Angeles"
					},
					{
						"name": 103,
						"value": 3,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 1,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 0,
						"value": 7,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-02T07:00:00.000Z",
				"topics": [
					{
						"name": 103,
						"value": 3,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 3,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 0,
						"value": 10,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-03T07:00:00.000Z",
				"topics": [
					{
						"name": 149,
						"value": 3,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 103,
						"value": 0,
						"topicName": "San Francisco"
					},
					{
						"name": 0,
						"value": 5,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-04T07:00:00.000Z",
				"topics": [
					{
						"name": 103,
						"value": 3,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 1,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 0,
						"value": 10,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-05T07:00:00.000Z",
				"topics": [
					{
						"name": 103,
						"value": 1,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 2,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 0,
						"value": 8,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-06T07:00:00.000Z",
				"topics": [
					{
						"name": 103,
						"value": 2,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 2,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 0,
						"value": 10,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-07T07:00:00.000Z",
				"topics": [
					{
						"name": 60,
						"value": 15,
						"topicName": "Los Angeles"
					},
					{
						"name": 149,
						"value": 4,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 103,
						"value": 0,
						"topicName": "San Francisco"
					},
					{
						"name": 0,
						"value": 6,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-08T07:00:00.000Z",
				"topics": [
					{
						"name": 60,
						"value": 32,
						"topicName": "Los Angeles"
					},
					{
						"name": 103,
						"value": 2,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 7,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 0,
						"value": 14,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-09T07:00:00.000Z",
				"topics": [
					{
						"name": 81,
						"value": 1,
						"topicName": "Oakland"
					},
					{
						"name": 103,
						"value": 1,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 1,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 0,
						"value": 12,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-10T07:00:00.000Z",
				"topics": [
					{
						"name": 103,
						"value": 4,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 5,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 0,
						"value": 17,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-11T07:00:00.000Z",
				"topics": [
					{
						"name": 81,
						"value": 1,
						"topicName": "Oakland"
					},
					{
						"name": 103,
						"value": 2,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 9,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 0,
						"value": 9,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-12T07:00:00.000Z",
				"topics": [
					{
						"name": 81,
						"value": 1,
						"topicName": "Oakland"
					},
					{
						"name": 103,
						"value": 1,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 5,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 0,
						"value": 9,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-13T07:00:00.000Z",
				"topics": [
					{
						"name": 60,
						"value": 3,
						"topicName": "Los Angeles"
					},
					{
						"name": 103,
						"value": 6,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 2,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 0,
						"value": 9,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-14T07:00:00.000Z",
				"topics": [
					{
						"name": 81,
						"value": 2,
						"topicName": "Oakland"
					},
					{
						"name": 103,
						"value": 5,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 8,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 0,
						"value": 11,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-15T07:00:00.000Z",
				"topics": [
					{
						"name": 81,
						"value": 3,
						"topicName": "Oakland"
					},
					{
						"name": 103,
						"value": 2,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 3,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 0,
						"value": 16,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-16T07:00:00.000Z",
				"topics": [
					{
						"name": 60,
						"value": 15,
						"topicName": "Los Angeles"
					},
					{
						"name": 103,
						"value": 7,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 1,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 0,
						"value": 6,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-17T07:00:00.000Z",
				"topics": [
					{
						"name": 103,
						"value": 3,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 2,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 0,
						"value": 7,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-18T07:00:00.000Z",
				"topics": [
					{
						"name": 103,
						"value": 1,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 7,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 0,
						"value": 8,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-19T07:00:00.000Z",
				"topics": [
					{
						"name": 81,
						"value": 2,
						"topicName": "Oakland"
					},
					{
						"name": 103,
						"value": 4,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 1,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 0,
						"value": 4,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-20T07:00:00.000Z",
				"topics": [
					{
						"name": 81,
						"value": 7,
						"topicName": "Oakland"
					},
					{
						"name": 103,
						"value": 8,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 5,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 0,
						"value": 9,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-21T07:00:00.000Z",
				"topics": [
					{
						"name": 103,
						"value": 4,
						"topicName": "San Francisco"
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 149,
						"value": 0,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 0,
						"value": 5,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-22T07:00:00.000Z",
				"topics": [
					{
						"name": 60,
						"value": 5,
						"topicName": "Los Angeles"
					},
					{
						"name": 81,
						"value": 1,
						"topicName": "Oakland"
					},
					{
						"name": 103,
						"value": 11,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 2,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 0,
						"value": 7,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-23T07:00:00.000Z",
				"topics": [
					{
						"name": 81,
						"value": 2,
						"topicName": "Oakland"
					},
					{
						"name": 103,
						"value": 7,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 5,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 0,
						"value": 7,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-24T07:00:00.000Z",
				"topics": [
					{
						"name": 60,
						"value": 1,
						"topicName": "Los Angeles"
					},
					{
						"name": 103,
						"value": 5,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 2,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 0,
						"value": 10,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-25T07:00:00.000Z",
				"topics": [
					{
						"name": 103,
						"value": 5,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 2,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 0,
						"value": 8,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-26T07:00:00.000Z",
				"topics": [
					{
						"name": 60,
						"value": 1,
						"topicName": "Los Angeles"
					},
					{
						"name": 103,
						"value": 6,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 3,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 0,
						"value": 13,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-27T07:00:00.000Z",
				"topics": [
					{
						"name": 81,
						"value": 1,
						"topicName": "Oakland"
					},
					{
						"name": 103,
						"value": 16,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 8,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 0,
						"value": 18,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-28T07:00:00.000Z",
				"topics": [
					{
						"name": 81,
						"value": 2,
						"topicName": "Oakland"
					},
					{
						"name": 103,
						"value": 17,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 11,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 0,
						"value": 14,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-29T07:00:00.000Z",
				"topics": [
					{
						"name": 60,
						"value": 3,
						"topicName": "Los Angeles"
					},
					{
						"name": 81,
						"value": 2,
						"topicName": "Oakland"
					},
					{
						"name": 103,
						"value": 15,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 17,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 0,
						"value": 30,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-30T07:00:00.000Z",
				"topics": [
					{
						"name": 60,
						"value": 2,
						"topicName": "Los Angeles"
					},
					{
						"name": 81,
						"value": 6,
						"topicName": "Oakland"
					},
					{
						"name": 103,
						"value": 12,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 14,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 0,
						"value": 33,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-31T07:00:00.000Z",
				"topics": [
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 103,
						"value": 0,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 0,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 0,
						"value": 0,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-08-01T07:00:00.000Z",
				"topics": [
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 103,
						"value": 0,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 0,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 0,
						"value": 0,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-08-02T07:00:00.000Z",
				"topics": [
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 103,
						"value": 0,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 0,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 0,
						"value": 0,
						"topicName": "Other"
					}
				]
			}
		]
	};

/***/ }),
/* 63 */
/***/ (function(module, exports) {

	module.exports = {
		"dataByTopic": [
			{
				"topic": -1,
				"topicName": "Quantity",
				"dates": [
					{
						"date": "31-Jul-16",
						"value": 0,
						"fullDate": "2016-07-31T00:00:00-07:00"
					},
					{
						"date": "1-Aug-16",
						"value": 0,
						"fullDate": "2016-08-01T00:00:00-07:00"
					},
					{
						"date": "2-Aug-16",
						"value": 3,
						"fullDate": "2016-08-02T00:00:00-07:00"
					},
					{
						"date": "3-Aug-16",
						"value": 1,
						"fullDate": "2016-08-03T00:00:00-07:00"
					},
					{
						"date": "4-Aug-16",
						"value": 3,
						"fullDate": "2016-08-04T00:00:00-07:00"
					},
					{
						"date": "5-Aug-16",
						"value": 3,
						"fullDate": "2016-08-05T00:00:00-07:00"
					},
					{
						"date": "6-Aug-16",
						"value": 0,
						"fullDate": "2016-08-06T00:00:00-07:00"
					},
					{
						"date": "7-Aug-16",
						"value": 1,
						"fullDate": "2016-08-07T00:00:00-07:00"
					},
					{
						"date": "8-Aug-16",
						"value": 1,
						"fullDate": "2016-08-08T00:00:00-07:00"
					},
					{
						"date": "9-Aug-16",
						"value": 0,
						"fullDate": "2016-08-09T00:00:00-07:00"
					},
					{
						"date": "10-Aug-16",
						"value": 3,
						"fullDate": "2016-08-10T00:00:00-07:00"
					},
					{
						"date": "11-Aug-16",
						"value": 4,
						"fullDate": "2016-08-11T00:00:00-07:00"
					},
					{
						"date": "12-Aug-16",
						"value": 4,
						"fullDate": "2016-08-12T00:00:00-07:00"
					},
					{
						"date": "13-Aug-16",
						"value": 2,
						"fullDate": "2016-08-13T00:00:00-07:00"
					},
					{
						"date": "14-Aug-16",
						"value": 3,
						"fullDate": "2016-08-14T00:00:00-07:00"
					},
					{
						"date": "15-Aug-16",
						"value": 0,
						"fullDate": "2016-08-15T00:00:00-07:00"
					},
					{
						"date": "16-Aug-16",
						"value": 1,
						"fullDate": "2016-08-16T00:00:00-07:00"
					},
					{
						"date": "17-Aug-16",
						"value": 0,
						"fullDate": "2016-08-17T00:00:00-07:00"
					},
					{
						"date": "18-Aug-16",
						"value": 2,
						"fullDate": "2016-08-18T00:00:00-07:00"
					},
					{
						"date": "19-Aug-16",
						"value": 5,
						"fullDate": "2016-08-19T00:00:00-07:00"
					},
					{
						"date": "20-Aug-16",
						"value": 1,
						"fullDate": "2016-08-20T00:00:00-07:00"
					},
					{
						"date": "21-Aug-16",
						"value": 2,
						"fullDate": "2016-08-21T00:00:00-07:00"
					},
					{
						"date": "22-Aug-16",
						"value": 9,
						"fullDate": "2016-08-22T00:00:00-07:00"
					},
					{
						"date": "23-Aug-16",
						"value": 4,
						"fullDate": "2016-08-23T00:00:00-07:00"
					},
					{
						"date": "24-Aug-16",
						"value": 3,
						"fullDate": "2016-08-24T00:00:00-07:00"
					},
					{
						"date": "25-Aug-16",
						"value": 2,
						"fullDate": "2016-08-25T00:00:00-07:00"
					},
					{
						"date": "26-Aug-16",
						"value": 5,
						"fullDate": "2016-08-26T00:00:00-07:00"
					}
				]
			}
		]
	};

/***/ }),
/* 64 */
/***/ (function(module, exports) {

	module.exports = {
		"dataByTopic": [
			{
				"topic": -1,
				"topicName": "Quantity",
				"dates": [
					{
						"date": 1422000000000,
						"value": 0,
						"fullDate": "2015-01-23T03:00:00-05:00"
					},
					{
						"date": 1422086400000,
						"value": 0,
						"fullDate": "2015-01-24T03:00:00-05:00"
					},
					{
						"date": 1422172800000,
						"value": 0,
						"fullDate": "2015-01-25T03:00:00-05:00"
					},
					{
						"date": 1422259200000,
						"value": 0,
						"fullDate": "2015-01-26T03:00:00-05:00"
					},
					{
						"date": 1422345600000,
						"value": 0,
						"fullDate": "2015-01-27T03:00:00-05:00"
					},
					{
						"date": 1422432000000,
						"value": 0,
						"fullDate": "2015-01-28T03:00:00-05:00"
					},
					{
						"date": 1422518400000,
						"value": 0,
						"fullDate": "2015-01-29T03:00:00-05:00"
					},
					{
						"date": 1422604800000,
						"value": 0,
						"fullDate": "2015-01-30T03:00:00-05:00"
					},
					{
						"date": 1422691200000,
						"value": 0,
						"fullDate": "2015-01-31T03:00:00-05:00"
					},
					{
						"date": 1422777600000,
						"value": 0,
						"fullDate": "2015-02-01T03:00:00-05:00"
					},
					{
						"date": 1422864000000,
						"value": 0,
						"fullDate": "2015-02-02T03:00:00-05:00"
					},
					{
						"date": 1422950400000,
						"value": 0,
						"fullDate": "2015-02-03T03:00:00-05:00"
					},
					{
						"date": 1423036800000,
						"value": 0,
						"fullDate": "2015-02-04T03:00:00-05:00"
					},
					{
						"date": 1423123200000,
						"value": 0,
						"fullDate": "2015-02-05T03:00:00-05:00"
					},
					{
						"date": 1423209600000,
						"value": 0,
						"fullDate": "2015-02-06T03:00:00-05:00"
					},
					{
						"date": 1423296000000,
						"value": 0,
						"fullDate": "2015-02-07T03:00:00-05:00"
					},
					{
						"date": 1423382400000,
						"value": 0,
						"fullDate": "2015-02-08T03:00:00-05:00"
					},
					{
						"date": 1423468800000,
						"value": 0,
						"fullDate": "2015-02-09T03:00:00-05:00"
					},
					{
						"date": 1423555200000,
						"value": 0,
						"fullDate": "2015-02-10T03:00:00-05:00"
					},
					{
						"date": 1423641600000,
						"value": 0,
						"fullDate": "2015-02-11T03:00:00-05:00"
					},
					{
						"date": 1423728000000,
						"value": 0,
						"fullDate": "2015-02-12T03:00:00-05:00"
					},
					{
						"date": 1423814400000,
						"value": 0,
						"fullDate": "2015-02-13T03:00:00-05:00"
					},
					{
						"date": 1423900800000,
						"value": 0,
						"fullDate": "2015-02-14T03:00:00-05:00"
					},
					{
						"date": 1423987200000,
						"value": 0,
						"fullDate": "2015-02-15T03:00:00-05:00"
					},
					{
						"date": 1424073600000,
						"value": 0,
						"fullDate": "2015-02-16T03:00:00-05:00"
					},
					{
						"date": 1424160000000,
						"value": 0,
						"fullDate": "2015-02-17T03:00:00-05:00"
					},
					{
						"date": 1424246400000,
						"value": 0,
						"fullDate": "2015-02-18T03:00:00-05:00"
					},
					{
						"date": 1424332800000,
						"value": 0,
						"fullDate": "2015-02-19T03:00:00-05:00"
					},
					{
						"date": 1424419200000,
						"value": 0,
						"fullDate": "2015-02-20T03:00:00-05:00"
					},
					{
						"date": 1424505600000,
						"value": 0,
						"fullDate": "2015-02-21T03:00:00-05:00"
					},
					{
						"date": 1424592000000,
						"value": 0,
						"fullDate": "2015-02-22T03:00:00-05:00"
					},
					{
						"date": 1424678400000,
						"value": 0,
						"fullDate": "2015-02-23T03:00:00-05:00"
					},
					{
						"date": 1424764800000,
						"value": 0,
						"fullDate": "2015-02-24T03:00:00-05:00"
					},
					{
						"date": 1424851200000,
						"value": 0,
						"fullDate": "2015-02-25T03:00:00-05:00"
					},
					{
						"date": 1424937600000,
						"value": 0,
						"fullDate": "2015-02-26T03:00:00-05:00"
					},
					{
						"date": 1425024000000,
						"value": 0,
						"fullDate": "2015-02-27T03:00:00-05:00"
					},
					{
						"date": 1425110400000,
						"value": 0,
						"fullDate": "2015-02-28T03:00:00-05:00"
					},
					{
						"date": 1425196800000,
						"value": 0,
						"fullDate": "2015-03-01T03:00:00-05:00"
					},
					{
						"date": 1425283200000,
						"value": 0,
						"fullDate": "2015-03-02T03:00:00-05:00"
					},
					{
						"date": 1425369600000,
						"value": 0,
						"fullDate": "2015-03-03T03:00:00-05:00"
					},
					{
						"date": 1425456000000,
						"value": 0,
						"fullDate": "2015-03-04T03:00:00-05:00"
					},
					{
						"date": 1425542400000,
						"value": 0,
						"fullDate": "2015-03-05T03:00:00-05:00"
					},
					{
						"date": 1425628800000,
						"value": 0,
						"fullDate": "2015-03-06T03:00:00-05:00"
					},
					{
						"date": 1425715200000,
						"value": 0,
						"fullDate": "2015-03-07T03:00:00-05:00"
					},
					{
						"date": 1425884400000,
						"value": 0,
						"fullDate": "2015-03-09T03:00:00-04:00"
					},
					{
						"date": 1425970800000,
						"value": 0,
						"fullDate": "2015-03-10T03:00:00-04:00"
					},
					{
						"date": 1426057200000,
						"value": 0,
						"fullDate": "2015-03-11T03:00:00-04:00"
					},
					{
						"date": 1426143600000,
						"value": 0,
						"fullDate": "2015-03-12T03:00:00-04:00"
					},
					{
						"date": 1426230000000,
						"value": 0,
						"fullDate": "2015-03-13T03:00:00-04:00"
					},
					{
						"date": 1426316400000,
						"value": 0,
						"fullDate": "2015-03-14T03:00:00-04:00"
					},
					{
						"date": 1426402800000,
						"value": 0,
						"fullDate": "2015-03-15T03:00:00-04:00"
					},
					{
						"date": 1426489200000,
						"value": 0,
						"fullDate": "2015-03-16T03:00:00-04:00"
					},
					{
						"date": 1426575600000,
						"value": 0,
						"fullDate": "2015-03-17T03:00:00-04:00"
					},
					{
						"date": 1426662000000,
						"value": 0,
						"fullDate": "2015-03-18T03:00:00-04:00"
					},
					{
						"date": 1426748400000,
						"value": 0,
						"fullDate": "2015-03-19T03:00:00-04:00"
					},
					{
						"date": 1426834800000,
						"value": 0,
						"fullDate": "2015-03-20T03:00:00-04:00"
					},
					{
						"date": 1426921200000,
						"value": 0,
						"fullDate": "2015-03-21T03:00:00-04:00"
					},
					{
						"date": 1427007600000,
						"value": 0,
						"fullDate": "2015-03-22T03:00:00-04:00"
					},
					{
						"date": 1427094000000,
						"value": 0,
						"fullDate": "2015-03-23T03:00:00-04:00"
					},
					{
						"date": 1427180400000,
						"value": 0,
						"fullDate": "2015-03-24T03:00:00-04:00"
					},
					{
						"date": 1427266800000,
						"value": 0,
						"fullDate": "2015-03-25T03:00:00-04:00"
					},
					{
						"date": 1427353200000,
						"value": 0,
						"fullDate": "2015-03-26T03:00:00-04:00"
					},
					{
						"date": 1427439600000,
						"value": 0,
						"fullDate": "2015-03-27T03:00:00-04:00"
					},
					{
						"date": 1427526000000,
						"value": 0,
						"fullDate": "2015-03-28T03:00:00-04:00"
					},
					{
						"date": 1427612400000,
						"value": 0,
						"fullDate": "2015-03-29T03:00:00-04:00"
					},
					{
						"date": 1427698800000,
						"value": 0,
						"fullDate": "2015-03-30T03:00:00-04:00"
					},
					{
						"date": 1427785200000,
						"value": 0,
						"fullDate": "2015-03-31T03:00:00-04:00"
					},
					{
						"date": 1427871600000,
						"value": 0,
						"fullDate": "2015-04-01T03:00:00-04:00"
					},
					{
						"date": 1427958000000,
						"value": 0,
						"fullDate": "2015-04-02T03:00:00-04:00"
					},
					{
						"date": 1428044400000,
						"value": 0,
						"fullDate": "2015-04-03T03:00:00-04:00"
					},
					{
						"date": 1428130800000,
						"value": 0,
						"fullDate": "2015-04-04T03:00:00-04:00"
					},
					{
						"date": 1428217200000,
						"value": 0,
						"fullDate": "2015-04-05T03:00:00-04:00"
					},
					{
						"date": 1428303600000,
						"value": 0,
						"fullDate": "2015-04-06T03:00:00-04:00"
					},
					{
						"date": 1428390000000,
						"value": 0,
						"fullDate": "2015-04-07T03:00:00-04:00"
					},
					{
						"date": 1428476400000,
						"value": 0,
						"fullDate": "2015-04-08T03:00:00-04:00"
					},
					{
						"date": 1428562800000,
						"value": 0,
						"fullDate": "2015-04-09T03:00:00-04:00"
					},
					{
						"date": 1428649200000,
						"value": 0,
						"fullDate": "2015-04-10T03:00:00-04:00"
					},
					{
						"date": 1428735600000,
						"value": 0,
						"fullDate": "2015-04-11T03:00:00-04:00"
					},
					{
						"date": 1428822000000,
						"value": 0,
						"fullDate": "2015-04-12T03:00:00-04:00"
					},
					{
						"date": 1428908400000,
						"value": 0,
						"fullDate": "2015-04-13T03:00:00-04:00"
					},
					{
						"date": 1428994800000,
						"value": 0,
						"fullDate": "2015-04-14T03:00:00-04:00"
					},
					{
						"date": 1429081200000,
						"value": 0,
						"fullDate": "2015-04-15T03:00:00-04:00"
					},
					{
						"date": 1429167600000,
						"value": 0,
						"fullDate": "2015-04-16T03:00:00-04:00"
					},
					{
						"date": 1429254000000,
						"value": 0,
						"fullDate": "2015-04-17T03:00:00-04:00"
					},
					{
						"date": 1429340400000,
						"value": 0,
						"fullDate": "2015-04-18T03:00:00-04:00"
					},
					{
						"date": 1429426800000,
						"value": 0,
						"fullDate": "2015-04-19T03:00:00-04:00"
					},
					{
						"date": 1429513200000,
						"value": 0,
						"fullDate": "2015-04-20T03:00:00-04:00"
					},
					{
						"date": 1429599600000,
						"value": 0,
						"fullDate": "2015-04-21T03:00:00-04:00"
					},
					{
						"date": 1429686000000,
						"value": 0,
						"fullDate": "2015-04-22T03:00:00-04:00"
					},
					{
						"date": 1429772400000,
						"value": 0,
						"fullDate": "2015-04-23T03:00:00-04:00"
					},
					{
						"date": 1429858800000,
						"value": 0,
						"fullDate": "2015-04-24T03:00:00-04:00"
					},
					{
						"date": 1429945200000,
						"value": 0,
						"fullDate": "2015-04-25T03:00:00-04:00"
					},
					{
						"date": 1430031600000,
						"value": 0,
						"fullDate": "2015-04-26T03:00:00-04:00"
					},
					{
						"date": 1430118000000,
						"value": 0,
						"fullDate": "2015-04-27T03:00:00-04:00"
					},
					{
						"date": 1430204400000,
						"value": 0,
						"fullDate": "2015-04-28T03:00:00-04:00"
					},
					{
						"date": 1430290800000,
						"value": 0,
						"fullDate": "2015-04-29T03:00:00-04:00"
					},
					{
						"date": 1430377200000,
						"value": 0,
						"fullDate": "2015-04-30T03:00:00-04:00"
					},
					{
						"date": 1430463600000,
						"value": 0,
						"fullDate": "2015-05-01T03:00:00-04:00"
					},
					{
						"date": 1430550000000,
						"value": 0,
						"fullDate": "2015-05-02T03:00:00-04:00"
					},
					{
						"date": 1430636400000,
						"value": 0,
						"fullDate": "2015-05-03T03:00:00-04:00"
					},
					{
						"date": 1430722800000,
						"value": 0,
						"fullDate": "2015-05-04T03:00:00-04:00"
					},
					{
						"date": 1430809200000,
						"value": 0,
						"fullDate": "2015-05-05T03:00:00-04:00"
					},
					{
						"date": 1430895600000,
						"value": 0,
						"fullDate": "2015-05-06T03:00:00-04:00"
					},
					{
						"date": 1430982000000,
						"value": 0,
						"fullDate": "2015-05-07T03:00:00-04:00"
					},
					{
						"date": 1431068400000,
						"value": 0,
						"fullDate": "2015-05-08T03:00:00-04:00"
					},
					{
						"date": 1431154800000,
						"value": 0,
						"fullDate": "2015-05-09T03:00:00-04:00"
					},
					{
						"date": 1431241200000,
						"value": 0,
						"fullDate": "2015-05-10T03:00:00-04:00"
					},
					{
						"date": 1431327600000,
						"value": 0,
						"fullDate": "2015-05-11T03:00:00-04:00"
					},
					{
						"date": 1431414000000,
						"value": 0,
						"fullDate": "2015-05-12T03:00:00-04:00"
					},
					{
						"date": 1431500400000,
						"value": 0,
						"fullDate": "2015-05-13T03:00:00-04:00"
					},
					{
						"date": 1431586800000,
						"value": 0,
						"fullDate": "2015-05-14T03:00:00-04:00"
					},
					{
						"date": 1431673200000,
						"value": 0,
						"fullDate": "2015-05-15T03:00:00-04:00"
					},
					{
						"date": 1431759600000,
						"value": 0,
						"fullDate": "2015-05-16T03:00:00-04:00"
					},
					{
						"date": 1431846000000,
						"value": 0,
						"fullDate": "2015-05-17T03:00:00-04:00"
					},
					{
						"date": 1431932400000,
						"value": 0,
						"fullDate": "2015-05-18T03:00:00-04:00"
					},
					{
						"date": 1432018800000,
						"value": 0,
						"fullDate": "2015-05-19T03:00:00-04:00"
					},
					{
						"date": 1432105200000,
						"value": 0,
						"fullDate": "2015-05-20T03:00:00-04:00"
					},
					{
						"date": 1432191600000,
						"value": 0,
						"fullDate": "2015-05-21T03:00:00-04:00"
					},
					{
						"date": 1432278000000,
						"value": 0,
						"fullDate": "2015-05-22T03:00:00-04:00"
					},
					{
						"date": 1432364400000,
						"value": 0,
						"fullDate": "2015-05-23T03:00:00-04:00"
					},
					{
						"date": 1432450800000,
						"value": 0,
						"fullDate": "2015-05-24T03:00:00-04:00"
					},
					{
						"date": 1432537200000,
						"value": 0,
						"fullDate": "2015-05-25T03:00:00-04:00"
					},
					{
						"date": 1432623600000,
						"value": 0,
						"fullDate": "2015-05-26T03:00:00-04:00"
					},
					{
						"date": 1432710000000,
						"value": 0,
						"fullDate": "2015-05-27T03:00:00-04:00"
					},
					{
						"date": 1432796400000,
						"value": 0,
						"fullDate": "2015-05-28T03:00:00-04:00"
					},
					{
						"date": 1432882800000,
						"value": 0,
						"fullDate": "2015-05-29T03:00:00-04:00"
					},
					{
						"date": 1432969200000,
						"value": 0,
						"fullDate": "2015-05-30T03:00:00-04:00"
					},
					{
						"date": 1433055600000,
						"value": 0,
						"fullDate": "2015-05-31T03:00:00-04:00"
					},
					{
						"date": 1433142000000,
						"value": 0,
						"fullDate": "2015-06-01T03:00:00-04:00"
					},
					{
						"date": 1433228400000,
						"value": 0,
						"fullDate": "2015-06-02T03:00:00-04:00"
					},
					{
						"date": 1433314800000,
						"value": 0,
						"fullDate": "2015-06-03T03:00:00-04:00"
					},
					{
						"date": 1433401200000,
						"value": 0,
						"fullDate": "2015-06-04T03:00:00-04:00"
					},
					{
						"date": 1433487600000,
						"value": 0,
						"fullDate": "2015-06-05T03:00:00-04:00"
					},
					{
						"date": 1433574000000,
						"value": 0,
						"fullDate": "2015-06-06T03:00:00-04:00"
					},
					{
						"date": 1433660400000,
						"value": 0,
						"fullDate": "2015-06-07T03:00:00-04:00"
					},
					{
						"date": 1433746800000,
						"value": 0,
						"fullDate": "2015-06-08T03:00:00-04:00"
					},
					{
						"date": 1433833200000,
						"value": 0,
						"fullDate": "2015-06-09T03:00:00-04:00"
					},
					{
						"date": 1433919600000,
						"value": 0,
						"fullDate": "2015-06-10T03:00:00-04:00"
					},
					{
						"date": 1434006000000,
						"value": 0,
						"fullDate": "2015-06-11T03:00:00-04:00"
					},
					{
						"date": 1434092400000,
						"value": 0,
						"fullDate": "2015-06-12T03:00:00-04:00"
					},
					{
						"date": 1434178800000,
						"value": 0,
						"fullDate": "2015-06-13T03:00:00-04:00"
					},
					{
						"date": 1434265200000,
						"value": 0,
						"fullDate": "2015-06-14T03:00:00-04:00"
					},
					{
						"date": 1434351600000,
						"value": 0,
						"fullDate": "2015-06-15T03:00:00-04:00"
					},
					{
						"date": 1434438000000,
						"value": 0,
						"fullDate": "2015-06-16T03:00:00-04:00"
					},
					{
						"date": 1434524400000,
						"value": 0,
						"fullDate": "2015-06-17T03:00:00-04:00"
					},
					{
						"date": 1434610800000,
						"value": 0,
						"fullDate": "2015-06-18T03:00:00-04:00"
					},
					{
						"date": 1434697200000,
						"value": 0,
						"fullDate": "2015-06-19T03:00:00-04:00"
					},
					{
						"date": 1434783600000,
						"value": 0,
						"fullDate": "2015-06-20T03:00:00-04:00"
					},
					{
						"date": 1434870000000,
						"value": 0,
						"fullDate": "2015-06-21T03:00:00-04:00"
					},
					{
						"date": 1434956400000,
						"value": 0,
						"fullDate": "2015-06-22T03:00:00-04:00"
					},
					{
						"date": 1435042800000,
						"value": 0,
						"fullDate": "2015-06-23T03:00:00-04:00"
					},
					{
						"date": 1435129200000,
						"value": 0,
						"fullDate": "2015-06-24T03:00:00-04:00"
					},
					{
						"date": 1435215600000,
						"value": 0,
						"fullDate": "2015-06-25T03:00:00-04:00"
					},
					{
						"date": 1435302000000,
						"value": 0,
						"fullDate": "2015-06-26T03:00:00-04:00"
					},
					{
						"date": 1435388400000,
						"value": 0,
						"fullDate": "2015-06-27T03:00:00-04:00"
					},
					{
						"date": 1435474800000,
						"value": 0,
						"fullDate": "2015-06-28T03:00:00-04:00"
					},
					{
						"date": 1435561200000,
						"value": 0,
						"fullDate": "2015-06-29T03:00:00-04:00"
					},
					{
						"date": 1435647600000,
						"value": 0,
						"fullDate": "2015-06-30T03:00:00-04:00"
					},
					{
						"date": 1435734000000,
						"value": 0,
						"fullDate": "2015-07-01T03:00:00-04:00"
					},
					{
						"date": 1435820400000,
						"value": 0,
						"fullDate": "2015-07-02T03:00:00-04:00"
					},
					{
						"date": 1435906800000,
						"value": 0,
						"fullDate": "2015-07-03T03:00:00-04:00"
					},
					{
						"date": 1435993200000,
						"value": 0,
						"fullDate": "2015-07-04T03:00:00-04:00"
					},
					{
						"date": 1436079600000,
						"value": 0,
						"fullDate": "2015-07-05T03:00:00-04:00"
					},
					{
						"date": 1436166000000,
						"value": 0,
						"fullDate": "2015-07-06T03:00:00-04:00"
					},
					{
						"date": 1436252400000,
						"value": 0,
						"fullDate": "2015-07-07T03:00:00-04:00"
					},
					{
						"date": 1436338800000,
						"value": 0,
						"fullDate": "2015-07-08T03:00:00-04:00"
					},
					{
						"date": 1436425200000,
						"value": 0,
						"fullDate": "2015-07-09T03:00:00-04:00"
					},
					{
						"date": 1436511600000,
						"value": 0,
						"fullDate": "2015-07-10T03:00:00-04:00"
					},
					{
						"date": 1436598000000,
						"value": 0,
						"fullDate": "2015-07-11T03:00:00-04:00"
					},
					{
						"date": 1436684400000,
						"value": 0,
						"fullDate": "2015-07-12T03:00:00-04:00"
					},
					{
						"date": 1436770800000,
						"value": 0,
						"fullDate": "2015-07-13T03:00:00-04:00"
					},
					{
						"date": 1436857200000,
						"value": 0,
						"fullDate": "2015-07-14T03:00:00-04:00"
					},
					{
						"date": 1436943600000,
						"value": 0,
						"fullDate": "2015-07-15T03:00:00-04:00"
					},
					{
						"date": 1437030000000,
						"value": 0,
						"fullDate": "2015-07-16T03:00:00-04:00"
					},
					{
						"date": 1437116400000,
						"value": 0,
						"fullDate": "2015-07-17T03:00:00-04:00"
					},
					{
						"date": 1437202800000,
						"value": 0,
						"fullDate": "2015-07-18T03:00:00-04:00"
					},
					{
						"date": 1437289200000,
						"value": 0,
						"fullDate": "2015-07-19T03:00:00-04:00"
					},
					{
						"date": 1437375600000,
						"value": 0,
						"fullDate": "2015-07-20T03:00:00-04:00"
					},
					{
						"date": 1437462000000,
						"value": 0,
						"fullDate": "2015-07-21T03:00:00-04:00"
					},
					{
						"date": 1437548400000,
						"value": 0,
						"fullDate": "2015-07-22T03:00:00-04:00"
					},
					{
						"date": 1437634800000,
						"value": 0,
						"fullDate": "2015-07-23T03:00:00-04:00"
					},
					{
						"date": 1437721200000,
						"value": 0,
						"fullDate": "2015-07-24T03:00:00-04:00"
					},
					{
						"date": 1437807600000,
						"value": 0,
						"fullDate": "2015-07-25T03:00:00-04:00"
					},
					{
						"date": 1437894000000,
						"value": 0,
						"fullDate": "2015-07-26T03:00:00-04:00"
					},
					{
						"date": 1437980400000,
						"value": 0,
						"fullDate": "2015-07-27T03:00:00-04:00"
					},
					{
						"date": 1438066800000,
						"value": 0,
						"fullDate": "2015-07-28T03:00:00-04:00"
					},
					{
						"date": 1438153200000,
						"value": 0,
						"fullDate": "2015-07-29T03:00:00-04:00"
					},
					{
						"date": 1438239600000,
						"value": 0,
						"fullDate": "2015-07-30T03:00:00-04:00"
					},
					{
						"date": 1438326000000,
						"value": 0,
						"fullDate": "2015-07-31T03:00:00-04:00"
					},
					{
						"date": 1438412400000,
						"value": 0,
						"fullDate": "2015-08-01T03:00:00-04:00"
					},
					{
						"date": 1438498800000,
						"value": 0,
						"fullDate": "2015-08-02T03:00:00-04:00"
					},
					{
						"date": 1438585200000,
						"value": 0,
						"fullDate": "2015-08-03T03:00:00-04:00"
					},
					{
						"date": 1438671600000,
						"value": 0,
						"fullDate": "2015-08-04T03:00:00-04:00"
					},
					{
						"date": 1438758000000,
						"value": 0,
						"fullDate": "2015-08-05T03:00:00-04:00"
					},
					{
						"date": 1438844400000,
						"value": 0,
						"fullDate": "2015-08-06T03:00:00-04:00"
					},
					{
						"date": 1438930800000,
						"value": 0,
						"fullDate": "2015-08-07T03:00:00-04:00"
					},
					{
						"date": 1439017200000,
						"value": 0,
						"fullDate": "2015-08-08T03:00:00-04:00"
					},
					{
						"date": 1439103600000,
						"value": 0,
						"fullDate": "2015-08-09T03:00:00-04:00"
					},
					{
						"date": 1439190000000,
						"value": 0,
						"fullDate": "2015-08-10T03:00:00-04:00"
					},
					{
						"date": 1439276400000,
						"value": 0,
						"fullDate": "2015-08-11T03:00:00-04:00"
					},
					{
						"date": 1439362800000,
						"value": 0,
						"fullDate": "2015-08-12T03:00:00-04:00"
					},
					{
						"date": 1439449200000,
						"value": 0,
						"fullDate": "2015-08-13T03:00:00-04:00"
					},
					{
						"date": 1439535600000,
						"value": 0,
						"fullDate": "2015-08-14T03:00:00-04:00"
					},
					{
						"date": 1439622000000,
						"value": 0,
						"fullDate": "2015-08-15T03:00:00-04:00"
					},
					{
						"date": 1439708400000,
						"value": 0,
						"fullDate": "2015-08-16T03:00:00-04:00"
					},
					{
						"date": 1439794800000,
						"value": 0,
						"fullDate": "2015-08-17T03:00:00-04:00"
					},
					{
						"date": 1439881200000,
						"value": 0,
						"fullDate": "2015-08-18T03:00:00-04:00"
					},
					{
						"date": 1439967600000,
						"value": 0,
						"fullDate": "2015-08-19T03:00:00-04:00"
					},
					{
						"date": 1440054000000,
						"value": 0,
						"fullDate": "2015-08-20T03:00:00-04:00"
					},
					{
						"date": 1440140400000,
						"value": 0,
						"fullDate": "2015-08-21T03:00:00-04:00"
					},
					{
						"date": 1440226800000,
						"value": 0,
						"fullDate": "2015-08-22T03:00:00-04:00"
					},
					{
						"date": 1440313200000,
						"value": 0,
						"fullDate": "2015-08-23T03:00:00-04:00"
					},
					{
						"date": 1440399600000,
						"value": 0,
						"fullDate": "2015-08-24T03:00:00-04:00"
					},
					{
						"date": 1440486000000,
						"value": 0,
						"fullDate": "2015-08-25T03:00:00-04:00"
					},
					{
						"date": 1440572400000,
						"value": 0,
						"fullDate": "2015-08-26T03:00:00-04:00"
					},
					{
						"date": 1440658800000,
						"value": 0,
						"fullDate": "2015-08-27T03:00:00-04:00"
					},
					{
						"date": 1440745200000,
						"value": 0,
						"fullDate": "2015-08-28T03:00:00-04:00"
					},
					{
						"date": 1440831600000,
						"value": 0,
						"fullDate": "2015-08-29T03:00:00-04:00"
					},
					{
						"date": 1440918000000,
						"value": 0,
						"fullDate": "2015-08-30T03:00:00-04:00"
					},
					{
						"date": 1441004400000,
						"value": 0,
						"fullDate": "2015-08-31T03:00:00-04:00"
					},
					{
						"date": 1441090800000,
						"value": 0,
						"fullDate": "2015-09-01T03:00:00-04:00"
					},
					{
						"date": 1441177200000,
						"value": 0,
						"fullDate": "2015-09-02T03:00:00-04:00"
					},
					{
						"date": 1441263600000,
						"value": 0,
						"fullDate": "2015-09-03T03:00:00-04:00"
					},
					{
						"date": 1441350000000,
						"value": 0,
						"fullDate": "2015-09-04T03:00:00-04:00"
					},
					{
						"date": 1441436400000,
						"value": 0,
						"fullDate": "2015-09-05T03:00:00-04:00"
					},
					{
						"date": 1441522800000,
						"value": 0,
						"fullDate": "2015-09-06T03:00:00-04:00"
					},
					{
						"date": 1441609200000,
						"value": 0,
						"fullDate": "2015-09-07T03:00:00-04:00"
					},
					{
						"date": 1441695600000,
						"value": 0,
						"fullDate": "2015-09-08T03:00:00-04:00"
					},
					{
						"date": 1441782000000,
						"value": 0,
						"fullDate": "2015-09-09T03:00:00-04:00"
					},
					{
						"date": 1441868400000,
						"value": 0,
						"fullDate": "2015-09-10T03:00:00-04:00"
					},
					{
						"date": 1441954800000,
						"value": 0,
						"fullDate": "2015-09-11T03:00:00-04:00"
					},
					{
						"date": 1442041200000,
						"value": 0,
						"fullDate": "2015-09-12T03:00:00-04:00"
					},
					{
						"date": 1442127600000,
						"value": 0,
						"fullDate": "2015-09-13T03:00:00-04:00"
					},
					{
						"date": 1442214000000,
						"value": 0,
						"fullDate": "2015-09-14T03:00:00-04:00"
					},
					{
						"date": 1442300400000,
						"value": 0,
						"fullDate": "2015-09-15T03:00:00-04:00"
					},
					{
						"date": 1442386800000,
						"value": 0,
						"fullDate": "2015-09-16T03:00:00-04:00"
					},
					{
						"date": 1442473200000,
						"value": 0,
						"fullDate": "2015-09-17T03:00:00-04:00"
					},
					{
						"date": 1442559600000,
						"value": 0,
						"fullDate": "2015-09-18T03:00:00-04:00"
					},
					{
						"date": 1442646000000,
						"value": 0,
						"fullDate": "2015-09-19T03:00:00-04:00"
					},
					{
						"date": 1442732400000,
						"value": 0,
						"fullDate": "2015-09-20T03:00:00-04:00"
					},
					{
						"date": 1442818800000,
						"value": 0,
						"fullDate": "2015-09-21T03:00:00-04:00"
					},
					{
						"date": 1442905200000,
						"value": 0,
						"fullDate": "2015-09-22T03:00:00-04:00"
					},
					{
						"date": 1442991600000,
						"value": 0,
						"fullDate": "2015-09-23T03:00:00-04:00"
					},
					{
						"date": 1443078000000,
						"value": 0,
						"fullDate": "2015-09-24T03:00:00-04:00"
					},
					{
						"date": 1443164400000,
						"value": 0,
						"fullDate": "2015-09-25T03:00:00-04:00"
					},
					{
						"date": 1443250800000,
						"value": 0,
						"fullDate": "2015-09-26T03:00:00-04:00"
					},
					{
						"date": 1443337200000,
						"value": 0,
						"fullDate": "2015-09-27T03:00:00-04:00"
					},
					{
						"date": 1443423600000,
						"value": 0,
						"fullDate": "2015-09-28T03:00:00-04:00"
					},
					{
						"date": 1443510000000,
						"value": 0,
						"fullDate": "2015-09-29T03:00:00-04:00"
					},
					{
						"date": 1443596400000,
						"value": 0,
						"fullDate": "2015-09-30T03:00:00-04:00"
					},
					{
						"date": 1443682800000,
						"value": 0,
						"fullDate": "2015-10-01T03:00:00-04:00"
					},
					{
						"date": 1443769200000,
						"value": 0,
						"fullDate": "2015-10-02T03:00:00-04:00"
					},
					{
						"date": 1443855600000,
						"value": 0,
						"fullDate": "2015-10-03T03:00:00-04:00"
					},
					{
						"date": 1443942000000,
						"value": 0,
						"fullDate": "2015-10-04T03:00:00-04:00"
					},
					{
						"date": 1444028400000,
						"value": 0,
						"fullDate": "2015-10-05T03:00:00-04:00"
					},
					{
						"date": 1444114800000,
						"value": 0,
						"fullDate": "2015-10-06T03:00:00-04:00"
					},
					{
						"date": 1444201200000,
						"value": 0,
						"fullDate": "2015-10-07T03:00:00-04:00"
					},
					{
						"date": 1444287600000,
						"value": 0,
						"fullDate": "2015-10-08T03:00:00-04:00"
					},
					{
						"date": 1444374000000,
						"value": 0,
						"fullDate": "2015-10-09T03:00:00-04:00"
					},
					{
						"date": 1444460400000,
						"value": 0,
						"fullDate": "2015-10-10T03:00:00-04:00"
					},
					{
						"date": 1444546800000,
						"value": 0,
						"fullDate": "2015-10-11T03:00:00-04:00"
					},
					{
						"date": 1444633200000,
						"value": 0,
						"fullDate": "2015-10-12T03:00:00-04:00"
					},
					{
						"date": 1444719600000,
						"value": 0,
						"fullDate": "2015-10-13T03:00:00-04:00"
					},
					{
						"date": 1444806000000,
						"value": 0,
						"fullDate": "2015-10-14T03:00:00-04:00"
					},
					{
						"date": 1444892400000,
						"value": 0,
						"fullDate": "2015-10-15T03:00:00-04:00"
					},
					{
						"date": 1444978800000,
						"value": 0,
						"fullDate": "2015-10-16T03:00:00-04:00"
					},
					{
						"date": 1445065200000,
						"value": 0,
						"fullDate": "2015-10-17T03:00:00-04:00"
					},
					{
						"date": 1445151600000,
						"value": 0,
						"fullDate": "2015-10-18T03:00:00-04:00"
					},
					{
						"date": 1445238000000,
						"value": 0,
						"fullDate": "2015-10-19T03:00:00-04:00"
					},
					{
						"date": 1445324400000,
						"value": 0,
						"fullDate": "2015-10-20T03:00:00-04:00"
					},
					{
						"date": 1445410800000,
						"value": 0,
						"fullDate": "2015-10-21T03:00:00-04:00"
					},
					{
						"date": 1445497200000,
						"value": 0,
						"fullDate": "2015-10-22T03:00:00-04:00"
					},
					{
						"date": 1445583600000,
						"value": 0,
						"fullDate": "2015-10-23T03:00:00-04:00"
					},
					{
						"date": 1445670000000,
						"value": 0,
						"fullDate": "2015-10-24T03:00:00-04:00"
					},
					{
						"date": 1445756400000,
						"value": 0,
						"fullDate": "2015-10-25T03:00:00-04:00"
					},
					{
						"date": 1445842800000,
						"value": 0,
						"fullDate": "2015-10-26T03:00:00-04:00"
					},
					{
						"date": 1445929200000,
						"value": 0,
						"fullDate": "2015-10-27T03:00:00-04:00"
					},
					{
						"date": 1446015600000,
						"value": 0,
						"fullDate": "2015-10-28T03:00:00-04:00"
					},
					{
						"date": 1446102000000,
						"value": 0,
						"fullDate": "2015-10-29T03:00:00-04:00"
					},
					{
						"date": 1446188400000,
						"value": 0,
						"fullDate": "2015-10-30T03:00:00-04:00"
					},
					{
						"date": 1446274800000,
						"value": 0,
						"fullDate": "2015-10-31T03:00:00-04:00"
					},
					{
						"date": 1446361200000,
						"value": 0,
						"fullDate": "2015-11-01T02:00:00-05:00"
					},
					{
						"date": 1446361200000,
						"value": 0,
						"fullDate": "2015-11-01T02:00:00-05:00"
					},
					{
						"date": 1446451200000,
						"value": 0,
						"fullDate": "2015-11-02T03:00:00-05:00"
					},
					{
						"date": 1446537600000,
						"value": 0,
						"fullDate": "2015-11-03T03:00:00-05:00"
					},
					{
						"date": 1446624000000,
						"value": 0,
						"fullDate": "2015-11-04T03:00:00-05:00"
					},
					{
						"date": 1446710400000,
						"value": 0,
						"fullDate": "2015-11-05T03:00:00-05:00"
					},
					{
						"date": 1446796800000,
						"value": 0,
						"fullDate": "2015-11-06T03:00:00-05:00"
					},
					{
						"date": 1446883200000,
						"value": 0,
						"fullDate": "2015-11-07T03:00:00-05:00"
					},
					{
						"date": 1446969600000,
						"value": 0,
						"fullDate": "2015-11-08T03:00:00-05:00"
					},
					{
						"date": 1447056000000,
						"value": 0,
						"fullDate": "2015-11-09T03:00:00-05:00"
					},
					{
						"date": 1447142400000,
						"value": 0,
						"fullDate": "2015-11-10T03:00:00-05:00"
					},
					{
						"date": 1447228800000,
						"value": 0,
						"fullDate": "2015-11-11T03:00:00-05:00"
					},
					{
						"date": 1447315200000,
						"value": 0,
						"fullDate": "2015-11-12T03:00:00-05:00"
					},
					{
						"date": 1447401600000,
						"value": 0,
						"fullDate": "2015-11-13T03:00:00-05:00"
					},
					{
						"date": 1447488000000,
						"value": 0,
						"fullDate": "2015-11-14T03:00:00-05:00"
					},
					{
						"date": 1447574400000,
						"value": 0,
						"fullDate": "2015-11-15T03:00:00-05:00"
					},
					{
						"date": 1447660800000,
						"value": 0,
						"fullDate": "2015-11-16T03:00:00-05:00"
					},
					{
						"date": 1447747200000,
						"value": 0,
						"fullDate": "2015-11-17T03:00:00-05:00"
					},
					{
						"date": 1447833600000,
						"value": 0,
						"fullDate": "2015-11-18T03:00:00-05:00"
					},
					{
						"date": 1447920000000,
						"value": 0,
						"fullDate": "2015-11-19T03:00:00-05:00"
					},
					{
						"date": 1448006400000,
						"value": 0,
						"fullDate": "2015-11-20T03:00:00-05:00"
					},
					{
						"date": 1448092800000,
						"value": 0,
						"fullDate": "2015-11-21T03:00:00-05:00"
					},
					{
						"date": 1448179200000,
						"value": 0,
						"fullDate": "2015-11-22T03:00:00-05:00"
					},
					{
						"date": 1448265600000,
						"value": 0,
						"fullDate": "2015-11-23T03:00:00-05:00"
					},
					{
						"date": 1448352000000,
						"value": 0,
						"fullDate": "2015-11-24T03:00:00-05:00"
					},
					{
						"date": 1448438400000,
						"value": 0,
						"fullDate": "2015-11-25T03:00:00-05:00"
					},
					{
						"date": 1448524800000,
						"value": 0,
						"fullDate": "2015-11-26T03:00:00-05:00"
					},
					{
						"date": 1448611200000,
						"value": 0,
						"fullDate": "2015-11-27T03:00:00-05:00"
					},
					{
						"date": 1448697600000,
						"value": 0,
						"fullDate": "2015-11-28T03:00:00-05:00"
					},
					{
						"date": 1448784000000,
						"value": 0,
						"fullDate": "2015-11-29T03:00:00-05:00"
					},
					{
						"date": 1448870400000,
						"value": 0,
						"fullDate": "2015-11-30T03:00:00-05:00"
					},
					{
						"date": 1448956800000,
						"value": 0,
						"fullDate": "2015-12-01T03:00:00-05:00"
					},
					{
						"date": 1449043200000,
						"value": 0,
						"fullDate": "2015-12-02T03:00:00-05:00"
					},
					{
						"date": 1449129600000,
						"value": 0,
						"fullDate": "2015-12-03T03:00:00-05:00"
					},
					{
						"date": 1449216000000,
						"value": 0,
						"fullDate": "2015-12-04T03:00:00-05:00"
					},
					{
						"date": 1449302400000,
						"value": 0,
						"fullDate": "2015-12-05T03:00:00-05:00"
					},
					{
						"date": 1449388800000,
						"value": 0,
						"fullDate": "2015-12-06T03:00:00-05:00"
					},
					{
						"date": 1449475200000,
						"value": 0,
						"fullDate": "2015-12-07T03:00:00-05:00"
					},
					{
						"date": 1449561600000,
						"value": 0,
						"fullDate": "2015-12-08T03:00:00-05:00"
					},
					{
						"date": 1449648000000,
						"value": 0,
						"fullDate": "2015-12-09T03:00:00-05:00"
					},
					{
						"date": 1449734400000,
						"value": 0,
						"fullDate": "2015-12-10T03:00:00-05:00"
					},
					{
						"date": 1449820800000,
						"value": 0,
						"fullDate": "2015-12-11T03:00:00-05:00"
					},
					{
						"date": 1449907200000,
						"value": 0,
						"fullDate": "2015-12-12T03:00:00-05:00"
					},
					{
						"date": 1449993600000,
						"value": 0,
						"fullDate": "2015-12-13T03:00:00-05:00"
					},
					{
						"date": 1450080000000,
						"value": 0,
						"fullDate": "2015-12-14T03:00:00-05:00"
					},
					{
						"date": 1450166400000,
						"value": 0,
						"fullDate": "2015-12-15T03:00:00-05:00"
					},
					{
						"date": 1450252800000,
						"value": 0,
						"fullDate": "2015-12-16T03:00:00-05:00"
					},
					{
						"date": 1450339200000,
						"value": 0,
						"fullDate": "2015-12-17T03:00:00-05:00"
					},
					{
						"date": 1450425600000,
						"value": 0,
						"fullDate": "2015-12-18T03:00:00-05:00"
					},
					{
						"date": 1450512000000,
						"value": 0,
						"fullDate": "2015-12-19T03:00:00-05:00"
					},
					{
						"date": 1450598400000,
						"value": 0,
						"fullDate": "2015-12-20T03:00:00-05:00"
					},
					{
						"date": 1450684800000,
						"value": 0,
						"fullDate": "2015-12-21T03:00:00-05:00"
					},
					{
						"date": 1450771200000,
						"value": 0,
						"fullDate": "2015-12-22T03:00:00-05:00"
					},
					{
						"date": 1450857600000,
						"value": 0,
						"fullDate": "2015-12-23T03:00:00-05:00"
					},
					{
						"date": 1450944000000,
						"value": 0,
						"fullDate": "2015-12-24T03:00:00-05:00"
					},
					{
						"date": 1451030400000,
						"value": 0,
						"fullDate": "2015-12-25T03:00:00-05:00"
					},
					{
						"date": 1451116800000,
						"value": 0,
						"fullDate": "2015-12-26T03:00:00-05:00"
					},
					{
						"date": 1451203200000,
						"value": 0,
						"fullDate": "2015-12-27T03:00:00-05:00"
					},
					{
						"date": 1451289600000,
						"value": 0,
						"fullDate": "2015-12-28T03:00:00-05:00"
					},
					{
						"date": 1451376000000,
						"value": 0,
						"fullDate": "2015-12-29T03:00:00-05:00"
					},
					{
						"date": 1451462400000,
						"value": 0,
						"fullDate": "2015-12-30T03:00:00-05:00"
					},
					{
						"date": 1451548800000,
						"value": 0,
						"fullDate": "2015-12-31T03:00:00-05:00"
					},
					{
						"date": 1451635200000,
						"value": 0,
						"fullDate": "2016-01-01T03:00:00-05:00"
					},
					{
						"date": 1451721600000,
						"value": 0,
						"fullDate": "2016-01-02T03:00:00-05:00"
					},
					{
						"date": 1451808000000,
						"value": 0,
						"fullDate": "2016-01-03T03:00:00-05:00"
					},
					{
						"date": 1451894400000,
						"value": 0,
						"fullDate": "2016-01-04T03:00:00-05:00"
					},
					{
						"date": 1451980800000,
						"value": 0,
						"fullDate": "2016-01-05T03:00:00-05:00"
					},
					{
						"date": 1452067200000,
						"value": 0,
						"fullDate": "2016-01-06T03:00:00-05:00"
					},
					{
						"date": 1452153600000,
						"value": 0,
						"fullDate": "2016-01-07T03:00:00-05:00"
					},
					{
						"date": 1452240000000,
						"value": 0,
						"fullDate": "2016-01-08T03:00:00-05:00"
					},
					{
						"date": 1452326400000,
						"value": 0,
						"fullDate": "2016-01-09T03:00:00-05:00"
					},
					{
						"date": 1452412800000,
						"value": 0,
						"fullDate": "2016-01-10T03:00:00-05:00"
					},
					{
						"date": 1452499200000,
						"value": 0,
						"fullDate": "2016-01-11T03:00:00-05:00"
					},
					{
						"date": 1452585600000,
						"value": 0,
						"fullDate": "2016-01-12T03:00:00-05:00"
					},
					{
						"date": 1452672000000,
						"value": 0,
						"fullDate": "2016-01-13T03:00:00-05:00"
					},
					{
						"date": 1452758400000,
						"value": 0,
						"fullDate": "2016-01-14T03:00:00-05:00"
					},
					{
						"date": 1452844800000,
						"value": 0,
						"fullDate": "2016-01-15T03:00:00-05:00"
					},
					{
						"date": 1452931200000,
						"value": 0,
						"fullDate": "2016-01-16T03:00:00-05:00"
					},
					{
						"date": 1453017600000,
						"value": 0,
						"fullDate": "2016-01-17T03:00:00-05:00"
					},
					{
						"date": 1453104000000,
						"value": 0,
						"fullDate": "2016-01-18T03:00:00-05:00"
					},
					{
						"date": 1453190400000,
						"value": 0,
						"fullDate": "2016-01-19T03:00:00-05:00"
					},
					{
						"date": 1453276800000,
						"value": 0,
						"fullDate": "2016-01-20T03:00:00-05:00"
					},
					{
						"date": 1453363200000,
						"value": 0,
						"fullDate": "2016-01-21T03:00:00-05:00"
					},
					{
						"date": 1453449600000,
						"value": 0,
						"fullDate": "2016-01-22T03:00:00-05:00"
					},
					{
						"date": 1453536000000,
						"value": 0,
						"fullDate": "2016-01-23T03:00:00-05:00"
					},
					{
						"date": 1453622400000,
						"value": 0,
						"fullDate": "2016-01-24T03:00:00-05:00"
					},
					{
						"date": 1453708800000,
						"value": 0,
						"fullDate": "2016-01-25T03:00:00-05:00"
					},
					{
						"date": 1453795200000,
						"value": 0,
						"fullDate": "2016-01-26T03:00:00-05:00"
					},
					{
						"date": 1453881600000,
						"value": 0,
						"fullDate": "2016-01-27T03:00:00-05:00"
					},
					{
						"date": 1453968000000,
						"value": 0,
						"fullDate": "2016-01-28T03:00:00-05:00"
					},
					{
						"date": 1454054400000,
						"value": 0,
						"fullDate": "2016-01-29T03:00:00-05:00"
					},
					{
						"date": 1454140800000,
						"value": 0,
						"fullDate": "2016-01-30T03:00:00-05:00"
					},
					{
						"date": 1454227200000,
						"value": 0,
						"fullDate": "2016-01-31T03:00:00-05:00"
					},
					{
						"date": 1454313600000,
						"value": 0,
						"fullDate": "2016-02-01T03:00:00-05:00"
					},
					{
						"date": 1454400000000,
						"value": 0,
						"fullDate": "2016-02-02T03:00:00-05:00"
					},
					{
						"date": 1454486400000,
						"value": 0,
						"fullDate": "2016-02-03T03:00:00-05:00"
					},
					{
						"date": 1454572800000,
						"value": 0,
						"fullDate": "2016-02-04T03:00:00-05:00"
					},
					{
						"date": 1454659200000,
						"value": 0,
						"fullDate": "2016-02-05T03:00:00-05:00"
					},
					{
						"date": 1454745600000,
						"value": 0,
						"fullDate": "2016-02-06T03:00:00-05:00"
					},
					{
						"date": 1454832000000,
						"value": 0,
						"fullDate": "2016-02-07T03:00:00-05:00"
					},
					{
						"date": 1454918400000,
						"value": 0,
						"fullDate": "2016-02-08T03:00:00-05:00"
					},
					{
						"date": 1455004800000,
						"value": 0,
						"fullDate": "2016-02-09T03:00:00-05:00"
					},
					{
						"date": 1455091200000,
						"value": 0,
						"fullDate": "2016-02-10T03:00:00-05:00"
					},
					{
						"date": 1455177600000,
						"value": 0,
						"fullDate": "2016-02-11T03:00:00-05:00"
					},
					{
						"date": 1455264000000,
						"value": 0,
						"fullDate": "2016-02-12T03:00:00-05:00"
					},
					{
						"date": 1455350400000,
						"value": 0,
						"fullDate": "2016-02-13T03:00:00-05:00"
					},
					{
						"date": 1455523200000,
						"value": 10,
						"fullDate": "2016-02-15T03:00:00-05:00"
					},
					{
						"date": 1455523200000,
						"value": 0,
						"fullDate": "2016-02-15T03:00:00-05:00"
					},
					{
						"date": 1455609600000,
						"value": 0,
						"fullDate": "2016-02-16T03:00:00-05:00"
					},
					{
						"date": 1455696000000,
						"value": 0,
						"fullDate": "2016-02-17T03:00:00-05:00"
					},
					{
						"date": 1455868800000,
						"value": 1,
						"fullDate": "2016-02-19T03:00:00-05:00"
					},
					{
						"date": 1455868800000,
						"value": 0,
						"fullDate": "2016-02-19T03:00:00-05:00"
					},
					{
						"date": 1455955200000,
						"value": 0,
						"fullDate": "2016-02-20T03:00:00-05:00"
					},
					{
						"date": 1456041600000,
						"value": 0,
						"fullDate": "2016-02-21T03:00:00-05:00"
					},
					{
						"date": 1456214400000,
						"value": 4,
						"fullDate": "2016-02-23T03:00:00-05:00"
					},
					{
						"date": 1456214400000,
						"value": 0,
						"fullDate": "2016-02-23T03:00:00-05:00"
					},
					{
						"date": 1456300800000,
						"value": 0,
						"fullDate": "2016-02-24T03:00:00-05:00"
					},
					{
						"date": 1456387200000,
						"value": 0,
						"fullDate": "2016-02-25T03:00:00-05:00"
					},
					{
						"date": 1456473600000,
						"value": 0,
						"fullDate": "2016-02-26T03:00:00-05:00"
					},
					{
						"date": 1456560000000,
						"value": 0,
						"fullDate": "2016-02-27T03:00:00-05:00"
					},
					{
						"date": 1456646400000,
						"value": 0,
						"fullDate": "2016-02-28T03:00:00-05:00"
					},
					{
						"date": 1456732800000,
						"value": 0,
						"fullDate": "2016-02-29T03:00:00-05:00"
					},
					{
						"date": 1456819200000,
						"value": 0,
						"fullDate": "2016-03-01T03:00:00-05:00"
					},
					{
						"date": 1456905600000,
						"value": 0,
						"fullDate": "2016-03-02T03:00:00-05:00"
					},
					{
						"date": 1457078400000,
						"value": 1,
						"fullDate": "2016-03-04T03:00:00-05:00"
					},
					{
						"date": 1457164800000,
						"value": 1,
						"fullDate": "2016-03-05T03:00:00-05:00"
					},
					{
						"date": 1457164800000,
						"value": 0,
						"fullDate": "2016-03-05T03:00:00-05:00"
					},
					{
						"date": 1457251200000,
						"value": 0,
						"fullDate": "2016-03-06T03:00:00-05:00"
					},
					{
						"date": 1457337600000,
						"value": 0,
						"fullDate": "2016-03-07T03:00:00-05:00"
					},
					{
						"date": 1457424000000,
						"value": 0,
						"fullDate": "2016-03-08T03:00:00-05:00"
					},
					{
						"date": 1457510400000,
						"value": 0,
						"fullDate": "2016-03-09T03:00:00-05:00"
					},
					{
						"date": 1457596800000,
						"value": 0,
						"fullDate": "2016-03-10T03:00:00-05:00"
					},
					{
						"date": 1457683200000,
						"value": 0,
						"fullDate": "2016-03-11T03:00:00-05:00"
					},
					{
						"date": 1457769600000,
						"value": 0,
						"fullDate": "2016-03-12T03:00:00-05:00"
					},
					{
						"date": 1457938800000,
						"value": 0,
						"fullDate": "2016-03-14T03:00:00-04:00"
					},
					{
						"date": 1458025200000,
						"value": 0,
						"fullDate": "2016-03-15T03:00:00-04:00"
					},
					{
						"date": 1458111600000,
						"value": 0,
						"fullDate": "2016-03-16T03:00:00-04:00"
					},
					{
						"date": 1458198000000,
						"value": 0,
						"fullDate": "2016-03-17T03:00:00-04:00"
					},
					{
						"date": 1458284400000,
						"value": 0,
						"fullDate": "2016-03-18T03:00:00-04:00"
					},
					{
						"date": 1458370800000,
						"value": 1,
						"fullDate": "2016-03-19T03:00:00-04:00"
					},
					{
						"date": 1458457200000,
						"value": 0,
						"fullDate": "2016-03-20T03:00:00-04:00"
					},
					{
						"date": 1458543600000,
						"value": 0,
						"fullDate": "2016-03-21T03:00:00-04:00"
					},
					{
						"date": 1458630000000,
						"value": 0,
						"fullDate": "2016-03-22T03:00:00-04:00"
					},
					{
						"date": 1458716400000,
						"value": 0,
						"fullDate": "2016-03-23T03:00:00-04:00"
					},
					{
						"date": 1458802800000,
						"value": 0,
						"fullDate": "2016-03-24T03:00:00-04:00"
					},
					{
						"date": 1458889200000,
						"value": 0,
						"fullDate": "2016-03-25T03:00:00-04:00"
					},
					{
						"date": 1458975600000,
						"value": 0,
						"fullDate": "2016-03-26T03:00:00-04:00"
					},
					{
						"date": 1459062000000,
						"value": 0,
						"fullDate": "2016-03-27T03:00:00-04:00"
					},
					{
						"date": 1459148400000,
						"value": 0,
						"fullDate": "2016-03-28T03:00:00-04:00"
					},
					{
						"date": 1459234800000,
						"value": 4,
						"fullDate": "2016-03-29T03:00:00-04:00"
					},
					{
						"date": 1459321200000,
						"value": 0,
						"fullDate": "2016-03-30T03:00:00-04:00"
					},
					{
						"date": 1459407600000,
						"value": 0,
						"fullDate": "2016-03-31T03:00:00-04:00"
					},
					{
						"date": 1459494000000,
						"value": 2,
						"fullDate": "2016-04-01T03:00:00-04:00"
					},
					{
						"date": 1459580400000,
						"value": 0,
						"fullDate": "2016-04-02T03:00:00-04:00"
					},
					{
						"date": 1459666800000,
						"value": 0,
						"fullDate": "2016-04-03T03:00:00-04:00"
					},
					{
						"date": 1459753200000,
						"value": 0,
						"fullDate": "2016-04-04T03:00:00-04:00"
					},
					{
						"date": 1459839600000,
						"value": 0,
						"fullDate": "2016-04-05T03:00:00-04:00"
					},
					{
						"date": 1459926000000,
						"value": 0,
						"fullDate": "2016-04-06T03:00:00-04:00"
					},
					{
						"date": 1460012400000,
						"value": 0,
						"fullDate": "2016-04-07T03:00:00-04:00"
					},
					{
						"date": 1460098800000,
						"value": 2,
						"fullDate": "2016-04-08T03:00:00-04:00"
					},
					{
						"date": 1460185200000,
						"value": 0,
						"fullDate": "2016-04-09T03:00:00-04:00"
					},
					{
						"date": 1460271600000,
						"value": 1,
						"fullDate": "2016-04-10T03:00:00-04:00"
					},
					{
						"date": 1460358000000,
						"value": 0,
						"fullDate": "2016-04-11T03:00:00-04:00"
					},
					{
						"date": 1460444400000,
						"value": 1,
						"fullDate": "2016-04-12T03:00:00-04:00"
					},
					{
						"date": 1460530800000,
						"value": 0,
						"fullDate": "2016-04-13T03:00:00-04:00"
					},
					{
						"date": 1460617200000,
						"value": 1,
						"fullDate": "2016-04-14T03:00:00-04:00"
					},
					{
						"date": 1460703600000,
						"value": 0,
						"fullDate": "2016-04-15T03:00:00-04:00"
					},
					{
						"date": 1460790000000,
						"value": 0,
						"fullDate": "2016-04-16T03:00:00-04:00"
					},
					{
						"date": 1460876400000,
						"value": 0,
						"fullDate": "2016-04-17T03:00:00-04:00"
					},
					{
						"date": 1460962800000,
						"value": 0,
						"fullDate": "2016-04-18T03:00:00-04:00"
					},
					{
						"date": 1461049200000,
						"value": 0,
						"fullDate": "2016-04-19T03:00:00-04:00"
					},
					{
						"date": 1461135600000,
						"value": 0,
						"fullDate": "2016-04-20T03:00:00-04:00"
					},
					{
						"date": 1461222000000,
						"value": 0,
						"fullDate": "2016-04-21T03:00:00-04:00"
					},
					{
						"date": 1461308400000,
						"value": 0,
						"fullDate": "2016-04-22T03:00:00-04:00"
					},
					{
						"date": 1461394800000,
						"value": 0,
						"fullDate": "2016-04-23T03:00:00-04:00"
					},
					{
						"date": 1461481200000,
						"value": 0,
						"fullDate": "2016-04-24T03:00:00-04:00"
					},
					{
						"date": 1461567600000,
						"value": 0,
						"fullDate": "2016-04-25T03:00:00-04:00"
					},
					{
						"date": 1461654000000,
						"value": 0,
						"fullDate": "2016-04-26T03:00:00-04:00"
					},
					{
						"date": 1461740400000,
						"value": 0,
						"fullDate": "2016-04-27T03:00:00-04:00"
					},
					{
						"date": 1461826800000,
						"value": 0,
						"fullDate": "2016-04-28T03:00:00-04:00"
					},
					{
						"date": 1461913200000,
						"value": 0,
						"fullDate": "2016-04-29T03:00:00-04:00"
					},
					{
						"date": 1461999600000,
						"value": 0,
						"fullDate": "2016-04-30T03:00:00-04:00"
					},
					{
						"date": 1462086000000,
						"value": 0,
						"fullDate": "2016-05-01T03:00:00-04:00"
					},
					{
						"date": 1462172400000,
						"value": 0,
						"fullDate": "2016-05-02T03:00:00-04:00"
					},
					{
						"date": 1462258800000,
						"value": 0,
						"fullDate": "2016-05-03T03:00:00-04:00"
					},
					{
						"date": 1462345200000,
						"value": 0,
						"fullDate": "2016-05-04T03:00:00-04:00"
					},
					{
						"date": 1462431600000,
						"value": 0,
						"fullDate": "2016-05-05T03:00:00-04:00"
					},
					{
						"date": 1462518000000,
						"value": 0,
						"fullDate": "2016-05-06T03:00:00-04:00"
					},
					{
						"date": 1462604400000,
						"value": 0,
						"fullDate": "2016-05-07T03:00:00-04:00"
					},
					{
						"date": 1462690800000,
						"value": 0,
						"fullDate": "2016-05-08T03:00:00-04:00"
					},
					{
						"date": 1462777200000,
						"value": 0,
						"fullDate": "2016-05-09T03:00:00-04:00"
					},
					{
						"date": 1462863600000,
						"value": 0,
						"fullDate": "2016-05-10T03:00:00-04:00"
					},
					{
						"date": 1462950000000,
						"value": 0,
						"fullDate": "2016-05-11T03:00:00-04:00"
					},
					{
						"date": 1463036400000,
						"value": 0,
						"fullDate": "2016-05-12T03:00:00-04:00"
					},
					{
						"date": 1463122800000,
						"value": 0,
						"fullDate": "2016-05-13T03:00:00-04:00"
					},
					{
						"date": 1463209200000,
						"value": 0,
						"fullDate": "2016-05-14T03:00:00-04:00"
					},
					{
						"date": 1463295600000,
						"value": 0,
						"fullDate": "2016-05-15T03:00:00-04:00"
					},
					{
						"date": 1463382000000,
						"value": 0,
						"fullDate": "2016-05-16T03:00:00-04:00"
					},
					{
						"date": 1463468400000,
						"value": 0,
						"fullDate": "2016-05-17T03:00:00-04:00"
					},
					{
						"date": 1463554800000,
						"value": 0,
						"fullDate": "2016-05-18T03:00:00-04:00"
					},
					{
						"date": 1463641200000,
						"value": 0,
						"fullDate": "2016-05-19T03:00:00-04:00"
					},
					{
						"date": 1463727600000,
						"value": 0,
						"fullDate": "2016-05-20T03:00:00-04:00"
					},
					{
						"date": 1463814000000,
						"value": 0,
						"fullDate": "2016-05-21T03:00:00-04:00"
					},
					{
						"date": 1463900400000,
						"value": 0,
						"fullDate": "2016-05-22T03:00:00-04:00"
					},
					{
						"date": 1463986800000,
						"value": 0,
						"fullDate": "2016-05-23T03:00:00-04:00"
					},
					{
						"date": 1464073200000,
						"value": 0,
						"fullDate": "2016-05-24T03:00:00-04:00"
					},
					{
						"date": 1464159600000,
						"value": 0,
						"fullDate": "2016-05-25T03:00:00-04:00"
					},
					{
						"date": 1464246000000,
						"value": 0,
						"fullDate": "2016-05-26T03:00:00-04:00"
					},
					{
						"date": 1464332400000,
						"value": 0,
						"fullDate": "2016-05-27T03:00:00-04:00"
					},
					{
						"date": 1464418800000,
						"value": 0,
						"fullDate": "2016-05-28T03:00:00-04:00"
					},
					{
						"date": 1464505200000,
						"value": 0,
						"fullDate": "2016-05-29T03:00:00-04:00"
					},
					{
						"date": 1464591600000,
						"value": 0,
						"fullDate": "2016-05-30T03:00:00-04:00"
					},
					{
						"date": 1464678000000,
						"value": 0,
						"fullDate": "2016-05-31T03:00:00-04:00"
					},
					{
						"date": 1464764400000,
						"value": 0,
						"fullDate": "2016-06-01T03:00:00-04:00"
					},
					{
						"date": 1464850800000,
						"value": 0,
						"fullDate": "2016-06-02T03:00:00-04:00"
					},
					{
						"date": 1464937200000,
						"value": 0,
						"fullDate": "2016-06-03T03:00:00-04:00"
					},
					{
						"date": 1465023600000,
						"value": 0,
						"fullDate": "2016-06-04T03:00:00-04:00"
					},
					{
						"date": 1465110000000,
						"value": 0,
						"fullDate": "2016-06-05T03:00:00-04:00"
					},
					{
						"date": 1465196400000,
						"value": 0,
						"fullDate": "2016-06-06T03:00:00-04:00"
					},
					{
						"date": 1465282800000,
						"value": 0,
						"fullDate": "2016-06-07T03:00:00-04:00"
					},
					{
						"date": 1465369200000,
						"value": 0,
						"fullDate": "2016-06-08T03:00:00-04:00"
					},
					{
						"date": 1465455600000,
						"value": 0,
						"fullDate": "2016-06-09T03:00:00-04:00"
					},
					{
						"date": 1465542000000,
						"value": 0,
						"fullDate": "2016-06-10T03:00:00-04:00"
					},
					{
						"date": 1465628400000,
						"value": 0,
						"fullDate": "2016-06-11T03:00:00-04:00"
					},
					{
						"date": 1465714800000,
						"value": 0,
						"fullDate": "2016-06-12T03:00:00-04:00"
					},
					{
						"date": 1465801200000,
						"value": 0,
						"fullDate": "2016-06-13T03:00:00-04:00"
					},
					{
						"date": 1465887600000,
						"value": 0,
						"fullDate": "2016-06-14T03:00:00-04:00"
					},
					{
						"date": 1465974000000,
						"value": 0,
						"fullDate": "2016-06-15T03:00:00-04:00"
					},
					{
						"date": 1466060400000,
						"value": 0,
						"fullDate": "2016-06-16T03:00:00-04:00"
					},
					{
						"date": 1466146800000,
						"value": 0,
						"fullDate": "2016-06-17T03:00:00-04:00"
					},
					{
						"date": 1466233200000,
						"value": 0,
						"fullDate": "2016-06-18T03:00:00-04:00"
					},
					{
						"date": 1466319600000,
						"value": 0,
						"fullDate": "2016-06-19T03:00:00-04:00"
					},
					{
						"date": 1466406000000,
						"value": 0,
						"fullDate": "2016-06-20T03:00:00-04:00"
					},
					{
						"date": 1466492400000,
						"value": 0,
						"fullDate": "2016-06-21T03:00:00-04:00"
					},
					{
						"date": 1466578800000,
						"value": 0,
						"fullDate": "2016-06-22T03:00:00-04:00"
					},
					{
						"date": 1466665200000,
						"value": 0,
						"fullDate": "2016-06-23T03:00:00-04:00"
					},
					{
						"date": 1466751600000,
						"value": 0,
						"fullDate": "2016-06-24T03:00:00-04:00"
					},
					{
						"date": 1466838000000,
						"value": 0,
						"fullDate": "2016-06-25T03:00:00-04:00"
					},
					{
						"date": 1466924400000,
						"value": 0,
						"fullDate": "2016-06-26T03:00:00-04:00"
					},
					{
						"date": 1467010800000,
						"value": 0,
						"fullDate": "2016-06-27T03:00:00-04:00"
					},
					{
						"date": 1467097200000,
						"value": 0,
						"fullDate": "2016-06-28T03:00:00-04:00"
					},
					{
						"date": 1467183600000,
						"value": 0,
						"fullDate": "2016-06-29T03:00:00-04:00"
					},
					{
						"date": 1467270000000,
						"value": 0,
						"fullDate": "2016-06-30T03:00:00-04:00"
					},
					{
						"date": 1467356400000,
						"value": 0,
						"fullDate": "2016-07-01T03:00:00-04:00"
					},
					{
						"date": 1467442800000,
						"value": 0,
						"fullDate": "2016-07-02T03:00:00-04:00"
					},
					{
						"date": 1467529200000,
						"value": 0,
						"fullDate": "2016-07-03T03:00:00-04:00"
					},
					{
						"date": 1467615600000,
						"value": 0,
						"fullDate": "2016-07-04T03:00:00-04:00"
					},
					{
						"date": 1467702000000,
						"value": 0,
						"fullDate": "2016-07-05T03:00:00-04:00"
					},
					{
						"date": 1467788400000,
						"value": 0,
						"fullDate": "2016-07-06T03:00:00-04:00"
					},
					{
						"date": 1467874800000,
						"value": 0,
						"fullDate": "2016-07-07T03:00:00-04:00"
					},
					{
						"date": 1467961200000,
						"value": 0,
						"fullDate": "2016-07-08T03:00:00-04:00"
					},
					{
						"date": 1468047600000,
						"value": 0,
						"fullDate": "2016-07-09T03:00:00-04:00"
					},
					{
						"date": 1468134000000,
						"value": 0,
						"fullDate": "2016-07-10T03:00:00-04:00"
					},
					{
						"date": 1468220400000,
						"value": 0,
						"fullDate": "2016-07-11T03:00:00-04:00"
					},
					{
						"date": 1468306800000,
						"value": 0,
						"fullDate": "2016-07-12T03:00:00-04:00"
					},
					{
						"date": 1468393200000,
						"value": 0,
						"fullDate": "2016-07-13T03:00:00-04:00"
					},
					{
						"date": 1468479600000,
						"value": 0,
						"fullDate": "2016-07-14T03:00:00-04:00"
					},
					{
						"date": 1468566000000,
						"value": 0,
						"fullDate": "2016-07-15T03:00:00-04:00"
					},
					{
						"date": 1468652400000,
						"value": 0,
						"fullDate": "2016-07-16T03:00:00-04:00"
					},
					{
						"date": 1468738800000,
						"value": 0,
						"fullDate": "2016-07-17T03:00:00-04:00"
					},
					{
						"date": 1468825200000,
						"value": 0,
						"fullDate": "2016-07-18T03:00:00-04:00"
					},
					{
						"date": 1468911600000,
						"value": 0,
						"fullDate": "2016-07-19T03:00:00-04:00"
					},
					{
						"date": 1468998000000,
						"value": 0,
						"fullDate": "2016-07-20T03:00:00-04:00"
					},
					{
						"date": 1469084400000,
						"value": 0,
						"fullDate": "2016-07-21T03:00:00-04:00"
					},
					{
						"date": 1469170800000,
						"value": 0,
						"fullDate": "2016-07-22T03:00:00-04:00"
					},
					{
						"date": 1469257200000,
						"value": 0,
						"fullDate": "2016-07-23T03:00:00-04:00"
					},
					{
						"date": 1469343600000,
						"value": 0,
						"fullDate": "2016-07-24T03:00:00-04:00"
					},
					{
						"date": 1469430000000,
						"value": 0,
						"fullDate": "2016-07-25T03:00:00-04:00"
					},
					{
						"date": 1469516400000,
						"value": 0,
						"fullDate": "2016-07-26T03:00:00-04:00"
					},
					{
						"date": 1469602800000,
						"value": 0,
						"fullDate": "2016-07-27T03:00:00-04:00"
					},
					{
						"date": 1469689200000,
						"value": 0,
						"fullDate": "2016-07-28T03:00:00-04:00"
					},
					{
						"date": 1469775600000,
						"value": 0,
						"fullDate": "2016-07-29T03:00:00-04:00"
					},
					{
						"date": 1469862000000,
						"value": 0,
						"fullDate": "2016-07-30T03:00:00-04:00"
					},
					{
						"date": 1469948400000,
						"value": 0,
						"fullDate": "2016-07-31T03:00:00-04:00"
					},
					{
						"date": 1470034800000,
						"value": 0,
						"fullDate": "2016-08-01T03:00:00-04:00"
					},
					{
						"date": 1470121200000,
						"value": 0,
						"fullDate": "2016-08-02T03:00:00-04:00"
					},
					{
						"date": 1470207600000,
						"value": 0,
						"fullDate": "2016-08-03T03:00:00-04:00"
					},
					{
						"date": 1470294000000,
						"value": 0,
						"fullDate": "2016-08-04T03:00:00-04:00"
					},
					{
						"date": 1470380400000,
						"value": 0,
						"fullDate": "2016-08-05T03:00:00-04:00"
					},
					{
						"date": 1470466800000,
						"value": 0,
						"fullDate": "2016-08-06T03:00:00-04:00"
					},
					{
						"date": 1470553200000,
						"value": 0,
						"fullDate": "2016-08-07T03:00:00-04:00"
					},
					{
						"date": 1470639600000,
						"value": 0,
						"fullDate": "2016-08-08T03:00:00-04:00"
					},
					{
						"date": 1470726000000,
						"value": 0,
						"fullDate": "2016-08-09T03:00:00-04:00"
					},
					{
						"date": 1470812400000,
						"value": 0,
						"fullDate": "2016-08-10T03:00:00-04:00"
					},
					{
						"date": 1470898800000,
						"value": 0,
						"fullDate": "2016-08-11T03:00:00-04:00"
					},
					{
						"date": 1470985200000,
						"value": 0,
						"fullDate": "2016-08-12T03:00:00-04:00"
					},
					{
						"date": 1471071600000,
						"value": 0,
						"fullDate": "2016-08-13T03:00:00-04:00"
					},
					{
						"date": 1471158000000,
						"value": 0,
						"fullDate": "2016-08-14T03:00:00-04:00"
					},
					{
						"date": 1471244400000,
						"value": 0,
						"fullDate": "2016-08-15T03:00:00-04:00"
					},
					{
						"date": 1471330800000,
						"value": 0,
						"fullDate": "2016-08-16T03:00:00-04:00"
					},
					{
						"date": 1471417200000,
						"value": 0,
						"fullDate": "2016-08-17T03:00:00-04:00"
					},
					{
						"date": 1471503600000,
						"value": 0,
						"fullDate": "2016-08-18T03:00:00-04:00"
					},
					{
						"date": 1471590000000,
						"value": 0,
						"fullDate": "2016-08-19T03:00:00-04:00"
					},
					{
						"date": 1471676400000,
						"value": 0,
						"fullDate": "2016-08-20T03:00:00-04:00"
					},
					{
						"date": 1471762800000,
						"value": 0,
						"fullDate": "2016-08-21T03:00:00-04:00"
					},
					{
						"date": 1471849200000,
						"value": 0,
						"fullDate": "2016-08-22T03:00:00-04:00"
					},
					{
						"date": 1471935600000,
						"value": 0,
						"fullDate": "2016-08-23T03:00:00-04:00"
					},
					{
						"date": 1472022000000,
						"value": 0,
						"fullDate": "2016-08-24T03:00:00-04:00"
					},
					{
						"date": 1472108400000,
						"value": 0,
						"fullDate": "2016-08-25T03:00:00-04:00"
					},
					{
						"date": 1472194800000,
						"value": 0,
						"fullDate": "2016-08-26T03:00:00-04:00"
					},
					{
						"date": 1472281200000,
						"value": 0,
						"fullDate": "2016-08-27T03:00:00-04:00"
					},
					{
						"date": 1472367600000,
						"value": 0,
						"fullDate": "2016-08-28T03:00:00-04:00"
					},
					{
						"date": 1472454000000,
						"value": 0,
						"fullDate": "2016-08-29T03:00:00-04:00"
					},
					{
						"date": 1472540400000,
						"value": 0,
						"fullDate": "2016-08-30T03:00:00-04:00"
					},
					{
						"date": 1472626800000,
						"value": 0,
						"fullDate": "2016-08-31T03:00:00-04:00"
					},
					{
						"date": 1472713200000,
						"value": 0,
						"fullDate": "2016-09-01T03:00:00-04:00"
					},
					{
						"date": 1472799600000,
						"value": 0,
						"fullDate": "2016-09-02T03:00:00-04:00"
					},
					{
						"date": 1472886000000,
						"value": 0,
						"fullDate": "2016-09-03T03:00:00-04:00"
					},
					{
						"date": 1472972400000,
						"value": 0,
						"fullDate": "2016-09-04T03:00:00-04:00"
					},
					{
						"date": 1473058800000,
						"value": 0,
						"fullDate": "2016-09-05T03:00:00-04:00"
					},
					{
						"date": 1473145200000,
						"value": 0,
						"fullDate": "2016-09-06T03:00:00-04:00"
					},
					{
						"date": 1473231600000,
						"value": 0,
						"fullDate": "2016-09-07T03:00:00-04:00"
					},
					{
						"date": 1473318000000,
						"value": 0,
						"fullDate": "2016-09-08T03:00:00-04:00"
					},
					{
						"date": 1473404400000,
						"value": 0,
						"fullDate": "2016-09-09T03:00:00-04:00"
					},
					{
						"date": 1473490800000,
						"value": 0,
						"fullDate": "2016-09-10T03:00:00-04:00"
					},
					{
						"date": 1473577200000,
						"value": 0,
						"fullDate": "2016-09-11T03:00:00-04:00"
					},
					{
						"date": 1473663600000,
						"value": 0,
						"fullDate": "2016-09-12T03:00:00-04:00"
					},
					{
						"date": 1473750000000,
						"value": 0,
						"fullDate": "2016-09-13T03:00:00-04:00"
					},
					{
						"date": 1473836400000,
						"value": 0,
						"fullDate": "2016-09-14T03:00:00-04:00"
					},
					{
						"date": 1473922800000,
						"value": 0,
						"fullDate": "2016-09-15T03:00:00-04:00"
					},
					{
						"date": 1474009200000,
						"value": 0,
						"fullDate": "2016-09-16T03:00:00-04:00"
					},
					{
						"date": 1474095600000,
						"value": 0,
						"fullDate": "2016-09-17T03:00:00-04:00"
					},
					{
						"date": 1474182000000,
						"value": 0,
						"fullDate": "2016-09-18T03:00:00-04:00"
					},
					{
						"date": 1474268400000,
						"value": 0,
						"fullDate": "2016-09-19T03:00:00-04:00"
					},
					{
						"date": 1474354800000,
						"value": 0,
						"fullDate": "2016-09-20T03:00:00-04:00"
					},
					{
						"date": 1474441200000,
						"value": 0,
						"fullDate": "2016-09-21T03:00:00-04:00"
					},
					{
						"date": 1474527600000,
						"value": 0,
						"fullDate": "2016-09-22T03:00:00-04:00"
					},
					{
						"date": 1474614000000,
						"value": 0,
						"fullDate": "2016-09-23T03:00:00-04:00"
					},
					{
						"date": 1474700400000,
						"value": 0,
						"fullDate": "2016-09-24T03:00:00-04:00"
					},
					{
						"date": 1474786800000,
						"value": 0,
						"fullDate": "2016-09-25T03:00:00-04:00"
					},
					{
						"date": 1474873200000,
						"value": 0,
						"fullDate": "2016-09-26T03:00:00-04:00"
					},
					{
						"date": 1474959600000,
						"value": 0,
						"fullDate": "2016-09-27T03:00:00-04:00"
					},
					{
						"date": 1475046000000,
						"value": 0,
						"fullDate": "2016-09-28T03:00:00-04:00"
					},
					{
						"date": 1475132400000,
						"value": 0,
						"fullDate": "2016-09-29T03:00:00-04:00"
					},
					{
						"date": 1475218800000,
						"value": 0,
						"fullDate": "2016-09-30T03:00:00-04:00"
					},
					{
						"date": 1475305200000,
						"value": 0,
						"fullDate": "2016-10-01T03:00:00-04:00"
					},
					{
						"date": 1475391600000,
						"value": 0,
						"fullDate": "2016-10-02T03:00:00-04:00"
					},
					{
						"date": 1475478000000,
						"value": 0,
						"fullDate": "2016-10-03T03:00:00-04:00"
					},
					{
						"date": 1475564400000,
						"value": 0,
						"fullDate": "2016-10-04T03:00:00-04:00"
					},
					{
						"date": 1475650800000,
						"value": 0,
						"fullDate": "2016-10-05T03:00:00-04:00"
					},
					{
						"date": 1475737200000,
						"value": 0,
						"fullDate": "2016-10-06T03:00:00-04:00"
					},
					{
						"date": 1475823600000,
						"value": 0,
						"fullDate": "2016-10-07T03:00:00-04:00"
					},
					{
						"date": 1475910000000,
						"value": 0,
						"fullDate": "2016-10-08T03:00:00-04:00"
					},
					{
						"date": 1475996400000,
						"value": 0,
						"fullDate": "2016-10-09T03:00:00-04:00"
					},
					{
						"date": 1476082800000,
						"value": 0,
						"fullDate": "2016-10-10T03:00:00-04:00"
					},
					{
						"date": 1476169200000,
						"value": 0,
						"fullDate": "2016-10-11T03:00:00-04:00"
					},
					{
						"date": 1476255600000,
						"value": 0,
						"fullDate": "2016-10-12T03:00:00-04:00"
					},
					{
						"date": 1476342000000,
						"value": 0,
						"fullDate": "2016-10-13T03:00:00-04:00"
					},
					{
						"date": 1476428400000,
						"value": 0,
						"fullDate": "2016-10-14T03:00:00-04:00"
					},
					{
						"date": 1476514800000,
						"value": 0,
						"fullDate": "2016-10-15T03:00:00-04:00"
					},
					{
						"date": 1476601200000,
						"value": 0,
						"fullDate": "2016-10-16T03:00:00-04:00"
					},
					{
						"date": 1476687600000,
						"value": 0,
						"fullDate": "2016-10-17T03:00:00-04:00"
					},
					{
						"date": 1476774000000,
						"value": 0,
						"fullDate": "2016-10-18T03:00:00-04:00"
					},
					{
						"date": 1476860400000,
						"value": 0,
						"fullDate": "2016-10-19T03:00:00-04:00"
					},
					{
						"date": 1476946800000,
						"value": 0,
						"fullDate": "2016-10-20T03:00:00-04:00"
					},
					{
						"date": 1477033200000,
						"value": 0,
						"fullDate": "2016-10-21T03:00:00-04:00"
					},
					{
						"date": 1477119600000,
						"value": 0,
						"fullDate": "2016-10-22T03:00:00-04:00"
					},
					{
						"date": 1477206000000,
						"value": 0,
						"fullDate": "2016-10-23T03:00:00-04:00"
					},
					{
						"date": 1477292400000,
						"value": 0,
						"fullDate": "2016-10-24T03:00:00-04:00"
					},
					{
						"date": 1477378800000,
						"value": 0,
						"fullDate": "2016-10-25T03:00:00-04:00"
					},
					{
						"date": 1477465200000,
						"value": 0,
						"fullDate": "2016-10-26T03:00:00-04:00"
					},
					{
						"date": 1477551600000,
						"value": 0,
						"fullDate": "2016-10-27T03:00:00-04:00"
					},
					{
						"date": 1477638000000,
						"value": 0,
						"fullDate": "2016-10-28T03:00:00-04:00"
					},
					{
						"date": 1477724400000,
						"value": 0,
						"fullDate": "2016-10-29T03:00:00-04:00"
					},
					{
						"date": 1477810800000,
						"value": 0,
						"fullDate": "2016-10-30T03:00:00-04:00"
					},
					{
						"date": 1477897200000,
						"value": 0,
						"fullDate": "2016-10-31T03:00:00-04:00"
					},
					{
						"date": 1477983600000,
						"value": 0,
						"fullDate": "2016-11-01T03:00:00-04:00"
					},
					{
						"date": 1478070000000,
						"value": 0,
						"fullDate": "2016-11-02T03:00:00-04:00"
					},
					{
						"date": 1478156400000,
						"value": 0,
						"fullDate": "2016-11-03T03:00:00-04:00"
					},
					{
						"date": 1478242800000,
						"value": 0,
						"fullDate": "2016-11-04T03:00:00-04:00"
					},
					{
						"date": 1478329200000,
						"value": 0,
						"fullDate": "2016-11-05T03:00:00-04:00"
					},
					{
						"date": 1478415600000,
						"value": 0,
						"fullDate": "2016-11-06T02:00:00-05:00"
					},
					{
						"date": 1478415600000,
						"value": 0,
						"fullDate": "2016-11-06T02:00:00-05:00"
					},
					{
						"date": 1478505600000,
						"value": 0,
						"fullDate": "2016-11-07T03:00:00-05:00"
					},
					{
						"date": 1478592000000,
						"value": 0,
						"fullDate": "2016-11-08T03:00:00-05:00"
					},
					{
						"date": 1478678400000,
						"value": 0,
						"fullDate": "2016-11-09T03:00:00-05:00"
					},
					{
						"date": 1478764800000,
						"value": 0,
						"fullDate": "2016-11-10T03:00:00-05:00"
					},
					{
						"date": 1478851200000,
						"value": 0,
						"fullDate": "2016-11-11T03:00:00-05:00"
					},
					{
						"date": 1478937600000,
						"value": 0,
						"fullDate": "2016-11-12T03:00:00-05:00"
					},
					{
						"date": 1479024000000,
						"value": 0,
						"fullDate": "2016-11-13T03:00:00-05:00"
					},
					{
						"date": 1479110400000,
						"value": 0,
						"fullDate": "2016-11-14T03:00:00-05:00"
					},
					{
						"date": 1479196800000,
						"value": 0,
						"fullDate": "2016-11-15T03:00:00-05:00"
					},
					{
						"date": 1479283200000,
						"value": 0,
						"fullDate": "2016-11-16T03:00:00-05:00"
					},
					{
						"date": 1479369600000,
						"value": 0,
						"fullDate": "2016-11-17T03:00:00-05:00"
					},
					{
						"date": 1479456000000,
						"value": 0,
						"fullDate": "2016-11-18T03:00:00-05:00"
					},
					{
						"date": 1479542400000,
						"value": 0,
						"fullDate": "2016-11-19T03:00:00-05:00"
					},
					{
						"date": 1479628800000,
						"value": 0,
						"fullDate": "2016-11-20T03:00:00-05:00"
					},
					{
						"date": 1479715200000,
						"value": 0,
						"fullDate": "2016-11-21T03:00:00-05:00"
					},
					{
						"date": 1479801600000,
						"value": 0,
						"fullDate": "2016-11-22T03:00:00-05:00"
					},
					{
						"date": 1479888000000,
						"value": 0,
						"fullDate": "2016-11-23T03:00:00-05:00"
					},
					{
						"date": 1479974400000,
						"value": 0,
						"fullDate": "2016-11-24T03:00:00-05:00"
					},
					{
						"date": 1480060800000,
						"value": 0,
						"fullDate": "2016-11-25T03:00:00-05:00"
					},
					{
						"date": 1480147200000,
						"value": 0,
						"fullDate": "2016-11-26T03:00:00-05:00"
					},
					{
						"date": 1480233600000,
						"value": 0,
						"fullDate": "2016-11-27T03:00:00-05:00"
					},
					{
						"date": 1480320000000,
						"value": 0,
						"fullDate": "2016-11-28T03:00:00-05:00"
					},
					{
						"date": 1480406400000,
						"value": 0,
						"fullDate": "2016-11-29T03:00:00-05:00"
					},
					{
						"date": 1480492800000,
						"value": 0,
						"fullDate": "2016-11-30T03:00:00-05:00"
					},
					{
						"date": 1480579200000,
						"value": 0,
						"fullDate": "2016-12-01T03:00:00-05:00"
					},
					{
						"date": 1480665600000,
						"value": 0,
						"fullDate": "2016-12-02T03:00:00-05:00"
					},
					{
						"date": 1480752000000,
						"value": 0,
						"fullDate": "2016-12-03T03:00:00-05:00"
					},
					{
						"date": 1480838400000,
						"value": 0,
						"fullDate": "2016-12-04T03:00:00-05:00"
					},
					{
						"date": 1480924800000,
						"value": 0,
						"fullDate": "2016-12-05T03:00:00-05:00"
					},
					{
						"date": 1481011200000,
						"value": 0,
						"fullDate": "2016-12-06T03:00:00-05:00"
					},
					{
						"date": 1481097600000,
						"value": 0,
						"fullDate": "2016-12-07T03:00:00-05:00"
					},
					{
						"date": 1481184000000,
						"value": 0,
						"fullDate": "2016-12-08T03:00:00-05:00"
					},
					{
						"date": 1481270400000,
						"value": 0,
						"fullDate": "2016-12-09T03:00:00-05:00"
					},
					{
						"date": 1481356800000,
						"value": 0,
						"fullDate": "2016-12-10T03:00:00-05:00"
					},
					{
						"date": 1481443200000,
						"value": 0,
						"fullDate": "2016-12-11T03:00:00-05:00"
					},
					{
						"date": 1481529600000,
						"value": 0,
						"fullDate": "2016-12-12T03:00:00-05:00"
					},
					{
						"date": 1481616000000,
						"value": 0,
						"fullDate": "2016-12-13T03:00:00-05:00"
					},
					{
						"date": 1481702400000,
						"value": 0,
						"fullDate": "2016-12-14T03:00:00-05:00"
					},
					{
						"date": 1481788800000,
						"value": 0,
						"fullDate": "2016-12-15T03:00:00-05:00"
					},
					{
						"date": 1481875200000,
						"value": 0,
						"fullDate": "2016-12-16T03:00:00-05:00"
					},
					{
						"date": 1481961600000,
						"value": 0,
						"fullDate": "2016-12-17T03:00:00-05:00"
					},
					{
						"date": 1482048000000,
						"value": 0,
						"fullDate": "2016-12-18T03:00:00-05:00"
					},
					{
						"date": 1482134400000,
						"value": 0,
						"fullDate": "2016-12-19T03:00:00-05:00"
					},
					{
						"date": 1482220800000,
						"value": 0,
						"fullDate": "2016-12-20T03:00:00-05:00"
					},
					{
						"date": 1482307200000,
						"value": 0,
						"fullDate": "2016-12-21T03:00:00-05:00"
					},
					{
						"date": 1482393600000,
						"value": 0,
						"fullDate": "2016-12-22T03:00:00-05:00"
					},
					{
						"date": 1482480000000,
						"value": 0,
						"fullDate": "2016-12-23T03:00:00-05:00"
					},
					{
						"date": 1482566400000,
						"value": 0,
						"fullDate": "2016-12-24T03:00:00-05:00"
					},
					{
						"date": 1482652800000,
						"value": 0,
						"fullDate": "2016-12-25T03:00:00-05:00"
					},
					{
						"date": 1482739200000,
						"value": 0,
						"fullDate": "2016-12-26T03:00:00-05:00"
					},
					{
						"date": 1482825600000,
						"value": 0,
						"fullDate": "2016-12-27T03:00:00-05:00"
					},
					{
						"date": 1482912000000,
						"value": 0,
						"fullDate": "2016-12-28T03:00:00-05:00"
					},
					{
						"date": 1482998400000,
						"value": 0,
						"fullDate": "2016-12-29T03:00:00-05:00"
					},
					{
						"date": 1483084800000,
						"value": 0,
						"fullDate": "2016-12-30T03:00:00-05:00"
					},
					{
						"date": 1483171200000,
						"value": 0,
						"fullDate": "2016-12-31T03:00:00-05:00"
					},
					{
						"date": 1483257600000,
						"value": 0,
						"fullDate": "2017-01-01T03:00:00-05:00"
					},
					{
						"date": 1483344000000,
						"value": 0,
						"fullDate": "2017-01-02T03:00:00-05:00"
					},
					{
						"date": 1483430400000,
						"value": 0,
						"fullDate": "2017-01-03T03:00:00-05:00"
					},
					{
						"date": 1483516800000,
						"value": 0,
						"fullDate": "2017-01-04T03:00:00-05:00"
					},
					{
						"date": 1483603200000,
						"value": 0,
						"fullDate": "2017-01-05T03:00:00-05:00"
					},
					{
						"date": 1483689600000,
						"value": 0,
						"fullDate": "2017-01-06T03:00:00-05:00"
					},
					{
						"date": 1483776000000,
						"value": 0,
						"fullDate": "2017-01-07T03:00:00-05:00"
					},
					{
						"date": 1483862400000,
						"value": 0,
						"fullDate": "2017-01-08T03:00:00-05:00"
					},
					{
						"date": 1483948800000,
						"value": 0,
						"fullDate": "2017-01-09T03:00:00-05:00"
					},
					{
						"date": 1484035200000,
						"value": 0,
						"fullDate": "2017-01-10T03:00:00-05:00"
					},
					{
						"date": 1484121600000,
						"value": 0,
						"fullDate": "2017-01-11T03:00:00-05:00"
					},
					{
						"date": 1484208000000,
						"value": 0,
						"fullDate": "2017-01-12T03:00:00-05:00"
					},
					{
						"date": 1484294400000,
						"value": 0,
						"fullDate": "2017-01-13T03:00:00-05:00"
					},
					{
						"date": 1484380800000,
						"value": 0,
						"fullDate": "2017-01-14T03:00:00-05:00"
					},
					{
						"date": 1484467200000,
						"value": 0,
						"fullDate": "2017-01-15T03:00:00-05:00"
					},
					{
						"date": 1484553600000,
						"value": 0,
						"fullDate": "2017-01-16T03:00:00-05:00"
					},
					{
						"date": 1484640000000,
						"value": 0,
						"fullDate": "2017-01-17T03:00:00-05:00"
					},
					{
						"date": 1484726400000,
						"value": 0,
						"fullDate": "2017-01-18T03:00:00-05:00"
					},
					{
						"date": 1484812800000,
						"value": 0,
						"fullDate": "2017-01-19T03:00:00-05:00"
					},
					{
						"date": 1484899200000,
						"value": 0,
						"fullDate": "2017-01-20T03:00:00-05:00"
					},
					{
						"date": 1484985600000,
						"value": 0,
						"fullDate": "2017-01-21T03:00:00-05:00"
					},
					{
						"date": 1485072000000,
						"value": 0,
						"fullDate": "2017-01-22T03:00:00-05:00"
					},
					{
						"date": 1485158400000,
						"value": 0,
						"fullDate": "2017-01-23T03:00:00-05:00"
					}
				]
			}
		],
		"dataByDate": [
			{
				"date": "2015-01-23T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-01-24T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-01-25T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-01-26T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-01-27T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-01-28T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-01-29T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-01-30T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-01-31T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-01T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-02T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-03T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-04T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-05T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-06T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-07T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-08T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-09T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-10T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-11T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-12T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-13T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-14T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-15T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-16T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-17T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-18T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-19T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-20T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-21T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-22T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-23T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-24T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-25T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-26T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-27T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-28T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-01T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-02T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-03T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-04T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-05T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-06T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-07T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-09T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-10T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-11T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-12T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-13T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-14T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-15T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-16T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-17T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-18T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-19T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-20T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-21T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-22T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-23T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-24T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-25T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-26T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-27T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-28T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-29T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-30T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-31T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-01T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-02T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-03T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-04T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-05T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-06T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-07T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-08T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-09T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-10T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-11T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-12T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-13T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-14T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-15T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-16T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-17T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-18T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-19T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-20T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-21T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-22T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-23T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-24T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-25T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-26T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-27T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-28T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-29T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-30T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-01T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-02T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-03T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-04T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-05T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-06T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-07T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-08T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-09T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-10T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-11T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-12T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-13T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-14T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-15T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-16T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-17T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-18T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-19T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-20T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-21T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-22T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-23T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-24T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-25T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-26T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-27T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-28T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-29T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-30T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-31T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-01T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-02T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-03T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-04T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-05T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-06T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-07T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-08T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-09T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-10T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-11T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-12T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-13T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-14T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-15T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-16T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-17T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-18T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-19T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-20T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-21T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-22T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-23T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-24T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-25T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-26T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-27T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-28T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-29T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-30T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-01T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-02T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-03T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-04T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-05T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-06T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-07T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-08T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-09T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-10T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-11T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-12T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-13T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-14T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-15T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-16T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-17T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-18T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-19T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-20T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-21T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-22T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-23T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-24T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-25T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-26T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-27T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-28T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-29T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-30T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-31T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-01T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-02T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-03T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-04T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-05T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-06T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-07T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-08T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-09T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-10T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-11T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-12T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-13T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-14T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-15T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-16T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-17T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-18T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-19T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-20T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-21T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-22T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-23T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-24T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-25T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-26T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-27T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-28T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-29T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-30T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-31T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-01T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-02T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-03T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-04T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-05T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-06T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-07T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-08T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-09T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-10T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-11T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-12T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-13T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-14T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-15T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-16T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-17T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-18T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-19T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-20T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-21T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-22T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-23T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-24T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-25T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-26T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-27T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-28T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-29T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-30T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-01T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-02T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-03T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-04T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-05T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-06T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-07T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-08T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-09T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-10T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-11T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-12T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-13T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-14T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-15T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-16T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-17T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-18T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-19T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-20T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-21T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-22T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-23T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-24T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-25T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-26T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-27T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-28T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-29T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-30T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-31T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-01T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-01T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-02T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-03T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-04T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-05T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-06T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-07T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-08T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-09T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-10T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-11T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-12T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-13T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-14T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-15T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-16T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-17T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-18T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-19T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-20T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-21T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-22T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-23T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-24T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-25T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-26T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-27T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-28T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-29T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-30T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-01T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-02T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-03T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-04T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-05T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-06T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-07T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-08T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-09T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-10T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-11T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-12T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-13T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-14T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-15T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-16T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-17T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-18T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-19T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-20T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-21T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-22T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-23T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-24T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-25T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-26T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-27T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-28T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-29T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-30T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-31T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-01T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-02T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-03T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-04T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-05T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-06T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-07T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-08T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-09T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-10T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-11T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-12T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-13T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-14T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-15T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-16T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-17T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-18T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-19T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-20T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-21T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-22T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-23T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-24T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-25T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-26T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-27T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-28T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-29T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-30T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-31T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-01T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-02T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-03T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-04T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-05T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-06T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-07T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-08T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-09T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-10T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-11T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-12T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-13T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-15T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 10,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-15T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-16T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-17T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-19T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 1,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-19T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-20T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-21T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-23T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 4,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-23T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-24T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-25T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-26T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-27T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-28T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-29T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-01T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-02T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-04T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 1,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-05T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 1,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-05T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-06T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-07T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-08T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-09T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-10T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-11T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-12T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-14T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-15T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-16T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-17T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-18T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-19T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 1,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-20T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-21T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-22T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-23T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-24T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-25T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-26T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-27T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-28T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-29T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 4,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-30T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-31T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-01T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 2,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-02T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-03T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-04T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-05T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-06T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-07T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-08T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 2,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-09T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-10T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 1,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-11T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-12T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 1,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-13T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-14T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 1,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-15T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-16T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-17T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-18T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-19T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-20T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-21T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-22T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-23T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-24T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-25T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-26T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-27T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-28T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-29T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-30T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-01T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-02T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-03T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-04T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-05T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-06T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-07T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-08T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-09T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-10T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-11T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-12T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-13T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-14T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-15T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-16T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-17T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-18T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-19T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-20T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-21T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-22T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-23T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-24T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-25T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-26T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-27T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-28T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-29T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-30T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-31T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-01T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-02T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-03T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-04T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-05T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-06T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-07T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-08T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-09T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-10T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-11T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-12T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-13T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-14T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-15T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-16T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-17T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-18T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-19T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-20T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-21T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-22T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-23T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-24T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-25T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-26T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-27T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-28T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-29T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-30T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-01T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-02T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-03T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-04T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-05T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-06T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-07T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-08T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-09T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-10T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-11T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-12T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-13T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-14T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-15T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-16T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-17T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-18T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-19T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-20T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-21T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-22T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-23T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-24T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-25T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-26T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-27T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-28T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-29T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-30T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-31T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-01T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-02T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-03T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-04T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-05T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-06T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-07T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-08T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-09T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-10T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-11T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-12T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-13T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-14T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-15T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-16T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-17T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-18T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-19T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-20T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-21T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-22T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-23T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-24T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-25T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-26T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-27T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-28T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-29T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-30T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-31T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-01T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-02T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-03T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-04T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-05T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-06T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-07T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-08T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-09T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-10T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-11T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-12T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-13T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-14T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-15T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-16T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-17T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-18T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-19T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-20T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-21T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-22T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-23T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-24T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-25T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-26T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-27T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-28T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-29T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-30T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-01T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-02T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-03T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-04T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-05T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-06T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-07T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-08T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-09T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-10T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-11T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-12T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-13T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-14T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-15T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-16T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-17T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-18T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-19T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-20T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-21T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-22T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-23T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-24T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-25T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-26T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-27T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-28T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-29T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-30T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-31T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-01T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-02T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-03T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-04T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-05T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-06T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-06T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-07T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-08T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-09T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-10T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-11T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-12T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-13T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-14T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-15T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-16T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-17T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-18T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-19T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-20T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-21T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-22T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-23T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-24T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-25T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-26T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-27T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-28T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-29T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-30T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-01T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-02T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-03T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-04T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-05T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-06T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-07T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-08T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-09T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-10T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-11T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-12T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-13T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-14T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-15T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-16T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-17T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-18T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-19T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-20T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-21T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-22T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-23T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-24T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-25T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-26T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-27T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-28T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-29T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-30T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-31T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-01T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-02T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-03T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-04T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-05T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-06T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-07T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-08T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-09T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-10T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-11T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-12T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-13T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-14T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-15T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-16T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-17T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-18T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-19T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-20T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-21T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-22T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-23T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			}
		]
	};

/***/ }),
/* 65 */
/***/ (function(module, exports) {

	module.exports = {
		"dataByTopic": [
			{
				"topic": -1,
				"topicName": "Quantity",
				"dates": [
					{
						"date": "16-Jan-17",
						"value": 0,
						"fullDate": "2017-01-16T16:00:00-08:00"
					},
					{
						"date": "16-Jan-17",
						"value": 0,
						"fullDate": "2017-01-16T17:00:00-08:00"
					},
					{
						"date": "16-Jan-17",
						"value": 0,
						"fullDate": "2017-01-16T18:00:00-08:00"
					},
					{
						"date": "16-Jan-17",
						"value": 0,
						"fullDate": "2017-01-16T19:00:00-08:00"
					},
					{
						"date": "16-Jan-17",
						"value": 0,
						"fullDate": "2017-01-16T20:00:00-08:00"
					},
					{
						"date": "16-Jan-17",
						"value": 0,
						"fullDate": "2017-01-16T21:00:00-08:00"
					},
					{
						"date": "16-Jan-17",
						"value": 0,
						"fullDate": "2017-01-16T22:00:00-08:00"
					},
					{
						"date": "16-Jan-17",
						"value": 0,
						"fullDate": "2017-01-16T23:00:00-08:00"
					},
					{
						"date": "17-Jan-17",
						"value": 0,
						"fullDate": "2017-01-17T00:00:00-08:00"
					},
					{
						"date": "17-Jan-17",
						"value": 0,
						"fullDate": "2017-01-17T01:00:00-08:00"
					},
					{
						"date": "17-Jan-17",
						"value": 0,
						"fullDate": "2017-01-17T02:00:00-08:00"
					},
					{
						"date": "17-Jan-17",
						"value": 0,
						"fullDate": "2017-01-17T03:00:00-08:00"
					},
					{
						"date": "17-Jan-17",
						"value": 0,
						"fullDate": "2017-01-17T04:00:00-08:00"
					},
					{
						"date": "17-Jan-17",
						"value": 0,
						"fullDate": "2017-01-17T05:00:00-08:00"
					},
					{
						"date": "17-Jan-17",
						"value": 0,
						"fullDate": "2017-01-17T06:00:00-08:00"
					},
					{
						"date": "17-Jan-17",
						"value": 0,
						"fullDate": "2017-01-17T07:00:00-08:00"
					},
					{
						"date": "17-Jan-17",
						"value": 0,
						"fullDate": "2017-01-17T09:00:00-08:00"
					},
					{
						"date": "17-Jan-17",
						"value": 0,
						"fullDate": "2017-01-17T10:00:00-08:00"
					},
					{
						"date": "17-Jan-17",
						"value": 0,
						"fullDate": "2017-01-17T11:00:00-08:00"
					},
					{
						"date": "17-Jan-17",
						"value": 0,
						"fullDate": "2017-01-17T12:00:00-08:00"
					},
					{
						"date": "17-Jan-17",
						"value": 0,
						"fullDate": "2017-01-17T13:00:00-08:00"
					},
					{
						"date": "17-Jan-17",
						"value": 0,
						"fullDate": "2017-01-17T14:00:00-08:00"
					},
					{
						"date": "17-Jan-17",
						"value": 0,
						"fullDate": "2017-01-17T15:00:00-08:00"
					},
					{
						"date": "17-Jan-17",
						"value": 1,
						"fullDate": "2017-01-17T16:00:00-08:00"
					}
				]
			}
		],
		"dataByDate": [
			{
				"date": "2017-01-16T16:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-16T17:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-16T18:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-16T19:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-16T20:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-16T21:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-16T22:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-16T23:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-17T00:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-17T01:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-17T02:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-17T03:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-17T04:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-17T05:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-17T06:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-17T07:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-17T09:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-17T10:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-17T11:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-17T12:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-17T13:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-17T14:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-17T15:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-17T16:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 1,
						"topicName": "Quantity"
					}
				]
			}
		]
	};

/***/ }),
/* 66 */
/***/ (function(module, exports) {

	module.exports = {
		"dataByTopic": [
			{
				"topic": -1,
				"dates": [
					{
						"date": "30-Dec-15",
						"value": 0,
						"fullDate": "2015-12-30T00:00:00-08:00"
					},
					{
						"date": "31-Dec-15",
						"value": 2,
						"fullDate": "2015-12-31T00:00:00-08:00"
					},
					{
						"date": "1-Jan-16",
						"value": 0,
						"fullDate": "2016-01-01T00:00:00-08:00"
					},
					{
						"date": "2-Jan-16",
						"value": 0,
						"fullDate": "2016-01-02T00:00:00-08:00"
					},
					{
						"date": "3-Jan-16",
						"value": 0,
						"fullDate": "2016-01-03T00:00:00-08:00"
					},
					{
						"date": "4-Jan-16",
						"value": 0,
						"fullDate": "2016-01-04T00:00:00-08:00"
					}
				],
				"topicName": "Sales"
			}
		],
		"dataByDate": [
			{
				"date": "2015-12-30T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Sales"
					}
				]
			},
			{
				"date": "2015-12-31T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 2,
						"topicName": "Sales"
					}
				]
			},
			{
				"date": "2016-01-01T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Sales"
					}
				]
			},
			{
				"date": "2016-01-02T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Sales"
					}
				]
			},
			{
				"date": "2016-01-03T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Sales"
					}
				]
			},
			{
				"date": "2016-01-04T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Sales"
					}
				]
			}
		]
	};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var d3Selection = __webpack_require__(4),
	    PubSub = __webpack_require__(5),
	    sparklineChart = __webpack_require__(68),
	    sparklineDataBuilder = __webpack_require__(69);
	
	function createSparklineChart() {
	    var sparkline = sparklineChart(),
	        testDataSet = new sparklineDataBuilder.SparklineDataBuilder(),
	        containerWidth = d3Selection.select('.js-sparkline-chart-container').node().getBoundingClientRect().width,
	        container = d3Selection.select('.js-sparkline-chart-container'),
	        dataset;
	
	    d3Selection.select('#button').on('click', function () {
	        sparkline.exportChart('sparkline.png', 'Britechart Sparkline Chart');
	    });
	
	    dataset = testDataSet.with1Source().build();
	
	    // Sparkline Chart Setup and start
	    sparkline.dateLabel('dateUTC').isAnimated(true).duration(1000).height(containerWidth / 4).width(containerWidth);
	
	    container.datum(dataset.data).call(sparkline);
	}
	
	// Show charts if container available
	if (d3Selection.select('.js-sparkline-chart-container').node()) {
	    createSparklineChart();
	
	    var redrawCharts = function redrawCharts() {
	        d3Selection.selectAll('.sparkline').remove();
	
	        createSparklineChart();
	    };
	
	    // Redraw charts on window resize
	    PubSub.subscribe('resize', redrawCharts);
	}

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    'use strict';
	
	    var d3Array = __webpack_require__(9);
	    var d3Ease = __webpack_require__(13);
	    var d3Scale = __webpack_require__(14);
	    var d3Shape = __webpack_require__(20);
	    var d3Selection = __webpack_require__(4);
	    var d3Transition = __webpack_require__(22);
	
	    var _require = __webpack_require__(25),
	        exportChart = _require.exportChart;
	
	    var colorHelper = __webpack_require__(7);
	
	    /**
	     * @typedef SparklineChartData
	     * @type {Object[]}
	     * @property {Number} value        Value of the group (required)
	     * @property {String} name         Name of the group (required)
	     *
	     * @example
	     * [
	     *     {
	     *         value: 1,
	     *         date: '2011-01-06T00:00:00Z'
	     *     },
	     *     {
	     *         value: 2,
	     *         date: '2011-01-07T00:00:00Z'
	     *     }
	     */
	
	    /**
	     * Sparkline Chart reusable API module that allows us
	     * rendering a sparkline configurable chart.
	     *
	     * @module Sparkline
	     * @tutorial sparkline
	     * @requires d3
	     *
	     * @example
	     * var sparkLineChart = sparkline();
	     *
	     * sparkLineChart
	     *     .width(200)
	     *     .height(100);
	     *
	     * d3Selection.select('.css-selector')
	     *     .datum(dataset)
	     *     .call(sparkLineChart);
	     *
	     */
	    return function module() {
	
	        var margin = {
	            left: 5,
	            right: 5,
	            top: 5,
	            bottom: 5
	        },
	            width = 100,
	            height = 30,
	            xScale = void 0,
	            yScale = void 0,
	            areaGradient = ['#F5FDFF', '#F6FEFC'],
	            lineGradient = colorHelper.colorGradients.greenBlueGradient,
	            svg = void 0,
	            chartWidth = void 0,
	            chartHeight = void 0,
	            data = void 0,
	            hasArea = true,
	            isAnimated = false,
	            clipDuration = 3000,
	            ease = d3Ease.easeQuadInOut,
	            line = void 0,
	            markerSize = 1.5,
	            valueLabel = 'value',
	            dateLabel = 'date',
	
	
	        // getters
	        getDate = function getDate(_ref) {
	            var date = _ref.date;
	            return date;
	        },
	            getValue = function getValue(_ref2) {
	            var value = _ref2.value;
	            return value;
	        };
	
	        /**
	         * This function creates the graph using the selection and data provided
	         *
	         * @param {D3Selection} _selection A d3 selection that represents
	         * the container(s) where the chart(s) will be rendered
	         * @param {SparklineChartData} _data The data to attach and generate the chart
	         */
	        function exports(_selection) {
	            _selection.each(function (_data) {
	                chartWidth = width - margin.left - margin.right;
	                chartHeight = height - margin.top - margin.bottom;
	                data = cleanData(_data);
	
	                buildScales();
	                buildSVG(this);
	                createGradients();
	                createMaskingClip();
	                drawLine();
	                drawArea();
	                drawEndMarker();
	            });
	        }
	
	        /**
	         * Builds containers for the chart, the axis and a wrapper for all of them
	         * NOTE: The order of drawing of this group elements is really important,
	         * as everything else will be drawn on top of them
	         * @private
	         */
	        function buildContainerGroups() {
	            var container = svg.append('g').classed('container-group', true).attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
	
	            container.append('g').classed('chart-group', true);
	            container.append('g').classed('metadata-group', true);
	        }
	
	        /**
	         * Creates the x, y and color scales of the chart
	         * @private
	         */
	        function buildScales() {
	            xScale = d3Scale.scaleLinear().domain(d3Array.extent(data, getDate)).range([0, chartWidth]);
	
	            yScale = d3Scale.scaleLinear().domain(d3Array.extent(data, getValue)).range([chartHeight, 0]);
	        }
	
	        /**
	         * Builds the SVG element that will contain the chart
	         * @param  {HTMLElement} container DOM element that will work as the container of the graph
	         * @private
	         */
	        function buildSVG(container) {
	            if (!svg) {
	                svg = d3Selection.select(container).append('svg').classed('britechart sparkline', true);
	
	                buildContainerGroups();
	            }
	
	            svg.attr('width', width).attr('height', height);
	        }
	
	        /**
	         * Cleaning data adding the proper format
	         * @param  {array} data Data
	         * @private
	         */
	        function cleanData(data) {
	            return data.map(function (d) {
	                d.date = new Date(d[dateLabel]);
	                d.value = +d[valueLabel];
	
	                return d;
	            });
	        }
	
	        /**
	         * Creates the gradient on the area below the line
	         * @return {void}
	         */
	        function createGradients() {
	            var metadataGroup = svg.select('.metadata-group');
	
	            metadataGroup.append('linearGradient').attr('id', 'sparkline-area-gradient').attr('gradientUnits', 'userSpaceOnUse').attr('x1', 0).attr('x2', xScale(data[data.length - 1].date)).attr('y1', 0).attr('y2', 0).selectAll('stop').data([{ offset: '0%', color: areaGradient[0] }, { offset: '100%', color: areaGradient[1] }]).enter().append('stop').attr('offset', function (_ref3) {
	                var offset = _ref3.offset;
	                return offset;
	            }).attr('stop-color', function (_ref4) {
	                var color = _ref4.color;
	                return color;
	            });
	
	            metadataGroup.append('linearGradient').attr('id', 'sparkline-line-gradient').attr('gradientUnits', 'userSpaceOnUse').attr('x1', 0).attr('x2', xScale(data[data.length - 1].date)).attr('y1', 0).attr('y2', 0).selectAll('stop').data([{ offset: '0%', color: lineGradient[0] }, { offset: '100%', color: lineGradient[1] }]).enter().append('stop').attr('offset', function (_ref5) {
	                var offset = _ref5.offset;
	                return offset;
	            }).attr('stop-color', function (_ref6) {
	                var color = _ref6.color;
	                return color;
	            });
	        }
	
	        /**
	         * Creates a masking clip that would help us fake an animation if the
	         * proper flag is true
	         *
	         * @return {void}
	         */
	        function createMaskingClip() {
	            if (isAnimated) {
	                svg.select('.metadata-group').append('clipPath').attr('id', 'maskingClip').append('rect').attr('width', 0).attr('height', height);
	
	                d3Selection.select('#maskingClip rect').transition().ease(ease).duration(clipDuration).attr('width', width);
	            }
	        }
	
	        /**
	         * Draws the area that will be placed below the line
	         * @private
	         */
	        function drawArea() {
	            var area = d3Shape.area().x(function (_ref7) {
	                var date = _ref7.date;
	                return xScale(date);
	            }).y0(function () {
	                return yScale(0);
	            }).y1(function (_ref8) {
	                var value = _ref8.value;
	                return yScale(value);
	            }).curve(d3Shape.curveBasis);
	
	            svg.select('.chart-group').append('path').datum(data).attr('class', 'sparkline-area').attr('d', area).attr('clip-path', 'url(#maskingClip)');
	        }
	
	        /**
	         * Draws the line element within the chart group
	         * @private
	         */
	        function drawLine() {
	            line = d3Shape.line().curve(d3Shape.curveBasis).x(function (_ref9) {
	                var date = _ref9.date;
	                return xScale(date);
	            }).y(function (_ref10) {
	                var value = _ref10.value;
	                return yScale(value);
	            });
	
	            svg.select('.chart-group').append('path').datum(data).attr('class', 'line').attr('d', line).attr('clip-path', 'url(#maskingClip)');
	        }
	
	        /**
	         * Draws a marker at the end of the sparkline
	         */
	        function drawEndMarker() {
	            svg.selectAll('.chart-group').append('circle').attr('class', 'sparkline-circle').attr('cx', xScale(data[data.length - 1].date)).attr('cy', yScale(data[data.length - 1].value)).attr('r', markerSize);
	        }
	
	        // Accessors
	        /**
	         * Gets or Sets the dateLabel of the chart
	         * @param  {Number} _x Desired dateLabel for the graph
	         * @return { dateLabel | module} Current dateLabel or Chart module to chain calls
	         * @public
	         */
	        exports.dateLabel = function (_x) {
	            if (!arguments.length) {
	                return dateLabel;
	            }
	            dateLabel = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the duration of the animation
	         * @param  {Number} _x Desired animation duration for the graph
	         * @return { dateLabel | module} Current animation duration or Chart module to chain calls
	         * @public
	         */
	        exports.duration = function (_x) {
	            if (!arguments.length) {
	                return clipDuration;
	            }
	            clipDuration = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the areaGradient of the chart
	         * @param  {String[]} _x Desired areaGradient for the graph
	         * @return { areaGradient | module} Current areaGradient or Chart module to chain calls
	         * @public
	         */
	        exports.areaGradient = function (_x) {
	            if (!arguments.length) {
	                return areaGradient;
	            }
	            areaGradient = _x;
	            return this;
	        };
	
	        /**
	         * Gets or Sets the lineGradient of the chart
	         * @param  {String[]} _x Desired lineGradient for the graph
	         * @return { lineGradient | module} Current lineGradient or Chart module to chain calls
	         * @public
	         */
	        exports.lineGradient = function (_x) {
	            if (!arguments.length) {
	                return lineGradient;
	            }
	            lineGradient = _x;
	            return this;
	        };
	
	        /**
	         * Gets or Sets the height of the chart
	         * @param  {Number} _x Desired width for the graph
	         * @return { height | module} Current height or Chart module to chain calls
	         * @public
	         */
	        exports.height = function (_x) {
	            if (!arguments.length) {
	                return height;
	            }
	            height = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the isAnimated property of the chart, making it to animate when render.
	         * By default this is 'false'
	         *
	         * @param  {Boolean} _x Desired animation flag
	         * @return { isAnimated | module} Current isAnimated flag or Chart module
	         * @public
	         */
	        exports.isAnimated = function (_x) {
	            if (!arguments.length) {
	                return isAnimated;
	            }
	            isAnimated = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the margin of the chart
	         * @param  {Object} _x Margin object to get/set
	         * @return { margin | module} Current margin or Chart module to chain calls
	         * @public
	         */
	        exports.margin = function (_x) {
	            if (!arguments.length) {
	                return margin;
	            }
	            margin = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the width of the chart
	         * @param  {Number} _x Desired width for the graph
	         * @return { width | module} Current width or Chart module to chain calls
	         * @public
	         */
	        exports.width = function (_x) {
	            if (!arguments.length) {
	                return width;
	            }
	            width = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the valueLabel of the chart
	         * @param  {Number} _x Desired valueLabel for the graph
	         * @return { valueLabel | module} Current valueLabel or Chart module to chain calls
	         * @public
	         */
	        exports.valueLabel = function (_x) {
	            if (!arguments.length) {
	                return valueLabel;
	            }
	            valueLabel = _x;
	
	            return this;
	        };
	
	        /**
	         * Chart exported to png and a download action is fired
	         * @public
	         */
	        exports.exportChart = function (filename, title) {
	            exportChart.call(exports, svg, filename, title);
	        };
	
	        return exports;
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    'use strict';
	
	    var _ = __webpack_require__(3),
	        jsonOneSource = __webpack_require__(70);
	
	    function SparklineDataBuilder(config) {
	        this.Klass = SparklineDataBuilder;
	
	        this.config = _.defaults({}, config);
	
	        this.with1Source = function () {
	            var attributes = _.extend({}, this.config, jsonOneSource);
	
	            return new this.Klass(attributes);
	        };
	
	        this.build = function () {
	            return this.config;
	        };
	    }
	
	    return {
	        SparklineDataBuilder: SparklineDataBuilder
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 70 */
/***/ (function(module, exports) {

	module.exports = {
		"data": [
			{
				"name": "Direct",
				"value": 2,
				"dateUTC": "2011-01-05T00:00:00Z"
			},
			{
				"name": "Direct",
				"value": 5,
				"dateUTC": "2011-01-06T00:00:00Z"
			},
			{
				"name": "Direct",
				"value": 16,
				"dateUTC": "2011-01-07T00:00:00Z"
			},
			{
				"name": "Direct",
				"value": 23,
				"dateUTC": "2011-01-08T00:00:00Z"
			},
			{
				"name": "Direct",
				"value": 18,
				"dateUTC": "2011-01-09T00:00:00Z"
			},
			{
				"name": "Direct",
				"value": 25,
				"dateUTC": "2011-01-10T00:00:00Z"
			},
			{
				"name": "Direct",
				"value": 28,
				"dateUTC": "2011-01-11T00:00:00Z"
			},
			{
				"name": "Direct",
				"value": 2,
				"dateUTC": "2011-01-12T00:00:00Z"
			}
		]
	};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var d3Selection = __webpack_require__(4),
	    PubSub = __webpack_require__(5),
	    step = __webpack_require__(72),
	    miniTooltip = __webpack_require__(44),
	    dataBuilder = __webpack_require__(73);
	
	function createStepChart() {
	    var stepChart = step(),
	        tooltip = miniTooltip(),
	        testDataSet = new dataBuilder.StepDataBuilder(),
	        stepContainer = d3Selection.select('.js-step-chart-container'),
	        containerWidth = stepContainer.node() ? stepContainer.node().getBoundingClientRect().width : false,
	        tooltipContainer,
	        dataset;
	
	    if (containerWidth) {
	        d3Selection.select('#button').on('click', function () {
	            stepChart.exportChart('stepchart.png', 'Britecharts Step Chart');
	        });
	
	        dataset = testDataSet.withSmallData().build();
	
	        stepChart.width(containerWidth).height(300).xAxisLabel('Meal Type').xAxisLabelOffset(45).yAxisLabel('Quantity').yAxisLabelOffset(-50).margin({
	            top: 40,
	            right: 40,
	            bottom: 50,
	            left: 80
	        }).on('customMouseOver', tooltip.show).on('customMouseMove', tooltip.update).on('customMouseOut', tooltip.hide);
	
	        stepContainer.datum(dataset.data).call(stepChart);
	
	        tooltip.nameLabel('key');
	
	        tooltipContainer = d3Selection.select('.js-step-chart-container .step-chart .metadata-group');
	        tooltipContainer.datum([]).call(tooltip);
	    }
	}
	
	// Show charts if container available
	if (d3Selection.select('.js-step-chart-container').node()) {
	    createStepChart();
	
	    // For getting a responsive behavior on our chart,
	    // we'll need to listen to the window resize event
	    var redrawCharts = function redrawCharts() {
	        d3Selection.select('.step-chart').remove();
	
	        createStepChart();
	    };
	
	    // Redraw charts on window resize
	    PubSub.subscribe('resize', redrawCharts);
	}

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    'use strict';
	
	    var d3Array = __webpack_require__(9);
	    var d3Axis = __webpack_require__(10);
	    var d3Dispatch = __webpack_require__(12);
	    var d3Ease = __webpack_require__(13);
	    var d3Format = __webpack_require__(17);
	    var d3Scale = __webpack_require__(14);
	    var d3Selection = __webpack_require__(4);
	    var d3Transition = __webpack_require__(22);
	
	    var _require = __webpack_require__(25),
	        exportChart = _require.exportChart;
	
	    /**
	     * @typedef StepChartData
	     * @type Object[]
	     *
	     * @property {String} key      Key we measure (required)
	     * @property {Number} value    value of the key (required)
	     *
	     * @example
	     * [
	     *     {
	     *         value: 1,
	     *         key: 'glittering'
	     *     },
	     *     {
	     *         value: 1,
	     *         key: 'luminous'
	     *     }
	     * ]
	     */
	
	    /**
	     * Step Chart reusable API class that renders a
	     * simple and configurable step chart.
	     *
	     * @module Step
	     * @tutorial step
	     * @requires d3-array, d3-axis, d3-dispatch, d3-format, d3-scale, d3-selection, d3-transition
	     *
	     * @example
	     * var stepChart= step();
	     *
	     * stepChart
	     *     .height(500)
	     *     .width(800);
	     *
	     * d3Selection.select('.css-selector')
	     *     .datum(dataset)
	     *     .call(stepChart);
	     *
	     */
	
	    return function module() {
	
	        var margin = {
	            top: 20,
	            right: 20,
	            bottom: 30,
	            left: 40
	        },
	            width = 960,
	            height = 500,
	            ease = d3Ease.easeQuadInOut,
	            data = void 0,
	            chartWidth = void 0,
	            chartHeight = void 0,
	            xScale = void 0,
	            yScale = void 0,
	            numOfVerticalTicks = 6,
	            xAxis = void 0,
	            xAxisLabel = void 0,
	            yAxis = void 0,
	            yAxisLabel = void 0,
	            xAxisLabelOffset = 45,
	            yAxisLabelOffset = -20,
	            xAxisPadding = {
	            top: 0,
	            left: 0,
	            bottom: 0,
	            right: 0
	        },
	            yTickPadding = 8,
	            svg = void 0,
	            valueLabel = 'value',
	            nameLabel = 'key',
	            maskGridLines = void 0,
	            baseLine = void 0,
	
	
	        // Dispatcher object to broadcast the mouse events
	        // Ref: https://github.com/mbostock/d3/wiki/Internals#d3_dispatch
	        dispatcher = d3Dispatch.dispatch('customMouseOver', 'customMouseOut', 'customMouseMove'),
	
	
	        // Formats
	        yAxisTickFormat = d3Format.format('.3'),
	
	
	        // extractors
	        getKey = function getKey(_ref) {
	            var key = _ref.key;
	            return key;
	        },
	            getValue = function getValue(_ref2) {
	            var value = _ref2.value;
	            return value;
	        };
	
	        /**
	         * This function creates the graph using the selection as container
	         * @param  {D3Selection} _selection A d3 selection that represents
	         *                                  the container(s) where the chart(s) will be rendered
	         * @param {StepChartData} _data The data to attach and generate the chart
	         */
	        function exports(_selection) {
	            _selection.each(function (_data) {
	                // Make space on the left of the graph for the y axis label
	                chartWidth = width - margin.left - margin.right;
	                chartHeight = height - margin.top - margin.bottom;
	                data = cleanData(_data);
	
	                buildScales();
	                buildAxis();
	                buildSVG(this);
	                drawGridLines();
	                drawSteps();
	                drawAxis();
	            });
	        }
	
	        /**
	         * Creates the d3 x and y axis, setting orientations
	         * @private
	         */
	        function buildAxis() {
	            xAxis = d3Axis.axisBottom(xScale);
	
	            yAxis = d3Axis.axisLeft(yScale).ticks(numOfVerticalTicks).tickPadding(yTickPadding).tickFormat(yAxisTickFormat);
	        }
	
	        /**
	         * Builds containers for the chart, the axis and a wrapper for all of them
	         * Also applies the Margin convention
	         * @private
	         */
	        function buildContainerGroups() {
	            var container = svg.append('g').classed('container-group', true).attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
	
	            container.append('g').classed('grid-lines-group', true);
	            container.append('g').classed('chart-group', true);
	            container.append('g').classed('x-axis-group axis', true).append('g').classed('x-axis-label', true);
	            container.append('g').classed('y-axis-group axis', true).append('g').classed('y-axis-label', true);
	            container.append('g').classed('metadata-group', true);
	        }
	
	        /**
	         * Creates the x and y scales of the graph
	         * @private
	         */
	        function buildScales() {
	            xScale = d3Scale.scaleBand().domain(data.map(getKey)).rangeRound([0, chartWidth]).paddingInner(0);
	
	            yScale = d3Scale.scaleLinear().domain([0, d3Array.max(data, getValue)]).rangeRound([chartHeight, 0]);
	        }
	
	        /**
	         * Builds the SVG element that will contain the chart
	         * @param  {HTMLElement} container DOM element that will work as the container of the graph
	         * @private
	         */
	        function buildSVG(container) {
	            if (!svg) {
	                svg = d3Selection.select(container).append('svg').classed('britechart step-chart', true);
	
	                buildContainerGroups();
	            }
	
	            svg.attr('width', width).attr('height', height);
	        }
	
	        /**
	         * Cleaning data adding the proper format
	         * @param  {StepChartData} data Data
	         * @private
	         */
	        function cleanData(data) {
	            return data.map(function (d) {
	                d.value = +d[valueLabel];
	                d.key = String(d[nameLabel]);
	
	                return d;
	            });
	        }
	
	        /**
	         * Draws the x and y axis on the svg object within their
	         * respective groups
	         * @private
	         */
	        function drawAxis() {
	            svg.select('.x-axis-group.axis').attr('transform', 'translate(0, ' + chartHeight + ')').call(xAxis);
	
	            if (xAxisLabel) {
	                svg.select('.x-axis-label').append('text').attr('text-anchor', 'middle').attr('x', chartWidth / 2).attr('y', xAxisLabelOffset).text(xAxisLabel);
	            }
	
	            svg.select('.y-axis-group.axis').call(yAxis);
	
	            if (yAxisLabel) {
	                svg.select('.y-axis-label').append('text').attr('x', -chartHeight / 2).attr('y', yAxisLabelOffset).attr('text-anchor', 'middle').attr('transform', 'rotate(270 0 0)').text(yAxisLabel);
	            }
	        }
	
	        /**
	         * Draws the step elements within the chart group
	         * @private
	         */
	        function drawSteps() {
	            var steps = svg.select('.chart-group').selectAll('.step').data(data);
	
	            // Enter
	            steps.enter().append('rect').classed('step', true).attr('x', chartWidth) // Initially drawing the steps at the end of Y axis
	            .attr('y', function (_ref3) {
	                var value = _ref3.value;
	                return yScale(value);
	            }).attr('width', xScale.bandwidth()).attr('height', function (d) {
	                return chartHeight - yScale(d.value);
	            }).on('mouseover', function () {
	                dispatcher.call('customMouseOver', this);
	            }).on('mousemove', function (d) {
	                dispatcher.call('customMouseMove', this, d, d3Selection.mouse(this), [chartWidth, chartHeight]);
	            }).on('mouseout', function () {
	                dispatcher.call('customMouseOut', this);
	            }).merge(steps).transition().ease(ease).attr('x', function (_ref4) {
	                var key = _ref4.key;
	                return xScale(key);
	            }).attr('y', function (d) {
	                return yScale(d.value);
	            }).attr('width', xScale.bandwidth()).attr('height', function (d) {
	                return chartHeight - yScale(d.value);
	            });
	
	            // Exit
	            steps.exit().transition().style('opacity', 0).remove();
	        }
	
	        /**
	         * Draws grid lines on the background of the chart
	         * @return void
	         */
	        function drawGridLines() {
	            maskGridLines = svg.select('.grid-lines-group').selectAll('line.horizontal-grid-line').data(yScale.ticks(numOfVerticalTicks)).enter().append('line').attr('class', 'horizontal-grid-line').attr('x1', xAxisPadding.left).attr('x2', chartWidth).attr('y1', function (d) {
	                return yScale(d);
	            }).attr('y2', function (d) {
	                return yScale(d);
	            });
	
	            //draw a horizontal line to extend x-axis till the edges
	            baseLine = svg.select('.grid-lines-group').selectAll('line.extended-x-line').data([0]).enter().append('line').attr('class', 'extended-x-line').attr('x1', xAxisPadding.left).attr('x2', chartWidth).attr('y1', height - margin.bottom - margin.top).attr('y2', height - margin.bottom - margin.top);
	        }
	
	        /**
	         * Chart exported to png and a download action is fired
	         * @public
	         */
	        exports.exportChart = function (filename) {
	            exportChart.call(exports, svg, filename);
	        };
	
	        /**
	         * Gets or Sets the margin of the chart
	         * @param  {object} _x Margin object to get/set
	         * @return { margin | module} Current margin or Step Chart module to chain calls
	         * @public
	         */
	        exports.margin = function (_x) {
	            if (!arguments.length) {
	                return margin;
	            }
	            margin = _x;
	            return this;
	        };
	
	        /**
	         * Gets or Sets the width of the chart
	         * @param  {number} _x Desired width for the graph
	         * @return { width | module} Current width or step Chart module to chain calls
	         * @public
	         */
	        exports.width = function (_x) {
	            if (!arguments.length) {
	                return width;
	            }
	            width = _x;
	            return this;
	        };
	
	        /**
	         * Gets or Sets the height of the chart
	         * @param  {number} _x Desired width for the graph
	         * @return { height | module} Current height or Step Chart module to chain calls
	         * @public
	         */
	        exports.height = function (_x) {
	            if (!arguments.length) {
	                return height;
	            }
	            height = _x;
	            return this;
	        };
	
	        /**
	         * Gets or Sets the number of vertical ticks on the chart
	         * @param  {number} _x Desired width for the graph
	         * @return { height | module} Current height or Step Chart module to chain calls
	         * @public
	         */
	        exports.numOfVerticalTicks = function (_x) {
	            if (!arguments.length) {
	                return numOfVerticalTicks;
	            }
	            numOfVerticalTicks = _x;
	            return this;
	        };
	
	        /**
	         * Gets or Sets the text of the xAxisLabel on the chart
	         * @param  {text} _x Desired text for the label
	         * @return { text | module} label or Step Chart module to chain calls
	         * @public
	         */
	        exports.xAxisLabel = function (_x) {
	            if (!arguments.length) {
	                return xAxisLabel;
	            }
	            xAxisLabel = _x;
	            return this;
	        };
	
	        /**
	         * Gets or Sets the offset of the xAxisLabel on the chart
	         * @param  {integer} _x Desired offset for the label
	         * @return { integer | module} label or Step Chart module to chain calls
	         * @public
	         */
	        exports.xAxisLabelOffset = function (_x) {
	            if (!arguments.length) {
	                return xAxisLabelOffset;
	            }
	            xAxisLabelOffset = _x;
	            return this;
	        };
	
	        /**
	         * Gets or Sets the text of the yAxisLabel on the chart
	         * @param  {text} _x Desired text for the label
	         * @return { text | module} label or Step Chart module to chain calls
	         * @public
	         */
	        exports.yAxisLabel = function (_x) {
	            if (!arguments.length) {
	                return yAxisLabel;
	            }
	            yAxisLabel = _x;
	            return this;
	        };
	
	        /**
	         * Gets or Sets the offset of the yAxisLabel on the chart
	         * @param  {integer} _x Desired offset for the label
	         * @return { integer | module} label or Step Chart module to chain calls
	         * @public
	         */
	        exports.yAxisLabelOffset = function (_x) {
	            if (!arguments.length) {
	                return yAxisLabelOffset;
	            }
	            yAxisLabelOffset = _x;
	            return this;
	        };
	
	        /**
	         * Exposes an 'on' method that acts as a bridge with the event dispatcher
	         * We are going to expose this events:
	         * customMouseOver, customMouseMove and customMouseOut
	         *
	         * @return {module} Bar Chart
	         * @public
	         */
	        exports.on = function () {
	            var value = dispatcher.on.apply(dispatcher, arguments);
	
	            return value === dispatcher ? exports : value;
	        };
	
	        /**
	         * Chart exported to png and a download action is fired
	         * @public
	         */
	        exports.exportChart = function (filename, title) {
	            exportChart.call(exports, svg, filename, title);
	        };
	
	        return exports;
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    'use strict';
	
	    var _ = __webpack_require__(3),
	        jsonStepDataSmall = __webpack_require__(74);
	
	    function StepDataBuilder(config) {
	        this.Klass = StepDataBuilder;
	
	        this.config = _.defaults({}, config);
	
	        this.withSmallData = function () {
	            var attributes = _.extend({}, this.config, jsonStepDataSmall);
	
	            return new this.Klass(attributes);
	        };
	
	        this.build = function () {
	            return this.config;
	        };
	    }
	
	    return {
	        StepDataBuilder: StepDataBuilder
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 74 */
/***/ (function(module, exports) {

	module.exports = {
		"data": [
			{
				"key": "Appetizer",
				"value": 400
			},
			{
				"key": "Soup",
				"value": 300
			},
			{
				"key": "Salad",
				"value": 300
			},
			{
				"key": "Lunch",
				"value": 250
			},
			{
				"key": "Dinner",
				"value": 220
			},
			{
				"key": "Dessert",
				"value": 100
			},
			{
				"key": "Midnight snack",
				"value": 20
			}
		]
	};

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var d3Selection = __webpack_require__(4),
	    d3TimeFormat = __webpack_require__(19),
	    PubSub = __webpack_require__(5),
	    brush = __webpack_require__(56),
	    dataBuilder = __webpack_require__(76);
	
	function createBrushChart() {
	    var brushChart = brush(),
	        testDataSet = new dataBuilder.BrushDataBuilder(),
	        brushContainer = d3Selection.select('.js-brush-chart-container'),
	        containerWidth = brushContainer.node() ? brushContainer.node().getBoundingClientRect().width : false,
	        dataset;
	
	    if (containerWidth) {
	        dataset = testDataSet.withSimpleData().build();
	
	        brushChart.width(containerWidth).height(125).onBrush(function (brushExtent) {
	            var format = d3TimeFormat.timeFormat('%m/%d/%Y');
	
	            d3Selection.select('.js-start-date').text(format(brushExtent[0]));
	            d3Selection.select('.js-end-date').text(format(brushExtent[1]));
	
	            d3Selection.select('.js-date-range').classed('is-hidden', false);
	        });
	
	        brushContainer.datum(dataset).call(brushChart);
	
	        brushChart.dateRange(["9/15/2015", "1/25/2016"]);
	    }
	}
	
	// Show charts if container available
	if (d3Selection.select('.js-brush-chart-container').node()) {
	    createBrushChart();
	
	    var redrawCharts = function redrawCharts() {
	        d3Selection.select('.brush-chart').remove();
	
	        createBrushChart();
	    };
	
	    // Redraw charts on window resize
	    PubSub.subscribe('resize', redrawCharts);
	}

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    'use strict';
	
	    var _ = __webpack_require__(3),
	        jsonSimpleData = __webpack_require__(77);
	
	    function BrushDataBuilder(config) {
	        this.Klass = BrushDataBuilder;
	
	        this.config = _.defaults({}, config);
	
	        this.withSimpleData = function () {
	            var attributes = _.extend({}, this.config, jsonSimpleData);
	
	            return new this.Klass(attributes);
	        };
	
	        /**
	         * Sets the path for fetching the data
	         * @param  {String} path Desired path for test data
	         * @return {BrushDataBuilder}      Builder object
	         */
	        this.withPath = function (path) {
	            var attributes = _.extend({}, this.config, {
	                jsonURL: path
	            });
	
	            return new this.Klass(attributes);
	        };
	
	        this.build = function () {
	            return this.config.data;
	        };
	    }
	
	    return {
	        BrushDataBuilder: BrushDataBuilder
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 77 */
/***/ (function(module, exports) {

	module.exports = {
		"data": [
			{
				"date": "2015-06-27T07:00:00.000Z",
				"value": 4
			},
			{
				"date": "2015-06-28T07:00:00.000Z",
				"value": 12
			},
			{
				"date": "2015-06-29T07:00:00.000Z",
				"value": 33
			},
			{
				"date": "2015-06-30T07:00:00.000Z",
				"value": 17
			},
			{
				"date": "2015-07-01T07:00:00.000Z",
				"value": 17
			},
			{
				"date": "2015-07-02T07:00:00.000Z",
				"value": 16
			},
			{
				"date": "2015-07-03T07:00:00.000Z",
				"value": 8
			},
			{
				"date": "2015-07-04T07:00:00.000Z",
				"value": 14
			},
			{
				"date": "2015-07-05T07:00:00.000Z",
				"value": 11
			},
			{
				"date": "2015-07-06T07:00:00.000Z",
				"value": 14
			},
			{
				"date": "2015-07-07T07:00:00.000Z",
				"value": 25
			},
			{
				"date": "2015-07-08T07:00:00.000Z",
				"value": 55
			},
			{
				"date": "2015-07-09T07:00:00.000Z",
				"value": 15
			},
			{
				"date": "2015-07-10T07:00:00.000Z",
				"value": 26
			},
			{
				"date": "2015-07-11T07:00:00.000Z",
				"value": 21
			},
			{
				"date": "2015-07-12T07:00:00.000Z",
				"value": 16
			},
			{
				"date": "2015-07-13T07:00:00.000Z",
				"value": 20
			},
			{
				"date": "2015-07-14T07:00:00.000Z",
				"value": 26
			},
			{
				"date": "2015-07-15T07:00:00.000Z",
				"value": 24
			},
			{
				"date": "2015-07-16T07:00:00.000Z",
				"value": 29
			},
			{
				"date": "2015-07-17T07:00:00.000Z",
				"value": 12
			},
			{
				"date": "2015-07-18T07:00:00.000Z",
				"value": 16
			},
			{
				"date": "2015-07-19T07:00:00.000Z",
				"value": 11
			},
			{
				"date": "2015-07-20T07:00:00.000Z",
				"value": 29
			},
			{
				"date": "2015-07-21T07:00:00.000Z",
				"value": 9
			},
			{
				"date": "2015-07-22T07:00:00.000Z",
				"value": 26
			},
			{
				"date": "2015-07-23T07:00:00.000Z",
				"value": 21
			},
			{
				"date": "2015-07-24T07:00:00.000Z",
				"value": 18
			},
			{
				"date": "2015-07-25T07:00:00.000Z",
				"value": 15
			},
			{
				"date": "2015-07-26T07:00:00.000Z",
				"value": 23
			},
			{
				"date": "2015-07-27T07:00:00.000Z",
				"value": 43
			},
			{
				"date": "2015-07-28T07:00:00.000Z",
				"value": 44
			},
			{
				"date": "2015-07-29T07:00:00.000Z",
				"value": 67
			},
			{
				"date": "2015-07-30T07:00:00.000Z",
				"value": 67
			},
			{
				"date": "2015-07-31T07:00:00.000Z",
				"value": 0
			},
			{
				"date": "2015-08-01T07:00:00.000Z",
				"value": 0
			},
			{
				"date": "2015-08-02T07:00:00.000Z",
				"value": 0
			}
		]
	};

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map