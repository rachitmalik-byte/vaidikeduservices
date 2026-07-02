'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { IconArrowRight, IconArrowUpRight } from '@/components/icons';

/* ─── Types ─── */
type ResourceCategory = 'All' | 'Articles' | 'Case Studies' | 'Tools' | 'Downloads';

interface Resource {
  id: number;
  category: Exclude<ResourceCategory, 'All'>;
  title: string;
  description: string;
  readingTime: string;
  date: string;
  accent: string;
  featured?: boolean;
}

/* ─── Resource Data ─── */
const resourcesData: Resource[] = [
  {
    id: 1,
    category: 'Articles',
    title: 'The Future of High-Dosage Tutoring: Evidence-Based Strategies for 2026',
    description:
      'A deep dive into the latest research on high-dosage tutoring models, examining how structured, frequent sessions produce measurably better outcomes for K-12 learners — and what institutions should know before scaling.',
    readingTime: '8 min read',
    date: 'Jun 28, 2026',
    accent: '#2AA6A6',
    featured: true,
  },
  {
    id: 2,
    category: 'Case Studies',
    title: 'How a University Reduced Content Development Time by 60%',
    description:
      'A large public university partnered with Vaidik to redesign 42 course modules using agile instructional design. This case study documents the process, challenges, and measurable outcomes.',
    readingTime: '12 min read',
    date: 'Jun 22, 2026',
    accent: '#0D5C5C',
  },
  {
    id: 3,
    category: 'Articles',
    title: 'WCAG 2.2 Compliance: A Practical Guide for EdTech Platforms',
    description:
      'Understand the key updates in WCAG 2.2, how they impact educational content, and a step-by-step remediation checklist your team can start using today.',
    readingTime: '6 min read',
    date: 'Jun 18, 2026',
    accent: '#5CC9B5',
  },
  {
    id: 4,
    category: 'Tools',
    title: 'Bloom\'s Taxonomy Assessment Alignment Tool',
    description:
      'An interactive tool that helps instructional designers map assessment items to cognitive levels in Bloom\'s Taxonomy. Ensure your assessments measure what matters.',
    readingTime: '3 min read',
    date: 'Jun 15, 2026',
    accent: '#7EDCCA',
  },
  {
    id: 5,
    category: 'Downloads',
    title: 'E-Book Publishing Specifications Checklist (PDF)',
    description:
      'A comprehensive pre-flight checklist for EPUB, MOBI, and PDF publishing — covering metadata, image specs, font embedding, DRM considerations, and distribution requirements.',
    readingTime: 'Download',
    date: 'Jun 10, 2026',
    accent: '#2AA6A6',
  },
  {
    id: 6,
    category: 'Case Studies',
    title: 'Building a 50,000-Item Question Bank for a National Testing Board',
    description:
      'Vaidik assembled a team of 30 subject-matter experts to develop, validate, and psychometrically analyze a question bank across five disciplines. Here\'s how we did it.',
    readingTime: '10 min read',
    date: 'Jun 5, 2026',
    accent: '#0D5C5C',
  },
  {
    id: 7,
    category: 'Articles',
    title: 'AI Data Annotation: Quality Metrics That Actually Matter',
    description:
      'Inter-annotator agreement, edge-case coverage, label consistency — cut through the noise and focus on the metrics that directly correlate with model performance.',
    readingTime: '7 min read',
    date: 'May 30, 2026',
    accent: '#5CC9B5',
  },
  {
    id: 8,
    category: 'Tools',
    title: 'Instructional Design Project Scope Calculator',
    description:
      'Estimate timelines, effort, and budgets for e-learning projects based on content type, interactivity level, and review cycles. Built from real project data.',
    readingTime: '2 min read',
    date: 'May 25, 2026',
    accent: '#2AA6A6',
  },
  {
    id: 9,
    category: 'Downloads',
    title: 'Accessibility Audit Template (Excel)',
    description:
      'A structured spreadsheet template for conducting WCAG 2.1/2.2 accessibility audits on digital learning content. Includes severity ratings, POUR mapping, and remediation tracking.',
    readingTime: 'Download',
    date: 'May 20, 2026',
    accent: '#7EDCCA',
  },
  {
    id: 10,
    category: 'Articles',
    title: 'Competency-Based Curriculum Design: From Theory to Implementation',
    description:
      'Moving beyond seat-time models, competency-based design focuses on measurable skills. This article walks through framework selection, competency mapping, and assessment integration.',
    readingTime: '9 min read',
    date: 'May 15, 2026',
    accent: '#0D5C5C',
  },
  {
    id: 11,
    category: 'Case Studies',
    title: 'Scaling K-12 Online Tutoring Across Three Time Zones',
    description:
      'A national tutoring provider needed to deliver consistent, high-quality sessions across the US. We share the scheduling, training, and technology architecture that made it work.',
    readingTime: '11 min read',
    date: 'May 10, 2026',
    accent: '#5CC9B5',
  },
  {
    id: 12,
    category: 'Downloads',
    title: 'Curriculum Mapping Template (Notion / PDF)',
    description:
      'A ready-to-use curriculum mapping template that connects standards, learning objectives, activities, and assessments in a single visual document.',
    readingTime: 'Download',
    date: 'May 5, 2026',
    accent: '#2AA6A6',
  },
];

