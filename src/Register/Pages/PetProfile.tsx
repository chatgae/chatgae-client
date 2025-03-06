// 1
import React, { useState } from 'react'
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import Icon from 'react-native-vector-icons/Feather'
import { styles } from './styles'

const PetProfile = ({ navigation }: any) => {
  const [petName, setPetName] = useState<string | undefined>(undefined)
  const [profileImage, setProfileImage] = useState<string | null>(null)

  const pickImage = async () => {
    console.log('hi') // ✅ 이 로그는 정상적으로 출력됨

    // 📌 사진 접근 권한 요청
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      console.log('🚫 사진 접근 권한이 거부됨')
      return
    }

    // 📌 사진 선택하기
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // 사용자가 사진을 편집할 수 있음
      aspect: [4, 4], // 선택할 때 정사각형 비율 유지
      quality: 1, // 사진 품질 (0~1)
    })

    console.log('📸 이미지 선택 응답:', result)

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri) // ✅ 이미지 URI 저장
      console.log('✅ 선택된 이미지:', result.assets[0].uri)
    } else {
      console.log('🚫 사용자가 취소했습니다.')
    }
  }

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
            <Text style={styles.highlight}>반려견의 이름</Text>과{'\n'}
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
            navigation.navigate('PetNose', { petName, profileImage })
          }
          disabled={!(petName && profileImage)}
        >
          <Text style={styles.buttonText}>다음</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default PetProfile
