import React, { useState } from 'react';
import { Eye, Glasses, Heart, ArrowUpRight } from 'lucide-react';
import { FrameProduct, ColorVariant } from '../types/optical';
import { FrameVectorSvg } from './FrameVectorSvg';

interface ProductCardProps {
  product: FrameProduct;
  isWishlisted: boolean;
  onToggleWishlist: (product: FrameProduct) => void;
  onOpenDetail: (product: FrameProduct, color: ColorVariant) => void;
  onOpenVirtualMirror: (product: FrameProduct, color: ColorVariant) => void;
  onConfigureLenses: (product: FrameProduct, color: ColorVariant) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onOpenDetail,
  onOpenVirtualMirror,
  onConfigureLenses,
}) => {
  const [selectedColor, setSelectedColor] = useState<ColorVariant>(
    product.colorVariants[0]
  );
  const [viewMode, setViewMode] = useState<'photo' | 'schematic'>('photo');

  return (
    <article className="group relative flex flex-col bg-[#FDFCFB] border border-[#E7E5DF] hover:border-[#BFBBB0] rounded-sm transition-all duration-200">
      {/* Top Media Container (65-75% height) */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4F3EE] flex items-center justify-center p-6">
        {/* Subtle Tag (Maximum 1 subtle text tag, NOT a pill badge sandwich) */}
        {product.tag && (
          <div className="absolute top-3.5 left-3.5 z-10 text-[11px] font-medium tracking-wider text-[#636057] uppercase">
            {product.tag}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3.5 right-3.5 z-10 p-1.5 rounded-sm bg-white/70 hover:bg-white text-[#4A4843] hover:text-[#161614] backdrop-blur-xs transition-colors"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'fill-[#8A4F2A] text-[#8A4F2A]' : ''
            }`}
          />
        </button>

        {/* Product Media: Photo vs Schematic Vector */}
        <div
          onClick={() => onOpenDetail(product, selectedColor)}
          className="w-full h-full cursor-pointer flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.02]"
        >
          {viewMode === 'photo' ? (
            <img
              src={product.image}
              alt={`${product.name} - ${selectedColor.name}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain filter drop-shadow-xs"
            />
          ) : (
            <div className="w-full max-w-[280px] py-4">
              <FrameVectorSvg
                svgType={product.svgFrameType}
                color={selectedColor}
                lensTint={product.collection === 'Sun' ? 'polarized-green' : 'clear'}
                className="w-full h-auto drop-shadow-sm"
              />
            </div>
          )}
        </div>

        {/* View Schematic / Photo Switcher */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setViewMode(viewMode === 'photo' ? 'schematic' : 'photo');
          }}
          className="absolute bottom-3 left-3 z-10 text-[10px] font-medium tracking-wide text-[#6E6A60] hover:text-[#161614] bg-white/80 hover:bg-white px-2 py-0.5 rounded-xs transition-colors"
        >
          {viewMode === 'photo' ? 'View Silhouette' : 'View Studio Photo'}
        </button>

        {/* Floating Quick Action: Try-On Mirror */}
        <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenVirtualMirror(product, selectedColor);
            }}
            className="flex items-center gap-1.5 bg-[#1C1C1A] text-[#FBFBF9] hover:bg-[#32322E] px-2.5 py-1.5 rounded-xs text-[11px] font-medium tracking-wide shadow-sm"
          >
            <Glasses className="w-3.5 h-3.5" />
            <span>Try On</span>
          </button>
        </div>
      </div>

      {/* Product Information Container */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          {/* Unboxed Metadata Line with typographic separators */}
          <div className="flex items-center gap-2 text-[11px] text-[#78756C] font-medium tracking-wider uppercase mb-1.5">
            <span>{product.collection}</span>
            <span aria-hidden="true">·</span>
            <span>{product.shape}</span>
            <span aria-hidden="true">·</span>
            <span>{product.fit} Fit</span>
          </div>

          {/* Title & Price Row */}
          <div className="flex items-baseline justify-between gap-2">
            <h3
              onClick={() => onOpenDetail(product, selectedColor)}
              className="font-editorial text-xl font-medium text-[#161614] cursor-pointer hover:underline underline-offset-4 decoration-1"
            >
              {product.name}
            </h3>
            <span className="font-mono text-[15px] font-semibold text-[#161614] tabular-nums">
              ${product.price}
            </span>
          </div>

          {/* Frame Proportions Technical Callout */}
          <div className="flex items-center gap-2 text-[11px] text-[#8C887E] mt-1 font-mono">
            <span>
              {product.dimensions.lensWidth}
              <span className="text-[#AFAAA0]">□</span>
              {product.dimensions.bridgeWidth}
              <span className="text-[#AFAAA0]">·</span>
              {product.dimensions.templeLength}mm
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-[#636057]">{product.weightGrams}g</span>
          </div>

          {/* Short description */}
          <p className="text-xs text-[#5E5B54] line-clamp-2 mt-2 leading-relaxed">
            {product.subtitle}
          </p>
        </div>

        {/* Color Swatch Selector */}
        <div className="pt-2 border-t border-[#EDEBE4] flex items-center justify-between">
          <div className="flex items-center gap-2">
            {product.colorVariants.map((c) => {
              const isSelected = selectedColor.name === c.name;
              return (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c)}
                  title={c.name}
                  className={`relative w-4 h-4 rounded-full transition-transform ${
                    isSelected ? 'ring-2 ring-offset-2 ring-[#1C1C1A] scale-110' : 'hover:scale-105'
                  }`}
                  style={{
                    backgroundColor: c.previewColor,
                    backgroundImage: c.secondaryHex
                      ? `linear-gradient(135deg, ${c.hex} 50%, ${c.secondaryHex} 50%)`
                      : undefined,
                  }}
                  aria-label={c.name}
                />
              );
            })}
          </div>

          <span className="text-[11px] text-[#78756C] font-normal truncate max-w-[120px]">
            {selectedColor.name}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => onOpenDetail(product, selectedColor)}
            className="flex items-center justify-center gap-1.5 border border-[#DDD9CE] hover:border-[#1C1C1A] bg-transparent text-[#1C1C1A] py-2 text-xs font-medium rounded-xs transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Details</span>
          </button>

          <button
            onClick={() => onConfigureLenses(product, selectedColor)}
            className="flex items-center justify-center gap-1 bg-[#1C1C1A] hover:bg-[#32322E] text-[#FBFBF9] py-2 text-xs font-medium rounded-xs transition-colors"
          >
            <span>Add Lenses</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
