import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useLocation } from 'wouter';

interface HeaderProps {
  onCartClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const [, setLocation] = useLocation();

  const navigateTo = (path: string) => {
    setLocation(path);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* 導覽列 */}
      <header className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md z-[999] border-b border-brand-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* 品牌 LOGO */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigateTo('/')}
          >
            <span className="text-xl sm:text-2xl font-bold tracking-widest text-brand-dark">
              嗨嚼
            </span>
            <span className="hidden sm:inline-block h-4 w-[1px] bg-brand-primary"></span>
            <span className="hidden sm:inline-block text-xs font-light tracking-widest text-brand-muted uppercase">
              Pet Beauty
            </span>
          </div>

          {/* 桌上型電腦選單 */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => navigateTo('/')}
              className="text-sm font-medium tracking-wider text-brand-text hover:text-brand-primary py-2 transition-colors"
            >
              首頁
            </button>
            <button
              onClick={() => navigateTo('/about')}
              className="text-sm font-medium tracking-wider text-brand-text hover:text-brand-primary py-2 transition-colors"
            >
              品牌故事
            </button>

            {/* 商品下拉選單 */}
            <div className="relative group">
              <button className="text-sm font-medium tracking-wider text-brand-text hover:text-brand-primary py-2 flex items-center gap-1 transition-colors">
                所有商品
                <span className="text-[10px] text-brand-muted group-hover:rotate-180 transition-transform duration-300">
                  ▼
                </span>
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-48 bg-white border border-brand-border rounded-xl shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-[1000]">
                <button
                  onClick={() => navigateTo('/shop?category=all')}
                  className="block w-full px-5 py-3 text-sm text-brand-text hover:bg-brand-light hover:text-brand-primary cursor-pointer text-center transition-colors"
                >
                  🐱 貓咪專區
                </button>
                <button
                  onClick={() => navigateTo('/shop?category=dog')}
                  className="block w-full px-5 py-3 text-sm text-brand-text hover:bg-brand-light hover:text-brand-primary cursor-pointer text-center transition-colors"
                >
                  🐶 狗狗專區
                </button>
                <button
                  onClick={() => navigateTo('/shop?category=treats')}
                  className="block w-full px-5 py-3 text-sm text-brand-text hover:bg-brand-light hover:text-brand-primary cursor-pointer text-center transition-colors"
                >
                  🥩 凍乾肉乾
                </button>
              </div>
            </div>

            <button
              onClick={() => navigateTo('/contact')}
              className="text-sm font-medium tracking-wider text-brand-text hover:text-brand-primary py-2 transition-colors"
            >
              聯絡我們
            </button>
          </nav>

          {/* 右側控制按鈕 */}
          <div className="flex items-center gap-4">
            {/* 行動版漢堡選單按鈕 */}
            <button
              className="md:hidden p-2 hover:bg-brand-light rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-brand-dark" />
              ) : (
                <Menu className="w-6 h-6 text-brand-dark" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 行動版側邊抽屜選單 */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-brand-text/40 backdrop-blur-sm z-[1001] md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 left-0 w-72 h-full bg-white z-[1002] shadow-2xl p-6 transition-all duration-300 flex flex-col justify-between md:hidden ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-brand-border">
            <span className="text-lg font-bold text-brand-dark tracking-wider">選單導覽</span>
            <button
              className="p-2 hover:bg-brand-light rounded-full"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="w-5 h-5 text-brand-muted" />
            </button>
          </div>
          <nav className="mt-6 flex flex-col gap-4">
            <button
              onClick={() => navigateTo('/')}
              className="py-3 px-4 rounded-xl text-brand-text hover:bg-brand-light hover:text-brand-primary font-medium cursor-pointer transition-all"
            >
              🏠 首頁
            </button>
            <button
              onClick={() => navigateTo('/about')}
              className="py-3 px-4 rounded-xl text-brand-text hover:bg-brand-light hover:text-brand-primary font-medium cursor-pointer transition-all"
            >
              📖 品牌故事
            </button>

            <div className="border-t border-brand-border/60 my-2"></div>
            <span className="px-4 text-xs font-bold text-brand-muted tracking-widest uppercase">商品分類</span>
            <button
              onClick={() => navigateTo('/shop?category=all')}
              className="py-2 px-6 rounded-xl text-sm text-brand-text hover:bg-brand-light hover:text-brand-primary cursor-pointer transition-all"
            >
              • 顯示全部
            </button>
            <button
              onClick={() => navigateTo('/shop?category=cat')}
              className="py-2 px-6 rounded-xl text-sm text-brand-text hover:bg-brand-light hover:text-brand-primary cursor-pointer transition-all"
            >
              • 貓咪專區
            </button>
            <button
              onClick={() => navigateTo('/shop?category=dog')}
              className="py-2 px-6 rounded-xl text-sm text-brand-text hover:bg-brand-light hover:text-brand-primary cursor-pointer transition-all"
            >
              • 狗狗專區
            </button>
            <button
              onClick={() => navigateTo('/shop?category=treats')}
              className="py-2 px-6 rounded-xl text-sm text-brand-text hover:bg-brand-light hover:text-brand-primary cursor-pointer transition-all"
            >
              • 凍乾肉乾
            </button>
            <div className="border-t border-brand-border/60 my-2"></div>

            <button
              onClick={() => navigateTo('/contact')}
              className="py-3 px-4 rounded-xl text-brand-text hover:bg-brand-light hover:text-brand-primary font-medium cursor-pointer transition-all"
            >
              ✉️ 聯絡我們
            </button>
          </nav>
        </div>
        <div className="text-center text-xs text-brand-muted border-t border-brand-border pt-4">
          © 2026 愛你嚼生技有限公司
        </div>
      </div>
    </>
  );
};
