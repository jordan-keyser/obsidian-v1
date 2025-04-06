
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
      {/* Fixed header at the top */}
      <Header />
      
      {/* Main content area - takes remaining height */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar provider for the chat interface */}
        <SidebarProvider className="h-full w-full">
          <div className="flex h-full w-full">
            {/* Left sidebar with chat options */}
            <ChatSidebar />
            
            {/* Main chat area with fixed positioning for elements */}
            <SidebarInset className="p-0 flex flex-col h-full relative">
              {/* Fixed persona selector at the top */}
              <div className="sticky top-0 z-20 bg-background w-full">
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
              
              {/* Scrollable chat message area with proper padding for bottom input */}
              <div className="flex-1 overflow-y-auto">
                <ChatMessageList 
                  chatHistory={chatHistory.filter(msg => 
                    showSystemMessages || msg.role !== 'system'
                  )} 
                />
              </div>
              
              {/* Fixed input form at the bottom */}
              <div className="sticky bottom-0 left-0 right-0 w-full bg-background">
                <ChatInputForm
                  onSendMessage={sendMessage}
                  isDisabled={!selectedModel} // Only require a model to be selected
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
