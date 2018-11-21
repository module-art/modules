
<button class="btn btn-sm btn-outline-danger btn-destroy" ><i class="fas fa-trash-alt"></i></button>
<div class="heading editrubrique{{ isset($y) && $y == 0 ? ' first' : '' }}" 
  @if(isset($bg_img) && $bg_img[0] != '')
    style="background-image: url('{!! asset( $bg_img[0] ) !!}');
  background-image: -webkit-image-set( url('{!! asset( $bg_img[0] ) !!}') 1x, url('{!! asset( $bg_img[1] ) !!}') 2x );
    background-image: image-set( url('{!! asset( $bg_img[0] ) !!}') 1x, url('{!! asset( $bg_img[1] ) !!}') 2x );" 
  @else
    style="background-image: url('/storage/img/visuel3200.jpg');"
  @endif
data-rubrique_id="{!! $rubrique->id !!}" data-rubrique_cols="{!! $rubrique->cols !!}">
</div>
