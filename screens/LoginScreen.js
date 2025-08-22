// screens/LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/global';
import FooterNav from '../components/FooterNav';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [userId, setUserId] = useState('');
  const [pw, setPw] = useState('');

  const handleLogin = () => {
    if (!userId.trim() || !pw.trim()) {
      Alert.alert('로그인', '아이디와 비밀번호를 입력해 주세요.');
      return;
    }
    // ✅ 로그인 성공 시 홈 이동
    navigation.replace('Home');
  };

  const goHomeWithoutLogin = () => {
    // ✅ 로그인 없이 홈 이동
    navigation.replace('Home');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={globalStyles.screenContainer}>
        <KeyboardAvoidingView
          style={{ flex: 1, width: '100%', justifyContent: 'center' }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={{ alignItems: 'center', marginBottom: 28 }}>
            <Image
              source={require('../assets/logo.png')}
              style={globalStyles.logo}
              resizeMode="contain"
            />
          </View>

          <TextInput
            placeholder="아이디를 입력해 주세요."
            style={globalStyles.input}
            placeholderTextColor="#aaa"
            autoCapitalize="none"
            autoCorrect={false}
            value={userId}
            onChangeText={setUserId}
            returnKeyType="next"
          />

          <TextInput
            placeholder="비밀번호를 입력해 주세요."
            style={globalStyles.input}
            placeholderTextColor="#aaa"
            secureTextEntry
            autoCapitalize="none"
            value={pw}
            onChangeText={setPw}
            onSubmitEditing={handleLogin}
            returnKeyType="done"
          />

          {/* 로그인 버튼 */}
          <TouchableOpacity style={globalStyles.button} onPress={handleLogin} activeOpacity={0.9}>
            <Text style={globalStyles.buttonText}>로그인</Text>
          </TouchableOpacity>

          {/* 로그인 없이 홈 버튼 */}
          <TouchableOpacity
            style={[globalStyles.button, { marginTop: 12, backgroundColor: '#aa249f' }]}
            onPress={goHomeWithoutLogin}
            activeOpacity={0.9}
          >
            <Text style={globalStyles.buttonText}>로그인 없이 홈</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>

        <FooterNav />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
