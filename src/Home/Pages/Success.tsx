import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import SuccessIcon from '../../../assets/success.svg'

export default function Success() {
  const navigation = useNavigation()
  const route = useRoute()
  const { petData } = route.params || {}

  return (
    <View className="flex-1 bg-white px-6 justify-center items-center">
      {/* 조회 성공 메시지 */}
      <View className="items-center mb-8">
        <Text className="text-2xl font-bold text-[#D8961A]">조회 성공</Text>
        <Text className="text-lg text-gray-600 mt-1">
          등록된 않은 반려동물입니다.
        </Text>
      </View>

      {/* ✅ 업로드된 반려동물 정보 */}
      <View className="bg-white shadow-lg rounded-lg items-center p-6 relative w-3/4">
        {/* ✅ SuccessIcon을 반려동물 이미지 위쪽 중앙에 배치 */}
        <View className="absolute -top-8 bg-white p-2 rounded-full ">
          <SuccessIcon width={50} height={50} />
        </View>

        {/* 반려동물 사진 */}
        <Image
          // source={{ uri: petData.imageUrl }}
          source={require('../../../assets/dogProfile.png')}
          className="w-32 h-32 rounded-full"
        />

        {/* 반려동물 이름 및 정보 */}
        <Text className="text-lg font-bold mt-4">
          {/* {petData.name} ({petData.age}세) */}
          제임스(5세)
        </Text>
        <Text className="text-gray-500 mt-2">
          {/* {petData.breed} - {petData.gender} */}
          비글 - 여아
        </Text>
      </View>

      {/* 확인 버튼 */}
      <View className="absolute bottom-10 w-full px-6">
        <TouchableOpacity
          className="w-full h-12 bg-[#B07638] rounded-2xl justify-center items-center shadow-md"
          onPress={() => navigation.navigate('Main')}
        >
          <Text className="text-lg text-white font-bold">확인</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
