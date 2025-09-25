import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WithdrawalScreen() {
  const navigation = useNavigation();

  const handleWithdrawal = () => {
    Alert.alert(
      '정말 탈퇴하시겠습니까?',
      '탈퇴 시 모든 정보가 삭제됩니다.',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '탈퇴',
          style: 'destructive',
          onPress: () => {
            // TODO: 실제 탈퇴 처리 로직 추가
            Alert.alert('탈퇴되었습니다.');
            navigation.reset({
              index: 0,
              routes: [{ name: 'Onboarding' }],
            });
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원 탈퇴</Text>
      <Text style={styles.description}>
        정말 탈퇴하시겠습니까?{'\n'}탈퇴 시 모든 데이터가 삭제됩니다.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleWithdrawal}>
        <Text style={styles.buttonText}>❌ 탈퇴하기</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.cancelButton]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelText}>← 돌아가기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF4E0',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
  },
  description: {
    fontSize: 20,
    color: '#555',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#ddd',
  },
  cancelText: {
    color: '#333',
    fontSize: 30,
  },
});
