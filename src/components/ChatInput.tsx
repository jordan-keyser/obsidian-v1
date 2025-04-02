
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { SendHorizontal } from 'lucide-react';

const ChatInput: React.FC = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Future implementation - sending message to LLM
    console.log('Message to send:', message);
    
    // Clear input after sending
    setMessage('');
  };

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
            className="bg-crowe-dark hover:bg-crowe-dark/80 transition-colors"
          >
            <SendHorizontal className="h-5 w-5" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChatInput;
