<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class StoreController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index(Request $request): Response
    {
        // Retrieve the StoreId from the request header
        // $userId = $request->header('UserId');

        // Check if the user is authenticated using the 'api' guard
        // if (Auth::guard('api')->check()) {

            $userId = $request->input('UserId');
            $storeId = $request->input('StoreId');

            $query = Store::with('user');

            if ($userId) {
                $query->whereHas('user', function ($query) use ($userId) {
                    $query->where('id', $userId);
                });
            }

            // Search functionality
            $searchKey = $request->input('search-key');
            if ($searchKey) {
                $query->where(function ($query) use ($searchKey) {
                    $query->where('name', 'like', '%' . $searchKey . '%')
                        ->orWhere('email', 'like', '%' . $searchKey . '%')
                        ->orWhere('phone', 'like', '%' . $searchKey . '%');
                });
            }
            $query->orderBy('id', 'desc');
            // Paginate the results
            $size = $request->input('size', 10); // Default size is 10 if not specified
            $paginatedStores = $query->paginate($size);

            return response(['data' => $paginatedStores, 'status' => 200], 200);
        // }

        // Return an unauthorized response if the user is not authenticated
        // return response(['error' => 'Unauthorized'], 401);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request): Response
    {
        //
        if(Auth::guard('api')->check()){        
            $validatedData = $request->validate([
                'name' => 'required',
            ]);
            if($Store = Store::create($request->all())){
                return Response(['data' => $Store, 'message' => 'Created Successfully !.'], 201);
            }else{
                return Response(['data' => $Store, 'message' => 'Missing Field !.'], 400);
            }
        }
        return Response(['data' => 'Unauthorized!'], 401);        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Store  $store
     * @return \Illuminate\Http\Response
     */

    public function show($id): Response
    {
        //
        // if (Auth::guard('api')->check()) {
            $response = Store::find($id);
            return response(['data' => $response, 'status' => 200], 200);
        // }
        // return response(['data' => 'Unauthorized!', 'status' => 401], 401);
    }

    public function setDefaultStore($id, Request $request): Response
    {
        if (Auth::guard('api')->check()) {
            $userId = $request->header('UserId');

            // Set all Stores ' is_default to 0 except the one being updated
            Store::where('user_id', $userId)->update(['is_default' => 0]);
            
            $storeToUpdate = Store::find($id);
            if (!$storeToUpdate) {
                return Response(['message' => 'Not found.', 'status' => 404], 404);
            }
            // Set the requested Store's is_default to 1
            $storeToUpdate->is_default = 1;
            $storeToUpdate->save();

            return Response(['data' => $storeToUpdate, 'message' => 'Updated successfully.'], 200);
        }

        return Response(['data' => 'Unauthorized!'], 401);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Store  Store
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id): Response
    {
        // Optional: Authorization check (if needed)
        // Uncomment the below block if API guard authentication is required
        if (!Auth::guard('api')->check()) {
            return response(['data' => 'Unauthorized!', 'status' => 401], 401);
        }
    
        // Validate incoming data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255', // Adjust validation rules as needed
            // Add other fields and rules here
        ]);
    
        // Find the resource by ID
        $response = Store::find($id);
        if (!$response) {
            return response(['message' => 'Not found!', 'status' => 404], 404);
        }
    
        // Update the resource with validated data
        $response->update($request->all());
    
        // Return the updated resource
        return response([
            'data' => $response,
            'message' => 'Updated successfully!',
            'status' => 200,
        ], 200);
    }
    

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Store  Store
     * @return \Illuminate\Http\Response
     */
    public function destroy($id): Response
    {
        //
        if(Auth::guard('api')->check()){
            $response = Store::find($id);
            if (! $response) {
                return Response(['data' => 'Not found !.'], 404);
            }
            $response->delete();
            return Response(['data' => 'Deleted Successfully !.', 'status'=>200], 200);
        }
        return Response(['data' => 'Unauthorized!'], 401);
    }
}
