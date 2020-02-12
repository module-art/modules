
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

//window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

/*Vue.component('example-component', require('./components/ExampleComponent.vue'));

const app = new Vue({
    el: '#app'
});*/

( function(){
  //rgpd notice
  $('#rgpd-notice-close').click(function(e){
    var nodeHeight = parseInt( $('#rgpd-notice').height() )+30;
    $('#rgpd-notice').animate({
      bottom: -nodeHeight+"px"
    }, "slow", function() {
      // Animation complete.
      $(this).remove();
  });
    $.ajax({
      url: '/rgpd-notice',
      method: 'get',
      data: {setting: 'closed'},
      //dataType : 'json',
    })
    .done(function(data) {
      console.log('Seuls les jetons de sécurité seront utilisée comme cookies, les statistiques de fréquentation du site se font à partir des journaux serveur.')
    })
    .fail(function(data) {
      var errors = data.responseJSON.message + '\n';
      //var errors = '';
      $.each(data.responseJSON.errors, function (key, value) {
        errors += value + '\n';
      });
      alert('La requête n\'a pas abouti.\n'+errors);
    });
  });

  //audio cleaner for tinymce bug
  $('img[data-mce-p-type="audio/mpeg"]').each(function(){
    var audioSrc = $(this).attr('data-mce-p-src'),
        audioHtml =  $(this).attr('data-mce-html');
    $(this).replaceWith('<audio controls="controls" src="'+ audioSrc +'" type="audio/mpeg">'+ audioHtml +'</audio>');
  });

  //video cleaner for tinymce bug
  $('img[data-mce-p-type="video/mp4"]').each(function(){
    var videoSrc = $(this).attr('data-mce-p-src'),
        videoHtml =  $(this).attr('data-mce-html');
    $(this).replaceWith('<video loop="" muted="" autoplay="" source="" src="'+ videoSrc +'" type="video/mp4">'+ videoHtml +'</video>');
  });

} )();
