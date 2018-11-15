<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    protected $table = 'types';
    protected $fillable = array('content_type', 'champs', 'default_filtre', 'descendant');


    public function rubriques()
    {
        return $this->hasMany('App\Models\Rubrique');
    }

    public function blocs()
    {
        return $this->hasManyThrough('App\Models\Bloc', 'App\Models\Rubrique');
    }

    public function categories()
    {
        return $this->belongsToMany('App\Models\Categorie', 'type_categorie');
    }

}
