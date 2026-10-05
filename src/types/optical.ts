export interface ColorVariant {
  name: string;
  hex: string;
  secondaryHex?: string;
  previewColor: string;
  borderHex?: string;
}

export interface FrameDimensions {
  lensWidth: number;   // e.g. 48mm
  bridgeWidth: number; // e.g. 21mm
  templeLength: number;// e.g. 145mm
  frameWidth: number;  // e.g. 138mm
  lensHeight: number;  // e.g. 42mm
}

export interface FrameProduct {
  id: string;
  name: string;
  subtitle: string;
  collection: 'Optical' | 'Sun' | 'Titanium' | 'Atelier Reserve';
  shape: 'Pantos' | 'Round' | 'Architectural Square' | 'Aviator' | 'Geometric' | 'Crown Panto';
  material: 'Japanese Takiron Acetate' | 'Beta Titanium' | 'Composite Acetate & Titanium' | 'Pure Japanese Titanium';
  fit: 'Narrow' | 'Medium' | 'Wide';
  dimensions: FrameDimensions;
  weightGrams: number;
  price: number;
  tag?: string;
  description: string;
  craftNotes: string;
  image: string;
  colorVariants: ColorVariant[];
  svgFrameType: 'pantos-round' | 'geometric-wire' | 'bold-acetate-square' | 'crown-panto' | 'architect-aviator' | 'oval-minimal';
  bestForFaceShapes: ('Oval' | 'Square' | 'Round' | 'Heart' | 'Diamond')[];
  inStock: boolean;
  defaultColor: string;
  isBestSeller?: boolean;
}

export interface LensOption {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  category: 'Clear Optical' | 'Digital Protection' | 'Sun & Tint' | 'Plano / Aesthetic';
}

export interface LensIndexTier {
  index: '1.50' | '1.60' | '1.67' | '1.74';
  name: string;
  thickness: string;
  recommendedRange: string;
  price: number;
}

export interface LensCoating {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface PrescriptionDetails {
  method: 'manual' | 'send-later' | 'optometrist-file';
  odSph?: string;
  odCyl?: string;
  odAxis?: string;
  osSph?: string;
  osCyl?: string;
  osAxis?: string;
  pd?: string;
  notes?: string;
}

export interface CartItem {
  id: string;
  product: FrameProduct;
  selectedColor: ColorVariant;
  lensOption: LensOption;
  lensIndexTier: LensIndexTier;
  coatings: LensCoating[];
  prescription: PrescriptionDetails;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}
