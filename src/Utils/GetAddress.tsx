import axios from 'axios'

const KAKAO_REST_API_KEY = '0972caa3781ddc08d708de40435fe634' // ✅ 환경변수 사용
// const KAKAO_REST_API_KEY = process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY

export async function getAddressFromCoordinates(
  latitude: number,
  longitude: number
) {
  try {
    const response = await axios.get(
      `https://dapi.kakao.com/v2/local/geo/coord2address.json`,
      {
        params: {
          x: longitude, // ✅ 경도 (x)
          y: latitude, // ✅ 위도 (y)
        },
        headers: {
          Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`, // ✅ 카카오 API 키
        },
      }
    )

    if (response.data.documents.length > 0) {
      const address = response.data.documents[0].road_address
        ? response.data.documents[0].road_address.address_name // ✅ 도로명 주소
        : response.data.documents[0].address.address_name // ✅ 지번 주소

      console.log(`✅ 변환된 주소: ${address}`)
      return address
    } else {
      console.warn('⚠️ 변환된 주소가 없습니다.')
      return '주소 정보 없음'
    }
  } catch (error) {
    console.log('❌ 주소 변환 실패:', error)
    return '주소 변환 실패'
  }
}
