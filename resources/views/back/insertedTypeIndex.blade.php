@extends('template')

@section('title')
  <title>Index {{ $type->content_type }}</title>
  <link href="/css/admin.css" rel="stylesheet">
@endsection

@section('contenu')
          
  @include('menu')

  @include('back.type-contents', [
    'champs' => explode(',', $type->champs),
    'results' => ModuleControl::getSortedTypeRubriques($type, $type->default_filtre, $type->descendant)
  ])

@endsection

@section('scripts')
  <script src="/tools/tinymce/tinymce.min.js"></script>
  <script src="/js/tempus-dominus/moment-with-locales.min.js"></script>
  <script src="/js/tempus-dominus/tempusdominus-bootstrap-4.min.js"></script>
  <script src="/js/modular_admin.js"></script>
  <script src="/js/contact.js"></script>
  <script src="/tools/fancybox/jquery.fancybox.min.js"></script>
@endsection
