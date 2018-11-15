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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 44);
/******/ })
/************************************************************************/
/******/ ({

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(45);


/***/ }),

/***/ 45:
/***/ (function(module, exports) {

$(document).ready(function () {
  var edit = false;

  $("#ajout-categorie").click(function () {
    var idType = parseInt($('[name="type_id"]').val()),
        url = edit ? '/coulisses/categorie/' + edit : '/coulisses/categorie';

    $.ajax({
      method: 'post',
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
        listenToRemove();
      });
      $('#modalCategorie').modal('hide');
      edit = false;
      $('#title-ajout').html('Ajouter une catégorie');
    }).fail(function (data) {
      console.log(data);
      var errors = '';
      $.each(data.responseJSON['errors'], function (key, value) {
        console.log(key + ' : ' + value);
        errors += value + "\n";
        var input = 'input[name=' + key + ']';
        $(input).addClass('is-invalid');
      });
      alert(errors);
    });
  });

  $(".close").click(function () {
    edit = false;
    $('#title-ajout').html('Ajouter une catégorie');
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
          alert('Connexion impossible pour supprimer la séance.');
        });
      }
    });
  }
  listenToRemove();

  function listenToEdit() {
    $(".categorieo").click(function () {
      var elem = $(this);
      categorie_id = $(this).attr('data-id');
      $.ajax({
        method: 'get',
        url: '/coulisses/categorie/' + categorie_id
        //data: {
        //_token: $('[name="csrf-token"]').attr('content'),
        //},
      }).done(function (data) {
        $('#modalCategorie').modal('show');
        $('[name="name"]').val(data['name']);
        edit = categorie_id;
        $('#title-ajout').html('Modifier une catégorie');
      }).fail(function (data) {
        console.log(data);
        alert('Connexion impossible pour éditer la séance.');
      });
    });
  }
  listenToEdit();
});

/***/ })

/******/ });