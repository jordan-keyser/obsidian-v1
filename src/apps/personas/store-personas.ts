import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';

const MAX_SAVED_PERSONAS = 100;

export interface SimplePersona {
  id: string;
  name?: string;
  systemPrompt: string;
  creationDate: string;
  pictureUrl?: string;
  inputProvenance?: SimplePersonaProvenance;
  inputText: string;
  llmLabel?: string;
}

export type SimplePersonaProvenance = {
  type: 'youtube';
  url: string;
  title?: string;
  thumbnailUrl?: string;
} | {
  type: 'text';
};

interface PersonasStore {
  simplePersonas: SimplePersona[];
  prependSimplePersona: (systemPrompt: string, inputText: string, inputProvenance?: SimplePersonaProvenance, llmLabel?: string) => void;
  deleteSimplePersona: (id: string) => void;
  deleteSimplePersonas: (ids: Set<string>) => void;
}

export const usePersonasStore = create<PersonasStore>()(persist(
  (set) => ({
    simplePersonas: [],

    prependSimplePersona: (systemPrompt: string, inputText: string, inputProvenance?: SimplePersonaProvenance, llmLabel?: string) =>
      set(state => {
        const newPersona: SimplePersona = {
          id: crypto.randomUUID(),
          systemPrompt,
          creationDate: new Date().toISOString(),
          inputProvenance,
          inputText: inputProvenance?.type === 'youtube' ? '' : inputText,
          llmLabel,
        };
        return {
          simplePersonas: [
            newPersona,
            ...state.simplePersonas.slice(0, MAX_SAVED_PERSONAS - 1),
          ],
        };
      }),

    deleteSimplePersona: (personaId: string) =>
      set(state => ({
        simplePersonas: state.simplePersonas.filter(persona => persona.id !== personaId),
      })),

    deleteSimplePersonas: (personaIds: Set<string>) =>
      set(state => ({
        simplePersonas: state.simplePersonas.filter(persona => !personaIds.has(persona.id)),
      })),
  }),
  {
    name: 'app-personas',
    version: 1,
  },
));

export function useSimplePersonas() {
  const simplePersonas = usePersonasStore(useShallow(state => state.simplePersonas));
  return { simplePersonas };
}

export function useSimplePersona(personaId: string) {
  const simplePersona = usePersonasStore(useShallow(state => {
    return state.simplePersonas.find(persona => persona.id === personaId) ?? null;
  }));
  return { simplePersona };
}

export function prependSimplePersona(systemPrompt: string, inputText: string, inputProvenance?: SimplePersonaProvenance, llmLabel?: string) {
  usePersonasStore.getState().prependSimplePersona(systemPrompt, inputText, inputProvenance, llmLabel);
}

export function deleteSimplePersona(personaId: string) {
  usePersonasStore.getState().deleteSimplePersona(personaId);
}

export function deleteSimplePersonas(personaIds: Set<string>) {
  usePersonasStore.getState().deleteSimplePersonas(personaIds);
} 