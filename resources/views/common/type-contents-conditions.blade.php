@inject('module_control', 'ModuleControl'){{--make instance like new ModuleControl--}}
@if(isset($rubrique->type_contents))
  @php
    $type = $rubrique->inclusive_type;
  @endphp
  <div class="large-bloc type-contents row equal justify-content-center" data-content_type='{{ $type['content_type'] }}' data-filtre="{{ $type['default_filtre'] }}" data-desc="{{ $type['descendant'] }}">
    @if(View::exists('themes.'.config('modules.theme') . '.' . $context . '.type-list-'.str_slug($type->content_type)))
      {{--next include redirect to the specific view if exists--}}
      @include('themes.'.config('modules.theme') . '.' . $context . '.type-list-'.str_slug( $type->content_type ), [
      'results' => $module_control->getSortedTypeRubriques($type, $type->default_filtre, $type->descendant)
      ])
  @else
      {{--next include displays any type contents in a table--}}
      @include('common.' . $context . '.type-contents', [
        'json_fields' => json_decode($type->json_fields)->fields,
        'results' => $module_control->getSortedTypeRubriques($type, $type->default_filtre, $type->descendant, true)
      ])
    @endif
  </div>
@elseif(isset($type_content))
  {{--$type_content is a rubrique--}}
  @if(View::exists('themes.'.config('modules.theme') . '.' . $context . '.type-content-'.str_slug($type_content->type['content_type'])))
    @include('themes.'.config('modules.theme') . '.' . $context . '.type-content-'.str_slug( $type_content->type['content_type'] ), [$type_content])
  @else
    @include('common.' . $context . '.type-content', [$type_content])
  @endif
@endif
