import { DMessage } from './chat.message';

export interface DConversation {
  id: string;
  messages: DMessage[];
  createdAt: number;
  updatedAt: number;
}

export function createDConversation(): DConversation {
  return {
    id: Math.random().toString(36).substring(2, 9),
    messages: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
} 