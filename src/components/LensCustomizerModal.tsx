import React, { useState } from 'react';
import { X, Check, Shield, Info, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';
import { FrameProduct, ColorVariant, LensOption, LensIndexTier, LensCoating, PrescriptionDetails, CartItem } from '../types/optical';
import { LENS_OPTIONS, LENS_INDEX_TIERS, LENS_COATINGS } from '../data/products';
import { FrameVectorSvg } from './FrameVectorSvg';

interface LensCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: FrameProduct | null;
  initialColor: ColorVariant | null;
  onAddToCart: (item: CartItem) => void;
}

export const LensCustomizerModal: React.FC<LensCustomizerModalProps> = ({
  isOpen,
  onClose,
  product,
  initialColor,
  onAddToCart,
}) => {
  if (!isOpen || !product) return null;

  const [selectedColor, setSelectedColor] = useState<ColorVariant>(
    initialColor || product.colorVariants[0]
  );
  const [selectedLens, setSelectedLens] = useState<LensOption>(LENS_OPTIONS[0]);
  const [selectedIndexTier, setSelectedIndexTier] = useState<LensIndexTier>(LENS_INDEX_TIERS[0]);
  const [selectedCoatings, setSelectedCoatings] = useState<LensCoating[]>([LENS_COATINGS[0]]);

  // Prescription method and values
  const [rxMethod, setRxMethod] = useState<'manual' | 'send-later' | 'optometrist-file'>('send-later');
  const [odSph, setOdSph] = useState('-1.50');
  const [odCyl, setOdCyl] = useState('-0.50');
  const [odAxis, setOdAxis] = useState('90');
  const [osSph, setOsSph] = useState('-1.75');
  const [osCyl, setOsCyl] = useState('0.00');
  const [osAxis, setOsAxis] = useState('180');
  const [pd, setPd] = useState('63');
  const [rxNotes, setRxNotes] = useState('');

  // Active step
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);

  // Price calculation
  const framePrice = product.price;
  const lensPrice = selectedLens.price;
  const indexPrice = selectedIndexTier.price;
  const coatingsPrice = selectedCoatings.reduce((sum, c) => sum + c.price, 0);
  const totalPrice = framePrice + lensPrice + indexPrice + coatingsPrice;

  const toggleCoating = (coating: LensCoating) => {
    if (selectedCoatings.some((c) => c.id === coating.id)) {
      setSelectedCoatings(selectedCoatings.filter((c) => c.id !== coating.id));
    } else {
      setSelectedCoatings([...selectedCoatings, coating]);
    }
  };

  const handleCompleteOrder = () => {
    const prescription: PrescriptionDetails = {
      method: rxMethod,
      odSph: rxMethod === 'manual' ? odSph : undefined,
      odCyl: rxMethod === 'manual' ? odCyl : undefined,
      odAxis: rxMethod === 'manual' ? odAxis : undefined,
      osSph: rxMethod === 'manual' ? osSph : undefined,
      osCyl: rxMethod === 'manual' ? osCyl : undefined,
      osAxis: rxMethod === 'manual' ? osAxis : undefined,
      pd: rxMethod === 'manual' ? pd : undefined,
      notes: rxNotes,
    };

    const cartItem: CartItem = {
      id: `${product.id}-${selectedColor.name}-${Date.now()}`,
      product,
      selectedColor,
      lensOption: selectedLens,
      lensIndexTier: selectedIndexTier,
      coatings: selectedCoatings,
      prescription,
      quantity: 1,
      unitPrice: totalPrice,
      totalPrice: totalPrice,
    };

    onAddToCart(cartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#141412]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#FBFBF9] border border-[#DDD9CE] rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E7E5DF] bg-[#F7F6F2]">
          <div className="flex items-center gap-3">
            <h2 className="font-editorial text-2xl font-medium text-[#161614]">
              Optical Lens Studio
            </h2>
            <span className="hidden sm:inline text-xs text-[#737067]">
              Step {activeStep} of 4: {activeStep === 1 ? 'Lens Type' : activeStep === 2 ? 'Index & Thickness' : activeStep === 3 ? 'Surface Treatments' : 'Prescription'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#5A5852] hover:text-[#161614] rounded-xs hover:bg-[#EAE7DF] transition-colors"
            aria-label="Close Lens Customizer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Navigation Bar */}
        <div className="bg-[#F0EDE6] px-6 py-2 border-b border-[#E3DFD5] flex items-center justify-between text-xs font-medium">
          <div className="flex items-center gap-2 sm:gap-6 overflow-x-auto py-1">
            <button
              onClick={() => setActiveStep(1)}
              className={`pb-0.5 border-b-2 transition-colors whitespace-nowrap ${
                activeStep === 1
                  ? 'border-[#1C1C1A] text-[#161614] font-semibold'
                  : 'border-transparent text-[#706D64] hover:text-[#161614]'
              }`}
            >
              1. Lens Purpose
            </button>
            <button
              onClick={() => setActiveStep(2)}
              className={`pb-0.5 border-b-2 transition-colors whitespace-nowrap ${
                activeStep === 2
                  ? 'border-[#1C1C1A] text-[#161614] font-semibold'
                  : 'border-transparent text-[#706D64] hover:text-[#161614]'
              }`}
            >
              2. Index Profile
            </button>
            <button
              onClick={() => setActiveStep(3)}
              className={`pb-0.5 border-b-2 transition-colors whitespace-nowrap ${
                activeStep === 3
                  ? 'border-[#1C1C1A] text-[#161614] font-semibold'
                  : 'border-transparent text-[#706D64] hover:text-[#161614]'
              }`}
            >
              3. Protective Coatings
            </button>
            <button
              onClick={() => setActiveStep(4)}
              className={`pb-0.5 border-b-2 transition-colors whitespace-nowrap ${
                activeStep === 4
                  ? 'border-[#1C1C1A] text-[#161614] font-semibold'
                  : 'border-transparent text-[#706D64] hover:text-[#161614]'
              }`}
            >
              4. Prescription Details
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[#54524B]">
            <span className="text-[11px]">Free Optometrist Review</span>
            <Shield className="w-3.5 h-3.5 text-[#7A4E2D]" />
          </div>
        </div>

        {/* Content Layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Main Configuration Panel */}
          <div className="lg:col-span-8 p-6 overflow-y-auto space-y-6">
            {/* Step 1: Lens Purpose & Type */}
            {activeStep === 1 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-[#161614]">
                    Choose Your Optical Requirement
                  </h3>
                  <p className="text-xs text-[#6B685E] mt-0.5">
                    All lenses are surfaced using digital wave-front free-form optical technology.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {LENS_OPTIONS.map((opt) => {
                    const isSelected = selectedLens.id === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => setSelectedLens(opt)}
                        className={`p-4 rounded-sm border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                          isSelected
                            ? 'border-[#1C1C1A] bg-[#F4F2EC] ring-1 ring-[#1C1C1A]'
                            : 'border-[#E0DDD4] bg-white hover:border-[#BBB6AA]'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'border-[#1C1C1A] bg-[#1C1C1A]'
                                : 'border-[#9E9A90]'
                            }`}
                          >
                            {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-[#161614]">
                                {opt.name}
                              </span>
                              <span className="text-[11px] text-[#78756C]">· {opt.category}</span>
                            </div>
                            <span className="text-xs text-[#7A4E2D] font-medium block mt-0.5">
                              {opt.tagline}
                            </span>
                            <p className="text-xs text-[#595751] mt-1 leading-relaxed">
                              {opt.description}
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="font-mono text-sm font-semibold tabular-nums text-[#161614]">
                            {opt.price === 0 ? 'Included' : `+$${opt.price}`}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Index & Thickness */}
            {activeStep === 2 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-[#161614]">
                    Lens Index & Profile Thinness
                  </h3>
                  <p className="text-xs text-[#6B685E] mt-0.5">
                    Higher refractive indices reduce lens edge thickness, weight, and visual eye distortion.
                  </p>
                </div>

                <div className="space-y-3">
                  {LENS_INDEX_TIERS.map((tier) => {
                    const isSelected = selectedIndexTier.index === tier.index;
                    return (
                      <div
                        key={tier.index}
                        onClick={() => setSelectedIndexTier(tier)}
                        className={`p-4 rounded-sm border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'border-[#1C1C1A] bg-[#F4F2EC] ring-1 ring-[#1C1C1A]'
                            : 'border-[#E0DDD4] bg-white hover:border-[#BBB6AA]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'border-[#1C1C1A] bg-[#1C1C1A]'
                                : 'border-[#9E9A90]'
                            }`}
                          >
                            {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-[#161614]">
                                {tier.name}
                              </span>
                              <span className="text-[11px] font-mono text-[#54524B] bg-[#E8E5DD] px-1.5 py-0.5 rounded-xs">
                                {tier.thickness}
                              </span>
                            </div>
                            <span className="text-xs text-[#595751] block mt-0.5">
                              {tier.recommendedRange}
                            </span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="font-mono text-sm font-semibold tabular-nums text-[#161614]">
                            {tier.price === 0 ? 'Included' : `+$${tier.price}`}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Lens Coatings */}
            {activeStep === 3 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-[#161614]">
                    Laboratory Optical Treatments
                  </h3>
                  <p className="text-xs text-[#6B685E] mt-0.5">
                    Nanometer-thin multi-coatings vacuum-deposited in cleanroom chambers.
                  </p>
                </div>

                <div className="space-y-3">
                  {LENS_COATINGS.map((coating) => {
                    const isChecked = selectedCoatings.some((c) => c.id === coating.id);
                    return (
                      <div
                        key={coating.id}
                        onClick={() => toggleCoating(coating)}
                        className={`p-4 rounded-sm border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                          isChecked
                            ? 'border-[#1C1C1A] bg-[#F4F2EC]'
                            : 'border-[#E0DDD4] bg-white hover:border-[#BBB6AA]'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`mt-0.5 w-4 h-4 rounded-xs border flex items-center justify-center shrink-0 ${
                              isChecked
                                ? 'border-[#1C1C1A] bg-[#1C1C1A]'
                                : 'border-[#9E9A90]'
                            }`}
                          >
                            {isChecked && <Check className="w-2.5 h-2.5 text-white" />}
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-[#161614]">
                              {coating.name}
                            </span>
                            <p className="text-xs text-[#595751] mt-1 leading-relaxed">
                              {coating.description}
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="font-mono text-sm font-semibold tabular-nums text-[#161614]">
                            +${coating.price}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 4: Prescription Details */}
            {activeStep === 4 && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-base font-semibold text-[#161614]">
                    Prescription & Optical Parameters
                  </h3>
                  <p className="text-xs text-[#6B685E] mt-0.5">
                    Provide your optical numbers now or upload after checkout. Our licensed opticians verify every script.
                  </p>
                </div>

                {/* Prescription Method Toggle */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRxMethod('send-later')}
                    className={`p-3 text-left rounded-sm border transition-all ${
                      rxMethod === 'send-later'
                        ? 'border-[#1C1C1A] bg-[#F4F2EC] ring-1 ring-[#1C1C1A]'
                        : 'border-[#E0DDD4] bg-white hover:border-[#BBB6AA]'
                    }`}
                  >
                    <span className="text-xs font-semibold block text-[#161614]">
                      Send Prescription Later
                    </span>
                    <span className="text-[11px] text-[#6B685E] block mt-0.5">
                      Email photo of Rx after order or free home try-on
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRxMethod('manual')}
                    className={`p-3 text-left rounded-sm border transition-all ${
                      rxMethod === 'manual'
                        ? 'border-[#1C1C1A] bg-[#F4F2EC] ring-1 ring-[#1C1C1A]'
                        : 'border-[#E0DDD4] bg-white hover:border-[#BBB6AA]'
                    }`}
                  >
                    <span className="text-xs font-semibold block text-[#161614]">
                      Enter Values Manually
                    </span>
                    <span className="text-[11px] text-[#6B685E] block mt-0.5">
                      Input SPH, CYL, Axis & Pupillary Distance
                    </span>
                  </button>
                </div>

                {/* Manual Prescription Table */}
                {rxMethod === 'manual' && (
                  <div className="p-4 bg-[#F5F4EE] rounded-sm border border-[#DDD9CE] space-y-4">
                    <div className="text-xs font-semibold text-[#161614] uppercase tracking-wide">
                      Standard Optical Values
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead>
                          <tr className="border-b border-[#D5D1C5] text-[#737067]">
                            <th className="pb-2 font-medium">Eye</th>
                            <th className="pb-2 font-medium">SPH (Sphere)</th>
                            <th className="pb-2 font-medium">CYL (Cylinder)</th>
                            <th className="pb-2 font-medium">Axis</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E2DED5]">
                          <tr>
                            <td className="py-2.5 font-semibold text-[#161614]">OD (Right)</td>
                            <td className="py-2">
                              <input
                                type="text"
                                value={odSph}
                                onChange={(e) => setOdSph(e.target.value)}
                                className="w-20 bg-white border border-[#DDD9CE] px-2 py-1 rounded-xs font-mono text-xs"
                                placeholder="-1.50"
                              />
                            </td>
                            <td className="py-2">
                              <input
                                type="text"
                                value={odCyl}
                                onChange={(e) => setOdCyl(e.target.value)}
                                className="w-20 bg-white border border-[#DDD9CE] px-2 py-1 rounded-xs font-mono text-xs"
                                placeholder="-0.50"
                              />
                            </td>
                            <td className="py-2">
                              <input
                                type="text"
                                value={odAxis}
                                onChange={(e) => setOdAxis(e.target.value)}
                                className="w-20 bg-white border border-[#DDD9CE] px-2 py-1 rounded-xs font-mono text-xs"
                                placeholder="90"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2.5 font-semibold text-[#161614]">OS (Left)</td>
                            <td className="py-2">
                              <input
                                type="text"
                                value={osSph}
                                onChange={(e) => setOsSph(e.target.value)}
                                className="w-20 bg-white border border-[#DDD9CE] px-2 py-1 rounded-xs font-mono text-xs"
                                placeholder="-1.75"
                              />
                            </td>
                            <td className="py-2">
                              <input
                                type="text"
                                value={osCyl}
                                onChange={(e) => setOsCyl(e.target.value)}
                                className="w-20 bg-white border border-[#DDD9CE] px-2 py-1 rounded-xs font-mono text-xs"
                                placeholder="0.00"
                              />
                            </td>
                            <td className="py-2">
                              <input
                                type="text"
                                value={osAxis}
                                onChange={(e) => setOsAxis(e.target.value)}
                                className="w-20 bg-white border border-[#DDD9CE] px-2 py-1 rounded-xs font-mono text-xs"
                                placeholder="180"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* PD input */}
                    <div className="pt-2 flex items-center justify-between border-t border-[#DDD9CE]">
                      <div>
                        <span className="text-xs font-semibold text-[#161614]">Pupillary Distance (PD):</span>
                        <p className="text-[11px] text-[#737067]">Average adult PD is between 58mm and 68mm</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={pd}
                          onChange={(e) => setPd(e.target.value)}
                          className="w-16 bg-white border border-[#DDD9CE] px-2.5 py-1 rounded-xs font-mono text-xs text-center"
                        />
                        <span className="text-xs font-mono text-[#54524B]">mm</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Sidebar: Contiguous Live Price & Summary */}
          <div className="lg:col-span-4 p-6 bg-[#F6F5F0] border-t lg:border-t-0 lg:border-l border-[#E7E5DF] flex flex-col justify-between space-y-6">
            <div>
              {/* Product Card Micro View */}
              <div className="pb-4 border-b border-[#E3DFD5]">
                <div className="w-full max-w-[220px] mx-auto py-2">
                  <FrameVectorSvg
                    svgType={product.svgFrameType}
                    color={selectedColor}
                    lensTint={selectedLens.id === 'polarized-sun' ? 'polarized-green' : selectedLens.id === 'blue-protect' ? 'blue-blocker' : 'clear'}
                    className="w-full h-auto drop-shadow-sm"
                  />
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div>
                    <h4 className="font-editorial text-lg font-medium text-[#161614]">
                      {product.name}
                    </h4>
                    <span className="text-[11px] text-[#78756C] block">
                      {selectedColor.name} · {product.fit} Fit
                    </span>
                  </div>
                  <span className="font-mono text-xs font-medium text-[#161614]">
                    ${product.price}
                  </span>
                </div>

                {/* Color Selector */}
                <div className="flex items-center gap-2 mt-3">
                  {product.colorVariants.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`w-5 h-5 rounded-full transition-all ${
                        selectedColor.name === c.name
                          ? 'ring-2 ring-offset-2 ring-[#1C1C1A] scale-110'
                          : 'hover:scale-105'
                      }`}
                      style={{
                        backgroundColor: c.previewColor,
                        backgroundImage: c.secondaryHex
                          ? `linear-gradient(135deg, ${c.hex} 50%, ${c.secondaryHex} 50%)`
                          : undefined,
                      }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Itemized Price Breakdown */}
              <div className="py-4 border-b border-[#E3DFD5] space-y-2 text-xs">
                <div className="flex justify-between text-[#595751]">
                  <span>Frame Base</span>
                  <span className="font-mono tabular-nums">${framePrice}</span>
                </div>
                <div className="flex justify-between text-[#595751]">
                  <span className="truncate max-w-[180px]">{selectedLens.name}</span>
                  <span className="font-mono tabular-nums">
                    {lensPrice === 0 ? '$0' : `+$${lensPrice}`}
                  </span>
                </div>
                <div className="flex justify-between text-[#595751]">
                  <span className="truncate max-w-[180px]">{selectedIndexTier.name}</span>
                  <span className="font-mono tabular-nums">
                    {indexPrice === 0 ? '$0' : `+$${indexPrice}`}
                  </span>
                </div>
                {selectedCoatings.map((c) => (
                  <div key={c.id} className="flex justify-between text-[#595751]">
                    <span className="truncate max-w-[180px]">{c.name}</span>
                    <span className="font-mono tabular-nums">+${c.price}</span>
                  </div>
                ))}

                <div className="pt-2 border-t border-[#E3DFD5] flex justify-between font-semibold text-sm text-[#161614]">
                  <span>Total Configured</span>
                  <span className="font-mono tabular-nums">${totalPrice}</span>
                </div>
              </div>

              {/* Trust Callout */}
              <div className="pt-3 text-[11px] text-[#737067] space-y-1">
                <p>✓ 100% Optical Accuracy Guarantee</p>
                <p>✓ Complimentary Hard Case & Microfiber Cloth</p>
                <p>✓ Free Express Shipping with Tracking</p>
              </div>
            </div>

            {/* Stepper Controls */}
            <div className="pt-4 border-t border-[#E3DFD5] space-y-2">
              {activeStep < 4 ? (
                <button
                  type="button"
                  onClick={() => setActiveStep((prev) => (prev + 1) as any)}
                  className="w-full bg-[#1C1C1A] hover:bg-[#32322E] text-[#FBFBF9] py-3 rounded-sm text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Continue to Next Step</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleCompleteOrder}
                  className="w-full bg-[#1C1C1A] hover:bg-[#32322E] text-[#FBFBF9] py-3 rounded-sm text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <span>Add Customized Frame to Bag</span>
                  <span className="font-mono tabular-nums text-[#D6D2C4]">
                    (${totalPrice})
                  </span>
                </button>
              )}

              {activeStep > 1 && (
                <button
                  type="button"
                  onClick={() => setActiveStep((prev) => (prev - 1) as any)}
                  className="w-full text-xs text-[#706D64] hover:text-[#161614] py-1.5 text-center transition-colors"
                >
                  ← Back to Previous Step
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
