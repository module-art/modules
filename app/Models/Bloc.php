<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
//use Illuminate\Database\Eloquent\SoftDeletes;

class Bloc extends Model
{

    protected $table = 'blocs';
    public $timestamps = false;

    //use SoftDeletes;
    //protected $dates = ['deleted_at'];
    
    protected $fillable = array('type', 'contenu' ,'place', 'rubrique_id');

    public function rubrique()
    {
        return $this->belongsTo('App\Models\Rubrique');
    }
}
