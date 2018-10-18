$(document).ready(function(){

/// ---------- TYNIMCE ------
var tinyconf = {
      
    selector: '.redactored_full',
      language: 'fr_FR',
      //height: 360,
      menubar: false,
      branding: false,
      plugins: [
          'advlist autolink lists link image charmap print preview anchor textcolor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table contextmenu paste code help wordcount responsivefilemanager'
      ],

      toolbar1: "pictos insertfile undo redo | styleselect | bold italic subscript superscript exposant removeformat | alignleft aligncenter alignright alignjustify | bullist numlist  nonbreaking | link unlink   media  responsivefilemanager insertimage insertfile | table hr  | forecolor backcolor emoticons | paste code | iconesliens | fontawesome ",//| print preview outdent indent image
      //toolbar: "bold italic strikethrough | link unlink | styleselect blockquote | bullist numlist outdent indent | insertfile image media | code",
      block_formats: 'Paragraph=p;Header 2=h2;Header 3=h3;Header 4=h4;Header 5=h5',
      paste_as_text: true,
      image_advtab: true ,
        valid_elements : '+*[*]',
        external_filemanager_path:"/tools/rfm/filemanager/",
        //content_css: '/css/styles.css,/css/wsm/awsomefont.css',
        filemanager_title:"Gestionnaire de fichiers" ,
        filemanager_sort_by:"date",
        filemanager_descending:true,
        filemanager_access_key:"fsUn8A5u9e6UypkZ" ,
        relative_urls: false,
          media_live_embeds: true,
        external_plugins: { "filemanager" : "/tools/rfm/filemanager/plugin.min.js"},///composants/rfm/filemanager/plugin.min.js
        extended_valid_elements : "i[class],a[class|name|href|target|title|onclick|rel],script[type|src],iframe[src|style|width|height|scrolling|marginwidth|marginheight|frameborder],img[class|src|border=0|alt|title|hspace|vspace|width|height|align|onmouseover|onmouseout|name],$elements"
        
  };
  tinymce.init(tinyconf);

  var tinyconf_medium = tinyconf;
  tinyconf_medium.selector = '.redactored';
  tinyconf_medium.menubar = true,
  tinyconf_medium.toolbar1 = 'bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignjustify  | bullist numlist | link unlink | media responsivefilemanager';
  
  tinymce.init(tinyconf_medium);

  var tinyconf_small = tinyconf;
  tinyconf_small.selector = '.simple-redactored';
  tinyconf_small.height = 150;
  tinyconf_small.toolbar1 =  "bold italic | link unlink | subscript superscript | paste code";

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