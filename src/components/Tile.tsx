
import React from 'react';
import { Button } from './ui/button';

interface TileProps {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonAction?: () => void;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
}

const Tile: React.FC<TileProps> = ({
  image,
  title,
  description,
  buttonText,
  buttonAction = () => {},
  aspectRatio = 'square'
}) => {
  return (
    <div className="tile h-[300px] w-full">
      <div className="absolute inset-0 z-0">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10"></div>
      </div>
      
      <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm mb-4 text-white/90">{description}</p>
        <Button 
          onClick={buttonAction}
          className="bg-tile hover:bg-tile-hover transition-colors w-full justify-center"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default Tile;
