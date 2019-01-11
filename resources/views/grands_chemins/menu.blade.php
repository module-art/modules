@if(Auth::check())
  @include('grands_chemins.back.inc.partial_rubrique')
@else
  <div class="heading" 
    @if(isset($bg_img) && $bg_img[0] != '')
      style="background-image: url('{!! asset( $bg_img[0] ) !!}');"
    @else
      style="background-image: url('/images/visuel.jpg');"
    @endif
  >
    @if(isset($bg_img) && $bg_img[0] != '')
      {!! isset($rubrique) ? $rubrique->contenu : '' !!}
    @endif
  </div>
@endif

<div class="head d-flex">
  <div class="d-md-none d-flex">
    <button class="navbar-toggler col-3" type="button" data-toggle="collapse" data-target="#navbars01" aria-controls="navbars03" aria-expanded="false" aria-label="Toggle navigation">
      <!-- <span class="navbar-toggler-icon"></span> -->
      <i class="fas fa-bars"></i>
    </button>
  </div>
  <nav class="navbar navbar-expand-md">

    <div class="collapse navbar-collapse mr-auto" id="navbars01">
      <ul class="navbar-nav justify-content-end">
        @if($menus->count() > 0)
          @foreach($menus as $menu)
            @if(isset($page) && $page->slug == $menu->slug)
              <li id="current_page" class="nav-item active">
            @else
              <li class="nav-item">
            @endif
            @if(Auth::check())
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

