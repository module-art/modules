/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/tools/popsuggest/popover-suggest.min.js":
/*!********************************************************!*\
  !*** ./public/tools/popsuggest/popover-suggest.min.js ***!
  \********************************************************/
/***/ (() => {

(function (c) {
  c.fn.popsuggest = function (g) {
    var h = c.extend({
      placement: "right",
      dataUrl: "data.html",
      chainLength: 2,
      rows: 8,
      separator: ",",
      html: false,
      addData: {}
    }, g);
    var f = "ok",
      i = -1,
      e = 0;
    dataUrl = h.dataUrl, separator = h.separator, allowHtml = h.html, addData = h.addData, rows = h.rows;
    this.popover({
      placement: h.placement,
      trigger: "manual",
      html: true
    });
    this.click(function (j) {
      if (this.value.length >= h.chainLength) {
        d(this, this.value);
      }
    }).keyup(function (k) {
      var j = "";
      if (k.keyCode == 40 || k.keyCode == 38 || k.keyCode == 13) {
        switch (k.keyCode) {
          case 40:
            i += 1;
            break;
          case 38:
            i -= 1;
            break;
        }
        f = a(k.keyCode, i, this);
        if (f == "over") {
          i = -1;
        }
      } else {
        j = this.value;
        if (j.length >= h.chainLength) {
          i = -1;
          d(this, j);
        } else {
          c(this).popover("hide");
          c(".popover").remove();
        }
      }
    });
    c("body").on("click", function (j) {
      c('[data-toggle="popover"]').each(function () {
        if (!c(this).is(j.target) && c(this).has(j.target).length === 0 && c(".popover").has(j.target).length === 0) {
          c(this).popover("hide");
        }
      });
    });
    return this;
  };
  function d(f, e) {
    c("body").css("cursor", "wait");
    c(f).css("cursor", "wait");
    c.ajax({
      method: "post",
      url: dataUrl,
      data: c.extend({
        chain: e
      }, addData)
    }).done(function (n) {
      c("body").css("cursor", "default");
      c(f).css("cursor", "default");
      var m = n.split(separator),
        j = m.length,
        k = document.createElement("div"),
        g = rows,
        h;
      for (h = 0; h < j; h++) {
        if (h % g == 0) {
          if (h == g) {
            k.appendChild(o);
          }
          var o = document.createElement("div");
          o.style.display = "inline-block";
          o.style.marginTop = "10px";
          o.style.marginLeft = "10px";
          o.style.marginRight = "10px";
          o.style.cursor = "pointer";
          o.style.verticalAlign = "top";
        }
        var l = document.createElement("p");
        l.className = "result";
        if (allowHtml && !m[h].match(/<\/?p>/)) {
          l.innerHTML = m[h];
        } else {
          l.appendChild(document.createTextNode(m[h]));
        }
        o.appendChild(l);
        if (h % g == 0 && h > 0) {
          k.appendChild(o);
        }
      }
      if (h < g) {
        k.appendChild(o);
      }
      c(f).attr("data-content", k.outerHTML);
      c(f).popover("show");
      setTimeout(function () {
        b(f);
      }, 200);
    }).fail(function (g) {
      console.log(g);
      alert("Oups ! search fail.");
    });
  }
  function b(h) {
    var g = document.querySelectorAll(".result"),
      f = g.length;
    for (var e = 0; e < f; e++) {
      g[e].addEventListener("mouseover", function () {
        this.style.color = "#666";
      }, false);
      g[e].addEventListener("mouseout", function () {
        this.style.color = "black";
      }, false);
      g[e].addEventListener("click", function (i) {
        h.value = i.target.innerHTML;
        c(h).popover("hide");
        c(".popover").remove();
        c(h).trigger("popSelect");
      }, false);
    }
  }
  function a(j, k, h) {
    var g = document.getElementsByClassName("result"),
      f = g.length;
    for (var e = 0; e < f; e++) {
      g[e].style.color = "black";
    }
    if (j == 40 && k < f) {
      g[k].style.color = "#666";
      return "ok";
    } else {
      if (j == 38 && k >= 0) {
        g[k].style.color = "#666";
        return "ok";
      } else {
        if (j == 13 && k >= 0 && k < f) {
          h.value = g[k].innerHTML;
          c(h).popover("hide");
          c(".popover").remove();
          c(h).trigger("popSelect");
          return "ok";
        } else {
          return "over";
        }
      }
    }
  }
})(jQuery);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**************************************!*\
  !*** ./resources/assets/js/admin.js ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _public_tools_popsuggest_popover_suggest_min_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../public/tools/popsuggest/popover-suggest.min.js */ "./public/tools/popsuggest/popover-suggest.min.js");
/* harmony import */ var _public_tools_popsuggest_popover_suggest_min_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_public_tools_popsuggest_popover_suggest_min_js__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

$(document).ready(function () {
  "use strict";

  $('.sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
  });

  /// ---------- TYNIMCE 5.2 ------

  var tinyconf = {
    selector: '.editable',
    inline: true,
    language: 'fr_FR',
    menubar: true,
    branding: false,
    plugins: ['advlist autolink lists link image charmap print preview anchor', 'searchreplace visualblocks fullscreen', 'insertdatetime media table paste code help wordcount '],
    toolbar: 'code | bold italic underline | bullist numlist | forecolor backcolor | link unlink | media image',
    block_formats: 'Header 2=h2;Header 3=h3;Header 4=h4;Header 5=h5;Paragraph=p',
    fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
    paste_as_text: true,
    image_advtab: true,
    entity_encoding: "raw",
    //force_br_newlines : true,
    //force_p_newlines : false,
    //forced_root_block : '', // Needed for 3.x
    valid_elements: '+*[*]',
    relative_urls: false,
    media_live_embeds: true,
    extended_valid_elements: "i[class],a[class|name|href|target|title|onclick|rel],script[type|src],iframe[src|style|width|height|scrolling|marginwidth|marginheight|frameborder],img[class|src|border=0|alt|title|hspace|vspace|width|height|align|style|onmouseover|onmouseout|name],$elements",
    //audio_template_callback: function(data) {
    //return '<audio class="toto" controls>' + '\n<source src="' + data.source1 + '"' + (data.source1mime ? ' type="' + data.source1mime + '"' : '') + ' />\n' + '</audio>';
    //},
    file_picker_callback: function file_picker_callback(callback, value, meta) {
      var x = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
      var y = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
      tinymce.activeEditor.windowManager.openUrl({
        url: '/file-manager/tinymce5',
        title: 'Gestionnaire de fichiers',
        width: x * 0.8,
        height: y * 0.8,
        onMessage: function onMessage(api, message) {
          callback(message.content, {
            text: message.text
          });
        }
      });
    },
    init_instance_callback: function init_instance_callback(editor) {
      blocCallback(editor);
    }
  };
  var tinyconf_rubrique = _objectSpread(_objectSpread({}, tinyconf), {}, {
    selector: '.editrubrique',
    menubar: false,
    toolbar: 'formatselect | bold italic underline | alignleft aligncenter alignright | code',
    init_instance_callback: function init_instance_callback(editor) {
      rubriqueCallback(editor);
    }
  });
  tinymce.init(tinyconf);
  tinymce.init(tinyconf_rubrique);
  function initMceBlocs() {
    tinymce.remove('.editable');
    tinymce.init(tinyconf);
  }

  //insertion des listes par type

  function getTypeContents() {
    var typeContents = $('.type-contents');
    if (typeContents.length > 0) {
      typeContents.each(function () {
        var type = $(this).attr('data-content_type'),
          filtre = $(this).attr('data-filtre'),
          desc = $(this).attr('data-desc');
        $(this).load('/get-type-contents/' + type + '?orderby=' + filtre + '&desc=' + desc, function (response, status, xhr) {
          if (status == "error") {
            console.log(xhr.status + " " + xhr.statusText);
          } else {
            console.log(type + ' est rechargé.');
            initMceBlocs();
            listenToNumBlocs();
            listenToDestroy();
          }
        });
      });
    } else if ($('.type-content').length > 0) {
      initMceBlocs();
      listenToNumBlocs();
      listenToDestroy();
    } else {
      initMceBlocs();
      listenToDestroy();
    }
  }

  //global vars
  var idPage = $('#id_page').html(),
    imageChange = false,
    defaultBackgroundImage = '/storage/' + current_theme + '/files/images/default_background.jpg',
    //current_theme is defined with php in template view file
    wasEdited = false,
    imgWidth = 0,
    maxFileSize = 4096000,
    idCreatedBloc = 0,
    //duration of the top scrolling animation (in ms)
    scroll_top_duration = 1000,
    csrfToken = $('meta[name="csrf-token"]').attr('content'); //get csrf-field in head

  //not working set minimgwidth in template global vars.
  //if(minImgWidth === undefined){
  //var minImgWidth = 1200;
  //}

  $('#add-rubrique').click(function () {
    var globalContainer = document.getElementById('global-wrapper');
    $.ajax({
      method: 'post',
      url: '/coulisses/newrubrique/' + idPage,
      data: {
        _token: csrfToken
      } //token!!!
    }).done(function (data) {
      console.log(data['response']);
      document.location.reload(true);
      /*var newRubrique = document.createElement('div'),
          newAfter = document.createElement('div');
       newRubrique.className = 'rubrique-container';
      newAfter.className = 'container after-rubrique';
       globalContainer.appendChild(newRubrique);
      globalContainer.appendChild(newAfter);
      
      $(newRubrique).load('/coulisses/partial/coulisses/rubrique/'+data['newId'], function(){
        console.log( data['newId'] + ' rubrique actualisée.');
        initMceRubriques();
      });
      reloadBlocs($(newAfter), data['newId']);
      //window.scrollBy(0, window.innerHeight);
      $('body,html').animate({
        scrollTop: window.innerHeight,
        }, scroll_top_duration
      );*/
    }).fail(function () {
      alert('Oups! une erreur a empêché l\'ajout de rubrique.');
    });
  });
  $('#destroy-page').click(function () {
    if (confirm('Tous les contenus de cette page seront supprimés. Êtes vous vraiment sûr?')) {
      $.ajax({
        method: 'delete',
        url: '/coulisses/destroypage/' + idPage,
        data: {
          _token: csrfToken
        } //token!!!
      }).done(function (data) {
        alert(data);
        location.assign('/coulisses');
      }).fail(function () {
        alert('Oups! une erreur a empêché la suppression.');
      });
    }
  });
  $('#publication').click(function () {
    var elem = this;
    $.ajax({
      method: 'post',
      url: '/coulisses/publicationpage/' + idPage,
      data: {
        _token: csrfToken
      } //token!!!
    }).done(function (data) {
      console.log(data);
      var current = elem.innerText == 'Masquer' ? 'Publier' : 'Masquer';
      elem.innerText = current;
    }).fail(function () {
      alert('Oups! une erreur a empêché la publication.');
    });
  });

  //boutons de publication de rubriques normales

  $('.btn-publish').click(function () {
    var idRubrique = $(this).parents('.rubrique-container').first().find('.editrubrique').attr('data-rubrique_id');
    document.body.style.cursor = 'wait';
    togglePublished($(this), 'publicationcontent', idRubrique);
  });
  function togglePublished(nodeBtn, routeUrl, idContent) {
    var nodeStatus = nodeBtn.children().first();
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
        nodeStatus.removeClass('published').addClass('unpublished').html('<i class="fas fa-eye"></i>');
        nodeBtn.attr('title', 'Publier cette rubrique');
      } else {
        nodeStatus.removeClass('unpublished').addClass('published').html('<i class="fas fa-eye-slash"></i>');
        nodeBtn.attr('title', 'Masquer cette rubrique');
      }
    }).fail(function () {
      document.body.style.cursor = 'default';
      alert('Oups! une erreur a empêché la modification.');
    });
  }

  ///------ galleries ------------

  function addGallery(rubriqueId, gallery) {
    var container = $('.after-rubrique[data-rubrique_id=' + rubriqueId + ']').first().find('.markerRow').first(),
      bloc_id = 'rubrique-' + rubriqueId,
      newBloc = '[gallery url="/public/' + current_theme + '/files/galeries/' + gallery + '" type="square"]',
      type = 'gallery',
      action = '/coulisses/bloc/' + bloc_id;
    if (newBloc === undefined) return; //exit to avoid TypeError

    $.ajax({
      url: action,
      method: 'post',
      data: {
        _token: csrfToken,
        texte: newBloc,
        format: type
      },
      dataType: 'json'
    }).done(function (data) {
      console.log(data['response']);
      reloadBlocs(container, rubriqueId);
    }).fail(function () {
      alert('La requête n\'a pas abouti. Êtes-vous bien connecté comme admin?');
    });
  }
  function listenToGetGallery(jQueryObj) {
    var rubriqueId = 0;
    jQueryObj.focus(function () {
      rubriqueId = $(this).parents('.after-rubrique').first().attr('data-rubrique_id');
    });
    jQueryObj.popsuggest({
      placement: 'left',
      dataUrl: '/coulisses/list-galleries',
      separator: '|',
      rows: 6,
      addData: {
        '_token': csrfToken
      }
    }).on("popSelect", function () {
      //alert("Your choice : "+this.value);
      addGallery(rubriqueId, this.value);
    });
  }
  listenToGetGallery($('.select-gallery'));
  listenToAddBloc();
  listenToDestroy();
  colsManager();
  resizeVideos();
  function rubriqueCallback(editor) {
    editor.on('focus', function (e) {
      //console.log(e);
      var tar = $(e.target.bodyElement),
        imageNode = tar.hasClass('imagenode') ? tar : tar.parents('.rubrique-container').find('.imagenode'),
        initBackgroundImage = imageNode.attr('data-image-src'),
        replacement = '<section id="replacement" class="row justify-content-end mb-4"><div class="col-12 col-md-8 col-lg-6 col-xl-5"><div class="card"><div class="card-body">' + '<form method="post" enctype="multipart/form-data" class="" id="replacement-form"><div class="form-group">' + '<label for="image" class="col-form-label">Changer l\'image de fond</label>' + '<div class="input-group mb-2">' + '<div class="input-group-prepend">' + '<div class="input-group-text"><i class="far fa-file-image"></i></div>' + '</div>' + '<input id="image" class="form-control" type="file" name="image" />' + '</div>' + '<div class="form-check mb-2">' + '<input class="form-check-input" type="checkbox" value="1" name="delete_image">' + '<label class="form-check-label" for="delete_image">' + ' Image par défaut' + '</label>' + '</div>' + '<input id="texte" type="hidden" name="texte" />' + '<input type="hidden" name="_token" value="' + csrfToken + '" />' + '<div class="row justify-content-between px-3">' + '<button class="btn btn-primary btn-save" ><i class="fas fa-cog fa-spin fa-lg"></i> Enregistrer</button><button id="btn-cancel" class="btn btn-secondary" >Annuler</button>' + '</div>' + '</form></div></div></div></section>';
      $('.cols-button, .bloc-button').css('display', 'none');
      if ($('#replacement')[0] === undefined) {
        tar.parent().append(replacement);
      }
      //console.log(imageNode);

      imageManage(imageNode, initBackgroundImage);
      $('.btn-save').on('click', function (e) {
        $('.fa-cog').css('display', 'inline-block');
        e.preventDefault();
        $('#texte').val(tar.html());
        var action = "/coulisses/rubrique/" + tar.attr('data-rubrique_id'),
          formData = new FormData($('#replacement-form')[0]);
        $.ajax({
          url: action,
          method: 'post',
          data: formData,
          dataType: 'json',
          //async: false,
          processData: false,
          contentType: false
        }).done(function (data) {
          $('.fa-cog').css('display', 'none');
          console.log(data['response']);
          setTimeout(function () {
            tar.css({
              padding: ''
            });
            $('#replacement').remove();
            $('.cols-button, .bloc-button').css('display', 'block');
            if (parseInt(data['img_deleted'])) {
              imageNode.css({
                backgroundImage: 'url("' + defaultBackgroundImage + '")'
              });
            }
          }, 100);
        }).fail(function (data) {
          $('.fa-cog').css('display', 'none');
          var errors = data.responseJSON.message + '\n';
          $.each(data.responseJSON.errors, function (key, value) {
            errors += value + '\n';
          });
          alert('La requête n\'a pas abouti.\n' + errors);
        });
        resizeVideos();
      });
      $('#btn-cancel').on('click', function (e) {
        e.preventDefault();
        setTimeout(function () {
          tar.css({
            padding: ''
          });
          if (imageChange) imageNode.css('background-image', 'url("' + initBackgroundImage + '")');
          $('#replacement').remove();
          $('.cols-button, .bloc-button').css('display', 'block');
        }, 100);
      });
    }); //close focus event
  }

  function blocCallback(editor) {
    editor.on('focus', function (e) {
      //console.log(e);
      console.log('callback');
      var tar = $(e.target.bodyElement);
      tar.parent().append('<div id="bloc-buttons" class="d-flex justify-content-end"><button class="btn btn-primary btn-save">Enregistrer</button></div>');
      $('.btn-save').on('mousedown', function () {
        var newBloc = tar.html(),
          bloc_id = tar.attr('data-bloc_id'),
          isNewBloc = bloc_id == 0 ? true : false,
          type = '';
        if (newBloc === undefined) return; //exit to avoid TypeError

        if (isNewBloc) {
          type = tar.parent()[0].className == 'col-12' ? 'large' : 'normal';
          bloc_id = 'rubrique-' + tar.parents('.after-rubrique').first().attr('data-rubrique_id');
        }
        var action = '/coulisses/bloc/' + bloc_id;
        $.ajax({
          url: action,
          method: 'post',
          data: {
            _token: csrfToken,
            texte: newBloc,
            format: type
          },
          dataType: 'json'
        }).done(function (data) {
          console.log(data['response']);
          tar.css('border', 'none');
          if (isNewBloc) {
            tar.attr('data-bloc_id', data['newId']);
          }
        }).fail(function () {
          alert('La requête n\'a pas abouti. Êtes-vous bien connecté comme admin?');
        });
        resizeVideos();
      });
    }); //close focus event

    editor.on('blur', function (e) {
      setTimeout(function () {
        $('#bloc-buttons').remove();
      }, 100);
    });
    editor.on('Change', function (e) {
      var tar = $(e.target.bodyElement);
      tar.css('border', '1px red solid');
    });
  }
  function listenToNumBlocs() {
    /* ------- Tempus dominus --------- */

    var dateInputs = $('.editdate');
    var heureInputs = $('.editheure');
    if (dateInputs.length > 0) {
      dateInputs.datetimepicker({
        locale: 'fr',
        format: 'L'
        //debug: true
      });

      dateInputs.on('change.datetimepicker', function (event) {
        //format moment.js object to string date
        //alert(event.date);
        numberSender(moment(event.date).format("YYYYMMDD"), $(this).attr('data-bloc_id'));
      });
    }
    if (heureInputs.length > 0) {
      heureInputs.datetimepicker({
        locale: 'fr',
        format: 'LT'
        //debug: true
      });

      heureInputs.on('change.datetimepicker', function (event) {
        //format moment.js object to string date
        //alert(moment(event.date).format("HHmm"));
        numberSender(moment(event.date).format("HHmm"), $(this).attr('data-bloc_id'));
      });
    }
    $('.editnumber').click(function () {
      var tar = $(this),
        bloc_id = tar.attr('data-bloc_id'),
        $number = tar.html();
      tar.addClass('d-none');
      tar.parent().prepend('<input id="nmber" type="text" value="' + $number + '"/><div id="bloc-buttons"><button class="btn btn-primary btn-save pull-right" >Enregistrer</button></div>');
      var inputNumber = $('#nmber');
      inputNumber.focus();
      inputNumber.blur(function () {
        tar.html($(this).val());
        setTimeout(function () {
          inputNumber.remove();
          $('#bloc-buttons').remove();
          tar.removeClass('d-none');
        }, 100);
      });
      $('.btn-save').click(function () {
        numberSender(inputNumber.val(), bloc_id);
      });
    });
  }
  function numberSender($num, bloc_id) {
    var action = '/coulisses/bloc/' + bloc_id;
    $.ajax({
      url: action,
      method: 'post',
      data: {
        _token: csrfToken,
        texte: $num,
        format: 'date'
      },
      dataType: 'json'
    }).done(function (data) {
      console.log(data['response']);
    }).fail(function () {
      alert('La requête n\'a pas abouti. Êtes-vous bien connecté comme admin?');
    });
  }
  function imageManage(rubriqueNode, initBackgroundImage) {
    var allowedTypes = ['jpg', 'jpeg', 'png'],
      fileInput = document.querySelector('#image'),
      form = document.querySelector('#replacement-form');
    fileInput.addEventListener('change', function () {
      //gestion de l'image miniature

      var imgType,
        files = this.files;
      imgType = files[0].name.split('.');
      imgType = imgType[imgType.length - 1].toLowerCase();
      if (allowedTypes.indexOf(imgType) != -1 && files[0].size < maxFileSize) {
        //createThumbnail(files[0], preview);
        //change background image
        var reader = new FileReader(),
          imgElement;
        reader.readAsDataURL(files[0]);
        reader.addEventListener('load', function () {
          imgElement = document.createElement('img');
          imgElement.src = this.result;
          setTimeout(function () {
            imgWidth = imgElement.naturalWidth; //return 0 when no waiting
            if (imgWidth >= minImgWidth) {
              imageChange = true;
              rubriqueNode.css('background-image', 'url("' + imgElement.src + '")');
              //alert( rubriqueNode.css('background-image') );
            } else {
              alert('Pour avoir un bon rendu sur tout type d\'écran, la largeur de l\'image doit être supérieure à ' + minImgWidth + 'px. Cette image fait ' + imgWidth + 'px.');
              files = [];
              form.reset();
            }
          }, 300);
        }, false);
      } else {
        if (allowedTypes.indexOf(imgType) == -1) {
          alert("Image non valide, il faut un format jpg ou png.");
        } else if (files[0].size >= maxFileSize) {
          alert('Image de taille supérieure à ' + maxFileSize / 1000 + 'ko. Il faut la réduire avec un logiciel adapté.');
        }
        files = [];
        form.reset();
      }
    }, false);
    $('input[name=delete_image]').change(function () {
      if ($(this).prop('checked')) {
        imageChange = true;
        rubriqueNode.css('background-image', 'url("' + defaultBackgroundImage + '")');
      } else {
        imageChange = false;
        rubriqueNode.css('background-image', 'url("' + initBackgroundImage + '")');
      }
    });
  }
  function listenToAddBloc() {
    $('.add-bloc').off();
    $('.change-type').off();
    $('.add-bloc').click(function () {
      var previousRow = $(this).parents(".markerRow").first(),
        cols = previousRow.parent().attr('data-rubrique_cols'),
        type = this.getAttribute('data-format'),
        order = $(this).attr('data-order'),
        newBlocLarge = '<div class="col-12"><button class="btn btn-sm btn-outline-danger btn-destroy" ><i class="fas fa-trash-alt"></i></button><div class="editable" data-bloc_id="0"><h2>Nouveau bloc large</h2></div></div>',
        newBlocNormal = '<div class="col-12 col-md-' + 12 / cols + '"><button class="btn btn-sm btn-outline-danger btn-destroy" ><i class="fas fa-trash-alt"></i></button><div class="editable" data-bloc_id="0"><p>Nouveau paragraphe</p></div></div>';
      if (order == 'asc') {
        if (type == 'large') {
          previousRow.append(newBlocLarge);
        } else if (type == 'normal') {
          previousRow.append(newBlocNormal);
        }
      } else if (order == 'desc') {
        if (type == 'large') {
          previousRow.prepend(newBlocLarge);
        } else if (type == 'normal') {
          previousRow.prepend(newBlocNormal);
        }
      }
      $('.after-rubrique').addClass('not-empty');
      initMceBlocs();
      listenToDestroy();
    });
    $('.change-type').click(function () {
      var container = $(this).parents('.after-rubrique').first(),
        idRubrique = container.attr('data-rubrique_id');
      idRubrique = parseInt(idRubrique);
      $.ajax({
        method: 'post',
        url: '/coulisses/change-type-content/' + idRubrique,
        data: {
          dbAction: $(this).attr('data-dbAction'),
          contentType: $(this).attr('data-contentType'),
          _token: csrfToken
        },
        dataType: 'json'
      }).done(function (data) {
        console.log(data['response']);
        //reloadBlocs(container, idRubrique);
        document.location.reload(true);
      }).fail(function (data) {
        console.log(data);
        alert('Oups! une erreur a empêché la modification');
      });
    });
  }
  function listenToDestroy() {
    $('.btn-destroy').off(); //remove listeners before putting back it
    $('.btn-destroy').click(function () {
      if (confirm('Êtes vous sûr?')) {
        var elem = $(this).parent();
        if (elem.hasClass('rubrique-container')) {
          if (confirm('Tous les blocs associés à cette rubrique seront effacés. Êtes vous vraiment sûr?')) {
            var idRubrique = elem.find('.editrubrique').attr('data-rubrique_id');
            $.ajax({
              method: 'post',
              url: '/coulisses/destroyrubrique/' + idRubrique,
              data: {
                _token: csrfToken
              } //token!!!
            }).done(function (data) {
              elem.next().remove();
              elem.remove();
              console.log(data);
            }).fail(function () {
              alert('Oups! une erreur a empêché la suppression.');
            });
          }
        } else if (elem.hasClass('type-content')) {
          var idRubrique = $(this).attr('data-rubrique_id');
          $.ajax({
            method: 'post',
            url: '/coulisses/destroyinsertedrubrique/' + idRubrique,
            data: {
              _token: csrfToken
            } //token!!!
          }).done(function (data) {
            elem.remove();
            console.log(data);
          }).fail(function () {
            alert('Oups! une erreur a empêché la suppression.');
          });
        } else if (elem.hasClass('type-index')) {
          var idRubrique = $(this).attr('data-rubrique_id');
          $.ajax({
            method: 'post',
            url: '/coulisses/destroyinsertedrubrique/' + idRubrique,
            data: {
              _token: csrfToken
            } //token!!!
          }).done(function (data) {
            elem.parents('tr').remove();
            console.log(data);
            document.location.reload(true);
          }).fail(function () {
            alert('Oups! une erreur a empêché la suppression.');
          });
        } else {
          //var idBloc = elem.attr('data-bloc_id');
          var idBloc = $(this).next().attr('data-bloc_id');
          if (idBloc != 0) {
            $.ajax({
              method: 'post',
              url: '/coulisses/destroybloc/' + idBloc,
              data: {
                _token: csrfToken
              } //token!!!
            }).done(function (data) {
              elem.remove();
              console.log(data);
            }).fail(function () {
              alert('Oups! une erreur a empêché la suppression.');
            });
          } else {
            elem.remove();
          }
        }
        $('.add-bloc').off();
        listenToAddBloc();
      }
    });
  }
  function colsManager() {
    $('.change-col').off();
    $('.ranger').off();
    $('.inverser').off();
    $('.change-col').click(function () {
      var previousRow = $(this).parents(".markerRow").first(),
        nbCols = parseInt(this.getAttribute('data-colonnes')),
        newCols = "",
        targetChildren = previousRow.find('.col-12').not('.large-bloc'),
        rubrique_id = previousRow.parent().attr('data-rubrique_id');
      rubrique_id = parseInt(rubrique_id);
      previousRow.children('.clearfix').remove();
      targetChildren.attr('class', 'col-12');
      switch (nbCols) {
        case 1:
          newCols = '';
          break;
        case 2:
          newCols = 'col-md-6';
          targetChildren.addClass(newCols);
          break;
        case 3:
          newCols = 'col-md-6 col-lg-4';
          targetChildren.addClass(newCols);
          break;
      }
      //alert(newCols);

      $.ajax({
        method: 'post',
        url: '/coulisses/cols/' + rubrique_id,
        data: {
          cols: nbCols,
          _token: csrfToken
        },
        //token!!!
        dataType: 'json'
      }).done(function (data) {
        console.log(data['response']);
        colsManager();
        previousRow.parent().attr('data-rubrique_cols', nbCols);
        setTimeout(function () {
          resizeVideos();
        }, 900);
      }).fail(function (data) {
        alert('Oups! une erreur a empêché la modification');
      });
    });
    $('.ranger').click(function () {
      var container = $(this).parents('.after-rubrique').first(),
        idRubrique = container.attr('data-rubrique_id');
      idRubrique = parseInt(idRubrique);
      reloadBlocs(container, idRubrique);
    });
    $('.inverser').click(function () {
      var container = $(this).parents('.after-rubrique').first(),
        idRubrique = container.attr('data-rubrique_id');
      $.ajax({
        method: 'post',
        url: '/coulisses/ascdesc/' + idRubrique,
        data: {
          _token: csrfToken
        } //token!!!
      }).done(function (data) {
        console.log(data);
        parseInt(idRubrique);
        reloadBlocs(container, idRubrique);
      }).fail(function () {
        alert('Oups! une erreur a empêché l\'inversion.');
      });
    });
    $('.deplacer').click(function () {
      $('.editable').off(); //remove listeners on others blocs
      $('.editrubrique').off();
      $('.btn-destroy').off();
      $('.add-bloc').off();
      var container = $(this).parents('.after-rubrique').first(),
        idRubrique = container.attr('data-rubrique_id');
      container.load('/coulisses/partial_drag/' + idRubrique, function (response, status, xhr) {
        if (status == "error") {
          console.log(xhr.statusText);
        } else {
          colsManager();
          dragdrop();
        }
      });
    });
  }
  function resizeVideos() {
    var videos = $('.editable iframe');
    if (videos.length != 0) {
      videos.first().parent().css('width', '100%');
      videos.each(function () {
        $(this).removeAttr('style');
        var wid = $(this).width();
        $(this).width(Math.round(wid));
        $(this).height(Math.round(wid * 9 / 16));
      });
    }
  }
  function reloadBlocs(container, idRubrique) {
    container.load('/coulisses/partial_bloc/' + idRubrique, function (response, status, xhr) {
      if (status == "error") {
        console.log(xhr.statusText);
      } else {
        console.log('Blocs de la rubrique ' + idRubrique + ' actualisés.');
        //use that
        //getTypeContents();
        //or that
        initMceBlocs();
        listenToNumBlocs();
        //not both
        colsManager();
        listenToDestroy();
        listenToAddBloc();
        resizeVideos();
      }
    });
  }
  function dragdrop() {
    //partie 1- réorganisation, drag&drop.

    function insertAfter(newElement, afterElement) {
      var parent = afterElement.parentNode;
      if (parent.lastChild === afterElement) {
        parent.appendChild(newElement);
      } else {
        parent.insertBefore(newElement, afterElement.nextSibling);
      }
    }
    function cleanDropZone() {
      var dropzones = $('.dropzone'),
        dropzonesLen = dropzones.length;
      if (dropzonesLen > 0) {
        dropzones.css('width', '2px');
        setTimeout(function () {
          dropzones.remove();
        }, 700);
      }
    }
    var dragged,
      numdrag,
      numover,
      finalPlace,
      dropzone,
      rubrique = document.getElementById('drag-mode'),
      rubrique_id = rubrique.dataset.id,
      Jelements = $('.dropy'),
      elements = document.getElementsByClassName('dropy'),
      elemlen = elements.length;
    for (var i = 0; i < elemlen; i++) {
      elements[i].addEventListener('dragstart', function (event) {
        //alert('event dragstart');
        numdrag = parseInt(this.dataset.position);
        event.dataTransfer.setData('text/plain', '4Rt89dhMx'); //obligatoire pour firefox
        dragged = event.target;
        event.target.style.opacity = "0.5";
      }, false);
    }
    function dragEnters() {
      Jelements.off();
      Jelements.on('dragenter', function (event) {
        cleanDropZone();
        event.stopPropagation();
        //alert('event dragenter');

        finalPlace = parseInt(this.dataset.place);
        numover = parseInt(this.dataset.position);
        dropzone = document.createElement('div');
        dropzone.className = dragged.parentNode.className + ' dropzone';
        dropzone.innerHTML = '<div class="indropzone" style = "height: ' + dragged.clientHeight + 'px" ></div>';
        dropzone.style.width = '2px';
        if (numdrag > numover) {
          //alert(numdrag+'=> cas 1 '+numover);
          rubrique.insertBefore(dropzone, this.parentElement);
        } else if (numdrag < numover) {
          //alert(numdrag+'=> cas 2 '+numover);
          insertAfter(dropzone, this.parentElement);
        }
        $(this).off();
        dropzone.addEventListener("transitionend", function (event) {
          //alert('end');
          dropZone(dropzone);
        }, false);
        setTimeout(function () {
          dropzone.style = null;
        }, 5);
      });
    }
    dragEnters();
    function dropZone(dropzone) {
      dropzone.addEventListener("dragover", function (event) {
        //alert('dragover');
        // prevent default to allow drop
        event.preventDefault();
      }, false);
      dropzone.addEventListener('drop', function (event) {
        event.preventDefault();
        //alert('drop');

        if (event.dataTransfer.getData('text/plain') == '4Rt89dhMx') {
          //alert(event.target.className);
          var transitNode = dragged.parentNode.cloneNode(true),
            initPlace = parseInt(dragged.dataset.place),
            container = $(this).parents('.after-rubrique').first();
          rubrique.replaceChild(transitNode, dragged.parentNode);
          setTimeout(function () {
            rubrique.replaceChild(dragged.parentNode, event.target.parentNode);
            transitNode.style.width = '2px';
          }, 5);
          setTimeout(function () {
            rubrique.removeChild(transitNode);
            cleanDropZone();
            dragged.style.opacity = "1";
            dragEnters();
            //alert(initPlace + ' -> ' + finalPlace + '  ' + rubrique_id);

            $.ajax({
              method: 'post',
              url: '/coulisses/moveblock/' + rubrique_id,
              data: {
                init_place: initPlace,
                final_place: finalPlace,
                _token: $('[name="csrf-token"]').attr('content')
              },
              dataType: 'json'
            }).done(function (data) {
              console.log(data['response']);
              //location.reload();
              reloadBlocs(container, rubrique_id);
            }).fail(function (data) {
              console.log(data);
              alert('Oups! une erreur a empêché la modification');
            });
          }, 705);
        }
      }, false);
    }
    document.addEventListener('dragend', function () {
      //if (dragged.className=='dropy'){
      //alert('dragend');
      //}
      cleanDropZone();
      dragged.style.opacity = "1";
      dragEnters();
    }, false);
    document.addEventListener("dragover", function (event) {
      if (event.clientY < 100) {
        window.scrollBy(0, -10);
      } else if (event.clientY > window.innerHeight - 100) {
        window.scrollBy(0, 10);
      }
    }, false);
  } //end drag&drop function
});
})();

/******/ })()
;