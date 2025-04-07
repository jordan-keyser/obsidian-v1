import * as React from 'react';
import { Box, Typography } from '@mui/joy';

export function AppDraw() {
  // state
  const [showHeader, setShowHeader] = React.useState(true);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {showHeader && (
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography level="h4">Draw</Typography>
          <Typography level="body-sm">Create and edit images using AI</Typography>
        </Box>
      )}

      <Box sx={{ 
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        gap: 2,
        backgroundColor: 'background.level3',
        boxShadow: 'inset 0 0 4px 0px rgba(0, 0, 0, 0.2)',
      }}>
        <Box sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}>
          <Typography level="body-lg">
            Drawing functionality coming soon...
          </Typography>
        </Box>

        <Box sx={{ 
          backgroundColor: 'background.level2',
          borderTop: '1px solid',
          borderColor: 'divider',
          p: 2,
        }}>
          <Typography level="body-sm" color="danger">
            This application is in development - not production ready
          </Typography>
        </Box>
      </Box>
    </Box>
  );
} 