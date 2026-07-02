'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { VaidikLogo, IconMenu, IconClose } from '@/components/icons';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/courses', label: 'Services' },
  { href: '/resources', label: 'Resources' },
  { href: '/contact', label: 'Contact Us' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3 bg-white/70 backdrop-blur-2xl shadow-[0_1px_20px_rgba(10,61,61,0.06)] border-b border-white/30'
            : 'py-5 bg-transparent'
        }`}
        style={{ willChange: 'transform, background-color' }}
      >
        <div className="max-w-[1320px] mx-auto flex items-center justify-between" style={{ paddingLeft: 'clamp(1.5rem, 4vw, 4rem)', paddingRight: 'clamp(1.5rem, 4vw, 4rem)' }}>
          {/* Logo */}
          <Link href="/" className="relative z-10 flex items-center gap-2.5 group" aria-label="Vaidik Home">
            <VaidikLogo size={36} />
            <span
              className="text-xl font-bold tracking-tight transition-colors duration-300"
              style={{
                color: isScrolled ? '#1A1A1A' : '#1A1A1A',
                fontFamily: 'var(--font-syne)',
              }}
            >
              VAIDIK
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-[0.9375rem] font-medium transition-colors duration-300 rounded-lg group ${
                    isActive ? 'text-[#2AA6A6]' : 'text-[#4A4A4A] hover:text-[#2AA6A6]'
                  }`}
                >
                  {link.label}
                  {/* Active indicator line */}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-500 ${
                      isActive
                        ? 'w-6 bg-[#2AA6A6]'
                        : 'w-0 bg-[#2AA6A6] group-hover:w-4'
                    }`}
                    style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                  />
                </Link>
              );
            })}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden lg:inline-flex magnetic-btn-primary text-sm py-2.5 px-6"
              style={{ borderRadius: '100px', fontWeight: 600, fontSize: '0.875rem' }}
            >
              Get Started
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden relative z-10 p-2 rounded-xl transition-colors duration-300 hover:bg-black/5"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? (
                <IconClose size={24} className="text-[#1A1A1A]" />
              ) : (
                <IconMenu size={24} className="text-[#1A1A1A]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-700 lg:hidden ${
          isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {/* Background */}
        <div
          className={`absolute inset-0 bg-white/95 backdrop-blur-3xl transition-transform duration-700 ${
            isMobileOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        />

        {/* Nav Links */}
        <nav className="relative flex flex-col items-center justify-center h-full gap-2">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className={`text-3xl font-semibold transition-all duration-500 py-3 ${
                  isActive ? 'text-[#2AA6A6]' : 'text-[#1A1A1A] hover:text-[#2AA6A6]'
                } ${isMobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{
                  fontFamily: 'var(--font-syne)',
                  transitionDelay: isMobileOpen ? `${150 + i * 80}ms` : '0ms',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            href="/contact"
            onClick={() => setIsMobileOpen(false)}
            className={`magnetic-btn-primary mt-6 transition-all duration-500 ${
              isMobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: isMobileOpen ? '550ms' : '0ms',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            Get Started
          </Link>
        </nav>
      </div>
    </>
  );
}
