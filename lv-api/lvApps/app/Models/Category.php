<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $casts = [
        'user_id' => 'integer',
        'status' => 'integer',
        'sort_order' => 'integer',
    ];

    protected $fillable = [
        'name',
        'description',
        'thumb',
        'user_id',
        'status',
        'sort_order'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

}
