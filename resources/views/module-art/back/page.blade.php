@extends('module-art.template')

@section('title')
  <title>{{ $page->title }}</title>
  <link href="/css/tempusdominus-bootstrap-4.min.css" rel="stylesheet">
  <link rel="stylesheet" href="/css/admin.css">
  <link rel="stylesheet" href="/tools/fancybox/jquery.fancybox.min.css">
@endsection

@section('sidebar')
  @include('common.back.inc.sidebar')
@endsection

@section('menu')
  @include('module-art.menu')
@endsection

@section('contenu')

  <p id="id_page" class="d-none">{{ $page->id }}</p>

    @foreach($page->rubriques()->orderBy('place')->get() as $y => $rubrique)

      <div class="main-container">
        <div class="rubrique-container">

          @include('module-art.back.inc.partial_rubrique')

        </div><!--rubrique-->

        <div class="container after-rubrique" data-rubrique_id="{!! $rubrique->id !!}" data-rubrique_cols="{!! $rubrique->cols !!}">

          @include('module-art.back.inc.partial_bloc')

          @if($page->slug == 'modelisation' && $y == 0)
            <div class="row justify-content-center" >
              <div id='video-container' class='col-12 col-lg-10 col-xl-8'>
                <video poster="/images/module-art/movies/sky-logo.jpg" id="bgvid" autoplay muted loop>
                  <source src="/images/module-art/movies/sky-logo.webm" type="video/webm">
                    <source src="/images/module-art/movies/sky-logo.mp4" type="video/mp4">
                </video>
              </div>
            </div>
          @endif
        </div><!--container-->
      </div><!--main-container-->

    @endforeach

    @if($page->slug == 'contact')

      @include('module-art.front.contact')

    @endif
      
@endsection

@if(isset($footer))
  @section('footer')
    @include('module-art.footer')
  @endsection
@endif

@section('scripts')
  <script src="/tools/tinymce/tinymce.min.js"></script>
  <script src="/js/tempus-dominus/moment-with-locales.min.js"></script>
  <script src="/js/tempus-dominus/tempusdominus-bootstrap-4.min.js"></script>
  <script src="/js/admin.js"></script>
  <script src="/js/contact.js"></script>
  <script src="/tools/fancybox/jquery.fancybox.min.js"></script>
@endsection
