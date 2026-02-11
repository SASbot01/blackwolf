'use client';

import { useReducedMotion } from 'framer-motion';

const logos = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python',
  'AWS', 'Docker', 'PostgreSQL', 'MongoDB', 'GraphQL',
  'OpenAI', 'Anthropic', 'LangChain', 'Vercel', 'Figma',
  'Stripe', 'HubSpot', 'Salesforce', 'Slack', 'GitHub',
  'VASS', 'n8n', 'Make', 'Zapier', 'Notion', 'Linear',
];

export default function LogoCarousel() {
  const shouldReduceMotion = useReducedMotion();

  const doubled = [...logos, ...logos];

  return (
    <section className="overflow-hidden border-t border-b border-gray-800/50 bg-black py-12">
      <div
        className={`flex items-center gap-16 whitespace-nowrap ${shouldReduceMotion ? '' : 'logo-carousel'}`}
      >
        {doubled.map((logo, i) => (
          <span
            key={`${logo}-${i}`}
            className="inline-block text-sm font-medium uppercase tracking-[0.15em] text-gray-600/50 transition-colors duration-300 hover:text-white"
          >
            {logo}
          </span>
        ))}
      </div>
    </section>
  );
}
