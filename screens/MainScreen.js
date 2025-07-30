import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../configs/firebaseConfig';

export default function MainScreen({ navigation }) {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login');
      });
  };

  return (
    <View style={styles.container}>
      <Text>메인 화면</Text>
      <Button title="로그아웃" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center' }
});