<?php
namespace App\Repositories ;

use App\Models\Category;

class CategoryRepository{

    public function all(){
        Category::all();
    }

    public function find($id){
        return Category::Where('id' , $id);
    }
}
