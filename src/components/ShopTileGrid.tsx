
import React, { useState, useMemo, useEffect } from 'react';
import Tile from './Tile';
import { 
  Laptop, 
  BarChart, 
  LineChart, 
  Users, 
  CalendarClock, 
  Smartphone, 
  Code, 
  Cloud 
} from 'lucide-react';

interface ShopTileGridProps {
  searchTerm?: string;
}

/**
 * Data for the shop page tiles
 */
const tileData = [
  {
    id: 1,
    icon: Laptop,
    title: "Digital Workspace",
    description: "Organize your projects with our intuitive workspace tools.",
    buttonText: "Explore",
    aspectRatio: "square" as const,
    hasLock: true
  },
  {
    id: 2,
    icon: BarChart,
    title: "Daily Analytics",
    description: "Track your progress with detailed analytics and insights.",
    buttonText: "View Stats",
    aspectRatio: "square" as const,
    hasLock: true
  },
  {
    id: 3,
    icon: LineChart,
    title: "Data Visualization",
    description: "Transform complex data into clear, beautiful visualizations.",
    buttonText: "See Examples",
    aspectRatio: "square" as const,
    hasLock: true
  },
  {
    id: 4,
    icon: Users,
    title: "Team Collaboration",
    description: "Work together effectively with real-time collaboration tools.",
    buttonText: "Join Teams",
    aspectRatio: "square" as const,
    hasLock: true
  },
  {
    id: 5,
    icon: CalendarClock,
    title: "Premium Planning",
    description: "Advanced project planning with intuitive scheduling and milestones.",
    buttonText: "Unlock Now",
    aspectRatio: "square" as const,
    hasLock: true
  },
  {
    id: 6,
    icon: Smartphone,
    title: "Mobile Pro",
    description: "Enhanced mobile experience with exclusive features.",
    buttonText: "Upgrade",
    aspectRatio: "square" as const,
    hasLock: true
  },
  {
    id: 7,
    icon: Code,
    title: "Developer Suite",
    description: "Advanced development tools to build enterprise-grade applications.",
    buttonText: "Get Access",
    aspectRatio: "square" as const,
    hasLock: true
  },
  {
    id: 8,
    icon: Cloud,
    title: "Cloud Enterprise",
    description: "Enterprise cloud storage with advanced security features.",
    buttonText: "Subscribe",
    aspectRatio: "square" as const,
    hasLock: true
  }
];

/**
 * ShopTileGrid component - Displays a grid of premium/shop tiles with filtering capability
 * @param {ShopTileGridProps} props - Component properties
 * @returns {JSX.Element} ShopTileGrid component
 */
const ShopTileGrid: React.FC<ShopTileGridProps> = ({ searchTerm = '' }) => {
  const [visibleTileIds, setVisibleTileIds] = useState<number[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);

  /**
   * Filter tiles based on search term
   */
  const filteredTiles = useMemo(() => {
    if (!searchTerm) return tileData;
    
    const normalizedSearch = searchTerm.toLowerCase();
    return tileData.filter(
      tile => 
        tile.title.toLowerCase().includes(normalizedSearch) || 
        tile.description.toLowerCase().includes(normalizedSearch)
    );
  }, [searchTerm]);

  /**
   * Update visible tile IDs when filtered tiles change
   */
  useEffect(() => {
    if (searchTerm) {
      setIsFiltering(true);
      // Short delay to allow fade-out animation to complete
      const timer = setTimeout(() => {
        setVisibleTileIds(filteredTiles.map(tile => tile.id));
        setIsFiltering(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setVisibleTileIds(tileData.map(tile => tile.id));
      setIsFiltering(false);
    }
  }, [filteredTiles, searchTerm]);

  /**
   * Initialize all tiles as visible
   */
  useEffect(() => {
    setVisibleTileIds(tileData.map(tile => tile.id));
  }, []);

  /**
   * Check if a tile should be visible
   * @param {number} id - Tile ID
   * @returns {boolean} Whether the tile should be visible
   */
  const isTileVisible = (id: number) => visibleTileIds.includes(id);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Display filtered tiles */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[400px] transition-opacity duration-300 ${isFiltering ? 'opacity-50' : 'opacity-100'}`}>
        {tileData.map(tile => (
          <div 
            key={tile.id} 
            className={`transition-all duration-300 ease-in-out ${
              isTileVisible(tile.id) 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-95 absolute -z-10'
            }`}
          >
            <Tile
              key={tile.id}
              icon={tile.icon}
              title={tile.title}
              description={tile.description}
              buttonText={tile.buttonText}
              aspectRatio={tile.aspectRatio}
              hasLock={tile.hasLock}
              buttonAction={() => console.log(`Clicked on ${tile.title}`)}
            />
          </div>
        ))}
      </div>
      
      {/* Show message when no results */}
      {filteredTiles.length === 0 && (
        <div className="text-center py-8 text-gray-500 animate-fade-in">
          No premium tools match your search criteria
        </div>
      )}
    </div>
  );
};

export default ShopTileGrid;
