<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $table = 'tags';
    
    public $timestamps = false;
    protected $fillable = array('name', 'slug');

    public function rubriques()
    {
        return $this->belongsToMany('App\Models\Rubrique');
    }
}
