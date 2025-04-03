
import React, { useState, FormEvent, KeyboardEvent, useRef } from 'react';
import { Input } from '../ui/input';
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

  /**
   * Handle form submission
   * @param {FormEvent} e - Form event
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    onSendMessage(message);
    setMessage('');
  };

  /**
   * Handle key press events (specifically Enter to submit)
   * @param {KeyboardEvent<HTMLInputElement>} e - Keyboard event
   */
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
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
          className="flex flex-col items-center gap-1 px-2"
        >
          <FileUp className="h-4 w-4" />
          <span className="text-xs">Files</span>
        </Button>
        
        {/* Message input field - with increased height to match the send+beam buttons */}
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message here..."
          aria-label="Chat message"
          disabled={isDisabled}
          className="flex-grow h-[84px]" /* Height to match send+beam buttons */
        />
        
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
