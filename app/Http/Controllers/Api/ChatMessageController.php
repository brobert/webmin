<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\ApiController;

// Models
use App\Models\ChatMessage;


class ChatMessageController extends ApiController {

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request) {

        $chatId = $request->query('chatid') ?: $request->chatid;

        $result = ChatMessage::with([
            'user' => function ($query) {
                $query->select('id', 'name');
            }
        ])->where('chat_id', $chatId)->orderBy('created_at', 'desc')->paginate();

        return [
            'meta' => [
                'user' => $request->user()
            ],
            'data' => $result
        ];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {

        $chatId = $request->query('chatid') ?: $request->chatid;

        $msg = new ChatMessage();

        $msg->chat_id = $chatId;
        $msg->user_id = $request->user()->id;
        $msg->message = $request->get('text');

        $msg->save();

        return $msg;
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id) {

        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id) {

        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) {

        //
    }
}
