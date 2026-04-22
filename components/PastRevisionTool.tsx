
import React, { useState } from 'react';
import { simulateOsintScan } from '../services/securityService';

interface PastRevisionToolProps {
  onComplete: () => void;
}

export const PastRevisionTool: React.FC<PastRevisionToolProps> = ({ onComplete }) => {
  const [nick, setNick] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<{ text: string, type: 'sys' | 'warn' | 'crit' }[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  const handleOsintScan = async () => {
    if (!nick) return alert("Введите никнейм!");
    setIsScanning(true);
    setTerminalLogs([{ text: "Инициализация цифрового поиска...", type: 'sys' }]);
    const findings = await simulateOsintScan(nick, "");
    setTerminalLogs(findings.map((f: string) => ({ text: f, type: 'warn' })));
    setIsScanning(false);
    onComplete();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="relative group">
          <input 
            className="w-full p-6 md:p-8 bg-slate-50 dark:bg-slate-900 text-blue-600 dark:text-blue-400 border-2 border-transparent focus:border-blue-500 rounded-[2rem] font-black text-xl md:text-2xl placeholder-slate-400 outline-none transition-all shadow-inner" 
            placeholder="Введи ник для анализа..." 
            value={nick} 
            onChange={e => setNick(e.target.value)} 
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20 text-3xl">🔍</div>
      </div>
      <button 
        onClick={handleOsintScan} 
        disabled={isScanning} 
        className="w-full bg-blue-600 hover:bg-blue-500 text-white py-6 md:py-8 rounded-[2rem] font-black text-xl md:text-2xl shadow-2xl hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50"
      >
         {isScanning ? 'АНАЛИЗИРУЮ ДАННЫЕ...' : 'Запустить цифровой аудит 🕵️'}
      </button>
      <div id="terminal" className="mt-10 bg-slate-950 p-6 md:p-10 rounded-[2rem] font-mono text-xs md:text-sm text-blue-400 border border-slate-800 shadow-2xl overflow-hidden relative min-h-[200px]">
        <div className="scanline-overlay animate-scanline"></div>
        {terminalLogs.length === 0 ? (
          <div className="opacity-30 italic animate-pulse">&gt; Ожидание вводных данных...</div>
        ) : (
          terminalLogs.map((l, i) => (
            <div key={i} className="mb-2 flex gap-4">
              <span className="opacity-30">[{new Date().toLocaleTimeString()}]</span>
              <span className="text-white font-bold">{l.text}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
