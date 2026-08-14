import React from "react";

interface PowerTVLogoProps {
  className?: string;
}

export default function PowerTVLogo({ className = "h-12" }: PowerTVLogoProps) {
  return (
    <svg
      viewBox="0 0 320 100"
      className={`select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 3D Black shadow */}
        <rect x="8" y="14" width="284" height="74" rx="4" fill="#000000" opacity="0.3" />
        
        {/* Solid 3D Yellow Bevel / Extrusion (matches the yellow bottom/right edge in image) */}
        <rect x="8" y="12" width="288" height="72" rx="4" fill="#fcd116" />
        
        {/* Main Red Brand block */}
        <rect x="4" y="8" width="288" height="72" rx="4" fill="#e11a14" />
        
        {/* White inline border */}
        <rect x="8" y="12" width="280" height="64" rx="3" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.9" />

        {/* Text POWER using ultra-bold sans-serif with a stroke for heavy block lettering */}
        {/* P */}
        <text
          x="18"
          y="63"
          fontFamily="'Arial Black', Impact, sans-serif"
          fontWeight="900"
          fontSize="58"
          fill="#ffffff"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinejoin="miter"
        >
          P
        </text>

        {/* O */}
        <text
          x="53"
          y="63"
          fontFamily="'Arial Black', Impact, sans-serif"
          fontWeight="900"
          fontSize="58"
          fill="#ffffff"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinejoin="miter"
        >
          O
        </text>

        {/* W */}
        <text
          x="100"
          y="63"
          fontFamily="'Arial Black', Impact, sans-serif"
          fontWeight="900"
          fontSize="58"
          fill="#ffffff"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinejoin="miter"
        >
          W
        </text>

        {/* E */}
        <text
          x="158"
          y="63"
          fontFamily="'Arial Black', Impact, sans-serif"
          fontWeight="900"
          fontSize="58"
          fill="#ffffff"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinejoin="miter"
        >
          E
        </text>

        {/* R */}
        <text
          x="198"
          y="63"
          fontFamily="'Arial Black', Impact, sans-serif"
          fontWeight="900"
          fontSize="58"
          fill="#ffffff"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinejoin="miter"
        >
          R
        </text>

        {/* Yellow Lightning Bolt slicing through the letter 'O' */}
        {/* Red border glow behind the bolt to mask the letter O */}
        <path
          d="M 105 4 L 62 52 L 80 52 L 58 88 L 100 42 L 84 42 Z"
          fill="#e11a14"
          stroke="#e11a14"
          strokeWidth="8"
          strokeLinejoin="miter"
        />
        {/* Yellow Bolt body with gold outline */}
        <path
          d="M 105 4 L 62 52 L 80 52 L 58 88 L 100 42 L 84 42 Z"
          fill="#fcd116"
          stroke="#ffd700"
          strokeWidth="1.5"
          strokeLinejoin="miter"
        />

        {/* Top Right "TV" white square block with red border and red letters */}
        <rect x="254" y="2" width="58" height="42" rx="4" fill="#ffffff" stroke="#e11a14" strokeWidth="2.5" />
        <text
          x="283"
          y="33"
          fontFamily="'Arial Black', Impact, sans-serif"
          fontWeight="900"
          fontSize="28"
          fill="#e11a14"
          stroke="#e11a14"
          strokeWidth="1"
          textAnchor="middle"
        >
          TV
        </text>
      </svg>
  );
}
