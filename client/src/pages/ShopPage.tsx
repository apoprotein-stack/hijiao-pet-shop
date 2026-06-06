import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const [location] = useLocation();
  const params = new URLSearchParams(location.split('?')[1] || '');
  const category = params.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState<string>(category);
  const { addItem } = useCart();

  // 根據分類取得商品
  const allProductsQuery = trpc.products.list.useQuery();
  const categoryProductsQuery = trpc.products.byCategory.useQuery(
    { category: selectedCategory as any },
    { enabled: selectedCategory !== 'all' }
  );

  const products =
    selectedCategory === 'all'
      ? allProductsQuery.data || []
      : categoryProductsQuery.data || [];

  const isLoading =
    selectedCategory === 'all'
      ? allProductsQuery.isLoading
      : categoryProductsQuery.isLoading;

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      quantity: 1,
      imageUrl: product.imageUrl,
    });
    alert(`已將「${product.name}」加入購物車`);
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
  };

  return (
    <div className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 頁面標題 */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-brand-dark mb-4">所有商品</h1>
          <p className="text-brand-muted">
            精心挑選的寵物零食與保養品，讓毛孩健康快樂
          </p>
        </div>

        {/* 分類篩選 */}
        <div className="mb-8 flex flex-wrap gap-3">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-brand-dark text-white'
                : 'bg-brand-light text-brand-text hover:bg-brand-primary/20'
            }`}
          >
            全部商品
          </button>
          <button
            onClick={() => handleCategoryChange('cat')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              selectedCategory === 'cat'
                ? 'bg-brand-dark text-white'
                : 'bg-brand-light text-brand-text hover:bg-brand-primary/20'
            }`}
          >
            🐱 貓咪專區
          </button>
          <button
            onClick={() => handleCategoryChange('dog')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              selectedCategory === 'dog'
                ? 'bg-brand-dark text-white'
                : 'bg-brand-light text-brand-text hover:bg-brand-primary/20'
            }`}
          >
            🐶 狗狗專區
          </button>
          <button
            onClick={() => handleCategoryChange('treats')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              selectedCategory === 'treats'
                ? 'bg-brand-dark text-white'
                : 'bg-brand-light text-brand-text hover:bg-brand-primary/20'
            }`}
          >
            🥩 凍乾肉乾
          </button>
        </div>

        {/* 商品網格 */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-brand-primary" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-brand-muted text-lg">此分類暫無商品</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden border border-brand-border p-4 shadow-sm hover:shadow-md transition-all group"
              >
                {/* 商品圖片 */}
                <div className="bg-brand-light aspect-square flex items-center justify-center rounded-xl mb-4 select-none border border-brand-border/40 overflow-hidden relative group-hover:scale-105 transition-transform">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-5xl">{product.emoji || '🥩'}</span>
                  )}
                </div>

                {/* 商品資訊 */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-brand-primary/10 text-brand-primary rounded-full font-semibold">
                      {product.category === 'cat'
                        ? '🐱 貓咪'
                        : product.category === 'dog'
                        ? '🐶 狗狗'
                        : '🥩 凍乾'}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-brand-dark group-hover:text-brand-primary transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  {product.summary && (
                    <p className="text-xs text-brand-muted line-clamp-2">
                      {product.summary}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="text-brand-primary font-bold text-sm">
                      NT$ {parseFloat(product.price).toFixed(0)}
                    </div>
                    {product.originalPrice && (
                      <div className="text-xs text-brand-muted line-through">
                        NT$ {parseFloat(product.originalPrice).toFixed(0)}
                      </div>
                    )}
                  </div>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-brand-dark hover:bg-brand-primary text-white rounded-lg font-medium transition-all"
                  >
                    加入購物車
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
