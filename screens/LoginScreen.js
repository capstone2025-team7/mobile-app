import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../configs/firebaseConfig';
import { useRoute } from '@react-navigation/native'; // ← 추가

export default function LoginScreen({ navigation }) {
  const route = useRoute(); // ← 추가

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 전달받은 회원가입 정보 자동 채우기
  useEffect(() => {
    if (route.params?.email) setEmail(route.params.email);
    if (route.params?.password) setPassword(route.params.password);
  }, [route.params]);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.replace('Main'); // 로그인 성공 시 Main 화면으로
      })
      .catch(error => {
        Alert.alert('로그인 실패', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput 
        placeholder="이메일" 
        value={email} 
        onChangeText={setEmail} 
        style={styles.input} 
        keyboardType="email-address" 
        autoCapitalize="none" 
      />
      <TextInput 
        placeholder="비밀번호" 
        value={password} 
        onChangeText={setPassword} 
        style={styles.input} 
        secureTextEntry 
      />
      <Button title="로그인" onPress={handleLogin} />
      <Text 
        style={styles.link} 
        onPress={() => navigation.navigate('Register')}
      >
        회원가입 하러 가기
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', padding:20 },
  input: { borderWidth:1, borderColor:'#ccc', marginBottom:10, padding:10, borderRadius:5 },
  link: { marginTop:15, color:'blue', textAlign:'center' }
});