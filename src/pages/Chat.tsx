import React from 'react';
import Header from '../components/Header';
import { ChatView } from '../components/chat/ChatView';
import { useChatStore } from '../stores/chat/chat.store';

/**
 * Chat page component - Main interface for the chat functionality
 * @returns {JSX.Element} Chat page component
 */
const Chat: React.FC = () => {
  const { open } = useChatStore();

  React.useEffect(() => {
    open();
  }, [open]);

  return (
    <div className="flex flex-col h-screen">
      {/* Fixed header at the top */}
      <Header />
      
      {/* Main content area - takes remaining height */}
      <div className="flex-1 flex overflow-hidden">
        <ChatView />
      </div>
    </div>
  );
};

export default Chat;
