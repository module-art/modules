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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/assets/js/fields.js":
/*!***************************************!*\
  !*** ./resources/assets/js/fields.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

$(document).ready(function () {
  var fieldsSection = $('#field-manage-script'),
      fieldLength = parseInt($('#fields-length').text());
  radioListener();
  removeButtonListener();
  upButtonListener();
  downButtonListener();
  hideLimitButtons();
  $('#add-field-button').click(function () {
    showLimitButtons();
    fieldLength++;
    var newField = '<section class="form-row justify-content-end">' + '<div class="form-group col-11 col-md-5">' + '<input type="text" name="champs-' + fieldLength + '" class="form-control" />' + '</div>' + '<div class="form-group offset-1 col-11 offset-md-0 col-md-6">' + '<div class="form-check">' + '<input class="form-check-input" type="radio" name="radios-' + fieldLength + '" value="text" checked>' + '<label class="form-check-label">Texte</label>' + '</div>' + '<div class="form-check">' + '<input class="form-check-input" type="radio" name="radios-' + fieldLength + '" value="date">' + '<label class="form-check-label">Date</label>' + '</div>' + '<div class="form-check">' + '<input class="form-check-input" type="radio" name="radios-' + fieldLength + '" value="time">' + '<label class="form-check-label">Heure</label>' + '</div>' + '<div class="form-check">' + '<input class="form-check-input" type="radio" name="radios-' + fieldLength + '" value="nb">' + '<label class="form-check-label">Nombre</label>' + '<input class="unit d-none" type="text"/>' + '</div>' + '</div>' + '<div class="remove-field-button" id=""><i class="fas fa-minus-circle"></i></div>' + '<div class="up-button" id=""><i class="fas fa-arrow-circle-up"></i></div>' + '<div class="down-button" id=""><i class="fas fa-arrow-circle-down"></i></div>' + '</section>';
    fieldsSection.append(newField);
    radioListener();
    removeButtonListener();
    upButtonListener();
    downButtonListener();
    hideLimitButtons();
  });
  $('#the-form').submit(function (event) {
    //event.preventDefault();
    var fieldsObject = {
      fields: []
    };
    fieldsSection.children('section').each(function () {
      var $type = $(this).find('input[type=radio]:checked').val();

      if ($type == 'nb') {
        fieldsObject.fields.push({
          name: $(this).find('.form-control').first().val(),
          type: $type,
          unit: $(this).find('.unit').val()
        });
      } else {
        fieldsObject.fields.push({
          name: $(this).find('.form-control').first().val(),
          type: $type
        });
      }
    });
    console.log(JSON.stringify(fieldsObject));
    makeCsv(fieldsObject); //$('the-form').submit();
  });

  function removeButtonListener() {
    $('.remove-field-button').click(function () {
      showLimitButtons();
      $(this).parent().remove();
      hideLimitButtons();
    });
  }

  function upButtonListener() {
    $('.up-button').click(function () {
      showLimitButtons();
      var sectionToMove = $(this).parent();
      sectionToMove.prev().before(sectionToMove);
      hideLimitButtons();
    });
  }

  function downButtonListener() {
    $('.down-button').click(function () {
      showLimitButtons();
      var sectionToMove = $(this).parent();
      sectionToMove.next().after(sectionToMove);
      hideLimitButtons();
    });
  }

  function radioListener() {
    $('input[type=radio]').change(function () {
      var sameName = $(this).attr('name'),
          nextNbRadio = $('input[value=nb][name=' + sameName + ']'),
          unitInput = nextNbRadio.nextAll('.unit').first();

      if (this.value != 'nb') {
        nextNbRadio.removeClass('checked');
        unitInput.addClass('d-none');
      } else {
        $(this).addClass('checked');
        unitInput.removeClass('d-none');
      }
    });
  }

  function makeCsv(jsonFields) {
    var csv = '',
        firstLoop = true;
    jsonFields.fields.forEach(function (field, i) {
      console.log(field);

      if (field.name.match(/[()]+/)) {
        alert('Les champs ne doivent pas contenir de parenthése.\nElles seront supprimées pour l\'enregistrement.');
        field.name = field.name.replace(/[()]+/g, '');
      }

      if (firstLoop) {
        firstLoop = false;
        csv += field.name;
      } else {
        csv += ',' + field.name;
      }

      if (field.type == 'nb') csv += "(nb)";
      if (field.unit != null && field.unit != '') csv += field.unit;
    });
    $('input[name=champs]').val(csv);
  }

  function hideLimitButtons() {
    var currentFields = $('#field-manage-script').children('section'),
        currentFieldsLength = currentFields.length - 1,
        i = 0;
    currentFields.first().children('.up-button').first().addClass('d-none');
    currentFields.last().children('.down-button').first().addClass('d-none');
  }

  function showLimitButtons() {
    $('.up-button').removeClass('d-none');
    $('.down-button').removeClass('d-none');
  }
});

/***/ }),

/***/ 1:
/*!*********************************************!*\
  !*** multi ./resources/assets/js/fields.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/sylvestre/www/modules/modules-chemins/resources/assets/js/fields.js */"./resources/assets/js/fields.js");


/***/ })

/******/ });