
import React, { useState, useEffect } from 'react';
import { QUIZ_DATA } from '../constants';
import { Layout } from './LayoutWrapper';
import { TiltCard } from '../components/ui/TiltCard';

const Quiz: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean, text: string } | null>(null);
  const [rank, setRank] = useState('');
  const [userName, setUserName] = useState('');

  const progress = ((currentStep + 1) / QUIZ_DATA.length) * 100;

  useEffect(() => {
    if (finished) {
        if (score === QUIZ_DATA.length) setRank('ПРИЗРАК СЕТИ 👻');
        else if (score > 15) setRank('МАСТЕР КРЕПОСТИ 🏰');
        else if (score > 10) setRank('ОПЫТНЫЙ ПОЛЬЗОВАТЕЛЬ 🛡️');
        else setRank('ЦИФРОВОЙ НОВИЧОК 👶');
    }
  }, [finished, score]);

  const handleAnswer = (idx: number) => {
    const question = QUIZ_DATA[currentStep];
    const isCorrect = idx === question.correct;
    
    if (isCorrect) setScore(s => s + 1);
    setFeedback({ isCorrect, text: isCorrect ? question.desc : "Ловушка сработала! На самом деле: " + question.desc });

    setTimeout(() => {
        setFeedback(null);
        if (currentStep < QUIZ_DATA.length - 1) {
            setCurrentStep(s => s + 1);
        } else {
            setFinished(true);
        }
    }, 3000);
  };

  return (
    <Layout>
      <header className="hero-gradient pt-32 pb-44 px-5 text-center">
        <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter text-white">Cyber IQ Test</h1>
        <p className="text-lg md:text-xl opacity-90 max-w-xl mx-auto text-blue-50 font-medium">20 вопросов с подвохами, чтобы проверить твою реальную защиту</p>
      </header>

      <main className="container-box">
        <div className="w-full">
            {!finished && (
              <div className="mb-12">
                <div className="flex justify-between items-end mb-4">
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">Прогресс защиты</span>
                    <span className="text-sm font-mono font-black">{currentStep + 1} / {QUIZ_DATA.length}</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 transition-all duration-700 shadow-[0_0_15px_rgba(37,99,235,0.4)]" 
                      style={{ width: `${progress}%` }}
                    ></div>
                </div>
              </div>
            )}
            
            {finished ? (
                <div className="text-center py-10 animate-in zoom-in duration-500">
                    {!userName ? (
                      <div className="max-w-md mx-auto space-y-8">
                        <h3 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">Твой результат готов!</h3>
                        <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Введи свое имя, чтобы получить сертификат мастера:</p>
                        <input 
                          className="w-full p-6 rounded-3xl border-2 bg-slate-50 dark:bg-slate-900 border-transparent focus:border-blue-500 outline-none text-center text-2xl font-black dark:text-white shadow-inner transition-all"
                          placeholder="Имя Фамилия"
                          value={userName}
                          onChange={(e) => { if(e.target.value.length < 25) setUserName(e.target.value); }}
                        />
                        <button onClick={() => setUserName(userName || 'Аноним')} className="w-full bg-blue-600 text-white py-6 rounded-3xl font-black text-xl shadow-2xl hover:scale-105 transition-all">Создать сертификат 💳</button>
                      </div>
                    ) : (
                      <TiltCard>
                        <div className="certificate-card mx-auto max-w-2xl mb-12 bg-white dark:bg-slate-900 border-8 border-slate-100 dark:border-slate-800 p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>
                          <div className="flex justify-between items-start mb-12">
                            <div className="text-left">
                              <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-800 dark:text-white">SAFESTEP PASS</h2>
                              <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest mt-1">SER_ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                            </div>
                            <div className="text-5xl">🛡️</div>
                          </div>
                          
                          <div className="space-y-8 text-left">
                            <div>
                              <p className="text-[10px] uppercase font-black opacity-30 mb-2 tracking-widest">Holder Name</p>
                              <p className="text-3xl font-black tracking-tight uppercase text-slate-900 dark:text-white">{userName}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-10">
                              <div>
                                <p className="text-[10px] uppercase font-black opacity-30 mb-2 tracking-widest">Clearance Level</p>
                                <p className="font-black text-2xl text-blue-600 dark:text-blue-400 leading-tight">{rank}</p>
                              </div>
                              <div>
                                <p className="text-[10px] uppercase font-black opacity-30 mb-2 tracking-widest">Efficiency</p>
                                <p className="font-black text-2xl text-slate-900 dark:text-white">{Math.round((score/QUIZ_DATA.length)*100)}%</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
                            <p className="text-[10px] font-mono opacity-30 uppercase tracking-[0.4em]">Digital Hygiene Certified • 2026 • Global Protocol Verified</p>
                          </div>
                        </div>
                      </TiltCard>
                    )}
                    
                    {userName && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg mx-auto no-print mt-8">
                        <button onClick={() => window.print()} className="bg-slate-900 border border-slate-700 text-white py-5 rounded-2xl font-black shadow-xl hover:scale-105 active:scale-95 transition-all outline-none flex items-center justify-center gap-2">
                           Скачать / PDF 🖨️
                        </button>
                        <a href="#/articles" className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-white py-5 rounded-2xl font-black shadow-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-all uppercase tracking-widest text-xs text-center flex items-center justify-center">В базу знаний</a>
                      </div>
                    )}
                </div>
            ) : (
                <div className="question-block animate-in fade-in duration-500">
                    <p className="text-2xl md:text-3xl font-black mb-10 text-slate-800 dark:text-white leading-tight min-h-[80px]">
                      {QUIZ_DATA[currentStep].q}
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                        {QUIZ_DATA[currentStep].options.map((opt, i) => (
                            <button 
                                key={i} 
                                onClick={() => !feedback && handleAnswer(i)}
                                className={`w-full p-6 md:p-8 text-left border-2 rounded-3xl font-bold transition-all flex items-center gap-6 group ${
                                  feedback 
                                    ? 'cursor-not-allowed opacity-50' 
                                    : 'border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:border-blue-500 hover:bg-white dark:hover:bg-slate-800 hover:translate-x-3 shadow-sm hover:shadow-xl'
                                }`}
                                disabled={!!feedback}
                            >
                                <span className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 text-sm font-black group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all">
                                  {String.fromCharCode(65 + i)}
                                </span>
                                <span className="text-slate-700 dark:text-slate-200 text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{opt}</span>
                            </button>
                        ))}
                    </div>

                    {feedback && (
                        <div className={`mt-10 p-8 rounded-[2.5rem] font-bold animate-in slide-in-from-bottom duration-300 border-l-[12px] shadow-2xl ${
                          feedback.isCorrect 
                            ? 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-800 dark:text-green-300' 
                            : 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-300'
                        }`}>
                            <div className="flex items-center gap-3 mb-3 text-xl font-black uppercase tracking-tight">
                              <span className="text-2xl">{feedback.isCorrect ? '🎯' : '⚠️'}</span>
                              <span>{feedback.isCorrect ? 'Анализ верен' : 'Ошибка доступа'}</span>
                            </div>
                            <div className="text-base md:text-lg opacity-90 leading-relaxed font-medium">{feedback.text}</div>
                        </div>
                    )}
                </div>
            )}
        </div>
      </main>
    </Layout>
  );
};

export default Quiz;
