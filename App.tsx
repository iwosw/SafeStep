
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import Quiz from './pages/Quiz';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/article/:id" element={<ArticleDetail />} />
      <Route path="/quiz" element={<Quiz />} />
    </Routes>
  );
};

export default App;
