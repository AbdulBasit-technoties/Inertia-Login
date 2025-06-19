<?php

namespace Database\Seeders;

use App\Models\Beneficiary;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        $models = config('models.models');

        foreach ($models as $model) {
            Permission::firstOrCreate(['name' => "$model.index"]);
            Permission::firstOrCreate(['name' => "$model.create"]);
            Permission::firstOrCreate(['name' => "$model.store"]);
            Permission::firstOrCreate(['name' => "$model.show"]);
            Permission::firstOrCreate(['name' => "$model.edit"]);
            Permission::firstOrCreate(['name' => "$model.update"]);
            Permission::firstOrCreate(['name' => "$model.destroy"]);
        }

        $AdminRole = Role::firstOrCreate(['name' => 'Admin']);
        $permissions = Permission::all();
        $AdminRole->syncPermissions($permissions);

        $Admin = User::firstOrCreate([
            'email' => 'admin@technoties.com',
        ], [
            'name' => 'Admin',
            'password' => Hash::make('password'),
        ]);
        $Admin->assignRole($AdminRole);
    }

    /**
     * Helper function to create roles and assign permissions accordingly.
     */
    protected function createRoleWithPermissions($roleName, array $permissions)
    {
        $role = Role::firstOrCreate(['name' => $roleName]);
        $role->syncPermissions($permissions);
        return $role;
    }
}
