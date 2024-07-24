<div class="card-header"><h1>{{ $operation == 'create' ? 'Ajout' : 'Modification' }} d'une page</h1></div>
<br/>
<div class="card-body"> 
  @if($operation == 'create')
    <form method="POST" action="{{ route('page.store') }}" accept-charset="UTF-8">
  @else
    <form method="POST" action="{{ route('page.update', $page->id) }}" accept-charset="UTF-8">
  @endif
    <input name="_token" type="hidden" value="{{ csrf_token() }}">
    <div class="form-group">
      <label for="title" class="control-label">Description de la nouvelle page :</label>
      <input class="form-control{{ $errors->has('title') ? ' is-invalid' : '' }}" name="title" type="text" id="title" value="{{ $operation == 'create' ? old('title') : $page->title }}">
      {!! $errors->first('title', '<small class="invalid-feedback">:message</small>') !!}
    </div>
    <div class="form-group">
      <label for="menu_title" class="control-label">Expression courte pour le menu :</label>
      <input class="form-control{{ $errors->has('menu_title') ? ' is-invalid' : '' }}" name="menu_title" type="text" id="menu_title" value="{{ $operation == 'create' ? old('menu_title') : $page->menu_title }}">
      {!! $errors->first('menu_title', '<small class="invalid-feedback">:message</small>') !!}
    </div>
    @if($operation == 'edit')
      <div class="form-group">
        <div class="form-check">
          <input type="checkbox" class="form-check-input" value="1" name="is_home" {{ $operation == 'edit' && $page->is_home ? 'checked disabled' : '' }}>
          <label class="form-check-label" for="is_home"> Page d'accueil</label>
        </div>
      </div>
      <div class="form-group">
        <label for="place" class="control-label">Place dans le menu :</label><br>
        @foreach($menus as $y => $menu)
          <div class="form-check form-check-inline">
            @if($menu->place == $page->place)
              <input class="form-check-input" type="radio" name="place" id="inlineRadio{{ $y }}" value="{{ $menu->place }}" checked />
            @else
              <input class="form-check-input" type="radio" name="place" id="inlineRadio{{ $y }}" value="{{ $menu->place }}"/>
            @endif
            <label class="form-check-label" for="inlineRadio{{ $y }}"><?php echo e($menu->place); ?></label>
          </div>
        @endforeach
        @if(!$page->place)
          @if($menus->count() > 0)
            @php $y++; @endphp
          @else
            @php $y = 0; @endphp
          @endif
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="place" id="inlineRadio{{ $y }}" value="{{ $y+1 }}" />
              <label class="form-check-label" for="inlineRadio{{ $y }}">{{ $y+1 }}</label>
          </div>
        @endif
        @php $y++; @endphp
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="place" id="inlineRadio{{ $y }}" value="0"{{ $page->place ? '' : ' checked' }} />
            <label class="form-check-label" for="inlineRadio{{ $y }}">hors menu</label>
        </div>
      </div>
    @endif
    <div class="row justify-content-between px-3">
      <input class="btn btn-info" type="submit" value="{{ $operation == 'create' ? 'Créer' : 'Modifier' }}">
      <a href="javascript:history.back()" class="btn btn-primary">
        <i class="fa fa-redo"></i> Retour
      </a>
    </div>
  </form>
</div>
