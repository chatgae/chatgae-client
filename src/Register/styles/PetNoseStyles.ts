import { StyleSheet } from "react-native";

export const noseStyles = StyleSheet.create({
  /* 📌 제목 */
  titleContainer: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 10,
    marginTop: 20,
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
  subText: {
    fontSize: 14,
    color: "#C79A32",
    marginTop: 5,
  },

  /* 📷 이미지 업로드 버튼 + 첫 번째 이미지 배치 */
  uploadRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  imagePicker: {
    width: 153,
    height: 153,
    borderRadius: 76.5, // 원형 유지
    borderWidth: 1,
    borderColor: "#AEAEAE",
    backgroundColor: "#FAFAFA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15, // 첫 번째 이미지와 간격 조정
  },
  disabledButton: {
    opacity: 0.4,
  },
  imageCount: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  /* 🖼️ 업로드된 이미지 리스트 */
  imageGrid: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  imageWrapper: {
    margin: 10,
    borderRadius: 76.5, // 원형 유지
    overflow: "hidden",
  },
  uploadedImage: {
    width: 153,
    height: 153,
    borderRadius: 76.5, // 원형 유지
  },

  /* 첫 번째 업로드된 이미지 */
  firstImageWrapper: {
    borderRadius: 76.5,
    overflow: "hidden",
  },
});
