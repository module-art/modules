<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MailUser extends Model
{
    /**
     * The connection name for the model.
     *
     * @var string
   */
    protected $connection = 'mysql_mails';
    protected $table = 'virtual_users';
    public $timestamps = false;
    protected $fillable = array('domain_id', 'password', 'email');

    public function mailDomain()
    {
        return $this->belongsTo('App\Models\MailDomain', 'domain_id');
    }
}
