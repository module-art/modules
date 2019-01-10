<!DOCTYPE html>
<html>
  <body>

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
    <div class="row" id="drag-mode" data-id="{{ $id_rubrique }}" >

      @include('common.back.inc.menu_rubrique')

      @foreach($rubrique->blocs()->orderBy('place', $order)->get() as $y => $bloc)
        @if($bloc->type == 'large')
          <div class="col-12 large-bloc">
            <div class="dropy" draggable="true" data-position='{{ $y+1 }}' data-place="{!! $bloc->place !!}">
              <div class="upper"></div>
              {!! $bloc->contenu !!}
            </div>
          </div>
        @else
          <div class="col-12{{ $cols }}">
            <div class="dropy" draggable="true" data-position='{{ $y+1 }}' data-place="{!! $bloc->place !!}">
              <div class="upper"></div>
              {!! $bloc->contenu !!}
            </div>
          </div>
        @endif
      @endforeach

    </div><!--row-->
      
  </body>
</html>
