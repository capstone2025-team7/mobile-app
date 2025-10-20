import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Alert } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import colors from '../../styles/colors';
import TopNav from '../../components/TopNav';
import FooterNav from '../../components/FooterNav';

export default function MedicineAuto() {
  const [photo, setPhoto] = useState(null);

  const handleTakePhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
        saveToPhotos: true,
      },
      (response) => {
        if (response.didCancel) {
          console.log('사용자가 취소함');
        } else if (response.errorCode) {
          Alert.alert('카메라 에러', response.errorMessage);
        } else {
          const uri = response.assets[0].uri;
          setPhoto(uri);
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <TopNav />

      <View style={styles.content}>
        {photo && <Image source={{ uri: photo }} style={styles.photo} />}
        <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
          <Text style={styles.buttonText}>사진 찍기</Text>
        </TouchableOpacity>
      </View>

      <FooterNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  photo: {
    width: 250,
    height: 250,
    borderRadius: 8,
    marginBottom: 20,
  },
});
