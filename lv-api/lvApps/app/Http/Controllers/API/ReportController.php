<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\Stock;
use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class ReportController extends Controller
{
    //
    public function dashboard(Request $request): Response
    {
        // Retrieve the storeId from the request header
        $storeId = $request->header('StoreId');
        $searchKey = $request->header('search-key');

        if (Auth::guard('api')->check()) {

            $totalCategoryCount = Category::count();
            $totalProductCount = Product::count();
            $alertProductList = Product::count();
            $totalOrderCount = Order::count();
            $totalSaleCountSum = Product::count();
            $totalPaymentCountSum = Payment::count();
            $totalDueCountSum = Order::count();

            $dashboardData = array(
                'package_info' => 500,
                'total_category'=> $totalCategoryCount,
                'total_product'=> $totalProductCount,
                'alertProductList'=> $alertProductList,
                'totalOrderCount'=> $totalOrderCount,
                'totalSaleCountSum'=> $totalSaleCountSum,
                'totalPaymentCountSum'=> $totalPaymentCountSum,
                'totalDueCountSum'=> $totalDueCountSum
            );

            return response(['data' => $dashboardData, 'status' => 200], 200);
        }
        return response(['data' => 'Unauthorized!', 'status' => 401], 401);
    }
    public function due(Request $request): Response
    {
        // Retrieve the companyId from the request header
        $storeId = $request->header('StoreId');
        $searchKey = $request->header('search-key');

        if (Auth::guard('api')->check()) {
            $orders = Order::with(['user', 'store', 'customer']);

            if ($storeId) {
                $orders->whereHas('store', function ($query) use ($storeId) {
                    $query->where('id', $storeId);
                });
            }

            $orders->where('due', '<', 0);
            $orders->orderBy('id', 'desc');
            // Paginate the results
            $page = $request->input('page') ?? 1; // Default page is 1 if not specified
            $size = $request->input('size') ?? 10; // Default size is 10 if not specified
            $paginatedOrders = $orders->paginate($size, ['*'], 'page', $page);

            return response(['data' => $paginatedOrders, 'status' => 200], 200);
        }
        return response(['data' => 'Unauthorized!', 'status' => 401], 401);
    }
}
