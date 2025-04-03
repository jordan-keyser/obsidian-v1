
import React, { useEffect } from 'react';
import Header from '../components/Header';
import HomeTileGrid from '../components/HomeTileGrid';
import ChatInput from '../components/ChatInput';

/**
 * Index component - The main homepage of the application
 * @returns {JSX.Element} Index component
 */
const Index: React.FC = () => {
  /**
   * Add scroll effects to the page
   */
  useEffect(() => {
    // Handle scroll event to create dynamic effects
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const header = document.querySelector('header');
      const mainContent = document.querySelector('main');
      
      if (header && mainContent) {
        // Add blur effect below header when scrolling
        const blurAmount = Math.min(scrollPos / 100, 8);
        const fadeOpacity = Math.min(scrollPos / 200, 0.15);
        
        // Apply blur and fade gradient below header
        header.style.boxShadow = scrollPos > 10 
          ? `0 10px 15px -3px rgba(0, 0, 0, ${fadeOpacity}), 0 4px 6px -4px rgba(0, 0, 0, ${fadeOpacity})`
          : 'none';
        
        // Add blur to main content as you scroll
        mainContent.style.backdropFilter = `blur(${blurAmount}px)`;
      }
    };

    // Add and remove event listeners
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="main-layout">
      {/* Header component */}
      <Header />
      
      {/* Main content */}
      <main>
        {/* Welcome section */}
        <section className="py-16 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Crowe AGI</h1>
            <p className="text-xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
              Explore our collection of products to autonomize your business and simplify your workflow.
            </p>
          </div>
        </section>
        
        {/* Tile grid with filtering */}
        <HomeTileGrid />
        
        {/* Chat input at the bottom */}
        <section className="container mx-auto px-4 py-12 mb-16">
          <ChatInput />
        </section>
      </main>
    </div>
  );
};

export default Index;
