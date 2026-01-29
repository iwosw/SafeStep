
import React, { useState, useEffect } from 'react';

interface Activity {
  id: string;
  label: string;
  category: 'social' | 'finance' | 'lifestyle';
}

export const AITool: React.FC = () => {
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  const activities: Activity[] = [
    { id: '1', label: 'Поиск "как заработать 100к"', category: 'finance' },
    { id: '2', label: 'Лайк под видео с котиками', category: 'lifestyle' },
    { id: '3', label: 'Подписка на группу "Анонимный хакер"', category: 'social' },
    { id: '4', label: 'Заказ пиццы в 2 часа ночи', category: 'lifestyle' },
    { id: '5', label: 'Просмотр курсов Python', category: 'finance' },
    { id: '6', label: 'Комментарий "согласен" в полит. паблике', category: 'social' }
  ];

  const runAnalysis = () => {
    if (selectedActivities.length < 2) return;
    setAnalyzing(true);
    setProfile(null);

    setTimeout(() => {
      // Fake profiling logic based on selection
      const isTech = selectedActivities.includes('5') || selectedActivities.includes('3');
      const isNightOwl = selectedActivities.includes('4');
      const isAmbitious = selectedActivities.includes('1') || selectedActivities.includes('5');

      setProfile({
        persona: isTech ? 'Техно-энтузиаст' : isAmbitious ? 'Карьерист' : 'Обыватель',
        risk: isNightOwl ? 'Высокий (нарушение режима)' : 'Низкий',
        incomeRange: isAmbitious ? '100k - 250k (прогноз)' : 'Средний',
        interests: isTech ? ['Кибербезопасность', 'Кодинг'] : ['Развлечения', 'Еда'],
        aiInsight: isNightOwl ? "Склонность к импульсивным покупкам в ночное время." : "Стабильный пользователь с предсказуемым поведением."
      });
      setAnalyzing(false);
    }, 2000);
  };

  const toggleActivity = (id: string) => {
    if (selectedActivities.includes(id)) {
      setSelectedActivities(prev => prev.filter(a => a !== id));
    } else if (selectedActivities.length < 3) {
      setSelectedActivities(prev => [...prev, id]);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto p-4">
      <div className="text-center">
        <h3 className="text-3xl font-black text-[#1e3c72]">AI Behavioral Profiler 🧬</h3>
        <p className="text-gray-500 mt-2">Выберите 2-3 действия, чтобы увидеть, какой профиль составит о вас ИИ.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activities.map(act => (
          <button
            key={act.id}
            onClick={() => toggleActivity(act.id)}
            className={`p-4 rounded-2xl border-2 text-left transition-all ${selectedActivities.includes(act.id) ? 'bg-[#1e3c72] border-blue-400 text-white shadow-lg' : 'bg-white border-gray-100 text-gray-700 hover:border-gray-300'}`}
          >
            <div className="flex justify-between items-center">
                <span className="font-bold">{act.label}</span>
                <span className="text-xs opacity-40">[{act.category}]</span>
            </div>
          </button>
        ))}
      </div>

      <div className="text-center">
        <button 
          onClick={runAnalysis} 
          disabled={selectedActivities.length < 2 || analyzing}
          className={`px-12 py-4 rounded-2xl font-black text-white shadow-xl transition-all ${selectedActivities.length < 2 ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#1e3c72] hover:scale-105 active:scale-95'}`}
        >
          {analyzing ? 'АНАЛИЗ ДАННЫХ...' : 'ЗАПУСТИТЬ ПРОФАЙЛЕР 🚀'}
        </button>
      </div>

      <div className="bg-[#0f111a] rounded-[3rem] p-1 md:p-10 shadow-2xl border-b-8 border-[#1a1c23] relative overflow-hidden min-h-[350px]">
        {analyzing ? (
          <div className="flex flex-col items-center justify-center h-full py-20">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
            <div className="text-blue-500 font-mono text-sm animate-pulse tracking-[0.4em] uppercase">Correlation Engine Running...</div>
          </div>
        ) : profile ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row gap-10">
              <div className="flex-grow space-y-6">
                <div className="border-b border-white/10 pb-4">
                    <h4 className="text-blue-400 font-mono text-xs uppercase mb-1">Generated Identity</h4>
                    <div className="text-white text-3xl font-black uppercase tracking-tight">{profile.persona}</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                        <div className="text-[10px] text-gray-500 font-black uppercase mb-1">Прогноз дохода</div>
                        <div className="text-white font-bold">{profile.incomeRange}</div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                        <div className="text-[10px] text-gray-500 font-black uppercase mb-1">Фактор риска</div>
                        <div className="text-white font-bold">{profile.risk}</div>
                    </div>
                </div>

                <div className="bg-blue-600/10 border border-blue-500/30 p-6 rounded-[2rem]">
                    <div className="text-[10px] text-blue-400 font-black uppercase mb-2">AI Behavioral Insight</div>
                    <p className="text-gray-300 text-sm italic">"{profile.aiInsight}"</p>
                </div>
              </div>

              <div className="md:w-1/3 bg-white/5 border border-white/10 p-6 rounded-[2rem] flex flex-col justify-center text-center">
                 <div className="text-5xl mb-4">🧠</div>
                 <div className="text-white text-xs font-mono mb-4 uppercase">Neural Map</div>
                 <div className="flex flex-wrap gap-2 justify-center">
                    {profile.interests.map((it: string) => (
                        <span key={it} className="bg-blue-500/20 text-blue-300 text-[10px] px-3 py-1 rounded-full border border-blue-500/30">#{it}</span>
                    ))}
                 </div>
              </div>
            </div>
            <button onClick={() => { setProfile(null); setSelectedActivities([]); }} className="mt-10 w-full text-xs text-gray-500 hover:text-white uppercase tracking-widest font-black transition-colors">Сбросить симуляцию</button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-20 text-center text-gray-500">
            <span className="text-4xl mb-4 opacity-30">⚖️</span>
            <p className="max-w-xs mx-auto text-sm italic">ИИ анализирует не только ЧТО вы делаете, но и КОГДА и КАК. Ваша цифровая "тень" рассказывает о вас всё.</p>
          </div>
        )}
      </div>
    </div>
  );
};
