import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, Check, RefreshCw } from 'lucide-react';
import { FrameProduct, ColorVariant } from '../types/optical';
import { FACE_SHAPE_PROFILES } from '../data/products';

interface FaceShapeQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: FrameProduct[];
  onSelectRecommendedFrame: (product: FrameProduct) => void;
}

export const FaceShapeQuizModal: React.FC<FaceShapeQuizModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectRecommendedFrame,
}) => {
  const [selectedShape, setSelectedShape] = useState<string>('Oval');
  const [selectedStyle, setSelectedStyle] = useState<'minimalist' | 'bold' | 'vintage' | 'sun'>('minimalist');
  const [step, setStep] = useState<1 | 2>(1);

  if (!isOpen) return null;

  const currentProfile = FACE_SHAPE_PROFILES.find((p) => p.id === selectedShape) || FACE_SHAPE_PROFILES[0];

  // Match products based on face shape and preferred style
  const recommendedProducts = products.filter((p) => {
    const shapeMatches = p.bestForFaceShapes.includes(selectedShape as any);
    if (selectedStyle === 'sun') {
      return p.collection === 'Sun';
    }
    if (selectedStyle === 'minimalist') {
      return p.collection === 'Titanium' || p.weightGrams < 20;
    }
    if (selectedStyle === 'bold') {
      return p.material.includes('Acetate') && p.weightGrams >= 25;
    }
    return shapeMatches;
  }).slice(0, 3);

  const fallbackProducts = recommendedProducts.length > 0 ? recommendedProducts : products.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#141412]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#FBFBF9] border border-[#DDD9CE] rounded-sm shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E7E5DF] bg-[#F7F6F2]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#7A4E2D]" />
            <h2 className="font-editorial text-2xl font-medium text-[#161614]">
              Optical Proportion Matcher
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#5A5852] hover:text-[#161614] rounded-xs hover:bg-[#EAE7DF] transition-colors"
            aria-label="Close Quiz"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {step === 1 ? (
            <div className="space-y-5">
              <div>
                <span className="text-xs uppercase font-medium tracking-wider text-[#737067]">
                  Step 1 of 2
                </span>
                <h3 className="font-editorial text-xl font-medium text-[#161614] mt-1">
                  Identify Your Primary Bone Structure
                </h3>
                <p className="text-xs text-[#595751] mt-0.5">
                  Select the facial silhouette that most closely matches your forehead, cheekbone, and jawline contours.
                </p>
              </div>

              {/* Face Shapes Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {FACE_SHAPE_PROFILES.map((profile) => {
                  const isSelected = selectedShape === profile.id;
                  return (
                    <button
                      key={profile.id}
                      onClick={() => setSelectedShape(profile.id)}
                      className={`p-3.5 text-left rounded-sm border transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#1C1C1A] bg-[#F2EFE9] ring-1 ring-[#1C1C1A]'
                          : 'border-[#E0DDD4] bg-white hover:border-[#BBB6AA]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-[#161614]">
                          {profile.label}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#1C1C1A]" />}
                      </div>
                      <p className="text-[11px] text-[#5E5B54] line-clamp-2 leading-relaxed">
                        {profile.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Optician Tip */}
              <div className="p-3.5 bg-[#F4F2EC] rounded-sm border border-[#E3DFD5] text-xs text-[#54524B]">
                <strong className="text-[#161614]">Optician’s Rule: </strong>
                {currentProfile.tip}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="bg-[#1C1C1A] hover:bg-[#32322E] text-[#FBFBF9] px-5 py-2.5 rounded-sm text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5"
                >
                  <span>Next: Aesthetic Preference</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase font-medium tracking-wider text-[#737067]">
                  Step 2 of 2 · Results
                </span>
                <h3 className="font-editorial text-xl font-medium text-[#161614] mt-1">
                  Tailored Frames for Your {selectedShape} Face
                </h3>
                <p className="text-xs text-[#595751] mt-0.5">
                  Filtered by optical geometry to balance cheekbone width and bridge height.
                </p>
              </div>

              {/* Aesthetic Filter Tabs */}
              <div className="flex flex-wrap gap-2 text-xs">
                <button
                  onClick={() => setSelectedStyle('minimalist')}
                  className={`px-3 py-1.5 rounded-xs transition-colors ${
                    selectedStyle === 'minimalist'
                      ? 'bg-[#1C1C1A] text-white font-medium'
                      : 'bg-[#EDEAE1] text-[#54524B] hover:text-[#161614]'
                  }`}
                >
                  Minimalist Titanium
                </button>
                <button
                  onClick={() => setSelectedStyle('bold')}
                  className={`px-3 py-1.5 rounded-xs transition-colors ${
                    selectedStyle === 'bold'
                      ? 'bg-[#1C1C1A] text-white font-medium'
                      : 'bg-[#EDEAE1] text-[#54524B] hover:text-[#161614]'
                  }`}
                >
                  Architectural Acetate
                </button>
                <button
                  onClick={() => setSelectedStyle('vintage')}
                  className={`px-3 py-1.5 rounded-xs transition-colors ${
                    selectedStyle === 'vintage'
                      ? 'bg-[#1C1C1A] text-white font-medium'
                      : 'bg-[#EDEAE1] text-[#54524B] hover:text-[#161614]'
                  }`}
                >
                  Heritage Pantos
                </button>
                <button
                  onClick={() => setSelectedStyle('sun')}
                  className={`px-3 py-1.5 rounded-xs transition-colors ${
                    selectedStyle === 'sun'
                      ? 'bg-[#1C1C1A] text-white font-medium'
                      : 'bg-[#EDEAE1] text-[#54524B] hover:text-[#161614]'
                  }`}
                >
                  Sun Optics
                </button>
              </div>

              {/* Recommended Spectacles Cards */}
              <div className="space-y-3">
                {fallbackProducts.map((p) => (
                  <div
                    key={p.id}
                    className="p-3.5 bg-white rounded-sm border border-[#E0DDD4] flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-16 h-12 bg-[#F4F3EE] rounded-xs flex items-center justify-center p-1 overflow-hidden shrink-0">
                        <img
                          src={p.image}
                          alt={p.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h4 className="font-editorial text-base font-medium text-[#161614]">
                          {p.name}
                        </h4>
                        <span className="text-[11px] text-[#737067] block">
                          {p.shape} · {p.material} · {p.fit} Fit
                        </span>
                        <span className="text-[11px] font-mono text-[#8C887E]">
                          ${p.price} · {p.dimensions.lensWidth}□{p.dimensions.bridgeWidth}mm
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        onSelectRecommendedFrame(p);
                      }}
                      className="bg-[#1C1C1A] hover:bg-[#32322E] text-[#FBFBF9] px-3.5 py-1.5 rounded-xs text-xs font-medium transition-colors shrink-0"
                    >
                      View Frame
                    </button>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-[#737067] hover:text-[#161614] flex items-center gap-1 transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Change Face Shape</span>
                </button>

                <button
                  onClick={onClose}
                  className="text-xs text-[#1C1C1A] font-medium underline underline-offset-4"
                >
                  Explore Entire Collection
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
