import React from 'react';
import { Box } from '@mui/joy';
import { Sidebar, useSidebar } from '../ui/sidebar';
import { Plus, BookOpenText, Settings, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';

const ChatSidebar: React.FC = () => {
  const { state } = useSidebar();
  
  return (
    <Box 
      sx={{
        position: 'fixed',
        top: '60px',
        left: 0,
        bottom: 0,
        width: state === 'expanded' ? '16rem' : '3rem',
        backgroundColor: 'background.level1',
        borderRight: '1px solid',
        borderColor: 'divider',
        transition: 'width 0.2s ease-in-out',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 10,
        overflow: 'hidden'
      }}
    >
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ fontWeight: 'bold', display: state === 'expanded' ? 'block' : 'none' }}>
          Obsidian Chat
        </Box>
      </Box>
      
      <Box sx={{ 
        flex: 1, 
        overflowY: 'auto',
        p: 1
      }}>
        {/* Chat history items would go here */}
        {state === 'expanded' && (
          <Box sx={{ py: 1, px: 2, color: 'text.secondary', fontSize: '0.875rem' }}>
            Recent Chats
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChatSidebar;
