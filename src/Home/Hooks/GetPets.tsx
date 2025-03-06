import axios from 'axios'
import { useState, useCallback, useEffect } from 'react'
import { GetPetsReponse } from '../Types/PetResponse'
import { usePetStore } from '../Stores/UsePetStore'

export default function GetPets() {
  const { setMyPets } = usePetStore()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // ✅ 데이터를 다시 가져오는 함수
  const fetchPets = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await axios.get<GetPetsReponse>(
        `https://hare-working-cougar.ngrok-free.app/api/v1/pets/`,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'ngrok-skip-browser-warning': '69420',
          },
        }
      )

      if (response.data.status === 'success' && response.data.data) {
        console.log('✅ 반려동물 데이터:', response.data.data)
        setMyPets(response.data.data) // ✅ Zustand 상태 업데이트
      } else {
        throw new Error('반려동물 정보를 불러오는 데 실패했습니다.')
      }
    } catch (err: any) {
      console.error('❌ 반려동물 데이터 로딩 실패:', err.message)
      setError(err.message || '알 수 없는 오류 발생')
    } finally {
      setLoading(false)
    }
  }, [setMyPets])

  // ✅ 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    fetchPets()
  }, [fetchPets])

  return { loading, error, refetch: fetchPets }
}
