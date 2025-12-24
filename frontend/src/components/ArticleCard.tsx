import { Article, isEnhancedArticle } from '@/types/article';
import { ArticleTypeBadge } from './ArticleTypeBadge';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { ExternalLink } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onClick: (id: number) => void;
}

export function ArticleCard({ article, onClick }: ArticleCardProps) {
  // Strip HTML tags for excerpt
  const plainContent = article.content.replace(/<[^>]*>/g, '');
  const excerpt = plainContent.length > 150 
    ? plainContent.substring(0, 150) + '...' 
    : plainContent;

  const timeAgo = formatDistanceToNow(new Date(article.created_at), { addSuffix: true });
  const enhanced = isEnhancedArticle(article);

  return (
    <Card 
      className="cursor-pointer transition-all hover:shadow-md hover:border-primary/20"
      onClick={() => onClick(article.id)}
    >
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-lg leading-tight line-clamp-2">
            {article.title}
          </CardTitle>
          <ArticleTypeBadge isEnhanced={enhanced} />
        </div>
        <CardDescription className="line-clamp-3">
          {excerpt}
        </CardDescription>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{timeAgo}</span>
          {article.original_source_url && (
            <a 
              href={article.original_source_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              <ExternalLink className="h-3 w-3" />
              Source
            </a>
          )}
        </div>
      </CardHeader>
    </Card>
  );
}
