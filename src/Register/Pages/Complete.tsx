// 5
import React from 'react'
import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native'
//import LottieView from "lottie-react-native"; // 🎆 Lottie 애니메이션 추가
import { styles } from '../styles/PetProfileStyles'
// import { styles } from '../styles/PetProfileStyles' // 기존 스타일 재사용
import { completeStyles } from '../styles/CompleteStyles' // 새로운 스타일
//import fireworks from "../../../assets/fireworks.json";
import Icon from 'react-native-vector-icons/Feather'
import Congrats from '../Components/Congrats'

const Complete = ({ navigation }: any) => {
  const petInfo = {
    name: '아토',
    age: 8,
    breed: '웰시 코기',
    gender: '남아',
    image:
      'data:image/jpeg;base64,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', // 반려견 이미지 URL (실제 데이터 사용 필요)
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* 🎆 폭죽 애니메이션 */}
      {/* <LottieView
        source={fireworks} // 🎆 Lottie 애니메이션 파일 (다운로드 필요)
        autoPlay
        loop
        style={completeStyles.fireworks}
      /> */}

      <View className="absolute top-0 left-0 w-full h-[300px] items-center justify-center">
        <Congrats />
      </View>

      {/* 🔙 뒤로 가기 버튼 */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-left" size={24} color="#333" />
      </TouchableOpacity>

      {/* 📌 콘텐츠 컨테이너 (반려견 카드 중앙 정렬) */}
      <View style={completeStyles.contentContainer}>
        {/* 🎉 축하 메시지 */}
        <View className="items-center mb-8">
          <Text className="text-2xl font-bold text-[#D8961A]">축하드려요!</Text>
          <Text className="text-lg text-gray-600 mt-1">
            등록이 완료되었어요.
          </Text>
        </View>

        {/* 🐶 반려견 카드 */}
        <View style={completeStyles.petCard}>
          <View style={completeStyles.checkIcon}>
            <Icon name="check-circle" size={50} color="#426CB4" />
          </View>
          <Image
            source={{ uri: petInfo.image }}
            style={completeStyles.petImage}
          />
          <Text className="text-lg font-bold mt-4">
            {petInfo.name} ({petInfo.age}세)
          </Text>
          <Text className="text-gray-500 mt-2">
            {petInfo.breed} - {petInfo.gender}
          </Text>
        </View>
      </View>

      {/* ▶️ 앱 시작하기 버튼 */}
      {/* <TouchableOpacity
        style={completeStyles.startButton}
        onPress={() => navigation.navigate('HomeMain')} // 홈으로 이동
      >
        <Text style={completeStyles.buttonText}>찾개 시작하기</Text>
      </TouchableOpacity> */}
      <View className="absolute bottom-10 w-full px-6">
        <TouchableOpacity
          className="w-full h-12 bg-[#B07638] rounded-2xl justify-center items-center shadow-md"
          onPress={() => navigation.navigate('HomeMain')}
        >
          <Text className="text-lg text-white font-bold">찾개 시작하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Complete
