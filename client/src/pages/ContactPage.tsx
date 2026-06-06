import React, { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };

  return (
    <div className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 頁面標題 */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-brand-dark mb-4">聯絡我們</h1>
          <p className="text-brand-muted max-w-2xl mx-auto">
            有任何問題或建議？我們很樂意聽取您的意見，請透過以下方式與我們聯繫
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 聯絡資訊 */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-brand-dark mb-6">
                聯絡方式
              </h2>
              <div className="space-y-6">
                {/* LINE */}
                <div className="flex items-start gap-4">
                  <span className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 text-emerald-600">
                    <svg
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 10.13c0-4.49-4.04-8.13-9-8.13s-9 3.64-9 8.13c0 4 3.23 7.37 7.6 8l-.48 2.87c-.08.47.19.47.4 0l3.35-3.35h.13c4.96 0 9-3.64 9-8.12zm-12 1.37H7.5a.5.5 0 01-.5-.5V8.5a.5.5 0 011 0v2h1a.5.5 0 010 1zm2.5-.5a.5.5 0 01-.5.5H10a.5.5 0 01-.5-.5V8.5a.5.5 0 011 0V10h.5a.5.5 0 01.5.5zm2 0a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5V8.5a.5.5 0 011 0V10h.5a.5.5 0 01.5.5zm4 0a.5.5 0 01-.5.5h-1.5a.5.5 0 01-.5-.5V8.5a.5.5 0 011 0V9.5h1a.5.5 0 010 1h-1v.5h1a.5.5 0 010 1z" />
                    </svg>
                  </span>
                  <div>
                    <h4 className="font-bold text-brand-dark text-sm">
                      官方 LINE 帳號
                    </h4>
                    <p className="text-sm mt-1">
                      <a
                        href="https://line.me/R/ti/p/@hijiao_pet"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:text-emerald-700 font-semibold inline-flex items-center gap-1 transition-colors text-base"
                      >
                        @hijiao_pet{' '}
                        <span className="text-xs font-normal text-brand-muted">
                          (點擊加入好友)
                        </span>
                      </a>
                    </p>
                  </div>
                </div>

                {/* Facebook */}
                <div className="flex items-start gap-4">
                  <span className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-blue-600">
                    <svg
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14 13.5h2.5l1-3H14V8.5c0-.8.7-1.5 1.5-1.5H17V4h-3c-2.2 0-4 1.8-4 4v2H8v3h2V20h4v-6.5z" />
                    </svg>
                  </span>
                  <div>
                    <h4 className="font-bold text-brand-dark text-sm">
                      Facebook 粉絲專頁
                    </h4>
                    <p className="text-sm mt-1">
                      <a
                        href="https://facebook.com/hijiao"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1 transition-colors text-base"
                      >
                        嗨嚼 Hi-Chew Pet Care{' '}
                        <span className="text-xs font-normal text-brand-muted">
                          (點擊前往專頁)
                        </span>
                      </a>
                    </p>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-start gap-4">
                  <span className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0 text-rose-600">
                    <svg
                      className="w-5 h-5 stroke-current fill-none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </span>
                  <div>
                    <h4 className="font-bold text-brand-dark text-sm">
                      Instagram 官方帳號
                    </h4>
                    <p className="text-sm mt-1">
                      <a
                        href="https://instagram.com/hijiao_pet"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-rose-600 hover:text-rose-700 font-semibold inline-flex items-center gap-1 transition-colors text-base"
                      >
                        @hijiao_pet{' '}
                        <span className="text-xs font-normal text-brand-muted">
                          (點擊追蹤 IG)
                        </span>
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-brand-border/60">
              <p className="text-xs text-brand-muted">
                線上即時客服回覆時間：週一至週日 09:00 - 21:00
              </p>
            </div>
          </div>

          {/* 聯絡表單 */}
          <div className="bg-white rounded-2xl border border-brand-border p-8 sm:p-10 shadow-sm">
            {submitted && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                <p className="text-emerald-700 font-medium">
                  ✓ 感謝您的聯絡，我們會盡快回覆！
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-brand-dark tracking-wider uppercase mb-2">
                  您的稱呼
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-brand-light border border-brand-border rounded-xl px-4 py-3.5 text-brand-text text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-all"
                  placeholder="例如：毛孩家長 / 您的暱稱"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-dark tracking-wider uppercase mb-2">
                  聯絡電話
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-brand-light border border-brand-border rounded-xl px-4 py-3.5 text-brand-text text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-all"
                  placeholder="例如：0912345678"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-dark tracking-wider uppercase mb-2">
                  電子郵件信箱
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-brand-light border border-brand-border rounded-xl px-4 py-3.5 text-brand-text text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-all"
                  placeholder="例如：yourname@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-dark tracking-wider uppercase mb-2">
                  諮詢與留言內容
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-brand-light border border-brand-border rounded-xl px-4 py-3.5 text-brand-text text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-all resize-none"
                  placeholder="請填寫您想諮詢的細節或建議..."
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={submitMutation.isPending}
                className="w-full bg-brand-dark hover:bg-brand-primary text-white font-medium py-4 rounded-xl tracking-widest shadow-lg shadow-brand-dark/10 transition-all disabled:opacity-50"
              >
                {submitMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2 inline" />
                    送出中...
                  </>
                ) : (
                  '送出留言訊息'
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
