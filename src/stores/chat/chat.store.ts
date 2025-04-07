import { create } from 'zustand';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: number;
}

export interface ChatState {
  isOpen: boolean;
  messages: ChatMessage[];
  open: () => void;
  close: () => void;
  sendMessage: (content: string) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  isOpen: false,
  messages: [],

  open: () => {
    set({ isOpen: true });
  },

  close: () => {
    set({ isOpen: false });
  },

  sendMessage: (content: string) => {
    const { messages } = get();
    const newMessage: ChatMessage = {
      id: Math.random().toString(36).substring(2, 9),
      role: 'user',
      content,
      createdAt: Date.now(),
    };
    set({ messages: [...messages, newMessage] });
  },
})); 