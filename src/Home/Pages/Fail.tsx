import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import FailIcon from '../../../assets/fail.svg'
import { RootStackParamList } from '../../App'

export default function Fail() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  return (
    <View className="flex-1 bg-white px-6 justify-center items-center">
      {/* 실패 메시지 */}
      <View className="items-center mb-8">
        <Text className="text-2xl font-bold text-[#D8961A]">조회 실패</Text>
        <Text className="text-lg text-gray-600 mt-1">
          등록되지 않은 반려동물입니다.
        </Text>
      </View>

      {/* 🐶 반려동물 정보 카드 */}
      <View className="bg-white shadow-lg rounded-lg items-center p-6 relative w-3/4">
        {/* ❌ 실패 아이콘 (반려동물 사진 위에 배치) */}
        <View className="absolute -top-8 bg-white p-2 rounded-full ">
          <FailIcon width={50} height={50} />
        </View>

        {/* 🐶 반려동물 사진 */}
        {/* <NoneProfile className="w-32 h-32 rounded-full" /> */}
        <Image
          source={require('../../../assets/noneRegisteredProfile.png')}
          className="w-32 h-32 rounded-full"
        />
        <Text className="text-lg font-bold mt-4">강아지 (?세)</Text>
        <Text className="text-gray-500 text-center w-full leading-relaxed mt-2">
          등록되지 않은 반려동물입니다.{'\n'}
          주인을 만날 수 있도록 사진을 남겨주세요!
        </Text>
      </View>

      {/* ▶️ 외형 사진 찍으러 가기 버튼 */}
      <View className="absolute bottom-10 w-full px-6">
        <TouchableOpacity
          className="w-full h-12 bg-[#B07638] rounded-2xl justify-center items-center shadow-md"
          onPress={() => navigation.navigate('CameraScreen2')}
        >
          <Text className="text-lg text-white font-bold">유실견 신고하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
