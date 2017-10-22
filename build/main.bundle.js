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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
__webpack_require__(10)
__vue_script__ = __webpack_require__(12)
__vue_template__ = __webpack_require__(13)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  var id = "/home/stanislav/code/ProjectManager/js/all-projects.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _userMangement = __webpack_require__(4);

var _userMangement2 = _interopRequireDefault(_userMangement);

var _allProjects = __webpack_require__(0);

var _allProjects2 = _interopRequireDefault(_allProjects);

var _project = __webpack_require__(14);

var _project2 = _interopRequireDefault(_project);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//main application


var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        currentView: "project",
        currentProjectId: 'Pog1'
    },
    components: {
        'all-projects': _allProjects2.default,
        'project': _project2.default
    },
    methods: {
        selectProject: function selectProject(name) {
            this.currentView = "project";
            this.currentProjectId = name;
        }
    },
    computed: {
        currentViewProperties: function currentViewProperties() {
            return {
                currentPoject: this.currentProjectId
            };
        }
    },
    created: function created() {
        //init
    }
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = function () {
    function User() {
        (0, _classCallCheck3.default)(this, User);
    }

    (0, _createClass3.default)(User, [{
        key: "setFiels",

        //    var id;
        //    var firstName, lastName;
        //    var desc, github, site;
        //    var img;


        value: function setFiels() {}
    }]);
    return User;
}();

var data = {};
(function init() {})();

exports.default = {
    //public functions

    isUserLogged: function isUserLogged() {},
    getLoggedUser: function getLoggedUser() {},
    loginUser: function loginUser(user, callbac) {},
    logouUser: function logouUser() {},
    getUser: function getUser(id) {},
    signinUser: function signinUser(user, callback) {}
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(7);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(8), __esModule: true };

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(9);
module.exports = function defineProperty(it, key, desc){
  return $.setDesc(it, key, desc);
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

var $Object = Object;
module.exports = {
  create:     $Object.create,
  getProto:   $Object.getPrototypeOf,
  isEnum:     {}.propertyIsEnumerable,
  getDesc:    $Object.getOwnPropertyDescriptor,
  setDesc:    $Object.defineProperty,
  setDescs:   $Object.defineProperties,
  getKeys:    $Object.keys,
  getNames:   $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each:       [].forEach
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(11);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=_v-9aa23ca4&file=all-projects.vue!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./all-projects.vue", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=_v-9aa23ca4&file=all-projects.vue!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./all-projects.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n\n\n", ""]);

// exports


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _allProjects = __webpack_require__(0);

var _allProjects2 = _interopRequireDefault(_allProjects);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    data: function data() {
        return {
            projects: [],
            nameEntered: '',
            descEntered: '',
            isPublicEntered: ''
        };
    },
    created: function created() {
        this.projects.push({
            name: "ArffPar"
        });
        this.projects.push({
            name: "Mandelbrot"
        });
        this.projects.push({
            name: "ProManager"
        });
    },

    methods: {
        createNewProject: function createNewProject(name, desc, _public) {
            //console.log(name + ", " + desc + "," + _public);
            this.projects.push({
                name: name,
                desc: desc
            });
        },
        viewProject: function viewProject(name) {
            this.$emit("show-project", name);
        }
    }

    // </script>
    //
    // <style>
    //
    //
    // </style>
    //

}; // <template>
//     <div>
//     <h3>Projects List-View</h3>
//     <p>See all of your projects and some general information about them. You can also create new projects</p>
//     <div class="panel panel-default">
//         <div class="panel-heading">
//             <h4>Create new</h4>
//         </div>
//         <div class="panel-body">
//                 <div>
//                   <div class="form-group">
//                     <label for="name">Project Name:</label>
//                     <input v-model="nameEntered" type="name" placeholder="Name:" class="form-control" id="name">
//                   </div>
//                   <div class="form-group">
//                     <label for="desc">Description:</label>
//                     <input v-model="descEntered" class="form-control" placeholder="Description" id="desc">
//                   </div>
//                   <div class="checkbox">
//                     <label><input v-model="isPublicEntered" type="checkbox">Public</label>
//                   </div>
//                   <button v-on:click ="createNewProject(nameEntered,descEntered,isPublicEntered) " class="btn btn-default">Create</button>
//                 </div>
//         </div>
//     </div>
//    <hr>
//     <h3>All projects:</h3>
//     <table class="table table-striped">
//     <thead>
//       <tr>
//         <th>Name</th>
//         <th>Description</th>
//         <th>Date-created</th>
//         <th>Date-modified</th>
//         <th>Info</th>
//       </tr>
//     </thead>
//     <tbody>
//       <tr v-for="pro in projects">
//         <td>{{pro.name}}</td>
//         <td>{{pro.name}}</td>
//         <td>{{pro.name}}</td>
//         <td>{{pro.name}}</td>
//         <td><a class="mouse" v-on:click="viewProject(pro.name)" >View</a></td>
//       </tr>
//     </tbody>
//   </table>
//     </div>
// </template>
// <script>

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = "\n    <div>\n    <h3>Projects List-View</h3>\n    <p>See all of your projects and some general information about them. You can also create new projects</p>\n    <div class=\"panel panel-default\">\n        <div class=\"panel-heading\">\n            <h4>Create new</h4>\n        </div>\n        <div class=\"panel-body\">\n                <div>\n                  <div class=\"form-group\">\n                    <label for=\"name\">Project Name:</label>\n                    <input v-model=\"nameEntered\" type=\"name\" placeholder=\"Name:\" class=\"form-control\" id=\"name\">\n                  </div>\n                  <div class=\"form-group\">\n                    <label for=\"desc\">Description:</label>\n                    <input v-model=\"descEntered\" class=\"form-control\" placeholder=\"Description\" id=\"desc\">\n                  </div>\n                  <div class=\"checkbox\">\n                    <label><input v-model=\"isPublicEntered\" type=\"checkbox\">Public</label>\n                  </div>\n                  <button v-on:click =\"createNewProject(nameEntered,descEntered,isPublicEntered) \" class=\"btn btn-default\">Create</button>\n                </div>\n        </div>\n    </div>\n   <hr>\n    <h3>All projects:</h3>\n    <table class=\"table table-striped\">\n    <thead>\n      <tr>\n        <th>Name</th>\n        <th>Description</th>\n        <th>Date-created</th>\n        <th>Date-modified</th>\n        <th>Info</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr v-for=\"pro in projects\">\n        <td>{{pro.name}}</td>\n        <td>{{pro.name}}</td>\n        <td>{{pro.name}}</td>\n        <td>{{pro.name}}</td>\n        <td><a class=\"mouse\" v-on:click=\"viewProject(pro.name)\" >View</a></td>\n      </tr>\n    </tbody>\n  </table>\n    </div>\n";

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
__webpack_require__(15)
__vue_script__ = __webpack_require__(17)
__vue_template__ = __webpack_require__(18)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  var id = "/home/stanislav/code/ProjectManager/js/project.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(16);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=_v-61ade841&file=project.vue!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./project.vue", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=_v-61ade841&file=project.vue!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./project.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n\n\n", ""]);

