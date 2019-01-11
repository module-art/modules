@extends('grands_chemins.template')

@section('title')
  <title>{{ $page->title }}</title>
  <link href="/css/tempusdominus-bootstrap-4.min.css" rel="stylesheet">
  <link href="/css/admin.css" rel="stylesheet">
  <link rel="stylesheet" href="/tools/fancybox/jquery.fancybox.min.css">
@endsection

@section('sidebar')
  @include('common.back.inc.sidebar')
@endsection

@section('menu')
  @php
    $rubrique = $page->rubriques()->first();
  @endphp
  @include('grands_chemins.menu')
@endsection

@section('contenu')

  <p id="id_page" class="d-none">{{ $page->id }}</p>

  @php
    $rubrique = $page->rubriques()->first();
  @endphp

  <div class='after-rubrique-container d-flex justify-content-center'>
    <div id="blocs-rubrique{{ $rubrique->id }}" class="after-rubrique{{ $rubrique->blocs()->count() > 0 || isset($rubrique->type_contents) || isset($type_content) ? ' not-empty' : ''}}" data-rubrique_id="{!! $rubrique->id !!}" data-rubrique_cols="{!! $rubrique->cols !!}">

      @include('grands_chemins.back.inc.partial_bloc')

      @if($page->slug == 'contact')
        @include('grands_chemins.front.contact')
      @endif

    </div><!--after-rubrique-->
  </div>

@endsection

@if(isset($footer))
  @section('footer')
    @include('grands_chemins.footer')
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
