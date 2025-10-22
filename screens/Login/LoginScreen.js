import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, Alert } from 'react-native';
import { globalStyles } from '../../styles/global';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // ✅ 관리자 계정 확인
    if (id === '1234' && password === '1234') {
      Alert.alert('관리자 로그인', '관리자 페이지로 이동합니다.');
      navigation.replace('AdminHome'); // 관리자 메인 페이지로 이동
    } 
    // ✅ 일반 사용자
    else if (id !== '' && password !== '') {
      navigation.replace('Main'); // 일반 메인 페이지
    } 
    // ✅ 입력값 누락
    else {
      Alert.alert('로그인 실패', '아이디와 비밀번호를 입력해 주세요.');
    }
  };

  return (
    <View style={globalStyles.screenContainer}>
      <Image source={require('../../assets/logo.png')} style={globalStyles.logo} />

      <TextInput
        placeholder="아이디를 입력해 주세요."
        style={globalStyles.input}
        placeholderTextColor="#aaa"
        value={id}
        onChangeText={setId}
      />

      <TextInput
        placeholder="비밀번호를 입력해 주세요."
        style={globalStyles.input}
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
        <Text style={globalStyles.buttonText}>로그인</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