// exports


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// <template>
//   <div>
//       <div class="blog-header">
//         <h1 class="blog-title">{{currentPoject}}</h1>
//         <p class="lead blog-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
//       </div>
//
//
//
//       <ul class="nav nav-pills nav-justified" role="tablist">
//         <li role="presentation" class="active"><a href="#General" aria-controls="General" role="tab" data-toggle="tab">General</a></li>
//         <li role="presentation"><a href="#Tasks" aria-controls="Tasks" role="tab" data-toggle="tab">Tasks</a></li>
//         <li role="presentation"><a href="#Dash" aria-controls="Dash" role="tab" data-toggle="tab">Dash</a></li>
//         <li role="presentation"><a href="#Notes" aria-controls="Notes" role="tab" data-toggle="tab">Notes</a></li>
//         <li role="presentation"><a href="#Custom-Variables" aria-controls="Custom-Variables" role="tab" data-toggle="tab">Custom-Variables</a></li>
//       </ul>
//
//       <div class="tab-content">
//         <div role="tabpanel" class="tab-pane active" id="General">
//             <hr>    
//              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem quod, ab voluptates voluptatum distinctio maxime facere ipsa, eveniet similique modi quisquam perferendis ducimus enim dolore voluptate, hic assumenda possimus. Voluptate.   
//
//
//         </div>
//         <div role="tabpanel" class="tab-pane" id="Tasks">Tasks</div>
//         <div role="tabpanel" class="tab-pane" id="Dash">Dash</div>
//         <div role="tabpanel" class="tab-pane" id="Notes"></div>
//         <div role="tabpanel" class="tab-pane" id="Custom-Variables"></div>
//       </div>
//
//
//
//   </div>
// </template>
//
// <script>
exports.default = {
    props: ['currentPoject'],
    data: function data() {
        return {
            msg: 'One projects!'
        };
    },
    created: function created() {},

    methods: {}

    // </script>
    //
    // <style>
    //
    //
    // </style>
    //

};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = "\n  <div>\n      <div class=\"blog-header\">\n        <h1 class=\"blog-title\">{{currentPoject}}</h1>\n        <p class=\"lead blog-description\">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>\n      </div>\n      \n      \n      \n      <ul class=\"nav nav-pills nav-justified\" role=\"tablist\">\n        <li role=\"presentation\" class=\"active\"><a href=\"#General\" aria-controls=\"General\" role=\"tab\" data-toggle=\"tab\">General</a></li>\n        <li role=\"presentation\"><a href=\"#Tasks\" aria-controls=\"Tasks\" role=\"tab\" data-toggle=\"tab\">Tasks</a></li>\n        <li role=\"presentation\"><a href=\"#Dash\" aria-controls=\"Dash\" role=\"tab\" data-toggle=\"tab\">Dash</a></li>\n        <li role=\"presentation\"><a href=\"#Notes\" aria-controls=\"Notes\" role=\"tab\" data-toggle=\"tab\">Notes</a></li>\n        <li role=\"presentation\"><a href=\"#Custom-Variables\" aria-controls=\"Custom-Variables\" role=\"tab\" data-toggle=\"tab\">Custom-Variables</a></li>\n      </ul>\n\n      <div class=\"tab-content\">\n        <div role=\"tabpanel\" class=\"tab-pane active\" id=\"General\">\n            <hr>    \n             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem quod, ab voluptates voluptatum distinctio maxime facere ipsa, eveniet similique modi quisquam perferendis ducimus enim dolore voluptate, hic assumenda possimus. Voluptate.   \n            \n            \n        </div>\n        <div role=\"tabpanel\" class=\"tab-pane\" id=\"Tasks\">Tasks</div>\n        <div role=\"tabpanel\" class=\"tab-pane\" id=\"Dash\">Dash</div>\n        <div role=\"tabpanel\" class=\"tab-pane\" id=\"Notes\"></div>\n        <div role=\"tabpanel\" class=\"tab-pane\" id=\"Custom-Variables\"></div>\n      </div>\n      \n      \n      \n  </div>\n";

/***/ })
/******/ ]);