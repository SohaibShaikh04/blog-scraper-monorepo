import { useArticle } from '@/hooks/useArticles';
import { isEnhancedArticle } from '@/types/article';
import { ArticleTypeBadge } from './ArticleTypeBadge';
import { ArticleReferences } from './ArticleReferences';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, AlertCircle, RefreshCw, ExternalLink, Calendar, Clock } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

interface ArticleDetailProps {
  articleId: number;
  onBack: () => void;
}

export function ArticleDetail({ articleId, onBack }: ArticleDetailProps) {
  const { article, isLoading, error, refetch } = useArticle(articleId);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto animate-fade-in">
        <Skeleton className="h-10 w-32 mb-8 rounded-xl bg-muted/50" />
        <div className="glass glass-border rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="flex gap-3">
            <Skeleton className="h-8 w-28 rounded-full bg-muted/50" />
            <Skeleton className="h-8 w-24 bg-muted/50" />
          </div>
          <Skeleton className="h-12 w-full bg-muted/50" />
          <Skeleton className="h-12 w-3/4 bg-muted/50" />
          <div className="space-y-4 pt-6">
            <Skeleton className="h-5 w-full bg-muted/50" />
            <Skeleton className="h-5 w-full bg-muted/50" />
            <Skeleton className="h-5 w-full bg-muted/50" />
            <Skeleton className="h-5 w-2/3 bg-muted/50" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 sm:py-32 text-center animate-fade-in">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-destructive/20 rounded-full blur-2xl animate-glow-pulse" />
          <div className="relative p-6 rounded-full glass glass-border border-destructive/30">
            <AlertCircle className="h-12 w-12 sm:h-16 sm:w-16 text-destructive" />
          </div>
        </div>
        <h3 className="text-xl sm:text-2xl font-semibold mb-2">Failed to load article</h3>
        <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-md">{error}</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="gap-2 glass glass-border hover:bg-muted/50"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          <Button 
            onClick={refetch}
            className="gap-2 bg-primary hover:bg-primary/90"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (!article) return null;

  const formattedDate = format(new Date(article.created_at), 'MMMM d, yyyy');
  const timeAgo = formatDistanceToNow(new Date(article.created_at), { addSuffix: true });
  const enhanced = isEnhancedArticle(article);

  return (
    <article className="max-w-4xl mx-auto animate-fade-in">
      {/* Back button */}
      <Button 
        variant="ghost" 
        onClick={onBack} 
        className="mb-6 sm:mb-8 -ml-2 gap-2 text-muted-foreground hover:text-foreground hover:bg-transparent group"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to articles</span>
      </Button>

      {/* Main content card */}
      <div className="relative">
        {/* Decorative gradient */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-[2rem] blur-xl opacity-50" />
        
        <div className="relative glass glass-border rounded-3xl overflow-hidden">
          {/* Header */}
          <header className="p-6 sm:p-8 lg:p-10 border-b border-border/50">
            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
              <ArticleTypeBadge isEnhanced={enhanced} />
              
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span>{formattedDate}</span>
              </div>
              
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>{timeAgo}</span>
              </div>

              {article.original_source_url && (
                <a
                  href={article.original_source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent/80 transition-colors link-underline ml-auto"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  View Original
                </a>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              <span className="text-gradient">{article.title}</span>
            </h1>
          </header>

          {/* Content */}
          <div className="p-6 sm:p-8 lg:p-10">
            <div 
              className="prose prose-invert prose-lg max-w-none
                prose-headings:text-foreground prose-headings:font-semibold
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground prose-strong:font-semibold
                prose-code:text-accent prose-code:bg-muted/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-muted/30 prose-pre:border prose-pre:border-border
                prose-blockquote:border-l-primary prose-blockquote:bg-muted/20 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
                prose-li:text-muted-foreground
                prose-hr:border-border"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>

          {/* References section */}
          {enhanced && (
            <div className="px-6 sm:px-8 lg:px-10 pb-6 sm:pb-8 lg:pb-10">
              <ArticleReferences references={article.references} />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
