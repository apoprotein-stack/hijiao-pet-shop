import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { X, Minus, Plus, Trash2 } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, onCheckout }) => {
  const { items, removeItem, updateQuantity, totalAmount } = useCart();

  return (
    <>
      {/* 背景遮罩 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-brand-text/40 backdrop-blur-sm z-[1100]"
          onClick={onClose}
        />
      )}

      {/* 購物車抽屜 */}
      <div
        className={`fixed top-0 right-0 w-full md:w-[450px] h-full bg-white z-[1101] shadow-2xl transition-all duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* 購物車頭 */}
        <div className="px-6 py-5 border-b border-brand-border flex items-center justify-between">
          <span className="text-lg font-bold text-brand-dark tracking-wider">您的購物車</span>
          <button
            className="p-2 hover:bg-brand-light rounded-full transition-colors"
            onClick={onClose}
          >
            <X className="w-6 h-6 text-brand-muted" />
          </button>
        </div>

        {/* 購物車內容 */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center space-y-3">
              <span className="text-5xl select-none">🛒</span>
              <p className="text-sm text-brand-muted">您的購物車目前空空如也</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 items-start pb-5 border-b border-brand-border/60">
                {/* 商品圖片 */}
                <div className="bg-brand-light w-16 h-16 rounded-xl flex items-center justify-center text-xs select-none flex-shrink-0 overflow-hidden border border-brand-border/40">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl">🥩</span>
                  )}
                </div>

                {/* 商品資訊 */}
                <div className="flex-grow min-w-0">
                  <h4 className="text-sm font-bold text-brand-dark truncate">{item.name}</h4>
                  <div className="text-brand-primary font-bold text-sm mt-1">NT$ {item.price}</div>

                  {/* 數量控制 */}
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-brand-light rounded transition-colors"
                    >
                      <Minus className="w-4 h-4 text-brand-muted" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold text-brand-text">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-brand-light rounded transition-colors"
                    >
                      <Plus className="w-4 h-4 text-brand-muted" />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 hover:bg-red-100 rounded transition-colors ml-auto"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 購物車腳與合計 */}
        <div className="p-6 border-t border-brand-border bg-brand-light space-y-4">
          <div className="flex items-center justify-between font-bold text-brand-dark text-lg">
            <span>合計金額</span>
            <span>NT$ {totalAmount.toFixed(0)}</span>
          </div>
          <Button
            onClick={onCheckout}
            disabled={items.length === 0}
            className="w-full bg-brand-dark hover:bg-brand-primary text-white rounded-xl font-bold tracking-widest shadow-md transition-all"
          >
            前往安全結帳
          </Button>
        </div>
      </div>
    </>
  );
};
