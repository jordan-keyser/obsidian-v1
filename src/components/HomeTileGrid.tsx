
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
    aspectRatio: "square" as const
  },
  {
    id: 2,
    icon: BarChart,
    title: "Daily Analytics",
    description: "Track your progress with detailed analytics and insights.",
    buttonText: "View Stats",
    aspectRatio: "square" as const
  },
  {
    id: 3,
    icon: LineChart,
    title: "Data Visualization",
    description: "Transform complex data into clear, beautiful visualizations.",
    buttonText: "See Examples",
    aspectRatio: "square" as const
  },
  {
    id: 4,
    icon: Users,
    title: "Team Collaboration",
    description: "Work together effectively with real-time collaboration tools.",
    buttonText: "Join Teams",
    aspectRatio: "square" as const
  },
  {
    id: 5,
    icon: CalendarClock,
    title: "Project Planning",
    description: "Plan your projects with intuitive scheduling and milestones.",
    buttonText: "Start Planning",
    aspectRatio: "square" as const
  },
  {
    id: 6,
    icon: Smartphone,
    title: "Mobile Experience",
    description: "Enjoy the same powerful experience on any device, anywhere.",
    buttonText: "Get Mobile",
    aspectRatio: "square" as const
  },
  {
    id: 7,
    icon: Code,
    title: "Developer Tools",
    description: "Access powerful development tools to build your next big project.",
    buttonText: "Get Started",
    aspectRatio: "square" as const
  },
  {
    id: 8,
    icon: Cloud,
    title: "Cloud Storage",
    description: "Store and access your data securely from anywhere in the world.",
    buttonText: "Learn More",
    aspectRatio: "square" as const
  }
];

const HomeTileGrid: React.FC = () => {
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
            buttonAction={() => console.log(`Clicked on ${tile.title}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeTileGrid;
