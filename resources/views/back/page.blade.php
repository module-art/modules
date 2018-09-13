@extends('template')

@section('title')
  <title>{{ $page->title }}</title>
@endsection

@section('sidebar')
  @include('back.inc.sidebar')
@endsection

@section('contenu')

  <p id="id_page" class="d-none">{{ $page->id }}</p>

    @foreach($page->rubriques()->orderBy('place')->get() as $y => $rubrique)

      <div class="main-container"
      >

        <div class='overlay'>

          <div class="head d-flex justify-content-center">
            @include('menu')
          </div>

          <div class="rubrique-container">

            @include('back.inc.partial_rubrique')

          </div><!--rubrique-->

          <div class="container after-rubrique{{ $rubrique->blocs()->count() > 0 ? ' not-empty' : ''}}">

            @include('back.inc.partial_bloc')

          </div><!--blocs-->
        </div>

      </div>

    @endforeach

    @if($page->slug == 'contact')

      @include('front.contact')

    @endif
      
@endsection

@section('scripts')
  <script src="/js/tinymce/tinymce.min.js"></script>
  <script src="/js/modular_admin.js"></script>
  <script src="/js/contact.js"></script>
@endsection
