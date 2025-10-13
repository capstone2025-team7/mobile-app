// src/screens/club/BulletinBoardScreen.js
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import TopNav from '../../components/TopNav';
import FooterNav from '../../components/FooterNav';
import colors from '../../styles/colors';

// 토요일 기준 주차 계산 (토요일이 속한 달 기준)
function getMonthWeekNumber(saturday) {
  const month = saturday.getMonth();
  const year = saturday.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const firstSaturdayOffset = (6 - firstDayOfMonth.getDay() + 7) % 7;
  const firstSaturday = new Date(year, month, 1 + firstSaturdayOffset);

  const diffDays = Math.floor((saturday - firstSaturday) / (1000 * 60 * 60 * 24));
  return diffDays < 0 ? 1 : Math.floor(diffDays / 7) + 1;
}

// 올해 1월부터 오늘까지 모든 주차 게시물 생성
const getAllWeeklyBulletins = () => {
  const bulletins = [];
  const now = new Date();
  const startDate = new Date(now.getFullYear(), 0, 1); // 1월 1일
  let saturday = new Date(startDate);

  // 1월 1일부터 첫 토요일 찾기
  const firstSaturdayOffset = (6 - saturday.getDay() + 7) % 7;
  saturday.setDate(saturday.getDate() + firstSaturdayOffset);
  saturday.setHours(6, 0, 0, 0); // 토요일 오전 6시 시작

  let id = 1;
  while (saturday <= now) {
    const friday = new Date(saturday);
    friday.setDate(saturday.getDate() + 6);
    friday.setHours(18, 0, 0, 0); // 금요일 오후 6시 종료

    const month = saturday.getMonth() + 1;
    const weekNumber = getMonthWeekNumber(saturday);

    bulletins.push({
      id: id++,
      title: `${month}월 ${weekNumber}주차 참여 투표`,
      startTime: saturday.toISOString(),
      endTime: friday.toISOString(),
    });

    // 다음 주 토요일
    saturday.setDate(saturday.getDate() + 7);
  }

  // 최근 주차가 위로 오도록 역순 정렬 후 최근 5개만 반환
  return bulletins.reverse().slice(0, 5);
};

const BulletinBoardScreen = ({ navigation }) => {
  const bulletins = getAllWeeklyBulletins();

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
                endTime: item.endTime,
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
    backgroundColor: colors.background,
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
    backgroundColor: colors.white,
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
