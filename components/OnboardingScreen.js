import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
<<<<<<< HEAD
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

      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>아니요</Text>
      </TouchableOpacity>
    </View>
  );
}
=======


<View style={{ marginTop: 100 }}>
  <Text style={{ fontSize: 30 }}>🚀 온보딩 화면입니다!</Text>
</View>

const OnboardingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
     //<Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>처음 이 앱을 사용하시나요?</Text>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.optionBtn} onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.optionText}>네</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionBtn} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.optionText}>아니요</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signupBtn} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupText}>가입</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>로그인</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingScreen;
>>>>>>> origin/ui/club

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF0DC',
    alignItems: 'center',
<<<<<<< HEAD
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
=======
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 140,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 40,
>>>>>>> origin/ui/club
  },
  optionBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
<<<<<<< HEAD
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
=======
    paddingVertical: 10,
    borderRadius: 8,
    elevation: 2,
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupBtn: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    width: '80%',
    borderRadius: 8,
    marginBottom: 10,
  },
  signupText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  loginBtn: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    width: '80%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  loginText: {
    textAlign: 'center',
    fontSize: 16,
  },
});

>>>>>>> origin/ui/club
