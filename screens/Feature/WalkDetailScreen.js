// WalkDetailScreen.js
import React, { useMemo } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../styles/colors';
import TopNav from '../../components/TopNav';
import FooterNav from '../../components/FooterNav';

export default function WalkDetailScreen({ route }) {
  // 더미 데이터
  const activity = route.params?.activity ?? {
    title: '산책 기록',
    desc: '오늘은 3.4km를 걸었어요!',
    km: 3.4,
    pace: '7:30/km',
    time: '25분 40초',
  };

  const messages = [
    '오늘도 저속노화 성공🙌',
    '대단하십니다! 응원합니다 💪🔥',
    '오늘도 꾸준히! 멋져요 👏',
    '작은 걸음이 큰 변화를 만듭니다 🚶‍♂️',
    '당신의 노력이 빛나고 있어요 ✨',
    '꾸준함이 힘입니다! 파이팅 🙌',
    '이 기세로 목표까지 화이팅 🏃‍♀️',
    '매일매일 꾸준히! 계속 화이팅 🔥',
  ];

  const randomMessage = useMemo(() => {
    const idx = Math.floor(Math.random() * messages.length);
    return messages[idx];
  }, []);

  const TOPNAV_HEIGHT = 150;
  const FOOTERNAV_HEIGHT = 80;

  return (
    <SafeAreaView style={styles.safe}>
      {/* TopNav */}
      <TopNav />

      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={{
          paddingTop: TOPNAV_HEIGHT,
          paddingBottom: FOOTERNAV_HEIGHT + 30,
          alignItems: 'center',
          width: '100%',
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.title}>{activity.title}</Text>
          <Text style={styles.desc}>{activity.desc}</Text>

          <View style={styles.heroWrap}>
            <Text style={styles.heroNumber}>{activity.km}</Text>
            <Text style={styles.heroUnit}>km</Text>
            <Text style={styles.heroCaption}>총 거리</Text>
          </View>

          <View style={styles.pillsRow}>
            <StatPill
              icon="speedometer-outline"
              color={colors.primary}
              label="평균 페이스"
              value={activity.pace}
            />
            <StatPill
              icon="time-outline"
              color={colors.primary}
              label="시간"
              value={activity.time}
            />
          </View>

          <View style={styles.messageBox}>
            <Text style={styles.messageText}>{randomMessage}</Text>
          </View>
        </View>
      </ScrollView>

      {/* FooterNav */}
      <FooterNav />
    </SafeAreaView>
  );
}

function StatPill({ icon, color, label, value }) {
  return (
    <View style={styles.pill}>
      <View style={styles.pillIconWrap}>
        <Icon name={icon} size={22} color={color} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.pillValue}>{value}</Text>
        <Text style={styles.pillLabel}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAEBD7' },
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  title: { fontSize: 36, fontWeight: '800', color: '#111', marginBottom: 6, textAlign: 'center' },
  desc: { fontSize: 26, color: '#555', marginBottom: 24, textAlign: 'center' },
  heroWrap: { alignItems: 'center', marginBottom: 16 },
  heroNumber: { fontSize: 84, fontWeight: '900', color: '#111', lineHeight: 72 },
  heroUnit: { fontSize: 30, color: '#6B7280', marginTop: -6 },
  heroCaption: { fontSize: 23, color: '#9CA3AF', marginTop: 6 },
  pillsRow: { flexDirection: 'row', gap: 12, width: '100%', marginTop: 8, marginBottom: 16 },
  pill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  pillIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,149,0,0.12)',
  },
  pillValue: { fontSize: 26, fontWeight: '900', color: '#111' },
  pillLabel: { fontSize: 20, color: '#6B7280', marginTop: 2 },
  messageBox: {
    marginTop: 12,
    padding: 16,
    backgroundColor: '#fff8e6',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,122,0,0.3)',
  },
  messageText: { fontSize: 26, fontWeight: '700', color: '#FF7A00', textAlign: 'center' },
});
