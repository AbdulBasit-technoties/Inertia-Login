<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function markAsRead($id)
    {
        $notification = Notification::where('id', $id)
            ->where(function ($q) {
                $q->where('uid', auth()->user()->id)
                    ->orWhere('recipient_id', auth()->user()->id);
            })
            ->firstOrFail();

        $notification->update(['status' => 'read']);

        if ($notification->route && \Route::has($notification->route)) {
            return redirect()->route($notification->route, $notification->model_id)
                ->with(['message' => 'Notification marked as read.']);
        }

        return redirect()->back()->with(['message' => 'Notification marked as read, but route not found.']);
    }




    public function markAllAsRead(Notification $notification, Request $request)
    {
        $ids = $request->input('ids', []);

        Notification::whereIn('id', $ids)
            ->where(function ($q) {
                $q->where('uid', auth()->user()->id)
                    ->orWhere('recipient_id', auth()->user()->id);
            })
            ->update(['status' => 'read']);

        return back(); // or return response()->json(['success' => true]);
    }
}
