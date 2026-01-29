
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ARTICLES, BIG_ARTICLES_STORAGE } from '../constants';
import { Layout } from './LayoutWrapper';
import { simulateOsintScan } from '../services/geminiService';
import { generateSecurePassphrase } from '../services/passwordGenerator';
import { IncognitoTool } from '../components/IncognitoTool';
import { SmartphoneSpyTool } from '../components/SmartphoneSpyTool';
import { PhishingTrainer } from '../components/PhishingTrainer';
import { AITool } from '../components/AITool';
import { FinalTool } from '../components/FinalTool';

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const article = ARTICLES.find(a => a.id === id);
  const [activeTab, setActiveTab] = useState('theory');
  const [zenMode, setZenMode] = useState(false);

  // OSINT State
  const [nick, setNick] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<{ text: string, type: 'sys' | 'warn' | 'crit' }[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  const handleOsintScan = async () => {
    if (!nick) return alert("Введите никнейм!");
    setIsScanning(true);
    setTerminalLogs([{ text: "Инициализация нейронного поиска...", type: 'sys' }]);
    const findings = await simulateOsintScan(nick, "");
    setTerminalLogs(findings.map((f: string) => ({ text: f, type: 'warn' })));
    setIsScanning(false);
  };

  if (!article) return <Layout><div>Статья не найдена</div></Layout>;

  if (zenMode) {
    return (
      <Layout>
        <div className="bg-[#fafaf9] dark:bg-slate-950 min-h-screen py-16 px-6 animate-in fade-in duration-700">
          <div className="telegraph-content">
             <div className="mb-16 pb-8 border-b border-gray-200 dark:border-slate-800 flex justify-between items-end">
                <div>
                   <Link to={`/article/${id}`} onClick={() => setZenMode(false)} className="text-blue-600 font-bold hover:opacity-70 transition-opacity mb-4 inline-block uppercase tracking-widest text-xs">← Назад к модулю</Link>
                   <div className="text-7xl mb-4">{article.emoji}</div>
                </div>
                <div className="text-right text-xs font-mono opacity-40 uppercase">SafeStep Intelligence Report // 2026</div>
             </div>
             <div dangerouslySetInnerHTML={{ __html: BIG_ARTICLES_STORAGE[article.id] || "Контент в разработке..." }} />
             <div className="mt-24 pt-12 border-t border-gray-200 dark:border-slate-800 text-center">
                <button 
                  onClick={() => { setZenMode(false); window.scrollTo(0,0); }} 
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
      <header className="hero-gradient pt-28 pb-40 px-5 text-center">
        <div className="text-7xl mb-6 drop-shadow-xl">{article.emoji}</div>
        <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-4">{article.title}</h1>
        <p className="text-blue-100 text-xl font-medium opacity-80 max-w-2xl mx-auto">{article.subtitle}</p>
      </header>

      <main className="container-box">
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          <button className={`tab-btn ${activeTab === 'theory' ? 'active' : ''}`} onClick={() => setActiveTab('theory')}>💡 Информация</button>
          <button className={`tab-btn ${activeTab === 'practice' ? 'active' : ''}`} onClick={() => setActiveTab('practice')}>✅ Золотые правила</button>
          <button className={`tab-btn ${activeTab === 'trainer' ? 'active' : ''}`} onClick={() => setActiveTab('trainer')}>🧪 Практический тренажер</button>
        </div>

        {activeTab === 'theory' && (
          <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-500">
            <div className="bg-blue-50/50 dark:bg-slate-900/40 p-10 md:p-12 rounded-[3rem] border border-blue-100/50 dark:border-slate-800">
              <h3 className="text-sm font-black text-blue-500 uppercase tracking-[0.3em] mb-6">Суть модуля</h3>
              <p className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-black leading-tight">
                {article.description}
              </p>
            </div>
            
            <div className="p-12 bg-slate-900 rounded-[3.5rem] text-white text-center shadow-2xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 opacity-10 text-[15rem] pointer-events-none">📖</div>
              <h4 className="text-3xl font-black mb-4 relative z-10">Погружение в детали</h4>
              <p className="text-slate-400 mb-10 max-w-lg mx-auto text-lg relative z-10 font-medium">Мы подготовили исчерпывающий материал с реальными кейсами и секретами защиты в стиле профессионального отчета.</p>
              <button 
                onClick={() => { setZenMode(true); window.scrollTo(0,0); }} 
                className="bg-white text-slate-900 px-16 py-6 rounded-2xl font-black hover:bg-blue-50 hover:scale-105 active:scale-95 transition-all shadow-xl relative z-10 uppercase tracking-widest text-sm"
              >
                Открыть лонгрид 📖
              </button>
            </div>
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="grid gap-6 animate-in slide-in-from-bottom-4 duration-500">
            {[1, 2, 3].map((num) => (
              <div key={num} className="bg-white dark:bg-slate-900/40 p-8 rounded-[2rem] border border-gray-100 dark:border-slate-800 flex items-center gap-8 hover:border-blue-300 transition-colors group">
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center font-black text-2xl shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">{num}</div>
                <p className="text-xl font-bold text-slate-700 dark:text-slate-200 leading-snug">
                  {num === 1 && "Никогда не переходи по ссылкам из личных сообщений, даже если прислал друг."}
                  {num === 2 && "Включай двухфакторную аутентификацию (2FA) на всех важных сервисах."}
                  {num === 3 && "Проверяй написание домена в адресной строке: g0ogle.com — это обман."}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'trainer' && (
          <div className="animate-in fade-in duration-500 min-h-[400px]">
            {article.id === 'incognito' && <IncognitoTool />}
            {article.id === 'smartphone_spy' && <SmartphoneSpyTool />}
            {article.id === 'phishing' && <PhishingTrainer />}
            {article.id === 'aiandyourphotos' && <AITool />}
            {article.id === 'final_summary' && <FinalTool />}
            {article.id === 'past_revision' && (
              <div className="space-y-8">
                <div className="relative group">
                    <input className="w-full p-8 bg-slate-50 dark:bg-slate-900 text-blue-600 dark:text-blue-400 border-2 border-transparent focus:border-blue-500 rounded-[2.5rem] font-black text-2xl placeholder-slate-400 outline-none transition-all shadow-inner" placeholder="Введи ник для анализа..." value={nick} onChange={e => setNick(e.target.value)} />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20 text-3xl">🔍</div>
                </div>
                <button onClick={handleOsintScan} disabled={isScanning} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-8 rounded-[2.5rem] font-black text-2xl shadow-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50">
                   {isScanning ? 'АНАЛИЗИРУЮ ОТКРЫТЫЕ ДАННЫЕ...' : 'Запустить ИИ-аудит личности 🕵️'}
                </button>
                <div id="terminal" className="mt-10 bg-slate-950 p-10 rounded-[2.5rem] font-mono text-blue-400 border border-slate-800 shadow-2xl overflow-hidden">
                  {terminalLogs.length === 0 ? <div className="opacity-30 italic animate-pulse">> Ожидание вводных данных...</div> : terminalLogs.map((l, i) => <div key={i} className="mb-2 flex gap-4"><span className="opacity-30">[{new Date().toLocaleTimeString()}]</span><span className="text-white font-bold">{l.text}</span></div>)}
                </div>
              </div>
            )}
            {article.id === 'passwords' && (
              <div className="text-center py-12">
                <div className="text-7xl mb-8">🔐</div>
                <h3 className="text-3xl font-black mb-10 text-slate-800 dark:text-white">Генератор "Сейф-Фраз"</h3>
                <div className="bg-slate-50 dark:bg-slate-900 border-4 border-dashed border-blue-500/10 rounded-[4rem] p-16 mb-10 shadow-inner">
                   <div className="text-4xl font-mono font-black text-blue-600 dark:text-white mb-12 tracking-tighter break-all">{nick || '••••_••••_••••'}</div>
                   <button onClick={() => setNick(generateSecurePassphrase())} className="bg-blue-600 hover:bg-blue-700 text-white px-16 py-6 rounded-2xl font-black hover:scale-105 active:scale-95 transition-all shadow-xl uppercase tracking-widest text-sm">Сгенерировать фразу ⚡</button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-24 text-center border-t border-gray-100 dark:border-slate-800 pt-12">
          <Link to="/articles" className="text-slate-400 hover:text-blue-500 font-black transition-colors uppercase tracking-[0.3em] text-xs">
            ← Вернуться к библиотеке SafeStep
          </Link>
        </div>
      </main>
    </Layout>
  );
};

export default ArticleDetail;
