import { useEffect, useRef } from 'react';

export function useReveal(threshold = 0.01) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const elements = Array.from(container.querySelectorAll('.reveal, .reveal-left, .reveal-right'));
    if (!elements.length) return;

    // Immediately reveal elements that are already within or above the viewport fold
    const windowHeight = window.innerHeight;
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < windowHeight + 100) {
        el.classList.add('visible');
      }
    });

    // Safety fallback: ensure all elements are visible after 300ms
    const timer = setTimeout(() => {
      elements.forEach(el => el.classList.add('visible'));
    }, 300);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin: '100px 0px 100px 0px', // Pre-trigger 100px before scrolling into view
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [threshold]);

  return ref;
}

export function useScrollY() {
  const scrollY = useRef(0);

  useEffect(() => {
    const handler = () => { scrollY.current = window.scrollY; };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return scrollY;
}
