
import React, { useState, FormEvent, KeyboardEvent, useRef } from 'react';
import { Button } from '../ui/button';
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
    
    // Auto-resize the textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <div className="border-t p-4 flex-shrink-0 bg-background">
      <form onSubmit={handleSubmit} className="flex gap-2">
        {/* Hidden file input */}
        <input 
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          multiple
        />
        
        {/* File upload button with label */}
        <Button 
          type="button" 
          variant="outline"
          onClick={handleFileButtonClick}
          disabled={isDisabled}
          aria-label="Upload file"
          className="flex items-center h-[84px]"
        >
          <FileUp className="h-4 w-4 mr-2" />
          <span>Files</span>
        </Button>
        
        {/* Message textarea - multiline input with auto-resize */}
        <div className="flex-grow relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyPress}
            placeholder="Type your message here..."
            aria-label="Chat message"
            disabled={isDisabled}
            className="w-full min-h-[84px] max-h-[200px] p-2 rounded-md border border-input focus:ring-2 focus:ring-ring focus:outline-none resize-none overflow-y-auto bg-background"
            style={{ paddingTop: '0.5rem' }}
          />
        </div>
        
        {/* Send button with Beam button below */}
        <div className="flex flex-col gap-2">
          <Button 
            type="submit" 
            disabled={isDisabled || !message.trim()}
            aria-label="Send message"
          >
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
          
          <Button 
            type="button"
            variant="secondary"
            className="dark:bg-crowe-gold dark:hover:bg-crowe-gold/80 dark:text-black"
            disabled={isDisabled}
            aria-label="Beam message"
          >
            Beam
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInputForm;
