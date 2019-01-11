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

var current_theme = process.env.APP_THEME ;

mix.js('resources/assets/'+current_theme+'/js/scripts.js', 'public/js')
   .js('resources/assets/common/js/admin.js', 'public/js')
   .js('resources/assets/common/js/contact.js', 'public/js')
   .js('resources/assets/common/js/insert_form.js', 'public/js')
   .js('resources/assets/common/js/categorie.js', 'public/js')
   .sass('resources/assets/'+current_theme+'/sass/styles.scss', 'public/css')
   .sass('resources/assets/'+current_theme+'/sass/admin.scss', 'public/css');

if(current_theme == 'grands_chemins'){
  mix.sass('resources/assets/'+current_theme+'/sass/tiny_custom.scss', 'public/css')
}
