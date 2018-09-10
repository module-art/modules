@extends('template')

@section('title')
  <title>{{ $page->title }}</title>
@endsection

@section('menu')
  @include('menu')
@endsection

@section('contenu')

    @foreach($rubriques as $y => $rubrique)
      <div class="main-container">
        <div class="rubrique-container">
          <div class="heading{{ $y == 0 ? ' first' : '' }}" 
               style="background-image: url('{!! asset( $rubrique->background_img_url ) !!}');
               background-image: -webkit-image-set( url('{!! asset( $rubrique->background_img_url ) !!}') 1x, url('{!! asset( $rubrique->background_hd_url ) !!}') 2x );
               background-image: image-set( url('{!! asset( $rubrique->background_img_url ) !!}') 1x, url('{!! asset( $rubrique->background_hd_url ) !!}') 2x );" 
               data-rubrique_id="{!! $rubrique->id !!}">
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
            $n = count($rubrique_blocs[$y]);
            $clearfix_counter = 1;
            $order= $rubrique->ascendant ? 'asc' : 'desc'; 
          ?>
          <div class="row" id="blocs-rubrique{{ $rubrique->id }}">

            @for($i=0; $i<$n; $i++)
              @if($rubrique_blocs[$y][$i]->type == 'large')
                <div class="col-12">
                  <div>
                    {!! $rubrique_blocs[$y][$i]->contenu !!}
                  </div>
                </div>
                <?php $clearfix_counter = 1 ?>
              @else
                <div class="col-12{{ $cols }}">
                  <div>
                    {!! $rubrique_blocs[$y][$i]->contenu !!}
                  </div>
                </div>
                @if($rubrique->cols > 1 && $clearfix_counter % $rubrique->cols == 0)
                  <div class="clearfix md-visible-block"></div>
                @endif
                <?php $clearfix_counter++ ?>
              @endif
            @endfor
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
