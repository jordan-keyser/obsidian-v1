import React from 'react';
import { Box } from '@mui/joy';
import ChatMessageList from './ChatMessageList';
import ChatInputForm from './ChatInputForm';
import PersonaSelector from './PersonaSelector';
import ChatSidebar from './ChatSidebar';
import { SidebarProvider, SidebarInset } from '../ui/sidebar';
import { useChatStore } from '../../stores/chat/chat.store';

export const ChatView: React.FC = () => {
  const [isPersonaSelectorCollapsed, setIsPersonaSelectorCollapsed] = React.useState(false);
  const [showSystemMessages, setShowSystemMessages] = React.useState(true);
  const [selectedModel, setSelectedModel] = React.useState('gpt-4');
  const [selectedPersona, setSelectedPersona] = React.useState<number | null>(null);
  const { messages, sendMessage } = useChatStore();

  const togglePersonaSelector = () => {
    setIsPersonaSelectorCollapsed(!isPersonaSelectorCollapsed);
  };

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      height: '100%', // Take full height of parent
      width: '100%',
      overflow: 'hidden'
    }}>
      <Box sx={{ 
        flex: 1,
        display: 'flex',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <SidebarProvider>
          <Box sx={{ 
            display: 'flex',
            height: '100%',
            width: '100%',
            position: 'relative'
          }}>
            <ChatSidebar />
            
            <SidebarInset>
              <Box sx={{ 
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative',
                maxHeight: 'calc(100vh - 60px)' // Account for top navigation
              }}>
                <Box sx={{ 
                  position: 'sticky',
                  top: 0,
                  zIndex: 20,
                  backgroundColor: 'background.surface',
                  borderBottom: '1px solid',
                  borderColor: 'divider'
                }}>
                  <PersonaSelector
                    selectedPersona={selectedPersona}
                    setSelectedPersona={setSelectedPersona}
                    isCollapsed={isPersonaSelectorCollapsed}
                    onToggleCollapse={togglePersonaSelector}
                    showSystemMessages={showSystemMessages}
                    onToggleSystemMessages={setShowSystemMessages}
                    selectedModel={selectedModel}
                    setSelectedModel={setSelectedModel}
                  />
                </Box>
                
                <Box sx={{ 
                  flex: 1,
                  overflow: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  maxHeight: 'calc(100vh - 220px)' // Adjusted for header, input and nav
                }}>
                  <ChatMessageList 
                    chatHistory={messages.filter(msg => 
                      showSystemMessages || msg.role !== 'system'
                    )} 
                  />
                </Box>
                
                <Box sx={{ 
                  position: 'sticky',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  width: '100%',
                  backgroundColor: 'background.surface',
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  padding: '8px',
                  zIndex: 20,
                  maxHeight: '110px' // Ensure input doesn't get too tall
                }}>
                  <ChatInputForm
                    onSendMessage={sendMessage}
                    isDisabled={!selectedModel}
                  />
                </Box>
              </Box>
            </SidebarInset>
          </Box>
        </SidebarProvider>
      </Box>
    </Box>
  );
}; 