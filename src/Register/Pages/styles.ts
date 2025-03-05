import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
  },

  /* 🔙 뒤로 가기 버튼 */
  backButton: {
    position: "absolute",
    top: 50,
    left: 14,
    zIndex: 10, // 진행바 위로 배치
    padding: 10,
  },

  /* 📊 진행 바 */
  progressBarContainer: {
    marginTop: 120, // 뒤로 가기 버튼과 겹치지 않도록 조정
  },
  progressBar: {
    flexDirection: "row",
    width: "100%",
    height: 4,
    justifyContent: "space-between",
  },
  progressActive: {
    flex: 1,
    height: 4,
    backgroundColor: "#5A3E24",
    borderRadius: 2,
  },
  progressInactive: {
    flex: 1,
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    marginLeft: 5,
  },

  /* 📌 콘텐츠 컨테이너 (제목, 이미지 업로드, 입력란) */
  contentContainer: {
    justifyContent: "center", // 요소들을 중앙 정렬
    alignItems: "center",
    marginTop: 30,
  },

  /* 📝 제목 */
  titleContainer: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "left",
    color: "#333",
  },
  highlight: {
    color: "#D8961A",
    fontWeight: "bold",
  },

  /* 📷 이미지 업로드 */
  imagePicker: {
    borderColor: "#AEAEAE",
    width: 153,
    height: 153,
    borderRadius: 153,
    borderWidth: 1,
    backgroundColor: "#FAFAFA",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 153,
  },
  imageCount: {
    fontSize: 12,
    color: "#EFC655",
    marginTop: 4,
  },

  /* 🐶 이름 입력 */
  label: {
    alignSelf: "flex-start",
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 13,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#333",
    marginBottom: 40,
  },

  /* ▶️ 최하단 고정 버튼 */
  bottomContainer: {
    width: "100%",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    left: 24,
    right: 0,
    padding: 20,
  },
  nextButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#C79A32",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#E0E0E0",
  },
});
