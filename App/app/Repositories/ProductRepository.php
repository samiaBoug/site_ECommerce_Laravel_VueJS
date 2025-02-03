<?php

namespace App\Repositories ;

use App\Models\Product ;
 class ProductRepository{

    public function all(){
        Product::all();
    }

    public function delete($id){
       $product = Product::where('id', $id);
       $product->delete();
    }    
    
    public function paginate(){

    }    
    
    public function edit(){

    }
    public function store(){
        
    }
 }