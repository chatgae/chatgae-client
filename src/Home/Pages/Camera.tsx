import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Button,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import axios from 'axios'
import BackArrow from '../../../assets/backArrow.svg'
import Nose from '../../../assets/nose.svg'
import { RootStackParamList } from '../../App'
import { usePetStore } from '../Stores/UsePetStore'

export default function CameraScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const [facing, setFacing] = useState<CameraType>('back')
  const [photoUri, setPhotoUri] = useState<string | null>(null)
  const [permission, requestPermission] = useCameraPermissions()
  const cameraRef = useRef<CameraView | null>(null)
  const { setPetData } = usePetStore()

  const { width, height } = Dimensions.get('window')
  const squareSize = width // ✅ 정사각형 크기 (가로 폭에 맞춤)

  // ✅ 애니메이션 효과 (툴팁)
  const fadeAnim = useRef(new Animated.Value(1)).current
  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-center mb-2">
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  // 📸 사진 촬영 후 서버로 전송
  const takeAndUploadPicture = async () => {
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync();
    setPhotoUri(photo.uri);
    console.log("✅ 사진 촬영 완료:", photo.uri);

    // ✅ 로딩 화면으로 이동
    navigation.navigate("Loading", { mode: "조회" });

    // ✅ 서버로 업로드 후 결과 화면 이동
    const result = await uploadImage(photo.uri);

    if (result?.status === 'success') {
      setPetData(result.data.pet)
      navigation.replace('Success') // ✅ 성공 시 SuccessScreen 이동
    } else {
      navigation.replace("Fail"); // ✅ 실패 시 FailScreen 이동
    }
  };

  // ☁️ axios로 이미지 업로드
  const uploadImage = async (photoUri: string) => {
    try {
      const formData = new FormData();
      formData.append("file", {
        uri: photoUri,
        name: photoUri.split("/").pop(),
        type: "image/jpeg",
      } as any); // ✅ `as any` 추가하여 타입 충돌 방지

      const response = await axios.post(
        "https://hare-working-cougar.ngrok-free.app/api/v1/pets/identify",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("✅ 업로드 성공:", response.data);
      return response.data; // ✅ 서버 응답 반환
    } catch (error) {
      console.log('❌ 업로드 실패:', error)
      return null // ✅ 실패 시 null 반환
    }
  };

  return (
    <View className="flex-1 bg-black justify-center items-center">
      {/* 🔙 뒤로 가기 버튼 */}
      <View className="absolute top-12 left-4 z-10">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-white p-2 rounded-full shadow-lg"
        >
          <BackArrow size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* 📷 정사각형 카메라 뷰 */}
      <View
        style={{ width: squareSize, height: squareSize, overflow: 'hidden' }}
      >
        <CameraView
          ref={(ref) => (cameraRef.current = ref)}
          style={{ width: squareSize, height: squareSize }}
          facing={facing}
        />
      </View>

      {/* 🛠️ 툴팁 추가 (3초 후 사라짐) */}
      <View className="absolute w-full top-1/4 flex items-center">
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
            아래에 강아지의 코를 맞춰주세요!
          </Text>
        </Animated.View>

        {/* 🐶 Nose SVG */}
        <Nose width={300} height={300} />
      </View>

      {/* 📸 하단 촬영 버튼 */}
      <View className="absolute bottom-14 w-full flex items-center">
        <TouchableOpacity
          onPress={takeAndUploadPicture}
          className="w-16 h-16 bg-white rounded-full shadow-lg border-4 border-gray-300"
        />
      </View>

      {/* ✅ 촬영한 사진 미리보기 */}
      {/* {photoUri && (
        <Image
          source={{ uri: photoUri }}
          className="absolute bottom-4 right-4 w-16 h-16 rounded-lg"
        />
      )} */}
    </View>
  );
}
