'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import Button from './Button';

interface ContactFormProps {
  translations: {
    fields: {
      name: string;
      company: string;
      email: string;
      service: string;
      message: string;
    };
    services: {
      development: string;
      security: string;
      growth: string;
      fullEcosystem: string;
      other: string;
    };
    submitButton: string;
    successMessage: string;
    sending: string;
    errorMessage: string;
  };
}

export default function ContactForm({ translations }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const shouldReduceMotion = useReducedMotion();
  const router = useRouter();
  const locale = useLocale();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      company: formData.get('company'),
      email: formData.get('email'),
      service: formData.get('service'),
      message: formData.get('message'),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('sent');
        router.push(`/${locale}/thank-you`);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const serviceOptions = [
    { value: 'development', label: translations.services.development },
    { value: 'security', label: translations.services.security },
    { value: 'growth', label: translations.services.growth },
    { value: 'full-ecosystem', label: translations.services.fullEcosystem },
    { value: 'other', label: translations.services.other },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <input
          type="text"
          name="name"
          required
          placeholder={translations.fields.name}
          className="form-input"
          disabled={status === 'sending' || status === 'sent'}
        />
      </div>

      <div>
        <input
          type="text"
          name="company"
          placeholder={translations.fields.company}
          className="form-input"
          disabled={status === 'sending' || status === 'sent'}
        />
      </div>

      <div>
        <input
          type="email"
          name="email"
          required
          placeholder={translations.fields.email}
          className="form-input"
          disabled={status === 'sending' || status === 'sent'}
        />
      </div>

      <div>
        <select
          name="service"
          required
          className="form-input cursor-pointer bg-black"
          defaultValue=""
          disabled={status === 'sending' || status === 'sent'}
        >
          <option value="" disabled className="text-gray-600">
            {translations.fields.service}
          </option>
          {serviceOptions.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-black text-white">
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <textarea
          name="message"
          required
          rows={4}
          placeholder={translations.fields.message}
          className="form-input resize-none"
          disabled={status === 'sending' || status === 'sent'}
        />
      </div>

      <motion.div
        animate={
          status === 'sent' && !shouldReduceMotion
            ? { scale: [1, 0.95, 1] }
            : {}
        }
        transition={{ duration: 0.3 }}
      >
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={status === 'sending' || status === 'sent'}
          className={status === 'sent' ? 'bg-white text-black' : ''}
        >
          {status === 'sending'
            ? translations.sending
            : status === 'sent'
              ? `✓ ${translations.successMessage}`
              : status === 'error'
                ? translations.errorMessage
                : translations.submitButton}
        </Button>
      </motion.div>
    </form>
  );
}
