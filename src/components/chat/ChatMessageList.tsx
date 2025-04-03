
import React from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { Cpu } from 'lucide-react';

interface ChatMessage {
  role: string;
  content: string;
}

interface ChatMessageListProps {
  chatHistory: ChatMessage[];
}

const ChatMessageList: React.FC<ChatMessageListProps> = ({ chatHistory }) => {
  return (
    <ScrollArea className="flex-grow overflow-y-auto p-6">
      {chatHistory.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
          <Cpu className="h-12 w-12 mb-4" />
          <h3 className="text-lg font-medium">Start a conversation</h3>
          <p className="max-w-md mt-2">
            Select a persona above and start typing to interact with the AI assistant.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {chatHistory.map((entry, index) => (
            <div 
              key={index} 
              className={`flex ${entry.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-3xl rounded-lg p-4 ${
                entry.role === 'user' 
                  ? 'bg-crowe-gold/20 text-foreground ml-12' 
                  : 'bg-muted text-foreground mr-12'
              }`}>
                {entry.content}
              </div>
            </div>
          ))}
        </div>
      )}
    </ScrollArea>
  );
};

export default ChatMessageList;
export type { ChatMessage };
