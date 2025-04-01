
import React from 'react';
import Tile from './Tile';

const tileData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop",
    title: "Digital Workspace",
    description: "Organize your projects with our intuitive workspace tools.",
    buttonText: "Explore",
    aspectRatio: "landscape" as const
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=1200&auto=format&fit=crop",
    title: "Daily Analytics",
    description: "Track your progress with detailed analytics and insights.",
    buttonText: "View Stats",
    aspectRatio: "portrait" as const
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    title: "Data Visualization",
    description: "Transform complex data into clear, beautiful visualizations.",
    buttonText: "See Examples",
    aspectRatio: "square" as const
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    title: "Team Collaboration",
    description: "Work together effectively with real-time collaboration tools.",
    buttonText: "Join Teams",
    aspectRatio: "landscape" as const
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&auto=format&fit=crop",
    title: "Project Planning",
    description: "Plan your projects with intuitive scheduling and milestones.",
    buttonText: "Start Planning",
    aspectRatio: "square" as const
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1200&auto=format&fit=crop",
    title: "Mobile Experience",
    description: "Enjoy the same powerful experience on any device, anywhere.",
    buttonText: "Get Mobile",
    aspectRatio: "portrait" as const
  }
];

const TileGrid: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tileData.map(tile => (
          <Tile
            key={tile.id}
            image={tile.image}
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

export default TileGrid;
