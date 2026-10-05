import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#141412] text-[#E0DDD5] border-t border-[#292824] pt-14 pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-[#2B2A26]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-editorial text-2xl sm:text-3xl font-medium tracking-tight text-white block">
              Auren Optical
            </span>
            <p className="text-[#8C887E] text-xs leading-relaxed max-w-sm">
              Independent optical atelier crafting architectural spectacles from cured Japanese cellulose acetate and aerospace beta-titanium. Sabae heritage engineered for lifelong visual poise.
            </p>
            <div className="text-[11px] text-[#7A776E] pt-2">
              <span>Atelier Sabae: 4-12 Shin-Yokoe, Fukui 916-0001</span>
            </div>
          </div>

          {/* Optical Services */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider">
              Optometric Services
            </h4>
            <ul className="space-y-2 text-[#9A968B]">
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Prescription Single Vision</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Digital Free-Form Progressives</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Blue-Light Shield Optics</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Custom Mineral Sun Tints</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Free Home Try-On Kit</a></li>
            </ul>
          </div>

          {/* Curated Silhouettes */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider">
              Collections
            </h4>
            <ul className="space-y-2 text-[#9A968B]">
              <li><a href="#catalog-section" className="hover:text-white transition-colors">The Pantos Editions</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Beta-Titanium Wireframes</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Architectural Acetate Squares</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Crown Panto Polarized</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Limited Atelier Reserve</a></li>
            </ul>
          </div>

          {/* Guarantees & Care */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider">
              Atelier Guarantee
            </h4>
            <ul className="space-y-2 text-[#9A968B]">
              <li><span>Lifetime Frame Adjustment</span></li>
              <li><span>100% Prescription Accuracy</span></li>
              <li><span>30-Day Effortless Returns</span></li>
              <li><span>2-Year Scratch Protection</span></li>
              <li><span>Complimentary Ultrasonics</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Unboxed Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#78756C]">
          <div>
            © {new Date().getFullYear()} Auren Optical Atelier Co. All rights reserved.
          </div>

          <div className="flex items-center gap-4 text-[#8C887E]">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span aria-hidden="true">·</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Craft</a>
            <span aria-hidden="true">·</span>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
            <span aria-hidden="true">·</span>
            <span>Worldwide Courier</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
