import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "../styles/PetProfileStyles"; // 기존 스타일 재사용
import { detailsStyles } from "../styles/PetDetailsStyles"; // 새로운 스타일
import Icon from "react-native-vector-icons/Feather";

const PetDetails = ({ navigation }: any) => {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null); // 초기값을 null로 설정
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender);
  };

  const handleConfirmDate = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowDatePicker(false); // 모달 닫기
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
            selectedGender === "남자" && detailsStyles.selectedGender,
          ]}
          onPress={() => handleGenderSelect("남자")}
        >
          <Text
            style={[
              detailsStyles.genderText,
              selectedGender === "남자" && detailsStyles.selectedText,
            ]}
          >
            남자
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            detailsStyles.genderButton,
            selectedGender === "여자" && detailsStyles.selectedGender,
          ]}
          onPress={() => handleGenderSelect("여자")}
        >
          <Text
            style={[
              detailsStyles.genderText,
              selectedGender === "여자" && detailsStyles.selectedText,
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
            !date && detailsStyles.placeholderText,
          ]}
        >
          {date ? date.toISOString().split("T")[0] : "날짜를 선택해주세요"}
        </Text>
        <Icon name="calendar" size={20} color="#5A3E24" />
      </TouchableOpacity>

      {/* ▶️ 다음 버튼 (최하단 고정) */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            (!selectedGender || !date) && styles.disabledButton,
          ]}
          onPress={() =>
            navigation.navigate("PetSummary", {
              selectedGender,
              birthDate: date,
            })
          }
          disabled={!selectedGender || !date}
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
            value={date ?? new Date()} // null 방지
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
