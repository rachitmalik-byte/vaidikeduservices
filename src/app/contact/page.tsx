'use client';

import React, { useState, useEffect, useRef, FormEvent } from 'react';
import {
  IconMail,
  IconPhone,
  IconLocation,
  IconLinkedIn,
  IconTwitter,
  IconArrowRight,
} from '@/components/icons';

/* ─── types ─── */
interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  service?: string;
  message?: string;
}

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

/* ─── data ─── */
const serviceOptions = [
  'Content Engineering',
  'Curriculum Design',
  'AI Data Solutions',
  'Online Tutoring',
  'Assessment & Testing',
  'Corporate Training',
  'Custom EdTech Development',
  'Other',
];

const contactDetails = [
  {
    icon: IconPhone,
    label: 'Phone',
    value: '0120-434-6727',
    href: 'tel:01204346727',
  },
  {
    icon: IconMail,
    label: 'Email',
    value: 'info@vaidikedu.com',
    href: 'mailto:info@vaidikedu.com',
  },
  {
    icon: IconLocation,
    label: 'Address',
    value: 'House No. C-183, Alpha-1,\nNoida, UP 201306, India',
    href: 'https://maps.google.com/?q=C-183+Alpha-1+Noida+UP+201306',
  },
];

const socialLinks = [
  { icon: IconLinkedIn, label: 'LinkedIn', href: 'https://linkedin.com/company/vaidikedu' },
  { icon: IconTwitter, label: 'Twitter / X', href: 'https://twitter.com/vaidikedu' },
];

