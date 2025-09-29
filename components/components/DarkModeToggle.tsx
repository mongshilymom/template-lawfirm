"use client";
import { useEffect, useState } from 'react';

/**
 * DarkModeToggle renders a simple switch in the bottom left corner of the page.
 * When toggled it adds or removes the `dark` class from the html element.
 */
export default function DarkModeToggle() {
  const [enabled, setEnabled] = useState(false);

  // Read initial theme from localStorage
  useEffect(() => {
    const stored = typeof window !== 'undefined' && localStorage.getItem('theme');
    if (stored === 'dark') {
      setEnabled(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggle = () => {
    const newState = !enabled;
    setEnabled(newState);
    if (newState) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      aria-label="Toggle dark mode"
      onClick={toggle}
      className="fixed bottom-4 left-4 z-50 p-2 rounded-full bg-legend-gold dark:bg-legend-platinum text-legend-black shadow-lg"
    >
      {enabled ? '🌙' : '☀️'}
    </button>
  );
}