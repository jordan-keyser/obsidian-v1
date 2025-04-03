
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
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header component */}
      <Header />
      
      {/* Main content area - takes remaining height */}
      <div className="flex-1 overflow-hidden">
        {/* Sidebar provider for the chat interface */}
        <SidebarProvider className="h-full">
          <div className="flex h-full w-full">
            {/* Left sidebar with chat options */}
            <ChatSidebar />
            
            {/* Main chat area with fixed positioning for input */}
            <SidebarInset className="p-0 flex flex-col h-full relative">
              {/* Persona selector at the top */}
              <PersonaSelector
                selectedPersona={selectedPersona}
                setSelectedPersona={setSelectedPersona}
              />
              
              {/* Message list in the middle - with bottom padding to ensure messages aren't hidden under input */}
              <div className="flex-1 overflow-y-auto pb-[120px]">
                <ChatMessageList chatHistory={chatHistory} />
              </div>
              
              {/* Input form fixed at the bottom */}
              <div className="absolute bottom-0 left-0 right-0 w-full bg-background">
                <ChatInputForm
                  onSendMessage={sendMessage}
                  isDisabled={!isReady}
                />
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default Chat;
