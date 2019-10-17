
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
<div class="row markerRow" id="blocs-rubrique{{ $rubrique->id }}" >

  @include('common.back.inc.menu_rubrique')

  @foreach($rubrique->blocs()->orderBy('place', $order)->get() as $bloc)
    @if($bloc->type == 'gallery')
      @php
        $bloc_contenu = $bloc->contenu;
        $gallery_data[0] = $bloc_contenu;
        //parseGallery function is declared in inclusion line 1
        $gallery_data[1] = preg_replace('/(<p>)?.*\[gallery\surl="\/(.*)"\stype="(.*)"\].*(<\/p>)?/', '$2', $bloc_contenu);
        $gallery_data[2] = preg_replace('/(<p>)?.*\[gallery\surl="\/(.*)"\stype="(.*)"\].*(<\/p>)?/', '$3', $bloc_contenu);
        $fancy_html = ModuleControl::parseGallery($gallery_data);
      @endphp
      <div class="col-12" data-bloc_id="{!! $bloc->id !!}">
        <button class="btn btn-sm btn-outline-danger btn-destroy" ><i class="fas fa-trash-alt"></i></button>
        {!! $fancy_html !!}
      </div>
    @elseif($bloc->type == 'large')
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

@include('common.type-contents-conditions', ['context' => 'back'])
