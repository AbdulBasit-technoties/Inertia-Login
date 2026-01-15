<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\Config;
use Doctrine\DBAL\Types\Type;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {



        Config::set('app.name', 'Technoties-Crm');

        Inertia::share([
            'auth' => fn() => ['user' => auth()->user()],
            'app' => [
                'name' => 'Technoties-Crm',
            ],
        ]);
    }
}
