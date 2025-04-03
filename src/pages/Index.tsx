
import React from 'react';
import Header from '../components/Header';
import HomeTileGrid from '../components/HomeTileGrid';
import ChatInput from '../components/ChatInput';

/**
 * Index component - The main homepage of the application
 * @returns {JSX.Element} Index component
 */
const Index: React.FC = () => {
  return (
    <div className="main-layout">
      {/* Header component with navigation */}
      <Header />
      
      {/* Main content */}
      <main>
        {/* Welcome section */}
        <section className="py-16 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Crowe Obsidian</h1>
            <p className="text-xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
              Explore our collection of products to autonomize your business and simplify your workflow.
            </p>
          </div>
        </section>
        
        {/* Tile grid with product offerings */}
        <HomeTileGrid />
        
        {/* Chat input for direct user assistance */}
        <section className="container mx-auto px-4 py-12 mb-16">
          <ChatInput />
        </section>
      </main>
    </div>
  );
};

export default Index;
