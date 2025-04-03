
import React from 'react';
import Header from '../components/Header';
import { SidebarProvider, SidebarInset } from '../components/ui/sidebar';
import PersonaSelector from '../components/chat/PersonaSelector';
import ChatMessageList from '../components/chat/ChatMessageList';
import ChatInputForm from '../components/chat/ChatInputForm';
import ChatSidebar from '../components/chat/ChatSidebar';
import { useChat } from '../hooks/useChat';

const Chat: React.FC = () => {
  const { 
    chatHistory, 
    selectedPersona, 
    setSelectedPersona, 
    sendMessage, 
    isReady 
  } = useChat();

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
              onSendMessage={sendMessage}
              isDisabled={!isReady}
            />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Chat;
