import { Article, isEnhancedArticle } from '@/types/article';
import { ArticleTypeBadge } from './ArticleTypeBadge';
import { formatDistanceToNow } from 'date-fns';
import { ExternalLink, ArrowUpRight, Clock } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onClick: (id: number) => void;
}

export function ArticleCard({ article, onClick }: ArticleCardProps) {
  // Strip HTML tags for excerpt
  const plainContent = article.content.replace(/<[^>]*>/g, '');
  const excerpt = plainContent.length > 120 
    ? plainContent.substring(0, 120) + '...' 
    : plainContent;

  const timeAgo = formatDistanceToNow(new Date(article.created_at), { addSuffix: true });
  const enhanced = isEnhancedArticle(article);

  return (
    <article 
      className="group relative cursor-pointer"
      onClick={() => onClick(article.id)}
    >
      {/* Gradient border effect */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/50 via-accent/50 to-primary/50 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500" />
      
      {/* Card content */}
      <div className="relative glass glass-border rounded-2xl p-5 sm:p-6 h-full flex flex-col transition-all duration-500 group-hover:translate-y-[-4px] group-hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.3)]">
        {/* Top section with badge and time */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <ArticleTypeBadge isEnhanced={enhanced} />
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{timeAgo}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-semibold leading-tight mb-3 line-clamp-2 group-hover:text-gradient transition-all duration-300">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-grow mb-4">
          {excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          {article.original_source_url ? (
            <a 
              href={article.original_source_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:text-accent/80 transition-colors link-underline"
            >
              <ExternalLink className="h-3 w-3" />
              View Source
            </a>
          ) : (
            <span />
          )}
          
          <div className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            Read more
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </article>
  );
}
