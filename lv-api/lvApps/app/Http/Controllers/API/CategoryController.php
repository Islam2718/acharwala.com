<?php 
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index(Request $request): Response
    {
        // Retrieve the storeId from the request header
        // $storeId = $request->header('StoreId');

        // Check if the user is authenticated using the 'api' guard
        // if (Auth::guard('api')->check()) {
            $categories = Category::with(['user']);


            // Search functionality
            $searchKey = $request->input('search-key');
            if ($searchKey) {
                $categories->where(function ($query) use ($searchKey) {
                    $query->where('name', 'like', '%' . $searchKey . '%')
                        ->orWhere('description', 'like', '%' . $searchKey . '%');
                });
            }

            $categories->orderBy('sort_order', 'asc');
            // Paginate the results
            $page = $request->input('page'); // Default page is 1 if not specified
            $size = $request->input('size'); // Default size is 10 if not specified
            $paginatedCategories = $categories->paginate($size, ['*'], 'page', $page);

            return response(['data' => $paginatedCategories, 'status' => 200], 200);
        // }

        // return response(['data' => 'Unauthorized!', 'status' => 401], 401);
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show($id): Response
    {
        // if (Auth::guard('api')->check()) {
            $response = Category::with(['user'])->find($id);
            if ($response) {
                return response(['data' => $response, 'status' => 200], 200);
            } else {
                return response(['data' => 'Not found!', 'status' => 404], 404);
            }
        // }
        // return response(['data' => 'Unauthorized!', 'status' => 401], 401);
    }
    

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request): Response
    {
        if (Auth::guard('api')->check()) {
            $validatedData = $request->validate([
                'name' => 'required',
            ]);

            $response = Category::create($request->all());
            return response(['data' => $response, 'message' => 'Created Successfully!', 'status'=> 201], 201);
        }
        return response(['data' => 'Unauthorized!'], 401);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id): Response
    {
        //
        if(Auth::guard('api')->check()){ 
            $validatedData = $request->validate([
                'name' => 'required',
            ]);
            $response = Category::find($id);
            if (!$response) {
                return Response(['message' => 'Not found !.', 'status'=>404], 404);
            }
            $response->update($request->all());
            return Response(['data' => $response, 'message' => 'Updated successfully!.'], 200);
        }
        return response(['data' => 'Unauthorized!', 'status' => 401], 401);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy($id): Response
    {
        //
        if(Auth::guard('api')->check()){
            $response = Category::find($id);
            if (! $response) {
                return Response(['data' => 'Not found !.'], 404);
            }
            $response->delete();
            return Response(['data' => 'Deleted Successfully !.', 'status'=>200], 200);
        }
        return Response(['data' => 'Unauthorized!'], 401);
    }
}
