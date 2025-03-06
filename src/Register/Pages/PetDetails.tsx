import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "../Styles/PetProfileStyles"; // 기존 스타일 재사용
import { detailsStyles } from "../Styles/PetDetailsStyles"; // 새로운 스타일
import { usePetStore } from "../Zustand/PetStore";
import { RootStackParamList } from "../../App";
import Icon from "react-native-vector-icons/Feather";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const API_URL = "https://hare-working-cougar.ngrok-free.app/api/v1/pets/";

const PetDetails = ({ navigation }: any) => {
  const { petInfo, setGender, setBirthDate, resetPetInfo, setRegisterPet } =
    usePetStore();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const nav = useNavigation<NavigationProp<RootStackParamList>>();

  const handleGenderSelect = (gender: string) => {
    setGender(gender);
  };

  const handleConfirmDate = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      setBirthDate(formattedDate);
    }
    setShowDatePicker(false); // 모달 닫기
  };

  // ✅ 생년월일로 나이 계산하는 함수
  const calculateAge = (birthDate: string): number => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();

    // 생일이 안 지났으면 -1 처리
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age < 0 ? 0 : age; // 나이는 0보다 작을 수 없음
  };

  // ✅ 반려견 정보 백엔드에 전송하는 함수
  const handleSubmit = async () => {
    if (
      !petInfo.petName ||
      !petInfo.profileImage ||
      !petInfo.noseImages.length ||
      !petInfo.breed ||
      !petInfo.gender ||
      !petInfo.birthDate
    ) {
      Alert.alert("⚠️ 모든 정보를 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();

    try {
      // ✅ 프로필 이미지 추가
      const profileImageUri = petInfo.profileImage;
      const profileImageName = profileImageUri.split("/").pop();
      formData.append("profileImage", {
        uri: profileImageUri,
        name: profileImageName,
        type: "image/jpeg",
      } as any);

      // ✅ 비문 이미지들 추가
      petInfo.noseImages.forEach((uri, index) => {
        const imageName = uri.split("/").pop();
        formData.append("noseImages", {
          uri,
          name: imageName,
          type: "image/jpeg",
        } as any);
      });

      const petAge = calculateAge(petInfo.birthDate);

      // ✅ JSON 데이터 추가 (반려견 정보)
      const petData = {
        nickname: petInfo.petName,
        breed: petInfo.breed,
        gender: petInfo.gender,
        birthday: petInfo.birthDate,
        age: petAge,
      };
      formData.append("pet", JSON.stringify(petData));

      console.log("📤 [POST 요청] 보낼 데이터:");

      navigation.navigate("Loading", { mode: "등록" });

      // ✅ API 요청
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        body: formData,
      });

      // const result: {
      //   status: string;
      //   data: {
      //     petName: string;
      //     profileImage: string;
      //     breed: string;
      //     gender: string;
      //     age: number;
      //   };
      // } = await response.json();

      const result = await response.json();

      console.log("📩 [응답 수신]:", response.status, result);

      if (response.status === 404 && result.status === "success") {
        // ✅ 기존에 등록된 강아지일 경우
        Alert.alert(
          "⚠️ 이미 등록된 반려견",
          "이 반려견은 이미 등록되어 있습니다."
        );
        navigation.replace("HomeMain"); // ✅ 메인 페이지로 이동
      } else if (result.status === "success") {
        // ✅ 새로 등록된 경우
        Alert.alert("🎉 등록 완료", "반려견 등록이 성공적으로 완료되었습니다.");
        resetPetInfo();
        setRegisterPet(result.data.pet);
        navigation.replace("Complete"); // ✅ 등록 완료 화면으로 이동
      } else {
        // ❌ 다른 실패 응답 처리
        console.error(`❌ 요청 실패! 상태 코드: ${response.status}`);
        Alert.alert("❌ 등록 실패", "다시 시도해 주세요.");
        navigation.replace("PetDetails");
        throw new Error("등록 실패");
      }
    } catch (error) {
      console.error("❌ 반려견 등록 오류:", error);
      Alert.alert("❌ 등록 실패", "다시 시도해 주세요.");
      navigation.replace("PetDetails");
    } finally {
      setIsSubmitting(false);
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
          <View style={styles.progressInactive} />
          <View style={styles.progressInactive} />
          <View style={styles.progressInactive} />
          <View style={[styles.progressActive, { marginLeft: 5 }]} />
        </View>
      </View>

      {/* 📌 제목 */}
      <View style={detailsStyles.titleContainer}>
        <Text style={detailsStyles.title}>
          반려견의 <Text style={detailsStyles.highlight}>기본 정보</Text>를
          알려주세요
        </Text>
      </View>

      {/* 🐶 성별 선택 */}
      <Text style={detailsStyles.label}>성별</Text>
      <View style={detailsStyles.genderContainer}>
        <TouchableOpacity
          style={[
            detailsStyles.genderButton,
            petInfo.gender === "M" && detailsStyles.selectedGender,
          ]}
          onPress={() => usePetStore.getState().setGender("M")}
        >
          <Text
            style={[
              detailsStyles.genderText,
              petInfo.gender === "M" && detailsStyles.selectedText,
            ]}
          >
            남자
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            detailsStyles.genderButton,
            petInfo.gender === "F" && detailsStyles.selectedGender,
          ]}
          onPress={() => usePetStore.getState().setGender("F")}
        >
          <Text
            style={[
              detailsStyles.genderText,
              petInfo.gender === "F" && detailsStyles.selectedText,
            ]}
          >
            여자
          </Text>
        </TouchableOpacity>
      </View>

      {/* 📅 생년월일 선택 */}
      <Text style={detailsStyles.label}>생년월일</Text>
      <TouchableOpacity
        style={detailsStyles.datePicker}
        onPress={() => setShowDatePicker(true)}
      >
        <Text
          style={[
            detailsStyles.dateText,
            !petInfo.birthDate && detailsStyles.placeholderText,
          ]}
        >
          {petInfo.birthDate ? petInfo.birthDate : "날짜를 선택해주세요"}
        </Text>
        <Icon name="calendar" size={20} color="#5A3E24" />
      </TouchableOpacity>

      {/* ▶️ 다음 버튼 (최하단 고정) */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            (!petInfo.gender || !petInfo.birthDate || isSubmitting) &&
              styles.disabledButton,
          ]}
          onPress={handleSubmit}
          disabled={!petInfo.gender || !petInfo.birthDate || isSubmitting}
        >
          <Text style={styles.buttonText}>다음</Text>
        </TouchableOpacity>
      </View>

      {/* 📆 날짜 선택 모달 (디자인 적용) */}
      <Modal transparent={true} visible={showDatePicker} animationType="slide">
        <Pressable
          style={detailsStyles.overlay}
          onPress={() => setShowDatePicker(false)}
        />
        <View style={detailsStyles.modalContainer}>
          <DateTimePicker
            value={petInfo.birthDate ? new Date(petInfo.birthDate) : new Date()} // null 방지
            mode="date"
            display="spinner" // 휠 방식 강제 적용
            locale="ko-KR"
            textColor="#5A3E24" // 날짜 색상 변경
            onChange={handleConfirmDate}
          />
          <TouchableOpacity
            style={detailsStyles.confirmButton}
            onPress={() => setShowDatePicker(false)}
          >
            <Text style={detailsStyles.confirmText}>확인</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default PetDetails;
