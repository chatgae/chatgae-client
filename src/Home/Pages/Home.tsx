import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AlarmIcon from '../../../assets/alarm.svg'
import Notice from '../../../assets/notice.svg'

export default function Home() {
  const navigation = useNavigation()
  return (
    <View className="flex-1 bg-white px-4 pt-12">
      {/* 헤더 */}
      <View className="flex-row justify-between items-center">
        {/* <Logo /> */}
        <Image
          source={require('../../../assets/logo.png')}
          style={{ width: 58, height: 32 }}
        />
        <TouchableOpacity>
          <AlarmIcon size={24} />
        </TouchableOpacity>
      </View>

      {/* 섹션 제목 */}
      <Text className="text-xl font-bold mt-4 mb-4">나의 반려가족</Text>

      {/* 반려가족 없음 카드 */}
      <View className="bg-gray-100 rounded-lg p-4 shadow-sm mb-6">
        <Text className="text-gray-700 text-center mb-1">
          등록되어있는
          <Text className="text-[#EAB439] font-bold">반려가족</Text>이 없어요!
        </Text>
        <Text className="text-gray-500 text-center mb-4">
          반려가족을 등록해보세요
        </Text>
        <TouchableOpacity className="bg-[#6B400C] py-2 px-6 rounded-full self-center">
          <Text className="text-white font-bold">+ 등록하기</Text>
        </TouchableOpacity>
      </View>

      {/* 유실견 신고 섹션 */}
      <Text className="text-xl font-bold mb-3">유실견 신고</Text>
      <TouchableOpacity
        className="flex-row items-center bg-gray-100 p-3 rounded-lg"
        onPress={() => navigation.navigate('비문카메라')}
      >
        <Notice width={24} height={24} fill="#EAB439" className="mr-2" />
        <Text className="text-gray-700 ml-3">유실견을 발견했어요</Text>
      </TouchableOpacity>
    </View>
  )
}
