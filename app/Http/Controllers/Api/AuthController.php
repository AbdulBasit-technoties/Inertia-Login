<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'  => false,
                'message' => 'Validation error',
                'errors'  => $validator->errors(),
            ], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json([
                'status'  => false,
                'message' => 'Invalid credentials',
            ], 401);
        }

        // ✅ token generate
        $token = $user->createToken('mobile_app')->plainTextToken;

        return response()->json([
            'status'  => true,
            'message' => 'Login successful',
            'user'    => $user,
            'token'   => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'status'  => true,
            'message' => 'Logout successful',
        ]);
    }

    public function register(Request $request)
    {
        $request->validate([
            "name"     => "required|string|max:255",
            "email"    => "required|string|email|max:255|unique:users,email",
            "password" => "required|string|min:8|confirmed",
        ]);

        $user = User::create([
            "name"     => $request->name,
            "email"    => $request->email,
            "password" => Hash::make($request->password),
        ]);
        $user->assignRole('Member');
        $token = $user->createToken("API Token")->plainTextToken;

        return response()->json([
            "status"  => true,
            "message" => "User registered successfully",
            "data"    => [
                "user"  => $user,
                "token" => $token,
            ]
        ], 201);
    }
}
