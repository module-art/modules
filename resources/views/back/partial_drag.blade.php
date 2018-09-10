<!DOCTYPE html>
<html>
  <body>

    <?php
      $y = 0;
      $cols = 12/$rubrique->cols;
      $n = count($rubrique_blocs[$y]);
      $order= $rubrique->ascendant ? 'asc' : 'desc'; 
    ?>
    <div class="row" id="drag-mode" data-id="{{ $id_rubrique }}" >

      @include('back.menu_rubrique')

      @for($i=0; $i<$n; $i++)
        @if($rubrique_blocs[$y][$i]->type == 'h2')
          <div class="col-12">
            <div class="dropy" draggable="true" data-position='{{ $i+1 }}' data-place="{!! $rubrique_blocs[$y][$i]->place !!}">
              <div class="upper"></div>
              {!! $rubrique_blocs[$y][$i]->contenu !!}
            </div>
          </div>
        @else
          <div class="col-12 col-md-{{ $cols }}">
            <div class="dropy" draggable="true" data-position='{{ $i+1 }}' data-place="{!! $rubrique_blocs[$y][$i]->place !!}">
              <div class="upper"></div>
              {!! $rubrique_blocs[$y][$i]->contenu !!}
            </div>
          </div>
        @endif
      @endfor
    </div><!--row-->
      
  </body>
</html>
