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
      'name' => 'Sylvestre',
      'username' => 'sylvope',
      'email' => 'sylvestre@module-art.fr',
      'password' => Hash::make('2008bord'),
      'role' => 'maintainer',
      'created_at' => $date,
      'updated_at' => $date,
    ]);
  }
}
