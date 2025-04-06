import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';

// Define message types
type MessageRole = 'user' | 'assistant' | 'system';

interface Message {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: Date;
}

/**
 * Chat component - Provides a chat interface for interacting with an AI assistant
 * @returns {JSX.Element} Chat component
 */
const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! How can I help you today?',
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Create user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date()
    };

    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Simulate API call with timeout
      setTimeout(() => {
        // Create assistant response
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: `I received your message: "${input}". This is a simulated response as the actual AI integration is not implemented yet.`,
          role: 'assistant',
          timestamp: new Date()
        };

        // Add assistant message to chat
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="main-layout flex flex-col h-screen">
      <Header />
      
      <div className="flex-1 container mx-auto px-4 py-6 flex flex-col">
        <div className="flex-1 flex flex-col glass rounded-lg overflow-hidden">
          {/* Chat header */}
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold flex items-center">
              <Bot className="mr-2" />
              Chat with Crowe Assistant
            </h2>
          </div>
          
          {/* Messages area */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <Avatar className={`h-8 w-8 ${message.role === 'user' ? 'ml-2' : 'mr-2'}`}>
                      <AvatarFallback>{message.role === 'user' ? 'U' : 'A'}</AvatarFallback>
                      <AvatarImage src={message.role === 'user' ? '/user-avatar.png' : '/assistant-avatar.png'} />
                    </Avatar>
                    
                    <div className={`rounded-lg p-3 ${
                      message.role === 'user' 
                        ? 'bg-crowe-dark text-white' 
                        : 'bg-muted'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex max-w-[80%]">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarFallback>A</AvatarFallback>
                      <AvatarImage src="/assistant-avatar.png" />
                    </Avatar>
                    
                    <div className="rounded-lg p-3 bg-muted">
                      <div className="flex items-center">
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        <p className="text-sm">Thinking...</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Invisible element to scroll to */}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          {/* Input area */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={!input.trim() || isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                <span className="ml-2">Send</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
