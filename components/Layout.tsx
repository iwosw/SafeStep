
import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

export const Navbar: React.FC = () => (
  <nav className="navbar bg-white/80 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 py-4 sticky top-0 z-50 transition-colors">
    <div className="nav-container max-w-[1100px] mx-auto flex justify-between items-center px-5">
      <Link to="/" className="nav-logo text-2xl font-black text-[#1e3c72] dark:text-white flex items-center gap-2 tracking-tighter">
        <span>SafeStep<span className="text-[#fdbb2d]">.</span></span>
        <img 
          src="https://raw.githubusercontent.com/google/material-design-icons/master/png/action/verified_user/materialicons/48dp/1x/baseline_verified_user_black_48dp.png" 
          alt="SafeStep Logo" 
          className="h-7 w-7 object-contain filter dark:invert dark:brightness-200"
          onError={(e) => {
            (e.target as any).style.display = 'none';
          }}
        />
      </Link>
      <div className="nav-links flex items-center gap-8">
        <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-[#1e3c72] dark:hover:text-blue-400 font-bold transition-colors hidden sm:inline text-sm uppercase tracking-widest">Главная</Link>
        <Link to="/articles" className="text-gray-600 dark:text-gray-300 hover:text-[#1e3c72] dark:hover:text-blue-400 font-bold transition-colors text-sm uppercase tracking-widest">База</Link>
        <Link to="/quiz" className="text-gray-600 dark:text-gray-300 hover:text-[#1e3c72] dark:hover:text-blue-400 font-bold transition-colors hidden sm:inline text-sm uppercase tracking-widest">Тест</Link>
        <ThemeToggle />
      </div>
    </div>
  </nav>
);

export const Footer: React.FC = () => (
  <footer className="main-footer bg-[#0a0a0a] text-[#888] py-16 px-5 transition-colors">
    <div className="footer-container max-w-[1100px] mx-auto flex flex-col md:flex-row justify-between border-b border-white/5 pb-10 gap-10">
      <div className="footer-info">
        <h4 className="text-white text-3xl font-black mb-3">SafeStep<span className="text-[#fdbb2d]">.</span></h4>
        <p className="max-w-xs text-sm leading-relaxed">Образовательная платформа нового поколения для защиты твоей цифровой личности.</p>
      </div>
      <div className="footer-dev text-sm flex flex-col gap-2">
        <p className="uppercase tracking-widest font-bold text-white/40 text-[10px]">Project Metadata</p>
        <p>Year: <span className="text-white font-mono">2026</span></p>
        <p>Lead: <span className="text-white">Osipov Ivan</span></p>
        <p>Lab: <span className="text-white">IWOSS & MMaw Studio</span></p>
      </div>
    </div>
    <div className="footer-bottom text-center pt-8 text-[10px] font-mono uppercase tracking-[0.2em] opacity-40">
      &copy; 2026 SafeStep System. All protocols secured.
    </div>
  </footer>
);
