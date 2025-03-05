import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import CommunityIcon from '../../assets/community.svg'
import HomeIcon from '../../assets/home.svg'
import MedicalIcon from '../../assets/medical.svg'
import MyPageIcon from '../../assets/myPage.svg'

export default function NavBar({ state, navigation }: BottomTabBarProps) {
  const icons = [
    { name: '홈', Component: HomeIcon, route: '홈' },
    { name: '커뮤니티', Component: CommunityIcon, route: '커뮤니티' },
    { name: '건강', Component: MedicalIcon, route: '건강' },
    { name: '마이페이지', Component: MyPageIcon, route: '마이페이지' },
  ]

  return (
    <View className="w-full h-20 flex flex-row justify-around items-cente bg-white ">
      {icons.map(({ name, Component, route }, index) => {
        const isSelected = state.index === index
        return (
          <TouchableOpacity
            key={name}
            activeOpacity={0.8}
            onPress={() => navigation.navigate(route)}
            className="flex items-center"
          >
            <Component
              width={32}
              height={32}
              color={isSelected ? '#EAB439' : '#B3B3B3'}
            />
            <Text
              className={`mt-1 text-sm ${
                isSelected ? 'text-[#EAB439]' : 'text-[#B3B3B3]'
              }`}
            >
              {name}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
