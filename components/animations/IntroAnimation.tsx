'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [show, setShow] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Check if intro has already played this session
    try {
      if (sessionStorage.getItem('bw-intro-played')) {
        setShow(false);
        onComplete();
        return;
      }
    } catch {
      // sessionStorage unavailable, use in-memory flag
    }

    const timer = setTimeout(() => {
      setShow(false);
      try {
        sessionStorage.setItem('bw-intro-played', '1');
      } catch {
        // Silently handle
      }
      onComplete();
    }, shouldReduceMotion ? 500 : 2800);

    return () => clearTimeout(timer);
  }, [onComplete, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <Image
              src="/images/wolf-icon.png"
              alt=""
              width={200}
              height={200}
              priority
              className="h-32 w-32 object-contain md:h-48 md:w-48"
            />
          </motion.div>

          <div className="mt-8 flex">
            {'BLACKWOLF'.split('').map((letter, i) => (
              <motion.span
                key={i}
                className="font-display text-2xl font-bold tracking-[0.15em] text-white md:text-4xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 1 + i * 0.05,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
