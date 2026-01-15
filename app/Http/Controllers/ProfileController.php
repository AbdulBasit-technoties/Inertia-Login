<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Country;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function ProfileImage(Request $request)
    {
        $request->validate([
            'profile_image' => 'required|image|max:2048',
        ]);
        $profile = auth()->user()->profile ?? null;
        if ($request->hasFile('profile_image')) {
            $profile_imagePath = $request->file('profile_image')->store('Crm/Profile/Image', 's3');
            $profile_imageUrl = Storage::disk('s3')->url($profile_imagePath);
            $validated['profile_image'] = $profile_imageUrl;
        }
        $profile->update($validated);
        return redirect()->back()->with([
            'message' => 'Profile Image uploaded successfully!'
        ]);
    }
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }



    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $profile = auth()->user()->profile ?? null;

        if ($profile) {
            $profile->update([
                'first_name' => $request->name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'phone' => $request->phone,
                'country' => $request->country,
                'city' => $request->city,
                'state' => $request->state,
                'zip_code' => $request->zip_code,
                'account' => $request->account,
                'nic' => $request->nic,
                'dob' => $request->dob,
                'guardian_phone' => $request->guardian_phone,
                'address' => $request->address,
            ]);
        }
        if ($profile->isDirty('email')) {
            $profile->email_verified_at = null;
        }
        $profile->save();

        return Redirect::route('dashboard')->with([
            'message' => 'Profile updated successfully!'
        ]);
    }




    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/')->with([
            'message' => 'Account deleted successfully!'
        ]);
    }
    public function image($id, Request $request)
    {
        $request->validate([
            'nic_f' => 'required|image|max:2048',
            'nic_b' => 'required|image|max:2048',
        ]);

        $profile = Profile::find($id);

        $validated = [];
        if ($request->hasFile('nic_f')) {
            $nic_fPath = $request->file('nic_f')->store('Crm/Profile/NicFront', 's3');
            $nic_fUrl = Storage::disk('s3')->url($nic_fPath);
            $validated['nic_f'] = $nic_fUrl;
        }
        if ($request->hasFile('nic_b')) {
            $nic_bPath = $request->file('nic_b')->store('Crm/Profile/NicBack', 's3');
            $nic_bUrl = Storage::disk('s3')->url($nic_bPath);
            $validated['nic_b'] = $nic_bUrl;
        }

        if (!empty($validated)) {
            $profile->update($validated);
        }
        return redirect()->back()->with([
            'message' => 'Nic Picture uploaded successfully!'
        ]);
    }
}
