import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc';

export const CheckoutPage: React.FC = () => {
  const { items, totalAmount, clearCart } = useCart();
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [isLoading, setIsLoading] = useState(false);
  const createOrderMutation = trpc.orders.create.useMutation();

  // 表單狀態
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'credit-card',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.address) {
      toast.error('請填寫所有必填欄位');
      return;
    }
    setStep('payment');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      const totalAmountStr = totalAmount.toFixed(2);

      await createOrderMutation.mutateAsync({
        userId: 1,
        orderNumber,
        totalAmount: totalAmountStr,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: `${formData.city} ${formData.address}${formData.postalCode ? ` (${formData.postalCode})` : ''}`,
        status: 'pending',
        notes: `Payment Method: ${formData.paymentMethod}`,
      });

      setStep('confirmation');
      clearCart();
      toast.success('訂單已成功提交！');
      sessionStorage.setItem('lastOrderNumber', orderNumber);
    } catch (error) {
      console.error('Order creation error:', error);
      toast.error('訂單提交失敗，請重試');
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0 && step !== 'confirmation') {
    return (
      <div className="pt-20 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-brand-muted mb-4">購物車為空</p>
          <Button onClick={() => (window.location.href = '/shop')}>
            繼續購物
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 頁面標題 */}
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-brand-primary hover:text-brand-dark mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            返回
          </button>
          <h1 className="text-4xl font-bold text-brand-dark">結帳</h1>
        </div>

        {/* 進度指示器 */}
        <div className="mb-12 flex items-center justify-between">
          {(['shipping', 'payment', 'confirmation'] as const).map((s, index) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step === s
                    ? 'bg-brand-primary text-white'
                    : ['shipping', 'payment'].includes(s) && step === 'confirmation'
                      ? 'bg-brand-dark text-white'
                      : 'bg-brand-light text-brand-muted'
                }`}
              >
                {index + 1}
              </div>
              {index < 2 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    step === 'confirmation' || (step === 'payment' && s === 'shipping')
                      ? 'bg-brand-dark'
                      : 'bg-brand-light'
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 主內容區 */}
          <div className="lg:col-span-2">
            {step === 'shipping' && (
              <form onSubmit={handleShippingSubmit} className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-brand-dark mb-6">收貨地址</h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-brand-text mb-2">
                        收貨人名稱 *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="請輸入收貨人名稱"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-brand-text mb-2">
                        電話 *
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="請輸入電話號碼"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-brand-text mb-2">
                        電子郵件 *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="請輸入電子郵件"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-brand-text mb-2">
                        城市 *
                      </label>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        required
                      >
                        <option value="">請選擇城市</option>
                        <option value="taipei">台北市</option>
                        <option value="newtaipei">新北市</option>
                        <option value="taichung">台中市</option>
                        <option value="kaohsiung">高雄市</option>
                        <option value="other">其他</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-brand-text mb-2">
                        地址 *
                      </label>
                      <Input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="請輸入詳細地址"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-brand-text mb-2">
                        郵遞區號
                      </label>
                      <Input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="請輸入郵遞區號"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-brand-primary hover:bg-brand-dark text-white py-3 rounded-lg font-semibold"
                >
                  繼續結帳
                </Button>
              </form>
            )}

            {step === 'payment' && (
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-brand-dark mb-6">選擇付款方式</h2>

                  <div className="space-y-3">
                    <label className="flex items-center p-4 border-2 border-brand-primary rounded-lg cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit-card"
                        checked={formData.paymentMethod === 'credit-card'}
                        onChange={handleInputChange}
                        className="w-4 h-4"
                      />
                      <span className="ml-3 font-medium text-brand-text">信用卡</span>
                    </label>

                    <label className="flex items-center p-4 border-2 border-brand-border rounded-lg cursor-pointer hover:border-brand-primary">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank-transfer"
                        checked={formData.paymentMethod === 'bank-transfer'}
                        onChange={handleInputChange}
                        className="w-4 h-4"
                      />
                      <span className="ml-3 font-medium text-brand-text">銀行轉帳</span>
                    </label>

                    <label className="flex items-center p-4 border-2 border-brand-border rounded-lg cursor-pointer hover:border-brand-primary">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="convenience-store"
                        checked={formData.paymentMethod === 'convenience-store'}
                        onChange={handleInputChange}
                        className="w-4 h-4"
                      />
                      <span className="ml-3 font-medium text-brand-text">便利商店付款</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep('shipping')}
                    className="flex-1 border-brand-primary text-brand-primary"
                  >
                    上一步
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-brand-primary hover:bg-brand-dark text-white py-3 rounded-lg font-semibold"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        處理中...
                      </>
                    ) : (
                      '完成訂單'
                    )}
                  </Button>
                </div>
              </form>
            )}

            {step === 'confirmation' && (
              <div className="bg-white rounded-lg p-8 shadow-sm text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-brand-dark mb-2">訂單已成功提交！</h2>
                  <p className="text-brand-muted">感謝您的購買，我們會盡快為您處理訂單。</p>
                </div>

                <div className="my-8 p-4 bg-brand-light rounded-lg">
                  <p className="text-sm text-brand-muted mb-2">訂單號碼</p>
                  <p className="text-2xl font-bold text-brand-dark">
                    #{Math.random().toString(36).substr(2, 9).toUpperCase()}
                  </p>
                </div>

                <p className="text-sm text-brand-muted mb-6">
                  確認郵件已發送至 {formData.email}
                </p>

                <Button
                  onClick={() => (window.location.href = '/')}
                  className="w-full bg-brand-primary hover:bg-brand-dark text-white py-3 rounded-lg font-semibold"
                >
                  返回首頁
                </Button>
              </div>
            )}
          </div>

          {/* 訂單摘要 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
              <h3 className="text-xl font-bold text-brand-dark mb-6">訂單摘要</h3>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium text-brand-text">{item.name}</p>
                      <p className="text-brand-muted">x {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-brand-primary">
                      NT${(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-brand-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-brand-muted">小計</span>
                  <span className="text-brand-text">NT${totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-muted">運費</span>
                  <span className="text-brand-text">免費</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-brand-border">
                  <span className="text-brand-dark">總計</span>
                  <span className="text-brand-primary">NT${totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
