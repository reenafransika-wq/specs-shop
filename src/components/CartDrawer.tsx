import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { CartItem } from '../types/optical';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState<string | null>(null);

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const discount = promoApplied ? rawSubtotal * 0.1 : 0;
  const subtotal = Math.max(0, rawSubtotal - discount);
  const freeShippingThreshold = 150;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    if (promoCode.trim().toUpperCase() === 'ATELIER10' || promoCode.trim().toUpperCase() === 'FIRSTPAIR') {
      setPromoApplied(true);
    } else {
      setPromoError('Code invalid. Try ATELIER10 for 10% off.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#141412]/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div className="relative w-full max-w-md bg-[#FBFBF9] h-full shadow-2xl flex flex-col justify-between border-l border-[#DDD9CE]">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E7E5DF] flex items-center justify-between bg-[#F7F6F2]">
          <div className="flex items-center gap-2">
            <h2 className="font-editorial text-2xl font-medium text-[#161614]">
              Shopping Bag
            </h2>
            <span className="text-xs text-[#737067] font-mono tabular-nums">
              ({items.reduce((sum, i) => sum + i.quantity, 0)} {items.length === 1 ? 'frame' : 'frames'})
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#5A5852] hover:text-[#161614] rounded-xs hover:bg-[#EAE7DF] transition-colors"
            aria-label="Close Bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Tracker */}
        <div className="px-5 py-3 bg-[#F2EFE9] border-b border-[#E3DFD5] text-xs">
          {amountToFreeShipping > 0 ? (
            <p className="text-[#595751]">
              Add <span className="font-mono font-semibold text-[#161614]">${amountToFreeShipping.toFixed(0)}</span> more for Free Worldwide Express Delivery
            </p>
          ) : (
            <p className="text-[#2B5436] font-medium flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              <span>Complimentary Worldwide Express Delivery unlocked</span>
            </p>
          )}
          <div className="w-full bg-[#DFDCD2] h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-[#1C1C1A] h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#737067]">
              <span className="font-editorial text-2xl text-[#161614] mb-2">
                Your Bag is Empty
              </span>
              <p className="text-xs max-w-xs leading-relaxed text-[#595751] mb-6">
                Discover our architectural spectacle collection and try them in the virtual mirror before ordering.
              </p>
              <button
                onClick={onClose}
                className="bg-[#1C1C1A] text-white px-5 py-2.5 rounded-sm text-xs uppercase tracking-wider font-semibold hover:bg-[#32322E] transition-colors"
              >
                Browse Frames
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white rounded-sm border border-[#E7E5DF] flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-16 h-12 bg-[#F4F3EE] rounded-xs flex items-center justify-center p-1 overflow-hidden shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div>
                      <h4 className="font-editorial text-base font-medium text-[#161614]">
                        {item.product.name}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-[#737067] mt-0.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
                          style={{ backgroundColor: item.selectedColor.previewColor }}
                        />
                        <span>{item.selectedColor.name}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.product.fit}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1 text-[#8C887E] hover:text-[#992222] transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Optical Configuration Summary */}
                <div className="p-2.5 bg-[#F9F8F5] rounded-xs text-[11px] text-[#595751] space-y-1">
                  <div className="flex justify-between">
                    <span className="font-medium text-[#161614]">{item.lensOption.name}</span>
                    <span className="font-mono tabular-nums">
                      {item.lensOption.price === 0 ? 'Inc.' : `+$${item.lensOption.price}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#737067]">
                    <span>Index: {item.lensIndexTier.name}</span>
                    <span className="font-mono tabular-nums">
                      {item.lensIndexTier.price === 0 ? 'Inc.' : `+$${item.lensIndexTier.price}`}
                    </span>
                  </div>
                  {item.coatings.length > 0 && (
                    <div className="text-[10px] text-[#8C887E]">
                      Coatings: {item.coatings.map((c) => c.name).join(', ')}
                    </div>
                  )}
                  <div className="text-[10px] text-[#7A4E2D] font-medium pt-0.5">
                    Rx Mode:{' '}
                    {item.prescription.method === 'manual'
                      ? `Manual (R: ${item.prescription.odSph}, L: ${item.prescription.osSph}, PD: ${item.prescription.pd}mm)`
                      : 'Send Prescription Post-Purchase'}
                  </div>
                </div>

                {/* Quantity and Line Total */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center border border-[#DDD9CE] rounded-xs bg-[#FBFBF9]">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="p-1.5 text-[#5A5852] hover:text-[#161614] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 text-xs font-mono tabular-nums font-semibold text-[#161614]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="p-1.5 text-[#5A5852] hover:text-[#161614] transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <span className="font-mono text-sm font-semibold tabular-nums text-[#161614]">
                    ${item.totalPrice}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout Action */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#E7E5DF] bg-[#F7F6F2] space-y-4">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                placeholder="Promo Code (e.g. ATELIER10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 bg-white border border-[#DDD9CE] px-3 py-1.5 text-xs rounded-xs font-mono uppercase placeholder:normal-case placeholder:font-sans"
              />
              <button
                type="submit"
                className="bg-[#1C1C1A] text-white hover:bg-[#32322E] px-3.5 py-1.5 text-xs font-medium rounded-xs transition-colors"
              >
                Apply
              </button>
            </form>

            {promoApplied && (
              <div className="text-[11px] text-[#2B5436] font-medium flex items-center justify-between">
                <span>Atelier 10% Preferred Discount applied</span>
                <span className="font-mono">-${discount.toFixed(0)}</span>
              </div>
            )}
            {promoError && (
              <div className="text-[11px] text-[#8A3020]">
                {promoError}
              </div>
            )}

            {/* Subtotal */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#737067]">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-[#161614]">
                  ${rawSubtotal}
                </span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-[#2B5436]">
                  <span>Discount</span>
                  <span className="font-mono tabular-nums">-${discount.toFixed(0)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#737067]">
                <span>Worldwide Express Shipping</span>
                <span className="font-mono text-[#161614]">
                  {amountToFreeShipping === 0 ? 'Complimentary' : '$25'}
                </span>
              </div>
              <div className="pt-2 border-t border-[#E3DFD5] flex justify-between text-base font-semibold text-[#161614]">
                <span>Total Amount</span>
                <span className="font-mono tabular-nums">
                  ${(subtotal + (amountToFreeShipping === 0 ? 0 : 25)).toFixed(0)}
                </span>
              </div>
            </div>

            {/* Checkout Trigger */}
            <button
              onClick={() => {
                onClose();
                onOpenCheckout();
              }}
              className="w-full bg-[#1C1C1A] hover:bg-[#32322E] text-[#FBFBF9] py-3.5 rounded-sm text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Proceed to Seamless Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center text-[10px] text-[#8C887E]">
              30-Day Money-Back Guarantee · Free Return Shipping Included
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
