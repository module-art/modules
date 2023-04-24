<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Repositories\Themes\ModuleSchedules;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
      if(config('modules.schedule_command')){
        $schedule->command(config('modules.schedule_command'))->weekly();
        //$schedule->command(config('modules.schedule_command'))->everyMinute();
      }
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');
        //trying to load theme commands
        if(file_exists(__DIR__.'/../../Themes/'.config('modules.theme').'/Commands')){
          $this->load(__DIR__.'/../../Themes/'.config('modules.theme').'/Commands');
        }

        require base_path('routes/console.php');
    }
}
