import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

export const VaidikLogo: React.FC<IconProps & { showText?: boolean }> = ({ 
  className = '', 
  size = 40,
  showText = false 
}) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main V shape (solid) */}
      <path d="M 15 20 H 30 L 55 75 L 70 40 H 82 L 62 95 H 50 Z" fill="url(#vaidik-gradient)" />
      
      {/* Horizontal shoulder loop (hollow) */}
      <path fillRule="evenodd" clipRule="evenodd" d="M 35 25 H 72 L 67 35 H 31 Z M 37 28 H 67 L 64 32 H 35 Z" fill="url(#vaidik-gradient)" />
      
      {/* Circle (head) */}
      <circle cx="78" cy="28" r="7.5" fill="url(#vaidik-gradient)" />
      
      {/* Bottom right loop (hollow) */}
      <path fillRule="evenodd" clipRule="evenodd" d="M 62 62 L 75 92 H 92 L 79 62 Z M 68 67 L 77 87 H 87 L 78 67 Z" fill="url(#vaidik-gradient)" />
      
      <defs>
        <linearGradient id="vaidik-gradient" x1="15" y1="20" x2="92" y2="95" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2AA6A6" />
          <stop offset="1" stopColor="#5CC9B5" />
        </linearGradient>
      </defs>
    </svg>
    {showText && (
      <span className="text-[1.5rem] font-bold tracking-tight" style={{ fontFamily: 'var(--font-syne)', color: 'var(--vaidik-charcoal)' }}>
        VAIDIK
      </span>
    )}
  </div>
);

export const IconExpertInstructors: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="14" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M8 42C8 33.163 15.163 26 24 26C32.837 26 40 33.163 40 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M16 8L24 2L32 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <line x1="24" y1="2" x2="24" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const IconFlexibleLearning: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" fill="none" />
    <polyline points="24,12 24,24 34,28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M4 24H8M40 24H44M24 4V8M24 40V44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
  </svg>
);

export const IconCareerAdvancement: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <polyline points="4,40 16,28 24,32 44,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <polyline points="34,8 44,8 44,18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <line x1="4" y1="44" x2="44" y2="44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
  </svg>
);

export const IconOnlineCourses: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="4" y="6" width="40" height="28" rx="4" stroke="currentColor" strokeWidth="2" fill="none" />
    <polygon points="20,15 20,29 32,22" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" />
    <line x1="16" y1="42" x2="32" y2="42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="24" y1="34" x2="24" y2="42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const IconMentorship: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="16" cy="16" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="34" cy="16" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M2 40C2 32.268 8.268 26 16 26C18.5 26 20.8 26.6 22.8 27.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M26 38C26 31.925 29.925 28 34 28C38.075 28 42 31.925 42 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M22 32L28 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
  </svg>
);

export const IconSkills: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M24 4L30 16L44 18L34 28L36 42L24 36L12 42L14 28L4 18L18 16L24 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" />
  </svg>
);

export const IconArrowRight: React.FC<IconProps> = ({ className = '', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconArrowUpRight: React.FC<IconProps> = ({ className = '', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M6 14L14 6M14 6H7M14 6V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconCheck: React.FC<IconProps> = ({ className = '', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <polyline points="4,10 8,14 16,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconMenu: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="3" y1="12" x2="15" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="3" y1="18" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const IconClose: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const IconLinkedIn: React.FC<IconProps> = ({ className = '', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path d="M4.5 3C3.67 3 3 3.67 3 4.5S3.67 6 4.5 6 6 5.33 6 4.5 5.33 3 4.5 3ZM3 8H6V17H3V8ZM8 8H10.7V9.3C11.2 8.5 12.2 7.7 13.8 7.7C16.6 7.7 17 9.5 17 12V17H14V12.5C14 11.4 13.8 10.5 12.6 10.5C11.3 10.5 11 11.5 11 12.5V17H8V8Z" />
  </svg>
);

export const IconTwitter: React.FC<IconProps> = ({ className = '', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path d="M11.5 8.5L17.5 2H16L10.8 7.5L6.5 2H2L8.3 11L2 17.5H3.5L9 12L13.5 17.5H18L11.5 8.5ZM9.7 11L9 10L4 3H6L10.4 8.5L11.1 9.5L16 17H14L9.7 11Z" />
  </svg>
);

export const IconMail: React.FC<IconProps> = ({ className = '', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <polyline points="2,4 10,11 18,4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconPhone: React.FC<IconProps> = ({ className = '', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M3 4.5C3 3.67 3.67 3 4.5 3H7L9 7L7 8.5C7 8.5 8 11 10 13C12 15 14.5 16 14.5 16L16 14L17 17V18.5C17 19.33 16.33 20 15.5 20C8.5 20 3 14.5 3 7.5V4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconLocation: React.FC<IconProps> = ({ className = '', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M10 1C6.13 1 3 4.13 3 8C3 13.25 10 19 10 19S17 13.25 17 8C17 4.13 13.87 1 10 1Z" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="10" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
