
import React, { memo } from 'react';
import { BrainCircuit, Palette, Cpu, UserRound, Briefcase, Calculator } from 'lucide-react';

export interface Persona {
  id: number;
  title: string;
  icon: React.ReactNode;
  description: string;
}

export const personaData: Persona[] = [
  { id: 1, title: 'Analyst', icon: <BrainCircuit className="h-6 w-6" />, description: 'For data analysis and insights' },
  { id: 2, title: 'Creative', icon: <Palette className="h-6 w-6" />, description: 'For creative writing and ideas' },
  { id: 3, title: 'Technical', icon: <Cpu className="h-6 w-6" />, description: 'For technical questions and solutions' },
  { id: 4, title: 'Assistant', icon: <UserRound className="h-6 w-6" />, description: 'For general assistance' },
  { id: 5, title: 'Business', icon: <Briefcase className="h-6 w-6" />, description: 'For business strategy and advice' },
  { id: 6, title: 'Finance', icon: <Calculator className="h-6 w-6" />, description: 'For financial planning' },
];

interface PersonaItemProps {
  persona: Persona;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

const PersonaItem: React.FC<PersonaItemProps> = memo(({ persona, isSelected, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(persona.id)}
      className={`flex flex-col items-center justify-center p-2 rounded-md cursor-pointer transition-all w-[calc(16.666%-10px)] min-w-[80px] ${
        isSelected 
          ? 'bg-crowe-gold/20 border-2 border-crowe-gold' 
          : 'bg-background hover:bg-muted border border-border'
      }`}
    >
      <div className={`p-1 rounded-full mb-1 ${
        isSelected ? 'text-crowe-gold' : 'text-muted-foreground'
      }`}>
        {persona.icon}
      </div>
      <span className="font-medium text-xs text-center">{persona.title}</span>
    </div>
  );
});

PersonaItem.displayName = 'PersonaItem';

interface PersonaSelectorProps {
  selectedPersona: number | null;
  setSelectedPersona: (id: number) => void;
}

const PersonaSelector: React.FC<PersonaSelectorProps> = ({ selectedPersona, setSelectedPersona }) => {
  return (
    <div className="py-4 px-6 border-b flex-shrink-0">
      <h2 className="text-lg font-medium mb-3">Select a Persona</h2>
      <div className="flex flex-wrap gap-3 justify-between">
        {personaData.map((persona) => (
          <PersonaItem
            key={persona.id}
            persona={persona}
            isSelected={selectedPersona === persona.id}
            onSelect={setSelectedPersona}
          />
        ))}
      </div>
    </div>
  );
};

export default PersonaSelector;
