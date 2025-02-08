<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\SiteinfoController;
use App\Http\Controllers\API\SocialController;
use App\Http\Controllers\API\UserauthController;
use App\Http\Controllers\API\UserController;

use App\Http\Controllers\API\SliderController;
use App\Http\Controllers\API\SubscriberController;

use App\Http\Controllers\API\PageController;
use App\Http\Controllers\API\SectionController;
use App\Http\Controllers\API\WidgetController;

use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\OfferController;
use App\Http\Controllers\API\StockController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\OrderItemController;
use App\Http\Controllers\API\PaymentController;
use App\Http\Controllers\API\CustomerController;

// multivendors 
use App\Http\Controllers\API\StoreController;
use App\Http\Controllers\API\ShippingChargeController;


// report 
use App\Http\Controllers\API\ReportController;
// files 
use App\Http\Controllers\API\UploadController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', [UserauthController::class, 'userLogin']);
Route::post('/register', [UserauthController::class, 'userRegister']);
Route::post('/send-verification-code', [UserauthController::class, 'sendVarificationCode']);
Route::post('/verify-code', [UserauthController::class, 'verifyCode']);
Route::post('/change-password', [UserauthController::class, 'changePassword']);

// Route::middleware('auth:api')->group(function () {
    Route::resource('siteinfo', SiteinfoController::class)->only(['index', 'update']);
    Route::resource('social', SocialController::class)->only(['index', 'store', 'update', 'show', 'destroy']);    
    Route::resource('subscribers', SubscriberController::class)->only(['index', 'store', 'update', 'show', 'destroy']);    
    
    Route::post('logout', [UserauthController::class, 'userLogout']);

    Route::resource('slider', SliderController::class)->only(['index', 'store', 'update', 'show', 'destroy']);
    Route::get('slider/{id}/status', 'App\Http\Controllers\API\SliderController@updateStatus');

    Route::resource('users', UserController::class)->only(['index', 'store', 'update', 'show', 'destroy']);

    Route::resource('pages', PageController::class)->only(['index', 'store', 'update', 'show', 'destroy']);
    Route::get('page/{id}/status', 'App\Http\Controllers\API\PageController@updateStatus');
    Route::resource('section', SectionController::class)->only(['index', 'store', 'update', 'show', 'destroy']);
    Route::resource('widget', WidgetController::class)->only(['index', 'store', 'update', 'show', 'destroy']);
    Route::get('widget/{id}/status', 'App\Http\Controllers\API\WidgetController@updateStatus');

    Route::resource('stores', StoreController::class)->only(['index', 'store', 'update', 'show', 'destroy']);
    Route::resource('shipping-charge', ShippingChargeController::class)->only(['index', 'store', 'update', 'show', 'destroy']);

    Route::resource('category', CategoryController::class)->only(['index', 'store', 'update', 'show', 'destroy']);
    Route::resource('product', ProductController::class)->only(['index', 'store', 'update', 'show', 'destroy']);
    Route::resource('offer', OfferController::class)->only(['index', 'store', 'update', 'show', 'destroy']);
    Route::resource('stock', StockController::class)->only(['index', 'store', 'update', 'show', 'destroy']);
    Route::resource('order', OrderController::class)->only(['index', 'store', 'update', 'show', 'destroy']);
    Route::resource('order-item', OrderItemController::class)->only(['index', 'store', 'update', 'show', 'destroy']);
    Route::resource('payment', PaymentController::class)->only(['index', 'store', 'update', 'show', 'destroy']);
    Route::resource('customer', CustomerController::class)->only(['index', 'store', 'update', 'show', 'destroy']);
 
    // report 
    Route::get('report-due', [ReportController::class, 'due']);
    Route::get('report-dashboard', [ReportController::class, 'dashboard']);
    
    // Route::resource('upload', UploadController::class)->only(['index']);
    Route::get('files', 'App\Http\Controllers\API\UploadController@getAllFile');
    Route::post('upload-single', 'App\Http\Controllers\API\UploadController@uploadFile');
    Route::get('remove-file/{filename}', 'App\Http\Controllers\API\UploadController@deleteFile');
// });
