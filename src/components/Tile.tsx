
import React from 'react';
import { Button } from './ui/button';
import { Plus, Lock, LucideIcon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

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
  const { theme } = useTheme();
  const isLightMode = theme === 'light';

  return (
    <div className={`tile h-[300px] w-full ${isLightMode ? 'bg-white/80 shadow-md' : ''}`}>
      {!isLightMode && !image && (
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40"></div>
      )}
      
      {image && (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center" 
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40"></div>
        </div>
      )}
      
      <div className={`relative z-10 h-full flex flex-col p-6 ${isLightMode && !image ? 'text-gray-800' : 'text-white'}`}>
        <div className="flex justify-center mb-4 mt-2">
          {Icon && (
            <Icon 
              size={48} 
              className={isLightMode && !image ? "text-crowe-dark" : "text-crowe-gold"} 
            />
          )}
        </div>
        
        <div className="flex-grow flex flex-col justify-end">
          <h3 className={`text-xl font-bold mb-2 ${(!isLightMode || image) ? 'text-shadow' : ''}`}>{title}</h3>
          <p className={`text-sm mb-4 ${isLightMode && !image ? 'text-gray-600' : 'text-white/90'}`}>{description}</p>
          
          {hasLock ? (
            <div className="flex gap-2">
              <Button 
                disabled
                className={`${isLightMode && !image ? 'bg-crowe-dark hover:bg-crowe-dark/80' : 'bg-crowe-gold hover:bg-crowe-gold/80'} transition-colors flex-1 justify-center`}
              >
                <Lock className="mr-2 h-4 w-4" />
                {buttonText}
              </Button>
              <Button 
                onClick={buttonAction}
                className={`${isLightMode && !image ? 'bg-crowe-dark hover:bg-crowe-dark/80' : 'bg-crowe-dark hover:bg-crowe-dark/80'} transition-colors`}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          ) : (
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
