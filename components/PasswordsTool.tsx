
import React, { useState } from 'react';
import { generateSecurePassphrase } from '../services/passwordGenerator';

interface PasswordsToolProps {
  onComplete: () => void;
}

export const PasswordsTool: React.FC<PasswordsToolProps> = ({ onComplete }) => {
  const [passphrase, setPassphrase] = useState('');

  const handleGenerate = () => {
    setPassphrase(generateSecurePassphrase());
    onComplete();
  };

  return (
    <div className="text-center py-6 md:py-12 animate-in fade-in duration-500">
      <div className="text-6xl md:text-7xl mb-8">🔐</div>
      <h3 className="text-2xl md:text-3xl font-black mb-8 text-slate-800 dark:text-white">Генератор "Сейф-Фраз"</h3>
      <div className="bg-slate-50 dark:bg-slate-900 border-4 border-dashed border-blue-500/10 rounded-[2.5rem] p-8 md:p-16 mb-10 shadow-inner">
         <div className="text-2xl md:text-4xl font-mono font-black text-blue-600 dark:text-white mb-8 md:text-12 tracking-tighter break-all">
           {passphrase || '••••_••••_••••'}
         </div>
         <button 
           onClick={handleGenerate} 
           className="bg-blue-600 hover:bg-blue-700 text-white px-10 md:px-16 py-4 rounded-xl font-black hover:scale-105 active:scale-95 transition-all shadow-xl uppercase tracking-widest text-xs"
         >
           Сгенерировать фразу ⚡
         </button>
      </div>
    </div>
  );
};
