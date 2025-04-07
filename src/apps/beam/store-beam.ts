import { create } from 'zustand';
import { createDConversation, DConversation } from '../../stores/chat/chat.conversation';
import { createDMessageTextContent, DMessage } from '../../stores/chat/chat.message';

export interface BeamState {
  isOpen: boolean;
  conversation: DConversation;
  open: (messages: DMessage[], onMessage?: (content: string) => void) => void;
  close: () => void;
  terminateKeepingSettings: () => void;
}

export const createBeamVanillaStore = () => {
  return create<BeamState>((set, get) => ({
    isOpen: false,
    conversation: createDConversation(),

    open: (messages, onMessage) => {
      const conversation = createDConversation();
      conversation.messages = messages;
      set({ isOpen: true, conversation });
    },

    close: () => {
      set({ isOpen: false });
    },

    terminateKeepingSettings: () => {
      set({ isOpen: false });
    },
  }));
}; 