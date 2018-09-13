@extends('template')

@section('title')
  <title>{{ $page->title }}</title>
@endsection

@section('menu')
  @include('menu')
@endsection

@section('contenu')

  @foreach($page->rubriques()->orderBy('place')->get() as $y => $rubrique)
      <div class="main-container">
        <div class="rubrique-container">
          <div class="heading{{ $y == 0 ? ' first' : '' }}" 
               style="background-image: url('{!! asset( $rubrique->background_img_url ) !!}');
               background-image: -webkit-image-set( url('{!! asset( $rubrique->background_img_url ) !!}') 1x, url('{!! asset( $rubrique->background_hd_url ) !!}') 2x );
               background-image: image-set( url('{!! asset( $rubrique->background_img_url ) !!}') 1x, url('{!! asset( $rubrique->background_hd_url ) !!}') 2x );">
               {!! $rubrique->contenu !!}
          </div>
          <a class="more" href="#blocs-rubrique{{ $rubrique->id }}">Voir</a>
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
        </div><!--container-->
      </div>
    @endforeach

  @if($page->slug == 'contact')

    @include('front.contact')

  @endif

@endsection

@section('scripts')
  @if($page->slug == 'contact')
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
