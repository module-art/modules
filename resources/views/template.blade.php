<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="author" content="">

    @yield('title')

    <link rel="icon" type="image/jpg" href="/images/favicon.jpg" />

  </head>
  <body class="{{ isset($body_class) ? $body_class : '' }}">

    @yield('sidebar')

    <div class="container">

      <section id="global-wrapper">

        @yield('contenu')

      </section>

      <a class="cd-top">Haut de page</a>

      @yield('footer')
    
    </div>

    <script src="/js/fontawesome-all.min.js"></script>
    <script src="/js/scripts.js"></script>

    @yield('scripts')

  </body>
</html>
