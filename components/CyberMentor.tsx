
import React, { useState } from 'react';
import { askMentor } from '../services/geminiService';

export const CyberMentor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    const res = await askMentor(question);
    setAnswer(res || '');
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen ? (
        <div className="bg-white dark:bg-slate-900 border border-blue-500/30 w-[320px] md:w-[400px] rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-blue-600 p-4 flex justify-between items-center">
            <h4 className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2">
              <span className="text-xl">🤖</span> Cyber-Mentor
            </h4>
            <button onClick={() => setIsOpen(false)} className="text-white opacity-60 hover:opacity-100">✕</button>
          </div>
          <div className="p-5">
            {answer ? (
              <div className="mb-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl text-sm leading-relaxed dark:text-blue-100 italic">
                  "{answer}"
                </div>
                <button onClick={() => {setAnswer(''); setQuestion('');}} className="mt-2 text-xs text-blue-500 font-bold hover:underline">Спросить еще раз</button>
              </div>
            ) : (
              <form onSubmit={handleAsk} className="space-y-4">
                <p className="text-xs text-gray-500 dark:text-gray-400">Спроси меня о чем угодно: от паролей до взломов.</p>
                <textarea 
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Как защитить свой Discord?"
                  className="w-full bg-gray-50 dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 p-3 rounded-xl text-sm focus:border-blue-500 outline-none transition-all dark:text-white"
                  rows={2}
                />
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50"
                >
                  {loading ? 'АНАЛИЗИРУЮ...' : 'ЗАДАТЬ ВОПРОС'}
                </button>
              </form>
            )}
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-3xl shadow-xl shadow-blue-600/30 hover:scale-110 transition-all group relative"
        >
          <span className="group-hover:animate-bounce">🤖</span>
          <div className="absolute -top-2 -right-2 bg-red-500 text-[10px] font-black px-2 py-1 rounded-full animate-pulse">AI</div>
        </button>
      )}
    </div>
  );
};
