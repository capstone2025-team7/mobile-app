import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker'; // ✅ 추가
import colors from '../../styles/colors';
import TopNav from '../../components/TopNav';
import FooterNav from '../../components/FooterNav';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.85;
const BUTTON_HEIGHT = 50;

const SuggestionScreen = () => {
  const [selectedClub, setSelectedClub] = useState('');
  const [suggestion, setSuggestion] = useState('');

  const clubs = ['건강동호회', '요리동호회', '등산동호회'];

  const handleSubmit = () => {
    if (!selectedClub) {
      Alert.alert('알림', '동호회를 선택해주세요.');
      return;
    }
    if (!suggestion.trim()) {
      Alert.alert('알림', '건의사항을 입력해주세요.');
      return;
    }
    Alert.alert('제출 완료', `${selectedClub}에 건의사항이 제출되었습니다.`);
    setSuggestion('');
    setSelectedClub('');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TopNav />

        {/* ✅ 동호회 선택 (Picker로 변경) */}
        <Text style={styles.sectionTitle}>동호회를 선택해주세요</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedClub}
            onValueChange={(itemValue) => setSelectedClub(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="동호회를 선택하세요" value="" color="#999" />
            {clubs.map((club, index) => (
              <Picker.Item key={index} label={club} value={club} />
            ))}
          </Picker>
        </View>

        {/* 건의사항 입력 */}
        <Text style={styles.label}>건의사항을 입력해주세요</Text>
        <TextInput
          style={styles.textInput}
          placeholder="예: 동호회 시간 조정이 필요합니다."
          multiline
          value={suggestion}
          onChangeText={setSuggestion}
        />

        {/* 제출하기 버튼 */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>제출하기</Text>
        </TouchableOpacity>
      </ScrollView>

      <FooterNav />
    </View>
  );
};

export default SuggestionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAEBD7',
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingBottom: 120,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  pickerContainer: {
    width: ITEM_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
    marginBottom: 25,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  label: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
    marginBottom: 10,
  },
  textInput: {
    width: ITEM_WIDTH,
    height: 200,
    backgroundColor: colors.inputBg || '#fff',
    borderRadius: 16,
    padding: 16,
    textAlignVertical: 'top',
    fontSize: 16,
    elevation: 3,
    marginBottom: 25,
  },
  submitButton: {
    width: ITEM_WIDTH,
    height: BUTTON_HEIGHT,
    backgroundColor: '#f28b30',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    marginBottom: 30,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
