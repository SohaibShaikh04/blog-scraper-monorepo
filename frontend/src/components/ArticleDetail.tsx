import { useArticle } from '@/hooks/useArticles';
import { isEnhancedArticle } from '@/types/article';
import { ArticleTypeBadge } from './ArticleTypeBadge';
import { ArticleReferences } from './ArticleReferences';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, AlertCircle, RefreshCw, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

interface ArticleDetailProps {
  articleId: number;
  onBack: () => void;
}

export function ArticleDetail({ articleId, onBack }: ArticleDetailProps) {
  const { article, isLoading, error, refetch } = useArticle(articleId);

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-4 w-32" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <p className="text-lg font-medium mb-2">Failed to load article</p>
        <p className="text-sm text-muted-foreground mb-4">{error}</p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
          <Button onClick={refetch}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (!article) return null;

  const formattedDate = format(new Date(article.created_at), 'MMMM d, yyyy');
  const enhanced = isEnhancedArticle(article);

  return (
    <article className="max-w-3xl mx-auto">
      <Button variant="ghost" onClick={onBack} className="mb-6 -ml-3">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to articles
      </Button>

      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <ArticleTypeBadge isEnhanced={enhanced} />
          <span className="text-sm text-muted-foreground">{formattedDate}</span>
          {article.original_source_url && (
            <a
              href={article.original_source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              <ExternalLink className="h-3 w-3" />
              View Original Source
            </a>
          )}
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          {article.title}
        </h1>
      </header>

      <div 
        className="prose prose-neutral dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {enhanced && <ArticleReferences references={article.references} />}
    </article>
  );
}
