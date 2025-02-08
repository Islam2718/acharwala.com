<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    use HasFactory;

    protected $casts = [
        'product_price' => 'float',
        'offer_price' => 'float',
        'product_id' => 'integer',
        'limit' => 'integer'
    ];

    protected $fillable = [
        'title',
        'sub_title',
        'offer_code',
        'slug',
        'content',
        'banner',
        'product_price',
        'offer_price',
        'discount',
        'status',
        'html_template',
        'start_date',
        'end_date',
        'limit',
        'product_id'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
