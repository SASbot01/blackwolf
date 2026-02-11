'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import ScrollReveal from '@/components/animations/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';

const teamMembers = [
  {
    key: 'alex',
    initials: 'AG',
    photo: '/images/team/alex.jpg',
    gradient: 'from-gray-700 via-gray-600 to-gray-800',
    instagram: 'https://instagram.com/alexgutierrez',
    linkedin: '#',
    capabilities: [
      'Business Strategy',
      'Revenue Operations',
      'AI Integration',
      'Sales Systems',
      'Growth Strategy',
      'Team Leadership',
      'Client Relations',
      'CRM Architecture',
      'Marketing Strategy',
      'Data Analytics',
    ],
    history: [
      {
        role: 'CEO & Founder',
        company: 'Blackwolf',
        period: '2024 — Present',
        description: 'Founded and leads a technology holding company across three divisions: Development, Security, and RevOps & BI. Oversees strategy, client acquisition, and business operations.',
      },
      {
        role: 'Revenue Operations Lead',
        company: 'VASS',
        period: '2022 — 2024',
        description: 'Led revenue operations and business intelligence initiatives for one of Europe\'s largest technology consultancies. Managed high-value client portfolios and scaled sales systems.',
      },
      {
        role: 'Business Development',
        company: 'Multiple Ventures',
        period: '2020 — 2022',
        description: 'Built and scaled multiple business ventures across industries, collecting over $3M in cash for clients through strategic sales systems and growth operations.',
      },
    ],
  },
  {
    key: 'alejandro',
    initials: 'AS',
    photo: '/images/team/alejandro.jpg',
    gradient: 'from-gray-600 via-gray-500 to-gray-700',
    instagram: 'https://instagram.com/alejandrosilvestre',
    linkedin: '#',
    capabilities: [
      'Full-Stack Engineering',
      'System Architecture',
      'Cybersecurity',
      'AI & Machine Learning',
      'Cloud Infrastructure',
      'DevOps & CI/CD',
      'API Design',
      'Database Architecture',
      'Penetration Testing',
      'Automation',
    ],
    history: [
      {
        role: 'CTO & Founder',
        company: 'Blackwolf',
        period: '2024 — Present',
        description: 'Leads all technical operations across development, security, and AI integration. Architects scalable systems and oversees the engineering team.',
      },
      {
        role: 'Security Engineer & Developer',
        company: 'VASS',
        period: '2022 — 2024',
        description: 'Specialized in cybersecurity audits, penetration testing, and full-stack development for enterprise clients across financial services and telecommunications.',
      },
      {
        role: 'Software Engineer',
        company: 'Various Projects',
        period: '2020 — 2022',
        description: 'Developed scalable web applications, implemented security protocols, and built automation systems for startups and mid-market companies.',
      },
    ],
  },
  {
    key: 'antonio',
    initials: 'AR',
    photo: '/images/team/antonio.jpg',
    gradient: 'from-gray-800 via-gray-700 to-gray-900',
    instagram: '',
    linkedin: 'https://www.linkedin.com/in/antonio-rivera-poblete-052442299/',
    capabilities: [
      'Penetration Testing',
      'Bug Bounty Hunting',
      'Ethical Hacking',
      'Vulnerability Assessment',
      'Web Application Security',
      'Network Security',
      'OWASP',
      'Red Teaming',
      'Threat Intelligence',
      'Security Research',
    ],
    history: [
      {
        role: 'Head of Cybersecurity',
        company: 'Blackwolf',
        period: '2024 — Present',
        description: 'Leads the cybersecurity division, overseeing penetration testing, vulnerability assessments, and security auditing operations. Drives offensive security strategy and ensures client infrastructure resilience.',
      },
      {
        role: 'Security Researcher & Bug Bounty Hunter',
        company: 'Independent',
        period: '2022 — 2024',
        description: 'Identified critical vulnerabilities in major organizations including NASA, earning Hall of Fame recognitions and letters of appreciation. Specialized in web application security, IDOR, XSS, and CSTI attack vectors.',
      },
      {
        role: 'Ethical Hacker',
        company: 'Various Programs',
        period: '2020 — 2022',
        description: 'Conducted responsible disclosure and bug bounty research across multiple platforms. Developed expertise in manual penetration testing methodologies and vulnerability assessment frameworks.',
      },
    ],
  },
];

const collaborator = {
  name: 'VASS',
  role: 'Main Collaborator',
  description: 'VASS is one of Europe\'s leading digital transformation and technology consulting firms. As our main collaborator, VASS provides enterprise-grade project support, talent access, and strategic partnership across large-scale technology implementations.',
};

