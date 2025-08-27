import { create } from "zustand";

export interface MapMarkerData {
  id: number;
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  icon: string;
  label: string;
  showBackground: boolean;
}

export type UpdateMapMarkerData = {
  x?: number;
  y?: number;
  scaleX?: number;
  scaleY?: number;
  icon?: string;
  label?: string;
  showBackground?: boolean;
};

type AddMapMarkerData = {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  icon: string;
  label: string;
  showBackground: boolean;
};

interface MapMarkersActions {
  setMapMarkerData: (id: number, updates: UpdateMapMarkerData) => void;
  addMapMarker: (adds: AddMapMarkerData) => void;
}

interface MapMarkersState {
  mapMarkers: MapMarkerData[];
  actions: MapMarkersActions;
}

const useMapMarkerStore = create<MapMarkersState>()((set) => ({
  mapMarkers: [],
  actions: {
    setMapMarkerData: (id: number, updates: UpdateMapMarkerData) =>
      set((state) => ({
        mapMarkers: state.mapMarkers.map((mm) => (mm.id === id ? { ...mm, ...updates } : mm)),
      })),
    addMapMarker: (adds: AddMapMarkerData) =>
      set((state) => {
        const nextId = state.mapMarkers.length;
        const newMapMarker: MapMarkerData = {
          id: nextId,
          ...adds,
        };
        return {
          mapMarkers: [...state.mapMarkers, newMapMarker],
        };
      }),
  },
}));

export const useMapMarkers = () => useMapMarkerStore((state) => state.mapMarkers);
export const useMapMarker = (id: number) =>
  useMapMarkerStore((state) => state.mapMarkers.find((mapMarker) => mapMarker.id === id));
export const useMapMarkersActions = () => useMapMarkerStore((state) => state.actions);
