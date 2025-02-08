<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class CustomerController extends Controller
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
        $searchKey = $request->header('search-key');

        // Check if the user is authenticated using the 'api' guard
        // if (Auth::guard('api')->check()) {
            $customers = Customer::with(['user', 'store']);
            if ($storeId) {
                $customers->whereHas('store', function ($query) use ($storeId) {
                    $query->where('id', $storeId);
                });
            }
            
            //search function.. 
            if ($searchKey) {
                $customers->where(function ($query) use ($searchKey) {
                    $query->where('name', 'like', '%' . $searchKey . '%')
                        ->orWhere('phone', 'like', '%' . $searchKey . '%');
                });
            }

            $customers->orderBy('id', 'desc');
            // Paginate the results
            $page = $request->input('page'); // Default page is 1 if not specified
            $size = $request->input('size'); // Default size is 10 if not specified
            $paginatedCustomers = $customers->paginate($size, ['*'], 'page', $page);

            return response(['data' => $paginatedCustomers, 'status' => 200], 200);
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
                'phone' => 'required|unique:customers',
            ]);

            $response = Customer::create($request->all());
            return response(['data' => $response, 'message' => 'Created Successfully!', 'status'=> 201], 201);
        // }
        // return response(['data' => 'Unauthorized!'], 401);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    // public function show($id): Response
    // {
    //     //
    //     // if (Auth::guard('api')->check()) {
    //         $response = Customer::with(['user', 'store'])->find($id);
    //         return response(['data' => $response, 'status' => 200], 200);
    //     // }
    //     // return response(['data' => 'Unauthorized!', 'status' => 401], 401);
    // }
    
    public function show($identifier): Response
    {
        // Check if the identifier is numeric (assume numeric is ID, otherwise it's phone)
        $response = is_numeric($identifier)
            ? Customer::with(['user', 'store'])->find($identifier) // Find by ID
            : Customer::with(['user', 'store'])->where('phone', $identifier)->first(); // Find by phone
    
        if ($response) {
            return response(['data' => $response, 'status' => 200], 200);
        }
    
        return response(['data' => 'Customer not found!', 'status' => 404], 404);
    }
    

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    // public function edit(Customer $customer)
    // {
    //     //
    // }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id): Response
    {
        //
        if(Auth::guard('api')->check()){ 
            $validatedData = $request->validate([
                'phone' => 'required',
            ]);
            $response = Customer::find($id);
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
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function destroy($id): Response
    {
        //
        if(Auth::guard('api')->check()){
            $response = Customer::find($id);
            if (! $response) {
                return Response(['data' => 'Not found !.'], 404);
            }
            $response->delete();
            return Response(['data' => 'Deleted Successfully !.', 'status'=>200], 200);
        }
        return Response(['data' => 'Unauthorized!'], 401);
    }
}
