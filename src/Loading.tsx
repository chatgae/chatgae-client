import React, { useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from 'react-native-reanimated'
import Union from '../assets/union.svg'

interface LoadingScreenProps {
  mode?: '조회' | '등록' | '확인'
}

export default function LoadingScreen({ mode = '확인' }: LoadingScreenProps) {
  const navigation = useNavigation()

  // ✅ "조회 중..." 텍스트 페이드 인/아웃 애니메이션
  const fadeTextOpacity = useSharedValue(0)

  useEffect(() => {
    fadeTextOpacity.value = withRepeat(
      withTiming(1, { duration: 1000, easing: Easing.ease }),
      -1,
      true
    )
  }, [])

  const fadeTextStyle = useAnimatedStyle(() => ({
    opacity: fadeTextOpacity.value,
  }))

  // ✅ Union 애니메이션: 오른쪽 위 (시계 방향 회전 + 부드러운 이동)
  const rotateTop = useSharedValue(0)
  const translateYTop = useSharedValue(10)

  // ✅ Union 애니메이션: 왼쪽 아래 (반시계 방향 회전 + 부드러운 이동)
  const rotateBottom = useSharedValue(0)
  const translateYBottom = useSharedValue(-10)

  useEffect(() => {
    rotateTop.value = withRepeat(
      withTiming(360, { duration: 10000, easing: Easing.linear }),
      -1,
      false
    )

    translateYTop.value = withRepeat(
      withTiming(-10, { duration: 2000, easing: Easing.ease }),
      -1,
      true
    )

    rotateBottom.value = withRepeat(
      withTiming(-360, { duration: 10000, easing: Easing.linear }),
      -1,
      false
    )

    translateYBottom.value = withRepeat(
      withTiming(10, { duration: 2000, easing: Easing.ease }),
      -1,
      true
    )
  }, [])

  const unionTopStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotateTop.value}deg` },
      { translateY: translateYTop.value },
    ],
  }))

  const unionBottomStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotateBottom.value}deg` },
      { translateY: translateYBottom.value },
    ],
  }))

  // ✅ 3초 후 자동으로 홈 화면 이동
  // useEffect(() => {
  //   setTimeout(() => {
  //     navigation.navigate('Main') // 홈으로 이동
  //   }, 3000)
  // }, [])

  return (
    <View className="flex-1 bg-[#FAF0C6] justify-center items-center relative">
      {/* ✅ 오른쪽 위 Union 애니메이션 적용 */}
      <Animated.View
        className="absolute top-[-40px] right-[-80px]"
        style={unionTopStyle}
      >
        <Union width={336} height={312} />
      </Animated.View>

      {/* ✅ 왼쪽 아래 Union 애니메이션 적용 */}
      <Animated.View
        className="absolute bottom-[-40px] left-[-80px]"
        style={unionBottomStyle}
      >
        <Union width={336} height={312} />
      </Animated.View>

      {/* ✅ 로고 이미지 */}
      <Image
        source={require('../assets/logo.png')}
        style={{ width: 193, height: 112, marginBottom: 20 }}
      />

      {/* ✅ "조회 중..." 텍스트 애니메이션 적용 */}
      <Animated.Text
        className="text-lg text-[#6B400C] font-bold"
        style={fadeTextStyle}
      >
        {mode} 중...
      </Animated.Text>
    </View>
  )
}
