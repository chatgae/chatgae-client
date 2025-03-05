import { CameraView, CameraType, useCameraPermissions } from 'expo-camera'
import { useState, useRef } from 'react'
import { Button, Text, TouchableOpacity, View, Image } from 'react-native'

export default function App() {
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

      uploadImage(photo.uri)
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
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      const result = await response.json()
      console.log('Upload success:', result)
      alert('이미지 업로드 성공!')
    } catch (error) {
      console.error('Upload error:', error)
      alert('이미지 업로드 실패')
    }
  }

  return (
    <View className="flex-1 justify-center items-center">
      <CameraView
        ref={(ref) => (cameraRef.current = ref)}
        className="w-full h-full"
        facing={facing}
      >
        {/* ✅ 중앙에 SVG 추가 */}
        {/* <View className="absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2">
          <Nose />
        </View> */}

        {/* ✅ 버튼 컨테이너 */}
        <View className="absolute bottom-10 w-full flex-row justify-around bg-black/50 py-4">
          <TouchableOpacity
            onPress={toggleCameraFacing}
            className="px-4 py-2 bg-white rounded-lg"
          >
            <Text className="text-black font-bold">Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={takeAndUploadPicture}
            className="px-4 py-2 bg-white rounded-lg"
          >
            <Text className="text-black font-bold">📸 Take Photo</Text>
          </TouchableOpacity>
        </View>
      </CameraView>

      {/* ✅ 촬영한 사진 미리보기 */}
      {photoUri && (
        <Image
          source={{ uri: photoUri }}
          className="absolute bottom-4 right-4 w-24 h-24 rounded-lg"
        />
      )}
    </View>
  )
}
