@extends('template')

@section('title')
  <title>{{ $page->title }}</title>
  @if($page->slug == 'accueil')
    <style>
#video-container{
  padding-top: 1.5rem;
}
      #bgvid {
        width: 100%; 
        height: auto;
        border-radius: 49%;
      }
    </style>
  @endif
@endsection

@section('sidebar')
  @include('back.inc.sidebar')
@endsection

@section('menu')
  @include('menu')
@endsection

@section('contenu')

  <p id="id_page" class="d-none">{{ $page->id }}</p>

    @foreach($page->rubriques()->orderBy('place')->get() as $y => $rubrique)

      <div class="main-container">
        <div class="rubrique-container">

          @include('back.inc.partial_rubrique')

        </div><!--rubrique-->

        <div class="container after-rubrique">

          @include('back.inc.partial_bloc')

          @if($page->slug == 'accueil' && $y == 1)
            <div class="row justify-content-center" >
              <div id='video-container' class='col-12 col-lg-10 col-xl-8'>
                <video poster="/movies/sky-logo.jpg" id="bgvid" autoplay muted loop>
                  <source src="/movies/sky-logo.webm" type="video/webm">
                    <source src="/movies/sky-logo.mp4" type="video/mp4">
                </video>
              </div>
            </div>
          @endif
        </div><!--container-->
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
