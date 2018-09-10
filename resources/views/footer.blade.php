<footer class="container-fluid">

  <div class="row justify-content-center footer-item">
    <div class="col-12 col-md-8 col-xl-6">
      <div data-bloc_id="{!! $footer->blocs->where('place', '=', 1)->first()->id !!}" class="{{ Auth::check() ? 'editable' : '' }}">
        {!! $footer->blocs->where('place', '=', 1)->first()->contenu !!}
      </div>
    </div>
  </div>

  <div class="row justify-content-center">
    <ul class="col-12 col-md-8 col-xl-6 list-inline">
      <li class="list-inline-item"><a href="#"><i class="fab fa-twitter"></i><span class="sr-only">Twitter</span></a></li>
      <li class="list-inline-item"><a href="#"><i class="fab fa-facebook"></i><span class="sr-only">Facebook</span></a></li>
      <li class="list-inline-item"><a href="#"><i class="fab fa-instagram"></i><span class="sr-only">Instagram</span></a></li>
      <li class="list-inline-item"><a href="{{ route(Auth::check() ? 'back_page.show' : 'page.show', 'contact') }}"><i class="far fa-envelope"></i><span class="sr-only">Email</span></a></li>
    </ul>
  </div>

  <div class="row justify-content-center footer-item">
    <div class="col-12 col-md-8 col-xl-6">
      <div data-bloc_id="{!! $footer->blocs->where('place', '=', 2)->first()->id !!}" class="{{ Auth::check() ? 'editable' : '' }}">
        {!! $footer->blocs->where('place', '=', 2)->first()->contenu !!}
      </div>
    </div>
  </div>

  
</footer>
