
import React, { useRef, useEffect } from 'react';

/**
 * Chat message structure
 */
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

/**
 * Props for the ChatMessageList component
 */
interface ChatMessageListProps {
  chatHistory: ChatMessage[];
}

/**
 * ChatMessageList component - Displays a list of chat messages with auto-scrolling
 * @param {ChatMessageListProps} props - Component properties
 * @returns {JSX.Element} ChatMessageList component
 */
const ChatMessageList: React.FC<ChatMessageListProps> = ({ chatHistory }) => {
  // Reference to the message container for auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);

  /**
   * Scroll to the bottom of the chat when new messages arrive
   */
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  return (
    <div className="flex-1 overflow-y-auto p-4 pt-16">
      {chatHistory.length === 0 ? (
        // Empty state when no messages exist
        <div className="flex h-full items-center justify-center text-gray-500">
          <p>Select a persona and start chatting</p>
        </div>
      ) : (
        // Message list when messages exist
        <div className="space-y-4">
          {chatHistory.map((message, index) => (
            <div 
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : message.role === 'system'
                    ? 'bg-muted/50 italic'
                    : 'bg-muted'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};

export default ChatMessageList;
