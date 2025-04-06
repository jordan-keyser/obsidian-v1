
import React from 'react';
import { Button } from './ui/button';
import { Plus, Lock, LucideIcon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

/**
 * Props for the Tile component
 */
interface TileProps {
  icon?: LucideIcon;
  image?: string;
  title: string;
  description: string;
  buttonText: string;
  buttonAction?: () => void;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
  hasLock?: boolean;
}

/**
 * Tile component - Displays a card-like UI element with an icon, title, description, and action button
 * @param {TileProps} props - Component properties
 * @returns {JSX.Element} Tile component
 */
const Tile: React.FC<TileProps> = ({
  icon: Icon,
  image,
  title,
  description,
  buttonText,
  buttonAction = () => {},
  aspectRatio = 'square',
  hasLock = false
}) => {
  // Get current theme context
  const { theme } = useTheme();
  const isLightMode = theme === 'light';

  return (
    <div className={`tile h-[300px] w-full ${isLightMode ? 'bg-white/80 shadow-md' : ''}`}>
      {/* Dark mode gradient overlay (only if no image and in dark mode) */}
      {!isLightMode && !image && (
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40"></div>
      )}
      
      {/* Background image with gradient overlay */}
      {image && (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center" 
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40"></div>
        </div>
      )}
      
      {/* Tile content */}
      <div className={`relative z-10 h-full flex flex-col p-6 ${isLightMode && !image ? 'text-gray-800' : 'text-white'}`}>
        {/* Icon section - Updated with larger icon size */}
        <div className="flex justify-center mb-4 mt-2">
          {Icon && (
            <div className={`flex items-center justify-center rounded-full p-4 ${
              isLightMode && !image 
                ? 'bg-white border-2 border-crowe-dark' 
                : 'bg-black/30 border-2 border-crowe-gold'
            }`}>
              <Icon 
                size={48} 
                className={isLightMode && !image ? "text-crowe-dark" : "text-crowe-gold"} 
              />
            </div>
          )}
        </div>
        
        {/* Content section */}
        <div className="flex-grow flex flex-col justify-end">
          {/* Title with conditional text shadow */}
          <h3 className={`text-xl font-bold mb-2 ${(!isLightMode || image) ? 'text-shadow' : ''}`}>{title}</h3>
          
          {/* Description with conditional color */}
          <p className={`text-sm mb-4 ${isLightMode && !image ? 'text-gray-600' : 'text-white/90'}`}>{description}</p>
          
          {/* Button section */}
          {hasLock ? (
            <div className="flex gap-2">
              {/* Locked action button */}
              <Button 
                disabled
                className={`${isLightMode && !image ? 'bg-crowe-dark hover:bg-crowe-dark/80' : 'bg-crowe-gold hover:bg-crowe-gold/80'} transition-colors flex-1 justify-center`}
              >
                <Lock className="mr-2 h-4 w-4" />
                {buttonText}
              </Button>
              
              {/* Plus button */}
              <Button 
                onClick={buttonAction}
                className={`${isLightMode && !image ? 'bg-crowe-dark hover:bg-crowe-dark/80' : 'bg-crowe-dark hover:bg-crowe-dark/80'} transition-colors`}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            /* Standard action button */
            <Button 
              onClick={buttonAction}
              className={`${isLightMode && !image ? 'bg-crowe-dark hover:bg-crowe-dark/80' : 'bg-crowe-gold hover:bg-crowe-gold/80'} transition-colors w-full justify-center`}
            >
              {buttonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tile;
