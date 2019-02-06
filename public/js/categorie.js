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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/assets/common/js/categorie.js":
/*!*************************************************!*\
  !*** ./resources/assets/common/js/categorie.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

$(document).ready(function () {
  var edit = false;
  var idType = parseInt($('[name="type_id"]').val());
  $('[name="choose_cat"]').popsuggest({
    placement: 'left',
    dataUrl: '/coulisses/categorie_suggest/' + idType,
    chainLength: 1,
    rows: 5,
    addData: {
      '_token': $('[name="csrf-token"]').attr('content')
    }
  }).on("popSelect", function () {
    attachCategorie(this.value);
    this.value = '';
  });
  $("#ajout-categorie").click(function () {
    if (edit) {
      var method = 'put',
          url = '/coulisses/categorie/' + edit;
    } else {
      var method = 'post',
          url = '/coulisses/categorie';
    }

    $.ajax({
      method: method,
      url: url,
      data: {
        _token: $('[name="csrf-token"]').attr('content'),
        name: $('[name="name"]').val(),
        type_id: idType
      },
      dataType: "json"
    }).done(function (data) {
      $.each(data, function (key, value) {
        console.log(key + ' - ' + value);
      });
      $('#categories-container').load('/coulisses/categorie?type_id=' + idType, function () {
        listenToEdit();
        listenToDetach();
        listenToRemove();
      });
      $('#modalCategorie').modal('hide');
      edit = false;
      $('#title-ajout').html('Ajouter une catégorie');
      $('input').removeClass('is-invalid');
    }).fail(function (data) {
      //console.log(data);
      var errors = '';
      $.each(data.responseJSON['errors'], function (key, value) {
        //console.log(key+' : '+value);
        errors += value + "\n";
        var input = 'input[name=' + key + ']';
        $(input).addClass('is-invalid');
        $(input).next().html(value);
      });
      edit = false; //alert(errors);
    });
  });
  $(".close").click(function () {
    edit = false;
    $('#title-ajout').html('Ajouter une catégorie');
    $('input').removeClass('is-invalid');
  });

  function listenToRemove() {
    $(".categoriex").click(function () {
      if (confirm('Étes-vous sûr?')) {
        var elem = $(this);
        categorie_id = $(this).attr('data-id');
        $.ajax({
          method: 'delete',
          url: '/coulisses/categorie/' + categorie_id,
          data: {
            _token: $('[name="csrf-token"]').attr('content')
          }
        }).done(function (data) {
          console.log(data);
          elem.parents('tr').first().remove();
        }).fail(function (data) {
          console.log(data);
          alert('Connexion impossible pour supprimer la catégorie.');
        });
      }
    });
  }

  listenToRemove();

  function listenToDetach() {
    $(".categoried").click(function () {
      var elem = $(this);
      categorie_id = $(this).attr('data-id');
      $.ajax({
        method: 'post',
        url: '/coulisses/categorie/' + categorie_id + '/detach',
        data: {
          _token: $('[name="csrf-token"]').attr('content')
        }
      }).done(function (data) {
        console.log(data);
        elem.parents('tr').first().remove();
      }).fail(function (data) {
        console.log(data);
        alert('Connexion impossible pour détacher la catégorie.');
      });
    });
  }

  listenToDetach();

  function attachCategorie(categorieName) {
    $.ajax({
      method: 'post',
      url: '/coulisses/categorie/' + idType + '/attach',
      data: {
        _token: $('[name="csrf-token"]').attr('content'),
        name: categorieName
      },
      dataType: "json"
    }).done(function (data) {
      $.each(data, function (key, value) {
        console.log(key + ' - ' + value);
      });

      if (data['error']) {
        alert(data['error']);
      } else {
        $('#categories-container').load('/coulisses/categorie?type_id=' + idType, function () {
          listenToEdit();
          listenToDetach();
          listenToRemove();
        });
      }
    }).fail(function (data) {
      console.log(data);
      alert('Connexion impossible pour associer la catégorie.');
    });
  }

  function listenToEdit() {
    $(".categorieo").click(function () {
      var elem = $(this);
      categorie_id = $(this).attr('data-id');
      $.ajax({
        method: 'get',
        url: '/coulisses/categorie/' + categorie_id + '/edit' //data: {
        //_token: $('[name="csrf-token"]').attr('content'),
        //},

      }).done(function (data) {
        $('#modalCategorie').modal('show');
        $('[name="name"]').val(data);
        edit = categorie_id;
        $('#title-ajout').html('Modifier une catégorie');
      }).fail(function (data) {
        console.log(data);
        alert('Connexion impossible pour éditer la catégorie.');
      });
    });
  }

  listenToEdit();
});

/***/ }),

/***/ 4:
/*!*******************************************************!*\
  !*** multi ./resources/assets/common/js/categorie.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/sylvestre/www/modules/modules-chemins/resources/assets/common/js/categorie.js */"./resources/assets/common/js/categorie.js");


/***/ })

/******/ });