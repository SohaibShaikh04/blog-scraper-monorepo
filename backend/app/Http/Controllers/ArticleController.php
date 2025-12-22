<?php
// app/Http/Controllers/ArticleController.php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::orderBy('created_at', 'desc')->get();
        return response()->json($articles, 200);
    }

    public function show($id)
    {
        $article = Article::find($id);
        
        if (!$article) {
            return response()->json(['error' => 'Article not found'], 404);
        }
        
        return response()->json($article, 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'original_source_url' => 'nullable|url',
            'references' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $article = Article::create($request->all());
        return response()->json($article, 201);
    }

    public function update(Request $request, $id)
    {
        $article = Article::find($id);
        
        if (!$article) {
            return response()->json(['error' => 'Article not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
            'original_source_url' => 'nullable|url',
            'references' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $article->update($request->all());
        return response()->json($article, 200);
    }

    public function destroy($id)
    {
        $article = Article::find($id);
        
        if (!$article) {
            return response()->json(['error' => 'Article not found'], 404);
        }

        $article->delete();
        return response()->json(['message' => 'Article deleted successfully'], 200);
    }
}