import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const bannerSlides = [
  {
    title: '純粹，給牠最溫柔的守護',
    subtitle: '精選天然草本與植萃複方，回歸毛孩最自然健康的日常陪伴與深層呵護。',
    badge: 'NATURAL & COMPASSIONATE',
    image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1bf0?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: '守護毛孩亮麗的日常',
    subtitle: '專為亞洲多雨潮濕氣候設計，低敏溫和配方，打造健康的肌膚皮毛防護罩。',
    badge: 'VETERINARY FORMULATED',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: '美味凍乾，毛孩最愛',
    subtitle: '採用頂級原肉，低溫凍乾保留營養，無添加防腐劑，給寶貝最安心的零嘴。',
    badge: 'PREMIUM FREEZE-DRIED',
    image: 'https://images.unsplash.com/photo-1608454367599-c1139e6443ef?auto=format&fit=crop&w=600&q=80',
  },
];

export const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [, setLocation] = useLocation();
  const { addItem } = useCart();
  const productsQuery = trpc.products.list.useQuery();

  // 自動輪播
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      quantity: 1,
      imageUrl: product.imageUrl,
    });
    // 顯示 Toast 提示
    alert(`已將「${product.name}」加入購物車`);
  };

  return (
    <div className="pt-20">
      {/* 輪播 Banner */}
      <section className="relative h-[480px] sm:h-[600px] overflow-hidden bg-brand-light">
        <div className="relative h-full w-full">
          {bannerSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out flex items-center ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* 半透明遮罩 */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-light/80 to-brand-light/40"></div>

              {/* 內容 */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                <div className="space-y-6 text-center md:text-left max-w-2xl">
                  <span className="inline-block px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs font-semibold tracking-widest rounded-full">
                    {slide.badge}
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-bold tracking-wider text-brand-dark leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-base sm:text-lg text-brand-muted max-w-md">
                    {slide.subtitle}
                  </p>
                  <Button
                    onClick={() => setLocation('/shop')}
                    className="inline-block px-8 py-3.5 bg-brand-dark hover:bg-brand-primary text-white rounded-full font-medium tracking-wider shadow-lg shadow-brand-dark/10 hover:shadow-brand-primary/20 transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    立即探索商品
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 輪播指示器 */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-brand-primary w-8'
                  : 'bg-brand-muted/40 hover:bg-brand-muted/60'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 精選商品區塊 */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-4">精選商品</h2>
          <p className="text-brand-muted max-w-2xl mx-auto">
            嚴選天然優質食材，每一款都是毛孩健康與快樂的保證
          </p>
        </div>

        {productsQuery.isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-brand-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productsQuery.data?.slice(0, 6).map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden border border-brand-border p-4 shadow-sm hover:shadow-md transition-all cursor-pointer group"
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
                  <h3 className="text-sm font-bold text-brand-dark group-hover:text-brand-primary transition-colors">
                    {product.name}
                  </h3>
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

        <div className="text-center mt-12">
          <Button
            onClick={() => setLocation('/shop')}
            className="px-8 py-3 bg-brand-dark hover:bg-brand-primary text-white rounded-full font-medium tracking-wider"
          >
            查看全部商品
          </Button>
        </div>
      </section>

      {/* 品牌特色介紹 */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-brand-light">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🌿</div>
              <h3 className="text-lg font-bold text-brand-dark mb-2">天然食材</h3>
              <p className="text-sm text-brand-muted">
                嚴選天然原肉與草本成分，無添加防腐劑與人工香料
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-lg font-bold text-brand-dark mb-2">寵物健康</h3>
              <p className="text-sm text-brand-muted">
                獸醫推薦配方，專為毛孩量身打造的營養補充
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-lg font-bold text-brand-dark mb-2">品質保證</h3>
              <p className="text-sm text-brand-muted">
                低溫凍乾工藝，鎖住營養與美味，給寶貝最好的
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
