import { create } from 'zustand'

// 🐶 반려견 정보 타입 정의
interface PetInfo {
  petName: string | null
  profileImage: string | null
  noseImages?: string[]
  breed: string | null
  gender: string | null
  birthDate?: string | null
  age?: number
}

interface PetData {
  age: number
  birthday: string
  breed: string
  gender: string
  nickname: string
  profile: string
}

// ✅ Zustand Store 생성
interface PetStore {
  petInfo: PetInfo
  petData: PetData
  setPetName: (name: string) => void
  setProfileImage: (imageUri: string) => void
  addNoseImage: (imageUri: string) => void
  removeNoseImage: (index: number) => void
  setBreed: (breed: string) => void
  setGender: (gender: string) => void
  setBirthDate: (date: string) => void
  resetPetInfo: () => void
  setRegisterPet: (data: PetData) => void
}

export const usePetStore = create<PetStore>((set) => ({
  petInfo: {
    petName: null,
    profileImage: null,
    noseImages: [],
    breed: null,
    gender: null,
    birthDate: null,
    age: null,
  },
  petData: {} as PetData,
  setRegisterPet: (data) => set({ petData: data }),
  setPetName: (name) =>
    set((state) => ({ petInfo: { ...state.petInfo, petName: name } })),
  setProfileImage: (imageUri) =>
    set((state) => ({ petInfo: { ...state.petInfo, profileImage: imageUri } })),
  addNoseImage: (imageUri) =>
    set((state) => ({
      petInfo: {
        ...state.petInfo,
        noseImages: [...state.petInfo.noseImages, imageUri],
      },
    })),
  removeNoseImage: (index) =>
    set((state) => ({
      petInfo: {
        ...state.petInfo,
        noseImages: state.petInfo.noseImages.filter((_, i) => i !== index),
      },
    })),
  setBreed: (breed) =>
    set((state) => ({ petInfo: { ...state.petInfo, breed } })),
  setGender: (gender) =>
    set((state) => ({ petInfo: { ...state.petInfo, gender } })),
  setBirthDate: (date) =>
    set((state) => ({ petInfo: { ...state.petInfo, birthDate: date } })),
  resetPetInfo: () =>
    set(() => ({
      petInfo: {
        petName: null,
        profileImage: null,
        noseImages: [],
        breed: null,
        gender: null,
        birthDate: null,
      },
    })),
}))
