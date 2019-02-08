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

/***/ "./resources/assets/common/sass/admin.scss":
/*!*************************************************!*\
  !*** ./resources/assets/common/sass/admin.scss ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/views/themes/gitedhote46/assets/js/scripts.js":
/*!*****************************************************************!*\
  !*** ./resources/views/themes/gitedhote46/assets/js/scripts.js ***!
  \*****************************************************************/
/*! no static exports found */
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
  $('#global-wrapper').fadeIn(500); //insertion des liste par type

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
      $paddingBottom = parseInt($rubrique.css('padding-bottom')); //Smooth scroll
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
  }); //smooth scroll to top

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
    slidesToShow: 1 //prevArrow: '<button type="button" class=""><i class="fas fa-chevron-left"></i>Previous</button>',
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
    autoplaySpeed: 6000 //adaptiveHeight: true

  });
  /*--- page réservation ---*/

  if (parseInt($('#id_page').html()) == 5) {
    var jsonAllDates = {};
    $('input[name="parent_id"]').click(function () {
      //alert($(this).val());
      getDates($(this).val()); //$('.day').removeClass('cross disabled');
      //markDateWidget(jsonAllDates);
    });
    $('div[data-toggle="datetimepicker"]').click(function () {
      markDateWidget(jsonAllDates);
      setTimeout(function () {
        $(".next").off;
        $(".next").on("click", function (e) {
          markDateWidget(jsonAllDates);
        });
        $(".prev").off;
        $(".prev").on("click", function (e) {
          markDateWidget(jsonAllDates);
        });
      }, 100);
    });
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
      markDateWidget(jsonAllDates);
    });
    $("#datepicker2").on("change.datetimepicker", function (e) {
      $('#datepicker1').datetimepicker('maxDate', e.date);
      markDateWidget(jsonAllDates);
    });
  }

  function markDateWidget(dates) {
    var datesLength = dates.length,
        last;
    setTimeout(function () {
      for (var i = 0; i < datesLength; i++) {
        //for reservations
        var interDates = moment(dates[i].arrive); //console.log(dates[i].arrive);
        //console.log(dates[i].depart);

        $('td[data-day="' + interDates.format("DD/MM/YYYY") + '"]').addClass('cross');

        while (interDates.isBefore(dates[i].depart)) {
          interDates = interDates.clone().add(1, 'day'); //console.log(interDates.format("DD/MM/YYYY"));

          last = $('td[data-day="' + interDates.format("DD/MM/YYYY") + '"]').addClass('disabled');
        }

        last.removeClass('disabled').addClass('cross');
      } //for reservations

    }, 100);
  }
  /*--- page calendrier ---*/


  if (parseInt($('#id_page').html()) == 6) {
    var $now = '',
        jsonAllDates = {};
    $("#datepicker3").on("change.datetimepicker", function (e) {
      $now = e.date; //with month
      //getDates($now.format("YYYY-MM-01"));

      getDates('all');
    });
    setTimeout(function () {
      $('.picker-switch').removeAttr('data-action');
      $(".next").on("click", function (e) {
        //$now = $now.clone().add(1, 'month');
        //console.log(jsonAllDates);
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
      inline: true //sideBySide: true

    });
  }

  function getDates(logement) {
    jQuery.ajax({
      method: 'post',
      url: '/getdates',
      data: {
        _token: $('[name="csrf-token"]').attr('content'),
        logement_id: logement
      },
      dataType: 'json'
    }).done(function (data) {
      jsonAllDates = data; //console.log(jsonAllDates);

      if (logement == 'all') {
        markDays(jsonAllDates);
      }
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
          var interDates = moment(dates[y].arrive); //console.log(dates[y].arrive);
          //console.log(dates[y].depart);

          $('td[data-day="' + interDates.format("DD/MM/YYYY") + '"] .pastille-container').append('<div class="pastille-logement" style="background-color: ' + color + '"></div>');

          while (interDates.isBefore(dates[y].depart)) {
            interDates = interDates.clone().add(1, 'day'); //console.log(interDates.format("DD/MM/YYYY"));

            $('td[data-day="' + interDates.format("DD/MM/YYYY") + '"] .pastille-container').append('<div class="pastille-logement" style="background-color: ' + color + '"></div>');
          }
        } //for reservations

      } //for logements

    }, 150);
  }
  /*--- page contact ---*/


  if (parseInt($('#id_page').html()) == 2) {
    var init_gis = function init_gis() {
      // Charger le javascript de GIS une seule fois si plusieurs carte
      if (typeof jQgisloader == "undefined") {
        jQgisloader = jQuery.ajax({
          url: '/js/gis.js',
          dataType: 'script',
          cache: true
        });
      } // et initialiser la carte (des que js GIS charge et des que DOM ready)


      jQgisloader.done(function () {
        jQuery(function () {
          map1 = new L.Map.Gis('map', {
            mapId: '1',
            callback: typeof callback_map1 === "function" ? callback_map1 : false,
            center: [44.577326, 2.024025],
            zoom: 12,
            maxZoom: 19,
            scrollWheelZoom: true,
            zoomControl: true,
            fullscreenControl: false,
            scaleControl: false,
            overviewControl: false,
            layersControl: true,
            layersControlOptions: {
              collapsed: true
            },
            noControl: false,
            utiliser_bb: false,
            affiche_points: true,
            tooltip: false,
            cluster: false,
            clusterOptions: {
              disableClusteringAtZoom: 0,
              showCoverageOnHover: false,
              spiderfyOnMaxZoom: false,
              maxClusterRadius: 80,
              singleMarkerMode: false
            },
            pathStyles: null,
            autocenterandzoom: false,
            openId: false,
            localize_visitor: false,
            localize_visitor_zoom: 7,
            centrer_fichier: true,
            kml: false,
            gpx: false,
            geojson: false,
            topojson: false,
            options: []
          }); // add Stamen Watercolor to map.
          // Stamen.Toner
          // CartoDB.DarkMatter
          // OpenStreetMap.HOT
          //L.tileLayer.provider('Stamen.Toner').addTo(map1);
          //L.tileLayer.provider('OpenStreetMap.HOT').addTo(map1);

          var url = window.location.href.split('/');
          url = url[url.length - 1];
          var markerIcon = L.icon({
            iconUrl: '/themes/gitedhote46/images/marker.png',
            //shadowUrl: '/themes/gitedhote46/images/shadow.png',
            iconSize: [50, 45],
            // size of the icon
            //shadowSize:   [36, 13], // size of the shadow
            iconAnchor: [13, 26] // point of the icon which will correspond to marker's location
            //shadowAnchor: [0, 13],  // the same for the shadow
            //popupAnchor:  [0, -26] // point from which the popup should open relative to the iconAnchor

          });
          L.marker([44.557326, 2.023915], {
            icon: markerIcon
          }).addTo(map1);
        });
      });
    };

    var map1;
    var jQgisloader;

    if (typeof jQuery.ajax == "undefined") {
      jQuery(init_gis);
    } else {
      init_gis();
    }
  }
});

