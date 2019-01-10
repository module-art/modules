@extends('grands_chemins.template')

@section('title')
  <title>{{ $page->title }}</title>
  <link href="/css/styles.css" rel="stylesheet">
  <link rel="stylesheet" href="/tools/fancybox/jquery.fancybox.min.css">
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

        @include('grands_chemins.menu')

        <div class='d-flex justify-content-center'>
          <div id="blocs-rubrique{{ $rubrique->id }}" class="after-rubrique{{ $rubrique->blocs()->count() > 0 || isset($rubrique->type_contents) || isset($type_content) ? ' not-empty' : ''}}">
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
                  @if(View::exists('grands_chemins.front.type-list-'.$type->content_type))
                    {{--next include redirect to the specific view--}}
                    @include('grands_chemins.front.type-list-'.$type->content_type, [
                    'results' => ModuleControl::getSortedTypeRubriques($type, $type->default_filtre, $type->descendant)
                  ])
                  @else
                    {{--next include displays any type contents in a table--}}
                    @include('common.front.type-contents', [
                      'champs' => explode(',', $type->champs),
                      'results' => ModuleControl::getSortedTypeRubriques($type, $type->default_filtre, $type->descendant)
                    ])
                  @endif
                </div>
              @elseif(isset($type_content))
                @include('grands_chemins.front.type-content-'.$type_content->type['content_type'], [$type_content])
                {{--$type_content is a rubrique--}}
              @endif

              @if($page->slug == 'contact')
                @include('grands_chemins.front.contact')
              @endif

          </div><!--after-rubrique-->
        </div>
      </div><!--main-container-->
    @endforeach

@endsection

@if(isset($footer))
  @section('footer')
    @include('grands_chemins.footer')
  @endsection
@endif

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
});
    </script>
  @endif
  <script src="/tools/fancybox/jquery.fancybox.min.js"></script>
@endsection
