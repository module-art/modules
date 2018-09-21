$(document).ready(function()
{
  $('.sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
  });

  //global vars
  var idPage = $('#id_page').html(),
      imageChange = false,
      wasEdited = false,
      imgWidth = 0,
      maxFileSize = 4096000,
      minImgWidth = 3200,
      idCreatedBloc = 0,
      //duration of the top scrolling animation (in ms)
      scroll_top_duration = 1000,
      csrfToken = $('meta[name="csrf-token"]').attr('content');//get csrf-field in head

  $('#add-rubrique').click(function(){

    var globalContainer = document.getElementById('global-wrapper');

    $.ajax({
        method: 'post',
        url: '/coulisses/newrubrique/'+ idPage,
        data: { _token: csrfToken},//token!!!
    })
    .done(function(data) {
      console.log(data['response']);
      //location.assign($('#current_page').attr('href'));
      var newRubrique = document.createElement('div'),
          newAfter = document.createElement('div');

      newRubrique.className = 'rubrique-container';
      newAfter.className = 'container after-rubrique';

      globalContainer.appendChild(newRubrique);
      globalContainer.appendChild(newAfter);
      
      $(newRubrique).load('/coulisses/partial/coulisses/rubrique/'+data['newId'], function(){
        console.log( data['newId'] + ' rubrique actualisée.');
        initMceRubriques();
      });
      $(newAfter).load('/coulisses/partial_bloc/'+data['newId'], function(){
        console.log( data['newId'] + ' blocs actualisés.');
        initMceBlocs();
        colsManager();
        listenToDestroy();
        listenToAddBloc();
        resizeVideos();
      });
      //window.scrollBy(0, window.innerHeight);
      $('body,html').animate({
        scrollTop: window.innerHeight,
        }, scroll_top_duration
      );
    })
    .fail(function() {
      alert('Oups! une erreur a empêché l\'ajout d\'un rubrique.');
    });
  
  });

  $('#destroy-page').click(function(){

    if(confirm('Tous les contenus de cette page seront supprimés. Êtes vous vraiment sûr?')){

      $.ajax({
          method: 'post',
          url: '/coulisses/destroypage/'+ idPage,
          data: { _token: csrfToken},//token!!!
      })
      .done(function(data) {
        alert(data);
        location.assign('/coulisses/accueil');
      })
      .fail(function() {
        alert('Oups! une erreur a empêché la suppression.');
      });
    }
  });

  $('#publication').click(function(){

    var elem = this;

    $.ajax({
        method: 'post',
        url: '/coulisses/publicationpage/'+ idPage,
        data: { _token: csrfToken},//token!!!
    })
    .done(function(data) {
      console.log(data);
      var current = elem.innerText == 'Masquer'? 'Publier' : 'Masquer';
      elem.innerText = current;
    })
    .fail(function() {
      alert('Oups! une erreur a empêché la publication.');
    });
  });

  initMceBlocs();
  initMceRubriques();
  listenToAddBloc();
  listenToDestroy();
  colsManager();
  window.onload = function(){
    resizeVideos();
  }

  var uploader = {
    function (blobInfo, success, failure) {
      var xhr, formData;
      xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.open('POST', '/redactorimgupload');
      xhr.onload = function() {
        var json;

        if (xhr.status != 200) {
          failure('HTTP Error: ' + xhr.status);
          return;
        }
        json = JSON.parse(xhr.responseText);

        if (!json || typeof json.location != 'string') {
          failure('Invalid JSON: ' + xhr.responseText);
          return;
        }
        success(json.location);
      };
      formData = new FormData();
      formData.append('file', blobInfo.blob(), fileName(blobInfo));
      xhr.send(formData);
    }
  };

  function initMceRubriques(){
    $('.editrubrique').off();

    tinymce.init({
      selector: '.editrubrique',
      language: 'fr_FR',
      inline: true,
      plugins: 'code image media link',
      //toolbar: 'code',
      images_upload_handler: function (blobInfo, success, failure) {
        var xhr, formData;
        xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open('POST', '/coulisses/redactorimgupload');
        xhr.onload = function() {
          var json;

          if (xhr.status != 200) {
            failure('HTTP Error: ' + xhr.status);
            return;
          }
          json = JSON.parse(xhr.responseText);

          if (!json || typeof json.location != 'string') {
            failure('Invalid JSON: ' + xhr.responseText);
            return;
          }
          success(json.location);
        };
        formData = new FormData();
        formData.append('_token', csrfToken);
        formData.append('file', blobInfo.blob());
        xhr.send(formData);
      },
      init_instance_callback: function (editor) {
        editor.on('focus', function (e) {
          //console.log(e);
          var tar = $(e.target.bodyElement),
              imageNode = $('#global-wrapper'),
              initBackgroundImage = imageNode.css('background-image'),
            replacement = '<section id="replacement" class="row justify-content-center mb-4"><div class="col-12 col-md-8 col-lg-6 col-xl-5"><div class="card"><div class="card-body">'+
            '<form method="post" enctype="multipart/form-data" class="" id="replacement-form"><div class="form-group">'+
            '<label for="image" class="col-form-label">Changer l\'image de fond</label>'+
            '<div class="input-group mb-2">'+
            '<div class="input-group-prepend">'+
            '<div class="input-group-text"><i class="far fa-file-image"></i></div>'+
            '</div>'+
            '<input id="image" class="form-control" type="file" name="image" />'+
            '</div>'+
            '<input id="texte" type="hidden" name="texte" />'+
            '<input type="hidden" name="_token" value="' + csrfToken + '" />'+
            '<button id="btn-save" class="btn btn-primary pull-right" ><i class="fas fa-cog fa-spin fa-lg"></i> Enregistrer</button><button id="btn-cancel" class="btn btn-secondary pull-right" >Annuler</button>'+
            '</form></div></div></div></section>';

          tar.css('padding', '10vh 0 19vh');
          $('.cols-button, .bloc-button').css('display', 'none');
          if($('#replacement')[0] === undefined){
            tar.parent().append(replacement);
          }

          imageManage(imageNode);

          $('#btn-save').click(function(e){

            $('.fa-cog').css('display', 'inline-block');
            e.preventDefault();
            $('#texte').val(tar.html());

            var action="/coulisses/rubrique/" + tar.attr('data-rubrique_id'),
                formData = new FormData($('#replacement-form')[0]);

            $.ajax({
              url: action,
              method: 'post',
              data: formData,
              dataType : 'json',
              //async: false,
              processData: false,
              contentType: false,
            })
            .done(function(data) {
              $('.fa-cog').css('display', 'none');
              console.log(data['response']);
              setTimeout(function(){
                tar.css({
                  padding: ''
                });
                $('#replacement').remove();
                $('.cols-button, .bloc-button').css('display', 'block');
              }, 100)
            })
            .fail(function(data) {
              $('.fa-cog').css('display', 'none');
              var errors = data.responseJSON.message + '\n';
              $.each(data.responseJSON.errors, function (key, value) {
                errors += value + '\n';
              });
              alert('La requête n\'a pas abouti.\n'+errors);
            });

            resizeVideos();
          });
          
          $('#btn-cancel').click(function(e){
            e.preventDefault();
            setTimeout(function(){
              tar.css({
                padding: '',
              });
              imageNode.css({
                backgroundImage: initBackgroundImage
              });
              $('#replacement').remove();
              $('.cols-button, .bloc-button').css('display', 'block');
            }, 100)
          });

        });//close focus event
      }
    });
  }

  function initMceBlocs(){
    $('.editable').off();
    tinymce.init({
      selector: '.editable',
      language: 'fr_FR',
      inline: true,
      plugins: 'code image media link',
      //toolbar: 'code, newdocument, bold, italic, underline, strikethrough, alignleft, aligncenter, alignright, alignjustify, styleselect, formatselect, fontselect, fontsizeselect, cut, copy, paste, bullist, numlist, outdent, indent, blockquote, undo, redo, removeformat, subscript, superscript',
      images_upload_handler: function (blobInfo, success, failure) {
        var xhr, formData;
        xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open('POST', '/coulisses/redactorimgupload');
        xhr.onload = function() {
          var json;

          if (xhr.status != 200) {
            failure('HTTP Error: ' + xhr.status);
            return;
          }
          json = JSON.parse(xhr.responseText);

          if (!json || typeof json.location != 'string') {
            failure('Invalid JSON: ' + xhr.responseText);
            return;
          }
          success(json.location);
        };
        formData = new FormData();
        formData.append('_token', csrfToken);
        formData.append('file', blobInfo.blob());
        xhr.send(formData);
      },
      init_instance_callback: function (editor) {
        editor.on('focus', function (e) {
          //console.log(e);
          var tar = $(e.target.bodyElement);

          tar.parent().append('<div id="bloc-buttons"><button id="btn-save" class="btn btn-primary pull-right" >Enregistrer</button></div>');

          $('#btn-save').click(function(){
            var newBloc = tar.html(),
              bloc_id = tar.attr('data-bloc_id'),
              isNewBloc = bloc_id == 0 ? true : false;
              type = '';

            if(newBloc === undefined) return;//exit to avoid TypeError

            if(isNewBloc){
              type = tar.parent()[0].className == 'col-12' ? 'large' : 'normal';
              bloc_id = 'rubrique-' + tar.parents('.after-rubrique-container').first().prev().children('.editrubrique').attr('data-rubrique_id');
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
              dataType : 'json',
              //async: false,
              //processData: false,
              //contentType: false,
            })
            .done(function(data) {
              console.log(data['response']);
              if(isNewBloc){
                tar.attr('data-bloc_id', data['newId']);
              }
            })
            .fail(function() {
              alert('La requête n\'a pas abouti. Êtes-vous bien connecté comme admin?');
            });

            resizeVideos();
          });

        });//close focus event

        editor.on('blur', function (e) {
          setTimeout(function(){
            $('#bloc-buttons').remove();
          }, 100)
        });
      }
    });//close mce init .editable

  }

  function imageManage(rubriqueNode){
    var allowedTypes = ['jpg', 'jpeg', 'png'],
        fileInput = document.querySelector('#image'),
        form = document.querySelector('#replacement-form');
     
    fileInput.addEventListener('change', function() {

      //gestion de l'image miniature

      var imgType,
          files=this.files;

      imgType = files[0].name.split('.');
      imgType = imgType[imgType.length - 1].toLowerCase();

      if (allowedTypes.indexOf(imgType) != -1 && files[0].size < maxFileSize) {
        //createThumbnail(files[0], preview);
        //change background image
        var reader = new FileReader(),
            imgElement;

        reader.readAsDataURL(files[0]);

        reader.addEventListener('load', function() {

          imgElement = document.createElement('img');
          imgElement.src = this.result;

          setTimeout(function(){
            imgWidth = imgElement.naturalWidth;//return 0 when no waiting
            if(imgWidth >= minImgWidth){
              imageChange = true;
              rubriqueNode.css('background-image', 'url("'+ imgElement.src +'")');
              //alert( rubriqueNode.css('background-image') );
            }else{ 
              alert('Pour avoir un bon rendu sur tout type d\'écran, la largeur de l\'image doit être supérieure à ' + minImgWidth + 'px. Cette image fait ' + imgWidth + 'px.');
              files=[];
              form.reset();
            }
          }, 300)

        }, false);
        
      }else{
        if(allowedTypes.indexOf(imgType) == -1){
          alert("Image non valide, il faut un format jpg ou png.");
        }else if(files[0].size >= maxFileSize){
          alert('Image de taille supérieure à ' + maxFileSize/1000 + 'ko. Il faut la réduire avec un logiciel adapté.');
        }
        files=[];
        form.reset();
      }
    }, false);
  }

  function listenToAddBloc(){

    $('.add-bloc').off();

    $('.add-bloc').click(function(){
      var previousRow = $(this).parents(".row").first(),
          classNames = previousRow.children('[class*="col-md"]').first().attr('class'),
          cols = classNames === undefined? 'col-md-6 ' : classNames.substring(classNames.lastIndexOf(' ')+1),// col-md-6 by default when no first bloc
          type = this.getAttribute('data-format'),
          order = $(this).attr('data-order'),
          newBlocLarge = '<div class="col-12"><button class="btn btn-sm btn-outline-danger btn-destroy" ><i class="fas fa-trash-alt"></i></button><div class="editable" data-bloc_id="0"><h2>Nouveau bloc large</h2></div></div>',
          newBlocNormal = '<div class="col-12 '+ cols +'"><button class="btn btn-sm btn-outline-danger btn-destroy" ><i class="fas fa-trash-alt"></i></button><div class="editable" data-bloc_id="0"><p>Nouveau paragraphe</p></div></div>';

      if(order == 'asc'){
        if(type == 'large'){
          previousRow.append(newBlocLarge);
        }else if(type == 'normal'){
          previousRow.append(newBlocNormal);
        }
        $('body,html').animate({
          scrollTop: window.innerHeight,
          }, scroll_top_duration
        );
      }else if(order == 'desc'){
        if(type == 'large'){
          previousRow.prepend(newBlocLarge);
        }else if(type == 'normal'){
          previousRow.prepend(newBlocNormal);
        }
      }
      $('.after-rubrique').addClass('not-empty');

      initMceBlocs();
      listenToDestroy();
    });

  }

  function listenToDestroy(){

    $('.btn-destroy').off(); //remove listeners before putting back it
    $('.btn-destroy').click(function(){

      if(confirm('Êtes vous sûr?')){
        var elem = $(this).parent();

        if($(this).next().hasClass('editrubrique')){
          if(confirm('Tous les blocs associés à cette rubrique seront effacés. Êtes vous vraiment sûr?')){
            var idRubrique = $(this).next().attr('data-rubrique_id');

            $.ajax({
                method: 'post',
                url: '/coulisses/destroyrubrique/'+ idRubrique,
                data: { _token: csrfToken},//token!!!
            })
            .done(function(data) {
              elem.next().remove();
              elem.remove();
              console.log(data);
            })
            .fail(function() {
              alert('Oups! une erreur a empêché la suppression.');
            });
          }
        }else{
          var idBloc = $(this).next().attr('data-bloc_id');

          if(idBloc != 0){
            $.ajax({
                method: 'post',
                url: '/coulisses/destroybloc/'+ idBloc,
                data: { _token: csrfToken},//token!!!
            })
            .done(function(data) {
              elem.remove();
              console.log(data);
            })
            .fail(function() {
              alert('Oups! une erreur a empêché la suppression.');
            });
          }else{
            elem.remove();
          }
        }
        $('.add-bloc').off();
        listenToAddBloc();
      }

    });
  }

  function colsManager(){
    $('.change-col').off();
    $('.ranger').off();
    $('.inverser').off();

    $('.change-col').click(function(){

      var previousRow = $(this).parents(".row").first(),
          classNames = previousRow.children('[class*="col-"]').first().attr('class'),
          //cols = classNames.substring(classNames.indexOf(' ')+1),
          nbCols = parseInt( this.getAttribute('data-colonnes') ),
          newCols = "",
          targetChildren = previousRow.children('.col-12').not('.large-bloc'),
          rubrique_id = previousRow.parents('.after-rubrique-container').prev().children('.editrubrique').first().attr('data-rubrique_id');
      rubrique_id = parseInt(rubrique_id);
       
      previousRow.children('.clearfix').remove();
      targetChildren.attr('class', 'col-12');

      switch(nbCols){
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
          url: '/coulisses/cols/'+rubrique_id,
          data: { cols: nbCols , _token: csrfToken },//token!!!
          dataType : 'json'
      })
      .done(function(data) {
        console.log(data['response']);
        colsManager();
        setTimeout(function(){
          resizeVideos();
        }, 900);
      })
      .fail(function(data) {
        alert('Oups! une erreur a empêché la modification');
      });
    });

    $('.ranger').click(function(){
      var container = $(this).parents('.after-rubrique').first(),
          idRubrique = container.parent().prev().children('.editrubrique').first().attr('data-rubrique_id');
      idRubrique = parseInt(idRubrique);
      container.load('/coulisses/partial_bloc/'+idRubrique, function(){
        console.log(idRubrique + ' actualisé.');
        initMceBlocs();
        colsManager();
        listenToDestroy();
        listenToAddBloc();
        resizeVideos();
      });
    });

    $('.inverser').click(function(){

      var container = $(this).parents('.after-rubrique').first(),
          idRubrique = container.parent().prev().children('.editrubrique').first().attr('data-rubrique_id');

      $.ajax({
          method: 'post',
          url: '/coulisses/ascdesc/'+ idRubrique,
          data: { _token: csrfToken},//token!!!
      })
      .done(function(data) {
        console.log(data);
        parseInt(idRubrique);
        container.load('/coulisses/partial_bloc/'+idRubrique, function(){
          initMceBlocs();
          colsManager();
          listenToDestroy();
          listenToAddBloc();
          resizeVideos();
        });
      })
      .fail(function() {
        alert('Oups! une erreur a empêché l\'inversion.');
      });
    });

      $('.deplacer').click(function(){

        $('.editable').off();//remove listeners on others blocs
        $('.editrubrique').off();
        $('.btn-destroy').off(); 
        $('.add-bloc').off();

        var container = $(this).parents('.after-rubrique').first(),
            idRubrique = container.parent().prev().children('.editrubrique').first().attr('data-rubrique_id');

        //alert(idRubrique);
        container.load('/coulisses/partial_drag/'+idRubrique, function(){
          dragdrop();
        });
    });
  }

  function resizeVideos(){
    var videos = $('.editable iframe');
    if(videos.length != 0){
      videos.first().parent().css('width', '100%');
      videos.each(function(){
        $(this).removeAttr('style');
        var wid = $(this).width();
        $(this).width(Math.round(wid));
        $(this).height(Math.round(wid*9/16));
      })
    }
  }

  function dragdrop(){

    //partie 1- réorganisation, drag&drop.

    function insertAfter(newElement, afterElement) {
        var parent = afterElement.parentNode;
      
        if (parent.lastChild === afterElement) {
            parent.appendChild(newElement);
        } else {
            parent.insertBefore(newElement, afterElement.nextSibling);
        }
    }

    function cleanDropZone(){
      var dropzones = $('.dropzone'),
          dropzonesLen = dropzones.length;
      if(dropzonesLen > 0){
        dropzones.css('width', '2px');
        setTimeout(function(){
          dropzones.remove();
        }, 700);
      }
    }

    var dragged,
        numdrag,
        numover,
        finalPlace,
        rubrique = document.getElementById('drag-mode'),
        rubrique_id = rubrique.dataset.id,
        Jelements = $('.dropy'),
        elements = document.getElementsByClassName('dropy'),
        elemlen = elements.length;

    for(var i=0; i<elemlen; i++){
      elements[i].addEventListener('dragstart', function(event) {
        numdrag = parseInt(this.dataset.position);
        event.dataTransfer.setData('text/plain', '4Rt89dhMx');//obligatoire pour firefox
        dragged = event.target;
        event.target.style.opacity = "0.5";

      }, false);
    }

    function dragEnters(){
      Jelements.off();
      Jelements.on('dragenter', function(event){

        cleanDropZone();
        event.stopPropagation();

        finalPlace = parseInt(this.dataset.place);
        numover = parseInt(this.dataset.position);

        dropzone = document.createElement('div');
        dropzone.className = dragged.parentNode.className + ' dropzone';
        dropzone.innerHTML = '<div class="indropzone" style = "height: ' + dragged.clientHeight + 'px" ></div>';
        dropzone.style.width = '2px';

        if (numdrag > numover){
          //alert(numdrag+'=> cas 1 '+numover);
          rubrique.insertBefore(dropzone, this.parentElement);
        }else if (numdrag < numover){
          //alert(numdrag+'=> cas 2 '+numover);
          insertAfter(dropzone, this.parentElement);
        }
        $(this).off();

        dropzone.addEventListener("transitionend", function(event) {
          dropZone(dropzone);
        }, false);

        setTimeout(function(){
          dropzone.style = null;
        }, 5);

      });
    }
    dragEnters();

    function dropZone(dropzone){

      dropzone.addEventListener("dragover", function( event ) {
        //alert('dragover');
        // prevent default to allow drop
        event.preventDefault();
      }, false);

      dropzone.addEventListener('drop', function(event) {
        event.preventDefault();

        if (event.dataTransfer.getData('text/plain')=='4Rt89dhMx'){
          //alert(event.target.className);
          var transitNode = dragged.parentNode.cloneNode(true),
              initPlace = parseInt(dragged.dataset.place),
              container = $(this).parents('.after-rubrique').first();

          rubrique.replaceChild(transitNode, dragged.parentNode);

          setTimeout(function(){
            rubrique.replaceChild(dragged.parentNode, event.target.parentNode);
            transitNode.style.width = '2px';
          }, 5);

          setTimeout(function(){
            rubrique.removeChild(transitNode);
            cleanDropZone();
            dragged.style.opacity = "1";
            dragEnters();
            //alert(initPlace + ' -> ' + finalPlace + '  ' + rubrique_id);

            $.ajax({
                method: 'post',
                url: '/coulisses/moveblock/'+rubrique_id,
                data: {
                  init_place: initPlace,
                  final_place: finalPlace,
                  _token: $('[name="csrf-token"]').attr('content'),
                },
                dataType : 'json'
            })
            .done(function(data) {
              console.log(data['response']);
              //location.reload();
              container.load('/coulisses/partial_bloc/'+rubrique_id, function(){
                initMceBlocs();
                colsManager();
                listenToDestroy();
                listenToAddBloc();
                resizeVideos();
              });
            })
            .fail(function(data) {
              console.log(data);
              alert('Oups! une erreur a empêché la modification');
            });
          }, 705);

        }
      }, false);
    }

  document.addEventListener('dragend', function() {
    //if (dragged.className=='dropy'){
     //alert('dragend');
    //}
    cleanDropZone();
    dragged.style.opacity = "1";
    dragEnters();
  }, false);

  document.addEventListener("dragover", function(event) {
    if(event.clientY < 100){
      window.scrollBy(0, -10);
    }else if(event.clientY > window.innerHeight-100){
      window.scrollBy(0, 10);
    }
  }, false);

}//end drag&drop function

});
