
import React, { useState } from 'react';
import Header from '../components/Header';
import ShopTileGrid from '../components/ShopTileGrid';
import SearchBar from '../components/SearchBar';

const Gallery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

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
