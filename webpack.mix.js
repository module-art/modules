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

var current_theme = 'grands_chemins';

mix.js('resources/assets/'+current_theme+'/js/scripts.js', 'public/js')
   .js('resources/assets/'+current_theme+'/js/admin.js', 'public/js')
   .js('resources/assets/'+current_theme+'/js/contact.js', 'public/js')
   .js('resources/assets/'+current_theme+'/js/insert_form.js', 'public/js')
   .js('resources/assets/'+current_theme+'/js/categorie.js', 'public/js')
   .sass('resources/assets/'+current_theme+'/sass/tiny_custom.scss', 'public/css')
   .sass('resources/assets/'+current_theme+'/sass/styles.scss', 'public/css')
   .sass('resources/assets/'+current_theme+'/sass/admin.scss', 'public/css');