/* ═══════════════ PAGE ═══════════════ */
export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitState, setSubmitState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  /* ─── validation ─── */
  function validate(data: FormData): FormErrors {
    const errs: FormErrors = {};
    if (!data.name.trim()) errs.name = 'Full name is required';
    if (!data.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = 'Enter a valid email';
    if (!data.company.trim()) errs.company = 'Company name is required';
    if (!data.service) errs.service = 'Please select a service';
    if (!data.message.trim()) errs.message = 'Message is required';
    else if (data.message.trim().length < 10) errs.message = 'Please write at least 10 characters';
    return errs;
  }

  function handleChange(field: keyof FormData, value: string) {
    const next = { ...formData, [field]: value };
    setFormData(next);
    if (touched[field]) {
      setErrors(validate(next));
    }
  }

  function handleBlur(field: keyof FormData) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(formData));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const allTouched: Record<string, boolean> = {};
    (Object.keys(formData) as (keyof FormData)[]).forEach((k) => { allTouched[k] = true; });
    setTouched(allTouched);

    const errs = validate(formData);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitState('sending');
    // Simulate network call
    await new Promise((r) => setTimeout(r, 1800));
    setSubmitState('success');
  }

  /* ─── input classes helper ─── */
  function inputStyle(field: keyof FormData) {
    const hasError = touched[field] && errors[field];
    return {
      borderColor: hasError ? '#ef4444' : 'rgba(184,237,227,0.4)',
      boxShadow: hasError ? '0 0 0 3px rgba(239,68,68,0.08)' : 'none',
    };
  }

  return (
    <main className="min-h-screen" style={{ background: '#FFFFFF' }}>

      {/* ───────── HERO ───────── */}
      <section className="relative overflow-hidden" style={{ minHeight: '45vh' }}>
        <div
          className="absolute inset-0 animate-gradient"
          style={{
            background: 'linear-gradient(160deg, #0A3D3D 0%, #0D5C5C 35%, #2AA6A6 65%, #5CC9B5 100%)',
            backgroundSize: '300% 300%',
          }}
        />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-15" style={{ background: 'radial-gradient(circle, rgba(126,220,202,0.5) 0%, transparent 70%)' }} />

        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6" style={{ minHeight: '45vh' }}>
          <RevealSection>
            <span
              className="inline-block rounded-full px-5 py-2 text-sm font-medium tracking-wider uppercase mb-6"
              style={{ color: '#F7FAFA', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)' }}
            >
              Contact Us
            </span>
          </RevealSection>
          <RevealSection delay={150}>
            <h1
              className="font-bold leading-tight max-w-3xl"
              style={{
                fontFamily: 'var(--font-syne, Syne, sans-serif)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #B8EDE3 50%, #7EDCCA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Let&apos;s build something extraordinary together
            </h1>
          </RevealSection>
          <RevealSection delay={300}>
            <p className="mt-4 max-w-xl text-base leading-relaxed" style={{ color: 'rgba(247,250,250,0.75)' }}>
              Whether you&apos;re exploring a partnership, need a custom solution, or just want to say hello—we&apos;d love to hear from you.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ───────── MAIN CONTENT ───────── */}
      <section className="section-padding" style={{ background: '#F7FAFA' }}>
        <div className="section-container">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">

            {/* ─── FORM (3 cols) ─── */}
            <RevealSection className="lg:col-span-3">
              <div
                className="rounded-2xl p-8 md:p-10"
                style={{
                  background: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(184,237,227,0.3)',
                  boxShadow: '0 4px 24px rgba(10,61,61,0.06)',
                }}
              >
                {submitState === 'success' ? (
                  /* success state */
                  <div className="flex flex-col items-center justify-center text-center py-16">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                      style={{ background: 'rgba(42,166,166,0.1)' }}
                    >
                      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                        <polyline points="8,18 15,25 28,11" stroke="#2AA6A6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)', color: '#0A3D3D' }}>
                      Message Sent Successfully!
                    </h3>
                    <p className="text-sm mb-6" style={{ color: '#4A4A4A' }}>
                      Thank you for reaching out. Our team will get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitState('idle');
                        setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' });
                        setTouched({});
                        setErrors({});
                      }}
                      className="magnetic-btn magnetic-btn-primary light-sweep text-sm"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  /* form */
                  <form onSubmit={handleSubmit} noValidate>
                    <h2 className="text-lg font-bold mb-6" style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)', color: '#0A3D3D' }}>
                      Send us a message
                    </h2>

                    <div className="grid sm:grid-cols-2 gap-5 mb-5">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-semibold mb-1.5 tracking-wide uppercase" style={{ color: '#0D5C5C' }}>
                          Full Name <span style={{ color: '#ef4444' }}>*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          onBlur={() => handleBlur('name')}
                          placeholder="Jane Smith"
                          className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all duration-300 focus:ring-2"
                          style={{
                            background: '#F7FAFA',
                            border: '1.5px solid',
                            ...inputStyle('name'),
                            color: '#1A1A1A',
                          }}
                        />
                        {touched.name && errors.name && (
                          <p className="text-xs mt-1 font-medium" style={{ color: '#ef4444' }}>{errors.name}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-semibold mb-1.5 tracking-wide uppercase" style={{ color: '#0D5C5C' }}>
                          Email Address <span style={{ color: '#ef4444' }}>*</span>
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          onBlur={() => handleBlur('email')}
                          placeholder="jane@company.com"
                          className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all duration-300 focus:ring-2"
                          style={{
                            background: '#F7FAFA',
                            border: '1.5px solid',
                            ...inputStyle('email'),
                            color: '#1A1A1A',
                          }}
                        />
                        {touched.email && errors.email && (
                          <p className="text-xs mt-1 font-medium" style={{ color: '#ef4444' }}>{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5 mb-5">
                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-semibold mb-1.5 tracking-wide uppercase" style={{ color: '#0D5C5C' }}>
                          Phone <span className="font-normal normal-case" style={{ color: '#9B9B9B' }}>(optional)</span>
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all duration-300 focus:ring-2"
                          style={{
                            background: '#F7FAFA',
                            border: '1.5px solid rgba(184,237,227,0.4)',
                            color: '#1A1A1A',
                          }}
                        />
                      </div>

                      {/* Company */}
                      <div>
                        <label className="block text-xs font-semibold mb-1.5 tracking-wide uppercase" style={{ color: '#0D5C5C' }}>
                          Company <span style={{ color: '#ef4444' }}>*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => handleChange('company', e.target.value)}
                          onBlur={() => handleBlur('company')}
                          placeholder="Acme Inc."
                          className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all duration-300 focus:ring-2"
                          style={{
                            background: '#F7FAFA',
                            border: '1.5px solid',
                            ...inputStyle('company'),
                            color: '#1A1A1A',
                          }}
                        />
                        {touched.company && errors.company && (
                          <p className="text-xs mt-1 font-medium" style={{ color: '#ef4444' }}>{errors.company}</p>
                        )}
                      </div>
                    </div>

                    {/* Service Interest */}
                    <div className="mb-5">
                      <label className="block text-xs font-semibold mb-1.5 tracking-wide uppercase" style={{ color: '#0D5C5C' }}>
                        Service Interest <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={formData.service}
                          onChange={(e) => handleChange('service', e.target.value)}
                          onBlur={() => handleBlur('service')}
                          className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all duration-300 appearance-none cursor-pointer focus:ring-2"
                          style={{
                            background: '#F7FAFA',
                            border: '1.5px solid',
                            ...inputStyle('service'),
                            color: formData.service ? '#1A1A1A' : '#9B9B9B',
                          }}
                        >
                          <option value="" disabled>Select a service...</option>
                          {serviceOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                        {/* chevron */}
                        <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M4 6L8 10L12 6" stroke="#9B9B9B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      {touched.service && errors.service && (
                        <p className="text-xs mt-1 font-medium" style={{ color: '#ef4444' }}>{errors.service}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="mb-8">
                      <label className="block text-xs font-semibold mb-1.5 tracking-wide uppercase" style={{ color: '#0D5C5C' }}>
                        Message <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        onBlur={() => handleBlur('message')}
                        placeholder="Tell us about your project, goals, or any questions you have..."
                        rows={5}
                        className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all duration-300 resize-none focus:ring-2"
                        style={{
                          background: '#F7FAFA',
                          border: '1.5px solid',
                          ...inputStyle('message'),
                          color: '#1A1A1A',
                        }}
                      />
                      {touched.message && errors.message && (
                        <p className="text-xs mt-1 font-medium" style={{ color: '#ef4444' }}>{errors.message}</p>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={submitState === 'sending'}
                      className="magnetic-btn magnetic-btn-primary light-sweep w-full sm:w-auto relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {submitState === 'sending' ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4 31.4" strokeLinecap="round" />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Send Message
                          <IconArrowRight size={18} />
                        </span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </RevealSection>

            {/* ─── INFO (2 cols) ─── */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              {/* contact info cards */}
              <RevealSection delay={100}>
                <div className="space-y-4">
                  <h3 className="text-sm font-bold tracking-[0.15em] uppercase mb-4" style={{ color: '#0A3D3D' }}>
                    Get in touch
                  </h3>
                  {contactDetails.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target={item.label === 'Address' ? '_blank' : undefined}
                        rel={item.label === 'Address' ? 'noopener noreferrer' : undefined}
                        className="glass-card light-sweep flex items-start gap-4 rounded-xl p-5 no-underline group"
                        style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(184,237,227,0.3)' }}
                      >
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110"
                          style={{ background: 'rgba(42,166,166,0.1)', color: '#2AA6A6' }}
                        >
                          <Icon size={20} />
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: '#9B9B9B' }}>
                            {item.label}
                          </p>
                          <p className="text-sm font-medium whitespace-pre-line" style={{ color: '#0A3D3D' }}>
                            {item.value}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </RevealSection>

              {/* social */}
              <RevealSection delay={200}>
                <div>
                  <h3 className="text-sm font-bold tracking-[0.15em] uppercase mb-4" style={{ color: '#0A3D3D' }}>
                    Follow Us
                  </h3>
                  <div className="flex gap-3">
                    {socialLinks.map((s) => {
                      const Icon = s.icon;
                      return (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.label}
                          className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-400 hover:-translate-y-1"
                          style={{
                            background: 'rgba(42,166,166,0.08)',
                            color: '#0D5C5C',
                            border: '1px solid rgba(184,237,227,0.3)',
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg, #0D5C5C, #2AA6A6)';
                            (e.currentTarget as HTMLElement).style.color = '#FFFFFF';
                            (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(42,166,166,0.3)';
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.background = 'rgba(42,166,166,0.08)';
                            (e.currentTarget as HTMLElement).style.color = '#0D5C5C';
                            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                          }}
                        >
                          <Icon size={18} />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </RevealSection>

              {/* map placeholder */}
              <RevealSection delay={300}>
                <div
                  className="rounded-2xl overflow-hidden relative"
                  style={{
                    aspectRatio: '16/10',
                    background: 'linear-gradient(145deg, #0A3D3D 0%, #0D5C5C 40%, #2AA6A6 70%, #5CC9B5 100%)',
                    border: '1px solid rgba(184,237,227,0.3)',
                  }}
                >
                  {/* grid overlay */}
                  <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
                      `,
                      backgroundSize: '40px 40px',
                    }}
                  />
                  {/* pin */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                    <div className="animate-float">
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
                        style={{
                          background: 'rgba(255,255,255,0.15)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(255,255,255,0.2)',
                        }}
                      >
                        <IconLocation size={24} className="text-white" />
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-white mb-1">
                      Vaidik Eduservices
                    </p>
                    <p className="text-xs text-white/60 max-w-[200px]">
                      Alpha-1, Noida, Uttar Pradesh 201306, India
                    </p>
                    <a
                      href="https://maps.google.com/?q=C-183+Alpha-1+Noida+UP+201306"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5"
                      style={{
                        background: 'rgba(255,255,255,0.15)',
                        color: '#FFFFFF',
                        border: '1px solid rgba(255,255,255,0.25)',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      Open in Maps
                      <IconArrowRight size={14} />
                    </a>
                  </div>
                  {/* pulsing ring */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full opacity-30 pointer-events-none" style={{ animation: 'pulse-glow 3s ease-in-out infinite', border: '1px solid rgba(255,255,255,0.15)' }} />
                </div>
              </RevealSection>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── BOTTOM BANNER ───────── */}
      <section className="relative overflow-hidden py-16">
        <div
          className="absolute inset-0 animate-gradient"
          style={{
            background: 'linear-gradient(135deg, #0A3D3D 0%, #0D5C5C 40%, #2AA6A6 80%, #0D5C5C 100%)',
            backgroundSize: '200% 200%',
          }}
        />
        <div className="section-container relative z-10 text-center">
          <RevealSection>
            <p className="text-sm font-medium mb-2" style={{ color: 'rgba(184,237,227,0.7)' }}>
              Prefer a quick chat?
            </p>
            <h2 className="font-bold text-xl md:text-2xl mb-6" style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)', color: '#FFFFFF' }}>
              Call us directly at{' '}
              <a
                href="tel:01204346727"
                className="underline decoration-2 underline-offset-4 transition-colors duration-300 hover:no-underline"
                style={{ color: '#7EDCCA', textDecorationColor: 'rgba(126,220,202,0.4)' }}
              >
                0120-434-6727
              </a>
            </h2>
            <p className="text-sm max-w-md mx-auto" style={{ color: 'rgba(184,237,227,0.6)' }}>
              Our team is available Monday to Friday, 9:00 AM – 6:00 PM IST.
            </p>
          </RevealSection>
        </div>
      </section>
    </main>
  );
}
