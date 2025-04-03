
import React from 'react';
import Header from '../components/Header';
import { SidebarProvider, SidebarInset } from '../components/ui/sidebar';
import PersonaSelector from '../components/chat/PersonaSelector';
import ChatMessageList from '../components/chat/ChatMessageList';
import ChatInputForm from '../components/chat/ChatInputForm';
import ChatSidebar from '../components/chat/ChatSidebar';
import { useChat } from '../hooks/useChat';

/**
 * Chat page component - Main interface for the chat functionality
 * @returns {JSX.Element} Chat page component
 */
const Chat: React.FC = () => {
  // Use the chat hook to manage chat state and functionality
  const { 
    chatHistory,       // Array of chat messages
    selectedPersona,   // Currently selected AI persona
    setSelectedPersona, // Function to change the selected persona
    sendMessage,       // Function to send a new message
    isReady            // Whether the chat is ready to receive messages
  } = useChat();

  return (
    <div className="main-layout">
      {/* Header component */}
      <Header />
      
      {/* Sidebar provider for the chat interface */}
      <SidebarProvider>
        <div className="flex h-[calc(100vh-72px)] w-full">
          {/* Left sidebar with chat options */}
          <ChatSidebar />
          
          {/* Main chat area */}
          <SidebarInset className="p-0 flex flex-col overflow-hidden">
            {/* Persona selector at the top */}
            <PersonaSelector
              selectedPersona={selectedPersona}
              setSelectedPersona={setSelectedPersona}
            />
            
            {/* Message list in the middle */}
            <ChatMessageList chatHistory={chatHistory} />
            
            {/* Input form at the bottom */}
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
