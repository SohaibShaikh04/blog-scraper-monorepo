import { useState } from 'react';
import { useArticles } from '@/hooks/useArticles';
import { ArticleList } from '@/components/ArticleList';
import { ArticleDetail } from '@/components/ArticleDetail';
import { Sparkles, Zap, BookOpen } from 'lucide-react';

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
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] animate-float" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-[150px] animate-glow-pulse" />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          {selectedArticleId ? (
            <ArticleDetail 
              articleId={selectedArticleId} 
              onBack={handleBack} 
            />
          ) : (
            <>
              <header className="mb-12 sm:mb-16 lg:mb-20 text-center animate-fade-in">
                {/* Floating icons */}
                <div className="flex justify-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 animate-float" style={{ animationDelay: '0s' }}>
                    <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div className="p-3 rounded-xl bg-accent/10 border border-accent/20 animate-float" style={{ animationDelay: '-1s' }}>
                    <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                  </div>
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 animate-float" style={{ animationDelay: '-2s' }}>
                    <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-6">
                  <span className="text-gradient">Articles</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Discover original and <span className="text-accent font-medium">AI-enhanced</span> content 
                  <br className="hidden sm:block" />
                  crafted for the curious mind
                </p>

                {/* Stats badges */}
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-8 sm:mt-10">
                  <div className="glass glass-border px-4 py-2 rounded-full flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-sm font-medium text-muted-foreground">
                      {articles.length} Articles
                    </span>
                  </div>
                  <div className="glass glass-border px-4 py-2 rounded-full flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">
                      AI Enhanced
                    </span>
                  </div>
                </div>
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
    </div>
  );
};

export default Index;
