import React from 'react';

export const SideDecorations: React.FC = () => (
    <>
        {/* Left Side Gutter */}
        <div className="fixed top-0 left-0 w-[15vw] h-full pointer-events-none z-0 hidden lg:block opacity-40">
            {/* Cyber Grid background for sides */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            
            <div className="absolute top-[15%] left-[20%] w-16 h-16 border border-blue-500/20 rounded-lg animate-spin-slow blur-[1px]">
                <div className="absolute inset-2 border border-blue-400/30 rotate-45"></div>
            </div>
            
            <div className="absolute top-[60%] left-[30%] w-8 h-8 bg-blue-500/10 rounded-full animate-float blur-sm shadow-[0_0_30px_rgba(59,130,246,0.8)]"></div>
            
            <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"></div>
            
            <div className="absolute top-[20%] right-[-10px] text-blue-500/30 text-[12px] font-mono whitespace-nowrap -rotate-90 tracking-[0.5em] uppercase font-black blur-[0.5px]">SYS.SEC.ACTIVE</div>
            <div className="absolute top-[70%] right-[-10px] text-blue-500/30 text-[12px] font-mono whitespace-nowrap -rotate-90 tracking-[0.5em] uppercase font-black blur-[0.5px]">MONITORING_NODES</div>
            
            {/* Scanline */}
            <div className="absolute top-0 right-0 w-1 h-32 bg-blue-400/50 blur-[2px] animate-scanline"></div>
        </div>

        {/* Right Side Gutter */}
        <div className="fixed top-0 right-0 w-[15vw] h-full pointer-events-none z-0 hidden lg:block opacity-40">
            {/* Cyber Grid background for sides */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            
            <div className="absolute top-[30%] right-[20%] w-24 h-24 border-2 border-dashed border-blue-500/10 rounded-full animate-spin blur-[1px]"></div>
            
            <div className="absolute top-[75%] right-[25%] w-12 h-12 border-2 border-blue-400/20 rounded-lg animate-float-delayed rotate-12 blur-[1px]"></div>
            
            <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"></div>
            
            <div className="absolute top-[40%] left-[-10px] text-blue-500/30 text-[12px] font-mono whitespace-nowrap rotate-90 tracking-[0.5em] uppercase font-black blur-[0.5px]">FIREWALL.ON</div>
            <div className="absolute top-[85%] left-[-10px] text-blue-500/30 text-[12px] font-mono whitespace-nowrap rotate-90 tracking-[0.5em] uppercase font-black blur-[0.5px]">SHIELD.UP</div>
            
            {/* Scanline */}
            <div className="absolute top-0 left-0 w-1 h-32 bg-blue-400/50 blur-[2px] animate-scanline" style={{ animationDelay: '2s' }}></div>
        </div>
    </>
);
