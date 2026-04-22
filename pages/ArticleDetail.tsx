
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ARTICLES, BIG_ARTICLES_STORAGE } from '../constants';
import { Layout } from './LayoutWrapper';
import { IncognitoTool } from '../components/IncognitoTool';
import { SmartphoneSpyTool } from '../components/SmartphoneSpyTool';
import { PhishingTrainer } from '../components/PhishingTrainer';
import { ProfilerTool } from '../components/ProfilerTool';
import { FinalTool } from '../components/FinalTool';
import { GamingTool } from '../components/GamingTool';
import { GeolocationTool } from '../components/GeolocationTool';
import { PastRevisionTool } from '../components/PastRevisionTool';
import { PasswordsTool } from '../components/PasswordsTool';

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const article = ARTICLES.find(a => a.id === id);
  const [activeTab, setActiveTab] = useState('theory');
  const [zenMode, setZenMode] = useState(false);

  const markComplete = () => {
    if (!id) return;
    const completed = JSON.parse(localStorage.getItem('completed_modules') || '[]');
    if (!completed.includes(id)) {
      completed.push(id);
      localStorage.setItem('completed_modules', JSON.stringify(completed));
      window.dispatchEvent(new Event('storage'));
    }
  };

  if (!article) return <Layout><div>Статья не найдена</div></Layout>;

  if (zenMode) {
    return (
      <Layout>
        <div className="bg-[#fafaf9] dark:bg-slate-950 min-h-screen py-16 px-6 animate-in fade-in duration-700">
          <div className="telegraph-content">
             <div className="mb-16 pb-8 border-b border-gray-200 dark:border-slate-800 flex justify-between items-end">
                <div>
                   <button onClick={() => setZenMode(false)} className="text-blue-600 font-bold hover:opacity-70 transition-opacity mb-4 inline-block uppercase tracking-widest text-xs">← Назад к модулю</button>
                   <div className="text-7xl mb-4">{article.emoji}</div>
                </div>
                <div className="text-right text-xs font-mono opacity-40 uppercase">SafeStep Intelligence Report // 2026</div>
             </div>
             <div className="dark:text-slate-200 prose prose-slate dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: BIG_ARTICLES_STORAGE[article.id] || "Контент в разработке..." }} />
             <div className="mt-24 pt-12 border-t border-gray-200 dark:border-slate-800 text-center">
                <button 
                  onClick={() => { markComplete(); setZenMode(false); window.scrollTo(0,0); }} 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-14 py-5 rounded-full font-black shadow-2xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest"
                >
                  Завершить чтение 🏁
                </button>
             </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <header className="hero-gradient pt-28 pb-40 px-5 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={`https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=600&fit=crop`} 
            className="w-full h-full object-cover" 
            alt="Hero Background" 
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10">
          <div className="relative inline-block">
            <div className="text-7xl mb-6 drop-shadow-xl animate-float">{article.emoji}</div>
            {article.id === 'geolocation' && (
              <div className="absolute -top-4 -right-4 text-4xl animate-bounce">📍</div>
            )}
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">{article.title}</h1>
          <p className="text-blue-100 text-lg md:text-xl font-medium opacity-80 max-w-2xl mx-auto">{article.subtitle}</p>
        </div>
      </header>

      <main className="container-box glass">
        {/* Updated Navigation Buttons - Individual cards/buttons instead of unified tab bar */}
        <div className={`grid grid-cols-1 ${article.id === 'geolocation' ? 'sm:grid-cols-2' : 'sm:grid-cols-3'} gap-4 mb-16`}>
          <button 
            className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 group ${activeTab === 'theory' ? 'bg-blue-600 border-blue-600 text-white shadow-xl scale-[1.02]' : 'bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800 text-slate-500 hover:border-blue-400'}`} 
            onClick={() => setActiveTab('theory')}
          >
            <span className="text-2xl">💡</span>
            <span className="font-black uppercase tracking-widest text-[10px]">Информация</span>
          </button>
          <button 
            className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 group ${activeTab === 'practice' ? 'bg-blue-600 border-blue-600 text-white shadow-xl scale-[1.02]' : 'bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800 text-slate-500 hover:border-blue-400'}`} 
            onClick={() => setActiveTab('practice')}
          >
            <span className="text-2xl">✅</span>
            <span className="font-black uppercase tracking-widest text-[10px]">Золотые правила</span>
          </button>
          {article.id !== 'geolocation' && (
            <button 
              className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 group ${activeTab === 'trainer' ? 'bg-blue-600 border-blue-600 text-white shadow-xl scale-[1.02]' : 'bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800 text-slate-500 hover:border-blue-400'}`} 
              onClick={() => setActiveTab('trainer')}
            >
              <span className="text-2xl">🧪</span>
              <span className="font-black uppercase tracking-widest text-[10px]">Практикум</span>
            </button>
          )}
        </div>

        {activeTab === 'theory' && (
          <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-500">
            <div className="bg-blue-50/50 dark:bg-slate-900/40 p-8 md:p-12 rounded-[2.5rem] border border-blue-100/50 dark:border-slate-800 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-grow">
                <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-6">Суть модуля</h3>
                <p className="text-xl md:text-3xl text-slate-800 dark:text-slate-100 font-black leading-tight">
                  {article.description}
                </p>
              </div>
              <div className="shrink-0 w-full md:w-48 h-48 rounded-3xl overflow-hidden shadow-xl border-4 border-white dark:border-slate-800">
                <img 
                  src={`https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=400&fit=crop`} 
                  className="w-full h-full object-cover" 
                  alt="Module Concept" 
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            
            <div className="p-8 md:p-12 bg-slate-900 rounded-[2.5rem] text-white text-center shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 opacity-10 text-[12rem] pointer-events-none group-hover:scale-110 transition-transform">📖</div>
              <h4 className="text-2xl md:text-3xl font-black mb-4 relative z-10">Погружение в детали</h4>
              <p className="text-slate-400 mb-10 max-w-lg mx-auto text-base md:text-lg relative z-10 font-medium">Мы подготовили исчерпывающий материал с реальными кейсами и секретами защиты в стиле профессионального отчета.</p>
              <button 
                onClick={() => { setZenMode(true); window.scrollTo(0,0); }} 
                className="bg-white text-slate-900 px-10 md:px-16 py-4 md:py-6 rounded-2xl font-black hover:bg-blue-50 hover:scale-105 active:scale-95 transition-all shadow-xl relative z-10 uppercase tracking-widest text-xs"
              >
                Открыть лонгрид 📖
              </button>
            </div>
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="grid gap-4 animate-in slide-in-from-bottom-4 duration-500">
            {[1, 2, 3].map((num) => (
              <div key={num} className="bg-white dark:bg-slate-900/40 p-6 md:p-8 rounded-[2rem] border border-gray-100 dark:border-slate-800 flex items-center gap-6 md:gap-8 hover:border-blue-300 transition-colors group">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center font-black text-xl md:text-2xl shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">{num}</div>
                <p className="text-base md:text-xl font-bold text-slate-700 dark:text-slate-200 leading-snug">
                  {num === 1 && "Никогда не переходи по ссылкам из личных сообщений, даже если прислал друг."}
                  {num === 2 && "Включай двухфакторную аутентификацию (2FA) на всех важных сервисах."}
                  {num === 3 && "Проверяй написание домена в адресной строке: g0ogle.com - это обман."}
                </p>
              </div>
            ))}
            <div className="text-center mt-10">
                <button onClick={markComplete} className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:opacity-70 transition-opacity">Отметить как изученное ✅</button>
            </div>
          </div>
        )}

        {activeTab === 'trainer' && (
          <div className="animate-in fade-in duration-500 min-h-[350px]">
            {article.id === 'incognito' && <IncognitoTool onComplete={markComplete} />}
            {/* Added onComplete prop to track completion */}
            {article.id === 'smartphone_spy' && <SmartphoneSpyTool onComplete={markComplete} />}
            {/* Added onComplete prop to track completion */}
            {article.id === 'phishing' && <PhishingTrainer onComplete={markComplete} />}
            {article.id === 'gaming' && <GamingTool onComplete={markComplete} />}
            {article.id === 'geolocation' && <GeolocationTool onComplete={markComplete} />}
            {article.id === 'photos_profiling' && <ProfilerTool onComplete={markComplete} />}
            {article.id === 'final_summary' && <FinalTool onComplete={markComplete} />}
            {article.id === 'past_revision' && <PastRevisionTool onComplete={markComplete} />}
            {article.id === 'passwords' && <PasswordsTool onComplete={markComplete} />}
          </div>
        )}

        <div className="mt-24 text-center border-t border-gray-100 dark:border-slate-800 pt-12">
          <Link to="/articles" className="text-slate-400 hover:text-blue-500 font-black transition-colors uppercase tracking-[0.3em] text-[10px]">
            ← Вернуться к библиотеке SafeStep
          </Link>
        </div>
      </main>
    </Layout>
  );
};

export default ArticleDetail;
