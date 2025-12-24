import { Badge } from '@/components/ui/badge';
import { Sparkles, FileText } from 'lucide-react';

interface ArticleTypeBadgeProps {
  isEnhanced: boolean;
}

export function ArticleTypeBadge({ isEnhanced }: ArticleTypeBadgeProps) {
  if (isEnhanced) {
    return (
      <Badge variant="secondary" className="gap-1 text-xs font-medium">
        <Sparkles className="h-3 w-3" />
        AI Enhanced
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="gap-1 text-xs font-medium text-muted-foreground">
      <FileText className="h-3 w-3" />
      Original
    </Badge>
  );
}
