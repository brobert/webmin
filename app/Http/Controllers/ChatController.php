<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use Illuminate\Http\Request;


class ChatController extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request) {

        $result = Chat::with([
            'users' => function ($query) {
                $query->select('id', 'name');
            },
            'messages',
            'messages.user' => function ($query) {
                $query->select('id', 'name');
            }
        ])->whereHas('users', function ($query) use ($request) {
            $query->where('id', $request->user()->id);
        })->paginate();

        return [
            'meta' => [
                'user' => $request->user()
            ],
            'data' => $result
        ];
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create() {

        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {

        //
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Chat $chat
     * @return \Illuminate\Http\Response
     */
    public function show(Chat $chat) {

        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Chat $chat
     * @return \Illuminate\Http\Response
     */
    public function edit(Chat $chat) {

        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Chat $chat
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Chat $chat) {

        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Chat $chat
     * @return \Illuminate\Http\Response
     */
    public function destroy(Chat $chat) {

        //
    }
}
