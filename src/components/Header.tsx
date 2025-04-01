
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import MobileMenu from './MobileMenu';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full glass py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-md bg-tile/80 mr-3 flex items-center justify-center">
            <span className="text-white font-bold text-xl">T</span>
          </div>
          <h1 className="text-xl font-bold">TileBurst</h1>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="font-medium hover:text-tile transition-colors">Home</a>
          <a href="#" className="font-medium hover:text-tile transition-colors">Features</a>
          <a href="#" className="font-medium hover:text-tile transition-colors">Gallery</a>
          <a href="#" className="font-medium hover:text-tile transition-colors">Contact</a>
        </nav>
        
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>
      
      <MobileMenu isOpen={mobileMenuOpen} />
    </header>
  );
};

export default Header;
