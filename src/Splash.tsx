import React, { useEffect, useRef } from 'react'
import { View, Animated, Easing } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from '../assets/splashIcon.svg'

export default function Splash() {
  const navigation = useNavigation()

  // ✅ 애니메이션 값 (회전)
  const rotateAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    // ⏩ 아이콘을 좌우로 회전시키는 애니메이션
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 1, // 오른쪽으로 살짝 기울이기
          duration: 400,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: -1, // 왼쪽으로 살짝 기울이기
          duration: 400,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0, // 원래 위치로 돌아오기
          duration: 400,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start()

    // ✅ 2초 후 자동으로 홈 화면으로 이동
    setTimeout(() => {
      navigation.replace('Main')
    }, 2000)
  }, [])

  // ✅ 애니메이션 값 → 회전 값으로 변환
  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-5deg', '0deg', '5deg'], // -5도 ~ 5도 회전
  })

  return (
    <View className="flex-1 bg-[#FAF0C6] justify-center items-center">
      {/* ✅ 회전 애니메이션 적용 */}
      <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
        <Icon />
      </Animated.View>
    </View>
  )
}