/* ─── Filter Tabs ─── */
const filterTabs: ResourceCategory[] = ['All', 'Articles', 'Case Studies', 'Tools', 'Downloads'];

/* ─── Scroll Reveal ─── */
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
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, visible };
}

/* ─── Category Icon (inline SVG per category) ─── */
function CategoryIcon({ category, color }: { category: string; color: string }) {
  const size = 14;
  switch (category) {
    case 'Articles':
      return (
        <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
          <rect x="1" y="1" width="12" height="12" rx="2" stroke={color} strokeWidth="1.2" />
          <line x1="4" y1="5" x2="10" y2="5" stroke={color} strokeWidth="1" strokeLinecap="round" />
          <line x1="4" y1="7.5" x2="10" y2="7.5" stroke={color} strokeWidth="1" strokeLinecap="round" />
          <line x1="4" y1="10" x2="7.5" y2="10" stroke={color} strokeWidth="1" strokeLinecap="round" />
        </svg>
      );
    case 'Case Studies':
      return (
        <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
          <path d="M2 11V3C2 2.45 2.45 2 3 2H11C11.55 2 12 2.45 12 3V11C12 11.55 11.55 12 11 12H3C2.45 12 2 11.55 2 11Z" stroke={color} strokeWidth="1.2" />
          <polyline points="5,8 7,5 9,7 11,4" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      );
    case 'Tools':
      return (
        <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="3" stroke={color} strokeWidth="1.2" />
          <path d="M7 1V3M7 11V13M1 7H3M11 7H13" stroke={color} strokeWidth="1" strokeLinecap="round" />
        </svg>
      );
    case 'Downloads':
      return (
        <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
          <path d="M7 2V9M7 9L4.5 6.5M7 9L9.5 6.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 10V11C2 11.55 2.45 12 3 12H11C11.55 12 12 11.55 12 11V10" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

/* ─── Featured Card ─── */
function FeaturedCard({ resource }: { resource: Resource }) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="group relative rounded-3xl overflow-hidden light-sweep cursor-pointer"
      style={{
        background: 'linear-gradient(135deg, #0A3D3D 0%, #0D5C5C 40%, #2AA6A6 100%)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {/* Decorative elements */}
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(126,220,202,0.12)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(42,166,166,0.1)' }}
      />

      {/* Grid dots overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="featured-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.8" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#featured-dots)" />
        </svg>
      </div>

      <div className="relative z-10 p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16">
        <div className="flex-1">
          {/* Badge */}
          <div className="flex items-center gap-3 mb-6">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider"
              style={{
                background: 'rgba(126,220,202,0.15)',
                color: '#7EDCCA',
                border: '1px solid rgba(126,220,202,0.2)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              Featured
            </span>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: 'rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <CategoryIcon category={resource.category} color="rgba(255,255,255,0.7)" />
              {resource.category}
            </span>
          </div>

          {/* Title */}
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-white mb-4"
            style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)' }}
          >
            {resource.title}
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg leading-relaxed text-white/65 mb-8 max-w-2xl">
            {resource.description}
          </p>

          {/* Meta + CTA */}
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="#"
              className="magnetic-btn magnetic-btn-primary light-sweep !bg-white !text-[#0A3D3D] !shadow-lg hover:!shadow-xl group/btn"
            >
              Read Article
              <IconArrowRight
                size={18}
                className="transition-transform duration-300 group-hover/btn:translate-x-1"
              />
            </a>
            <div className="flex items-center gap-4 text-sm text-white/50">
              <span>{resource.readingTime}</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span>{resource.date}</span>
            </div>
          </div>
        </div>

        {/* Abstract Visual Block */}
        <div className="hidden lg:flex flex-shrink-0 w-64 h-64 items-center justify-center">
          <div className="relative">
            <div
              className="w-48 h-48 rounded-3xl rotate-12 transition-transform duration-700 group-hover:rotate-6"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
              }}
            />
            <div
              className="absolute top-4 left-4 w-48 h-48 rounded-3xl -rotate-6 transition-transform duration-700 group-hover:rotate-0"
              style={{
                background: 'rgba(126,220,202,0.08)',
                border: '1px solid rgba(126,220,202,0.15)',
                backdropFilter: 'blur(8px)',
              }}
            />
            <div
              className="absolute top-8 left-8 w-48 h-48 rounded-3xl -rotate-12 flex items-center justify-center transition-transform duration-700 group-hover:-rotate-3"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect x="6" y="6" width="36" height="36" rx="8" stroke="rgba(126,220,202,0.4)" strokeWidth="1.5" />
                <line x1="14" y1="18" x2="34" y2="18" stroke="rgba(126,220,202,0.3)" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="14" y1="24" x2="30" y2="24" stroke="rgba(126,220,202,0.3)" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="14" y1="30" x2="26" y2="30" stroke="rgba(126,220,202,0.3)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Resource Card ─── */
function ResourceCard({
  resource,
  index,
  size = 'normal',
}: {
  resource: Resource;
  index: number;
  size?: 'normal' | 'tall';
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className={`group relative rounded-2xl overflow-hidden glass-card light-sweep cursor-pointer ${
        size === 'tall' ? 'md:row-span-2' : ''
      }`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(36px)',
        transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 60}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 h-[2.5px] transition-all duration-500"
        style={{
          width: hovered ? '100%' : '30%',
          background: `linear-gradient(90deg, ${resource.accent}, transparent)`,
        }}
      />

      {/* Hover glow */}
      <div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl transition-opacity duration-600 pointer-events-none"
        style={{ background: resource.accent, opacity: hovered ? 0.06 : 0 }}
      />

      <div className="relative p-6 sm:p-7 flex flex-col h-full">
        {/* Category + Date Row */}
        <div className="flex items-center justify-between mb-5">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide"
            style={{
              background: `${resource.accent}12`,
              color: resource.accent,
              border: `1px solid ${resource.accent}20`,
            }}
          >
            <CategoryIcon category={resource.category} color={resource.accent} />
            {resource.category}
          </span>
          <span className="text-xs" style={{ color: '#9B9B9B' }}>
            {resource.date}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-lg sm:text-xl font-bold leading-snug mb-3 transition-colors duration-300"
          style={{
            fontFamily: 'var(--font-syne, Syne, sans-serif)',
            color: hovered ? '#0D5C5C' : '#0A3D3D',
          }}
        >
          {resource.title}
        </h3>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-6 flex-grow"
          style={{ color: '#4A4A4A' }}
        >
          {resource.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-md"
            style={{ background: '#F7FAFA', color: '#4A4A4A' }}
          >
            {resource.readingTime}
          </span>
          <span
            className="inline-flex items-center gap-1 text-sm font-semibold transition-all duration-300"
            style={{ color: resource.accent }}
          >
            {resource.category === 'Downloads' ? 'Download' : 'Read More'}
            <IconArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Page Component ─── */
export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState<ResourceCategory>('All');
  const [visibleCount, setVisibleCount] = useState(6);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const featuredResource = resourcesData.find((r) => r.featured)!;

  const filteredResources = (
    activeTab === 'All'
      ? resourcesData.filter((r) => !r.featured)
      : resourcesData.filter((r) => r.category === activeTab && !r.featured)
  );

  const visibleResources = filteredResources.slice(0, visibleCount);
  const hasMore = visibleCount < filteredResources.length;

  const handleTabChange = useCallback((tab: ResourceCategory) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(tab);
      setVisibleCount(6);
      setIsTransitioning(false);
    }, 200);
  }, []);

  return (
    <main className="min-h-screen" style={{ background: '#F7FAFA' }}>
      {/* ──────── Hero ──────── */}
      <section
        className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20"
        style={{
          background: 'linear-gradient(165deg, #0A3D3D 0%, #0D5C5C 35%, #2AA6A6 70%, #5CC9B5 100%)',
        }}
      >
        {/* Orbs */}
        <div
          className="absolute top-20 left-[15%] w-60 h-60 rounded-full blur-3xl animate-float pointer-events-none"
          style={{ background: 'rgba(92,201,181,0.12)' }}
        />
        <div
          className="absolute bottom-10 right-[8%] w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(42,166,166,0.08)' }}
        />

        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="hero-grid" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M48 0H0V48" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>

        <div className="section-container relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-8 opacity-70">
            <a href="/" className="text-white/80 hover:text-white transition-colors">Home</a>
            <span className="text-white/40">/</span>
            <span className="text-white">Resources</span>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-5"
            style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)' }}
          >
            <span className="text-white">Knowledge </span>
            <span
              className="animate-gradient bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(135deg, #B8EDE3, #FFFFFF, #7EDCCA, #FFFFFF)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
              }}
            >
              Hub
            </span>
          </h1>
          <p className="text-base sm:text-lg max-w-2xl leading-relaxed text-white/70">
            Insights, guides, templates, and case studies from the Vaidik team —
            helping you make smarter decisions in education technology and
            instructional design.
          </p>
        </div>

        {/* Bottom Curve */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full h-[40px] sm:h-[60px]">
            <path d="M0 60L0 30C360 0 1080 0 1440 30L1440 60Z" fill="#F7FAFA" />
          </svg>
        </div>
      </section>

      {/* ──────── Featured Resource ──────── */}
      <section className="section-container -mt-2 mb-12 sm:mb-16">
        <FeaturedCard resource={featuredResource} />
      </section>

      {/* ──────── Filter Tabs ──────── */}
      <section className="section-container mb-10">
        <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap" style={{ scrollbarWidth: 'none' }}>
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab;
            const count =
              tab === 'All'
                ? resourcesData.filter((r) => !r.featured).length
                : resourcesData.filter((r) => r.category === tab && !r.featured).length;

            return (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className="relative flex items-center gap-2 whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border"
                style={{
                  background: isActive
                    ? 'linear-gradient(135deg, #0D5C5C, #2AA6A6)'
                    : 'rgba(255,255,255,0.7)',
                  color: isActive ? '#FFFFFF' : '#4A4A4A',
                  borderColor: isActive ? 'transparent' : 'rgba(0,0,0,0.06)',
                  boxShadow: isActive
                    ? '0 4px 16px rgba(42,166,166,0.25)'
                    : '0 1px 4px rgba(0,0,0,0.03)',
                }}
              >
                {tab}
                <span
                  className="text-xs font-semibold px-1.5 py-0.5 rounded-full"
                  style={{
                    background: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.05)',
                    color: isActive ? '#FFFFFF' : '#9B9B9B',
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ──────── Resources Grid (Asymmetric Masonry) ──────── */}
      <section className="section-container pb-8">
        <div
          className="transition-opacity duration-200"
          style={{ opacity: isTransitioning ? 0 : 1 }}
        >
          {visibleResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-7 auto-rows-auto">
              {visibleResources.map((resource, idx) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  index={idx}
                  size={idx === 0 || idx === 5 ? 'tall' : 'normal'}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: 'rgba(42,166,166,0.08)' }}
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect x="4" y="4" width="24" height="24" rx="6" stroke="#2AA6A6" strokeWidth="1.5" />
                  <line x1="10" y1="13" x2="22" y2="13" stroke="#2AA6A6" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="10" y1="18" x2="18" y2="18" stroke="#2AA6A6" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-lg font-semibold" style={{ color: '#0A3D3D' }}>
                No resources found
              </p>
              <p className="text-sm mt-2" style={{ color: '#9B9B9B' }}>
                No resources match this category yet — check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ──────── Load More ──────── */}
      {hasMore && (
        <section className="section-container flex justify-center pb-24 sm:pb-32">
          <button
            onClick={() => setVisibleCount((c) => c + 6)}
            className="magnetic-btn magnetic-btn-secondary light-sweep group/btn"
          >
            Load More Resources
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              className="transition-transform duration-300 group-hover/btn:translate-y-0.5"
            >
              <path
                d="M9 4V14M9 14L5 10M9 14L13 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </section>
      )}

      {/* ──────── Newsletter CTA ──────── */}
      <section className="section-container pb-24 sm:pb-32">
        <div
          className="relative overflow-hidden rounded-3xl p-10 sm:p-14 lg:p-16"
          style={{
            background: 'linear-gradient(135deg, #0A3D3D 0%, #0D5C5C 50%, #2AA6A6 100%)',
          }}
        >
          {/* Decorative */}
          <div
            className="absolute -right-12 -top-12 w-56 h-56 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'rgba(126,220,202,0.15)' }}
          />
          <div
            className="absolute -left-8 -bottom-8 w-44 h-44 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'rgba(92,201,181,0.1)' }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16">
            <div className="flex-1">
              <h2
                className="text-2xl sm:text-3xl font-bold text-white mb-3"
                style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)' }}
              >
                Stay ahead in EdTech
              </h2>
              <p className="text-base text-white/65 max-w-md">
                Get monthly insights on instructional design, accessibility,
                content strategy, and education technology — no spam, ever.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 lg:w-72 px-5 py-3.5 rounded-xl text-sm outline-none transition-all duration-300 focus:ring-2"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255,255,255,0.15)',
                  caretColor: '#7EDCCA',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(126,220,202,0.5)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.14)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                }}
              />
              <button className="magnetic-btn magnetic-btn-primary light-sweep !bg-white !text-[#0A3D3D] !px-7">
                Subscribe
                <IconArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
