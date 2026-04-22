
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from './LayoutWrapper';
import { ARTICLES } from '../constants';

const SideDecorations: React.FC = () => (
    <>
        {/* Left Side Gutter */}
        <div className="side-decoration side-left hidden 2xl:block">
            <div className="data-pillar">
                <div className="data-node top-[10%] animate-float"></div>
                <div className="data-node top-[40%] animate-float-delayed"></div>
                <div className="data-node top-[70%] animate-float"></div>
                <div className="absolute top-0 left-[-1px] w-1 h-full bg-blue-500/10 animate-scanline"></div>
            </div>
        </div>
        {/* Right Side Gutter */}
        <div className="side-decoration side-right hidden 2xl:block">
            <div className="data-pillar">
                <div className="data-node top-[25%] animate-float-delayed"></div>
                <div className="data-node top-[55%] animate-float"></div>
                <div className="data-node top-[85%] animate-float-delayed"></div>
                <div className="absolute top-0 left-[-1px] w-1 h-full bg-blue-500/10 animate-scanline"></div>
            </div>
        </div>
    </>
);

const HolographicShield: React.FC = () => (
    <div className="relative w-24 h-24 flex items-center justify-center animate-float">
        <div className="absolute inset-0 hologram-circle rounded-full animate-spin-slow"></div>
        <div className="absolute inset-2 border-2 border-dashed border-blue-500/40 rounded-full animate-spin"></div>
        <div className="relative text-4xl animate-hologram">🛡️</div>
        <div className="absolute top-0 left-1/2 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-4 right-0 w-1 h-1 bg-blue-400 rounded-full animate-ping delay-700"></div>
    </div>
);

