import { useState } from 'react';
import { useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Loader2, Plus, Minus, ShoppingCart, Heart } from 'lucide-react';
import { toast } from 'sonner';

export const ProductDetailPage: React.FC = () => {
  const [location] = useLocation();
  const params = new URLSearchParams(location.split('?')[1] || '');
  const productId = parseInt(params.get('id') ?? '0');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem } = useCart();

  const productQuery = trpc.products.detail.useQuery(
    { id: productId },
    { enabled: productId > 0 }
  );

  const allProductsQuery = trpc.products.list.useQuery();

  const product = productQuery.data;
  const relatedProducts = (allProductsQuery.data || [])
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    if (!product) return;

    addItem({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price.toString()),
      quantity,
      imageUrl: product.imageUrl ?? undefined,
    });

    toast.success(`已將 ${quantity} 件「${product.name}」加入購物車`, {
      duration: 2000,
    });
    setQuantity(1);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // TODO: 導向結帳頁面
    toast.info('結帳功能開發中...');
  };

  if (productQuery.isLoading) {
    return (
      <div className="pt-20 pb-16 min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-20 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-brand-muted mb-4">商品未找到</p>
          <Button onClick={() => (window.location.href = '/shop')}>
            返回商品列表
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 麵包屑導航 */}
        <div className="mb-8 flex items-center gap-2 text-sm text-brand-muted">
          <a href="/shop" className="hover:text-brand-primary cursor-pointer">
            商品列表
          </a>
          <span>/</span>
          <span className="text-brand-text font-medium">{product.name}</span>
        </div>

        {/* 商品詳細區域 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* 左側：商品圖片 */}
          <div className="flex items-center justify-center bg-brand-light rounded-lg p-8 min-h-[400px]">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="text-center text-brand-muted">
                <div className="text-6xl mb-4">{product.emoji || '📦'}</div>
                <p>商品圖片</p>
              </div>
            )}
          </div>

          {/* 右側：商品資訊 */}
          <div className="space-y-6">
            {/* 分類標籤 */}
            <div>
              <span className="inline-block px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs font-semibold rounded-full">
                {product.category === 'cat'
                  ? '🐱 貓咪專區'
                  : product.category === 'dog'
                    ? '🐶 狗狗專區'
                    : '🥩 凍乾肉乾'}
              </span>
            </div>

            {/* 商品名稱 */}
            <div>
              <h1 className="text-4xl font-bold text-brand-dark mb-2">
                {product.name}
              </h1>
              <p className="text-brand-muted">{product.summary}</p>
            </div>

            {/* 價格 */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-brand-primary">
                  NT${product.price}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-lg text-brand-muted line-through">
                    NT${product.originalPrice}
                  </span>
                )}
              </div>
              {product.originalPrice && parseInt(product.originalPrice.toString()) > parseInt(product.price.toString()) && (
                <p className="text-sm text-red-600">
                  省 NT${parseInt(product.originalPrice.toString()) - parseInt(product.price.toString())}
                </p>
              )}
            </div>

            {/* 數量選擇 */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-brand-text">
                數量
              </label>
              <div className="flex items-center gap-3 bg-brand-light rounded-lg p-2 w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-brand-border rounded transition-colors"
                >
                  <Minus className="w-4 h-4 text-brand-text" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center bg-transparent font-semibold text-brand-text outline-none"
                  min="1"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-brand-border rounded transition-colors"
                >
                  <Plus className="w-4 h-4 text-brand-text" />
                </button>
              </div>
            </div>

            {/* 行動按鈕 */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-brand-primary hover:bg-brand-dark text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <ShoppingCart className="w-5 h-5" />
                加入購物車
              </Button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  isWishlisted
                    ? 'bg-red-100 text-red-600'
                    : 'bg-brand-light text-brand-text hover:bg-brand-border'
                }`}
              >
                <Heart
                  className="w-5 h-5"
                  fill={isWishlisted ? 'currentColor' : 'none'}
                />
              </button>
            </div>

            <Button
              onClick={handleBuyNow}
              variant="outline"
              className="w-full py-3 border-brand-primary text-brand-primary hover:bg-brand-primary/5"
            >
              立即購買
            </Button>

            {/* 分隔線 */}
            <div className="border-t border-brand-border pt-6">
              {/* 成份說明 */}
              <div className="mb-6">
                <h3 className="font-semibold text-brand-text mb-2">成份</h3>
                <p className="text-brand-muted text-sm">{product.ingredients}</p>
              </div>

              {/* 規格 */}
              <div className="mb-6">
                <h3 className="font-semibold text-brand-text mb-2">規格</h3>
                <p className="text-brand-muted text-sm">{product.spec}</p>
              </div>

              {/* 營養成分 */}
              <div className="mb-6">
                <h3 className="font-semibold text-brand-text mb-2">營養成分</h3>
                <p className="text-brand-muted text-sm">{product.nutrition}</p>
              </div>

              {/* 餵食建議 */}
              <div>
                <h3 className="font-semibold text-brand-text mb-2">餵食建議</h3>
                <p className="text-brand-muted text-sm">{product.feeding}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 相關商品推薦 */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-brand-border pt-16">
            <h2 className="text-3xl font-bold text-brand-dark mb-8">相關商品</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => {
                  window.location.href = `/product-detail?id=${relatedProduct.id ?? ''}`;
                }}
                >
                  <div className="bg-brand-light h-48 flex items-center justify-center">
                    {relatedProduct.imageUrl ? (
                      <img
                        src={relatedProduct.imageUrl}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-4xl">{relatedProduct.emoji || '📦'}</div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-brand-dark mb-2 line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-sm text-brand-muted mb-3 line-clamp-1">
                      {relatedProduct.summary}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-brand-primary">
                        NT${relatedProduct.price}
                      </span>
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          addItem({
                            id: relatedProduct.id,
                            name: relatedProduct.name,
                            price: parseFloat(relatedProduct.price.toString()),
                            quantity: 1,
                            imageUrl: relatedProduct.imageUrl ?? undefined,
                          });
                          toast.success(`已加入購物車`);
                        }}
                        className="bg-brand-primary hover:bg-brand-dark text-white"
                      >
                        加入
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
