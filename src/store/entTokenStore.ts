import { create } from "zustand";

export interface EntToken {
  id: number;
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  icon: string;
  label: string;
  showBackground: boolean;
}

export type UpdateEntToken = {
  x?: number;
  y?: number;
  scaleX?: number;
  scaleY?: number;
  icon?: string;
  label?: string;
  showBackground?: boolean;
};

type AddEntToken = {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  icon: string;
  label: string;
  showBackground: boolean;
};

interface EntTokensActions {
  setEntToken: (id: number, updates: UpdateEntToken) => void;
  addEntToken: (adds: AddEntToken) => void;
}

interface EntTokensState {
  entTokens: EntToken[];
  actions: EntTokensActions;
}

const useEntTokenStore = create<EntTokensState>()((set) => ({
  entTokens: [],
  actions: {
    setEntToken: (id: number, updates: UpdateEntToken) =>
      set((state) => ({
        entTokens: state.entTokens.map((mm) => (mm.id === id ? { ...mm, ...updates } : mm)),
      })),
    addEntToken: (adds: AddEntToken) =>
      set((state) => {
        const nextId = state.entTokens.length;
        const newEntToken: EntToken = {
          id: nextId,
          ...adds,
        };
        return {
          entTokens: [...state.entTokens, newEntToken],
        };
      }),
  },
}));

export const useEntTokens = () => useEntTokenStore((state) => state.entTokens);
export const useEntToken = (id: number) =>
  useEntTokenStore((state) => state.entTokens.find((entToken) => entToken.id === id));
export const useEntTokensActions = () => useEntTokenStore((state) => state.actions);

