
import React, { useState, useEffect } from 'react';
import { Menu, X, User, Settings, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import MobileMenu from './MobileMenu';
import ThemeToggle from './ThemeToggle';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';

/**
 * Header component - Provides navigation and theme controls
 * @returns {JSX.Element} Header component
 */
const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();
  
  // Add scroll detection with higher opacity when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Generate header class with higher opacity when scrolled for better readability
  const headerClass = `sticky top-0 z-50 w-full py-4 px-6 transition-all duration-300 ${
    scrolled 
      ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 shadow-sm' 
      : 'glass'
  }`;

  return (
    <header className={headerClass}>
      <div className="flex justify-between items-center w-full relative">
        <div className="flex-none pl-2 z-10">
          {theme === 'light' ? (
            <img 
              src="/lovable-uploads/e4a7a215-090b-491a-ad9b-29ba4aa18a9d.png" 
              alt="Crowe Logo" 
              className="h-10"
            />
          ) : (
            <img 
              src="/lovable-uploads/0b122a36-1e8b-4453-b25e-0aa892eafb2e.png" 
              alt="Crowe Logo" 
              className="h-10"
            />
          )}
        </div>
        
        <nav className="flex absolute left-1/2 transform -translate-x-1/2 space-x-4 md:space-x-6">
          <Link 
            to="/" 
            className={`text-base sm:text-lg md:text-xl font-medium transition-colors ${isActive('/') ? 'text-crowe-gold' : 'hover:text-crowe-gold'}`}
          >
            Home
          </Link>
          <Link 
            to="/chat" 
            className={`text-base sm:text-lg md:text-xl font-medium transition-colors ${isActive('/chat') ? 'text-crowe-gold' : 'hover:text-crowe-gold'}`}
          >
            Chat
          </Link>
          <Link 
            to="/gallery" 
            className={`text-base sm:text-lg md:text-xl font-medium transition-colors ${isActive('/gallery') ? 'text-crowe-gold' : 'hover:text-crowe-gold'}`}
          >
            Gallery
          </Link>
        </nav>
        
        <div className="flex-none pr-2 flex items-center gap-3 z-10">
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
              <Link to="/feedback" className="w-full">
                <DropdownMenuItem>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Feedback</span>
                </DropdownMenuItem>
              </Link>
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
