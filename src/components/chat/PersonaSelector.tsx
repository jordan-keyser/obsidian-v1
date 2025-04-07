import React, { memo, useState } from 'react';
import { 
  BrainCircuit, Palette, Cpu, UserRound, Briefcase, Calculator,
  MoreVertical, ChevronUp, ChevronDown, Trash2, Split, GitBranch
} from 'lucide-react';
import { 
  Box, Button, IconButton, Typography, 
  Select, Option, Dropdown, Menu, MenuItem, Divider, Switch
} from '@mui/joy';

export interface Persona {
  id: number;
  title: string;
  icon: React.ReactNode;
  description: string;
}

export const personaData: Persona[] = [
  { id: 1, title: 'Analyst', icon: <BrainCircuit style={{ height: '24px', width: '24px' }} />, description: 'For data analysis and insights' },
  { id: 2, title: 'Creative', icon: <Palette style={{ height: '24px', width: '24px' }} />, description: 'For creative writing and ideas' },
  { id: 3, title: 'Technical', icon: <Cpu style={{ height: '24px', width: '24px' }} />, description: 'For technical questions and solutions' },
  { id: 4, title: 'Assistant', icon: <UserRound style={{ height: '24px', width: '24px' }} />, description: 'For general assistance' },
  { id: 5, title: 'Business', icon: <Briefcase style={{ height: '24px', width: '24px' }} />, description: 'For business strategy and advice' },
  { id: 6, title: 'Finance', icon: <Calculator style={{ height: '24px', width: '24px' }} />, description: 'For financial planning' },
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
    <Box
      onClick={() => onSelect(persona.id)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        borderRadius: 'md',
        cursor: 'pointer',
        transition: 'all 0.2s',
        width: 'calc(16.666% - 10px)',
        minWidth: '80px',
        bgcolor: isSelected ? 'warning.softBg' : 'background.surface',
        border: isSelected ? '2px solid' : '1px solid',
        borderColor: isSelected ? 'warning.outlinedBorder' : 'divider',
        '&:hover': {
          bgcolor: isSelected ? 'warning.softHoverBg' : 'background.level1'
        }
      }}
    >
      <Box 
        sx={{ 
          p: 1, 
          borderRadius: '50%', 
          mb: 1,
          color: isSelected ? 'warning.outlinedColor' : 'text.secondary'
        }}
      >
        {persona.icon}
      </Box>
      <Typography 
        level="body-xs" 
        fontWeight="md" 
        textAlign="center"
      >
        {persona.title}
      </Typography>
    </Box>
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
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}

const PersonaSelector: React.FC<PersonaSelectorProps> = ({ 
  selectedPersona, 
  setSelectedPersona, 
  isCollapsed, 
  onToggleCollapse,
  showSystemMessages,
  onToggleSystemMessages,
  selectedModel,
  setSelectedModel
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const handleClearSelection = () => {
    setSelectedPersona(null);
    setSelectedModel('');
    setMenuOpen(false);
  };
  
  const handleMenuOpenChange = (_: React.MouseEvent | React.KeyboardEvent | React.FocusEvent, open: boolean) => {
    setMenuOpen(open);
  };

  return (
    <Box 
      sx={{ 
        py: 2, 
        px: 3, 
        borderBottom: '1px solid', 
        borderColor: 'divider',
        flexShrink: 0
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          mb: 1.5,
          position: 'relative'
        }}
      >
        <Typography level="title-md">Select a Persona</Typography>
        
        {/* Model selection dropdown centered */}
        <Box sx={{ 
          position: 'absolute', 
          left: '50%', 
          transform: 'translateX(-50%)'
        }}>
          <Select
            value={selectedModel}
            onChange={(_, newValue) => newValue && setSelectedModel(newValue)}
            sx={{ width: '180px' }}
            placeholder="Select model"
          >
            {models.map(model => (
              <Option key={model.id} value={model.id}>
                {model.name}
              </Option>
            ))}
          </Select>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Collapse/Expand button */}
          <IconButton 
            variant="plain" 
            onClick={onToggleCollapse}
            sx={{ transition: 'all 0.3s ease-in-out' }}
          >
            {isCollapsed ? 
              <ChevronDown style={{ height: '16px', width: '16px', transition: 'transform 0.3s ease-in-out' }} /> : 
              <ChevronUp style={{ height: '16px', width: '16px', transition: 'transform 0.3s ease-in-out' }} />
            }
          </IconButton>
          
          {/* Three dots menu */}
          <Dropdown open={menuOpen} onOpenChange={handleMenuOpenChange}>
            <IconButton 
              variant="plain" 
              component="button"
              onClick={() => setMenuOpen(true)}
            >
              <MoreVertical style={{ height: '16px', width: '16px' }} />
            </IconButton>
            <Menu
              placement="bottom-end"
              size="sm"
              sx={{ minWidth: '180px' }}
            >
              <MenuItem>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <Typography>System messages</Typography>
                  <Switch
                    checked={showSystemMessages}
                    onChange={(e) => onToggleSystemMessages(e.target.checked)}
                    sx={{ ml: 2 }}
                  />
                </Box>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClearSelection}>
                <Trash2 style={{ marginRight: '8px', height: '16px', width: '16px' }} />
                <Typography>Clear selection</Typography>
              </MenuItem>
              <MenuItem>
                <Split style={{ marginRight: '8px', height: '16px', width: '16px' }} />
                <Typography>Split right</Typography>
              </MenuItem>
              <MenuItem>
                <GitBranch style={{ marginRight: '8px', height: '16px', width: '16px' }} />
                <Typography>Branch</Typography>
              </MenuItem>
            </Menu>
          </Dropdown>
        </Box>
      </Box>
      
      {/* Show personas with smooth animation */}
      <Box 
        sx={{
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          maxHeight: isCollapsed ? 0 : '24rem',
          opacity: isCollapsed ? 0 : 1
        }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'space-between' }}>
          {personaData.map((persona) => (
            <PersonaItem
              key={persona.id}
              persona={persona}
              isSelected={selectedPersona === persona.id}
              onSelect={setSelectedPersona}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default PersonaSelector;
