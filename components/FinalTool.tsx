
import React, { useState } from 'react';

export const FinalTool: React.FC = () => {
  const [layers, setLayers] = useState({
    passphrase: false,
    fa2: false,
    private: false,
    permissions: false,
    audit: false
  });

  const toggleLayer = (key: keyof typeof layers) => {
    setLayers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const count = Object.values(layers).filter(Boolean).length;
  const score = Math.round((count / 5) * 100);

  return (
    <div className="space-y-8 max-w-4xl mx-auto p-4">
      <div className="text-center">
        <h3 className="text-3xl font-black text-[#1e3c72]">Digital Fortress Builder 🏰</h3>
        <p className="text-gray-500 mt-2">Построй свою защиту, отмечая выполненные шаги.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-3">
          {[
            { id: 'passphrase', text: 'Заменил пароли на фразы (12+ симв.)', icon: '🔑' },
            { id: 'fa2', text: 'Включил 2FA везде, где можно', icon: '📱' },
            { id: 'private', text: 'Скрыл профили в соцсетях', icon: '👤' },
            { id: 'permissions', text: 'Отозвал лишние права у приложений', icon: '📸' },
            { id: 'audit', text: 'Удалил старые/мертвые аккаунты', icon: '🗑️' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => toggleLayer(item.id as any)}
              className={`w-full flex items-center gap-4 p-5 rounded-2xl border-4 transition-all text-left font-bold ${layers[item.id as keyof typeof layers] ? 'bg-green-50 border-green-500 text-green-800' : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'}`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="flex-grow">{item.text}</span>
              <span className="text-xl">{layers[item.id as keyof typeof layers] ? '✅' : '⭕'}</span>
            </button>
          ))}
        </div>

        <div className="sticky top-24 bg-[#1e3c72] text-white p-10 rounded-[3rem] shadow-2xl text-center flex flex-col items-center justify-center border-b-8 border-[#152a50]">
          <div className="relative mb-8">
            <div className="text-8xl mb-4 animate-bounce">🏰</div>
            {count === 5 && <div className="absolute -top-2 -right-2 text-4xl animate-pulse">👑</div>}
          </div>
          
          <div className="text-sm font-black uppercase tracking-[0.3em] opacity-60 mb-1">Fortress Integrity</div>
          <div className="text-6xl font-black mb-6">{score}%</div>
          
          <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden mb-8">
            <div className="h-full bg-yellow-400 transition-all duration-1000 shadow-[0_0_15px_#fdbb2d]" style={{ width: `${score}%` }}></div>
          </div>

          <p className="text-blue-200 text-sm leading-relaxed italic">
            {count === 0 && "Твои данные в чистом поле. Начни строить защиту!"}
            {count > 0 && count < 3 && "Фундамент заложен, но стены еще слишком низкие."}
            {count >= 3 && count < 5 && "Крепкая защита! Почти неуязвим для массовых атак."}
            {count === 5 && "Цифровая Цитадель. Ты - мастер своей безопасности!"}
          </p>
        </div>
      </div>
    </div>
  );
};
