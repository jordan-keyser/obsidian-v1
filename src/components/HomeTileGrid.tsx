
import React, { useState, useMemo, useEffect } from 'react';
import Tile from './Tile';
import SearchBar from './SearchBar';
import { 
  Laptop, 
  BarChart, 
  LineChart, 
  MessageSquare, 
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
    icon: MessageSquare,
    title: "Chat with your Data",
    description: "Work together effectively with real-time collaboration tools.",
    buttonText: "Launch",
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
   * Handle search input changes
   * @param {string} term - The search term
   */
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 flex flex-col items-center">
      {/* Search filter - centered */}
      <div className="w-full flex justify-center mb-4">
        <SearchBar 
          onSearch={handleSearch} 
          placeholder="Filter tiles by name or description..." 
          resultsCount={filteredTiles.length}
          totalCount={tileData.length}
        />
      </div>
      
      {/* Display filtered tiles with responsive grid and margins */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 min-h-[400px]">
        {filteredTiles.map(tile => (
          <div key={tile.id}>
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
        <div className="text-center py-8 text-gray-500">
          No tiles match your search criteria
        </div>
      )}
    </div>
  );
};

export default HomeTileGrid;
