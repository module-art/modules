<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <ul>
      <li><strong>Nom de l'expéditeur</strong> : {!! $nom !!}</li>
      <li><strong>Email de l'expéditeur</strong> : <a href="mailto:{!! $email !!}">{!! $email !!}</a></li>
      <li><strong>Sujet</strong> : {!! $subject !!}</li>
    </ul>
    {!! $texte !!}
  </body>
</html>
