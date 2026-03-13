<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use App\Http\Requests\StoreSettingRequest;
use App\Http\Requests\UpdateSettingRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $setting = Setting::find(1);
        return Inertia::render('Setting/Index', [
            'setting' => $setting,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSettingRequest $request)
    {
        Setting::updateOrCreate(
            ['id' => 1],
            $request->validated()
        );

        return back()->with(['message' => 'Setting updated successfully.']);
    }


    /**
     * Display the specified resource.
     */
    public function show(Setting $setting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Setting $setting)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSettingRequest $request, Setting $setting)
    {
        $data = $request->validated();
        $setting->update($data);
        $setting->activities()->create([
            'uid' => auth()->user()->id,
            'comment' => 'Setting updated by (' . auth()->user()->name . ')',
        ]);

        return back()->with(['message' => 'Setting updated successfully!']);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Setting $setting)
    {
        //
    }
    public function Image(Request $request, Setting $setting)
    {
        if (!auth()->user()->hasRole('Admin')) {
            abort(401);
        }
        $request->validate([
            'logo' => 'required|image|max:2048',
        ]);

        if ($request->hasFile('logo')) {
            $imagePath = $request->file('logo')->store('Crm/logos', 's3');
            $imageUrl = Storage::disk('s3')->url($imagePath);
        }
        $setting->update([
            'logo' => $imageUrl ?? null,
        ]);
        $setting->activities()->create([
            'uid' => auth()->user()->id,
            'comment' => 'Setting logo updated by (' . auth()->user()->name . ')',
        ]);
        return redirect()->back()->with([
            'message' => 'Setting logo updated successfully!',
        ]);
    }

    public function Favicon(Request $request, Setting $setting)
    {
        if (!auth()->user()->hasRole('Admin')) {
            abort(401);
        }
        $request->validate([
            'favicon' => 'required|image|max:2048',
        ]);

        if ($request->hasFile('favicon')) {
            $imagePath = $request->file('favicon')->store('Crm/logos', 's3');
            $faviconUrl = Storage::disk('s3')->url($imagePath);
        }
        $setting->update([
            'favicon' => $faviconUrl ?? null,
        ]);
        $setting->activities()->create([
            'uid' => auth()->user()->id,
            'comment' => 'Setting favicon updated by (' . auth()->user()->name . ')',
        ]);
        return redirect()->back()->with([
            'message' => 'Setting favicon updated successfully!',
        ]);
    }
}
