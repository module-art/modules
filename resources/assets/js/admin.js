import '../../../public/tools/popsuggest/popover-suggest.min.js';

$(document).ready(function()
{
	"use strict";

  $('.sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
  });

  /// ---------- TYNIMCE 5.2 ------

  const tinyconf = {
    selector: '.editable',
    inline: true,
    language: 'fr_FR',
    menubar: true,
    branding: false,
    plugins: ['advlist autolink lists link image charmap print preview anchor','searchreplace visualblocks fullscreen', 'insertdatetime media table paste code help wordcount '],
    toolbar: 'code | bold italic underline | bullist numlist | forecolor backcolor | link unlink | media image',
    block_formats: 'Header 2=h2;Header 3=h3;Header 4=h4;Header 5=h5;Paragraph=p',
    fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
    paste_as_text: true,
    image_advtab: true ,
    entity_encoding : "raw",
    //force_br_newlines : true,
    //force_p_newlines : false,
    //forced_root_block : '', // Needed for 3.x
    valid_elements : '+*[*]',
    relative_urls: false,
    //convert_urls: true,
    media_live_embeds: true,
    extended_valid_elements : "i[class],a[class|name|href|target|title|onclick|rel],script[type|src],iframe[src|style|width|height|scrolling|marginwidth|marginheight|frameborder],img[class|src|border=0|alt|title|hspace|vspace|width|height|align|style|onmouseover|onmouseout|name],$elements",
    //audio_template_callback: function(data) {
      //return '<audio class="toto" controls>' + '\n<source src="' + data.source1 + '"' + (data.source1mime ? ' type="' + data.source1mime + '"' : '') + ' />\n' + '</audio>';
    //},
    file_picker_callback (callback, value, meta) {
      let x = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth
      let y = window.innerHeight|| document.documentElement.clientHeight|| document.getElementsByTagName('body')[0].clientHeight

      tinymce.activeEditor.windowManager.openUrl({
        url : '/file-manager/tinymce5',
        title : 'Gestionnaire de fichiers',
        width : x * 0.8,
        height : y * 0.8,
        onMessage: (api, message) => {
          callback(message.content, { text: message.text })
        }
      })
    },
    init_instance_callback: function (editor) {
      blocCallback(editor);
    }
  };

  const tinyconf_rubrique = {...tinyconf, 
    selector: '.editrubrique',
    menubar: false,
    toolbar: 'formatselect | bold italic underline | alignleft aligncenter alignright | code',
    init_instance_callback: function (editor) {
      rubriqueCallback(editor);
    }
  };

  tinymce.init(tinyconf);
  tinymce.init(tinyconf_rubrique);

  function initMceBlocs(){
    tinymce.remove('.editable');
    tinymce.init(tinyconf);
  }

  //insertion des listes par type
  
  function getTypeContents(){

    var typeContents = $('.type-contents');

    if(typeContents.length > 0){
      typeContents.each(function(){
        var type = $(this).attr('data-content_type'),
            filtre = $(this).attr('data-filtre'),
            desc = $(this).attr('data-desc');

        $(this).load('/get-type-contents/'+type+'?orderby='+filtre+'&desc='+desc, function(response, status, xhr){
          if( status == "error" ){
            console.log(xhr.status + " " +xhr.statusText);
          }else{
            console.log(type + ' est rechargé.');
            initMceBlocs();
            listenToNumBlocs();
            listenToDestroy();
          }
        });
      });
    }else if($('.type-content').length > 0){
      initMceBlocs();
      listenToNumBlocs();
      listenToDestroy();
    }else{
      initMceBlocs();
      listenToDestroy();
    }
  }

  //global vars
  var idPage = $('#id_page').html(),
      imageChange = false,
      defaultBackgroundImage = '/storage/'+current_theme+'/files/images/default_background.jpg',//current_theme is defined with php in template view file
      wasEdited = false,
      imgWidth = 0,
      maxFileSize = 4096000,
      idCreatedBloc = 0,
      //duration of the top scrolling animation (in ms)
      scroll_top_duration = 1000,
      csrfToken = $('meta[name="csrf-token"]').attr('content');//get csrf-field in head

  //not working set minimgwidth in template global vars.
  //if(minImgWidth === undefined){
    //var minImgWidth = 1200;
  //}

  $('#add-rubrique').click(function(){
    var globalContainer = document.getElementById('global-wrapper');

    $.ajax({
        method: 'post',
        url: '/coulisses/newrubrique/'+ idPage,
        data: { _token: csrfToken},//token!!!
    })
    .done(function(data) {
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
    })
    .fail(function() {
      alert('Oups! une erreur a empêché l\'ajout de rubrique.');
    });
  });

  $('#destroy-page').click(function(){
    if(confirm('Tous les contenus de cette page seront supprimés. Êtes vous vraiment sûr?')){

      $.ajax({
          method: 'delete',
          url: '/coulisses/destroypage/'+ idPage,
          data: { _token: csrfToken},
      })
      .done(function(data) {
        alert(data);
        location.assign('/coulisses');
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
        data: { _token: csrfToken},
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

  //boutons de publication de rubriques normales

  $('.btn-publish').click(function(){
    var idRubrique = $(this).parents('.rubrique-container').first().find('.editrubrique').attr('data-rubrique_id');

    document.body.style.cursor = 'wait';

    togglePublished($(this), 'publicationcontent', idRubrique);
  });

  function togglePublished(nodeBtn, routeUrl, idContent){
    var nodeStatus = nodeBtn.children().first();
    $.ajax({
        method: 'post',
        url: '/coulisses/'+routeUrl+'/'+idContent,
        data: { _token: csrfToken},
    })
    .done(function(data) {
      document.body.style.cursor = 'default';
      //console.log(data);
      if(nodeStatus.is('.published')){
        nodeStatus.removeClass('published').addClass('unpublished').html('<i class="fas fa-eye-slash"></i>');
        nodeBtn.attr('title', 'Publier cette rubrique');
      }else{
        nodeStatus.removeClass('unpublished').addClass('published').html('<i class="fas fa-eye"></i>');
        nodeBtn.attr('title', 'Masquer cette rubrique');
      }
    })
    .fail(function() {
      document.body.style.cursor = 'default';
      alert('Oups! une erreur a empêché la modification.');
    });
  }

  ///------ galleries ------------
  
  function addGallery(rubriqueId, gallery){
    var container = $('.after-rubrique[data-rubrique_id='+rubriqueId+']').first().find('.markerRow').first(),
        bloc_id = 'rubrique-'+rubriqueId,
        newBloc = '[gallery url="/public/'+current_theme+'/files/galeries/'+gallery+'" type="square"]',
        type = 'gallery',
        action = '/coulisses/bloc/' + bloc_id;

    if(newBloc === undefined) return;//exit to avoid TypeError

    $.ajax({
        url: action,
        method: 'post',
      data: { 
        _token: csrfToken,
        texte: newBloc,
        format: type
      },
      dataType : 'json',
    })
    .done(function(data) {
      console.log(data['response']);
      reloadBlocs(container, rubriqueId);
    })
    .fail(function() {
      alert('La requête n\'a pas abouti. Êtes-vous bien connecté comme admin?');
    });

  }

  function listenToGetGallery(jQueryObj){
    var rubriqueId = 0;
    jQueryObj.focus(function(){
      rubriqueId = $(this).parents('.after-rubrique').first().attr('data-rubrique_id');
    });
    jQueryObj.popsuggest({
      placement : 'left',
      dataUrl: '/coulisses/list-galleries',
      separator: '|',
      rows: 6,
      addData: {
        '_token': csrfToken,
      }
    }).on( "popSelect", function() {
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
            replacement = '<section id="replacement" class="row justify-content-end mb-4"><div class="col-12 col-md-8 col-lg-6 col-xl-5"><div class="card"><div class="card-body">'+
            '<form method="post" enctype="multipart/form-data" class="" id="replacement-form"><div class="form-group">'+
            '<label for="image" class="col-form-label">Changer l\'image de fond</label>'+
            '<div class="input-group mb-2">'+
            '<div class="input-group-prepend">'+
            '<div class="input-group-text"><i class="far fa-file-image"></i></div>'+
            '</div>'+
            '<input id="image" class="form-control" type="file" name="image" />'+
            '</div>'+
            '<div class="form-check mb-2">'+
            '<input class="form-check-input" type="checkbox" value="1" name="delete_image">'+
            '<label class="form-check-label" for="delete_image">'+
            ' Image par défaut'+
            '</label>'+
            '</div>'+
            '<input id="texte" type="hidden" name="texte" />'+
            '<input type="hidden" name="_token" value="' + csrfToken + '" />'+
            '<div class="row justify-content-between px-3">'+
            '<button class="btn btn-primary btn-save" ><i class="fas fa-cog fa-spin fa-lg"></i> Enregistrer</button><button id="btn-cancel" class="btn btn-secondary" >Annuler</button>'+
            '</div>'+
            '</form></div></div></div></section>';

          $('.cols-button, .bloc-button').css('display', 'none');
          if($('#replacement')[0] === undefined){
            tar.parent().append(replacement);
          }
          //console.log(imageNode);

          imageManage(imageNode, initBackgroundImage);

          $('.btn-save').on('click', function(e){

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
                if(parseInt(data['img_deleted'])){
                  imageNode.css({
                    backgroundImage: 'url("'+defaultBackgroundImage+'")'
                  });
                }
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
          
          $('#btn-cancel').on('click', function(e){
            e.preventDefault();
    
            setTimeout(function(){
              tar.css({
                padding: '',
              });
              if(imageChange) imageNode.css('background-image', 'url("' + initBackgroundImage + '")');
              $('#replacement').remove();
              $('.cols-button, .bloc-button').css('display', 'block');
            }, 100)
          });

        });//close focus event
      }

  function blocCallback(editor) {
    editor.on('focus', function (e) {
      //console.log(e);
      console.log('callback');
      var tar = $(e.target.bodyElement);

      tar.parent().append('<div id="bloc-buttons" class="d-flex justify-content-end"><button class="btn btn-primary btn-save">Enregistrer</button></div>');

      $('.btn-save').on('mousedown', function(){
        var newBloc = tar.html(),
          bloc_id = tar.attr('data-bloc_id'),
          isNewBloc = bloc_id == 0 ? true : false,
          type = '';

        if(newBloc === undefined) return;//exit to avoid TypeError

        if(isNewBloc){
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
          dataType : 'json',
        })
        .done(function(data) {
          console.log(data['response']);
          tar.css('border', 'none');
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

    editor.on('Change', function (e) {
      var tar = $(e.target.bodyElement);
      tar.css('border', '1px red solid');
    });
  }

  function listenToNumBlocs(){

    /* ------- Tempus dominus --------- */

    var dateInputs = $('.editdate');
    var heureInputs = $('.editheure');

    if(dateInputs.length > 0){
      dateInputs.datetimepicker({  
        locale: 'fr',
        format: 'L',
        //debug: true
      });

      dateInputs.on('change.datetimepicker', function(event){
        //format moment.js object to string date
        //alert(event.date);
        numberSender(moment(event.date).format("YYYYMMDD"), $(this).attr('data-bloc_id'));
      });
    }

    if(heureInputs.length > 0){
      heureInputs.datetimepicker({  
        locale: 'fr',
        format: 'LT',
        //debug: true
      });

      heureInputs.on('change.datetimepicker', function(event){
        //format moment.js object to string date
        //alert(moment(event.date).format("HHmm"));
        numberSender(moment(event.date).format("HHmm"), $(this).attr('data-bloc_id'));
      });
    }

    $('.editnumber').click(function(){
      var tar = $(this),
          bloc_id = tar.attr('data-bloc_id'),
          $number = tar.html();

      tar.addClass('d-none');
      tar.parent().prepend('<input id="nmber" type="text" value="'+ $number +'"/><div id="bloc-buttons"><button class="btn btn-primary btn-save pull-right" >Enregistrer</button></div>');
      var inputNumber = $('#nmber');
      inputNumber.focus();
      inputNumber.blur(function(){
        tar.html($(this).val());
        setTimeout(function(){
          inputNumber.remove();
          $('#bloc-buttons').remove();
          tar.removeClass('d-none');
        }, 100);
      });

      $('.btn-save').click(function(){
        numberSender(inputNumber.val(), bloc_id);
      });
    });
  }

  function numberSender($num, bloc_id){

    var action = '/coulisses/bloc/' + bloc_id;

    $.ajax({
        url: action,
        method: 'post',
      data: { 
        _token: csrfToken,
        texte: $num,
        format: 'date'
      },
      dataType : 'json',
    })
    .done(function(data) {
      console.log(data['response']);
    })
    .fail(function() {
      alert('La requête n\'a pas abouti. Êtes-vous bien connecté comme admin?');
    });
  }

  function imageManage(rubriqueNode, initBackgroundImage){
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

    $('input[name=delete_image]').change(function(){
      if($(this).prop('checked')){
        imageChange = true;
        rubriqueNode.css('background-image', 'url("'+ defaultBackgroundImage +'")');
      }else{
        imageChange = false;
        rubriqueNode.css('background-image', 'url("'+ initBackgroundImage +'")');
      }
    });
  }

  function listenToAddBloc(){

    $('.add-bloc').off();
    $('.change-type').off();

    $('.add-bloc').click(function(){
      var previousRow = $(this).parents(".markerRow").first(),
          cols = previousRow.parent().attr('data-rubrique_cols'),
          type = this.getAttribute('data-format'),
          order = $(this).attr('data-order'),
          newBlocLarge = '<div class="col-12"><button class="btn btn-sm btn-outline-danger btn-destroy" ><i class="fas fa-trash-alt"></i></button><div class="editable" data-bloc_id="0"><h2>Nouveau bloc large</h2></div></div>',
          newBlocNormal = '<div class="col-12 col-md-'+ 12/cols +'"><button class="btn btn-sm btn-outline-danger btn-destroy" ><i class="fas fa-trash-alt"></i></button><div class="editable" data-bloc_id="0"><p>Nouveau paragraphe</p></div></div>';

      if(order == 'asc'){
        if(type == 'large'){
          previousRow.append(newBlocLarge);
        }else if(type == 'normal'){
          previousRow.append(newBlocNormal);
        }
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

    $('.change-type').click(function(){
      var container = $(this).parents('.after-rubrique').first(),
          idRubrique = container.attr('data-rubrique_id');
      idRubrique = parseInt(idRubrique);

      $.ajax({
        method: 'post',
        url: '/coulisses/change-type-content/'+idRubrique,
        data: { 
          dbAction: $(this).attr('data-dbAction'),
          contentType: $(this).attr('data-contentType'),
          _token: csrfToken
        },
        dataType : 'json'
      })
      .done(function(data) {
        console.log(data['response']);
        //reloadBlocs(container, idRubrique);
        document.location.reload(true);
      })
      .fail(function(data) {
        console.log(data);
        alert('Oups! une erreur a empêché la modification');
      });

    });

  }

  function listenToDestroy(){

    $('.btn-destroy').off(); //remove listeners before putting back it
    $('.btn-destroy').click(function(){

      if(confirm('Êtes vous sûr?')){
        var elem = $(this).parent();

        if(elem.hasClass('rubrique-container')){
          if(confirm('Tous les blocs associés à cette rubrique seront effacés. Êtes vous vraiment sûr?')){
            var idRubrique = elem.find('.editrubrique').attr('data-rubrique_id');

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
        }else if(elem.hasClass('type-content')){
          var idRubrique = $(this).attr('data-rubrique_id');

          $.ajax({
              method: 'post',
              url: '/coulisses/destroyinsertedrubrique/'+ idRubrique,
              data: { _token: csrfToken},//token!!!
            })
            .done(function(data) {
              elem.remove();
              console.log(data);
            })
            .fail(function() {
              alert('Oups! une erreur a empêché la suppression.');
            });

        }else if(elem.hasClass('type-index')){

          var idRubrique = $(this).attr('data-rubrique_id');

          $.ajax({
            method: 'post',
            url: '/coulisses/destroyinsertedrubrique/'+ idRubrique,
            data: { _token: csrfToken},//token!!!
          })
          .done(function(data) {
            elem.parents('tr').remove();
            console.log(data);
            //document.location.reload(true);
          })
          .fail(function() {
            alert('Oups! une erreur a empêché la suppression.');
          });

        }else{
          
          //var idBloc = elem.attr('data-bloc_id');
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

      var previousRow = $(this).parents(".markerRow").first(),
          nbCols = parseInt( this.getAttribute('data-colonnes') ),
          newCols = "",
          targetChildren = previousRow.find('.col-12').not('.large-bloc'),
          rubrique_id = previousRow.parent().attr('data-rubrique_id');

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
        previousRow.parent().attr('data-rubrique_cols', nbCols);
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
          idRubrique = container.attr('data-rubrique_id');
      idRubrique = parseInt(idRubrique);
      reloadBlocs(container, idRubrique);
    });

    $('.inverser').click(function(){

      var container = $(this).parents('.after-rubrique').first(),
          idRubrique = container.attr('data-rubrique_id');

      $.ajax({
          method: 'post',
          url: '/coulisses/ascdesc/'+ idRubrique,
          data: { _token: csrfToken},//token!!!
      })
      .done(function(data) {
        console.log(data);
        parseInt(idRubrique);
        reloadBlocs(container, idRubrique);
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
            idRubrique = container.attr('data-rubrique_id');

        container.load('/coulisses/partial_drag/'+idRubrique, function(response, status, xhr){
          if( status == "error" ){
            console.log(xhr.statusText);
          }else{
            colsManager();
            dragdrop();
          }
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

  function reloadBlocs(container, idRubrique){
    container.load('/coulisses/partial_bloc/'+idRubrique, function(response, status, xhr){
      if( status == "error" ){
        console.log(xhr.statusText);
      }else{
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
        dropzone,
        rubrique = document.getElementById('drag-mode'),
        rubrique_id = rubrique.dataset.id,
        Jelements = $('.dropy'),
        elements = document.getElementsByClassName('dropy'),
        elemlen = elements.length;

    for(var i=0; i<elemlen; i++){
      elements[i].addEventListener('dragstart', function(event) {
        //alert('event dragstart');
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
        //alert('event dragenter');

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
          //alert('end');
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
        //alert('drop');

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
              reloadBlocs(container, rubrique_id);
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
