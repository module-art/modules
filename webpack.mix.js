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

mix.js('resources/assets/js/scripts.js', 'public/js')
   .js('resources/assets/js/modular_admin.js', 'public/js')
   .js('resources/assets/js/contact.js', 'public/js')
   .js('resources/assets/js/insert_form.js', 'public/js')
   .js('resources/assets/js/categorie.js', 'public/js')
   .sass('resources/assets/sass/styles.scss', 'public/css')
   .sass('resources/assets/sass/admin.scss', 'public/css');
