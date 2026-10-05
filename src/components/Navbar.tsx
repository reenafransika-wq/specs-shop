import React from 'react';
import { ShoppingBag, Heart, Sparkles, Search, SlidersHorizontal, Glasses } from 'lucide-react';
import { FrameProduct } from '../types/optical';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenVirtualMirror: (product?: FrameProduct) => void;
  onOpenFaceFinder: () => void;
  onScrollToSection: (sectionId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCollection: string;
  onSelectCollection: (col: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenVirtualMirror,
  onOpenFaceFinder,
  onScrollToSection,
  searchQuery,
  onSearchChange,
  activeCollection,
  onSelectCollection,
}) => {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FBFBF9]/95 backdrop-blur-md border-b border-[#E7E5DF] transition-all">
      {/* Editorial Announcement Bar */}
      <div className="bg-[#1C1C1A] text-[#E8E6E0] text-[11px] tracking-widest uppercase py-1.5 px-4 text-center">
        <span>Complimentary Worldwide Express Shipping on All Optical & Sun Orders · Free 30-Day Returns</span>
      </div>

      {/* Main 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark in display face */}
        <div className="flex items-center gap-6">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-editorial text-2xl sm:text-3xl font-medium tracking-tight text-[#161614] hover:opacity-85 transition-opacity"
          >
            Auren Optical
          </a>
        </div>

        {/* Zone 2: 4-6 nav links, 1-2 word labels, single line */}
        <nav className="hidden lg:flex items-center gap-7 text-[13px] tracking-wide font-medium text-[#4A4843]">
          <button
            onClick={() => {
              onSelectCollection('All');
              onScrollToSection('catalog-section');
            }}
            className={`transition-colors hover:text-[#161614] ${activeCollection === 'All' ? 'text-[#161614] font-semibold' : ''}`}
          >
            All Frames
          </button>
          <button
            onClick={() => {
              onSelectCollection('Optical');
              onScrollToSection('catalog-section');
            }}
            className={`transition-colors hover:text-[#161614] ${activeCollection === 'Optical' ? 'text-[#161614] font-semibold' : ''}`}
          >
            Optical
          </button>
          <button
            onClick={() => {
              onSelectCollection('Sun');
              onScrollToSection('catalog-section');
            }}
            className={`transition-colors hover:text-[#161614] ${activeCollection === 'Sun' ? 'text-[#161614] font-semibold' : ''}`}
          >
            Sun
          </button>
          <button
            onClick={() => {
              onSelectCollection('Titanium');
              onScrollToSection('catalog-section');
            }}
            className={`transition-colors hover:text-[#161614] ${activeCollection === 'Titanium' ? 'text-[#161614] font-semibold' : ''}`}
          >
            Titanium
          </button>
          <button
            onClick={() => onOpenVirtualMirror()}
            className="flex items-center gap-1.5 transition-colors hover:text-[#161614]"
          >
            <Glasses className="w-3.5 h-3.5" />
            <span>Virtual Mirror</span>
          </button>
          <button
            onClick={onOpenFaceFinder}
            className="flex items-center gap-1.5 transition-colors hover:text-[#161614]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Face Matcher</span>
          </button>
          <button
            onClick={() => onScrollToSection('craftsmanship-section')}
            className="transition-colors hover:text-[#161614]"
          >
            Atelier Story
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Search Toggle */}
          <div className="relative flex items-center">
            {isSearchOpen ? (
              <div className="flex items-center bg-[#F1EFEA] border border-[#DDD9CE] rounded-sm px-2.5 py-1 text-xs">
                <Search className="w-3.5 h-3.5 text-[#737067] mr-1.5 shrink-0" />
                <input
                  type="text"
                  placeholder="Search frames, shapes, materials..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  autoFocus
                  className="bg-transparent border-none outline-none text-[#191919] text-xs w-36 sm:w-48 placeholder:text-[#9A968B]"
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    onSearchChange('');
                  }}
                  className="text-[10px] text-[#737067] hover:text-[#191919] ml-1"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search collection"
                className="p-2 text-[#4A4843] hover:text-[#161614] transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Try-On Launch Mobile */}
          <button
            onClick={() => onOpenVirtualMirror()}
            className="lg:hidden p-2 text-[#4A4843] hover:text-[#161614] transition-colors"
            title="Virtual Mirror"
            aria-label="Virtual Mirror"
          >
            <Glasses className="w-4 h-4" />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => onScrollToSection('catalog-section')}
            className="relative p-2 text-[#4A4843] hover:text-[#161614] transition-colors"
            title="Saved Frames"
            aria-label="Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#7A4E2D] text-white text-[9px] font-semibold flex items-center justify-center rounded-full tabular-nums">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Bag Button */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-[#1C1C1A] text-[#FBFBF9] hover:bg-[#32322E] px-3.5 py-2 rounded-sm text-xs font-medium tracking-wide transition-colors whitespace-nowrap"
            aria-label="Open Shopping Bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Bag</span>
            <span className="tabular-nums font-semibold bg-[#3A3A35] px-1.5 py-0.5 rounded-xs text-[10px]">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
