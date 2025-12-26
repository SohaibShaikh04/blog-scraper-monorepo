import { Article } from '@/types/article';
import { ArticleCard } from './ArticleCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { FileX, AlertCircle, RefreshCw, Sparkles } from 'lucide-react';

interface ArticleListProps {
  articles: Article[];
  isLoading: boolean;
  error: string | null;
  onArticleClick: (id: number) => void;
  onRetry: () => void;
}

function ArticleListSkeleton() {
  return (
    <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div 
          key={i} 
          className="glass glass-border rounded-2xl p-6 space-y-4 animate-fade-in"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className="flex justify-between items-start">
            <Skeleton className="h-6 w-24 rounded-full bg-muted/50" />
            <Skeleton className="h-4 w-16 bg-muted/50" />
          </div>
          <Skeleton className="h-6 w-full bg-muted/50" />
          <Skeleton className="h-6 w-3/4 bg-muted/50" />
          <div className="space-y-2 pt-2">
            <Skeleton className="h-4 w-full bg-muted/50" />
            <Skeleton className="h-4 w-full bg-muted/50" />
            <Skeleton className="h-4 w-2/3 bg-muted/50" />
          </div>
          <div className="pt-4 border-t border-border/50">
            <Skeleton className="h-4 w-20 bg-muted/50" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 sm:py-32 text-center animate-fade-in">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-glow-pulse" />
        <div className="relative p-6 rounded-full glass glass-border">
          <FileX className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground" />
        </div>
      </div>
      <h3 className="text-xl sm:text-2xl font-semibold mb-2">No articles yet</h3>
      <p className="text-sm sm:text-base text-muted-foreground max-w-md">
        Articles will appear here once they're created. 
        <br className="hidden sm:block" />
        Check back soon for fresh content!
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
    <div className="flex flex-col items-center justify-center py-20 sm:py-32 text-center animate-fade-in">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-destructive/20 rounded-full blur-2xl animate-glow-pulse" />
        <div className="relative p-6 rounded-full glass glass-border border-destructive/30">
          <AlertCircle className="h-12 w-12 sm:h-16 sm:w-16 text-destructive" />
        </div>
      </div>
      <h3 className="text-xl sm:text-2xl font-semibold mb-2">Something went wrong</h3>
      <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-md">{message}</p>
      <Button 
        onClick={onRetry} 
        variant="outline"
        className="gap-2 glass glass-border hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
      >
        <RefreshCw className="h-4 w-4" />
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
    <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, index) => (
        <div 
          key={article.id}
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <ArticleCard
            article={article}
            onClick={onArticleClick}
          />
        </div>
      ))}
    </div>
  );
}
