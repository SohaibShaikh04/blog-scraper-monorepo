import { useState, useEffect, useCallback } from 'react';
import { Article } from '@/types/article';
import { articlesApi, ApiError } from '@/services/api';

interface UseArticlesState {
  articles: Article[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useArticles(): UseArticlesState {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await articlesApi.getAll();
      setArticles(data);
    } catch (err) {
      console.error('Failed to fetch articles:', err);
      const message = err instanceof ApiError 
        ? `Failed to load articles: ${err.message}`
        : 'Unable to connect to server. Please check your connection.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return { articles, isLoading, error, refetch: fetchArticles };
}

interface UseArticleState {
  article: Article | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useArticle(id: number | null): UseArticleState {
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchArticle = useCallback(async () => {
    if (id === null) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await articlesApi.getById(id);
      setArticle(data);
    } catch (err) {
      console.error('Failed to fetch article:', err);
      const message = err instanceof ApiError 
        ? err.message
        : 'Unable to load article';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  return { article, isLoading, error, refetch: fetchArticle };
}
