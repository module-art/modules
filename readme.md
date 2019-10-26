## What is that ?
<p>Modules, is <a href="https://laravel.com/">Laravel</a> with a content manager layer above.</p>
<p>I developed this CMS for my personal use (for now in French), to have a tool whose backoffice, the simplest possible, is intended only for the end user to manage its contents.
The html structure, the styles, the javascript and possibly additional php classes are worked separately in the files of the theme folder.</p>

## Install
Run
<pre>composer install</pre>
Then you have to create folders Themes/{your theme name}/ at the root.<br>
Clone the <a href="https://framagit.org/module-art/theme-base" target="_blank">theme_base</a> in<br>
Run commands :<br>
<pre>php artisan migrate --seed></pre>
<pre>php artisan module:link></pre>
and choose "views" at least<br>
Then change the theme as you see fit ...

## Demo
You can test modules with the basic theme using <a href="https://hub.docker.com/r/moduleart/module_base" target="_blank">the docker image module_base</a>.

<a href="https://module-art.fr" target="_blank">Visit module-art.fr</a>
