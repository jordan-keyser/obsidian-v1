
import { useState, useCallback } from 'react';
import { ChatMessage } from '@/components/chat/ChatMessageList';

/**
 * Custom hook for managing chat functionality
 * @returns {Object} Chat methods and state
 */
export function useChat() {
  // State for chat message history
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  
  // State for selected AI persona
  const [selectedPersona, setSelectedPersona] = useState<number | null>(null);

  /**
   * Send a new message to the chat
   * @param {string} message - The message text to send
   */
  const sendMessage = useCallback((message: string) => {
    // Add user message to chat history
    setChatHistory(prev => [...prev, { role: 'user', content: message }]);
    
    // In a real app, you would send message to API here
    // Simulate a response from the AI assistant
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        role: 'assistant', 
        content: `This is a simulated response to: "${message}". In a real implementation, this would come from an LLM API.` 
      }]);
    }, 1000);
  }, []);

  // Return chat state and methods
  return {
    chatHistory,       // Array of chat messages
    selectedPersona,   // Currently selected AI persona
    setSelectedPersona, // Function to change the selected persona
    sendMessage,       // Function to send a new message
    isReady: selectedPersona !== null // Whether the chat is ready (persona selected)
  };
}
