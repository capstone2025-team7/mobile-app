// src/screens/club/BulletinBoardScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../../styles/colors';
import TopNav from '../../components/TopNav';
import FooterNav from '../../components/FooterNav';

const getWeeklyBulletins = () => {
  const now = new Date();
  const bulletins = [];

  for (let i = 0; i < 4; i++) { // 최근 4주치
    const sunday = new Date(now);
    // i주 전의 일요일 오전 10시
    sunday.setDate(now.getDate() - ((now.getDay() + 7 * i) % 7));
    sunday.setHours(10, 0, 0, 0);

    const month = sunday.getMonth() + 1;
    const week = 4 - i; // 4주차부터 1주차 순
    bulletins.push({
      id: i + 1,
      title: `${month}월 ${week}주차 일정 투표`,
      startTime: sunday.toISOString(),
    });
  }

  return bulletins;
};

const BulletinBoardScreen = ({ navigation }) => {
  const bulletins = getWeeklyBulletins();

  return (
    <View style={styles.container}>
      <TopNav />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>게시물</Text>

        {bulletins.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.bulletinCard}
            onPress={() =>
              navigation.navigate('BulletinDetail', {
                id: item.id,
                title: item.title,
                startTime: item.startTime,
              })
            }
          >
            <Text style={styles.bulletinText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FooterNav />
    </View>
  );
};

export default BulletinBoardScreen;

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
  bulletinCard: {
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
  bulletinText: {
    fontSize: 16,
    color: colors.textDark,
  },
});
