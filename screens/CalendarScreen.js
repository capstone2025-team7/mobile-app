// CalendarScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import TopNav from '../components/TopNav';
import FooterNav from '../components/FooterNav';
import colors from '../styles/colors';
import { schedules } from '../components/schedules';

const { width } = Dimensions.get('window');
const BUTTON_WIDTH = width * 0.8;
const BUTTON_HEIGHT = 120;

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const todaySchedules = schedules[selectedDate] || ['일정 없음'];

  const TOPNAV_HEIGHT = 150;
  const FOOTERNAV_HEIGHT = 80;

  return (
    <View style={styles.container}>
      <TopNav />

      <ScrollView
        contentContainerStyle={{
          paddingTop: TOPNAV_HEIGHT - 50,
          paddingBottom: FOOTERNAV_HEIGHT + 20,
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}
      >
        <Calendar
          onDayPress={day => {
            const [year, month, date] = day.dateString.split('-');
            setSelectedDate(`${parseInt(month)}/${parseInt(date)}`); // 8/26 형식
          }}
          markedDates={{ [selectedDate]: { selected: true, selectedColor: colors.primary } }}
          style={styles.calendar}
          theme={{
            todayTextColor: colors.primary,
            arrowColor: colors.primary,
            monthTextColor: colors.textDark,
          }}
        />

        <Text style={styles.selectedDateText}>
          {selectedDate ? `${selectedDate} 일정` : '날짜를 선택하세요'}
        </Text>

        {todaySchedules.map((item, index) => (
          <TouchableOpacity key={index} style={styles.button}>
            <Text style={styles.buttonText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FooterNav />
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FAEBD7',
    alignItems: 'center',
  },
  calendar: { 
    width: width * 0.9, 
    borderRadius: 16, 
    elevation: 2, 
    backgroundColor: '#fff',
    marginVertical: 16,
  },
  selectedDateText: { 
    fontSize: 20, 
    fontWeight: '700', 
    marginVertical: 10, 
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
