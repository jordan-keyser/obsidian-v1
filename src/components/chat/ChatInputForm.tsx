
import React, { useState, FormEvent, KeyboardEvent } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Send } from 'lucide-react';

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

  return (
    <div className="border-t p-4 flex-shrink-0 bg-background">
      <form onSubmit={handleSubmit} className="flex gap-2">
        {/* Message input field */}
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message here..."
          aria-label="Chat message"
          disabled={isDisabled}
          className="flex-grow"
        />
        
        {/* Send button */}
        <Button 
          type="submit" 
          disabled={isDisabled || !message.trim()}
          aria-label="Send message"
        >
          <Send className="h-4 w-4 mr-2" />
          Send
        </Button>
      </form>
    </div>
  );
};

export default ChatInputForm;
