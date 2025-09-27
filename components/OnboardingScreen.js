import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import HelperWithSpeech from '../components/HelperWithSpeech';

export default function OnboardingScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <Image source={require('../assets/logo.png')} style={styles.topLogo} />

      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <HelperWithSpeech size={160 * 2.5} />
      </View>

      <TouchableOpacity style={styles.signupBtn} onPress={() => navigation.navigate('Register1')}>
        <Text style={styles.signupText}>네</Text>
      </TouchableOpacity>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.optionBtn} onPress={() => navigation.navigate('Signup1')}>
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
  buttonGroup: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 20,
    marginBottom: 28,
  },
  optionBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
    elevation: 2,
  },
  optionText: { fontSize: 18, fontWeight: 'bold' },
  signupBtn: {
    backgroundColor: '#f48d48ff',
    paddingVertical: 14,
    width: '80%',
    borderRadius: 10,
    marginBottom: 12,
  },
  signupText: { color: '#fff', textAlign: 'center', fontSize: 18, fontWeight: '600' },
  loginBtn: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    width: '80%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  loginText: { textAlign: 'center', fontSize: 18, fontWeight: '600' },
});
