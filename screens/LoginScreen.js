import React from 'react';
import { View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import { globalStyles } from '../styles/global';
import FooterNav from '../components/FooterNav';

const LoginScreen = () => {
  return (
    <View style={globalStyles.screenContainer}>
      <Image source={require('../assets/logo.png')} style={globalStyles.logo} />

      <TextInput
        placeholder="아이디를 입력해 주세요."
        style={globalStyles.input}
        placeholderTextColor="#aaa"
      />

      <TextInput
        placeholder="비밀번호를 입력해 주세요."
        style={globalStyles.input}
        placeholderTextColor="#aaa"
        secureTextEntry
      />

      <TouchableOpacity style={globalStyles.button}>
        <Text style={globalStyles.buttonText}>로그인</Text>
      </TouchableOpacity>
      <FooterNav />
    </View>
  );
};

export default LoginScreen;
