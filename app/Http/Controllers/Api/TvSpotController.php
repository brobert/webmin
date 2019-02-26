<?php

namespace App\Http\Controllers\Api;

use App\Models\OwaConfig\TvSpot;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\ApiController;


class TvSpotController extends ApiController {

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request) {

        return TvSpot::with('categories')->take(5000)->get();
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\OwaConfig\TvSpot $tvSpot
     * @return \Illuminate\Http\Response
     */
    public function show($id) {

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
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\OwaConfig\TvSpot $tvSpot
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id) {

        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\OwaConfig\TvSpot $tvSpot
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) {

        //
    }
}
