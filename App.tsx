
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { Navbar, Footer } from './components/Layout';
import { ToastManager } from './components/ToastManager';
import { SideDecorations } from './components/home/SideDecorations';
import Home from './pages/Home';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import Quiz from './pages/Quiz';

const App: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <SideDecorations />
      <ToastManager />
      <Navbar />
      <div className="flex-grow flex flex-col relative w-full">
        <AnimatePresence mode="wait">
          {/* @ts-ignore - React Router typings sometimes complain about key, but it's required for AnimatePresence */}
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

export default App;
