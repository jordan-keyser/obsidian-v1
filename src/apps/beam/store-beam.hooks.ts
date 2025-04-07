import { useShallow } from 'zustand/react/shallow';
import { BeamState, createBeamVanillaStore } from './store-beam';

export type BeamStoreApi = ReturnType<typeof createBeamVanillaStore>;

export function useBeamStore(beamStore: BeamStoreApi, selector: (state: BeamState) => any) {
  return beamStore(useShallow(selector));
}

export function useAreBeamsOpen(beamStores: (BeamStoreApi | null)[]): boolean[] {
  return beamStores.map(store => store?.getState().isOpen ?? false);
} 