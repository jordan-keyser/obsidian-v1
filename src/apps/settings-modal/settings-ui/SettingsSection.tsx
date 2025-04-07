import * as React from 'react';
import { Box, Typography } from '@mui/joy';

interface SettingsSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function SettingsSection({ title, description, children }: SettingsSectionProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography level="title-lg" sx={{ mb: 1 }}>
        {title}
      </Typography>
      {description && (
        <Typography level="body-sm" sx={{ mb: 2, color: 'text.secondary' }}>
          {description}
        </Typography>
      )}
      <Box sx={{ pl: 2 }}>
        {children}
      </Box>
    </Box>
  );
} 