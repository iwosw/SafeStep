
import React, { useEffect } from 'react';
import { Navbar, Footer } from '../components/Layout';
import { CyberMentor } from '../components/CyberMentor';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        {children}
      </div>
      <CyberMentor />
      <Footer />
    </div>
  );
};
