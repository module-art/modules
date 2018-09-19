
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
