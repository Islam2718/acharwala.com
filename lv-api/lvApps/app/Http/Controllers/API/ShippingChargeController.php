<?php 
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ShippingCharge;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;


class ShippingChargeController extends Controller
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
            $response = ShippingCharge::get();
            return response(['data' => $response, 'status' => 200], 200);
        // }

        // return response(['data' => 'Unauthorized!', 'status' => 401], 401);
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ShippingCharge  $category
     * @return \Illuminate\Http\Response
     */
    public function show($id): Response
    {
        //
        // if (Auth::guard('api')->check()) {
            $response = ShippingCharge::find($id);
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
                'type' => 'required',
            ]);

            $response = ShippingCharge::create($request->all());
            return response(['data' => $response, 'message' => 'Created Successfully!', 'status'=> 201], 201);
        }
        return response(['data' => 'Unauthorized!'], 401);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\shippingCharge
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id): Response
    {
        //
        if(Auth::guard('api')->check()){ 
            $validatedData = $request->validate([
                'type' => 'required',
            ]);
            $response = ShippingCharge::find($id);
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
     * @param  \App\Models\shippingCharge  $shippingCharge
     * @return \Illuminate\Http\Response
     */
    public function destroy($id): Response
    {
        //
        if(Auth::guard('api')->check()){
            $response = ShippingCharge::find($id);
            if (! $response) {
                return Response(['data' => 'Not found !.'], 404);
            }
            $response->delete();
            return Response(['data' => 'Deleted Successfully !.', 'status'=>200], 200);
        }
        return Response(['data' => 'Unauthorized!'], 401);
    }
}
