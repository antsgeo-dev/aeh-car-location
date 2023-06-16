import { create } from 'zustand'

interface PosState {
    position: {lat?: number; lng?: number}
    setPos: (pos: {lat: number; lng: number}) => void
  }

export const usePositionStore = create<PosState>((set) => ({
    position: {},
    setPos: (pos) => set({ position: pos }),
}))
