export interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  original_source_url: string | null;
  references: string | null;
  created_at: string;
  updated_at: string;
}

// Parsed reference for display
export interface ParsedReference {
  title: string;
  url: string;
}

// Helper to parse references string (assuming JSON or newline-separated format)
export function parseReferences(references: string | null): ParsedReference[] {
  if (!references) return [];
  
  try {
    // Try parsing as JSON array
    const parsed = JSON.parse(references);
    if (Array.isArray(parsed)) {
      return parsed.map((ref: any) => ({
        title: ref.title || ref.url || 'Reference',
        url: ref.url || ref,
      }));
    }
  } catch {
    // If not JSON, treat as newline-separated URLs
    return references
      .split('\n')
      .filter(line => line.trim())
      .map(url => ({
        title: url.trim(),
        url: url.trim(),
      }));
  }
  
  return [];
}

// Helper to determine if article is AI-enhanced (has references or was updated)
export function isEnhancedArticle(article: Article): boolean {
  return !!(article.references && article.references.trim().length > 0);
}
