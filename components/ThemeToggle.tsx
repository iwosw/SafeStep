
import React, { useState, useEffect } from 'react';

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');

  useEffect(() => {
    const root = window.document.documentElement;
    
    const applyTheme = (t: string) => {
      const isDark = t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    applyTheme(theme);
    localStorage.setItem('theme', theme);

    // Listen for system changes if system theme is selected
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const cycleTheme = () => {
    if (theme === 'system') setTheme('light');
    else if (theme === 'light') setTheme('dark');
    else setTheme('system');
  };

  const getIcon = () => {
    if (theme === 'light') return '☀️';
    if (theme === 'dark') return '🌙';
    return '🖥️';
  };

  return (
    <button 
      onClick={cycleTheme}
      className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-blue-400 transition-all flex items-center gap-2"
      title={`Тема: ${theme === 'system' ? 'Системная' : theme === 'light' ? 'Светлая' : 'Темная'}`}
    >
      <span className="text-xl">{getIcon()}</span>
      <span className="text-xs font-bold uppercase hidden md:inline opacity-60">Тема</span>
    </button>
  );
};
