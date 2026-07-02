'use client';

import React, { useState, useEffect, useRef } from 'react';
import { IconArrowRight } from '@/components/icons';

/* ─── data ─── */
const milestones = [
  { year: '2018', title: 'Founded in Noida, India', description: 'Ashish Garg founded Vaidik Eduservices with a bold vision—to bridge the gap between quality education and technology.' },
  { year: '2019', title: 'Expanded to 100+ Clients', description: 'Launched online tutoring services and scaled rapidly, reaching 100+ clients within the first year of operations.' },
  { year: '2020', title: 'Digital-First Pivot', description: 'Pivoted to a fully digital model during the pandemic, reaching 200+ clients and proving resilience through innovation.' },
  { year: '2021', title: 'AI Data Solutions Launch', description: 'Launched AI Data Solutions division and expanded globally, bringing cutting-edge technology to education markets worldwide.' },
  { year: '2022', title: '400+ Team & ISO Certified', description: 'Grew to 400+ team members and achieved ISO certification, establishing world-class quality standards across all services.' },
  { year: '2023', title: '500+ Clients, 25+ Countries', description: 'Surpassed 500 clients across 25+ countries, solidifying our position as a truly global EdTech powerhouse.' },
  { year: '2024', title: 'Next-Gen Platform Launch', description: 'Unveiled a bold new brand identity and launched our next-generation learning platform—redefining the future of education.' },
];

const coreValues = [
  { title: 'Passionate', emoji: '🔥', description: 'We pour our heart into every solution, driven by genuine enthusiasm for transforming education.' },
  { title: 'Respectful', emoji: '🤝', description: 'We listen, we value diverse perspectives, and we treat every interaction with dignity and care.' },
  { title: 'Ownership', emoji: '🎯', description: 'We take full accountability for outcomes—no excuses, no shortcuts, only results that matter.' },
  { title: 'Unified', emoji: '🌊', description: 'We move as one team with one mission, leveraging collective intelligence to achieve the extraordinary.' },
  { title: 'Better Together', emoji: '✨', description: 'We believe collaboration multiplies impact—when we combine strengths, magic happens.' },
];

const industries = [
  { name: 'K-12 Education', icon: '📚' },
  { name: 'Higher Education', icon: '🎓' },
  { name: 'EdTech', icon: '💡' },
  { name: 'Corporate Training', icon: '🏢' },
  { name: 'Healthcare', icon: '🏥' },
  { name: 'Tech & AI', icon: '🤖' },
  { name: 'BFSI', icon: '🏦' },
  { name: 'Legal', icon: '⚖️' },
];

const stats = [
  { value: '500+', label: 'Clients Worldwide' },
  { value: '25+', label: 'Countries Served' },
  { value: '400+', label: 'Expert Professionals' },
  { value: '6+', label: 'Years of Impact' },
];

/* ─── scroll-reveal hook ─── */
function useReveal<T extends HTMLElement>(): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

