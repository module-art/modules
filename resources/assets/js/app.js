
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
    $('#rgpd-notice').remove();
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
} )();
