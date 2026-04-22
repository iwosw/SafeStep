
import React, { useState } from 'react';

interface AppTask {
  name: string;
  icon: string;
  permissions: string[];
  isGreedy: boolean;
  explanation: string;
}

// Added onComplete prop to support marking the module as finished
export const SmartphoneSpyTool: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [score, setScore] = useState(0);
  const [currentAppIdx, setCurrentAppIdx] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean, text: string } | null>(null);

  const apps: AppTask[] = [
    {
      name: "SuperFlashlight Pro",
      icon: "🔦",
      permissions: ["Камера", "Микрофон", "Список контактов", "Геолокация"],
      isGreedy: true,
      explanation: "Фонарику не нужны твои контакты и микрофон. Это приложение-шпион, собирающее данные для продажи."
    },
    {
      name: "EasyMap Nav",
      icon: "🗺️",
      permissions: ["Геолокация", "Память (для кэша карт)"],
      isGreedy: false,
      explanation: "Это честные разрешения. Навигатору нужны твои координаты, чтобы строить маршрут."
    },
    {
      name: "FilterMaster Editor",
      icon: "📸",
      permissions: ["Камера", "Доступ к фото", "Микрофон", "ID устройства"],
      isGreedy: true,
      explanation: "Хотя доступ к фото логичен, доступ к микрофону и ID устройства для простого фото-фильтра часто избыточен."
    },
    {
      name: "MegaBattery Saver",
      icon: "🔋",
      permissions: ["Статистика использования", "Доступ к уведомлениям", "История браузера"],
      isGreedy: true,
      explanation: "Приложения для 'экономии батареи' часто сами являются самыми тяжелыми шпионами, читая ваши уведомления."
    }
  ];

  const handleDecision = (deny: boolean) => {
    const isCorrect = deny === apps[currentAppIdx].isGreedy;
    if (isCorrect) setScore(s => s + 1);
    setFeedback({ isCorrect, text: apps[currentAppIdx].explanation });
  };

  const nextApp = () => {
    setFeedback(null);
    // Notify parent when the last app is processed
    if (currentAppIdx === apps.length - 1) {
      if (onComplete) onComplete();
    }
    setCurrentAppIdx((currentAppIdx + 1) % apps.length);
  };

  const currentApp = apps[currentAppIdx];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-black text-[#1e3c72] dark:text-blue-400">Аудит разрешений 📱</h3>
        <p className="text-slate-500 dark:text-slate-400">Реши: разрешить или запретить доступ приложению? Счет: {score}</p>
      </div>

      <div className="bg-[#1e1e26] p-8 rounded-[40px] shadow-2xl border-4 border-[#333] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=1200&fit=crop" 
            className="w-full h-full object-cover" 
            alt="Smartphone Background" 
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex flex-col items-center gap-6 relative z-10">
          <div className="w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center text-5xl shadow-inner">
            {currentApp.icon}
          </div>
          <div className="text-center">
            <h4 className="text-white text-xl font-bold">{currentApp.name}</h4>
            <p className="text-blue-400 text-xs mt-1 uppercase tracking-widest">Запрашивает доступ к:</p>
          </div>
          
          <div className="w-full space-y-2">
            {currentApp.permissions.map((p, i) => (
              <div key={i} className="bg-white/5 text-gray-300 p-3 rounded-xl text-sm border border-white/10 flex justify-between items-center">
                <span>{p}</span>
                <span className="text-xs opacity-50">?</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            <button 
              onClick={() => handleDecision(false)}
              className="bg-green-600 hover:bg-green-500 text-white py-4 rounded-2xl font-black transition-all shadow-lg"
              disabled={!!feedback}
            >
              РАЗРЕШИТЬ
            </button>
            <button 
              onClick={() => handleDecision(true)}
              className="bg-red-600 hover:bg-red-500 text-white py-4 rounded-2xl font-black transition-all shadow-lg"
              disabled={!!feedback}
            >
              ЗАПРЕТИТЬ
            </button>
          </div>
        </div>

        {feedback && (
          <div className={`mt-6 p-6 rounded-3xl animate-in zoom-in duration-300 border-2 ${feedback.isCorrect ? 'bg-green-600/10 border-green-500 text-green-400' : 'bg-red-600/10 border-red-500 text-red-400'}`}>
            <div className="font-black mb-2">{feedback.isCorrect ? 'ВЕРНО! ✅' : 'ОШИБКА! ❌'}</div>
            <p className="text-sm opacity-90">{feedback.text}</p>
            <button onClick={nextApp} className="mt-4 w-full bg-white/10 py-2 rounded-lg text-xs font-bold hover:bg-white/20 transition-all uppercase tracking-widest">Следующее приложение →</button>
          </div>
        )}
      </div>
    </div>
  );
};
