<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Code;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Rules\PhoneNumber;

class UserauthController extends Controller
{
    public function userRegister(Request $request): JsonResponse
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'phone' => ['required', 'unique:users,phone'], // Make phone unique
            'email' => 'nullable|email', // Email is optional, but if provided, must be valid
            'password' => 'required|string|min:6|confirmed',
            'password_confirmation' => 'required|string|min:6',
        ]);

        // If validation fails, return a response with the error messages
        if ($validator->fails()) {
            \Log::info($request->input('phone'));
            \Log::info($validator->errors()->toArray());
        
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        // Create a new user
        $user = User::create([
            'phone' => $request->input('phone'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'name' => $request->input('name')?:'',
            'firstname' => $request->input('firstname')?:'',
            'lastname' => $request->input('lastname')?:'',
            'type' => $request->input('type'),            
            'profile_img' => $request->input('profile_img')?:'',
            'national_id_no'=> $request->input('national_id_no')?:'',
            'address' => $request->input('address')?:'',
            'facebook_id' => $request->input('facebook_id')?:'',
            'google_id' => $request->input('google_id')?:'',
        ]);

        return response()->json([
            'data' => $user,
            'message' => 'User registered successfully!',
            'status' => 201
        ], 201);
    }

    public function userLogin(Request $request): JsonResponse
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'identifier' => 'required|string', // Can be phone or email
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        // Get the inputs
        $identifier = $request->input('identifier');
        $password = $request->input('password');

        // Determine if the identifier is an email or a phone number
        $field = filter_var($identifier, FILTER_VALIDATE_EMAIL) ? 'email' : 'phone';

        // Attempt authentication manually
        $user = User::where($field, $identifier)->first();

        if ($user && Hash::check($password, $user->password)) {
            $token = $user->createToken('example')->accessToken;

            return response()->json([
                'status' => 200,
                'token' => $token,
                'loggedinUser' => $user
            ], 200);
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Invalid credentials.'
            ], 401);
        }
    }

    public function userLogout(): JsonResponse
    {
        if (Auth::guard('api')->check()) {
            $accessToken = Auth::guard('api')->user()->token();
            DB::table('oauth_refresh_tokens')
                ->where('access_token_id', $accessToken->id)
                ->update(['revoked' => true]);

            $accessToken->revoke();

            return response()->json([
                'status' => 200,
                'message' => 'User logout successfully!'
            ], 200);
        }

        return response()->json([
            'status' => 401,
            'message' => 'Unauthorized!'
        ], 401);
    }

    public function sendVarificationCode(Request $request): JsonResponse
    {
        $input = $request->all();

        if (isset($input['email'])) {
            $user = User::where('email', $input['email'])->first();
            if ($user) {
                $verificationCode = mt_rand(100000, 999999);
                $expire_at = Carbon::now()->addSeconds(300);

                $code = Code::create([
                    'email' => $user->email,
                    'request_url' => $request->url(),
                    'code' => $verificationCode,
                    'expire_at' => $expire_at,
                ]);

                return response()->json([
                    'data' => $code,
                    'message' => 'Code sent successfully!'
                ], 200);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Email Not Found!'
                ], 404);
            }
        } elseif (isset($input['phone'])) {
            $user = User::where('phone', $input['phone'])->first();
            if ($user) {
                $verificationCode = mt_rand(100000, 999999);
                $expire_at = Carbon::now()->addSeconds(300);

                $code = Code::create([
                    'phone' => $user->phone,
                    'request_url' => $request->url(),
                    'code' => $verificationCode,
                    'expire_at' => $expire_at,
                ]);

                return response()->json([
                    'data' => $code,
                    'message' => 'Code sent successfully!'
                ], 200);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Phone Not Found!'
                ], 404);
            }
        } else {
            return response()->json([
                'status' => 400,
                'message' => 'Email or Phone not provided!'
            ], 400);
        }
    }

    public function verifyCode(Request $request): JsonResponse
    {
        $input = $request->all();

        if (isset($input['email']) || isset($input['phone']) && isset($input['verification_code'])) {
            
            if (isset($input['email'])) {
                $user = User::where('email', $input['email'])->first();
            } elseif (isset($input['phone'])) {
                $user = User::where('phone', $input['phone'])->first();
            }

            if ($user) {
                $codeExists = Code::where('email', $user->email)
                    ->where('code', $input['verification_code'])
                    ->exists();

                if ($codeExists) {
                    return response()->json([
                        'status' => 200,
                        'message' => 'Verification code is valid!'
                    ], 200);
                } else {
                    return response()->json([
                        'status' => 400,
                        'message' => 'Invalid or expired verification code!'
                    ], 400);
                }
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'User not found!'
                ], 404);
            }
        } else {
            return response()->json([
                'status' => 400,
                'message' => 'Email or verification code not provided!'
            ], 400);
        }
    }

    public function changePassword(Request $request): JsonResponse
    {
        $input = $request->all();

        if (isset($input['email']) || isset($input['phone']) && isset($input['new_password'])) {
            if(isset($input['email'])){
                $user = User::where('email', $input['email'])->first();
            }
            if(isset($input['phone'])){
                $user = User::where('phone', $input['phone'])->first();
            }            

            if ($user) {
                $user->password = bcrypt($input['new_password']);
                $user->save();

                return response()->json([
                    'status' => 200,
                    'message' => 'Password changed successfully!'
                ], 200);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'User not found!'
                ], 404);
            }
        } else {
            return response()->json([
                'status' => 400,
                'message' => 'Email or password not provided!'
            ], 400);
        }
    }
}
