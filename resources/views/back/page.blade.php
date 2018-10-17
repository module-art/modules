@extends('template')

@section('title')
  <title>{{ $page->title }}</title>
  <link href="/css/tempusdominus-bootstrap-4.min.css" rel="stylesheet">
  <link href="/css/admin.css" rel="stylesheet">
@endsection

@section('sidebar')
  @include('back.inc.sidebar')
@endsection

@section('contenu')

  <p id="id_page" class="d-none">{{ $page->id }}</p>

  @foreach($page->rubriques()->orderBy('place')->get() as $y => $rubrique)

    <div class="main-container">

      <div class='overlay'>

        <div class="head d-flex justify-content-center">
          @include('menu')
        </div>

        <div class="rubrique-container">

          @include('back.inc.partial_rubrique')

        </div><!--rubrique-->

        <div class='after-rubrique-container d-flex justify-content-center'>
          <div id="blocs-rubrique{{ $rubrique->id }}" class="col-12 col-lg-10 col-xl-9 after-rubrique{{ $rubrique->blocs()->count() > 0 || isset($rubrique->type_contents) ? ' not-empty' : ''}}">

            @include('back.inc.partial_bloc')

            @if($page->slug == 'contact')
              @include('front.contact')
            @endif

          </div><!--after-rubrique-->
        </div>

      </div><!--overlay-->

    </div><!--main-container-->

  @endforeach
      
@endsection

@section('scripts')
  <script src="/tools/tinymce/tinymce.min.js"></script>
  <script src="/js/tempus-dominus/moment-with-locales.min.js"></script>
  <script src="/js/tempus-dominus/tempusdominus-bootstrap-4.min.js"></script>
  <script src="/js/modular_admin.js"></script>
  <script src="/js/contact.js"></script>
@endsection
