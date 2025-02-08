<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): Response
    {
        //
        if(Auth::guard('api')->check()){
            // $users = User::all();
            $page = request('page', 1);
            $size = request('size', 20);

            // search params 
            $search_key = request('search_key', null);

            if($search_key){
                $users = User::where('name', 'like', '%'.$search_key.'%')
                ->orWhere('phone', 'like', '%'.$search_key.'%')
                ->orWhere('email', 'like', '%'.$search_key.'%')
                ->paginate($size, ['*'], 'page', $page);
                return Response(['data'=> $users, 'status'=> 200], 200);
            }

            $name = request('name', null);
            $phone = request('phone', null);
            $city = request('city', null);
            $email = request('email', null);
            $type = request('type', null);
            $status = request('status', null);

            if($name){
                $users = User::where('name', 'like', '%'.$name.'%')->paginate($size, ['*'], 'page', $page);                
            }
            if($phone){
                $users = User::where('phone', 'like', '%'.$phone.'%')->paginate($size, ['*'], 'page', $page);
            }
            if($city){
                $users = User::where('city', 'like', '%'.$city.'%')->paginate($size, ['*'], 'page', $page);
            }
            if($email){
                $users = User::where('email', 'like', '%'.$email.'%')->paginate($size, ['*'], 'page', $page);
            }
            if($type){
                $users = User::where('type', 'like', '%'.$type.'%')->paginate($size, ['*'], 'page', $page);
            }
            if($status){
                $users = User::where('status', 'like', '%'.$status.'%')->paginate($size, ['*'], 'page', $page);
            }

            // between two date 
            $from_date = request('from_date', null);
            $to_date = request('to_date', null);
            if($from_date && $to_date){
                $users = User::whereBetween('created_at', [$from_date, $to_date])->paginate($size, ['*'], 'page', $page);
            }

            // paginate 
            $users = User::paginate($size, ['*'], 'page', $page);
            return Response(['data'=> $users, 'status'=> 200], 200);
        }
        return Response(['data' => 'Unauthorized!', 'status'=>401], 401);
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
                'email' => 'required',
            ]);

            if($User = User::create($request->all())){
                return Response(['data' => $User, 'message' => 'User created Successfully !.'], 201);
            }else{
                return Response(['data' => $User, 'message' => 'Missing Field !.'], 400);
            }
        }
        return Response(['data' => 'Unauthorized!'], 401);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show($id): Response
    {
        //
        if(Auth::guard('api')->check()){        
            $User = User::find($id);
            if(!$User){
                return Response([
                    'data' => [],
                    'status' => 404,
                    'message' => 'User not found !.'
                ], 404);
            }else{
                return Response([
                    'data' => $User, 
                    'status' => 200
                ], 200);
            }
        }
        return Response(['data' => 'Unauthorized!', 'status' => 401], 401);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id): Response
    {
        if (Auth::guard('api')->check()) {
            $validatedData = $request->validate([
                'email' => 'required',
            ]);
    
            $user = User::find($id);
    
            if (!$user) {
                return response(['message' => 'User not found!'], 404);
            }
    
            $user->update($request->all());
    
            return response([
                'data' => $user,
                'message' => 'Updated successfully!'
            ], 200);
        }
    
        return response(['message' => 'Unauthorized!'], 401);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $user): Response
    {
        //
        if(Auth::guard('api')->check()){
            $response = User::find($user);
            if (! $response) {
                return Response()->json(['data' => 'User not found !.'], 404);
            }
            $response->delete();
            return Response(['data' => 'User Deleted Successfully !.'], 202);
        }
        return Response(['data' => 'Unauthorized!', 'status' => 401], 401);
    }
}
