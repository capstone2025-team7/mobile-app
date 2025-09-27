import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import BackNav from '../components/FooterNav';
import FooterNav from '../components/TopNav';
import colors from '../styles/colors';

const notifications = [
  { id: 1, message: '동호회 A에 가입되었습니다.' },
  { id: 2, message: '동호회 B 일정이 변경되었습니다.' },
  { id: 3, message: '새로운 공지사항이 등록되었습니다.' },
  { id: 4, message: '동호회 C에서 초대가 도착했습니다.' },
  { id: 5, message: '동호회 D 일정이 취소되었습니다.' },
];

const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <FooterNav />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>알림 기록</Text>

        {notifications.map((item) => (
          <View key={item.id} style={styles.notificationCard}>
            <Text style={styles.notificationText}>{item.message}</Text>
          </View>
        ))}
      </ScrollView>

      <BackNav />
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAEBD7',
    justifyContent: 'space-between',
    paddingTop: 100,
    paddingBottom: 200,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 20,
    alignSelf: 'center',
  },
  notificationCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationText: {
    fontSize: 16,
    color: colors.textDark,
  },
});