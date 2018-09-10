<nav id="sidebar">
  <section id="fixed-sidebar">

    <div class="sidebar-header">
      <h3>Administration</h3>
    </div>

    <ul class="list-unstyled components">
      <h4>Menu</h4>
      @if(isset($page))
        <li>
          <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Page</a>
          <ul class="collapse list-unstyled" id="homeSubmenu">
            <li>
              {{ link_to_route('add_page', 'Ajouter', null, ['class' => '']) }}
            </li>
            <li>
              {{ link_to_route('edit_page', 'Modifier', $page->id, ['class' => '']) }}
            </li>
            <li>
              <a id="destroy-page">Supprimer</a>
            </li>
            <li>
              <a id="publication">{{ $page->publie? "Masquer" : "Publier" }}</a>
            </li>
            <li>
              <a id="add-rubrique">Ajouter une rubrique</a>
            </li>
          </ul>
        </li>
      @endif
      <li>
        {{ link_to_route('user.index', 'Utilisateurs', null, ['class' => '']) }}
      </li>
      <li>
        <a href="{{ route('logout') }}"
           onclick="event.preventDefault();
           document.getElementById('logout-form').submit();">
          <i class="fas fa-sign-out-alt"></i> Déconnexion
        </a>
        {{ Form::open(['id' => 'logout-form', 'method' => 'POST', 'route' => 'logout', 'hidden']) }}
        {{ Form::close() }}
      </li>
      <li>
        <div class="sidebarCollapse"><i class="fas fa-chevron-circle-left"></i></div>
      </li>
    </ul>
    
  </section>

</nav>
