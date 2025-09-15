import React from 'react';
import { View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import { globalStyles } from '../styles/global';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();

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

      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.replace('Main')}
      >
        <Text style={globalStyles.buttonText}>로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={globalStyles.buttonText}>회원가입</Text>
      </TouchableOpacity>

    </View>
  );
};

export default LoginScreen;