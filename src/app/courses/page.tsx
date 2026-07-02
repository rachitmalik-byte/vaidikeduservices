'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { IconArrowRight, IconArrowUpRight, IconCheck } from '@/components/icons';

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
}

const services: Service[] = [
  {
    id: 1,
    category: 'Online Tutoring',
    title: 'Online Tutoring Services',
    description: 'Personalized, structured K-12 and higher education support. Our High-Dosage Tutoring (HDT) model accelerates learning outcomes through expert matching and frequent, data-driven sessions.',
    features: [
      'K-12 Subject Tutoring',
      'Higher Education Support',
      'High-Dosage Tutoring (HDT)',
      'Live Interactive Sessions',
      'Progress Tracking & Reports',
    ],
    accent: '#2AA6A6',
  },
  {
    id: 2,
    category: 'Content Development',
    title: 'Educational Content Solutions',
    description: 'Custom learning content aligned to standards and specific curricula. We build engaging multimedia, storyboards, and written courseware for modern digital formats.',
    features: [
      'Custom Content Creation',
      'Curriculum-Aligned Materials',
      'Multimedia & Interactive Assets',
      'Storyboarding & Scriptwriting',
      'Expert Subject Matter Review',
    ],
    accent: '#5CC9B5',
  },
  {
    id: 3,
    category: 'Instructional Design',
    title: 'Instructional Designing Services',
    description: 'Evidence-based design converting complex subjects into clear e-learning programs. We deliver LMS-compatible modules using ADDIE, SAM, and custom agile frameworks.',
    features: [
      'E-Learning Module Design',
      'LMS-Based Course Setup',
      'Interactive Simulations',
      'ADDIE & SAM Workflows',
      'Learner Experience (LX) Optimization',
    ],
    accent: '#0D5C5C',
  },
  {
    id: 4,
    category: 'Curriculum Development',
    title: 'Curriculum Development',
    description: 'End-to-end curriculum mapping for academic institutions and enterprise training. We identify needs, map competencies, and design cohesive learning pathways.',
    features: [
      'Needs Assessment & Analysis',
      'Content Planning & Mapping',
      'K-12 & Corporate Adaptations',
      'Competency-Based Pathways',
      'Quality & Review Frameworks',
    ],
    accent: '#7EDCCA',
  },
  {
    id: 5,
    category: 'Assessment Development',
    title: 'Assessment Development',
    description: 'Rigorous validation, psychometric structuring, and question bank development. We build scenario-based, multiple-choice, and open-ended testing systems.',
    features: [
      'Question Bank Development',
      'MCQ & Scenario Item Creation',
      'Item Analysis & Validation',
      'Bloom\'s Taxonomy Alignment',
      'Formative & Summative Designs',
    ],
    accent: '#2AA6A6',
  },
  {
    id: 6,
    category: 'E-Book Publishing',
    title: 'E-Book Publishing Services',
    description: 'Complete translation of educational materials into standard digital publications. We handle EPUB, MOBI, and PDF layout design, distribution setup, and ISBN registration.',
    features: [
      'EPUB, MOBI & PDF Publishing',
      'Cover & Layout Formatting',
      'Global Distribution Support',
      'ISBN Registration Assistance',
      'Digital Asset Optimization',
    ],
    accent: '#5CC9B5',
  },
  {
    id: 7,
    category: 'Accessibility Services',
    title: 'Accessibility Services',
    description: 'Comprehensive compliance auditing and remediation. We optimize documents, media, and LMS layouts to meet WCAG 2.1/2.2 and ADA Section 508 requirements.',
    features: [
      'WCAG 2.1/2.2 Compliance',
      'ADA Section 508 Auditing',
      'Screen Reader Optimization',
      'Alt Text & CC Remediation',
      'Inclusive Content Design',
    ],
    accent: '#0D5C5C',
  },
  {
    id: 8,
    category: 'AI Data Solutions',
    title: 'AI Data Solutions',
    description: 'High-quality data annotation, validation, and curation for machine learning models. Expert human-in-the-loop support across text, image, audio, and video.',
    features: [
      'Data Annotation & Labeling',
      'Multi-Format Support (Text/Image/Video)',
      'Model Validation & Quality Auditing',
      'Custom Taxonomy Building',
      'Secure & Scalable Workforce',
    ],
    accent: '#7EDCCA',
  },
];

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filteredServices = activeCategory === 'All'
    ? services
    : services.filter(s => s.category === activeCategory);

  return (
    <main className="min-h-screen bg-brand-cream pb-24 md:pb-32">
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-brand-teal-900 pt-36 pb-20 md:pt-40 md:pb-24">
        {/* Subtle Wave Graphics */}
        <div 
          className="absolute inset-x-0 bottom-0 h-24 opacity-10 bg-[radial-gradient(ellipse_at_bottom,_var(--vaidik-mint-400),_transparent_70%)]"
        />
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-widest text-brand-mint uppercase mb-3 block">
              Global B2B Solutions
            </span>
            <h1 
              className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              Our Services
            </h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">
              We design and engineer bespoke educational programs, custom content architectures, accessibility assets, and AI training data solutions to empower modern organizations.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-[1200px] mx-auto px-6 pt-12 pb-6">
        <div className="flex gap-2.5 overflow-x-auto pb-3 scrollbar-none flex-nowrap md:flex-wrap md:justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-brand-teal-700 border-brand-teal-700 text-white shadow-sm'
                  : 'bg-white border-black/5 text-brand-charcoal/70 hover:bg-black/5 hover:border-black/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid of Cards */}
      <section className="max-w-[1200px] mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div 
              key={service.id} 
              className="premium-card flex flex-col justify-between"
            >
              {/* Card Header & Content */}
              <div className="p-8 pb-0">
                {/* Accent Line */}
                <div 
                  className="w-12 h-1 rounded-full mb-6"
                  style={{ background: service.accent }}
                />

                <span 
                  className="text-[0.6875rem] font-bold tracking-widest uppercase mb-2 block opacity-60"
                  style={{ color: service.accent }}
                >
                  {service.category}
                </span>

                <h3 
                  className="text-lg md:text-xl font-bold tracking-tight mb-3 text-brand-teal-900"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  {service.title}
                </h3>

                <p className="text-brand-charcoal/70 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                <ul className="flex flex-col gap-3.5 mb-8">
                  {service.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-xs text-brand-charcoal/80">
                      <IconCheck size={14} className="shrink-0 mt-0.5" color={service.accent} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer Button */}
              <div className="p-8 pt-0 border-t border-black/5">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:gap-3"
                  style={{ color: service.accent }}
                >
                  Request Consultation
                  <IconArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Banner */}
      <section className="max-w-[1200px] mx-auto px-6 mt-16">
        <div 
          className="relative overflow-hidden rounded-[2rem] p-10 md:p-14 text-center lg:text-left flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8"
          style={{ background: 'linear-gradient(135deg, var(--vaidik-teal-900) 0%, var(--vaidik-teal-700) 100%)' }}
        >
          <div className="relative z-10 max-w-xl">
            <h2 
              className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-3"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              Partner with Vaidik
            </h2>
            <p className="text-white/70 text-sm md:text-base">
              Get in touch with our solutions architects to build custom education frameworks tailored to your organization.
            </p>
          </div>
          <div className="relative z-10 flex flex-wrap gap-4 justify-center lg:justify-end">
            <Link href="/contact" className="btn-premium-primary">
              Get in Touch
            </Link>
            <Link href="/about" className="btn-premium-secondary !bg-white/10 !border-white/10 !text-white hover:!bg-white/20">
              Our Story
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
