<?php

namespace App\Http\Controllers;

use App\Repositories\ProductRepository;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    protected $productRepo ;
    public function __construct(ProductRepository $productRepo)
    {
        $this->productRepo = $productRepo ;
    }

    public function index()
    {
        $products = $this->productRepo->all() ;
        return response()->json([]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit()
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,  $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $product)
    {
        //
    }
}
