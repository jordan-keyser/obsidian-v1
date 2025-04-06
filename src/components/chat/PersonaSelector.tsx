
import React, { memo, useState } from 'react';
import { 
  BrainCircuit, Palette, Cpu, UserRound, Briefcase, Calculator,
  MoreVertical, ChevronUp, ChevronDown, Trash2
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '../ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import { Switch } from '../ui/switch';
import { Button } from '../ui/button';

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

// Available AI models
const models = [
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini' },
  { id: 'gpt-4o', name: 'GPT-4o' },
  { id: 'gpt-4.5-preview', name: 'GPT-4.5 Preview' },
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
  setSelectedPersona: (id: number | null) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  showSystemMessages: boolean;
  onToggleSystemMessages: (show: boolean) => void;
}

const PersonaSelector: React.FC<PersonaSelectorProps> = ({ 
  selectedPersona, 
  setSelectedPersona, 
  isCollapsed, 
  onToggleCollapse,
  showSystemMessages,
  onToggleSystemMessages
}) => {
  const [selectedModel, setSelectedModel] = useState('gpt-4o');

  const handleClearSelection = () => {
    setSelectedPersona(null);
    setSelectedModel('gpt-4o');
  };

  return (
    <div className="py-4 px-6 border-b flex-shrink-0">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-medium">Select a Persona</h2>
        
        <div className="flex items-center gap-2">
          {/* Model selection dropdown in center */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {models.map(model => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Collapse/Expand button with smoother animation */}
          <Button variant="ghost" size="icon" onClick={onToggleCollapse} className="transition-transform duration-300 ease-in-out">
            {isCollapsed ? <ChevronDown className="h-4 w-4 transition-transform duration-300" /> : <ChevronUp className="h-4 w-4 transition-transform duration-300" />}
          </Button>
          
          {/* Three dots menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="flex items-center justify-between">
                System messages
                <Switch 
                  checked={showSystemMessages} 
                  onCheckedChange={onToggleSystemMessages} 
                  className="ml-2"
                />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleClearSelection}>
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Clear selection</span>
              </DropdownMenuItem>
              <DropdownMenuItem>Split right</DropdownMenuItem>
              <DropdownMenuItem>Branch</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Show personas with smooth animation */}
      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isCollapsed ? 'max-h-0 opacity-0' : 'max-h-96 opacity-100'
        }`}
      >
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
    </div>
  );
};

export default PersonaSelector;
