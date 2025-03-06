import { create } from 'zustand'

interface LostDog {
  latitude: number
  longitude: number
  imageUrl: string
  registeredAt: string
  address?: string
}

interface LostDogState {
  lostDogs: LostDog[]
  setLostDogs: (dogs: LostDog[]) => void
  location: { latitude: number; longitude: number } | null
  setLocation: (location: { latitude: number; longitude: number }) => void
}

export const useLostDogsStore = create<LostDogState>((set) => ({
  lostDogs: [],
  setLostDogs: (dogs) => set({ lostDogs: dogs }),
  location: null, // ✅ 위치 정보 추가 (초기값 null)
  setLocation: (location) => set({ location }),
}))
