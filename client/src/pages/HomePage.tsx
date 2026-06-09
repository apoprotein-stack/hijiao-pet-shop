import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const bannerSlides = [
  {
    title: '人寵共食，一起享受美味',
    subtitle: '達到人類食用級標準的天然美食。不只是毛孩的零食，更是全家人都能安心享用的美食。',
    badge: 'HUMAN-GRADE INGREDIENTS',
    image: '/manus-storage/momodog_afb72d4f.png',
  },
  {
    title: '純粹天然，給寶貝最溫柔的守護',
    subtitle: '精選天然原肉與草本成分，無添加防腐劑、人工香料與色素。就像阿公麵攤上的每一碟小菜。',
    badge: 'NATURAL & COMPASSIONATE',
    image: '/manus-storage/brand-story_202dd01a.png',
  },
  {
    title: '低溫凍乾美味，全家人的準寶',
    subtitle: '採用頂級原肉，低溫凍乾保留最多營養。每一款產品都經過嚴格食品安全檢驗，人寵都能安心享用。',
    badge: 'PREMIUM FREEZE-DRIED',
    image: '/manus-storage/heychew-product_6b1395b6.png',
  },
  {
    title: '阿公的故事，我們的根',
    subtitle: '就像阿公麵攤上的每一碟小菜，我們為每一隻毛孩精心挑選最好的天然美食。',
    badge: 'HUMAN-PET SHARED MEALS',
    image: '/manus-storage/heychewbrandp2_462fd328.webp',
  },
  {
    title: '阿公的陪伴，永遠的回憶',
    subtitle: '在夕陽下，阿公、孩子、狗狗和貓咪一起享受生活的美好。這就是嗨嚼想要守護的家庭時光。',
    badge: 'FAMILY MOMENTS',
    image: '/manus-storage/heychewbrandp3_5af16f49.png',
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
    // 購物車功能已移除
    return;
  };

  const handleOldAddToCart = (product: any) => {
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
                backgroundImage: slide.image.startsWith('/manus-storage/') ? `url(${slide.image})` : `url(${slide.image})`,
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
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-dark leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg sm:text-xl text-brand-muted leading-relaxed">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button
                      onClick={() => setLocation('/shop')}
                      className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-3 rounded-lg font-semibold"
                    >
                      立即探索商品
                    </Button>
                    <Button
                      onClick={() => setLocation('/about')}
                      variant="outline"
                      className="border-brand-primary text-brand-primary hover:bg-brand-primary/5 px-8 py-3 rounded-lg font-semibold"
                    >
                      了解我們的故事
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 輪播指示器 */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-brand-primary w-8' : 'bg-white/50'
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 精選商品 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-4">
              精選商品
            </h2>
            <p className="text-lg text-brand-muted">
              嚴選天然優質食材，每一款都是毛孩健康與快樂的保證
            </p>
          </div>

          {productsQuery.isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="animate-spin text-brand-primary" size={40} />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {productsQuery.data?.slice(0, 6).map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-brand-border overflow-hidden shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="aspect-square bg-brand-light overflow-hidden">
                    <img
                      src={product.imageUrl || 'https://via.placeholder.com/300'}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <span className="text-xs font-semibold text-brand-primary uppercase tracking-widest">
                        {product.category}
                      </span>
                      <h3 className="text-xl font-bold text-brand-dark mt-2">
                        {product.name}
                      </h3>
                    </div>
                    <p className="text-sm text-brand-muted line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-brand-border">
                      <span className="text-2xl font-bold text-brand-primary">
                        ${product.price}
                      </span>
                      <Button
                        onClick={() => setLocation(`/product/${product.id}`)}
                        className="bg-brand-primary hover:bg-brand-primary/90 text-white px-4 py-2 rounded-lg"
                      >
                        查看詳情
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button
              onClick={() => setLocation('/shop')}
              className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-3 rounded-lg font-semibold text-lg"
            >
              查看全部商品
            </Button>
          </div>
        </div>
      </section>

      {/* 品牌特色 */}
      <section className="py-16 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark text-center mb-12">
            為什麼選擇嗨嚼？
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">👨‍👩‍👧‍🐕</div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">人寵共食</h3>
              <p className="text-sm text-brand-muted">
                達到人類食用級標準，全家人都能安心享用
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">🌿</div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">天然純粹</h3>
              <p className="text-sm text-brand-muted">
                嚴選天然食材，無添加防腐劑與人工香料
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">❄️</div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">低溫凍乾</h3>
              <p className="text-sm text-brand-muted">
                保留最多營養與美味的工藝技術
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">✓</div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">品質保證</h3>
              <p className="text-sm text-brand-muted">
                每批產品都經過嚴格食品安全檢驗
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 區塊 */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-6">
            準備好加入嗨嚼家族了嗎？
          </h2>
          <p className="text-lg text-brand-muted mb-8">
            讓我們一起為毛孩帶來健康、快樂的每一天
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setLocation('/shop')}
              className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-3 rounded-lg font-semibold text-lg"
            >
              開始購物
            </Button>
            <Button
              onClick={() => setLocation('/contact')}
              variant="outline"
              className="border-brand-primary text-brand-primary hover:bg-brand-primary/5 px-8 py-3 rounded-lg font-semibold text-lg"
            >
              聯絡我們
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
