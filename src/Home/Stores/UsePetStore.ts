import { create } from 'zustand'
import { Pet } from '../Types/PetResponse'

interface PetState {
  myPets: Pet[]
  setMyPets: (pets: Pet[]) => void
}

export const usePetStore = create<PetState>((set) => ({
  myPets: [],
  setMyPets: (pets) => set({ myPets: pets }),
}))
