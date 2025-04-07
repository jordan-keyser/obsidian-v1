import React, { useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/joy';

/**
 * Chat message structure
 */
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

/**
 * Props for the ChatMessageList component
 */
interface ChatMessageListProps {
  chatHistory: ChatMessage[];
}

/**
 * ChatMessageList component - Displays a list of chat messages with auto-scrolling
 * @param {ChatMessageListProps} props - Component properties
 * @returns {JSX.Element} ChatMessageList component
 */
const ChatMessageList: React.FC<ChatMessageListProps> = ({ chatHistory }) => {
  // Reference to the message container for auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);

  /**
   * Scroll to the bottom of the chat when new messages arrive
   */
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  return (
    <Box sx={{ 
      flex: 1, 
      overflow: 'auto', 
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      {chatHistory.length === 0 ? (
        // Empty state when no messages exist
        <Box sx={{ 
          display: 'flex', 
          height: '100%', 
          alignItems: 'center', 
          justifyContent: 'center'
        }}>
          <Typography sx={{ color: 'text.secondary' }}>
            Select a persona and start chatting
          </Typography>
        </Box>
      ) : (
        // Message list when messages exist
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {chatHistory.map((message, index) => (
            <Box 
              key={index}
              sx={{ 
                display: 'flex', 
                justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <Box 
                sx={{ 
                  maxWidth: '80%', 
                  borderRadius: 'lg', 
                  px: 2, 
                  py: 1,
                  bgcolor: message.role === 'user' 
                    ? 'primary.main'
                    : message.role === 'system'
                    ? 'background.level2'
                    : 'background.level1',
                  color: message.role === 'user' 
                    ? 'primary.contrastText' 
                    : 'text.primary',
                  fontStyle: message.role === 'system' ? 'italic' : 'normal'
                }}
              >
                {message.content}
              </Box>
            </Box>
          ))}
          <Box ref={messagesEndRef} />
        </Box>
      )}
    </Box>
  );
};

export default ChatMessageList;
