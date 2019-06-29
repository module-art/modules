<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MailAliase extends Model
{
    /**
     * The connection name for the model.
     *
     * @var string
   */
    protected $connection = 'mysql_mails';
    protected $table = 'virtual_aliases';
    public $timestamps = false;
    protected $fillable = array('domain_id', 'source', 'destination');

    public function mailDomain()
    {
        return $this->belongsTo('App\Models\MailDomain', 'domain_id');
    }
}
