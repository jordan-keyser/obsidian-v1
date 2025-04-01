
import React from 'react';
import Header from '../components/Header';
import TileGrid from '../components/TileGrid';

const Index: React.FC = () => {
  return (
    <div className="main-layout">
      <Header />
      
      <main>
        <section className="py-16 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to TileBurst</h1>
            <p className="text-xl max-w-3xl mx-auto text-gray-700">
              Explore our collection of interactive tiles to discover more about our services and features.
            </p>
          </div>
        </section>
        
        <TileGrid />
      </main>
    </div>
  );
};

export default Index;
