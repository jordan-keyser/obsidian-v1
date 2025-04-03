
import React from 'react';
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

const ShopTileGrid: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tileData.map(tile => (
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
        ))}
      </div>
    </div>
  );
};

export default ShopTileGrid;
