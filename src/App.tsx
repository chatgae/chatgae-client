import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./Splash";
import Home from "./Home/Pages/Home";
import CommunityScreen from "./Preparing";
import MedicalScreen from "./Preparing";
import MyPageScreen from "./Preparing";
import CameraScreen from "./Home/Pages/Camera";
import CameraScreen2 from "./Home/Pages/Camera2";
import KakaoMap from "./Home/Components/KakaoMap";
import Success from "./Home/Pages/Success";
import Fail from "./Home/Pages/Fail";
import LoadingScreen from "./Loading";
import NavBar from "./Common/NavBar";
import PetProfile from "./Register/Pages/PetProfile";
import PetNose from "./Register/Pages/PetNose";
import PetBreed from "./Register/Pages/PetBreed";
import PetDetails from "./Register/Pages/PetDetails";
import Complete from "./Register/Pages/Complete";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// ✅ 반려견 등록 과정 (RegisterStack)
function RegisterStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PetProfile" component={PetProfile} />
      <Stack.Screen name="PetNose" component={PetNose} />
      <Stack.Screen name="PetBreed" component={PetBreed} />
      <Stack.Screen name="PetDetails" component={PetDetails} />
      <Stack.Screen name="Complete" component={Complete} />
    </Stack.Navigator>
  );
}

// ✅ MainTab (NavBar가 필요한 화면만 포함)
function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <NavBar {...props} />}
    >
      <Tab.Screen name="홈" component={Home} />
      <Tab.Screen name="커뮤니티" component={CommunityScreen} />
      <Tab.Screen name="건강" component={MedicalScreen} />
      <Tab.Screen name="마이페이지" component={MyPageScreen} />
    </Tab.Navigator>
  );
}

// ✅ 최상위 AppStack
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Main" component={MainTab} />
        <Stack.Screen name="Register" component={RegisterStack} />
        <Stack.Screen name="HomeMain" component={MainTab} />
        <Stack.Screen name="비문카메라" component={CameraScreen} />
        <Stack.Screen name="CameraScreen2" component={CameraScreen2} />
        <Stack.Screen name="KakaoMap" component={KakaoMap} />
        <Stack.Screen name="Success" component={Success} />
        <Stack.Screen name="Fail" component={Fail} />
        <Stack.Screen name="PetProfile" component={PetProfile} />
        <Stack.Screen name="PetNose" component={PetNose} />
        <Stack.Screen name="PetBreed" component={PetBreed} />
        <Stack.Screen name="PetDetails" component={PetDetails} />
        <Stack.Screen name="Complete" component={Complete} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export type RootStackParamList = {
  Loading: { mode: "조회" | "등록" }; // ✅ "LoadingScreen"이 아니라 "Loading" 사용
};
