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
/******/ 	return __webpack_require__(__webpack_require__.s = 41);
/******/ })
/************************************************************************/
/******/ ({

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(42);


/***/ }),

/***/ 42:
/***/ (function(module, exports) {

(function ($R) {
    $R.add('plugin', 'counter', {
        init: function init(app) {
            this.app = app;
            this.editor = app.editor;
            this.statusbar = app.statusbar;
        },
        // public
        start: function start() {
            var $editor = this.editor.getElement();
            $editor.on('keyup.redactor-plugin-counter', this.count.bind(this));

            this.count();
        },
        stop: function stop() {
            var $editor = this.editor.getElement();
            $editor.off('.redactor-plugin-counter');

            this.statusbar.removeItem('words');
            this.statusbar.removeItem('chars');
        },
        count: function count() {
            var words = 0,
                characters = 0,
                spaces = 0;
            var $editor = this.editor.getElement();
            var html = $editor.html();

            html = this._clean(html);
            if (html !== '') {
                var arrWords = html.split(/\s+/);
                var arrSpaces = html.match(/\s/g);

                words = arrWords ? arrWords.length : 0;
                spaces = arrSpaces ? arrSpaces.length : 0;

                characters = html.length;
            }

            var data = { words: words, characters: characters, spaces: spaces };

            // callback
            this.app.broadcast('counter', data);

            // statusbar
            this.statusbar.add('words', 'words: ' + data.words);
            this.statusbar.add('chars', 'chars: ' + data.characters);
        },

        // private
        _clean: function _clean(html) {
            html = html.replace(/<\/(.*?)>/gi, ' ');
            html = html.replace(/<(.*?)>/gi, '');
            html = html.replace(/\t/gi, '');
            html = html.replace(/\n/gi, ' ');
            html = html.replace(/\r/gi, ' ');
            html = html.replace(/\u200B/g, '');
            html = html.replace(/&nbsp;/g, '1');
            html = html.trim();

            return html;
        }
    });
})(Redactor);

/***/ })

/******/ });