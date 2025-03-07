import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import QRCode from "react-native-qrcode-svg"; // ✅ QR 코드 라이브러리 추가

export default function QRModal({ selectedLostDog, closeModal }) {
  if (!selectedLostDog) return null;

  const qrValue = `https://maps.google.com/?q=${selectedLostDog.latitude},${selectedLostDog.longitude}`;

  return (
    <Modal visible={!!selectedLostDog} transparent={true} animationType="slide">
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white p-6 rounded-lg items-center">
          <Text className="text-lg font-bold mb-4">유실견 위치 QR</Text>
          <QRCode value={qrValue} size={200} />
          <Text className="mt-4 text-center">{selectedLostDog.address}</Text>
          <TouchableOpacity
            onPress={closeModal}
            className="mt-6 bg-[#BB7313] px-6 py-2 rounded-lg"
          >
            <Text className="text-white font-bold">닫기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
