'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ui/ScrollReveal';
import {
  IconExpertInstructors,
  IconFlexibleLearning,
  IconCareerAdvancement,
  IconOnlineCourses,
  IconMentorship,
  IconSkills,
  IconArrowRight,
  IconArrowUpRight,
  IconCheck,
} from '@/components/icons';

/* ===== PARTNER LOGOS FOR TICKER ===== */
const partnerLogos = [
  'https://polo-pecan-73837341.figma.site/_assets/v11/1e7b0e6fcc016cd28aec5c68990118b8c54c35a5.svg',
  'https://polo-pecan-73837341.figma.site/_assets/v11/3eac03c183db2ae080d910159211c14843398b61.svg',
  'https://polo-pecan-73837341.figma.site/_assets/v11/17705a4c0023a0e5a99154dfb10582adbbf4260b.svg',
  'https://polo-pecan-73837341.figma.site/_assets/v11/0e5f442b09dc5c248e3e60d40a65505fb1887228.svg',
  'https://polo-pecan-73837341.figma.site/_assets/v11/63f99030ceb459e3c9ab9e429cfa2353491d3816.svg',
];

/* ===== CUSTOM HOOKS FOR HERO EFFECTS ===== */
function useCountUp(end: number, duration = 2000, startDelay = 1200) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let animationFrame: number;
    const delayTimer = setTimeout(() => {
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // easeOutCubic
        const ease = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(ease * end));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
    }, startDelay);

    return () => {
      clearTimeout(delayTimer);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [end, duration, startDelay]);

  return count;
}

