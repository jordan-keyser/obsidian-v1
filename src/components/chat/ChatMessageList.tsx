
import React, { useRef, useEffect } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { Cpu } from 'lucide-react';

export interface ChatMessage {
  role: string;
  content: string;
}

interface ChatMessageListProps {
  chatHistory: ChatMessage[];
}

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
    <Cpu className="h-12 w-12 mb-4" />
    <h3 className="text-lg font-medium">Start a conversation</h3>
    <p className="max-w-md mt-2">
      Select a persona above and start typing to interact with the AI assistant.
    </p>
  </div>
);

const MessageBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-3xl rounded-lg p-4 ${
        isUser 
          ? 'bg-crowe-gold/20 text-foreground ml-12' 
          : 'bg-muted text-foreground mr-12'
      }`}>
        {message.content}
      </div>
    </div>
  );
};

const ChatMessageList: React.FC<ChatMessageListProps> = ({ chatHistory }) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [chatHistory]);

  return (
    <ScrollArea className="flex-grow overflow-y-auto p-6" ref={scrollAreaRef}>
      {chatHistory.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-6">
          {chatHistory.map((message, index) => (
            <MessageBubble key={index} message={message} />
          ))}
        </div>
      )}
    </ScrollArea>
  );
};

export default ChatMessageList;
export type { ChatMessage };
