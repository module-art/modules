
{{--<button class="btn btn-sm btn-outline-danger btn-destroy" ><i class="fas fa-trash-alt"></i></button>--}}
<div class="heading editrubrique" 
  @if(isset($bg_img) && $bg_img[0] != '')
    style="background-image: url('{!! asset( $bg_img[0] ) !!}');"
  @else
    style="background-image: url('/images/visuel.jpg');"
  @endif
data-rubrique_id="{!! isset($rubrique) ? $rubrique->id : '' !!}"
>
  @if(isset($bg_img) && $bg_img[0] != '')
    {!! isset($rubrique) ? $rubrique->contenu : '' !!}
  @endif
</div>
