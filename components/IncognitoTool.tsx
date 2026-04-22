import React, { useState } from 'react';

// Added onComplete prop to track completion of this module
export const IncognitoTool: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [leakData, setLeakData] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);

  const scanBrowserLeaks = () => {
    setIsScanning(true);
    
    // Simulate a "deep" system scan for immersion
    setTimeout(() => {
      const getGPU = () => {
          const c = document.createElement('canvas');
          const gl = c.getContext('webgl');
          if (!gl) return 'Unknown / Software Renderer';
          const d = gl.getExtension('WEBGL_debug_renderer_info');
          return d ? gl.getParameter(d.UNMASKED_RENDERER_WEBGL) : 'Generic Graphics Unit';
      };
      
      setLeakData({
        userAgent: navigator.userAgent,
        screen: `${window.screen.width}x${window.screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        gpu: getGPU(),
        plugins: navigator.plugins.length,
        cores: navigator.hardwareConcurrency || 'Hidden',
        cookiesEnabled: navigator.cookieEnabled ? "Активны" : "Заблокированы",
        platform: navigator.platform
      });
      setIsScanning(false);
      
      // Mark as complete in the parent component
      if (onComplete) onComplete();
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
        <div className="text-center">
            <h3 className="text-2xl font-black text-[#1e3c72] dark:text-blue-400 uppercase tracking-tighter">Твой "Цифровой Отпечаток" 🕵️‍♂️</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
              Сайты используют уникальные параметры твоего железа, чтобы узнать тебя даже без Cookie и режима инкогнито.
            </p>
        </div>

        {isScanning ? (
          <div className="bg-slate-950 p-12 rounded-[2.5rem] border border-blue-500/30 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[300px]">
            <div className="scanline-overlay animate-scanline opacity-40"></div>
            <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
            <div className="text-blue-500 font-mono text-xs animate-pulse tracking-[0.5em] uppercase">Инициализация OS-анализа...</div>
            <div className="mt-4 text-[10px] font-mono text-blue-300 opacity-40">FETCHING: GPU_RENDERER, SCREEN_RESO, HW_CONCURRENCY...</div>
          </div>
        ) : leakData ? (
            <div className="animate-in zoom-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="glass dark:bg-slate-900/40 p-6 rounded-[2rem] border border-gray-100 dark:border-slate-800 card-3d">
                      <div className="text-[10px] font-black text-blue-500 uppercase mb-2 tracking-widest">Графический чип (GPU)</div>
                      <div className="text-sm text-slate-800 dark:text-white font-mono break-all font-bold leading-tight">{leakData.gpu}</div>
                  </div>
                  <div className="glass dark:bg-slate-900/40 p-6 rounded-[2rem] border border-gray-100 dark:border-slate-800 card-3d">
                      <div className="text-[10px] font-black text-blue-500 uppercase mb-2 tracking-widest">Конфигурация железа</div>
                      <div className="text-sm text-slate-800 dark:text-white font-mono font-bold">
                        {leakData.screen} @ {leakData.platform}<br/>
                        CPU Cores: {leakData.cores}
                      </div>
                  </div>
                  <div className="glass dark:bg-slate-900/40 p-6 rounded-[2rem] border border-gray-100 dark:border-slate-800 card-3d">
                      <div className="text-[10px] font-black text-blue-500 uppercase mb-2 tracking-widest">Среда окружения</div>
                      <div className="text-sm text-slate-800 dark:text-white font-mono font-bold">
                        {leakData.plugins} Plugins Detected<br/>
                        TZ: {leakData.timezone}
                      </div>
                  </div>
                  <div className="glass dark:bg-slate-900/40 p-6 rounded-[2rem] border border-gray-100 dark:border-slate-800 card-3d">
                      <div className="text-[10px] font-black text-blue-500 uppercase mb-2 tracking-widest">Состояние Cookie</div>
                      <div className="text-sm text-slate-800 dark:text-white font-mono font-bold">{leakData.cookiesEnabled}</div>
                  </div>
              </div>
              
              <div className="bg-blue-600/10 dark:bg-blue-500/5 p-8 rounded-[2.5rem] border border-blue-500/20 text-center mb-8">
                  <div className="text-2xl mb-4">🛸</div>
                  <p className="text-sm md:text-base text-blue-900 dark:text-blue-200 font-medium leading-relaxed">
                    <b>Вывод:</b> Набор этих параметров - твой уникальный паспорт. Даже если ты сменишь IP или включишь инкогнито, сайт поймет, что это снова ТЫ.
                  </p>
              </div>
              
              <button 
                onClick={scanBrowserLeaks} 
                className="w-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-blue-600 hover:text-white transition-all shadow-sm"
              >
                Повторить глубокий анализ ↻
              </button>
            </div>
        ) : (
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <button 
                onClick={scanBrowserLeaks} 
                className="relative w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 p-10 md:p-16 rounded-[2.5rem] flex flex-col items-center justify-center gap-6 hover:border-blue-500 transition-all shadow-xl card-3d overflow-hidden"
              >
                <div className="scanline-overlay animate-scanline opacity-10 group-hover:opacity-30"></div>
                <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 rounded-3xl flex items-center justify-center text-4xl shadow-inner group-hover:scale-110 transition-transform">⚡</div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-black text-slate-800 dark:text-white mb-2">Начать сканирование браузера</div>
                  <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] opacity-60">System Fingerprinting protocol</div>
                </div>
              </button>
            </div>
        )}
    </div>
  );
};