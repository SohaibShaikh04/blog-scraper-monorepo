import { useState } from 'react';
import { useArticles } from '@/hooks/useArticles';
import { ArticleList } from '@/components/ArticleList';
import { ArticleDetail } from '@/components/ArticleDetail';

const Index = () => {
  const { articles, isLoading, error, refetch } = useArticles();
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);

  const handleArticleClick = (id: number) => {
    setSelectedArticleId(id);
  };

  const handleBack = () => {
    setSelectedArticleId(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {selectedArticleId ? (
          <ArticleDetail 
            articleId={selectedArticleId} 
            onBack={handleBack} 
          />
        ) : (
          <>
            <header className="mb-8">
              <h1 className="text-2xl font-bold tracking-tight">Articles</h1>
              <p className="text-muted-foreground mt-1">
                Browse original and AI-enhanced articles
              </p>
            </header>
            <ArticleList
              articles={articles}
              isLoading={isLoading}
              error={error}
              onArticleClick={handleArticleClick}
              onRetry={refetch}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
