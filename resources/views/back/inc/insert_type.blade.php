<div class="card-header"><h2>Insertion {{ $type->content_type }}</h2></div>
<br/>
<div class="card-body"> 
  <div class="form-row">
    <div class="form-group col-12 col-md-5">
      <button class="btn btn-primary btn-sm" type="button" id="add-gallery" aria-expanded="false" aria-controls="gallery-collapse"><i class="far fa-images"></i> Ajouter une galerie d'images</button>
    </div>
    <div class="collapse col-12 col-md-7" id="gallery-collapse">
      {{--ajax include galleries on click to show--}}
      @include('back.inc.galleries')
    </div>
  </div>
  @php
    $editing = false;
    if(isset($type_content)){
      $editing = true;
    }
  @endphp
  {!! Form::open(array('route' => $editing ? ['type.insertUpdate', $type->id, $type_content->id] : ['type.insert', $type->id], 'method' => 'POST')) !!}
  @for($i=0; $i<$nb_champs; $i++)
    @php
      if($editing){
        $contenu = $type_content->blocs()->where('type', $champs[$i])->first()->contenu;
      }
    @endphp
    @if(preg_match('/date/', $champs[$i]))
      <div class="form-group">
        <div class="input-group">
          {!! Form::label($champs[$i], $champs[$i] . ' :', ['class' => 'control-label']) !!}
          <input id="datetimepicker{{ $i }}" data-target-input="nearest" type="text" name="{{ $champs[$i] }}" class="form-control datetimepicker-input date col-12 col-lg-4 offset-lg-1" data-target="#datetimepicker{{ $i }}" data-toggle="datetimepicker" value="{{ $editing ? preg_replace('/(19|20)(\d{2})(\d{2})(\d{2})/', '$4/$3/$1$2', $contenu) : old($champs[$i]) }}"/>
          <div class="input-group-append" data-target="#datetimepicker{{ $i }}" data-toggle="datetimepicker">
            <div class="input-group-text"><i class="fa fa-calendar"></i></div>
          </div>
        </div>
      </div>
    @elseif(preg_match('/heure|horaire/', $champs[$i]))
      <div class="form-group">
        <div class="input-group">
          {!! Form::label($champs[$i], $champs[$i] . ' :', ['class' => 'control-label']) !!}
          <input id="datetimepicker{{ $i }}" data-target-input="nearest" type="text" name="{{ $champs[$i] }}" class="form-control datetimepicker-input heure col-12 col-lg-4 offset-lg-1" data-target="#datetimepicker{{ $i }}" data-toggle="datetimepicker" value="{{ $editing ? preg_replace('/(\d{2})(\d{2})/', '$1:$2', $contenu) : old($champs[$i]) }}"/>
          <div class="input-group-append" data-target="#datetimepicker{{ $i }}" data-toggle="datetimepicker">
            <div class="input-group-text"><i class="fa fa-clock"></i></div>
          </div>
        </div>
      </div>
    @elseif(preg_match('/\(nb\)/', $champs[$i]))
      @php
        $unit = preg_replace('/^.*\(nb\)/', '', $champs[$i]);
        $field_name = preg_replace('/\(nb\).*$/', '', $champs[$i]);
      @endphp
      <div class="form-group">
        <div class="form-row">
          <div class="input-group">
            {!! Form::label($champs[$i], $field_name . ' :', ['class' => 'control-label']) !!}
            <input type="number" name="{{ $champs[$i] }}" class="form-control col-12 col-lg-4 offset-lg-1" value="{{ $editing ? $contenu : old($champs[$i]) }}"/>
            @if($unit != '')
              <div class="input-group-append">
                <div class="input-group-text">{{ $unit }}</div>
              </div>
            @endif
          </div>
        </div>
      </div>
    @elseif(preg_match('/titre/', $champs[$i]))
      <div class="form-group">
        <div class="input-group">
        {!! Form::label($champs[$i], $champs[$i] . ' :', ['class' => 'control-label']) !!}
        <textarea name="{{ $champs[$i] }}" class="form-control simple-redactored">{{ $editing ? $contenu : old($champs[$i]) }}</textarea>
        </div>
      </div>
    @else
      <div class="form-group">
        {!! Form::label($champs[$i], $champs[$i] . ' :', ['class' => 'control-label']) !!}
        <textarea name="{{ $champs[$i] }}" class="form-control redactored">{{ $editing ? $contenu : old($champs[$i]) }}</textarea>
      </div>
    @endif
  @endfor
</div>
