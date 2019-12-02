@extends('themes.'.config('modules.theme').'.template')

@section('title')
  <title>Email Settings</title>
  <link href="/css/admin.css" rel="stylesheet">
@endsection

@section('menu')
  @include('themes.'.config('modules.theme').'.menu')
@endsection

@section('contenu')

  <section class='row center-card'>
    <div class="col-12 col-lg-8 col-xl-6">
      @if(session()->has('info'))
        <div class="alert alert-success alert-dismissible">{!! session('info') !!}</div>
      @endif
      @if(session()->has('error'))
        <div class="alert alert-danger alert-dismissible">{!! session('error') !!}</div>
      @endif
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">Paramètres de connexion pour {{ $username }}</h4>
        </div>
        <div class="card-body">
          <ul>
            <li>Nom : choix libre</li>
            <li>Adresse Email : {{ $username }}</li>
            <li>Mot de passe : celui défini à la création</li>
            <li>Type de serveur : POP3</li>
            <li>Port : 995</li>
            <li>Nom du serveur : mail.module-art.fr</li>
            <li>Nom d'utilisateur : {{ $username }}</li>
            <li>Sécurité : SSL/TLS</li>
            <li>Authentification : mot de passe normal</li>
            <li>SMTP : celui fourni par votre FAI (exemples : <a href="https://www.free.fr/assistance/2406.html" target="_blank">Free</a> - <a href="https://assistance.orange.fr/mobile-tablette/tous-les-mobiles-et-tablettes/installer-et-utiliser/utiliser-internet-mail-et-cloud/mail/l-application-mail-orange/parametrer-et-configurer/mail-configurer-les-serveurs-sortants-et-entrants-des-principaux-comptes-mails_47992-48856#onglet2" target="_blank">Orange</a>)</li>
            <li>Si une exception de sécurité est demandée, accepter</li>
          </ul>
          <div class="row justify-content-between px-3">
            {!! link_to_route('mail.create', 'Ajouter un email', [], ['class' => 'btn btn-info']) !!}
            <a href="javascript:history.back()" class="btn btn-primary">
              <i class="fas fa-redo"></i> Retour
            </a>
          </div>
          <div class="card-footer d-flex justify-content-end mt-2">
            <a class="btn btn-primary btn-sm" href="{{ route('page.home') }}"><i class="fa fa-redo"></i> retour à l'accueil</a>
          </div>
        </div>{{--card-body--}}
      </div>
    </div>
  </section>
@endsection

@section('scripts')
  <script src="/js/lists.js"></script>
@endsection
