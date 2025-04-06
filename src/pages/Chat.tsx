
import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import { SidebarProvider, SidebarInset } from '../components/ui/sidebar';
import PersonaSelector from '../components/chat/PersonaSelector';
import ChatMessageList from '../components/chat/ChatMessageList';
import ChatInputForm from '../components/chat/ChatInputForm';
import ChatSidebar from '../components/chat/ChatSidebar';
import { useChat } from '../hooks/useChat';
import { useIsMobile } from '../hooks/use-mobile';

/**
 * Chat page component - Main interface for the chat functionality
 * @returns {JSX.Element} Chat page component
 */
const Chat: React.FC = () => {
  // State for collapsing the persona selector
  const [isPersonaSelectorCollapsed, setIsPersonaSelectorCollapsed] = useState(false);
  const [showSystemMessages, setShowSystemMessages] = useState(true);
  const isMobile = useIsMobile();
  
  // Use the chat hook to manage chat state and functionality
  const { 
    chatHistory,       // Array of chat messages
    selectedPersona,   // Currently selected AI persona
    setSelectedPersona, // Function to change the selected persona
    selectedModel,     // Currently selected model
    setSelectedModel,  // Function to change the selected model
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
            <SidebarInset className="p-0 flex flex-col h-full relative">
              {/* Fixed layout with absolute positioning for persona selector and message list */}
              <div className="h-full flex flex-col relative">
                {/* Persona selector at the top - absolutely positioned */}
                <div className="absolute top-0 left-0 right-0 z-20 bg-background w-full border-b">
                  <PersonaSelector
                    selectedPersona={selectedPersona}
                    setSelectedPersona={setSelectedPersona}
                    isCollapsed={isPersonaSelectorCollapsed}
                    onToggleCollapse={togglePersonaSelector}
                    showSystemMessages={showSystemMessages}
                    onToggleSystemMessages={setShowSystemMessages}
                    selectedModel={selectedModel}
                    setSelectedModel={setSelectedModel}
                  />
                </div>
                
                {/* Message list below the fixed persona selector with top padding to avoid overlap */}
                <div 
                  className="absolute top-0 bottom-[140px] left-0 right-0 overflow-y-auto"
                  style={{ 
                    paddingTop: isPersonaSelectorCollapsed ? '78px' : '160px',
                    transition: 'padding-top 0.3s ease-in-out'
                  }}
                >
                  <ChatMessageList 
                    chatHistory={chatHistory.filter(msg => 
                      showSystemMessages || msg.role !== 'system'
                    )} 
                  />
                </div>
                
                {/* Input form absolute at the bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-background pb-4">
                  <ChatInputForm
                    onSendMessage={sendMessage}
                    isDisabled={!selectedModel} // Only require a model to be selected
                  />
                </div>
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default Chat;
