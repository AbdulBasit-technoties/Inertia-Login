<?php

namespace App\Events;

use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\InteractsWithSockets;

class NotificationEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $messages;
    public $userIds;
    public $notifications;

    public function __construct($messages, $userIds, $notifications)
    {
        $this->messages = is_array($messages) ? $messages : [$messages];
        $this->userIds = is_array($userIds) ? $userIds : [$userIds];
        $this->notifications = is_array($notifications) ? $notifications : [$notifications];
    }

    public function broadcastOn()
    {
        return collect($this->userIds)->map(function ($id) {
            return new PrivateChannel('App.Models.User.' . $id);
        })->toArray();
    }




    public function broadcastAs()
    {
        return 'main.notification';
    }
}
