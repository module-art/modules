
<button class="btn btn-sm btn-outline-danger btn-destroy" ><i class="fas fa-trash-alt"></i></button>
<div class="heading editrubrique{{ isset($y) && $y == 0 ? ' first' : '' }}" 
@if(isset($rubrique->background_img_url))
  style="background-image: url('{!! asset( $rubrique->background_img_url ) !!}');
  background-image: -webkit-image-set( url('{!! asset( $rubrique->background_img_url ) !!}') 1x, url('{!! asset( $rubrique->background_hd_url ) !!}') 2x );
    background-image: image-set( url('{!! asset( $rubrique->background_img_url ) !!}') 1x, url('{!! asset( $rubrique->background_hd_url ) !!}') 2x );" 
@endif
data-rubrique_id="{!! $rubrique->id !!}">
  {!! $rubrique->contenu !!}
</div>
<a class="more" href="#blocs-rubrique{{ $rubrique->id }}">Voir</a>
