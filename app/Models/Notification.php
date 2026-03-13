<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Notification extends Model
{
    use HasFactory;
    protected $fillable = [
        'model_type',
        'model_id',
        'sender_id',
        'receiver_id',
        'status',
        'title',
        'message',
        'route'
    ];

    /**
     * Morph relationship to related model (e.g., Task, Project)
     */
    public function model(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Sender - User who created the notification
     */
    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    /**
     * receiver - User who will receive/read the notification
     */
    public function receiver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }
}
