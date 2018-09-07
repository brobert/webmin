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
        return [
            'meta' => [
                'user' => $request->user()
            ],
            'data' => [
                [
                    'id' => 1,
                    'status' => 'unread',
                    'user' => [
                        'id' => 2,
                        'name' => 'Bugs Bunny 2'
                    ],
                    'created_at' => '2018-09-01 23:54:17',
                    'messages' => [
                        [
                            'id' => 1,
                            'message' => 'Lorem ipsum',
                            'created_at' => '2018-09-06 23:54:17'
                        ]
                    ]
                ],
                [
                    'id' => 2,
                    'status' => 'unread',
                    'user' => [
                        'id' => 2,
                        'name' => 'Bugs Bunny 3'
                    ],
                    'created_at' => '2018-09-02 23:54:17',
                    'messages' => [
                        [
                            'id' => 2,
                            'message' => 'Lorem ipsum',
                            'created_at' => '2018-09-06 23:54:17'
                        ]
                    ]
                ],
                [
                    'id' => 3,
                    'status' => 'unread',
                    'user' => [
                        'id' => 2,
                        'name' => 'Bugs Bunny 3'
                    ],
                    'created_at' => '2018-09-03 23:54:17',
                    'messages' => [
                        [
                            'id' => 3,
                            'message' => 'Lorem ipsum',
                            'created_at' => '2018-09-06 23:54:17'
                        ]
                    ]
                ],
                [
                    'id' => 4,
                    'status' => 'unread',
                    'user' => [
                        'id' => 2,
                        'name' => 'Bugs Bunny 4'
                    ],
                    'created_at' => '2018-09-04 23:54:17',
                    'messages' => [
                        [
                            'id' => 4,
                            'message' => 'Lorem ipsum',
                            'created_at' => '2018-09-06 23:54:17'
                        ]
                    ]
                ]
            ]
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
