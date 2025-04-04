
import React, { useState } from 'react';
import { 
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuAction,
} from '../ui/sidebar';
import { Plus, BookOpenText, Settings, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';

const ChatSidebar: React.FC = () => {
  // Sample recent chats - in a real app, this would come from a hook or context
  const [recentChats, setRecentChats] = useState<{ id: string; title: string }[]>([]);
  
  // Function to remove a chat
  const removeChat = (id: string) => {
    setRecentChats(prev => prev.filter(chat => chat.id !== id));
  };

  return (
    <Sidebar className="h-[calc(100vh-72px)] mt-[72px] flex-shrink-0 flex flex-col justify-end">
      <SidebarHeader>
        <div className="flex items-center">
          <h2 className="text-lg font-semibold">Chats</h2>
          <Button variant="ghost" size="icon" className="ml-auto">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="h-full overflow-hidden">
        <ScrollArea className="h-full">
          <SidebarGroup>
            <SidebarGroupLabel>Recent</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {recentChats.length === 0 && (
                  <div className="text-sm text-muted-foreground px-2 py-1">
                    No recent chats
                  </div>
                )}
                {recentChats.map((chat) => (
                  <SidebarMenuItem key={chat.id}>
                    <SidebarMenuButton tooltip={chat.title}>
                      <BookOpenText className="h-4 w-4" />
                      <span>{chat.title}</span>
                    </SidebarMenuButton>
                    <SidebarMenuAction showOnHover onClick={() => removeChat(chat.id)}>
                      <Trash2 className="h-4 w-4" />
                    </SidebarMenuAction>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default ChatSidebar;
