
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
<div class="row" id="blocs-rubrique{{ $rubrique->id }}" >

  @include('back.menu_rubrique')

  @for($i=0; $i<$n; $i++)
    @if($rubrique_blocs[$y][$i]->type == 'large')
      <div class="col-12 large-bloc">
        <button class="btn btn-sm btn-outline-danger btn-destroy" ><i class="fas fa-trash-alt"></i></button>
        <div class="editable" data-bloc_id="{!! $rubrique_blocs[$y][$i]->id !!}">
          {!! $rubrique_blocs[$y][$i]->contenu !!}
        </div>
      </div>
        <?php $clearfix_counter = 1 ?>
    @else
      <div class="col-12{{ $cols }}">
        <button class="btn btn-sm btn-outline-danger btn-destroy" ><i class="fas fa-trash-alt"></i></button>
        <div class="editable" data-bloc_id="{!! $rubrique_blocs[$y][$i]->id !!}">
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
