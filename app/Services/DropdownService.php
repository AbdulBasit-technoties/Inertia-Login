<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Spatie\Permission\Models\Role;

class DropdownService
{
    const ROLES_KEY  = 'roles_dropdown';
    /*
    |--------------------------------------------------------------------------
    | Roles Dropdown
    |--------------------------------------------------------------------------
    */

    public static function roles()
    {
        return Cache::remember(self::ROLES_KEY, 3600, function () {
            return Role::select('name')
                ->get()
                ->map(fn($r) => [
                    'label' => $r->name,
                    'value' => $r->name,
                ])
                ->toArray();
        });
    }
}
