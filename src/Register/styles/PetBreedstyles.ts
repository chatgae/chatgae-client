import { StyleSheet } from "react-native";

export const breedStyles = StyleSheet.create({
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

  /* 📌 "견종 모름" & "믹스견" 선택 버튼 */
  topBreedContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  breedButton: {
    borderWidth: 1,
    borderColor: "#C0C0C0",
    borderRadius: 25, // 둥글게
    paddingVertical: 10, // 버튼 높이 조정
    paddingHorizontal: 18, // 버튼 너비 조정
    marginHorizontal: 6, // 버튼 사이 간격 조정
    marginVertical: 6, // 버튼 상하 간격 추가
    backgroundColor: "#fff",
    elevation: 2, // 그림자 추가 (안드로이드)
    shadowColor: "#000", // 그림자 (iOS)
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  breedText: {
    fontSize: 14,
    color: "#333",
  },

  /* 📌 견종 카테고리 */
  breedSection: {
    paddingVertical: 15, // 카테고리 간 간격 증가
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#777",
    marginBottom: 10, // 카테고리 제목과 리스트 간격 증가
  },

  /* 📌 견종 리스트 */
  breedList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center", // 중앙 정렬
  },

  /* 📌 카테고리 구분선 */
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 20,
  },
});
