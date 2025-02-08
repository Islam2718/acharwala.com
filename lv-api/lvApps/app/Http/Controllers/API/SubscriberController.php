<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Subscriber;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class SubscriberController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index(Request $request): Response
    {
        // Start Query Builder
        $query = Subscriber::query();
    
        // Search functionality
        $searchKey = $request->input('search-key');
        if ($searchKey) {
            $query->where('email', 'like', '%' . $searchKey . '%');
        }
    
        // Apply sorting
        $query->orderBy('id', 'asc');
    
        // Paginate the results
        $page = $request->input('page', 1); // Default page is 1 if not specified
        $size = $request->input('size', 10); // Default size is 10 if not specified
        $paginatedSubscribers = $query->paginate($size, ['*'], 'page', $page);
    
        return response(['data' => $paginatedSubscribers, 'status' => 200], 200);
    }

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
                'email' => 'required|unique:subscribers',
            ]);

            if($response = Subscriber::create($request->all())){
                return response(['data' => $response, 'message' => 'Created Successfully!', 'status'=> 201], 201);
            }else{
                return response(['data' => 'faield'], 203);
            }
        // }
        // return response(['data' => 'Unauthorized!'], 401);
    }
    
    public function show($identifier): Response
    {
        // Check if the identifier is numeric (assume numeric is ID, otherwise it's phone)
        $response = is_numeric($identifier)
            ? Subscriber::find($identifier) // Find by ID
            : Subscriber::where('email', $identifier)->first(); // Find by phone
    
        if ($response) {
            return response(['data' => $response, 'status' => 200], 200);
        }
    
        return response(['data' => 'Not found!', 'status' => 404], 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Subscriber  $subscriber
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id): Response
    {
        // Validate input
        $validatedData = $request->validate([
            'email' => 'required',
        ]);
    
        // Find subscriber
        $subscriber = Subscriber::find($id);
        if (!$subscriber) {
            return response(['message' => 'Not found!', 'status' => 404], 404);
        }
    
        // Update subscriber
        if ($subscriber->update($request->all())) {
            return response(['data' => $subscriber, 'message' => 'Updated successfully!'], 200);
        }
    
        return response()->json(['message' => 'Update failed!'], 500);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Subscriber  $subscriber
     * @return \Illuminate\Http\Response
     */
    public function destroy($id): Response
    {
        //
        // if(Auth::guard('api')->check()){
            $response = Subscriber::find($id);
            if (! $response) {
                return Response(['data' => 'Not found !.'], 404);
            }
            $response->delete();
            return Response(['data' => 'Deleted Successfully !.', 'status'=>200], 200);
        // }
        // return Response(['data' => 'Unauthorized!'], 401);
    }
}
