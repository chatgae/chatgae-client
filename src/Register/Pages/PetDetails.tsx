import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./styles";

const PetDetails = ({ navigation, route }: any) => {
  const { petName, profileImage, noseImage, breed } = route.params;
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>반려견 정보 입력</Text>
      <TextInput
        style={styles.input}
        placeholder="성별 (수컷/암컷)"
        value={gender}
        onChangeText={setGender}
      />
      <TextInput
        style={styles.input}
        placeholder="생년월일 (YYYY-MM-DD)"
        value={birthDate}
        onChangeText={setBirthDate}
      />
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() =>
          navigation.navigate("Complete", {
            petName,
            profileImage,
            noseImage,
            breed,
            gender,
            birthDate,
          })
        }
      >
        <Text style={styles.buttonText}>완료</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PetDetails;
