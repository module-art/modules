@extends('template')

@section('title')
  <title>test Drop</title>
<style>
  [class*="col-"]{
    /*border: 1px black solid;*/
  }
  [class*="col-"] div{
    margin-top: 20px;
    height: 220px;
    border: 1px black solid;
  }
  div h2{
    text-align: center;
    margin-top: 20%;
  }
</style>
@endsection

@section('contenu')
  <div class="container after-titre">
    <div class="row" id="drag-mode" >

      @for($i=0; $i<12; $i++)
        <div class='col-sm-4'>
          <div class="editable dropy" draggable="true" data-place='{{ $i }}' >
            <h2>{{ $i }}</h2>
          </div>
        </div>
      @endfor

    </div>
  </div>
@endsection

@section('scripts')
  <script src='/js/dragdrop.js' ></script>
@endsection
