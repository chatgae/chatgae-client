import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { styles } from "./styles";

const PetNose = ({ navigation, route }: any) => {
  const { petName, profileImage } = route.params;
  const [noseImage, setNoseImage] = useState<string | null>(null);

  const pickImage = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (!response.didCancel && response.assets) {
        setNoseImage(response.assets[0].uri ?? null);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>반려견 비문 등록</Text>
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {noseImage ? (
          <Image source={{ uri: noseImage }} style={styles.image} />
        ) : (
          <Text style={styles.imageText}>비문 사진 업로드</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() =>
          navigation.navigate("PetBreed", {
            petName,
            profileImage,
            noseImage,
          })
        }
      >
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PetNose;
