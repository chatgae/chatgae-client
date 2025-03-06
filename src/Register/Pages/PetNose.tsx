// 2
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/Feather";
import { styles } from "../styles/PetProfileStyles";
import { noseStyles } from "../styles/PetNoseStyles"; // 새로운 스타일

const MAX_IMAGES = 5;

const PetNose = ({ navigation }: any) => {
  const [noseImages, setNoseImages] = useState<string[]>([]);

  const pickImages = async () => {
    if (noseImages.length >= MAX_IMAGES) return;

    // 📌 갤러리 접근 권한 요청
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("🚫 갤러리 접근 권한이 거부됨");
      return;
    }

    // 📌 다중 이미지 선택
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // ✅ 다중 선택 허용
      selectionLimit: MAX_IMAGES - noseImages.length, // ✅ 남은 슬롯만큼만 선택 가능
      quality: 1,
    });

    console.log("📸 이미지 선택 응답:", result);

    if (!result.canceled && result.assets.length > 0) {
      const selectedImages = result.assets.map((asset) => asset.uri); // ✅ 선택한 이미지 URI 리스트
      setNoseImages((prevImages) => [...prevImages, ...selectedImages]); // ✅ 기존 이미지 + 새 이미지 추가
      console.log("✅ 선택된 이미지:", selectedImages);
    } else {
      console.log("🚫 사용자가 취소했습니다.");
    }
  };

  const removeImage = (index: number) => {
    setNoseImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      {/* 🔙 뒤로 가기 버튼 (기존 스타일) */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-left" size={24} color="#333" />
      </TouchableOpacity>

      {/* 📊 진행 바 (기존 스타일) */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View style={styles.progressInactive} />
          <View style={[styles.progressActive, { marginLeft: 5 }]} />
          <View style={styles.progressInactive} />
          <View style={styles.progressInactive} />
        </View>
      </View>

      {/* 📌 제목 */}
      <View style={noseStyles.titleContainer}>
        <Text style={noseStyles.title}>
          <Text style={noseStyles.highlight}>반려견의 비문</Text>을 올려주세요
        </Text>
        <Text style={noseStyles.subText}>5장의 비문을 등록해 주세요!</Text>
      </View>

      {/* 📷 이미지 업로드 버튼 + 첫 번째 이미지 */}
      <View style={noseStyles.uploadRow}>
        <TouchableOpacity
          style={[
            noseStyles.imagePicker,
            noseImages.length >= MAX_IMAGES && noseStyles.disabledButton,
          ]}
          onPress={pickImages}
          disabled={noseImages.length >= MAX_IMAGES}
        >
          <Icon name="camera" size={24} color="#C79A32" />
          <Text style={noseStyles.imageCount}>
            {noseImages.length} / {MAX_IMAGES}
          </Text>
        </TouchableOpacity>

        {/* 첫 번째 업로드된 이미지 */}
        {noseImages.length > 0 && (
          <TouchableOpacity
            onPress={() => removeImage(0)}
            style={noseStyles.firstImageWrapper}
          >
            <Image
              source={{ uri: noseImages[0] }}
              style={noseStyles.uploadedImage}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* 🖼️ 나머지 업로드된 이미지 리스트 */}
      <FlatList
        data={noseImages.slice(1)} // 첫 번째 이미지를 제외한 나머지
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={[noseStyles.imageGrid, { marginTop: -5 }]}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => removeImage(index + 1)}
            style={noseStyles.imageWrapper}
          >
            <Image source={{ uri: item }} style={noseStyles.uploadedImage} />
          </TouchableOpacity>
        )}
      />

      {/* ▶️ 다음 버튼 (기존 스타일) */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            noseImages.length < MAX_IMAGES && styles.disabledButton,
          ]}
          onPress={() => navigation.navigate("PetBreed", { noseImages })}
          disabled={noseImages.length < MAX_IMAGES}
        >
          <Text style={styles.buttonText}>다음</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PetNose;
