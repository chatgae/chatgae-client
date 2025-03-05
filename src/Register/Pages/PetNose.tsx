// 2
import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import Icon from 'react-native-vector-icons/Feather'
import { styles } from '../styles/PetProfileStyles'
import { noseStyles } from '../styles/PetNoseStyles' // 새로운 스타일

const MAX_IMAGES = 5

const PetNose = ({ navigation }: any) => {
  const [noseImages, setNoseImages] = useState<string[]>([])

  const pickImage = () => {
    if (noseImages.length >= MAX_IMAGES) return

    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (
        !response.didCancel &&
        response.assets &&
        response.assets.length > 0
      ) {
        const imageUri = response.assets[0].uri
        if (imageUri) {
          setNoseImages((prevImages) => [...prevImages, imageUri])
        }
      }
    })
  }

  const removeImage = (index: number) => {
    setNoseImages((prevImages) => prevImages.filter((_, i) => i !== index))
  }

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
          onPress={pickImage}
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
        contentContainerStyle={[noseStyles.imageGrid, { marginTop: -30 }]}
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
          onPress={() => navigation.navigate('PetBreed', { noseImages })}
          disabled={noseImages.length < MAX_IMAGES}
        >
          <Text style={styles.buttonText}>다음</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default PetNose
