<?php

namespace App\Http\Controllers;

use App\Repositories\ProductRepository;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    protected $productRepo;

    public function __construct(ProductRepository $productRepo)
    {
        $this->productRepo = $productRepo;
    }

    /**
     * Afficher la liste des produits.
     */
    public function index()
    {
        $products = $this->productRepo->all();
        return response()->json([
            'success' => true,
            'products' => $products
        ]);
    }

    /**
     * Stocker un nouveau produit.
     */
    public function store(Request $request)
    {
        $request->validate([
            "name" => 'required|string|max:255',
            "description" => 'required|string',
            "price" => 'required|integer'
        ]);

        $product = $this->productRepo->create($request);

        return response()->json([
            'success' => true,
            'message' => 'Produit créé avec succès.',
            'product' => $product
        ]);
    }

    /**
     * Mettre à jour un produit existant.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            "name" => 'required|string|max:255',
            "description" => 'required|string',
            "price" => 'required|integer'
        ]);

        $product = $this->productRepo->find($id);
        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Produit non trouvé.'
            ], 404);
        }

        $updatedProduct = $this->productRepo->update($id, $request);

        return response()->json([
            'success' => true,
            'message' => 'Produit mis à jour avec succès.',
            'product' => $updatedProduct
        ]);
    }

    /**
     * Supprimer un produit.
     */
    public function destroy($id)
    {
        $product = $this->productRepo->find($id);
        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Produit non trouvé.'
            ], 404);
        }

        $this->productRepo->delete($id);

        return response()->json([
            'success' => true,
            'message' => 'Produit supprimé avec succès.'
        ]);
    }
}
