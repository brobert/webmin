<?php

namespace App\Http\Controllers\Api;

use App\Models\Chat;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\ApiController;


class ChatController extends ApiController {

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request) {

        $result = Chat::with([
            'users' => function ($query) {
                $query->select('id', 'name');
            }
        ])->whereHas('users', function ($query) use ($request) {
            $query->where('id', $request->user()->id);
        })->paginate()->toArray();

        $result['meta'] = [
            'user' => $request->user(),
        ];
        
        return $result;
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
