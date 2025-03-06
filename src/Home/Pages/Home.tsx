import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AlarmIcon from '../../../assets/alarm.svg'
import { usePetStore } from '../Stores/UsePetStore'
import GetPets from '../Hooks/GetPets'
import { useLostDogsStore } from '../Stores/UseLastPetStore'
import GetLastPets from '../Hooks/GetLastPets'

export default function Home() {
  const navigation = useNavigation()
  const { lostDogs } = useLostDogsStore()
  const { myPets } = usePetStore()
  const { loading, error } = GetPets()
  GetLastPets()

  // ✅ 자동 슬라이드 기능
  const flatListRef = useRef<FlatList>(null)
  const scrollIndex = useRef(0)

  useEffect(() => {
    if (lostDogs.length > 1) {
      const interval = setInterval(() => {
        if (flatListRef.current) {
          scrollIndex.current = (scrollIndex.current + 1) % lostDogs.length
          flatListRef.current.scrollToIndex({
            index: scrollIndex.current,
            animated: true,
          })
        }
      }, 3000) // 3초마다 슬라이드

      return () => clearInterval(interval)
    }
  }, [lostDogs])

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      {/* 헤더 */}
      <View className="flex-row justify-between items-center mb-4">
        <Image
          source={require('../../../assets/logo.png')}
          className="w-16 h-8"
        />
        <TouchableOpacity>
          <AlarmIcon size={24} />
        </TouchableOpacity>
      </View>

      {/* 반려가족 섹션 */}
      <View className="flex flex-row  justify-between">
        <Text className="text-xl font-bold">나의 반려가족</Text>
        {/* ✅ 반려가족이 있어도 등록하기 버튼을 유지 */}
        {myPets.length != 0 && (
          <TouchableOpacity
            className="bg-[#6B400C] py-2 px-6 rounded-full self-center"
            onPress={() => navigation.navigate('PetProfile')}
          >
            <Text className="text-white font-bold">등록하기</Text>
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#EAB439" className="my-4" />
      ) : error ? (
        <Text className="text-red-500">에러 발생: {error}</Text>
      ) : myPets.length > 0 ? ( // ✅ 반려가족이 있으면 슬라이드 표시
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row space-x-4 mt-5">
            {myPets.map((pet) => (
              <View
                key={pet.petId}
                className="bg-white shadow-md rounded-xl p-4 w-[134px] h-[144px] items-center"
              >
                {/* 🐶 프로필 이미지 (원형) */}
                <Image
                  source={{ uri: pet.profile }}
                  className="w-14 h-14 rounded-full mb-3"
                />
                {/* 🐶 반려동물 이름 및 나이 */}
                <Text className="text-center text-xs font-bold">
                  {pet.nickname} ({pet.age}세)
                </Text>
                {/* 🐶 품종 및 성별 */}
                <Text className="text-center text-[#868686] text-xs">
                  {pet.breed} - {pet.gender}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        // ✅ 반려가족이 없으면 등록 안내 카드 표시
        <View className="bg-gray-100 rounded-lg p-4 shadow-sm mb-6 mt-4">
          <Text className="text-gray-700 text-center mb-1">
            등록되어있는
            <Text className="text-[#EAB439] font-bold"> 반려가족</Text>이
            없어요!
          </Text>
          <Text className="text-gray-500 text-center mb-4">
            반려가족을 등록해보세요
          </Text>
          <TouchableOpacity
            className="bg-[#6B400C] py-2 px-6 rounded-full self-center"
            onPress={() => navigation.navigate('PetProfile')}
          >
            <Text className="text-white font-bold">등록하기</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 유실견 신고 버튼 */}
      <TouchableOpacity
        className="bg-[#EAB439] rounded-lg py-4 px-6 flex-row items-center justify-center shadow-md"
        activeOpacity={0.8}
        onPress={() => navigation.navigate('비문카메라')}
      >
        <Text className="text-white font-bold text-lg">
          유기견을 발견했어요
        </Text>
      </TouchableOpacity>

      {/* 유실견 섹션 */}
      <Text className="text-xl font-bold mt-6 mb-3">
        내 주변 유실견 신고 현황
      </Text>

      {lostDogs.length === 0 ? (
        <View className="flex justify-center items-center h-48">
          <Text className="text-gray-700">주변에 유실견 신고가 없습니다.</Text>
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={lostDogs}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View className="bg-white border border-gray-300 shadow-md rounded-lg p-4 w-48 mx-2">
              <Image
                source={{ uri: item.imageUrl }}
                className="w-24 h-24 rounded-lg"
              />
              <Text className="text-center font-semibold mt-2">
                {item.address}
              </Text>
              <Text className="text-center text-gray-500">
                등록일: {item.registeredAt}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  )
}
