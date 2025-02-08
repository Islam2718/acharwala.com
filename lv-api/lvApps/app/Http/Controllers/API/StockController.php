<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Stock;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class StockController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request): Response
    {
        // Retrieve the storeId from the request header
        $storeId = $request->header('StoreId');

        // Check if the user is authenticated using the 'api' guard
        if (Auth::guard('api')->check()) {
            $stocks = Stock::with(['product', 'user', 'store']);

            if ($storeId) {
                $stocks->whereHas('store', function ($query) use ($storeId) {
                    $query->where('id', $storeId);
                });
            }
            
            $product_id = $request->header('product_id');
            if ($product_id !== null) {
                $stocks->where('product_id', $product_id);
            }

            // Add orderBy clause to sort stocks by id in descending order
            $stocks->orderBy('id', 'desc');

            $stocks = $stocks->get();
            return response(['data' => $stocks, 'status' => 200], 200);
        }

        return response(['data' => 'Unauthorized!', 'status' => 401], 401);
    }



    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    // public function create()
    // {
    //     //
    // }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (Auth::guard('api')->check()) {
            $validatedData = $request->validate([
                'type' => 'required',
            ]);

            $response = Stock::create($request->all());
            return response(['data' => $response, 'message' => 'Created Successfully!', 'status'=> 201], 201);
        }
        return response(['data' => 'Unauthorized!'], 401);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Stock  $stock
     * @return \Illuminate\Http\Response
     */
    public function show($id): Response
    {
        //
        if (Auth::guard('api')->check()) {
            $response = Stock::with('user', 'store', 'product', 'supplier')->find($id);
            return response(['data' => $response, 'status' => 200], 200);
        }
        return response(['data' => 'Unauthorized!', 'status' => 401], 401);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Stock  $stock
     * @return \Illuminate\Http\Response
     */
    // public function edit(Stock $stock)
    // {
    //     //
    // }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Stock  $stock
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id): Response
    {
        //
        if(Auth::guard('api')->check()){ 
            $validatedData = $request->validate([
                'type' => 'required',
            ]);
            $response = Stock::find($id);
            if (!$response) {
                return Response(['message' => 'Not found !.', 'status'=>404], 404);
            }
            $response->update($request->all());
            return Response(['data' => $response, 'message' => 'Updated successfully!.'], 204);
        }
        return Response(['data' => 'Unauthorized!'], 401);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Stock  $stock
     * @return \Illuminate\Http\Response
     */
    public function destroy($id): Response
    {
        //
        if(Auth::guard('api')->check()){
            $response = Stock::find($id);
            if (! $response) {
                return Response(['data' => 'Not found !.'], 404);
            }
            $response->delete();
            return Response(['data' => 'Deleted Successfully !.', 'status'=>200], 200);
        }
        return Response(['data' => 'Unauthorized!'], 401);
    }
}
