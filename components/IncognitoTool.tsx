
import React, { useState } from 'react';

export const IncognitoTool: React.FC = () => {
  const [leakData, setLeakData] = useState<any>(null);

  const scanBrowserLeaks = () => {
    const getGPU = () => {
        const c = document.createElement('canvas');
        const gl = c.getContext('webgl');
        if (!gl) return 'Unknown';
        const d = gl.getExtension('WEBGL_debug_renderer_info');
        return d ? gl.getParameter(d.UNMASKED_RENDERER_WEBGL) : 'Generic GPU';
    };
    setLeakData({
      userAgent: navigator.userAgent,
      screen: `${window.screen.width}x${window.screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      gpu: getGPU(),
      plugins: navigator.plugins.length,
      cores: navigator.hardwareConcurrency || 'Hidden'
    });
  };

  return (
    <div className="space-y-6">
        <div className="text-center">
            <h3 className="text-xl font-bold text-[#1e3c72]">Твой "Цифровой Отпечаток" 🕵️‍♂️</h3>
            <p className="text-sm text-gray-500 mb-6">Сайты видят эти данные даже в инкогнито. Проверь себя!</p>
        </div>
        {leakData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border p-6 rounded-2xl shadow-sm">
                    <div className="text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">Видеокарта (GPU)</div>
                    <div className="text-sm text-blue-900 font-mono break-all font-bold">{leakData.gpu}</div>
                </div>
                <div className="bg-white border p-6 rounded-2xl shadow-sm">
                    <div className="text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">Экран / Ядра</div>
                    <div className="text-sm text-blue-900 font-mono font-bold">{leakData.screen} / CPU: {leakData.cores}</div>
                </div>
                <div className="bg-white border p-6 rounded-2xl shadow-sm">
                    <div className="text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">Плагины / Timezone</div>
                    <div className="text-sm text-blue-900 font-mono font-bold">{leakData.plugins} плагинов / {leakData.timezone}</div>
                </div>
                <div className="md:col-span-2 bg-blue-50 p-5 rounded-2xl border border-blue-100 text-sm text-blue-800">
                    <b>Итог:</b> Эти данные уникальны для твоего "железа". Режим Инкогнито их <b>не скрывает</b>, что позволяет сайтам узнавать тебя без Cookie.
                </div>
                <button onClick={scanBrowserLeaks} className="md:col-span-2 read-more-btn">Обновить данные ↻</button>
            </div>
        ) : (
            <button onClick={scanBrowserLeaks} className="read-more-btn py-5 text-xl shadow-lg">Начать сканирование браузера ⚡</button>
        )}
    </div>
  );
};
