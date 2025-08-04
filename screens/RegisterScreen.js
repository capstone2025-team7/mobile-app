import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Button,
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../configs/firebaseConfig';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const db = getFirestore();

export default function RegisterScreen({ navigation }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hobbies, setHobbies] = useState([]);
  const [weekdays, setWeekdays] = useState([]);

  const toggleSelection = (item, selectedList, setSelectedList) => {
    if (selectedList.includes(item)) {
      setSelectedList(selectedList.filter(i => i !== item));
    } else {
      setSelectedList([...selectedList, item]);
    }
  };

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        email,
        hobbies,
        weekdays,
      });

      console.log("✅ Firestore 저장 성공 → 로그인 화면으로 이동");
      navigation.navigate('Login', { email, password });
    } catch (error) {
      console.error("Firestore 쓰기 에러:", error);
      Alert.alert('회원가입 실패', error.message);
    }
  };
  
  const renderBackButton = () => (
    <TouchableOpacity onPress={() => setStep(step - 1)} style={styles.backButton}>
      <Text style={{ color: 'blue' }}>← 이전</Text>
    </TouchableOpacity>
  );

  const renderStep1 = () => (
    <View>
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
      <Button title="다음" onPress={() => setStep(2)} />
    </View>
  );

  const renderStep2 = () => {
    const hobbyOptions = ['운동', '게임', '독서', '음악'];
    return (
      <View>
        {renderBackButton()}
        <Text style={styles.label}>취미를 선택하세요 (중복 선택 가능):</Text>
        {hobbyOptions.map(item => (
          <TouchableOpacity
            key={item}
            onPress={() => toggleSelection(item, hobbies, setHobbies)}
            style={[
              styles.selectButton,
              hobbies.includes(item) && styles.selected,
            ]}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}
        <Button title="다음" onPress={() => setStep(3)} disabled={hobbies.length === 0} />
      </View>
    );
  };

  const renderStep3 = () => {
    const weekdayOptions = ['월', '화', '수', '목', '금', '토', '일'];
    return (
      <View>
        {renderBackButton()}
        <Text style={styles.label}>선호 요일을 선택하세요 (중복 선택 가능):</Text>
        {weekdayOptions.map(day => (
          <TouchableOpacity
            key={day}
            onPress={() => toggleSelection(day, weekdays, setWeekdays)}
            style={[
              styles.selectButton,
              weekdays.includes(day) && styles.selected,
            ]}
          >
            <Text>{day}</Text>
          </TouchableOpacity>
        ))}
        <Button title="회원가입" onPress={handleRegister} disabled={weekdays.length === 0} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: {
    borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 10, borderRadius: 5
  },
  label: { fontSize: 16, marginBottom: 10 },
  selectButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  selected: {
    backgroundColor: '#add8e6',
  },
  backButton: {
    marginBottom: 10,
  }
});