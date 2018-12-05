@extends('template')

@section('title')
  <title>{{ $page->title }}</title>
  <link href="/css/tempusdominus-bootstrap-4.min.css" rel="stylesheet">
  <link href="/css/admin.css" rel="stylesheet">
  <link rel="stylesheet" href="/tools/fancybox/jquery.fancybox.min.css">
@endsection

@section('sidebar')
  @include('back.inc.sidebar')
@endsection

@section('contenu')

  <p id="id_page" class="d-none">{{ $page->id }}</p>

  @foreach($page->rubriques()->orderBy('place')->get() as $y => $rubrique)

    <div class="main-container">

      <div class="rubrique-container">

        @include('back.inc.partial_rubrique')

      </div><!--rubrique-->

      @include('menu')

      <div class='after-rubrique-container d-flex justify-content-center'>
        <div id="blocs-rubrique{{ $rubrique->id }}" class="after-rubrique{{ $rubrique->blocs()->count() > 0 || isset($rubrique->type_contents) || isset($type_content) ? ' not-empty' : ''}}" data-rubrique_id="{!! $rubrique->id !!}" data-rubrique_cols="{!! $rubrique->cols !!}">

          @include('back.inc.partial_bloc')

          @if($page->slug == 'contact')
            @include('front.contact')
          @endif

        </div><!--after-rubrique-->
      </div>

    </div><!--main-container-->

  @endforeach
      
@endsection

@if(isset($footer))
  @section('footer')
    @include('footer')
  @endsection
@endif

@section('scripts')
  <script src="/tools/tinymce/tinymce.min.js"></script>
  <script src="/js/tempus-dominus/moment-with-locales.min.js"></script>
  <script src="/js/tempus-dominus/tempusdominus-bootstrap-4.min.js"></script>
  <script src="/js/modular_admin.js"></script>
  <script src="/js/contact.js"></script>
  <script src="/tools/fancybox/jquery.fancybox.min.js"></script>
@endsection
