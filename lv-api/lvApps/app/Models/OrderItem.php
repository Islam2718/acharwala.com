<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $casts = [
        'order_id' => 'integer',
        'user_id' => 'integer',
        'store_id' => 'integer',
        'buy_price' => 'double',
        'sell_price' => 'double',
        'quantity' => 'double',
        'discount' => 'double',
        'total' => 'double',
        'status'=> 'integer'
    ];

    protected $fillable = [
        'order_id',
        'product_id',
        // 'product_name',
        'buy_price',
        'sell_price',
        'quantity',
        'discount',
        'total',

        'customer_id',
        'user_id',
        'store_id',
        'status'
    ];

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    
    public function store()
    {
        return $this->belongsTo(Store::class, 'store_id');
    }  
}
