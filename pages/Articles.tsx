
import React from 'react';
import { Link } from 'react-router-dom';
import { ARTICLES } from '../constants';
import { Layout } from './LayoutWrapper';

const Articles: React.FC = () => {
  return (
    <Layout>
      <header className="hero-gradient pt-28 pb-44 px-5 text-center">
        <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter text-white">Библиотека SafeStep</h1>
        <p className="text-xl opacity-90 text-blue-100 font-medium">9 шагов к полной цифровой безопасности</p>
      </header>

      <main className="container-box">
        <div className="articles-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTICLES.map(article => (
            <div key={article.id} className="article-card bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all flex flex-col h-full group relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
                <img 
                  src={`https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=400&fit=crop`} 
                  className="w-full h-full object-cover" 
                  alt="Card Background" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{article.emoji}</div>
                <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-4 leading-tight group-hover:text-blue-600 transition-colors">{article.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-base mb-8 flex-grow font-medium leading-relaxed">{article.description}</p>
                <Link to={`/article/${article.id}`} className="inline-block bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white px-8 py-4 rounded-2xl font-black text-center border border-slate-200 dark:border-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all uppercase tracking-widest text-xs">Изучить модуль</Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default Articles;