function Typewriter({ 
  text, 
  delay = 400, 
  speed = 35, 
  onFinished 
}: { 
  text: string; 
  delay?: number; 
  speed?: number; 
  onFinished?: () => void;
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const startTimer = setTimeout(() => {
      let i = 0;
      timer = setInterval(() => {
        if (i < text.length) {
          setDisplayedText((prev) => prev + text.charAt(i));
          i++;
        } else {
          setIsFinished(true);
          clearInterval(timer);
          if (onFinished) onFinished();
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(startTimer);
      if (timer) clearInterval(timer);
    };
  }, [text, delay, speed, onFinished]);

  // Split the text: first 65 characters are deep teal, the rest is mint green
  const splitIndex = 65;
  const darkPart = displayedText.slice(0, splitIndex);
  const greenPart = displayedText.slice(splitIndex);

  return (
    <span className="font-syne">
      <span className="text-brand-teal-900">{darkPart}</span>
      {greenPart && (
        <span className="bg-gradient-to-r from-brand-teal-500 to-brand-mint bg-clip-text text-transparent">
          {greenPart}
        </span>
      )}
      {!isFinished && <span className="typewriter-cursor" />}
    </span>
  );
}

/* ===== VALUE PROPS & FEATURES ===== */
const valueProps = [
  {
    icon: IconExpertInstructors,
    title: 'Expert Instructors',
    description: 'Learn from industry leaders and subject matter experts with years of hands-on educational experience.',
    accent: '#2AA6A6',
  },
  {
    icon: IconFlexibleLearning,
    title: 'Flexible Learning',
    description: 'Learn at your own pace with tailormade solutions designed to adapt to your specific timeline.',
    accent: '#5CC9B5',
  },
  {
    icon: IconCareerAdvancement,
    title: 'Career Advancement',
    description: 'Gain globally-in-demand digital skills designed to accelerate your growth and career trajectory.',
    accent: '#7EDCCA',
  },
];

const features = [
  {
    icon: IconOnlineCourses,
    title: 'Online Courses',
    description: 'Comprehensive digital learning architectures engineered by instructional design experts. Interactive, WCAG compliant, and result-oriented.',
    image: '/images/online-learning.png',
    points: ['Interactive e-learning modules', 'LMS-ready responsive packaging', 'Integrated assessments'],
  },
  {
    icon: IconMentorship,
    title: 'Expert Mentorship',
    description: 'Connect with industry mentors for 1-on-1 development. Guided instruction built around personalized learning paths.',
    image: '/images/expert-mentors.png',
    points: ['Personalized feedback loops', 'Real-world project matching', 'Strategic career advice'],
  },
  {
    icon: IconSkills,
    title: 'Skill Development',
    description: 'Gain practical, future-proof skills. Structured curriculum frameworks with validation testing and certifications.',
    image: '/images/skill-development.png',
    points: ['Hands-on case studies', 'Focus on digital tools', 'Verified portfolio construction'],
  },
];

const testimonials = [
  {
    quote: 'Vaidik has completely transformed our educational catalog. Their curriculum mapping and instructional design are outstanding.',
    name: 'Sarah Mitchell',
    role: 'Head of Learning Products',
    company: 'EduCloud Systems',
  },
  {
    quote: 'The accessibility remediation team at Vaidik helped us achieve full ADA compliance. Efficient, precise, and highly professional.',
    name: 'James Chen',
    role: 'VP of Platform Development',
    company: 'LearnGate Inc.',
  },
  {
    quote: 'Their AI training datasets are clean and validated. A crucial partner in scaling our educational machine learning models.',
    name: 'Priya Sharma',
    role: 'Principal AI Researcher',
    company: 'Aura Analytics',
  },
];

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [typingFinished, setTypingFinished] = useState(false);
  const counterValue = useCountUp(500, 2000, 1200);

  return (
    <main className="min-h-screen bg-brand-cream overflow-hidden">
      {/* ===== HERO SECTION WITH ROTATING ORBITS ===== */}
      <section className="relative min-h-[92vh] flex items-center pt-24 md:pt-0">
        {/* Soft Background Radial Orbs */}
        <div 
          className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full opacity-20 blur-[140px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, var(--vaidik-mint-400) 0%, transparent 80%)' }}
        />
        <div 
          className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full opacity-15 blur-[120px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, var(--vaidik-teal-500) 0%, transparent 80%)' }}
        />

        <div className="max-w-[1240px] mx-auto px-6 w-full py-12 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Typography Content */}
            <div className="lg:col-span-6 relative z-10 flex flex-col items-start text-left">
              {/* Animated Mini Badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 bg-brand-teal-500/10 border border-brand-teal-500/20 text-brand-teal-700 animate-fade-in"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-teal-500 animate-pulse" />
                Innovate. Educate. Elevate.
              </div>

              {/* Typewriter Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6 min-h-[160px] lg:min-h-[220px]">
                <Typewriter 
                  text="Unlock Top Educational Services You Thought Were Out of Reach -- Now Just One Click Away!" 
                  delay={300} 
                  speed={30}
                  onFinished={() => setTypingFinished(true)}
                />
              </h1>

              {/* Subheading Details */}
              <p className="text-brand-charcoal/70 text-base md:text-lg leading-relaxed mb-8 max-w-xl animate-fade-in" style={{ animationDelay: '800ms' }}>
                Vaidik delivers custom instructional design, accessibility auditing, online tutoring systems, and high-quality AI training datasets to scale modern knowledge companies.
              </p>

              {/* CTA Buttons with Rotating Border Gradient */}
              <div 
                className={`flex flex-wrap items-center gap-4 transition-all duration-700 ${
                  typingFinished ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <div className="btn-border-wrap">
                  <Link href="/courses" className="btn-slide-hover">
                    Explore Services
                    <IconArrowRight size={16} />
                  </Link>
                </div>
                <Link href="/about" className="btn-premium-secondary">
                  Our Story
                  <IconArrowUpRight size={14} />
                </Link>
              </div>

              {/* Cursor Badge (Floating David) */}
              <div 
                className={`flex items-center gap-2 mt-12 transition-all duration-1000 delay-500 ${
                  typingFinished ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
              >
                {/* Custom pointer arrow */}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-brand-teal-500 shrink-0">
                  <path d="M4 2L17 8.5L10 11.5L7 18.5L4 2Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                </svg>
                <span className="bg-brand-teal-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-full shadow-sm">
                  Ashish Garg (CEO)
                </span>
              </div>
            </div>

            {/* Right Column: Orbit Visualisation */}
            <div className="lg:col-span-6 flex justify-center items-center relative min-h-[500px] lg:min-h-[640px] z-0 overflow-visible">
              <div className="scale-[0.6] sm:scale-[0.75] md:scale-[0.85] lg:scale-[0.7] xl:scale-[0.8] orbit-container shrink-0 select-none pointer-events-none">
                {/* Orbit 4 (outermost) */}
                <div className="orbit-ring orbit-ring-4" />
                
                {/* Orbit 3 */}
                <div className="orbit-ring orbit-ring-3" />
                
                {/* Orbit 2 */}
                <div className="orbit-ring orbit-ring-2" />
                
                {/* Orbit 1 (innermost) */}
                <div className="orbit-ring orbit-ring-1" />

                {/* Innermost center circle */}
                <div className="absolute w-[200px] h-[200px] rounded-full bg-white border border-brand-teal-500/20 shadow-[0_10px_35px_-10px_rgba(5,38,38,0.1)] flex flex-col items-center justify-center z-25">
                  <span className="text-4xl md:text-5xl font-bold tracking-tight text-brand-teal-900 font-syne">
                    {counterValue}+
                  </span>
                  <span className="text-xs font-bold text-brand-charcoal/50 uppercase tracking-widest mt-1">
                    Specialists
                  </span>
                </div>

                {/* Avatar items placed on orbits */}
                {/* Orbit 1 */}
                <div 
                  className="absolute z-10 counter-rotate-1"
                  style={{
                    transform: 'translate(-50%, -50%) rotate(270deg) translate(177px) rotate(-270deg)'
                  }}
                >
                  <div className="w-[58px] h-[58px] rounded-[18px] border-2 border-brand-teal-500 shadow-[0_0_20px_rgba(42,166,166,0.3)] overflow-hidden bg-brand-seafoam">
                    <img src="https://polo-pecan-73837341.figma.site/_assets/v11/aa51718fb3af3637e6d666b6543fc27a175fada6.png" className="w-full h-full object-cover" alt="Expert" />
                  </div>
                </div>

                {/* Orbit 2 */}
                <div 
                  className="absolute z-10 counter-rotate-2"
                  style={{
                    transform: 'translate(-50%, -50%) rotate(60deg) translate(251px) rotate(-60deg)'
                  }}
                >
                  <div className="w-[58px] h-[58px] rounded-full border-2 border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.3)] overflow-hidden bg-brand-cream">
                    <img src="https://polo-pecan-73837341.figma.site/_assets/v11/ca755f7f93c1126fb8bdbf99ab364a33aa9ab272.png" className="w-full h-full object-cover" alt="Expert" />
                  </div>
                </div>

                <div 
                  className="absolute z-10 counter-rotate-2"
                  style={{
                    transform: 'translate(-50%, -50%) rotate(180deg) translate(251px) rotate(-180deg)'
                  }}
                >
                  <div className="w-[78px] h-[78px] rounded-full border-2 border-pink-400 shadow-[0_0_25px_rgba(244,114,182,0.35)] overflow-hidden bg-brand-seafoam">
                    <img src="https://polo-pecan-73837341.figma.site/_assets/v11/dc01064c7093dcc32674876ee3cf5e41c4a485c6.png" className="w-full h-full object-cover" alt="Expert" />
                  </div>
                </div>

                <div 
                  className="absolute z-10 counter-rotate-2"
                  style={{
                    transform: 'translate(-50%, -50%) rotate(300deg) translate(251px) rotate(-300deg)'
                  }}
                >
                  <div className="w-[58px] h-[58px] rounded-[18px] border-2 border-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.3)] overflow-hidden bg-brand-cream">
                    <img src="https://polo-pecan-73837341.figma.site/_assets/v11/d5470a58b02388336141575048720f19a50de832.png" className="w-full h-full object-cover" alt="Expert" />
                  </div>
                </div>

                {/* Orbit 3 */}
                <div 
                  className="absolute z-10 counter-rotate-3"
                  style={{
                    transform: 'translate(-50%, -50%) rotate(130deg) translate(325px) rotate(-130deg)'
                  }}
                >
                  <div className="w-[88px] h-[88px] rounded-full border-2 border-pink-400 shadow-[0_0_30px_rgba(244,114,182,0.35)] overflow-hidden bg-brand-seafoam">
                    <img src="https://polo-pecan-73837341.figma.site/_assets/v11/018736aa5d0275c4ce56cfebaf2ae3007d81ca1e.png" className="w-full h-full object-cover" alt="Expert" />
                  </div>
                </div>

                {/* Orbit 4 */}
                <div 
                  className="absolute z-10 counter-rotate-4"
                  style={{
                    transform: 'translate(-50%, -50%) rotate(30deg) translate(399px) rotate(-30deg)'
                  }}
                >
                  <div className="w-[58px] h-[58px] rounded-full border-2 border-brand-teal-500 shadow-[0_0_20px_rgba(42,166,166,0.3)] overflow-hidden bg-brand-cream">
                    <img src="https://polo-pecan-73837341.figma.site/_assets/v11/c76d8a0b99676de31c014344bfaf75bad090758d.png" className="w-full h-full object-cover" alt="Expert" />
                  </div>
                </div>

                <div 
                  className="absolute z-10 counter-rotate-4"
                  style={{
                    transform: 'translate(-50%, -50%) rotate(95deg) translate(399px) rotate(-95deg)'
                  }}
                >
                  <div className="w-[88px] h-[88px] rounded-[24px] border-2 border-orange-400 shadow-[0_0_30px_rgba(251,146,60,0.35)] overflow-hidden bg-brand-seafoam">
                    <img src="https://polo-pecan-73837341.figma.site/_assets/v11/7b1b5f039de7b54cc9913e96c1923c3b15a157fa.png" className="w-full h-full object-cover" alt="Expert" />
                  </div>
                </div>

                <div 
                  className="absolute z-10 counter-rotate-4"
                  style={{
                    transform: 'translate(-50%, -50%) rotate(220deg) translate(399px) rotate(-220deg)'
                  }}
                >
                  <div className="w-[88px] h-[88px] rounded-[24px] border-2 border-pink-400 shadow-[0_0_30px_rgba(244,114,182,0.35)] overflow-hidden bg-brand-cream">
                    <img src="https://polo-pecan-73837341.figma.site/_assets/v11/9ae171d8895199349755c43fbff00e122221a027.png" className="w-full h-full object-cover" alt="Expert" />
                  </div>
                </div>

                <div 
                  className="absolute z-10 counter-rotate-4"
                  style={{
                    transform: 'translate(-50%, -50%) rotate(320deg) translate(399px) rotate(-320deg)'
                  }}
                >
                  <div className="w-[58px] h-[58px] rounded-full border-2 border-brand-teal-500 shadow-[0_0_20px_rgba(42,166,166,0.3)] overflow-hidden bg-brand-seafoam">
                    <img src="https://polo-pecan-73837341.figma.site/_assets/v11/926c9eb7b4bc1df846fa0e39f0b0dc3fefd80671.png" className="w-full h-full object-cover" alt="Expert" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LOGO MARQUEE STRIP ===== */}
      <section className="bg-brand-teal-900 py-10 relative overflow-hidden border-y border-brand-teal-700/30">
        <div className="max-w-[1200px] mx-auto px-6 mb-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-mint/60">
            Trusted by forward-thinking platforms and institutions worldwide
          </p>
        </div>
        <div className="marquee-container">
          <div className="marquee-content">
            {/* Repeated 4x for seamless scroll */}
            {[...Array(4)].map((_, groupIdx) => (
              <React.Fragment key={groupIdx}>
                {partnerLogos.map((logo, logoIdx) => (
                  <img
                    key={`${groupIdx}-${logoIdx}`}
                    src={logo}
                    alt="Partner Logo"
                    className="h-9 w-[137px] object-contain opacity-55 hover:opacity-100 transition-opacity duration-300 invert"
                  />
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY VAIDIK - VALUE PROPOSITIONS ===== */}
      <section className="py-24 bg-white relative">
        <div className="max-w-[1200px] mx-auto px-6">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-20">
              <span className="text-xs font-bold tracking-widest text-brand-teal-500 uppercase mb-3 block">
                Educational Innovation
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-teal-900 mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
                Scale Smarter, Deliver Faster
              </h2>
              <p className="text-brand-charcoal/70 text-base md:text-lg">
                We combine technical precision with expert content developers to provide high-dosage tutoring architectures, LMS module production, and WCAG compliance remediation.
              </p>
            </div>
          </ScrollReveal>

          {/* Staggered values layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueProps.map((prop, i) => (
              <ScrollReveal key={prop.title} delay={i * 100}>
                <div 
                  className={`premium-card p-8 md:p-10 flex flex-col justify-between h-full ${
                    i === 1 ? 'md:translate-y-6' : ''
                  }`}
                >
                  <div>
                    {/* Circle icon wrapper */}
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                      style={{ background: `${prop.accent}15` }}
                    >
                      <prop.icon size={24} color={prop.accent} />
                    </div>
                    
                    <h3 className="text-lg md:text-xl font-bold tracking-tight mb-3 text-brand-teal-900" style={{ fontFamily: 'var(--font-syne)' }}>
                      {prop.title}
                    </h3>
                    
                    <p className="text-brand-charcoal/70 text-sm leading-relaxed">
                      {prop.description}
                    </p>
                  </div>
                  
                  <div className="mt-8 pt-4 border-t border-black/5">
                    <Link href="/courses" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-teal-500 hover:gap-2.5 transition-all">
                      Read Solutions
                      <IconArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DETAILED FEATURES SECTION ===== */}
      <section className="py-24 bg-brand-cream relative">
        <div className="max-w-[1200px] mx-auto px-6">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-20">
              <span className="text-xs font-bold tracking-widest text-brand-teal-500 uppercase mb-3 block">
                Tailored Services
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-teal-900 mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
                Custom Learning Architectures
              </h2>
            </div>
          </ScrollReveal>

          {features.map((feat, i) => (
            <ScrollReveal key={feat.title} delay={100}>
              <div 
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 last:mb-0 ${
                  i % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image panel */}
                <div className={`lg:col-span-6 relative ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative rounded-[2rem] overflow-hidden shadow-lg border border-black/5 aspect-[4/3] bg-brand-seafoam/25">
                    <img
                      src={feat.image}
                      alt={feat.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>

                {/* Content panel */}
                <div className="lg:col-span-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 bg-brand-teal-500/10 text-brand-teal-500">
                    <feat.icon size={20} />
                  </div>
                  
                  <h3 className="text-2xl font-bold tracking-tight text-brand-teal-900 mb-4 font-syne">
                    {feat.title}
                  </h3>
                  
                  <p className="text-brand-charcoal/70 text-sm md:text-base leading-relaxed mb-6">
                    {feat.description}
                  </p>
                  
                  <ul className="flex flex-col gap-3 mb-8">
                    {feat.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-3 text-xs md:text-sm text-brand-charcoal/80">
                        <IconCheck size={14} className="text-brand-teal-500 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/courses" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-teal-700 hover:gap-3 transition-all">
                    Explore Solution
                    <IconArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <section className="py-24 bg-white relative">
        <div className="max-w-[1200px] mx-auto px-6">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold tracking-widest text-brand-teal-500 uppercase mb-3 block">
                Trusted Partners
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-teal-900 mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
                Client Success Stories
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="max-w-3xl mx-auto premium-card p-10 md:p-14 text-center md:text-left">
              {/* Quote marks */}
              <span className="text-5xl font-serif text-brand-teal-500/20 block mb-4 select-none">&ldquo;</span>
              
              <p className="text-lg md:text-xl font-medium leading-relaxed text-brand-teal-900 mb-8" style={{ fontFamily: 'var(--font-syne)' }}>
                {testimonials[activeTestimonial].quote}
              </p>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-6 border-t border-black/5">
                <div>
                  <h4 className="font-bold text-brand-teal-900 text-base">{testimonials[activeTestimonial].name}</h4>
                  <p className="text-xs text-brand-charcoal/60 mt-0.5">
                    {testimonials[activeTestimonial].role}, {testimonials[activeTestimonial].company}
                  </p>
                </div>

                {/* Dot selectors */}
                <div className="flex items-center gap-2.5 justify-center">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveTestimonial(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        activeTestimonial === idx ? 'w-8 bg-brand-teal-700' : 'w-2.5 bg-brand-teal-500/20 hover:bg-brand-teal-500/40'
                      }`}
                      aria-label={`Testimonial ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== B2B CONTEXT CTA PANEL ===== */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24 md:pb-32">
        <div 
          className="relative overflow-hidden rounded-[2.5rem] p-12 md:p-16 text-center lg:text-left flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10"
          style={{ background: 'linear-gradient(135deg, var(--vaidik-teal-900) 0%, var(--vaidik-teal-700) 100%)' }}
        >
          {/* Subtle decoration circles */}
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full blur-3xl opacity-10 bg-brand-mint" />
          <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full blur-3xl opacity-10 bg-brand-seafoam" />

          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              Ready to Accelerate
              <br />
              Your Education Platform?
            </h2>
            <p className="text-white/70 text-sm md:text-base leading-relaxed">
              Vaidik offers tailored solutions for universities, corporate LMS platforms, and AI datasets. Get in touch with our solutions design group today to evaluate how we can build custom curricula, high-dosage tutoring workflows, or compliant accessibility remediation frameworks.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap gap-4 justify-center lg:justify-end shrink-0">
            <div className="btn-border-wrap">
              <Link href="/contact" className="btn-slide-hover !bg-white !text-brand-teal-900 hover:!text-white">
                Get in Touch
                <IconArrowRight size={16} />
              </Link>
            </div>
            <Link href="/courses" className="btn-premium-secondary !bg-white/10 !border-white/10 !text-white hover:!bg-white/20">
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
