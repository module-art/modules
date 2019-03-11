<nav id="sidebar">
  <section id="fixed-sidebar">

    <button type="button" class="btn btn-secondary sidebarCollapse">
      <i class="fas fa-align-left"></i>
      <span>Admin</span>
    </button>

    <div class="sidebar-header">
      <h4>{{ Auth::user()->name }}</h4>
    </div>

    <ul class="list-unstyled components">
      @if(isset($page))
        <li>
          <a href="#submenu-page" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Page</a>
          <ul class="collapse list-unstyled" id="submenu-page">
            <li>
              {{ link_to_route('page.create', 'Ajouter', null, ['class' => '']) }}
            </li>
            <li>
              {{ link_to_route('page.edit', 'Modifier', $page->id, ['class' => '']) }}
            </li>
            <li>
              <a id="destroy-page">Supprimer</a>
            </li>
            <li>
              <a id="publication">{{ $page->publie? "Masquer" : "Publier" }}</a>
            </li>
            @if(config('theme.multi_rubrique') == true)
            <li>
              <a id="add-rubrique">Ajouter une rubrique</a>
            </li>
            @endif
            <li>
              {{ link_to_route('page.index', 'Liste des pages', null, ['class' => '']) }}
            </li>
          </ul>
        </li>
      @endif
      @if(Auth()->user()->role == 'maintainer')
        <li>
          <a href="#submenu-type" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Types de contenus</a>
          <ul class="collapse list-unstyled" id="submenu-type">
            <li>
              {{ link_to_route('type.create', 'Créer', null, ['class' => '']) }}
            </li>
            <li>
              {{ link_to_route('type.index', 'Voir les types de contenu', null, ['class' => '']) }}
            </li>
          </ul>
        </li>
      @endif
      @if(isset($types) && $types->count()>0)
        <li>
          <a href="#subsubmenu-types" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Ajouter</a>
          <ul class="collapse list-unstyled" id="subsubmenu-types">
            @foreach($types as $type)
              <li>
                {{ link_to_route('type.insertform', $type->content_type, $type->content_type, ['class' => '']) }}
              </li>
            @endforeach
          </ul>
        </li>
        <li>
          <a href="#subsubmenu-insertedTypes" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Lister</a>
          <ul class="collapse list-unstyled" id="subsubmenu-insertedTypes">
            @foreach($types as $type)
              <li>
                {{ link_to_route('type.insertedIndex', $type->content_type, $type->id, ['class' => '']) }}
              </li>
            @endforeach
          </ul>
        </li>
      @endif
      <li>
        {{ link_to_route('user.index', 'Utilisateurs', null, ['class' => '']) }}
      </li>
      <li>
        <a href='{{ route('user.edit', Auth::user()->id) }}'>
          <i class="fas fa-user-circle"></i> Compte
        </a>
      </li>
      {{--<li>
        <a href="/tools/rfm/filemanager/dialog.php?type=0" class="btn iframe-btn" type="button">Gestionnaire de Fichiers</a>
      </li>--}}
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
        <div class="sidebarCollapse chevron"><i class="fas fa-chevron-circle-left"></i></div>
      </li>
    </ul>
    
  </section>

</nav>
