
import React, { useState, useEffect } from 'react';
import { generateSecurePassphrase } from '../services/passwordGenerator';

interface PasswordsToolProps {
  onComplete: () => void;
}

export const PasswordsTool: React.FC<PasswordsToolProps> = ({ onComplete }) => {
  const [passphrase, setPassphrase] = useState('');
  
  // Password Constructor State
  const [length, setLength] = useState(12);
  const [useUpper, setUseUpper] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [crackTime, setCrackTime] = useState('');

  const calculateEntropy = () => {
    let pool = 26; // lowercase
    if (useUpper) pool += 26;
    if (useNumbers) pool += 10;
    if (useSymbols) pool += 32;

    const entropy = length * Math.log2(pool);
    // Rough estimate: Assume a supercomputer trying 100 billion guesses per second
    const guessesPerSecond = 100_000_000_000;
    const crackSeconds = Math.pow(2, entropy) / guessesPerSecond;

    if (crackSeconds < 1) return 'Мгновенно';
    if (crackSeconds < 60) return `${Math.round(crackSeconds)} сек`;
    if (crackSeconds < 3600) return `${Math.round(crackSeconds / 60)} мин`;
    if (crackSeconds < 86400) return `${Math.round(crackSeconds / 3600)} час`;
    if (crackSeconds < 31536000) return `${Math.round(crackSeconds / 86400)} дней`;
    
    const years = crackSeconds / 31536000;
    if (years < 100) return `${Math.round(years)} лет`;
    if (years < 1000) return `${Math.round(years / 100)} веков`;
    if (years < 1000000) return `${Math.round(years / 1000)} тысячелетий`;
    return 'Более миллиона лет 🤯';
  };

  useEffect(() => {
    setCrackTime(calculateEntropy());
    // Give achievement if they build a super strong password (> 20 chars with all sets)
    if (length >= 20 && useUpper && useNumbers && useSymbols) {
      onComplete();
    }
  }, [length, useUpper, useNumbers, useSymbols]);

  const handleGenerate = () => {
    setPassphrase(generateSecurePassphrase());
    onComplete();
  };

  return (
    <div className="py-6 md:py-12 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <div className="text-6xl md:text-7xl mb-8">🔐</div>
        <h3 className="text-2xl md:text-3xl font-black mb-8 text-slate-800 dark:text-white">Лаборатория Мастера Паролей</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Constructor Module */}
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-xl">
             <h4 className="font-black text-xl mb-6 text-slate-800 dark:text-white flex items-center gap-3">
                 <span>⚙️</span> Конструктор
             </h4>
             
             <div className="mb-8">
                 <div className="flex justify-between mb-2 text-sm font-bold text-slate-600 dark:text-slate-400">
                     <span>Длина пароля</span>
                     <span className="text-blue-600 dark:text-blue-400 text-xl font-black">{length}</span>
                 </div>
                 <input 
                   type="range" 
                   min="6" 
                   max="32" 
                   value={length} 
                   onChange={(e) => setLength(Number(e.target.value))} 
                   className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                 />
             </div>

             <div className="space-y-4">
                 <label className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 cursor-pointer hover:border-blue-400 transition-colors">
                     <input type="checkbox" checked={useUpper} onChange={(e) => setUseUpper(e.target.checked)} className="w-6 h-6 rounded accent-blue-600" />
                     <span className="font-bold text-slate-700 dark:text-slate-200">Заглавные буквы (A-Z)</span>
                 </label>
                 <label className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 cursor-pointer hover:border-blue-400 transition-colors">
                     <input type="checkbox" checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} className="w-6 h-6 rounded accent-blue-600" />
                     <span className="font-bold text-slate-700 dark:text-slate-200">Цифры (0-9)</span>
                 </label>
                 <label className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 cursor-pointer hover:border-blue-400 transition-colors">
                     <input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} className="w-6 h-6 rounded accent-blue-600" />
                     <span className="font-bold text-slate-700 dark:text-slate-200">Символы (!@#$%)</span>
                 </label>
             </div>
          </div>

          {/* Result Analyzer */}
          <div className="bg-blue-600 text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mx-20 -my-20 pointer-events-none"></div>
             
             <h4 className="font-black text-sm uppercase tracking-[0.3em] opacity-80 mb-6">Время взлома брутфорсом</h4>
             
             <div className="text-4xl lg:text-5xl font-black mb-6 leading-none tracking-tighter drop-shadow-lg">
                 {crackTime}
             </div>
             
             <p className="text-blue-100 font-medium leading-relaxed opacity-90 text-sm">
                 * Расчет на основе суперкомпьютера, перебирающего 100 миллиардов паролей в секунду.
             </p>
             
             {crackTime.includes('лет') || crackTime.includes('веков') || crackTime.includes('тысячелетий') ? (
                 <div className="mt-8 bg-black/20 p-4 rounded-2xl border border-white/20 animate-in slide-in-from-bottom flex items-center gap-4">
                     <span className="text-3xl">🛡️</span>
                     <span className="font-bold text-sm">Система считает этот уровень защиты непробиваемым.</span>
                 </div>
             ) : (
                <div className="mt-8 bg-red-900/40 p-4 rounded-2xl border border-red-500/50 animate-in slide-in-from-bottom flex items-center gap-4">
                    <span className="text-3xl">⚠️</span>
                    <span className="font-bold text-sm text-red-100">Слишком слабо. Добавь длину или символы!</span>
                </div>
             )}
          </div>
      </div>

      <div className="text-center">
          <div className="bg-slate-50 dark:bg-slate-900 border-4 border-dashed border-blue-500/10 rounded-[2.5rem] p-8 md:p-16 shadow-inner mx-auto max-w-2xl">
             <h4 className="font-black text-xl mb-4 text-slate-800 dark:text-white">Автоматический генератор "Сейф-фраз"</h4>
             <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 font-medium">Сложные пароли трудно запомнить. Используй бредовые фразы — их легко помнить, но машинам невозможно подобрать.</p>
             
             <div className="text-2xl md:text-3xl font-mono font-black text-blue-600 dark:text-white mb-8 tracking-tighter break-all bg-white dark:bg-black p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm min-h-[100px] flex items-center justify-center">
               {passphrase || '••••_••••_••••_••••'}
             </div>
             <button 
               onClick={handleGenerate} 
               className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-xl font-black hover:scale-105 active:scale-95 transition-all shadow-xl uppercase tracking-widest text-xs"
             >
               Создать супер-фразу ⚡
             </button>
          </div>
      </div>
    </div>
  );
};
