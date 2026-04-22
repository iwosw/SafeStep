import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ToastData {
  id: number;
  title: string;
  text: string;
}

export const ToastManager: React.FC = () => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    const handleToast = (e: Event) => {
      const customEvent = e as CustomEvent;
      const newToast = { id: Date.now(), title: customEvent.detail.title, text: customEvent.detail.text };
      
      setToasts(prev => [...prev, newToast]);
      
      // Auto-remove after 4 seconds
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== newToast.id));
      }, 4000);
    };

    window.addEventListener('trigger-toast', handleToast);
    return () => window.removeEventListener('trigger-toast', handleToast);
  }, []);

  return (
    <div className="fixed top-24 right-5 z-[100] flex flex-col gap-3 pointer-events-none w-80">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, x: 20 }}
            className="bg-slate-900 dark:bg-slate-800 text-white p-4 rounded-2xl shadow-2xl border border-blue-500/30 backdrop-blur-xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1">{toast.title}</h4>
            <p className="text-sm font-bold">{toast.text}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
