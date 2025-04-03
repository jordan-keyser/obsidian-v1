
import React, { useState } from 'react';
import Header from '../components/Header';
import { SidebarProvider, SidebarInset } from '../components/ui/sidebar';
import PersonaSelector from '../components/chat/PersonaSelector';
import ChatMessageList, { ChatMessage } from '../components/chat/ChatMessageList';
import ChatInputForm from '../components/chat/ChatInputForm';
import ChatSidebar from '../components/chat/ChatSidebar';

const Chat: React.FC = () => {
  const [selectedPersona, setSelectedPersona] = useState<number | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const handleSendMessage = (message: string) => {
    // Add user message to chat history
    setChatHistory([...chatHistory, { role: 'user', content: message }]);
    
    // In a real app, you would send message to API here
    // For demo purposes, we'll just simulate a response
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        role: 'assistant', 
        content: `This is a simulated response to: "${message}". In a real implementation, this would come from an LLM API.` 
      }]);
    }, 1000);
  };

  return (
    <div className="main-layout">
      <Header />
      
      <SidebarProvider>
        <div className="flex h-[calc(100vh-72px)] w-full">
          <ChatSidebar />
          
          <SidebarInset className="p-0 flex flex-col overflow-hidden">
            <PersonaSelector
              selectedPersona={selectedPersona}
              setSelectedPersona={setSelectedPersona}
            />
            
            <ChatMessageList chatHistory={chatHistory} />
            
            <ChatInputForm
              onSendMessage={handleSendMessage}
              isDisabled={!selectedPersona}
            />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Chat;
