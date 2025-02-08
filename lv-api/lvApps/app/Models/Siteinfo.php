<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Siteinfo extends Model
{
    use HasFactory;
    
    protected $casts = [
        'status' => 'integer'
    ];
    
    protected $fillable = [
        'name',
        'title',
        'description',
        'logo',
        'icon',
        'map_html',
        'email',
        'phone',
        'address',
        'web_url',
        'status',
        'copyright',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'twitter_card',
        'facebook_pixels_id',
        'google_analytics_id',
        'google_tag_manager_id',
        'google_site_verification'
    ];
}
