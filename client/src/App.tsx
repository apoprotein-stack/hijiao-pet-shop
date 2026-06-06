import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import { Header } from "./components/Header";
import { CartDrawer } from "./components/CartDrawer";
import { HomePage } from "./pages/HomePage";
import { ShopPage } from "./pages/ShopPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { useState } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/shop" component={ShopPage} />
      <Route path="/product-detail" component={ProductDetailPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-brand-light">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <main className="flex-grow">
        <Router />
      </main>
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          // TODO: 實現結帳流程
          alert("結帳功能開發中...");
          setIsCartOpen(false);
        }}
      />
      {/* 頁尾 */}
      <footer className="bg-[#332d2b] text-brand-light py-16 px-4 sm:px-6 lg:px-8 mt-auto rounded-t-[40px]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="text-xl font-bold tracking-widest text-brand-primary">
              嗨嚼
            </h3>
            <p className="text-sm text-[#bfaea7] leading-relaxed max-w-sm">
              專注於毛孩的天然原肉美味，我們相信自然純粹就是給寶貝最奢華的溫柔寵愛。
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="https://line.me/R/ti/p/@hijiao_pet"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-[#4a423e] hover:bg-emerald-600 text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 shadow-md"
                title="加入官方 LINE"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M21 10.13c0-4.49-4.04-8.13-9-8.13s-9 3.64-9 8.13c0 4 3.23 7.37 7.6 8l-.48 2.87c-.08.47.19.47.4 0l3.35-3.35h.13c4.96 0 9-3.64 9-8.12zm-12 1.37H7.5a.5.5 0 01-.5-.5V8.5a.5.5 0 011 0v2h1a.5.5 0 010 1zm2.5-.5a.5.5 0 01-.5.5H10a.5.5 0 01-.5-.5V8.5a.5.5 0 011 0V10h.5a.5.5 0 01.5.5zm2 0a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5V8.5a.5.5 0 011 0V10h.5a.5.5 0 01.5.5zm4 0a.5.5 0 01-.5.5h-1.5a.5.5 0 01-.5-.5V8.5a.5.5 0 011 0V9.5h1a.5.5 0 010 1h-1v.5h1a.5.5 0 010 1z" />
                </svg>
              </a>
              <a
                href="https://facebook.com/hijiao"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-[#4a423e] hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 shadow-md"
                title="追蹤 Facebook"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M14 13.5h2.5l1-3H14V8.5c0-.8.7-1.5 1.5-1.5H17V4h-3c-2.2 0-4 1.8-4 4v2H8v3h2V20h4v-6.5z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/hijiao_pet"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-[#4a423e] hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 shadow-md"
                title="追蹤 Instagram"
              >
                <svg
                  className="w-5 h-5 stroke-current fill-none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold tracking-wider mb-6">快速導覽</h4>
            <ul className="space-y-3 text-sm text-[#bfaea7]">
              <li>
                <a href="/" className="hover:text-brand-primary cursor-pointer transition-colors">
                  • 首頁
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-brand-primary cursor-pointer transition-colors">
                  • 品牌故事
                </a>
              </li>
              <li>
                <a href="/shop" className="hover:text-brand-primary cursor-pointer transition-colors">
                  • 所有商品
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-brand-primary cursor-pointer transition-colors">
                  • 聯絡我們
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold tracking-wider mb-6">寵物專區</h4>
            <ul className="space-y-3 text-sm text-[#bfaea7]">
              <li>
                <a href="/shop?category=cat" className="hover:text-brand-primary cursor-pointer transition-colors">
                  • 貓咪鮮食零嘴
                </a>
              </li>
              <li>
                <a href="/shop?category=dog" className="hover:text-brand-primary cursor-pointer transition-colors">
                  • 狗狗磨牙肉乾
                </a>
              </li>
              <li>
                <a href="/shop?category=treats" className="hover:text-brand-primary cursor-pointer transition-colors">
                  • 頂級低溫凍乾
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-[#4a423e] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8a7e78]">
          <p>&copy; 2026 愛你嚼生技有限公司. 版權所有.</p>
          <p>嗨嚼 - 頂級寵物保養美學官網</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <CartProvider>
        <ThemeProvider defaultTheme="light">
          <TooltipProvider>
            <Toaster />
            <AppContent />
          </TooltipProvider>
        </ThemeProvider>
      </CartProvider>
    </ErrorBoundary>
  );
}

export default App;
