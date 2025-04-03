
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
      <div className="flex justify-between items-center w-full">
        <div className="flex-none pl-2">
          <img 
            src="/lovable-uploads/a77d3106-824a-4647-8cc8-b594818529bc.png" 
            alt="Crowe Logo" 
            className="h-10"
          />
        </div>
        
        <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-6">
          <Link 
            to="/" 
            className={`font-medium transition-colors ${isActive('/') ? 'text-crowe-gold' : 'hover:text-crowe-gold'}`}
          >
            Home
          </Link>
          <Link 
            to="/chat" 
            className={`font-medium transition-colors ${isActive('/chat') ? 'text-crowe-gold' : 'hover:text-crowe-gold'}`}
          >
            Chat
          </Link>
          <Link 
            to="/gallery" 
            className={`font-medium transition-colors ${isActive('/gallery') ? 'text-crowe-gold' : 'hover:text-crowe-gold'}`}
          >
            Gallery
          </Link>
          <Link 
            to="/feedback" 
            className={`font-medium transition-colors ${isActive('/feedback') ? 'text-crowe-gold' : 'hover:text-crowe-gold'}`}
          >
            Feedback
          </Link>
        </nav>
        
        <div className="flex-none pr-2 flex items-center gap-3">
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