/* ─── section wrapper ─── */
function RevealSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const [ref, visible] = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════ PAGE ═══════════════ */
export default function AboutPage() {
  const [activeTimeline, setActiveTimeline] = useState(0);

  return (
    <main className="min-h-screen" style={{ background: '#FFFFFF' }}>

      {/* ───────── HERO ───────── */}
      <section className="relative overflow-hidden" style={{ minHeight: '85vh' }}>
        {/* animated gradient bg */}
        <div
          className="absolute inset-0 animate-gradient"
          style={{
            background: 'linear-gradient(160deg, #0A3D3D 0%, #0D5C5C 30%, #2AA6A6 55%, #5CC9B5 75%, #B8EDE3 100%)',
            backgroundSize: '300% 300%',
          }}
        />
        {/* noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
        {/* radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(126,220,202,0.4) 0%, transparent 70%)' }} />

        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6" style={{ minHeight: '85vh' }}>
          {/* badge */}
          <RevealSection delay={0}>
            <span
              className="glass inline-block rounded-full px-5 py-2 text-sm font-medium tracking-wider uppercase mb-8"
              style={{ color: '#F7FAFA', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)' }}
            >
              About Vaidik Edu
            </span>
          </RevealSection>

          {/* tagline */}
          <RevealSection delay={200}>
            <h1
              className="font-bold leading-[1.05] tracking-tight max-w-5xl mx-auto"
              style={{
                fontFamily: 'var(--font-syne, Syne, sans-serif)',
                fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #B8EDE3 40%, #7EDCCA 65%, #5CC9B5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Innovate. Educate. Elevate.
            </h1>
          </RevealSection>

          {/* sub */}
          <RevealSection delay={400}>
            <p className="mt-6 max-w-2xl mx-auto text-lg leading-relaxed" style={{ color: 'rgba(247,250,250,0.8)' }}>
              We&apos;re a global EdTech company empowering learners and institutions with innovative education solutions—from content engineering to AI-powered platforms.
            </p>
          </RevealSection>

          {/* scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
            <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1">
              <div className="w-1 h-2 rounded-full bg-white/60" style={{ animation: 'scroll-indicator 2s ease-in-out infinite' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ───────── STORY SECTION ───────── */}
      <section className="section-padding" style={{ background: '#F7FAFA' }}>
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* text */}
            <RevealSection>
              <div>
                <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 block" style={{ color: '#2AA6A6' }}>
                  Our Story
                </span>
                <h2 className="font-bold leading-tight mb-6" style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)', fontSize: 'var(--font-h2)', color: '#0A3D3D' }}>
                  Built on passion,<br />driven by purpose.
                </h2>
                <div className="space-y-4 text-base leading-relaxed" style={{ color: '#4A4A4A' }}>
                  <p>
                    In 2018, <strong style={{ color: '#0D5C5C' }}>Ashish Garg</strong> founded Vaidik Eduservices in <strong style={{ color: '#0D5C5C' }}>Noida, India</strong>, with a singular conviction: education should be accessible, intelligent, and transformative. What began as a small team with big ambitions has grown into a global force serving 500+ clients across 25+ countries.
                  </p>
                  <p>
                    From navigating the pandemic pivot to launching AI-powered solutions, our journey has been one of relentless innovation. We don&apos;t just follow trends in education—we create them.
                  </p>
                  <p>
                    Today, Vaidik stands at the intersection of technology and learning, building solutions that empower institutions, train workforces, and shape the future of knowledge.
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0D5C5C, #2AA6A6)' }}>
                    <span className="text-white text-lg font-bold" style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)' }}>AG</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: '#0A3D3D' }}>Ashish Garg</p>
                    <p className="text-xs" style={{ color: '#9B9B9B' }}>Founder & CEO</p>
                  </div>
                </div>
              </div>
            </RevealSection>

            {/* image */}
            <RevealSection delay={200}>
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <img
                    src="/images/about-office.png"
                    alt="Vaidik Eduservices office in Noida"
                    className="w-full h-full object-cover"
                  />
                  {/* gradient overlay */}
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(10,61,61,0.3) 100%)' }} />
                </div>
                {/* floating stat card */}
                <div
                  className="glass-card absolute -bottom-6 -left-6 rounded-xl px-6 py-4 animate-float"
                  style={{ background: 'rgba(255,255,255,0.9)' }}
                >
                  <p className="text-3xl font-bold" style={{ color: '#2AA6A6', fontFamily: 'var(--font-syne, Syne, sans-serif)' }}>2018</p>
                  <p className="text-xs font-medium" style={{ color: '#4A4A4A' }}>Founded in Noida</p>
                </div>
                {/* decorative accent */}
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #5CC9B5, transparent)' }} />
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ───────── INTERACTIVE TIMELINE ───────── */}
      <section className="section-padding" style={{ background: '#FFFFFF' }}>
        <div className="section-container">
          <RevealSection>
            <div className="text-center mb-16">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 block" style={{ color: '#2AA6A6' }}>
                Our Journey
              </span>
              <h2 className="font-bold" style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)', fontSize: 'var(--font-h2)', color: '#0A3D3D' }}>
                Milestones that define us
              </h2>
            </div>
          </RevealSection>

          {/* Desktop: horizontal selector */}
          <RevealSection delay={100}>
            <div className="hidden lg:flex items-center justify-center gap-2 mb-12 relative">
              {/* connector line */}
              <div className="absolute top-1/2 left-[10%] right-[10%] h-px" style={{ background: 'linear-gradient(90deg, transparent, #B8EDE3, #2AA6A6, #B8EDE3, transparent)' }} />
              {milestones.map((m, i) => (
                <button
                  key={m.year}
                  onClick={() => setActiveTimeline(i)}
                  className="relative z-10 flex flex-col items-center gap-2 px-4 group cursor-pointer"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500"
                    style={{
                      background: activeTimeline === i
                        ? 'linear-gradient(135deg, #0D5C5C, #2AA6A6)'
                        : 'rgba(184,237,227,0.3)',
                      color: activeTimeline === i ? '#FFFFFF' : '#0D5C5C',
                      transform: activeTimeline === i ? 'scale(1.15)' : 'scale(1)',
                      boxShadow: activeTimeline === i ? '0 0 30px rgba(42,166,166,0.35)' : 'none',
                    }}
                  >
                    {m.year.slice(2)}
                  </div>
                  <span
                    className="text-xs font-semibold transition-colors duration-300"
                    style={{ color: activeTimeline === i ? '#0A3D3D' : '#9B9B9B' }}
                  >
                    {m.year}
                  </span>
                </button>
              ))}
            </div>
          </RevealSection>

          {/* Desktop: active milestone detail */}
          <RevealSection delay={200}>
            <div className="hidden lg:block">
              <div
                className="glass-card rounded-2xl p-10 max-w-3xl mx-auto text-center"
                style={{
                  background: 'rgba(247,250,250,0.8)',
                  border: '1px solid rgba(184,237,227,0.4)',
                }}
              >
                <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full" style={{ background: 'rgba(42,166,166,0.1)' }}>
                  <span className="w-2 h-2 rounded-full" style={{ background: '#2AA6A6' }} />
                  <span className="text-sm font-semibold" style={{ color: '#0D5C5C' }}>{milestones[activeTimeline].year}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)', color: '#0A3D3D' }}>
                  {milestones[activeTimeline].title}
                </h3>
                <p className="text-base leading-relaxed max-w-xl mx-auto" style={{ color: '#4A4A4A' }}>
                  {milestones[activeTimeline].description}
                </p>
              </div>
            </div>
          </RevealSection>

          {/* Mobile: vertical timeline */}
          <div className="lg:hidden relative pl-8">
            {/* vertical line */}
            <div className="absolute left-3 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(180deg, #B8EDE3, #2AA6A6, #B8EDE3)' }} />
            {milestones.map((m, i) => (
              <RevealSection key={m.year} delay={i * 100}>
                <div className="relative mb-10 last:mb-0">
                  {/* dot */}
                  <div
                    className="absolute -left-[1.4rem] top-1 w-5 h-5 rounded-full border-[3px]"
                    style={{ borderColor: '#2AA6A6', background: '#FFFFFF' }}
                  />
                  <div className="glass-card rounded-xl p-5" style={{ background: 'rgba(247,250,250,0.7)', border: '1px solid rgba(184,237,227,0.3)' }}>
                    <span className="text-xs font-bold tracking-wider" style={{ color: '#2AA6A6' }}>{m.year}</span>
                    <h4 className="font-bold text-base mt-1 mb-1" style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)', color: '#0A3D3D' }}>
                      {m.title}
                    </h4>
                    <p className="text-sm leading-relaxed" style={{ color: '#4A4A4A' }}>{m.description}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CORE VALUES ───────── */}
      <section className="section-padding" style={{ background: 'linear-gradient(180deg, #F7FAFA 0%, #FFFFFF 100%)' }}>
        <div className="section-container">
          <RevealSection>
            <div className="text-center mb-16">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 block" style={{ color: '#2AA6A6' }}>
                What We Stand For
              </span>
              <h2 className="font-bold" style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)', fontSize: 'var(--font-h2)', color: '#0A3D3D' }}>
                Our Core Values
              </h2>
            </div>
          </RevealSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {coreValues.map((v, i) => (
              <RevealSection key={v.title} delay={i * 100}>
                <div
                  className="glass-card light-sweep rounded-2xl p-6 text-center h-full group cursor-default"
                  style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(184,237,227,0.3)' }}
                >
                  <div
                    className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center text-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                    style={{ background: 'rgba(42,166,166,0.08)' }}
                  >
                    {v.emoji}
                  </div>
                  <h3 className="font-bold text-base mb-2" style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)', color: '#0A3D3D' }}>
                    {v.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: '#4A4A4A' }}>
                    {v.description}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── INDUSTRIES SERVED ───────── */}
      <section className="section-padding" style={{ background: '#FFFFFF' }}>
        <div className="section-container">
          <RevealSection>
            <div className="text-center mb-16">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 block" style={{ color: '#2AA6A6' }}>
                Who We Serve
              </span>
              <h2 className="font-bold" style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)', fontSize: 'var(--font-h2)', color: '#0A3D3D' }}>
                Industries we transform
              </h2>
            </div>
          </RevealSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {industries.map((ind, i) => (
              <RevealSection key={ind.name} delay={i * 80}>
                <div
                  className="glass-card light-sweep rounded-xl p-6 flex flex-col items-center text-center group cursor-default"
                  style={{ background: 'rgba(247,250,250,0.6)', border: '1px solid rgba(184,237,227,0.25)' }}
                >
                  <span className="text-3xl mb-3 transition-transform duration-500 group-hover:scale-125">{ind.icon}</span>
                  <span className="text-sm font-semibold" style={{ color: '#0A3D3D' }}>{ind.name}</span>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── STATS BANNER ───────── */}
      <section className="relative overflow-hidden py-20">
        <div
          className="absolute inset-0 animate-gradient"
          style={{
            background: 'linear-gradient(135deg, #0A3D3D 0%, #0D5C5C 30%, #2AA6A6 60%, #0D5C5C 100%)',
            backgroundSize: '200% 200%',
          }}
        />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

        <div className="section-container relative z-10">
          <RevealSection>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
              {stats.map((s, i) => (
                <div key={s.label} className="text-center group">
                  <p
                    className="font-bold mb-1 transition-transform duration-500 group-hover:scale-110"
                    style={{
                      fontFamily: 'var(--font-syne, Syne, sans-serif)',
                      fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                      background: 'linear-gradient(135deg, #FFFFFF, #B8EDE3)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      animationDelay: `${i * 150}ms`,
                    }}
                  >
                    {s.value}
                  </p>
                  <p className="text-sm font-medium" style={{ color: 'rgba(184,237,227,0.8)' }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="section-padding" style={{ background: '#F7FAFA' }}>
        <div className="section-container">
          <RevealSection>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-bold mb-4" style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)', fontSize: 'var(--font-h2)', color: '#0A3D3D' }}>
                Ready to transform education?
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: '#4A4A4A' }}>
                Join 500+ organisations across the globe who trust Vaidik to deliver innovative, scalable education solutions.
              </p>
              <a
                href="/contact"
                className="magnetic-btn magnetic-btn-primary light-sweep inline-flex items-center gap-2"
              >
                Get in Touch
                <IconArrowRight size={18} />
              </a>
            </div>
          </RevealSection>
        </div>
      </section>
    </main>
  );
}
