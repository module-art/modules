
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
  $order= $rubrique->ascendant ? 'asc' : 'desc'; 
?>
<div class="row" >

  @include('back.menu_rubrique')

  @foreach($rubrique->blocs()->orderBy('place', $order)->get() as $bloc)
    @if($bloc->type == 'large')
      <div class="col-12 large-bloc">
        <button class="btn btn-sm btn-outline-danger btn-destroy" ><i class="fas fa-trash-alt"></i></button>
        <div class="editable" data-bloc_id="{!! $bloc->id !!}">
          {!! $bloc->contenu !!}
        </div>
      </div>
    @else
      <div class="col-12{{ $cols }}">
        <button class="btn btn-sm btn-outline-danger btn-destroy" ><i class="fas fa-trash-alt"></i></button>
        <div class="editable" data-bloc_id="{!! $bloc->id !!}">
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
    {{--next include tests any type contents in a table--}}
    {{--@include('back.type-contents', [
      'champs' => explode(',', $type->champs),
      'results' => myControl::getSortedTypeRubriques($type, $type->default_filtre, $type->descendant)
    ])--}}
    {{--next include redirect to the specific view--}}
    @include('back.type-list-'.$type->content_type, [
      'results' => myControl::getSortedTypeRubriques($type, $type->default_filtre, $type->descendant)
    ])
  </div>
@elseif(isset($type_content))
  @include('back.type-content-'.$type_content->type['content_type'], [$type_content])
  {{--$type_content is a rubrique--}}
@endif
