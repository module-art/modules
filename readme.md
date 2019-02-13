<p align="center"><img src="https://laravel.com/assets/img/components/logo-laravel.svg"><h1> + Modules</h1></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/d/total.svg" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/v/stable.svg" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/license.svg" alt="License"></a>
</p>

## About Modules

## Installation

<p>download database</p>
<p>cp .env.example .env</p>
<p>set your .env values</p>
<br>
<p>clone your theme in resource/views/themes/</p>
<p>copy storage theme folder</p>
<br>
<p>set the file manager public/tools/rfm/filemanager/config/config.php</p>
<p>choose the theme variable</p>
<br>
<p>composer install</p>
<p>php artisan key:generate</p>
<p>php artisan storage:link</p>
<p>in app/Http/Requests/Themes/</p>
<p>ln -s resources/views/themes/(theme_name)/Http/Request (theme_name)</p>
<p>in app/Http/Controllers/Themes/</p>
<p>ln -s resources/views/themes/(theme_name)/Http/Controllers (theme_name)</p>
<br>
<p>from root account :</p>
<p>sudo chmod 777 -R /home/contact/sites/modules/storage/logs</p>
<p>sudo chmod 777 -R /home/contact/sites/modules/storage/framework/sessions</p>
<p>sudo chmod 777 -R /home/contact/sites/modules/storage/framework/views</p>

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
