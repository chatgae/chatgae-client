import { CameraView, CameraType, useCameraPermissions } from 'expo-camera'
import { useState, useRef } from 'react'
import {
  Animated,
  Button,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import BackArrow from '../../../assets/backArrow.svg'
import DogBodyLine from '../../../assets/dogBodyLine.svg'
import { useEffect } from 'react'

export default function CameraScreen2() {
  const navigation = useNavigation()

  const [facing, setFacing] = useState<CameraType>('back')
  const [photoUri, setPhotoUri] = useState<string | null>(null)
  const [permission, requestPermission] = useCameraPermissions()
  const cameraRef = useRef<CameraView | null>(null)

  // ✅ Animated.Value 추가 (기본값 1 = 불투명)
  const fadeAnim = useRef(new Animated.Value(1)).current

  useEffect(() => {
    // 3초 후 서서히 사라지는 애니메이션 실행
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0, // 투명하게
        duration: 1000, // 1초 동안
        useNativeDriver: true, // 네이티브 드라이버 사용
      }).start()
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!permission) {
    return <View />
  }

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
  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'))
  }

  // 📸 사진 촬영 후 서버로 전송
  const takeAndUploadPicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync()
      setPhotoUri(photo.uri)
      console.log('사진 촬영 완료:', photo.uri)
      console.log('사진 촬영 크기:', photo)

      // ✅ 로딩 화면으로 이동
      navigation.navigate('Loading')

      // ✅ 서버로 업로드 후 결과 화면 이동
      const result = await uploadImage(photo.uri)

      if (result?.success) {
        // navigation.replace('Success', { petData: result.data }) // ✅ 성공 시 SuccessScreen 이동
        navigation.replace('Home') // ✅ 성공 시 Home 이동
      } else {
        navigation.replace('Fail') // ✅ 실패 시 FailScreen 이동
      }
    }
  }

  // ☁️ 서버로 이미지 업로드
  const uploadImage = async (photoUri: string) => {
    const formData = new FormData()
    formData.append('file', {
      uri: photoUri,
      name: photoUri.split('/').pop(),
      type: 'image/jpeg',
    } as any) // ✅ `as any` 추가하여 타입 충돌 방지

    try {
      const response = await fetch(
        'https://hare-working-cougar.ngrok-free.app/api/v1/losts',
        {
          method: 'POST',
          body: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )

      const result = await response.json()
      console.log('Upload success:', result)
      return 'success' // ✅ 서버 응답 반환
    } catch (error) {
      console.error('Upload error:', error)
      return 'success' // ✅ 실패 처리
    }
  }

  return (
    <View className="flex-1 justify-center items-center">
      <CameraView
        ref={(ref) => (cameraRef.current = ref)}
        className="w-full h-full"
        facing={facing}
      >
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

          {/* 🐶 Nose SVG */}
          <DogBodyLine width={300} height={300} />
        </View>

        {/* 📸 하단 촬영 버튼 */}
        <View className="absolute bottom-14 w-full flex items-center">
          <TouchableOpacity
            onPress={takeAndUploadPicture}
            className="w-16 h-16 bg-white rounded-full shadow-lg border-4 border-gray-300"
          />
        </View>
      </CameraView>

      {/* ✅ 촬영한 사진 미리보기 */}
      {/* {photoUri && (
        <Image
          source={{ uri: photoUri }}
          className="absolute bottom-4 right-4 w-5 h-auto rounded-lg"
        />
      )} */}
    </View>
  )
}
