import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "./styles";

const PetBreed = ({ navigation, route }: any) => {
  const { petName, profileImage, noseImage } = route.params;
  const [breed, setBreed] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>반려견 견종 선택</Text>
      <Picker selectedValue={breed} onValueChange={(value) => setBreed(value)}>
        <Picker.Item label="골든 리트리버" value="golden_retriever" />
        <Picker.Item label="푸들" value="poodle" />
        <Picker.Item label="말티즈" value="maltese" />
      </Picker>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() =>
          navigation.navigate("PetDetails", {
            petName,
            profileImage,
            noseImage,
            breed,
          })
        }
      >
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PetBreed;
