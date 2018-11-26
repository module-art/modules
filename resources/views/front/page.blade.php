@extends('template')

@section('title')
  <title>{{ $page->title }}</title>
  <link href="/css/styles.css" rel="stylesheet">
@endsection

@section('contenu')

  @foreach($page->rubriques()->orderBy('place')->get() as $y => $rubrique)
      <div class="main-container">

        <div class="rubrique-container">
          <div class="heading"
            @if(isset($bg_img) && $bg_img[0] != '')
              style="background-image: url('{!! asset( $bg_img[0] ) !!}');"
            @else
              style="background-image: url('/images/visuel.jpg');"
            @endif>
            @if(isset($bg_img) && $bg_img[0] != '')
              {!! $rubrique->contenu !!}
            @endif
          </div>
        </div><!--rubrique-->

        @include('menu')

        <div class='d-flex justify-content-center'>
          <div id="blocs-rubrique{{ $rubrique->id }}" class="after-rubrique{{ $rubrique->blocs()->count() > 0 ? ' not-empty' : ''}}">
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
                  @php
                    $type = $rubrique->inclusive_type;
                  @endphp
                  {{--next include redirect to the specific view--}}
                  @include('front.type-list-'.$type->content_type, [
                    'results' => myControl::getSortedTypeRubriques($type, $type->default_filtre, $type->descendant)
                  ])
                </div>
              @elseif(isset($type_content))
                @include('front.type-content-'.$type_content->type['content_type'], [$type_content])
                {{--$type_content is a rubrique--}}
              @endif

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
  @if($page->slug == 'contact')
  @else
    {{--<script>

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
    </script>--}}
  @endif
@endsection
