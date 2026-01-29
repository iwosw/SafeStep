
import React, { useState, useEffect } from 'react';
import { QUIZ_DATA } from '../constants';
import { Layout } from './LayoutWrapper';

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
      <header className="hero-gradient pt-16 pb-24 md:pt-20 md:pb-32 px-5 text-center">
        <h1 className="text-4xl md:text-5xl font-black mb-4">Cyber IQ Test</h1>
        <p className="text-lg md:text-xl opacity-90 max-w-xl mx-auto">20 вопросов с подвохами, чтобы проверить твою реальную защиту</p>
      </header>

      <main className="container-box mt-[-60px] md:mt-[-80px] p-6 md:p-10">
        <div className="w-full">
            {!finished && (
              <div className="mb-8">
                <div className="flex justify-between items-end mb-2">
                    <span className="text-xs font-black uppercase tracking-widest text-[#1e3c72] dark:text-blue-400">Прогресс защиты</span>
                    <span className="text-sm font-mono font-bold">{currentStep + 1} / {QUIZ_DATA.length}</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#1e3c72] dark:bg-blue-500 transition-all duration-500 shadow-[0_0_10px_rgba(30,60,114,0.3)]" 
                      style={{ width: `${progress}%` }}
                    ></div>
                </div>
              </div>
            )}
            
            {finished ? (
                <div className="text-center py-6 md:py-10 animate-in zoom-in duration-500">
                    {!userName ? (
                      <div className="max-w-md mx-auto space-y-6">
                        <h3 className="text-2xl font-black text-[#1e3c72] dark:text-white uppercase">Твой результат готов!</h3>
                        <p className="text-gray-500 dark:text-gray-400">Введи свое имя, чтобы получить сертификат:</p>
                        <input 
                          className="w-full p-4 rounded-xl border-2 dark:bg-slate-800 dark:border-slate-700 outline-none focus:border-blue-500 text-center text-xl font-bold dark:text-white"
                          placeholder="Имя Фамилия"
                          value={userName}
                          onChange={(e) => { if(e.target.value.length < 25) setUserName(e.target.value); }}
                        />
                        <button onClick={() => setUserName(userName || 'Аноним')} className="read-more-btn">Создать сертификат 💳</button>
                      </div>
                    ) : (
                      <div className="certificate-card mx-auto max-w-2xl mb-12">
                        <div className="flex justify-between items-start mb-10">
                          <div className="text-left">
                            <h2 className="text-3xl font-black uppercase tracking-tighter">SAFESTEP PASS</h2>
                            <p className="text-[10px] font-mono opacity-60">SERIAL: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                          </div>
                          <div className="text-4xl">🛡️</div>
                        </div>
                        
                        <div className="space-y-4 text-left">
                          <div>
                            <p className="text-[10px] uppercase font-bold opacity-40 mb-1">Holder Name</p>
                            <p className="text-2xl font-black tracking-widest uppercase">{userName}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-[10px] uppercase font-bold opacity-40 mb-1">Clearance Level</p>
                              <p className="font-black text-blue-600 dark:text-blue-400">{rank}</p>
                            </div>
                            <div>
                              <p className="text-[10px] uppercase font-bold opacity-40 mb-1">Score</p>
                              <p className="font-black">{score} / {QUIZ_DATA.length}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-10 pt-6 border-t border-blue-500/20 text-center">
                          <p className="text-[10px] font-mono opacity-50 uppercase tracking-widest">Digital Hygiene Certified • 2026 • Verified System</p>
                        </div>
                      </div>
                    )}
                    
                    {userName && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                        <button onClick={() => window.location.reload()} className="read-more-btn bg-[#1e3c72] dark:bg-blue-600">Повторить ↻</button>
                        <a href="#/articles" className="read-more-btn bg-gray-100 dark:bg-slate-700 !text-gray-700 dark:!text-white border border-gray-200 dark:border-slate-600">В базу знаний</a>
                      </div>
                    )}
                </div>
            ) : (
                <div className="question-block animate-in fade-in duration-500">
                    <p className="text-xl md:text-2xl font-black mb-8 text-[#1e3c72] dark:text-white leading-tight min-h-[60px]">
                      {QUIZ_DATA[currentStep].q}
                    </p>
                    {/* ... answers loop ... */}
                    <div className="grid grid-cols-1 gap-4">
                        {QUIZ_DATA[currentStep].options.map((opt, i) => (
                            <button 
                                key={i} 
                                onClick={() => !feedback && handleAnswer(i)}
                                className={`w-full p-5 md:p-6 text-left border-2 rounded-2xl font-bold transition-all flex items-center gap-4 group ${
                                  feedback 
                                    ? 'cursor-not-allowed opacity-50' 
                                    : 'border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50 hover:border-[#1e3c72] dark:hover:border-blue-500 hover:translate-x-2'
                                }`}
                                disabled={!!feedback}
                            >
                                <span className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 flex items-center justify-center shrink-0 text-xs group-hover:bg-[#1e3c72] dark:group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                  {String.fromCharCode(65 + i)}
                                </span>
                                <span className="text-gray-700 dark:text-gray-200 group-hover:text-[#1e3c72] dark:group-hover:text-blue-300">{opt}</span>
                            </button>
                        ))}
                    </div>

                    {feedback && (
                        <div className={`mt-8 p-6 rounded-2xl font-bold animate-in slide-in-from-bottom duration-300 border-l-8 ${
                          feedback.isCorrect 
                            ? 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-800 dark:text-green-300' 
                            : 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-300'
                        }`}>
                            <div className="flex items-center gap-2 mb-2 text-lg">
                              <span>{feedback.isCorrect ? '🎯' : '⚠️'}</span>
                              <span>{feedback.isCorrect ? 'ТОЧНО В ЦЕЛЬ!' : 'ПОПАЛСЯ!'}</span>
                            </div>
                            <div className="text-sm md:text-base opacity-90 leading-relaxed">{feedback.text}</div>
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
