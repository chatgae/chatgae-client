import { StyleSheet } from "react-native";

export const detailsStyles = StyleSheet.create({
  /* 📌 제목 */
  titleContainer: {
    width: "100%",
    alignItems: "flex-start",
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
  },
  highlight: {
    color: "#D8961A",
    fontWeight: "bold",
  },

  /* 📌 성별 선택 */
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  genderButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    width: 153,
    height: 53,
    backgroundColor: "#fff",
    marginHorizontal: 5,
    elevation: 10,
    shadowColor: "#000", // iOS 그림자 색상
    shadowOffset: { width: 0, height: 1 }, // 그림자 위치
    shadowOpacity: 0.2, // 그림자 투명도 (0 ~ 1)
    shadowRadius: 2, // 그림자의 퍼짐 정도
  },
  selectedGender: {
    borderColor: "#5A3E24",
    backgroundColor: "#BB7313",
  },
  genderText: {
    fontSize: 16,
    color: "#333",
  },
  selectedText: {
    color: "#fff",
    fontWeight: "bold",
  },

  /* 📅 생년월일 선택 */
  datePicker: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingVertical: 10,
    marginBottom: 40,
    minHeight: 50,
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  placeholderText: {
    color: "#BDBDBD", // 플레이스홀더 색상 (연한 회색)
  },

  /* 📆 날짜 선택 모달 */
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 화면 어둡게
  },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    alignItems: "center",
    height: 320, // 모달 높이 조절
  },
  confirmButton: {
    backgroundColor: "#BB7313", // 브라운 계열 색상
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    width: "90%",
    alignItems: "center",
  },
  confirmText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
