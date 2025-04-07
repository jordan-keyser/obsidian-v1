import * as React from 'react';
import { Box } from '@mui/joy';

interface SettingsGroupProps {
  children: React.ReactNode;
}

export function SettingsGroup({ children }: SettingsGroupProps) {
  return (
    <Box sx={{ 
      backgroundColor: 'background.level1',
      borderRadius: 'sm',
      p: 2,
      mb: 3
    }}>
      {children}
    </Box>
  );
} 