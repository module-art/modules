@extends('module-art.template')

@section('title')
  <title>{{ $page->title }}</title>
  <link rel="stylesheet" href="/css/styles.css">
@endsection

@section('menu')
  @include('module-art.menu')
@endsection

@section('contenu')

  @foreach($page->rubriques()->orderBy('place')->get() as $y => $rubrique)
      <div class="main-container">
          <div class="rubrique-container">
              <div class="heading" style="background-image: url('{!! asset( $rubrique->background_img_url ) !!}');">
                   {{-- -webkit-image-set: url('{!! asset( $rubrique->background_img_url ) !!}') 1x, url('{!! asset( $rubrique->background_hd_url ) !!}') 2x ;--}}
                   {{-- image-set: url('{!! asset( $rubrique->background_img_url ) !!}') 1x, url('{!! asset( $rubrique->background_hd_url ) !!}') 2x ;--}}
                   {!! $rubrique->contenu !!}
              </div>

            @include('module-art.svg_chevron_xml')

            <div class="dark-left"></div>
            <div class="dark-right"></div>

          </div><!--rubrique-->
        <div class="container after-rubrique">
          <?php
            switch ($rubrique->cols) {
              case 1:
                $cols = '';
                break;
              case 2:
                $cols = ' col-md-6';
                break;
              case 3:
                $cols = ' col-md-6 col-lg-4';
                break;
            }
            $order = $rubrique->ascendant ? 'asc' : 'desc'; 
          ?>
          <div class="row" id="blocs-rubrique{{ $rubrique->id }}">

            @foreach($rubrique->blocs()->orderBy('place', $order)->get() as $bloc)
              @if($bloc->type == 'large')
                <div class="col-12">
                  <div>
                    {!! $bloc->contenu !!}
                  </div>
                </div>
              @else
                <div class="col-12{{ $cols }}">
                  <div>
                    {!! $bloc->contenu !!}
                  </div>
                </div>
              @endif
            @endforeach

          </div><!--row-->
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
      </div>
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
  @if($page->slug == 'contact')
    <script src="/js/contact.js"></script>
  @else
    <script>

    function resizeVideos(){
      var videos = $('.after-rubrique iframe');
      if(videos.length != 0){
        videos.each(function(){
          $(this).removeAttr('style');
          var wid = $(this).width();
          $(this).height(Math.round(wid*9/16));
        })
      }
    }
    resizeVideos();
    </script>
  @endif
@endsection
