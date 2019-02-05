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
      loop: true
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
  //$(document).on('click', 'a[href^="#"]', function (event) {
  //event.preventDefault();

  //$('html, body').animate({
  //scrollTop: $($.attr(this, 'href')).offset().top
  //}, scroll_top_duration);
  //});

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

  $('.slick-wrapper').slick({
    lazyLoad: 'ondemand',
    //dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1
    //prevArrow: '<button type="button" class=""><i class="fas fa-chevron-left"></i>Previous</button>',
    //adaptiveHeight: true
  });

  $('.slick-wrapper-logement').slick({
    lazyLoad: 'ondemand',
    //dots: true,
    infinite: true,
    //arrows: false,
    speed: 1000,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 6000
    //adaptiveHeight: true
  });

  /*--- page réservation ---*/
  if (parseInt($('#id_page').html()) == 5) {
    $('#datepicker1').datetimepicker({
      locale: 'fr',
      format: 'L',
      minDate: moment(),
      widgetPositioning: {
        horizontal: 'right'
      }
    });
    $('#datepicker2').datetimepicker({
      locale: 'fr',
      format: 'L',
      widgetPositioning: {
        horizontal: 'right'
      },
      useCurrent: false
    });
    $("#datepicker1").on("change.datetimepicker", function (e) {
      $('#datepicker2').datetimepicker('minDate', e.date);
    });
    $("#datepicker2").on("change.datetimepicker", function (e) {
      $('#datepicker1').datetimepicker('maxDate', e.date);
    });
  }

  /*--- page calendrier ---*/
  if (parseInt($('#id_page').html()) == 6) {

    var $now = '',
        jsonAllDates = {};
    $("#datepicker3").on("change.datetimepicker", function (e) {
      $now = e.date;
      //with month
      //getDates($now.format("YYYY-MM-01"));
      getDates();
    });

    setTimeout(function () {
      $('.picker-switch').removeAttr('data-action');
      $(".next").on("click", function (e) {
        //$now = $now.clone().add(1, 'month');
        console.log(jsonAllDates);
        markDays(jsonAllDates);
      });
      $(".prev").on("click", function (e) {
        //$now = $now.clone().subtract(1, 'month');
        markDays(jsonAllDates);
      });
    }, 100);
    $('#datepicker3').datetimepicker({
      locale: 'fr',
      format: 'L',
      inline: true
      //sideBySide: true
    });
  }

  function getDates() {
    jQuery.ajax({
      method: 'post',
      url: '/getdates',
      data: {
        _token: $('[name="csrf-token"]').attr('content'),
        logement_id: 'all'
      },
      dataType: 'json'
    }).done(function (data) {
      //console.log(data);
      jsonAllDates = data;
      markDays(jsonAllDates);
    }).fail(function (data) {
      var errors = data.responseJSON.message + '\n';
      $.each(data.responseJSON.errors, function (key, value) {
        errors += value + '\n';
      });
      alert('Echec de chargement des dates.\n' + errors);
    });
  }

  function markDays(data) {
    var dataLength = data.length,
        datesLength = 0,
        dates;
    setTimeout(function () {
      $('.day').append('<div class="pastille-container"></div>');
      for (var i = 0; i < dataLength; i++) {
        //for logements
        //console.log(data[i].logement_id);
        var color = data[i].color;
        dates = data[i].dates;
        datesLength = dates.length;
        for (var y = 0; y < datesLength; y++) {
          //for reservations
          var interDates = moment(dates[y].arrive);
          //console.log(dates[y].arrive);
          //console.log(dates[y].depart);
          $('td[data-day="' + interDates.format("DD/MM/YYYY") + '"] .pastille-container').append('<div class="pastille-logement" style="background-color: ' + color + '"></div>');
          while (interDates.isBefore(dates[y].depart)) {
            interDates = interDates.clone().add(1, 'day');
            //console.log(interDates.format("DD/MM/YYYY"));
            $('td[data-day="' + interDates.format("DD/MM/YYYY") + '"] .pastille-container').append('<div class="pastille-logement" style="background-color: ' + color + '"></div>');
          }
        } //for reservations
      } //for logements
    }, 150);
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