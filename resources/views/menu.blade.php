<div class='col-12 col-lg-10'>
  @if(!isset($operation)){{-- case for admin pages --}}
    @if(Auth::check() && Auth::user()->role == 'admin')

      <button type="button" class="btn btn-info sidebarCollapse">
        <i class="fas fa-align-left"></i>
        <span>Menu</span>
      </button>

    @endif
  @endif
  <div class="d-md-none d-flex">
    <a class="navbar-brand ml-0 col-9" href="{{ route( (Auth::check() && Auth::user()->role == 'admin')? 'back_page.show' : 'page.show', 'accueil') }}" id="sm-logo"><img src="/images/baramots_blanc.png" alt="logo"></a>
    <button class="navbar-toggler col-3" type="button" data-toggle="collapse" data-target="#navbars01" aria-controls="navbars03" aria-expanded="false" aria-label="Toggle navigation">
      <!-- <span class="navbar-toggler-icon"></span> -->
      <i class="fas fa-bars"></i>
    </button>
  </div>
  <nav class="navbar navbar-expand-md">

    <div class="collapse navbar-collapse mr-auto" id="navbars01">
      <a class="navbar-brand ml-0 d-none d-md-block" href="{{ route( (Auth::check() && Auth::user()->role == 'admin')? 'back_page.show' : 'page.show', 'accueil') }}" id="logo"><img src="/images/baramots_blanc.png" alt="logo"></a>
      <ul class="navbar-nav justify-content-end">
        @if($menus->count() > 0)
          @foreach($menus as $menu)
            @if(isset($page) && $page->slug == $menu->slug)
              <li id="current_page" class="nav-item active">
            @else
              <li class="nav-item">
            @endif
            @if(Auth::check() && Auth::user()->role == 'admin')
              {{ link_to_route('back_page.show', $menu->menu_title, $menu->slug, ['class' => 'nav-link']) }}
            @else
              {{ link_to_route('page.show', $menu->menu_title, $menu->slug, ['class' => 'nav-link']) }}
            @endif
              </li>
            @endforeach
          @endif
      </ul>

    </div>
  </nav>
</div>
