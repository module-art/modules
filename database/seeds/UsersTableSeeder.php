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
      'name' => 'admin',
      'username' => 'admin',
      'email' => 'admin@admin.ad',
      'password' => Hash::make('admin'),
      'role' => 'admin',
      'created_at' => $date,
      'updated_at' => $date,
    ]);
  }
}
