'use client';

import { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from 'framer-motion';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerChildren';
import Card from '@/components/ui/Card';

function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || shouldReduceMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const cols = 12;
    const rows = 8;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const spacingX = w / (cols + 1);
      const spacingY = h / (rows + 1);

      const dots: { x: number; y: number; pulse: number }[] = [];

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = spacingX * (i + 1);
          const y = spacingY * (j + 1);
          const pulse = Math.sin(time * 0.5 + i * 0.3 + j * 0.4) * 0.5 + 0.5;
          dots.push({ x, y, pulse });
        }
      }

      // Draw connecting lines
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = spacingX * 1.8;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.08 * ((dots[i].pulse + dots[j].pulse) / 2);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100, 100, 100, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw dots
      dots.forEach((dot) => {
        const radius = 1.5 + dot.pulse * 1;
        const alpha = 0.3 + dot.pulse * 0.3;
        ctx.beginPath();
        ctx.fillStyle = `rgba(150, 150, 150, ${alpha})`;
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      time += 0.016;
      animationId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);

    // Only animate when visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          draw();
        } else {
          cancelAnimationFrame(animationId);
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full opacity-40"
      aria-hidden="true"
    />
  );
}

export default function AIHighlight() {
  const t = useTranslations('ai');

  const cards = ['intelligentDevelopment', 'proactiveSecurity', 'smartGrowth', 'operationalAutomation'] as const;

  return (
    <section className="relative overflow-hidden bg-metallic-dark py-24 md:py-32 lg:py-40">
      {/* Dot grid background — hidden on mobile for performance */}
      <div className="absolute inset-0 hidden md:block">
        <DotGrid />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <ScrollReveal>
          <h2 className="font-headline max-w-3xl text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            {t('headline')}
          </h2>
        </ScrollReveal>

        <StaggerContainer
          className="mt-16 grid gap-6 md:grid-cols-2"
          staggerDelay={0.12}
          delay={0.3}
        >
          {cards.map((cardKey) => (
            <StaggerItem key={cardKey}>
              <Card dark={true}>
                <h3 className="text-lg font-bold text-white">
                  {t(`cards.${cardKey}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-400">
                  {t(`cards.${cardKey}.description`)}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
