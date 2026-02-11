'use client';

import { useState, useRef, useEffect, useCallback, FormEvent } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChat() {
  const t = useTranslations('chat');
  const prefersReducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: 'user', content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    // Only send user/assistant conversation messages to the API (exclude the greeting)
    const apiMessages = updatedMessages.filter((_, i) => i > 0 || updatedMessages[0].role === 'user');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok) throw new Error('Failed to send message');

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No reader available');

      const decoder = new TextDecoder();
      let assistantContent = '';

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') break;

            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                assistantContent += parsed.text;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: 'assistant',
                    content: assistantContent,
                  };
                  return updated;
                });
              }
            } catch {
              // Skip malformed JSON lines
            }
          }
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: t('errorMessage') },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const motionConfig = prefersReducedMotion
    ? { duration: 0 }
    : { type: 'spring' as const, damping: 25, stiffness: 300 };

  // Greeting is always the first thing shown, separate from the messages array
  const greetingText = t('greeting');

  return (
    <>
      {/* Floating bubble */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-lg transition-colors hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
        aria-label={isOpen ? t('close') : t('title')}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={motionConfig}
            className="fixed bottom-24 right-6 z-40 flex h-[min(500px,70vh)] w-[min(400px,calc(100vw-3rem))] flex-col overflow-hidden rounded-[2px] border border-gray-800 bg-black shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-800 px-5 py-4">
              <div>
                <h2 className="font-headline text-sm font-semibold uppercase tracking-[0.1em] text-white">
                  {t('title')}
                </h2>
                <p className="mt-0.5 font-body text-xs text-gray-400">
                  {t('subtitle')}
                </p>
              </div>
              <div className="h-2 w-2 rounded-full bg-green-500" aria-hidden="true" />
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {/* Greeting message - always visible */}
              <div className="mb-3 text-left">
                <div className="inline-block max-w-[85%] rounded-[2px] border border-gray-700 bg-gray-900/50 px-4 py-2.5 font-body text-sm leading-relaxed text-gray-200">
                  {greetingText}
                </div>
              </div>

              {/* Conversation messages */}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`mb-3 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}
                >
                  <div
                    className={`inline-block max-w-[85%] rounded-[2px] px-4 py-2.5 font-body text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-white text-black'
                        : 'border border-gray-700 bg-gray-900/50 text-gray-200'
                    }`}
                  >
                    {msg.content}
                    {msg.role === 'assistant' && msg.content === '' && isLoading && (
                      <span className="inline-flex gap-1">
                        <span className="animate-pulse">.</span>
                        <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>.</span>
                        <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>.</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={sendMessage}
              className="flex items-center gap-2 border-t border-gray-800 px-4 py-3"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('placeholder')}
                disabled={isLoading}
                className="flex-1 bg-transparent font-body text-sm text-white placeholder-gray-600 outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[2px] bg-white text-black transition-colors hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-white"
                aria-label={t('send')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
