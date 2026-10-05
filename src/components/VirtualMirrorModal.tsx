import React, { useState, useRef, useEffect } from 'react';
import { Camera, X, RefreshCw, ZoomIn, ZoomOut, Sliders, Check, Sparkles, Download, Layers } from 'lucide-react';
import { FrameProduct, ColorVariant } from '../types/optical';
import { FrameVectorSvg } from './FrameVectorSvg';

interface VirtualMirrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: FrameProduct[];
  initialProduct?: FrameProduct;
  initialColor?: ColorVariant;
  onConfigureLenses: (product: FrameProduct, color: ColorVariant) => void;
}

// Curated Face Model presets with photorealistic SVG/CSS portrait illustrations
interface FaceModel {
  id: string;
  name: string;
  faceShape: 'Oval' | 'Square' | 'Round' | 'Heart';
  skinTone: string;
  headSvg: React.ReactNode;
}

export const VirtualMirrorModal: React.FC<VirtualMirrorModalProps> = ({
  isOpen,
  onClose,
  products,
  initialProduct,
  initialColor,
  onConfigureLenses,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<FrameProduct>(
    initialProduct || products[0]
  );
  const [selectedColor, setSelectedColor] = useState<ColorVariant>(
    initialColor || products[0].colorVariants[0]
  );
  const [lensTint, setLensTint] = useState<'clear' | 'amber' | 'blue-blocker' | 'polarized-green' | 'smoke'>('clear');

  // Camera vs Preset Model mode
  const [inputMode, setInputMode] = useState<'preset' | 'camera'>('preset');
  const [selectedFaceIndex, setSelectedFaceIndex] = useState(0);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Optical adjustments
  const [frameScale, setFrameScale] = useState(100);
  const [frameOffsetY, setFrameOffsetY] = useState(0);
  const [frameOffsetX, setFrameOffsetX] = useState(0);
  const [capturedSnapshot, setCapturedSnapshot] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (initialProduct) {
      setSelectedProduct(initialProduct);
      setSelectedColor(initialColor || initialProduct.colorVariants[0]);
    }
  }, [initialProduct, initialColor]);

  // Clean up camera on close
  useEffect(() => {
    if (!isOpen) {
      stopCamera();
    }
  }, [isOpen]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access is not supported by your browser environment.');
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
      setInputMode('camera');
    } catch (err: any) {
      console.warn('Camera initiation failed:', err);
      setCameraError('Camera access unavailable. Using high-definition studio face models.');
      setInputMode('preset');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const handleTakeSnapshot = () => {
    // Generate snapshot representation
    setCapturedSnapshot(`${selectedProduct.name} - ${selectedColor.name}`);
  };

  if (!isOpen) return null;

  // Curated face avatars with distinct head geometry for accurate virtual try-on
  const FACE_PRESETS = [
    {
      id: 'maya-oval',
      name: 'Elena',
      faceShape: 'Oval',
      skinTone: '#e3bda2',
      bgGrad: 'from-[#e8decb] to-[#c7b79e]',
      hair: '#36281e',
    },
    {
      id: 'kenji-square',
      name: 'Kenji',
      faceShape: 'Square',
      skinTone: '#cf9e78',
      bgGrad: 'from-[#ded6cb] to-[#b8aa97]',
      hair: '#141416',
    },
    {
      id: 'chloe-round',
      name: 'Chloe',
      faceShape: 'Round',
      skinTone: '#f4d2bd',
      bgGrad: 'from-[#e4dad3] to-[#c9b7ad]',
      hair: '#703e22',
    },
    {
      id: 'marcus-heart',
      name: 'Marcus',
      faceShape: 'Heart',
      skinTone: '#875b43',
      bgGrad: 'from-[#c2b2a3] to-[#917d6c]',
      hair: '#111012',
    },
  ];

  const activeFace = FACE_PRESETS[selectedFaceIndex];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#141412]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-5xl bg-[#FBFBF9] border border-[#DDD9CE] rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E7E5DF] bg-[#F7F6F2]">
          <div className="flex items-center gap-3">
            <h2 className="font-editorial text-2xl font-medium text-[#161614]">
              Auren Virtual Mirror
            </h2>
            <span className="hidden sm:inline text-xs text-[#737067]">
              Real-Time Scale & Proportion Simulator
            </span>
          </div>

          <div className="flex items-center gap-3">
            {inputMode === 'preset' ? (
              <button
                onClick={startCamera}
                className="flex items-center gap-1.5 text-xs font-medium text-[#1C1C1A] hover:bg-[#EAE7DF] px-3 py-1.5 rounded-xs border border-[#DDD9CE] transition-colors"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Switch to Live Camera</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  stopCamera();
                  setInputMode('preset');
                }}
                className="flex items-center gap-1.5 text-xs font-medium text-[#1C1C1A] hover:bg-[#EAE7DF] px-3 py-1.5 rounded-xs border border-[#DDD9CE] transition-colors"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Use Studio Faces</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-[#5A5852] hover:text-[#161614] rounded-xs hover:bg-[#EAE7DF] transition-colors"
              aria-label="Close Virtual Mirror"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Camera Notice if Error */}
        {cameraError && (
          <div className="bg-[#FFF8E7] border-b border-[#EBD7A7] px-4 py-2 text-xs text-[#8A601E] flex items-center justify-between">
            <span>{cameraError}</span>
            <button
              onClick={() => setCameraError(null)}
              className="font-semibold text-xs ml-2"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Mirror Body Container */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Main Visual Viewport (Interactive Face & Frame overlay) */}
          <div className="lg:col-span-8 bg-[#181816] relative flex items-center justify-center p-4 min-h-[380px] sm:min-h-[460px] select-none overflow-hidden">
            {/* Live Camera View */}
            {inputMode === 'camera' && isCameraActive && (
              <div className="relative w-full h-full max-w-[640px] aspect-[4/3] flex items-center justify-center overflow-hidden rounded-xs">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover transform -scale-x-100"
                />
              </div>
            )}

            {/* Studio Model View */}
            {inputMode === 'preset' && (
              <div className={`relative w-full max-w-[440px] aspect-[3/4] rounded-sm bg-gradient-to-b ${activeFace.bgGrad} flex flex-col items-center justify-center shadow-inner overflow-hidden`}>
                {/* Photorealistic stylized anatomical head silhouette */}
                <svg viewBox="0 0 300 400" className="w-full h-full drop-shadow-md">
                  {/* Neck & Shoulders */}
                  <path d="M 90 280 L 70 400 L 230 400 L 210 280 Z" fill={activeFace.skinTone} opacity="0.9" />
                  <path d="M 60 380 Q 150 340 240 380 L 250 400 L 50 400 Z" fill="#202022" />

                  {/* Head base */}
                  {activeFace.faceShape === 'Oval' && (
                    <ellipse cx="150" cy="180" rx="72" ry="96" fill={activeFace.skinTone} />
                  )}
                  {activeFace.faceShape === 'Square' && (
                    <path
                      d="M 80 120 Q 80 80 150 80 Q 220 80 220 120 L 220 220 Q 215 265 150 268 Q 85 265 80 220 Z"
                      fill={activeFace.skinTone}
                    />
                  )}
                  {activeFace.faceShape === 'Round' && (
                    <circle cx="150" cy="180" r="82" fill={activeFace.skinTone} />
                  )}
                  {activeFace.faceShape === 'Heart' && (
                    <path
                      d="M 74 130 C 74 80 226 80 226 130 C 226 190 190 240 150 268 C 110 240 74 190 74 130 Z"
                      fill={activeFace.skinTone}
                    />
                  )}

                  {/* Ears */}
                  <ellipse cx="74" cy="182" rx="8" ry="18" fill={activeFace.skinTone} />
                  <ellipse cx="226" cy="182" rx="8" ry="18" fill={activeFace.skinTone} />

                  {/* Eyes */}
                  <g opacity="0.85">
                    {/* Left Eye */}
                    <path d="M 104 172 Q 120 162 136 172 Q 120 180 104 172 Z" fill="#ffffff" />
                    <circle cx="120" cy="172" r="5.5" fill="#2c221a" />
                    <circle cx="121" cy="170" r="1.5" fill="#ffffff" />
                    <path d="M 102 158 Q 120 152 138 156" stroke={activeFace.hair} strokeWidth="3" strokeLinecap="round" />

                    {/* Right Eye */}
                    <path d="M 164 172 Q 180 162 196 172 Q 180 180 164 172 Z" fill="#ffffff" />
                    <circle cx="180" cy="172" r="5.5" fill="#2c221a" />
                    <circle cx="181" cy="170" r="1.5" fill="#ffffff" />
                    <path d="M 162 156 Q 180 152 198 158" stroke={activeFace.hair} strokeWidth="3" strokeLinecap="round" />
                  </g>

                  {/* Nose */}
                  <path d="M 150 168 L 148 206 Q 150 212 156 210" stroke="#000000" strokeWidth="1.5" fill="none" opacity="0.25" strokeLinecap="round" />

                  {/* Lips */}
                  <path d="M 132 236 Q 150 230 168 236 Q 150 246 132 236 Z" fill="#b06c64" opacity="0.65" />

                  {/* Hair */}
                  <path
                    d="M 68 150 C 60 70 240 70 232 150 C 220 95 190 90 150 90 C 110 90 80 95 68 150 Z"
                    fill={activeFace.hair}
                  />
                </svg>

                {/* Face Badge */}
                <div className="absolute top-3 left-3 bg-[#1C1C1A]/70 backdrop-blur-xs text-[#F5F4EE] px-2.5 py-1 rounded-xs text-[11px] flex items-center gap-1.5">
                  <span className="font-medium">{activeFace.name}</span>
                  <span className="text-[#A39E92]">·</span>
                  <span className="text-[#C4BFA5]">{activeFace.faceShape} Face</span>
                </div>
              </div>
            )}

            {/* Overlaid Spectacles Frame Element */}
            <div
              className="absolute pointer-events-none transition-all duration-75 flex items-center justify-center"
              style={{
                width: `${280 * (frameScale / 100)}px`,
                transform: `translate(${frameOffsetX}px, ${frameOffsetY}px)`,
              }}
            >
              <FrameVectorSvg
                svgType={selectedProduct.svgFrameType}
                color={selectedColor}
                lensTint={lensTint}
                className="w-full h-auto drop-shadow-xl"
              />
            </div>

            {/* Bottom Floating Control Bar on Visual */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
              {/* Presets Switcher if in Studio Mode */}
              {inputMode === 'preset' ? (
                <div className="flex items-center gap-1.5 bg-[#1C1C1A]/90 backdrop-blur-md p-1 rounded-xs border border-[#3E3C36]">
                  {FACE_PRESETS.map((face, idx) => (
                    <button
                      key={face.id}
                      onClick={() => setSelectedFaceIndex(idx)}
                      className={`px-2 py-1 text-[11px] rounded-xs font-medium transition-colors ${
                        selectedFaceIndex === idx
                          ? 'bg-white text-[#161614]'
                          : 'text-[#BBB7AB] hover:text-white'
                      }`}
                    >
                      {face.name} ({face.faceShape})
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-[11px] text-[#A6A295] bg-[#1C1C1A]/90 px-3 py-1 rounded-xs">
                  Face tracking active · Align eyes with frame bridge
                </div>
              )}

              {/* Reset Fit */}
              <button
                onClick={() => {
                  setFrameScale(100);
                  setFrameOffsetY(0);
                  setFrameOffsetX(0);
                }}
                className="flex items-center gap-1 bg-[#1C1C1A]/90 hover:bg-[#2C2A26] text-[#E8E6E0] px-2.5 py-1 rounded-xs text-[11px] border border-[#3E3C36] transition-colors"
                title="Reset bridge position"
              >
                <RefreshCw className="w-3 h-3" />
                <span className="hidden sm:inline">Reset Align</span>
              </button>
            </div>
          </div>

          {/* Right Sidebar: Frame & Lens Selection + Precise Fitting Controls */}
          <div className="lg:col-span-4 p-5 sm:p-6 flex flex-col justify-between overflow-y-auto bg-[#FBFBF9] border-t lg:border-t-0 lg:border-l border-[#E7E5DF] space-y-6">
            <div>
              {/* Active Frame Details */}
              <div className="border-b border-[#E7E5DF] pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider text-[#7A776E] font-medium">
                    {selectedProduct.collection} Collection
                  </span>
                  <span className="font-mono text-sm font-semibold tabular-nums text-[#161614]">
                    ${selectedProduct.price}
                  </span>
                </div>
                <h3 className="font-editorial text-2xl font-medium text-[#161614] mt-1">
                  {selectedProduct.name}
                </h3>
                <p className="text-xs text-[#5E5B54] mt-1">
                  {selectedProduct.shape} · {selectedProduct.material} · {selectedProduct.fit} Fit
                </p>
                <div className="text-[11px] text-[#8C887E] font-mono mt-1">
                  Width: {selectedProduct.dimensions.frameWidth}mm · Lens: {selectedProduct.dimensions.lensWidth}mm · Bridge: {selectedProduct.dimensions.bridgeWidth}mm
                </div>
              </div>

              {/* Frame Catalog Picker */}
              <div className="mt-4">
                <label className="block text-xs font-semibold text-[#161614] mb-2 uppercase tracking-wide">
                  1. Select Frame Model
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {products.map((p) => {
                    const isCurrent = p.id === selectedProduct.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => {
                          setSelectedProduct(p);
                          setSelectedColor(p.colorVariants[0]);
                        }}
                        className={`p-2 text-left rounded-xs border transition-all ${
                          isCurrent
                            ? 'border-[#1C1C1A] bg-[#F2EFE9] ring-1 ring-[#1C1C1A]'
                            : 'border-[#E0DDD4] hover:border-[#BBB6AA] bg-white'
                        }`}
                      >
                        <span className="font-editorial text-xs font-medium block text-[#161614] truncate">
                          {p.name.replace('The ', '')}
                        </span>
                        <span className="text-[10px] text-[#7A776E] block font-mono">
                          ${p.price}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Colorway Selection */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-[#161614] uppercase tracking-wide">
                    2. Acetate / Metal Tone
                  </label>
                  <span className="text-xs text-[#7A776E]">{selectedColor.name}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  {selectedProduct.colorVariants.map((c) => {
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

              {/* Lens Tint Filter Simulation */}
              <div className="mt-5">
                <label className="block text-xs font-semibold text-[#161614] mb-2 uppercase tracking-wide">
                  3. Lens Optics & Tint
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => setLensTint('clear')}
                    className={`px-2.5 py-1.5 rounded-xs border text-left flex items-center justify-between ${
                      lensTint === 'clear'
                        ? 'border-[#1C1C1A] bg-[#F2EFE9] font-medium'
                        : 'border-[#DDD9CE] hover:border-[#BBB6AA]'
                    }`}
                  >
                    <span>Clear Optical</span>
                    {lensTint === 'clear' && <Check className="w-3 h-3 text-[#1C1C1A]" />}
                  </button>

                  <button
                    onClick={() => setLensTint('blue-blocker')}
                    className={`px-2.5 py-1.5 rounded-xs border text-left flex items-center justify-between ${
                      lensTint === 'blue-blocker'
                        ? 'border-[#1C1C1A] bg-[#F2EFE9] font-medium'
                        : 'border-[#DDD9CE] hover:border-[#BBB6AA]'
                    }`}
                  >
                    <span>Blue-Light Guard</span>
                    {lensTint === 'blue-blocker' && <Check className="w-3 h-3 text-[#1C1C1A]" />}
                  </button>

                  <button
                    onClick={() => setLensTint('polarized-green')}
                    className={`px-2.5 py-1.5 rounded-xs border text-left flex items-center justify-between ${
                      lensTint === 'polarized-green'
                        ? 'border-[#1C1C1A] bg-[#F2EFE9] font-medium'
                        : 'border-[#DDD9CE] hover:border-[#BBB6AA]'
                    }`}
                  >
                    <span>Mineral Green Sun</span>
                    {lensTint === 'polarized-green' && <Check className="w-3 h-3 text-[#1C1C1A]" />}
                  </button>

                  <button
                    onClick={() => setLensTint('amber')}
                    className={`px-2.5 py-1.5 rounded-xs border text-left flex items-center justify-between ${
                      lensTint === 'amber'
                        ? 'border-[#1C1C1A] bg-[#F2EFE9] font-medium'
                        : 'border-[#DDD9CE] hover:border-[#BBB6AA]'
                    }`}
                  >
                    <span>Sepia Amber Sun</span>
                    {lensTint === 'amber' && <Check className="w-3 h-3 text-[#1C1C1A]" />}
                  </button>
                </div>
              </div>

              {/* Precision Fitting Caliper Controls */}
              <div className="mt-5 pt-4 border-t border-[#E7E5DF]">
                <div className="flex items-center justify-between text-xs text-[#5E5B54] mb-2 font-medium">
                  <span className="flex items-center gap-1">
                    <Sliders className="w-3 h-3" />
                    <span>Pupil & Bridge Alignment</span>
                  </span>
                  <span className="font-mono text-[11px] tabular-nums">{frameScale}% scale</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-[11px] text-[#7A776E] mb-1">
                      <span>Frame Scale</span>
                      <span>{frameScale}%</span>
                    </div>
                    <input
                      type="range"
                      min="75"
                      max="130"
                      value={frameScale}
                      onChange={(e) => setFrameScale(Number(e.target.value))}
                      className="w-full accent-[#1C1C1A] h-1.5 bg-[#E4E1D7] rounded-sm cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-[#7A776E] mb-1">
                      <span>Nose Bridge Height</span>
                      <span>{frameOffsetY > 0 ? `+${frameOffsetY}` : frameOffsetY}px</span>
                    </div>
                    <input
                      type="range"
                      min="-40"
                      max="40"
                      value={frameOffsetY}
                      onChange={(e) => setFrameOffsetY(Number(e.target.value))}
                      className="w-full accent-[#1C1C1A] h-1.5 bg-[#E4E1D7] rounded-sm cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#E7E5DF] space-y-2.5">
              <button
                onClick={() => {
                  onClose();
                  onConfigureLenses(selectedProduct, selectedColor);
                }}
                className="w-full bg-[#1C1C1A] hover:bg-[#32322E] text-[#FBFBF9] py-3 rounded-sm text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <span>Customize Lenses for {selectedProduct.name}</span>
                <span className="font-mono tabular-nums font-normal text-[#D2CEC4]">
                  (From ${selectedProduct.price})
                </span>
              </button>

              <button
                onClick={handleTakeSnapshot}
                className="w-full bg-transparent hover:bg-[#F2EFE9] text-[#1C1C1A] border border-[#DDD9CE] py-2.5 rounded-sm text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Try-On Look</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
