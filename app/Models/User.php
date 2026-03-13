<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'country',
        'state',
        'city',
        'zip_code',
        'address',
        'dob',
        'gender',
        'profile_image',
        'nic_f',
        'nic_b',
        'is_active',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
    public function activities()
    {
        return $this->morphMany(Activity::class, 'model');
    }
    public function scopeRoleFilter($query)
    {
        if (!auth()->user()->hasRole('Admin')) {
            $query->where('id', auth()->user()->id);
        }

        return $query;
    }
    public function scopeDataFilter($query, $request)
    {
        $query->when($request->role, function ($q) use ($request) {
            $q->whereHas('roles', function ($q) use ($request) {
                $q->where('name', $request->role);
            });
        });
        // 🔍 Search (First + Last name support)
        $query->when($request->search, function ($q) use ($request) {

            $search = trim($request->search);

            $q->where(function ($main) use ($search) {

                $main->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('email', 'LIKE', "%{$search}%")
                    ->orWhere('phone', 'LIKE', "%{$search}%");
            });
        });

        $query->when($request->from_date && $request->to_date, function ($q) use ($request) {
            $q->whereBetween('created_at', [
                Carbon::parse($request->from_date)->startOfDay(),
                Carbon::parse($request->to_date)->endOfDay()
            ]);
        });

        $query->when(
            $request->quick_range === 'today',
            fn($q) =>
            $q->whereDate('created_at', now())
        );

        $query->when(
            $request->quick_range === 'yesterday',
            fn($q) =>
            $q->whereDate('created_at', now()->subDay())
        );

        $query->when(
            $request->quick_range === 'this_week',
            fn($q) =>
            $q->whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()])
        );

        $query->when(
            $request->quick_range === 'this_month',
            fn($q) =>
            $q->whereMonth('created_at', now()->month)
                ->whereYear('created_at', now()->year)
        );

        return $query;
    }
}
