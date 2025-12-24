import { Article } from '@/types/article';
import { ArticleCard } from './ArticleCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { FileX, AlertCircle, RefreshCw } from 'lucide-react';

interface ArticleListProps {
  articles: Article[];
  isLoading: boolean;
  error: string | null;
  onArticleClick: (id: number) => void;
  onRetry: () => void;
}

function ArticleListSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="p-6 border rounded-lg space-y-3">
          <div className="flex justify-between">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-5 w-16" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-20" />
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <FileX className="h-12 w-12 text-muted-foreground mb-4" />
      <p className="text-lg font-medium mb-1">No articles found</p>
      <p className="text-sm text-muted-foreground">
        Articles will appear here once they're created.
      </p>
    </div>
  );
}

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <AlertCircle className="h-12 w-12 text-destructive mb-4" />
      <p className="text-lg font-medium mb-2">Something went wrong</p>
      <p className="text-sm text-muted-foreground mb-4">{message}</p>
      <Button onClick={onRetry} variant="outline">
        <RefreshCw className="h-4 w-4 mr-2" />
        Try again
      </Button>
    </div>
  );
}

export function ArticleList({ 
  articles, 
  isLoading, 
  error, 
  onArticleClick,
  onRetry 
}: ArticleListProps) {
  if (isLoading) {
    return <ArticleListSkeleton />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  if (articles.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          onClick={onArticleClick}
        />
      ))}
    </div>
  );
}
