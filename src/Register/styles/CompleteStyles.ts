import { StyleSheet } from "react-native";

export const completeStyles = StyleSheet.create({
  // /* 🎆 폭죽 애니메이션 */
  // fireworks: {
  //   position: "absolute",
  //   top: -50,
  //   left: 0,
  //   right: 0,
  //   width: "100%",
  //   height: 300, // 크기 조정
  //   zIndex: -1, // 배경처럼 보이게 설정
  // },

  /* 📌 중앙 정렬 컨테이너 */
  contentContainer: {
    flex: 1, // 화면에서 남는 공간을 채우도록 설정
    justifyContent: "center", // 중앙 정렬
    alignItems: "center",
  },

  /* 🎉 축하 메시지 */
  messageContainer: {
    alignItems: "center",
    marginBottom: 80, // 반려견 카드와의 간격 조정
  },
  congratsText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#D8961A",
  },
  subtitle: {
    fontSize: 18,
    color: "#333",
    marginTop: 5,
    fontWeight: "bold",
  },

  /* 🐶 반려견 카드 */
  petCard: {
    width: "65%",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // Android 그림자
  },
  checkIcon: {
    position: "absolute",
    top: -40,
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 5,
  },
  petImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  petName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  petDetails: {
    fontSize: 16,
    color: "#888",
  },

  /* ▶️ 앱 시작하기 버튼 */
  startButton: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    backgroundColor: "#B07638",
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
