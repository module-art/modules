<footer class="container-fluid">

  <div class="row footer-item">
    <div class="col-12 col-sm-6">
      <div{{ Auth::check() ? ' data-bloc_id=' . $footer->blocs->where('place', '=', 1)->first()->id . ' class=editable' : '' }}>
        {!! $footer->blocs->where('place', '=', 1)->first()->contenu !!}
      </div>
    </div>

    <div class="col-12 col-sm-6 row">
      @if(isset($page) && $page->slug != 'contact')
      <ul class="col-12 list-inline">
        <li class="list-inline-item"><a  class="circle-border" href="{{ route(Auth::check() ? 'back_page.show' : 'page.show', 'contact') }}"><i class="far fa-envelope"></i></a>
        </li>
        <li class="list-inline-item">
          <div{{ Auth::check() ? ' data-bloc_id="' . $footer->blocs->where('place', '=', 2)->first()->id . '" class="editable"' : '' }}>
          {!! $footer->blocs->where('place', '=', 2)->first()->contenu !!}
          </div>
        </li>
      </ul>
      @endif
      <ul class="col-12 list-inline">
        <li class="list-inline-item"><a  class="circle-border" href="tel:0033652893386"><i class="fas fa-phone"></i></a>
        </li>
        <li class="list-inline-item">
          <div{{ Auth::check() ? ' data-bloc_id="' . $footer->blocs->where('place', '=', 3)->first()->id . '" class="editable"' : '' }}>
          {!! $footer->blocs->where('place', '=', 3)->first()->contenu !!}
          </div>
        </li>
      </ul>
      <ul class="col-12 list-inline">
        <li class="list-inline-item"><a  class="circle-border" href="https://github.com/module-art"><i class="fab fa-github"></i></a>
        </li>
      </ul>
    </div>
  </div>

  <div class="row justify-content-center footer-item">
    <div class="col-12 col-md-8 col-xl-6">
    </div>
  </div>

  
</footer>
