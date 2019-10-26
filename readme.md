<p>Modules, it's <a href="https://laravel.com/">Laravel</a> with a content manager layer above...</p>
<p align="center"><a href="https://laravel.com/"><img src="https://res.cloudinary.com/dtfbvvkyp/image/upload/v1566331377/laravel-logolockup-cmyk-red.svg" width="300"></a></p>

## What is that ?
<p>I developed this CMS for my personal use (it is so far in French), to have a tool whose backoffice, the simplest possible, is intended only for the end user to manage its contents.
The html structure, the styles, the javascript and possibly additional php classes are worked separately in the files of the theme folder.</p>

## Install
The installation is like Laravel.<br>
Then you have to create the folder Themes/ at the root.<br>
Clone the <a href="https://framagit.org/module-art/theme-base" target="_blank">theme_base</a> in<br>
Start commands :<br>
php artisan migrate --seed<br>
php artisan module:link<br>
and choose "views" at least<br>
Then change the theme as you see fit ...

## Demo
You can test modules with the basic theme using <a href="https://hub.docker.com/r/moduleart/module_base" target="_blank">the docker image module_base</a>.

<a href="https://module-art.fr" target="_blank">Visit module-art.fr</a>
