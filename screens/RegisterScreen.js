import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../configs/firebaseConfig';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert('회원가입 성공', '로그인 화면으로 이동합니다.');
        navigation.goBack();
      })
      .catch(error => {
        Alert.alert('회원가입 실패', error.message);
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
      <Button title="회원가입" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', padding:20 },
  input: { borderWidth:1, borderColor:'#ccc', marginBottom:10, padding:10, borderRadius:5 }
});