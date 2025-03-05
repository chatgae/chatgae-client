import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './Home/Pages/Home'
import CommunityScreen from './Preparing'
import MedicalScreen from './Preparing'
import MyPageScreen from './Preparing'
import NavBar from './Common/NavBar'

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <NavBar {...props} />}
      >
        <Tab.Screen name="홈" component={Home} />
        <Tab.Screen name="커뮤니티" component={CommunityScreen} />
        <Tab.Screen name="건강" component={MedicalScreen} />
        <Tab.Screen name="마이페이지" component={MyPageScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
