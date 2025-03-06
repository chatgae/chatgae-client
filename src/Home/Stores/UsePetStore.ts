import { create } from 'zustand'
import { Pet, PetData } from '../Types/PetResponse'

interface PetState {
  myPets: Pet[]
  petData: PetData
  setMyPets: (pets: Pet[]) => void
  setPetData: (data: PetData) => void
}

export const usePetStore = create<PetState>((set) => ({
  myPets: [],
  petData: {} as PetData, // ✅ 초기값 빈 객체로 설정
  setMyPets: (pets) => set({ myPets: pets }),
  setPetData: (data) => set({ petData: data }), // ✅ petData 업데이트 함수
}))
