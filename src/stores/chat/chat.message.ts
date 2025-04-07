export type DMessageRole = 'user' | 'assistant' | 'system';

export interface DMessage {
  id: string;
  role: DMessageRole;
  content: string;
  createdAt: number;
}

export function createDMessageTextContent(role: DMessageRole, content: string): DMessage {
  return {
    id: Math.random().toString(36).substring(2, 9),
    role,
    content,
    createdAt: Date.now(),
  };
} 