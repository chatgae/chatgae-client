import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { styles } from "../Styles/PetProfileStyles"; // 기존 스타일 재사용
import { completeStyles } from "../Styles/CompleteStyles"; // 새로운 스타일
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import Congrats from "../Components/Congrats";
import { RootStackParamList } from "../../App";

// ✅ RouteProp을 이용하여 route.params의 타입을 명확히 지정
type CompleteScreenRouteProp = RouteProp<RootStackParamList, "Complete">;

const Complete = () => {
  const route = useRoute<CompleteScreenRouteProp>();
  const navigation = useNavigation();

  // ✅ `route.params`에서 반려견 정보 가져오기
  const petInfo = route.params?.petInfo;

  if (!petInfo) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>반려견 정보를 불러올 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* 🎆 축하 애니메이션 */}
      <View className="absolute top-0 left-0 w-full h-[300px] items-center justify-center">
        <Congrats />
      </View>

      {/* 📌 콘텐츠 컨테이너 (반려견 카드 중앙 정렬) */}
      <View style={completeStyles.contentContainer}>
        {/* 🎉 축하 메시지 */}
        <View className="items-center mb-20">
          <Text className="text-2xl font-bold text-[#D8961A]">축하드려요!</Text>
          <Text className="text-lg text-gray-600 mt-1">
            등록이 완료되었어요.
          </Text>
        </View>

        {/* 🐶 반려견 카드 */}
        <View style={completeStyles.petCard}>
          <View style={completeStyles.checkIcon}>
            <Icon name="check-circle" size={50} color="#426CB4" />
          </View>
          <Image
            source={{ uri: petInfo.profile }}
            style={completeStyles.petImage}
          />
          <Text className="text-lg font-bold mt-4">
            {petInfo.nickname} ({petInfo.age}세)
          </Text>
          <Text className="text-gray-500 mt-2">
            {petInfo.breed} - {petInfo.gender === "M" ? "남아" : "여아"}
          </Text>
        </View>
      </View>

      {/* ▶️ 앱 시작하기 버튼 */}
      <View className="absolute bottom-10 w-full px-6">
        <TouchableOpacity
          className="w-full h-12 bg-[#B07638] rounded-2xl justify-center items-center shadow-md"
          onPress={() => navigation.navigate("HomeMain")}
        >
          <Text className="text-lg text-white font-bold">찾개 시작하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Complete;
