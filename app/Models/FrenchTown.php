<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FrenchTown extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = array('code_commune_INSEE', 'nom_de_la_commune', 'code_postal');
}
