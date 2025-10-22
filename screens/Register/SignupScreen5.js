import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Alert 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import colors from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';

export default function SignupScreen5() {
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  // 📸 카메라로 직접 찍기
  const pickFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 필요', '카메라 권한이 필요합니다.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // 🖼 갤러리에서 선택하기
  const pickFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 필요', '갤러리 접근 권한이 필요합니다.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // ✅ 회원가입 완료 버튼 클릭 시 SignupComplete.js로 이동
  const handleNext = () => {
    if (!image) {
      Alert.alert('사진 선택', '프로필 사진을 등록해주세요.');
      return;
    }
    navigation.navigate('Signup6', { profileImage: image });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>프로필 사진 등록</Text>
      <Text style={styles.subtitle}>프로필 사진을 등록해 주세요</Text>

      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>이미지가 없습니다</Text>
          </View>
        )}
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.optionButton} onPress={pickFromCamera}>
          <Text style={styles.optionText}>📷 카메라</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={pickFromGallery}>
          <Text style={styles.optionText}>🖼 갤러리</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>회원가입 완료</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.background || '#FAF0DC',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    marginBottom: 8,
    color: colors?.black || '#222',
  },
  subtitle: {
    fontSize: 30,
    color: colors?.gray || '#666',
    marginBottom: 40,
  },
  imageContainer: {
    width: 180,
    height: 180,
    borderRadius: 90,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors?.primary || '#4E6EF2',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  placeholderText: {
    color: '#aaa',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 25,
    marginBottom: 50,
  },
  optionButton: {
    backgroundColor: colors?.lightGray || '#eee',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  optionText: {
    fontSize: 30,
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: colors?.primary || '#4E6EF2',
    paddingVertical: 14,
    paddingHorizontal: 70,
    borderRadius: 25,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 25,
  },
});
