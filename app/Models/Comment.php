<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $table = 'comments';
    
    public $timestamps = false;
    protected $fillable = array('comment_author', 'comment_author_email', 'comment_content', 'publie', 'rubrique_id');

    public function rubrique()
    {
        return $this->belongsTo('App\Models\Rubrique');
    }
}
