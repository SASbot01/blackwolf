'use client';

import ScrollReveal from '@/components/animations/ScrollReveal';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerChildren';

interface CapabilitiesSectionProps {
  capabilities: string[];
}

export default function CapabilitiesSection({ capabilities }: CapabilitiesSectionProps) {
  return (
    <section className="bg-metallic-dark py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <ScrollReveal>
          <h2 className="font-headline text-3xl font-bold text-white md:text-4xl">
            Key Capabilities
          </h2>
        </ScrollReveal>

        <StaggerContainer className="mt-12 flex flex-wrap gap-3" staggerDelay={0.05} delay={0.2}>
          {capabilities.map((cap) => (
            <StaggerItem key={cap}>
              <span className="inline-block rounded-[2px] border border-gray-700 px-5 py-2.5 text-sm font-medium text-gray-300 transition-all duration-200 hover:border-white hover:bg-white hover:text-black">
                {cap}
              </span>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
