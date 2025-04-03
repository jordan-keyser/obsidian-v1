
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ShopTileGrid from '../components/ShopTileGrid';
import SearchBar from '../components/SearchBar';

const Gallery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * Add scroll effects to the page
   */
  useEffect(() => {
    // Handle scroll event to create dynamic effects
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const header = document.querySelector('header');
      
      if (header) {
        // Add shadow effect below header when scrolling
        const fadeOpacity = Math.min(scrollPos / 200, 0.15);
        
        // Apply fade gradient below header
        header.style.boxShadow = scrollPos > 10 
          ? `0 10px 15px -3px rgba(0, 0, 0, ${fadeOpacity}), 0 4px 6px -4px rgba(0, 0, 0, ${fadeOpacity})`
          : 'none';
      }
    };

    // Add and remove event listeners
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="main-layout">
      <Header />
      
      <main>
        <section className="py-16 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Crowe AGI Gallery</h1>
            <p className="text-xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
              Explore premium tools and solutions to enhance your business productivity.
            </p>
            
            {/* Add SearchBar to Gallery page - centered */}
            <div className="mt-8 flex justify-center">
              <SearchBar 
                onSearch={setSearchTerm} 
                placeholder="Search for premium tools..." 
              />
            </div>
          </div>
        </section>
        
        <ShopTileGrid searchTerm={searchTerm} />
      </main>
    </div>
  );
};

export default Gallery;
