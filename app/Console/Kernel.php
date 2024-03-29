<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

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
      //
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');
        //trying to load theme commands not working for now, commands in theme folder are linked in App\Console\Commands\Themes\<theme name>
        //It could be try to define namespace in command file to Theme\arrosoir\Commands
        if(file_exists(__DIR__.'/../../Themes/'.config('modules.theme').'/Commands')){
          $this->load(__DIR__.'/../../Themes/'.config('modules.theme').'/Commands');
        }

        require base_path('routes/console.php');
    }
}
