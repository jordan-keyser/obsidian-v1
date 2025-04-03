
import React, { useState, FormEvent, KeyboardEvent } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Send } from 'lucide-react';

interface ChatInputFormProps {
  onSendMessage: (message: string) => void;
  isDisabled: boolean;
}

const ChatInputForm: React.FC<ChatInputFormProps> = ({ onSendMessage, isDisabled }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    onSendMessage(message);
    setMessage('');
  };

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
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message here..."
          aria-label="Chat message"
          disabled={isDisabled}
          className="flex-grow"
        />
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
