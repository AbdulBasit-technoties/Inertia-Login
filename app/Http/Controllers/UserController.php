<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if (!auth()->user()->can('users.index')) {
            abort(401);
        }
        $user = Auth::user();
        $query = User::with('roles');
        if ($user->hasRole('Admin')) {
            if ($request->has('roles')) {
                $roles = $request->input('roles');
                $query->role($roles);
            }
        } else {
            $query->where('id', $user->id);
        }
        $users = $query->orderBy('id', 'desc')->paginate(30)->withQueryString();
        $roles = Role::get()->map(function ($role) {
            return [
                'label' => $role->name,
                'value' => $role->name,
            ];
        })->toArray();
        $editData = $request->id ? User::with('roles')->find($request->id) : null;
        $isEditMode = (bool)$request->id;
        return Inertia::render('Users/Index', [
            'UserData' => $users,
            'editData' => $editData,
            'isEditMode' => $isEditMode,
            'roles' => $roles,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (!auth()->user()->can('users.create')) {
            abort(401);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        if (!auth()->user()->can('users.store')) {
            abort(401);
        }
        $data = $request->validated();
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        foreach ($request->role as $item) {
            $user->assignRole($item);
        }

        return redirect()->route('users.index')->with([
            'message' => 'User created successfully!'
        ]);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        if (!auth()->user()->can('users.show')) {
            abort(401);
        }
        $user = User::select('id', 'name', 'email')->find($id);
        if (!$user) {
            abort(401);
        }
        $activitiesPerPage = request('activities_per_page', 10);
        $activities = $user->activities()->select('id', 'comment', 'created_at', 'pid')->with('user:id,profile_image')->orderBy('created_at', 'desc')->paginate($activitiesPerPage, ['*'], 'activities_page')->withQueryString();
        return Inertia::render("Users/Show", compact('user', 'activities'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, string $id)
    {
        if (!auth()->user()->can('users.edit')) {
            abort(401);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, string $id)
    {
        if (!auth()->user()->can('users.update')) {
            abort(401);
        }
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
        ]);
        $user = User::find($id);
        $user->update($validated);
        $user->syncRoles($request->role);

        return redirect()->route('users.index')->with([
            'message' => 'User updated successfully!'
        ]);
    }

    public function password_update(Request $request, $id)
    {

        $validated = $request->validate([
            'password' => 'required|string|min:8|confirmed',
        ]);
        $user = User::find($id);
        $password = Hash::make($validated['password']);
        $user->update([
            'password' => $password,
        ]);
        return redirect()->route('users.index')
            ->with([
                'message' => 'User password updated successfully!'
            ]);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        if (!auth()->user()->can('users.destroy')) {
            abort(401);
        }
        $user->delete();

        return redirect()->route('users.index')->with([
            'message' => 'User deleted successfully!'
        ]);
    }
}