const SecurityDashboard: React.FC = () => {
    const [completed, setCompleted] = useState<string[]>([]);
    
    useEffect(() => {
        const update = () => {
            const data = JSON.parse(localStorage.getItem('completed_modules') || '[]');
            setCompleted(data);
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="md:col-span-2 glass p-8 rounded-[2.5rem] dark:bg-slate-900/60 shadow-xl relative overflow-hidden group border border-blue-500/20 card-3d">
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
                        {score === 0 ? 'Твой путь еще не начат. Пора провести первую ревизию!' : 
                         score < 100 ? `Твой профиль становится невидимым. Осталось ${9 - completed.length} модулей.` : 
                         'Поздравляем! Твоя цифровая крепость полностью построена.'}
                    </p>
                </div>
                <div className="absolute -bottom-10 -right-10 text-[10rem] opacity-[0.03] dark:opacity-10 group-hover:scale-110 transition-transform pointer-events-none">🛡️</div>
            </div>
            
            <div className="glass dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[2.5rem] flex flex-col justify-center items-center shadow-md relative overflow-hidden card-3d">
                <div className="relative z-10 text-center">
                    <div className="mb-4 flex justify-center">
                        <HolographicShield />
                    </div>
                    <div className="text-blue-500 font-black text-[10px] uppercase tracking-widest mb-2">Ближайшая цель</div>
                    <h4 className="text-lg font-black mb-4 dark:text-white leading-tight">{score === 100 ? 'Ты прошел всё!' : `${nextModuleTitle}`}</h4>
                    <Link to={score === 100 ? "/articles" : `/article/${nextModuleId}`} className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs hover:underline group">
                        {score === 100 ? 'Повторить базу' : 'Приступить к анализу'}
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

const ThreatMap: React.FC = () => {
    const [attacks, setAttacks] = useState<{id: number, top: number, left: number}[]>([]);
    
    useEffect(() => {
        const interval = setInterval(() => {
            const newAttack = {
                id: Date.now(),
                top: Math.random() * 80 + 10,
                left: Math.random() * 80 + 10
            };
            setAttacks(prev => [...prev.slice(-5), newAttack]);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-[220px] bg-slate-950 rounded-[2.5rem] overflow-hidden border border-blue-500/10 mt-12 shadow-2xl group">
            <div className="scanline-overlay animate-scanline opacity-20"></div>
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] bg-center bg-no-repeat bg-contain group-hover:scale-110 transition-transform duration-1000"></div>
            <div className="absolute top-6 left-6 flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                <span className="text-[10px] font-mono text-red-500 font-black uppercase tracking-[0.3em]">Live Threat Monitor</span>
            </div>
            {attacks.map(attack => (
                <div 
                    key={attack.id} 
                    className="threat-map-dot absolute w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_red]" 
                    style={{ top: `${attack.top}%`, left: `${attack.left}%` }}
                ></div>
            ))}
            <div className="absolute bottom-6 right-6 text-[8px] font-mono text-blue-400 opacity-50 text-right uppercase leading-relaxed">
                Packet_Filter: ON <br/>
                Risk_Level: NOMINAL
            </div>
        </div>
    );
};

const Home: React.FC = () => {
  return (
    <Layout>
      <header className="hero-gradient pt-32 pb-48 px-5 text-center relative overflow-hidden">
        {/* Subtle Cyber Grid in Background */}
        <div className="cyber-grid opacity-30"></div>
        
        {/* Animated Cyber-Particles for Side Areas */}
        <SideDecorations />

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0,transparent_70%)] pointer-events-none"></div>
        
        <div className="relative z-30 animate-in fade-in slide-in-from-top-4 duration-1000 max-w-4xl mx-auto">
            <div className="inline-block px-4 py-1 bg-blue-500/10 border border-blue-400/20 rounded-full text-[9px] font-black uppercase tracking-[0.4em] mb-8 text-blue-200">
                SafeStep.Protocol // Phase 01
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 tracking-tighter leading-[1.1] text-white">
              Твой цифровой путь<br/>начинается здесь
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl opacity-80 max-w-3xl mx-auto font-medium text-blue-50 mb-10 leading-relaxed px-4">
              SafeStep поможет тебе взять под контроль свой цифровой след и построить неприступную крепость в сети.
            </p>
            <div className="flex justify-center gap-3">
                <div className="w-1.5 h-1.5 bg-blue-400/40 rounded-full animate-ping"></div>
                <div className="w-1.5 h-1.5 bg-blue-400/40 rounded-full animate-ping delay-300"></div>
                <div className="w-1.5 h-1.5 bg-blue-400/40 rounded-full animate-ping delay-700"></div>
            </div>
        </div>
      </header>

      <main className="container-box glass">
        <SecurityDashboard />
        
        <section className="hub-info mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">О проекте</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl leading-relaxed font-medium">Каждое действие в сети оставляет отпечаток. Мы подготовили интерактивные инструменты, чтобы ты мог провести ревизию своего прошлого и защитить свое будущее.</p>
          <ThreatMap />
        </section>

        <div className="hub-grid grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div className="hub-card glass p-8 lg:p-12 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 text-center hover:border-blue-400/50 transition-all group shadow-sm hover:shadow-xl card-3d relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=400&fit=crop" 
                className="w-full h-full object-cover" 
                alt="Card Background" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="relative z-10">
              <div className="text-5xl lg:text-6xl mb-6 lg:mb-8 group-hover:scale-110 transition-transform">📚</div>
              <h3 className="text-xl lg:text-2xl font-black text-slate-800 dark:text-white mb-4 uppercase tracking-wide">База знаний</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed font-medium">9 глубоких интерактивных модулей о безопасности: от паролей до цифрового профилирования.</p>
              <Link to="/articles" className="inline-block bg-[#1e3c72] dark:bg-blue-600 text-white px-10 py-4 rounded-xl font-black hover:scale-105 active:scale-95 transition-all shadow-lg text-sm">Изучить темы</Link>
            </div>
          </div>
          <div className="hub-card glass p-8 lg:p-12 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 text-center hover:border-green-400/50 transition-all group shadow-sm hover:shadow-xl card-3d relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=400&fit=crop" 
                className="w-full h-full object-cover" 
                alt="Card Background" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="relative z-10">
              <div className="text-5xl lg:text-6xl mb-6 lg:mb-8 group-hover:scale-110 transition-transform">🎯</div>
              <h3 className="text-xl lg:text-2xl font-black text-slate-800 dark:text-white mb-4 uppercase tracking-wide">Финальный Тест</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed font-medium">Проверь свою готовность к угрозам современного интернета и получи статус мастера.</p>
              <Link to="/quiz" className="inline-block bg-green-600 text-white px-10 py-4 rounded-xl font-black hover:scale-105 active:scale-95 transition-all shadow-lg text-sm">Начать тест</Link>
            </div>
          </div>
        </div>
      </main>

      <section className="faq-section py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white text-center mb-12 uppercase tracking-widest">FAQ</h2>
          <div className="space-y-4">
            <details className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm p-6 lg:p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 cursor-pointer group transition-all hover:shadow-md">
              <summary className="font-black text-slate-800 dark:text-white list-none flex justify-between items-center text-lg md:text-xl leading-tight">
                Зачем мне следить за своим цифровым следом?
                <span className="text-blue-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-6 text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-base md:text-lg">Ваша репутация в сети влияет на поступление в вузы и будущую карьеру. То, что кажется шуткой в 14 лет, может стать серьезным препятствием при приеме на работу в 20.</p>
            </details>
            <details className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm p-6 lg:p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 cursor-pointer group transition-all hover:shadow-md">
              <summary className="font-black text-slate-800 dark:text-white list-none flex justify-between items-center text-lg md:text-xl leading-tight">
                Помогает ли режим "Инкогнито"?
                <span className="text-blue-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-6 text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-base md:text-lg">Этот режим лишь не сохраняет историю на конкретном устройстве. Ваш провайдер, сайты и системы слежки по-прежнему видят ваш трафик.</p>
            </details>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
