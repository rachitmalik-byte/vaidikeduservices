'use client';

import React, { useState, useRef, useEffect } from 'react';
import { IconArrowRight, IconArrowUpRight } from '@/components/icons';

/* ─── Service Data ─── */
const categories = [
  'All',
  'Online Tutoring',
  'Content Development',
  'Instructional Design',
  'Curriculum Development',
  'Assessment Development',
  'E-Book Publishing',
  'Accessibility Services',
  'AI Data Solutions',
] as const;

type Category = (typeof categories)[number];

interface Service {
  id: number;
  category: Category;
  title: string;
  description: string;
  features: string[];
  accent: string;
  accentBg: string;
}

const services: Service[] = [
  {
    id: 1,
    category: 'Online Tutoring',
    title: 'Online Tutoring Services',
    description:
      'Personalized, one-on-one and group tutoring sessions for K-12 students and higher education learners. Our High-Dosage Tutoring model accelerates outcomes through frequent, structured sessions with expert educators.',
    features: [
      'K-12 Subject Tutoring',
      'Higher Education Support',
      'High-Dosage Tutoring (HDT)',
      'Live Interactive Sessions',
      'Progress Tracking & Reports',
    ],
    accent: '#2AA6A6',
    accentBg: 'rgba(42, 166, 166, 0.08)',
  },
  {
    id: 2,
    category: 'Content Development',
    title: 'Educational Content Solutions',
    description:
      'Custom educational content designed to align with curricula standards and learning objectives. From interactive multimedia modules to written courseware, we create engaging materials that drive measurable learning outcomes.',
    features: [
      'Custom Content Creation',
      'Curriculum-Aligned Materials',
      'Multimedia & Interactive Content',
      'Storyboarding & Scripting',
      'Quality Assurance & Review',
    ],
    accent: '#5CC9B5',
    accentBg: 'rgba(92, 201, 181, 0.08)',
  },
  {
    id: 3,
    category: 'Instructional Design',
    title: 'Instructional Design Services',
    description:
      'Evidence-based instructional design that transforms complex subject matter into compelling e-learning experiences. We build LMS-compatible modules using ADDIE, SAM, and agile methodologies.',
    features: [
      'E-Learning Module Design',
      'LMS-Based Course Development',
      'Interactive Simulations',
      'ADDIE & SAM Frameworks',
      'Learner Experience (LX) Design',
    ],
    accent: '#0D5C5C',
    accentBg: 'rgba(13, 92, 92, 0.08)',
  },
  {
    id: 4,
    category: 'Curriculum Development',
    title: 'Curriculum Development',
    description:
      'End-to-end curriculum frameworks for K-12 institutions, higher education programs, and corporate training. We conduct needs assessments, map competencies, and build scalable learning pathways.',
    features: [
      'Needs Assessment & Analysis',
      'Content Planning & Mapping',
      'K-12 through Corporate',
      'Competency-Based Frameworks',
      'Continuous Improvement Cycles',
    ],
    accent: '#7EDCCA',
    accentBg: 'rgba(126, 220, 202, 0.08)',
  },
  {
    id: 5,
    category: 'Assessment Development',
    title: 'Assessment Development',
    description:
      'Rigorous assessment solutions including question bank creation, item analysis, and psychometric validation. We design MCQ, essay, scenario-based, and performance assessments aligned to Bloom\'s Taxonomy.',
    features: [
      'Question Bank Development',
      'MCQ, Essay & Scenario Items',
      'Item Analysis & Validation',
      'Bloom\'s Taxonomy Alignment',
      'Formative & Summative Design',
    ],
    accent: '#2AA6A6',
    accentBg: 'rgba(42, 166, 166, 0.08)',
  },
  {
    id: 6,
    category: 'E-Book Publishing',
    title: 'E-Book Publishing Services',
    description:
      'Transform your manuscripts and educational materials into polished digital publications. We handle EPUB, MOBI, and PDF conversion with professional cover design, formatting, and distribution support.',
    features: [
      'EPUB / MOBI / PDF Conversion',
      'Professional Cover Design',
      'Interior Layout & Formatting',
      'Distribution & Publishing',
      'ISBN Registration Support',
    ],
    accent: '#5CC9B5',
    accentBg: 'rgba(92, 201, 181, 0.08)',
  },
  {
    id: 7,
    category: 'Accessibility Services',
    title: 'Accessibility Services',
    description:
      'Make your digital content universally accessible. We ensure compliance with WCAG 2.1/2.2 and ADA standards through remediation, screen reader optimization, and inclusive design audits.',
    features: [
      'WCAG 2.1 / 2.2 Compliance',
      'ADA Conformance Audits',
      'Screen Reader Optimization',
      'Alt Text & Captioning',
      'Inclusive Design Consulting',
    ],
    accent: '#0D5C5C',
    accentBg: 'rgba(13, 92, 92, 0.08)',
  },
  {
    id: 8,
    category: 'AI Data Solutions',
    title: 'AI Data Solutions',
    description:
      'High-quality data annotation, labeling, and validation services that fuel AI and machine learning models. Our trained annotators deliver accurate, consistent datasets across text, image, audio, and video domains.',
    features: [
      'Data Annotation & Labeling',
      'Text / Image / Audio / Video',
      'Model Validation & QA',
      'Custom Taxonomy Creation',
      'Scalable Workforce Solutions',
    ],
    accent: '#7EDCCA',
    accentBg: 'rgba(126, 220, 202, 0.08)',
  },
];

