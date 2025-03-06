import axios from 'axios'
import { useEffect, useState, useCallback } from 'react'
import { useLostDogsStore } from '../Stores/UseLastPetStore'
import { getAddressFromCoordinates } from '../../Utils/GetAddress'

export default function GetLastPets() {
  const { setLostDogs } = useLostDogsStore()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // ✅ 데이터를 다시 가져오는 함수
  const fetchLostDogs = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await axios.get(
        `https://hare-working-cougar.ngrok-free.app/api/v1/losts`,
        {
          params: {
            latitude: 33.4852455,
            longitude: 126.4746819,
            distance: 1000,
            limit: 10,
          },
        }
      )

      if (
        response.data?.status === 'success' &&
        response.data.data?.locations
      ) {
        console.log('✅ 유실견 데이터:', response.data.data.locations)

        // ✅ 각 유실견 좌표를 주소로 변환
        const lostDogsWithAddress = await Promise.all(
          response.data.data.locations.map(async (dog: any) => {
            const address = await getAddressFromCoordinates(
              dog.latitude,
              dog.longitude
            )
            return { ...dog, address } // ✅ 변환된 주소 추가
          })
        )

        setLostDogs(lostDogsWithAddress) // ✅ Zustand 상태 업데이트
      } else {
        console.log('⚠️ 유실견 데이터 없음')
        setLostDogs([])
      }
    } catch (err: any) {
      console.log('❌ 유실견 데이터 로딩 실패:', err.message)
      setError(err.message || '유실견 데이터를 불러오지 못했습니다.')
    } finally {
      setLoading(false)
    }
  }, [setLostDogs])

  // ✅ 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    fetchLostDogs()
  }, [fetchLostDogs])

  return { loading, error, refetch: fetchLostDogs }
}
