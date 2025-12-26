import { parseReferences, ParsedReference } from '@/types/article';
import { ExternalLink } from 'lucide-react';

interface ArticleReferencesProps {
  references: string | null;
}

export function ArticleReferences({ references }: ArticleReferencesProps) {
  const parsedRefs = parseReferences(references);
  
  if (parsedRefs.length === 0) return null;

  return (
    <div className="mt-8 pt-6 border-t">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
        References
      </h3>
      <ul className="space-y-2">
        {parsedRefs.map((ref, index) => (
          <li key={index}>
            <a
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <ExternalLink className="h-3 w-3" />
              {ref.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
