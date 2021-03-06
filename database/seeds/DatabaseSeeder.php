<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         $this->call(UsersTableSeeder::class);
         $this->call(PagesTableSeeder::class);
         $this->call(RubriquesTableSeeder::class);
         $this->call(BlocsTableSeeder::class);
         //$this->call(ArticleMigrationSeeder::class);
    }
}
