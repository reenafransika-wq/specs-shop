import React from 'react';
import { imgArtisan } from '../data/products';
import { ShieldCheck, Compass, Sparkles, Feather } from 'lucide-react';

export const CraftSection: React.FC = () => {
  return (
    <section id="craftsmanship-section" className="py-16 sm:py-24 bg-[#F5F4EE] border-t border-[#E7E5DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-medium tracking-widest text-[#737067] uppercase mb-2">
            <span>The Fukui Atelier</span>
            <span aria-hidden="true">·</span>
            <span>Est. 1905 Heritage</span>
            <span aria-hidden="true">·</span>
            <span>Zero Compromise</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-medium text-[#161614] leading-[1.12]">
            Where micrometer precision meets century-old Japanese hand craftsmanship.
          </h2>
          <p className="text-[#595751] text-base sm:text-lg mt-4 leading-relaxed font-normal">
            Ninety-five percent of all Japanese luxury eyewear originates from Sabae, in Fukui prefecture. Every Auren spectacle passes through thirty-six master pairs of hands before ever reaching your eyes.
          </p>
        </div>

        {/* 2-Column Split: Editorial Image & 3-Stage Process */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Visual Side */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-[#E2DFD6] shadow-sm">
              <img
                src={imgArtisan}
                alt="Master optical artisan hand-beveling cellulose acetate spectacle frames with precision bench calipers"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter saturate-[0.98]"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-[#1C1C1A]/85 backdrop-blur-md text-[#E8E6E0] p-3 rounded-xs text-xs flex items-center justify-between">
                <span>Hand-Beveling Station No. 4 · Sabae Atelier</span>
                <span className="font-mono text-[#D6C49C]">±0.02mm Tolerance</span>
              </div>
            </div>

            {/* Proof Metric Adjacency */}
            <div className="mt-4 grid grid-cols-3 gap-3 p-4 bg-white/70 rounded-sm border border-[#E3DFD5]">
              <div>
                <span className="font-mono text-lg font-semibold tabular-nums text-[#161614] block">
                  36 Steps
                </span>
                <span className="text-[11px] text-[#737067]">Individual Craftsmen</span>
              </div>
              <div>
                <span className="font-mono text-lg font-semibold tabular-nums text-[#161614] block">
                  100% Cotton
                </span>
                <span className="text-[11px] text-[#737067]">Organic Cellulose Base</span>
              </div>
              <div>
                <span className="font-mono text-lg font-semibold tabular-nums text-[#161614] block">
                  11 Grams
                </span>
                <span className="text-[11px] text-[#737067]">Starting Weight</span>
              </div>
            </div>
          </div>

          {/* Chapters of Craftsmanship */}
          <div className="lg:col-span-6 space-y-6">
            {/* Stage 1 */}
            <div className="p-5 bg-[#FDFCFB] rounded-sm border border-[#E7E5DF] hover:border-[#BFBBB0] transition-colors">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#7A4E2D] tracking-wider uppercase mb-1">
                <span>01</span>
                <span aria-hidden="true">·</span>
                <span>Takiron Cured Cellulose</span>
              </div>
              <h3 className="font-editorial text-xl font-medium text-[#161614]">
                Organic Plant-Based Acetate
              </h3>
              <p className="text-xs text-[#595751] mt-2 leading-relaxed">
                Unlike synthetic petroleum-based plastics, Takiron acetate is spun from purified cotton linters and wood pulp. It is warm to the touch, hypoallergenic, and molds permanently to your cranial anatomy through subtle body heat.
              </p>
            </div>

            {/* Stage 2 */}
            <div className="p-5 bg-[#FDFCFB] rounded-sm border border-[#E7E5DF] hover:border-[#BFBBB0] transition-colors">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#7A4E2D] tracking-wider uppercase mb-1">
                <span>02</span>
                <span aria-hidden="true">·</span>
                <span>Cedar Barrel Tumbling</span>
              </div>
              <h3 className="font-editorial text-xl font-medium text-[#161614]">
                72-Hour Carnauba Wax Polishing
              </h3>
              <p className="text-xs text-[#595751] mt-2 leading-relaxed">
                Raw CNC-milled fronts are placed in rotating octagonal Japanese cedar barrels loaded with dried bamboo chips, pumice, and organic carnauba wax. After three continuous days of tumbling, every microscopic burr is smoothed to a glassy mirror luster.
              </p>
            </div>

            {/* Stage 3 */}
            <div className="p-5 bg-[#FDFCFB] rounded-sm border border-[#E7E5DF] hover:border-[#BFBBB0] transition-colors">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#7A4E2D] tracking-wider uppercase mb-1">
                <span>03</span>
                <span aria-hidden="true">·</span>
                <span>Aerospace Metallurgy</span>
              </div>
              <h3 className="font-editorial text-xl font-medium text-[#161614]">
                Cold-Formed Beta-Titanium
              </h3>
              <p className="text-xs text-[#595751] mt-2 leading-relaxed">
                Beta-titanium offers double the elasticity of conventional titanium at half the density of stainless steel. Our wireframes flex comfortably over wide temples and rebound instantly without pinching the bridge of your nose.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
