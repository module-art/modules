@extends('template')

@section('title')
  <title>{{ $page->title }}</title>
@endsection

@section('sidebar')
  @include('back.inc.sidebar')
@endsection

@section('menu')
  @include('menu')
@endsection

@section('contenu')

  <p id="id_page" class="d-none">{{ $page->id }}</p>

    @foreach($rubriques as $y => $rubrique)

      <div class="main-container">
        <div class="rubrique-container">

          @include('back.inc.partial_rubrique')

        </div><!--rubrique-->

        <div class="container after-rubrique">

          @include('back.inc.partial_bloc')

        </div><!--blocs-->
      </div>

    @endforeach

    @if($page->slug == 'contact')

      @include('front.contact')

    @endif
      
@endsection

@section('scripts')
  <script src="/js/tinymce/tinymce.min.js"></script>
  <script src="/js/admin.js"></script>
  <script src="/js/contact.js"></script>
@endsection
