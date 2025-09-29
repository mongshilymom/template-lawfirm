"use client";

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

/**
 * Enhanced dark mode toggle using next-themes
 * Supports system preference and provides smooth transitions
 */
export default function DarkModeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait for component to mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed bottom-4 left-4 z-50 p-2 rounded-full bg-legend-gold dark:bg-legend-platinum text-legend-black shadow-lg w-10 h-10" />
    );
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  const cycleTheme = () => {
    if (theme === 'system') {
      setTheme('light');
    } else if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('system');
    }
  };

  const getIcon = () => {
    if (theme === 'system') {
      return '🖥️';
    }
    return isDark ? '🌙' : '☀️';
  };

  const getLabel = () => {
    if (theme === 'system') {
      return `시스템 테마 (현재: ${systemTheme === 'dark' ? '다크' : '라이트'})`;
    }
    return `${isDark ? '다크' : '라이트'} 모드`;
  };

  return (
    <button
      aria-label={`현재: ${getLabel()}. 클릭하여 테마 변경`}
      onClick={cycleTheme}
      className="fixed bottom-4 left-4 z-50 p-2 rounded-full bg-legend-gold dark:bg-legend-platinum text-legend-black hover:bg-legend-gold/90 dark:hover:bg-legend-platinum/90 shadow-lg transition-all duration-200 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      title={getLabel()}
    >
      <span className="block w-6 h-6 flex items-center justify-center text-lg">
        {getIcon()}
      </span>
    </button>
  );
}