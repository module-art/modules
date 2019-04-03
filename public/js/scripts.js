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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Themes/baramots/assets/js/scripts.js":
/*!**********************************************!*\
  !*** ./Themes/baramots/assets/js/scripts.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

$(document).ready(function () {
  //$('#global-wrapper').hide().fadeIn(1500);
  //insertion des liste par type

  /*var typeContents = $('.type-contents');
   typeContents.each(function(){
    var type = $(this).attr('data-content_type');
     $(this).load('/get-type-contents/'+type+'?orderby=titre&order=asc', function(response, status, xhr){
      if( status == "error" ){
        console.log(xhr.statusText);
      }
    });
  });*/
  //rgpd notice
  $('#rgpd-notice-close').click(function (e) {
    $.ajax({
      url: '/rgpd-notice',
      method: 'get',
      data: {
        setting: 'closed'
      } //dataType : 'json',

    }).done(function (data) {
      $('#rgpd-notice').remove();
    }).fail(function (data) {
      var errors = data.responseJSON.message + '\n'; //var errors = '';

      $.each(data.responseJSON.errors, function (key, value) {
        errors += value + '\n';
      });
      alert('La requête n\'a pas abouti.\n' + errors);
    });
  }); //cadavre exquis

  $('#send-exquis').click(function (e) {
    $('.fa-cog').css('display', 'inline-block');
    e.preventDefault();
    var exquisForm = $('#exquis-form')[0],
        formData = new FormData(exquisForm);
    formData.append('_token', $('meta[name="csrf-token"]').attr('content'));
    console.log(formData.get('texte'));
    $.ajax({
      url: '/exquis',
      method: 'post',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    }).done(function (data) {
      $('.fa-cog').css('display', 'none');
      exquisForm.reset();

      if (data['nouveau']) {
        $('#exquis-container').hide();
        $('#new-exquis').html("<p>" + data['response'] + "</p>" + "<p>" + data['nouveau'] + "</p>" + '<p><a class="btn btn-secondary" href="#" onClick="document.location.reload()">cliquez pour recommencer.</a></p>');
      } else {
        alert(data['response']);
        document.location.reload();
      }
    }).fail(function (data) {
      $('.fa-cog').css('display', 'none');
      exquisForm.reset(); //var errors = data.responseJSON.message + '\n';

      var errors = '';
      $.each(data.responseJSON.errors, function (key, value) {
        errors += value + '\n';
      });
      alert('La requête n\'a pas abouti.\n' + errors);
    });
  });
  /* Bouton retour en haut */
  // browser window scroll (in pixels) after which the "back to top" link is shown

  var offset = 300,
      //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
  offset_opacity = 1200,
      //duration of the top scrolling animation (in ms)
  scroll_top_duration = 1000,
      //grab the "back to top" link
  $back_to_top = $('.cd-top'),
      $rubrique = $('.heading.first').first(),
      $paddingTop = parseInt($rubrique.css('padding-top')),
      $paddingBottom = parseInt($rubrique.css('padding-bottom')); //Smooth scroll

  $(document).on('click', '.more', function (event) {
    event.preventDefault();
    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, scroll_top_duration);
  }); //hide or show the "back to top" link

  $(window).scroll(function () {
    //console.log($(this).scrollTop());
    $(this).scrollTop() > offset ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');

    if ($(this).scrollTop() > offset_opacity) {
      $back_to_top.addClass('cd-fade-out');
    } else if ($(this).scrollTop() < offset_opacity) {
      $back_to_top.removeClass('cd-fade-out');
    }
    /* reduction du header en scrollant
     if($(this).scrollTop() > 10){
      $rubrique.css({
        paddingTop: $paddingTop-200,
        paddingBottom: $paddingBottom-150
      });
    }else if($(this).scrollTop() < 2){
      $rubrique.css({
        paddingTop: $paddingTop,
        paddingBottom: $paddingBottom
      });
    }*/

  }); //smooth scroll to top

  $back_to_top.on('click', function (event) {
    event.preventDefault();
    $('body,html').animate({
      scrollTop: 0
    }, scroll_top_duration);
  });
});

/***/ }),

/***/ "./Themes/baramots/assets/sass/styles.scss":
/*!*************************************************!*\
  !*** ./Themes/baramots/assets/sass/styles.scss ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/assets/sass/admin.scss":
/*!******************************************!*\
  !*** ./resources/assets/sass/admin.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*********************************************************************************************************************************!*\
  !*** multi ./Themes/baramots/assets/js/scripts.js ./Themes/baramots/assets/sass/styles.scss ./resources/assets/sass/admin.scss ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /home/sylvestre/www/modules/modules-chemins/Themes/baramots/assets/js/scripts.js */"./Themes/baramots/assets/js/scripts.js");
__webpack_require__(/*! /home/sylvestre/www/modules/modules-chemins/Themes/baramots/assets/sass/styles.scss */"./Themes/baramots/assets/sass/styles.scss");
module.exports = __webpack_require__(/*! /home/sylvestre/www/modules/modules-chemins/resources/assets/sass/admin.scss */"./resources/assets/sass/admin.scss");


/***/ })

/******/ });