import * as React from 'react';
import { Box, FormControl, FormLabel, Switch, Typography } from '@mui/joy';

export function UxLabsSettings() {
  const [enableDarkMode, setEnableDarkMode] = React.useState(false);
  const [enableAnimations, setEnableAnimations] = React.useState(true);
  const [enableCompactMode, setEnableCompactMode] = React.useState(false);
  const [enableAdvancedFeatures, setEnableAdvancedFeatures] = React.useState(false);

  const handleDarkModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnableDarkMode(event.target.checked);
  };

  const handleAnimationsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnableAnimations(event.target.checked);
  };

  const handleCompactModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnableCompactMode(event.target.checked);
  };

  const handleAdvancedFeaturesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnableAdvancedFeatures(event.target.checked);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
      <Typography level="h4">Experimental Features</Typography>
      <Typography level="body-sm" sx={{ mb: 2 }}>
        These features are experimental and may change or be removed in future updates.
      </Typography>

      <FormControl>
        <FormLabel>Dark Mode</FormLabel>
        <Switch
          checked={enableDarkMode}
          onChange={handleDarkModeChange}
          color="primary"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Animations</FormLabel>
        <Switch
          checked={enableAnimations}
          onChange={handleAnimationsChange}
          color="primary"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Compact Mode</FormLabel>
        <Switch
          checked={enableCompactMode}
          onChange={handleCompactModeChange}
          color="primary"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Advanced Features</FormLabel>
        <Switch
          checked={enableAdvancedFeatures}
          onChange={handleAdvancedFeaturesChange}
          color="primary"
        />
      </FormControl>

      {enableAdvancedFeatures && (
        <Box sx={{ mt: 2, p: 2, backgroundColor: 'background.level2', borderRadius: 'sm' }}>
          <Typography level="title-sm">Advanced Settings</Typography>
          <Typography level="body-sm" sx={{ mt: 1 }}>
            Additional experimental features will be available here when enabled.
          </Typography>
        </Box>
      )}
    </Box>
  );
} 