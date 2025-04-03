
import { useState, useCallback } from 'react';
import { ChatMessage } from '@/components/chat/ChatMessageList';

export function useChat() {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<number | null>(null);

  const sendMessage = useCallback((message: string) => {
    // Add user message to chat history
    setChatHistory(prev => [...prev, { role: 'user', content: message }]);
    
    // In a real app, you would send message to API here
    // For demo purposes, we'll just simulate a response
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        role: 'assistant', 
        content: `This is a simulated response to: "${message}". In a real implementation, this would come from an LLM API.` 
      }]);
    }, 1000);
  }, []);

  return {
    chatHistory,
    selectedPersona,
    setSelectedPersona,
    sendMessage,
    isReady: selectedPersona !== null
  };
}
