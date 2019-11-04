$(document).ready(function(){

  //galleries
  
  var $galleriesSelect = $('#gallery-collapse');
  $('#add-gallery').click(function(){
    if($galleriesSelect.hasClass('show')){
      $galleriesSelect.collapse('hide');
    }else{
      $galleriesSelect.load('/coulisses/get-galleries', function(response, status, xhr){
        $('.fa-cog').css('display', 'none');
        if( status == "error" ){
          alert(xhr.statusText);
        }else{
          $galleriesSelect.collapse('show');
          listenToInsertGallery();
        }
      });
    }
  });
  
  function listenToInsertGallery(){
    $('#insert-gallery').click(function(){

      var $galleryData = new FormData($('#gallery_form')[0]),
          $isRound = parseInt( $galleryData.get('round_border') );

      //alert($isRound);

      if($galleryData.get('gallery') === null){
        alert('Il faut sélectionner un dossier !');
      }else{
        $('.fa-cog').css('display', 'inline-block');
        $.ajax({
          url: '/coulisses/get-gallery',
          method: 'post',
          data: $galleryData,
          processData: false,
          contentType: false,
          dataType : 'json'
        })
        .done(function(data) {
          $('.fa-cog').css('display', 'none');
          //console.log(data);
          //insert gallery using json data, problem with inline editing
          /*var galleryJson = {};
          galleryJson.gallery = $galleryData.get('gallery');
          galleryJson.type = $isRound ? 'circle':'square';
          galleryJson.images = [];
          $.each(data.thumbs, function (key, value) {
            galleryJson.images.push(value);
          });
          tinymce.activeEditor.execCommand('mceInsertContent', false, '<p class="gallery-json">'+JSON.stringify(galleryJson)+'</p>');*/
          //console.log(galleryJson);
          /*tinymce.activeEditor.execCommand('mceInsertContent', false, '<p class="d-none" data-gallery='+$galleryData.get('gallery')+'></p><figure class="gallery row justify-content-center">');
          $.each(data.thumbs, function (key, value) {
            var imageNode = '<a href="'+ value.replace(/thumbs\//, '') +'" class="fancy col-6 col-sm-4 col-md-3 col-lg-2" data-fancybox="gallery">'+
              '<img'+ ($isRound ? ' class="rond"' : '') +' src="' + value + '" alt="" />'+
              '</a>';
            tinymce.activeEditor.execCommand('mceInsertContent', false, imageNode);
          });
          tinymce.activeEditor.execCommand('mceInsertContent', false, '</figure>');*/
          tinymce.activeEditor.execCommand('mceInsertContent', false, '[gallery url="/'+$galleryData.get('gallery')+'" type="'+ ($isRound ? 'circle':'square') +'"]');

        })
        .fail(function(data) {
          $('.fa-cog').css('display', 'none');
          var errors = data.responseJSON.message + '\n';
          $.each(data.responseJSON.errors, function (key, value) {
            errors += value + '\n';
          });
          alert('La requête n\'a pas abouti.\n'+errors);
        });
      }

    });
  }
/// ---------- TYNIMCE ------
var tinyconf = {
      
    selector: '.redactored_full',
      language: 'fr_FR',
      height: 360,
      menubar: false,
      branding: false,
      content_css : "/css/tiny_custom.css",//current_theme is defined with php in template view file
      plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount responsivefilemanager'
      ],

      toolbar1: "pictos insertfile undo redo | styleselect | bold italic subscript superscript exposant removeformat | alignleft aligncenter alignright alignjustify | bullist numlist  nonbreaking | link unlink   media  responsivefilemanager insertimage insertfile | table hr  | forecolor backcolor emoticons | paste code | iconesliens | fontawesome ",//| print preview outdent indent image
      //toolbar: "bold italic strikethrough | link unlink | styleselect blockquote | bullist numlist outdent indent | insertfile image media | code",
      block_formats: 'Paragraph=p;Header 2=h2;Header 3=h3;Header 4=h4;Header 5=h5',
      paste_as_text: true,
      image_advtab: true ,
      entity_encoding : "raw",
      valid_elements : '+*[*]',
      external_filemanager_path:"/js/rfm/filemanager/",
      //content_css: '/css/styles.css,/css/wsm/awsomefont.css',
      filemanager_title:"Gestionnaire de fichiers" ,
      filemanager_sort_by:"date",
      filemanager_descending:true,
      filemanager_access_key:"fsUn8A5u9e6UypkZ" ,
      relative_urls: false,
      media_live_embeds: true,
      external_plugins: { "filemanager" : "/js/rfm/filemanager/plugin.min.js"},
      extended_valid_elements : "i[class],a[class|name|href|target|title|onclick|rel],script[type|src],iframe[src|style|width|height|scrolling|marginwidth|marginheight|frameborder],img[class|src|border=0|alt|title|hspace|vspace|width|height|align|onmouseover|onmouseout|name],$elements",
      /*init_instance_callback: function (editor) {
        editor.on('blur', function(){
          alert('blur');
        });
      }*/
  };
  tinymce.init(tinyconf);

  var tinyconf_medium = tinyconf;
  tinyconf_medium.selector = '.redactored';
  tinyconf_medium.menubar = true,
  tinyconf_medium.toolbar1 = 'bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignjustify  | bullist numlist | link unlink | media responsivefilemanager';
  
  tinymce.init(tinyconf_medium);

  var tinyconf_small = tinyconf;
  tinyconf_small.selector = '.simple-redactored';
  tinyconf_small.menubar = false;
  tinyconf_small.block_formats = 'Header 2=h2;Header 3=h3;Header 4=h4;Header 5=h5';
  tinyconf_small.height = 200;
  //tinyconf_small.toolbar1 =  "formatselect | bold italic | link unlink | subscript superscript | paste code";
  tinyconf_small.toolbar1 =  "formatselect | bold italic underline | alignleft aligncenter alignright | code";

  tinymce.init(tinyconf_small);

  /* ------- Tempus dominus --------- */

  $('.date').datetimepicker({  
      locale: 'fr',
      format: 'L',
      widgetPositioning: {
        horizontal: 'right'
      },
    });

  $('.heure').datetimepicker({  
      locale: 'fr',
      format: 'LT',
      widgetPositioning: {
        horizontal: 'right'
      },
    });
});
