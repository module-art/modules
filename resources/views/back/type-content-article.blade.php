  @php
  $titre = $type_content->blocs()->where('type','titre')->first();
  $texte = $type_content->blocs()->where('type','texte')->first();
  @endphp
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
