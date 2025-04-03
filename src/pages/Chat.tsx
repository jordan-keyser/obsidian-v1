import React, { useState } from 'react';
import Header from '../components/Header';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '../components/ui/sidebar';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Send, Plus, FolderOpen, BookOpenText, Settings, Cpu, BrainCircuit, Palette, UserRound, Briefcase, Calculator, FileText } from 'lucide-react';
import { Separator } from '../components/ui/separator';
import { ScrollArea } from '../components/ui/scroll-area';

const personaData = [
  { id: 1, title: 'Analyst', icon: <BrainCircuit className="h-6 w-6" />, description: 'For data analysis and insights' },
  { id: 2, title: 'Creative', icon: <Palette className="h-6 w-6" />, description: 'For creative writing and ideas' },
  { id: 3, title: 'Technical', icon: <Cpu className="h-6 w-6" />, description: 'For technical questions and solutions' },
  { id: 4, title: 'Assistant', icon: <UserRound className="h-6 w-6" />, description: 'For general assistance' },
  { id: 5, title: 'Business', icon: <Briefcase className="h-6 w-6" />, description: 'For business strategy and advice' },
  { id: 6, title: 'Finance', icon: <Calculator className="h-6 w-6" />, description: 'For financial analysis and planning' },
];

const Chat: React.FC = () => {
  const [selectedPersona, setSelectedPersona] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{role: string, content: string}>>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

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
    
    setMessage('');
  };

  return (
    <div className="main-layout">
      <Header />
      
      <SidebarProvider>
        <div className="flex h-[calc(100vh-72px)] w-full">
          <Sidebar>
            <SidebarHeader>
              <div className="flex items-center">
                <h2 className="text-lg font-semibold">Chats</h2>
                <Button variant="ghost" size="icon" className="ml-auto">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </SidebarHeader>
            
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Recent</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Market Analysis">
                        <BookOpenText className="h-4 w-4" />
                        <span>Market Analysis</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Project Planning">
                        <BookOpenText className="h-4 w-4" />
                        <span>Project Planning</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              
              <SidebarGroup>
                <SidebarGroupLabel>Saved</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Tax Guidance">
                        <FolderOpen className="h-4 w-4" />
                        <span>Tax Guidance</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Audit Procedure">
                        <FolderOpen className="h-4 w-4" />
                        <span>Audit Procedure</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
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
          
          <SidebarInset className="p-0 flex flex-col">
            <div className="py-4 px-6 border-b flex-shrink-0">
              <h2 className="text-lg font-medium mb-3">Select a Persona</h2>
              <div className="flex flex-wrap gap-3 justify-between">
                {personaData.map((persona) => (
                  <div 
                    key={persona.id}
                    onClick={() => setSelectedPersona(persona.id)}
                    className={`flex flex-col items-center justify-center p-2 rounded-md cursor-pointer transition-all w-[calc(16.666%-10px)] min-w-[80px] ${
                      selectedPersona === persona.id 
                        ? 'bg-crowe-gold/20 border-2 border-crowe-gold' 
                        : 'bg-background hover:bg-muted border border-border'
                    }`}
                  >
                    <div className={`p-1 rounded-full mb-1 ${
                      selectedPersona === persona.id ? 'text-crowe-gold' : 'text-muted-foreground'
                    }`}>
                      {persona.icon}
                    </div>
                    <span className="font-medium text-xs text-center">{persona.title}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <ScrollArea className="flex-grow p-6">
              {chatHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                  <Cpu className="h-12 w-12 mb-4" />
                  <h3 className="text-lg font-medium">Start a conversation</h3>
                  <p className="max-w-md mt-2">
                    Select a persona above and start typing to interact with the AI assistant.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {chatHistory.map((entry, index) => (
                    <div 
                      key={index} 
                      className={`flex ${entry.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-3xl rounded-lg p-4 ${
                        entry.role === 'user' 
                          ? 'bg-crowe-gold/20 text-foreground ml-12' 
                          : 'bg-muted text-foreground mr-12'
                      }`}>
                        {entry.content}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
            
            <div className="border-t p-4 flex-shrink-0 bg-background">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="flex-grow"
                />
                <Button type="submit" disabled={!message.trim() || !selectedPersona}>
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </form>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Chat;
