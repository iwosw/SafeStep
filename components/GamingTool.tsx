
import React, { useState } from 'react';

interface Scenario {
  id: number;
  type: 'discord' | 'steam' | 'api';
  title: string;
  sender: string;
  message: string;
  linkText: string;
  actualUrl: string;
  isScam: boolean;
  explanation: string;
}

export const GamingTool: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [hovered, setHovered] = useState(false);

  const scenarios: Scenario[] = [
    {
      id: 1,
      type: 'discord',
      title: "Предложение в Discord",
      sender: "NitroBot_Official",
      message: "Поздравляем! Вы получили 3 месяца Discord Nitro бесплатно. Нажмите ниже, чтобы забрать подарок.",
      linkText: "Claim Nitro Free",
      actualUrl: "https://dlscord-glft.com/nitro",
      isScam: true,
      explanation: "Обрати внимание на домен: dlscord-glft.com вместо discord.gift. Это типичный фишинг для кражи токена."
    },
    {
      id: 2,
      type: 'steam',
      title: "Просьба 'друга' в Steam",
      sender: "BestGamer_2009",
      message: "Привет! Проголосуй плиз за мою команду на турнире, одного голоса не хватает до финала!",
      linkText: "ESL-TOURNAMENT-VOTE",
      actualUrl: "https://steam-community-voting.xyz/login",
      isScam: true,
      explanation: "Сайты .xyz с авторизацией через Steam — это ловушки для кражи аккаунтов. Друга, скорее всего, уже взломали."
    },
    {
      id: 3,
      type: 'api',
      title: "Проверка безопасности API",
      sender: "Система",
      message: "Вы зашли в раздел 'API Key'. Обнаружен активный ключ для домена 'cs-skin-trade.net'. Вы создавали его?",
      linkText: "REVOKE KEY",
      actualUrl: "https://steamcommunity.com/dev/apikey",
      isScam: false,
      explanation: "Если ты не разработчик, поле API-ключа должно быть пустым. Наличие ключа для левого сайта — признак активного взлома."
    }
  ];

  const handleChoice = (userThinksScam: boolean) => {
    const current = scenarios[step];
    const isCorrect = userThinksScam === current.isScam;
    if (isCorrect) setScore(s => s + 1);
    setFeedback({ isCorrect, text: current.explanation });
  };

  const nextStep = () => {
    setFeedback(null);
    if (step < scenarios.length - 1) {
      setStep(s => s + 1);
    } else {
      if (onComplete) onComplete();
      setStep(99); // Finished state
    }
  };

  if (step === 99) {
    return (
      <div className="text-center py-12 animate-in zoom-in duration-500">
        <div className="text-7xl mb-6">🏆</div>
        <h3 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tighter mb-4">Тренировка завершена!</h3>
        <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">Твой счет: {score} из {scenarios.length}. Твой аккаунт в Steam и Discord теперь под надежной защитой.</p>
        <button onClick={() => setStep(0)} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-xs">Начать заново</button>
      </div>
    );
  }

  const current = scenarios[step];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="text-center">
        <div className="inline-block px-4 py-1 bg-blue-500/10 border border-blue-400/20 rounded-full text-[9px] font-black uppercase tracking-[0.4em] mb-4 text-blue-500">
          Gaming Security Simulator // LVL 0{step + 1}
        </div>
        <h3 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">Сценарий: {current.title}</h3>
      </div>

      <div className="max-w-xl mx-auto bg-slate-50 dark:bg-slate-900 border-4 border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-6 md:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=1200&fit=crop" 
            className="w-full h-full object-cover" 
            alt="Gaming Background" 
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="scanline-overlay animate-scanline opacity-10"></div>
        
        {/* Mock App Header */}
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-200 dark:border-slate-800 relative z-10">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-black">
            {current.sender[0]}
          </div>
          <div>
            <div className="text-sm font-black dark:text-white">{current.sender}</div>
            <div className="text-[9px] text-green-500 font-bold uppercase tracking-widest animate-pulse">Online</div>
          </div>
        </div>

        {/* Message Bubble */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-700 mb-10 shadow-sm">
          <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-medium mb-6">
            {current.message}
          </p>
          <div className="relative inline-block">
            <button 
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-black text-xs hover:bg-blue-700 transition-colors shadow-lg cursor-default"
            >
              {current.linkText}
            </button>
            {hovered && (
              <div className="absolute -bottom-8 left-0 bg-slate-800 text-white text-[9px] px-2 py-1 rounded shadow-xl z-20 font-mono">
                URL: {current.actualUrl}
              </div>
            )}
          </div>
        </div>

        {/* Decisions */}
        {!feedback ? (
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => handleChoice(false)}
              className="bg-green-600/10 hover:bg-green-600 border-2 border-green-600 text-green-600 hover:text-white py-4 rounded-xl font-black transition-all text-xs uppercase tracking-widest"
            >
              Доверить ✅
            </button>
            <button 
              onClick={() => handleChoice(true)}
              className="bg-red-600/10 hover:bg-red-600 border-2 border-red-600 text-red-600 hover:text-white py-4 rounded-xl font-black transition-all text-xs uppercase tracking-widest"
            >
              Игнорировать 🏴‍☠️
            </button>
          </div>
        ) : (
          <div className={`p-6 rounded-2xl animate-in slide-in-from-bottom duration-300 ${feedback.isCorrect ? 'bg-green-600/10 border border-green-500' : 'bg-red-600/10 border border-red-500'}`}>
            <div className={`text-sm font-black mb-2 uppercase tracking-tight ${feedback.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {feedback.isCorrect ? 'Точный анализ!' : 'Протокол нарушен!'}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{feedback.text}</p>
            <button onClick={nextStep} className="w-full bg-slate-900 text-white py-3 rounded-lg font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all">
              Продолжить сканирование →
            </button>
          </div>
        )}
      </div>
      <p className="text-center text-[10px] text-slate-400 font-medium">Наведи на кнопку в сообщении, чтобы проверить реальный URL перед действием.</p>
    </div>
  );
};
