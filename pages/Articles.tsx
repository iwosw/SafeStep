
import React from 'react';
import { Link } from 'react-router-dom';
import { ARTICLES } from '../constants';
import { Layout } from './LayoutWrapper';

const Articles: React.FC = () => {
  return (
    <Layout>
      <header className="hero-gradient pt-20 pb-32 px-5 text-center">
        <h1 className="text-5xl font-black mb-4">Библиотека SafeStep</h1>
        <p className="text-xl opacity-90">9 шагов к полной цифровой безопасности</p>
      </header>

      <main className="container-box mt-[-80px] dark:bg-slate-800 dark:border-slate-700">
        <div className="articles-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES.map(article => (
            <div key={article.id} className="article-card bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col h-full">
              <div className="text-4xl mb-4">{article.emoji}</div>
              <h3 className="text-xl font-bold text-[#1e3c72] dark:text-blue-300 mb-3">{article.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow">{article.description}</p>
              <Link to={`/article/${article.id}`} className="read-more-btn dark:bg-blue-600">Читать статью</Link>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default Articles;
