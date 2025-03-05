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
import NavBar from './Common/NavBar'
import LoadingScreen from './Loading'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

// ✅ `HomeStack`을 만들어 `CameraScreen` 포함
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={Home} />
      <Stack.Screen name="비문카메라" component={CameraScreen} />
    </Stack.Navigator>
  )
}

// ✅ `MainTab`을 만들어 `NavBar` 포함
function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <NavBar {...props} />}
    >
      <Tab.Screen name="홈" component={HomeStack} />
      <Tab.Screen name="커뮤니티" component={CommunityScreen} />
      <Tab.Screen name="건강" component={MedicalScreen} />
      <Tab.Screen name="마이페이지" component={MyPageScreen} />
    </Tab.Navigator>
  )
}

// ✅ `AppStack`을 만들어 `SplashScreen` → `MainTab` 흐름 추가
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Loading" component={LoadingScreen} />
        {/* ✅ 로딩 화면 추가 */}
        <Stack.Screen name="Main" component={MainTab} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
