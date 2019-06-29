<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MailDomain extends Model
{
    /**
     * The connection name for the model.
     *
     * @var string
   */
    protected $connection = 'mysql_mails';
    protected $table = 'virtual_domains';
    public $timestamps = false;
    protected $fillable = array('name');

    public function mailUsers()
    {
        return $this->HasMany('App\Models\MailUser', 'domain_id');
    }
    public function mailAliases()
    {
        return $this->HasMany('App\Models\MailAliase', 'domain_id');
    }
}
