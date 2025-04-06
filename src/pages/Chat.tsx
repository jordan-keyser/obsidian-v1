
import React, { useState } from 'react';
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
  // State for collapsing the persona selector
  const [isPersonaSelectorCollapsed, setIsPersonaSelectorCollapsed] = useState(false);
  const [showSystemMessages, setShowSystemMessages] = useState(true);
  
  // Use the chat hook to manage chat state and functionality
  const { 
    chatHistory,       // Array of chat messages
    selectedPersona,   // Currently selected AI persona
    setSelectedPersona, // Function to change the selected persona
    sendMessage,       // Function to send a new message
    isReady            // Whether the chat is ready to receive messages
  } = useChat();

  // Toggle persona selector collapse state
  const togglePersonaSelector = () => {
    setIsPersonaSelectorCollapsed(!isPersonaSelectorCollapsed);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header component */}
      <Header />
      
      {/* Main content area - takes remaining height */}
      <div className="flex-1 flex">
        {/* Sidebar provider for the chat interface */}
        <SidebarProvider className="h-full w-full">
          <div className="flex h-full w-full">
            {/* Left sidebar with chat options */}
            <ChatSidebar />
            
            {/* Main chat area with fixed positioning for input */}
            <SidebarInset className="p-0 flex flex-col h-full">
              {/* Persona selector at the top - always visible and sticky */}
              <div className="sticky top-0 z-20 bg-background">
                <PersonaSelector
                  selectedPersona={selectedPersona}
                  setSelectedPersona={setSelectedPersona}
                  isCollapsed={isPersonaSelectorCollapsed}
                  onToggleCollapse={togglePersonaSelector}
                  showSystemMessages={showSystemMessages}
                  onToggleSystemMessages={setShowSystemMessages}
                />
              </div>
              
              {/* Message list in the middle - scrollable area with proper padding for input */}
              <div className="flex-1 overflow-y-auto pb-[140px]">
                <ChatMessageList 
                  chatHistory={chatHistory.filter(msg => 
                    showSystemMessages || msg.role !== 'system'
                  )} 
                />
              </div>
              
              {/* Input form sticky at the bottom with padding */}
              <div className="sticky bottom-0 left-0 right-0 w-full bg-background pb-4">
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
