'use client';

import ScrollReveal from '@/components/animations/ScrollReveal';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerChildren';

interface ServiceItem {
  title: string;
  description: string;
}

interface ServicesSectionProps {
  heading: string;
  items: ServiceItem[];
}

export default function ServicesSection({ heading, items }: ServicesSectionProps) {
  return (
    <section className="bg-metallic-dark py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <ScrollReveal>
          <h2 className="font-headline text-3xl font-bold text-white md:text-4xl">
            {heading}
          </h2>
        </ScrollReveal>

        <StaggerContainer
          className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.1}
          delay={0.2}
        >
          {items.map((item, i) => (
            <StaggerItem key={i}>
              <div>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-400">
                  {item.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
