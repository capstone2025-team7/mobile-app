import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FooterNav from '../components/FooterNav';
import colors from '../styles/colors';
import { schedules } from '../components/schedules';

const { width } = Dimensions.get('window');
const BUTTON_MARGIN = 16;
const BUTTON_SIZE = (width - BUTTON_MARGIN * 3) / 2;

const MainScreen = () => {
  const navigation = useNavigation();
  const [today, setToday] = useState('');
  const [nextSchedule, setNextSchedule] = useState('없음');

  useEffect(() => {
    const now = new Date();
    const formatted = `${now.getMonth() + 1}/${now.getDate()}`;
    setToday(formatted);

    const todaySchedules = schedules[formatted] || [];
    const upcomingSchedules = todaySchedules.filter(item => {
      const parts = item.trim().split(' ');
      const timeString = parts[parts.length - 1];
      if (!timeString || !timeString.includes(':')) return true;

      const [hour, minute] = timeString.split(':').map(Number);
      const scheduleTime = new Date();
      scheduleTime.setHours(hour, minute, 0, 0);
      return scheduleTime > now;
    });

    setNextSchedule(upcomingSchedules[0] || '없음');
  }, []);

  return (
    <View style={styles.container}>
      <FooterNav />

      <View style={styles.buttonGrid}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Club')}>
          <Text style={styles.buttonText}>동호회</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Notifications')}>
          <Text style={styles.buttonText}>알림</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Features')}>
          <Text style={styles.buttonText}>부가기능</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Calendar')}>
          <View style={styles.dateBox}>
            <Text style={styles.dateText}>{today}</Text>
          </View>
          <Text style={styles.buttonTextBelow}>오늘의 일정</Text>
          <Text style={styles.scheduleTextBelow}>{nextSchedule}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAEBD7',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 100,
    paddingBottom: 200,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 20,
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    backgroundColor: colors.inputBg,
    borderRadius: 16,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: BUTTON_MARGIN,
    padding: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 6,
  },
  buttonTextBelow: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 6,
  },
  scheduleTextBelow: {
    fontSize: 14,
    color: colors.textDark,
    textAlign: 'center',
    marginTop: 4,
  },
  dateBox: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  dateText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textDark,
  },
});
