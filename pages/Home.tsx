
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from './LayoutWrapper';

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
        <div className="relative w-full h-[200px] bg-slate-900 rounded-3xl overflow-hidden border border-blue-500/20 mt-10">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] bg-center bg-no-repeat bg-contain"></div>
            <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                <span className="text-[10px] font-mono text-red-500 font-bold uppercase tracking-widest">LIVE THREAT MONITOR</span>
            </div>
            {attacks.map(attack => (
                <div 
                    key={attack.id} 
                    className="threat-map-dot animate-ping" 
                    style={{ top: `${attack.top}%`, left: `${attack.left}%` }}
                ></div>
            ))}
            <div className="absolute bottom-4 right-4 text-[9px] font-mono text-blue-400 opacity-60">
                ACTIVE_NODES: 1,482 <br/>
                ENCRYPTION: AES-256
            </div>
        </div>
    );
};

const Home: React.FC = () => {
  return (
    <Layout>
      <header className="hero-gradient pt-24 pb-40 px-5 text-center">
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">Твой цифровой путь<br/>начинается здесь</h1>
        <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto font-medium">SafeStep поможет тебе взять под контроль свой цифровой след и построить неприступную крепость в сети.</p>
      </header>

      <main className="container-box mt-[-100px] dark:bg-slate-800 dark:border-slate-700">
        <section className="hub-info mb-12">
          <h2 className="text-4xl font-black text-[#1e3c72] dark:text-blue-400 mb-6">О проекте</h2>
          <p className="text-gray-700 dark:text-gray-100 text-xl leading-relaxed">Каждое действие в сети оставляет отпечаток. Мы подготовили интерактивные инструменты, чтобы ты мог провести ревизию своего прошлого и защитить свое будущее.</p>
          <ThreatMap />
        </section>

        <div className="hub-grid grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="hub-card bg-gray-50 dark:bg-slate-900/60 p-10 rounded-[2.5rem] border border-gray-100 dark:border-slate-700 text-center hover:border-blue-400 transition-all group shadow-sm hover:shadow-xl">
            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">📚</div>
            <h3 className="text-2xl font-black text-[#1e3c72] dark:text-white mb-4 uppercase tracking-wide">База знаний</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">9 глубоких интерактивных модулей о безопасности: от паролей до ИИ-профилирования.</p>
            <Link to="/articles" className="hub-btn inline-block bg-[#1e3c72] dark:bg-blue-600 text-white px-10 py-4 rounded-2xl font-black hover:scale-105 transition-transform shadow-lg">Изучить темы</Link>
          </div>
          <div className="hub-card bg-gray-50 dark:bg-slate-900/60 p-10 rounded-[2.5rem] border border-gray-100 dark:border-slate-700 text-center hover:border-green-400 transition-all group shadow-sm hover:shadow-xl">
            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">🎯</div>
            <h3 className="text-2xl font-black text-[#1e3c72] dark:text-white mb-4 uppercase tracking-wide">Финальный Тест</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">Проверь свою готовность к угрозам современного интернета и получи статус мастера.</p>
            <Link to="/quiz" className="hub-btn inline-block bg-[#38a169] dark:bg-green-600 text-white px-10 py-4 rounded-2xl font-black hover:scale-105 transition-transform shadow-lg">Начать тест</Link>
          </div>
        </div>
      </main>

      <section className="faq-section bg-gray-50 dark:bg-slate-900/40 py-24 px-5 transition-colors">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-[#1e3c72] dark:text-blue-400 text-center mb-16 uppercase tracking-widest">FAQ</h2>
          <div className="space-y-6">
            <details className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-200 dark:border-slate-700 cursor-pointer group transition-all hover:shadow-md">
              <summary className="font-black text-[#1e3c72] dark:text-white list-none flex justify-between items-center text-lg">
                Зачем мне следить за своим цифровым следом?
                <span className="text-[#fdbb2d] group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-5 text-gray-700 dark:text-gray-100 leading-relaxed font-medium">Ваша репутация в сети влияет на поступление в вузы и будущую карьеру. То, что кажется шуткой в 14 лет, может стать серьезным препятствием при приеме на работу в 20.</p>
            </details>
            <details className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-200 dark:border-slate-700 cursor-pointer group transition-all hover:shadow-md">
              <summary className="font-black text-[#1e3c72] dark:text-white list-none flex justify-between items-center text-lg">
                Помогает ли режим "Инкогнито"?
                <span className="text-[#fdbb2d] group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-5 text-gray-700 dark:text-gray-100 leading-relaxed font-medium">Этот режим лишь не сохраняет историю на конкретном устройстве. Ваш провайдер, сайты и системы слежки по-прежнему видят ваш трафик и уникальный отпечаток браузера.</p>
            </details>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
