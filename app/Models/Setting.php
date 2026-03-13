<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'email_primary',
        'email_secondary',
        'phone_primary',
        'phone_secondary',
        'logo',
        'favicon',
        'address',
        'country',
        'state',
        'city',
        'zip_code',
        'facebook',
        'twitter',
        'linkedin',
        'instagram',
        'whatsapp',
        'youtube',
        'tiktok',
        'meta_title',
        'description',
        'mail_mailer',
        'mail_host',
        'mail_port',
        'mail_username',
        'mail_password',
        'mail_encryption',
        'mail_from_address',
        'mail_from_name',
        'is_active',
    ];
    public function activities()
    {
        return $this->morphMany(Activity::class, 'model');
    }
}
