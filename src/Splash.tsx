import React, { useEffect } from 'react'
import { View, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function Splash() {
  const navigation = useNavigation()

  // ✅ 2초 후 자동으로 홈 화면으로 이동
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Main')
    }, 2000)
  }, [])

  return (
    <View className="flex-1 bg-[#FAF0C6] justify-center items-center">
      {/* ✅ 로고 이미지 */}
      <Image
        source={require('../assets/logo.png')}
        style={{ width: 193, height: 112 }}
      />
    </View>
  )
}
