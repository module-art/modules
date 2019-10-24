<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class UsersTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
		//DB::table('users')->delete();

    $date = Carbon::now();

    DB::table('users')->insert([
      'name' => 'Admin',
      'username' => 'admin',
      'email' => 'admin@module-art.fr',
      'password' => Hash::make("admin"),
      'role' => 'maintainer',
      'created_at' => $date,
      'updated_at' => $date,
    ]);
  }
}
