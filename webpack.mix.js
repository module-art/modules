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

var current_theme = process.env.MODULES_THEME;
mix.config.fileLoaderDirs.fonts = 'storage/'+current_theme+'/fonts';

mix
   .js('Themes/'+current_theme+'/assets/js/scripts.js', 'public/js')
   //.js('resources/assets/js/app.js', 'public/js')
   //.js('resources/assets/js/admin.js', 'public/js')
   //.js('resources/assets/js/lists.js', 'public/js')
   //.js('resources/assets/js/contact.js', 'public/js')
   //.js('resources/assets/js/insert_form.js', 'public/js')
   .js('resources/assets/js/categorie.js', 'public/js')
   .js('resources/assets/js/fields.js', 'public/js')
   .sass('Themes/'+current_theme+'/assets/sass/styles.scss', 'public/css')
   //.sass('Themes/'+current_theme+'/assets/sass/tiny_custom.scss', 'public/css')
   .sass('resources/assets/sass/admin.scss', 'public/css')
;
