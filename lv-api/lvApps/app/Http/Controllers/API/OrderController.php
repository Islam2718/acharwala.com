<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index(Request $request): Response
    {
        // Retrieve the storeId from the request header
        $userId = $request->header('UserId');

        // Check if the user is authenticated using the 'api' guard
        // if (Auth::guard('api')->check()) {
            // Use Eloquent to filter orders based on the companyId, or return all orders if companyId is not provided
            $orders = Order::with(['user', 'store', 'customer']);

            if ($userId) {
                $orders->whereHas('user', function ($query) use ($userId) {
                    $query->where('user_id', $userId);
                });
            }

            $searchKey = $request->input('search-key');
            if ($searchKey) {
                $orders->where(function ($query) use ($searchKey) {
                    $query->where('phone', 'like', '%' . $searchKey . '%')
                        ->orWhere('invoice_no', 'like', '%' . $searchKey . '%');
                });
            }
            
            $searchKeyInvoice = $request->input('search-key-invoice');
            if ($searchKeyInvoice) {
                $orders->where('invoice_no', $searchKeyInvoice);
            }

            $orders->orderBy('id', 'desc');
            
            // Paginate the results
            $page = $request->input('page'); // Default page is 1 if not specified
            $size = $request->input('size'); // Default size is 10 if not specified
            $paginatedOrders = $orders->paginate($size, ['*'], 'page', $page);

            return response(['data' => $paginatedOrders, 'status' => 200], 200);
        // }

        // return response(['data' => 'Unauthorized!', 'status' => 401], 401);
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
        // if (Auth::guard('api')->check()) {
            $validatedData = $request->validate([
                'customer_type' => 'required'
            ]);

            $invoice_no = $request->input('invoice_no', 'KK-'.time());
            $requestData = array_merge($request->all(), ['invoice_no' => $invoice_no]);

            $response = Order::create($requestData);

            $orderItems = $request->input('order_items');

            if (!is_null($orderItems) && is_array($orderItems)) {
                foreach ($orderItems as $item) {
                    // Create OrderItem associated with the newly created Order
                    OrderItem::create([
                        'order_id' => $response->id, // Use $response->id which represents the newly created order's ID
                        'customer_type' => 'ONLINE', //$item['customer_type'] ? $item['customer_type'], 'ONLINE',
                        'customer_id' => 1,
                        'product_name' => $item['name'],
                        'buy_price' => 0,
                        'sell_price' => 0,
                        'quantity' => $item['quantity'],
                        'total' => $item['totalPrice'],
                        'product_id' => $item['id'],
                        'user_id' => $request->input('user_id')
                        // ... other columns in OrderItems table
                    ]);
                }
            }

            return response(['data' => $response, 'message' => 'Created Successfully!', 'status'=> 201], 201);
        // }
        // return response(['data' => 'Unauthorized!'], 401);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show($id): Response
    {
        //
        // if (Auth::guard('api')->check()) {
            // $response = Order::find($id);
            $response = Order::with(['user', 'customer', 'orderItems.product'])->find($id);
            return response(['data' => $response, 'status' => 200], 200);
        // }
        // return response(['data' => 'Unauthorized!', 'status' => 401], 401);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    // public function edit(Order $order)
    // {
    //     //
    // }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id): Response
    {
        //
        if(Auth::guard('api')->check()){ 
            $validatedData = $request->validate([
                'customer_type' => 'required',
            ]);
            $response = Order::find($id);
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
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy($id): Response
    {
        //
        if(Auth::guard('api')->check()){
            $response = Order::find($id);
            if (! $response) {
                return Response(['data' => 'Not found !.'], 404);
            }
            $response->delete();
            return Response(['data' => 'Deleted Successfully !.', 'status'=>200], 200);
        }
        return Response(['data' => 'Unauthorized!'], 401);
    }
}
