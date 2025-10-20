import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import HelperWithSpeech from '../components/HelperWithSpeech';

export default function OnboardingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.topLogo} />

      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <HelperWithSpeech size={160 * 2.5} />
      </View>

      <Text style={styles.title}>처음 이 앱을 사용하시나요?</Text>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.optionBtn} onPress={() => navigation.navigate('RoleSelection')}>
          <Text style={styles.optionText}>네</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionBtn} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.optionText}>아니요</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF0DC',
    alignItems: 'center',
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  topLogo: {
    width: 160,
    height: 48,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
    marginBottom: 28,
  },
  optionBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
    elevation: 2,
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
