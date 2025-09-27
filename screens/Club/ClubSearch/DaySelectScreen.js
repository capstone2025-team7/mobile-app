import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import colors from '../../../styles/colors';
import TopNav from '../../../components/TopNav';
import FooterNav from '../../../components/FooterNav';

const { width } = Dimensions.get('window');
const BUTTON_MARGIN = 10;
const BUTTON_WIDTH = width * 0.7;
const BUTTON_HEIGHT = 40;

const days = ['월', '화', '수', '목', '금', '토', '일'];

const DaySelectScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { activities } = route.params;
  const [selectedDays, setSelectedDays] = useState([]);

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const findClubs = () => {
    if (selectedDays.length === 0) {
      alert('하나 이상의 요일을 선택해주세요.');
      return;
    }
    navigation.navigate('ClubList', { activities, days: selectedDays });
  };

  return (
    <View style={styles.container}>
      <TopNav />
      <Text style={styles.title}>요일을 선택하세요</Text>
      <View style={styles.buttonColumn}>
        {days.map((day) => {
          const isSelected = selectedDays.includes(day);
          return (
            <TouchableOpacity
              key={day}
              style={[styles.button, isSelected && styles.selectedButton]}
              onPress={() => toggleDay(day)}
            >
              <Text style={[styles.buttonText, isSelected && styles.selectedButtonText]}>
                {day}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity style={styles.findButton} onPress={findClubs}>
        <Text style={styles.findButtonText}>찾기</Text>
      </TouchableOpacity>
      <FooterNav />
    </View>
  );
};

export default DaySelectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAEBD7',
    alignItems: 'center',
    paddingTop: 80,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginTop:30,
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonColumn: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    backgroundColor: colors.inputBg,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: BUTTON_MARGIN,
    elevation: 3,
  },
  selectedButton: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
  },
  selectedButtonText: {
    color: '#fff',
  },
  findButton: {
    marginTop: 40,
    backgroundColor: colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 16,
  },
  findButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
