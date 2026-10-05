import React from 'react';
import { ArrowRight, Glasses, ShieldCheck, Sparkles } from 'lucide-react';
import { imgHeroCampaign } from '../data/products';

interface HeroProps {
  onExploreClick: () => void;
  onOpenVirtualMirror: () => void;
  onOpenFaceFinder: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onOpenVirtualMirror,
  onOpenFaceFinder,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#FBFBF9] border-b border-[#E7E5DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Manifesto & CTAs */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            {/* Quiet unboxed kicker */}
            <div className="flex items-center gap-2 text-[12px] font-medium tracking-widest text-[#737067] uppercase">
              <span>Atelier Series 2026</span>
              <span aria-hidden="true">·</span>
              <span>Sabae & Tokyo</span>
              <span aria-hidden="true">·</span>
              <span>Direct to Eyes</span>
            </div>

            {/* Display Headline with balanced wrap */}
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#161614] leading-[1.08] tracking-tight font-medium max-w-xl">
              Architectural eyewear, sculpted from Japanese acetate and aerospace titanium.
            </h1>

            {/* Refined subtext */}
            <p className="text-[#595751] text-base sm:text-lg leading-relaxed max-w-lg font-normal">
              Engineered with micrometer tolerances in Fukui prefecture. Fitted with Zeiss free-form digital lenses or mineral sunglasses optics.
            </p>

            {/* Clean unboxed proof markers */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-[#737067] pt-1">
              <span>Hand-beveled edges</span>
              <span aria-hidden="true">/</span>
              <span>Custom 5-barrel hinges</span>
              <span aria-hidden="true">/</span>
              <span>11g featherweight</span>
            </div>

            {/* Functional Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onExploreClick}
                className="flex items-center justify-center gap-2 bg-[#1C1C1A] text-[#FBFBF9] hover:bg-[#32322E] px-6 py-3.5 rounded-sm text-xs uppercase tracking-wider font-medium transition-colors"
              >
                <span>Explore 2026 Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenVirtualMirror}
                className="flex items-center justify-center gap-2 bg-transparent hover:bg-[#F2EFE9] text-[#1C1C1A] border border-[#1C1C1A] px-5 py-3.5 rounded-sm text-xs uppercase tracking-wider font-medium transition-colors"
              >
                <Glasses className="w-4 h-4" />
                <span>Try In Virtual Mirror</span>
              </button>
            </div>

            {/* Fast Face Proportion Helper */}
            <div className="pt-3 border-t border-[#E7E5DF] flex items-center justify-between text-xs text-[#595751]">
              <span>Unsure which frame matches your bone structure?</span>
              <button
                onClick={onOpenFaceFinder}
                className="text-[#1C1C1A] font-medium underline underline-offset-4 hover:text-[#7A4E2D] transition-colors whitespace-nowrap ml-2"
              >
                Take Face Shape Quiz →
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-sm bg-[#EDEBE4] shadow-sm">
              <img
                src={imgHeroCampaign}
                alt="Auren Optical architectural eyewear campaign editorial with Japanese acetate frame"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter saturate-[0.98]"
              />
              {/* Subtle architectural overlay caption */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#1C1C1A]/85 backdrop-blur-md text-[#F5F4EE] px-4 py-2.5 rounded-xs text-xs flex items-center gap-4">
                <div>
                  <span className="font-editorial text-sm tracking-wide block text-white">The Sone Pantos</span>
                  <span className="text-[11px] text-[#C4C1B6]">Tokyo Tortoiseshell & Carnauba Finish</span>
                </div>
                <div className="h-6 w-[1px] bg-[#4D4B45]" />
                <div className="font-mono tabular-nums text-xs text-[#E6C687]">
                  $345
                </div>
              </div>
            </div>

            {/* Proof bar under visual */}
            <div className="mt-4 grid grid-cols-3 gap-4 text-center sm:text-left pt-2">
              <div className="border-l-2 border-[#1C1C1A] pl-3">
                <span className="block font-mono text-sm font-semibold tabular-nums text-[#1C1C1A]">72 Hours</span>
                <span className="text-[11px] text-[#737067]">Cedar Barrel Curing</span>
              </div>
              <div className="border-l-2 border-[#1C1C1A] pl-3">
                <span className="block font-mono text-sm font-semibold tabular-nums text-[#1C1C1A]">40,000</span>
                <span className="text-[11px] text-[#737067]">Hinge Flex Cycles</span>
              </div>
              <div className="border-l-2 border-[#1C1C1A] pl-3">
                <span className="block font-mono text-sm font-semibold tabular-nums text-[#1C1C1A]">Free Home Try-on</span>
                <span className="text-[11px] text-[#737067]">4 Frames · 5 Days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
