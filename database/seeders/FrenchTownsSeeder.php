<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\FrenchTown;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class FrenchTownsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $csvFile = fopen(public_path("data/french_towns.csv"), "r");

        $firstline = true;
        while (($data = fgetcsv($csvFile, 2000, ";")) !== FALSE) {
            if (!$firstline) {
                FrenchTown::create([
                    "code_commune_INSEE" => $data[0],
                    "nom_de_la_commune" => $data[1],
                    "code_postal" => $data[2]
                ]);
            }
            $firstline = false;
        }
        fclose($csvFile);
    }
}
