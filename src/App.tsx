import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import SplashScreen from './Splash'
import Home from './Home/Pages/Home'
import CommunityScreen from './Preparing'
import MedicalScreen from './Preparing'
import MyPageScreen from './Preparing'
import CameraScreen from './Home/Pages/Camera'
import CameraScreen2 from './Home/Pages/Camera2'
import KakaoMap from './Home/Components/KakaoMap'
import Success from './Home/Pages/Success'
import Fail from './Home/Pages/Fail'
import LoadingScreen from './Loading'
import NavBar from './Common/NavBar'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

// ✅ HomeStack 내부에서 특정 화면에서는 NavBar를 숨김
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={Home} />
      <Stack.Screen name="비문카메라" component={CameraScreen} />
      <Stack.Screen name="CameraScreen2" component={CameraScreen2} />
      <Stack.Screen name="KakaoMap" component={KakaoMap} />
      <Stack.Screen name="Success" component={Success} />
      <Stack.Screen name="Fail" component={Fail} />
    </Stack.Navigator>
  )
}

// ✅ MainTab (NavBar가 표시되는 화면)
function MainTab({ navigation, route }) {
  // 📌 숨겨야 하는 화면 리스트
  const hiddenScreens = [
    '비문카메라',
    'CameraScreen2',
    'KakaoMap',
    'Success',
    'Fail',
  ]

  // 📌 현재 활성화된 화면 이름 가져오기
  const routeName = route.state?.routes[route.state.index]?.name

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: hiddenScreens.includes(routeName)
          ? { display: 'none' } // ✅ 숨겨야 하는 화면이면 NavBar 숨김
          : {}, // ✅ 기본 상태 (보이도록 설정)
      }}
      tabBar={(props) => <NavBar {...props} />}
    >
      <Tab.Screen name="홈" component={HomeStack} />
      <Tab.Screen name="커뮤니티" component={CommunityScreen} />
      <Tab.Screen name="건강" component={MedicalScreen} />
      <Tab.Screen name="마이페이지" component={MyPageScreen} />
    </Tab.Navigator>
  )
}

// ✅ 최상위 AppStack
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Main" component={MainTab} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
