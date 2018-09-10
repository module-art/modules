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
/******/ 	return __webpack_require__(__webpack_require__.s = 52);
/******/ })
/************************************************************************/
/******/ ({

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(53);


/***/ }),

/***/ 53:
/***/ (function(module, exports) {

(function ($R) {
    $R.add('plugin', 'imagecropper', {
        translations: {
            en: {
                "choose": "Choose"
            }
        },
        modals: {
            'cropperModal': '<form action=""> \
                    <div class="form-item"> \
                      <div id="img-data" class="form-row d-none"> \
                        <input name="img_x" type="text" class="" readonly "id"="x-viewer" /> \
                        <input name="img_y" type="text" class="" readonly "id"="y-viewer" /> \
                        <div class="form-group col-md-4 offset-md-2"> \
                          <div class="input-group mb-3"> \
                            <div class="input-group-prepend"> \
                              <span class="input-group-text"> \
                                <label for="img_width">Dim :</label> \
                              </span> \
                            </div> \
                              <input name="img_width" type="text" class="form-control" "id"="width-viewer" readonly/> \
                              <small class="invalid-feedback">Image trop petite</small> \
                          </div> \
                        </div> \
                        <div class="form-group col-md-2"> \
                          <p class="form-control middle-p"> X </p> \
                        </div> \
                        <div class="form-group col-md-4"> \
                          <div class="input-group mb-3"> \
                              <input name="img_height" type="text" class="form-control" "id"="height-viewer" readonly/> \
                          <div class="input-group-append"> \
                            <span class="input-group-text">pixels</span> \
                          </div> \
                        </div> \
                      </div> \
                    </div> \
                  </div> \
                </form>'
        },
        init: function init(app) {
            this.app = app;
            this.lang = app.lang;
            this.opts = app.opts;
            this.toolbar = app.toolbar;
            this.component = app.component;
            this.insertion = app.insertion;
            this.inspector = app.inspector;
        },
        start: function start() {
            // create the button data
            var buttonData = {
                title: 'imagecropper',
                api: 'plugin.cropper.open'
            };

            // create the button
            var $button = this.toolbar.addButton('imagecropper', buttonData);
        },
        open: function open() {
            var options = {
                title: 'Redimmensionner', // the modal title
                name: 'cropperModal', // the modal variable in modals object
                width: '500px',
                height: '400px',
                commands: {
                    cancel: { title: 'Annuler' // the cancel button in the modal
                    } }
            };

            // open the modal with API
            this.app.api('module.modal.build', options);
        },
        // messages
        onmodal: {
            image: {
                open: function open($modal, $form) {
                    if (!this.opts.imageManagerJson) return;
                    this._load($modal);
                }
            }
        },

        // private
        _load: function _load($modal) {
            var $body = $modal.getBody();

            this.$box = $R.dom('<div>');
            this.$box.attr('data-title', this.lang.get('choose'));
            this.$box.addClass('redactor-modal-tab');
            this.$box.hide();
            this.$box.css({
                overflow: 'auto',
                height: '300px',
                'line-height': 1
            });

            $body.append(this.$box);

            $R.ajax.get({
                url: this.opts.imageManagerJson,
                success: this._parse.bind(this)
            });
        },
        _parse: function _parse(json) {
            var data = JSON.parse(json);

            for (var key in data) {
                var obj = data[key];
                var $img = $R.dom('<img>');

                $img.attr('src', obj.thumb);
                $img.attr('data-params', encodeURI(JSON.stringify(obj)));
                $img.css({
                    width: '96px',
                    height: '72px',
                    margin: '0 4px 2px 0',
                    cursor: 'pointer'
                });
                $img.on('click', this._insert.bind(this));

                this.$box.append($img);
            }
        },
        _insert: function _insert(e) {
            e.preventDefault();

            var $el = $R.dom(e.target);
            var data = JSON.parse(decodeURI($el.attr('data-params')));

            this.app.api('module.image.insert', { image: data });
        }
    });
})(Redactor);

/***/ })

/******/ });