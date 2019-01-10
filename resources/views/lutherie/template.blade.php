<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="description" content="">
    <meta name="author" content="">
    <!-- <link rel="icon" href="../../../../favicon.ico"> -->

    @yield('title')

    <link rel="stylesheet" href="/css/redactor/redactor.css" />
    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="/css/styles.css">
    <link rel="icon" type="image/png" href="/images/logo_example_128.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="/images/logo_example_128.png" sizes="16x16" />

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

      @if(isset($footer))
        @include('footer')
      @endif
    
    </div>

    <script src="/js/fontawesome-all.min.js"></script>
    <script src="/js/scripts.js"></script>

    @yield('scripts')

  </body>
</html>
