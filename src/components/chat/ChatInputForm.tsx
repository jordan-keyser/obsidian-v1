import React, { useState, FormEvent, KeyboardEvent, useRef } from 'react';
import { Button, Box, Textarea } from '@mui/joy';
import { Send, FileUp } from 'lucide-react';

/**
 * Props for the ChatInputForm component
 */
interface ChatInputFormProps {
  onSendMessage: (message: string) => void;
  isDisabled: boolean;
}

/**
 * ChatInputForm component - Provides the user input area for the chat interface
 * @param {ChatInputFormProps} props - Component properties
 * @returns {JSX.Element} ChatInputForm component
 */
const ChatInputForm: React.FC<ChatInputFormProps> = ({ onSendMessage, isDisabled }) => {
  // State for the current message being typed
  const [message, setMessage] = useState('');
  // Reference for the file input element
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Reference for the textarea element
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /**
   * Handle form submission
   * @param {FormEvent} e - Form event
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    onSendMessage(message);
    setMessage('');
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  /**
   * Handle key press events (specifically Enter to submit)
   * @param {KeyboardEvent<HTMLTextAreaElement>} e - Keyboard event
   */
  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Allow Ctrl+Enter for new line
    if (e.key === 'Enter' && !e.ctrlKey && !e.shiftKey) {
      e.preventDefault();
      if (message.trim() && !isDisabled) {
        handleSubmit(e);
      }
    }
  };

  /**
   * Handle file button click - triggers hidden file input
   */
  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  /**
   * Handle file selection
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real implementation, you would handle the file upload here
    console.log('Selected files:', e.target.files);
    // Reset the input so the same file can be selected again
    e.target.value = '';
  };

  /**
   * Auto-resize textarea as content changes
   */
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize the textarea, but limit height
    const textarea = e.target;
    textarea.style.height = 'auto';
    const newHeight = Math.min(textarea.scrollHeight, 100); // Limit height to 100px
    textarea.style.height = `${newHeight}px`;
  };

  return (
    <Box sx={{
      p: 2,
      flexShrink: 0,
      backgroundColor: 'background.surface'
    }}>
      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        sx={{
          display: 'flex',
          gap: 2
        }}
      >
        {/* Hidden file input */}
        <input 
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
          multiple
        />
        
        {/* File upload button with label */}
        <Button 
          variant="outlined"
          onClick={handleFileButtonClick}
          disabled={isDisabled}
          aria-label="Upload file"
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '84px',
            minWidth: '80px'
          }}
        >
          <FileUp style={{ height: '16px', width: '16px', marginRight: '8px' }} />
          Files
        </Button>
        
        {/* Message textarea - multiline input with auto-resize */}
        <Box sx={{ flexGrow: 1, position: 'relative' }}>
          <Textarea
            slotProps={{
              textarea: {
                ref: textareaRef,
                onKeyDown: handleKeyPress
              }
            }}
            value={message}
            onChange={handleTextareaChange}
            placeholder="Type your message here..."
            aria-label="Chat message"
            disabled={isDisabled}
            minRows={3}
            maxRows={4} // Limit max rows to ensure it doesn't get too tall
            sx={{
              width: '100%',
              minHeight: '84px',
              maxHeight: '100px', // Limit maximum height
              resize: 'none',
              overflow: 'auto',
              backgroundColor: 'background.surface',
              '&:focus-visible': {
                outline: 'none',
                borderColor: 'primary.main',
                boxShadow: '0 0 0 3px rgba(var(--joy-palette-primary-mainChannel) / 0.3)'
              }
            }}
          />
        </Box>
        
        {/* Send button with Beam button below */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Button 
            type="submit" 
            disabled={isDisabled || !message.trim()}
            aria-label="Send message"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Send style={{ height: '16px', width: '16px', marginRight: '8px' }} />
            Send
          </Button>
          
          <Button 
            variant="soft"
            color="primary"
            disabled={isDisabled}
            aria-label="Beam message"
            sx={{
              bgcolor: 'warning.softBg',
              color: 'warning.softColor',
              '&:hover': {
                bgcolor: 'warning.softHoverBg'
              }
            }}
          >
            Beam
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatInputForm;
