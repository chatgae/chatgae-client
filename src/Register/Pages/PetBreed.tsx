// 3
import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { styles } from "../Styles/PetProfileStyles"; // 기존 스타일 재사용
import { breedStyles } from "../Styles/PetBreedStyles"; // 새로운 스타일
import { usePetStore } from "../Zustand/PetStore";
import Icon from "react-native-vector-icons/Feather";

const dogBreeds = [
  {
    category: 'ㄱ~ㅁ',
    breeds: [
      '골든리트리버',
      '닥스훈트',
      '래브라도 리트리버',
      '몰티즈',
      '미니어처 슈나우저',
      '미니어처 푸들',
      '미니어처 핀셔',
    ],
  },
  {
    category: 'ㅂ~ㅅ',
    breeds: [
      '베들링턴 테리어',
      '보더콜리',
      '보스턴 테리어',
      '비글',
      '비숑 프리제',
      '사모예드',
      '셰틀랜드 쉽독',
      '스탠더드 푸들',
      '시바 이누',
      '시베리안 허스키',
      '시츄',
    ],
  },
  {
    category: 'ㅇ~ㅋ',
    breeds: [
      '아메리칸 코카 스파니엘',
      '요크셔 테리어',
      '웰시 코기',
      '이탈리안 그레이하운드',
      '제페니스 스피츠',
      '진돗개',
      '치와와',
      '카바리에 킹찰스 스파니엘',
      '코카 스파니엘',
    ],
  },
  {
    category: 'ㅌ~ㅎ',
    breeds: [
      '토이푸들',
      '파피용',
      '퍼그',
      '페키니즈',
      '펨브록 웰시코기',
      '포메라니안',
      '푸들',
      '풍산개',
      '프렌치 불도그',
    ],
  },
]

const PetBreed = ({ navigation }: any) => {
  const { petInfo, setBreed } = usePetStore();
  const handleSelectBreed = (breed: string) => {
    setBreed(breed);
    navigation.navigate("PetDetails");
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
          <View style={[styles.progressActive, { marginLeft: 5 }]} />
          <View style={styles.progressInactive} />
        </View>
      </View>

      {/* 📌 제목 */}
      <View style={breedStyles.titleContainer}>
        <Text style={breedStyles.title}>
          반려견의 <Text style={breedStyles.highlight}>견종</Text>은 무엇인가요?
        </Text>
      </View>

      {/* 🐶 "견종 모름" & "믹스견" 선택 버튼 */}
      <View style={breedStyles.topBreedContainer}>
        <TouchableOpacity
          style={breedStyles.breedButton}
          onPress={() => handleSelectBreed('견종 모름')}
        >
          <Text style={breedStyles.breedText}>견종 모름</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={breedStyles.breedButton}
          onPress={() => handleSelectBreed('믹스견')}
        >
          <Text style={breedStyles.breedText}>믹스견</Text>
        </TouchableOpacity>
      </View>

      {/* 🐶 견종 목록 */}
      <FlatList
        data={dogBreeds}
        keyExtractor={(item) => item.category}
        renderItem={({ item }) => (
          <View style={breedStyles.breedSection}>
            {/* 구분선 */}
            <View style={breedStyles.divider} />
            {/* 카테고리 제목 */}
            <Text style={breedStyles.sectionTitle}>{item.category}</Text>
            {/* 견종 리스트 */}
            <View style={breedStyles.breedList}>
              {item.breeds.map((breed) => (
                <TouchableOpacity
                  key={breed}
                  style={breedStyles.breedButton}
                  onPress={() => handleSelectBreed(breed)}
                >
                  <Text style={breedStyles.breedText}>{breed}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      />
    </View>
  )
}

export default PetBreed
