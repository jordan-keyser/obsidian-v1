
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { SendHorizontal } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

/**
 * ChatInput component - Provides a form for user to send messages to the AI
 * @returns {JSX.Element} ChatInput component
 */
const ChatInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const { theme } = useTheme();

  /**
   * Handle form submission and send message to backend
   * @param e - Form event
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Future implementation - sending message to backend API
    console.log('Message to send:', message);
    
    // Clear input after sending
    setMessage('');
  };

  // Dynamic button class based on theme
  const buttonClass = theme === 'dark' 
    ? 'bg-crowe-gold hover:bg-crowe-gold/80 text-black transition-colors' 
    : 'bg-crowe-dark hover:bg-crowe-dark/80 transition-colors';

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardContent className="pt-6">
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Ask Crowe AGI</h3>
          <p className="text-sm text-muted-foreground">
            Use this interface to interact with our AI assistant. Type your question below.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="How can Crowe AGI help your business today?"
            className="flex-1"
          />
          <Button 
            type="submit" 
            className={buttonClass}
          >
            <SendHorizontal className="h-5 w-5" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChatInput;
