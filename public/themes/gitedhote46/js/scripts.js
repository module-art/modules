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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
__webpack_require__(2);
__webpack_require__(3);
module.exports = __webpack_require__(4);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

$(document).ready(function () {

  //fancybox
  $('.gallery').each(function () {
    $('.fancy', this).fancybox({
      transitionEffect: "slide",
      closeExisting: true,
      loop: false
    });
  });

  $('#global-wrapper').fadeIn(500);

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
      $paddingBottom = parseInt($rubrique.css('padding-bottom'));

  //Smooth scroll
  $(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, scroll_top_duration);
  });

  //hide or show the "back to top" link
  $(window).scroll(function () {
    //console.log($(this).scrollTop());
    $(this).scrollTop() > offset ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
    if ($(this).scrollTop() > offset_opacity) {
      $back_to_top.addClass('cd-fade-out');
    } else if ($(this).scrollTop() < offset_opacity) {
      $back_to_top.removeClass('cd-fade-out');
    }
  });

  //smooth scroll to top
  $back_to_top.on('click', function (event) {
    event.preventDefault();
    $('body,html').animate({
      scrollTop: 0
    }, scroll_top_duration);
  });

  if ($('.diapo-accueil').length > 0) {
    setBgImage();
    $('#diapo-control').click(function (e) {
      e.preventDefault();
      if ($(this).html().match(/pause/)) {
        $(this).html('<i class="fas fa-play"></i>');
        $('.li-active .cover-background').css({
          "animation-play-state": "paused",
          "-webkit-animation-play-state": "paused"
        });
      } else {
        $(this).html('<i class="fas fa-pause"></i>');
        $('.li-active .cover-background').css({
          "animation-play-state": "running",
          "-webkit-animation-play-state": "running"
        });
      }
    });
  }

  function setBgImage() {
    $('.li-active').on('animationiteration', function () {
      $(this).off();
      $(this).removeClass('li-active');
      if ($(this).next().hasClass('slideshow-item')) {
        $(this).next().addClass('li-active');
      } else {
        $('.slideshow-item').first().addClass('li-active');
      }
      setTimeout(function () {
        setBgImage();
      }, 200);
    });
  }
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);