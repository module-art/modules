@php
  $editing = isset($type_content) ? true : false;
@endphp

<div class="card-header"><h2>Insertion {{ $type->content_type }}</h2></div>
<br/>
<div class="card-body"> 
  <div class="form-row">
    <div class="form-group col-12 col-md-5">
      <button class="btn btn-primary btn-sm" type="button" id="add-gallery" aria-expanded="false" aria-controls="gallery-collapse"><i class="far fa-images"></i> Ajouter une galerie d'images</button>
    </div>
    <div class="collapse col-12 col-md-7" id="gallery-collapse">
      {{--ajax include galleries on click to show--}}
      @include('common.back.inc.galleries')
    </div>
  </div>
  {!! Form::open(array('route' => $editing ? ['type.insertUpdate', $type->id, $type_content->id] : ['type.insert', $type->id], 'method' => 'POST')) !!}
  <div class="form-row">
    <div class="form-check col-12 col-md-6">
      <input type="checkbox" name="publie" value="1"{{ $editing && $type_content->publie ? ' checked' : '' }}/>
      <label for="publie"> Publié</label><br />
    </div>
    <div class="form-check col-12 col-md-6">
      <input type="checkbox" name="archive" value="1"{{ $editing && $type_content->archive ? ' checked' : '' }}/>
      <label for="archive"> Archivé</label><br />
    </div>
  </div>

  @if($type->child_of > 0)
    <div class="form-row">
      <div class="col-2 col-form-label">
        {{ Form::label('parent_id', 'Appartient à :' ) }}
      </div>
      <div class="col-10 form-group">
        @foreach($parent_type->rubriques as $parent)
          <div class="form-check">
            <input class="form-check-input" type="radio" name="parent_id" value="{{ $parent->id }}"{{ ($editing && $parent->id == $type_content->parent_id) ? 'checked' : '' }}/>
            <label class="form-check-label"> {!! strip_tags( $parent->blocs()->where('place', '1')->first()->contenu ) !!}</label>
          </div>
        @endforeach
      </div>
    </div>
  @endif

  @for($i=0; $i<$nb_champs; $i++)
    @php
      if($editing){
        $contenu = $type_content->blocs()->where('type', $champs[$i])->first()->contenu;
      }
    @endphp
    @if(preg_match('/date/i', $champs[$i]))
      <div class="form-group">
        <div class="form-row">
          {!! Form::label($champs[$i], str_replace('_', ' ', $champs[$i]) . ' :', ['class' => 'control-label col-12 col-lg-3']) !!}
          <div class="input-group date col-12 col-lg-4" id="datepicker{{ $i }}" data-target-input="nearest">
            <input type="text" name="{{ $champs[$i] }}" class="form-control datetimepicker-input" value="{{ $editing ? date_format(date_create($contenu), 'd/m/Y') : old($champs[$i]) }}"/>
            <div class="input-group-append" data-target="#datepicker{{ $i }}" data-toggle="datetimepicker">
              <div class="input-group-text"><i class="fa fa-calendar"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    @elseif(preg_match('/heure|horaire/i', $champs[$i]))
      <div class="form-group">
        <div class="form-row">
          {!! Form::label($champs[$i], str_replace('_', ' ', $champs[$i]) . ' :', ['class' => 'control-label col-12 col-lg-3']) !!}
          <div class="input-group heure col-12 col-lg-4" id="timepicker{{ $i }}" data-target-input="nearest">
            <input type="text" name="{{ $champs[$i] }}" class="form-control datetimepicker-input" value="{{ $editing ? date_format(date_create($contenu), 'H:i') : old($champs[$i]) }}"/>
            <div class="input-group-append" data-target="#timepicker{{ $i }}" data-toggle="datetimepicker">
              <div class="input-group-text"><i class="fa fa-clock"></i></div>
            </div>
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
            {!! Form::label($champs[$i], str_replace('_', ' ', $field_name) . ' :', ['class' => 'control-label']) !!}
            <input type="number" name="{{ $champs[$i] }}" class="form-control col-12 col-lg-4 offset-lg-1" value="{{ $editing ? $contenu : old($champs[$i]) }}"/>
            @if($unit != '')
              <div class="input-group-append">
                <div class="input-group-text">{{ $unit }}</div>
              </div>
            @endif
          </div>
        </div>
      </div>
    @elseif(preg_match('/titre/i', $champs[$i]))
      <div class="form-group">
        {!! Form::label($champs[$i], str_replace('_', ' ', $champs[$i]) . ' :', ['class' => 'control-label']) !!}
        <textarea name="{{ $champs[$i] }}" class="form-control simple-redactored">{{ $editing ? $contenu : old($champs[$i]) }}</textarea>
      </div>
    @else
      <div class="form-group">
        {!! Form::label($champs[$i], str_replace('_', ' ', $champs[$i]) . ' :', ['class' => 'control-label']) !!}
        <textarea name="{{ $champs[$i] }}" class="form-control redactored">{{ $editing ? $contenu : old($champs[$i]) }}</textarea>
      </div>
    @endif
  @endfor
</div>
