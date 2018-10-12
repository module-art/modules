<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    protected $table = 'types';
    protected $fillable = array('content_type', 'champs', 'default_filtre');


    public function rubriques()
    {
        return $this->hasMany('App\Models\Rubrique');
    }

    public function blocs()
    {
        return $this->hasManyThrough('App\Models\Bloc', 'App\Models\Rubrique');
    }

}
