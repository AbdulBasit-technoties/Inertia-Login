<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
class Activity extends Model
{
    use HasFactory;
    protected $fillable = [
        'uid',
        'comment',
        'model_type',
        'model_id',
    ];
    public function model(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Profile relation.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'uid');
    }
}
