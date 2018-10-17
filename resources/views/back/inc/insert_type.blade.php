<div class="card-header"><h1>Insertion {{ $type_name }}</h1></div>
<br/>
<div class="card-body"> 
  {!! Form::open(array('route' => ['type.insert', $type_id], 'method' => 'POST')) !!}
  <div class="form-group">
    {!! Form::label('contenu', 'Nom principal :', ['class' => 'control-label']) !!}
    {!! Form::text('contenu', old('contenu'), ['class' => 'form-control' . ( $errors->has('contenu') ? ' is-invalid' : '' )]) !!}
    {!! $errors->first('contenu', '<small class="invalid-feedback">:message</small>') !!}
  </div>
  @for($i=0; $i<$nb_champs; $i++)
    @if(preg_match('/date/', $champs[$i]))
      <div class="form-group">
        <div class="input-group date" id="datetimepicker{{ $i }}" data-target-input="nearest">
          {!! Form::label($champs[$i], $champs[$i] . ' :', ['class' => 'control-label']) !!}
          <input type="text" name="{{ $champs[$i] }}" class="form-control col-12 col-lg-4 offset-lg-1" value="{{ old($champs[$i]) }}"/>
          <div class="input-group-append" data-target="#datetimepicker{{ $i }}" data-toggle="datetimepicker">
            <div class="input-group-text"><i class="fa fa-calendar"></i></div>
          </div>
        </div>
      </div>
    @elseif(preg_match('/_/', $champs[$i]))
      @php
        $unit = preg_replace('/^.*_/', '', $champs[$i]);
        $field_name = preg_replace('/_.*$/', '', $champs[$i]);
        if( $unit == 'nb' ) $unit = '';
        //dd($unit);
      @endphp
      <div class="form-group">
        <div class="form-row">
          <div class="input-group">
            {!! Form::label($champs[$i], $field_name . ' :', ['class' => 'control-label']) !!}
            <input type="number" name="{{ $champs[$i] }}" class="form-control col-12 col-lg-4 offset-lg-1" value="{{ old($champs[$i]) }}"/>
            <div class="input-group-append">
              <div class="input-group-text">{{ $unit }}</div>
            </div>
          </div>
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
  {!! Form::submit('Insérer', ['class' => 'btn btn-info']) !!}
  <a href="javascript:history.back()" class="btn btn-primary pull-right">
    <i class="fa fa-redo"></i> Retour
  </a>
  {!! Form::close() !!}
</div>
