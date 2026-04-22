import React, { useState, useEffect } from 'react';

export const ThreatMap: React.FC = () => {
    const [attacks, setAttacks] = useState<{id: number, top: number, left: number}[]>([]);
    
    useEffect(() => {
        const interval = setInterval(() => {
            const newAttack = {
                id: Date.now(),
                top: Math.random() * 80 + 10,
                left: Math.random() * 80 + 10
            };
            setAttacks(prev => [...prev.slice(-5), newAttack]);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-[220px] bg-slate-950 rounded-[2.5rem] overflow-hidden border border-blue-500/10 mt-12 shadow-2xl group">
            <div className="scanline-overlay animate-scanline opacity-20"></div>
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] bg-center bg-no-repeat bg-contain group-hover:scale-110 transition-transform duration-1000"></div>
            <div className="absolute top-6 left-6 flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                <span className="text-[10px] font-mono text-red-500 font-black uppercase tracking-[0.3em]">Live Threat Monitor</span>
            </div>
            {attacks.map(attack => (
                <div 
                    key={attack.id} 
                    className="threat-map-dot absolute w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_red]" 
                    style={{ top: `${attack.top}%`, left: `${attack.left}%` }}
                ></div>
            ))}
            <div className="absolute bottom-6 right-6 text-[8px] font-mono text-blue-400 opacity-50 text-right uppercase leading-relaxed">
                Packet_Filter: ON <br/>
                Risk_Level: NOMINAL
            </div>
        </div>
    );
};
