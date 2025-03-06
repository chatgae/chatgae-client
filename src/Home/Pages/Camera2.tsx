import { CameraView, CameraType, useCameraPermissions } from 'expo-camera'
import { useState, useRef, useEffect } from 'react'
import {
  Animated,
  Button,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import BackArrow from '../../../assets/backArrow.svg'
import DogBodyLine from '../../../assets/dogBodyLine.svg'

export default function CameraScreen2() {
  const navigation = useNavigation()
  const [facing, setFacing] = useState<CameraType>('back')
  const [photoUri, setPhotoUri] = useState<string | null>(null)
  const [permission, requestPermission] = useCameraPermissions()
  const [loading, setLoading] = useState(false) // ✅ 업로드 로딩 상태
  const cameraRef = useRef<CameraView | null>(null)

  // ✅ 툴팁 애니메이션 (3초 후 사라짐)
  const fadeAnim = useRef(new Animated.Value(1)).current
  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start()
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  if (!permission) return <View />
  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-center mb-2">
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    )
  }

  // 🔄 카메라 전환
  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'))
  }

  // 📸 사진 촬영 후 업로드
  const takeAndUploadPicture = async () => {
    if (!cameraRef.current) return

    const photo = await cameraRef.current.takePictureAsync()
    setPhotoUri(photo.uri)
    console.log('✅ 사진 촬영 완료:', photo.uri)

    // ✅ 로딩 화면으로 이동
    navigation.navigate('Loading')

    // ✅ 서버로 업로드 후 결과 화면 이동
    setLoading(true)
    const result = await uploadImage(photo.uri)
    setLoading(false)

    if (result?.success) {
      navigation.replace('Home') // ✅ 성공 시 Home 이동
    } else {
      navigation.replace('Fail') // ✅ 실패 시 FailScreen 이동
    }
  }

  // ☁️ axios로 이미지 업로드
  const uploadImage = async (photoUri: string) => {
    const formData = new FormData()
    formData.append('image', {
      uri: photoUri,
      name: photoUri.split('/').pop(),
      type: 'image/jpeg',
    } as any) // ✅ 타입 충돌 방지

    formData.append('latitude', '33.4852455')
    formData.append('longitude', '126.4746819')

    try {
      const response = await axios.post(
        'https://hare-working-cougar.ngrok-free.app/api/v1/losts',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )

      console.log('✅ 업로드 성공:', response.data)
      return response.data // ✅ 서버 응답 반환
    } catch (error) {
      console.error('❌ 업로드 실패:', error)
      return null // ✅ 실패 시 null 반환
    }
  }

  return (
    <View className="flex-1 justify-center items-center">
      <CameraView
        ref={(ref) => (cameraRef.current = ref)}
        className="w-full h-full"
        facing={facing}
      >
        {/* 🔙 뒤로 가기 버튼 */}
        <View className="absolute top-12 left-4 z-10">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-white p-2 rounded-full shadow-lg"
          >
            <BackArrow size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* ✅ 중앙에 SVG 추가 */}
        <View className="absolute w-full top-1/3 flex items-center">
          {/* 🛠️ 툴팁 추가 */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              marginBottom: 8,
              paddingVertical: 8,
              paddingHorizontal: 12,
              backgroundColor: '#FAF0C6',
              borderRadius: 8,
            }}
          >
            <Text className="text-black text-sm">
              아래에 강아지의 전신을 맞춰주세요!
            </Text>
          </Animated.View>

          {/* 🐶 Dog SVG */}
          <DogBodyLine width={300} height={300} />
        </View>

        {/* 📸 하단 촬영 버튼 */}
        <View className="absolute bottom-14 w-full flex items-center">
          <TouchableOpacity
            onPress={takeAndUploadPicture}
            disabled={loading} // ✅ 업로드 중 버튼 비활성화
            className={`w-16 h-16 bg-white rounded-full shadow-lg border-4 border-gray-300 ${
              loading ? 'opacity-50' : ''
            }`}
          />
        </View>
      </CameraView>

      {/* ✅ 촬영한 사진 미리보기 */}
      {/* {photoUri && (
        <Image
          source={{ uri: photoUri }}
          className="absolute bottom-4 right-4 w-16 h-16 rounded-lg"
        />
      )} */}
    </View>
  )
}
