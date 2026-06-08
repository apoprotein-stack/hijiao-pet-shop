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
                嗨嚼源於一個溫暖的童年回憶——阿公在路邊老麵攤的故事。那些無辜的眼神、那份陪伴與愛，啟發了我們創辦這個品牌。我們相信，每一隻寶寶都值得最好的照顧與陪伴，就像阿公對那兩隻忠實玩伴的疼愛一樣。
              </p>
            </div>
            <div className="bg-brand-light rounded-2xl overflow-hidden h-96 flex items-center justify-center">
              <img
                src="/manus-storage/brand-story_202dd01a.png"
                alt="品牌故事"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* 品牌起源故事 */}
        <section className="mb-16 bg-brand-light rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-brand-dark mb-8 text-center">
            阿公的麵攤與那碟小菜
          </h2>
          <div className="space-y-6 text-brand-muted leading-relaxed">
            <p>
              創辦人的童年回憶裡，最鮮明的一幕總是阿公在路邊的老麵攤。黃昏的微光下，阿公坐在矮凳上，吃著一碗熱騰騰的湯麵，木桌上放著一瓶冰涼的玻璃瓶啤酒。
            </p>
            <p>
              最吸引人的，是桌上那幾碟散發著誘人香氣的民間美食——滷得入味的香脆豬耳朵、黑白切、還有飽滿的滷花生。
            </p>
            <p className="font-semibold text-brand-dark">
              簷下的期盼，無辜的眼神
            </p>
            <p>
              每當那些小菜端上桌，家裡那隻忠心的大黃狗，與屋簷上輕巧漫步的小貓，便會不約而同地湊過來。牠們蹲在桌腳邊，仰著毛茸茸的小腦袋，用那最純真、無辜且充滿期盼的「憐憫眼神」緊緊盯著阿公筷子上的美味。阿公總是微微一笑，撥去醬汁，分給這兩個忠實的玩伴，那是一幅無比溫馨的畫面。
            </p>
            <p className="text-lg font-bold text-brand-primary pt-4">
              這就是我們的品牌故事。
            </p>
          </div>
        </section>

        {/* 核心理念 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-brand-dark mb-8 text-center">
            我們的核心理念
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl border border-brand-border p-8 shadow-sm hover:shadow-md transition-all">
              <div className="text-5xl mb-4">❤️</div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">
                陪伴與愛
              </h3>
              <p className="text-brand-muted">
                就像阿公與毛孩之間的溫暖互動，我們相信寵物是家庭的一份子。嗨嚼的每一款產品，都是出於對毛孩的深摯關懷。
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-brand-border p-8 shadow-sm hover:shadow-md transition-all">
              <div className="text-5xl mb-4">👨‍👩‍👧‍🐕</div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">
                人寵共食
              </h3>
              <p className="text-brand-muted">
                嗨嚼的每一款產品都達到人類食用級標準。不只是寵物零食，更是全家人都能安心享用的天然美食。
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
                  <h4 className="font-bold text-brand-dark">人類食用級標準</h4>
                  <p className="text-sm text-brand-muted">
                    達到人類食品安全標準，全家人都能享用
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
                  <h4 className="font-bold text-brand-dark">營養均衡配方</h4>
                  <p className="text-sm text-brand-muted">
                    針對貓狗不同需求精心設計，營養完整
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl flex-shrink-0">✓</div>
                <div>
                  <h4 className="font-bold text-brand-dark">家庭的選擇</h4>
                  <p className="text-sm text-brand-muted">
                    數千位毛孩家長的信任與支持
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 品牌旅程 */}
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
                  嗨嚼的創辦人因為看到自己的毛孩因為低質量的零食而出現健康問題，決心創立一個專注於寵物健康的品牌。默默就是我們的靈感來源——一隻可愛的柴犬，後來成為了我們的品牌代言人。牠用無辜的眼神和溫暖的陪伴，提醒我們為什麼要堅持做好每一件事。
                </p>
              </div>
              <div className="bg-brand-light rounded-2xl overflow-hidden h-64 flex items-center justify-center">
                <img
                  src="/manus-storage/momo-mascot_e5fb4af6.png"
                  alt="起源 - 默默柴犬"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="bg-brand-light rounded-2xl overflow-hidden h-64 flex items-center justify-center order-2 md:order-1">
                <img
                  src="/manus-storage/heychewp4_6b60efad.png"
                  alt="發展 - 豬里肌肉乾薄片"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-2xl font-bold text-brand-dark mb-4">
                  發展：人寵共食的實踐
                </h3>
                <p className="text-brand-muted leading-relaxed">
                  我們不斷研發符合人類食用級標準的天然食材配方。每一款商品都經過嚴格的食品安全檢驗，確保不僅是毛孩的佳選，也是全家人都能安心享用的美食。就像阿公精心挑選給毛孩的小菜一樣，我們對每一個細節都充滿用心。
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-brand-dark mb-4">
                  現在：人寵共食的美好時光
                </h3>
                <p className="text-brand-muted leading-relaxed">
                  今天，嗨嚼已經成為數千位毛孩家長的信任選擇。默默的故事與那些無辜的眼神，持續激勵著我們創新，不斷推出更好的產品。我們的願景是，讓每一個家庭都能享受人寵共食的準寶時光——就像阿公麵攤上的每一碗粗茶、每一碟小菜，都是給整個家庭帶來的準寶。
                </p>
              </div>
              <div className="bg-brand-light rounded-2xl overflow-hidden h-64 flex items-center justify-center">
                <img
                  src="/manus-storage/momodog_afb72d4f.png"
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
