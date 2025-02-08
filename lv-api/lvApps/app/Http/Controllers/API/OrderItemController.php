<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class OrderItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request): Response
    {
        // Check if the user is authenticated using the 'api' guard
        if (Auth::guard('api')->check()) {
            // Use Eloquent to filter order items based on the companyId, or return all order items if companyId is not provided
            $orderItems = OrderItem::with(['user', 'product', 'customer']);

            $orderItems = $orderItems->get();
            return response(['data' => $orderItems, 'status' => 200], 200);
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
                'order_id' => 'required',
            ]);

            $response = OrderItem::create($request->all());
            return response(['data' => $response, 'message' => 'Created Successfully!', 'status'=> 201], 201);
        }
        return response(['data' => 'Unauthorized!'], 401);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\OrderItem  $orderItem
     * @return \Illuminate\Http\Response
     */
    public function show($id): Response
    {
        //
        if (Auth::guard('api')->check()) {
            $response = OrderItem::with(['user', 'product','customer'])->find($id);
            return response(['data' => $response, 'status' => 200], 200);
        }
        return response(['data' => 'Unauthorized!', 'status' => 401], 401);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\OrderItem  $orderItem
     * @return \Illuminate\Http\Response
     */
    // public function edit(OrderItem $orderItem)
    // {
    //     //
    // }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\OrderItem  $orderItem
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id): Response
    {
        //
        if(Auth::guard('api')->check()){ 
            $validatedData = $request->validate([
                'order_id' => 'required',
            ]);
            $response = OrderItem::find($id);
            if (!$response) {
                return Response(['message' => 'Not found !.', 'status'=>404], 404);
            }
            $response->update($request->all());
            return Response(['data' => $response, 'message' => 'Updated successfully!.'], 200);
        }
        return Response(['data' => 'Unauthorized!'], 401);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\OrderItem  $orderItem
     * @return \Illuminate\Http\Response
     */
    public function destroy($id): Response
    {
        //
        if(Auth::guard('api')->check()){
            $response = OrderItem::find($id);
            if (! $response) {
                return Response(['data' => 'Not found !.'], 404);
            }
            $response->delete();
            return Response(['data' => 'Deleted Successfully !.', 'status'=>200], 200);
        }
        return Response(['data' => 'Unauthorized!'], 401);
    }
}
