<div class="row justify-content-center">
    <a class="" href="{{ route( (Auth::check() && Auth::user()->role == 'admin')? 'back_page.show' : 'page.show', 'accueil') }}" id="logo"><img src="/images/logo.svg" alt="logo"></a>
</div>

@if(!isset($operation)){{-- case for admin pages --}}
  @if(Auth::check() && Auth::user()->role == 'admin')

    <button type="button" class="btn btn-info sidebarCollapse">
      <i class="fas fa-align-left"></i>
      <span>Menu</span>
    </button>

  @endif
@endif

@if($menus->count() > 0)
  <nav class="navbar navbar-expand-md justify-content-center">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbars01" aria-controls="navbars03" aria-expanded="false" aria-label="Toggle navigation">
      <!-- <span class="navbar-toggler-icon"></span> -->
      <i class="fas fa-bars"></i>
    </button>

    <div class="collapse navbar-collapse" id="navbars01">
      <ul class="navbar-nav justify-content-center flex-column flex-sm-row">
          @foreach($menus as $menu)
            @if(isset($page) && $page->slug == $menu->slug)
              <li id="current_page" class="nav-item active">
            @else
              <li class="nav-item">
            @endif

            <div class="svg-wrapper d-flex justify-content-center">
              <a href="{{ route(Auth::check() && Auth::user()->role == 'admin'? 'back_page.show' : 'page.show', $menu->slug) }}">
                <svg xmlns="http://www.w3.org/2000/svg">
                  <rect class="shape{{ isset($page->slug) && $page->slug == $menu->slug ? ' active' : '' }}" height="60" width="110"/>
                  {{--<text x="15%" y="60%">--}}
                  {{--</text>--}}
                </svg>
                <span class="text">{{ $menu->menu_title }}</span>
              </a>
            </div>

          </li>
          @endforeach
      </ul>

    </div>
  </nav>
@endif