export default function TeamPage() {
  const t = useTranslations('pack');
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      {/* Hero */}
      <section className="flex min-h-[60vh] flex-col items-center justify-center bg-black px-6 pt-32 text-center">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel>{t('sectionLabel')}</SectionLabel>
          <h1 className="font-headline mt-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            {t('headline')}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-gray-400 md:text-lg">
            {t('subtitle')}
          </p>
        </motion.div>
      </section>

      {/* Team Members — Banner + CV Layout */}
      {teamMembers.map((member) => (
        <section
          key={member.key}
          className="border-t border-gray-800/50 bg-metallic-dark"
        >
          {/* Banner — Photo | Role | Logo */}
          <div className="relative flex h-[280px] w-full items-center justify-between overflow-hidden bg-black px-6 md:h-[360px] md:px-12 lg:h-[420px] lg:px-20">
            {/* Photo left */}
            <div className="relative h-full w-1/3 flex-shrink-0">
              <Image
                src={
                  member.key === 'alex'
                    ? '/images/team/alex-portrait.png'
                    : member.key === 'alejandro'
                      ? '/images/team/alejandro-portrait.jpeg'
                      : '/images/team/antonio-portrait.jpg'
                }
                alt={t(`members.${member.key}.name`)}
                fill
                className="object-cover object-top"
                sizes="33vw"
                priority
              />
              <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-r from-transparent to-black" />
            </div>

            {/* Role center */}
            <div className="flex flex-col items-center justify-center">
              <span className="font-headline text-5xl font-bold tracking-[0.2em] text-white md:text-7xl lg:text-9xl">
                {member.key === 'alex' ? 'CEO' : member.key === 'alejandro' ? 'CTO' : 'HoC'}
              </span>
            </div>

            {/* Logo right */}
            <div className="flex flex-shrink-0 items-center justify-center">
              <Image
                src="/images/wolf-3d.png"
                alt="Blackwolf"
                width={160}
                height={160}
                className="h-20 w-20 object-contain invert md:h-28 md:w-28 lg:h-36 lg:w-36"
              />
            </div>

            {/* Bottom gradient for smooth transition */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
          </div>

          {/* Content below banner */}
          <div className="mx-auto max-w-7xl px-6 pb-24 md:px-12 md:pb-32">
            {/* Name + Role */}
            <ScrollReveal>
              <div className="-mt-16 relative z-10">
                <h2 className="font-headline text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                  {t(`members.${member.key}.name`)}
                </h2>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.15em] text-gray-500">
                  {t(`members.${member.key}.role`)}
                </p>
              </div>
            </ScrollReveal>

            {/* Bio */}
            <ScrollReveal delay={0.1}>
              <p className="mt-8 max-w-3xl text-base leading-relaxed text-gray-400 md:text-lg">
                {t(`members.${member.key}.bio`)}
              </p>
            </ScrollReveal>

            {/* Social Links */}
            <ScrollReveal delay={0.15}>
              <div className="mt-6 flex gap-6">
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-gray-500 transition-colors hover:text-white"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                  Instagram
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-gray-500 transition-colors hover:text-white"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </ScrollReveal>

            <div className="mt-16 grid gap-16 lg:grid-cols-2">
              {/* Capabilities */}
              <ScrollReveal delay={0.2}>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
                    Capabilities
                  </h3>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {member.capabilities.map((cap) => (
                      <span
                        key={cap}
                        className="inline-block rounded-[2px] border border-gray-700 px-4 py-2 text-xs font-medium text-gray-300 transition-colors duration-200 hover:border-white hover:text-white"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Professional History */}
              <ScrollReveal delay={0.3}>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
                    Professional History
                  </h3>
                  <div className="mt-6 space-y-8">
                    {member.history.map((item, i) => (
                      <div key={i} className="border-l border-gray-800 pl-6">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                          <h4 className="text-sm font-bold text-white">{item.role}</h4>
                          <span className="text-xs text-gray-500">{item.period}</span>
                        </div>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-gray-500">
                          {item.company}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      ))}

      {/* Main Collaborator — VASS */}
      <section className="border-t border-gray-800/50 bg-black py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <ScrollReveal>
            <SectionLabel>Main Collaborator</SectionLabel>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mt-12 rounded-sm border border-gray-800 bg-gradient-to-br from-gray-900/60 to-black p-10 md:p-16">
              <h2 className="font-headline text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                {collaborator.name}
              </h2>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.15em] text-gray-500">
                {collaborator.role}
              </p>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-gray-400 md:text-lg">
                {collaborator.description}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Tech Logo Carousel */}
      <section className="overflow-hidden border-t border-gray-800/50 bg-black py-12">
        <div className="logo-carousel flex items-center gap-16 whitespace-nowrap">
          {[...logos, ...logos].map((logo, i) => (
            <span
              key={`${logo}-${i}`}
              className="inline-block text-sm font-medium uppercase tracking-[0.15em] text-gray-600/50 transition-colors duration-300 hover:text-white"
            >
              {logo}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}

const logos = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python',
  'AWS', 'Docker', 'PostgreSQL', 'MongoDB', 'GraphQL',
  'OpenAI', 'Anthropic', 'LangChain', 'Vercel', 'Figma',
  'Stripe', 'HubSpot', 'Salesforce', 'Slack', 'GitHub',
  'VASS', 'n8n', 'Make', 'Zapier', 'Notion',
];
