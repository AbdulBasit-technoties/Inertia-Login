<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Hash;

class AdminRoleSeeder extends Seeder
{
    public function run()
    {
        // List of models from config
        $models = config('models.models');

        // Create permissions for each model
        foreach ($models as $model) {
            Permission::firstOrCreate(['name' => $model . '.index']);
            Permission::firstOrCreate(['name' => $model . '.create']);
            Permission::firstOrCreate(['name' => $model . '.store']);
            Permission::firstOrCreate(['name' => $model . '.show']);
            Permission::firstOrCreate(['name' => $model . '.edit']);
            Permission::firstOrCreate(['name' => $model . '.update']);
            Permission::firstOrCreate(['name' => $model . '.destroy']);
        }

        // Create the Admin role
        $AdminRole = Role::firstOrCreate(['name' => 'Admin']);
        $permissions = Permission::all();
        $AdminRole->givePermissionTo($permissions);
        $this->createRoleWithPermissions('Client', [$model . '.index']);
        $this->createRoleWithPermissions('HR', [$model . '.index', $model . '.create', $model . '.edit', $model . '.destroy']);
        $this->createRoleWithPermissions('Employee', [$model . '.index', $model . '.create', $model . '.edit']);
        $this->createRoleWithPermissions('Department Manager - Sales', [$model . '.index', $model . '.edit']);
        $this->createRoleWithPermissions('Team Lead - Sales', [$model . '.index', $model . '.create', $model . '.edit', $model . '.destroy']);
        $this->createRoleWithPermissions('Team Member - Sales', [$model . '.index', $model . '.create', $model . '.edit', $model . '.destroy']);
        $this->createRoleWithPermissions('Project Manager', [$model . '.index', $model . '.create', $model . '.edit', $model . '.destroy']);
        $this->createRoleWithPermissions('Department Manager - Production', [$model . '.index', $model . '.create', $model . '.edit', $model . '.destroy']);
        $this->createRoleWithPermissions('Team Lead - Production', [$model . '.index', $model . '.create', $model . '.edit', $model . '.destroy']);
        $this->createRoleWithPermissions('Team Member - Production', [$model . '.index', $model . '.create', $model . '.edit', $model . '.destroy']);
        // Create a new Admin user
        $AdminUser = User::firstOrCreate([
            'email' => 'admin@technoties.com',
        ], [
            'name' => 'Admin',
            'password' => Hash::make('Techno@456Ties654!!'),
        ]);

        $AdminUser->assignRole($AdminRole);
    }
    /**
     * @param string $roleName
     * @param array $permissionsTypes
     * @param array $models
     */

    protected function createRoleWithPermissions($roleName, array $permissions)
    {
        $role = Role::firstOrCreate(['name' => $roleName]);
        $role->givePermissionTo($permissions);
    }
}
