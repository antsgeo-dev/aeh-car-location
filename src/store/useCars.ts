import { create } from 'zustand'
import { CarInfo } from '../components/CarTile'

interface CarsState {
    cars: CarInfo[]
    setCars: (by: CarInfo[]) => void
  }

export const useCarsStore = create<CarsState>((set) => ({
  cars: [],
  setCars: (carsUPD: CarInfo[]) => set({ cars: carsUPD }),
}))
