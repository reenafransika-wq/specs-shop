import React, { useState } from 'react';
import { X, Glasses, Sparkles, Heart, Check, ArrowRight, ShieldCheck, Ruler, Scale } from 'lucide-react';
import { FrameProduct, ColorVariant, CartItem } from '../types/optical';
import { LENS_OPTIONS, LENS_INDEX_TIERS, LENS_COATINGS } from '../data/products';
import { FrameVectorSvg } from './FrameVectorSvg';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: FrameProduct | null;
  initialColor: ColorVariant | null;
  isWishlisted: boolean;
  onToggleWishlist: (product: FrameProduct) => void;
  onOpenVirtualMirror: (product: FrameProduct, color: ColorVariant) => void;
  onConfigureLenses: (product: FrameProduct, color: ColorVariant) => void;
  onAddToCart: (item: CartItem) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  isOpen,
  onClose,
  product,
  initialColor,
  isWishlisted,
  onToggleWishlist,
  onOpenVirtualMirror,
  onConfigureLenses,
  onAddToCart,
}) => {
  if (!isOpen || !product) return null;

  const [selectedColor, setSelectedColor] = useState<ColorVariant>(
    initialColor || product.colorVariants[0]
  );
  const [activeTab, setActiveTab] = useState<'craft' | 'dimensions' | 'face-fit'>('dimensions');

  const handleQuickAddPlano = () => {
    const planoLens = LENS_OPTIONS.find((l) => l.id === 'non-rx-fashion') || LENS_OPTIONS[0];
    const cartItem: CartItem = {
      id: `${product.id}-${selectedColor.name}-${Date.now()}`,
      product,
      selectedColor,
      lensOption: planoLens,
      lensIndexTier: LENS_INDEX_TIERS[0],
      coatings: [LENS_COATINGS[0]],
      prescription: { method: 'send-later' },
      quantity: 1,
      unitPrice: product.price + planoLens.price + LENS_COATINGS[0].price,
      totalPrice: product.price + planoLens.price + LENS_COATINGS[0].price,
    };
    onAddToCart(cartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#141412]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-5xl bg-[#FBFBF9] border border-[#DDD9CE] rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E7E5DF] bg-[#F7F6F2]">
          <div className="flex items-center gap-2 text-xs text-[#737067] tracking-wider uppercase font-medium">
            <span>{product.collection}</span>
            <span aria-hidden="true">·</span>
            <span>{product.shape}</span>
            <span aria-hidden="true">·</span>
            <span>{product.material}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#5A5852] hover:text-[#161614] rounded-xs hover:bg-[#EAE7DF] transition-colors"
            aria-label="Close Product Details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Sticky Gallery Left + Contiguous Purchase Module Right */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto">
          {/* Left Column: Visual Gallery & Technical Blueprint */}
          <div className="lg:col-span-7 p-6 sm:p-8 bg-[#F4F3EE] flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E7E5DF]">
            <div className="relative aspect-[4/3] w-full flex items-center justify-center bg-white/60 rounded-sm p-8 shadow-inner">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain filter drop-shadow-md"
              />

              <button
                onClick={() => onToggleWishlist(product)}
                className="absolute top-4 right-4 p-2 rounded-xs bg-white/80 hover:bg-white text-[#4A4843] transition-colors shadow-xs"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isWishlisted ? 'fill-[#8A4F2A] text-[#8A4F2A]' : ''
                  }`}
                />
              </button>
            </div>

            {/* Silhouette Vector Overlay */}
            <div className="mt-6 p-4 bg-white/80 rounded-sm border border-[#E5E2D9]">
              <div className="flex items-center justify-between text-xs text-[#737067] mb-2 font-medium">
                <span>Vector Geometry Overlay</span>
                <span>Active Color: {selectedColor.name}</span>
              </div>
              <div className="max-w-[320px] mx-auto py-2">
                <FrameVectorSvg
                  svgType={product.svgFrameType}
                  color={selectedColor}
                  lensTint={product.collection === 'Sun' ? 'polarized-green' : 'clear'}
                  className="w-full h-auto drop-shadow-sm"
                />
              </div>
            </div>

            {/* Dimensional Blueprint Schematic */}
            <div className="mt-6 pt-4 border-t border-[#DFDCD4]">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#161614] mb-3 uppercase tracking-wider">
                <Ruler className="w-3.5 h-3.5" />
                <span>Exact Caliper Dimensions (mm)</span>
              </div>

              <div className="grid grid-cols-4 gap-3 text-center">
                <div className="p-2.5 bg-white rounded-xs border border-[#E3DFD5]">
                  <span className="text-[10px] text-[#737067] uppercase block">Lens Width</span>
                  <span className="font-mono text-sm font-semibold tabular-nums text-[#161614]">
                    {product.dimensions.lensWidth}mm
                  </span>
                </div>
                <div className="p-2.5 bg-white rounded-xs border border-[#E3DFD5]">
                  <span className="text-[10px] text-[#737067] uppercase block">Bridge</span>
                  <span className="font-mono text-sm font-semibold tabular-nums text-[#161614]">
                    {product.dimensions.bridgeWidth}mm
                  </span>
                </div>
                <div className="p-2.5 bg-white rounded-xs border border-[#E3DFD5]">
                  <span className="text-[10px] text-[#737067] uppercase block">Temple</span>
                  <span className="font-mono text-sm font-semibold tabular-nums text-[#161614]">
                    {product.dimensions.templeLength}mm
                  </span>
                </div>
                <div className="p-2.5 bg-white rounded-xs border border-[#E3DFD5]">
                  <span className="text-[10px] text-[#737067] uppercase block">Total Width</span>
                  <span className="font-mono text-sm font-semibold tabular-nums text-[#161614]">
                    {product.dimensions.frameWidth}mm
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Product Title & Price */}
              <div>
                <div className="flex items-center justify-between text-xs text-[#737067] mb-1">
                  <span>Stock Code: {product.id.toUpperCase()}</span>
                  <span className="text-[#3A6B48] font-medium">In Stock · Dispatches 24h</span>
                </div>
                <h1 className="font-editorial text-3xl sm:text-4xl font-medium text-[#161614]">
                  {product.name}
                </h1>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="font-mono text-2xl font-semibold tabular-nums text-[#161614]">
                    ${product.price}
                  </span>
                  <span className="text-xs text-[#737067]">
                    Includes standard anti-reflective lenses
                  </span>
                </div>
              </div>

              {/* Subtitle & Story */}
              <p className="text-sm text-[#595751] mt-3 leading-relaxed">
                {product.description}
              </p>

              {/* Colorway Selection */}
              <div className="mt-6 pt-5 border-t border-[#E7E5DF]">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-semibold text-[#161614] uppercase tracking-wide">
                    Finish: {selectedColor.name}
                  </span>
                  <span className="text-xs text-[#737067]">
                    {product.colorVariants.length} Colorways
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {product.colorVariants.map((c) => {
                    const isSelected = selectedColor.name === c.name;
                    return (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c)}
                        title={c.name}
                        className={`w-7 h-7 rounded-full transition-transform ${
                          isSelected ? 'ring-2 ring-offset-2 ring-[#1C1C1A] scale-110' : 'hover:scale-105'
                        }`}
                        style={{
                          backgroundColor: c.previewColor,
                          backgroundImage: c.secondaryHex
                            ? `linear-gradient(135deg, ${c.hex} 50%, ${c.secondaryHex} 50%)`
                            : undefined,
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Tabs for Technical Detail & Craft */}
              <div className="mt-6 pt-5 border-t border-[#E7E5DF]">
                <div className="flex items-center gap-4 border-b border-[#E7E5DF] text-xs font-medium pb-2">
                  <button
                    onClick={() => setActiveTab('dimensions')}
                    className={`transition-colors ${
                      activeTab === 'dimensions'
                        ? 'text-[#161614] font-semibold border-b-2 border-[#161614] pb-2 -mb-2.5'
                        : 'text-[#737067] hover:text-[#161614]'
                    }`}
                  >
                    Proportions & Weight
                  </button>
                  <button
                    onClick={() => setActiveTab('craft')}
                    className={`transition-colors ${
                      activeTab === 'craft'
                        ? 'text-[#161614] font-semibold border-b-2 border-[#161614] pb-2 -mb-2.5'
                        : 'text-[#737067] hover:text-[#161614]'
                    }`}
                  >
                    Artisan Craft
                  </button>
                  <button
                    onClick={() => setActiveTab('face-fit')}
                    className={`transition-colors ${
                      activeTab === 'face-fit'
                        ? 'text-[#161614] font-semibold border-b-2 border-[#161614] pb-2 -mb-2.5'
                        : 'text-[#737067] hover:text-[#161614]'
                    }`}
                  >
                    Face Shape Pairing
                  </button>
                </div>

                <div className="pt-3 text-xs text-[#595751] min-h-[90px]">
                  {activeTab === 'dimensions' && (
                    <div className="space-y-1.5 leading-relaxed">
                      <p>
                        <strong>Weight:</strong> {product.weightGrams} grams ({product.weightGrams < 15 ? 'Featherweight' : 'Balanced Poise'})
                      </p>
                      <p>
                        <strong>Fit:</strong> {product.fit} — suited for temple widths {product.dimensions.frameWidth - 4}mm to {product.dimensions.frameWidth + 6}mm.
                      </p>
                      <p>
                        <strong>Hinges:</strong> Custom riveted 5-barrel joints with micro-washer dampening.
                      </p>
                    </div>
                  )}

                  {activeTab === 'craft' && (
                    <div className="space-y-1.5 leading-relaxed">
                      <p>{product.craftNotes}</p>
                      <p className="text-[11px] text-[#737067] pt-1">
                        Sourced from certified organic cotton cellulose, bio-degradable under industrial composting conditions.
                      </p>
                    </div>
                  )}

                  {activeTab === 'face-fit' && (
                    <div className="space-y-1.5 leading-relaxed">
                      <p>
                        <strong>Ideal For:</strong> {product.bestForFaceShapes.join(', ')} face profiles.
                      </p>
                      <p className="text-[11px] text-[#737067]">
                        The {product.shape} silhouette establishes balanced horizontal tension across cheekbones.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Actions: Virtual Mirror + Configure Lenses */}
            <div className="pt-5 border-t border-[#E7E5DF] space-y-3">
              <button
                onClick={() => {
                  onClose();
                  onOpenVirtualMirror(product, selectedColor);
                }}
                className="w-full bg-transparent hover:bg-[#F2EFE9] text-[#1C1C1A] border border-[#1C1C1A] py-3 rounded-sm text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Glasses className="w-4 h-4" />
                <span>Try On In Virtual Mirror</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onConfigureLenses(product, selectedColor);
                }}
                className="w-full bg-[#1C1C1A] hover:bg-[#32322E] text-[#FBFBF9] py-3.5 rounded-sm text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Customize Lenses & Prescription</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleQuickAddPlano}
                className="w-full text-xs text-[#706D64] hover:text-[#161614] py-1 text-center transition-colors underline underline-offset-4"
              >
                Order Frame Only (With Clear Plano Lenses — ${product.price + 30})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
