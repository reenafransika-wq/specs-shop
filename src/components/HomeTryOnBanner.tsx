import React from 'react';
import { Package, ArrowRight, Check, Shield } from 'lucide-react';

interface HomeTryOnBannerProps {
  onExploreCollection: () => void;
  onOpenVirtualMirror: () => void;
}

export const HomeTryOnBanner: React.FC<HomeTryOnBannerProps> = ({
  onExploreCollection,
  onOpenVirtualMirror,
}) => {
  return (
    <section className="bg-[#1C1C1A] text-[#FBFBF9] py-14 sm:py-20 border-t border-[#33312B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-medium tracking-widest text-[#C2BEB2] uppercase">
              <span>Complimentary Fitting Service</span>
              <span aria-hidden="true">·</span>
              <span>No Deposit Required</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-5xl font-medium leading-[1.12] text-[#FFFFFF]">
              Experience four frames in your own light for five days.
            </h2>

            <p className="text-[#AFAAA0] text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              Weight, skin tone contrast, and bridge comfort are best tested in natural morning light. Select any four silhouettes—we ship them directly in our cedar fitting box with a prepaid return courier pouch.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 text-xs text-[#D8D5CC]">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#D6C49C] shrink-0" />
                <span>Zero charge shipping both ways</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#D6C49C] shrink-0" />
                <span>Includes PD measurement ruler</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#D6C49C] shrink-0" />
                <span>Complimentary video fitting call</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            <button
              onClick={onExploreCollection}
              className="bg-[#FFFFFF] text-[#161614] hover:bg-[#EBE8E0] px-6 py-3.5 rounded-sm text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <span>Build Your 4-Frame Home Box</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenVirtualMirror}
              className="bg-transparent hover:bg-white/10 text-white border border-[#524F47] px-6 py-3.5 rounded-sm text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <span>Test Immediately in Virtual Mirror</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
