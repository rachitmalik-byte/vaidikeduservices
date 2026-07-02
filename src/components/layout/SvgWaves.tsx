import React from 'react';

export default function SvgWaves() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
      {/* Soft gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #F5F9F9 0%, #EBF4F4 50%, #E3EFEF 100%)',
        }}
      />

      {/* Layer 1: Soft Seafoam Wave */}
      <svg 
        className="absolute bottom-0 left-0 w-full h-[60%] opacity-40 transform translate-y-[10%] xl:translate-y-0"
        viewBox="0 0 1440 600" 
        fill="none" 
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M0 250 C 360 150, 720 350, 1080 200 C 1260 120, 1380 180, 1440 220 V 600 H 0 Z" 
          fill="url(#wave-gradient-1)"
        />
        <defs>
          <linearGradient id="wave-gradient-1" x1="720" y1="150" x2="720" y2="600" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7EDCCA" stopOpacity="0.4" />
            <stop offset="1" stopColor="#B8EDE3" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>

      {/* Layer 2: Elegant Mint Wave */}
      <svg 
        className="absolute bottom-0 left-0 w-full h-[50%] opacity-30 transform translate-y-[15%] xl:translate-y-0"
        viewBox="0 0 1440 500" 
        fill="none" 
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M0 180 C 400 300, 800 100, 1200 250 C 1320 295, 1400 250, 1440 220 V 500 H 0 Z" 
          fill="url(#wave-gradient-2)"
        />
        <defs>
          <linearGradient id="wave-gradient-2" x1="720" y1="100" x2="720" y2="500" gradientUnits="userSpaceOnUse">
            <stop stopColor="#5CC9B5" stopOpacity="0.3" />
            <stop offset="1" stopColor="#7EDCCA" stopOpacity="0.05" />
          </linearGradient>
        </defs>
      </svg>

      {/* Layer 3: Vibrant Teal Wave */}
      <svg 
        className="absolute bottom-0 left-0 w-full h-[40%] opacity-20 transform translate-y-[20%] xl:translate-y-0"
        viewBox="0 0 1440 400" 
        fill="none" 
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M0 120 C 300 250, 600 50, 900 180 C 1140 280, 1320 180, 1440 140 V 400 H 0 Z" 
          fill="url(#wave-gradient-3)"
        />
        <defs>
          <linearGradient id="wave-gradient-3" x1="720" y1="50" x2="720" y2="400" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2AA6A6" stopOpacity="0.25" />
            <stop offset="1" stopColor="#0D5C5C" stopOpacity="0.02" />
          </linearGradient>
        </defs>
      </svg>

      {/* Soft Glow Radial Orbs */}
      <div 
        className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full opacity-35 blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #7EDCCA 0%, rgba(92,201,181,0.1) 70%, transparent 100%)',
        }}
      />
      <div 
        className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full opacity-25 blur-[100px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #B8EDE3 0%, rgba(42,166,166,0.05) 70%, transparent 100%)',
        }}
      />
    </div>
  );
}
