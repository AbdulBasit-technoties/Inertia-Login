<?php

namespace App\Http\Middleware;

use App\Models\Notification;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;
use Carbon\Carbon;
use Illuminate\Support\Facades\Schema;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        $notification = null;

        if ($user) {
            $notification = Notification::with('sender')
                ->where('receiver_id', $user->id)
                ->where('status', 'unread')
                ->latest()->get();
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user ? $request->user()->load('roles') : null,
                'permissions' => $user ? $user->getPermissionsViaRoles()->pluck('name') : [],
            ],
            'flash' => [
                'message' => fn() => $request->session()->get('message'),
                'error' => fn() => $request->session()->get('error'),
            ],
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'notification' => $notification,
        ];
    }
}
