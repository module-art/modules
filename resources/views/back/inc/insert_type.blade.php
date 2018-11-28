<div class="card-header"><h2>Insertion {{ $type->content_type }}</h2></div>
<br/>
<div class="card-body"> 
  {!! Form::open(array('route' => ['type.insert', $type->id], 'method' => 'POST')) !!}
  @for($i=0; $i<$nb_champs; $i++)
    @if(preg_match('/date/', $champs[$i]))
      <div class="form-group">
        <div class="input-group">
          {!! Form::label($champs[$i], $champs[$i] . ' :', ['class' => 'control-label']) !!}
          <input id="datetimepicker{{ $i }}" data-target-input="nearest" type="text" name="{{ $champs[$i] }}" class="form-control datetimepicker-input date col-12 col-lg-4 offset-lg-1" data-target="#datetimepicker{{ $i }}" data-toggle="datetimepicker" value="{{ old($champs[$i]) }}"/>
          <div class="input-group-append" data-target="#datetimepicker{{ $i }}" data-toggle="datetimepicker">
            <div class="input-group-text"><i class="fa fa-calendar"></i></div>
          </div>
        </div>
      </div>
    @elseif(preg_match('/heure|horaire/', $champs[$i]))
      <div class="form-group">
        <div class="input-group">
          {!! Form::label($champs[$i], $champs[$i] . ' :', ['class' => 'control-label']) !!}
          <input id="datetimepicker{{ $i }}" data-target-input="nearest" type="text" name="{{ $champs[$i] }}" class="form-control datetimepicker-input heure col-12 col-lg-4 offset-lg-1" data-target="#datetimepicker{{ $i }}" data-toggle="datetimepicker" value="{{ old($champs[$i]) }}"/>
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
            <input type="number" name="{{ $champs[$i] }}" class="form-control col-12 col-lg-4 offset-lg-1" value="{{ old($champs[$i]) }}"/>
            @if($unit != '')
              <div class="input-group-append">
                <div class="input-group-text">{{ $unit }}</div>
              </div>
            @endif
          </div>
        </div>
      </div>
    @elseif($champs[$i] == 'galeries')
      <div class="form-group">
        {!! Form::label($champs[$i], $champs[$i] . ' :', ['class' => 'control-label']) !!}
        <textarea name="{{ $champs[$i] }}" class="form-control gallery-redactored">{{ old($champs[$i]) }}</textarea>
      </div>
      <div class="form-row justify-content-between">
        <div class="form-group col-12 col-md-4">
          <button class="btn btn-primary btn-sm" type="button" id="add-gallery" data-toggle="collapse" data-target="#gallery-collapse" aria-expanded="false" aria-controls="gallery-collapse"><i class="far fa-images"></i> Ajouter une galerie d'images</button>
        </div>
        <div class="collapse col-12 col-md-6" id="gallery-collapse">
          <select multiple class="form-control" name="gallery">
            @foreach($galleries as $key => $value)
              <option class="select-gallery" value="{{ $value }}">{{ $key }}</option>
            @endforeach
          </select>
        </div>
      </div>
    @else
      <div class="form-group">
        {!! Form::label($champs[$i], $champs[$i] . ' :', ['class' => 'control-label']) !!}
        {{--{!! Form::text($champs[$i], old($champs[$i]), ['class' => 'form-control redactored']) !!}--}}
        <textarea name="{{ $champs[$i] }}" class="form-control redactored">{{ old($champs[$i]) }}</textarea>
      </div>
    @endif
  @endfor
</div>