/* ─── Scroll‑Reveal Hook ─── */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, visible };
}

/* ─── Service Card ─── */
function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={ref}
      className="group relative rounded-2xl overflow-hidden glass-card light-sweep cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 80}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Accent Line */}
      <div
        className="absolute top-0 left-0 h-[3px] transition-all duration-500"
        style={{
          width: isHovered ? '100%' : '40%',
          background: `linear-gradient(90deg, ${service.accent}, transparent)`,
        }}
      />

      {/* Hover Glow */}
      <div
        className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl transition-opacity duration-700 pointer-events-none"
        style={{
          background: service.accent,
          opacity: isHovered ? 0.08 : 0,
        }}
      />

      <div className="relative p-7 sm:p-8 flex flex-col h-full min-h-[360px]">
        {/* Category Badge */}
        <span
          className="inline-flex self-start items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase mb-5"
          style={{
            background: service.accentBg,
            color: service.accent,
            border: `1px solid ${service.accent}22`,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: service.accent }}
          />
          {service.category}
        </span>

        {/* Title */}
        <h3
          className="text-xl sm:text-2xl font-bold leading-tight mb-3"
          style={{
            fontFamily: 'var(--font-syne, Syne, sans-serif)',
            color: '#0A3D3D',
          }}
        >
          {service.title}
        </h3>

        {/* Description */}
        <p
          className="text-sm sm:text-[0.9375rem] leading-relaxed mb-6"
          style={{ color: '#4A4A4A' }}
        >
          {service.description}
        </p>

        {/* Features */}
        <ul className="flex flex-col gap-2.5 mb-8 flex-grow">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm" style={{ color: '#4A4A4A' }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="mt-0.5 shrink-0"
              >
                <circle cx="8" cy="8" r="7" stroke={service.accent} strokeWidth="1.5" fill="none" />
                <polyline
                  points="5,8 7,10 11,6"
                  stroke={service.accent}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button
          className="magnetic-btn magnetic-btn-secondary self-start !py-2.5 !px-5 text-sm group/btn"
          style={{
            borderColor: `${service.accent}44`,
            color: service.accent,
          }}
        >
          <span>Learn More</span>
          <IconArrowRight
            size={16}
            className="transition-transform duration-300 group-hover/btn:translate-x-1"
          />
        </button>
      </div>
    </div>
  );
}

/* ─── Category Pill ─── */
function CategoryPill({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="relative whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border"
      style={{
        background: isActive
          ? 'linear-gradient(135deg, #0D5C5C, #2AA6A6)'
          : 'rgba(255,255,255,0.6)',
        color: isActive ? '#FFFFFF' : '#4A4A4A',
        borderColor: isActive ? 'transparent' : 'rgba(0,0,0,0.08)',
        boxShadow: isActive
          ? '0 4px 16px rgba(42,166,166,0.25)'
          : '0 1px 4px rgba(0,0,0,0.04)',
        transform: isActive ? 'scale(1.04)' : 'scale(1)',
      }}
    >
      {label}
    </button>
  );
}

