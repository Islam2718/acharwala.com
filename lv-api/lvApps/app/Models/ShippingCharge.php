<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShippingCharge extends Model
{
    use HasFactory;

    protected $casts = [
        'status' => 'integer',
    ];

    protected $fillable = [
        'type',
        'title',
        'shipping_form',
        'shipping_to',
        'charge',
        'status',       
    ];
}
