<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="description" content="Module-art conception de sites internet et applications web">
    <meta name="keywords" content="site internet, web design, graphisme, modélisation 3d, référencement, photographies, hébergement">
    <meta name="author" content="Module-art, Sylvestre Lambey">

    @yield('title')

    <link rel="icon" type="image/jpg" href="/images/module-art/favicon.jpg" />

  </head>
  <body class="">

    @yield('sidebar')

    <div class="container-fluid">

      <section id="global-wrapper">

        <div class="head">
          @yield('menu')
        </div>

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
