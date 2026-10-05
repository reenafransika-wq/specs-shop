import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { VirtualMirrorModal } from './components/VirtualMirrorModal';
import { LensCustomizerModal } from './components/LensCustomizerModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { FaceShapeQuizModal } from './components/FaceShapeQuizModal';
import { CraftSection } from './components/CraftSection';
import { HomeTryOnBanner } from './components/HomeTryOnBanner';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';

import { FRAME_PRODUCTS } from './data/products';
import { FrameProduct, ColorVariant, CartItem } from './types/optical';
import { SlidersHorizontal, Glasses, Sparkles, Check, ArrowRight } from 'lucide-react';

export default function App() {
  // Products & Filtering
  const [activeCollection, setActiveCollection] = useState<string>('All');
  const [selectedShape, setSelectedShape] = useState<string>('All');
  const [selectedFit, setSelectedFit] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'weight'>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Cart
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modals
  const [isVirtualMirrorOpen, setIsVirtualMirrorOpen] = useState(false);
  const [virtualMirrorProduct, setVirtualMirrorProduct] = useState<FrameProduct | undefined>(undefined);
  const [virtualMirrorColor, setVirtualMirrorColor] = useState<ColorVariant | undefined>(undefined);

  const [isLensCustomizerOpen, setIsLensCustomizerOpen] = useState(false);
  const [customizerProduct, setCustomizerProduct] = useState<FrameProduct | null>(null);
  const [customizerColor, setCustomizerColor] = useState<ColorVariant | null>(null);

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState<FrameProduct | null>(null);
  const [detailColor, setDetailColor] = useState<ColorVariant | null>(null);

  const [isFaceQuizOpen, setIsFaceQuizOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Quick Notification Toast for feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Toggle Wishlist
  const handleToggleWishlist = (product: FrameProduct) => {
    if (wishlist.includes(product.id)) {
      setWishlist(wishlist.filter((id) => id !== product.id));
      showToast(`Removed "${product.name}" from saved list`);
    } else {
      setWishlist([...wishlist, product.id]);
      showToast(`Added "${product.name}" to saved list`);
    }
  };

  // Add to Cart Handler
  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) =>
          i.product.id === item.product.id &&
          i.selectedColor.name === item.selectedColor.name &&
          i.lensOption.id === item.lensOption.id &&
          i.lensIndexTier.index === item.lensIndexTier.index
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += item.quantity;
        next[existingIdx].totalPrice = next[existingIdx].unitPrice * next[existingIdx].quantity;
        return next;
      }
      return [...prev, item];
    });
    setIsCartOpen(true);
    showToast(`Added "${item.product.name}" to bag`);
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0
              ? { ...item, quantity: newQty, totalPrice: item.unitPrice * newQty }
              : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove from Cart
  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return FRAME_PRODUCTS.filter((product) => {
      // Collection filter
      if (activeCollection !== 'All' && product.collection !== activeCollection) {
        return false;
      }
      // Shape filter
      if (selectedShape !== 'All' && product.shape !== selectedShape) {
        return false;
      }
      // Fit filter
      if (selectedFit !== 'All' && product.fit !== selectedFit) {
        return false;
      }
      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesShape = product.shape.toLowerCase().includes(q);
        const matchesMaterial = product.material.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        if (!matchesName && !matchesShape && !matchesMaterial && !matchesDesc) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'weight') return a.weightGrams - b.weightGrams;
      return 0; // featured default
    });
  }, [activeCollection, selectedShape, selectedFit, sortBy, searchQuery]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9] text-[#191919] selection:bg-[#1C1C1A] selection:text-[#FBFBF9]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1C1C1A] text-[#FBFBF9] px-4 py-2.5 rounded-sm text-xs shadow-xl flex items-center gap-2 animate-fade-in border border-[#3E3C36]">
          <Check className="w-3.5 h-3.5 text-[#D6C49C]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Bar adhering to Top Bar Contract */}
      <Navbar
        cartCount={cartItems.reduce((sum, i) => sum + i.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenVirtualMirror={(prod) => {
          setVirtualMirrorProduct(prod || FRAME_PRODUCTS[0]);
          setVirtualMirrorColor(prod?.colorVariants[0] || FRAME_PRODUCTS[0].colorVariants[0]);
          setIsVirtualMirrorOpen(true);
        }}
        onOpenFaceFinder={() => setIsFaceQuizOpen(true)}
        onScrollToSection={scrollToSection}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCollection={activeCollection}
        onSelectCollection={setActiveCollection}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Campaign Hero Section */}
        <Hero
          onExploreClick={() => scrollToSection('catalog-section')}
          onOpenVirtualMirror={() => {
            setVirtualMirrorProduct(FRAME_PRODUCTS[0]);
            setVirtualMirrorColor(FRAME_PRODUCTS[0].colorVariants[0]);
            setIsVirtualMirrorOpen(true);
          }}
          onOpenFaceFinder={() => setIsFaceQuizOpen(true)}
        />

        {/* Featured Collection & Filtering Section */}
        <section id="catalog-section" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Kicker & Title */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-[#E7E5DF]">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium tracking-widest text-[#737067] uppercase mb-1.5">
                <span>Curated Silhouettes</span>
                <span aria-hidden="true">·</span>
                <span>Fukui Craftsmanship</span>
              </div>
              <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-[#161614]">
                The Optical & Sun Catalog
              </h2>
              <p className="text-xs text-[#595751] mt-1">
                Showing {filteredProducts.length} handcrafted optical frames engineered with German hinges and Japanese Takiron acetate.
              </p>
            </div>

            {/* Quick Virtual Mirror and Quiz CTAs */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsFaceQuizOpen(true)}
                className="flex items-center gap-1.5 text-xs font-medium text-[#1C1C1A] hover:bg-[#EAE7DF] px-3 py-2 rounded-xs border border-[#DDD9CE] transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#7A4E2D]" />
                <span>Face Shape Matcher</span>
              </button>

              <button
                onClick={() => {
                  setVirtualMirrorProduct(FRAME_PRODUCTS[0]);
                  setIsVirtualMirrorOpen(true);
                }}
                className="flex items-center gap-1.5 bg-[#1C1C1A] text-[#FBFBF9] hover:bg-[#32322E] px-3.5 py-2 rounded-xs text-xs font-medium tracking-wide transition-colors"
              >
                <Glasses className="w-3.5 h-3.5" />
                <span>Open Virtual Mirror</span>
              </button>
            </div>
          </div>

          {/* Interactive Filter Bar */}
          <div className="bg-[#F6F5F0] p-4 rounded-sm border border-[#E7E5DF] mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
            {/* Collection Segments (Clean buttons with handlers) */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
              {['All', 'Optical', 'Sun', 'Titanium'].map((col) => (
                <button
                  key={col}
                  onClick={() => setActiveCollection(col)}
                  className={`px-3 py-1.5 font-medium rounded-xs transition-colors whitespace-nowrap ${
                    activeCollection === col
                      ? 'bg-[#1C1C1A] text-white shadow-xs'
                      : 'text-[#595751] hover:text-[#161614] bg-transparent'
                  }`}
                >
                  {col === 'All' ? 'All Frames' : col}
                </button>
              ))}
            </div>

            {/* Sub-Filters: Shape, Fit, Sorting */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              {/* Shape Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-[#737067]">Shape:</span>
                <select
                  value={selectedShape}
                  onChange={(e) => setSelectedShape(e.target.value)}
                  className="bg-white border border-[#DDD9CE] rounded-xs px-2.5 py-1 text-xs text-[#161614] outline-none"
                >
                  <option value="All">All Shapes</option>
                  <option value="Pantos">Pantos</option>
                  <option value="Round">Round</option>
                  <option value="Architectural Square">Square</option>
                  <option value="Crown Panto">Crown Panto</option>
                  <option value="Geometric">Geometric</option>
                  <option value="Aviator">Aviator</option>
                </select>
              </div>

              {/* Fit Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-[#737067]">Fit:</span>
                <select
                  value={selectedFit}
                  onChange={(e) => setSelectedFit(e.target.value)}
                  className="bg-white border border-[#DDD9CE] rounded-xs px-2.5 py-1 text-xs text-[#161614] outline-none"
                >
                  <option value="All">All Fits</option>
                  <option value="Narrow">Narrow</option>
                  <option value="Medium">Medium</option>
                  <option value="Wide">Wide</option>
                </select>
              </div>

              {/* Sort By */}
              <div className="flex items-center gap-1.5">
                <span className="text-[#737067]">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-[#DDD9CE] rounded-xs px-2.5 py-1 text-xs text-[#161614] outline-none"
                >
                  <option value="featured">Featured Atelier</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="weight">Featherweight (Grams)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Cards Grid: 3-column desktop baseline with uniform field order */}
          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center bg-[#F7F6F2] rounded-sm border border-[#E7E5DF] p-8">
              <p className="font-editorial text-2xl text-[#161614]">No matching frames found</p>
              <p className="text-xs text-[#737067] mt-1">Try clearing your search query or adjusting the filters.</p>
              <button
                onClick={() => {
                  setActiveCollection('All');
                  setSelectedShape('All');
                  setSelectedFit('All');
                  setSearchQuery('');
                }}
                className="mt-4 bg-[#1C1C1A] text-white px-4 py-2 rounded-xs text-xs font-medium"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlist.includes(product.id)}
                  onToggleWishlist={handleToggleWishlist}
                  onOpenDetail={(prod, color) => {
                    setDetailProduct(prod);
                    setDetailColor(color);
                    setIsDetailOpen(true);
                  }}
                  onOpenVirtualMirror={(prod, color) => {
                    setVirtualMirrorProduct(prod);
                    setVirtualMirrorColor(color);
                    setIsVirtualMirrorOpen(true);
                  }}
                  onConfigureLenses={(prod, color) => {
                    setCustomizerProduct(prod);
                    setCustomizerColor(color);
                    setIsLensCustomizerOpen(true);
                  }}
                />
              ))}
            </div>
          )}
        </section>

        {/* Sabae Atelier Craftsmanship & Material Story */}
        <CraftSection />

        {/* Free Home Try-On Program Section */}
        <HomeTryOnBanner
          onExploreCollection={() => scrollToSection('catalog-section')}
          onOpenVirtualMirror={() => {
            setVirtualMirrorProduct(FRAME_PRODUCTS[0]);
            setIsVirtualMirrorOpen(true);
          }}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <VirtualMirrorModal
        isOpen={isVirtualMirrorOpen}
        onClose={() => setIsVirtualMirrorOpen(false)}
        products={FRAME_PRODUCTS}
        initialProduct={virtualMirrorProduct}
        initialColor={virtualMirrorColor}
        onConfigureLenses={(prod, color) => {
          setCustomizerProduct(prod);
          setCustomizerColor(color);
          setIsLensCustomizerOpen(true);
        }}
      />

      <LensCustomizerModal
        isOpen={isLensCustomizerOpen}
        onClose={() => setIsLensCustomizerOpen(false)}
        product={customizerProduct}
        initialColor={customizerColor}
        onAddToCart={handleAddToCart}
      />

      <ProductDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        product={detailProduct}
        initialColor={detailColor}
        isWishlisted={detailProduct ? wishlist.includes(detailProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onOpenVirtualMirror={(prod, color) => {
          setVirtualMirrorProduct(prod);
          setVirtualMirrorColor(color);
          setIsVirtualMirrorOpen(true);
        }}
        onConfigureLenses={(prod, color) => {
          setCustomizerProduct(prod);
          setCustomizerColor(color);
          setIsLensCustomizerOpen(true);
        }}
        onAddToCart={handleAddToCart}
      />

      <FaceShapeQuizModal
        isOpen={isFaceQuizOpen}
        onClose={() => setIsFaceQuizOpen(false)}
        products={FRAME_PRODUCTS}
        onSelectRecommendedFrame={(prod) => {
          setDetailProduct(prod);
          setDetailColor(prod.colorVariants[0]);
          setIsDetailOpen(true);
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onClearCart={() => setCartItems([])}
      />
    </div>
  );
}
