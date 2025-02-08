<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Stock;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index(Request $request): Response
    {
        // Retrieve the CompanyId from the request header
        $storeId = $request->header('StoreId');
        
        $searchKey = $request->input('search-key');
        $categoryId = $request->input('category');

        // if (Auth::guard('api')->check()) {
            $products = Product::with(['user', 'category']);


            if ($searchKey) {
                $products->where(function ($query) use ($searchKey) {
                    $query->where('name', 'like', '%' . $searchKey . '%')
                        ->orWhere('slug', 'like', '%'. $searchKey.'%')
                        ->orWhere('description', 'like', '%' . $searchKey . '%');
                });
            }
            
            if ($categoryId) {
                $products->where('category_id', $categoryId);
            }

            $products->orderBy('id', 'desc');
            // Paginate the results
            $page = $request->input('page') ?? 1; // Default page is 1 if not specified
            $size = $request->input('size') ?? 10; // Default size is 10 if not specified
            $paginatedProducts = $products->paginate($size, ['*'], 'page', $page);

            return response(['data' => $paginatedProducts, 'status' => 200], 200);
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
    public function store(Request $request): Response
    {
        if (Auth::guard('api')->check()) {
            $validatedData = $request->validate([
                'name' => 'required',
            ]);

            $response = Product::create($request->all());
            return response(['data' => $response, 'message' => 'Created Successfully!', 'status'=> 201], 201);
        }
        return response(['data' => 'Unauthorized!'], 401);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show($id): Response
    {
        //
        // if (Auth::guard('api')->check()) {
            $response = Product::with(['user', 'category'])->find($id);
            if ($response) {
                return response(['data' => $response, 'status' => 200], 200);
            } else {
                return response(['data' => 'Not found!', 'status' => 404], 404);
            }
        // }
        // return response(['data' => 'Unauthorized!', 'status' => 401], 401);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    // public function edit(Product $product)
    // {
    //     //
    // }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id): Response
    {
        //
        if(Auth::guard('api')->check()){ 
            $validatedData = $request->validate([
                'name' => 'required',
            ]);
            $response = Product::find($id);
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
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy($id): Response
    {
        //
        if(Auth::guard('api')->check()){
            $response = Product::find($id);
            if (! $response) {
                return Response(['data' => 'Not found !.'], 404);
            }
            $response->delete();
            return Response(['data' => 'Deleted Successfully !.', 'status'=>200], 200);
        }
        return Response(['data' => 'Unauthorized!'], 401);
    }
}
