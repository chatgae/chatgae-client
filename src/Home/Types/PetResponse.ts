export interface Pet {
  petId: number
  profile: string
  uniqueNumber: string
  regDt: string
  nickname: string
  breed: string
  gender: string
  age: number
  birthday: string
}

export interface GetPetsReponse {
  status: string
  data?: Pet[]
}
