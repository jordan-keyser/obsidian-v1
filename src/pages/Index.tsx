
import React, { useEffect } from 'react';
import Header from '../components/Header';
import HomeTileGrid from '../components/HomeTileGrid';
import ChatInput from '../components/ChatInput';

const Index: React.FC = () => {
  // Add scroll blur effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const header = document.querySelector('header');
      const mainContent = document.querySelector('main');
      
      if (header && mainContent) {
        // Add blur to main content as you scroll
        const blurAmount = Math.min(scrollPos / 100, 5); // Max 5px blur
        mainContent.style.backdropFilter = `blur(${blurAmount}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="main-layout">
      <Header />
      
      <main>
        <section className="py-16 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Crowe AGI</h1>
            <p className="text-xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
              Explore our collection of products to autonomize your business and simplify your workflow.
            </p>
          </div>
        </section>
        
        <HomeTileGrid />
        
        <section className="container mx-auto px-4 py-12 mb-16">
          <ChatInput />
        </section>
      </main>
    </div>
  );
};

export default Index;
