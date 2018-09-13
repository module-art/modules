
<button class="btn btn-sm btn-outline-danger btn-destroy" ><i class="fas fa-trash-alt"></i></button>
<div class="heading editrubrique{{ isset($y) && $y == 0 ? ' first' : '' }}" 
data-rubrique_id="{!! $rubrique->id !!}">
  {!! $rubrique->contenu !!}
</div>
@if($page->slug == 'contact')
  <a class="more" href="#blocs-rubrique{{ $rubrique->id }}">Voir</a>
@endif
