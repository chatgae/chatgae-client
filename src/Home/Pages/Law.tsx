import React from 'react'
import { View, Text, FlatList, TouchableOpacity, Linking } from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '../../App'

const laws = [
  {
    id: '1',
    title: '유실견 보호법 개요',
    content:
      '동물보호법 제12조에 따라 반려견은 등록이 필수이며, 유실된 경우 신고해야 합니다.',
  },
  {
    id: '2',
    title: '유실견 신고 방법',
    content:
      '유실견을 발견하면 120 다산콜센터, 경찰서(112), 동물보호센터에 신고해야 합니다.',
  },
  {
    id: '3',
    title: '유실견 보호 시 주의사항',
    content:
      '유실견을 임의로 입양하거나 판매하면 불법이며, 보호 공고 기간(10일)이 지나야 정식 입양이 가능합니다.',
  },
  {
    id: '4',
    title: '벌금 및 처벌 규정',
    content:
      '유실견을 신고하지 않으면 최대 300만 원 이하의 벌금이 부과될 수 있습니다.',
  },
]

const sources = [
  {
    id: '1',
    name: '농림축산식품부 - 동물보호법',
    url: 'https://www.law.go.kr/법령/동물보호법',
  },
  {
    id: '2',
    name: '환경부 - 반려동물 등록제 안내',
    url: 'https://www.me.go.kr',
  },
]

export default function LostDogLaws() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  return (
    <View className="flex-1 bg-white px-4 pt-20">
      <Text className="text-2xl font-bold text-center text-[#D8961A] mb-6">
        유실견 보호 및 신고 가이드
      </Text>

      <FlatList
        data={laws}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-gray-100 rounded-lg p-4 mb-4">
            <Text className="text-lg font-bold text-black">{item.title}</Text>
            <Text className="text-gray-700 mt-2">{item.content}</Text>
          </View>
        )}
      />

      {/* ▶️ 외형 사진 찍으러 가기 버튼 */}
      <View className="bottom-10 w-full px-6 flex justify-center items-center">
        <TouchableOpacity
          className="w-full h-12 bg-[#B07638] rounded-2xl justify-center items-center"
          onPress={() => navigation.navigate('비문카메라')}
        >
          <Text className="text-lg text-white font-bold">유실견 사진 찍기</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
