import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FooterNav from '../components/TopNav';
import BackNav from '../components/FooterNav';

export default function MyPage() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      // 로그인 정보 초기화 (예: 토큰 삭제)
      await AsyncStorage.removeItem('userToken');

      Alert.alert('로그아웃 되었습니다.');

      // LoginScreen으로 이동
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }], // ❗ 스택 초기화 + Onboarding으로 이동
      });
    } catch (error) {
      Alert.alert('로그아웃 실패', error.message);
    }
  };

  const handlePress = (type) => {
    Alert.alert(`${type} 버튼이 눌렸습니다.`);
  };

  return (
    <View style={styles.container}>
      <FooterNav />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Text style={styles.buttonText}>👤 프로필 수정 👤</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>🚪 로그아웃 🚪</Text>
        </TouchableOpacity>

       <TouchableOpacity  style={styles.button} onPress={() => navigation.navigate('Withdrawal')}>
       <Text style={styles.buttonText}>❌ 탈퇴 ❌</Text>
      </TouchableOpacity>
      </View>
      <BackNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAEBD7',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom:100,
  },
  buttonContainer: {
    width: '100%',
    paddingTop:30,
  },
  button: {
    width: '100%',
    backgroundColor: '#FFB100',
    paddingVertical: 40,
    borderRadius: 12,
    marginBottom: 28,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  buttonText: {
    color: '#222',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
