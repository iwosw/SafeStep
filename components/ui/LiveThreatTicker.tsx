import React, { useState, useEffect } from 'react';

const MESSAGES = [
    "Взломан крупный аккаунт в Бразилии. Пароли в открытом доступе.",
    "Обнаружена новая фишинговая кампания в Telegram (CryptoSCAM).",
    "Стилер найден в популярных модах на Minecraft. Удалите папку /mods.",
    "Заблокирована попытка брутфорса сервера 192.168.1.134.",
    "Утечка базы данных сервиса доставки еды (2.4M строк).",
    "OSINT: Обнаружена сеть ботов, профилирующих социальные сети школьников.",
    "Критическая уязвимость Wi-Fi сетей (KRACK) снова актуальна.",
    "Обнаружен поддельный портал Госуслуг. Проверяйте URL!",
    "DarkWeb: Выставлена на продажу база номеров телефонов курьеров.",
    "Система защиты: предотвращена попытка перехвата токенов сессии."
];

export const LiveThreatTicker: React.FC = () => {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-red-600/90 text-white overflow-hidden text-[10px] sm:text-xs font-mono font-black uppercase tracking-widest flex items-center z-50 border-t border-red-500 shadow-[0_-5px_20px_rgba(220,38,38,0.3)] backdrop-blur-md">
            <div className="bg-red-800 text-red-100 flex-shrink-0 px-4 py-2 flex items-center gap-2 z-10 border-r border-red-500 shadow-lg">
                <span className="w-2 h-2 bg-red-400 rounded-full animate-ping"></span>
                LIVE_THREAT_FEED
            </div>
            
            <div className="relative flex-grow h-full overflow-hidden whitespace-nowrap">
                <style>
                    {`
                    @keyframes ticker {
                        0% { transform: translateX(100%); }
                        100% { transform: translateX(-100%); }
                    }
                    .animate-ticker {
                        animation: ticker 40s linear infinite;
                    }
                    .animate-ticker:hover {
                        animation-play-state: paused;
                    }
                    `}
                </style>
                <div className="inline-block animate-ticker py-2 whitespace-nowrap text-red-50">
                    <span className="mx-8">//</span>
                    {MESSAGES.join("   //   ")}
                    <span className="mx-8">//</span>
                    {MESSAGES.join("   //   ")}
                </div>
            </div>
        </div>
    );
};
