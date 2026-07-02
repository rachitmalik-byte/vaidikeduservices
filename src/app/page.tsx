'use client';

import React, { Suspense, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ui/ScrollReveal';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
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

import SvgWaves from '@/components/layout/SvgWaves';

/* ===== VALUE PROPS DATA ===== */
const valueProps = [
  {
    icon: IconExpertInstructors,
    title: 'Expert Instructors',
    description: 'Learn from industry professionals and subject matter experts with years of hands-on experience.',
    accent: '#2AA6A6',
  },
  {
    icon: IconFlexibleLearning,
    title: 'Flexible Learning',
    description: 'Learn anytime, anywhere at your own schedule. Our solutions adapt to your pace and preferences.',
    accent: '#5CC9B5',
  },
  {
    icon: IconCareerAdvancement,
    title: 'Career Advancement',
    description: 'Gain skills that help you grow professionally. Our programs are designed to accelerate your career.',
    accent: '#7EDCCA',
  },
];

/* ===== FEATURES DATA ===== */
const features = [
  {
    icon: IconOnlineCourses,
    title: 'Online Courses',
    description: 'Comprehensive digital learning experiences designed by instructional design experts. Interactive, engaging, and results-driven.',
    image: '/images/online-learning.png',
    points: ['Interactive e-learning modules', 'Self-paced curriculum', 'Real-time progress tracking'],
  },
  {
    icon: IconMentorship,
    title: 'Expert Mentorship',
    description: 'Connect with seasoned professionals who guide your educational journey. Personalized attention that makes the difference.',
    image: '/images/expert-mentors.png',
    points: ['1-on-1 guidance sessions', 'Industry expert mentors', 'Customized learning paths'],
  },
  {
    icon: IconSkills,
    title: 'Skill Development',
    description: 'Build practical, in-demand skills through hands-on projects and real-world applications. Future-proof your capabilities.',
    image: '/images/skill-development.png',
    points: ['Hands-on project work', 'Industry-relevant skills', 'Certification programs'],
  },
];

/* ===== STATS DATA ===== */
const stats = [
  { value: 500, suffix: '+', label: 'Clients Worldwide' },
  { value: 25, suffix: '+', label: 'Countries Served' },
  { value: 400, suffix: '+', label: 'Expert Team Members' },
  { value: 6, suffix: '+', label: 'Years of Excellence' },
];

/* ===== TESTIMONIALS DATA ===== */
const testimonials = [
  {
    quote: 'Vaidik transformed our entire e-learning infrastructure. The quality of their instructional design is unmatched in the industry.',
    name: 'Sarah Mitchell',
    role: 'Director of Learning',
    company: 'TechEd Solutions',
  },
  {
    quote: 'Their team understood our requirements perfectly and delivered content that exceeded our expectations. Truly a world-class partner.',
    name: 'James Chen',
    role: 'VP of Education',
    company: 'GlobalLearn Inc.',
  },
  {
    quote: 'The accessibility services from Vaidik helped us achieve full WCAG compliance across our entire platform. Outstanding work.',
    name: 'Priya Sharma',
    role: 'Product Manager',
    company: 'EduPlatform',
  },
];

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <main>
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: '#F7FAFA' }}>
        {/* Svg Background Waves */}
        <SvgWaves />

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[1320px] mx-auto" style={{ paddingLeft: 'clamp(1.5rem, 4vw, 4rem)', paddingRight: 'clamp(1.5rem, 4vw, 4rem)' }}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-screen py-32">
            {/* Left: Typography */}
            <div>
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase mb-8 animate-fade-in"
                style={{
                  background: 'rgba(42, 166, 166, 0.08)',
                  color: '#2AA6A6',
                  border: '1px solid rgba(42, 166, 166, 0.15)',
                  animationDelay: '200ms',
                  animationFillMode: 'backwards',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#2AA6A6' }} />
                Innovate. Educate. Elevate.
              </div>

              {/* Heading */}
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 animate-fade-in-up"
                style={{
                  fontFamily: 'var(--font-syne)',
                  color: '#0A3D3D',
                  animationDelay: '400ms',
                  animationFillMode: 'backwards',
                }}
              >
                Learn Smarter,
                <br />
                <span
                  className="bg-gradient-to-r from-[#2AA6A6] to-[#5CC9B5] bg-clip-text text-transparent"
                >
                  Grow Faster.
                </span>
              </h1>

              {/* Subtitle */}
              <p
                className="text-lg md:text-xl leading-relaxed mb-10 max-w-lg animate-fade-in-up"
                style={{
                  color: '#4A4A4A',
                  animationDelay: '600ms',
                  animationFillMode: 'backwards',
                }}
              >
                Empowering learners with innovative education for a brighter future. 
                Custom educational solutions that transform organizations.
              </p>

              {/* CTAs */}
              <div
                className="flex flex-wrap items-center gap-4 animate-fade-in-up"
                style={{ animationDelay: '800ms', animationFillMode: 'backwards' }}
              >
                <Link href="/courses" className="btn-premium-primary group">
                  Explore Services
                  <IconArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link href="/about" className="btn-premium-secondary group">
                  Our Story
                  <IconArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>

            {/* Right: Hero Image with Glassmorphic Overlay */}
            <div
              className="relative animate-fade-in-up hidden lg:block"
              style={{ animationDelay: '600ms', animationFillMode: 'backwards' }}
            >
              <div className="relative">
                {/* Main image */}
                <div
                  className="relative rounded-3xl overflow-hidden"
                  style={{ boxShadow: '0 20px 60px rgba(10, 61, 61, 0.15)' }}
                >
                  <Image
                    src="/images/hero-student.png"
                    alt="Student learning with Vaidik Edu"
                    width={600}
                    height={500}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>

                {/* Floating glassmorphic card */}
                <div
                  className="absolute -bottom-6 -left-6 glass-card rounded-2xl p-5 max-w-[220px] animate-float"
                  style={{ animationDelay: '1s' }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(42, 166, 166, 0.1)' }}
                    >
                      <IconExpertInstructors size={20} className="text-[#2AA6A6]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold" style={{ color: '#1A1A1A' }}>500+</div>
                      <div className="text-xs" style={{ color: '#9B9B9B' }}>Global Clients</div>
                    </div>
                  </div>
                </div>

                {/* Second floating card */}
                <div
                  className="absolute -top-4 -right-4 glass-card rounded-2xl p-4 animate-float"
                  style={{ animationDelay: '2s' }}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {['#2AA6A6', '#5CC9B5', '#7EDCCA'].map((color, i) => (
                        <div
                          key={i}
                          className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold"
                          style={{ background: color }}
                        >
                          {['A', 'B', 'C'][i]}
                        </div>
                      ))}
                    </div>
                    <div className="ml-1">
                      <div className="text-xs font-bold" style={{ color: '#1A1A1A' }}>25+ Countries</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
            <span className="text-xs tracking-widest uppercase" style={{ color: '#4A4A4A' }}>Scroll</span>
            <div
              className="w-6 h-10 rounded-full border-2 flex justify-center pt-2"
              style={{ borderColor: 'rgba(42, 166, 166, 0.3)' }}
            >
              <div
                className="w-1 h-2.5 rounded-full"
                style={{
                  background: '#2AA6A6',
                  animation: 'scroll-indicator 2s ease-in-out infinite',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== VALUE PROPOSITIONS ===== */}
      <section className="section-padding" style={{ background: '#FFFFFF' }}>
        <div className="section-container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span
                className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full"
                style={{ color: '#2AA6A6', background: 'rgba(42,166,166,0.06)' }}
              >
                Why Vaidik
              </span>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                style={{ fontFamily: 'var(--font-syne)', color: '#1A1A1A' }}
              >
                Education, Reimagined
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: '#4A4A4A' }}>
                We combine deep educational expertise with cutting-edge technology to deliver solutions that truly make a difference.
              </p>
            </div>
          </ScrollReveal>

          {/* Cards Grid - Irregular/broken grid */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {valueProps.map((prop, i) => (
              <ScrollReveal key={prop.title} delay={i * 150} direction="up">
                <div
                  className={`premium-card p-8 lg:p-10 cursor-pointer flex flex-col justify-between ${
                    i === 1 ? 'md:translate-y-6' : ''
                  }`}
                >
                  {/* Glow background on hover */}
                  <div
                    className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                    style={{ background: prop.accent }}
                  />

                  <div className="relative">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110"
                      style={{ background: `${prop.accent}15` }}
                    >
                      <prop.icon size={28} className="transition-colors duration-300" color={prop.accent} />
                    </div>

                    <h3
                      className="text-xl font-bold mb-3"
                      style={{ fontFamily: 'var(--font-syne)', color: '#1A1A1A' }}
                    >
                      {prop.title}
                    </h3>

                    <p className="text-[0.9375rem] leading-relaxed" style={{ color: '#4A4A4A' }}>
                      {prop.description}
                    </p>

                    {/* Learn more link */}
                    <div
                      className="flex items-center gap-1.5 mt-6 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0"
                      style={{ color: prop.accent }}
                    >
                      Learn more
                      <IconArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="section-padding" style={{ background: '#F7FAFA' }}>
        <div className="section-container">
          <ScrollReveal>
            <div className="text-center mb-20">
              <span
                className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full"
                style={{ color: '#2AA6A6', background: 'rgba(42,166,166,0.06)' }}
              >
                What We Offer
              </span>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold"
                style={{ fontFamily: 'var(--font-syne)', color: '#1A1A1A' }}
              >
                Comprehensive Solutions
              </h2>
            </div>
          </ScrollReveal>

          {features.map((feature, i) => (
            <ScrollReveal key={feature.title} delay={0}>
              <div
                className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 last:mb-0 ${
                  i % 2 === 1 ? 'lg:[direction:rtl]' : ''
                }`}
              >
                {/* Image */}
                <div className={`relative ${i % 2 === 1 ? 'lg:[direction:ltr]' : ''}`}>
                  <div
                    className="relative rounded-3xl overflow-hidden group"
                    style={{ boxShadow: '0 16px 48px rgba(10, 61, 61, 0.1)' }}
                  >
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Overlay gradient */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: 'linear-gradient(to top, rgba(10,61,61,0.2), transparent)' }}
                    />
                  </div>
                  {/* Decorative element */}
                  <div
                    className="absolute -z-10 w-full h-full rounded-3xl top-4 left-4"
                    style={{ background: `rgba(42,166,166,0.06)`, border: '1px solid rgba(42,166,166,0.08)' }}
                  />
                </div>

                {/* Content */}
                <div className={`${i % 2 === 1 ? 'lg:[direction:ltr]' : ''}`}>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                    style={{ background: 'rgba(42,166,166,0.08)' }}
                  >
                    <feature.icon size={24} className="text-[#2AA6A6]" />
                  </div>

                  <h3
                    className="text-2xl md:text-3xl font-bold mb-4"
                    style={{ fontFamily: 'var(--font-syne)', color: '#1A1A1A' }}
                  >
                    {feature.title}
                  </h3>

                  <p className="text-base leading-relaxed mb-8" style={{ color: '#4A4A4A' }}>
                    {feature.description}
                  </p>

                  <ul className="flex flex-col gap-3 mb-8">
                    {feature.points.map((point) => (
                      <li key={point} className="flex items-center gap-3">
                        <div
                          className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                          style={{ background: 'rgba(42,166,166,0.1)' }}
                        >
                          <IconCheck size={12} className="text-[#2AA6A6]" />
                        </div>
                        <span className="text-sm font-medium" style={{ color: '#4A4A4A' }}>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 text-sm font-semibold group"
                    style={{ color: '#2AA6A6' }}
                  >
                    Explore Service
                    <IconArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0A3D3D 0%, #0D5C5C 50%, #2AA6A6 100%)' }}
      >
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="section-container relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 100}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-2" style={{ fontFamily: 'var(--font-syne)' }}>
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2500} />
                  </div>
                  <div className="text-white/60 text-sm font-medium tracking-wide">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section-padding" style={{ background: '#FFFFFF' }}>
        <div className="section-container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span
                className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full"
                style={{ color: '#2AA6A6', background: 'rgba(42,166,166,0.06)' }}
              >
                Testimonials
              </span>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold"
                style={{ fontFamily: 'var(--font-syne)', color: '#1A1A1A' }}
              >
                Trusted by Leaders
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="max-w-4xl mx-auto glass-card rounded-3xl p-8 md:p-12 border border-white/25 shadow-[0_12px_40px_rgba(10,61,61,0.05)] bg-white/75 backdrop-blur-md">
              {/* Quote */}
              <div className="relative mb-8">
                {/* Large quote mark */}
                <div
                  className="absolute -top-8 -left-4 text-8xl font-bold leading-none select-none"
                  style={{ color: 'rgba(42,166,166,0.12)', fontFamily: 'Georgia, serif' }}
                >
                  &ldquo;
                </div>

                <div className="relative">
                  <p
                    className="text-lg md:text-xl lg:text-2xl leading-relaxed font-medium transition-all duration-700"
                    style={{ fontFamily: 'var(--font-syne)', color: '#0A3D3D' }}
                  >
                    {testimonials[activeTestimonial].quote}
                  </p>
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ background: 'linear-gradient(135deg, #2AA6A6, #5CC9B5)' }}
                  >
                    {testimonials[activeTestimonial].name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-base" style={{ color: '#1A1A1A' }}>
                      {testimonials[activeTestimonial].name}
                    </div>
                    <div className="text-sm" style={{ color: '#9B9B9B' }}>
                      {testimonials[activeTestimonial].role}, {testimonials[activeTestimonial].company}
                    </div>
                  </div>
                </div>

                {/* Nav dots */}
                <div className="flex items-center gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTestimonial(i)}
                      className="transition-all duration-300"
                      style={{
                        width: activeTestimonial === i ? '32px' : '8px',
                        height: '8px',
                        borderRadius: '4px',
                        background: activeTestimonial === i ? '#2AA6A6' : 'rgba(42,166,166,0.2)',
                      }}
                      aria-label={`Testimonial ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: '#F7FAFA' }}
      >
        <div className="section-container relative">
          <ScrollReveal>
            <div
              className="relative rounded-[2rem] p-12 md:p-16 lg:p-20 overflow-hidden text-center"
              style={{
                background: 'linear-gradient(160deg, #0A3D3D 0%, #0D5C5C 40%, #2AA6A6 100%)',
              }}
            >
              {/* Decorative elements */}
              <div
                className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-15"
                style={{ background: 'radial-gradient(circle, #5CC9B5, transparent)' }}
              />
              <div
                className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full blur-3xl opacity-10"
                style={{ background: 'radial-gradient(circle, #7EDCCA, transparent)' }}
              />

              <div className="relative">
                <h2
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  Ready to Transform
                  <br />
                  Your Learning?
                </h2>
                <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
                  Partner with us to build world-class educational experiences. 
                  Let&apos;s discuss how Vaidik can elevate your organization.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/courses"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all duration-400 group hover:-translate-y-0.5"
                    style={{
                      background: 'white',
                      color: '#0D5C5C',
                      boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
                    }}
                  >
                    Explore Services
                    <IconArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all duration-400 group hover:-translate-y-0.5"
                    style={{
                      background: 'transparent',
                      color: 'white',
                      border: '2px solid rgba(255,255,255,0.3)',
                    }}
                  >
                    Contact Us
                    <IconArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