/***/ }),

/***/ "./resources/views/themes/gitedhote46/assets/sass/leaflet.scss":
/*!*********************************************************************!*\
  !*** ./resources/views/themes/gitedhote46/assets/sass/leaflet.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/views/themes/gitedhote46/assets/sass/styles.scss":
/*!********************************************************************!*\
  !*** ./resources/views/themes/gitedhote46/assets/sass/styles.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/views/themes/gitedhote46/assets/sass/tiny_custom.scss":
/*!*************************************************************************!*\
  !*** ./resources/views/themes/gitedhote46/assets/sass/tiny_custom.scss ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./resources/views/themes/gitedhote46/assets/js/scripts.js ./resources/views/themes/gitedhote46/assets/sass/styles.scss ./resources/views/themes/gitedhote46/assets/sass/tiny_custom.scss ./resources/assets/common/sass/admin.scss ./resources/views/themes/gitedhote46/assets/sass/leaflet.scss ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /home/sylvestre/www/modules/modules-chemins/resources/views/themes/gitedhote46/assets/js/scripts.js */"./resources/views/themes/gitedhote46/assets/js/scripts.js");
__webpack_require__(/*! /home/sylvestre/www/modules/modules-chemins/resources/views/themes/gitedhote46/assets/sass/styles.scss */"./resources/views/themes/gitedhote46/assets/sass/styles.scss");
__webpack_require__(/*! /home/sylvestre/www/modules/modules-chemins/resources/views/themes/gitedhote46/assets/sass/tiny_custom.scss */"./resources/views/themes/gitedhote46/assets/sass/tiny_custom.scss");
__webpack_require__(/*! /home/sylvestre/www/modules/modules-chemins/resources/assets/common/sass/admin.scss */"./resources/assets/common/sass/admin.scss");
module.exports = __webpack_require__(/*! /home/sylvestre/www/modules/modules-chemins/resources/views/themes/gitedhote46/assets/sass/leaflet.scss */"./resources/views/themes/gitedhote46/assets/sass/leaflet.scss");


/***/ })

/******/ });