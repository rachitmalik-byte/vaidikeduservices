'use client';

import React from 'react';
import Link from 'next/link';
import { VaidikLogo, IconLinkedIn, IconTwitter, IconMail, IconArrowUpRight } from '@/components/icons';

const footerLinks = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Story', href: '/about#story' },
    { label: 'Careers', href: '/contact' },
    { label: 'Contact', href: '/contact' },
  ],
  services: [
    { label: 'Online Tutoring', href: '/courses' },
    { label: 'Content Development', href: '/courses' },
    { label: 'Instructional Design', href: '/courses' },
    { label: 'Assessment Services', href: '/courses' },
    { label: 'E-Book Publishing', href: '/courses' },
    { label: 'Accessibility', href: '/courses' },
  ],
  resources: [
    { label: 'Blog', href: '/resources' },
    { label: 'Case Studies', href: '/resources' },
    { label: 'Tools & Downloads', href: '/resources' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: '#0A3D3D' }}>
      {/* Decorative gradient orbs */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2AA6A6, transparent)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-8 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #5CC9B5, transparent)', opacity: 0.08 }}
      />

      <div className="relative max-w-[1320px] mx-auto" style={{ paddingLeft: 'clamp(1.5rem, 4vw, 4rem)', paddingRight: 'clamp(1.5rem, 4vw, 4rem)' }}>
        {/* Top CTA Section */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-6 py-12 border-b"
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-syne)' }}>
              Ready to transform education?
            </h3>
            <p className="text-white/60 text-base">
              Let&apos;s discuss how we can help your organization grow.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-[0.9375rem] transition-all duration-400 group"
            style={{
              background: 'linear-gradient(135deg, #2AA6A6, #5CC9B5)',
              color: 'white',
              boxShadow: '0 4px 24px rgba(42, 166, 166, 0.3)',
            }}
          >
            Get in Touch
            <IconArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 py-14">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <VaidikLogo size={32} />
              <span className="text-lg font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-syne)' }}>
                VAIDIK
              </span>
            </div>
            <p className="text-white/50 text-[0.875rem] leading-relaxed mb-6 max-w-[280px]">
              Empowering organizations through innovative educational solutions. Your trusted B2B education outsourcing partner.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: <IconLinkedIn size={18} />, label: 'LinkedIn', href: '#' },
                { icon: <IconTwitter size={18} />, label: 'Twitter', href: '#' },
                { icon: <IconMail size={18} />, label: 'Email', href: 'mailto:info@vaidikedu.com' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300 text-white/50 hover:text-white"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(42, 166, 166, 0.2)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(42, 166, 166, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wider uppercase opacity-80">
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/50 text-[0.875rem] hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wider uppercase opacity-80">
              Services
            </h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/50 text-[0.875rem] hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources + Newsletter */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wider uppercase opacity-80">
              Resources
            </h4>
            <ul className="flex flex-col gap-3 mb-8">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/50 text-[0.875rem] hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 py-6 border-t text-white/30 text-xs"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <p>© {new Date().getFullYear()} Vaidik Eduservices Pvt. Ltd. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with precision
            <span className="inline-block w-1 h-1 rounded-full mx-1" style={{ background: '#5CC9B5' }} />
            Noida, India
          </p>
        </div>
      </div>
    </footer>
  );
}
