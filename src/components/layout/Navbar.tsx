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

  return (
    <>
      <header className={`floating-nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="h-full px-6 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group relative z-50">
            <VaidikLogo size={32} />
            <span 
              className="text-[1.125rem] font-bold tracking-wider text-brand-teal-800" 
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              VAIDIK
            </span>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-1 bg-brand-cream/50 p-1 rounded-full border border-black/5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ${
                    isActive 
                      ? 'bg-brand-teal-700 text-white shadow-sm' 
                      : 'text-brand-charcoal/70 hover:text-brand-teal-700 hover:bg-black/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA + Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <Link 
              href="/contact" 
              className="hidden sm:inline-flex btn-premium-primary !py-2 !px-5 text-sm"
            >
              Get Started
            </Link>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden relative z-50 p-2 text-brand-teal-800 hover:bg-black/5 rounded-full transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileOpen ? <IconClose size={22} /> : <IconMenu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-brand-teal-900/90 backdrop-blur-md md:hidden transition-all duration-500 ${
          isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="h-full flex flex-col items-center justify-center gap-6">
          {navLinks.map((link, idx) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-2xl font-bold tracking-wide transition-all duration-300 ${
                  isActive ? 'text-brand-mint' : 'text-white/70 hover:text-white'
                } ${isMobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                style={{ 
                  fontFamily: 'var(--font-syne)',
                  transitionDelay: `${idx * 70}ms`
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className={`btn-premium-primary mt-4 ${isMobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            style={{ transitionDelay: `${navLinks.length * 70}ms` }}
          >
            Get Started
          </Link>
        </nav>
      </div>
    </>
  );
}
