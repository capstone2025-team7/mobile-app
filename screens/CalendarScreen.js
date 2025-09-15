import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import FooterNav from '../components/FooterNav';
import BackNav from '../components/BackNav';
import colors from '../styles/colors';
import { schedules } from '../components/schedules';

const { width } = Dimensions.get('window');
const BUTTON_WIDTH = width * 0.8;
const BUTTON_HEIGHT = 120;

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const todaySchedules = schedules[selectedDate] || ['일정 없음'];

  return (
    <View style={styles.container}>
      <FooterNav />

      <Calendar
        onDayPress={day => {
          const [year, month, date] = day.dateString.split('-');
          setSelectedDate(`${parseInt(month)}/${parseInt(date)}`); // 8/26 형식
        }}
        markedDates={{ [selectedDate]: { selected: true, selectedColor: colors.primary } }}
        style={styles.calendar}
        theme={{ todayTextColor: colors.primary, arrowColor: colors.primary, monthTextColor: colors.textDark }}
      />

      <ScrollView contentContainerStyle={styles.buttonColumn}>
        <Text style={styles.selectedDateText}>
          {selectedDate ? `${selectedDate} 일정` : '날짜를 선택하세요'}
        </Text>

        {todaySchedules.map((item, index) => (
          <TouchableOpacity key={index} style={styles.button}>
            <Text style={styles.buttonText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <BackNav />
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    backgroundColor: '#FAEBD7', 
    paddingTop: 100, 
    paddingBottom: 80, 
    justifyContent: 'space-between' 
  },
  calendar: { 
    width: width * 0.9, 
    borderRadius: 16, 
    elevation: 2, 
    backgroundColor: '#fff' ,
    marginTop: 30,
  },
  buttonColumn: { 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '100%', 
    marginTop: 20, 
    paddingBottom: 20 
  },
  selectedDateText: { 
    fontSize: 20, 
    fontWeight: '700', 
    marginBottom: 10, 
    color: colors.textDark 
  },
  button: { 
    width: BUTTON_WIDTH, 
    height: BUTTON_HEIGHT, 
    backgroundColor: colors.inputBg, 
    borderRadius: 16, 
    elevation: 3, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginVertical: 8 
  },
  buttonText: { 
    fontSize: 18, 
    fontWeight: '600', 
    color: colors.textDark 
  },
});
