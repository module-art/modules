<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Page extends Model
{

    protected $table = 'pages';
    public $timestamps = true;

    use SoftDeletes;
    protected $dates = ['deleted_at'];

    protected $fillable = array('title', 'menu_title', 'place', 'slug', 'is_home', 'publie');

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function rubriques()
    {
        return $this->hasMany('App\Models\Rubrique');
    }
}
