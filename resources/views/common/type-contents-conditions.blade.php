@if(isset($rubrique->type_contents))
  @php
    $type = $rubrique->inclusive_type;
  @endphp
  <div class="large-bloc type-contents" data-content_type='{{ $type['content_type'] }}' data-filtre="{{ $type['default_filtre'] }}" data-desc="{{ $type['descendant'] }}">
    @if(View::exists(env('APP_THEME', 'module-art') . '.' . $context . '.type-list-'.$type->content_type))
      {{--next include redirect to the specific view if extists--}}
      @include(env('APP_THEME', 'module-art') . '.' . $context . '.type-list-'.$type->content_type, [
        'results' => ModuleControl::getSortedTypeRubriques($type, $type->default_filtre, $type->descendant)
      ])
    @else
    {{--next include displays any type contents in a table--}}
    @include('common.' . $context . '.type-contents', [
      'champs' => explode(',', $type->champs),
      'results' => ModuleControl::getSortedTypeRubriques($type, $type->default_filtre, $type->descendant, true)
    ])
    @endif
  </div>
@elseif(isset($type_content))
  {{--$type_content is a rubrique--}}
  @if(View::exists(env('APP_THEME', 'module-art') . '.' . $context . '.type-content-'.$type_content->type['content_type']))
    @include(env('APP_THEME', 'module-art') . '.' . $context . '.type-content-'.$type_content->type['content_type'], [$type_content])
  @else
    @include('common.' . $context . '.type-content', [$type_content])
  @endif
@endif
