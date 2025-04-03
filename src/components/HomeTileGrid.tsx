
import React, { useState, useMemo, useEffect } from 'react';
import Tile from './Tile';
import SearchBar from './SearchBar';
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

/**
 * Tile data structure
 */
interface TileItem {
  id: number;
  icon: any; // LucideIcon type
  title: string;
  description: string;
  buttonText: string;
  aspectRatio: "square" | "portrait" | "landscape";
}

/**
 * Data for the home page tiles
 */
const tileData: TileItem[] = [
  {
    id: 1,
    icon: Laptop,
    title: "Accountrix",
    description: "Autonomize your workflow.",
    buttonText: "Launch",
    aspectRatio: "square"
  },
  {
    id: 2,
    icon: BarChart,
    title: "Lease Agent",
    description: "Extract value lease data with a single click.",
    buttonText: "Launch",
    aspectRatio: "square"
  },
  {
    id: 3,
    icon: LineChart,
    title: "Data Visualization",
    description: "Transform complex data into clear, beautiful visualizations.",
    buttonText: "See Examples",
    aspectRatio: "square"
  },
  {
    id: 4,
    icon: Users,
    title: "Team Collaboration",
    description: "Work together effectively with real-time collaboration tools.",
    buttonText: "Join Teams",
    aspectRatio: "square"
  },
  {
    id: 5,
    icon: CalendarClock,
    title: "Project Planning",
    description: "Plan your projects with intuitive scheduling and milestones.",
    buttonText: "Start Planning",
    aspectRatio: "square"
  },
  {
    id: 6,
    icon: Smartphone,
    title: "Mobile Experience",
    description: "Enjoy the same powerful experience on any device, anywhere.",
    buttonText: "Get Mobile",
    aspectRatio: "square"
  },
  {
    id: 7,
    icon: Code,
    title: "Developer Tools",
    description: "Access powerful development tools to build your next big project.",
    buttonText: "Get Started",
    aspectRatio: "square"
  },
  {
    id: 8,
    icon: Cloud,
    title: "Cloud Storage",
    description: "Store and access your data securely from anywhere in the world.",
    buttonText: "Learn More",
    aspectRatio: "square"
  }
];

/**
 * HomeTileGrid component - Displays a grid of tiles with filtering capability
 * @returns {JSX.Element} HomeTileGrid component
 */
const HomeTileGrid: React.FC = () => {
  // State for search filtering
  const [searchTerm, setSearchTerm] = useState('');
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
   * Handle search input changes
   * @param {string} term - The search term
   */
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  /**
   * Check if a tile should be visible
   * @param {number} id - Tile ID
   * @returns {boolean} Whether the tile should be visible
   */
  const isTileVisible = (id: number) => visibleTileIds.includes(id);

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      {/* Search filter - centered */}
      <div className="w-full flex justify-center mb-4">
        <SearchBar 
          onSearch={handleSearch} 
          placeholder="Filter tiles by name or description..." 
          resultsCount={filteredTiles.length}
          totalCount={tileData.length}
        />
      </div>
      
      {/* Display filtered tiles */}
      <div className={`w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[400px] transition-opacity duration-300 ${isFiltering ? 'opacity-50' : 'opacity-100'}`}>
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
              icon={tile.icon}
              title={tile.title}
              description={tile.description}
              buttonText={tile.buttonText}
              aspectRatio={tile.aspectRatio}
              buttonAction={() => console.log(`Clicked on ${tile.title}`)}
            />
          </div>
        ))}
      </div>
      
      {/* Show message when no results */}
      {filteredTiles.length === 0 && (
        <div className="text-center py-8 text-gray-500 animate-fade-in">
          No tiles match your search criteria
        </div>
      )}
    </div>
  );
};

export default HomeTileGrid;
