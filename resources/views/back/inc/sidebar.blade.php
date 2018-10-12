<nav id="sidebar">
  <section id="fixed-sidebar">

    <div class="sidebar-header">
      <h3> Bonjour {{ Auth::user()->name }}</h3>
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
            {{--<li>
              <a id="add-rubrique">Ajouter une rubrique</a>
            </li>--}}
          </ul>
        </li>
      @endif
      <li>
        <a href="#submenu-type" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Types</a>
        <ul class="collapse list-unstyled" id="submenu-type">
          {{--@if(isset($types) && $types->count()>0)
            <li>
              <a href="#subsubmenu-types" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Ajouter</a>
              <ul class="collapse list-unstyled" id="subsubmenu-types">
                @foreach($types as $type)
                  <li>
                    {{ $type->content_type }}
                    [>{{ link_to_route('type.create', 'Ajouter', null, ['class' => '']) }}<]
                  </li>
                @endforeach
              </ul>
            </li>
          @endif--}}
          <li>
            {{ link_to_route('type.create', 'Créer', null, ['class' => '']) }}
          </li>
          <li>
            {{ link_to_route('type.index', 'Voir les types de contenu', null, ['class' => '']) }}
          </li>
        </ul>
      </li>
      <li>
        {{ link_to_route('user.index', 'Utilisateurs', null, ['class' => '']) }}
      </li>
      <li>
        <a href='{{ route('user.edit', Auth::user()->id) }}'>
          <i class="fas fa-user-circle"></i> Compte
        </a>
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
