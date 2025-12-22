<?php
// app/Http/Controllers/ArticleImportController.php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ArticleImportController extends Controller
{
    public function batchImport(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'articles' => 'required|array',
            'articles.*.title' => 'required|string|max:255',
            'articles.*.content' => 'required|string',
            'articles.*.original_source_url' => 'nullable|url',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $imported = [];
        $errors = [];

        foreach ($request->articles as $index => $articleData) {
            try {
                $article = Article::create([
                    'title' => $articleData['title'],
                    'content' => $articleData['content'],
                    'original_source_url' => $articleData['original_source_url'] ?? null,
                    'references' => $articleData['references'] ?? null,
                ]);
                
                $imported[] = $article;
            } catch (\Exception $e) {
                $errors[] = [
                    'index' => $index,
                    'title' => $articleData['title'] ?? 'Unknown',
                    'error' => $e->getMessage()
                ];
            }
        }

        return response()->json([
            'message' => 'Batch import completed',
            'imported_count' => count($imported),
            'error_count' => count($errors),
            'imported' => $imported,
            'errors' => $errors
        ], 201);
    }
}