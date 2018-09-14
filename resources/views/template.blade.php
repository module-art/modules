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
    <link rel="icon" type="image/jpg" href="/images/favicon.jpg" />

  </head>
  <body class="">

    @yield('sidebar')

    <div class="container-fluid">

      <section id="global-wrapper"
           @if(isset($bg_img) && $bg_img[0] != '')
          style="background-image: url('{!! asset( $bg_img[0] ) !!}');
          background-image: -webkit-image-set( url('{!! asset( $bg_img[0] ) !!}') 1x, url('{!! asset( $bg_img[1] ) !!}') 2x );
            background-image: image-set( url('{!! asset( $bg_img[0] ) !!}') 1x, url('{!! asset( $bg_img[1] ) !!}') 2x );" 
        @endif>

        @yield('contenu')

      </section>

      <a class="cd-top">Haut de page</a>

      @if(isset($footer) && $footer)
        @include('footer')
      @endif
    
    </div>

    <script src="/js/fontawesome-all.min.js"></script>
    <script src="/js/scripts.js"></script>

    @yield('scripts')

  </body>
</html>
