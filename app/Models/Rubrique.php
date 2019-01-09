<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Rubrique extends Model
{

    protected $table = 'rubriques';
    public $timestamps = true;

    use SoftDeletes;

    protected $dates = ['deleted_at'];
    protected $fillable = array('contenu', 'place', 'cols', 'ascendant', 'background_img_url', 'publie', 'archive', 'type_contents', 'type_id', 'page_id');

    public function blocs()
    {
        return $this->hasMany('App\Models\Bloc');
    }

    public function comments()
    {
        return $this->hasMany('App\Models\Comment');
    }

    public function page()
    {
        return $this->belongsTo('App\Models\Page');
    }

    public function type()
    {
        return $this->belongsTo('App\Models\Type');
    }

    public function inclusive_type()
    {
        return $this->belongsTo('App\Models\Type', 'type_contents');
    }

    public function children()
    {
      return $this->hasMany('App\Models\Rubrique','parent_id');
    }

    public function parent_rubrique()
    {
        return $this->belongsTo('App\Models\Rubrique','parent_id');
    }

    public function tags()
    {
        return $this->belongsToMany('App\Models\Tag');
    }
    public function categories()
    {
        return $this->belongsToMany('App\Models\Categorie', 'rubrique_categorie');
    }
}
