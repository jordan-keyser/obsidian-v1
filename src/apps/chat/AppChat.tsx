import React from 'react';
import { Box } from '@mui/joy';
import { useShallow } from 'zustand/react/shallow';

import { ChatView } from '../../components/chat/ChatView';
import { useChatStore } from '../../stores/chat/chat.store';
import { useIsMobile } from '../../hooks/useIsMobile';

export function AppChat() {
  // External state
  const isMobile = useIsMobile();
  const { isOpen, chatState } = useChatStore(useShallow(state => ({
    isOpen: state.isOpen,
    chatState: state,
  })));

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 60px)', // Account for navigation bar height
      width: '100%',
      position: 'fixed',
      top: '60px', // Start below the navigation bar
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden'
    }}>
      {isOpen && (
        <ChatView
          isMobile={isMobile}
          chatState={chatState}
        />
      )}
    </Box>
  );
} 