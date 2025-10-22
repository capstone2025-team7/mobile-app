// MedicineAuto.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import colors from '../../styles/colors';
import TopNav from '../../components/TopNav';
import FooterNav from '../../components/FooterNav';

export default function MedicineManual() {
  // 상태 관리
  const [name, setName] = useState('');
  const [dose, setDose] = useState('');
  const [time, setTime] = useState('');

  // 등록 버튼 클릭
  const handleRegister = () => {
    if (!name || !dose || !time) {
      Alert.alert('모든 항목을 입력해주세요!');
      return;
    }
    // DB 대신 콘솔 출력
    console.log('약 정보 등록:', { name, dose, time });
    Alert.alert('약이 등록되었습니다!');
    // 입력 초기화
    setName('');
    setDose('');
    setTime('');
  };

  return (
    <View style={styles.container}>
      <TopNav />

      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="약 이름"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="용량 (예: 500mg)"
          value={dose}
          onChangeText={setDose}
        />
        <TextInput
          style={styles.input}
          placeholder="복용 시간 (예: 08:00)"
          value={time}
          onChangeText={setTime}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>등록</Text>
        </TouchableOpacity>
      </View>

      <FooterNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
