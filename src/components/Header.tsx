
import React, { useState } from 'react';
import { Menu, X, User, Settings } from 'lucide-react';
import { Button } from './ui/button';
import MobileMenu from './MobileMenu';
import ThemeToggle from './ThemeToggle';
import { Link, useLocation } from 'react-router-dom';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full glass py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-md bg-crowe-dark mr-3 flex items-center justify-center">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <h1 className="text-xl font-bold">Crowe AGI</h1>
        </div>
        
        <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-6">
          <Link 
            to="/" 
            className={`font-medium transition-colors ${isActive('/') ? 'text-crowe-gold' : 'hover:text-crowe-gold'}`}
          >
            Home
          </Link>
          <Link 
            to="/dashboard" 
            className={`font-medium transition-colors ${isActive('/dashboard') ? 'text-crowe-gold' : 'hover:text-crowe-gold'}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/shop" 
            className={`font-medium transition-colors ${isActive('/shop') ? 'text-crowe-gold' : 'hover:text-crowe-gold'}`}
          >
            Shop
          </Link>
          <Link 
            to="/contact" 
            className={`font-medium transition-colors ${isActive('/contact') ? 'text-crowe-gold' : 'hover:text-crowe-gold'}`}
          >
            Contact
          </Link>
        </nav>
        
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 border border-input">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="px-2 py-1.5 flex items-center">
                <span className="text-sm">Theme</span>
                <div className="ml-auto">
                  <ThemeToggle />
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      
      <MobileMenu isOpen={mobileMenuOpen} />
    </header>
  );
};

export default Header;
