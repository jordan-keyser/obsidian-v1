
import React from 'react';
import { Button } from './ui/button';
import { Plus, Lock } from 'lucide-react';

interface TileProps {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonAction?: () => void;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
  hasLock?: boolean;
}

const Tile: React.FC<TileProps> = ({
  image,
  title,
  description,
  buttonText,
  buttonAction = () => {},
  aspectRatio = 'square',
  hasLock = false
}) => {
  return (
    <div className="tile h-[300px] w-full">
      <div className="absolute inset-0 z-0">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40"></div>
      </div>
      
      <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
        <h3 className="text-xl font-bold mb-2 text-shadow">{title}</h3>
        <p className="text-sm mb-4 text-white/90">{description}</p>
        
        {hasLock ? (
          <div className="flex gap-2">
            <Button 
              disabled
              className="bg-crowe-gold hover:bg-crowe-gold/80 transition-colors flex-1 justify-center"
            >
              <Lock className="mr-2 h-4 w-4" />
              {buttonText}
            </Button>
            <Button 
              onClick={buttonAction}
              className="bg-crowe-dark hover:bg-crowe-dark/80 transition-colors"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button 
            onClick={buttonAction}
            className="bg-crowe-gold hover:bg-crowe-gold/80 transition-colors w-full justify-center"
          >
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Tile;
