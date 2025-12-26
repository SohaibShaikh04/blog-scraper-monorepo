import { Sparkles, FileText } from 'lucide-react';

interface ArticleTypeBadgeProps {
  isEnhanced: boolean;
}

export function ArticleTypeBadge({ isEnhanced }: ArticleTypeBadgeProps) {
  if (isEnhanced) {
    return (
      <div className="relative group/badge">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary rounded-full blur-md opacity-40 group-hover/badge:opacity-70 transition-opacity animate-gradient-shift bg-300%" />
        
        <span className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-primary-foreground backdrop-blur-sm">
          <Sparkles className="h-3 w-3 text-primary animate-pulse" />
          <span className="text-gradient">AI Enhanced</span>
        </span>
      </div>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-secondary/50 border border-border text-muted-foreground backdrop-blur-sm transition-all hover:bg-secondary hover:border-border/80">
      <FileText className="h-3 w-3" />
      Original
    </span>
  );
}
