<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $casts = [
        'user_id' => 'integer',
        'store_id' => 'integer',
        'invoice_no'=> 'string',
        'total' => 'double',
        'discount' => 'double',
        'sub_total' => 'double',
        'payment' => 'double',
        'due' => 'double',
        'profit' => 'double',
        'vat' => 'double',
        'tax' => 'double',
        'status'=> 'integer'
    ];

    protected $fillable = [
        'invoice_no',
        'customer_type',
        'payment_method',
        'customer_id',
        'total',
        'discount',
        'sub_total',
        'payment',
        'due',
        'profit',
        'vat',
        'tax',
        'store_id',
        'user_id',
        'status'
    ];

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    public function store(){
        return $this->belongsTo(Store::class, 'store_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    } 
}
