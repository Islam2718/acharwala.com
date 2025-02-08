<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request): Response
    {
        // Retrieve the $storeId from the request header
        $storeId = $request->header('StoreId');
        $userId = $request->header('UserId');

        // Check if the user is authenticated using the 'api' guard
        if (Auth::guard('api')->check()) {
            // Use Eloquent to filter orders based on the companyId, or return all orders if companyId is not provided
            $payments = Payment::with(['user', 'store', 'customer', 'order']);

            if ($storeId) {
                $payments->whereHas('store', function ($query) use ($storeId) {
                    $query->where('id', $storeId);
                });
            }

            if ($userId) {
                $payments->whereHas('user', function ($query) use ($userId) {
                    $query->where('user_id', $userId);
                });
            }

            // $searchKey = $request->input('search-key');
            // if ($searchKey) {
            //     $payments->where(function ($query) use ($searchKey) {
            //         $query->where('phone', 'like', '%' . $searchKey . '%');
            //     });
            // }

            $payments->orderBy('id', 'desc');
            
            // Paginate the results
            $page = $request->input('page'); // Default page is 1 if not specified
            $size = $request->input('size'); // Default size is 10 if not specified
            $paginatedPayments = $payments->paginate($size, ['*'], 'page', $page);

            return response(['data' => $paginatedPayments, 'status' => 200], 200);
        }

        return response(['data' => 'Unauthorized!', 'status' => 401], 401);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function show($id): Response
    {
        if (Auth::guard('api')->check()) {
            $response = Payment::with(['user', 'store', 'customer', 'order'])->find($id);
            if ($response) {
                return response(['data' => $response, 'status' => 200], 200);
            } else {
                return response(['data' => 'Not found!', 'status' => 404], 404);
            }
        }
        return response(['data' => 'Unauthorized!', 'status' => 401], 401);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request): Response
    {
        if (Auth::guard('api')->check()) {
            $validatedData = $request->validate([
                'payment_type' => 'required',
            ]);

            $response = Payment::create($request->all());
            return response(['data' => $response, 'message' => 'Created Successfully!', 'status'=> 201], 201);
        }
        return response(['data' => 'Unauthorized!'], 401);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id): Response
    {
        //
        if(Auth::guard('api')->check()){ 
            $validatedData = $request->validate([
                'payment_type' => 'required',
            ]);
            $response = Payment::find($id);
            if (!$response) {
                return Response(['message' => 'Not found !.', 'status'=>404], 404);
            }
            $response->update($request->all());
            return Response(['data' => $response, 'message' => 'Updated successfully!.'], 204);
        }
        return response(['data' => 'Unauthorized!', 'status' => 401], 401);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function destroy($id): Response
    {
        //
        if(Auth::guard('api')->check()){
            $response = Payment::find($id);
            if (! $response) {
                return Response(['data' => 'Not found !.'], 404);
            }
            $response->delete();
            return Response(['data' => 'Deleted Successfully !.', 'status'=>200], 200);
        }
        return Response(['data' => 'Unauthorized!'], 401);
    }
}
