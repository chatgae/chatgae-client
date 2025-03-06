import React, { useEffect, useRef } from 'react'
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
import { RootStackParamList } from '../../App'
import { StackNavigationProp } from '@react-navigation/stack'

export default function Home() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
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
      <View className="flex-row justify-between items-center py-4">
        <Image
          source={require('../../../assets/logo.png')}
          className="w-12 h-9"
          resizeMode="contain"
        />

        <TouchableOpacity>
          <AlarmIcon className="w-6" />
        </TouchableOpacity>
      </View>

      <View className="flex flex-row  justify-between">
        <Text className="text-xl font-bold">나의 반려가족</Text>
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
      ) : myPets.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex"
        >
          <View className="flex-row space-x-4 mt-5">
            {myPets.map((pet) => (
              <View
                key={pet.petId}
                className="bg-white shadow-sm rounded-xl p-4 w-[134px] h-[144px] items-center"
              >
                <Image
                  source={{ uri: pet.profile }}
                  className="w-14 h-14 rounded-full mb-3"
                />
                <Text className="text-center text-xs font-bold">
                  {pet.nickname
                    ? `${pet.nickname} (${pet.age}세)`
                    : '이름 없음 (0세)'}
                </Text>

                <Text className="text-center text-[#868686] text-xs">
                  {pet.breed} - {pet.gender}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
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

      <TouchableOpacity
        className="bg-[#EAB439] rounded-full py-4 px-6 flex-row items-center justify-center shadow-md"
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Law')}
      >
        <Text className="text-white font-bold text-lg">
          유실견을 발견했어요
        </Text>
      </TouchableOpacity>

      <Text className="text-xl font-bold mt-6 mb-3">내 주변 유실견</Text>

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
            <TouchableOpacity
              className="bg-white shadow-md rounded-xl mx-2"
              style={{ width: 180, height: 230 }}
              activeOpacity={0.8}
            >
              <Image
                source={{ uri: item.imageUrl }}
                className="w-full h-28 rounded-t-lg "
                resizeMode="cover"
              />

              <View className="flex-1 justify-center">
                <Text className="text-center font-semibold text-sm text-[#333] px-4">
                  {item.address}
                </Text>

                <Text className="text-center text-[#868686] text-xs mt-4">
                  {item.registeredAt}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  )
}
