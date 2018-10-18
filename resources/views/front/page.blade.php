@extends('template')

@section('title')
  <title>{{ $page->title }}</title>
  <link href="/css/styles.css" rel="stylesheet">
@endsection

@section('contenu')

  @foreach($page->rubriques()->orderBy('place')->get() as $y => $rubrique)
      <div class="main-container">

        <div class='overlay'>
          
          <div class="head d-flex justify-content-center">
            @include('menu')
          </div>

          <div class="rubrique-container">
            <div class="heading">
              {!! $rubrique->contenu !!}
            </div>
            <a class="more" href="#blocs-rubrique{{ $rubrique->id }}">Voir</a>
          </div><!--rubrique-->
          <div class='d-flex justify-content-center'>
            <div id="blocs-rubrique{{ $rubrique->id }}" class="col-12 col-lg-10 col-xl-9 after-rubrique{{ $rubrique->blocs()->count() > 0 ? ' not-empty' : ''}}">
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
              <div class="row">

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

              @if(isset($rubrique->type_contents))
                <div class="large-bloc type-contents" data-content_type='{{ $rubrique->inclusive_type['content_type'] }}' data-filtre="{{ $rubrique->inclusive_type['default_filtre'] }}" data-desc="{{ $rubrique->inclusive_type['descendant'] }}">
                </div>
              @endif

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
  @if($page->slug == 'contact')
  @else
    <script>

$(document).ready(function() {
  //resize videos
    var videos = $('.after-rubrique iframe');
    if(videos.length != 0){
      videos.each(function(){
        $(this).removeAttr('style');
        var wid = $(this).width();
        $(this).height(Math.round(wid*9/16));
      })
    }

    //get types contents
    var typeContents = $('.type-contents');

    typeContents.each(function(){
      var type = $(this).attr('data-content_type'),
          filtre = $(this).attr('data-filtre'),
          desc = $(this).attr('data-desc');

      $(this).load('/get-type-contents/'+type+'?orderby='+filtre+'&desc='+desc, function(response, status, xhr){
        if( status == "error" ){
          console.log(xhr.statusText);
        }
      });
    });
});
    </script>
  @endif
@endsection
