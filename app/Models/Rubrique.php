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
    protected $fillable = array('contenu', 'place', 'cols', 'ascendant', 'background_img_url', 'background_hd_url', 'page_id');

    public function blocs()
    {
        return $this->hasMany('App\Models\Bloc');
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
}
