import React from 'react';
import { ColorVariant } from '../types/optical';

interface FrameVectorSvgProps {
  svgType: 'pantos-round' | 'geometric-wire' | 'bold-acetate-square' | 'crown-panto' | 'architect-aviator' | 'oval-minimal';
  color: ColorVariant;
  lensTint?: 'clear' | 'amber' | 'blue-blocker' | 'polarized-green' | 'smoke';
  className?: string;
}

export const FrameVectorSvg: React.FC<FrameVectorSvgProps> = ({
  svgType,
  color,
  lensTint = 'clear',
  className = 'w-full h-auto',
}) => {
  const primaryColor = color.hex;
  const secondaryColor = color.secondaryHex || color.hex;

  // Lens tint styling
  const getLensFill = () => {
    switch (lensTint) {
      case 'amber':
        return 'rgba(180, 110, 45, 0.45)';
      case 'blue-blocker':
        return 'rgba(70, 120, 210, 0.18)';
      case 'polarized-green':
        return 'rgba(38, 65, 48, 0.65)';
      case 'smoke':
        return 'rgba(30, 30, 30, 0.6)';
      case 'clear':
      default:
        return 'rgba(235, 245, 255, 0.12)';
    }
  };

  const isWire = svgType === 'geometric-wire';
  const strokeW = isWire ? '2.5' : '7.5';

  return (
    <svg
      viewBox="0 0 360 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={`frameGrad-${color.name}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} />
          <stop offset="60%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </linearGradient>

        <linearGradient id="lensSheen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="35%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Render based on frame silhouette */}
      {svgType === 'pantos-round' && (
        <g>
          {/* Left Lens */}
          <ellipse
            cx="110"
            cy="70"
            rx="48"
            ry="44"
            fill={getLensFill()}
            stroke={`url(#frameGrad-${color.name})`}
            strokeWidth={strokeW}
          />
          <ellipse cx="104" cy="62" rx="34" ry="28" fill="url(#lensSheen)" opacity="0.3" />

          {/* Right Lens */}
          <ellipse
            cx="250"
            cy="70"
            rx="48"
            ry="44"
            fill={getLensFill()}
            stroke={`url(#frameGrad-${color.name})`}
            strokeWidth={strokeW}
          />
          <ellipse cx="244" cy="62" rx="34" ry="28" fill="url(#lensSheen)" opacity="0.3" />

          {/* Keyhole Bridge */}
          <path
            d="M 158 60 C 168 50, 192 50, 202 60 C 196 66, 196 74, 192 78 C 180 72, 180 72, 168 78 C 164 74, 164 66, 158 60 Z"
            fill={`url(#frameGrad-${color.name})`}
          />

          {/* Temple Endpoints & Pins */}
          <circle cx="58" cy="58" r="1.5" fill="#e8c37d" />
          <circle cx="58" cy="64" r="1.5" fill="#e8c37d" />
          <circle cx="302" cy="58" r="1.5" fill="#e8c37d" />
          <circle cx="302" cy="64" r="1.5" fill="#e8c37d" />

          {/* Outer temple lug extensions */}
          <path
            d="M 62 60 L 40 58"
            stroke={`url(#frameGrad-${color.name})`}
            strokeWidth={isWire ? '2.5' : '6'}
            strokeLinecap="round"
          />
          <path
            d="M 298 60 L 320 58"
            stroke={`url(#frameGrad-${color.name})`}
            strokeWidth={isWire ? '2.5' : '6'}
            strokeLinecap="round"
          />
        </g>
      )}

      {svgType === 'geometric-wire' && (
        <g>
          {/* Left Octagonal Rim */}
          <polygon
            points="85,34 135,34 158,58 158,88 135,108 85,108 62,88 62,58"
            fill={getLensFill()}
            stroke={`url(#frameGrad-${color.name})`}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <polygon
            points="88,38 130,38 150,58 150,84 130,102 88,102 68,84 68,58"
            fill="url(#lensSheen)"
            opacity="0.25"
          />

          {/* Right Octagonal Rim */}
          <polygon
            points="225,34 275,34 298,58 298,88 275,108 225,108 202,88 202,58"
            fill={getLensFill()}
            stroke={`url(#frameGrad-${color.name})`}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <polygon
            points="228,38 270,38 290,58 290,84 270,102 228,102 208,84 208,58"
            fill="url(#lensSheen)"
            opacity="0.25"
          />

          {/* High Arch Titanium Bridge */}
          <path
            d="M 158 58 Q 180 48 202 58"
            stroke={`url(#frameGrad-${color.name})`}
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Titanium Nosepad arms */}
          <path d="M 152 75 Q 160 82 158 92" stroke={`url(#frameGrad-${color.name})`} strokeWidth="1.5" />
          <path d="M 208 75 Q 200 82 202 92" stroke={`url(#frameGrad-${color.name})`} strokeWidth="1.5" />

          {/* Wire Temples */}
          <path d="M 62 58 L 32 56" stroke={`url(#frameGrad-${color.name})`} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 298 58 L 328 56" stroke={`url(#frameGrad-${color.name})`} strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}

      {svgType === 'crown-panto' && (
        <g>
          {/* Left Lens with Crown Flat-Top */}
          <path
            d="M 72 45 L 148 45 C 160 62 160 86 148 98 C 136 108 84 108 72 98 C 60 86 60 62 72 45 Z"
            fill={getLensFill()}
            stroke={`url(#frameGrad-${color.name})`}
            strokeWidth="9"
            strokeLinejoin="round"
          />
          <ellipse cx="106" cy="72" rx="36" ry="26" fill="url(#lensSheen)" opacity="0.3" />

          {/* Right Lens with Crown Flat-Top */}
          <path
            d="M 212 45 L 288 45 C 300 62 300 86 288 98 C 276 108 224 108 212 98 C 200 86 200 62 212 45 Z"
            fill={getLensFill()}
            stroke={`url(#frameGrad-${color.name})`}
            strokeWidth="9"
            strokeLinejoin="round"
          />
          <ellipse cx="246" cy="72" rx="36" ry="26" fill="url(#lensSheen)" opacity="0.3" />

          {/* Bold Bridge */}
          <path
            d="M 148 56 Q 180 52 212 56 L 210 68 Q 180 72 150 68 Z"
            fill={`url(#frameGrad-${color.name})`}
          />

          {/* Temple Hinge Rivets */}
          <rect x="52" y="52" width="10" height="8" rx="2" fill={`url(#frameGrad-${color.name})`} />
          <rect x="298" y="52" width="10" height="8" rx="2" fill={`url(#frameGrad-${color.name})`} />
          <circle cx="56" cy="56" r="1.5" fill="#f0d59e" />
          <circle cx="304" cy="56" r="1.5" fill="#f0d59e" />
        </g>
      )}

      {svgType === 'bold-acetate-square' && (
        <g>
          {/* Left Square */}
          <rect
            x="64"
            y="42"
            width="88"
            height="62"
            rx="12"
            fill={getLensFill()}
            stroke={`url(#frameGrad-${color.name})`}
            strokeWidth="8"
          />
          <rect x="72" y="48" width="68" height="42" rx="6" fill="url(#lensSheen)" opacity="0.25" />

          {/* Right Square */}
          <rect
            x="208"
            y="42"
            width="88"
            height="62"
            rx="12"
            fill={getLensFill()}
            stroke={`url(#frameGrad-${color.name})`}
            strokeWidth="8"
          />
          <rect x="216" y="48" width="68" height="42" rx="6" fill="url(#lensSheen)" opacity="0.25" />

          {/* Solid Architectural Bridge */}
          <path
            d="M 152 56 Q 180 50 208 56 L 206 68 Q 180 74 154 68 Z"
            fill={`url(#frameGrad-${color.name})`}
          />

          {/* Outer Temple Horns */}
          <path d="M 64 54 L 38 52" stroke={`url(#frameGrad-${color.name})`} strokeWidth="8" strokeLinecap="round" />
          <path d="M 296 54 L 322 52" stroke={`url(#frameGrad-${color.name})`} strokeWidth="8" strokeLinecap="round" />
        </g>
      )}

      {svgType === 'architect-aviator' && (
        <g>
          {/* Top Floating Brow Bar */}
          <path
            d="M 70 36 L 290 36"
            stroke={`url(#frameGrad-${color.name})`}
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Left Aviator Teardrop */}
          <path
            d="M 75 44 C 115 42 145 44 148 54 C 152 75 140 106 108 106 C 75 106 65 78 75 44 Z"
            fill={getLensFill()}
            stroke={`url(#frameGrad-${color.name})`}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Right Aviator Teardrop */}
          <path
            d="M 212 54 C 215 44 245 42 285 44 C 295 78 285 106 252 106 C 220 106 208 75 212 54 Z"
            fill={getLensFill()}
            stroke={`url(#frameGrad-${color.name})`}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Secondary Center Bridge */}
          <path
            d="M 148 56 Q 180 52 212 56"
            stroke={`url(#frameGrad-${color.name})`}
            strokeWidth="3"
          />

          {/* Temples */}
          <path d="M 70 42 L 34 40" stroke={`url(#frameGrad-${color.name})`} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 290 42 L 326 40" stroke={`url(#frameGrad-${color.name})`} strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}

      {svgType === 'oval-minimal' && (
        <g>
          <ellipse
            cx="110"
            cy="70"
            rx="46"
            ry="36"
            fill={getLensFill()}
            stroke={`url(#frameGrad-${color.name})`}
            strokeWidth={strokeW}
          />
          <ellipse
            cx="250"
            cy="70"
            rx="46"
            ry="36"
            fill={getLensFill()}
            stroke={`url(#frameGrad-${color.name})`}
            strokeWidth={strokeW}
          />
          <path
            d="M 156 68 Q 180 60 204 68"
            stroke={`url(#frameGrad-${color.name})`}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path d="M 64 68 L 36 66" stroke={`url(#frameGrad-${color.name})`} strokeWidth="3" strokeLinecap="round" />
          <path d="M 296 68 L 324 66" stroke={`url(#frameGrad-${color.name})`} strokeWidth="3" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
};
