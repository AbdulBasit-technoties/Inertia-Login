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
        'address',
        'state',
        'city',
        'zip_code',
        'country',
        'facebook',
        'skype',
        'linkedin',
        'twitter',
        'whatsapp',
        'instagram',
        'active_status',
        'description',
    ];
}
