
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
      'champs' => explode(',', $type->champs),
      'results' => myControl::getSortedTypeRubriques($type, $type->default_filtre, $type->descendant)
    ])
  </div>
@elseif(isset($type_content) && $type_content->type_id == 1)
  {{--$type_content is a rubrique--}}
  @php
  $titre = $type_content->blocs()->where('type','titre')->first();
  $texte = $type_content->blocs()->where('type','texte')->first();
  @endphp
  {{--<span class="editdate"></span>
  <span class="editheure"></span>--}}
  {{--<span class="editheure"></span>--}}
  <div class="large-bloc type-content">
    {{ ( new Date($titre->created_at) )->format('D j F Y') }}
    <div class="editable" data-bloc_id="{!! $titre->id !!}">{!! $titre->contenu !!}</div>
    <div class="editable" data-bloc_id="{!! $texte->id !!}">{!! $texte->contenu !!}</div>
    {{--<div class="input-group editdate" id="datepicker1" data-target-input="nearest" data-bloc_id="{!! $date_fabrication->id !!}">
      <input type="text" class="form-control datetimepicker-input" data-target="#datepicker1" value="{!! preg_replace('/(19|20)(\d{2})(\d{2})(\d{2})/', '$4/$3/$1$2', $date_fabrication->contenu) !!}" data-toggle="datetimepicker"/>
    </div>--}}
    @foreach($type_content->categories as $categorie)
      {{ $categorie->name }}
    @endforeach
  </div>
@endif
