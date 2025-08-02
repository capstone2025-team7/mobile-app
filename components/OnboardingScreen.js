import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';


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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF0DC',
    alignItems: 'center',
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
  },
  optionBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
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

