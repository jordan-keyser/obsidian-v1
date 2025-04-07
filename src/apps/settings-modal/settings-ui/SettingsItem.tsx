import * as React from 'react';
import { Box, Typography } from '@mui/joy';

interface SettingsItemProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function SettingsItem({ title, description, children }: SettingsItemProps) {
  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography level="title-md">{title}</Typography>
        {children}
      </Box>
      {description && (
        <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      )}
    </Box>
  );
} 