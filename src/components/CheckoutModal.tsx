import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Truck, CreditCard, ArrowRight, Printer, Glasses } from 'lucide-react';
import { CartItem } from '../types/optical';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onClearCart,
}) => {
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [formData, setFormData] = useState({
    fullName: 'Eleanor Vance',
    email: 'eleanor.vance@example.com',
    phone: '+1 (555) 392-8190',
    address: '428 Mercer Street, Apt 4B',
    city: 'New York',
    state: 'NY',
    postalCode: '10013',
    country: 'United States',
    paymentMethod: 'credit-card',
    rxFulfillment: 'email-doctor',
  });

  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const shipping = rawSubtotal >= 150 ? 0 : 25;
  const total = rawSubtotal + shipping;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrderNum = `AUR-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderNumber(generatedOrderNum);
    setStep('success');
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#141412]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#FBFBF9] border border-[#DDD9CE] rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E7E5DF] bg-[#F7F6F2]">
          <div className="flex items-center gap-2">
            <h2 className="font-editorial text-2xl font-medium text-[#161614]">
              {step === 'details' ? 'Atelier Optical Checkout' : 'Order Confirmed'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#5A5852] hover:text-[#161614] rounded-xs hover:bg-[#EAE7DF] transition-colors"
            aria-label="Close Checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">
          {step === 'details' ? (
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Shipping Address */}
              <div>
                <h3 className="text-xs font-semibold text-[#161614] uppercase tracking-wider mb-3">
                  1. Dispatch Address
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] text-[#737067] mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-white border border-[#DDD9CE] px-3 py-2 text-xs rounded-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#737067] mb-1">Email for Lens Verification</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-[#DDD9CE] px-3 py-2 text-xs rounded-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#737067] mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-[#DDD9CE] px-3 py-2 text-xs rounded-xs"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] text-[#737067] mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-white border border-[#DDD9CE] px-3 py-2 text-xs rounded-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#737067] mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-white border border-[#DDD9CE] px-3 py-2 text-xs rounded-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-[#737067] mb-1">State / Province</label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full bg-white border border-[#DDD9CE] px-3 py-2 text-xs rounded-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#737067] mb-1">Postal Code</label>
                      <input
                        type="text"
                        required
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        className="w-full bg-white border border-[#DDD9CE] px-3 py-2 text-xs rounded-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="pt-4 border-t border-[#E7E5DF]">
                <h3 className="text-xs font-semibold text-[#161614] uppercase tracking-wider mb-3">
                  2. Secure Payment
                </h3>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <label className="p-3 bg-white border border-[#1C1C1A] rounded-xs flex flex-col justify-between cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <CreditCard className="w-4 h-4 text-[#1C1C1A]" />
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={formData.paymentMethod === 'credit-card'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'credit-card' })}
                      />
                    </div>
                    <span className="font-semibold text-[#161614]">Credit / Debit</span>
                  </label>

                  <label className="p-3 bg-white border border-[#DDD9CE] rounded-xs flex flex-col justify-between cursor-pointer hover:border-[#BBB6AA]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-[#1C1C1A]"> Pay</span>
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={formData.paymentMethod === 'apple-pay'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'apple-pay' })}
                      />
                    </div>
                    <span className="font-medium text-[#161614]">Apple Pay</span>
                  </label>

                  <label className="p-3 bg-white border border-[#DDD9CE] rounded-xs flex flex-col justify-between cursor-pointer hover:border-[#BBB6AA]">
                    <div className="flex items-center justify-between mb-2">
                      <Truck className="w-4 h-4 text-[#1C1C1A]" />
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      />
                    </div>
                    <span className="font-medium text-[#161614]">Cash on Delivery</span>
                  </label>
                </div>
              </div>

              {/* Order Summary Confirmation */}
              <div className="p-4 bg-[#F2EFE9] rounded-sm border border-[#E3DFD5] space-y-2 text-xs">
                <div className="flex justify-between text-[#595751]">
                  <span>Spectacles Subtotal</span>
                  <span className="font-mono tabular-nums text-[#161614]">${rawSubtotal}</span>
                </div>
                <div className="flex justify-between text-[#595751]">
                  <span>Express Courier Delivery</span>
                  <span className="font-mono text-[#161614]">
                    {shipping === 0 ? 'Complimentary' : `$${shipping}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#DFDCD2] flex justify-between text-sm font-semibold text-[#161614]">
                  <span>Total Due</span>
                  <span className="font-mono tabular-nums">${total}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full bg-[#1C1C1A] hover:bg-[#32322E] text-[#FBFBF9] py-3.5 rounded-sm text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Authorize & Place Optical Order</span>
                <span className="font-mono tabular-nums text-[#DCD8CB]">(${total})</span>
              </button>
            </form>
          ) : (
            /* Order Success View */
            <div className="py-6 text-center space-y-6">
              <div className="w-14 h-14 bg-[#264D32] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase font-medium tracking-widest text-[#737067]">
                  Order Successfully Dispatched to Laboratory
                </span>
                <h3 className="font-editorial text-3xl font-medium text-[#161614] mt-1">
                  Thank You, {formData.fullName.split(' ')[0]}
                </h3>
                <div className="inline-block mt-2 px-3 py-1 bg-[#EDEAE1] rounded-xs font-mono text-xs font-semibold text-[#161614]">
                  Tracking Order #{orderNumber}
                </div>
              </div>

              <div className="max-w-md mx-auto p-4 bg-white rounded-sm border border-[#E7E5DF] text-xs text-left space-y-2.5">
                <div className="flex justify-between text-[#737067]">
                  <span>Dispatch Destination:</span>
                  <span className="font-medium text-[#161614]">{formData.city}, {formData.country}</span>
                </div>
                <div className="flex justify-between text-[#737067]">
                  <span>Estimated Delivery:</span>
                  <span className="font-medium text-[#161614]">3–5 Business Days (Express)</span>
                </div>
                <div className="flex justify-between text-[#737067]">
                  <span>Surfacing & Lab Verification:</span>
                  <span className="font-medium text-[#2E6B3F]">In Queue at Sabae Workshop</span>
                </div>
                <div className="pt-2 border-t border-[#EDEAE1] text-[11px] text-[#737067]">
                  A confirmation receipt and optometrist review link have been sent to <strong>{formData.email}</strong>.
                </div>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="bg-[#1C1C1A] text-white hover:bg-[#32322E] px-6 py-2.5 rounded-sm text-xs uppercase tracking-wider font-semibold transition-colors"
                >
                  Return to Atelier
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
