let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

var current_theme = process.env.APP_THEME;

mix
   .js('resources/views/themes/'+current_theme+'/assets/js/scripts.js', 'public/themes/'+current_theme+'/js')
   //.js('resources/assets/common/js/app.js', 'public/js')
   .js('resources/assets/common/js/admin.js', 'public/js')
   //.js('resources/assets/common/js/lists.js', 'public/js')
   //.js('resources/assets/common/js/contact.js', 'public/js')
   //.js('resources/assets/common/js/insert_form.js', 'public/js')
   //.js('resources/assets/common/js/categorie.js', 'public/js')
   //.sass('resources/views/themes/'+current_theme+'/assets/sass/styles.scss', 'public/themes/'+current_theme+'/css')
   .sass('Themes/'+current_theme+'/assets/sass/styles.scss', 'public/themes/'+current_theme+'/css')
   //.sass('resources/views/themes/'+current_theme+'/assets/sass/tiny_custom.scss', 'public/themes/'+current_theme+'/css')
   .sass('resources/assets/common/sass/admin.scss', 'public/css')
;

if(current_theme == 'gitedhote46'){
   //mix.sass('resources/views/themes/'+current_theme+'/assets/sass/leaflet.scss', 'public/themes/'+current_theme+'/css');
  //.js('resources/views/themes/'+current_theme+'/assets/js/gis.js', 'public/themes/'+current_theme+'/js');
}
