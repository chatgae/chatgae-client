import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker"; // ✅ expo-image-picker import
import Icon from "react-native-vector-icons/Feather";
import { styles } from "../Styles/PetProfileStyles";

const PetProfile = ({ navigation }: any) => {
  const [petName, setPetName] = useState<string | undefined>(undefined);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // ✅ 미디어 라이브러리 권한 요청
  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "권한 필요",
          "이미지 업로드를 위해 갤러리 접근 권한이 필요합니다."
        );
      }
    })();
  }, []);

  const pickImage = async () => {
    console.log("📸 이미지 선택 시작");

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // ✅ 사진만 선택 가능
      allowsEditing: true, // ✅ 사진 편집 허용
      aspect: [1, 1], // ✅ 정사각형 비율
      quality: 1, // ✅ 최상의 화질 유지
    });

    console.log("📸 이미지 선택 결과:", result);

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      console.log("✅ 선택된 이미지:", result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔙 뒤로 가기 버튼 */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-left" size={24} color="#333" />
      </TouchableOpacity>

      {/* 📊 진행 바 */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View style={styles.progressActive} />
          <View style={styles.progressInactive} />
          <View style={styles.progressInactive} />
          <View style={styles.progressInactive} />
        </View>
      </View>

      {/* 📌 제목 + 입력 요소 (위로 이동) */}
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            <Text style={styles.highlight}>반려견의 이름</Text>과{"\n"}
            <Text style={styles.highlight}>프로필 이미지</Text>를 올려주세요
          </Text>
        </View>

        {/* 📷 이미지 업로드 버튼 */}
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.image} />
          ) : (
            <>
              <Icon name="camera" size={24} color="#EFC655" />
              <Text style={styles.imageCount}>0 / 1</Text>
            </>
          )}
        </TouchableOpacity>

        {/* 🐶 이름 입력 */}
        <Text style={styles.label}>이름</Text>
        <TextInput
          style={styles.input}
          placeholder="이름을 입력해주세요"
          placeholderTextColor="#BDBDBD"
          value={petName}
          onChangeText={setPetName}
        />
      </View>

      {/* ▶️ 다음 버튼 (최하단 고정) */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            !(petName && profileImage) && styles.disabledButton,
          ]}
          onPress={() =>
            petName &&
            profileImage &&
            navigation.navigate("PetNose", { petName, profileImage })
          }
          disabled={!(petName && profileImage)}
        >
          <Text style={styles.buttonText}>다음</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PetProfile;
