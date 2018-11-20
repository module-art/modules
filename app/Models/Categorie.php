<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    protected $table = 'categories';

    public $timestamps = false;
    protected $fillable = array('name', 'slug');

    public function types()
    {
        return $this->belongsToMany('App\Models\Type', 'type_categorie');
    }
    public function rubriques()
    {
        return $this->belongsToMany('App\Models\Rubrique', 'rubrique_categorie');
    }
}
