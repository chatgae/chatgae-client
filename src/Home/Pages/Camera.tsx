import { CameraView, CameraType, useCameraPermissions } from 'expo-camera'
import { useState, useRef } from 'react'
import { Button, Text, TouchableOpacity, View, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import BackArrow from '../../../assets/backArrow.svg'
import Nose from '../../../assets/nose.svg'

export default function CameraScreen() {
  const navigation = useNavigation()

  const [facing, setFacing] = useState<CameraType>('back')
  const [photoUri, setPhotoUri] = useState<string | null>(null)
  const [permission, requestPermission] = useCameraPermissions()
  const cameraRef = useRef<CameraView | null>(null)

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
        navigation.replace('Success') // ✅ 성공 시 SuccessScreen 이동
      } else {
        navigation.replace('Fail') // ✅ 실패 시 FailScreen 이동
      }
    }
  }

  // ☁️ 서버로 이미지 업로드
  const uploadImage = async (photoUri: string) => {
    const formData = new FormData()
    formData.append('image', {
      uri: photoUri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    })

    try {
      const response = await fetch('https://your-server.com/upload', {
        method: 'POST',
        body: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })

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
          <Nose width={140} height={140} />
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
