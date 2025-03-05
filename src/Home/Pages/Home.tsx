import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as Location from 'expo-location'
import WebView from 'react-native-webview'
import AlarmIcon from '../../../assets/alarm.svg'

export default function Home() {
  const navigate = useNavigation()

  const [location, setLocation] = useState<{
    latitude: number
    longitude: number
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation()

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert('위치 권한이 필요합니다!')
        setLoading(false)
        return
      }

      let currentLocation = await Location.getCurrentPositionAsync({})
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      })
      setLoading(false)
    })()
  }, [])

  const KAKAO_MAP_API_KEY = process.env.EXPO_PUBLIC_KAKAO_MAP_API_KEY

  // ✅ `location`이 있을 때만 `html`을 생성
  const html =
    location?.latitude && location?.longitude
      ? `
      <!DOCTYPE html>
      <html lang="ko">
      <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <script type="text/javascript" 
            src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&autoload=false"></script>
          <style>
              * { margin: 0; padding: 0; }
              html, body, #map { width: 100%; height: 100%; border-radius: 10px; }
          </style>
      </head>
      <body>
          <div id="map"></div>
          <script>
              window.onload = function () {
                  kakao.maps.load(function() {
                      var container = document.getElementById('map');
                      var options = {
                          center: new kakao.maps.LatLng(${location?.latitude}, ${location?.longitude}),
                          level: 3
                      };
                      var map = new kakao.maps.Map(container, options);

                      var markerPosition  = new kakao.maps.LatLng(${location?.latitude}, ${location?.longitude}); 

                      var marker = new kakao.maps.Marker({
                          position: markerPosition
                      });

                      marker.setMap(map);
                  });
              };
          </script>
      </body>
      </html>`
      : ''

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      {/* 헤더 */}
      <View className="flex-row justify-between items-center">
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
          <Text className="text-[#EAB439] font-bold"> 반려가족</Text>이 없어요!
        </Text>
        <Text className="text-gray-500 text-center mb-4">
          반려가족을 등록해보세요
        </Text>
        <TouchableOpacity
          className="bg-[#6B400C] py-2 px-6 rounded-full self-center"
          onPress={() => navigation.navigate('PetProfile')}
        >
          <Text className="text-white font-bold">+ 등록하기</Text>
        </TouchableOpacity>
      </View>

      {/* 유실견 신고 섹션 */}
      <TouchableOpacity
        className="bg-[#EAB439] rounded-lg py-4 px-6 flex-row items-center justify-center shadow-md"
        activeOpacity={0.8}
        onPress={() => navigation.navigate('비문카메라')}
      >
        {/* <Notice width={24} height={24} fill="white" className="mr-2" /> */}
        <Text className="text-white font-bold text-lg">유실견 신고하기</Text>
      </TouchableOpacity>

      {/* 유실견 신고 지도 섹션 */}
      <Text className="text-xl font-bold mt-6 mb-3">
        내 주변 유실견 신고 현황
      </Text>
      {!location?.latitude && !location?.longitude ? (
        <View className="flex justify-center items-center h-48">
          <ActivityIndicator size="large" color="#EAB439" />
          <Text className="mt-2 text-gray-700">위치를 불러오는 중...</Text>
        </View>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate('KakaoMap')}>
          <View className="w-full h-48 rounded-lg overflow-hidden border border-gray-300">
            <WebView originWhitelist={['*']} source={{ html }} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  )
}
