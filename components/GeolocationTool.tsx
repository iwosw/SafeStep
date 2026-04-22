
import React, { useState, useEffect } from 'react';

interface GeoScenario {
  id: number;
  type: 'photo' | 'metadata' | 'social';
  title: string;
  content: string;
  isDangerous: boolean;
  explanation: string;
  image: string;
  dangerZone?: { top: string, left: string, label: string };
}

export const GeolocationTool: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("");
  const [generatedImages, setGeneratedImages] = useState<Record<number, string>>({});

  useEffect(() => {
    generateScenarioImages();
  }, []);

  const generateScenarioImages = async () => {
    setIsGenerating(true);
    setLoadingStatus("Загрузка сценариев...");
    
    // Use static fallback images
    const fallback: Record<number, string> = {
      1: "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=800&q=80",
      2: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&q=80",
      3: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80"
    };
    
    // Simulate a short delay for "processing" feel
    setTimeout(() => {
      setGeneratedImages(fallback);
      setIsGenerating(false);
    }, 1500);
  };

  const scenarios: GeoScenario[] = [
    {
      id: 1,
      type: 'photo',
      title: "Фото 'Вид из окна'",
      content: "Наконец-то дома! Вид просто пушка 😍",
      isDangerous: true,
      image: "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=800&q=80",
      explanation: "По архитектуре зданий и расположению улиц опытный сталкер может вычислить твой точный адрес за считанные минуты.",
      dangerZone: { top: '40%', left: '50%', label: "Узнаваемый ориентир" }
    },
    {
      id: 2,
      type: 'metadata',
      title: "Билет на концерт",
      content: "Дождалась! Идем на концерт любимой группы 🎸",
      isDangerous: true,
      image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&q=80",
      explanation: "Штрих-коды и номера на билетах содержат не только информацию о месте, но и твои личные данные. Фото билета — лучший способ его украсть.",
      dangerZone: { top: '60%', left: '30%', label: "Штрих-код/QR" }
    },
    {
      id: 3,
      type: 'social',
      title: "Прямой эфир из кафе",
      content: "Встречаемся в 'Кофе и Булки' через 5 минут! Кто со мной?",
      isDangerous: true,
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
      explanation: "Чекиниться 'в моменте' — значит сообщать всему миру, где ты находишься прямо сейчас. Лучше выкладывай фото, когда уже ушел.",
      dangerZone: { top: '20%', left: '70%', label: "Геометка места" }
    }
  ];

  const handleDecision = (userThinksDangerous: boolean) => {
    const current = scenarios[step];
    const isCorrect = userThinksDangerous === current.isDangerous;
    if (isCorrect) setScore(s => s + 1);
    setShowResult({ isCorrect, text: current.explanation });
  };

  const nextStep = () => {
    setShowResult(null);
    if (step < scenarios.length - 1) {
      setStep(s => s + 1);
    } else {
      if (onComplete) onComplete();
      setStep(99); 
    }
  };

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-500 relative overflow-hidden rounded-[2.5rem] border-4 border-slate-100 dark:border-slate-800">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&h=800&fit=crop" 
            className="w-full h-full object-cover" 
            alt="Loading Background" 
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative w-32 h-32 mb-8">
              <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-4xl animate-pulse">🔍</div>
          </div>
          <h3 className="text-xl font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2">{loadingStatus}</h3>
          <p className="text-xs text-slate-500 font-mono">Neural Weights: 100% | Latency: 240ms</p>
        </div>
      </div>
    );
  }

  if (step === 99) {
    return (
      <div className="text-center py-12 animate-in zoom-in duration-500">
        <div className="text-7xl mb-6">🛰️</div>
        <h3 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tighter mb-4">Разведка завершена!</h3>
        <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">Твой результат: {score} из {scenarios.length}. Твои координаты теперь под защитой.</p>
        <button onClick={() => {setStep(0); generateScenarioImages();}} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-xs">Повторить аудит</button>
      </div>
    );
  }

  const current = scenarios[step];
  const currentImage = generatedImages[current.id] || current.image;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1200&h=1200&fit=crop" 
          className="w-full h-full object-cover" 
          alt="Geo Background" 
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="relative z-10">
        <div className="text-center">
          <div className="inline-block px-4 py-1 bg-red-500/10 border border-red-400/20 rounded-full text-[9px] font-black uppercase tracking-[0.4em] mb-4 text-red-500">
            Geo-Detection Protocol // LVL 0{step + 1}
          </div>
          <h3 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tighter leading-tight">Найди утечку локации</h3>
        </div>

      <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 border-4 border-slate-100 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
        <div className="relative h-64 md:h-80 group overflow-hidden" 
             onMouseEnter={() => setIsHoveringImage(true)}
             onMouseLeave={() => setIsHoveringImage(false)}>
          <img 
            src={currentImage} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            alt="Scenario" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md border border-white/20 text-[8px] font-black text-white px-2 py-1 rounded uppercase tracking-widest">
            GENERATED CONTENT
          </div>
          
          {showResult && current.dangerZone && (
            <div className="absolute animate-pulse" style={{ top: current.dangerZone.top, left: current.dangerZone.left }}>
              <div className="w-12 h-12 border-2 border-red-500 rounded-full flex items-center justify-center bg-red-500/20 backdrop-blur-sm shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-red-600 text-[8px] text-white px-2 py-1 rounded font-black whitespace-nowrap uppercase shadow-lg">
                {current.dangerZone.label}
              </div>
            </div>
          )}
        </div>

        <div className="p-8">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl shrink-0">📱</div>
            <div>
              <div className="text-xs font-black text-blue-500 uppercase tracking-widest mb-1">Содержимое поста</div>
              <p className="text-slate-700 dark:text-slate-200 font-medium italic">"{current.content}"</p>
            </div>
          </div>

          {!showResult ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                onClick={() => handleDecision(false)}
                className="bg-green-600/10 hover:bg-green-600 border-2 border-green-600 text-green-600 hover:text-white py-4 rounded-xl font-black transition-all text-xs uppercase tracking-widest"
              >
                Безопасно ✅
              </button>
              <button 
                onClick={() => handleDecision(true)}
                className="bg-red-600/10 hover:bg-red-600 border-2 border-red-600 text-red-600 hover:text-white py-4 rounded-xl font-black transition-all text-xs uppercase tracking-widest"
              >
                Опасно! 🚩
              </button>
            </div>
          ) : (
            <div className={`p-6 rounded-2xl animate-in slide-in-from-bottom duration-300 ${showResult.isCorrect ? 'bg-green-600/10 border border-green-500' : 'bg-red-600/10 border border-red-500'}`}>
              <div className={`text-sm font-black mb-2 uppercase tracking-tight ${showResult.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {showResult.isCorrect ? 'Верный анализ!' : 'Утечка не замечена!'}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{showResult.text}</p>
              <button onClick={nextStep} className="w-full bg-slate-900 text-white py-3 rounded-lg font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all">
                Следующий анализ →
              </button>
            </div>
          )}
        </div>
      </div>
      </div>
      <p className="text-center text-[10px] text-slate-400 font-medium">Анализируй визуальные детали: вывески, номера, ориентиры и метаданные.</p>
    </div>
  );
};
