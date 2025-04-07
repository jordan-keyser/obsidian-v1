import * as React from 'react';
import { Box, Typography } from '@mui/joy';

export function ShortcutsModal() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
      <Typography level="h4">Keyboard Shortcuts</Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography level="title-md">General</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 1 }}>
          <Typography level="body-sm" sx={{ fontWeight: 'md' }}>Ctrl + /</Typography>
          <Typography level="body-sm">Show keyboard shortcuts</Typography>
          
          <Typography level="body-sm" sx={{ fontWeight: 'md' }}>Ctrl + K</Typography>
          <Typography level="body-sm">Open command palette</Typography>
          
          <Typography level="body-sm" sx={{ fontWeight: 'md' }}>Ctrl + ,</Typography>
          <Typography level="body-sm">Open settings</Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography level="title-md">Chat</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 1 }}>
          <Typography level="body-sm" sx={{ fontWeight: 'md' }}>Ctrl + Enter</Typography>
          <Typography level="body-sm">Send message</Typography>
          
          <Typography level="body-sm" sx={{ fontWeight: 'md' }}>Ctrl + Shift + Enter</Typography>
          <Typography level="body-sm">New chat</Typography>
          
          <Typography level="body-sm" sx={{ fontWeight: 'md' }}>Ctrl + Backspace</Typography>
          <Typography level="body-sm">Clear chat</Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography level="title-md">Navigation</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 1 }}>
          <Typography level="body-sm" sx={{ fontWeight: 'md' }}>Ctrl + 1</Typography>
          <Typography level="body-sm">Go to Chat</Typography>
          
          <Typography level="body-sm" sx={{ fontWeight: 'md' }}>Ctrl + 2</Typography>
          <Typography level="body-sm">Go to Draw</Typography>
          
          <Typography level="body-sm" sx={{ fontWeight: 'md' }}>Ctrl + 3</Typography>
          <Typography level="body-sm">Go to Settings</Typography>
        </Box>
      </Box>
    </Box>
  );
} 