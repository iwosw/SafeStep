import React, { useState, useEffect } from 'react';

export const DarkWebScanner: React.FC = () => {
  const [email, setEmail] = useState('');
  const [scanning, setScanning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);

  const startScan = () => {
    if (!email || !email.includes('@')) return;
    setScanning(true);
    setLogs([]);
    setCompleted(false);
    
    const steps = [
      `[SYS]: CONNECTING TO ONION ROUTER...`,
      `[SYS]: ESTABLISHED SECURE CONNECTION.`,
      `[SCAN]: PARSING DB: COMBOLIST_2024.txt`,
      `[SCAN]: PARSING DB: VK_LEAK_2012.sql`,
      `[SCAN]: SEARCHING HASHES FOR: ${email.toUpperCase()}`,
      `[WARN]: MATCH FOUND IN 'discord_dump_full.json'`,
      `[DATA]: EXPOSED FIELDS - [PASSWORD_HASH, IP_ADDRESS, PHONE]`,
      `[SYS]: SCAN COMPLETE. 1 COMPROMISED RECORD FOUND.`
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      setLogs((prev) => [...prev, steps[currentStep]]);
      currentStep++;
      if (currentStep >= steps.length) {
        clearInterval(interval);
        setScanning(false);
        setCompleted(true);
      }
    }, 700);
  };

  return (
    <div className="bg-black border border-green-900/50 rounded-[2rem] p-6 md:p-10 font-mono text-green-500 shadow-2xl relative overflow-hidden group mb-16">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-green-500/20 animate-scanline pointer-events-none z-10"></div>
      
      <div className="relative z-20">
        <div className="flex items-center gap-3 mb-8 border-b border-green-900 pb-4">
          <span className="text-3xl">🖧</span>
          <div>
            <h3 className="text-xl font-black uppercase text-green-400">DarkWeb Data Scanner</h3>
            <p className="text-xs text-green-600 uppercase tracking-widest">Live Leak Simulation Protocol</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6 relative z-30">
          <input 
            type="email" 
            placeholder="Введи почту (напр. test@mail.com)" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={scanning}
            className="flex-grow bg-green-950/30 border border-green-800 text-green-400 p-4 rounded-xl outline-none focus:border-green-500 focus:bg-green-900/40 transition-all font-mono placeholder:text-green-800"
          />
          <button 
            onClick={startScan}
            disabled={scanning || !email}
            className={`px-8 py-4 rounded-xl font-black uppercase tracking-widest transition-all ${
                scanning 
                ? 'bg-green-900/50 text-green-700 cursor-not-allowed' 
                : 'bg-green-600 text-black hover:bg-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] active:scale-95'
            }`}
          >
            {scanning ? 'SCANNING...' : 'Узнать правду'}
          </button>
        </div>

        <div className="bg-green-950/20 border border-green-900/50 rounded-xl p-4 h-48 md:h-64 overflow-y-auto font-mono text-xs md:text-sm shadow-inner relative flex flex-col justify-end">
             {logs.length === 0 && !completed && (
                <div className="text-green-800 animate-pulse text-center absolute inset-0 flex items-center justify-center">
                    Ожидание ввода цели для глубокого сканирования...
                </div>
             )}
             <div className="flex-grow flex flex-col justify-end space-y-2 relative z-30">
                {logs.map((log, i) => (
                    <div key={i} className={`animate-in slide-in-from-bottom-2 fade-in duration-300 ${log.includes('WARN') || log.includes('EXPOSED') ? 'text-red-500' : 'text-green-400'}`}>
                        {log}
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};
