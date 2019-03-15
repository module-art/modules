<div class="card-header"><h1>{{ $operation == 'create' ? 'Ajout' : 'Modification' }} d'une page</h1></div>
<br/>
<div class="card-body"> 
  {!! Form::open(array('route' => $operation == 'create' ? 'page.store' : [ 'page.update', $page->id ], 'method' => 'POST')) !!}
  <div class="form-group">
    {!! Form::label('title', 'Description de la nouvelle page :', ['class' => 'control-label']) !!}
    {!! Form::text('title', $operation == 'create' ? old('title') : $page->title, ['class' => 'form-control' . ( $errors->has('title') ? ' is-invalid' : '' )]) !!}
    {!! $errors->first('title', '<small class="invalid-feedback">:message</small>') !!}
  </div>
  <div class="form-group">
    {!! Form::label('menu_title', 'Expression courte pour le menu :', ['class' => 'control-label']) !!}
    {!! Form::text('menu_title', $operation == 'create' ? old('menu_title') : $page->menu_title, ['class' => 'form-control' . ( $errors->has('menu_title') ? ' is-invalid' : '' )]) !!}
    {!! $errors->first('menu_title', '<small class="invalid-feedback">:message</small>') !!}
  </div>
  @if($operation == 'edit')
    <div class="form-group">
      <div class="form-check">
        <input type="checkbox" class="form-check-input" value="1" name="is_home" {{ $operation == 'edit' && $page->is_home ? 'checked readonly' : '' }}>
        <label class="form-check-label" for="is_home"> Page d'accueil</label>
      </div>
    </div>
    <div class="form-group">
      {!! Form::label('place', 'Place dans le menu :', ['class' => 'control-label']) !!}<br>
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
    {!! Form::submit($operation == 'create' ? 'Créer' : 'Modifier', ['class' => 'btn btn-info']) !!}
    <a href="javascript:history.back()" class="btn btn-primary">
      <i class="fa fa-redo"></i> Retour
    </a>
  </div>
  {!! Form::close() !!}
</div>
