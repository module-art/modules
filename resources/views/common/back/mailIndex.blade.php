@extends('themes.'.config('modules.theme').'.template')

@section('title')
  <title>Emails</title>
  <link href="/css/admin.css" rel="stylesheet">
@endsection

@section('sidebar')
  @include('common.back.inc.sidebar')
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
          <h3 class="card-title">Liste des mails</h3>
        </div>
        <div class="card-body">
          <table class="table">
            <thead>
              <tr>
                <th>Email</th>
                <th></th>{{--modifier--}}
                <th></th>{{--supprimer--}}
              </tr>
            </thead>
            <tbody>
              @if($failed_connexion)
                <tr><td>Echec de la connexion.</td></tr>
              @else
                @foreach ($mails as $mail)
                  <tr>
                    <td class="text-primary">{!! $mail->email !!}</td>
                    <td>
                      <a class="btn btn-sm btn-success" href="{{ route('mail.show', [$mail->id]) }}" title="Voir les paramètres de connexion"><i class="far fa-eye"></i><span class="sr-only">voir</span></a>

                    </td>
                    <td>
                      <a href="{{ route('mail.edit', $mail->id) }}" class="btn btn-sm btn-warning" title="Modifier le mot de passe" ><i class="far fa-edit"></i><span class="sr-only"> Modifier</span></a>
                    </td>
                    <td>
                      {{-- Form::open(['method' => 'DELETE', 'route' => ['mail.destroy', $mail->id]]) --}}
                      <form method="POST" action="{{ route('mail.destroy', $mail->id) }}" accept-charset="UTF-8">
                        <input name="_method" type="hidden" value="DELETE">
                        <input name="_token" type="hidden" value="{{ csrf_token() }}">
                        <button type="submit" class="btn btn-sm btn-danger" onclick="return confirm('Vraiment supprimer cet Email ?')"><i class="fas fa-trash-alt"></i><span class="sr-only"> Supprimer</span></button>
                      </form>
                    </td>
                  </tr>
                @endforeach
              @endif
            </tbody>
          </table>
          {!! $failed_connexion ? '' : $mails->links() !!}
          <div class="row justify-content-between px-3">
            <a href="{{ route('mail.create') }}" class="btn btn-info {{ $failed_connexion ? 'disabled' : '' }}">Ajouter un email</a>
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
  <script src="/tools/tinymce/tinymce.min.js"></script>
  <script src="/js/tempus-dominus/moment-with-locales.min.js"></script>
  <script src="/js/tempus-dominus/tempusdominus-bootstrap-4.min.js"></script>
  <script src="/js/admin.js"></script>
  <script src="/js/lists.js"></script>
@endsection
