@extends('themes.'.config('modules.theme').'.template')

@section('title')
  <title>Index {{ $type->content_type }}</title>
  <link href="/css/admin.css" rel="stylesheet">
  <link rel="stylesheet" href="/tools/fancybox/jquery.fancybox.min.css">
  <link rel="stylesheet" href="/tools/jquery_ui/jquery-ui.min.css">
@endsection

@section('sidebar')
  @include('common.back.inc.sidebar')
@endsection

@section('menu')
  @include('themes.'.config('modules.theme').'.menu')
@endsection

@section('contenu')
          
  <section class='row center-card'>
    <div>
      @if(session()->has('info'))
        <div class="alert alert-success alert-dismissible">{!! session('info') !!}</div>
      @endif
      @if(session()->has('error'))
        <div class="alert alert-danger alert-dismissible">{!! session('error') !!}</div>
      @endif
      <div class="card" id="typeList" data-typeid="{{$type->id}}">
        <div class="card-header">
          <h3 class="card-title w-50 d-inline-block">Liste du type : {{$type->content_type}}</h3>
          <form method="POST" action="{{ route('bloc.search') }}" class="w-50 float-right form-inline" accept-charset="UTF-8">
            <input name="_token" type="hidden" value="{{ csrf_token() }}">
            <div class="form-group mb-3">
              <input type="text" name="string" class="form-control border-secondary bg-transparent {{ $errors->has("string") ? ' is-invalid' : '' }}">
              <div class="input-group-append">
                <button type="submit" class="btn btn-primary"><span class="icon-search"></span></button>
              </div>
              {!! $errors->first('string', '<small class="invalid-feedback">:message</small>') !!}
            </div>
            <div class="form-group ml-sm-2 mb-3">
              <label for="search-fields">dans le champ </label>
              <select name="field" class="form-control ml-2" id="search-fields">
                @foreach($json_fields as $field)
                  @if( !in_array(strtolower($field->name), ['image', 'photo']) )
                    <option>{{ $field->name }}</option>
                  @endif
                @endforeach
              </select>
            </div>
          </form>
          <p>Nombre total : {{$total}}</p>
        </div>
        <div class="card-body">

          <div id="index-container">
            @include('common.back.inc.insertedTypes-table')
          </div>
          <div class="row justify-content-between px-3">
              <a class="btn btn-info" href="{{ route('type.insertform', $type->content_type) }}">Ajouter {{ $type->content_type }}</a>
            <a href="javascript:history.back()" class="btn btn-primary">
              <i class="fas fa-redo"></i> Retour
            </a>
          </div>
        </div>
        <div class="card-footer d-flex justify-content-end">
          <a class="btn btn-primary btn-sm" href="{{ route('page.home') }}"><i class="fa fa-redo"></i> retour à l'accueil</a>
        </div>
      </div>
    </div>
  </section>

@endsection

@section('scripts')
  <script src="/tools/jquery_ui/jquery-ui.min.js"></script>
  <script src="/js/tinymce/tinymce.min.js"></script>
  <script src="/js/tempus-dominus/moment-with-locales.min.js"></script>
  <script src="/js/tempus-dominus/tempusdominus-bootstrap-4.min.js"></script>
  <script src="/js/admin.js"></script>
  <script src="/js/lists.js"></script>
  <script src="/tools/fancybox/jquery.fancybox.min.js"></script>
@endsection
