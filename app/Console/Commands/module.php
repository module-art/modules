<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class module extends Command
{
  /**
   * The name and signature of the console command.
   *
   * @var string
   */
  protected $signature = 'module:link {feature=views : all,controllers,requests...}';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'Create symbolic links from application folders to theme folders';

  /**
   * Create a new command instance.
   *
   * @return void
   */
  public function __construct()
  {
    parent::__construct();
  }

  /**
   * Execute the console command.
   *
   * @return mixed
   */
  public function handle()
  {
    //check if theme is here
    $themes = scandir('./Themes');

    if(!in_array(config('modules.theme'), $themes)){
      $this->error('It seems that you didn\'t install your theme yet ?');
    }else{
      $feature = $this->choice('Which feature must be linked (views is minimum)?', ['views', 'Controllers', 'Requests', 'Middleware', 'Repositories', 'all']);

      if(in_array($feature, ['all', 'views']))
      {
        //link views
        $app_views_path = './resources/views/themes';
        $theme_views_path = './Themes/' . config('modules.theme') . '/views';

        if(!file_exists($app_views_path)){
          mkdir($app_views_path, 0755);
        }
        if(!file_exists($app_views_path . '/' . config('modules.theme')) && file_exists($theme_views_path)){
          symlink('../../.' . $theme_views_path, $app_views_path . '/' . config('modules.theme'));
        }
      }

      if(in_array($feature, ['all', 'Controllers'])){
        //link controllers
        $app_controllers_path = './app/Http/Controllers/Themes';
        $theme_controllers_path = './Themes/' . config('modules.theme') . '/Http/Controllers';

        if(!file_exists($app_controllers_path)){
          mkdir($app_controllers_path, 0755);
        }
        if(!file_exists($theme_controllers_path)){
          mkdir($theme_controllers_path, 0755, true);
        }
        if(!file_exists($app_controllers_path . '/' . config('modules.theme'))){
          symlink('../../../.' . $theme_controllers_path, $app_controllers_path . '/' . config('modules.theme'));
        }
      }

      if(in_array($feature, ['all', 'Requests'])){
        //link requests
        $app_requests_path = './app/Http/Requests/Themes';
        $theme_requests_path = './Themes/' . config('modules.theme') . '/Http/Requests';

        if(!file_exists($app_requests_path)){
          mkdir($app_requests_path, 0755);
        }
        if(!file_exists($theme_requests_path)){
          mkdir($theme_requests_path, 0755, true);
        }
        if(!file_exists($app_requests_path . '/' . config('modules.theme'))){
          symlink('../../../.' . $theme_requests_path, $app_requests_path . '/' . config('modules.theme'));
        }
      }

      if(in_array($feature, ['all', 'Middleware'])){
        //link middleware
        $app_middleware_path = './app/Http/Middleware/Themes';
        $theme_middleware_path = './Themes/' . config('modules.theme') . '/Http/Middleware';

        if(!file_exists($app_middleware_path)){
          mkdir($app_middleware_path, 0755);
        }
        if(!file_exists($theme_middleware_path)){
          mkdir($theme_middleware_path, 0755, true);
        }
        if(!file_exists($app_middleware_path . '/' . config('modules.theme'))){
          symlink('../../../.' . $theme_middleware_path, $app_middleware_path . '/' . config('modules.theme'));
        }
      }

      if(in_array($feature, ['all', 'Repositories'])){
        //link repositories
        $app_repositories_path = './app/Repositories/Themes';
        $theme_repositories_path = './Themes/' . config('modules.theme') . '/repositories';

        if(!file_exists($app_repositories_path)){
          mkdir($app_repositories_path, 0755);
        }
        if(!file_exists($theme_repositories_path)){
          mkdir($theme_repositories_path, 0755);
        }
        if(!file_exists($app_repositories_path . '/' . config('modules.theme'))){
          symlink('../../.' . $theme_repositories_path, $app_repositories_path . '/' . config('modules.theme'));
        }
      }

      $this->info('Your module theme is linked for ' . $feature . ' !');
    }

  }
}
