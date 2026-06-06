import React from 'react';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl font-bold text-brand-dark">
                嗨嚼的故事
              </h1>
              <p className="text-lg text-brand-muted leading-relaxed">
                嗨嚼源於對毛孩健康的深切關懷。我們相信，每一隻寵物都值得最好的照顧與陪伴。透過嚴選天然食材與科學配方，我們致力於為毛孩打造健康、快樂的生活。
              </p>
            </div>
            <div className="bg-brand-light rounded-2xl overflow-hidden h-96 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1587300411107-ec28ac64d5d7?auto=format&fit=crop&w=600&q=80"
                alt="品牌故事"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* 核心理念 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-brand-dark mb-8 text-center">
            我們的核心理念
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl border border-brand-border p-8 shadow-sm hover:shadow-md transition-all">
              <div className="text-5xl mb-4">🌿</div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">
                天然純粹
              </h3>
              <p className="text-brand-muted">
                嚴選天然原肉與草本成分，無添加防腐劑、人工香料與色素。我們相信自然就是給毛孩最好的禮物。
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-brand-border p-8 shadow-sm hover:shadow-md transition-all">
              <div className="text-5xl mb-4">❤️</div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">
                健康守護
              </h3>
              <p className="text-brand-muted">
                與獸醫合作研發配方，針對毛孩的營養需求精心設計。每一款產品都經過嚴格檢驗，確保品質與安全。
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-brand-border p-8 shadow-sm hover:shadow-md transition-all">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">
                品質承諾
              </h3>
              <p className="text-brand-muted">
                採用低溫凍乾工藝，鎖住營養與美味。從原料選購到製造包裝，每個環節都堅持最高標準。
              </p>
            </div>
          </div>
        </section>

        {/* 產品特色 */}
        <section className="mb-16 bg-brand-light rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-brand-dark mb-8 text-center">
            為什麼選擇嗨嚼？
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="text-2xl flex-shrink-0">✓</div>
                <div>
                  <h4 className="font-bold text-brand-dark">100% 天然食材</h4>
                  <p className="text-sm text-brand-muted">
                    不含任何化學添加物，讓毛孩吃得安心
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl flex-shrink-0">✓</div>
                <div>
                  <h4 className="font-bold text-brand-dark">獸醫推薦配方</h4>
                  <p className="text-sm text-brand-muted">
                    與專業獸醫合作，為毛孩量身打造
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl flex-shrink-0">✓</div>
                <div>
                  <h4 className="font-bold text-brand-dark">低溫凍乾工藝</h4>
                  <p className="text-sm text-brand-muted">
                    保留最多營養，美味更加濃郁
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="text-2xl flex-shrink-0">✓</div>
                <div>
                  <h4 className="font-bold text-brand-dark">嚴格品質檢驗</h4>
                  <p className="text-sm text-brand-muted">
                    每批產品都經過多重檢驗，確保安全
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl flex-shrink-0">✓</div>
                <div>
                  <h4 className="font-bold text-brand-dark">貓狗專區設計</h4>
                  <p className="text-sm text-brand-muted">
                    針對不同寵物的營養需求精心設計
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl flex-shrink-0">✓</div>
                <div>
                  <h4 className="font-bold text-brand-dark">客戶滿意度高</h4>
                  <p className="text-sm text-brand-muted">
                    數千位毛孩家長的信任與支持
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 品牌故事詳情 */}
        <section>
          <h2 className="text-3xl font-bold text-brand-dark mb-8 text-center">
            我們的旅程
          </h2>
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-brand-dark mb-4">
                  起源：一份對毛孩的愛
                </h3>
                <p className="text-brand-muted leading-relaxed">
                  嗨嚼的創辦人因為看到自己的毛孩因為低質量的零食而出現健康問題，決心創立一個專注於寵物健康的品牌。我們深信，毛孩的健康就是家人的幸福。
                </p>
              </div>
              <div className="bg-brand-light rounded-2xl overflow-hidden h-64 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1587300411107-ec28ac64d5d7?auto=format&fit=crop&w=600&q=80"
                  alt="起源"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="bg-brand-light rounded-2xl overflow-hidden h-64 flex items-center justify-center order-2 md:order-1">
                <img
                  src="https://images.unsplash.com/photo-1633722715463-d30628519d00?auto=format&fit=crop&w=600&q=80"
                  alt="發展"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-2xl font-bold text-brand-dark mb-4">
                  發展：與獸醫的合作
                </h3>
                <p className="text-brand-muted leading-relaxed">
                  我們與多位專業獸醫合作，根據毛孩的營養需求研發各類產品。每一款商品都經過科學驗證，確保能為毛孩帶來最好的健康效果。
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-brand-dark mb-4">
                  現在：為毛孩帶來快樂
                </h3>
                <p className="text-brand-muted leading-relaxed">
                  今天，嗨嚼已經成為數千位毛孩家長的信任選擇。我們持續創新，不斷推出更好的產品，只為了讓每一隻毛孩都能享受健康、快樂的生活。
                </p>
              </div>
              <div className="bg-brand-light rounded-2xl overflow-hidden h-64 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1587300411107-ec28ac64d5d7?auto=format&fit=crop&w=600&q=80"
                  alt="現在"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
