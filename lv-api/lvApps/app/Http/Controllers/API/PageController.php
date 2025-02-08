<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request): Response
    {
        //       
        // if(Auth::guard('api')->check()){        
            $page = request('page', 1);
            $size = request('size', 20);

            // search params 
            $search_key = request('search_key', null);

            if($search_key){
                $response = Page::where('title', 'like', '%'.$search_key.'%')
                ->orWhere('slug', 'like', '%'.$search_key.'%')
                ->orWhere('status', 'like', '%'.$search_key.'%')
                ->orWhere('name', 'like', '%'.$search_key.'%')
                ->orWhere('page_template', 'like', '%'.$search_key.'%')
                ->paginate($size, ['*'], 'page', $page);
                return Response(['data'=> $response, 'status'=> 200], 200);
            }

            $response = Page::paginate($size, ['*'], 'page', $page);
            if(!$response) return Response(['data' => 'Not found !.'], 404);
            return Response(['data' => $response, 'message' => 'Fetched Successfully !.'], 200);
        // }
        // return Response(['data' => 'Unauthorized!'], 401);
        
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
                'title' => 'required',
                'slug' => 'required|unique:pages', // Check for uniqueness in the "pages" table
            ]);
            
            if($response = Page::create($request->all())){
                return Response(['data' => $response, 'message' => 'Saved Successfully !.'], 201);
            }else{
                return Response(['data' => $validatedData, 'message' => 'Missing Field !.', 'status'=>400], 400);
            }
        }
        return Response(['data' => 'Unauthorized!'], 401);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Page  $page
     * @return \Illuminate\Http\Response
     */

    public function show($identifier): Response
    {
        // Determine whether the identifier is numeric (ID) or not (slug)
        if (is_numeric($identifier)) {
            // Find the page by ID
            $response = Page::find($identifier);
        } else {
            // Find the page by where slug is equal to the identifier
            $response = Page::where('slug', $identifier)->first();
            
        }

        // Check if the page was not found
        if (!$response) {
            return response(['message' => 'Not found!', 'status' => 404], 404);
        } else {
            // Return the response with the page data
            return response(['data' => $response, 'status' => 200], 200);
        }
    }


    public function updateStatus($id): Response
    {
        if(Auth::guard('api')->check()){             
            $response = Page::find($id);
            if (!$response) {
                return Response(['message' => 'Not found.', 'status'=>404], 404);
            }
            if($response->status==0){ $response->status = 1; }else{ $response->status = 0; }
            
            $response->save();
            return Response(['data' => $response, 'message' => 'Updated successfully.'], 200);
        }
        return Response(['data' => 'Unauthorized!'], 401);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id): Response
    {
        if (Auth::guard('api')->check()) {
            $page = Page::find($id);
    
            if (!$page) {
                return response(['message' => 'Page not found.', 'status' => 404], 404);
            }
    
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'slug' => 'required|string|max:255',
            ]);
    
            $page->update($validatedData);
    
            return response(['data' => $page, 'message' => 'Updated successfully.'], 200);
        }
    
        return response(['message' => 'Unauthorized!'], 401);
    }
    

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function destroy($id): Response
    {
        //
        if(Auth::guard('api')->check()){
            $response = Page::find($id);
            if (! $response) {
                return Response(['data' => 'Not found !.'], 404);
            }
            $response->delete();
            return Response(['data' => 'Deleted Successfully !.'], 200);
        }
        return Response(['data' => 'Unauthorized!'], 401);
    }
}