/* ─── Page Component ─── */
export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const filterBarRef = useRef<HTMLDivElement>(null);

  const filteredServices =
    activeCategory === 'All'
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <main className="min-h-screen" style={{ background: '#F7FAFA' }}>
      {/* ──────── Hero Mini-Header ──────── */}
      <section
        className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20"
        style={{
          background: 'linear-gradient(165deg, #0A3D3D 0%, #0D5C5C 35%, #2AA6A6 70%, #5CC9B5 100%)',
        }}
      >
        {/* Decorative Orbs */}
        <div
          className="absolute top-10 right-[10%] w-72 h-72 rounded-full blur-3xl animate-float pointer-events-none"
          style={{ background: 'rgba(126,220,202,0.15)' }}
        />
        <div
          className="absolute bottom-0 left-[5%] w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(42,166,166,0.1)' }}
        />

        {/* Grid Dots Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div className="section-container relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-8 opacity-70">
            <a href="/" className="text-white/80 hover:text-white transition-colors">Home</a>
            <span className="text-white/40">/</span>
            <span className="text-white">Services</span>
          </div>

          {/* Heading */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-5"
            style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)' }}
          >
            <span className="text-white">Our </span>
            <span
              className="animate-gradient bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(135deg, #B8EDE3, #FFFFFF, #7EDCCA, #FFFFFF)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
              }}
            >
              Services
            </span>
          </h1>
          <p
            className="text-base sm:text-lg max-w-2xl leading-relaxed text-white/75"
          >
            Comprehensive education solutions spanning tutoring, content creation,
            instructional design, and AI — crafted to elevate every stage of the
            learning journey.
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-8 mt-10">
            {[
              { number: '8+', label: 'Service Lines' },
              { number: '500+', label: 'Projects Delivered' },
              { number: '98%', label: 'Client Satisfaction' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span
                  className="text-3xl font-bold"
                  style={{ color: '#7EDCCA', fontFamily: 'var(--font-syne, Syne, sans-serif)' }}
                >
                  {stat.number}
                </span>
                <span className="text-sm text-white/60 mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Curve */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-[40px] sm:h-[60px]">
            <path d="M0 60L0 30C360 0 1080 0 1440 30L1440 60Z" fill="#F7FAFA" />
          </svg>
        </div>
      </section>

      {/* ──────── Filter Bar ──────── */}
      <section className="section-container py-8 sm:py-12">
        <div
          ref={filterBarRef}
          className="flex gap-3 overflow-x-auto pb-4 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center"
          style={{ scrollbarWidth: 'none' }}
        >
          {categories.map((cat) => (
            <CategoryPill
              key={cat}
              label={cat}
              isActive={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </div>
      </section>

      {/* ──────── Services Grid ──────── */}
      <section className="section-container pb-24 sm:pb-32">
        {/* Results Count */}
        <p className="text-sm mb-8" style={{ color: '#9B9B9B' }}>
          Showing{' '}
          <span className="font-semibold" style={{ color: '#0D5C5C' }}>
            {filteredServices.length}
          </span>{' '}
          {filteredServices.length === 1 ? 'service' : 'services'}
          {activeCategory !== 'All' && (
            <>
              {' '}in{' '}
              <span className="font-semibold" style={{ color: '#0D5C5C' }}>
                {activeCategory}
              </span>
            </>
          )}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {filteredServices.map((service, idx) => (
            <ServiceCard key={service.id} service={service} index={idx} />
          ))}
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
              style={{ background: 'rgba(42,166,166,0.08)' }}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="14" cy="14" r="10" stroke="#2AA6A6" strokeWidth="2" />
                <line x1="22" y1="22" x2="28" y2="28" stroke="#2AA6A6" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-lg font-semibold" style={{ color: '#0A3D3D' }}>
              No services found
            </p>
            <p className="text-sm mt-2" style={{ color: '#9B9B9B' }}>
              Try selecting a different category
            </p>
          </div>
        )}
      </section>

      {/* ──────── CTA Banner ──────── */}
      <section className="section-container pb-24 sm:pb-32">
        <div
          className="relative overflow-hidden rounded-3xl p-10 sm:p-16"
          style={{
            background: 'linear-gradient(135deg, #0A3D3D 0%, #0D5C5C 40%, #2AA6A6 100%)',
          }}
        >
          {/* Decorative circle */}
          <div
            className="absolute -right-16 -top-16 w-64 h-64 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'rgba(92,201,181,0.2)' }}
          />
          <div
            className="absolute -left-8 -bottom-8 w-48 h-48 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'rgba(126,220,202,0.12)' }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3"
                style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)' }}
              >
                Ready to transform your
                <br />
                education programs?
              </h2>
              <p className="text-base text-white/70 max-w-lg">
                Let&apos;s discuss how Vaidik Eduservices can help you achieve your
                learning and development goals.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/contact"
                className="magnetic-btn magnetic-btn-primary light-sweep !bg-white !text-[#0A3D3D] !shadow-lg hover:!shadow-xl"
              >
                Get in Touch
                <IconArrowRight size={18} />
              </a>
              <a
                href="/about"
                className="magnetic-btn magnetic-btn-secondary !border-white/30 !text-white hover:!bg-white/10"
              >
                Learn About Us
                <IconArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
