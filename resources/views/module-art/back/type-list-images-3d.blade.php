<div class="swiper-container mt-3 mb-3">
  <div class="swiper-wrapper">
    @foreach ($results as $result)
    @php
      $titre = $result->blocs()->where('type','titre')->first();
      $image = $result->blocs()->where('type','image')->first();
    @endphp

    <div class="swiper-slide" style="background-image:url({{ preg_replace('/^.+img\ssrc="(.+)".+$/U', '$1', $image->contenu) }})"></div>

  @endforeach
  </div>
  {{--<div class="swiper-pagination"></div>--}}
  {{--<!-- Navigation -->--}}
  <div class="swiper-button-next swiper-button-white"></div>
  <div class="swiper-button-prev swiper-button-white"></div>
</div>


