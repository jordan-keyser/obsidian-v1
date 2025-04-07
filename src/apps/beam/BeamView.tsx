import React from 'react';
import { Box } from '@mui/joy';
import { BeamStoreApi } from './store-beam.hooks';

interface BeamViewProps {
  beamStore: BeamStoreApi;
  isMobile: boolean;
}

export const BeamView: React.FC<BeamViewProps> = ({ beamStore, isMobile }) => {
  const { conversation } = beamStore.getState();

  return (
    <Box sx={{ flexGrow: 1, overflowY: 'auto', position: 'relative' }}>
      <div className="flex flex-col h-full">
        {conversation.messages.map((message, index) => (
          <div 
            key={index}
            className={`p-4 ${message.role === 'user' ? 'bg-primary/10' : 'bg-muted'}`}
          >
            <div className="font-semibold">{message.role}</div>
            <div>{message.content}</div>
          </div>
        ))}
      </div>
    </Box>
  );
}; 