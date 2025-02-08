<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $casts = [
        'price' => 'float',
        'category_id' => 'integer',
        'is_top' => 'integer',
        'is_featured' => 'integer',
        'is_offered' => 'integer'
    ];

    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'description',
        'short_description',
        'thumb',
        'images',
        'price',
        'unit',
        'is_top',
        'is_featured',
        'is_offered',
        'status'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
