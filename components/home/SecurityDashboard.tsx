import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ARTICLES } from '../../constants';
import { TiltCard } from '../ui/TiltCard';
import { ACHIEVEMENTS_DICT } from '../../services/achievementEngine';

const HolographicShield: React.FC<{ completedCount: number }> = ({ completedCount }) => {
    
    // Level 1: 0-2 (Rusty, incomplete)
    // Level 2: 3-5 (Basic blue)
    // Level 3: 6-8 (Neon active)
    // Level 4: 9 (Rainbow/Golden super shield)
    
    const getLevelInfo = () => {
        if (completedCount === 9) return { color: 'text-yellow-400', glow: 'shadow-[0_0_30px_rgba(250,204,21,0.6)]', emoji: '🌟', ring: 'border-yellow-400', spin: 'animate-spin' };
        if (completedCount >= 6) return { color: 'text-blue-400', glow: 'shadow-[0_0_20px_rgba(96,165,250,0.5)]', emoji: '🛡️', ring: 'border-blue-400', spin: 'animate-spin-slow' };
        if (completedCount >= 3) return { color: 'text-blue-200', glow: 'shadow-none', emoji: '⚔️', ring: 'border-blue-200/40 border-dashed', spin: 'animate-pulse' };
        return { color: 'text-slate-600', glow: 'shadow-none filter grayscale', emoji: '🗑️', ring: 'border-slate-600 border-dashed', spin: '' };
    };

    const info = getLevelInfo();

    return (
        <div className={`relative w-32 h-32 flex items-center justify-center animate-float rounded-full ${info.glow}`}>
            {completedCount > 2 && <div className="absolute inset-0 hologram-circle rounded-full animate-spin-slow opacity-50"></div>}
            <div className={`absolute inset-2 border-[3px] ${info.ring} rounded-full ${info.spin}`}></div>
            {completedCount === 9 && <div className="absolute inset-4 border border-white/50 rounded-full animate-ping"></div>}
            
            <div className={`relative text-6xl ${completedCount > 5 ? 'animate-hologram' : ''} ${info.color} filter drop-shadow-lg`}>
                {info.emoji}
            </div>
            
            {completedCount >= 6 && (
                <>
                    <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-blue-300 rounded-full animate-ping"></div>
                    <div className="absolute bottom-2 right-4 w-1.5 h-1.5 bg-blue-300 rounded-full animate-ping delay-700"></div>
                </>
            )}
        </div>
    );
};

const AchievementsGallery: React.FC = () => {
    const [achs, setAchs] = useState<string[]>([]);
    
    useEffect(() => {
        const update = () => {
            const data = JSON.parse(localStorage.getItem('achievements') || '[]');
            setAchs(Array.isArray(data) ? data : []);
        };
        update();
        window.addEventListener('storage', update);
        return () => window.removeEventListener('storage', update);
    }, []);

    if (achs.length === 0) return null;

    return (
        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-4">Твои достижения</h4>
            <div className="flex flex-wrap gap-3">
                {achs.map(ach => {
                    const info = ACHIEVEMENTS_DICT[ach] || { emoji: '🏆', title: 'Секретное достижение' };
                    return (
                        <div key={ach} className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg shadow-sm" title={info.title}>
                            <span className="text-xl">{info.emoji}</span>
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{info.title}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export const SecurityDashboard: React.FC = () => {
    const [completed, setCompleted] = useState<string[]>([]);
    
    useEffect(() => {
        const update = () => {
            const data = JSON.parse(localStorage.getItem('completed_modules') || '[]');
            setCompleted(Array.isArray(data) ? data : []);
        };
        update();
        window.addEventListener('storage', update);
        const interval = setInterval(update, 1000);
        return () => {
            window.removeEventListener('storage', update);
            clearInterval(interval);
        };
    }, []);

    const score = Math.round((completed.length / 9) * 100);
    const nextModuleId = ARTICLES.find(a => !completed.includes(a.id))?.id || ARTICLES[0].id;
    const nextModuleTitle = ARTICLES.find(a => a.id === nextModuleId)?.title;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12" style={{ perspective: "1500px" }}>
            <div className="md:col-span-2">
               <TiltCard>
                <div className="h-full glass p-8 rounded-[2.5rem] dark:bg-slate-900/60 shadow-xl relative overflow-hidden border border-blue-500/20">
                    <div className="scanline-overlay animate-scanline opacity-30"></div>
                    <div className="relative z-10">
                        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-blue-500 dark:text-blue-400 mb-2">Статус цифровой культуры</h3>
                        <div className="text-3xl md:text-4xl font-black mb-4 tracking-tighter text-slate-800 dark:text-white">
                            {score === 100 ? 'Призрак Сети 👤' : score > 60 ? 'Страж Крепости 🏰' : score > 20 ? 'Защитник 🛡️' : 'Цифровой Новичок 👶'}
                        </div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex-grow h-3 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 dark:bg-yellow-400 shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-1000" style={{ width: `${score}%` }}></div>
                            </div>
                            <span className="font-mono font-black text-slate-700 dark:text-white">{score}%</span>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-blue-100/70 italic font-medium">
                            {score === 0 ? 'Твой путь еще не начат. Прочти лонгрид первого модуля!' : 
                            score < 100 ? `Твой профиль становится невидимым. Осталось ${9 - completed.length} модулей.` : 
                            'Поздравляем! Твоя цифровая крепость полностью построена.'}
                        </p>
                        
                        <AchievementsGallery />
                    </div>
                </div>
               </TiltCard>
            </div>
            
            <TiltCard>
                <div className="h-full glass dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[2.5rem] flex flex-col justify-center items-center shadow-md relative overflow-hidden">
                    <div className="relative z-10 text-center">
                        <div className="mb-4 flex justify-center">
                            <HolographicShield completedCount={completed.length} />
                        </div>
                        <div className="text-blue-500 font-black text-[10px] uppercase tracking-widest mb-2">Ближайшая цель</div>
                        <h4 className="text-lg font-black mb-4 dark:text-white leading-tight">{score === 100 ? 'Ты прошел всё!' : `${nextModuleTitle}`}</h4>
                        <Link to={score === 100 ? "/articles" : `/article/${nextModuleId}`} className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs hover:underline group">
                            {score === 100 ? 'Повторить базу' : 'Приступить к анализу'}
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>
                </div>
            </TiltCard>
        </div>
    );
};
