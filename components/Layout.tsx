
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

export const Navbar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const data = JSON.parse(localStorage.getItem('completed_modules') || '[]');
      const completed = Array.isArray(data) ? data : [];
      const total = 9; // Total articles
      setProgress(Math.round((completed.length / total) * 100));
    };
    updateProgress();
    window.addEventListener('storage', updateProgress);
    const interval = setInterval(updateProgress, 1000);
    return () => {
      window.removeEventListener('storage', updateProgress);
      clearInterval(interval);
    };
  }, []);

  return (
    <nav className="navbar bg-white/80 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 py-4 relative z-50 transition-colors no-print">
      <div className="nav-container max-w-[1100px] mx-auto flex justify-between items-center px-5">
        <Link to="/" className="nav-logo text-2xl font-black text-[#1e3c72] dark:text-white flex items-center gap-2 tracking-tighter">
          <span>SafeStep<span className="text-[#fdbb2d]">.</span></span>
          <img 
            src="https://raw.githubusercontent.com/google/material-design-icons/master/png/action/verified_user/materialicons/48dp/1x/baseline_verified_user_black_48dp.png" 
            alt="SafeStep Logo" 
            className="h-7 w-7 object-contain filter dark:invert dark:brightness-200"
          />
        </Link>
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Защита</span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-1.5 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${progress}%` }}></div>
              </div>
              <span className="text-xs font-mono font-black">{progress}%</span>
            </div>
          </div>
          <div className="nav-links flex items-center gap-4 md:gap-6">
            <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-[#1e3c72] dark:hover:text-blue-400 font-bold transition-colors hidden sm:inline text-xs uppercase tracking-widest">Главная</Link>
            <Link to="/articles" className="text-gray-600 dark:text-gray-300 hover:text-[#1e3c72] dark:hover:text-blue-400 font-bold transition-colors text-xs uppercase tracking-widest">База</Link>
            <Link to="/quiz" className="text-gray-600 dark:text-gray-300 hover:text-[#1e3c72] dark:hover:text-blue-400 font-bold transition-colors hidden sm:inline text-xs uppercase tracking-widest">Тест</Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export const Footer: React.FC = () => {
  const [confirming, setConfirming] = useState(false);

  const resetData = () => {
    if (confirming) {
        localStorage.clear();
        window.dispatchEvent(new Event('storage'));
        // Try to reload, but fallback if iframe blocks it
        try {
            window.location.reload();
        } catch (e) {
            window.location.href = '/';
        }
    } else {
        setConfirming(true);
        setTimeout(() => setConfirming(false), 3000);
    }
  };

  return (
  <footer className="main-footer bg-[#0a0a0a] text-[#888] py-16 px-5 transition-colors no-print">
    <div className="footer-container max-w-[1100px] mx-auto flex flex-col md:flex-row justify-between border-b border-white/5 pb-10 gap-10">
      <div className="footer-info">
        <h4 className="text-white text-3xl font-black mb-3">SafeStep<span className="text-[#fdbb2d]">.</span></h4>
        <p className="max-w-xs text-sm leading-relaxed">Образовательная платформа нового поколения для защиты твоей цифровой личности.</p>
        <button 
          onClick={resetData} 
          className={`mt-6 text-[10px] uppercase font-black tracking-widest px-4 py-2 rounded-lg transition-all border ${confirming ? 'bg-red-500 text-white border-red-500' : 'text-red-500 hover:text-red-400 border-red-500/20 hover:bg-red-500/10'}`}
        >
          {confirming ? 'ТЫ УВЕРЕН? НАЖМИ ЕЩЕ РАЗ!' : 'Экстренный сброс данных'}
        </button>
      </div>
      <div className="footer-dev text-sm flex flex-col gap-2">
        <p className="uppercase tracking-widest font-bold text-white/40 text-[10px]">Project Metadata</p>
        <p>Year: <span className="text-white font-mono">2026</span></p>
        <p>Lead: <span className="text-white">Osipov Ivan (IWOSS)</span></p>
      </div>
    </div>
    <div className="footer-bottom text-center pt-8 text-[10px] font-mono uppercase tracking-[0.2em] opacity-40">
      &copy; 2026 SafeStep System. All protocols secured.
    </div>
  </footer>
  );
};
