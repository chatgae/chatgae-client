import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import FailIcon from '../../../assets/fail.svg'

export default function Fail() {
  const navigation = useNavigation()
  const route = useRoute()
  const { petData } = route.params || {}

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      {/* 뒤로 가기 버튼 */}
      {/* <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute top-10 left-4"
      >
        <Text className="text-lg">⬅️</Text>
      </TouchableOpacity> */}

      {/* 조회 성공 메시지 */}
      <Text className="text-xl font-bold text-[#EAB439] mt-10">조회 실패</Text>
      <Text className="text-gray-600 mt-2">조회되지 않은 반려동물입니다.</Text>

      {/* ✅ 업로드된 반려동물 정보 */}
      <View className="mt-6 p-6 bg-white shadow-md rounded-lg items-center relative">
        {/* ✅ SuccessIcon을 반려동물 이미지 위쪽 중앙에 배치 */}
        <View className="absolute -top-6">
          <FailIcon width={40} height={40} />
        </View>

        {/* 반려동물 사진 */}
        <Image
          // source={{ uri: petData.imageUrl }}
          source={require('../../../assets/dogProfile.png')}
          className="w-32 h-32 rounded-full"
        />
        <Text className="text-lg font-bold mt-4">
          {/* {petData.name} ({petData.age}세) */}
          강아지(?세)
        </Text>
        <Text className="text-gray-500 text-center leading-6">
          등록되지 않은 반려동물입니다.{'\n'}
          주인을 만날 수 있도록 사진을 남겨주세요!
        </Text>
      </View>

      {/* 확인 버튼 */}
      <TouchableOpacity
        onPress={() => navigation.replace('비문카메라2')}
        className="mt-8 bg-[#6B400C] py-3 px-8 rounded-full"
      >
        <Text className="text-white font-bold">외형 사진 찍으러 가기</Text>
      </TouchableOpacity>
    </View>
  )
}
