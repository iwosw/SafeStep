
import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from './LayoutWrapper';
import { SecurityDashboard } from '../components/home/SecurityDashboard';
import { ThreatMap } from '../components/home/ThreatMap';
import { TiltCard } from '../components/ui/TiltCard';
import { DarkWebScanner } from '../components/home/DarkWebScanner';

const Home: React.FC = () => {
  return (
    <Layout>
      <header className="hero-gradient pt-32 pb-48 px-5 text-center relative overflow-hidden">
        {/* Subtle Cyber Grid in Background */}
        <div className="cyber-grid opacity-30"></div>

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

        <DarkWebScanner />

        <div className="hub-grid grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <TiltCard className="h-full">
            <Link to="/articles" className="hub-card glass p-8 lg:p-12 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 text-center hover:border-blue-400/50 transition-all group shadow-sm hover:shadow-xl relative overflow-hidden h-full flex flex-col block cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-blue-500">
              <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
                <img 
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=400&fit=crop" 
                  className="w-full h-full object-cover" 
                  alt="Card Background" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="relative z-10 flex flex-col items-center h-full pointer-events-none">
                <div className="text-5xl lg:text-6xl mb-6 lg:mb-8 group-hover:scale-110 transition-transform">📚</div>
                <h3 className="text-xl lg:text-2xl font-black text-slate-800 dark:text-white mb-4 uppercase tracking-wide">База знаний</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed font-medium flex-grow">9 глубоких интерактивных модулей о безопасности: от паролей до цифрового профилирования.</p>
                <div>
                  <span className="inline-block bg-[#1e3c72] dark:bg-blue-600 text-white px-10 py-4 rounded-xl font-black transition-all shadow-lg text-sm group-hover:scale-105 group-active:scale-95">Изучить темы</span>
                </div>
              </div>
            </Link>
          </TiltCard>
          <TiltCard className="h-full">
            <Link to="/quiz" className="hub-card glass p-8 lg:p-12 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 text-center hover:border-green-400/50 transition-all group shadow-sm hover:shadow-xl relative overflow-hidden h-full flex flex-col block cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-green-500">
              <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
                <img 
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=400&fit=crop" 
                  className="w-full h-full object-cover" 
                  alt="Card Background" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="relative z-10 flex flex-col items-center h-full pointer-events-none">
                <div className="text-5xl lg:text-6xl mb-6 lg:mb-8 group-hover:scale-110 transition-transform">🎯</div>
                <h3 className="text-xl lg:text-2xl font-black text-slate-800 dark:text-white mb-4 uppercase tracking-wide">Финальный Тест</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed font-medium flex-grow">Проверь свою готовность к угрозам современного интернета и получи статус мастера.</p>
                <div>
                  <span className="inline-block bg-green-600 text-white px-10 py-4 rounded-xl font-black transition-all shadow-lg text-sm group-hover:scale-105 group-active:scale-95">Начать тест</span>
                </div>
              </div>
            </Link>
          </TiltCard>
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
