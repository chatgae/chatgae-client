import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import WebView from 'react-native-webview'
import { useNavigation } from '@react-navigation/native'
import BackArrow from '../../../assets/backArrow.svg'

export default function KakaoMap() {
  const navigation = useNavigation()
  const KAKAO_MAP_API_KEY = process.env.EXPO_PUBLIC_KAKAO_MAP_API_KEY

  const html = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script type="text/javascript" 
          src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&autoload=false"></script>
        <style>
            * { margin: 0; padding: 0; }
            html, body, #map { width: 100%; height: 100%; }
        </style>
    </head>
    <body>
        <div id="map"></div>
        <script>
            kakao.maps.load(function() {
                var container = document.getElementById('map');
                var options = {
                    center: new kakao.maps.LatLng(33.3617, 126.5292), // 제주도 중심 좌표
                    level: 9 // 확대 레벨
                };
                var map = new kakao.maps.Map(container, options);
            });
        </script>
    </body>
    </html>`

  return (
    <View className="flex-1">
      {/* ✅ 상단 뒤로가기 버튼 */}
      <View className="absolute top-12 left-4 z-10">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-white p-2 rounded-full shadow-lg"
        >
          <BackArrow size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* ✅ 카카오맵 WebView */}
      <WebView originWhitelist={['*']} source={{ html }} style={{ flex: 1 }} />
    </View>
  )
}
