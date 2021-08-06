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

/***/ "./resources/assets/js/lists.js":
/*!**************************************!*\
  !*** ./resources/assets/js/lists.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

$(document).ready(function () {
  var csrfToken = $('meta[name="csrf-token"]').attr('content'),
      //get csrf-field in head
  failMessage = 'Oups! une erreur a empêché la modification.';

  if ($('#typeList').length == 1) {
    var refId = $('#typeList').attr('data-typeid'),
        sortUrl = '/coulisses/sorttyperubriques/',
        typeIndex = 1;
  } else {
    var refId = $('#pageList').attr('data-pageid'),
        sortUrl = '/coulisses/sortpagerubriques/',
        typeIndex = 0;
  }

  $('td[data-toggle="publication"]').click(function () {
    var idPage = $(this).attr('data-page_id'),
        nodeStatus = $(this).children().first();
    document.body.style.cursor = 'wait';
    togglePublished(nodeStatus, 'publicationpage', idPage);
  });
  $('td[data-toggle="rubrique-publication"]').click(function () {
    var idRubrique = $(this).attr('data-rubrique_id'),
        nodeStatus = $(this).children().first();
    document.body.style.cursor = 'wait';
    togglePublished(nodeStatus, 'publicationrubrique', idRubrique);
  });
  $('td[data-toggle="content-publication"]').click(function () {
    var idContent = $(this).attr('data-content_id'),
        nodeStatus = $(this).children().first();
    document.body.style.cursor = 'wait';
    togglePublished(nodeStatus, 'publicationcontent', idContent);
  });
  $('td[data-toggle="content-archivage"]').click(function () {
    var idContent = $(this).attr('data-content_id'),
        nodeStatus = $(this).children().first();
    document.body.style.cursor = 'wait';
    togglePublished(nodeStatus, 'archivecontent', idContent);
  });

  function togglePublished(nodeStatus, routeUrl, idContent) {
    $.ajax({
      method: 'post',
      url: '/coulisses/' + routeUrl + '/' + idContent,
      data: {
        _token: csrfToken
      } //token!!!

    }).done(function (data) {
      document.body.style.cursor = 'default';
      console.log(data);

      if (nodeStatus.is('.published')) {
        nodeStatus.removeClass('published').addClass('unpublished').html('<i class="far fa-times-circle"></i>');
      } else {
        nodeStatus.removeClass('unpublished').addClass('published').html('<i class="far fa-check-circle"></i>');
      }
    }).fail(function () {
      document.body.style.cursor = 'default';
      alert(failMessage);
    });
  } //sort and reorder when type ordered by place


  var fromNumber = 0,
      toNumber = 0,
      newVal = 0,
      endItem = {};
  $("#sortable").sortable({
    axis: "y",
    start: function start(event, ui) {
      fromNumber = ui.item.children('.place-indicator').attr('data-place');
    },
    update: function update(event, ui) {
      document.body.style.cursor = 'wait';
      endItem = ui.item;
      toNumber = ui.item.prev().children('.place-indicator').attr('data-place');
      newVal = parseInt(toNumber) + 1;
      if (isNaN(newVal)) newVal = 0; //alert("l'élément de position " + fromNumber + " va devenir " + newVal);

      $.ajax({
        method: 'post',
        url: sortUrl + refId,
        data: {
          _token: csrfToken,
          numFrom: fromNumber,
          numTo: newVal
        }
      }).done(function (data) {
        document.body.style.cursor = 'default';
        console.log(data);
        reOrderNumbers(fromNumber, newVal, endItem); //document.location.reload(true);
      }).fail(function () {
        document.body.style.cursor = 'default';
        alert(failMessage);
      });
    }
  });

  function reOrderNumbers(numFrom, numTo, endItem) {
    var y = 0;

    if (numTo < numFrom) {
      endItem.children('.place-indicator').attr('data-place', numTo).text(numTo);
      var item = endItem;

      var _loop = function _loop(i) {
        y++;

        (function (index) {
          setTimeout(function () {
            item = item.next();
            item.children('.place-indicator').attr('data-place', i).text(i);
          }, y * 400);
        })(y);
      };

      for (var i = numTo + 1; i <= numFrom; i++) {
        _loop(i);
      }
    } else {
      endItem.children('.place-indicator').attr('data-place', numTo - 1).text(numTo - 1);
      var item = endItem;

      var _loop2 = function _loop2(_i) {
        y++;

        (function (index) {
          setTimeout(function () {
            item = item.prev();
            item.children('.place-indicator').attr('data-place', _i).text(_i);
          }, y * 400);
        })(y);
      };

      for (var _i = numTo - 2; _i >= numFrom; _i--) {
        _loop2(_i);
      }
    }
  } //rubrique destroy


  $(".btn-destroy-rubrique").click(function () {
    var idRubrique = $(this).attr('data-rubrique_id');

    if (confirm('Êtes vous sûr?')) {
      if (confirm('Tous les blocs associés à cette rubrique seront effacés. Êtes vous vraiment sûr?')) {
        $.ajax({
          method: 'post',
          url: '/coulisses/destroyrubrique/' + idRubrique,
          data: {
            _token: csrfToken
          } //token!!!

        }).done(function (data) {
          console.log(data);
          document.location.reload(true);
        }).fail(function () {
          alert('Oups! une erreur a empêché la suppression.');
        });
      }
    }
  });

  function listenToEditClass() {
    $('.editclass').click(function () {
      $('.editclass').off();
      var target = $(this),
          rubriqueId = target.attr('data-rubrique_id'),
          innerText = target.text(); //alert(innerText);

      target.html('<input type="text" name="class" id="classEdited" value="' + innerText + '">');
      $('#classEdited').keypress(function (event) {
        if (event.which == 13) {
          document.body.style.cursor = 'wait';
          target.html($(this).val());
          $.ajax({
            method: 'post',
            url: '/coulisses/updaterubriqueclass/' + rubriqueId,
            data: {
              rubriqueClass: $(this).val(),
              _token: csrfToken
            }
          }).done(function (data) {
            document.body.style.cursor = 'default';
            console.log(data);
          }).fail(function () {
            document.body.style.cursor = 'default';
            alert(failMessage);
          });
          listenToEditClass();
        }
      });
    });
  }

  listenToEditClass();
});

/***/ }),

/***/ 1:
/*!********************************************!*\
  !*** multi ./resources/assets/js/lists.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/sylvestre/www/modules/modules-chemins/resources/assets/js/lists.js */"./resources/assets/js/lists.js");


/***/ })

/******/ });