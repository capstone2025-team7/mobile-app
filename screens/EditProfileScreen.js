import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  SafeAreaView,
  StatusBar
} from 'react-native';
import TopNav from '../components/TopNav';
import FooterNav from '../components/FooterNav';

export default function EditProfileScreen() {
  const [name, setName] = useState('홍길동');
  const [userId, setUserId] = useState('hong123');
  const [password, setPassword] = useState('12345678');
  const [region, setRegion] = useState('서울특별시 강남구');
  const [phone, setPhone] = useState('010-1234-5678');

  const handleSave = () => {
    Alert.alert(
      '✅ 저장 완료',
      `이름: ${name}\n아이디: ${userId}\n비밀번호: ${password}\n거주지역: ${region}\n전화번호: ${phone}`
    );
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAEBD7" />
      <View style={{ marginTop: 100 }}>
        <TopNav />
      </View>

      {/* 스크롤 되는 영역 */ }
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>👤 프로필 수정 👤</Text>

          <View style={styles.field}>
            <Text style={styles.label}>이름</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="이름을 입력하세요"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>아이디</Text>
            <TextInput
              style={styles.input}
              value={userId}
              onChangeText={setUserId}
              placeholder="아이디를 입력하세요"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>비밀번호</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="비밀번호를 입력하세요"
              secureTextEntry
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>거주지역</Text>
            <TextInput
              style={styles.input}
              value={region}
              onChangeText={setRegion}
              placeholder="거주지역을 입력하세요"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>전화번호</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="전화번호를 입력하세요"
              keyboardType="phone-pad"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}> 저장하기 </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <FooterNav />
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FAEBD7',
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  container: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 32,
    textAlign: 'center',
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 30,
    color: '#444',
    marginBottom: 6,
    marginLeft: 2,
  },
  input: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 25,
  },
  button: {
    backgroundColor: '#FFB100',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    marginBottom: 40,
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#222',
  },
});
